import re

with open('frontend/src/recruit.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Define the new SJT option selection logic
sjt_logic = '''
 let sjtKeydownHandler = null;

 function selectSjtOption(scenario, optId, inputType) {
    if (state.sjtResponses[scenario.id] === optId) return;
    
    state.sjtResponses[scenario.id] = optId;
    logEvent('sjt', inputType === 'keyboard' ? 'option_selected_key' : 'option_selected', { scenario_id: scenario.id, option_id: optId });

    // Update DOM classes and aria attributes instead of full render
    const cards = document.querySelectorAll('.option-card');
    cards.forEach(c => {
        if (c.getAttribute('data-opt-id') === optId) {
            c.classList.add('selected');
            c.setAttribute('aria-pressed', 'true');
            c.focus();
        } else {
            c.classList.remove('selected');
            c.setAttribute('aria-pressed', 'false');
        }
    });

    const nextBtn = document.getElementById('nextSjtBtn');
    if (nextBtn) nextBtn.disabled = false;
    saveLocalState();
 }

 function renderSJT(app, progressBarFill) {
'''

code = code.replace("function renderSJT(app, progressBarFill) {", sjt_logic)

# Replace the internal handlers
sjt_handlers_regex = re.compile(
    r"// Option selection handlers.*?window\.onkeydown = keyHandler;",
    re.DOTALL
)

new_handlers = '''// Option selection handlers
   app.querySelectorAll('.option-card').forEach(card => {
     card.addEventListener('click', () => {
       const optId = card.getAttribute('data-opt-id');
       selectSjtOption(scenario, optId, 'pointer');
     });
   });

   document.getElementById('nextSjtBtn')?.addEventListener('click', () => {
     if (state.sjtResponses[scenario.id]) {
       state.currentSjtIndex++;
       if (sjtKeydownHandler) {
         document.removeEventListener('keydown', sjtKeydownHandler);
         sjtKeydownHandler = null;
       }
       renderSJT(app, progressBarFill);
     }
   });

   if (sjtKeydownHandler) {
     document.removeEventListener('keydown', sjtKeydownHandler);
   }
   sjtKeydownHandler = (e) => {
     if (['1', '2', '3', '4'].includes(e.key)) {
       const idx = parseInt(e.key) - 1;
       if (scenario.options[idx]) {
         selectSjtOption(scenario, scenario.options[idx].id, 'keyboard');
       }
     }
   };
   document.addEventListener('keydown', sjtKeydownHandler);'''

code = sjt_handlers_regex.sub(new_handlers, code)

# Fix window.onkeydown = null inside submitSjtAndProceed
code = code.replace("window.onkeydown = null;", "if (sjtKeydownHandler) { document.removeEventListener('keydown', sjtKeydownHandler); sjtKeydownHandler = null; }")


# Add aria-pressed to the option cards in the HTML template inside renderSJT
option_card_regex = re.compile(
    r'<div class="option-card min-h-\[48px\] \$\{selectedOptId === opt\.id \? \'selected\' : \'\'\}" data-opt-id="\$\{opt\.id\}" \s*tabindex="0" role="button" aria-label="Option \$\{opt\.id\.slice\(-1\)\}">',
    re.MULTILINE
)
new_option_card = '<div class="option-card min-h-[48px] ${selectedOptId === opt.id ? \'selected\' : \'\'}" data-opt-id="${opt.id}" tabindex="0" role="button" aria-pressed="${selectedOptId === opt.id ? \'true\' : \'false\'}" aria-label="Option ${opt.id.slice(-1)}">'

code = option_card_regex.sub(new_option_card, code)


with open('frontend/src/recruit.js', 'w', encoding='utf-8') as f:
    f.write(code)
