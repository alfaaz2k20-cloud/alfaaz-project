export interface G7Result {
  extra_units: number; // 0 to 30
  cadence_change: number | null; // e.g. 0.1 means 10% slower
  resumed_after_pause: number | null; // 1 or 0
}

export function extractG7(result: G7Result) {
  if (result.extra_units === 0) {
    return { index: 0, level: null, status: 'INSUFFICIENT', reason: 'NEUTRAL_STOP' };
  }

  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  const F1 = clamp(result.extra_units / 30);
  const F2 = result.cadence_change !== null ? 1 - clamp(result.cadence_change / 0.5) : null;
  const F3 = result.resumed_after_pause;

  let weightSum = 0.60;
  let scoreSum = 0.60 * F1;

  if (F2 !== null) { weightSum += 0.25; scoreSum += 0.25 * F2; }
  if (F3 !== null) { weightSum += 0.15; scoreSum += 0.15 * F3; }

  const index = weightSum > 0 ? scoreSum / weightSum : 0;

  let level = 'MODERATE';
  if (index >= 0.67) level = 'HIGH';
  if (index <= 0.34) level = 'LOW';

  return { index, level, F1, F2, F3, status: 'UNCALIBRATED' };
}
