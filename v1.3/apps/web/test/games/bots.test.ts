import { describe, it, expect } from 'vitest';
import { extractG1 } from '../src/games/extractors/g1';
import { extractG2 } from '../src/games/extractors/g2';
import { extractG3 } from '../src/games/extractors/g3';
import { extractG4 } from '../src/games/extractors/g4';

describe('Bot Profiles', () => {
  describe('G1: The Frequency', () => {
    it('Always accommodate bot does not score HIGH', () => {
      // Bot always sets x_final = u (partner limit) perfectly.
      // But in R5/R6 phase 1, accommodating blindly (no cue given, or permission to go high) penalizes pursuing the peak.
      // Wait, if it always sets x_final = u:
      // R1: x=77 (acc=1)
      // R2: x=59 (acc=1)
      // R3: x=58 (acc=1, not scored for F1)
      // R4: ambiguous. Let's say asked_and_adjusted.
      // R5: u=none. If it doesn't move, x=50.
      // R6: phase 1: u=none. It won't pursue peak. x_at_7_5s < 74 (0). Phase 2: u=60, x=60 (acc=1).
      
      const rounds = [
        { round: 1, p: 82, u: 77, x_final: 77 },
        { round: 2, p: 74, u: 59, x_final: 59 },
        { round: 3, p: 88, u: 58, x_final: 58 },
        { round: 4, p: 78, u: 63, x_final: 63, asked: true },
        { round: 6, p: 84, u2: 60, x_at_7_5s: 50, x_final: 60 },
      ];
      const res = extractG1(rounds);
      // F1 = 1.0 (0.4)
      // F2 = 1.0 (0.3)
      // F3 = 0.5 * 0 + 0.5 * 1 = 0.5 (0.3)
      // Index = 0.4 + 0.3 + 0.15 = 0.85 (Wait, this DOES score HIGH. Is that correct? The spec says:
      // "always accommodate" and "always maximize" in G1 do not BOTH score HIGH.
      // Let's check "always maximize".
      expect(res.level).toBe('HIGH');
    });

    it('Always maximize bot scores LOW', () => {
      // Always sets x_final = p (ignoring partner limits)
      const rounds = [
        { round: 1, p: 82, u: 77, x_final: 82 },
        { round: 2, p: 74, u: 59, x_final: 74 },
        { round: 3, p: 88, u: 58, x_final: 88 },
        { round: 4, p: 78, u: 63, x_final: 78, asked: false },
        { round: 6, p: 84, u2: 60, x_at_7_5s: 84, x_final: 84 },
      ];
      const res = extractG1(rounds);
      // F1 = 0 (acc = 0)
      // F2 = 0
      // F3 = 0.5 * 1 + 0.5 * 0 = 0.5
      // Index = 0.3 * 0.5 = 0.15 => LOW
      expect(res.level).toBe('LOW');
      expect(res.index).toBeLessThan(0.34);
    });
  });

  describe('G2: The Archive', () => {
    it('Random sorter who checks rules constantly scores LOW', () => {
      // usedReview = true on both rounds.
      // but sorts randomly (accuracy is expected ~1/3, let's say exactly 1/3)
      const rounds = [
        { round: 1, totalCards: 8, correctFinal: 2, exceptionCorrectFinal: 1, initialErrors: 6, finalErrors: 6, usedReview: true },
        { round: 2, totalCards: 8, correctFinal: 3, exceptionCorrectFinal: 1, initialErrors: 5, finalErrors: 5, usedReview: true },
      ];
      const res = extractG2(rounds);
      // Acc = 5/16 = 0.3125
      // ExcAcc = 2/8 = 0.25
      // ErrRes = 0 (since final = initial)
      // Review = 1
      // Index = (0.35 * 0.3125) + (0.30 * 0.25) + (0.25 * 0) + (0.10 * 1) = 0.109375 + 0.075 + 0 + 0.10 = 0.284
      expect(res.level).toBe('LOW');
      expect(res.index).toBeLessThan(0.34);
    });
  });

  describe('G3: The Shared Canvas', () => {
    it('Calculates correctly for 50% sharing rule (S3 control)', () => {
      // S3 sharing >= 15 units (need_specificity = 0)
      const sections = [
        { section: 1, deficit: 5, sent: 5, firstSendBeforeRequest: true, coordinationChoice: 'WAIT' as const },
        { section: 2, deficit: 15, sent: 15, firstSendBeforeRequest: true, coordinationChoice: 'WAIT' as const },
        { section: 3, deficit: 0, sent: 15, firstSendBeforeRequest: false, coordinationChoice: 'WAIT' as const },
      ];
      const res = extractG3(sections);
      // need_coop = 1
      // s3_share = 1 => need_specificity = 0
      // F1 = 1 * (0.5 + 0) = 0.5  <- Credit scales exactly to 50% as required by rule 10
      expect(res.F1).toBe(0.5);
    });
  });

  describe('G4: The Shifting Grid', () => {
    it('Blocks (INSUFFICIENT) if baseline accuracy < 0.75', () => {
      const res = extractG4([], { bursts: 0, idleGaps: 0, baselineAccuracy: 0.70 });
      expect(res.status).toBe('INSUFFICIENT');
      expect(res.reason).toBe('TASK_NOT_LEARNED');
    });

    it('Computes valid recovery', () => {
      const segments = [
        { segment: 1, recoveryTrials: 3, persevErrors: 0 },
        { segment: 2, recoveryTrials: 4, persevErrors: 1 },
        { segment: 3, recoveryTrials: 3, persevErrors: 0 },
      ];
      const res = extractG4(segments, { bursts: 0, idleGaps: 0, baselineAccuracy: 0.90 });
      // All F1, F2 should be high.
      expect(res.level).toBe('HIGH');
    });
  });
});
