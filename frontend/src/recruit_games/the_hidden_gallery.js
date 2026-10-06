/* ==========================================================================
 ALFAAZ RECRUIT — WORLD 5: THE HIDDEN GALLERY (نہاں خانہ)
 Mini-games: Q1 (Information Seeking), Q2 (Investigation Under Uncertainty), Q3 (Knowledge Integration)
 Adheres to Design Freeze v1 + Addendum v1.1.
 Emits raw behavioral telemetry only (no client-authored scores or correctness).
 Remediated for plain English (<= 12 words per sentence), mobile-first layout,
 and scoped candidate content protection.
 ========================================================================== */

import { renderTutorialCard, bindTutorialCard, renderGameShell } from './index.js';

export function runTheHiddenGallery(context, renderHeader) {
 const { appContainer, miniGameIndex, gameId, logEvent, onMiniGameComplete } = context;

 const targetGame = gameId || (miniGameIndex === 0 ? 'Q1' : (miniGameIndex === 1 ? 'Q2' : 'Q3'));
 if (targetGame === 'Q1') {
 runQ1InformationSeeking(appContainer, renderHeader, logEvent, onMiniGameComplete);
 } else if (targetGame === 'Q2') {
 runQ2InvestigationUnderUncertainty(appContainer, renderHeader, logEvent, onMiniGameComplete);
 } else {
 runQ3KnowledgeIntegration(appContainer, renderHeader, logEvent, onMiniGameComplete);
 }
}

