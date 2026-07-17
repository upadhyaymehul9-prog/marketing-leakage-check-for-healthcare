import { describe, expect, test } from 'vitest';
import { calculateAudit } from './scoring';
import { AUDIT_SECTIONS } from '../data/audit';

describe('scoring themes', () => {
  test('separates marketing and brand health', () => {
    const result = calculateAudit(AUDIT_SECTIONS, {});
    expect(result.marketingHealth).toBeDefined();
    expect(result.brandHealth).toBeDefined();
    expect(result.sectionResults.length).toBe(7);
  });

  test('na answers count as complete without adding risk', () => {
    const q = AUDIT_SECTIONS[0].questions[0];
    const result = calculateAudit(AUDIT_SECTIONS, {
      [q.id]: { answer: 'na', updatedAt: 0 },
    });
    expect(result.completion).toBeGreaterThan(0);
    expect(result.overallHealth).toBe('Strong');
  });

  test('includes research-backed campaign questions', () => {
    const campaigns = AUDIT_SECTIONS.find((s) => s.id === 'campaigns');
    expect(campaigns).toBeDefined();
    const ids = AUDIT_SECTIONS.flatMap((s) => s.questions.map((q) => q.id));
    expect(ids).toContain('camp-pac');
    expect(ids).toContain('camp-ltv');
    expect(ids).toContain('camp-landing');
    expect(ids).toContain('ret-recall');
    expect(ids).toContain('ex-nps');
  });
});
