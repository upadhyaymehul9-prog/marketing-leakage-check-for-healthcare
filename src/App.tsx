import { useEffect, useMemo, useState } from 'react';
import { AUDIT_SECTIONS } from './data/audit';
import { calculateAudit } from './lib/scoring';
import { clearState, loadState, saveState } from './lib/storage';
import type { AnswerValue, ResponseMap } from './types';
import AuditShell from './components/AuditShell';
import QuestionCard from './components/QuestionCard';
import Report from './components/Report';

type View = 'audit' | 'report';

export default function App() {
  const [responses, setResponses] = useState<ResponseMap>(
    () => loadState().responses,
  );
  const [activeSectionId, setActiveSectionId] = useState(
    AUDIT_SECTIONS[0].id,
  );
  const [view, setView] = useState<View>('audit');
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    saveState({ version: 1, responses, updatedAt: Date.now() });
  }, [responses]);

  const result = useMemo(
    () => calculateAudit(AUDIT_SECTIONS, responses),
    [responses],
  );

  const activeSection =
    AUDIT_SECTIONS.find((s) => s.id === activeSectionId) ?? AUDIT_SECTIONS[0];

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
    setConfirmReset(false);
    setView('audit');
    setActiveSectionId(AUDIT_SECTIONS[0].id);
  };

  if (view === 'report') {
    return <Report result={result} onBack={() => setView('audit')} />;
  }

  return (
    <>
      <AuditShell
        sections={AUDIT_SECTIONS}
        activeSectionId={activeSectionId}
        result={result}
        onSelect={setActiveSectionId}
        onReset={() => setConfirmReset(true)}
        onReport={() => setView('report')}
      >
        <section className="section-intro">
          <h2>{activeSection.name}</h2>
          <p>{activeSection.description}</p>
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
