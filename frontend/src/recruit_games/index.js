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

const WORLD_METADATA = {
  'W1': { name: 'The Frequency', name_ur: 'آواز', subtitle: 'Acoustics & Dialogue' },
  'W2': { name: 'The Archive', name_ur: 'دستاویز', subtitle: 'Manuscripts & Preservation' },
  'W3': { name: 'The Shared Canvas', name_ur: 'مشترکہ کینوس', subtitle: 'Artisan Workshop' },
  'W4': { name: 'The Shifting Grid', name_ur: 'بدلتا گرڈ', subtitle: 'Mosaic & Rhythm' },
  'W5': { name: 'The Hidden Gallery', name_ur: 'پوشیدہ گیلری', subtitle: 'Exhibition Discovery' },
  'W6': { name: 'The Broken Tool', name_ur: 'ٹوٹا آلہ', subtitle: 'Material Assembly' },
  'W7': { name: 'The Repetition', name_ur: 'دہرائی', subtitle: 'Readiness & Ceremony' }
};

export function renderTutorialCard({ icon, goal, steps }) {
  return `
    <div class="tutorial-card cursor-pointer p-6 border border-[var(--accent-gold)] bg-gradient-to-br from-[#faf8f5] to-[#f5efe8] space-y-4 mb-6 interactive-option duration-300" tabindex="0" role="button" aria-label="Begin Activity Guide">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-amber-100/80 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] shrink-0">
          ${icon || '<i data-lucide="compass" class="w-5 h-5"></i>'}
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-medium">Activity Guide &middot; رہنمائے عمل</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] font-semibold">${goal}</h3>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        ${steps.map((s, idx) => `
          <div class="bg-white/80 border border-[var(--grid-border)] p-3 flex items-start gap-2.5">
            <span class="w-5 h-5 rounded-full bg-[var(--accent-gold)] text-white text-[10px] flex items-center justify-center font-serif shrink-0 mt-0.5">${idx + 1}</span>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">${s}</div>
          </div>
        `).join('')}
      </div>

      <div class="pt-2 flex justify-between items-center">
        <span class="text-[11px] text-[var(--text-secondary)] italic">Click anywhere or press Enter to begin</span>
        <button id="startActivityBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] interactive-option flex items-center gap-2">
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
  const { appContainer, worldCode, worldIndex, miniGameIndex, onMiniGameComplete } = context;
  const meta = WORLD_METADATA[worldCode] || { name: 'Alfaaz Workshop', name_ur: '', subtitle: '' };

  // Clean, Poetic Header Shell without Skip Buttons
  const renderHeader = (mgTitle, mgDesc) => `
    <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
      <div>
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${worldIndex + 1} of 7: ${meta.name}</span>
          <span class="font-serif text-base sm:text-lg text-[var(--text-secondary)]" style="direction: rtl;">${meta.name_ur}</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${mgTitle}</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">${mgDesc}</p>
      </div>
      
    </div>
  `;

  // Dispatch to World Runners
  switch (worldCode) {
    case 'W1':
      runTheFrequency(context, renderHeader);
      break;
    case 'W2':
      runTheArchive(context, renderHeader);
      break;
    case 'W3':
      runTheSharedCanvas(context, renderHeader);
      break;
    case 'W4':
      runTheShiftingGrid(context, renderHeader);
      break;
    case 'W5':
      runTheHiddenGallery(context, renderHeader);
      break;
    case 'W6':
      runTheBrokenTool(context, renderHeader);
      break;
    case 'W7':
      runTheRepetition(context, renderHeader);
      break;
    default:
      if (onMiniGameComplete) onMiniGameComplete({});
      break;
  }
}

