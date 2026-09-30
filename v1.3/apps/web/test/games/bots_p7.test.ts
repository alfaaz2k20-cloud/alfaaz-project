import { describe, it, expect } from 'vitest';
import { extractG5 } from '../src/games/extractors/g5';
import { extractG6 } from '../src/games/extractors/g6';
import { extractG7 } from '../src/games/extractors/g7';

describe('Bot Profiles - P7 Games', () => {
  describe('G5: The Hidden Gallery', () => {
    it('Calculates correctly and caps confidence if only F1 available', () => {
      // 0 doors opened
      const doors = [
        { id: 'D1', isEmpty: false, hasDepth2: false, openedDepth2: false, dwell_ms: 0, expected_read_ms: 1000 },
        { id: 'D2', isEmpty: false, hasDepth2: false, openedDepth2: false, dwell_ms: 0, expected_read_ms: 1000 },
        { id: 'D3', isEmpty: true, hasDepth2: false, openedDepth2: false, dwell_ms: 0, expected_read_ms: 1000 },
        { id: 'D4', isEmpty: true, hasDepth2: false, openedDepth2: false, dwell_ms: 0, expected_read_ms: 1000 },
        { id: 'D5', isEmpty: false, hasDepth2: false, openedDepth2: false, dwell_ms: 0, expected_read_ms: 1000 }
      ];
      // Not opened means they aren't in the interacted list, so pass empty array
      const res = extractG5([]);
      expect(res.F1).toBe(0);
      expect(res.F2).toBeNull();
      expect(res.F3).toBeNull();
      expect(res.F4).toBeNull();
      expect(res.index).toBe(0);
      expect(res.level).toBe('LOW');
      expect(res.single_feature).toBe(true);
    });
  });

  describe('G6: The Broken Tool', () => {
    it('Random clicker scores LOW on feedback_rate and useful_iteration', () => {
      // Makes random changes (isFeedbackDriven = false, progress doesn't improve)
      const attempts = [
        { family: 'OTHER', progress: 0.1, outcome: 'FAIL' as const, isFeedbackDriven: false, isRandomChange: true, isRepeat: false },
        { family: 'OTHER', progress: 0.1, outcome: 'FAIL' as const, isFeedbackDriven: false, isRandomChange: true, isRepeat: false },
        { family: 'OTHER', progress: 0.1, outcome: 'FAIL' as const, isFeedbackDriven: false, isRandomChange: true, isRepeat: false },
        { family: 'OTHER', progress: 0.1, outcome: 'FAIL' as const, isFeedbackDriven: false, isRandomChange: true, isRepeat: false }
      ];
      
      const res = extractG6([{ puzzleId: 'P1', attempts, solvedOnAttempt1: false }]);
      // F1 (diversity) = 0 (1 family)
      // F2 (feedbackRate) = 0
      // F3 (usefulIteration) = 0
      // F4 (persistence) = 1 (4 attempts)
      // Index = 0.3*0 + 0.3*0 + 0.2*0 + 0.2*1 = 0.20 => LOW
      expect(res.F2).toBe(0);
      expect(res.F3).toBe(0);
      expect(res.level).toBe('LOW');
    });

    it('Neutral rule triggers INSUFFICIENT if all puzzles solved on attempt 1', () => {
      const res = extractG6([
        { puzzleId: 'P1', attempts: [{ family: 'BRIDGE', progress: 1, outcome: 'SUCCESS', isFeedbackDriven: false, isRandomChange: false, isRepeat: false }], solvedOnAttempt1: true }
      ]);
      expect(res.status).toBe('INSUFFICIENT');
      expect(res.reason).toBe('NEUTRAL_OUTCOME');
    });
  });

  describe('G7: The Repetition', () => {
    it('Neutral rule triggers INSUFFICIENT if extra_units = 0', () => {
      const res = extractG7({ extra_units: 0, cadence_change: null, resumed_after_pause: null });
      expect(res.status).toBe('INSUFFICIENT');
      expect(res.reason).toBe('NEUTRAL_STOP');
    });

    it('Calculates index correctly with full features', () => {
      const res = extractG7({ extra_units: 15, cadence_change: 0.25, resumed_after_pause: 1 });
      // F1 = 15/30 = 0.5
      // F2 = 1 - (0.25/0.5) = 0.5
      // F3 = 1
      // WeightSum = 1.0. ScoreSum = 0.6*0.5 + 0.25*0.5 + 0.15*1 = 0.3 + 0.125 + 0.15 = 0.575
      expect(res.F1).toBe(0.5);
      expect(res.F2).toBe(0.5);
      expect(res.F3).toBe(1);
      expect(res.index).toBeCloseTo(0.575);
      expect(res.level).toBe('MODERATE');
    });
  });
});
