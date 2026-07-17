import type { AnswerValue, AuditSection } from '../types';

export const ANSWER_LABELS: Record<AnswerValue, string> = {
  evidence: 'Yes — evidence available',
  undocumented: 'Yes — not documented',
  partial: 'Partial',
  no: 'No',
  na: 'Not applicable',
};

export const ANSWER_ORDER: AnswerValue[] = [
  'evidence',
  'undocumented',
  'partial',
  'no',
  'na',
];

/**
 * Questions derived from the two BookMyClinics infographics:
 * 1) Follow-up / visit-to-revenue (marketing & retention systems)
 * 2) World-class clinic branding plan (+ accredready)
 */
export const AUDIT_SECTIONS: AuditSection[] = [
  {
    id: 'acquisition',
    name: 'Patient acquisition & marketing',
    description:
      'How effectively your clinic turns enquiries into booked, attending patients.',
    icon: 'MK',
    theme: 'marketing',
    questions: [
      {
        id: 'acq-lead-response',
        text: 'Are inbound enquiries (calls, WhatsApp, web forms) responded to within 15 minutes during working hours?',
        severity: 'Critical',
        explanation:
          'Slow first response is the largest source of lost, ready-to-book patients.',
        recommendation:
          'Set a 15-minute response SLA and route all enquiries to a shared inbox with daily follow-up.',
        owner: 'Front office / marketing lead',
        source: 'marketing',
      },
      {
        id: 'acq-conversion',
        text: 'Do you track enquiry-to-appointment conversion rate by channel?',
        severity: 'High',
        explanation:
          'Without conversion tracking you cannot see where marketing spend is wasted.',
        recommendation:
          'Log every enquiry and outcome; review conversion weekly by source.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'acq-referral',
        text: 'Are referral sources and campaign-to-appointment ROI measured?',
        severity: 'High',
        explanation:
          'Untracked referrals hide which relationships and campaigns actually produce patients.',
        recommendation:
          'Attribute each booking to a source and review cost-per-appointment monthly.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'acq-gbp',
        text: 'Is your Google Business Profile complete, current, and actively managed for reviews?',
        severity: 'Medium',
        explanation:
          'A weak local profile suppresses discovery by nearby patients searching online.',
        recommendation:
          'Keep hours and services current, request reviews after visits, reply to every review.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'retention',
    name: 'Follow-up & retention systems',
    description:
      'Whether you move from visit-based care to structured long-term patient relationships.',
    icon: 'RT',
    theme: 'marketing',
    questions: [
      {
        id: 'ret-chronic',
        text: 'Do you run structured chronic-care programs (diabetes, hypertension, thyroid, asthma, cardiac)?',
        severity: 'Critical',
        explanation:
          'Unstructured care plans lead to missed follow-ups and lost lifetime patient value.',
        recommendation:
          'Define recall intervals and care pathways for each chronic condition you treat.',
        owner: 'Clinical lead',
        source: 'marketing',
      },
      {
        id: 'ret-progress',
        text: 'Do you track patient progress over time — not just individual appointment dates?',
        severity: 'High',
        explanation:
          'Without progress tracking, drop-offs go unnoticed until patients stop returning.',
        recommendation:
          'Review chronic panels on a schedule and flag patients who miss milestones.',
        owner: 'Clinical lead',
        source: 'marketing',
      },
      {
        id: 'ret-reminders',
        text: 'Are appointment reminders sent automatically (e.g. 3 days, 1 day, and same day)?',
        severity: 'Critical',
        explanation:
          'Manual reminder calls do not scale and no-shows waste capacity.',
        recommendation:
          'Automate SMS/WhatsApp reminders at three intervals before each appointment.',
        owner: 'Front office lead',
        source: 'marketing',
      },
      {
        id: 'ret-bloodtest',
        text: 'Are patients reminded about required blood tests or investigations before appointments?',
        severity: 'High',
        explanation:
          'Patients who arrive unprepared delay care and often need repeat visits.',
        recommendation:
          'Send automated pre-visit instructions listing required tests and fasting rules.',
        owner: 'Front office / lab desk',
        source: 'marketing',
      },
      {
        id: 'ret-noshow',
        text: 'Do you measure and actively work to reduce appointment no-shows?',
        severity: 'Medium',
        explanation: 'No-shows are silent revenue and reputation loss.',
        recommendation:
          'Track no-show rate monthly and use confirmation plus reminder workflows.',
        owner: 'Front office lead',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'identity',
    name: 'Clinic identity & visual brand',
    description:
      'Step 1–2 of the branding plan: who you are and how you look to patients.',
    icon: 'ID',
    theme: 'branding',
    questions: [
      {
        id: 'id-mission',
        text: 'Are your clinic mission, values, and ideal patient profile written and shared with staff?',
        severity: 'High',
        explanation:
          'Without a defined identity, every team member communicates a different message.',
        recommendation:
          'Document mission, values, and ideal patient; brief all staff quarterly.',
        owner: 'Medical director / owner',
        source: 'branding',
      },
      {
        id: 'id-logo',
        text: 'Do you have a consistent logo, colour palette, and typography used across all materials?',
        severity: 'High',
        explanation:
          'Inconsistent visuals make a clinic look unprofessional and forgettable.',
        recommendation:
          'Create a one-page brand guide and audit all printed and digital touchpoints.',
        owner: 'Owner / admin lead',
        source: 'branding',
      },
      {
        id: 'id-signage',
        text: 'Is clinic signage (exterior, reception, wayfinding) professional and on-brand?',
        severity: 'Medium',
        explanation: 'Signage is the first brand impression before a patient enters.',
        recommendation:
          'Audit signage for clarity, lighting, and brand consistency.',
        owner: 'Admin / facilities',
        source: 'branding',
      },
      {
        id: 'id-materials',
        text: 'Are prescriptions, ID cards, and patient education materials branded consistently?',
        severity: 'Medium',
        explanation:
          'Every branded item reinforces trust and recall between visits.',
        recommendation:
          'Standardise templates for prescriptions, handouts, and staff ID.',
        owner: 'Admin lead',
        source: 'branding',
      },
    ],
  },
  {
    id: 'online',
    name: 'Brand message & online presence',
    description:
      'Step 3–4: clear messaging and a trusted digital front door.',
    icon: 'ON',
    theme: 'branding',
    questions: [
      {
        id: 'on-message',
        text: 'Is your value proposition (why patients should choose you) clear on your website and social media?',
        severity: 'High',
        explanation:
          'Patients compare clinics online before they call; vague messaging loses them.',
        recommendation:
          'Write one sentence on what makes you different and place it above the fold.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'on-website',
        text: 'Do you have a mobile-friendly website listing services, doctor profiles, timings, and location?',
        severity: 'Critical',
        explanation:
          'Most patients discover clinics on mobile; a poor site signals poor care.',
        recommendation:
          'Ensure the site loads fast on mobile with services, timings, and click-to-call.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'on-booking',
        text: 'Can patients book appointments online or via WhatsApp without friction?',
        severity: 'High',
        explanation:
          'Every extra step between intent and booking increases drop-off.',
        recommendation:
          'Add online booking or a one-tap WhatsApp booking link on all channels.',
        owner: 'Front office / marketing',
        source: 'branding',
      },
      {
        id: 'on-tone',
        text: 'Is patient communication empathetic, professional, transparent, and outcome-focused?',
        severity: 'Medium',
        explanation:
          'Brand tone is felt in every call, message, and front-desk interaction.',
        recommendation:
          'Train staff on the five tone pillars and spot-check calls monthly.',
        owner: 'Front office lead',
        source: 'branding',
      },
    ],
  },
  {
    id: 'experience',
    name: 'Patient experience & social proof',
    description:
      'Step 5–6: the in-clinic experience and trust signals patients share.',
    icon: 'EX',
    theme: 'branding',
    questions: [
      {
        id: 'ex-appointments',
        text: 'Is the appointment process easy (short hold times, clear next steps, minimal paperwork)?',
        severity: 'High',
        explanation:
          'Friction at booking or registration drives patients to competitors.',
        recommendation:
          'Map the patient journey and remove one friction point per month.',
        owner: 'Front office lead',
        source: 'branding',
      },
      {
        id: 'ex-wait',
        text: 'Are wait times monitored and managed to avoid patients leaving without being seen?',
        severity: 'High',
        explanation:
          'Long waits damage reputation and reduce return visits.',
        recommendation:
          'Display expected wait times and track walkouts weekly.',
        owner: 'OPD manager',
        source: 'branding',
      },
      {
        id: 'ex-reviews',
        text: 'Do you systematically request, respond to, and learn from patient reviews?',
        severity: 'Critical',
        explanation:
          'Reviews are the strongest social proof for new patients choosing a clinic.',
        recommendation:
          'Request reviews after positive visits and respond to every review within 48 hours.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'ex-stories',
        text: 'Do you share real patient stories or outcomes (with consent) on social media or your website?',
        severity: 'Medium',
        explanation:
          'Stories build emotional trust that logos and ads alone cannot.',
        recommendation:
          'Collect one consented success story per month for social and web.',
        owner: 'Marketing lead',
        source: 'branding',
      },
    ],
  },
  {
    id: 'growth',
    name: 'Growth, measurement & accreditation',
    description:
      'Step 7 plus accredready: measure what matters and earn trust through standards.',
    icon: 'GR',
    theme: 'branding',
    questions: [
      {
        id: 'gr-metrics',
        text: 'Do you track key marketing metrics (enquiries, bookings, no-shows, reviews, re-visit rate)?',
        severity: 'Critical',
        explanation:
          'What is not measured cannot improve — clinics guess instead of growing.',
        recommendation:
          'Build a monthly dashboard with five core marketing and retention KPIs.',
        owner: 'Owner / marketing lead',
        source: 'branding',
      },
      {
        id: 'gr-touchpoints',
        text: 'Are all eight brand touchpoints consistent (signage, website, prescriptions, reception, staff, communication, social, follow-up)?',
        severity: 'High',
        explanation:
          'Inconsistency across touchpoints erodes the brand you invest in elsewhere.',
        recommendation:
          'Audit all eight touchpoints quarterly against your brand guide.',
        owner: 'Admin / marketing lead',
        source: 'branding',
      },
      {
        id: 'gr-improve',
        text: 'Do you run a structured quarterly review to improve marketing and patient experience?',
        severity: 'Medium',
        explanation:
          'Continuous improvement separates growing clinics from stagnant ones.',
        recommendation:
          'Hold a quarterly brand and marketing review with action owners assigned.',
        owner: 'Owner',
        source: 'branding',
      },
      {
        id: 'gr-accreditation',
        text: 'Have you assessed clinic accreditation readiness (quality standards, documentation, processes)?',
        severity: 'Medium',
        explanation:
          'Accreditation signals trust and differentiates your clinic in a crowded market.',
        recommendation:
          'Run a gap analysis against accreditation standards with accredready or similar.',
        owner: 'Medical director / quality lead',
        source: 'branding',
      },
    ],
  },
];
