import type { ParameterKey, SjtConfig } from '../types/sjt.js';

export type SjtLevel = 'HIGH' | 'MODERATE' | 'LOW';

export interface SjtParameterResult {
  raw: number;
  max: number;
  min: number;
  ratio: number;
  level: SjtLevel;
  rank: 'HIGH' | 'MODERATE' | 'LOW'; // rank is a descriptor only, same as level
  n_informing: number;
  near_boundary: boolean;
  percentile?: number; 
}

export type SjtScoreResult = Record<ParameterKey, SjtParameterResult>;

export function computeMaxMin(config: SjtConfig) {
  const max: Record<string, number> = {};
  const min: Record<string, number> = {};
  const params = ['empathy', 'conscientiousness', 'collaborative_spirit', 'emotional_agility', 'curiosity', 'creative_initiative', 'motivation'];

  for (const p of params) {
    max[p] = 0;
    min[p] = 0;
  }

  for (const scenario of config.scenarios) {
    for (const p of params) {
      const vals = scenario.options.map(o => o.keys[p as ParameterKey] ?? 0);
      max[p] += Math.max(...vals);
      min[p] += Math.min(...vals);
    }
  }

  return { max, min };
}

export function computeReferenceDistributions(config: SjtConfig) {
  const dists: Record<string, number[]> = {
    empathy: [], conscientiousness: [], collaborative_spirit: [],
    emotional_agility: [], curiosity: [], creative_initiative: [], motivation: []
  };

  const params = Object.keys(dists) as ParameterKey[];

  function recurse(scenarioIndex: number, currentSums: Record<ParameterKey, number>) {
    if (scenarioIndex >= config.scenarios.length) {
      for (const p of params) {
        dists[p].push(currentSums[p]);
      }
      return;
    }
    const scenario = config.scenarios[scenarioIndex];
    for (const option of scenario.options) {
      const nextSums = { ...currentSums };
      for (const p of params) {
        nextSums[p] += (option.keys[p] ?? 0);
      }
      recurse(scenarioIndex + 1, nextSums);
    }
  }

  const initialSums = Object.fromEntries(params.map(p => [p, 0])) as Record<ParameterKey, number>;
  recurse(0, initialSums);

  for (const p of params) {
    dists[p].sort((a, b) => a - b);
  }

  return dists;
}

export function scoreSjtResponse(
  config: SjtConfig,
  responses: Record<string, string>, // scenario.id -> option.id
  method: 'ratio_bands' | 'reference_percentile' = 'ratio_bands',
  refDists?: Record<string, number[]>
): SjtScoreResult {
  const params = ['empathy', 'conscientiousness', 'collaborative_spirit', 'emotional_agility', 'curiosity', 'creative_initiative', 'motivation'] as ParameterKey[];
  const { max, min } = computeMaxMin(config);
  
  const raw: Record<string, number> = Object.fromEntries(params.map(p => [p, 0]));
  const nInforming: Record<string, number> = Object.fromEntries(params.map(p => [p, 0]));

  for (const scenario of config.scenarios) {
    const selectedOptionId = responses[scenario.id];
    if (!selectedOptionId) continue;

    const option = scenario.options.find(o => o.id === selectedOptionId);
    if (!option) continue;

    for (const p of params) {
      const val = option.keys[p] ?? 0;
      raw[p] += val;
      
      const maxPossibleForScenario = Math.max(...scenario.options.map(o => o.keys[p] ?? 0));
      if (maxPossibleForScenario > 0) {
        nInforming[p] += 1;
      }
    }
  }

  const result: Partial<SjtScoreResult> = {};

  for (const p of params) {
    const r = raw[p];
    const m = max[p];
    const mn = min[p];
    const ratio = m - mn === 0 ? 0 : (r - mn) / (m - mn);
    
    let level: SjtLevel = 'LOW';
    let percentile: number | undefined;

    if (method === 'ratio_bands') {
      if (ratio >= 0.67) level = 'HIGH';
      else if (ratio >= 0.34) level = 'MODERATE';
      else level = 'LOW';
    } else {
      if (!refDists) throw new Error("reference_percentile requires refDists");
      const dist = refDists[p];
      // Percentile is percentage of patterns <= this raw score
      let count = 0;
      for (const val of dist) {
        if (val <= r) count++;
        else break;
      }
      percentile = count / dist.length;
      if (percentile >= 0.6666) level = 'HIGH';
      else if (percentile >= 0.3333) level = 'MODERATE';
      else level = 'LOW';
    }

    const near_boundary = Math.min(Math.abs(ratio - 0.34), Math.abs(ratio - 0.67)) < 0.05;

    result[p] = {
      raw: r,
      max: m,
      min: mn,
      ratio: Number(ratio.toFixed(4)),
      level,
      rank: level,
      n_informing: nInforming[p],
      near_boundary,
      percentile: percentile !== undefined ? Number(percentile.toFixed(4)) : undefined
    };
  }

  return result as SjtScoreResult;
}
