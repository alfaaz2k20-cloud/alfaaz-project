export interface G6Attempt {
  family: string;
  progress: number;
  outcome: 'SUCCESS' | 'FAIL';
  failReason?: 'fell_in_gap' | 'structure_collapsed' | 'timeout';
  isFeedbackDriven: boolean;
  isRandomChange: boolean;
  isRepeat: boolean;
}

export interface G6PuzzleResult {
  puzzleId: string;
  attempts: G6Attempt[];
  solvedOnAttempt1: boolean;
}

export function extractG6(puzzles: G6PuzzleResult[]) {
  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  let countingPuzzles = 0;
  
  let diversitySum = 0;
  let feedbackRateSum = 0;
  let usefulIterationSum = 0;
  let persistenceSum = 0;

  for (const p of puzzles) {
    if (p.solvedOnAttempt1 || p.attempts.length === 0) continue;
    
    countingPuzzles++;
    
    // Diversity
    const families = new Set(p.attempts.map(a => a.family));
    diversitySum += clamp((families.size - 1) / 2);

    // Iteration & Feedback
    let postFailAttempts = 0;
    let feedbackDriven = 0;
    let useful = 0;

    for (let i = 1; i < p.attempts.length; i++) {
      const prev = p.attempts[i - 1];
      const curr = p.attempts[i];
      if (prev.outcome === 'FAIL') {
        postFailAttempts++;
        if (curr.isFeedbackDriven) feedbackDriven++;
        if (curr.progress > prev.progress || curr.outcome === 'SUCCESS') {
          useful++;
        }
      }
    }

    if (postFailAttempts > 0) {
      feedbackRateSum += feedbackDriven / postFailAttempts;
      usefulIterationSum += useful / postFailAttempts;
    }

    // Persistence
    const solved = p.attempts.some(a => a.outcome === 'SUCCESS');
    if (solved || p.attempts.length >= 4) {
      persistenceSum += 1;
    } else {
      persistenceSum += p.attempts.length / 4;
    }
  }

  if (countingPuzzles === 0) {
    return { index: 0, level: null, status: 'INSUFFICIENT', reason: 'NEUTRAL_OUTCOME' };
  }

  const F1 = diversitySum / countingPuzzles;
  const F2 = feedbackRateSum / countingPuzzles;
  const F3 = usefulIterationSum / countingPuzzles;
  const F4 = persistenceSum / countingPuzzles;

  const index = (0.30 * F1) + (0.30 * F2) + (0.20 * F3) + (0.20 * F4);

  let level = 'MODERATE';
  if (index >= 0.67) level = 'HIGH';
  if (index <= 0.34) level = 'LOW';

  return { index, level, F1, F2, F3, F4, status: 'UNCALIBRATED' };
}
