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
 * Detailed hospital marketing & brand health audit.
 * Each control has severity, control area, and evidence the auditor should request.
 */
export const AUDIT_SECTIONS: AuditSection[] = [
  // ─── MARKETING PAGE ───────────────────────────────────────────────
  {
    id: 'digital-presence',
    name: 'Digital presence foundation',
    description:
      'Whether the hospital exists and is findable online — the starting gate for every marketing campaign.',
    objective:
      'Confirm the hospital has a basic, active digital presence before assessing advanced marketing controls.',
    icon: 'DP',
    theme: 'marketing',
    questions: [
      {
        id: 'dp-has-presence',
        text: 'Do you have a digital presence?',
        severity: 'Critical',
        controlArea: 'Digital presence',
        evidenceHint:
          'Live website URL and/or Google Business Profile link and/or WhatsApp Business number that patients can reach today.',
        explanation:
          'Without an active digital presence, paid ads, SEO, reviews, and online booking have nowhere to land. This is the first control in the marketing audit.',
        recommendation:
          'Establish at least: a mobile-friendly website or landing page, a claimed Google Business Profile, and a business WhatsApp/phone channel patients can use.',
        owner: 'Owner / marketing lead',
        source: 'marketing',
      },
      {
        id: 'dp-website',
        text: 'Does the hospital have a live website (or dedicated landing page) that loads on mobile?',
        severity: 'Critical',
        controlArea: 'Website existence',
        evidenceHint:
          'Open the URL on a phone; confirm services, contact, and location are visible.',
        recommendation:
          'Publish a simple mobile site with services, doctors, timings, address, and call/WhatsApp CTA.',
        owner: 'Marketing / web owner',
        source: 'marketing',
      },
      {
        id: 'dp-gbp',
        text: 'Is the hospital listed and claimed on Google Business Profile (Google Maps)?',
        severity: 'Critical',
        controlArea: 'Google Business Profile',
        evidenceHint:
          'GBP dashboard showing “Claimed” plus correct name, address, and phone.',
        recommendation:
          'Claim and verify GBP; complete hours, categories, photos, and services.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'dp-whatsapp',
        text: 'Can patients reach the hospital on WhatsApp Business (or an equivalent chat channel)?',
        severity: 'High',
        controlArea: 'Chat channel',
        evidenceHint:
          'WhatsApp Business profile link or QR that opens a working chat.',
        recommendation:
          'Set up WhatsApp Business with greeting, hours, and a monitored inbox.',
        owner: 'Front office / marketing',
        source: 'marketing',
      },
      {
        id: 'dp-consistent-nap',
        text: 'Are hospital name, address, and phone consistent across website, Google, and major listings?',
        severity: 'High',
        controlArea: 'NAP consistency',
        evidenceHint:
          'Side-by-side check of name/address/phone on website vs GBP vs one directory.',
        recommendation:
          'Pick one official NAP and fix mismatches everywhere patients search.',
        owner: 'Admin / marketing',
        source: 'marketing',
      },
      {
        id: 'dp-findable',
        text: 'Can a new patient find the hospital by searching the hospital name or main specialty + city on Google?',
        severity: 'High',
        controlArea: 'Search findability',
        evidenceHint:
          'Incognito search results for hospital name and one “specialty + city” query.',
        recommendation:
          'Fix GBP, citations, and homepage title/meta so branded and specialty searches surface you.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'dp-domain-renewal',
        text: 'Is your website domain and hosting renewal on autopay or a monitored calendar reminder well before expiry?',
        severity: 'High',
        controlArea: 'Domain/hosting renewal',
        evidenceHint:
          'Registrar/hosting invoice showing autopay enabled, or a calendar reminder set at least 30 days before expiry.',
        explanation:
          'A lapsed domain or hosting plan takes the entire website — and any linked landing pages — offline until renewed. It is a common, entirely avoidable outage.',
        recommendation:
          'Enable autopay with a valid card on file, or set a calendar reminder at least 30 days before domain/hosting expiry with a named owner.',
        owner: 'Marketing / IT lead',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'lead-intake',
    name: 'Lead intake & response',
    description:
      'Speed, ownership, and recovery of every patient enquiry before it goes cold.',
    objective:
      'Confirm that every inbound lead is captured, owned, responded to within a proven SLA, and recovered if missed.',
    icon: 'LI',
    theme: 'marketing',
    questions: [
      {
        id: 'li-five-min',
        text: 'Are inbound enquiries (calls, WhatsApp, web forms) first-contacted within 5 minutes during working hours?',
        severity: 'Critical',
        controlArea: 'Speed-to-lead SLA',
        evidenceHint:
          'Sample 20 recent leads with timestamps: enquiry received → first human/bot reply.',
        explanation:
          'MIT/InsideSales research: contacting a web lead in 5 vs 30 minutes raises contact odds ~100× and qualification odds ~21×.',
        recommendation:
          'Enforce a ≤5-minute first-response SLA with a shared inbox and WhatsApp auto-ack + live follow-up.',
        owner: 'Front office / marketing lead',
        source: 'marketing',
      },
      {
        id: 'li-missed-call',
        text: 'Is there a documented missed-call and after-hours recovery workflow?',
        severity: 'Critical',
        controlArea: 'Missed-call recovery',
        evidenceHint:
          'Written SOP + last 7 days of missed-call log with callback outcomes.',
        explanation:
          'Most healthcare searches still end in a phone call; missed calls leak paid and organic demand.',
        recommendation:
          'Log every missed call, auto-SMS/WhatsApp a callback link, clear the list within one business hour.',
        owner: 'Front office lead',
        source: 'marketing',
      },
      {
        id: 'li-single-inbox',
        text: 'Do all enquiry channels (phone, WhatsApp, web, Practo, Meta) feed one owned lead inbox or CRM?',
        severity: 'Critical',
        controlArea: 'Lead capture unification',
        evidenceHint:
          'Channel map showing where each lead lands and who owns it.',
        recommendation:
          'Consolidate channels into one CRM/HMS queue with a named owner per shift.',
        owner: 'Marketing / IT lead',
        source: 'marketing',
      },
      {
        id: 'li-scripts',
        text: 'Are staff trained on a standard booking script with measured enquiry-to-book rates by agent?',
        severity: 'High',
        controlArea: 'Call / chat conversion',
        evidenceHint:
          'Script document + monthly booking-rate report by agent.',
        recommendation:
          'Publish a short script, role-play weekly, coach the bottom quartile of agents.',
        owner: 'Front office lead',
        source: 'marketing',
      },
      {
        id: 'li-qualification',
        text: 'Are leads scored or tagged (specialty, urgency, insurance/cash, location) before booking?',
        severity: 'High',
        controlArea: 'Lead qualification',
        evidenceHint:
          'CRM fields and sample tagged lead records.',
        recommendation:
          'Add mandatory tags at first contact so routing and follow-up match patient need.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'li-sla-report',
        text: 'Is average first-response time reported weekly to leadership?',
        severity: 'Medium',
        controlArea: 'SLA governance',
        evidenceHint:
          'Last 4 weekly response-time reports or dashboard screenshots.',
        recommendation:
          'Add median and P90 first-response time to the weekly marketing stand-up.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'li-duplicate',
        text: 'Is duplicate-lead handling defined so the same patient is not worked by multiple staff?',
        severity: 'Medium',
        controlArea: 'Lead hygiene',
        evidenceHint:
          'Duplicate-merge rules and examples of merged records.',
        recommendation:
          'Match on phone/WhatsApp ID; assign a single owner; merge duplicates daily.',
        owner: 'Front office / CRM owner',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'funnel',
    name: 'Funnel & conversion tracking',
    description:
      'Whether you can see enquiry → contact → book → attend → return as a managed funnel.',
    objective:
      'Verify stage-by-stage conversion is measured by channel and acted on when stages leak.',
    icon: 'FN',
    theme: 'marketing',
    questions: [
      {
        id: 'fn-stages',
        text: 'Do you track enquiry → contacted → booked → attended conversion by channel?',
        severity: 'Critical',
        controlArea: 'Funnel stages',
        evidenceHint:
          'Dashboard or spreadsheet with the four stages for the last 30–90 days by channel.',
        explanation:
          'Many health systems convert only ~11% of digital leads; stage tracking finds the biggest drop-off.',
        recommendation:
          'Define the four stages in CRM/HMS and review conversion weekly by channel.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'fn-source',
        text: 'Is every booking attributed to a primary source (Google, Meta, WhatsApp, referral, walk-in, directory)?',
        severity: 'Critical',
        controlArea: 'Source attribution',
        evidenceHint:
          'Sample of 30 bookings with source fields completed.',
        recommendation:
          'Make source a mandatory field at booking; audit completeness weekly.',
        owner: 'Front office / marketing',
        source: 'marketing',
      },
      {
        id: 'fn-call-track',
        text: 'Do you use call or WhatsApp click tracking so phone bookings map back to campaigns?',
        severity: 'High',
        controlArea: 'Offline attribution',
        evidenceHint:
          'Tracking numbers / UTM WhatsApp links and a matching report.',
        recommendation:
          'Assign unique tracking numbers or UTM WhatsApp links per campaign.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'fn-dropoff',
        text: 'When a funnel stage drops below target, is there an owner and a corrective action within 7 days?',
        severity: 'High',
        controlArea: 'Leak response',
        evidenceHint:
          'Example of a recent drop-off with action log.',
        recommendation:
          'Set stage targets; open a ticket when a stage misses target for two weeks.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'fn-show-rate',
        text: 'Is appointment show-rate tracked separately from booking rate?',
        severity: 'High',
        controlArea: 'Show-rate control',
        evidenceHint:
          'Booked vs attended report for last month.',
        recommendation:
          'Report show-rate by specialty and channel; fix reminder/deposit gaps where show-rate is low.',
        owner: 'Front office lead',
        source: 'marketing',
      },
      {
        id: 'fn-benchmark',
        text: 'Have you set numeric targets for enquiry-to-book and book-to-attend (not just “improve”)?',
        severity: 'Medium',
        controlArea: 'Conversion targets',
        evidenceHint:
          'Written KPI sheet with targets and actuals.',
        recommendation:
          'Publish targets (e.g. ≥25% lead-to-book, ≥85% show-rate) and review monthly.',
        owner: 'Owner / marketing lead',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'campaigns',
    name: 'Campaign performance & paid media',
    description:
      'How campaigns are designed, measured, and optimized — not run on guesswork.',
    objective:
      'Audit whether paid and organic campaigns use dedicated landing pages, PAC/LTV math, segmentation, and hygiene.',
    icon: 'CP',
    theme: 'marketing',
    questions: [
      {
        id: 'camp-landing',
        text: 'Do paid or specialty campaigns land on dedicated service pages (not the homepage)?',
        severity: 'Critical',
        controlArea: 'Landing page design',
        evidenceHint:
          'URLs of active campaign landing pages with CTA screenshots.',
        recommendation:
          'One landing page per specialty/offer with doctor profile, proof, and a single primary CTA.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'camp-pac',
        text: 'Do you calculate patient acquisition cost (PAC / CPA) by channel every month?',
        severity: 'Critical',
        controlArea: 'PAC measurement',
        evidenceHint:
          'Last 3 monthly PAC tables by channel.',
        recommendation:
          'Divide spend by attributed new patients per channel; review and reallocate monthly.',
        owner: 'Marketing / finance',
        source: 'marketing',
      },
      {
        id: 'camp-ltv',
        text: 'Do you estimate patient LTV and set a PAC ceiling before scaling spend?',
        severity: 'High',
        controlArea: 'LTV vs PAC',
        evidenceHint:
          'LTV assumptions by specialty and documented PAC limits.',
        recommendation:
          'Estimate LTV (visits × margin over 1–3 years) and keep PAC within an agreed multiple of LTV.',
        owner: 'Owner / finance',
        source: 'marketing',
      },
      {
        id: 'camp-segment',
        text: 'Are campaigns segmented by specialty or intent rather than one generic hospital ad?',
        severity: 'High',
        controlArea: 'Campaign segmentation',
        evidenceHint:
          'Ad account structure showing specialty campaigns.',
        recommendation:
          'Split Google/Meta by specialty with matching keywords, creatives, and pages.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'camp-hygiene',
        text: 'Do you review search terms / creatives weekly and pause underperformers?',
        severity: 'Medium',
        controlArea: 'Campaign hygiene',
        evidenceHint:
          'Weekly optimization checklist or change log.',
        recommendation:
          'Weekly search-term review: add negatives, pause losers, scale winners.',
        owner: 'Marketing / agency',
        source: 'marketing',
      },
      {
        id: 'camp-whatsapp',
        text: 'Do digital ads offer Click-to-WhatsApp or an equally low-friction chat CTA where relevant?',
        severity: 'Medium',
        controlArea: 'Chat conversion path',
        evidenceHint:
          'Ad creatives / CTAs using WhatsApp or chat.',
        recommendation:
          'Use WhatsApp CTA with ≤5-minute reply SLA and saved reply templates.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'camp-creative',
        text: 'Are ad creatives tested (A/B) with a documented winner before scaling budget?',
        severity: 'Medium',
        controlArea: 'Creative testing',
        evidenceHint:
          'A/B test log with results for last quarter.',
        recommendation:
          'Test one variable at a time; scale only creatives that beat baseline CPA.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'camp-compliance',
        text: 'Do marketing claims and doctor promotions comply with applicable medical advertising rules?',
        severity: 'High',
        controlArea: 'Regulatory compliance',
        evidenceHint:
          'Approval checklist or legal/medical sign-off on recent campaigns.',
        recommendation:
          'Maintain a claim-approval checklist; avoid prohibited guarantees and unverified before/after claims.',
        owner: 'Medical director / marketing',
        source: 'marketing',
      },
      {
        id: 'camp-sms-compliance',
        text: 'Are SMS/WhatsApp marketing messages DLT-registered and DND/opt-in compliant?',
        severity: 'High',
        controlArea: 'Marketing message compliance',
        evidenceHint:
          'DLT registration certificate/entity ID and an opt-in/opt-out log for promotional sends.',
        explanation:
          'Sending unregistered promotional SMS, or messaging DND-registered numbers without consent, risks blocked messages, regulatory fines, and patient complaints under TRAI/DLT rules.',
        recommendation:
          'Register your entity and templates on the telecom DLT platform; send promotional SMS/WhatsApp only to opted-in numbers; honor opt-out requests immediately.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'local-seo',
    name: 'Local SEO & discovery',
    description:
      'Visibility when patients search “near me”, by specialty, or by doctor name.',
    objective:
      'Confirm Google Business Profile, directories, and local SEO hygiene that drive map-pack and organic discovery.',
    icon: 'LS',
    theme: 'marketing',
    questions: [
      {
        id: 'ls-gbp',
        text: 'Is Google Business Profile complete (categories, services, hours, photos) and claimed for the facility?',
        severity: 'Critical',
        controlArea: 'GBP completeness',
        evidenceHint:
          'GBP dashboard screenshot + completeness checklist.',
        recommendation:
          'Complete every GBP field; add specialty photos weekly; keep hours accurate.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'ls-doctor-gbp',
        text: 'Do key doctors have optimized Google / web profiles with specialty, photo, and booking link?',
        severity: 'High',
        controlArea: 'Doctor discoverability',
        evidenceHint:
          'List of doctor profiles with URLs and last update date.',
        recommendation:
          'Publish complete profiles per doctor with conditions treated and a booking CTA.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'ls-directories',
        text: 'Are clinic and doctor listings consistent on major directories (Practo, Justdial, etc.) with matching NAP?',
        severity: 'High',
        controlArea: 'Citation / NAP consistency',
        evidenceHint:
          'NAP audit spreadsheet across top directories.',
        recommendation:
          'Quarterly directory audit; fix name/address/phone mismatches.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'ls-keywords',
        text: 'Do you maintain a specialty keyword list and track rankings for priority local terms?',
        severity: 'Medium',
        controlArea: 'Local keyword tracking',
        evidenceHint:
          'Keyword list + ranking report for last month.',
        recommendation:
          'Track 20–40 priority “specialty + city” terms monthly and improve underperformers.',
        owner: 'Marketing / SEO owner',
        source: 'marketing',
      },
      {
        id: 'ls-maps',
        text: 'Is Google Maps / directions linked from the website, WhatsApp bio, and social profiles?',
        severity: 'Medium',
        controlArea: 'Directions friction',
        evidenceHint:
          'Links from site and social link-in-bio.',
        recommendation:
          'Put one-tap directions on every digital property.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'ls-photos',
        text: 'Are facility and doctor photos updated regularly on GBP and the website?',
        severity: 'Medium',
        controlArea: 'Visual freshness',
        evidenceHint:
          'Date of last photo upload on GBP/website.',
        recommendation:
          'Upload new authentic photos at least monthly; avoid stock-only imagery.',
        owner: 'Marketing / admin',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'content',
    name: 'Content & education marketing',
    description:
      'Trust-building content that educates patients and supports SEO and conversion.',
    objective:
      'Assess whether educational content, FAQs, and service pages systematically support the patient decision journey.',
    icon: 'CT',
    theme: 'marketing',
    questions: [
      {
        id: 'ct-service-pages',
        text: 'Does each major specialty have a dedicated service page covering symptoms, treatments, doctors, and CTA?',
        severity: 'High',
        controlArea: 'Service page depth',
        evidenceHint:
          'Inventory of specialty pages with last review date.',
        recommendation:
          'Build/refresh one specialty page per priority service with clear CTAs.',
        owner: 'Marketing / clinical lead',
        source: 'marketing',
      },
      {
        id: 'ct-faq',
        text: 'Do high-intent pages include FAQs that answer cost, insurance/TPA, prep, and recovery questions?',
        severity: 'High',
        controlArea: 'Objection handling content',
        evidenceHint:
          'Sample FAQs on top 3 specialty pages.',
        recommendation:
          'Add 6–10 FAQs per specialty using real front-desk questions.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'ct-cadence',
        text: 'Is there a monthly content calendar (blogs, reels, WhatsApp tips) with owners and publish dates?',
        severity: 'Medium',
        controlArea: 'Content cadence',
        evidenceHint:
          'Current month content calendar.',
        recommendation:
          'Publish a simple monthly calendar; measure reach and enquiry contribution quarterly.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'ct-clinical-review',
        text: 'Is clinical content medically reviewed before publish?',
        severity: 'High',
        controlArea: 'Clinical content governance',
        evidenceHint:
          'Sign-off log or reviewer initials on recent posts.',
        recommendation:
          'Require named clinician review for medical claims before go-live.',
        owner: 'Medical director',
        source: 'marketing',
      },
      {
        id: 'ct-patient-lang',
        text: 'Is patient-facing copy written in plain language (and local language where needed)?',
        severity: 'Medium',
        controlArea: 'Readability / language',
        evidenceHint:
          'Sample pages in local language or readability check notes.',
        recommendation:
          'Write at accessible reading level; offer Hindi/regional versions for key services.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'ct-testimonials',
        text: 'Are consented testimonials / outcomes used on service pages (not only on a generic testimonials page)?',
        severity: 'Medium',
        controlArea: 'Proof placement',
        evidenceHint:
          'Service pages showing testimonials with consent records.',
        recommendation:
          'Place 1–2 relevant consented stories on each specialty page.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'ct-social-media',
        text: 'Are Instagram/Facebook/YouTube profiles active, regularly posted, and monitored for DM/comment replies?',
        severity: 'Medium',
        controlArea: 'Organic social media',
        evidenceHint:
          'Post history from the last 30 days plus average DM/comment reply time.',
        recommendation:
          'Assign an owner to post weekly and reply to DMs/comments within 24 hours; fix or archive inactive profiles.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'referral',
    name: 'Referral & community growth',
    description:
      'Word-of-mouth, doctor referrals, and community presence as systematic channels.',
    objective:
      'Verify referral programs and community activities are tracked like any other acquisition channel.',
    icon: 'RF',
    theme: 'marketing',
    questions: [
      {
        id: 'rf-program',
        text: 'Is there a formal patient or doctor referral program with tracking?',
        severity: 'High',
        controlArea: 'Referral program',
        evidenceHint:
          'Program description + referral volume last quarter.',
        recommendation:
          'Define referral ask, tracking code, and thank-you process; report monthly volume.',
        owner: 'Marketing / medical admin',
        source: 'marketing',
      },
      {
        id: 'rf-gp-network',
        text: 'Do you maintain an active referring GP / clinic network with regular communication?',
        severity: 'High',
        controlArea: 'B2B referral network',
        evidenceHint:
          'Referrer list + last outreach date.',
        recommendation:
          'Quarterly referrer visits or WhatsApp updates with easy booking path for referred patients.',
        owner: 'Medical director / liaison',
        source: 'marketing',
      },
      {
        id: 'rf-events',
        text: 'Do you run community health camps or awareness events with measured enquiry yield?',
        severity: 'Medium',
        controlArea: 'Community events ROI',
        evidenceHint:
          'Event list with cost and resulting bookings.',
        recommendation:
          'Cap event spend; capture leads on-site; follow up within 24 hours.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
      {
        id: 'rf-internal',
        text: 'Are internal cross-specialty referrals tracked (e.g. medicine → diagnostics → surgery)?',
        severity: 'Medium',
        controlArea: 'Internal referral capture',
        evidenceHint:
          'Internal referral report between departments.',
        recommendation:
          'Track internal referrals and close the loop with appointment confirmation.',
        owner: 'Clinical admin',
        source: 'marketing',
      },
      {
        id: 'rf-ask',
        text: 'Are satisfied patients explicitly asked for referrals at discharge / checkout?',
        severity: 'Medium',
        controlArea: 'Referral ask process',
        evidenceHint:
          'Checkout script including referral ask.',
        recommendation:
          'Add a referral ask to the discharge checklist for promoters.',
        owner: 'Front office lead',
        source: 'marketing',
      },
      {
        id: 'rf-corporate',
        text: 'Do you have active corporate wellness or TPA/insurer empanelment tie-ups tracked as an acquisition channel?',
        severity: 'Medium',
        controlArea: 'Corporate / TPA channel',
        evidenceHint:
          'List of empanelled TPAs/insurers or corporate tie-ups with enquiry/booking volume attributed to each.',
        recommendation:
          'Maintain an empanelment/tie-up list with a named owner; track enquiries and bookings from each corporate/TPA source monthly.',
        owner: 'Owner / marketing',
        source: 'marketing',
      },
    ],
  },
  {
    id: 'retention',
    name: 'Follow-up, recall & retention',
    description:
      'Systems that turn one visit into long-term care and lifetime value.',
    objective:
      'Audit reminders, chronic-care programs, recall campaigns, and retention/churn measurement.',
    icon: 'RT',
    theme: 'marketing',
    questions: [
      {
        id: 'ret-reminders',
        text: 'Are appointment reminders automated at least twice (e.g. ~72h and ~24h before)?',
        severity: 'Critical',
        controlArea: 'Reminder automation',
        evidenceHint:
          'Reminder template schedule + sample message logs.',
        recommendation:
          'Automate SMS/WhatsApp at 72h and 24h with easy reschedule link.',
        owner: 'Front office lead',
        source: 'marketing',
      },
      {
        id: 'ret-previsit',
        text: 'Are patients reminded of required labs / prep before appointments?',
        severity: 'High',
        controlArea: 'Pre-visit preparation',
        evidenceHint:
          'Pre-visit message templates by specialty.',
        recommendation:
          'Send specialty-specific prep instructions automatically after booking.',
        owner: 'Front office / clinical',
        source: 'marketing',
      },
      {
        id: 'ret-chronic',
        text: 'Do structured chronic-care programs exist (diabetes, HTN, thyroid, asthma, cardiac) with recall intervals?',
        severity: 'Critical',
        controlArea: 'Chronic care pathways',
        evidenceHint:
          'Written pathways with recall intervals and enrolled patient counts.',
        recommendation:
          'Define pathways and recall intervals; enroll eligible patients at diagnosis.',
        owner: 'Clinical lead',
        source: 'marketing',
      },
      {
        id: 'ret-recall',
        text: 'Do you run automated recall for annual checks, birthdays, or gap-in-care patients?',
        severity: 'High',
        controlArea: 'Recall campaigns',
        evidenceHint:
          'Last recall campaign report (sent, booked, attended).',
        recommendation:
          'Segment overdue patients monthly; run WhatsApp/SMS recall with booking link.',
        owner: 'Marketing / clinical',
        source: 'marketing',
      },
      {
        id: 'ret-noshow',
        text: 'Is no-show rate measured with a recovery workflow for missed visits?',
        severity: 'High',
        controlArea: 'No-show recovery',
        evidenceHint:
          'No-show % report + rebooking SOP.',
        recommendation:
          'Track no-show monthly; auto-rebook; reserve same-day fill slots.',
        owner: 'Front office lead',
        source: 'marketing',
      },
      {
        id: 'ret-churn',
        text: 'Do you track 6- and 12-month patient retention / churn?',
        severity: 'High',
        controlArea: 'Retention KPI',
        evidenceHint:
          'Retention dashboard or cohort table.',
        recommendation:
          'Define “active patient”; report retention monthly; act on high-churn segments.',
        owner: 'Owner / marketing',
        source: 'marketing',
      },
      {
        id: 'ret-postvisit',
        text: 'Is there a post-visit follow-up message (care tips, next step, feedback) within 48 hours?',
        severity: 'Medium',
        controlArea: 'Post-visit engagement',
        evidenceHint:
          'Post-visit message templates and send logs.',
        recommendation:
          'Automate a thank-you + care tip + feedback link within 48 hours of visit.',
        owner: 'Front office / marketing',
        source: 'marketing',
      },
      {
        id: 'ret-lapsed',
        text: 'Are lapsed patients (no visit in X months) systematically reactivated?',
        severity: 'Medium',
        controlArea: 'Lapsed patient win-back',
        evidenceHint:
          'Win-back campaign list and results.',
        recommendation:
          'Monthly win-back list for patients inactive 6–12 months with a relevant offer or check-up CTA.',
        owner: 'Marketing lead',
        source: 'marketing',
      },
    ],
  },

  // ─── BRAND PAGE ───────────────────────────────────────────────────
  {
    id: 'identity',
    name: 'Clinic identity & positioning',
    description:
      'Who you are, who you serve, and why patients should choose you.',
    objective:
      'Confirm mission, ideal patient, and unique value proposition are documented and used consistently.',
    icon: 'ID',
    theme: 'branding',
    questions: [
      {
        id: 'id-mission',
        text: 'Are mission, values, and ideal patient profile written and shared with staff?',
        severity: 'High',
        controlArea: 'Identity documentation',
        evidenceHint:
          'One-pager + proof of staff briefing (meeting notes / poster).',
        recommendation:
          'Document and brief all staff quarterly.',
        owner: 'Owner / medical director',
        source: 'branding',
      },
      {
        id: 'id-uvp',
        text: 'Is a clear unique value proposition stated above the fold on the website and in sales scripts?',
        severity: 'Critical',
        controlArea: 'Value proposition',
        evidenceHint:
          'Homepage screenshot + script excerpt with UVP.',
        recommendation:
          'Write one sentence on differentiation; place it on web, WhatsApp greeting, and call opening.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'id-competitors',
        text: 'Have you mapped 3–5 local competitors and how you differ on specialty, access, price, and trust?',
        severity: 'High',
        controlArea: 'Competitive positioning',
        evidenceHint:
          'Competitor matrix dated within last 6 months.',
        recommendation:
          'Refresh a simple competitor matrix twice a year; use gaps to guide messaging.',
        owner: 'Owner / marketing',
        source: 'branding',
      },
      {
        id: 'id-audience',
        text: 'Are primary audience segments defined (e.g. cash OPD, TPA, maternity, senior care)?',
        severity: 'High',
        controlArea: 'Audience segmentation',
        evidenceHint:
          'Segment definitions used in campaigns.',
        recommendation:
          'Define 3–5 segments with message and channel preferences for each.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'id-promise',
        text: 'Are brand promises (wait times, response, cleanliness) realistic and monitored?',
        severity: 'Medium',
        controlArea: 'Promise–delivery fit',
        evidenceHint:
          'Published promises vs operational metrics.',
        recommendation:
          'Only publish promises you measure; fix ops before amplifying claims.',
        owner: 'Ops / marketing',
        source: 'branding',
      },
      {
        id: 'id-staff-align',
        text: 'Can frontline staff explain in one sentence why a patient should choose this hospital?',
        severity: 'Medium',
        controlArea: 'Staff brand alignment',
        evidenceHint:
          'Mystery-shop or spot-check notes from staff answers.',
        recommendation:
          'Train and quiz staff on the one-sentence brand pitch.',
        owner: 'Front office lead',
        source: 'branding',
      },
    ],
  },
  {
    id: 'visual',
    name: 'Visual & verbal identity',
    description:
      'Logo, colours, typography, tone, and branded materials consistency.',
    objective:
      'Ensure brand assets and tone are standardized across every patient touchpoint.',
    icon: 'VI',
    theme: 'branding',
    questions: [
      {
        id: 'vi-guide',
        text: 'Does a brand guide exist (logo, colours, fonts, do’s/don’ts) and is it used by vendors?',
        severity: 'High',
        controlArea: 'Brand guide',
        evidenceHint:
          'Brand guide PDF + recent vendor deliverable using it.',
        recommendation:
          'Create a one-page brand guide; require vendors to follow it.',
        owner: 'Owner / admin',
        source: 'branding',
      },
      {
        id: 'vi-signage',
        text: 'Is exterior and interior signage professional, clear, and on-brand?',
        severity: 'High',
        controlArea: 'Physical signage',
        evidenceHint:
          'Photo audit of entrance, reception, wayfinding.',
        recommendation:
          'Fix unclear/outdated signage; align colours and naming.',
        owner: 'Facilities / admin',
        source: 'branding',
      },
      {
        id: 'vi-print',
        text: 'Are prescriptions, reports, ID cards, and handouts using consistent branding?',
        severity: 'Medium',
        controlArea: 'Print collateral',
        evidenceHint:
          'Sample pads/handouts compared to brand guide.',
        recommendation:
          'Standardize templates for all printed patient materials.',
        owner: 'Admin lead',
        source: 'branding',
      },
      {
        id: 'vi-tone',
        text: 'Is a brand tone guide (empathetic, professional, transparent, accessible, outcome-focused) trained?',
        severity: 'Medium',
        controlArea: 'Verbal tone',
        evidenceHint:
          'Tone guide + training attendance.',
        recommendation:
          'Train staff on tone pillars; spot-check calls and WhatsApp replies monthly.',
        owner: 'Front office lead',
        source: 'branding',
      },
      {
        id: 'vi-uniform',
        text: 'Do staff uniforms / name badges present a consistent professional image?',
        severity: 'Medium',
        controlArea: 'Staff presentation',
        evidenceHint:
          'Uniform policy + floor observation notes.',
        recommendation:
          'Enforce uniform and name-badge policy; replace worn items.',
        owner: 'HR / admin',
        source: 'branding',
      },
      {
        id: 'vi-digital-assets',
        text: 'Is there a shared library of approved logos, photos, and templates for marketing use?',
        severity: 'Medium',
        controlArea: 'Asset management',
        evidenceHint:
          'Drive/folder of approved assets with naming conventions.',
        recommendation:
          'Maintain a single approved asset library; retire outdated files.',
        owner: 'Marketing lead',
        source: 'branding',
      },
    ],
  },
  {
    id: 'website',
    name: 'Website & digital conversion',
    description:
      'Whether the website and digital properties convert intent into bookings.',
    objective:
      'Audit mobile experience, booking friction, CTAs, speed, and conversion paths.',
    icon: 'WB',
    theme: 'branding',
    questions: [
      {
        id: 'wb-mobile',
        text: 'Is the website fast and usable on mobile with services, doctors, timings, and location?',
        severity: 'Critical',
        controlArea: 'Mobile web experience',
        evidenceHint:
          'Mobile PageSpeed / load time + mobile screenshots of key pages.',
        recommendation:
          'Optimize mobile performance; put click-to-call and WhatsApp above the fold.',
        owner: 'Marketing / web owner',
        source: 'branding',
      },
      {
        id: 'wb-booking',
        text: 'Can patients book online or via WhatsApp with minimal form fields?',
        severity: 'Critical',
        controlArea: 'Booking friction',
        evidenceHint:
          'Booking flow screenshots showing field count.',
        recommendation:
          'Reduce forms to essentials; offer WhatsApp booking on every page.',
        owner: 'Front office / marketing',
        source: 'branding',
      },
      {
        id: 'wb-cta',
        text: 'Does every key page have a single clear primary CTA (Book / Call / WhatsApp)?',
        severity: 'High',
        controlArea: 'CTA clarity',
        evidenceHint:
          'Audit of homepage + 5 specialty pages for CTA presence.',
        recommendation:
          'Standardize one primary CTA style and placement site-wide.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'wb-hours',
        text: 'Are timings, emergency info, and address accurate and identical across web, GBP, and directories?',
        severity: 'High',
        controlArea: 'Hours / NAP accuracy',
        evidenceHint:
          'Cross-check of hours/address on web vs GBP vs Practo.',
        recommendation:
          'Quarterly NAP audit; fix mismatches the same day.',
        owner: 'Admin / marketing',
        source: 'branding',
      },
      {
        id: 'wb-analytics',
        text: 'Is website analytics installed with goals for calls, form submits, and WhatsApp clicks?',
        severity: 'High',
        controlArea: 'Web analytics',
        evidenceHint:
          'Analytics property + conversion events configured.',
        recommendation:
          'Track calls, forms, WhatsApp clicks as goals; review monthly.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'wb-trust',
        text: 'Do trust signals appear near CTAs (accreditation, years, doctor credentials, review rating)?',
        severity: 'Medium',
        controlArea: 'Trust near conversion',
        evidenceHint:
          'Screenshots of CTA areas with trust elements.',
        recommendation:
          'Place rating, credentials, and accreditations next to booking CTAs.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'wb-404',
        text: 'Are broken links, outdated doctor pages, and 404s reviewed at least quarterly?',
        severity: 'Medium',
        controlArea: 'Site hygiene',
        evidenceHint:
          'Last crawl/QA report.',
        recommendation:
          'Quarterly site crawl; fix 404s and outdated profiles within 2 weeks.',
        owner: 'Marketing / web owner',
        source: 'branding',
      },
    ],
  },
  {
    id: 'experience',
    name: 'Patient experience journey',
    description:
      'The end-to-end experience from enquiry to discharge that shapes brand perception.',
    objective:
      'Evaluate access, wait times, communication clarity, and journey consistency.',
    icon: 'EX',
    theme: 'branding',
    questions: [
      {
        id: 'ex-access',
        text: 'Is booking easy (short hold times, clear next steps, minimal paperwork)?',
        severity: 'High',
        controlArea: 'Access friction',
        evidenceHint:
          'Average hold time + patient journey map.',
        recommendation:
          'Map the journey; remove one friction point per month.',
        owner: 'Front office lead',
        source: 'branding',
      },
      {
        id: 'ex-wait',
        text: 'Are wait times monitored with actions when thresholds are breached?',
        severity: 'High',
        controlArea: 'Wait-time management',
        evidenceHint:
          'Wait-time report + escalation rule.',
        recommendation:
          'Display expected waits; escalate when average wait exceeds target.',
        owner: 'OPD manager',
        source: 'branding',
      },
      {
        id: 'ex-comms',
        text: 'Do patients receive clear communication on cost estimates, next steps, and who to contact?',
        severity: 'Critical',
        controlArea: 'Care communication',
        evidenceHint:
          'Sample estimate sheets and next-step messages.',
        recommendation:
          'Standardize estimate + next-step templates for common visits/procedures.',
        owner: 'Billing / clinical admin',
        source: 'branding',
      },
      {
        id: 'ex-complaint',
        text: 'Is there a documented complaint / service-recovery process with response SLAs?',
        severity: 'High',
        controlArea: 'Service recovery',
        evidenceHint:
          'Complaint log with open/close times.',
        recommendation:
          'Log every complaint; respond within 24–48 hours; close with root cause.',
        owner: 'Quality / admin',
        source: 'branding',
      },
      {
        id: 'ex-mystery',
        text: 'Do you mystery-shop or audit the patient journey (call, WhatsApp, visit) at least quarterly?',
        severity: 'Medium',
        controlArea: 'Journey audit',
        evidenceHint:
          'Last mystery-shop report.',
        recommendation:
          'Quarterly mystery shop of call + WhatsApp + OPD; assign fixes with owners.',
        owner: 'Quality / marketing',
        source: 'branding',
      },
      {
        id: 'ex-billing-clarity',
        text: 'Are bills and packages explained in plain language before major services?',
        severity: 'High',
        controlArea: 'Billing transparency',
        evidenceHint:
          'Consented estimate samples and package sheets.',
        recommendation:
          'Mandatory estimate discussion checklist before elective procedures.',
        owner: 'Billing lead',
        source: 'branding',
      },
      {
        id: 'ex-privacy',
        text: 'Is patient privacy respected in reception conversations and digital messaging?',
        severity: 'High',
        controlArea: 'Privacy in brand moments',
        evidenceHint:
          'Privacy SOP + observation notes.',
        recommendation:
          'Train staff on privacy at desk and on WhatsApp; use private spaces for sensitive talks.',
        owner: 'Admin / compliance',
        source: 'branding',
      },
    ],
  },
  {
    id: 'reputation',
    name: 'Reviews, reputation & social proof',
    description:
      'How reviews and stories are generated, managed, and turned into trust.',
    objective:
      'Confirm review generation, response SLAs, NPS routing, and story governance.',
    icon: 'RP',
    theme: 'branding',
    questions: [
      {
        id: 'rp-request',
        text: 'Are Google review requests systematically sent after visits?',
        severity: 'Critical',
        controlArea: 'Review generation',
        evidenceHint:
          'Automation config + monthly new-review count.',
        recommendation:
          'Automate post-visit review invites via WhatsApp/SMS.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'rp-timing',
        text: 'Are review requests sent while satisfaction is highest (e.g. within ~2 hours of a positive visit)?',
        severity: 'High',
        controlArea: 'Review timing',
        evidenceHint:
          'Trigger timing settings from HMS/automation.',
        recommendation:
          'Trigger invites from checkout/discharge within 2 hours for eligible patients.',
        owner: 'Marketing / front office',
        source: 'branding',
      },
      {
        id: 'rp-response',
        text: 'Is every review responded to within 24–48 hours?',
        severity: 'Critical',
        controlArea: 'Review response SLA',
        evidenceHint:
          'Review reply log with timestamps.',
        explanation:
          'Patients expect responses quickly; unreplied reviews signal neglect.',
        recommendation:
          'Assign a daily review owner; use templates; escalate negatives to recovery.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'rp-nps',
        text: 'Do you run a private NPS/satisfaction survey before asking for a public review?',
        severity: 'High',
        controlArea: 'NPS routing',
        evidenceHint:
          'Survey flow: promoters → review link; detractors → recovery.',
        recommendation:
          'Route 9–10 to Google review; 0–6 to a named recovery owner.',
        owner: 'Quality / marketing',
        source: 'branding',
      },
      {
        id: 'rp-negative',
        text: 'Are negative reviews triaged with root-cause fix — not only a public reply?',
        severity: 'High',
        controlArea: 'Negative-review process',
        evidenceHint:
          'Sample negative reviews with internal tickets.',
        recommendation:
          'Open an internal ticket for every 1–2★ review; close with corrective action.',
        owner: 'Quality lead',
        source: 'branding',
      },
      {
        id: 'rp-stories',
        text: 'Are consented patient stories published regularly on web/social?',
        severity: 'Medium',
        controlArea: 'Story pipeline',
        evidenceHint:
          'Consent forms + last 3 published stories.',
        recommendation:
          'Collect one consented story per month; place on relevant specialty pages.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'rp-rating-goal',
        text: 'Do you have a target rating and monthly review-volume goal?',
        severity: 'Medium',
        controlArea: 'Reputation KPIs',
        evidenceHint:
          'Written targets vs actual rating/volume.',
        recommendation:
          'Set targets (e.g. ≥4.5★, N new reviews/month) and track on the marketing dashboard.',
        owner: 'Marketing lead',
        source: 'branding',
      },
      {
        id: 'rp-crisis',
        text: 'Is there a crisis communication SOP for multi-channel or viral reputation events (beyond single-review replies)?',
        severity: 'Medium',
        controlArea: 'Crisis communication',
        evidenceHint:
          'Written crisis SOP naming spokesperson, escalation path, and response timeline for a multi-channel incident.',
        explanation:
          'A single bad review has a routine response process, but a viral complaint, news story, or coordinated social pile-on needs a pre-agreed escalation path — improvising in the moment risks making things worse.',
        recommendation:
          'Document a crisis SOP: named spokesperson, who approves public statements, and the escalation path to leadership/legal within 2 hours of a multi-channel incident.',
        owner: 'Owner / marketing',
        source: 'branding',
      },
    ],
  },
  {
    id: 'governance',
    name: 'Measurement, governance & growth',
    description:
      'Leadership rhythm that turns audit findings into budget and operational change.',
    objective:
      'Verify dashboards, budget reallocation, brand audits, and quality/accreditation readiness.',
    icon: 'GV',
    theme: 'branding',
    questions: [
      {
        id: 'gv-dashboard',
        text: 'Is there a monthly marketing & brand dashboard (enquiries, PAC, bookings, reviews, retention)?',
        severity: 'Critical',
        controlArea: 'Executive dashboard',
        evidenceHint:
          'Last 3 monthly dashboards.',
        recommendation:
          'Publish a one-page monthly dashboard to leadership.',
        owner: 'Owner / marketing',
        source: 'branding',
      },
      {
        id: 'gv-reallocate',
        text: 'Is marketing budget reallocated quarterly based on PAC and conversion — not impressions alone?',
        severity: 'High',
        controlArea: 'Budget governance',
        evidenceHint:
          'Quarterly budget change memo tied to PAC data.',
        recommendation:
          'Cut bottom channel; scale top channel within PAC limits each quarter.',
        owner: 'Owner / marketing',
        source: 'branding',
      },
      {
        id: 'gv-touchpoints',
        text: 'Are brand touchpoints (signage, web, prescriptions, reception, staff, comms, social, follow-up) audited quarterly?',
        severity: 'High',
        controlArea: 'Touchpoint audit',
        evidenceHint:
          'Touchpoint checklist with last audit date.',
        recommendation:
          'Run an 8-touchpoint brand audit every quarter with owners for gaps.',
        owner: 'Admin / marketing',
        source: 'branding',
      },
      {
        id: 'gv-review-meeting',
        text: 'Is there a structured quarterly marketing & experience review with assigned actions?',
        severity: 'Medium',
        controlArea: 'Governance rhythm',
        evidenceHint:
          'Meeting minutes with action owners.',
        recommendation:
          'Hold a quarterly review; track actions to closure.',
        owner: 'Owner',
        source: 'branding',
      },
      {
        id: 'gv-roles',
        text: 'Are marketing, front-office, and clinical brand roles clearly assigned (RACI)?',
        severity: 'Medium',
        controlArea: 'Role clarity',
        evidenceHint:
          'RACI or responsibility list.',
        recommendation:
          'Publish a simple RACI for leads, reviews, content, and campaigns.',
        owner: 'Owner / HR',
        source: 'branding',
      },
      {
        id: 'gv-accreditation',
        text: 'Have you assessed accreditation / quality-standard readiness (documentation, processes, gaps)?',
        severity: 'Medium',
        controlArea: 'Quality / accreditation readiness',
        evidenceHint:
          'Gap analysis report dated within 12 months.',
        recommendation:
          'Run a gap analysis against recognized clinic quality standards; close critical gaps.',
        owner: 'Medical director / quality',
        source: 'branding',
      },
      {
        id: 'gv-training',
        text: 'Is brand and patient-communication training part of new-hire onboarding?',
        severity: 'Medium',
        controlArea: 'Onboarding training',
        evidenceHint:
          'Onboarding checklist including brand module.',
        recommendation:
          'Add brand pitch, tone, and review/referral asks to onboarding.',
        owner: 'HR / front office',
        source: 'branding',
      },
    ],
  },
];
