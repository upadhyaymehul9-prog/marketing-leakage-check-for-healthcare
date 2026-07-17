import { useState } from 'react';
import Header from './components/Header';
import FollowUpReminderPage from './pages/FollowUpReminderPage';
import BrandingPlanPage from './pages/BrandingPlanPage';

type Page = 'reminders' | 'branding';

export default function App() {
  const [page, setPage] = useState<Page>('reminders');

  return (
    <div className="app">
      <Header
        activePage={page}
        onNavigate={setPage}
        showAccredready={page === 'branding'}
      />
      <main>
        {page === 'reminders' ? (
          <FollowUpReminderPage />
        ) : (
          <BrandingPlanPage />
        )}
      </main>
    </div>
  );
}
