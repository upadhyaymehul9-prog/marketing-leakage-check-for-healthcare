import type { AuditQuestion } from '../types';
import { QUESTION_ILLUSTRATIONS } from '../data/questionIllustrations';

interface QuestionIllustrationProps {
  question: AuditQuestion;
}

const MOTIF_COLORS: Record<string, { bg: string; accent: string; ink: string }> = {
  presence: { bg: '#e8f6f5', accent: '#00a69c', ink: '#002d62' },
  leads: { bg: '#eef3fb', accent: '#0a4d8c', ink: '#002d62' },
  funnel: { bg: '#f3eef8', accent: '#6b4c9a', ink: '#002d62' },
  ads: { bg: '#fff4e8', accent: '#d97b2d', ink: '#002d62' },
  maps: { bg: '#e9f7ef', accent: '#2e9e6e', ink: '#002d62' },
  content: { bg: '#eef6ff', accent: '#3b7ddd', ink: '#002d62' },
  referral: { bg: '#fef6e8', accent: '#c9a227', ink: '#002d62' },
  retain: { bg: '#e8f7f3', accent: '#1a9b7a', ink: '#002d62' },
  identity: { bg: '#f0eef8', accent: '#6b4c9a', ink: '#002d62' },
  brand: { bg: '#fdeeee', accent: '#d64545', ink: '#002d62' },
  website: { bg: '#eaf2fb', accent: '#0a4d8c', ink: '#002d62' },
  experience: { bg: '#eef9f4', accent: '#2e9e6e', ink: '#002d62' },
  reviews: { bg: '#fff8e6', accent: '#c9a227', ink: '#002d62' },
  governance: { bg: '#eef1f6', accent: '#44566e', ink: '#002d62' },
  generic: { bg: '#f0f4f9', accent: '#00a69c', ink: '#002d62' },
};

