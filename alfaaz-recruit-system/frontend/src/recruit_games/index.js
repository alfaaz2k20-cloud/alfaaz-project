/* ==========================================================================
 ALFAAZ RECRUIT — GAME BATTERY RUNNER & DISPATCHER
 ========================================================================== */

import { runTheArchive } from './the_archive.js';
import { runTheFrequency } from './the_frequency.js';
import { runTheSharedCanvas } from './the_shared_canvas.js';
import { runTheShiftingGrid } from './the_shifting_grid.js';
import { runTheHiddenGallery } from './the_hidden_gallery.js';
import { runTheBrokenTool } from './the_broken_tool.js';
import { runTheRepetition } from './the_repetition.js';

export const WORLD_METADATA = {
 'W1': { name: 'The Frequency', name_ur: 'آواز', subtitle: 'Acoustics & Dialogue' },
 'W2': { name: 'The Archive', name_ur: 'دستاویز', subtitle: 'Manuscripts & Preservation' },
 'W3': { name: 'The Shared Canvas', name_ur: 'مشترکہ کینوس', subtitle: 'Artisan Workshop' },
 'W4': { name: 'The Shifting Grid', name_ur: 'بدلتا گرڈ', subtitle: 'Mosaic & Rhythm' },
 'W5': { name: 'The Hidden Gallery', name_ur: 'پوشیدہ گیلری', subtitle: 'Exhibition Discovery' },
 'W6': { name: 'The Broken Tool', name_ur: 'ٹوٹا آلہ', subtitle: 'Material Assembly' },
 'W7': { name: 'The Repetition', name_ur: 'دہرائی', subtitle: 'Readiness & Ceremony' }
};

