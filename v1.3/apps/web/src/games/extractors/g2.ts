export interface G2RoundResult {
  round: number;
  totalCards: number; // 8
  correctFinal: number; 
  exceptionCorrectFinal: number; // out of 4
  initialErrors: number;
  finalErrors: number;
  usedReview: boolean;
}

export function extractG2(rounds: G2RoundResult[]) {
  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  let totalCorrect = 0;
  let totalExceptionCorrect = 0;
  let errorResSum = 0;
  let reviewCount = 0;

  for (const r of rounds) {
    totalCorrect += r.correctFinal;
    totalExceptionCorrect += r.exceptionCorrectFinal;
    
    if (r.initialErrors === 0) {
      errorResSum += 1;
    } else {
      errorResSum += clamp((r.initialErrors - r.finalErrors) / r.initialErrors);
    }

    if (r.usedReview) reviewCount++;
  }

  const accuracy = totalCorrect / 16;
  const exceptionAccuracy = totalExceptionCorrect / 8;
  const errorResolution = rounds.length > 0 ? errorResSum / rounds.length : 0;
  const usedReview = rounds.length > 0 ? reviewCount / rounds.length : 0;

  const index = (0.35 * accuracy) + (0.30 * exceptionAccuracy) + (0.25 * errorResolution) + (0.10 * usedReview);

  let level = 'MODERATE';
  if (index >= 0.67) level = 'HIGH';
  if (index <= 0.34) level = 'LOW';

  return { index, level, accuracy, exceptionAccuracy, errorResolution, usedReview };
}
