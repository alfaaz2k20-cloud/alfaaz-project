export interface G3SectionResult {
  section: number; // 1, 2, 3
  deficit: number; // 5, 15, 0
  sent: number;
  firstSendBeforeRequest?: boolean;
  coordinationChoice: 'WAIT' | 'SIGNAL' | 'KEEP_PAINTING' | 'NONE';
}

export function extractG3(sections: G3SectionResult[]) {
  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  let s1_share = 0, s2_share = 0, s3_share = 0;
  let s1_before = 0, s2_before = 0;
  let coord_sum = 0;

  for (const s of sections) {
    let shareRatio = 0;
    if (s.section === 1 || s.section === 2) {
      shareRatio = clamp(s.sent / s.deficit);
      if (s.section === 1) s1_share = shareRatio;
      if (s.section === 2) s2_share = shareRatio;
      
      if (s.sent > 0) {
        if (s.firstSendBeforeRequest) {
          if (s.section === 1) s1_before = 1;
          if (s.section === 2) s2_before = 1;
        } else {
          if (s.section === 1) s1_before = 0.5;
          if (s.section === 2) s2_before = 0.5;
        }
      }
    } else if (s.section === 3) {
      shareRatio = clamp(s.sent / 15);
      s3_share = shareRatio;
    }

    if (s.coordinationChoice === 'WAIT' || s.coordinationChoice === 'SIGNAL') {
      coord_sum += 1;
    }
  }

  const need_cooperation = (s1_share + s2_share) / 2;
  const need_specificity = 1 - s3_share;
  
  const F1 = need_cooperation * (0.5 + 0.5 * need_specificity);
  const F2 = (s1_before + s2_before) / 2;
  const F3 = coord_sum / sections.length;

  const index = (0.45 * F1) + (0.30 * F2) + (0.25 * F3);

  let level = 'MODERATE';
  if (index >= 0.67) level = 'HIGH';
  if (index <= 0.34) level = 'LOW';

  return { index, level, F1, F2, F3 };
}
