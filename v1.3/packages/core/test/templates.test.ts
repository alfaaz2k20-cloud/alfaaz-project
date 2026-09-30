import { describe, it, expect } from 'vitest';
import { getRelationshipText } from '../src/templates.js';

describe('Report Templates', () => {
  it('formats STRONG correctly', () => {
    const text = getRelationshipText('STRONG', 'HIGH', 'HIGH');
    expect(text).toBe('SJT evidence: High. Game evidence: High. Strong convergence.');
  });

  it('formats PARTIAL correctly', () => {
    const text = getRelationshipText('PARTIAL', 'HIGH', 'MODERATE');
    expect(text).toBe('SJT evidence: High. Game evidence: Moderate. Partial convergence.');
  });

  it('formats DIVERGENT correctly', () => {
    const text = getRelationshipText('DIVERGENT', 'LOW', 'HIGH', 'game higher');
    expect(text).toContain('SJT evidence was lower than observed behavioral evidence');
    expect(text).toContain('SJT levels reflect relative emphasis among competing responses');
  });

  it('formats SJT_ONLY correctly', () => {
    const text = getRelationshipText('SJT_ONLY', 'HIGH', null);
    expect(text).toContain('Game evidence not available');
  });

  it('formats INSUFFICIENT correctly', () => {
    const text = getRelationshipText('INSUFFICIENT', null, null);
    expect(text).toContain('Not enough valid evidence');
  });

  it('adds within game divergence warning', () => {
    const text = getRelationshipText('STRONG', 'HIGH', 'HIGH', undefined, true);
    expect(text).toContain('Two game measures of this parameter point different ways');
  });
});
