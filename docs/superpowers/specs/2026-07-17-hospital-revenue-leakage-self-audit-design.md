# Hospital Revenue Leakage Self-Audit — Design

## Purpose

Create a self-guided assessment for Indian hospitals to identify operational revenue-leakage risks across the patient journey and receive prioritized, practical actions to reduce those risks and attract more patients. It is a decision-support tool, not a financial, clinical, or compliance audit.

## First-release scope

The app is a desktop-first, dark-themed web application inspired by the supplied reference screen. It works without an account, integrations, or patient-level data.

### Audit sections

1. Patient acquisition and marketing
2. OPD and front office
3. Billing and charge capture
4. Pharmacy
5. OT and procedures
6. Lab and radiology
7. Inpatient, discharge, and collections

Each section has concise operational-control questions. Questions are tagged Critical, High, or Medium and may show a short explanation of why the control matters. Each question accepts exactly one answer:

- Yes — evidence available
- Yes — not documented
- Partial
- No
- Not applicable

Optional notes capture local context; the first release will not ask users to upload patient records or sensitive documents.

## User experience

### Audit workspace

- Persistent header: title, estimated monthly opportunity range, overall completion, Save & Exit, Reset, and View Report.
- Section sidebar: seven audit areas, completion counts, and active-section styling.
- Content area: section title, short description, section-level risk indicator, then question cards with selectable answer choices.
- Question cards: question number, severity badge, response options, optional guidance, and optional note.
- Completed answers persist in browser local storage so a hospital can return to the audit later.

### Results report

The report contains:

- overall risk status and an estimated monthly opportunity range in INR;
- department-level risk summary;
- highest-priority gaps, ordered by severity and answer;
- recommended corrective controls and owners;
- a sequenced 30/60/90-day action plan;
- patient-growth recommendations covering lead-response time, appointment conversion, no-show reduction, referral tracking, Google Business Profile and review hygiene, and campaign-to-appointment ROI measurement;
- clear disclaimer that estimates are risk-based screening ranges requiring validation against records.

## Scoring and estimates

The score rewards documented controls and weights a missing control more heavily when it is Critical. Not applicable answers do not affect the score. A department score is translated to Low, Moderate, High, or Critical risk.

The first-release INR opportunity estimate is a transparent risk-band estimate, derived from unanswered/weak critical and high controls. It will be displayed as a range rather than an exact loss and will explain its inputs in the report. No external financial or clinical data is used.

## Data model

- `AuditSection`: id, name, description, icon, questions.
- `AuditQuestion`: id, text, severity, explanation, recommendation, growthRecommendation?, estimateWeight.
- `Response`: question id, selected answer, note, updated timestamp.
- `AuditState`: responses, last updated time, schema version.

Question definitions are static application data in the first release. The scoring module reads the definitions and saved responses and returns section scores, total score, estimate range, prioritized actions, and growth recommendations.

## Error handling and privacy

- A malformed or outdated saved audit state is ignored safely and replaced with a fresh state.
- Reset asks for confirmation before clearing browser-stored responses.
- The report remains usable with partially completed sections and labels conclusions as provisional.
- The first release stores data only in the user’s browser and collects no patient-level data.

## Quality checks

- Unit tests cover response scoring, Not applicable treatment, risk-band calculation, and estimate boundaries.
- Interface tests cover choosing and changing an answer, saved-state restoration, reset confirmation, sidebar counts, and report generation from a partial audit.
- Responsive checks ensure the audit remains usable on tablet-width screens; desktop is the primary layout.

## Deferred scope

- Login, user roles, cloud persistence, or collaboration.
- CSV/Excel imports and HIS/CRM/TPA integrations.
- Automated financial reconciliation or exact leakage detection.
- Patient-identifying information, evidence uploads, or compliance certification.

## References informing the scope

The questionnaire prioritizes patient access, charge capture, reconciliation, and claim/denial controls because they recur across published revenue-cycle guidance and audit practice. See the [UT Southwestern charge capture and reconciliation audit](https://utsystem.edu/sites/default/files/documents/ut-system-reports/2025/utsw-charge-capture-and-reconciliation-audit-physical-medicine-rehabilitation-report/utsw-charge-capture-and-reconciliation-audit-physical-medicine-rehabilitation-report.pdf) and [HFMA’s standardization of denial metrics](https://www.hfma.org/guidance/standardizing-denial-metrics-revenue-cycle-benchmarking-process-improvement/).
