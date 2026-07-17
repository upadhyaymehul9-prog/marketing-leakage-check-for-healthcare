import type { AuditResult, Phase } from '../types';
import { formatInr } from '../lib/format';

interface ReportProps {
  result: AuditResult;
  onBack: () => void;
}

const PHASE_LABELS: Record<Phase, string> = {
  '30': 'First 30 days',
  '60': 'Days 31–60',
  '90': 'Days 61–90',
};

export default function Report({ result, onBack }: ReportProps) {
  const phases: Phase[] = ['30', '60', '90'];

  return (
    <div className="report">
      <div className="report__top">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          ← Back to audit
        </button>
      </div>

      <header className="report__header">
        <h2>Your audit report</h2>
        <div className="report__headline">
          <div className={`risk-pill risk-pill--${result.overallRisk.toLowerCase()}`}>
            Overall risk: {result.overallRisk}
          </div>
          <div className="report__opportunity">
            <span className="report__opportunity-label">
              Indicative screening range (monthly)
            </span>
            <span className="report__opportunity-value">
              {formatInr(result.opportunity.low)} –{' '}
              {formatInr(result.opportunity.high)}
            </span>
          </div>
        </div>
        <p className="report__disclaimer">
          This is a self-assessment screening range and must be validated against
          hospital records. It is not an exact financial loss or a compliance
          audit.
        </p>
      </header>

      <section className="report__section">
        <h3>Department risk summary</h3>
        <div className="report__grid">
          {result.sectionResults.map((section) => (
            <div key={section.sectionId} className="report__dept">
              <span className="report__dept-name">{section.name}</span>
              <span
                className={`risk-pill risk-pill--${section.risk.toLowerCase()}`}
              >
                {section.answered > 0 ? section.risk : 'Not started'}
              </span>
              <span className="report__dept-count">
                {section.answered}/{section.total} answered
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="report__section">
        <h3>Highest-priority gaps</h3>
        {result.actions.length === 0 ? (
          <p className="report__empty">
            No priority gaps detected yet. Answer more questions to surface
            recommendations.
          </p>
        ) : (
          <ol className="report__actions">
            {result.actions.slice(0, 10).map((action) => (
              <li key={action.questionId} className="report__action">
                <div className="report__action-head">
                  <span
                    className={`badge badge--${action.severity.toLowerCase()}`}
                  >
                    {action.severity}
                  </span>
                  <span className="report__action-section">
                    {action.sectionName}
                  </span>
                </div>
                <p className="report__action-text">{action.text}</p>
                <p className="report__action-rec">
                  <strong>Action:</strong> {action.recommendation}
                </p>
                <p className="report__action-owner">Owner: {action.owner}</p>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="report__section">
        <h3>30 / 60 / 90-day action plan</h3>
        <div className="report__plan">
          {phases.map((phase) => {
            const items = result.actions.filter((a) => a.phase === phase);
            return (
              <div key={phase} className="report__plan-column">
                <h4>{PHASE_LABELS[phase]}</h4>
                {items.length === 0 ? (
                  <p className="report__empty">Nothing scheduled.</p>
                ) : (
                  <ul>
                    {items.map((item) => (
                      <li key={item.questionId}>{item.recommendation}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="report__section">
        <h3>Patient-growth recommendations</h3>
        <ul className="report__growth">
          {result.growth.map((item) => (
            <li key={item.questionId}>{item.text}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
