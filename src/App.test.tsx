import { beforeEach, expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('shows the audit title', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /Revenue Leakage Self-Audit/i }),
  ).toBeInTheDocument();
});

test('selecting an answer updates the section completion count', async () => {
  const user = userEvent.setup();
  render(<App />);

  const firstCard = screen.getAllByRole('article')[0];
  await user.click(within(firstCard).getByRole('button', { name: /^No$/i }));

  // Active section (marketing) has 5 questions.
  const sidebarItem = screen.getByRole('button', {
    name: /Patient acquisition and marketing/i,
  });
  expect(within(sidebarItem).getByText(/1\/5/)).toBeInTheDocument();
});

test('switching sections shows the new section heading', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(
    screen.getByRole('button', { name: /Billing and charge capture/i }),
  );
  expect(
    screen.getByRole('heading', { name: /Billing and charge capture/i }),
  ).toBeInTheDocument();
});

test('responses persist across a remount', async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  const firstCard = screen.getAllByRole('article')[0];
  await user.click(within(firstCard).getByRole('button', { name: /^No$/i }));
  unmount();

  render(<App />);
  const reloadedCard = screen.getAllByRole('article')[0];
  expect(
    within(reloadedCard).getByRole('button', { name: /^No$/i }),
  ).toHaveAttribute('aria-pressed', 'true');
});

test('reset asks for confirmation before clearing responses', async () => {
  const user = userEvent.setup();
  render(<App />);

  const firstCard = screen.getAllByRole('article')[0];
  await user.click(within(firstCard).getByRole('button', { name: /^No$/i }));

  await user.click(screen.getByRole('button', { name: /^Reset$/i }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /Confirm reset/i }));

  const clearedCard = screen.getAllByRole('article')[0];
  expect(
    within(clearedCard).getByRole('button', { name: /^No$/i }),
  ).toHaveAttribute('aria-pressed', 'false');
});

test('report view renders from a partial audit', async () => {
  const user = userEvent.setup();
  render(<App />);

  const firstCard = screen.getAllByRole('article')[0];
  await user.click(within(firstCard).getByRole('button', { name: /^No$/i }));

  await user.click(screen.getByRole('button', { name: /View Report/i }));
  expect(
    screen.getByRole('heading', { name: /Your audit report/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Indicative screening range/i)).toBeInTheDocument();
});
