/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 5: THE HIDDEN GALLERY (CURIOSITY)
   Mini-games: Q1 (Exploring Rooms), Q2 (Investigating Clues), Q3 (New Art Medium)
   ========================================================================== */

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
// Q1: Exploring Gallery Rooms
// --------------------------------------------------------------------------
function runQ1OptionalDiscovery(app, renderHeader, logEvent, onComplete) {
  let exploredCount = 0;
  const alcoves = [
    { id: 'ALC_1', title: 'Room A: Natural Pigments', text: 'Shows how blue lapis lazuli and gold leaf were ground by hand to create vibrant border illuminations.' },
    { id: 'ALC_2', title: 'Room B: Paper Making', text: 'Explains how traditional Kashmiri rag paper (Koshur Kagaz) is made from hemp and smoothed with agate stone.' },
    { id: 'ALC_3', title: 'Room C: Oral Verse Metres', text: 'Details how classical Kashmiri poetry metres were sung aloud to remember rhymes before printing existed.' }
  ];

  let visited = {};

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('Task 1: Gallery Walk', 'Walk through the exhibition. Click any side room to read its short story, or head straight to the exit.')}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${alcoves.map(a => `
            <div class="p-4 bg-white border ${visited[a.id] ? 'border-emerald-600 bg-emerald-50/20' : 'border-[var(--grid-border)]'} text-center space-y-2">
              <span class="text-[10px] uppercase font-bold text-[var(--accent-gold)] tracking-wider">Side Room</span>
              <h3 class="text-xs font-serif font-semibold text-[var(--text-primary)]">${a.title}</h3>
              <button class="alc-btn px-3 py-1.5 text-xs border border-[var(--grid-border)] bg-[#faf8f5] hover:border-[var(--accent-gold)] transition w-full" data-id="${a.id}">
                ${visited[a.id] ? '&#10003; Read Story' : 'Inspect Room'}
              </button>
            </div>
          `).join('')}
        </div>

        <div id="storyBox" class="hidden p-4 mb-6 bg-amber-50/70 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] leading-relaxed"></div>

        <div class="flex justify-between items-center pt-2">
          <span class="text-xs text-[var(--text-secondary)]">${exploredCount} of 3 optional rooms explored</span>
          <button id="exitGalleryBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Proceed to Exit &rarr;
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
// Q2: Investigating Clues
// --------------------------------------------------------------------------
function runQ2MysteryExploration(app, renderHeader, logEvent, onComplete) {
  let cluesRead = 0;
  const clues = [
    { id: 'C_PIGMENT', name: 'Pigment Inspection', detail: 'The red ink uses pure saffron flower pigment, common in mid-19th century regional manuscripts.' },
    { id: 'C_WOOD', name: 'Backing Frame', detail: 'The backing board is carved from seasoned Himalayan cedar with hand-forged iron nails.' },
    { id: 'C_SEAL', name: 'Seal Impression', detail: 'A faint circular wax seal in the lower corner bears the seal of a Srinagar bookbinder.' }
  ];
  let revealed = {};

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('Task 2: Investigating an Artwork', 'An unsigned artwork arrived at the archive. Click on the clue cards below to learn more about its history.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <span class="text-[10px] tracking-widest text-[var(--accent-gold)] uppercase font-semibold">Unidentified Item</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-2">Illuminated Manuscript Border (Item #402)</h3>
          <p class="text-xs text-[var(--text-secondary)]">Click any clue below to reveal archival details.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          ${clues.map(c => `
            <div class="p-4 bg-white border ${revealed[c.id] ? 'border-[var(--accent-gold)] bg-amber-50/20' : 'border-[var(--grid-border)]'} text-center space-y-2 cursor-pointer clue-card" data-id="${c.id}">
              <div class="text-xs font-semibold text-[var(--text-primary)]">${c.name}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${revealed[c.id] ? c.detail : 'Click to inspect clue...'}</div>
            </div>
          `).join('')}
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)]">${cluesRead} of 3 clues examined</span>
          <button id="finishCluesBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Finish Investigation &rarr;
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
// Q3: New Art Medium
// --------------------------------------------------------------------------
function runQ3InformationIntegration(app, renderHeader, logEvent, onComplete) {
  let selectedMedium = null;

  const mediums = [
    { id: 'M_PROJECTION', title: 'Poetry & Light Projection', desc: 'Projecting animated Urdu and Kashmiri verses onto white plaster walls.' },
    { id: 'M_SOUND', title: 'Acoustic Soundscapes', desc: 'Recording sounds of mountain streams, paper workshops, and courtyard birds to accompany poetry.' },
    { id: 'M_TEXTILE', title: 'Embroidered Wall Murals', desc: 'Working with local artisans to embroider literary couplets into woven wool.' }
  ];

  app.innerHTML = `
    <div>
      ${renderHeader('Task 3: Creative Exploration', 'Which upcoming experimental showcase would you be most curious to explore and help set up?')}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${mediums.map(m => `
          <div class="med-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2 text-center" data-id="${m.id}">
            <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] font-serif text-base">
              &#10023;
            </div>
            <div class="text-xs font-semibold text-[var(--text-primary)]">${m.title}</div>
            <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${m.desc}</div>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-end">
        <button id="q3FinishBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Finish World 5 &rarr;
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
