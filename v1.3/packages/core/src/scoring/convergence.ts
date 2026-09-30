import type { SjtLevel } from './sjt_scoring.js';
import type { GameParameterEvidence } from './game_scoring.js';

export type ConvergenceRelationship = 
  | 'STRONG' 
  | 'PARTIAL' 
  | 'DIVERGENT' 
  | 'SJT_ONLY' 
  | 'INSUFFICIENT';

const LV = {
  HIGH: 3,
  MODERATE: 2,
  LOW: 1
};

export function converge(
  sjtLevel: SjtLevel | null,
  game: GameParameterEvidence,
  config: { CONVERGENCE_REQUIRES_CALIBRATION: boolean }
): { relationship: ConvergenceRelationship; direction?: string } {
  if (sjtLevel === null) {
    return { relationship: 'INSUFFICIENT' };
  }

  if (game.level === null) {
    return { relationship: 'SJT_ONLY' };
  }

  if (config.CONVERGENCE_REQUIRES_CALIBRATION && game.status === 'UNCALIBRATED') {
    return { relationship: 'SJT_ONLY' };
  }

  const sjtVal = LV[sjtLevel];
  const gameVal = LV[game.level];
  const d = Math.abs(sjtVal - gameVal);

  let direction = '';
  if (sjtVal > gameVal) direction = 'game lower';
  else if (sjtVal < gameVal) direction = 'game higher';

  if (d === 2) {
    return { relationship: 'DIVERGENT', direction };
  }
  if (d === 0 && sjtLevel !== 'MODERATE') {
    return { relationship: 'STRONG' };
  }
  
  return { relationship: 'PARTIAL', direction: d > 0 ? direction : undefined };
}
