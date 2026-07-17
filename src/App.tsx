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
  const [activeSectionId, setActiveSectionId] = useState<string>(
    AUDIT_SECTIONS[0].id,
  );
  const [view, setView] = useState<View>('audit');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    saveState({
      version: 1,
      responses,
      updatedAt: Date.now(),
    });
  }, [responses]);

  const result = useMemo(
    () => calculateAudit(AUDIT_SECTIONS, responses),
    [responses],
  );

  const activeSection =
    AUDIT_SECTIONS.find((section) => section.id === activeSectionId) ??
    AUDIT_SECTIONS[0];

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

  const confirmReset = () => {
    clearState();
    setResponses({});
    setShowResetConfirm(false);
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
        onReset={() => setShowResetConfirm(true)}
        onReport={() => setView('report')}
      >
        <section className="section-intro">
          <h2>{activeSection.name}</h2>
          <p>{activeSection.description}</p>
        </section>
        <div className="question-list">
          {activeSection.questions.map((question, idx) => (
            <QuestionCard
              key={question.id}
              index={idx + 1}
              question={question}
              response={responses[question.id]}
              onChange={(answer, note) => handleAnswer(question.id, answer, note)}
            />
          ))}
        </div>
      </AuditShell>

      {showResetConfirm && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>Reset the audit?</h3>
            <p>
              This clears all responses stored in this browser. This cannot be
              undone.
            </p>
            <div className="modal__actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn--danger"
                onClick={confirmReset}
              >
                Confirm reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
