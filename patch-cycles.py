import codecs
import re

with codecs.open('frontend/recruit.html', 'r', 'utf-8') as f:
    html = f.read()

# 1. Update the Intro Text
old_intro = '''We are looking for people who care about art, culture, and community. Before you fill a form, spend a few minutes with a small community we've built. There are no right or wrong ways to play — only yours.'''
new_intro = '''Traditional hiring relies on resumes and biased interviews. We take a different approach. Drawing on industry standards like <strong>Pymetrics</strong>, <strong>Arctic Shores</strong>, and <strong>Owiwi</strong>—which use gamified neuroscience to evaluate candidates for global organizations—we have engineered a custom 3-cycle hybrid assessment.
<br><br>
<strong>CYCLE I & II:</strong> The Community Simulation (Implicit Behavior)<br>
<strong>CYCLE III:</strong> Situational Judgment (Explicit Choice - No timers)
<br><br>
Spend a few minutes with a small community we've built. There are no right or wrong ways to play — only yours.'''
html = html.replace(old_intro, new_intro)

# 2. Inject the intermission screen
intermission_html = '''
        <!-- View Intermission -->
        <div id="view-intermission" class="view">
            <div class="alfaaz-header">
                <h1>CYCLE II</h1>
                <p>Fatigue Degradation</p>
            </div>
            <div style="text-align: center; max-width: 600px; margin: 0 auto; padding: 2rem;">
                <p style="color: var(--text-primary); margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.6;">
                    Your baseline is secured. We must now observe your response patterns under fatigue. 
                    The parameters remain identical. Will your instincts hold?
                </p>
                <button id="btn-start-cycle2" class="cta-btn">BEGIN CYCLE II</button>
            </div>
        </div>
'''
html = html.replace('<!-- View SJT: The Sequence -->', intermission_html + '\n        <!-- View SJT: The Sequence -->')

# 3. Update SJT text from Cycle II to Cycle III
html = html.replace('>CYCLE II<', '>CYCLE III<')
html = html.replace("'CYCLE II - SCENARIO '", "'CYCLE III - SCENARIO '")

# 4. Update the game instantiation logic
game_logic_old = '''const game = new CollectiveGame(canvas, {
                    onComplete: () => {
                        game.stop();
                        startSJT();
                    },
                    onEvent: (eventData) => {
                        sendEvent(eventData);
                    }
                });

                setTimeout(() => {
                    intro.classList.add('hidden');
                    setTimeout(() => {
                        intro.style.display = 'none';
                        game.start();
                    }, 1000);
                }, 2500);'''

game_logic_new = '''let currentCycle = 1;
                let game = null;

                function startGameCycle() {
                    showView('view-game');
                    document.getElementById('phase-indicator').textContent = 'CYCLE ' + currentCycle + ' - MORNING';
                    
                    game = new CollectiveGame(canvas, {
                        onComplete: () => {
                            game.stop();
                            if (currentCycle === 1) {
                                showView('view-intermission');
                            } else {
                                startSJT();
                            }
                        },
                        onEvent: (eventData) => {
                            eventData.context = eventData.context || {};
                            eventData.context.cycle = currentCycle;
                            sendEvent(eventData);
                        }
                    });

                    if (currentCycle === 1) {
                        const intro = document.getElementById('game-intro');
                        intro.style.display = 'flex';
                        intro.classList.remove('hidden');
                        setTimeout(() => {
                            intro.classList.add('hidden');
                            setTimeout(() => {
                                intro.style.display = 'none';
                                game.start();
                            }, 1000);
                        }, 2500);
                    } else {
                        // Cycle 2 starts immediately
                        document.getElementById('game-intro').style.display = 'none';
                        game.start();
                    }
                }

                document.getElementById('btn-start-cycle2').onclick = () => {
                    currentCycle = 2;
                    startGameCycle();
                };

                startGameCycle();'''
                
html = html.replace(game_logic_old, game_logic_new)

# 5. Fix HTML syntax for the span class urdu-text that might be broken
html = re.sub(r'<span class="urdu-text">.*?</span>', '<span class="urdu-text">الفاظ</span>', html)

with codecs.open('frontend/recruit.html', 'w', 'utf-8') as f:
    f.write(html)
