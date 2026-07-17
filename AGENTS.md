# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is

A **BookMyClinics** marketing site (Vite + React 18 + TypeScript) with two infographic-style pages:

1. **Follow-up Reminder System** — visit-based care → long-term patient revenue
2. **Clinic Branding Plan** — 7-step world-class branding guide (BookMyClinics + accredready)

Fully client-side; no backend, database, or auth. Navigate between pages via the header tabs (route-free `useState` in `App.tsx`).

### Commands (see `package.json` scripts)

- Dev server: `npm run dev` — `http://localhost:5173`, binds `0.0.0.0`.
- Tests: `npm test -- --run`
- Lint: `npm run lint`
- Build: `npm run build`

### Non-obvious notes

- Page components live in `src/pages/`; shared chrome in `src/components/Header.tsx`.
- The old revenue-leakage audit (from `docs/superpowers/`) was removed — the product vision is the BookMyClinics infographics, not that audit tool.
- Only `npm run dev` is needed to exercise the full product.
