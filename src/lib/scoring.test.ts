import { describe, expect, test } from 'vitest';
import { calculateAudit } from './scoring';
import { AUDIT_SECTIONS } from '../data/audit';
import { SECTION_HOW_TO } from '../data/howToAchieve';
import { QUESTION_HOW_TO } from '../data/questionHowTo';

describe('scoring themes', () => {
  test('separates marketing and brand health', () => {
    const result = calculateAudit(AUDIT_SECTIONS, {});
    expect(result.marketingHealth).toBeDefined();
    expect(result.brandHealth).toBeDefined();
    expect(result.sectionResults.length).toBe(14);
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
    expect(ids).toContain('rp-nps');
    expect(ids).toContain('dp-has-presence');
    expect(ids).toContain('li-five-min');
    expect(ids.length).toBeGreaterThanOrEqual(80);
  });

  test('every section has a how-to-achieve playbook', () => {
    for (const section of AUDIT_SECTIONS) {
      const steps = SECTION_HOW_TO[section.id];
      expect(steps, `missing how-to for ${section.id}`).toBeDefined();
      expect(steps.length).toBeGreaterThanOrEqual(5);
    }
  });

  test('every question has a detailed how-to with multiple steps', () => {
    for (const section of AUDIT_SECTIONS) {
      for (const q of section.questions) {
        const howTo = QUESTION_HOW_TO[q.id];
        expect(howTo, `missing question how-to for ${q.id}`).toBeDefined();
        expect(howTo.steps.length).toBeGreaterThanOrEqual(5);
      }
    }
  });
});
