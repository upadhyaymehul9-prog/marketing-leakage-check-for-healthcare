export default function FollowUpReminderPage() {
  return (
    <div className="page page--reminders">
      <section className="hero hero--reminders">
        <p className="eyebrow">BookMyClinics</p>
        <h1>From visit-based care to long-term patient revenue</h1>
        <p className="hero__lead">
          Move beyond one-off appointments. Build structured follow-up, recall, and
          retention systems that keep patients engaged in their care journey.
        </p>
      </section>

      <section className="three-col-grid">
        <article className="info-card info-card--pain">
          <h2>Where clinics lose revenue today</h2>
          <ul className="icon-list icon-list--warn">
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                ✕
              </span>
              Missed follow-ups
            </li>
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                ✕
              </span>
              Unstructured care plans
            </li>
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                ✕
              </span>
              Low procedure conversion
            </li>
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                ✕
              </span>
              Poor recall systems
            </li>
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                ✕
              </span>
              Weak retention of lifetime patient value
            </li>
          </ul>
        </article>

        <article className="info-card info-card--success">
          <h2>What successful clinics do</h2>
          <ul className="icon-list icon-list--check">
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                ✓
              </span>
              Structured chronic care programs (diabetes, hypertension, thyroid,
              asthma, cardiac)
            </li>
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                ✓
              </span>
              Track patient progress over time — not just appointment dates
            </li>
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                ✓
              </span>
              Reliable follow-up automation
            </li>
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                ✓
              </span>
              Reviews &amp; investigations reminders (blood tests, scans)
            </li>
          </ul>
        </article>

        <article className="info-card info-card--outcome">
          <h2>Patient outcomes you unlock</h2>
          <ul className="icon-list icon-list--arrow">
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                →
              </span>
              Patients return for follow-ups on time
            </li>
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                →
              </span>
              Patients complete investigations
            </li>
            <li>
              <span className="icon-list__icon" aria-hidden="true">
                →
              </span>
              Patients stay engaged in long-term treatment plans
            </li>
          </ul>
        </article>
      </section>

      <section className="feature-banner">
        <div className="feature-banner__header">
          <span className="feature-banner__badge">Core module</span>
          <h2>Follow-up Reminder System</h2>
          <p>
            Automated reminders built for clinics and hospitals — so your team
            spends less time chasing patients and more time delivering care.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-tile">
            <span className="feature-tile__icon" aria-hidden="true">
              🔔
            </span>
            <h3>Appointment reminders</h3>
            <p>3 days before · 1 day before · Same day</p>
          </div>
          <div className="feature-tile">
            <span className="feature-tile__icon" aria-hidden="true">
              🩸
            </span>
            <h3>Blood test reminders</h3>
            <p>Automatic alerts before the appointment</p>
          </div>
          <div className="feature-tile">
            <span className="feature-tile__icon" aria-hidden="true">
              📅
            </span>
            <h3>Follow-up mapping</h3>
            <p>Structured recall for chronic care programs</p>
          </div>
          <div className="feature-tile feature-tile--highlight">
            <span className="feature-tile__icon" aria-hidden="true">
              📱
            </span>
            <h3>No app required for patients</h3>
            <p>SMS, WhatsApp, or email — zero friction</p>
          </div>
          <div className="feature-tile feature-tile--highlight">
            <span className="feature-tile__icon" aria-hidden="true">
              👤
            </span>
            <h3>No account creation required</h3>
            <p>Patients are recognized without a portal signup</p>
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <p>
          Turn every visit into a relationship. BookMyClinics helps your clinic
          retain patients, complete care pathways, and grow sustainably.
        </p>
        <button type="button" className="btn btn--primary">
          Get started with BookMyClinics
        </button>
      </section>
    </div>
  );
}
