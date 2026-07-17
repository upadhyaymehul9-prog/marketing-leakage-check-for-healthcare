/**
 * Step-by-step "how to achieve" playbooks for each audit domain.
 * Shown when hospitals do not yet know how to implement the controls.
 */
export const SECTION_HOW_TO: Record<string, string[]> = {
  'digital-presence': [
    'Decide your official hospital name, address, and phone (NAP) — use the same everywhere.',
    'Claim Google Business Profile: Google Maps → search your hospital → “Own this business?” → verify.',
    'Create or fix a mobile website/landing page with services, doctors, timings, map, Call & WhatsApp buttons.',
    'Open WhatsApp Business, set greeting + business hours, and put the link/QR on the website and GBP.',
    'Search your hospital name and “specialty + city” in an incognito window; fix anything that does not show you.',
  ],
  'lead-intake': [
    'List every place patients contact you (phone, WhatsApp, web form, Practo, Meta ads).',
    'Route all of them into one shared inbox or CRM with a named owner per shift.',
    'Set a ≤5-minute first-reply SLA; use WhatsApp auto-reply then a human follow-up.',
    'Write a short booking script; train staff weekly; track each agent’s enquiry→book rate.',
    'Log missed calls and clear the callback list within one business hour.',
  ],
  funnel: [
    'Define four stages in your CRM/HMS: Enquiry → Contacted → Booked → Attended.',
    'Make “source” (Google, Meta, WhatsApp, referral, walk-in, directory) mandatory at booking.',
    'Add call-tracking numbers or UTM WhatsApp links per campaign so phone bookings are attributed.',
    'Set targets (e.g. lead→book ≥25%, show-rate ≥85%) and review the funnel every week.',
    'When a stage drops for 2 weeks, assign an owner and fix within 7 days.',
  ],
  campaigns: [
    'Never send paid traffic to the homepage — build one landing page per specialty/offer with one CTA.',
    'Each month calculate PAC = marketing spend ÷ new patients by channel.',
    'Estimate patient LTV by specialty; only scale channels where PAC stays within your LTV limit.',
    'Split ads by specialty; review search terms weekly; pause losers; A/B test creatives before scaling.',
    'Get medical/legal sign-off on claims before ads go live.',
  ],
  'local-seo': [
    'Complete every Google Business Profile field (categories, services, hours, photos).',
    'Publish a full profile page for each key doctor with photo, specialty, and booking link.',
    'Audit Practo/Justdial/etc. quarterly so name, address, phone match your website.',
    'Track 20–40 “specialty + city” keywords monthly and improve pages that do not rank.',
    'Upload real facility/doctor photos at least monthly; keep Maps directions one tap away.',
  ],
  content: [
    'Build one service page per major specialty: symptoms, treatments, doctors, FAQs, CTA.',
    'Add FAQs from real front-desk questions (cost, TPA, prep, recovery).',
    'Run a simple monthly content calendar (who publishes what, when).',
    'Require a named clinician to review medical content before publish.',
    'Place 1–2 consented patient stories on the specialty pages they relate to.',
  ],
  referral: [
    'Write a one-page referral program (who can refer, how to track, how you thank them).',
    'Maintain a referring GP/clinic list; message or visit them quarterly with an easy booking path.',
    'At every community camp, capture leads on-site and follow up within 24 hours.',
    'Track internal cross-specialty referrals the same way you track external ones.',
    'Add a referral ask to the discharge/checkout script for happy patients.',
  ],
  retention: [
    'Automate appointment reminders at ~72 hours and ~24 hours (SMS/WhatsApp) with reschedule link.',
    'Send specialty prep / lab instructions automatically after booking.',
    'Define chronic-care pathways (diabetes, HTN, etc.) with recall intervals and enroll patients.',
    'Run monthly recall for overdue annual checks and gap-in-care patients.',
    'Report 6- and 12-month retention; run a win-back list for patients inactive 6–12 months.',
  ],
  identity: [
    'Write a one-pager: mission, values, ideal patient, and one-sentence unique value proposition (UVP).',
    'Put the UVP on the website homepage, WhatsApp greeting, and call opening script.',
    'Map 3–5 local competitors on specialty, access, price, and trust — refresh twice a year.',
    'Define 3–5 audience segments and match message/channel to each.',
    'Train frontline staff to say the one-sentence brand pitch; mystery-check them.',
  ],
  visual: [
    'Create a one-page brand guide (logo, colours, fonts, do’s/don’ts) and share it with vendors.',
    'Photo-audit entrance, reception, and wayfinding; fix unclear or off-brand signage.',
    'Standardize prescriptions, handouts, and ID cards to the same templates.',
    'Train staff on tone: empathetic, professional, transparent, accessible, outcome-focused.',
    'Keep one shared folder of approved logos/photos; delete outdated files.',
  ],
  website: [
    'Test the site on a phone: speed, services, doctors, timings, Call + WhatsApp above the fold.',
    'Cut booking forms to essential fields; offer WhatsApp booking on every key page.',
    'Put one primary CTA style/placement on homepage and specialty pages.',
    'Install analytics with goals for calls, forms, and WhatsApp clicks; review monthly.',
    'Quarterly crawl for 404s and outdated doctor pages; fix within 2 weeks.',
  ],
  experience: [
    'Map the patient journey from enquiry → visit → discharge; remove one friction point per month.',
    'Set wait-time targets; display expected waits; escalate when breached.',
    'Standardize cost-estimate and next-step templates before major services.',
    'Log every complaint with a 24–48 hour response SLA and root-cause close-out.',
    'Mystery-shop call + WhatsApp + OPD each quarter and assign owners to fixes.',
  ],
  reputation: [
    'Automate a post-visit Google review invite (WhatsApp/SMS), ideally within ~2 hours of a good visit.',
    'Assign a daily owner to reply to every review within 24–48 hours.',
    'Send a private NPS first: 9–10 get the review link; 0–6 go to service recovery.',
    'Open an internal ticket for every 1–2★ review; fix the root cause, not only the public reply.',
    'Set targets for rating and new reviews/month; track on the marketing dashboard.',
  ],
  governance: [
    'Publish a one-page monthly dashboard: enquiries, PAC, bookings, reviews, retention.',
    'Each quarter cut the worst channel and scale the best within PAC limits.',
    'Run an 8-touchpoint brand audit quarterly (signage, web, Rx, reception, staff, comms, social, follow-up).',
    'Hold a quarterly marketing & experience review with written actions and owners.',
    'Add brand pitch, tone, and review/referral asks to new-hire onboarding.',
  ],
};
