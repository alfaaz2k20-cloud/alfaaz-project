import { describe, it, expect } from 'vitest';
import { scoreSjtResponse, computeMaxMin, computeReferenceDistributions } from '../src/scoring/sjt_scoring.js';
import type { SjtConfig } from '../src/types/sjt.js';

const mockConfig: SjtConfig = {
  sjt_version: '1.0',
  scenarios: [
    {
      id: 'S1', act: 1, setup: 'Test',
      options: [
        { id: 'O1', text: 'A', keys: { empathy: 3, conscientiousness: 0, collaborative_spirit: 0, emotional_agility: 0, curiosity: 0, creative_initiative: 0, motivation: 0 } },
        { id: 'O2', text: 'B', keys: { empathy: 0, conscientiousness: 3, collaborative_spirit: 0, emotional_agility: 0, curiosity: 0, creative_initiative: 0, motivation: 0 } },
        { id: 'O3', text: 'C', keys: { empathy: 0, conscientiousness: 0, collaborative_spirit: 3, emotional_agility: 0, curiosity: 0, creative_initiative: 0, motivation: 0 } }
      ]
    }
  ]
};

describe('SJT Scoring', () => {
  it('computes max/min correctly', () => {
    const { max, min } = computeMaxMin(mockConfig);
    expect(max.empathy).toBe(3);
    expect(min.empathy).toBe(0);
  });

  it('scores a response using ratio_bands', () => {
    const responses = { 'S1': 'O1' };
    const result = scoreSjtResponse(mockConfig, responses, 'ratio_bands');
    
    expect(result.empathy.raw).toBe(3);
    expect(result.empathy.ratio).toBe(1);
    expect(result.empathy.level).toBe('HIGH');
    
    expect(result.conscientiousness.raw).toBe(0);
    expect(result.conscientiousness.ratio).toBe(0);
    expect(result.conscientiousness.level).toBe('LOW');
  });

  it('scores a response using reference_percentile', () => {
    const dists = computeReferenceDistributions(mockConfig);
    const responses = { 'S1': 'O1' };
    const result = scoreSjtResponse(mockConfig, responses, 'reference_percentile', dists);
    
    // O1 gives empathy 3. The possible empathy scores are 3, 0, 0.
    // Sorted dist for empathy: [0, 0, 3].
    // Count <= 3 is 3. Percentile = 3/3 = 1.0 (100%).
    expect(result.empathy.percentile).toBe(1);
    expect(result.empathy.level).toBe('HIGH');
    
    // Conscientiousness: O1 gives 0. Dist: [0, 0, 3].
    // Count <= 0 is 2. Percentile = 2/3 = 0.6666...
    // 0.6666 >= 0.6666 (in standard float comparison it's >=)
    // Actually 2/3 is exactly 0.6666666666666666
    expect(result.conscientiousness.percentile).toBeCloseTo(0.6666, 3);
  });

  it('identifies near_boundary', () => {
    // If ratio is 0.35, dist to 0.34 is 0.01 (<0.05)
    // We would need a ratio like that to test it accurately.
    const customConfig: SjtConfig = {
      sjt_version: '1.0',
      scenarios: [
        {
          id: 'S1', act: 1, setup: 'Test',
          options: [
            { id: 'O1', text: 'A', keys: { empathy: 35, conscientiousness: 0, collaborative_spirit: 0, emotional_agility: 0, curiosity: 0, creative_initiative: 0, motivation: 0 } },
            { id: 'O2', text: 'B', keys: { empathy: 100, conscientiousness: 0, collaborative_spirit: 0, emotional_agility: 0, curiosity: 0, creative_initiative: 0, motivation: 0 } },
            { id: 'O3', text: 'C', keys: { empathy: 0, conscientiousness: 0, collaborative_spirit: 0, emotional_agility: 0, curiosity: 0, creative_initiative: 0, motivation: 0 } }
          ]
        }
      ]
    };
    const result = scoreSjtResponse(customConfig, { 'S1': 'O1' });
    expect(result.empathy.ratio).toBe(0.35);
    expect(result.empathy.near_boundary).toBe(true);
  });
});
