import { useEffect, useMemo, useRef, useState } from 'react';
import { AUDIT_SECTIONS } from './data/audit';
import { SECTION_HOW_TO } from './data/howToAchieve';
import { calculateAudit } from './lib/scoring';
import {
  clearState,
  hasLead,
  loadState,
  sanitizeResponses,
  saveState,
} from './lib/storage';
import type { AnswerValue, ResponseMap } from './types';
import AuditShell, { type AuditPage } from './components/AuditShell';
import QuestionCard from './components/QuestionCard';
import Report from './components/Report';
import EmailGate from './components/EmailGate';

type View = 'audit' | 'report';

function sectionsFor(page: AuditPage) {
  return AUDIT_SECTIONS.filter((s) => s.theme === page);
}

export default function App() {
  const [responses, setResponses] = useState<ResponseMap>(
    () => loadState().responses,
  );
  const [page, setPage] = useState<AuditPage>('marketing');
  const pageSections = sectionsFor(page);
  const [activeSectionId, setActiveSectionId] = useState(pageSections[0].id);
  const [view, setView] = useState<View>('audit');
  const [leadCaptured, setLeadCaptured] = useState<boolean>(() => hasLead());
  const [confirmReset, setConfirmReset] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(
    () => loadState().updatedAt,
  );
  const isFirstRender = useRef(true);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const now = Date.now();
    saveState({ version: 1, responses, updatedAt: now });
    setLastSavedAt(now);
  }, [responses]);

  const handleExport = () => {
    const payload = JSON.stringify(
      { version: 1, responses, exportedAt: Date.now() },
      null,
      2,
    );
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `hospital-marketing-brand-audit-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as {
          responses?: unknown;
        };
        setResponses(sanitizeResponses(parsed.responses));
      } catch {
        // ignore invalid file; leave current answers untouched
      }
    };
    reader.readAsText(file);
  };

  const result = useMemo(
    () => calculateAudit(AUDIT_SECTIONS, responses),
    [responses],
  );

  const pageHealth =
    page === 'marketing' ? result.marketingHealth : result.brandHealth;

  const pageCompletion = useMemo(() => {
    const ids = new Set(pageSections.flatMap((s) => s.questions.map((q) => q.id)));
    const total = ids.size;
    if (total === 0) return 0;
    const answered = [...ids].filter((id) => responses[id]).length;
    return answered / total;
  }, [pageSections, responses]);

  const activeSection =
    pageSections.find((s) => s.id === activeSectionId) ?? pageSections[0];

  const handleNavigate = (next: AuditPage) => {
    setPage(next);
    const first = sectionsFor(next)[0];
    setActiveSectionId(first.id);
    setView('audit');
  };

  const handleAnswer = (
    questionId: string,
    answer: AnswerValue,
    note?: string,
  ) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: { answer, note, updatedAt: Date.now() },
    }));
  };

  const doReset = () => {
    clearState();
    setResponses({});
    setLastSavedAt(null);
    setConfirmReset(false);
    setView('audit');
    setPage('marketing');
    setActiveSectionId(sectionsFor('marketing')[0].id);
  };

  if (view === 'report') {
    if (!leadCaptured) {
      return (
        <EmailGate
          result={result}
          onSubmit={() => setLeadCaptured(true)}
          onBack={() => setView('audit')}
        />
      );
    }
    return <Report result={result} onBack={() => setView('audit')} />;
  }

  return (
    <>
      <AuditShell
        page={page}
        onNavigate={handleNavigate}
        sections={pageSections}
        activeSectionId={activeSection.id}
        result={result}
        pageHealth={pageHealth}
        pageCompletion={pageCompletion}
        lastSavedAt={lastSavedAt}
        onSelect={setActiveSectionId}
        onReset={() => setConfirmReset(true)}
        onReport={() => setView('report')}
        onExport={handleExport}
        onImportClick={handleImportClick}
      >
        <section className="section-intro">
          <h2>{activeSection.name}</h2>
          <p>{activeSection.description}</p>
          <div className="section-intro__objective">
            <strong>Audit objective:</strong> {activeSection.objective}
          </div>
          <details className="how-to how-to--section">
            <summary>How to achieve this section (step-by-step)</summary>
            <ol className="how-to__steps">
              {(SECTION_HOW_TO[activeSection.id] ?? []).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </details>
          <p className="section-intro__meta">
            {activeSection.questions.length} controls in this domain · Open
            “How to achieve” on any question if you don’t know where to start
          </p>
        </section>
        <div className="question-list">
          {activeSection.questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              index={i + 1}
              question={q}
              response={responses[q.id]}
              onChange={(answer, note) => handleAnswer(q.id, answer, note)}
            />
          ))}
        </div>
      </AuditShell>

      <input
        ref={importInputRef}
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImportFile(file);
          e.target.value = '';
        }}
      />

      {confirmReset && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>Reset this health check?</h3>
            <p>All answers stored in this browser will be cleared.</p>
            <div className="modal__actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setConfirmReset(false)}
              >
                Cancel
              </button>
              <button type="button" className="btn btn--danger" onClick={doReset}>
                Confirm reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
