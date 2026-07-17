type Page = 'reminders' | 'branding';

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  showAccredready?: boolean;
}

export default function Header({
  activePage,
  onNavigate,
  showAccredready = false,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand-lockup">
          <div className="brand-logo">
            <span className="brand-logo__icon" aria-hidden="true">
              +
            </span>
            <div>
              <strong className="brand-logo__name">BookMyClinics</strong>
              <span className="brand-logo__tagline">Smart Clinic. Stronger Care.</span>
            </div>
          </div>
          {showAccredready && (
            <div className="brand-partner">
              <span className="brand-partner__plus">+</span>
              <div>
                <strong className="brand-partner__name">accredready</strong>
                <span className="brand-partner__tagline">
                  Accreditation. Simplified.
                </span>
              </div>
            </div>
          )}
        </div>

        <nav className="site-nav" aria-label="Main">
          <button
            type="button"
            className={`site-nav__link ${activePage === 'reminders' ? 'is-active' : ''}`}
            onClick={() => onNavigate('reminders')}
          >
            Follow-up Reminders
          </button>
          <button
            type="button"
            className={`site-nav__link ${activePage === 'branding' ? 'is-active' : ''}`}
            onClick={() => onNavigate('branding')}
          >
            Clinic Branding Plan
          </button>
        </nav>
      </div>
    </header>
  );
}
