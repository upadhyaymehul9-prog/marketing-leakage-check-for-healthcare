import { beforeEach, describe, expect, test } from 'vitest';
import {
  STORAGE_KEY,
  clearState,
  emptyState,
  loadState,
  saveState,
} from './storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns a blank state when nothing is saved', () => {
    expect(loadState()).toEqual(emptyState());
  });

  test('returns a blank state when saved JSON is malformed', () => {
    localStorage.setItem(STORAGE_KEY, '{bad');
    expect(loadState().responses).toEqual({});
  });

  test('ignores state with an unexpected schema version', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 99, responses: { q1: { answer: 'no' } } }),
    );
    expect(loadState().responses).toEqual({});
  });

  test('round-trips valid responses', () => {
    const state = {
      version: 1,
      responses: {
        q1: { answer: 'no' as const, note: 'context', updatedAt: 123 },
      },
      updatedAt: 123,
    };
    saveState(state);
    expect(loadState()).toEqual(state);
  });

  test('drops individual malformed responses', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        responses: {
          good: { answer: 'partial', updatedAt: 1 },
          bad: { answer: 'not-a-real-answer', updatedAt: 1 },
        },
        updatedAt: 1,
      }),
    );
    const loaded = loadState();
    expect(loaded.responses.good).toBeDefined();
    expect(loaded.responses.bad).toBeUndefined();
  });

  test('clearState removes stored data', () => {
    saveState({ version: 1, responses: {}, updatedAt: 1 });
    clearState();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
