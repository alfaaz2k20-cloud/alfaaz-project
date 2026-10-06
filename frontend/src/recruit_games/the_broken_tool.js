/* ==========================================================================
 ALFAAZ RECRUIT — WORLD 6: THE BROKEN TOOL (شکستہ آلہ)
 Mini-games: CR1 (The Artisan's Assembly), CR2 (The Spatial Pivot), CR3 (The Improvised Tool)
 Adheres to Design Freeze v1 + Addendum v1.1.
 Emits primitive behavioral telemetry only.
 Remediated for plain English (<= 12 words per sentence), mobile-first layout,
 and scoped candidate content protection.
 ========================================================================== */

import { renderTutorialCard, bindTutorialCard, renderGameShell } from './index.js';

export function runTheBrokenTool(context, renderHeader) {
 const { appContainer, miniGameIndex, gameId, logEvent, onMiniGameComplete } = context;

 const targetGame = gameId || (miniGameIndex === 0 ? 'CR1' : (miniGameIndex === 1 ? 'CR3' : 'CR2'));
 if (targetGame === 'CR1') {
 runCR1OpenConstruction(appContainer, renderHeader, logEvent, onMiniGameComplete);
 } else if (targetGame === 'CR3') {
 runCR3UnspecifiedToolUse(appContainer, renderHeader, logEvent, onMiniGameComplete);
 } else {
 runCR2ConstraintShift(appContainer, renderHeader, logEvent, onMiniGameComplete);
 }
}

