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
  'W1': { name: 'The Frequency', name_ur: 'تعدد', param: 'Empathy' },
  'W2': { name: 'The Archive', name_ur: 'دستاویز', param: 'Conscientiousness' },
  'W3': { name: 'The Shared Canvas', name_ur: 'مشترکہ نقش', param: 'Collaborative Spirit' },
  'W4': { name: 'The Shifting Grid', name_ur: 'متغیر گرڈ', param: 'Emotional Agility' },
  'W5': { name: 'The Hidden Gallery', name_ur: 'نہاں خانہ', param: 'Curiosity' },
  'W6': { name: 'The Broken Tool', name_ur: 'شکستہ آلہ', param: 'Creative Initiative' },
  'W7': { name: 'The Repetition', name_ur: 'تکرار', param: 'Motivation' }
};

export function runMiniGame(context) {
  const { appContainer, worldCode, worldIndex, miniGameIndex, onSkipWorld, onSkipAllGames } = context;
  const meta = WORLD_METADATA[worldCode] || { name: 'Unknown World', name_ur: '', param: '' };

  // Common Header Shell for World
  const renderHeader = (mgTitle, mgDesc) => `
    <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${worldIndex + 1} of 7: ${meta.name}</span>
          <span class="font-serif text-lg text-[var(--text-secondary)]" style="direction: rtl;">${meta.name_ur}</span>
        </div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">${mgTitle}</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">${mgDesc}</p>
      </div>
      <div class="flex items-center gap-3">
        <button id="skipWorldBtn" class="skip-btn hover:text-[var(--accent-gold)]">Skip World</button>
        <button id="skipAllGamesBtn" class="skip-btn text-[var(--accent-gold)]">Skip All Games</button>
      </div>
    </div>
  `;

  // Attach skip handlers
  setTimeout(() => {
    document.getElementById('skipWorldBtn')?.addEventListener('click', () => {
      if (confirm('Skip this world? Incomplete micro-tasks will be marked neutrally as insufficient data, not a low score.')) {
        onSkipWorld();
      }
    });
    document.getElementById('skipAllGamesBtn')?.addEventListener('click', () => {
      if (confirm('Skip the entire interactive game battery and finalize?')) {
        onSkipAllGames();
      }
    });
  }, 50);

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
      onSkipWorld();
      break;
  }
}
