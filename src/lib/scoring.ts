import type {
  AnswerValue,
  AuditQuestion,
  AuditResult,
  AuditSection,
  ConfidenceLevel,
  HealthBand,
  Phase,
  ReportAction,
  ResponseMap,
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

const PHASE: Record<Severity, Phase> = {
  Critical: '30',
  High: '60',
  Medium: '90',
};

const SEVERITY_RANK: Record<Severity, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
};

const WEAK: AnswerValue[] = ['undocumented', 'partial', 'no'];

function healthFromScore(score: number): HealthBand {
  if (score < 0.15) return 'Strong';
  if (score < 0.4) return 'Developing';
  if (score < 0.7) return 'At Risk';
  return 'Critical';
}

function healthFromAcc(acc: Acc): HealthBand {
  if (acc.max === 0) return 'Not Assessed';
  return healthFromScore(scoreFrom(acc));
}

function confidenceFromCompletion(completion: number): ConfidenceLevel {
  if (completion >= 0.9) return 'High';
  if (completion >= 0.6) return 'Medium';
  return 'Low';
}

function isApplicable(answer: AnswerValue | undefined): boolean {
  return answer !== undefined && answer !== 'na';
}

interface Acc {
  actual: number;
  max: number;
}

function accumulate(acc: Acc, q: AuditQuestion, answer: AnswerValue | undefined) {
  if (!isApplicable(answer)) return;
  const w = WEIGHT[q.severity];
  acc.actual += w * POINTS[answer as AnswerValue];
  acc.max += w * MAX_POINTS;
}

function scoreFrom(acc: Acc): number {
  return acc.max === 0 ? 0 : acc.actual / acc.max;
}

function themeAcc(
  sections: AuditSection[],
  responses: ResponseMap,
  theme: 'marketing' | 'branding',
): Acc {
  const acc: Acc = { actual: 0, max: 0 };
  for (const section of sections) {
    if (section.theme !== theme) continue;
    for (const q of section.questions) {
      accumulate(acc, q, responses[q.id]?.answer);
    }
  }
  return acc;
}

function buildActions(
  sections: AuditSection[],
  responses: ResponseMap,
): ReportAction[] {
  const actions: ReportAction[] = [];
  for (const section of sections) {
    for (const q of section.questions) {
      const answer = responses[q.id]?.answer;
      if (answer === 'na' || answer === 'evidence') continue;
      const weak = answer !== undefined && WEAK.includes(answer);
      const unanswered = answer === undefined && q.severity !== 'Medium';
      if (!weak && !unanswered) continue;
      actions.push({
        questionId: q.id,
        sectionName: section.name,
        severity: q.severity,
        controlArea: q.controlArea,
        answer: answer ?? 'unanswered',
        text: q.text,
        recommendation: q.recommendation,
        owner: q.owner,
        phase: PHASE[q.severity],
      });
    }
  }
  return actions.sort((a, b) => {
    const s = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
    if (s !== 0) return s;
    const pa = a.answer === 'unanswered' ? 'no' : a.answer;
    const pb = b.answer === 'unanswered' ? 'no' : b.answer;
    return POINTS[pb] - POINTS[pa];
  });
}

export function calculateAudit(
  sections: AuditSection[],
  responses: ResponseMap,
): AuditResult {
  const overall: Acc = { actual: 0, max: 0 };
  let answeredCount = 0;
  let totalCount = 0;

  const sectionResults: SectionResult[] = sections.map((section) => {
    const acc: Acc = { actual: 0, max: 0 };
    let answered = 0;
    for (const q of section.questions) {
      totalCount += 1;
      const answer = responses[q.id]?.answer;
      if (answer !== undefined) {
        answered += 1;
        answeredCount += 1;
      }
      accumulate(acc, q, answer);
      accumulate(overall, q, answer);
    }
    const score = scoreFrom(acc);
    return {
      sectionId: section.id,
      name: section.name,
      icon: section.icon,
      theme: section.theme,
      answered,
      total: section.questions.length,
      score,
      health: healthFromAcc(acc),
    };
  });

  const marketingAcc = themeAcc(sections, responses, 'marketing');
  const brandAcc = themeAcc(sections, responses, 'branding');
  const completion = totalCount === 0 ? 0 : answeredCount / totalCount;

  return {
    completion,
    answeredCount,
    totalCount,
    sectionResults,
    marketingHealth: healthFromAcc(marketingAcc),
    brandHealth: healthFromAcc(brandAcc),
    overallHealth: healthFromAcc(overall),
    confidence: confidenceFromCompletion(completion),
    actions: buildActions(sections, responses),
  };
}
