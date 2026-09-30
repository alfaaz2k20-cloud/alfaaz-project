export interface G4SegmentResult {
  segment: number; // 1, 2, 3
  recoveryTrials: number; // 3 to 15
  persevErrors: number; 
}

export interface G4GlobalResult {
  bursts: number;
  idleGaps: number;
  baselineAccuracy: number; // Blocks if < 0.75
}

export function extractG4(segments: G4SegmentResult[], global: G4GlobalResult) {
  if (global.baselineAccuracy < 0.75) {
    return { index: 0, level: null, status: 'INSUFFICIENT', reason: 'TASK_NOT_LEARNED' };
  }

  const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

  let f1_sum = 0;
  let f2_sum = 0;

  for (const s of segments) {
    f1_sum += 1 - clamp((s.recoveryTrials - 3) / 12);
    f2_sum += 1 - clamp(s.persevErrors / 6);
  }

  const F1 = f1_sum / segments.length;
  const F2 = f2_sum / segments.length;
  
  const stability = 1 - clamp((global.bursts + global.idleGaps) / 4);
  const F3 = stability;

  const rec1 = segments.find(s => s.segment === 1)?.recoveryTrials || 15;
  const rec3 = segments.find(s => s.segment === 3)?.recoveryTrials || 15;
  const learning = 0.5 + clamp((rec1 - rec3) / 10, -0.5, 0.5);
  const F4 = learning;

  const index = (0.35 * F1) + (0.30 * F2) + (0.15 * F3) + (0.20 * F4);

  let level = 'MODERATE';
  if (index >= 0.67) level = 'HIGH';
  if (index <= 0.34) level = 'LOW';

  return { index, level, F1, F2, F3, F4, status: 'UNCALIBRATED' };
}
