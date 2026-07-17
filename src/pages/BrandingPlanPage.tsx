const STEPS = [
  {
    num: 1,
    title: 'Define Your Clinic Identity',
    detail: 'Mission, values, unique strengths, ideal patient',
  },
  {
    num: 2,
    title: 'Build a Strong Visual Identity',
    detail: 'Logo, color palette, typography, clean design',
  },
  {
    num: 3,
    title: 'Create a Clear Brand Message',
    detail: 'Value proposition, patient-first communication',
  },
  {
    num: 4,
    title: 'Build a Trusted Online Presence',
    detail: 'Website, services, timings, booking, Google Business',
  },
  {
    num: 5,
    title: 'Deliver a Superior Patient Experience',
    detail: 'Easy appointments, short waits, follow-ups',
  },
  {
    num: 6,
    title: 'Build Trust & Social Proof',
    detail: 'Reviews, real stories, results, social media',
  },
  {
    num: 7,
    title: 'Measure, Improve & Grow',
    detail: 'Track metrics, continuous improvement, expansion',
  },
];

const CHECKLIST = [
  'Logo & signage',
  'Website & booking',
  'Prescription pads',
  'Staff ID cards',
  'Patient education materials',
  'Reception branding',
  'Social media presence',
  'Follow-up communication',
];

const TOUCHPOINTS = [
  { icon: '🏥', label: 'Clinic Signage' },
  { icon: '🌐', label: 'Website' },
  { icon: '📋', label: 'Prescriptions' },
  { icon: '🛎️', label: 'Reception' },
  { icon: '👥', label: 'Staff Behavior' },
  { icon: '💬', label: 'Communication' },
  { icon: '📱', label: 'Social Media' },
  { icon: '🔔', label: 'Patient Follow-up' },
];

const TONE = [
  { label: 'Empathetic', desc: 'Understand patient concerns first' },
  { label: 'Professional', desc: 'Clinical credibility in every touch' },
  { label: 'Transparent', desc: 'Clear pricing and expectations' },
  { label: 'Accessible', desc: 'Easy to reach and understand' },
  { label: 'Outcome-Focused', desc: 'Measure and communicate results' },
];

const OUTCOMES = [
  {
    icon: '🤝',
    title: 'More Trust',
    desc: 'Branding + accreditation signals quality',
  },
  {
    icon: '📈',
    title: 'More Patients',
    desc: 'A trusted brand attracts more enquiries',
  },
  {
    icon: '🔄',
    title: 'Higher Retention',
    desc: 'Systems and follow-ups keep patients returning',
  },
  {
    icon: '💚',
    title: 'Better Outcomes',
    desc: 'Quality care standards improve results',
  },
  {
    icon: '🌱',
    title: 'Sustainable Growth',
    desc: 'Long-term growth via trust and systems',
  },
];

const PILLARS = [
  { icon: '🛡️', label: 'Build Trust' },
  { icon: '👥', label: 'Attract More Patients' },
  { icon: '📊', label: 'Grow Sustainably' },
  { icon: '⭐', label: 'Stand Out Always' },
];

export default function BrandingPlanPage() {
  return (
    <div className="page page--branding">
      <section className="hero hero--branding">
        <p className="eyebrow">BookMyClinics + accredready</p>
        <h1>
          Build a trusted. professional. world-class clinic.
        </h1>
        <p className="hero__lead">
          A step-by-step branding and growth plan for small clinics — backed by
          smart systems and accreditation excellence.
        </p>

        <div className="pillar-row">
          {PILLARS.map((p) => (
            <div key={p.label} className="pillar">
              <span className="pillar__icon" aria-hidden="true">
                {p.icon}
              </span>
              <span>{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="roadmap">
        <h2>World-class branding plan for small clinics</h2>
        <div className="roadmap__steps">
          {STEPS.map((step) => (
            <div key={step.num} className="roadmap-step">
              <span className="roadmap-step__num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="middle-grid">
        <article className="panel panel--blue">
          <h3>Your brand essentials checklist</h3>
          <ul className="checklist">
            {CHECKLIST.map((item) => (
              <li key={item}>
                <span className="checklist__mark" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel panel--teal">
          <h3>Clinic brand touchpoints</h3>
          <div className="touchpoint-grid">
            {TOUCHPOINTS.map((tp) => (
              <div key={tp.label} className="touchpoint">
                <span className="touchpoint__icon" aria-hidden="true">
                  {tp.icon}
                </span>
                <span>{tp.label}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel panel--purple">
          <h3>Brand tone guide</h3>
          <ul className="tone-list">
            {TONE.map((t) => (
              <li key={t.label}>
                <strong>{t.label}</strong>
                <span>{t.desc}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="accred-section">
        <div className="accred-box">
          <h3>Get accredited. Earn trust. Grow faster.</h3>
          <p>
            accredready simplifies clinic accreditation with gap analysis,
            documentation support, and a faster path to recognized quality
            standards.
          </p>
          <ul className="accred-list">
            <li>Gap analysis &amp; readiness assessment</li>
            <li>Documentation &amp; process templates</li>
            <li>Faster accreditation timeline</li>
            <li>Ongoing compliance support</li>
          </ul>
        </div>
      </section>

      <section className="combination">
        <h2>The powerful combination</h2>
        <p className="combination__lead">
          BookMyClinics + accredready = a stronger clinic brand that patients
          trust and recommend.
        </p>
        <div className="outcome-grid">
          {OUTCOMES.map((o) => (
            <div key={o.title} className="outcome-card">
              <span className="outcome-card__icon" aria-hidden="true">
                {o.icon}
              </span>
              <h4>{o.title}</h4>
              <p>{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__qr" aria-hidden="true">
          <div className="qr-placeholder">QR</div>
        </div>
        <p className="site-footer__tagline">
          Better Systems. Higher Standards. Stronger Brand. Greater Impact.
        </p>
        <div className="site-footer__logos">
          <span>BookMyClinics</span>
          <span>accredready</span>
        </div>
      </footer>
    </div>
  );
}
