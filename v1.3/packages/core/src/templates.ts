import type { ConvergenceRelationship } from './scoring/convergence.js';
import type { SjtLevel } from './scoring/sjt_scoring.js';

export function getRelationshipText(
  relationship: ConvergenceRelationship,
  sjtLevel: SjtLevel | null,
  gameLevel: SjtLevel | null,
  direction?: string,
  withinGameDivergence?: boolean
): string {
  let text = '';

  const formatLevel = (l: SjtLevel | null) => {
    if (!l) return 'None';
    return l.charAt(0).toUpperCase() + l.slice(1).toLowerCase();
  };

  const sl = formatLevel(sjtLevel);
  const gl = formatLevel(gameLevel);

  switch (relationship) {
    case 'STRONG':
      text = `SJT evidence: ${sl}. Game evidence: ${gl}. Strong convergence.`;
      break;
    case 'PARTIAL':
      text = `SJT evidence: ${sl}. Game evidence: ${gl}. Partial convergence.`;
      break;
    case 'DIVERGENT':
      text = `SJT evidence was ${direction === 'game higher' ? 'lower' : 'higher'} than observed behavioral evidence in the simulation. This is a prompt for a conversation, not a conclusion.`;
      if (sjtLevel === 'LOW') {
        text += ' SJT levels reflect relative emphasis among competing responses; a low level can occur when other responses were prioritised.';
      }
      break;
    case 'SJT_ONLY':
      text = 'Game evidence not available, neutral, or not yet calibrated. This result rests on SJT evidence.';
      break;
    case 'INSUFFICIENT':
      text = 'Not enough valid evidence to interpret.';
      break;
  }

  if (withinGameDivergence) {
    text += ' Two game measures of this parameter point different ways; treat game evidence as mixed.';
  }

  return text;
}
