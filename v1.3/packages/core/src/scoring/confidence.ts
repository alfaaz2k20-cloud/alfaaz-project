import type { SjtParameterResult } from './sjt_scoring.js';
import type { GameParameterEvidence } from './game_scoring.js';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export function calculateConfidence(
  sjt: SjtParameterResult & { conf?: ConfidenceLevel },
  game: GameParameterEvidence,
  dqSoft: boolean
): ConfidenceLevel {
  let baseConfidence: ConfidenceLevel = 'HIGH';

  if (
    game.level === null ||
    sjt.conf === 'LOW' ||
    dqSoft ||
    game.single_feature
  ) {
    baseConfidence = 'LOW';
  } else if (
    game.status === 'UNCALIBRATED' ||
    sjt.near_boundary
    // Note: Spec 6 mentions game["near_boundary"] but V1.3 games compute index, not near_boundary directly.
    // If we wanted to, we could check min(abs(game.index - 0.34), abs(game.index - 0.67)) < 0.05
  ) {
    baseConfidence = 'MEDIUM';
  }

  // §10: If within_game_divergence is true, lower confidence one step
  if (game.within_game_divergence) {
    if (baseConfidence === 'HIGH') baseConfidence = 'MEDIUM';
    else if (baseConfidence === 'MEDIUM') baseConfidence = 'LOW';
  }

  return baseConfidence;
}