// --------------------------------------------------------------------------
// Q1: Information Seeking (4 required decisions, voluntary optional resources)
// Resources have genuinely different value (useful vs low-value controls).
// Clicks alone do not equal curiosity.
// --------------------------------------------------------------------------
function runQ1InformationSeeking(app, renderHeader, logEvent, onComplete) {
 let inTutorial = false;
 let currentDecision = 0;
 let selectedChoice = null;
 let viewedResources = {};
 let lastInputModality = 'mouse';

 const decisions = [
 {
 stimulus_id: 'Q1_D1',
 title: 'Antique Gold-Leaf Manuscript Leaf',
 scenario: 'Choose the binding method for a fragile 19th-century manuscript page.',
 options: [
 { id: 'flexible_cord_binding', label: 'Sewn Flexible Cord (Allows spine to bend safely)' },
 { id: 'tight_adhesive_clamp', label: 'Rigid Glue Clamp (Firm hold on spine)' },
 { id: 'unbound_portfolio', label: 'Loose Archival Folder (Kept as separate sheets)' }
 ],
 optional_resources: [
 { id: 'OPT_USEFUL_1', topic: 'Binding Methods Note', info_value: 'high', summary: 'Srinagar bookbinders used soft vegetable cord to protect delicate gold borders.' },
 { id: 'OPT_CONTROL_1', topic: 'Library Stamp Dates', info_value: 'low', summary: 'City library accession stamps began in late October 1888.' }
 ]
 },
 {
 stimulus_id: 'Q1_D2',
 title: 'Papier-Mâché Pen Case (Qalamdan)',
 scenario: 'Select a protective surface coating for this painted lacquer case.',
 options: [
 { id: 'curing_linseed_glaze', label: 'Linseed Oil & Amber Varnish (Traditional slow curing glaze)' },
 { id: 'quick_synthetic_seal', label: 'Quick Synthetic Clear Spray (Modern fast-drying finish)' },
 { id: 'wax_buff_only', label: 'Dry Wax Polish (Gentle surface buffing)' }
 ],
 optional_resources: [
 { id: 'OPT_USEFUL_2', topic: 'Papier-Mâché Care Guide', info_value: 'high', summary: 'Slow drying with natural amber resin keeps natural mineral colors bright.' },
 { id: 'OPT_CONTROL_2', topic: 'Cabinet Hinge Maintenance', info_value: 'low', summary: 'Brass display cabinet hinges need oiling twice each year.' }
 ]
 },
 {
 stimulus_id: 'Q1_D3',
 title: 'Workshop Artisan Register',
 scenario: 'Identify the origin of this undated Persian artisan register.',
 options: [
 { id: 'guild_ledger_verified', label: 'Official Guild Register (Bears official guildmaster seal)' },
 { id: 'private_merchant_tally', label: 'Merchant Shop Notebook (Informal daily trade tally)' },
 { id: 'state_excise_record', label: 'Treasury Tax Record (Official tax register)' }
 ],
 optional_resources: [
 { id: 'OPT_USEFUL_1', topic: 'Register Stitching Styles', info_value: 'high', summary: 'Crimson thread stitching was reserved for registered royal guilds.' },
 { id: 'OPT_CONTROL_1', topic: 'Filing Code Reference', info_value: 'low', summary: 'Old municipal tax files use code series B.' }
 ]
 }
 ];

 function render() {
 if (inTutorial) {
 app.innerHTML = `
 <div class="candidate-content-protected">
 <div class="flex items-center gap-2 mb-3">
 <span class="act-badge">World 5: The Hidden Gallery</span>
 
 </div>
 ${renderTutorialCard({
 icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
 goal: 'Make preservation choices for 3 historic items.',
 steps: [
 'Read the artifact prompt and choose your option.',
 'Click optional research notes if you want more background.',
 'Click Confirm when you are ready to continue.'
 ]
 })}
 </div>
 `;
 bindTutorialCard(app, () => {
 inTutorial = false;
 currentDecision = 0;
 selectedChoice = null;
 logDecisionPresented();
 render();
 });
 return;
 }

 const d = decisions[currentDecision];

 app.innerHTML = renderGameShell({
 worldCode: 'W5',
 worldIndex: 4,
 title: 'The Curatorial Dossier',
 subtitle: 'Choose the best way to care for each historic item.',
 instructionPrompt: 'Your Task',
 instruction: 'Review the artifact below. Choose an action. Optional reference notes are available if you want them.',
 stimulusContent: `
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="flex items-center justify-between mb-2">
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Artifact Record</span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Record ${currentDecision + 1} of ${decisions.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${d.title}</div>
 <div class="text-base text-black mt-1.5 leading-relaxed">${d.scenario}</div>
 </div>
 `,
 interactionContent: `
 <div class="space-y-4">
 <!-- Optional Reference Notes -->
 <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="text-sm uppercase text-[var(--accent-gold)] font-semibold tracking-wider mb-2 flex items-center justify-between">
 <span>Optional Reference Notes (Click to Open)</span>
 <span class="text-[9px] text-black font-normal">Voluntary consultation</span>
 </div>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
 ${d.optional_resources.map(res => `
 <div class="opt-res-card p-3 bg-white border ${viewedResources[res.id] ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer interactive-option text-base min-h-[48px] flex flex-col justify-center" data-res="${res.id}">
 <div class="flex items-center justify-between">
 <span class="font-medium text-[var(--text-primary)] flex items-center gap-1.5">
 <svg class="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
 ${res.topic}
 </span>
 <span class="text-[9px] uppercase text-black">${viewedResources[res.id] ? 'Opened' : 'Inspect'}</span>
 </div>
 ${viewedResources[res.id] ? `<p class="mt-2 text-[11px] text-black leading-relaxed border-t border-[var(--grid-border)] pt-2 ">${res.summary}</p>` : ''}
 </div>
 `).join('')}
 </div>
 </div>

 <!-- Curatorial Actions -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Choose Preservation Action:</div>
 <div class="space-y-2.5">
 ${d.options.map(opt => `
 <div class="q1-opt p-3.5 bg-white border ${selectedChoice === opt.id ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-choice="${opt.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2.5">
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${selectedChoice === opt.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedChoice === opt.id ? '✓' : ''}</span>
 <span class="text-[var(--text-primary)] font-medium">${opt.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium shrink-0">Action ${String.fromCharCode(65 + d.options.indexOf(opt))}</span>
 </div>
 `).join('')}
 </div>
 </div>
 </div>
 `,
 actionButtonId: 'confirmQ1Btn',
 actionButtonText: currentDecision < decisions.length - 1 ? 'Confirm Decision &rarr;' : 'Confirm & Finish &rarr;',
 actionButtonDisabled: !selectedChoice,
 progressText: `Record ${currentDecision + 1} of ${decisions.length}`
 });

 // Handler for optional resources
 app.querySelectorAll('.opt-res-card').forEach(card => {
 card.addEventListener('click', () => {
 lastInputModality = 'mouse';
 const resId = card.getAttribute('data-res');
 viewedResources[resId] = true;
 logEvent('optional_resource_viewed', {
 trial_index: currentDecision,
 stimulus_id: d.stimulus_id,
 resource_id: resId,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });
 render();
 });
 });

 // Handler for decision choices
 app.querySelectorAll('.q1-opt').forEach(opt => {
 const chooseOption = (modality) => {
 lastInputModality = modality;
 selectedChoice = opt.getAttribute('data-choice');
 render();
 };

 opt.addEventListener('click', () => chooseOption('mouse'));
 opt.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 chooseOption('keyboard');
 }
 });
 });

 document.getElementById('confirmQ1Btn')?.addEventListener('click', () => {
 logEvent('decision_submitted', {
 trial_index: currentDecision,
 stimulus_id: d.stimulus_id,
 choice: selectedChoice,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });

 if (currentDecision < decisions.length - 1) {
 currentDecision++;
 selectedChoice = null;
 viewedResources = {};
 logDecisionPresented();
 render();
 } else {
 onComplete({
 mini_game: 'Q1',
 observations_count: decisions.length
 });
 }
 });
 }

 function logDecisionPresented() {
 const d = decisions[currentDecision];
 logEvent('decision_presented', {
 trial_index: currentDecision,
 stimulus_id: d.stimulus_id,
 task_def_version: '1.0'
 });
 }

 render();
}

