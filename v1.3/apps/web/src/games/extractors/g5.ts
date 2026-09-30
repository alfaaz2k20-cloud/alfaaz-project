export interface G5DoorInteraction {
  id: string; // D1 to D5
  isEmpty: boolean;
  hasDepth2: boolean;
  openedDepth2: boolean;
  dwell_ms: number;
  expected_read_ms: number;
}

export function extractG5(doors: G5DoorInteraction[]) {
  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  let doors_opened = doors.length / 5;
  
  let depth2Opps = 0;
  let depth2Used = 0;
  let dwellSum = 0;
  let dwellCount = 0;
  
  let emptyDiscoveredIndex = -1;
  let remainingAtDiscovery = 0;
  let openedAfterDiscovery = 0;

  doors.forEach((door, index) => {
    if (!door.isEmpty) {
      if (door.hasDepth2) {
        depth2Opps++;
        if (door.openedDepth2) depth2Used++;
      }
      dwellSum += clamp(door.dwell_ms / Math.max(1, door.expected_read_ms));
      dwellCount++;
    } else {
      if (emptyDiscoveredIndex === -1) {
        emptyDiscoveredIndex = index;
        remainingAtDiscovery = 5 - (index + 1); // 5 total doors
      }
    }
    
    if (emptyDiscoveredIndex !== -1 && index > emptyDiscoveredIndex) {
      openedAfterDiscovery++;
    }
  });

  const F1 = doors_opened;
  const F2 = depth2Opps > 0 ? depth2Used / depth2Opps : null;
  const F3 = emptyDiscoveredIndex !== -1 && remainingAtDiscovery > 0 
    ? openedAfterDiscovery / remainingAtDiscovery 
    : null;
  const F4 = dwellCount > 0 ? dwellSum / dwellCount : null;

  let weightSum = 0.35; // F1 is always available
  let scoreSum = 0.35 * F1;

  if (F2 !== null) { weightSum += 0.25; scoreSum += 0.25 * F2; }
  if (F3 !== null) { weightSum += 0.20; scoreSum += 0.20 * F3; }
  if (F4 !== null) { weightSum += 0.20; scoreSum += 0.20 * F4; }

  const index = weightSum > 0 ? scoreSum / weightSum : 0;

  let level = 'MODERATE';
  if (index >= 0.67) level = 'HIGH';
  if (index <= 0.34) level = 'LOW';

  // "If only F1 is available (for example 0 doors opened), confidence is capped at LOW (§6)"
  // This rule implies if doors=0, level is low and confidence should be downgraded.
  // The actual confidence calculation happens at the parameter level, but we can flag it.
  const single_feature = (F2 === null && F3 === null && F4 === null);

  return { index, level, F1, F2, F3, F4, single_feature };
}
