import { SjtConfigSchema } from '../types/sjt.js';
import type { ParameterKey } from '../types/sjt.js';

export interface SjtValidationResult {
  valid: boolean;
  errors: string[];
  max: Record<ParameterKey, number>;
  min: Record<ParameterKey, number>;
  coverage: Record<ParameterKey, number>;
  lengthCueCount: number;
}

export function validateSjt(data: unknown): SjtValidationResult {
  const result: SjtValidationResult = {
    valid: true,
    errors: [],
    max: {
      empathy: 0, conscientiousness: 0, collaborative_spirit: 0,
      emotional_agility: 0, curiosity: 0, creative_initiative: 0, motivation: 0
    },
    min: {
      empathy: 0, conscientiousness: 0, collaborative_spirit: 0,
      emotional_agility: 0, curiosity: 0, creative_initiative: 0, motivation: 0
    },
    coverage: {
      empathy: 0, conscientiousness: 0, collaborative_spirit: 0,
      emotional_agility: 0, curiosity: 0, creative_initiative: 0, motivation: 0
    },
    lengthCueCount: 0
  };

  const parsed = SjtConfigSchema.safeParse(data);
  if (!parsed.success) {
    result.valid = false;
    result.errors.push(...parsed.error.issues.map(e => `${e.path?.join('.')}: ${e.message}`));
    return result;
  }

  const config = parsed.data;

  // V4: Coverage & V6: Max/Min
  for (const scenario of config.scenarios) {
    const params: ParameterKey[] = [
      'empathy', 'conscientiousness', 'collaborative_spirit',
      'emotional_agility', 'curiosity', 'creative_initiative', 'motivation'
    ];

    for (const p of params) {
      const optionValues = scenario.options.map(o => o.keys[p] ?? 0);
      const maxVal = Math.max(...optionValues);
      const minVal = Math.min(...optionValues);
      
      result.max[p] += maxVal;
      result.min[p] += minVal;
      
      if (maxVal > 0) {
        result.coverage[p] += 1;
      }
    }

    let maxLen = -1;
    let maxLenIndexes: number[] = [];
    
    scenario.options.forEach((opt, idx) => {
      if (opt.text.length > maxLen) {
        maxLen = opt.text.length;
        maxLenIndexes = [idx];
      } else if (opt.text.length === maxLen) {
        maxLenIndexes.push(idx);
      }
    });

    const totals = scenario.options.map(opt => {
      return Object.values(opt.keys).reduce((sum, val) => sum + val, 0);
    });
    
    const highestTotal = Math.max(...totals);
    const highestTotalIndexes = totals.map((val, idx) => val === highestTotal ? idx : -1).filter(idx => idx !== -1);

    if (maxLenIndexes.length === 1 && highestTotalIndexes.length === 1 && maxLenIndexes[0] === highestTotalIndexes[0]) {
      result.lengthCueCount += 1;
    }
  }

  return result;
}