// --------------------------------------------------------------------------
// Q2: Investigation Under Uncertainty (EXACTLY 4 exploration opportunities)
// Varying uncertainty and expected value. One opportunity is low-value control.
// Raw clicks do not equal curiosity.
// --------------------------------------------------------------------------
function runQ2InvestigationUnderUncertainty(app, renderHeader, logEvent, onComplete) {
 let inTutorial = false;
 let currentTrial = 0;
 let inspectedClues = {};
 let selectedAttribution = null;
 let lastInputModality = 'mouse';

 const relics = [
 {
 stimulus_id: 'Q2_T1',
 artifact_id: 'manuscript_seal_1',
 title: 'Relic 1: Wax Seal on Parchment',
 description: 'A dark red wax seal stamped onto an old parchment document.',
 uncertainty_level: 'moderate',
 expected_value: 'high',
 clues: [
 { id: 'CLUE_SEAL_INTAGLIO', label: 'Carved Seal Border Script', detail: 'Shows the official stamp of the Srinagar city office from 1862.' },
 { id: 'CLUE_WAX_RESIN', label: 'Wax Material Analysis', detail: 'Made with local pine resin rather than imported European wax.' },
 { id: 'CLUE_PARCHMENT_GRAIN', label: 'Parchment Skin Grain', detail: 'Mountain goatskin with hand-scraped natural grain.' }
 ],
 attributions: [
 { id: 'attr_imperial_registrar_srinagar', label: 'City Office of Srinagar (1860s)' },
 { id: 'attr_commercial_trader', label: 'River Trader Shipping Record' },
 { id: 'attr_modern_reproduction', label: 'Modern Souvenir Copy' }
 ]
 },
 {
 stimulus_id: 'Q2_T2',
 artifact_id: 'ciphered_marginalia_2',
 title: 'Relic 2: Star Chart with Handwritten Notes',
 description: 'Handwritten notes written in old cursive script along a star chart.',
 uncertainty_level: 'high',
 expected_value: 'high',
 clues: [
 { id: 'CLUE_CIPHER_DIACRITIC', label: 'Script Number Marks', detail: 'Notes record the date of an eclipse in 1845.' },
 { id: 'CLUE_SCRIBE_HAND', label: 'Penmanship Style', detail: 'Matches the private notebook of court scholar Mir Habib.' },
 { id: 'CLUE_GALL_INK_CORROSION', label: 'Ink Aging Depth', detail: 'Natural ink aging shows paper is over 170 years old.' }
 ],
 attributions: [
 { id: 'attr_court_astrologer_notebook', label: 'Court Scholar Personal Notebook' },
 { id: 'attr_apothecary_recipe', label: 'Herbal Medicine Recipe' },
 { id: 'attr_random_scribble', label: 'Scribe Practice Scratches' }
 ]
 },
 {
 stimulus_id: 'Q2_T3',
 artifact_id: 'standard_receipt_3',
 title: 'Relic 3: City Transit Toll Receipt (Control)',
 description: 'A printed paper slip with standard columns and serial numbers.',
 uncertainty_level: 'low',
 expected_value: 'low_control',
 clues: [
 { id: 'CLUE_PRINT_TYPE', label: 'Standard Moveable Type', detail: 'Mass-printed transit slip used for routine city transport.' },
 { id: 'CLUE_STAMP_INK', label: 'Routine Blue Ink Stamp', detail: 'Common government office stamp with standard numbering.' }
 ],
 attributions: [
 { id: 'attr_standard_tax_slip', label: 'City Transit Pass Receipt' },
 { id: 'attr_royal_chancery_grant', label: 'Palace Land Grant' },
 { id: 'attr_secret_monastery_order', label: 'Monastic Travel Permission' }
 ]
 }
 ];

 function render() {
 if (inTutorial) {
 app.innerHTML = `
 <div class="candidate-content-protected">
 <div class="flex items-center gap-2 mb-3">
 <span class="act-badge">World 5: The Hidden Gallery</span>
 
 </div>
 ${renderTutorialCard({
 icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
 goal: 'Inspect 4 historic relics to identify where they came from.',
 steps: [
 'Read the description of the relic.',
 'Click any clues you want to inspect.',
 'Pick your conclusion and click Confirm.'
 ]
 })}
 </div>
 `;
 bindTutorialCard(app, () => {
 inTutorial = false;
 currentTrial = 0;
 inspectedClues = {};
 selectedAttribution = null;
 logArtifactPresented();
 render();
 });
 return;
 }

 const r = relics[currentTrial];

 app.innerHTML = renderGameShell({
 worldCode: 'W5',
 worldIndex: 4,
 title: 'The Antiquarian’s Bench',
 subtitle: 'Inspect physical clues to identify each historic object.',
 instructionPrompt: 'Your Task',
 instruction: 'Examine the relic below. Inspect any clues you wish. Then choose its origin.',
 stimulusContent: `
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="flex items-center justify-between mb-2">
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Relic Specimen</span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Specimen ${currentTrial + 1} of ${relics.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${r.title}</div>
 <div class="text-base text-black mt-1.5 leading-relaxed">${r.description}</div>
 </div>
 `,
 interactionContent: `
 <div class="space-y-4">
 <!-- Clues Inspection Grid -->
 <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="text-sm uppercase text-[var(--accent-gold)] font-semibold tracking-wider mb-2 flex items-center justify-between">
 <span>Physical Clues Available for Inspection</span>
 <span class="text-[9px] text-black font-normal">Click clue to examine</span>
 </div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
 ${r.clues.map(c => `
 <div class="clue-btn p-3.5 bg-white border ${inspectedClues[c.id] ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer interactive-option text-base min-h-[48px] flex flex-col justify-between" data-clue="${c.id}" tabindex="0" role="button">
 <div class="font-medium text-[var(--text-primary)] flex items-center justify-between">
 <span>${c.label}</span>
 <span class="text-[9px] uppercase text-black">${inspectedClues[c.id] ? 'Inspected' : 'Inspect'}</span>
 </div>
 ${inspectedClues[c.id] ? `<p class="mt-2 text-[11px] text-black leading-relaxed border-t border-[var(--grid-border)] pt-2 ">${c.detail}</p>` : ''}
 </div>
 `).join('')}
 </div>
 </div>

 <!-- Attribution Selection -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Conclude Historical Origin:</div>
 <div class="space-y-2.5">
 ${r.attributions.map(attr => `
 <div class="q2-attr p-3.5 bg-white border ${selectedAttribution === attr.id ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-attr="${attr.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2.5">
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${selectedAttribution === attr.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedAttribution === attr.id ? '✓' : ''}</span>
 <span class="text-[var(--text-primary)] font-medium">${attr.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium shrink-0">Origin ${String.fromCharCode(65 + r.attributions.indexOf(attr))}</span>
 </div>
 `).join('')}
 </div>
 </div>
 </div>
 `,
 actionButtonId: 'confirmQ2Btn',
 actionButtonText: currentTrial < relics.length - 1 ? 'Confirm Origin &rarr;' : 'Confirm & Finish &rarr;',
 actionButtonDisabled: !selectedAttribution,
 progressText: `Relic ${currentTrial + 1} of ${relics.length}`
 });

 app.querySelectorAll('.clue-btn').forEach(btn => {
 const inspect = (modality) => {
 lastInputModality = modality;
 const clueId = btn.getAttribute('data-clue');
 inspectedClues[clueId] = true;
 logEvent('clue_inspected', {
 trial_index: currentTrial,
 stimulus_id: r.stimulus_id,
 artifact_id: r.artifact_id,
 clue_id: clueId,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });
 render();
 };

 btn.addEventListener('click', () => inspect('mouse'));
 btn.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 inspect('keyboard');
 }
 });
 });

 app.querySelectorAll('.q2-attr').forEach(opt => {
 const selectAttr = (modality) => {
 lastInputModality = modality;
 selectedAttribution = opt.getAttribute('data-attr');
 render();
 };

 opt.addEventListener('click', () => selectAttr('mouse'));
 opt.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 selectAttr('keyboard');
 }
 });
 });

 document.getElementById('confirmQ2Btn')?.addEventListener('click', () => {
 logEvent('investigation_finalized', {
 trial_index: currentTrial,
 stimulus_id: r.stimulus_id,
 artifact_id: r.artifact_id,
 attribution_choice: selectedAttribution,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });

 if (currentTrial < relics.length - 1) {
 currentTrial++;
 inspectedClues = {};
 selectedAttribution = null;
 logArtifactPresented();
 render();
 } else {
 onComplete({
 mini_game: 'Q2',
 observations_count: relics.length
 });
 }
 });
 }

 function logArtifactPresented() {
 const r = relics[currentTrial];
 logEvent('artifact_presented', {
 trial_index: currentTrial,
 stimulus_id: r.stimulus_id,
 artifact_id: r.artifact_id,
 uncertainty_level: r.uncertainty_level,
 expected_value: r.expected_value,
 task_def_version: '1.0'
 });
 }

 render();
}

