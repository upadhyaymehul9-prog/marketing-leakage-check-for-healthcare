import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { calculateAudit } from './lib/scoring';
import { AUDIT_SECTIONS } from './data/audit';
import { clearState, loadState, saveState, STORAGE_KEY } from './lib/storage';

beforeEach(() => {
  localStorage.clear();
});

test('shows the marketing health check page by default', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {
      name: /Hospital Marketing Health Check/i,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /Marketing Health/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /Brand Health/i }),
  ).toBeInTheDocument();
});

test('navigates to the brand health page', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: /^Brand Health$/i }));

  expect(
    screen.getByRole('heading', {
      name: /Hospital Brand Health Check/i,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /Clinic identity & positioning/i }),
  ).toBeInTheDocument();
});

test('shows detailed audit evidence hints on questions', () => {
  render(<App />);
  expect(screen.getAllByText(/Evidence to check:/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Audit objective:/i)).toBeInTheDocument();
});

test('selecting an answer updates section completion', async () => {
  const user = userEvent.setup();
  render(<App />);

  const card = screen.getAllByRole('article')[0];
  await user.click(within(card).getByRole('button', { name: /^No$/i }));

  const item = screen.getByRole('button', {
    name: /Lead intake & response/i,
  });
  expect(within(item).getByText(/1\/7/)).toBeInTheDocument();
});

test('report shows marketing and brand health scores', async () => {
  const user = userEvent.setup();
  render(<App />);

  const card = screen.getAllByRole('article')[0];
  await user.click(within(card).getByRole('button', { name: /^No$/i }));

  await user.click(screen.getByRole('button', { name: /View Report/i }));

  expect(
    screen.getByRole('heading', {
      name: /Your marketing & brand health report/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getAllByText(/^Marketing health$/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/^Brand health$/i).length).toBeGreaterThan(0);
});

test('does not mention BookMyClinics or accredready', () => {
  render(<App />);
  expect(screen.queryByText(/BookMyClinics/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/accredready/i)).not.toBeInTheDocument();
});

describe('calculateAudit', () => {
  test('documented control yields Strong health', () => {
    const section = AUDIT_SECTIONS[0];
    const q = section.questions[0];
    const result = calculateAudit(AUDIT_SECTIONS, {
      [q.id]: { answer: 'evidence', updatedAt: 0 },
    });
    expect(result.overallHealth).toBe('Strong');
  });

  test('missing critical control yields Critical health', () => {
    const q = AUDIT_SECTIONS[0].questions[0];
    const result = calculateAudit(AUDIT_SECTIONS, {
      [q.id]: { answer: 'no', updatedAt: 0 },
    });
    expect(result.overallHealth).toBe('Critical');
  });
});

describe('storage', () => {
  test('returns blank state for malformed JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{bad');
    expect(loadState().responses).toEqual({});
  });

  test('round-trips responses', () => {
    saveState({
      version: 1,
      responses: { 'acq-lead-response': { answer: 'partial', updatedAt: 1 } },
      updatedAt: 1,
    });
    expect(loadState().responses['acq-lead-response']?.answer).toBe('partial');
    clearState();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
