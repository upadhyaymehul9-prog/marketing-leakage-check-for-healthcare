import type { AuditState, Response, ResponseMap } from '../types';

export const STORAGE_KEY = 'revenue-leakage-audit:v1';
const SCHEMA_VERSION = 1;

const VALID_ANSWERS = ['evidence', 'undocumented', 'partial', 'no', 'na'];

export const emptyState = (): AuditState => ({
  version: SCHEMA_VERSION,
  responses: {},
  updatedAt: null,
});

function isValidResponse(value: unknown): value is Response {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  if (!VALID_ANSWERS.includes(candidate.answer as string)) return false;
  if (candidate.note !== undefined && typeof candidate.note !== 'string') {
    return false;
  }
  if (typeof candidate.updatedAt !== 'number') return false;
  return true;
}

function sanitizeResponses(value: unknown): ResponseMap {
  if (typeof value !== 'object' || value === null) return {};
  const result: ResponseMap = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (isValidResponse(raw)) {
      result[key] = raw;
    }
  }
  return result;
}

export function loadState(): AuditState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== 'object' || parsed === null) return emptyState();
    const candidate = parsed as Record<string, unknown>;
    if (candidate.version !== SCHEMA_VERSION) return emptyState();
    return {
      version: SCHEMA_VERSION,
      responses: sanitizeResponses(candidate.responses),
      updatedAt:
        typeof candidate.updatedAt === 'number' ? candidate.updatedAt : null,
    };
  } catch {
    return emptyState();
  }
}

export function saveState(state: AuditState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable (private mode / quota); fail silently.
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors on clear.
  }
}
