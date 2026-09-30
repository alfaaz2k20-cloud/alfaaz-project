/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 6: THE BROKEN TOOL (CREATIVE INITIATIVE)
   Mini-games: CR1 (Creative Frame Fix), CR2 (Pillar Solution), CR3 (Poster Layout)
   ========================================================================== */

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
// CR1: Creative Frame Fix
// --------------------------------------------------------------------------
function runCR1OpenConstruction(app, renderHeader, logEvent, onComplete) {
  let selectedItems = [];

  const availableTools = [
    { id: 'T_HEMP', name: 'Twisted Hemp Cord', icon: '&#129526;' },
    { id: 'T_BRASS', name: 'Brass Chain Link', icon: '&#128279;' },
    { id: 'T_CLIP', name: 'Carved Walnut Clip', icon: '&#128206;' },
    { id: 'T_RING', name: 'Steel Hanging Ring', icon: '&#9711;' }
  ];

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('Task 1: Improvised Art Mount', 'The hanging wire broke right before the show. Pick at least 2 items from the table to build a strong, creative mount.')}

        <!-- Interactive Workbench Preview -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="w-full h-32 bg-white border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative mb-4">
            <div class="w-24 h-16 bg-amber-100 border border-[var(--accent-gold)] flex items-center justify-center text-[10px] uppercase font-bold text-[var(--accent-gold)] shadow-xs">
              Art Frame
            </div>
            <div class="text-xs text-[var(--text-secondary)] mt-2">
              Assembly: ${selectedItems.length > 0 ? `<strong class="text-emerald-800">${selectedItems.join(' + ')}</strong>` : 'No materials attached yet.'}
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            ${availableTools.map(t => `
              <button class="tool-btn p-3 bg-white border ${selectedItems.includes(t.name) ? 'border-[var(--accent-gold)] bg-amber-50/50 font-semibold' : 'border-[var(--grid-border)]'} text-xs hover:border-[var(--accent-gold)] transition text-center" data-name="${t.name}">
                <div class="text-lg mb-1">${t.icon}</div>
                <div>${t.name}</div>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)]">${selectedItems.length} items connected</span>
          <button id="testMountBtn" ${selectedItems.length >= 2 ? '' : 'disabled'} class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
            Test Mount Stability &rarr;
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        if (selectedItems.includes(name)) {
          selectedItems = selectedItems.filter(i => i !== name);
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
// CR2: Pillar Solution
// --------------------------------------------------------------------------
function runCR2ConstraintShift(app, renderHeader, logEvent, onComplete) {
  let chosenLayout = null;

  const solutions = [
    { id: 'S_360', title: '360° Wrap Display', desc: 'Hang small framed poetry on all four sides of the pillar so visitors can walk around it.' },
    { id: 'S_SHADOW', title: 'Shadow Projection Wall', desc: 'Place a warm spotlight on the pillar to create an ambient shadow backdrop for nearby paintings.' },
    { id: 'S_SEAT', title: 'Reading Bench Nook', desc: 'Place a low wooden bench and poetry books at the pillar base for quiet reading.' }
  ];

  app.innerHTML = `
    <div>
      ${renderHeader('Task 2: Turning a Barrier into Art', 'A wide stone pillar stands in the center of the gallery. How would you incorporate it into the event?')}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${solutions.map(s => `
          <div class="cr2-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2 text-center" data-id="${s.id}">
            <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] font-serif text-base">
              &#10038;
            </div>
            <div class="text-xs font-semibold text-[var(--text-primary)]">${s.title}</div>
            <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${s.desc}</div>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-end">
        <button id="cr2ConfirmBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Confirm Idea &rarr;
        </button>
      </div>
    </div>
  `;

  const btn = document.getElementById('cr2ConfirmBtn');
  app.querySelectorAll('.cr2-card').forEach(card => {
    card.addEventListener('click', () => {
      app.querySelectorAll('.cr2-card').forEach(c => c.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/40'));
      card.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/40');
      chosenLayout = card.getAttribute('data-id');
      if (btn) btn.disabled = false;
    });
  });

  btn?.addEventListener('click', () => {
    logEvent('pillar_solution_selected', { solution: chosenLayout });
    onComplete({
      mini_game: 'CR2',
      observations_count: 1,
      solution: chosenLayout
    });
  });
}

// --------------------------------------------------------------------------
// CR3: Poster Layout
// --------------------------------------------------------------------------
function runCR3UnspecifiedToolUse(app, renderHeader, logEvent, onComplete) {
  let chosenPoster = null;

  const styles = [
    { id: 'P_MINIMAL', title: 'Serene Minimalist', desc: 'Large open white space with a single central poem line in elegant Nastaliq.' },
    { id: 'P_CLASSIC', title: 'Traditional Floral Border', desc: 'Handmade Kashmiri floral border pattern framing the event details.' },
    { id: 'P_MODERN', title: 'Split Contrast', desc: 'Warm terracotta block on one half, crisp typography on the other.' }
  ];

  app.innerHTML = `
    <div>
      ${renderHeader('Task 3: Event Invitation Design', 'Choose which visual style best reflects the welcoming spirit of the collective.')}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${styles.map(st => `
          <div class="cr3-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2 text-center" data-id="${st.id}">
            <div class="w-full h-24 bg-[#faf8f5] border border-[var(--grid-border)] flex items-center justify-center font-serif text-xs text-[var(--accent-gold)] mb-2">
              [Preview: ${st.title}]
            </div>
            <div class="text-xs font-semibold text-[var(--text-primary)]">${st.title}</div>
            <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${st.desc}</div>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-end">
        <button id="cr3FinishBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Finish World 6 &rarr;
        </button>
      </div>
    </div>
  `;

  const btn = document.getElementById('cr3FinishBtn');
  app.querySelectorAll('.cr3-card').forEach(card => {
    card.addEventListener('click', () => {
      app.querySelectorAll('.cr3-card').forEach(c => c.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/40'));
      card.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/40');
      chosenPoster = card.getAttribute('data-id');
      if (btn) btn.disabled = false;
    });
  });

  btn?.addEventListener('click', () => {
    logEvent('poster_style_selected', { style: chosenPoster });
    onComplete({
      mini_game: 'CR3',
      observations_count: 1,
      style: chosenPoster
    });
  });
}
