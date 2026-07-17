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
 * Questions from BookMyClinics infographics plus proven healthcare marketing
 * practices (MIT/InsideSales lead-response research, HFMA/Kaufman Hall
 * patient-centric metrics, Google local SEO & review velocity, WhatsApp
 * automation case studies in India, and published PAC/LTV benchmarks).
 */
export const AUDIT_SECTIONS: AuditSection[] = [
  {
    id: 'acquisition',
    name: 'Patient acquisition & marketing',
    description:
      'How effectively your clinic turns enquiries into booked, attending patients — the foundation of every successful campaign.',
    icon: 'MK',
    theme: 'marketing',
    questions: [
      {
        id: 'acq-lead-response',
        text: 'Are inbound enquiries (calls, WhatsApp, web forms) contacted within 5 minutes during working hours?',
        severity: 'Critical',
        explanation:
          'MIT/InsideSales research found contacting a web lead in 5 vs 30 minutes raises contact odds ~100× and qualification odds ~21×. Indian clinic campaigns report conversion collapsing when WhatsApp replies exceed ~5 minutes.',
        recommendation:
          'Set a ≤5-minute first-response SLA, route all leads to a shared inbox, and use WhatsApp Business auto-ack + live follow-up.',
        owner: 'Front office / marketing lead',
        source: 'marketing',
      },
      {
        id: 'acq-missed-call',
        text: 'Is there a documented missed-call / after-hours recovery workflow (callback list, WhatsApp reply, or IVR)?',
        severity: 'Critical',
        explanation:
          'Most healthcare searches still end in a phone call. Missed calls are a primary leak between paid/organic demand and booked appointments.',
        recommendation:
          'Log every missed call, auto-SMS/WhatsApp a callback link, and clear the list within one business hour.',
        owner: 'Front office lead',
        source: 'marketing',
      },
      {
        id: 'acq-conversion',
        text: 'Do you track enquiry → contacted → booked → attended conversion rates by channel?',
        severity: 'Critical',
        explanation:
          'Industry funnels often convert only ~11% of digital leads to patients. Stage-by-stage tracking shows where campaigns leak (contact, booking, or show-up).',
        recommendation:
          'Define the four funnel stages in your CRM/HMS and review conversion weekly by Google, Meta, WhatsApp, referral, and walk-in.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'acq-call-scripts',
        text: 'Are front-desk staff trained on a standard call/WhatsApp booking script with measured booking rates?',
        severity: 'High',
        explanation:
          'Call-to-appointment conversion varies widely by staff member. Scripting and coaching close the gap between enquiry and booked visit.',
        recommendation:
          'Write a short booking script, role-play weekly, and track each agent’s enquiry-to-book rate.',
        owner: 'Front office lead',
        source: 'marketing',
      },
      {
        id: 'acq-referral',
        text: 'Are referral sources and campaign-to-appointment ROI measured?',
        severity: 'High',
        explanation:
          'Untracked referrals and campaigns hide which relationships and spend actually produce patients.',
        recommendation:
          'Attribute each booking to a source and review cost-per-appointment monthly.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'acq-gbp',
        text: 'Is your Google Business Profile complete (photos, services, hours, categories) and actively managed?',
        severity: 'Critical',
        explanation:
          'Google Search + Maps and online reputation now drive the majority of new-patient discovery for most practices. Incomplete profiles rarely rank in the local map pack.',
        recommendation:
          'Complete every GBP field, add specialty photos weekly, and keep hours/services accurate.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'acq-directories',
        text: 'Are doctor and clinic listings current on major discovery platforms (e.g. Practo, Justdial, Lybrate) with consistent NAP data?',
        severity: 'Medium',
        explanation:
          'In India, patients discover hospitals across Google and healthcare directories. Inconsistent name/address/phone (NAP) hurts local SEO and trust.',
        recommendation:
          'Audit top directories quarterly; match name, address, phone, and doctor profiles to your website.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'campaigns',
    name: 'Campaign performance & paid acquisition',
    description:
      'Whether marketing campaigns are built, measured, and optimized the way high-performing clinics do — not run on guesswork.',
    icon: 'CP',
    theme: 'marketing',
    questions: [
      {
        id: 'camp-landing',
        text: 'Do paid or specialty campaigns land on dedicated service pages (not the generic homepage)?',
        severity: 'Critical',
        explanation:
          'Homepages serve everyone and convert poorly. Proven campaigns use specialty landing pages with doctor profiles, conditions treated, insurance/cash info, and a clear book CTA.',
        recommendation:
          'Create one landing page per specialty or campaign offer with a single primary CTA (call / WhatsApp / book).',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'camp-pac',
        text: 'Do you calculate patient acquisition cost (PAC / CPA) by channel every month?',
        severity: 'Critical',
        explanation:
          'Practices that spend without PAC either under-invest or burn budget. Published benchmarks show PAC varies widely by specialty — only channel-level PAC reveals which campaigns are profitable.',
        recommendation:
          'Divide marketing spend by new patients attributed to each channel; review monthly and reallocate budget.',
        owner: 'Marketing / finance lead',
        source: 'marketing',
      },
      {
        id: 'camp-ltv',
        text: 'Do you estimate patient lifetime value (LTV) and compare it to PAC before scaling spend?',
        severity: 'High',
        explanation:
          'HFMA and Kaufman Hall urge health systems to use LTV, retention, and share-of-wallet — not visit volume alone. A higher PAC can still be profitable if LTV is strong.',
        recommendation:
          'Estimate average LTV by specialty (visits × margin over 1–3 years) and set a PAC ceiling (e.g. LTV ÷ 3 or better).',
        owner: 'Owner / finance lead',
        source: 'marketing',
      },
      {
        id: 'camp-call-tracking',
        text: 'Do you use call tracking (or WhatsApp click tracking) so phone bookings are attributed to the right campaign?',
        severity: 'High',
        explanation:
          'A large share of healthcare conversions still happen by phone. Without call tracking, Google/Meta ROI is understated and weak campaigns look strong.',
        recommendation:
          'Add unique tracking numbers or UTM-tagged WhatsApp links per campaign and match them to bookings.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'camp-segmentation',
        text: 'Are campaigns segmented by specialty or intent (e.g. cardiology vs orthopaedics) rather than one generic hospital ad?',
        severity: 'High',
        explanation:
          'Patient journeys differ by specialty. Hyderabad and multi-specialty case studies show specialty-specific ads + landing pages lift bookings and lower cost per patient.',
        recommendation:
          'Split Google/Meta campaigns by specialty with matching keywords, creatives, and landing pages.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'camp-hygiene',
        text: 'Do you maintain negative keywords, exclude irrelevant searches, and pause underperforming ads on a fixed schedule?',
        severity: 'Medium',
        explanation:
          'Without campaign hygiene, budget leaks to irrelevant clicks. High-performing clinics review search terms and pause losers weekly.',
        recommendation:
          'Weekly search-term review: add negatives, pause low-converting ads, and raise bids on proven terms.',
        owner: 'Marketing lead / agency',
        source: 'marketing',
      },
      {
        id: 'camp-whatsapp-ads',
        text: 'If you run digital ads in India, do you offer Click-to-WhatsApp (or equivalent low-friction chat) as a primary CTA?',
        severity: 'Medium',
        explanation:
          'Indian patients often prefer messaging over web forms. Click-to-WhatsApp ads plus fast replies are a proven conversion path in hospital growth case studies.',
        recommendation:
          'Use WhatsApp as a campaign CTA with a ≤5-minute reply SLA and saved reply templates for common queries.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'retention',
    name: 'Follow-up & retention systems',
    description:
      'Whether you move from visit-based care to structured long-term patient relationships — retention is usually cheaper than acquisition.',
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
        text: 'Are appointment reminders sent automatically at least twice (e.g. ~72 hours and ~24 hours before)?',
        severity: 'Critical',
        explanation:
          'Two-touch automated reminders (text + email/WhatsApp) typically cut no-show rates from the mid-teens toward ~8–12% in published practice playbooks.',
        recommendation:
          'Automate SMS/WhatsApp reminders at 72h and 24h (plus same-day if needed); enable easy reschedule.',
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
        text: 'Do you measure no-show rate and run a recovery workflow for missed appointments?',
        severity: 'High',
        explanation:
          'No-shows waste capacity. Best practice combines measurement, reminders, a clear cancellation policy, and same-day slots for reschedules.',
        recommendation:
          'Track no-show % monthly; auto-rebook missed visits and reserve same-day fill slots.',
        owner: 'Front office lead',
        source: 'marketing',
      },
      {
        id: 'ret-recall',
        text: 'Do you run automated recall campaigns for annual check-ups, birthdays, or gap-in-care patients?',
        severity: 'High',
        explanation:
          'Retention is typically far cheaper than acquisition. Playbooks treat recall and gap-in-care outreach as core acquisition levers — every retained patient also fuels referrals and reviews.',
        recommendation:
          'Segment the patient list for overdue visits and send scheduled WhatsApp/SMS recall campaigns.',
        owner: 'Marketing / clinical lead',
        source: 'marketing',
      },
      {
        id: 'ret-churn',
        text: 'Do you track patient retention / churn (e.g. % of patients with a return visit in 6–12 months)?',
        severity: 'High',
        explanation:
          'HFMA and Kaufman Hall highlight retention and share-of-wallet as consumer-centric metrics that visit volume alone cannot show.',
        recommendation:
          'Define “active patient” and report 6- and 12-month retention monthly; act on the top churn segments.',
        owner: 'Owner / marketing lead',
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
      'Step 3–4: clear messaging and a trusted digital front door that converts searchers into bookings.',
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
          'Most healthcare searches happen on mobile. ~77% of people use search engines before booking a provider; a slow or thin site loses that intent.',
        recommendation:
          'Ensure the site loads fast on mobile with services, timings, maps, and click-to-call / WhatsApp.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'on-booking',
        text: 'Can patients book appointments online or via WhatsApp with minimal form fields?',
        severity: 'Critical',
        explanation:
          'Roughly 60% of consumers prefer online booking where available. Reducing form fields (e.g. from many to a few) is a proven conversion lift.',
        recommendation:
          'Offer online or WhatsApp booking asking only for essentials; put the CTA on every page.',
        owner: 'Front office / marketing',
        source: 'branding',
      },
      {
        id: 'on-doctor-profiles',
        text: 'Does each doctor have an optimized online profile (website + Google) with specialty, photo, and booking link?',
        severity: 'High',
        explanation:
          'Patients search for named doctors and specialties. Hospital SEO case studies show doctor-profile SEO and individual Google listings drive qualified OPD enquiries.',
        recommendation:
          'Publish a complete profile per doctor with credentials, conditions treated, and a booking CTA.',
        owner: 'Marketing lead',
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
      'Step 5–6: the in-clinic experience and trust signals that turn patients into reviews and referrals.',
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
        text: 'Do you systematically request Google reviews after visits and respond to every review within 24–48 hours?',
        severity: 'Critical',
        explanation:
          '70%+ of patients consult reviews before choosing a provider; 79% expect a response within 24 hours. Review quantity, recency, and rating heavily influence map-pack ranking.',
        recommendation:
          'Automate a post-visit review invite (WhatsApp/SMS) and reply to all reviews within 48 hours.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'ex-review-timing',
        text: 'Are review requests sent soon after a positive visit (e.g. within ~2 hours) while satisfaction is highest?',
        severity: 'High',
        explanation:
          'Hyderabad and multi-specialty hospital case studies show post-visit SMS/WhatsApp review requests within hours drive high review velocity (e.g. 15–20+/week).',
        recommendation:
          'Trigger review invites from HMS discharge/OPD checkout within 2 hours for satisfied patients.',
        owner: 'Marketing / front office',
        source: 'branding',
      },
      {
        id: 'ex-nps',
        text: 'Do you run a short satisfaction / NPS survey before asking for a public Google review?',
        severity: 'High',
        explanation:
          'Practice playbooks use private feedback first: promoters get a review link; detractors are routed to recovery so issues are fixed before a public complaint.',
        recommendation:
          'Send a 1-question NPS; route 9–10 to Google review, 0–6 to a service recovery owner.',
        owner: 'Marketing / quality lead',
        source: 'branding',
      },
      {
        id: 'ex-stories',
        text: 'Do you share real patient stories or outcomes (with consent) on social media or your website?',
        severity: 'Medium',
        explanation:
          'Stories and physician-authored content lift mid-funnel trust more than generic ads.',
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
      'Step 7 plus accredready: measure what matters (including campaign ROI) and earn trust through standards.',
    icon: 'GR',
    theme: 'branding',
    questions: [
      {
        id: 'gr-metrics',
        text: 'Do you track a monthly marketing dashboard (enquiries, bookings, PAC, no-shows, reviews, retention)?',
        severity: 'Critical',
        explanation:
          'Data-driven clinics reallocate spend to channels that produce patients. Guesswork campaigns cannot prove ROI.',
        recommendation:
          'Publish a one-page monthly dashboard with acquisition, conversion, reputation, and retention KPIs.',
        owner: 'Owner / marketing lead',
        source: 'branding',
      },
      {
        id: 'gr-reallocate',
        text: 'Do you reallocate marketing budget quarterly based on PAC and conversion data (not only ad impressions)?',
        severity: 'High',
        explanation:
          'Playbooks treat PAC analysis and channel reallocation as a recurring operating rhythm — not a one-time campaign launch.',
        recommendation:
          'Each quarter, cut the bottom-performing channel and scale the top performer within PAC limits.',
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
