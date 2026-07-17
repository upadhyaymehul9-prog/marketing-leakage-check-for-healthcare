import type { ReactNode } from 'react';
import type { AuditResult, AuditSection, HealthBand } from '../types';

export type AuditPage = 'marketing' | 'branding';

interface AuditShellProps {
  page: AuditPage;
  onNavigate: (page: AuditPage) => void;
  sections: AuditSection[];
  activeSectionId: string;
  result: AuditResult;
  pageHealth: HealthBand;
  pageCompletion: number;
  children: ReactNode;
  onSelect: (id: string) => void;
  onReset: () => void;
  onReport: () => void;
}

function healthClass(band: string): string {
  return band.toLowerCase().replace(/\s+/g, '-');
}

export default function AuditShell({
  page,
  onNavigate,
  sections,
  activeSectionId,
  result,
  pageHealth,
  pageCompletion,
  children,
  onSelect,
  onReset,
  onReport,
}: AuditShellProps) {
  const pct = Math.round(pageCompletion * 100);
  const meta = new Map(
    result.sectionResults.map((s) => [s.sectionId, s]),
  );

  const title =
    page === 'marketing'
      ? 'Hospital Marketing Health Check'
      : 'Hospital Brand Health Check';
  const subtitle =
    page === 'marketing'
      ? 'Patient acquisition, campaigns, follow-up & retention'
      : 'Identity, online presence, experience & growth';

  return (
    <div className="audit-shell">
      <header className="audit-header">
        <div className="audit-header__brand">
          <span className="audit-header__mark">₹</span>
          <div>
            <h1>{title}</h1>
            <p className="audit-header__sub">{subtitle}</p>
          </div>
        </div>

        <nav className="page-nav" aria-label="Audit pages">
          <button
            type="button"
            className={`page-nav__link ${page === 'marketing' ? 'is-active' : ''}`}
            onClick={() => onNavigate('marketing')}
          >
            Marketing Health
          </button>
          <button
            type="button"
            className={`page-nav__link ${page === 'branding' ? 'is-active' : ''}`}
            onClick={() => onNavigate('branding')}
          >
            Brand Health
          </button>
        </nav>

        <div className="audit-header__scores">
          <div className="score-pill">
            <span className="score-pill__label">
              {page === 'marketing' ? 'Marketing' : 'Brand'} health
            </span>
            <span
              className={`score-pill__value score-pill__value--${healthClass(pageHealth)}`}
            >
              {pageHealth}
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
          {sections.map((section) => {
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
