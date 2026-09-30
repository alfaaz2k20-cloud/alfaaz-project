/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 5: THE HIDDEN COURTYARD (نہاں خانہ)
   Mini-games: Q1 (The Three Chambers), Q2 (The Uncataloged Seal), Q3 (The Weaver's Chronicle)
   ========================================================================== */

import { renderTutorialCard } from './index.js';

export function runTheHiddenGallery(context, renderHeader) {
  const { appContainer, miniGameIndex, logEvent, onMiniGameComplete } = context;

  switch (miniGameIndex) {
    case 0:
      runQ1OptionalDiscovery(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 1:
      runQ2MysteryExploration(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 2:
      runQ3InformationIntegration(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
  }
}

// --------------------------------------------------------------------------
// Q1: The Three Chambers
// --------------------------------------------------------------------------
function runQ1OptionalDiscovery(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let exploredCount = 0;
  const alcoves = [
    { id: 'ALC_1', title: 'Chamber I: Mineral Pigments', text: 'Shows how blue lapis lazuli and gold leaf were ground by hand to create vibrant border illuminations in ancient Srinagar.' },
    { id: 'ALC_2', title: 'Chamber II: Koshur Paper', text: 'Explains how traditional Kashmiri rag paper (Koshur Kagaz) is made from hemp pulp and burnished with smooth agate stone.' },
    { id: 'ALC_3', title: 'Chamber III: Oral Verse Metres', text: 'Details how classical Sufi poetry metres were sung aloud across courtyards to remember rhymes before printing existed.' }
  ];

  let visited = {};

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 1: The Three Chambers', 'Exploring optional historical side chambers across the courtyard.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
            goal: 'Visit side chambers to learn about historical craft traditions, or proceed directly.',
            steps: [
              'Click any side chamber card to uncover its archival story.',
              'Read the historical technique recorded by the collective.',
              'Proceed when you are ready.'
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
        ${renderHeader('Part 1: The Three Chambers', 'Walk through the courtyard. Click any side chamber to read its craft story.')}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${alcoves.map(a => `
            <div class="p-4 bg-white border ${visited[a.id] ? 'border-emerald-600 bg-emerald-50/30 shadow-xs' : 'border-[var(--grid-border)] shadow-xs'} text-center space-y-2 rounded-xs">
              <span class="text-[10px] uppercase font-bold text-[var(--accent-gold)] tracking-wider">Archival Chamber</span>
              <h3 class="text-xs font-serif font-semibold text-[var(--text-primary)]">${a.title}</h3>
              <button class="alc-btn px-3 py-1.5 text-xs border border-[var(--grid-border)] bg-[#faf8f5] hover:border-[var(--accent-gold)] hover:bg-white transition w-full shadow-xs" data-id="${a.id}">
                ${visited[a.id] ? '✓ Read Narrative' : 'Inspect Chamber'}
              </button>
            </div>
          `).join('')}
        </div>

        <div id="storyBox" class="hidden p-4 mb-6 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] leading-relaxed shadow-xs rounded-xs"></div>

        <div class="flex justify-between items-center pt-2">
          <span class="text-xs text-[var(--text-secondary)] font-medium">${exploredCount} of 3 chambers visited</span>
          <button id="exitGalleryBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Proceed Ahead &rarr;
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('.alc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = alcoves.find(a => a.id === id);
        if (!visited[id]) {
          visited[id] = true;
          exploredCount++;
        }
        const box = document.getElementById('storyBox');
        if (box && item) {
          box.classList.remove('hidden');
          box.innerHTML = `<strong>${item.title}:</strong> ${item.text}`;
        }
        logEvent('alcove_read', { alcove_id: id });
        render();
      });
    });

    document.getElementById('exitGalleryBtn')?.addEventListener('click', () => {
      logEvent('gallery_walk_finished', { explored: exploredCount });
      onComplete({
        mini_game: 'Q1',
        observations_count: 1,
        exploration_rate: exploredCount / 3.0
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// Q2: The Uncataloged Seal
// --------------------------------------------------------------------------
function runQ2MysteryExploration(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let cluesRead = 0;
  const clues = [
    { id: 'C_PIGMENT', name: 'Pigment Inspection', detail: 'The red ink uses pure saffron flower pigment, common in mid-19th century regional manuscripts.' },
    { id: 'C_WOOD', name: 'Backing Frame', detail: 'The backing board is carved from seasoned Himalayan cedar with hand-forged iron nails.' },
    { id: 'C_SEAL', name: 'Seal Impression', detail: 'A faint circular wax seal in the lower corner bears the mark of a historic Srinagar bookbinder.' }
  ];
  let revealed = {};

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Uncataloged Seal', 'Investigating provenance details of an anonymous illuminated border.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
            goal: 'Click on archaeological clue cards to inspect physical attributes of the folio.',
            steps: [
              'Examine the uncataloged border manuscript card.',
              'Click each clue card to inspect ink, wood, and wax marks.',
              'Click Finish Investigation when done.'
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
        ${renderHeader('Part 2: The Uncataloged Seal', 'An unsigned artwork arrived at the collection. Click clue cards to inspect details.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <span class="text-[10px] tracking-widest text-[var(--accent-gold)] uppercase font-semibold">Uncataloged Acquisition</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-2 font-medium">Illuminated Manuscript Border (Item #402)</h3>
          <p class="text-xs text-[var(--text-secondary)]">Click any clue below to uncover archival details.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          ${clues.map(c => `
            <div class="p-4 bg-white border ${revealed[c.id] ? 'border-[var(--accent-gold)] bg-amber-50/30 shadow-xs' : 'border-[var(--grid-border)]'} text-center space-y-2 cursor-pointer clue-card rounded-xs transition hover:border-[var(--accent-gold)]" data-id="${c.id}">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                ${c.name}
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${revealed[c.id] ? c.detail : 'Click to inspect clue...'}</div>
            </div>
          `).join('')}
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)] font-medium">${cluesRead} of 3 clues examined</span>
          <button id="finishCluesBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Finish Inspection &rarr;
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('.clue-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        if (!revealed[id]) {
          revealed[id] = true;
          cluesRead++;
          logEvent('clue_inspected', { clue_id: id });
          render();
        }
      });
    });

    document.getElementById('finishCluesBtn')?.addEventListener('click', () => {
      logEvent('investigation_completed', { clues_read: cluesRead });
      onComplete({
        mini_game: 'Q2',
        observations_count: 1,
        clues_read: cluesRead
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// Q3: The Weaver's Chronicle
// --------------------------------------------------------------------------
function runQ3InformationIntegration(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let selectedMedium = null;

  const mediums = [
    { id: 'M_PROJECTION', title: 'Poetry & Light Projection', desc: 'Projecting animated Kashmiri and Urdu verses onto white lime plaster walls.' },
    { id: 'M_SOUND', title: 'Acoustic Soundscapes', desc: 'Recording sounds of mountain streams, wooden looms, and courtyard birds alongside poetry.' },
    { id: 'M_TEXTILE', title: 'Embroidered Wall Hangings', desc: 'Partnering with local master weavers to embroider literary couplets into woven pashmina.' }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader("Part 3: The Weaver's Chronicle", 'Selecting an expressive creative medium for upcoming exhibitions.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>`,
            goal: 'Choose which cultural format you would find most inspiring to curate.',
            steps: [
              'Review the 3 proposed experimental exhibition formats.',
              'Select the artistic medium you are most drawn to explore.',
              'Confirm your choice to complete the courtyard discovery.'
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
        ${renderHeader("Part 3: The Weaver's Chronicle", 'Which upcoming experimental showcase format would you be most curious to help create?')}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${mediums.map(m => `
            <div class="med-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2.5 text-center shadow-xs rounded-xs" data-id="${m.id}">
              <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] font-serif text-lg">
                &#10023;
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${m.title}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${m.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="flex justify-end">
          <button id="q3FinishBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Selection &rarr;
          </button>
        </div>
      </div>
    `;

    const btn = document.getElementById('q3FinishBtn');
    app.querySelectorAll('.med-card').forEach(card => {
      card.addEventListener('click', () => {
        app.querySelectorAll('.med-card').forEach(c => c.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/40'));
        card.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/40');
        selectedMedium = card.getAttribute('data-id');
        if (btn) btn.disabled = false;
      });
    });

    btn?.addEventListener('click', () => {
      logEvent('medium_selected', { medium: selectedMedium });
      onComplete({
        mini_game: 'Q3',
        observations_count: 1,
        medium: selectedMedium
      });
    });
  }

  render();
}

