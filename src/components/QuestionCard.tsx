import type { AnswerValue, AuditQuestion, Response } from '../types';
import { ANSWER_LABELS, ANSWER_ORDER } from '../data/audit';
import { getQuestionHowTo } from '../data/questionHowTo';
import QuestionIllustration from './QuestionIllustration';

interface QuestionCardProps {
  index: number;
  question: AuditQuestion;
  response?: Response;
  onChange: (answer: AnswerValue, note?: string) => void;
}

export default function QuestionCard({
  index,
  question,
  response,
  onChange,
}: QuestionCardProps) {
  const howTo = getQuestionHowTo(question.id, question.recommendation);

  return (
    <article className="question-card">
      <header className="question-card__header">
        <span className="question-card__number">Q{index}</span>
        <span className={`badge badge--${question.severity.toLowerCase()}`}>
          {question.severity}
        </span>
        <span className="control-chip">{question.controlArea}</span>
        <span className={`theme-tag theme-tag--${question.source}`}>
          {question.source === 'marketing' ? 'Marketing' : 'Brand'}
        </span>
      </header>
      <p className="question-card__text">{question.text}</p>
      {question.explanation && (
        <p className="question-card__explanation">{question.explanation}</p>
      )}

      <div className="answer-options" role="group" aria-label="Answer options">
        {ANSWER_ORDER.map((value) => {
          const selected = response?.answer === value;
          return (
            <button
              key={value}
              type="button"
              className={`answer-option answer-option--${value} ${
                selected ? 'is-selected' : ''
              }`}
              aria-pressed={selected}
              onClick={() => onChange(value, response?.note)}
            >
              {ANSWER_LABELS[value]}
            </button>
          );
        })}
      </div>

      <QuestionIllustration question={question} />

      <div className="question-card__evidence">
        <strong>Evidence to check:</strong> {question.evidenceHint}
      </div>

      <details className="how-to">
        <summary>How to achieve this (if you don’t know how)</summary>
        <p className="how-to__summary">
          <strong>In short:</strong> {howTo.summary}
        </p>
        <ol className="how-to__steps">
          {howTo.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="how-to__owner">Suggested owner: {question.owner}</p>
      </details>

      <label className="question-card__note">
        <span>Auditor notes / evidence location (optional)</span>
        <textarea
          value={response?.note ?? ''}
          placeholder="e.g. CRM report 12 Mar · Shared Drive / Marketing / SLA.xlsx"
          onChange={(e) =>
            onChange(response?.answer ?? 'partial', e.target.value)
          }
          disabled={!response?.answer}
        />
      </label>
    </article>
  );
}
