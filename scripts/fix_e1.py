import re

filepath = "frontend/src/recruit_games/the_shifting_grid.js"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to add state variable selectedChoice
old_state = """  let currentIdx = 0;
  let trialStartTime = 0;
  let lastInputModality = 'mouse';"""

new_state = """  let currentIdx = 0;
  let trialStartTime = 0;
  let lastInputModality = 'mouse';
  let selectedChoice = null;"""

content = content.replace(old_state, new_state)

# Replace interactionContent
old_interaction = """      interactionContent: `
        <div class="grid grid-cols-2 gap-4">
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)]  interactive-option text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_1" tabindex="0">
            <span class="text-2xl text-[var(--accent-gold)] block mb-1">&#9679;</span>
            <span class="text-base font-semibold text-[var(--text-primary)] block">Container 1</span>
            <span class="text-sm text-[var(--text-secondary)] block mt-0.5 font-sans">Reference: Gold Circle</span>
          </button>
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)]  interactive-option text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_2" tabindex="0">
            <span class="text-2xl text-emerald-800 block mb-1">&#9632;</span>
            <span class="text-base font-semibold text-[var(--text-primary)] block">Container 2</span>
            <span class="text-sm text-[var(--text-secondary)] block mt-0.5 font-sans">Reference: Sage Square</span>
          </button>
        </div>
      `,"""

new_interaction = """      interactionContent: `
        <div class="grid grid-cols-2 gap-4">
          <button type="button" class="bin-btn p-5 bg-white border ${selectedChoice === 'container_1' ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40' : 'border-[var(--grid-border)]'} text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_1" tabindex="0">
            <span class="text-2xl text-[var(--accent-gold)] block mb-1">&#9679;</span>
            <span class="text-base font-semibold text-[var(--text-primary)] block">Container 1</span>
            <span class="text-sm text-[var(--text-secondary)] block mt-0.5 font-sans">Reference: Gold Circle</span>
          </button>
          <button type="button" class="bin-btn p-5 bg-white border ${selectedChoice === 'container_2' ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40' : 'border-[var(--grid-border)]'} text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_2" tabindex="0">
            <span class="text-2xl text-emerald-800 block mb-1">&#9632;</span>
            <span class="text-base font-semibold text-[var(--text-primary)] block">Container 2</span>
            <span class="text-sm text-[var(--text-secondary)] block mt-0.5 font-sans">Reference: Sage Square</span>
          </button>
        </div>
      `,
      summaryContent: `
        <span>${selectedChoice ? `You selected: <strong class="text-[var(--text-primary)]">${selectedChoice === 'container_1' ? 'Container 1' : 'Container 2'}</strong>` : 'Choose the option to continue.'}</span>
        <span class="text-sm text-stone-400 font-sans">${currentIdx + 1} / ${trials.length}</span>
      `,
      actionButtonId: 'confirmE1Btn',
      actionButtonText: currentIdx < trials.length - 1 ? 'Confirm Choice &rarr;' : 'Confirm & Finish &rarr;',
      actionButtonDisabled: !selectedChoice,"""

content = content.replace(old_interaction, new_interaction)

# Update event listener logic
old_listeners = """    app.querySelectorAll('.bin-btn').forEach(btn => {
      const handleSort = (modality) => {
        lastInputModality = modality;
        const choice = btn.getAttribute('data-choice');
        logEvent('tile_sorted', {
          trial_index: currentIdx,
          stimulus_id: t.stimulus_id,
          choice: choice,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        if (currentIdx < trials.length - 1) {
          currentIdx++;
          trialStartTime = performance.now();
          logTrialPresented();
          render();
        } else {
          onComplete({
            mini_game: 'E1',
            observations_count: 9
          });
        }
      };

      btn.addEventListener('click', () => handleSort('mouse'));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSort('keyboard');
        }
      });
    });"""

new_listeners = """    app.querySelectorAll('.bin-btn').forEach(btn => {
      const handleSort = (modality) => {
        lastInputModality = modality;
        selectedChoice = btn.getAttribute('data-choice');
        render();
      };
      btn.addEventListener('click', () => handleSort('mouse'));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSort('keyboard');
        }
      });
    });

    document.getElementById('confirmE1Btn')?.addEventListener('click', () => {
      logEvent('tile_sorted', {
        trial_index: currentIdx,
        stimulus_id: t.stimulus_id,
        choice: selectedChoice,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      if (currentIdx < trials.length - 1) {
        currentIdx++;
        selectedChoice = null;
        trialStartTime = performance.now();
        logTrialPresented();
        render();
      } else {
        onComplete({
          mini_game: 'E1',
          observations_count: trials.length
        });
      }
    });"""

content = content.replace(old_listeners, new_listeners)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
