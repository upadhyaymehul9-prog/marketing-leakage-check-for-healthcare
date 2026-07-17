import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('loads the Follow-up Reminder page by default', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {
      name: /from visit-based care to long-term patient revenue/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Follow-up Reminder System/i)).toBeInTheDocument();
});

test('navigates to the Clinic Branding Plan page', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(
    screen.getByRole('button', { name: /Clinic Branding Plan/i }),
  );

  expect(
    screen.getByRole('heading', {
      name: /build a trusted\. professional\. world-class clinic/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(/The powerful combination/i)).toBeInTheDocument();
  expect(screen.getByText(/World-class branding plan/i)).toBeInTheDocument();
});

test('navigates back to Follow-up Reminders', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(
    screen.getByRole('button', { name: /Clinic Branding Plan/i }),
  );
  await user.click(
    screen.getByRole('button', { name: /Follow-up Reminders/i }),
  );

  expect(screen.getByText(/Appointment reminders/i)).toBeInTheDocument();
  expect(screen.getByText(/No app required for patients/i)).toBeInTheDocument();
});
