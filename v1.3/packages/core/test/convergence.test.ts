import { describe, it, expect } from 'vitest';
import { converge } from '../src/scoring/convergence.js';

describe('Convergence', () => {
  const cfg = { CONVERGENCE_REQUIRES_CALIBRATION: false };

  it('STRONG when both are same', () => {
    const res = converge('HIGH', { index: 0.9, level: 'HIGH', status: 'UNCALIBRATED', single_feature: false, within_game_divergence: false, measure_count: 1 }, cfg);
    expect(res.relationship).toBe('STRONG');
  });

  it('PARTIAL when off by 1', () => {
    const res = converge('MODERATE', { index: 0.9, level: 'HIGH', status: 'UNCALIBRATED', single_feature: false, within_game_divergence: false, measure_count: 1 }, cfg);
    expect(res.relationship).toBe('PARTIAL');
    expect(res.direction).toBe('game higher');
  });

  it('DIVERGENT when off by 2', () => {
    const res = converge('LOW', { index: 0.9, level: 'HIGH', status: 'UNCALIBRATED', single_feature: false, within_game_divergence: false, measure_count: 1 }, cfg);
    expect(res.relationship).toBe('DIVERGENT');
    expect(res.direction).toBe('game higher');
  });

  it('SJT_ONLY when game is missing', () => {
    const res = converge('HIGH', { index: 0, level: null, status: 'INSUFFICIENT', single_feature: false, within_game_divergence: false, measure_count: 0 }, cfg);
    expect(res.relationship).toBe('SJT_ONLY');
  });

  it('SJT_ONLY when calibration is required and game is UNCALIBRATED', () => {
    const res = converge('HIGH', { index: 0.9, level: 'HIGH', status: 'UNCALIBRATED', single_feature: false, within_game_divergence: false, measure_count: 1 }, { CONVERGENCE_REQUIRES_CALIBRATION: true });
    expect(res.relationship).toBe('SJT_ONLY');
  });
});
