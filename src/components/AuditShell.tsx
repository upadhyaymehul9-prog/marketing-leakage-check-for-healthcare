import type { ReactNode } from 'react';
import type { AuditResult, AuditSection } from '../types';

interface AuditShellProps {
  sections: AuditSection[];
  activeSectionId: string;
  result: AuditResult;
  children: ReactNode;
  onSelect: (id: string) => void;
  onReset: () => void;
  onReport: () => void;
}

function healthClass(band: string): string {
  return band.toLowerCase().replace(/\s+/g, '-');
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
  const pct = Math.round(result.completion * 100);
  const meta = new Map(
    result.sectionResults.map((s) => [s.sectionId, s]),
  );

  return (
    <div className="audit-shell">
      <header className="audit-header">
        <div className="audit-header__brand">
          <span className="audit-header__mark">+</span>
          <div>
            <h1>Marketing &amp; Brand Health Check</h1>
            <p className="audit-header__sub">
              BookMyClinics · Smart Clinic. Stronger Care.
            </p>
          </div>
        </div>

        <div className="audit-header__scores">
          <div className="score-pill">
            <span className="score-pill__label">Marketing</span>
            <span
              className={`score-pill__value score-pill__value--${healthClass(result.marketingHealth)}`}
            >
              {result.marketingHealth}
            </span>
          </div>
          <div className="score-pill">
            <span className="score-pill__label">Brand</span>
            <span
              className={`score-pill__value score-pill__value--${healthClass(result.brandHealth)}`}
            >
              {result.brandHealth}
            </span>
          </div>
          <div className="score-pill">
            <span className="score-pill__label">Completion</span>
            <span className="score-pill__value">{pct}%</span>
          </div>
        </div>

        <div className="audit-header__actions">
          <button type="button" className="btn btn--ghost" onClick={onReset}>
            Reset
          </button>
          <button type="button" className="btn btn--primary" onClick={onReport}>
            View Report
          </button>
        </div>
      </header>

      <div className="audit-body">
        <nav className="sidebar" aria-label="Audit sections">
          <p className="sidebar__group">Marketing &amp; retention</p>
          {sections
            .filter((s) => s.theme === 'marketing')
            .map((section) => {
              const m = meta.get(section.id);
              const active = section.id === activeSectionId;
              return (
                <button
                  key={section.id}
                  type="button"
                  className={`sidebar__item ${active ? 'is-active' : ''}`}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => onSelect(section.id)}
                >
                  <span className="sidebar__icon">{section.icon}</span>
                  <span className="sidebar__label">{section.name}</span>
                  <span className="sidebar__count">
                    {m?.answered ?? 0}/{m?.total ?? section.questions.length}
                  </span>
                </button>
              );
            })}

          <p className="sidebar__group">Brand &amp; growth</p>
          {sections
            .filter((s) => s.theme === 'branding')
            .map((section) => {
              const m = meta.get(section.id);
              const active = section.id === activeSectionId;
              return (
                <button
                  key={section.id}
                  type="button"
                  className={`sidebar__item ${active ? 'is-active' : ''}`}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => onSelect(section.id)}
                >
                  <span className="sidebar__icon">{section.icon}</span>
                  <span className="sidebar__label">{section.name}</span>
                  <span className="sidebar__count">
                    {m?.answered ?? 0}/{m?.total ?? section.questions.length}
                  </span>
                </button>
              );
            })}
        </nav>

        <main className="audit-content">{children}</main>
      </div>
    </div>
  );
}
