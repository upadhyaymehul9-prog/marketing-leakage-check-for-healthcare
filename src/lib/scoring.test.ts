import { describe, expect, test } from 'vitest';
import { calculateAudit } from './scoring';
import { AUDIT_SECTIONS } from '../data/audit';
import type { AuditSection, ResponseMap } from '../types';

function responses(entries: Record<string, string>): ResponseMap {
  const map: ResponseMap = {};
  for (const [id, answer] of Object.entries(entries)) {
    map[id] = { answer: answer as never, updatedAt: 0 };
  }
  return map;
}

const singleSection: AuditSection = {
  id: 's1',
  name: 'Section One',
  description: 'desc',
  icon: 'S1',
  questions: [
    {
      id: 'q1',
      text: 'Critical control?',
      severity: 'Critical',
      recommendation: 'Do the thing',
      owner: 'Owner',
      estimateWeight: 100000,
    },
  ],
};

describe('calculateAudit', () => {
  test('documented evidence yields Low overall risk', () => {
    const result = calculateAudit([singleSection], responses({ q1: 'evidence' }));
    expect(result.overallRisk).toBe('Low');
  });

  test('missing critical control yields Critical overall risk', () => {
    const result = calculateAudit([singleSection], responses({ q1: 'no' }));
    expect(result.overallRisk).toBe('Critical');
  });

  test('not applicable answers count as complete but do not add risk', () => {
    const result = calculateAudit([singleSection], responses({ q1: 'na' }));
    expect(result.completion).toBe(1);
    expect(result.overallRisk).toBe('Low');
  });

  test('unanswered questions leave completion below 1', () => {
    const result = calculateAudit([singleSection], responses({}));
    expect(result.completion).toBe(0);
    expect(result.answeredCount).toBe(0);
  });

  test('partial answer produces a mid-band risk', () => {
    const result = calculateAudit([singleSection], responses({ q1: 'partial' }));
    // partial => 2/4 weakness => Moderate/High band, not Low or Critical
    expect(['Moderate', 'High']).toContain(result.overallRisk);
  });

  test('opportunity range is ordered and non-negative', () => {
    const result = calculateAudit([singleSection], responses({ q1: 'no' }));
    expect(result.opportunity.low).toBeGreaterThanOrEqual(0);
    expect(result.opportunity.high).toBeGreaterThanOrEqual(result.opportunity.low);
  });

  test('missing control appears as a prioritized action', () => {
    const result = calculateAudit([singleSection], responses({ q1: 'no' }));
    expect(result.actions).toHaveLength(1);
    expect(result.actions[0].questionId).toBe('q1');
    expect(result.actions[0].phase).toBe('30');
  });

  test('full audit dataset scores without throwing', () => {
    const result = calculateAudit(AUDIT_SECTIONS, {});
    expect(result.totalCount).toBeGreaterThanOrEqual(28);
    expect(result.sectionResults).toHaveLength(AUDIT_SECTIONS.length);
  });
});
