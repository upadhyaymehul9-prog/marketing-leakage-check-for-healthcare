Exit code: 0
Wall time: 1.1 seconds
Output:
# Hospital Revenue Leakage Self-Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local, browser-only questionnaire that identifies hospital revenue-leakage risks and returns a â‚¹ risk-range report with corrective and patient-growth actions.

**Architecture:** A Vite React TypeScript single-page application renders static audit definitions and saves responses in `localStorage`. A pure scoring module converts responses into section risk, an overall risk band, a transparent indicative opportunity range, and ordered report actions. Presentation components receive typed data and contain no scoring rules.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, React Testing Library, CSS modules-free stylesheet.

## Global Constraints

- Treat estimates as screening ranges; never describe them as exact financial loss.
- Store audit state only in the browser and do not collect patient-level data.
- Use INR (â‚¹) and India-oriented cash/TPA/insurance language.
- Support desktop first, with usable tablet-width layout.
- Do not add authentication, integrations, uploads, or cloud persistence.

---

## File structure

- `src/data/audit.ts`: static sections, questions, response labels, and recommendations.
- `src/lib/scoring.ts`: pure score, risk, estimate, and report-action calculation.
- `src/lib/storage.ts`: versioned browser-state load/save/reset helpers.
- `src/types.ts`: shared domain types.
- `src/components/AuditShell.tsx`: header, sidebar, and active-section layout.
- `src/components/QuestionCard.tsx`: answer control and note input.
- `src/components/Report.tsx`: audit summary, prioritized actions, and growth advice.
- `src/App.tsx`: route-free screen state and composition.
- `src/styles.css`: dark responsive visual system.
- `src/lib/scoring.test.ts`, `src/lib/storage.test.ts`, `src/App.test.tsx`: automated checks.

### Task 1: Scaffold the verified application shell

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces `App(): JSX.Element`, mounted by `src/main.tsx`.

