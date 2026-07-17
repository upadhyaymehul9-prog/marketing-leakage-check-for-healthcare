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

export const AUDIT_SECTIONS: AuditSection[] = [
  {
    id: 'acquisition',
    name: 'Patient acquisition and marketing',
    description:
      'How quickly and reliably enquiries turn into booked, attended appointments.',
    icon: 'MK',
    questions: [
      {
        id: 'acq-lead-response',
        text: 'Are inbound enquiries (calls, WhatsApp, web forms) responded to within 15 minutes during working hours?',
        severity: 'Critical',
        explanation:
          'Slow first response is the largest source of lost, ready-to-book patients.',
        recommendation:
          'Route all enquiries to a shared inbox with a 15-minute response SLA and daily follow-up list.',
        owner: 'Front office / marketing lead',
        growthRecommendation:
          'Cut lead-response time below 15 minutes; speed-to-lead is the single biggest conversion lever.',
        estimateWeight: 320000,
      },
      {
        id: 'acq-conversion-tracking',
        text: 'Do you track appointment conversion rate from enquiry to booked appointment?',
        severity: 'High',
        explanation:
          'Without conversion tracking you cannot see where enquiries are being lost.',
        recommendation:
          'Log every enquiry and its outcome so weekly conversion can be measured and coached.',
        owner: 'Marketing lead',
        growthRecommendation:
          'Measure enquiry-to-appointment conversion weekly and coach the lowest-performing channels.',
        estimateWeight: 140000,
      },
      {
        id: 'acq-noshow',
        text: 'Do you send appointment reminders and actively work to reduce no-shows?',
        severity: 'High',
        explanation:
          'No-shows waste capacity that could serve paying patients.',
        recommendation:
          'Send confirmation plus reminder messages and call high-value bookings the day before.',
        owner: 'Front office lead',
        growthRecommendation:
          'Reduce no-shows with two-step reminders and easy rescheduling links.',
        estimateWeight: 110000,
      },
      {
        id: 'acq-referral',
        text: 'Are referral sources and campaign-to-appointment ROI tracked for each channel?',
        severity: 'Medium',
        explanation:
          'Untracked referrals and campaigns hide which spend actually produces patients.',
        recommendation:
          'Attribute each booking to a source and review cost-per-appointment monthly.',
        owner: 'Marketing lead',
        growthRecommendation:
          'Track referral sources and campaign ROI; reinvest only in channels that book appointments.',
        estimateWeight: 60000,
      },
      {
        id: 'acq-reputation',
        text: 'Is your Google Business Profile complete and are new reviews requested and answered?',
        severity: 'Medium',
        explanation:
          'A weak local profile suppresses discovery by nearby patients.',
        recommendation:
          'Keep hours and services current, request reviews after visits, and reply to every review.',
        owner: 'Marketing lead',
        growthRecommendation:
          'Maintain Google Business Profile and review hygiene to win local search demand.',
        estimateWeight: 55000,
      },
    ],
  },
  {
    id: 'opd',
    name: 'OPD and front office',
    description:
      'Registration accuracy and capture of consultation and payer details at the front desk.',
    icon: 'OP',
    questions: [
      {
        id: 'opd-registration',
        text: 'Is patient registration data (name, contact, payer) verified for accuracy at first visit?',
        severity: 'High',
        explanation:
          'Registration errors cascade into billing rejections and unreachable patients.',
        recommendation:
          'Verify identity and payer details at registration using a short mandatory checklist.',
        owner: 'Front office lead',
        estimateWeight: 130000,
      },
      {
        id: 'opd-tpa-eligibility',
        text: 'Is insurance / TPA eligibility checked before or at the point of consultation?',
        severity: 'Critical',
        explanation:
          'Missed eligibility checks lead to denied claims and unrecoverable cash.',
        recommendation:
          'Confirm TPA/insurance eligibility and limits before service and record the reference.',
        owner: 'TPA desk',
        estimateWeight: 260000,
      },
      {
        id: 'opd-consult-charge',
        text: 'Is every consultation and follow-up reliably captured as a billable event?',
        severity: 'High',
        explanation:
          'Uncharged consultations are a common silent leak in OPD.',
        recommendation:
          'Reconcile daily consultation counts against billed consultations.',
        owner: 'Billing lead',
        estimateWeight: 150000,
      },
      {
        id: 'opd-queue',
        text: 'Are wait times and doctor availability managed to avoid patients leaving without service?',
        severity: 'Medium',
        explanation:
          'Long waits cause walkouts that lose both revenue and reputation.',
        recommendation:
          'Track walkouts and balance appointment load against doctor availability.',
        owner: 'OPD manager',
        estimateWeight: 50000,
      },
    ],
  },
  {
    id: 'billing',
    name: 'Billing and charge capture',
    description:
      'Whether every service delivered is charged, reconciled, and defended against denials.',
    icon: 'BL',
    questions: [
      {
        id: 'bill-charge-capture',
        text: 'Is there a daily reconciliation of services delivered against services billed?',
        severity: 'Critical',
        explanation:
          'Charge capture gaps are the most researched and material source of leakage.',
        recommendation:
          'Run a daily services-vs-charges reconciliation and investigate every variance.',
        owner: 'Billing lead',
        estimateWeight: 380000,
      },
      {
        id: 'bill-price-master',
        text: 'Is the price/charge master reviewed and kept current for all services and payers?',
        severity: 'High',
        explanation:
          'An outdated charge master under-bills services silently.',
        recommendation:
          'Review the charge master quarterly and after any tariff or package change.',
        owner: 'Finance lead',
        estimateWeight: 160000,
      },
      {
        id: 'bill-denials',
        text: 'Are claim denials tracked by reason and worked for resubmission?',
        severity: 'Critical',
        explanation:
          'Unworked denials become permanent write-offs.',
        recommendation:
          'Standardize denial reason codes and work a daily denial worklist to resubmission.',
        owner: 'TPA / billing lead',
        estimateWeight: 300000,
      },
      {
        id: 'bill-discount-control',
        text: 'Are discounts and concessions authorized and logged against policy?',
        severity: 'Medium',
        explanation:
          'Unauthorized discounts erode realized revenue without visibility.',
        recommendation:
          'Require approval for discounts above a threshold and audit them monthly.',
        owner: 'Finance lead',
        estimateWeight: 70000,
      },
    ],
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    description:
      'Whether dispensed medicines and consumables are charged and stock is controlled.',
    icon: 'RX',
    questions: [
      {
        id: 'pharm-dispense-charge',
        text: 'Is every medicine dispensed to inpatients linked to a charge on the bill?',
        severity: 'Critical',
        explanation:
          'Dispensed-but-unbilled pharmacy items are a frequent inpatient leak.',
        recommendation:
          'Link dispensing to the patient bill and reconcile pharmacy issues daily.',
        owner: 'Pharmacy in-charge',
        estimateWeight: 240000,
      },
      {
        id: 'pharm-stock',
        text: 'Is pharmacy stock reconciled against issues and sales at a regular cadence?',
        severity: 'High',
        explanation:
          'Weak stock control hides pilferage, expiry, and uncharged issues.',
        recommendation:
          'Perform cycle counts and reconcile issues to sales weekly.',
        owner: 'Pharmacy in-charge',
        estimateWeight: 120000,
      },
      {
        id: 'pharm-expiry',
        text: 'Are near-expiry and expired items managed to minimize write-offs?',
        severity: 'Medium',
        explanation:
          'Expiry write-offs are avoidable losses with basic rotation discipline.',
        recommendation:
          'Track near-expiry stock and return or rotate before write-off.',
        owner: 'Pharmacy in-charge',
        estimateWeight: 45000,
      },
      {
        id: 'pharm-formulary',
        text: 'Is a formulary and preferred-vendor policy used to control procurement cost?',
        severity: 'Medium',
        explanation:
          'Uncontrolled procurement raises cost of goods without margin benefit.',
        recommendation:
          'Maintain a formulary and negotiate rate contracts with preferred vendors.',
        owner: 'Procurement lead',
        estimateWeight: 40000,
      },
    ],
  },
  {
    id: 'ot',
    name: 'OT and procedures',
    description:
      'Whether operating-theatre consumables, implants, and procedure charges are fully captured.',
    icon: 'OT',
    questions: [
      {
        id: 'ot-consumables',
        text: 'Are all OT consumables and implants recorded and charged per procedure?',
        severity: 'Critical',
        explanation:
          'Unrecorded consumables and implants are high-value leaks per case.',
        recommendation:
          'Use a per-case consumable checklist reconciled to the final bill.',
        owner: 'OT in-charge',
        estimateWeight: 300000,
      },
      {
        id: 'ot-package',
        text: 'Are procedure packages defined so inclusions and exclusions bill correctly?',
        severity: 'High',
        explanation:
          'Ambiguous packages cause under-billing of excluded items.',
        recommendation:
          'Define package inclusions/exclusions and bill extras explicitly.',
        owner: 'Billing lead',
        estimateWeight: 150000,
      },
      {
        id: 'ot-utilization',
        text: 'Is OT utilization and scheduling monitored to avoid idle high-cost capacity?',
        severity: 'Medium',
        explanation:
          'Idle theatre time is fixed cost with no offsetting revenue.',
        recommendation:
          'Track OT utilization and fill gaps with scheduled elective cases.',
        owner: 'OT manager',
        estimateWeight: 60000,
      },
      {
        id: 'ot-implant-log',
        text: 'Is there an implant log matching purchased, used, and billed implants?',
        severity: 'High',
        explanation:
          'Implant mismatches are costly and hard to detect after discharge.',
        recommendation:
          'Reconcile implant purchase, usage, and billing for every case.',
        owner: 'Stores / OT in-charge',
        estimateWeight: 140000,
      },
    ],
  },
  {
    id: 'diagnostics',
    name: 'Lab and radiology',
    description:
      'Whether diagnostic tests ordered are performed, charged, and reconciled.',
    icon: 'DX',
    questions: [
      {
        id: 'dx-order-charge',
        text: 'Is every lab and radiology test ordered reconciled to a charge?',
        severity: 'Critical',
        explanation:
          'Ordered-but-uncharged tests are a common diagnostics leak.',
        recommendation:
          'Reconcile ordered vs performed vs charged tests daily.',
        owner: 'Diagnostics lead',
        estimateWeight: 220000,
      },
      {
        id: 'dx-outsourced',
        text: 'Are outsourced/referred tests marked up and billed to the patient correctly?',
        severity: 'High',
        explanation:
          'Outsourced tests billed at cost erode margin unnoticed.',
        recommendation:
          'Apply the approved markup on outsourced tests and reconcile vendor invoices.',
        owner: 'Diagnostics lead',
        estimateWeight: 120000,
      },
      {
        id: 'dx-repeat',
        text: 'Are repeat or wasted tests (sample rejections, machine errors) tracked and minimized?',
        severity: 'Medium',
        explanation:
          'Repeat tests consume reagents and capacity without added revenue.',
        recommendation:
          'Track rejection and repeat rates and address root causes.',
        owner: 'Lab in-charge',
        estimateWeight: 45000,
      },
      {
        id: 'dx-report-tat',
        text: 'Are report turnaround times managed so patients complete and pay for diagnostics?',
        severity: 'Medium',
        explanation:
          'Slow reports push patients to complete diagnostics elsewhere.',
        recommendation:
          'Monitor turnaround times and escalate breaches.',
        owner: 'Diagnostics lead',
        estimateWeight: 50000,
      },
    ],
  },
  {
    id: 'inpatient',
    name: 'Inpatient, discharge, and collections',
    description:
      'Whether the inpatient bill is complete at discharge and dues are collected.',
    icon: 'IP',
    questions: [
      {
        id: 'ip-final-bill',
        text: 'Is the final inpatient bill reconciled for all services before discharge?',
        severity: 'Critical',
        explanation:
          'Charges missed before discharge are rarely recovered afterward.',
        recommendation:
          'Run a pre-discharge bill audit covering pharmacy, OT, diagnostics, and consumables.',
        owner: 'Billing lead',
        estimateWeight: 340000,
      },
      {
        id: 'ip-advance',
        text: 'Are advances and interim bills collected against running inpatient charges?',
        severity: 'High',
        explanation:
          'Letting balances build up increases the risk of unrecoverable dues.',
        recommendation:
          'Collect advances and issue interim bills as charges accrue.',
        owner: 'Front office / billing',
        estimateWeight: 160000,
      },
      {
        id: 'ip-tpa-followup',
        text: 'Are TPA/insurance approvals and final settlements actively followed up to closure?',
        severity: 'Critical',
        explanation:
          'Stalled TPA settlements tie up cash and become write-offs.',
        recommendation:
          'Maintain a TPA follow-up worklist with ageing and escalation.',
        owner: 'TPA desk',
        estimateWeight: 280000,
      },
      {
        id: 'ip-receivables',
        text: 'Are outstanding receivables aged and actively pursued after discharge?',
        severity: 'High',
        explanation:
          'Unmanaged receivables age into bad debt.',
        recommendation:
          'Review an ageing report weekly and pursue overdue balances.',
        owner: 'Finance lead',
        estimateWeight: 150000,
      },
    ],
  },
];
