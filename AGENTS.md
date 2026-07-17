# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is

A single **frontend-only** product: the **Hospital Revenue Leakage Self-Audit**, a Vite + React 18 + TypeScript single-page app. It is entirely client-side — there is **no backend, database, or auth**. Audit state persists in the browser under `localStorage` key `revenue-leakage-audit:v1`. Design/plan docs live in `docs/superpowers/`.

### Commands (see `package.json` scripts)

- Dev server: `npm run dev` — serves at `http://localhost:5173` and binds `0.0.0.0`.
- Tests: `npm test -- --run` (Vitest + jsdom + React Testing Library). Drop `-- --run` for watch mode.
- Lint: `npm run lint` (ESLint).
- Build: `npm run build` (`tsc -b && vite build`, outputs `dist/`).

### Non-obvious notes

- The `node` on `PATH` (`/exec-daemon/node`) and the nvm `node` are different builds but both Node 22, so tooling works with either.
- Because all state is in `localStorage`, manual testing across "sessions" requires clearing site data (or using the in-app Reset button) rather than restarting a server.
- There is no server-side state, so `npm run dev` is the only process needed to exercise the full product end to end.
