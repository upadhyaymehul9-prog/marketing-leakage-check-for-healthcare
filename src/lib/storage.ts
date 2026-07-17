import type { AuditState, Response, ResponseMap } from '../types';

export const STORAGE_KEY = 'hospital-marketing-brand-audit:v1';
const SCHEMA_VERSION = 1;

const VALID = ['evidence', 'undocumented', 'partial', 'no', 'na'];

export const emptyState = (): AuditState => ({
  version: SCHEMA_VERSION,
  responses: {},
  updatedAt: null,
});

function isValidResponse(v: unknown): v is Response {
  if (typeof v !== 'object' || v === null) return false;
  const c = v as Record<string, unknown>;
  if (!VALID.includes(c.answer as string)) return false;
  if (c.note !== undefined && typeof c.note !== 'string') return false;
  return typeof c.updatedAt === 'number';
}

function sanitize(raw: unknown): ResponseMap {
  if (typeof raw !== 'object' || raw === null) return {};
  const out: ResponseMap = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (isValidResponse(v)) out[k] = v;
  }
  return out;
}

export function loadState(): AuditState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== 'object' || parsed === null) return emptyState();
    const c = parsed as Record<string, unknown>;
    if (c.version !== SCHEMA_VERSION) return emptyState();
    return {
      version: SCHEMA_VERSION,
      responses: sanitize(c.responses),
      updatedAt: typeof c.updatedAt === 'number' ? c.updatedAt : null,
    };
  } catch {
    return emptyState();
  }
}

export function saveState(state: AuditState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / private mode
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
