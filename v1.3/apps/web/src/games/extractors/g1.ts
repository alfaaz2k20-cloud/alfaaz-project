export interface G1RoundResult {
  round: number; // 1 to 6
  p: number;
  u?: number;
  u2?: number; // for R6
  x_final: number;
  x_at_7_5s?: number; // for R6
  asked?: boolean; // for R4
  acc_share?: number;
}

export function extractG1(rounds: G1RoundResult[]) {
  // Helpers
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const getShare = (p: number, u: number, x: number) => clamp((p - x) / (p - u));

  let f1_acc = 0;
  let f1_count = 0;
  let f2_ambiguous = 0;
  let f3_context = 0;

  let r1_acc = 0, r2_acc = 0;

  for (const r of rounds) {
    if (r.round === 1) { r1_acc = getShare(r.p, r.u!, r.x_final); f1_acc += r1_acc; f1_count++; }
    if (r.round === 2) { r2_acc = getShare(r.p, r.u!, r.x_final); f1_acc += r2_acc; f1_count++; }
    // R3 is not scored for F1 according to spec: "Reasonable people differ at 30 points, so R3 is not scored."
    
    if (r.round === 4) {
      const adjusted = getShare(r.p, r.u!, r.x_final) >= 0.9;
      if (r.asked && adjusted) f2_ambiguous = 1;
      else if (!r.asked && adjusted) f2_ambiguous = 0.5;
      else if (r.asked && !adjusted) f2_ambiguous = 0.5;
      else f2_ambiguous = 0;
    }
    
    if (r.round === 6) {
      const phase1_pursued = (r.x_at_7_5s || 0) >= 74 ? 1 : 0;
      const phase2_acc = getShare(r.p, r.u2!, r.x_final);
      f3_context = 0.5 * phase1_pursued + 0.5 * phase2_acc;
    }
  }

  const F1 = f1_count > 0 ? f1_acc / f1_count : 0;
  const F2 = f2_ambiguous;
  const F3 = f3_context;

  const index = (0.4 * F1) + (0.3 * F2) + (0.3 * F3);
  
  // Basic level mapping (just for component output)
  let level = 'MODERATE';
  if (index >= 0.67) level = 'HIGH';
  if (index <= 0.34) level = 'LOW';

  return { index, level, F1, F2, F3 };
}