// --------------------------------------------------------------------------
// Q3: Knowledge Integration (3 ambiguity/integration episodes)
// Optional context can be retrieved. Later decision requires integrating
// the retrieved insight rather than bare clicks.
// --------------------------------------------------------------------------
function runQ3KnowledgeIntegration(app, renderHeader, logEvent, onComplete) {
 let inTutorial = false;
 let currentEpisode = 0;
 let contextRetrieved = false;
 let selectedIntegrationChoice = null;
 let lastInputModality = 'mouse';

 const episodes = [
 {
 stimulus_id: 'Q3_E1',
 title: 'Episode 1: The Master Painter’s Folio',
 ambiguity_type: 'unattributed_artisan_folio',
 ambiguity_text: 'An illuminated folio has gold dust borders and charcoal sketches. Two master painters worked during this era.',
 context_id: 'provenance_context_1',
 context_title: 'Rainawari Workshop Records (1870–1885)',
 context_text: 'Records confirm Master Sadiq worked in Rainawari. He used willow-branch charcoal sketches and lapis blue borders.',
 decision_question: 'Attribute the folio maker and technique lineage:',
 choices: [
 { id: 'choice_sadiq_rainawari', label: 'Master Sadiq (Rainawari workshop — willow charcoal sketch)' },
 { id: 'choice_habib_court', label: 'Master Habib (Palace court — imported graphite pencil)' },
 { id: 'choice_generic_bazaar', label: 'General City Market Production' }
 ]
 },
 {
 stimulus_id: 'Q3_E2',
 title: 'Episode 2: The Exhibition Pavilion Ceiling',
 ambiguity_type: 'mismatched_period_provenance',
 ambiguity_text: 'A carved ceiling panel displays woodwork styles from two different rebuilding periods.',
 context_id: 'provenance_context_2',
 context_title: 'Dal Lake Pavilion Repair Notes (1902)',
 context_text: 'Following the 1902 Dal Lake flood, builders used seasoned cedar wood. Earlier builders used soft river pine.',
 decision_question: 'Identify the structural timber and repair era:',
 choices: [
 { id: 'choice_post_flood_cedar', label: 'Post-1902 Flood Repair (Seasoned mountain cedar wood)' },
 { id: 'choice_pre_flood_pine', label: 'Original Pre-Flood Building (Soft river pine wood)' },
 { id: 'choice_modern_concrete', label: 'Twentieth Century Replica' }
 ]
 },
 {
 stimulus_id: 'Q3_E3',
 title: 'Episode 3: The Woven Silk Couplet',
 ambiguity_type: 'regional_dialect_verse_origin',
 ambiguity_text: 'A woven silk pashmina scarf has an old Kashmiri verse embroidered on it.',
 context_id: 'provenance_context_3',
 context_title: 'Valley Poetry Records (Lalla-Ded Shrines)',
 context_text: 'Verses with this 4-beat pattern come from southern valley shrines (Pampore and Tral).',
 decision_question: 'Select the verified cultural origin of this verse:',
 choices: [
 { id: 'choice_southern_vakh_shrine', label: 'Southern Valley Shrine Verse (Traditional 4-beat rhythm)' },
 { id: 'choice_urban_court_ghazal', label: 'Palace Court Scribe Poem (Formal Persian rhyming meter)' },
 { id: 'choice_folk_bazaar_song', label: 'Traveling Caravan Folk Song' }
 ]
 }
 ];


 function render() {
 if (inTutorial) {
 app.innerHTML = `
 <div class="candidate-content-protected">
 <div class="flex items-center gap-2 mb-3">
 <span class="act-badge">World 5: The Hidden Gallery</span>
 
 </div>
 ${renderTutorialCard({
 icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
 goal: 'Connect archival clues to solve catalog questions across 3 episodes.',
 steps: [
 'Read the historical question in each episode.',
 'Click to open the archival research note if you need facts.',
 'Select your catalog conclusion.',
 'Click confirm to finish World 5.'
 ]
 })}
 </div>
 `;
 bindTutorialCard(app, () => {
 inTutorial = false;
 currentEpisode = 0;
 contextRetrieved = false;
 selectedIntegrationChoice = null;
 logEpisodePresented();
 render();
 });
 return;
 }

 const ep = episodes[currentEpisode];

 app.innerHTML = `
 <div class="">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 5: The Hidden Gallery</span>
 
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Weaver's Chronicle</h2>
 <p class="text-base text-black mt-0.5">Connect historical clues to solve catalog questions.</p>
 </div>

 <!-- YOUR TASK -->
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed">
 Read the mystery below. You may open the reference note. Choose the best answer to continue.
 </div>
 </div>

 <!-- LOOK AT THIS -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-4 shadow-xs rounded-xs candidate-content-protected">
 <div class="flex items-center justify-between mb-2">
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Historic Case</span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Case ${currentEpisode + 1} of 3</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${ep.title}</div>
 <div class="text-base text-black mt-1.5 leading-relaxed">${ep.ambiguity_text}</div>
 </div>

 <!-- INTERACTION AREA 1: Optional Context Retrieval -->
 <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
 <span class="text-sm uppercase text-[var(--accent-gold)] font-semibold tracking-wider">Archival Research Note</span>
 ${!contextRetrieved ? `
 <button type="button" id="retrieveContextBtn" class="px-4 py-2 bg-white border border-[var(--grid-border)] text-sm uppercase tracking-wider text-[var(--text-primary)] interactive-option rounded-xs shadow-xs min-h-[44px] flex items-center justify-center gap-1.5" tabindex="0">
 <span>Open Research Note</span> &rarr;
 </button>
 ` : '<span class="text-sm text-[var(--text-primary)] font-semibold uppercase">Note Opened</span>'}
 </div>

 ${contextRetrieved ? `
 <div class="p-3.5 bg-white border border-emerald-600/40 rounded-xs text-base text-[var(--text-primary)] leading-relaxed ">
 <div class="text-sm uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-1">${ep.context_title}</div>
 <div>${ep.context_text}</div>
 </div>
 ` : `
 <div class="text-base text-black italic">
 Optional research notes are available to clarify historic details.
 </div>
 `}
 </div>

 <!-- YOUR CHOICE: Downstream Integration Decision -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">${ep.decision_question}</div>
 <div class="space-y-2.5">
 ${ep.choices.map(c => `
 <div class="q3-choice p-3.5 bg-white border ${selectedIntegrationChoice === c.id ? 'border-[var(--accent-gold)] bg-amber-50/50 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-choice="${c.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2.5">
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${selectedIntegrationChoice === c.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedIntegrationChoice === c.id ? '✓' : ''}</span>
 <span class="text-[var(--text-primary)] font-medium">${c.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium shrink-0">Format ${c.id.replace('CHOICE_', '')}</span>
 </div>
 `).join('')}
 </div>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end mb-4">
 <button type="button" id="confirmQ3Btn" ${selectedIntegrationChoice ? '' : 'disabled'} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 ${currentEpisode < episodes.length - 1 ? 'Confirm Choice &rarr;' : 'Finish World 5 &rarr;'}
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${currentEpisode + 1} of ${episodes.length}
 </div>
 </div>
 `;

 document.getElementById('retrieveContextBtn')?.addEventListener('click', () => {
 lastInputModality = 'mouse';
 contextRetrieved = true;
 logEvent('context_requested', {
 trial_index: currentEpisode,
 stimulus_id: ep.stimulus_id,
 context_id: ep.context_id,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });
 render();
 });

 app.querySelectorAll('.q3-choice').forEach(choice => {
 const selectChoice = (modality) => {
 lastInputModality = modality;
 selectedIntegrationChoice = choice.getAttribute('data-choice');
 render();
 };

 choice.addEventListener('click', () => selectChoice('mouse'));
 choice.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 selectChoice('keyboard');
 }
 });
 });

 document.getElementById('confirmQ3Btn')?.addEventListener('click', () => {
 logEvent('decision_submitted', {
 trial_index: currentEpisode,
 stimulus_id: ep.stimulus_id,
 choice: selectedIntegrationChoice,
 input_modality: lastInputModality,
 task_def_version: '1.0'
 });

 if (currentEpisode < episodes.length - 1) {
 currentEpisode++;
 contextRetrieved = false;
 selectedIntegrationChoice = null;
 logEpisodePresented();
 render();
 } else {
 onComplete({
 mini_game: 'Q3',
 observations_count: 3
 });
 }
 });
 }

 function logEpisodePresented() {
 const ep = episodes[currentEpisode];
 logEvent('episode_presented', {
 trial_index: currentEpisode,
 stimulus_id: ep.stimulus_id,
 ambiguity_type: ep.ambiguity_type,
 task_def_version: '1.0'
 });
 }

 render();
}
