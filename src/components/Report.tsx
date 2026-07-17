import type {
  AnswerValue,
  AuditResult,
  ConfidenceLevel,
  HealthBand,
  Phase,
} from '../types';
import { getQuestionHowTo } from '../data/questionHowTo';

interface ReportProps {
  result: AuditResult;
  onBack: () => void;
}

const PHASE_LABELS: Record<Phase, string> = {
  '30': 'First 30 days',
  '60': 'Days 31–60',
  '90': 'Days 61–90',
};

const HEALTH_DESC: Record<HealthBand, string> = {
  Strong: 'Your controls are well documented. Keep measuring and refining.',
  Developing: 'Good foundations with gaps. Focus on high-severity items next.',
  'At Risk': 'Several important marketing or brand controls are weak or missing.',
  Critical: 'Urgent gaps in marketing and/or brand systems need immediate attention.',
};

const CONFIDENCE_DESC: Record<ConfidenceLevel, string> = {
  High: '90%+ of questions answered — the health bands above reflect your full picture.',
  Medium: '60–89% answered — answer more questions to firm up the health bands above.',
  Low: 'Under 60% answered — treat the health bands above as a rough first look, not a verdict.',
};

const ACTION_STATUS: Record<AnswerValue | 'unanswered', { label: string; tone: 'gap' | 'unassessed' }> = {
  unanswered: { label: 'Not yet assessed', tone: 'unassessed' },
  undocumented: { label: 'Marked: Yes, not documented', tone: 'gap' },
  partial: { label: 'Marked: Partial', tone: 'gap' },
  no: { label: 'Marked: No', tone: 'gap' },
  evidence: { label: 'Marked: Yes, with evidence', tone: 'gap' },
  na: { label: 'Marked: Not applicable', tone: 'gap' },
};

export default function Report({ result, onBack }: ReportProps) {
  const phases: Phase[] = ['30', '60', '90'];
  const marketingSections = result.sectionResults.filter(
    (s) => s.theme === 'marketing',
  );
  const brandSections = result.sectionResults.filter(
    (s) => s.theme === 'branding',
  );

  return (
    <div className="report">
      <div className="report__top">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          ← Back to questionnaire
        </button>
      </div>

      <header className="report__header">
        <p className="report__eyebrow">Hospital self-assessment report</p>
        <h2>Your marketing &amp; brand health report</h2>

        <div className="report__summary-grid">
          <div className="summary-card">
            <span className="summary-card__label">Overall health</span>
            <span
              className={`health-badge health-badge--${result.overallHealth.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {result.overallHealth}
            </span>
            <p className="summary-card__desc">
              {HEALTH_DESC[result.overallHealth]}
            </p>
          </div>
          <div className="summary-card">
            <span className="summary-card__label">Marketing health</span>
            <span
              className={`health-badge health-badge--${result.marketingHealth.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {result.marketingHealth}
            </span>
            <p className="summary-card__desc">
              Patient acquisition, follow-up &amp; retention systems
            </p>
          </div>
          <div className="summary-card">
            <span className="summary-card__label">Brand health</span>
            <span
              className={`health-badge health-badge--${result.brandHealth.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {result.brandHealth}
            </span>
            <p className="summary-card__desc">
              Identity, online presence, experience &amp; growth
            </p>
          </div>
          <div className="summary-card">
            <span className="summary-card__label">Confidence</span>
            <span
              className={`confidence-badge confidence-badge--${result.confidence.toLowerCase()}`}
            >
              {result.confidence}
            </span>
            <p className="summary-card__desc">
              {CONFIDENCE_DESC[result.confidence]} ({result.answeredCount}/
              {result.totalCount} answered)
            </p>
          </div>
        </div>

        <p className="report__disclaimer">
          This is a self-assessment screening tool based on proven hospital
          marketing and branding practices. Results should be validated against
          your clinic&apos;s records and goals — not treated as a certification
          or exact score.
        </p>
      </header>

      <section className="report__section">
        <h3>Marketing &amp; retention</h3>
        <div className="report__dept-grid">
          {marketingSections.map((s) => (
            <div key={s.sectionId} className="dept-card">
              <span className="dept-card__name">{s.name}</span>
              <span
                className={`health-badge health-badge--small health-badge--${s.health.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {s.answered > 0 ? s.health : 'Not started'}
              </span>
              <span className="dept-card__count">
                {s.answered}/{s.total} answered
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="report__section">
        <h3>Brand &amp; growth</h3>
        <div className="report__dept-grid">
          {brandSections.map((s) => (
            <div key={s.sectionId} className="dept-card">
              <span className="dept-card__name">{s.name}</span>
              <span
                className={`health-badge health-badge--small health-badge--${s.health.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {s.answered > 0 ? s.health : 'Not started'}
              </span>
              <span className="dept-card__count">
                {s.answered}/{s.total} answered
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="report__section">
        <h3>Priority gaps to fix</h3>
        {result.actions.length === 0 ? (
          <p className="report__empty">
            Answer more questions to surface recommendations.
          </p>
        ) : (
          <ol className="report__actions">
            {result.actions.slice(0, 12).map((a) => {
              const howTo = getQuestionHowTo(a.questionId, a.recommendation);
              const status = ACTION_STATUS[a.answer];
              return (
              <li key={a.questionId} className="action-item">
                <div className="action-item__head">
                  <span className={`badge badge--${a.severity.toLowerCase()}`}>
                    {a.severity}
                  </span>
                  <span className="control-chip">{a.controlArea}</span>
                  <span className="action-item__section">{a.sectionName}</span>
                  <span className={`status-tag status-tag--${status.tone}`}>
                    {status.label}
                  </span>
                </div>
                <p className="action-item__text">{a.text}</p>
                <div className="action-item__howto">
                  <strong>How to achieve:</strong>
                  <p>{howTo.summary}</p>
                  <ol>
                    {howTo.steps.slice(0, 6).map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
                <p className="action-item__owner">Owner: {a.owner}</p>
              </li>
              );
            })}
          </ol>
        )}
      </section>

      <section className="report__section">
        <h3>30 / 60 / 90-day action plan</h3>
        <div className="plan-grid">
          {phases.map((phase) => {
            const items = result.actions.filter((a) => a.phase === phase);
            return (
              <div key={phase} className="plan-column">
                <h4>{PHASE_LABELS[phase]}</h4>
                {items.length === 0 ? (
                  <p className="report__empty">Nothing scheduled yet.</p>
                ) : (
                  <ul>
                    {items.map((i) => (
                      <li key={i.questionId}>{i.recommendation}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
