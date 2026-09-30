import type { ParameterKey } from '../types/sjt.js';
import type { SjtLevel } from './sjt_scoring.js';

export interface MeasureEvidence {
  index: number; // 0 to 1
  blocked: boolean;
  neutral_reason?: string; 
}

export interface GameParameterEvidence {
  index: number;
  level: SjtLevel | null;
  status: 'UNCALIBRATED' | 'INSUFFICIENT';
  reason?: string;
  single_feature: boolean;
  within_game_divergence: boolean;
  measure_count: number;
}

// Maps parameters to their potential measures
export const PARAMETER_MEASURES: Record<ParameterKey, string[]> = {
  empathy: ['G1', 'E2'],
  conscientiousness: ['G2', 'C2'],
  collaborative_spirit: ['G3'],
  emotional_agility: ['G4'],
  curiosity: ['G5'],
  creative_initiative: ['G6'],
  motivation: ['G7', 'M2']
};

export function scoreGameParameter(
  parameter: ParameterKey,
  measures: Record<string, MeasureEvidence>,
  singleFeatureOverride: boolean = false
): GameParameterEvidence {
  const assignedMeasures = PARAMETER_MEASURES[parameter];
  
  const validIndices: number[] = [];
  let blockedReason: string | undefined;

  for (const m of assignedMeasures) {
    const evidence = measures[m];
    if (!evidence) continue;

    if (evidence.blocked) {
      if (!blockedReason) blockedReason = evidence.neutral_reason || "BLOCKED";
      continue;
    }

    if (evidence.neutral_reason) {
      if (!blockedReason) blockedReason = evidence.neutral_reason;
      continue;
    }

    validIndices.push(evidence.index);
  }

  if (validIndices.length === 0) {
    return {
      index: 0,
      level: null,
      status: 'INSUFFICIENT',
      reason: blockedReason || "NO_SCOREABLE_FEATURES",
      single_feature: false,
      within_game_divergence: false,
      measure_count: 0
    };
  }

  const index = validIndices.reduce((a, b) => a + b, 0) / validIndices.length;
  
  let level: SjtLevel = 'LOW';
  if (index >= 0.67) level = 'HIGH';
  else if (index >= 0.34) level = 'MODERATE';

  let within_game_divergence = false;
  if (validIndices.length === 2) {
    const max = Math.max(...validIndices);
    const min = Math.min(...validIndices);
    if (max - min > 0.34) {
      within_game_divergence = true;
    }
  }

  return {
    index: Number(index.toFixed(4)),
    level,
    status: 'UNCALIBRATED',
    single_feature: singleFeatureOverride,
    within_game_divergence,
    measure_count: validIndices.length
  };
}
