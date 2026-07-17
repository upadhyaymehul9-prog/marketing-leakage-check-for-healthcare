import type { ReactNode } from 'react';
import type { AuditResult, AuditSection } from '../types';
import { formatInr } from '../lib/format';

interface AuditShellProps {
  sections: AuditSection[];
  activeSectionId: string;
  result: AuditResult;
  children: ReactNode;
  onSelect: (sectionId: string) => void;
  onReset: () => void;
  onReport: () => void;
}

export default function AuditShell({
  sections,
  activeSectionId,
  result,
  children,
  onSelect,
  onReset,
  onReport,
}: AuditShellProps) {
  const completionPct = Math.round(result.completion * 100);
  const sectionMeta = new Map(
    result.sectionResults.map((section) => [section.sectionId, section]),
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__mark">₹</span>
          <div>
            <h1>Revenue Leakage Self-Audit</h1>
            <p className="app-header__subtitle">
              Hospital operational risk screening
            </p>
          </div>
        </div>
        <div className="app-header__metrics">
          <div className="metric">
            <span className="metric__label">Est. monthly opportunity</span>
            <span className="metric__value">
              {formatInr(result.opportunity.low)} –{' '}
              {formatInr(result.opportunity.high)}
            </span>
          </div>
          <div className="metric">
            <span className="metric__label">Completion</span>
            <span className="metric__value">{completionPct}%</span>
          </div>
        </div>
        <div className="app-header__actions">
          <button type="button" className="btn btn--ghost" onClick={onReset}>
            Reset
          </button>
          <button type="button" className="btn btn--primary" onClick={onReport}>
            View Report
          </button>
        </div>
      </header>

      <div className="app-body">
        <nav className="sidebar" aria-label="Audit sections">
          {sections.map((section) => {
            const meta = sectionMeta.get(section.id);
            const isActive = section.id === activeSectionId;
            return (
              <button
                key={section.id}
                type="button"
                className={`sidebar__item ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => onSelect(section.id)}
              >
                <span className="sidebar__icon">{section.icon}</span>
                <span className="sidebar__label">{section.name}</span>
                <span className="sidebar__count">
                  {meta?.answered ?? 0}/{meta?.total ?? section.questions.length}
                </span>
                {meta && meta.answered > 0 && (
                  <span
                    className={`risk-dot risk-dot--${meta.risk.toLowerCase()}`}
                    aria-label={`${meta.risk} risk`}
                  />
                )}
              </button>
            );
          })}
        </nav>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