// --------------------------------------------------------------------------
// CR1: Open Construction (2 construction stages)
// Multiple objectively valid solutions; first-try success is neutral.
// No failure-count creativity scoring.
// --------------------------------------------------------------------------
function runCR1OpenConstruction(app, renderHeader, logEvent, onComplete) {
 let inTutorial = false;
 let currentStageIdx = 0;
 let selectedParts = [];
 let testFeedback = null;
 let lastInputModality = 'mouse';

 const stages = [
 {
 stage_id: 'CR1_S1',
 title: 'Stage 1: The Weaving Shuttle Rig',
 constraint: 'missing_crossbar_shuttle',
 scenario: 'A walnut loom shuttle crossbar has cracked. Build a working replacement with studio parts.',
 materials: [
 { id: 'M_SPLIT_BAMBOO', name: 'Split Bamboo Rib', icon: '&#127883;', role: 'Flexible wooden bar' },
 { id: 'M_BRASS_ROD', name: 'Slotted Brass Rod', icon: '&#128296;', role: 'Stiff metal bar' },
 { id: 'M_CARVED_PINE', name: 'Carved Pine Peg', icon: '&#129685;', role: 'Lightweight wooden pin' },
 { id: 'M_WAXED_CORD', name: 'Waxed Linen Cord', icon: '&#129526;', role: 'Strong binding string' },
 { id: 'M_CERAMIC_WEIGHT', name: 'Ceramic Weight', icon: '&#9711;', role: 'Small balancing weight' }
 ],
 valid_combinations: [
 ['M_SPLIT_BAMBOO', 'M_WAXED_CORD'],
 ['M_BRASS_ROD'],
 ['M_CARVED_PINE', 'M_CERAMIC_WEIGHT']
 ]
 },
 {
 stage_id: 'CR1_S2',
 title: 'Stage 2: The Warp Tension Anchor',
 constraint: 'tension_wire_unanchored',
 scenario: 'The side tension cord needs an anchor point. Assemble a secure tie-down rig.',
 materials: [
 { id: 'M_LEATHER_STRAP', name: 'Leather Cinch Strap', icon: '&#129526;', role: 'Firm gripping strap' },
 { id: 'M_NOTCHED_PEG', name: 'Hardwood Anchor Peg', icon: '&#129685;', role: 'Notched wooden wedge' },
 { id: 'M_COPPER_WIRE', name: 'Flexible Copper Wire', icon: '&#9874;', role: 'Bendable wrapping wire' },
 { id: 'M_STONE_COUNTER', name: 'Counterweight Stone', icon: '&#11044;', role: 'Heavy balance stone' }
 ],
 valid_combinations: [
 ['M_LEATHER_STRAP', 'M_NOTCHED_PEG'],
 ['M_COPPER_WIRE'],
 ['M_LEATHER_STRAP', 'M_STONE_COUNTER']
 ]
 }
 ];


 function render() {
 if (inTutorial) {
 app.innerHTML = `
 <div class="candidate-content-protected">
 <div class="flex items-center gap-2 mb-3">
 <span class="act-badge">World 6: The Broken Tool</span>
 
 </div>
 ${renderTutorialCard({
 icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
 goal: 'Build a working replacement tool across 2 stages.',
 steps: [
 'Read what needs to be fixed.',
 'Click items on the workbench to add or remove them.',
 'Click Test to check your setup, then click Confirm.'
 ]
 })}
 </div>
 `;
 bindTutorialCard(app, () => {
 inTutorial = false;
 currentStageIdx = 0;
 selectedParts = [];
 testFeedback = null;
 logStagePresented();
 render();
 });
 return;
 }

 const st = stages[currentStageIdx];

 app.innerHTML = renderGameShell({
 worldCode: 'W6',
 worldIndex: 5,
 title: "The Artisan's Assembly",
 subtitle: 'Fix the broken part using items on the workbench.',
 instructionPrompt: 'Your Task',
 instructionPrompt: 'Your Task',
    instruction: 'Follow Step 1 and Step 2 below to assemble and test your replacement tool.',
 stimulusContent: `
    <div class="p-5 sm:p-6 bg-[#faf8f5] border-l-4 border-l-[var(--accent-gold)] border border-[var(--grid-border)] rounded-xs shadow-xs space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold">${st.title}</span>
        <span class="text-xs text-[var(--text-secondary)] uppercase">Stage ${currentStageIdx + 1} of ${stages.length}</span>
      </div>
      <p class="text-base sm:text-lg font-serif text-[var(--text-primary)] leading-relaxed">
        ${st.scenario}
      </p>
    </div>
  `,
 interactionContent: `
    <div class="space-y-4">
      <!-- STEP 1 -->
      <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
          <span class="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold flex items-center justify-center font-serif">1</span>
          <span class="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">Step 1: Click pieces to add or remove</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          ${st.materials.map(m => {
            const isSelected = selectedParts.includes(m.id);
            return `
            <div class="part-card p-3.5 bg-white border ${isSelected ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer interactive-option text-sm sm:text-base flex flex-col justify-between min-h-[72px]" data-id="${m.id}" tabindex="0" role="button" aria-label="${m.name}">
              <div>
                <div class="text-lg mb-1">${m.icon}</div>
                <div class="font-medium text-[var(--text-primary)] mb-0.5">${m.name}</div>
                <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${m.role}</div>
              </div>
              <div class="mt-2 text-right">
                <span class="text-xs font-bold ${isSelected ? 'text-[var(--accent-gold)]' : 'text-stone-400'}">${isSelected ? '&#10003; EQUIPPED' : '+ ADD'}</span>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- STEP 2 -->
      <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
          <span class="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold flex items-center justify-center font-serif">2</span>
          <span class="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">Step 2: Test your assembled parts</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div class="text-xs sm:text-sm text-[var(--text-secondary)]">
            Equipped: <strong class="text-[var(--text-primary)]">${selectedParts.length > 0 ? selectedParts.map(id => st.materials.find(m => m.id === id)?.name).join(' + ') : 'None selected'}</strong>
          </div>
          <button type="button" id="testAssemblyBtn" ${selectedParts.length > 0 ? '' : 'disabled'} class="px-5 py-2.5 bg-stone-100 border border-stone-300 text-[var(--text-primary)] text-xs uppercase tracking-wider disabled:opacity-40 interactive-option rounded-xs min-h-[44px] font-bold">
            Test Assembly
          </button>
        </div>

        ${testFeedback ? `
        <div class="mt-2 p-3 bg-white border ${testFeedback.valid ? 'border-emerald-600/40 text-[var(--text-primary)]' : 'border-amber-600/40 text-[var(--text-primary)]'} text-xs sm:text-sm rounded-xs leading-relaxed">
          <span class="text-xs uppercase font-bold block mb-0.5">${testFeedback.valid ? 'Assembly Test: Passed &#10003;' : 'Assembly Test: Observation'}</span>
          ${testFeedback.message}
        </div>
        ` : ''}
      </div>
    </div>
  `,
 actionButtonId: 'confirmStageBtn',
 actionButtonText: currentStageIdx < stages.length - 1 ? 'Confirm Assembly &rarr;' : 'Confirm & Finish &rarr;',
 actionButtonDisabled: selectedParts.length === 0,
 progressText: `Stage ${currentStageIdx + 1} of ${stages.length}`
 });

 app.querySelectorAll('.part-card').forEach(card => {
 const toggle = (modality) => {
 lastInputModality = modality;
 const pId = card.getAttribute('data-id');
 if (selectedParts.includes(pId)) {
 selectedParts = selectedParts.filter(id => id !== pId);
 } else {
 selectedParts.push(pId);
 }
 testFeedback = null;
 logEvent('part_toggled', {
 stage_id: st.stage_id,
 trial_index: currentStageIdx,
 part_id: pId,
 selected_parts: [...selectedParts],
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });
 render();
 };

 card.addEventListener('click', () => toggle('mouse'));
 card.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 toggle('keyboard');
 }
 });
 });

 document.getElementById('testAssemblyBtn')?.addEventListener('click', () => {
 lastInputModality = 'mouse';
 const curSet = new Set(selectedParts);
 const isFunctional = st.valid_combinations.some(combo => combo.every(id => curSet.has(id)));
 testFeedback = {
 valid: isFunctional,
 message: isFunctional
 ? 'Tension test passed. The loom parts balance smoothly.'
 : 'Test note: The parts wobble or do not connect tightly.'
 };
 logEvent('assembly_tested', {
 stage_id: st.stage_id,
 trial_index: currentStageIdx,
 parts: [...selectedParts],
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });
 render();
 });

 document.getElementById('confirmStageBtn')?.addEventListener('click', () => {
 logEvent('stage_completed', {
 stage_id: st.stage_id,
 trial_index: currentStageIdx,
 final_parts: [...selectedParts],
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });

 if (currentStageIdx < stages.length - 1) {
 currentStageIdx++;
 selectedParts = [];
 testFeedback = null;
 logStagePresented();
 render();
 } else {
 onComplete({
 mini_game: 'CR1',
 observations_count: 2
 });
 }
 });
 }

 function logStagePresented() {
 const st = stages[currentStageIdx];
 logEvent('stage_presented', {
 stage_id: st.stage_id,
 trial_index: currentStageIdx,
 constraint: st.constraint,
 task_def_version: '1.0'
 });
 }

 render();
}

// --------------------------------------------------------------------------
// CR2: Constraint Shift (3 episodes)
// Spatial reframing under architectural constraint changes.
// Captures strategy before and after the shift; measures strategy revision.
// --------------------------------------------------------------------------
function runCR2ConstraintShift(app, renderHeader, logEvent, onComplete) {
 let inTutorial = false;
 let currentEpisode = 0;
 let phase = 'pre_shift'; // 'pre_shift' -> 'post_shift'
 let initialStrategy = null;
 let revisedStrategy = null;
 let lastInputModality = 'mouse';

 const episodes = [
 {
 episode_id: 'CR2_E1',
 title: 'Episode 1: The Central Pillar Chamber',
 pre_context: 'Plan visitor walking paths through the grand exhibition hall.',
 pre_strategies: [
 { id: 'S_CENTRAL_AVENUE', label: 'Central Promenade', desc: 'Single straight walkway down the center.' },
 { id: 'S_PERIMETER_LOOP', label: 'Outer Wall Loop', desc: 'Continuous gentle loop along outer walls.' },
 { id: 'S_ALCOVE_ISLANDS', label: 'Display Islands', desc: 'Separate display clusters across the floor.' }
 ],
 constraint_change: 'central_pillar_blocks_corridor',
 shift_description: 'Notice: A large carved stone pillar blocks the direct central pathway.',
 post_strategies: [
 { id: 'split_flow', label: 'Twin Walking Corridors (Split visitors smoothly around both sides of the pillar)', note: 'Adapted Flow' },
 { id: 'linear_flow', label: 'Single Left Path (Route all visitors down the left aisle)', note: 'Linear Channel' },
 { id: 'stop_gap', label: 'Central Waiting Area (Pause visitors and let small groups enter in turns)', note: 'Batch Entry' }
 ]
 },
 {
 episode_id: 'CR2_E2',
 title: 'Episode 2: West Gallery Safety Clearance',
 pre_context: 'Arrange display stands across the wide western gallery corridor.',
 pre_strategies: [
 { id: 'S_WALL_PANORAMA', label: 'Wall Art Series', desc: 'Continuous artwork hung along the west wall.' },
 { id: 'S_TRANSVERSE_SCREENS', label: 'Crosswise Screens', desc: 'Folding screens set across the corridor.' },
 { id: 'S_PAIRED_PLINTHS', label: 'Center Display Stands', desc: 'Two rows of waist-high display stands.' }
 ],
 constraint_change: 'emergency_exit_clearance_widened',
 shift_description: 'Safety rule: Keep a 3-meter wide open walkway along the west wall.',
 post_strategies: [
 { id: 'perimeter_flow', label: 'Clear Wall Pathway (Move displays inward to leave the west wall open)', note: 'Adapted Flow' },
 { id: 'central_cluster', label: 'Center Grouping (Gather all stands tightly in the room center)', note: 'Center Group' },
 { id: 'diagonal_crossing', label: 'Diagonal Zigzag (Weave walking paths between the doorways)', note: 'Zigzag Path' }
 ]
 },
 {
 episode_id: 'CR2_E3',
 title: 'Episode 3: North Archway Clearance',
 pre_context: 'Display vertical banners and artwork in the north wing.',
 pre_strategies: [
 { id: 'S_TALL_STELAE', label: 'Tall Wooden Posts', desc: 'Four-meter tall vertical banner posts.' },
 { id: 'S_HORIZONTAL_VITRINES', label: 'Low Table Vitrines', desc: 'Flat glass vitrines at waist height.' },
 { id: 'S_CEILING_SUSPENSION', label: 'Ceiling Silk Banners', desc: 'Flowing fabric banners hung from rafters.' }
 ],
 constraint_change: 'low_ceiling_arch_support',
 shift_description: 'Structural inspection: Low wooden ceiling beams limit overhead room to 2.2 meters.',
 post_strategies: [
 { id: 'linear_flow', label: 'Low Table Vitrines (Use waist-high displays to preserve headroom)', note: 'Adapted Flow' },
 { id: 'canopy_tent', label: 'Hanging Fabric Canopy (Drape thin cloth below the beams)', note: 'Low Drapery' },
 { id: 'staggered_alcoves', label: 'Wall Post Leaning (Lean tall banner boards against walls)', note: 'Wall Lean' }
 ]
 }
 ];


 function render() {
 if (inTutorial) {
 app.innerHTML = `
 <div class="candidate-content-protected">
 <div class="flex items-center gap-2 mb-3">
 <span class="act-badge">World 6: The Broken Tool</span>
 
 </div>
 ${renderTutorialCard({
 icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
 goal: 'Pick a layout strategy, then adapt your plan when a space condition changes.',
 steps: [
 'Review the gallery space and pick an initial floor plan.',
 'A structural change will appear in the room.',
 'Choose how to adapt your plan to the new condition.',
 'Confirm your choice across 3 episodes.'
 ]
 })}
 </div>
 `;
 bindTutorialCard(app, () => {
 inTutorial = false;
 currentEpisode = 0;
 phase = 'pre_shift';
 initialStrategy = null;
 revisedStrategy = null;
 logEpisodePresented();
 render();
 });
 return;
 }

 const ep = episodes[currentEpisode];

 if (phase === 'pre_shift') {
 app.innerHTML = `
 <div class="">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 6: The Broken Tool</span>
 
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Spatial Pivot</h2>
 <p class="text-base text-black mt-0.5">Adapt room layouts when conditions shift.</p>
 </div>

 <!-- YOUR TASK -->
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed">
 Read the room context below. Choose an initial layout concept for the gallery space.
 </div>
 </div>

 <!-- LOOK AT THIS: Context Card -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-4 shadow-xs rounded-xs candidate-content-protected">
 <div class="flex items-center justify-between mb-1.5">
 <span class="text-sm text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Gallery Layout Setting</span>
 <span class="text-sm text-[var(--accent-gold)] font-medium uppercase">Episode ${currentEpisode + 1} of ${episodes.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${ep.title}</div>
 <div class="text-base text-black leading-relaxed">${ep.pre_context}</div>
 </div>

 <!-- INTERACTION AREA: Initial Strategy Selection -->
 <div class="mb-5 space-y-2.5 candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider">Select Initial Curation Concept:</div>
 ${ep.pre_strategies.map(s => {
 const isSelected = initialStrategy === s.id;
 return `
 <div class="pre-strat-card p-3.5 sm:p-4 bg-white border ${isSelected ? 'border-[var(--accent-gold)] bg-amber-50/50 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-id="${s.id}" tabindex="0" role="button" aria-label="${s.label}">
 <div>
 <div class="font-medium text-[var(--text-primary)]">${s.label}</div>
 <div class="text-[11px] text-black mt-0.5">${s.desc}</div>
 </div>
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${isSelected ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${isSelected ? '&#10003;' : ''}</span>
 </div>
 `;
 }).join('')}
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end mb-4">
 <button type="button" id="confirmPreShiftBtn" ${initialStrategy ? '' : 'disabled'} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 Set Plan & Proceed &rarr;
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${currentEpisode + 1} of ${episodes.length} &middot; Step 1
 </div>
 </div>
 `;

 app.querySelectorAll('.pre-strat-card').forEach(card => {
 const select = (modality) => {
 lastInputModality = modality;
 initialStrategy = card.getAttribute('data-id');
 render();
 };
 card.addEventListener('click', () => select('mouse'));
 card.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 select('keyboard');
 }
 });
 });

 document.getElementById('confirmPreShiftBtn')?.addEventListener('click', () => {
 logEvent('initial_strategy_selected', {
 episode_id: ep.episode_id,
 trial_index: currentEpisode,
 strategy_id: initialStrategy,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });

 // Trigger constraint shift
 logEvent('constraint_shifted', {
 episode_id: ep.episode_id,
 trial_index: currentEpisode,
 constraint_change: ep.constraint_change,
 task_def_version: '1.0'
 });

 phase = 'post_shift';
 revisedStrategy = initialStrategy; // defaults to prior unless revised
 render();
 });

 } else {
 // post_shift
 app.innerHTML = `
 <div class="">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 6: The Broken Tool</span>
 
 </div>
 <div class="text-[11px] text-[var(--accent-gold)] font-medium">Condition Shift</div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Spatial Pivot</h2>
 <p class="text-base text-black mt-0.5">Adapt room layouts when conditions shift.</p>
 </div>

 <!-- Constraint Shift Notification Banner -->
 <div class="p-4 bg-amber-50 border border-amber-300/80 mb-4 rounded-xs candidate-content-protected">
 <div class="flex items-center gap-2 mb-1">
 <span class="w-2 h-2 rounded-full bg-amber-600 "></span>
 <span class="text-sm uppercase tracking-wider text-[var(--text-primary)] font-bold">New Room Condition Detected</span>
 </div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed ">${ep.shift_description}</div>
 <div class="mt-2 text-[11px] text-[var(--text-primary)]">
 Prior Plan: <strong>${ep.pre_strategies.find(s => s.id === initialStrategy)?.label || initialStrategy}</strong>
 </div>
 </div>

 <!-- INTERACTION AREA: Post-Shift Strategy Selection -->
 <div class="mb-5 space-y-2.5 candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider">Choose Adapted Layout:</div>
 ${ep.post_strategies.map(s => {
 const isSelected = revisedStrategy === s.id;
 return `
 <div class="post-strat-card p-3.5 sm:p-4 bg-white border ${isSelected ? 'border-[var(--accent-gold)] bg-amber-50/50 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-id="${s.id}" tabindex="0" role="button" aria-label="${s.label}">
 <div>
 <div class="font-medium text-[var(--text-primary)]">${s.label}</div>
 <div class="text-sm text-black mt-0.5">${s.note}</div>
 </div>
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${isSelected ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${isSelected ? '&#10003;' : ''}</span>
 </div>
 `;
 }).join('')}
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end mb-4">
 <button type="button" id="confirmPostShiftBtn" ${revisedStrategy ? '' : 'disabled'} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 ${currentEpisode < episodes.length - 1 ? 'Confirm Plan & Next Episode &rarr;' : 'Finish Part 2 &rarr;'}
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${currentEpisode + 1} of ${episodes.length} &middot; Step 2
 </div>
 </div>
 `;

 app.querySelectorAll('.post-strat-card').forEach(card => {
 const select = (modality) => {
 lastInputModality = modality;
 revisedStrategy = card.getAttribute('data-id');
 render();
 };
 card.addEventListener('click', () => select('mouse'));
 card.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 select('keyboard');
 }
 });
 });

 document.getElementById('confirmPostShiftBtn')?.addEventListener('click', () => {
 logEvent('strategy_revised', {
 episode_id: ep.episode_id,
 trial_index: currentEpisode,
 initial_strategy_id: initialStrategy,
 revised_strategy_id: revisedStrategy,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });

 if (currentEpisode < episodes.length - 1) {
 currentEpisode++;
 phase = 'pre_shift';
 initialStrategy = null;
 revisedStrategy = null;
 logEpisodePresented();
 render();
 } else {
 onComplete({
 mini_game: 'CR2',
 observations_count: 3
 });
 }
 });
 }
 }

 function logEpisodePresented() {
 const ep = episodes[currentEpisode];
 logEvent('episode_presented', {
 episode_id: ep.episode_id,
 trial_index: currentEpisode,
 initial_context: ep.pre_context,
 task_def_version: '1.0'
 });
 }

 render();
}

// --------------------------------------------------------------------------
// CR3: Unspecified Tool Use (3 trials)
// Affordance synthesis, tool selection, action sequence, mechanical feedback,
// and strategy change based on craft outcomes.
// --------------------------------------------------------------------------
function runCR3UnspecifiedToolUse(app, renderHeader, logEvent, onComplete) {
 let inTutorial = false;
 let currentTrial = 0;
 let selectedTool = null;
 let selectedMethod = null;
 let feedbackText = null;
 let hasObservedFeedback = false;
 let lastInputModality = 'mouse';

 const trials = [
 {
 stimulus_id: 'CR3_T1',
 title: 'Trial 1: The Crisp Paper Fold',
 target_motif: 'burnished_crease',
 objective: 'Form a sharp, smooth crease on thick paper without tearing surface fibers.',
 tools: [
 { id: 'bone_folder', name: 'Polished Bone Tool', icon: '&#129685;', affordance: 'Smooth curved edge that applies friction gently' },
 { id: 'metal_stylus', name: 'Steel Scribe Stylus', icon: '&#128296;', affordance: 'Hard pointed needle tip for sharp indentation' },
 { id: 'bamboo_wedge', name: 'Beveled Bamboo Scraper', icon: '&#127883;', affordance: 'Broad flat wooden face for broad surface pressure' }
 ],
 methods: [
 { id: 'firm_edge_pass', name: 'Firm Edge Pass', desc: 'Slide rounded edge along ruler with continuous diagonal pressure.' },
 { id: 'flat_face_rub', name: 'Flat Face Rub', desc: 'Distribute wide surface friction across fold line.' },
 { id: 'sharp_point_drag', name: 'Sharp Point Drag', desc: 'Draw tip directly across surface to score the fiber line.' }
 ],
 feedback_map: {
 'bone_folder:firm_edge_pass': { success: true, text: 'Clean, crisp burnished crease formed with zero surface abrasion.' },
 'bamboo_wedge:flat_face_rub': { success: true, text: 'Smooth, even flattened fold achieved without marring surface grain.' },
 'metal_stylus:sharp_point_drag': { success: false, text: 'Paper fibers sliced; sharp point cut through the paper fold.' },
 'metal_stylus:firm_edge_pass': { success: false, text: 'Metal edge left dark metallic friction scuffs across the parchment.' },
 'bone_folder:flat_face_rub': { success: true, text: 'Gentle, even crease formed; fibers compressed smoothly.' },
 'bamboo_wedge:firm_edge_pass': { success: true, text: 'Uniform clean fold line established with natural wood contour.' },
 'bone_folder:sharp_point_drag': { success: false, text: 'Uneven dragging motion; point dented paper surface.' },
 'bamboo_wedge:sharp_point_drag': { success: false, text: 'Wood corner snagged on rough paper grain.' },
 'metal_stylus:flat_face_rub': { success: false, text: 'Insufficient surface area; uneven pressure indentation.' }
 }
 },
 {
 stimulus_id: 'CR3_T2',
 title: 'Trial 2: Mulberry Paper Stipple',
 target_motif: 'fine_stipple',
 objective: 'Produce an even scatter of tiny ink drops on fibrous paper.',
 tools: [
 { id: 'horsehair_brush', name: 'Stiff Hair Brush', icon: '&#128396;', affordance: 'Springy stiff bristles that snap back easily' },
 { id: 'sponge_block', name: 'Natural Sea Sponge', icon: '&#9711;', affordance: 'Soft porous texture that dabs damp color' },
 { id: 'linen_swab', name: 'Rolled Cloth Swab', icon: '&#129526;', affordance: 'Rolled fabric tip that absorbs liquid quickly' }
 ],
 methods: [
 { id: 'textured_flick', name: 'Bristle Flick', desc: 'Pull loaded bristles back with thumb to release fine mist.' },
 { id: 'mottled_dab', name: 'Surface Dab', desc: 'Light stamp of textured surface directly on paper.' },
 { id: 'drag_stroke', name: 'Smooth Sweep', desc: 'Draw applicator steadily across page in sweeping stroke.' }
 ],
 feedback_map: {
 'horsehair_brush:textured_flick': { success: true, text: 'Fine, even constellation of organic micro-droplets dispersed across parchment.' },
 'sponge_block:mottled_dab': { success: true, text: 'Rich textured tonal stipple with soft, organic cellular grain.' },
 'linen_swab:drag_stroke': { success: false, text: 'Produced a single continuous solid streak; zero stipple effect.' },
 'linen_swab:textured_flick': { success: false, text: 'Fabric has no elastic bristle snap; pigment remained bound in swab.' },
 'sponge_block:drag_stroke': { success: false, text: 'Smeared broad irregular smudge across paper.' },
 'horsehair_brush:drag_stroke': { success: false, text: 'Solid brushstroke line created; no dispersed speckling.' },
 'horsehair_brush:mottled_dab': { success: true, text: 'Bristle tips formed delicate speckled texture upon contact.' },
 'sponge_block:textured_flick': { success: false, text: 'Sponge cannot be flicked; dropped heavy inconsistent blot.' },
 'linen_swab:mottled_dab': { success: false, text: 'Dense blot soaked through fiber without texture.' }
 }
 }
 ];


 function render() {
 if (inTutorial) {
 app.innerHTML = `
 <div class="candidate-content-protected">
 <div class="flex items-center gap-2 mb-3">
 <span class="act-badge">World 6: The Broken Tool</span>
 
 </div>
 ${renderTutorialCard({
 icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>`,
 goal: 'Choose and test tools for craft tasks across 2 rounds.',
 steps: [
 'Read the craft goal on the workbench.',
 'Pick a tool and choose how you will use it.',
 'Click Test Technique to see the result, then click Confirm.'
 ]
 })}
 </div>
 `;
 bindTutorialCard(app, () => {
 inTutorial = false;
 currentTrial = 0;
 selectedTool = null;
 selectedMethod = null;
 feedbackText = null;
 hasObservedFeedback = false;
 logTrialPresented();
 render();
 });
 return;
 }

 const tr = trials[currentTrial];

 app.innerHTML = renderGameShell({
 worldCode: 'W6',
 worldIndex: 5,
 title: 'The Improvised Tool',
 subtitle: 'Choose a tool and action to solve the craft problem.',
 instructionPrompt: 'Your Task',
 instructionPrompt: 'Your Task',
    instruction: 'Follow Step 1, Step 2, and Step 3 below to complete the craft task.',
 stimulusContent: `
    <div class="p-5 sm:p-6 bg-[#faf8f5] border-l-4 border-l-[var(--accent-gold)] border border-[var(--grid-border)] rounded-xs shadow-xs space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold">${tr.title}</span>
        <span class="text-xs text-[var(--text-secondary)] uppercase">Round ${currentTrial + 1} of ${trials.length}</span>
      </div>
      <p class="text-base sm:text-lg font-serif text-[var(--text-primary)] leading-relaxed">
        ${tr.objective}
      </p>
    </div>
  `,
 interactionContent: `
    <div class="space-y-4">
      <!-- STEP 1 -->
      <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
          <span class="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold flex items-center justify-center font-serif">1</span>
          <span class="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">Step 1: Pick an implement</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          ${tr.tools.map(t => {
            const isSelected = selectedTool === t.id;
            return `
            <div class="cr3-tool-card p-3.5 sm:p-4 bg-white border ${isSelected ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer interactive-option text-sm sm:text-base min-h-[64px]" data-id="${t.id}" tabindex="0" role="button" aria-label="${t.name}">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-lg">${t.icon}</span>
                <span class="font-medium text-[var(--text-primary)]">${t.name}</span>
              </div>
              <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${t.affordance}</div>
            </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- STEP 2 -->
      <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
          <span class="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold flex items-center justify-center font-serif">2</span>
          <span class="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">Step 2: Choose an action</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          ${tr.methods.map(m => {
            const isSelected = selectedMethod === m.id;
            return `
            <div class="cr3-method-card p-3.5 sm:p-4 bg-white border ${isSelected ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer interactive-option text-sm sm:text-base min-h-[64px]" data-id="${m.id}" tabindex="0" role="button" aria-label="${m.name}">
              <div class="font-medium text-[var(--text-primary)] mb-0.5">${m.name}</div>
              <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${m.desc}</div>
            </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- STEP 3 -->
      <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
          <span class="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold flex items-center justify-center font-serif">3</span>
          <span class="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">Step 3: Test your technique</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div class="text-xs sm:text-sm text-[var(--text-secondary)]">
            Active Pairing: <strong class="text-[var(--text-primary)]">${selectedTool ? tr.tools.find(t => t.id === selectedTool)?.name : 'None'} + ${selectedMethod ? tr.methods.find(m => m.id === selectedMethod)?.name : 'None'}</strong>
          </div>
          <button type="button" id="applyTechniqueBtn" ${selectedTool && selectedMethod ? '' : 'disabled'} class="px-5 py-2.5 bg-stone-100 border border-stone-300 text-[var(--text-primary)] text-xs uppercase tracking-wider disabled:opacity-40 interactive-option rounded-xs min-h-[44px] font-bold">
            Test Technique
          </button>
        </div>

        ${feedbackText ? `
        <div class="mt-2 p-3 bg-white border ${feedbackText.success ? 'border-emerald-600/40 text-[var(--text-primary)]' : 'border-amber-600/40 text-[var(--text-primary)]'} text-xs sm:text-sm rounded-xs leading-relaxed">
          <div class="text-xs uppercase font-bold mb-1 ${feedbackText.success ? 'text-emerald-700' : 'text-amber-700'}">Outcome Result</div>
          <div>${feedbackText.text}</div>
        </div>
        ` : ''}
      </div>
    </div>
  `,
 actionButtonId: 'confirmTrialBtn',
 actionButtonText: currentTrial < trials.length - 1 ? 'Confirm Technique &rarr;' : 'Confirm & Finish &rarr;',
 actionButtonDisabled: !(selectedTool && selectedMethod),
 progressText: `Trial ${currentTrial + 1} of ${trials.length}`
 });

 app.querySelectorAll('.cr3-tool-card').forEach(card => {
 const select = (modality) => {
 lastInputModality = modality;
 selectedTool = card.getAttribute('data-id');
 logEvent('tool_selected', {
 stimulus_id: tr.stimulus_id,
 trial_index: currentTrial,
 tool_id: selectedTool,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });
 render();
 };
 card.addEventListener('click', () => select('mouse'));
 card.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 select('keyboard');
 }
 });
 });

 app.querySelectorAll('.cr3-method-card').forEach(card => {
 const select = (modality) => {
 lastInputModality = modality;
 selectedMethod = card.getAttribute('data-id');
 render();
 };
 card.addEventListener('click', () => select('mouse'));
 card.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 select('keyboard');
 }
 });
 });

 document.getElementById('applyTechniqueBtn')?.addEventListener('click', () => {
 lastInputModality = 'mouse';
 const key = `${selectedTool}:${selectedMethod}`;
 const outcome = tr.feedback_map[key] || { success: false, text: 'No noticeable craft adaptation observed.' };
 feedbackText = outcome;
 hasObservedFeedback = true;

 logEvent('action_applied', {
 stimulus_id: tr.stimulus_id,
 trial_index: currentTrial,
 tool_id: selectedTool,
 action_method: selectedMethod,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });

 logEvent('feedback_observed', {
 stimulus_id: tr.stimulus_id,
 trial_index: currentTrial,
 tool_id: selectedTool,
 action_method: selectedMethod,
 outcome_feedback: outcome.text,
 task_def_version: '1.0'
 });

 render();
 });

 document.getElementById('confirmTrialBtn')?.addEventListener('click', () => {
 logEvent('strategy_adapted', {
 stimulus_id: tr.stimulus_id,
 trial_index: currentTrial,
 final_tool_id: selectedTool,
 final_method: selectedMethod,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });

 if (currentTrial < trials.length - 1) {
 currentTrial++;
 selectedTool = null;
 selectedMethod = null;
 feedbackText = null;
 hasObservedFeedback = false;
 logTrialPresented();
 render();
 } else {
 onComplete({
 mini_game: 'CR3',
 observations_count: trials.length
 });
 }
 });
 }

 function logTrialPresented() {
 const tr = trials[currentTrial];
 logEvent('trial_presented', {
 stimulus_id: tr.stimulus_id,
 trial_index: currentTrial,
 target_motif: tr.target_motif,
 task_def_version: '1.0'
 });
 }

 render();
}
