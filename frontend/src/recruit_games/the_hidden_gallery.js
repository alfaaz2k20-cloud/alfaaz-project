/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 5: THE HIDDEN GALLERY (نہاں خانہ)
   Mini-games: Q1 (Information Seeking), Q2 (Investigation Under Uncertainty), Q3 (Knowledge Integration)
   Adheres to Design Freeze v1 + Addendum v1.1.
   Emits raw behavioral telemetry only (no client-authored scores or correctness).
   ========================================================================== */

import { renderTutorialCard } from './index.js';

export function runTheHiddenGallery(context, renderHeader) {
  const { appContainer, miniGameIndex, logEvent, onMiniGameComplete } = context;

  switch (miniGameIndex) {
    case 0:
      runQ1InformationSeeking(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 1:
      runQ2InvestigationUnderUncertainty(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 2:
      runQ3KnowledgeIntegration(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
  }
}

// --------------------------------------------------------------------------
// Q1: Information Seeking (4 required decisions, voluntary optional resources)
// Resources have genuinely different value (useful vs low-value controls).
// Clicks alone do not equal curiosity.
// --------------------------------------------------------------------------
function runQ1InformationSeeking(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentDecision = 0;
  let selectedChoice = null;
  let viewedResources = {};
  let lastInputModality = 'mouse';

  const decisions = [
    {
      stimulus_id: 'Q1_D1',
      title: 'Item 1: Antique Illuminated Manuscript Folio',
      scenario: 'Determine the conservation binding strategy for a 19th-century gold-leaf manuscript.',
      options: [
        { id: 'flexible_cord_binding', label: 'Sewn Flexible Cord Binding (Accommodates fragile spine)' },
        { id: 'tight_adhesive_clamp', label: 'Rigid Resin Adhesive Clamp (Heavy structural hold)' },
        { id: 'unbound_portfolio', label: 'Unbound Archival Enclosure (Stored as loose leaves)' }
      ],
      optional_resources: [
        { id: 'OPT_USEFUL_1', topic: 'Calligraphy Binding Technique', info_value: 'high', summary: 'Traditional Srinagar binders utilized loose vegetable-tanned goat cords to allow spine flexing without fracturing gold leaf borders.' },
        { id: 'OPT_CONTROL_1', topic: 'Catalog Inventory Stamp Dates', info_value: 'low', summary: 'Standard inventory accession stamps were introduced in colonial municipal records in October 1888.' }
      ]
    },
    {
      stimulus_id: 'Q1_D2',
      title: 'Item 2: Papier-Mâché Pen Case (Qalamdan)',
      scenario: 'Select the surface curing and stabilization treatment for an heirloom lacquer case.',
      options: [
        { id: 'curing_linseed_glaze', label: 'Cold-Pressed Linseed Oil & Amber Varnish Curing' },
        { id: 'quick_synthetic_seal', label: 'Rapid Synthetic Acrylic Spray' },
        { id: 'wax_buff_only', label: 'Dry Carnauba Wax Buffing' }
      ],
      optional_resources: [
        { id: 'OPT_USEFUL_2', topic: 'Papier-Mâché Lacquer Curing', info_value: 'high', summary: 'Slow solar drying combined with natural amber copal preserves organic earth pigments without clouding fine miniature brushwork.' },
        { id: 'OPT_CONTROL_2', topic: 'Storage Cabinet Hinge Repairs', info_value: 'low', summary: 'Brass cabinet hinges require tallow lubrication twice annually to prevent creaking.' }
      ]
    },
    {
      stimulus_id: 'Q1_D3',
      title: 'Item 3: Workshop Ledger Attribution',
      scenario: 'Classify the workshop provenance category for an undated Persian artisan register.',
      options: [
        { id: 'guild_ledger_verified', label: 'Official Guild Registry (Guildmaster seal entry)' },
        { id: 'private_merchant_tally', label: 'Informal Merchant Trade Tally' },
        { id: 'state_excise_record', label: 'Royal Treasury Revenue Record' }
      ],
      optional_resources: [
        { id: 'OPT_USEFUL_1', topic: 'Calligraphy Binding Technique', info_value: 'high', summary: 'Binding stitches using dyed crimson thread typically indicate official royal artisan guild registers.' },
        { id: 'OPT_CONTROL_1', topic: 'Catalog Inventory Stamp Dates', info_value: 'low', summary: 'Tax stamps are cataloged under Series B filing codes.' }
      ]
    },
    {
      stimulus_id: 'Q1_D4',
      title: 'Item 4: Botanical Pigment Specimen Jars',
      scenario: 'Specify long-term climate preservation for delicate indigo and saffron plant extracts.',
      options: [
        { id: 'dark_vented_cedar_chest', label: 'Dark Cedar Cabinet with Moisture Buffers' },
        { id: 'ambient_glass_display', label: 'Unfiltered Daylight Gallery Vitrine' },
        { id: 'sealed_vacuum_capsule', label: 'Hermetic Zero-Humidity Chamber' }
      ],
      optional_resources: [
        { id: 'OPT_USEFUL_2', topic: 'Organic Pigment Preservation', info_value: 'high', summary: 'Saffron and wild indigo degrade rapidly under ultraviolet exposure; cedarwood oils provide natural insect deterrence.' },
        { id: 'OPT_CONTROL_2', topic: 'Storage Cabinet Hinge Repairs', info_value: 'low', summary: 'Cabinet shelves are load-rated for 25 kilograms.' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 1: The Curatorial Dossier', 'Making 4 preservation cataloging decisions with optional archival reference dossiers.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
            goal: 'Make required cataloging decisions for 4 archival artifacts. You may voluntarily inspect optional reference notes at your discretion.',
            steps: [
              'Examine the archival artifact and decision question.',
              'Optionally review reference research notes if desired.',
              'Select and confirm your curatorial decision for each of the 4 items.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentDecision = 0;
        selectedChoice = null;
        logDecisionPresented();
        render();
      });
      return;
    }

    const d = decisions[currentDecision];

    app.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 1: The Curatorial Dossier', 'Evaluate the cataloging decision. Reference notes are available below.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Decision ${currentDecision + 1} of ${decisions.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${d.title}:</strong> ${d.scenario}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${d.stimulus_id}</span>
        </div>

        <!-- Optional Reference Resources Area (Voluntary) -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-xs">
          <div class="text-[10px] uppercase font-mono text-[var(--accent-gold)] font-semibold tracking-wider mb-2.5 flex items-center justify-between">
            <span>Optional Archival Reference Notes (Voluntary Consultation)</span>
            <span class="text-[9px] text-[var(--text-secondary)]">Click to expand notes</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            ${d.optional_resources.map(res => `
              <div class="opt-res-card p-3 bg-white border ${viewedResources[res.id] ? 'border-[var(--accent-gold)] bg-amber-50/30' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs" data-res="${res.id}">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    ${res.topic}
                  </span>
                  <span class="text-[9px] font-mono uppercase text-[var(--text-secondary)]">${viewedResources[res.id] ? 'Read' : 'Inspect'}</span>
                </div>
                ${viewedResources[res.id] ? `<p class="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--grid-border)] pt-2 animate-fadeIn">${res.summary}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Required Decision Options -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Curatorial Actions:</div>
          <div class="space-y-2.5">
            ${d.options.map(opt => `
              <div class="q1-opt p-3.5 bg-white border ${selectedChoice === opt.id ? 'border-[var(--accent-gold)] bg-amber-50/50 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-choice="${opt.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${selectedChoice === opt.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedChoice === opt.id ? '✓' : ''}</span>
                  <span class="text-[var(--text-primary)] font-medium">${opt.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${opt.id}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmQ1Btn" ${selectedChoice ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${currentDecision < decisions.length - 1 ? 'Confirm Decision &rarr;' : 'Finish Curatorial Decisions &rarr;'}
          </button>
        </div>
      </div>
    `;

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
          observations_count: 4
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
  let inTutorial = true;
  let currentTrial = 0;
  let inspectedClues = {};
  let selectedAttribution = null;
  let lastInputModality = 'mouse';

  const relics = [
    {
      stimulus_id: 'Q2_T1',
      artifact_id: 'manuscript_seal_1',
      title: 'Relic 1: Wax Intaglio Seal on Vellum',
      description: 'A dark carmine wax impression affixed to a vellum legal testament.',
      uncertainty_level: 'moderate',
      expected_value: 'high',
      clues: [
        { id: 'CLUE_SEAL_INTAGLIO', label: 'Intaglio Border Latin/Urdu Script', detail: 'Identifies the imperial registrar stamp in Srinagar, dated roughly 1862.' },
        { id: 'CLUE_WAX_RESIN', label: 'Resin and Lac Specimen Analysis', detail: 'Shellac composition matches Himalayan pine resins rather than imported European seals.' },
        { id: 'CLUE_PARCHMENT_GRAIN', label: 'Vellum Animal Grain Pattern', detail: 'High-altitude goat skin with characteristic hand-scraped follicle margins.' }
      ],
      attributions: [
        { id: 'attr_imperial_registrar_srinagar', label: 'Imperial Registrar of Srinagar (1860s)' },
        { id: 'attr_commercial_trader', label: 'Commercial River Trader Manifest' },
        { id: 'attr_modern_reproduction', label: 'Late Twentieth Century Replica' }
      ]
    },
    {
      stimulus_id: 'Q2_T2',
      artifact_id: 'ciphered_marginalia_2',
      title: 'Relic 2: Ciphered Marginalia Folio',
      description: 'Hand-written marginalia in an unfamiliar cursive cipher along the margins of an astronomy chart.',
      uncertainty_level: 'high',
      expected_value: 'high',
      clues: [
        { id: 'CLUE_CIPHER_DIACRITIC', label: 'Abjad Numerical Cryptography Marks', detail: 'Ciphers decode to chronogram dates recording a solar eclipse in 1845.' },
        { id: 'CLUE_SCRIBE_HAND', label: 'Cursive Calligraphic Flourish', detail: 'Matches the private notebooks of court astrologer Mir Habib.' },
        { id: 'CLUE_GALL_INK_CORROSION', label: 'Iron Gall Ink Vitriol Depth', detail: 'Shows genuine chemical paper oxidation consistent with 180 years of aging.' }
      ],
      attributions: [
        { id: 'attr_court_astrologer_notebook', label: 'Court Astrologer Private Ephemeris' },
        { id: 'attr_apothecary_recipe', label: 'Herbalist Compound Recipe' },
        { id: 'attr_random_scribble', label: 'Unattributed Scribe Practice Marks' }
      ]
    },
    {
      stimulus_id: 'Q2_T3',
      artifact_id: 'standard_receipt_3',
      title: 'Relic 3: Uniform Municipal Tax Receipt (Control)',
      description: 'A pre-printed municipal toll collection slip with printed column borders.',
      uncertainty_level: 'low',
      expected_value: 'low_control',
      clues: [
        { id: 'CLUE_PRINT_TYPE', label: 'Standard Moveable Type Lettering', detail: 'Common mass-printed municipal transit form with no unique historical variance.' },
        { id: 'CLUE_STAMP_INK', label: 'Blue Aniline Office Stamp', detail: 'Routine commercial municipal ink with standard serial numbering.' }
      ],
      attributions: [
        { id: 'attr_standard_tax_slip', label: 'Standard Municipal Transit Receipt' },
        { id: 'attr_royal_chancery_grant', label: 'Royal Chancery Land Grant' },
        { id: 'attr_secret_monastery_order', label: 'Monastic Passage Certificate' }
      ]
    },
    {
      stimulus_id: 'Q2_T4',
      artifact_id: 'unknown_crest_impression_4',
      title: 'Relic 4: Embossed Paper Falcon Crest',
      description: 'A relief-embossed paper emblem showing a falcon perched above mountain peaks.',
      uncertainty_level: 'high',
      expected_value: 'moderate',
      clues: [
        { id: 'CLUE_FALCON_CREST', label: 'Embossed Heraldic Falcon Motif', detail: 'The falcon emblem was adopted by private paper ateliers along the Jhelum river.' },
        { id: 'CLUE_PAPER_WATERMARK', label: 'Chain Line & Watermark Inspection', detail: 'Contains fine wire watermark with the artisan initials M.K.' }
      ],
      attributions: [
        { id: 'attr_jhelum_paper_atelier', label: 'Jhelum River Private Paper Atelier' },
        { id: 'attr_foreign_consulate_letter', label: 'Foreign Consulate Diplomatic Stationery' },
        { id: 'attr_unknown_unresolved', label: 'Unresolved Provenance' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Antiquarian’s Bench', 'Investigating 4 uncataloged historical relics under varying uncertainty.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
            goal: 'Investigate physical clues on 4 historical relics to resolve provenance uncertainty.',
            steps: [
              'Examine each uncataloged relic and its initial description.',
              'Click clues to uncover material evidence at your discretion.',
              'Attribute the relic based on your investigation.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
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

    app.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 2: The Antiquarian’s Bench', 'Inspect material clues to resolve provenance uncertainty.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Relic ${currentTrial + 1} of ${relics.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${r.title}:</strong> ${r.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${r.stimulus_id}</span>
        </div>

        <!-- Clues Inspection Grid -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-xs">
          <div class="text-[10px] uppercase font-mono text-[var(--accent-gold)] font-semibold tracking-wider mb-2.5 flex items-center justify-between">
            <span>Material Clues Available for Physical Inspection</span>
            <span class="text-[9px] text-[var(--text-secondary)]">Click clue to examine</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            ${r.clues.map(c => `
              <div class="clue-btn p-3.5 bg-white border ${inspectedClues[c.id] ? 'border-[var(--accent-gold)] bg-amber-50/40 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs" data-clue="${c.id}" tabindex="0" role="button">
                <div class="font-medium text-[var(--text-primary)] flex items-center justify-between">
                  <span>${c.label}</span>
                  <span class="text-[9px] font-mono uppercase text-[var(--text-secondary)]">${inspectedClues[c.id] ? 'Inspected' : 'Inspect'}</span>
                </div>
                ${inspectedClues[c.id] ? `<p class="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--grid-border)] pt-2 animate-fadeIn">${c.detail}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Attribution Selection -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Conclude Archival Attribution:</div>
          <div class="space-y-2.5">
            ${r.attributions.map(attr => `
              <div class="q2-attr p-3.5 bg-white border ${selectedAttribution === attr.id ? 'border-[var(--accent-gold)] bg-amber-50/50 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-attr="${attr.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${selectedAttribution === attr.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedAttribution === attr.id ? '✓' : ''}</span>
                  <span class="text-[var(--text-primary)] font-medium">${attr.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${attr.id}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmQ2Btn" ${selectedAttribution ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${currentTrial < relics.length - 1 ? 'Finalize Investigation &rarr;' : 'Finish Antiquarian Bench &rarr;'}
          </button>
        </div>
      </div>
    `;

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
          observations_count: 4
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
  let inTutorial = true;
  let currentEpisode = 0;
  let contextRetrieved = false;
  let selectedIntegrationChoice = null;
  let lastInputModality = 'mouse';

  const episodes = [
    {
      stimulus_id: 'Q3_E1',
      title: 'Episode 1: The Master Calligrapher’s Folio',
      ambiguity_type: 'unattributed_artisan_folio',
      ambiguity_text: 'An illuminated folio features miniature gold dust borders with charcoal underdrawing. Two Master Calligraphers worked during this era.',
      context_id: 'provenance_context_1',
      context_title: 'Archival Registry Dossier #104 (Rainawari Atelier)',
      context_text: 'Archival records confirm Master Sadiq operated exclusively in the Rainawari workshop between 1870-1885 and pioneered willow-branch charcoal underdrawings with lapis border ruling.',
      decision_question: 'Based on your synthesis, attribute the folio’s master atelier and technique lineage:',
      choices: [
        { id: 'choice_sadiq_rainawari', label: 'Master Sadiq (Rainawari Atelier — willow-branch underdrawing)' },
        { id: 'choice_habib_court', label: 'Master Habib (Royal Court Palace — imported pencil underdrawing)' },
        { id: 'choice_generic_bazaar', label: 'Unspecified Old Srinagar Commercial Bazaar Production' }
      ]
    },
    {
      stimulus_id: 'Q3_E2',
      title: 'Episode 2: The Post-Flood Exhibition Pavilion',
      ambiguity_type: 'mismatched_period_provenance',
      ambiguity_text: 'A decorative ceiling panel displays carving motifs from both the late 19th and early 20th century reconstructions.',
      context_id: 'provenance_context_2',
      context_title: 'Municipal Public Works Ledger #88 (Dal Lake Pavilion)',
      context_text: 'Following the devastating 1902 autumn flood, the pavilion ceiling was rebuilt using seasoned Himalayan cedar, while the pre-flood structure used soft river pine.',
      decision_question: 'Integrate the structural timber provenance into your curatorial report:',
      choices: [
        { id: 'choice_post_flood_cedar', label: 'Post-1902 Flood Restoration (Himalayan seasoned cedar timber)' },
        { id: 'choice_pre_flood_pine', label: 'Original Pre-Flood Construction (Soft river pine timber)' },
        { id: 'choice_modern_concrete', label: 'Twentieth Century Composite Replica' }
      ]
    },
    {
      stimulus_id: 'Q3_E3',
      title: 'Episode 3: The Shrine Couplet\'s Refrain',
      ambiguity_type: 'regional_dialect_verse_origin',
      ambiguity_text: 'A woven silk pashmina textile bears an embroidered couplet with an archaic Kashmiri metric cadence.',
      context_id: 'provenance_context_3',
      context_title: 'Oral Verse Anthology Vol. IV (Lalla-Ded Shrines)',
      context_text: 'Couplets structured with the archaic 4-beat "Vakh" metric refrain originate specifically from the southern valley shrines (Pampore/Tral) rather than urban royal court poets.',
      decision_question: 'Select the verified cultural and geographic lineage for the exhibition catalog:',
      choices: [
        { id: 'choice_southern_vakh_shrine', label: 'Southern Valley Shrine Lineage (Archaic 4-beat Vakh cadence)' },
        { id: 'choice_urban_court_ghazal', label: 'Urban Courtly Scribe Tradition (Formal Persian rhyming meter)' },
        { id: 'choice_folk_bazaar_song', label: 'Nomadic Commercial Caravan Song' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader("Part 3: The Weaver's Chronicle", 'Resolving 3 ambiguous curatorial episodes through optional archival context integration.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
            goal: 'Synthesize archival knowledge: retrieve optional context dossiers and integrate the insights into downstream decisions.',
            steps: [
              'Read the historical ambiguity presented in each episode.',
              'Optionally retrieve the archival context dossier to uncover provenance facts.',
              'Integrate the facts into your final cataloging choice.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
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
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader("Part 3: The Weaver's Chronicle", 'Integrate archival context into catalog decisions.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Episode ${currentEpisode + 1} of ${episodes.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${ep.title}:</strong> ${ep.ambiguity_text}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${ep.stimulus_id}</span>
        </div>

        <!-- Optional Context Retrieval Area -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-xs">
          <div class="flex justify-between items-center mb-2">
            <span class="text-[10px] uppercase font-mono text-[var(--accent-gold)] font-semibold tracking-wider">Archival Context Dossier</span>
            ${!contextRetrieved ? `
              <button type="button" id="retrieveContextBtn" class="px-3.5 py-1.5 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] text-[10px] font-mono uppercase tracking-wider text-[var(--text-primary)] hover:bg-amber-50 transition rounded-xs shadow-xs" tabindex="0">
                Retrieve Context Dossier &rarr;
              </button>
            ` : '<span class="text-[10px] font-mono text-emerald-700 font-semibold uppercase">Dossier Retrieved</span>'}
          </div>

          ${contextRetrieved ? `
            <div class="p-4 bg-white border border-emerald-600/40 rounded-xs text-xs text-[var(--text-primary)] leading-relaxed animate-fadeIn">
              <div class="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">${ep.context_title}</div>
              <div>${ep.context_text}</div>
            </div>
          ` : `
            <div class="text-xs text-[var(--text-secondary)] italic">
              Archival context is available to clarify historical ambiguities before finalizing attribution.
            </div>
          `}
        </div>

        <!-- Downstream Integration Decision -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-2.5">${ep.decision_question}</div>
          <div class="space-y-2.5">
            ${ep.choices.map(c => `
              <div class="q3-choice p-3.5 bg-white border ${selectedIntegrationChoice === c.id ? 'border-[var(--accent-gold)] bg-amber-50/50 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-choice="${c.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${selectedIntegrationChoice === c.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedIntegrationChoice === c.id ? '✓' : ''}</span>
                  <span class="text-[var(--text-primary)] font-medium">${c.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${c.id}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmQ3Btn" ${selectedIntegrationChoice ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${currentEpisode < episodes.length - 1 ? 'Confirm Synthesis &rarr;' : 'Finish World 5 &rarr;'}
          </button>
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
      logEvent('decision_integrated', {
        trial_index: currentEpisode,
        stimulus_id: ep.stimulus_id,
        context_retrieved: contextRetrieved,
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
