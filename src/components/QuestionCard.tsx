import type { AnswerValue, AuditQuestion, Response } from '../types';
import { ANSWER_LABELS, ANSWER_ORDER } from '../data/audit';

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
  return (
    <article className="question-card">
      <header className="question-card__header">
        <span className="question-card__number">Q{index}</span>
        <span
          className={`badge badge--${question.severity.toLowerCase()}`}
          aria-label={`${question.severity} severity`}
        >
          {question.severity}
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
      <label className="question-card__note">
        <span>Notes (optional)</span>
        <textarea
          value={response?.note ?? ''}
          placeholder="Local context, owner, or evidence location"
          onChange={(event) =>
            onChange(response?.answer ?? 'partial', event.target.value)
          }
          disabled={!response?.answer}
        />
      </label>
    </article>
  );
}