export function renderGameShell({
 worldCode = '',
 worldIndex = 0,
 stepBadge = '',
 title = '',
 subtitle = '',
 instruction = '',
 instructionPrompt = 'Your Task',
 stimulusContent = '',
 interactionContent = '',
 feedbackContent = '',
 summaryContent = '',
 actionButtonId = '',
 actionButtonText = '',
 actionButtonDisabled = false,
 secondaryActionHtml = '',
 progressText = '',
 extraContent = ''
}) {
 const meta = WORLD_METADATA[worldCode] || { name: 'Alfaaz Workshop', name_ur: '' };
 const wIdx = typeof worldIndex === 'number' ? worldIndex : 0;
 const cleanBadge = (stepBadge && !stepBadge.toLowerCase().includes('takes about')) ? stepBadge : '';

 return `
 <div class="max-w-2xl mx-auto space-y-4">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
 <div class="flex items-center gap-2">
 <span class="act-badge">World ${wIdx + 1} of 7: ${meta.name}</span>
 ${meta.name_ur ? `<span class="font-serif text-base sm:text-lg text-black" style="direction: rtl;">${meta.name_ur}</span>` : ''}
 </div>
 ${cleanBadge ? `<div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">${cleanBadge}</div>` : ''}
 </div>

 <!-- TASK HEADER -->
 <div>
 <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">${title}</h2>
 ${subtitle ? `<p class="text-base text-black mt-1 leading-relaxed font-medium">${subtitle}</p>` : ''}
 </div>

 <!-- INSTRUCTION / CONTEXT BOX -->
 ${instruction ? `
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs candidate-content-protected">
 <div class="text-sm uppercase tracking-wider font-sans text-[var(--accent-gold)] font-bold mb-1">${instructionPrompt}</div>
 <div class="text-base text-black leading-relaxed font-medium">
 ${instruction}
 </div>
 </div>
 ` : ''}

 <!-- MAIN STIMULUS AREA -->
 ${stimulusContent ? `<div class="candidate-content-protected">${stimulusContent}</div>` : ''}

 <!-- INTERACTION AREA -->
 ${interactionContent ? `<div class="candidate-content-protected">${interactionContent}</div>` : ''}

 <!-- FEEDBACK REGION -->
 ${feedbackContent ? `
 <div class="candidate-content-protected">
 ${feedbackContent}
 </div>
 ` : ''}

 <!-- ACTIVE SELECTION / SUMMARY AREA -->
 ${summaryContent ? `
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs text-base font-sans text-black flex justify-between items-center candidate-content-protected">
 ${summaryContent}
 </div>
 ` : ''}

 <!-- PRIMARY ACTION BAR -->
 ${(actionButtonText || secondaryActionHtml) ? `
 <div class="flex flex-col sm:flex-row justify-end items-center gap-3 pt-1">
 ${secondaryActionHtml || ''}
 ${actionButtonText ? `
 <button type="button" id="${actionButtonId}" ${actionButtonDisabled ? 'disabled' : ''} class="w-full sm:w-auto px-7 py-3.5 bg-[var(--text-primary)] text-white text-sm font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer interactive-option shadow-sm rounded-xs flex items-center justify-center gap-2 min-h-[44px]">
 ${actionButtonText}
 </button>
 ` : ''}
 </div>
 ` : ''}

 <!-- EXTRA CONTENT -->
 ${extraContent || ''}

 <!-- PROGRESS FOOTER -->
 ${progressText ? `
 <div class="text-right text-sm text-black font-sans pt-1">
 ${progressText}
 </div>
 ` : ''}
 </div>
 `;
}

export const CANDIDATE_CORE_GAMES = {
 'W1': ['F1', 'F2'],
 'W2': ['A1', 'A2'],
 'W3': ['C1', 'C2'],
 'W4': ['E1', 'E2'],
 'W5': ['Q1', 'Q2'],
 'W6': ['CR1', 'CR3'],
 'W7': ['M1', 'M2']
};

export const RESEARCH_BANK_GAMES = {
 'W1': ['F3'],
 'W2': ['A3'],
 'W3': ['C3'],
 'W4': ['E3'],
 'W5': ['Q3'],
 'W6': ['CR2'],
 'W7': ['M3']
};

export const ALL_GAMES_BY_WORLD = {
 'W1': ['F1', 'F2', 'F3'],
 'W2': ['A1', 'A2', 'A3'],
 'W3': ['C1', 'C2', 'C3'],
 'W4': ['E1', 'E2', 'E3'],
 'W5': ['Q1', 'Q2', 'Q3'],
 'W6': ['CR1', 'CR2', 'CR3'],
 'W7': ['M1', 'M2', 'M3']
};

export function renderTutorialCard({ icon, goal, steps }) {
 return `
 <div class="tutorial-card cursor-pointer p-6 border border-[var(--accent-gold)] bg-gradient-to-br from-[#faf8f5] to-[#f5efe8] space-y-4 mb-6 interactive-option " tabindex="0" role="button" aria-label="Begin Activity Guide">
 <div class="flex items-center gap-3">
 <div class="w-10 h-10 rounded-full bg-amber-100/80 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] shrink-0">
 ${icon || '<i data-lucide="compass" class="w-5 h-5"></i>'}
 </div>
 <div>
 <span class="text-sm uppercase tracking-widest text-[var(--accent-gold)] font-medium">Activity Guide &middot; رہنمائے عمل</span>
 <h3 class="text-base font-serif text-[var(--text-primary)] font-semibold">${goal}</h3>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
 ${steps.map((s, idx) => `
 <div class="bg-white/80 border border-[var(--grid-border)] p-3 flex items-start gap-2.5">
 <span class="w-5 h-5 rounded-full bg-[var(--accent-gold)] text-white text-sm flex items-center justify-center font-serif shrink-0 mt-0.5">${idx + 1}</span>
 <div class="text-base text-black leading-relaxed font-medium">${s}</div>
 </div>
 `).join('')}
 </div>

 <div class="pt-2 flex justify-between items-center">
 <span class="text-[11px] text-black italic">Click anywhere or press Enter to begin</span>
 <button id="startActivityBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest interactive-option flex items-center gap-2">
 Begin Activity &rarr;
 </button>
 </div>
 </div>
 `;
}

export function bindTutorialCard(app, onStart) {
 let started = false;
 const trigger = (e) => {
 if (e) {
 if (typeof e.preventDefault === 'function') e.preventDefault();
 if (typeof e.stopPropagation === 'function') e.stopPropagation();
 }
 if (started) return;
 started = true;
 onStart();
 };

 const btn = app.querySelector('#startActivityBtn');
 const card = app.querySelector('.tutorial-card');

 if (btn) {
 btn.addEventListener('click', trigger, { once: true });
 }

 if (card) {
 card.addEventListener('click', (e) => {
 trigger(e);
 }, { once: true });
 card.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 trigger(e);
 }
 }, { once: true });
 }
}

export function runMiniGame(context) {
 const { appContainer, worldCode, worldIndex, miniGameIndex, gameId, onMiniGameComplete } = context;
 const meta = WORLD_METADATA[worldCode] || { name: 'Alfaaz Workshop', name_ur: '', subtitle: '' };

 const resolvedGameId = gameId || (CANDIDATE_CORE_GAMES[worldCode] && CANDIDATE_CORE_GAMES[worldCode][miniGameIndex]) || null;
 const extendedContext = { ...context, gameId: resolvedGameId };

 // Clean, Poetic Header Shell without Skip Buttons
 const renderHeader = (mgTitle, mgDesc) => `
 <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
 <div>
 <div class="flex items-center gap-2">
 <span class="act-badge">World ${worldIndex + 1} of 7: ${meta.name}</span>
 <span class="font-serif text-base sm:text-lg text-black" style="direction: rtl;">${meta.name_ur}</span>
 </div>
 <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${mgTitle}</h2>
 <p class="text-base text-black mt-1 leading-relaxed font-medium">${mgDesc}</p>
 </div>
 </div>
 `;

 // Dispatch to World Runners
 switch (worldCode) {
 case 'W1':
 runTheFrequency(extendedContext, renderHeader);
 break;
 case 'W2':
 runTheArchive(extendedContext, renderHeader);
 break;
 case 'W3':
 runTheSharedCanvas(extendedContext, renderHeader);
 break;
 case 'W4':
 runTheShiftingGrid(extendedContext, renderHeader);
 break;
 case 'W5':
 runTheHiddenGallery(extendedContext, renderHeader);
 break;
 case 'W6':
 runTheBrokenTool(extendedContext, renderHeader);
 break;
 case 'W7':
 runTheRepetition(extendedContext, renderHeader);
 break;
 default:
 if (onMiniGameComplete) onMiniGameComplete({});
 break;
 }
}

