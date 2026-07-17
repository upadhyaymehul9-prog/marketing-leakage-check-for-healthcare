export type Severity = 'Critical' | 'High' | 'Medium';

export type AnswerValue = 'evidence' | 'undocumented' | 'partial' | 'no' | 'na';

export type HealthBand = 'Strong' | 'Developing' | 'At Risk' | 'Critical';

export type Phase = '30' | '60' | '90';

export interface AuditQuestion {
  id: string;
  text: string;
  severity: Severity;
  /** Short label for the control being audited */
  controlArea: string;
  /** What evidence an auditor should look for */
  evidenceHint: string;
  explanation?: string;
  recommendation: string;
  owner: string;
  source: 'marketing' | 'branding';
}

export interface AuditSection {
  id: string;
  name: string;
  description: string;
  icon: string;
  theme: 'marketing' | 'branding';
  /** Audit objective for this domain */
  objective: string;
  questions: AuditQuestion[];
}

export interface Response {
  answer: AnswerValue;
  note?: string;
  updatedAt: number;
}

export type ResponseMap = Record<string, Response>;

export interface AuditState {
  version: number;
  responses: ResponseMap;
  updatedAt: number | null;
}

export interface SectionResult {
  sectionId: string;
  name: string;
  icon: string;
  theme: 'marketing' | 'branding';
  answered: number;
  total: number;
  score: number;
  health: HealthBand;
}

export interface ReportAction {
  questionId: string;
  sectionName: string;
  severity: Severity;
  controlArea: string;
  answer: AnswerValue | 'unanswered';
  text: string;
  recommendation: string;
  owner: string;
  phase: Phase;
}

export interface AuditResult {
  completion: number;
  answeredCount: number;
  totalCount: number;
  sectionResults: SectionResult[];
  marketingHealth: HealthBand;
  brandHealth: HealthBand;
  overallHealth: HealthBand;
  actions: ReportAction[];
}
