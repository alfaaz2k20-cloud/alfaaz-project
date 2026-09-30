import re

with open('frontend/recruit.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add SJT View HTML
sjt_html = '''
        <!-- View SJT: The Sequence -->
        <div id="view-sjt" class="view">
            <div class="alfaaz-header">
                <h1 id="sjt-phase-title">CYCLE II</h1>
                <p id="sjt-phase-sub">Explicit Judgment</p>
            </div>
            <div id="sjt-container" style="max-width: 600px; margin: 0 auto; text-align: left;">
                <p id="sjt-scenario" style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem; color: var(--text-primary);"></p>
                <div id="sjt-options" style="display: flex; flex-direction: column; gap: 1rem;"></div>
            </div>
        </div>
        
        <!-- View 3: Final Form -->
'''
html = html.replace('<!-- View 3: Final Form -->', sjt_html)

# 2. Add SJT Logic
sjt_logic = '''
        const SJT_SCENARIOS = [
            {
                text: "It's the morning of 'Kaamil' — Alfaaz's exhibition. You arrive to help set up. The exhibition opens in 2 hours, but one artist's paintings haven't arrived. She's not answering her phone. The curator looks stressed.",
                options: [
                    { text: "Quietly take over other setup tasks to free up the curator's time, and keep trying to reach the artist yourself.", tags: [{tag: 'sjt_conscientiousness', strength: 1.0}] },
                    { text: "Suggest rearranging the existing works to fill the gap — the exhibition can still feel complete with a different layout.", tags: [{tag: 'sjt_creative', strength: 1.0}] },
                    { text: "Sit with the curator for a moment, ask how they're feeling, and then together figure out a plan.", tags: [{tag: 'sjt_empathy', strength: 1.0}] },
                    { text: "Start calling other Alfaaz members to see if anyone has backup artwork or can pick up the missing pieces.", tags: [{tag: 'sjt_collaborative', strength: 1.0}] }
                ]
            },
            {
                text: "An artist, Faizan, is upset — his pieces have been placed near the entrance where foot traffic is heaviest. He feels his work needs a quieter corner. Another artist, Meher, is happy with her quiet spot and doesn't want to swap.",
                options: [
                    { text: "Listen to Faizan fully, acknowledge his concern, then talk to Meher separately to understand her perspective.", tags: [{tag: 'sjt_empathy', strength: 1.0}, {tag: 'sjt_emotional', strength: 0.5}] },
                    { text: "Explain to Faizan that placement was decided by the curator and suggest he trust the process.", tags: [{tag: 'sjt_conscientiousness', strength: 1.0}] },
                    { text: "Propose a creative compromise — maybe Faizan's most contemplative piece goes to a quieter spot, while his bolder work stays at the entrance.", tags: [{tag: 'sjt_creative', strength: 1.0}] },
                    { text: "Let them work it out between themselves — it's not your place to intervene on your first day.", tags: [{tag: 'sjt_emotional', strength: 0.5}] }
                ]
            },
            {
                text: "Thirty minutes before the exhibition opens, a school teacher arrives with 15 students — unannounced. The space isn't set up for a school group.",
                options: [
                    { text: "Welcome them warmly, offer to give the students an informal walkthrough of the pieces that are ready.", tags: [{tag: 'sjt_empathy', strength: 1.0}] },
                    { text: "Politely ask them to come back in an hour when the exhibition officially opens.", tags: [{tag: 'sjt_conscientiousness', strength: 1.0}] },
                    { text: "Check with the curator first — it's their call, and you don't want to overstep.", tags: [{tag: 'sjt_collaborative', strength: 1.0}] },
                    { text: "Invite the students in but set up a temporary 'preview zone' with just a few pieces.", tags: [{tag: 'sjt_creative', strength: 1.0}, {tag: 'sjt_curiosity', strength: 0.5}] }
                ]
            },
            {
                text: "At the Philosophy Club, two members are passionately debating. You notice Zara — a new member — leaning forward as if she wants to speak, but keeps pulling back.",
                options: [
                    { text: "During a natural pause, gently say: 'Zara, I noticed you might have a thought — we'd love to hear it.'", tags: [{tag: 'sjt_collaborative', strength: 1.0}, {tag: 'sjt_empathy', strength: 0.5}] },
                    { text: "After the session, approach Zara privately and ask what she thought — offer to help her share next time.", tags: [{tag: 'sjt_emotional', strength: 1.0}] },
                    { text: "Suggest the group try a round-robin format so everyone gets a chance to speak.", tags: [{tag: 'sjt_creative', strength: 0.5}, {tag: 'sjt_collaborative', strength: 0.5}] },
                    { text: "Let it be — she'll speak up when she's comfortable; forcing it might make things worse.", tags: [{tag: 'sjt_emotional', strength: 0.5}] }
                ]
            },
            {
                text: "At a literature club evening, an audience member stands up and loudly says a poem being read isn't appropriate for a public event. The poet looks shaken.",
                options: [
                    { text: "Acknowledge the audience member's concern respectfully, then affirm that Alfaaz is a space for all voices.", tags: [{tag: 'sjt_emotional', strength: 1.0}] },
                    { text: "Step in to support the poet — thank them for their courage and remind the audience that art often lives in uncomfortable places.", tags: [{tag: 'sjt_empathy', strength: 1.0}] },
                    { text: "Propose a brief pause — then open it up as a facilitated conversation, turning the tension into dialogue.", tags: [{tag: 'sjt_creative', strength: 1.0}, {tag: 'sjt_collaborative', strength: 0.5}] },
                    { text: "Quietly check on the poet while someone else handles the audience — their emotional state is the priority.", tags: [{tag: 'sjt_empathy', strength: 1.0}] }
                ]
            }
        ];

        let currentSjtIndex = 0;

        function startSJT() {
            showView('view-sjt');
            currentSjtIndex = 0;
            renderSJT();
        }

        function renderSJT() {
            if (currentSjtIndex >= SJT_SCENARIOS.length) {
                showView('view-final');
                return;
            }

            const scenario = SJT_SCENARIOS[currentSjtIndex];
            document.getElementById('sjt-phase-title').textContent = CYCLE II - SCENARIO /;
            document.getElementById('sjt-scenario').textContent = scenario.text;
            
            const optionsContainer = document.getElementById('sjt-options');
            optionsContainer.innerHTML = '';
            
            scenario.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'form-control';
                btn.style.cursor = 'pointer';
                btn.style.textAlign = 'left';
                btn.style.padding = '1.2rem';
                btn.style.transition = 'all 0.2s';
                btn.textContent = opt.text;
                
                btn.onmouseover = () => { btn.style.borderColor = 'var(--accent-gold)'; };
                btn.onmouseout = () => { btn.style.borderColor = 'var(--grid-border)'; };
                
                btn.onclick = () => {
                    // Send event telemetry
                    sendEvent({
                        type: 'sjt',
                        action: 'sjt_answer',
                        context: { question: currentSjtIndex + 1, answerIndex: idx }
                    }, opt.tags);
                    
                    currentSjtIndex++;
                    renderSJT();
                };
                optionsContainer.appendChild(btn);
            });
        }

        // We need to modify sendEvent to accept optional override tags
'''

html = html.replace('// Identity form', sjt_logic + '\n        // Identity form')

# 3. Modify sendEvent signature
html = html.replace('async function sendEvent(eventData) {', 'async function sendEvent(eventData, explicitTags = null) {')

# 4. Modify tags resolution
tags_resolution = '''
            if (explicitTags) {
                tags.push(...explicitTags);
            } else if (eventData.type === 'interaction') {
'''
html = html.replace("if (eventData.type === 'interaction') {", tags_resolution)

# 5. Connect game end to SJT
html = html.replace("game.stop();\n                          showView('view-final');", "game.stop();\n                          startSJT();")

with open('frontend/recruit.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done!')
