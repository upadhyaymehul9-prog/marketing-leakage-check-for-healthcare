# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is

**BookMyClinics Marketing & Brand Health Check** — a browser-only questionnaire where hospitals/clinics answer operational questions derived from two BookMyClinics infographics:

1. **Follow-up / marketing infographic** — patient acquisition, reminders, retention, chronic care
2. **Branding plan infographic** — identity, online presence, patient experience, growth & accreditation

The app scores **marketing health** and **brand health** separately and produces a prioritized report with a 30/60/90-day action plan. State persists in `localStorage` key `bookmyclinics-health-audit:v1`.

Tech: Vite + React 18 + TypeScript. No backend.

### Commands

- `npm run dev` → `http://localhost:5173`
- `npm test -- --run`
- `npm run lint`
- `npm run build`

### Key files

- `src/data/audit.ts` — 7 sections (~40 questions): BookMyClinics infographics + proven campaign practices
- `src/lib/scoring.ts` — health bands: Strong / Developing / At Risk / Critical
- `src/components/` — AuditShell, QuestionCard, Report

### Non-obvious notes

- This is a **self-assessment questionnaire**, not static marketing landing pages.
- `docs/superpowers/` describes an older revenue-leakage audit — ignore it; the product vision is the BookMyClinics health check.
- Campaign questions cite industry research in explanations (MIT/InsideSales lead response, HFMA/Kaufman Hall LTV/retention, Google review/local SEO practices, India WhatsApp/GBP case studies). Do not invent unverified statistics when editing questions.
