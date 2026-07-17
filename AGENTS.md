# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is

**Hospital Marketing & Brand Health Check** — a browser-only questionnaire with **two pages**:

1. **Marketing Health** — patient acquisition, campaigns, follow-up & retention
2. **Brand Health** — identity, online presence, patient experience, growth & accreditation

Switch pages via the header tabs. Hospitals answer Yes / Partial / No / N/A and get scored marketing vs brand health plus a report with a 30/60/90-day plan. State persists in `localStorage` key `hospital-marketing-brand-audit:v1`.

Tech: Vite + React 18 + TypeScript. No backend. No third-party product branding in the UI.

### Commands

- `npm run dev` → `http://localhost:5173`
- `npm test -- --run`
- `npm run lint`
- `npm run build`

### Key files

- `src/data/audit.ts` — 7 sections (~41 questions)
- `src/lib/scoring.ts` — health bands: Strong / Developing / At Risk / Critical
- `src/App.tsx` — two-page navigation (`marketing` | `branding`)
- `src/components/` — AuditShell, QuestionCard, Report

### Non-obvious notes

- Answers are shared across both pages (one stored state); each page filters sidebar sections by theme.
- `docs/superpowers/` describes an older revenue-leakage audit — not the current product.
- Campaign question explanations cite industry research; do not invent unverified statistics when editing.
