import type {
  AnswerValue,
  AuditQuestion,
  AuditResult,
  AuditSection,
  GrowthRecommendation,
  OpportunityRange,
  Phase,
  ReportAction,
  ResponseMap,
  RiskBand,
  SectionResult,
  Severity,
} from '../types';

const POINTS: Record<AnswerValue, number> = {
  evidence: 0,
  undocumented: 1,
  partial: 2,
  no: 4,
  na: 0,
};

const MAX_POINTS = 4;

const WEIGHT: Record<Severity, number> = {
  Medium: 1,
  High: 2,
  Critical: 3,
};

const PHASE_BY_SEVERITY: Record<Severity, Phase> = {
  Critical: '30',
  High: '60',
  Medium: '90',
};

const SEVERITY_RANK: Record<Severity, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
};

/** Answers that leave a control weak (or unproven) and therefore contribute to risk. */
const WEAK_ANSWERS: AnswerValue[] = ['undocumented', 'partial', 'no'];

function bandFromScore(score: number): RiskBand {
  if (score < 0.15) return 'Low';
  if (score < 0.4) return 'Moderate';
  if (score < 0.7) return 'High';
  return 'Critical';
}

function isApplicable(answer: AnswerValue | undefined): boolean {
  return answer !== undefined && answer !== 'na';
}

interface Accumulator {
  actual: number;
  max: number;
}

function accumulate(
  acc: Accumulator,
  question: AuditQuestion,
  answer: AnswerValue | undefined,
): void {
  if (!isApplicable(answer)) return;
  const weight = WEIGHT[question.severity];
  acc.actual += weight * POINTS[answer as AnswerValue];
  acc.max += weight * MAX_POINTS;
}

function scoreFrom(acc: Accumulator): number {
  return acc.max === 0 ? 0 : acc.actual / acc.max;
}

function buildOpportunity(
  sections: AuditSection[],
  responses: ResponseMap,
): OpportunityRange {
  let base = 0;
  for (const section of sections) {
    for (const question of section.questions) {
      const answer = responses[question.id]?.answer;
      if (answer === 'na') continue;
      if (answer && WEAK_ANSWERS.includes(answer)) {
        base += question.estimateWeight * (POINTS[answer] / MAX_POINTS);
      } else if (!answer && question.severity !== 'Medium') {
        // Unanswered critical/high controls carry uncertainty exposure.
        base += question.estimateWeight * 0.5;
      }
    }
  }
  const low = Math.round((base * 0.6) / 1000) * 1000;
  const high = Math.round((base * 1.4) / 1000) * 1000;
  return { low, high };
}

function buildActions(
  sections: AuditSection[],
  responses: ResponseMap,
): ReportAction[] {
  const actions: ReportAction[] = [];
  for (const section of sections) {
    for (const question of section.questions) {
      const answer = responses[question.id]?.answer;
      if (answer === 'na' || answer === 'evidence') continue;
      const isWeak = answer !== undefined && WEAK_ANSWERS.includes(answer);
      const isUnansweredPriority =
        answer === undefined && question.severity !== 'Medium';
      if (!isWeak && !isUnansweredPriority) continue;
      actions.push({
        questionId: question.id,
        sectionName: section.name,
        severity: question.severity,
        answer: answer ?? 'unanswered',
        text: question.text,
        recommendation: question.recommendation,
        owner: question.owner,
        phase: PHASE_BY_SEVERITY[question.severity],
      });
    }
  }
  return actions.sort((a, b) => {
    const bySeverity = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
    if (bySeverity !== 0) return bySeverity;
    return POINTS[b.answer === 'unanswered' ? 'no' : b.answer] -
      POINTS[a.answer === 'unanswered' ? 'no' : a.answer];
  });
}

function buildGrowth(
  sections: AuditSection[],
  responses: ResponseMap,
): GrowthRecommendation[] {
  const growth: GrowthRecommendation[] = [];
  for (const section of sections) {
    for (const question of section.questions) {
      if (!question.growthRecommendation) continue;
      const answer = responses[question.id]?.answer;
      if (answer === 'evidence' || answer === 'na') continue;
      growth.push({
        questionId: question.id,
        sectionName: section.name,
        text: question.growthRecommendation,
      });
    }
  }
  if (growth.length > 0) return growth;
  // Fall back to the full set of growth advice when nothing is flagged.
  return sections.flatMap((section) =>
    section.questions
      .filter((q) => q.growthRecommendation)
      .map((q) => ({
        questionId: q.id,
        sectionName: section.name,
        text: q.growthRecommendation as string,
      })),
  );
}

export function calculateAudit(
  sections: AuditSection[],
  responses: ResponseMap,
): AuditResult {
  const overall: Accumulator = { actual: 0, max: 0 };
  let answeredCount = 0;
  let totalCount = 0;

  const sectionResults: SectionResult[] = sections.map((section) => {
    const acc: Accumulator = { actual: 0, max: 0 };
    let answered = 0;
    for (const question of section.questions) {
      totalCount += 1;
      const answer = responses[question.id]?.answer;
      if (answer !== undefined) {
        answered += 1;
        answeredCount += 1;
      }
      accumulate(acc, question, answer);
      accumulate(overall, question, answer);
    }
    const score = scoreFrom(acc);
    return {
      sectionId: section.id,
      name: section.name,
      icon: section.icon,
      answered,
      total: section.questions.length,
      score,
      risk: bandFromScore(score),
    };
  });

  const overallScore = scoreFrom(overall);

  return {
    completion: totalCount === 0 ? 0 : answeredCount / totalCount,
    answeredCount,
    totalCount,
    sectionResults,
    overallRisk: bandFromScore(overallScore),
    opportunity: buildOpportunity(sections, responses),
    actions: buildActions(sections, responses),
    growth: buildGrowth(sections, responses),
  };
}
