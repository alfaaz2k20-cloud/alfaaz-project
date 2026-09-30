import { describe, it, expect } from 'vitest';
import { scoreGameParameter } from '../src/scoring/game_scoring.js';

describe('Game Scoring', () => {
  it('computes basic mean for single valid measure', () => {
    const result = scoreGameParameter('collaborative_spirit', {
      'G3': { index: 0.8, blocked: false }
    });
    expect(result.index).toBe(0.8);
    expect(result.level).toBe('HIGH');
    expect(result.status).toBe('UNCALIBRATED');
    expect(result.within_game_divergence).toBe(false);
  });

  it('computes mean for two valid measures', () => {
    const result = scoreGameParameter('empathy', {
      'G1': { index: 0.9, blocked: false },
      'E2': { index: 0.7, blocked: false }
    });
    expect(result.index).toBe(0.8);
    expect(result.level).toBe('HIGH');
    expect(result.within_game_divergence).toBe(false);
  });

  it('flags within_game_divergence when diff > 0.34', () => {
    const result = scoreGameParameter('conscientiousness', {
      'G2': { index: 0.9, blocked: false },
      'C2': { index: 0.5, blocked: false } // Diff is 0.4
    });
    expect(result.index).toBe(0.7);
    expect(result.within_game_divergence).toBe(true);
  });

  it('handles blocked measures by ignoring them', () => {
    const result = scoreGameParameter('motivation', {
      'G7': { index: 0.9, blocked: false },
      'M2': { index: 0.0, blocked: true, neutral_reason: 'M2_ALT_MODE_FAILED' }
    });
    expect(result.index).toBe(0.9);
    expect(result.measure_count).toBe(1);
  });

  it('returns INSUFFICIENT if all measures are blocked', () => {
    const result = scoreGameParameter('motivation', {
      'G7': { index: 0, blocked: true, neutral_reason: 'SKIPPED' },
      'M2': { index: 0, blocked: true, neutral_reason: 'SKIPPED' }
    });
    expect(result.status).toBe('INSUFFICIENT');
    expect(result.level).toBe(null);
    expect(result.reason).toBe('SKIPPED');
  });
});