function MotifIcon({ motif, accent }: { motif: string; accent: string }) {
  switch (motif) {
    case 'presence':
      return (
        <g>
          <rect x="18" y="22" width="28" height="36" rx="4" fill={accent} opacity="0.9" />
          <circle cx="54" cy="30" r="10" fill={accent} />
          <rect x="68" y="28" width="22" height="30" rx="6" fill={accent} opacity="0.75" />
        </g>
      );
    case 'leads':
      return (
        <g>
          <circle cx="30" cy="40" r="12" fill={accent} />
          <path d="M42 40h28" stroke={accent} strokeWidth="4" />
          <circle cx="78" cy="40" r="12" fill={accent} opacity="0.7" />
          <path d="M30 28v-8M78 28v-8" stroke={accent} strokeWidth="3" />
        </g>
      );
    case 'funnel':
      return (
        <g>
          <path d="M20 20h64l-16 24v18l-16 8-16-8V44z" fill={accent} opacity="0.85" />
        </g>
      );
    case 'ads':
      return (
        <g>
          <rect x="22" y="24" width="60" height="36" rx="6" fill={accent} opacity="0.85" />
          <path d="M34 42h36M34 50h24" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'maps':
      return (
        <g>
          <path
            d="M52 18c-12 0-22 9-22 22 0 16 22 32 22 32s22-16 22-32c0-13-10-22-22-22z"
            fill={accent}
            opacity="0.9"
          />
          <circle cx="52" cy="40" r="7" fill="#fff" />
        </g>
      );
    case 'reviews':
      return (
        <g>
          <path
            d="M52 20l8 16 18 2-13 12 4 18-17-10-17 10 4-18-13-12 18-2z"
            fill={accent}
          />
        </g>
      );
    case 'retain':
      return (
        <g>
          <circle cx="40" cy="40" r="16" fill="none" stroke={accent} strokeWidth="5" />
          <path d="M52 28l18-2-8 16" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          <circle cx="70" cy="48" r="10" fill={accent} opacity="0.8" />
        </g>
      );
    case 'website':
      return (
        <g>
          <rect x="24" y="20" width="56" height="40" rx="4" fill={accent} opacity="0.9" />
          <rect x="28" y="28" width="48" height="26" fill="#fff" opacity="0.9" />
          <circle cx="40" cy="56" r="2.5" fill="#fff" />
        </g>
      );
    default:
      return (
        <g>
          <circle cx="52" cy="40" r="20" fill={accent} opacity="0.9" />
          <path
            d="M52 28v14M52 52h.01"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      );
  }
}

/**
 * Simple SVG “explainer image” for each question:
 * what the control is + 3 visual how-to steps.
 */
export default function QuestionIllustration({
  question,
}: QuestionIllustrationProps) {
  const meta = QUESTION_ILLUSTRATIONS[question.id] ?? {
    motif: 'generic',
    title: question.controlArea,
    what: question.explanation || question.text,
    steps: [
      question.recommendation.slice(0, 56),
      'Follow the detailed how-to below',
      'Capture evidence when done',
    ],
  };
  const colors = MOTIF_COLORS[meta.motif] ?? MOTIF_COLORS.generic;
  const steps = meta.steps.slice(0, 3);

  return (
    <figure className="question-illustration">
      <svg
        viewBox="0 0 640 280"
        role="img"
        aria-label={`Illustration: ${meta.title}. ${meta.what}`}
        className="question-illustration__svg"
      >
        <rect width="640" height="280" rx="16" fill={colors.bg} />
        <rect
          x="0"
          y="0"
          width="8"
          height="280"
          fill={colors.accent}
          rx="2"
        />

        {/* Motif icon panel */}
        <rect x="28" y="28" width="120" height="100" rx="14" fill="#fff" />
        <svg x="36" y="38" width="104" height="80" viewBox="0 0 104 80">
          <MotifIcon motif={meta.motif} accent={colors.accent} />
        </svg>

        {/* What it is */}
        <text
          x="168"
          y="48"
          fill={colors.accent}
          fontSize="13"
          fontWeight="700"
          fontFamily="Segoe UI, system-ui, sans-serif"
        >
          WHAT THIS IS
        </text>
        <text
          x="168"
          y="74"
          fill={colors.ink}
          fontSize="20"
          fontWeight="700"
          fontFamily="Segoe UI, system-ui, sans-serif"
        >
          {meta.title.length > 36 ? `${meta.title.slice(0, 34)}…` : meta.title}
        </text>
        {wrapText(meta.what, 52).slice(0, 3).map((line, i) => (
          <text
            key={`what-${i}`}
            x="168"
            y={102 + i * 18}
            fill={colors.ink}
            fontSize="13"
            opacity="0.8"
            fontFamily="Segoe UI, system-ui, sans-serif"
          >
            {line}
          </text>
        ))}

        {/* How to achieve strip */}
        <text
          x="28"
          y="160"
          fill={colors.accent}
          fontSize="13"
          fontWeight="700"
          fontFamily="Segoe UI, system-ui, sans-serif"
        >
          HOW TO ACHIEVE — 3 QUICK STEPS
        </text>

        {steps.map((step, i) => {
          const x = 28 + i * 200;
          return (
            <g key={`${i}-${step}`}>
              <rect
                x={x}
                y="174"
                width="188"
                height="82"
                rx="12"
                fill="#fff"
              />
              <circle
                cx={x + 22}
                cy="198"
                r="14"
                fill={colors.accent}
              />
              <text
                x={x + 22}
                y="203"
                textAnchor="middle"
                fill="#fff"
                fontSize="14"
                fontWeight="700"
                fontFamily="Segoe UI, system-ui, sans-serif"
              >
                {i + 1}
              </text>
              {wrapText(step, 26).slice(0, 3).map((line, li) => (
                <text
                  key={`step-${i}-${li}`}
                  x={x + 44}
                  y={194 + li * 16}
                  fill={colors.ink}
                  fontSize="12"
                  fontFamily="Segoe UI, system-ui, sans-serif"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <figcaption className="question-illustration__caption">
        Visual guide for this control — open “How to achieve” below for the full
        checklist.
      </figcaption>
    </figure>
  );
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}
