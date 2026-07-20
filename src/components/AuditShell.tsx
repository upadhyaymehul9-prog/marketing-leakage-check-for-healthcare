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
  lastSavedAt: number | null;
  children: ReactNode;
  onSelect: (id: string) => void;
  onReset: () => void;
  onReport: () => void;
  onExport: () => void;
  onImportClick: () => void;
}

function healthClass(band: string): string {
  return band.toLowerCase().replace(/\s+/g, '-');
}

function formatSavedAt(ts: number | null): string {
  if (ts === null) return 'Not saved yet';
  const diffMs = Date.now() - ts;
  if (diffMs < 60_000) return 'Saved just now';
  const mins = Math.round(diffMs / 60_000);
  if (mins < 60) return `Saved ${mins} min ago`;
  return `Saved ${new Date(ts).toLocaleString()}`;
}

export default function AuditShell({
  page,
  onNavigate,
  sections,
  activeSectionId,
  result,
  pageHealth,
  pageCompletion,
  lastSavedAt,
  children,
  onSelect,
  onReset,
  onReport,
  onExport,
  onImportClick,
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
          <span className="audit-header__saved">{formatSavedAt(lastSavedAt)}</span>
          <button type="button" className="btn btn--ghost" onClick={onImportClick}>
            Import
          </button>
          <button type="button" className="btn btn--ghost" onClick={onExport}>
            Export
          </button>
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

          <div className="page-nav page-nav--sidebar" role="group" aria-label="Audit pages">
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
          </div>
        </nav>

        <main className="audit-content">{children}</main>
      </div>
    </div>
  );
}
