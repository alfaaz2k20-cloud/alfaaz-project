/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 5: THE HIDDEN GALLERY (CURIOSITY)
   Mini-games: Q1 (Optional Discovery), Q2 (Mystery Exploration), Q3 (Information Integration)
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
// Q1: Optional Discovery
// --------------------------------------------------------------------------
function runQ1OptionalDiscovery(app, renderHeader, logEvent, onComplete) {
  let alcovesExplored = 0;
  const totalAlcoves = 3;

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('Q1: Gallery Navigation', 'Navigate the exhibition floorplan to the pavilion exit. Side alcoves contain unrequired archival manuscripts.')}

        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="p-4 bg-white border border-[var(--grid-border)] text-center">
            <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">Alcove A</span>
            <p class="font-serif text-xs text-[var(--text-primary)] mt-1 mb-3">18th C. Astrolabe Schematics</p>
            <button id="alcoveABtn" class="px-3 py-1 text-xs border border-[var(--grid-border)] hover:border-[var(--accent-gold)]">
              Inspect Alcove
            </button>
          </div>
          <div class="p-4 bg-white border border-[var(--grid-border)] text-center">
            <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">Alcove B</span>
            <p class="font-serif text-xs text-[var(--text-primary)] mt-1 mb-3">Persian Calligraphy Pigments</p>
            <button id="alcoveBBtn" class="px-3 py-1 text-xs border border-[var(--grid-border)] hover:border-[var(--accent-gold)]">
              Inspect Alcove
            </button>
          </div>
          <div class="p-4 bg-white border border-[var(--grid-border)] text-center">
            <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">Alcove C</span>
            <p class="font-serif text-xs text-[var(--text-primary)] mt-1 mb-3">Lal Ded Verse Annotations</p>
            <button id="alcoveCBtn" class="px-3 py-1 text-xs border border-[var(--grid-border)] hover:border-[var(--accent-gold)]">
              Inspect Alcove
            </button>
          </div>
        </div>

        <div id="alcoveContent" class="hidden p-4 bg-amber-50/50 border border-[var(--accent-gold)]/30 text-xs text-[var(--text-primary)] mb-6"></div>

        <div class="flex justify-between items-center pt-2">
          <span class="text-xs text-[var(--text-secondary)]">${alcovesExplored} of ${totalAlcoves} optional alcoves visited</span>
          <button id="exitGalleryBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Reach Pavilion Exit &rarr;
          </button>
        </div>
      </div>
    `;

    logEvent('gallery_floorplan_viewed', { alcoves_visited: alcovesExplored });

    const showAlcove = (name, text) => {
      alcovesExplored++;
      const panel = document.getElementById('alcoveContent');
      if (panel) {
        panel.classList.remove('hidden');
        panel.innerHTML = `<strong>${name}:</strong> ${text}`;
      }
      logEvent('alcove_explored', { alcove: name });
    };

    document.getElementById('alcoveABtn')?.addEventListener('click', () => showAlcove('Alcove A (Astrolabe)', 'Notes how brass astrolabes utilized latitude projection plates calibrated for Kashmir valleys.'));
    document.getElementById('alcoveBBtn')?.addEventListener('click', () => showAlcove('Alcove B (Pigments)', 'Details how lapis lazuli was ground into gum arabic for illuminated Quranic borders.'));
    document.getElementById('alcoveCBtn')?.addEventListener('click', () => showAlcove('Alcove C (Lal Ded)', 'Examines oral poetic meter structures passed through feminine Kashmiri idioms.'));

    document.getElementById('exitGalleryBtn')?.addEventListener('click', () => {
      logEvent('gallery_exited', { total_explored: alcovesExplored });
      onComplete({
        mini_game: 'Q1',
        observations_count: 1,
        exploration_rate: alcovesExplored / totalAlcoves
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// Q2: Mystery Exploration
// --------------------------------------------------------------------------
function runQ2MysteryExploration(app, renderHeader, logEvent, onComplete) {
  let depth = 0;
  const maxDepth = 3;

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('Q2: The Inscription Anomaly', 'An exhibit artifact displays an unexplained cipher inscription.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">Artifact Inscription #402</span>
          <h3 class="text-xl font-serif text-[var(--text-primary)] mt-1 mb-2">Uncatalogued Marginal Cipher</h3>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
            A handwritten marginal symbol appears beside the 16th century seal. Standard documentation does not mention this mark.
          </p>
          <div id="depthDetails" class="mt-4 text-xs text-[var(--text-primary)] space-y-2">
            ${depth >= 1 ? '<div class="p-2 bg-white border border-[var(--grid-border)]"><strong>Layer 1:</strong> Cipher resembles 16th century trade shorthand.</div>' : ''}
            ${depth >= 2 ? '<div class="p-2 bg-white border border-[var(--grid-border)]"><strong>Layer 2:</strong> UV spectroscopy reveals hidden iron gall ink underneath.</div>' : ''}
            ${depth >= 3 ? '<div class="p-2 bg-white border border-[var(--grid-border)]"><strong>Layer 3:</strong> Cross-referenced with Silk Road merchant marks.</div>' : ''}
          </div>
        </div>

        <div class="flex justify-between items-center">
          ${depth < maxDepth ? `
          <button id="probeDeeperBtn" class="px-5 py-2 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-wider hover:bg-amber-50 transition">
            Probe Cipher Depth (${depth}/${maxDepth})
          </button>` : '<span></span>'}
          <button id="concludeQ2Btn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Continue Journey &rarr;
          </button>
        </div>
      </div>
    `;

    logEvent('mystery_station_presented', { current_depth: depth });

    document.getElementById('probeDeeperBtn')?.addEventListener('click', () => {
      depth++;
      logEvent('anomaly_layer_unlocked', { depth });
      render();
    });

    document.getElementById('concludeQ2Btn')?.addEventListener('click', () => {
      onComplete({
        mini_game: 'Q2',
        observations_count: Math.max(1, depth),
        investigation_depth: depth / maxDepth
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// Q3: Information Integration
// --------------------------------------------------------------------------
function runQ3InformationIntegration(app, renderHeader, logEvent, onComplete) {
  app.innerHTML = `
    <div>
      ${renderHeader('Q3: Archival Synthesis', 'Synthesize archival observations into a curatorial summary.')}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6">
        <p class="text-sm font-serif text-[var(--text-primary)] mb-3">
          Which metallurgical characteristic accounts for the preservation of Kashmiri astrolabe latitude projection plates?
        </p>
        <div class="space-y-2">
          <label class="block p-3 bg-white border border-[var(--grid-border)] text-xs cursor-pointer hover:border-[var(--accent-gold)]">
            <input type="radio" name="synthQ" value="A" class="mr-2 accent-[#bd6f5d]"> Brass alloy calibrated specifically for valley latitude projection.
          </label>
          <label class="block p-3 bg-white border border-[var(--grid-border)] text-xs cursor-pointer hover:border-[var(--accent-gold)]">
            <input type="radio" name="synthQ" value="B" class="mr-2 accent-[#bd6f5d]"> Standard iron gall coating.
          </label>
        </div>
      </div>

      <div class="flex justify-end">
        <button id="submitSynthesisBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Submit Synthesis &rarr;
        </button>
      </div>
    </div>
  `;

  document.getElementById('submitSynthesisBtn')?.addEventListener('click', () => {
    logEvent('synthesis_completed');
    onComplete({
      mini_game: 'Q3',
      observations_count: 1,
      synthesis_score: 1.0
    });
  });
}