- [ ] **Step 1: Create the failing smoke test**

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';
test('shows the audit title', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Revenue Leakage Self-Audit/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- --run src/App.test.tsx`
Expected: FAIL because `App` has not been created.

- [ ] **Step 3: Add the minimal Vite React application**

```tsx
export default function App() {
  return <main><h1>Revenue Leakage Self-Audit</h1></main>;
}
```

Configure scripts: `dev: vite --host 0.0.0.0`, `build: tsc -b && vite build`, and `test: vitest`.

- [ ] **Step 4: Verify the scaffold**

Run: `npm test -- --run src/App.test.tsx; npm run build`
Expected: the test passes and Vite completes production build.

- [ ] **Step 5: Commit**

```bash
git add package.json vite.config.ts tsconfig.json index.html src
git commit -m "chore: scaffold revenue leakage audit"
```

### Task 2: Define audit data and scoring rules

**Files:**
- Create: `src/types.ts`, `src/data/audit.ts`, `src/lib/scoring.ts`
- Test: `src/lib/scoring.test.ts`

**Interfaces:**
- Produces `calculateAudit(sections: AuditSection[], responses: ResponseMap): AuditResult`.
- `AuditResult` contains `completion`, `sectionResults`, `overallRisk`, `opportunity`, and `actions`.

- [ ] **Step 1: Write failing scoring cases**

```ts
expect(calculateAudit([section], { q1: 'evidence' }).overallRisk).toBe('Low');
expect(calculateAudit([section], { q1: 'no' }).overallRisk).toBe('Critical');
expect(calculateAudit([section], { q1: 'na' }).completion).toBe(1);
```

- [ ] **Step 2: Verify failure**

Run: `npm test -- --run src/lib/scoring.test.ts`
Expected: FAIL because `calculateAudit` does not exist.

- [ ] **Step 3: Implement typed static sections and pure scoring**

```ts
const points = { evidence: 0, undocumented: 1, partial: 2, no: 4, na: 0 };
const weight = { Medium: 1, High: 2, Critical: 3 };
export function calculateAudit(sections: AuditSection[], responses: ResponseMap): AuditResult {
  // score only answered, applicable questions; return banded ranges, never an exact loss
}
```

Include at least four questions per section and cover lead response, appointments, registration/TPA, reconciliation, pharmacy dispensing, OT consumables, diagnostics charging, discharge, and collections.

- [ ] **Step 4: Verify logic**

Run: `npm test -- --run src/lib/scoring.test.ts`
Expected: PASS for evidence, missing-control, and not-applicable paths.

- [ ] **Step 5: Commit**

```bash
git add src/types.ts src/data/audit.ts src/lib/scoring.ts src/lib/scoring.test.ts
git commit -m "feat: add questionnaire scoring"
```

### Task 3: Add resilient local persistence

**Files:**
- Create: `src/lib/storage.ts`
- Test: `src/lib/storage.test.ts`

**Interfaces:**
- Produces `loadState(): AuditState`, `saveState(state: AuditState): void`, and `clearState(): void`.

- [ ] **Step 1: Write failing persistence cases**

```ts
test('returns a blank state when saved JSON is malformed', () => {
  localStorage.setItem('revenue-leakage-audit:v1', '{bad');
  expect(loadState().responses).toEqual({});
});
```

- [ ] **Step 2: Verify failure**

Run: `npm test -- --run src/lib/storage.test.ts`
Expected: FAIL because storage helpers do not exist.

- [ ] **Step 3: Implement versioned storage**

```ts
const KEY = 'revenue-leakage-audit:v1';
export const emptyState = (): AuditState => ({ version: 1, responses: {}, updatedAt: null });
```

Parse in `try/catch`, validate the version and object shape, and return `emptyState()` for invalid values.

- [ ] **Step 4: Verify helpers**

Run: `npm test -- --run src/lib/storage.test.ts`
Expected: PASS for save/load, malformed state, and clearing state.

- [ ] **Step 5: Commit**

```bash
git add src/lib/storage.ts src/lib/storage.test.ts
git commit -m "feat: persist audit responses locally"
```

### Task 4: Build the questionnaire workspace

**Files:**
- Create: `src/components/AuditShell.tsx`, `src/components/QuestionCard.tsx`
- Modify: `src/App.tsx`, `src/styles.css`, `src/App.test.tsx`

**Interfaces:**
- `QuestionCard({ question, response, onChange }): JSX.Element` emits an answer and optional note.
- `AuditShell({ sections, activeSectionId, result, children, onSelect, onReset, onReport }): JSX.Element` renders navigation and global actions.

- [ ] **Step 1: Write failing interaction tests**

```tsx
await user.click(screen.getByRole('button', { name: /No$/i }));
expect(screen.getByText(/1\/4/i)).toBeInTheDocument();
await user.click(screen.getByRole('button', { name: /Billing and charge capture/i }));
expect(screen.getByRole('heading', { name: /Billing and charge capture/i })).toBeInTheDocument();
```

- [ ] **Step 2: Verify failure**

Run: `npm test -- --run src/App.test.tsx`
Expected: FAIL because the audit controls and sidebar do not exist.

- [ ] **Step 3: Implement the reference-inspired UI**

Use a navy/near-black background, compact gold brand accent, green/yellow/orange/red answer state, severity badges, a completion indicator, section counts, and a confirmation before Reset. Keep options as accessible buttons with `aria-pressed`.

- [ ] **Step 4: Verify workspace behaviors and build**

Run: `npm test -- --run src/App.test.tsx; npm run build`
Expected: PASS and production build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components src/App.tsx src/styles.css src/App.test.tsx
git commit -m "feat: build self-audit workspace"
```

### Task 5: Build the report and complete quality verification

**Files:**
- Create: `src/components/Report.tsx`
- Modify: `src/App.tsx`, `src/App.test.tsx`, `src/styles.css`

**Interfaces:**
- `Report({ result }): JSX.Element` renders risk bands, â‚¹ range, actions, growth recommendations, and disclaimer.

- [ ] **Step 1: Write failing report test**

```tsx
await user.click(screen.getByRole('button', { name: /View Report/i }));
expect(screen.getByRole('heading', { name: /Your audit report/i })).toBeInTheDocument();
expect(screen.getByText(/Indicative screening range/i)).toBeInTheDocument();
```

- [ ] **Step 2: Verify failure**

Run: `npm test -- --run src/App.test.tsx`
Expected: FAIL because no report is rendered.

- [ ] **Step 3: Implement report composition**

Render a department summary, sorted critical/high gaps, 30/60/90-day actions, patient-growth recommendations, and the statement: â€œThis is a self-assessment screening range and must be validated against hospital records.â€

- [ ] **Step 4: Run full verification**

Run: `npm test -- --run; npm run build`
Expected: all tests pass and Vite produces `dist/`.

- [ ] **Step 5: Manually inspect responsive preview**

Run: `npm run dev`
Expected: local preview is available at `http://localhost:5173`; verify question selection, persistence after refresh, reset confirmation, and report visibility at desktop and tablet width.

- [ ] **Step 6: Commit**

```bash
git add src/components/Report.tsx src/App.tsx src/App.test.tsx src/styles.css
git commit -m "feat: add audit report and growth actions"
```

