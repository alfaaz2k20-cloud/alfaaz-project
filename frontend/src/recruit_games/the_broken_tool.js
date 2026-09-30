/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 6: THE WORKSHOP BENCH (شکستہ آلہ)
   Mini-games: CR1 (The Artisan's Cord), CR2 (The Central Pillar), CR3 (The Printed Motif)
   ========================================================================== */

import { renderTutorialCard } from './index.js';

export function runTheBrokenTool(context, renderHeader) {
  const { appContainer, miniGameIndex, logEvent, onMiniGameComplete } = context;

  switch (miniGameIndex) {
    case 0:
      runCR1OpenConstruction(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 1:
      runCR2ConstraintShift(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 2:
      runCR3UnspecifiedToolUse(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
  }
}

// --------------------------------------------------------------------------
// CR1: The Artisan's Cord
// --------------------------------------------------------------------------
function runCR1OpenConstruction(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let selectedItems = ['Twisted Hemp Cord', 'Steel Hanging Ring'];

  const availableTools = [
    { id: 'T_HEMP', name: 'Twisted Hemp Cord', icon: '&#129526;' },
    { id: 'T_BRASS', name: 'Brass Chain Link', icon: '&#128279;' },
    { id: 'T_CLIP', name: 'Carved Walnut Clip', icon: '&#128206;' },
    { id: 'T_RING', name: 'Steel Hanging Ring', icon: '&#9711;' }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader("Part 1: The Artisan's Cord", 'Assembling a custom mount for hanging an exhibition frame.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
            goal: 'Select at least 2 workbench items to assemble a durable frame mount.',
            steps: [
              'Examine the workshop table supplies (cord, chain, clip, ring).',
              'Click to combine at least 2 materials into your mounting rig.',
              'Click Test Mount Stability to verify the assembly.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        render();
      });
      return;
    }

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader("Part 1: The Artisan's Cord", 'Standard wire is unavailable. Pick at least 2 items to build a stable mount.')}

        <!-- Interactive Workbench Preview -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <div class="w-full h-36 bg-white border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative mb-4 rounded-xs shadow-inner">
            <div class="w-28 h-20 bg-amber-50 border-2 border-[var(--accent-gold)] flex items-center justify-center text-[10px] uppercase font-bold text-[var(--accent-gold)] shadow-xs">
              Art Frame
            </div>
            <div class="text-xs text-[var(--text-secondary)] mt-2 font-medium">
              Rig Configuration: ${selectedItems.length > 0 ? `<strong class="text-emerald-800 font-semibold">${selectedItems.join(' + ')}</strong>` : 'No workshop materials connected.'}
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            ${availableTools.map(t => `
              <button class="tool-btn p-3 bg-white border ${selectedItems.includes(t.name) ? 'border-[var(--accent-gold)] bg-amber-50/50 font-semibold shadow-xs' : 'border-[var(--grid-border)]'} text-xs hover:border-[var(--accent-gold)] transition text-center rounded-xs" data-name="${t.name}">
                <div class="text-2xl mb-1.5">${t.icon}</div>
                <div class="text-[11px] text-[var(--text-primary)]">${t.name}</div>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)] font-medium">${selectedItems.length} materials selected</span>
          <button id="testMountBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Test Mount Stability &rarr;
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        if (selectedItems.includes(name)) {
          if (selectedItems.length > 1) {
            selectedItems = selectedItems.filter(i => i !== name);
          }
        } else {
          selectedItems.push(name);
        }
        logEvent('material_toggled', { material: name, current_selection: selectedItems });
        render();
      });
    });

    document.getElementById('testMountBtn')?.addEventListener('click', () => {
      logEvent('mount_built', { materials: selectedItems });
      onComplete({
        mini_game: 'CR1',
        observations_count: 1,
        materials_used: selectedItems.length
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// CR2: The Central Pillar
// --------------------------------------------------------------------------
function runCR2ConstraintShift(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let chosenLayout = 'S_360';

  const solutions = [
    { id: 'S_360', title: '360° Wrap Display', desc: 'Hang miniature framed poetry on all four faces of the stone pillar for a 360° walking gallery.' },
    { id: 'S_SHADOW', title: 'Ambient Light Backdrop', desc: 'Position warm ground lamps toward the pillar to cast atmospheric silhouettes for surrounding work.' },
    { id: 'S_SEAT', title: 'Literary Reading Nook', desc: 'Arrange low wooden seating and poetry anthologies around the pillar base for quiet reflection.' }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Central Pillar', 'Transforming a central architectural column into an exhibition feature.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
            goal: 'Select a creative layout concept to incorporate the center hall column into the event.',
            steps: [
              'Review the 3 space curation ideas.',
              'Choose the concept that creates the most welcoming guest experience.',
              'Confirm your design.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        render();
      });
      return;
    }

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader('Part 2: The Central Pillar', 'A wide stone column sits in the hall center. Choose how to make it part of the exhibition.')}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${solutions.map(s => `
            <div class="cr2-card p-5 bg-white border ${chosenLayout === s.id ? 'border-[var(--accent-gold)] bg-amber-50/40 font-semibold shadow-xs' : 'border-[var(--grid-border)]'} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2.5 text-center shadow-xs rounded-xs" data-id="${s.id}">
              <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] font-serif text-lg">
                &#10038;
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${s.title}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${s.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="flex justify-end">
          <button id="cr2ConfirmBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Confirm Space Concept &rarr;
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('.cr2-card').forEach(card => {
      card.addEventListener('click', () => {
        chosenLayout = card.getAttribute('data-id');
        render();
      });
    });

    document.getElementById('cr2ConfirmBtn')?.addEventListener('click', () => {
      logEvent('pillar_solution_selected', { solution: chosenLayout });
      onComplete({
        mini_game: 'CR2',
        observations_count: 1,
        solution: chosenLayout
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// CR3: The Printed Motif
// --------------------------------------------------------------------------
function runCR3UnspecifiedToolUse(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let chosenPoster = 'P_MINIMAL';

  const styles = [
    { id: 'P_MINIMAL', title: 'Serene Minimalist', desc: 'Spacious parchment backdrop highlighting a single handwritten verse in classical calligraphy.' },
    { id: 'P_CLASSIC', title: 'Heritage Floral Border', desc: 'Hand-drawn Chinar leaf border framing event details with warmth and historical resonance.' },
    { id: 'P_MODERN', title: 'Warm Terracotta Split', desc: 'Earthy terracotta wash on one half, structured typography on the other for high readability.' }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 3: The Printed Motif', 'Selecting visual invitation aesthetics for the exhibition announcement.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`,
            goal: 'Choose the visual card aesthetic that best reflects the collective’s creative tone.',
            steps: [
              'Compare the 3 visual layout previews.',
              'Select the invitation style you find most fitting.',
              'Click Finish to conclude the workshop session.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        render();
      });
      return;
    }

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader('Part 3: The Printed Motif', 'Choose which visual style best communicates the spirit of the upcoming gathering.')}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${styles.map(st => `
            <div class="cr3-card p-5 bg-white border ${chosenPoster === st.id ? 'border-[var(--accent-gold)] bg-amber-50/40 font-semibold shadow-xs' : 'border-[var(--grid-border)]'} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2.5 text-center shadow-xs rounded-xs" data-id="${st.id}">
              <div class="w-full h-24 bg-[#faf8f5] border border-[var(--grid-border)] flex flex-col items-center justify-center font-serif text-xs text-[var(--accent-gold)] mb-2 rounded-xs">
                <span class="text-xs uppercase font-medium tracking-wider">[Card Style]</span>
                <span class="text-[11px] text-[var(--text-secondary)] italic mt-1">${st.title}</span>
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${st.title}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${st.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="flex justify-end">
          <button id="cr3FinishBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Confirm Style Choice &rarr;
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('.cr3-card').forEach(card => {
      card.addEventListener('click', () => {
        chosenPoster = card.getAttribute('data-id');
        render();
      });
    });

    document.getElementById('cr3FinishBtn')?.addEventListener('click', () => {
      logEvent('poster_style_selected', { style: chosenPoster });
      onComplete({
        mini_game: 'CR3',
        observations_count: 1,
        style: chosenPoster
      });
    });
  }

  render();
}

