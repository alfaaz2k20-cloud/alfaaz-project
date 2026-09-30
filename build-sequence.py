import os
import codecs
import json
import re

# Read the uploaded HTML
with codecs.open('C:/Users/saqrt/.gemini/antigravity/brain/a10f453b-b8bf-47d4-ad9e-e0e6c678edf6/.user_uploaded/media_1790740159530.html', 'r', 'utf-8') as f:
    html = f.read()

# Add the 'Knowledge' intro to the start-screen
intro_html = '''
    <div id="start-screen" class="screen center active">
      <h2 class="urdu-title">The Sequence</h2>
      <h1>Applicant Screening Battery</h1>
      <p style="text-align: justify; font-size: 13px; margin-bottom: 20px;">
        Traditional hiring relies on resumes and biased interviews. We take a different approach. 
        Drawing on industry standards like <strong>Pymetrics</strong>, <strong>Arctic Shores</strong>, and <strong>Owiwi</strong>—which use gamified neuroscience to evaluate candidates for global organizations—we have engineered a custom hybrid assessment.
      </p>
      <p style="text-align: justify; font-size: 13px;">
        This sequence isolates your cognitive baseline, tests your reliability under fatigue, and evaluates your situational judgment. 
        <br><br><strong>CYCLE I & II:</strong> Neuroscience Micro-Games (Reaction, Restraint, Working Memory)<br>
        <strong>CYCLE III:</strong> Situational Judgment Scenarios (Generous time limit for non-native speakers)
      </p>
      <button class="primary" style="margin-top: 20px;" onclick="initiateFlow()">BEGIN CYCLE I</button>
    </div>
'''
html = re.sub(r'<div id=\"start-screen\".*?</div>', intro_html, html, flags=re.DOTALL)

# Add SJT Screen HTML
sjt_screen_html = '''
    <!-- CYCLE III: SJT -->
    <div id="sjt-intro-screen" class="screen center">
      <h2 class="urdu-title">Cycle II Complete</h2>
      <h1>Situational Judgment</h1>
      <p>Your cognitive baseline is secured. We now move to Cycle III: applied judgment within the Alfaaz environment.</p>
      <p>There are no timers here. Read each scenario carefully and choose the response that most naturally aligns with your instincts.</p>
      <button class="primary" onclick="beginSJT()">INITIATE CYCLE III</button>
    </div>

    <div id="sjt-play-screen" class="screen">
      <h2 class="urdu-title" id="sjt-title" style="font-size: 24px;">Scenario</h2>
      <h1 id="sjt-progress">CYCLE III</h1>
      <p id="sjt-text" style="font-size: 16px; color: #fafafa; margin-bottom: 40px; line-height: 1.6;"></p>
      <div id="sjt-options" style="display: flex; flex-direction: column; gap: 15px;"></div>
    </div>
'''
html = html.replace('<!-- WRITING PHASE -->', sjt_screen_html + '\n    <!-- WRITING PHASE -->')

# Inject SJT Logic
sjt_logic = '''
  const SJT_SCENARIOS = [
      {
          text: "It's the morning of 'Kaamil' — Alfaaz's exhibition. You arrive to help set up. The exhibition opens in 2 hours, but one artist's paintings haven't arrived. She's not answering her phone. The curator looks stressed.",
          options: [
              { text: "Quietly take over other setup tasks to free up the curator's time, and keep trying to reach the artist yourself.", tags: ['conscientiousness'] },
              { text: "Suggest rearranging the existing works to fill the gap — the exhibition can still feel complete with a different layout.", tags: ['creative'] },
              { text: "Sit with the curator for a moment, ask how they're feeling, and then together figure out a plan.", tags: ['empathy'] },
              { text: "Start calling other Alfaaz members to see if anyone has backup artwork or can pick up the missing pieces.", tags: ['collaborative'] }
          ]
      },
      {
          text: "An artist, Faizan, is upset — his pieces have been placed near the entrance where foot traffic is heaviest. He feels his work needs a quieter corner. Another artist, Meher, is happy with her quiet spot and doesn't want to swap.",
          options: [
              { text: "Listen to Faizan fully, acknowledge his concern, then talk to Meher separately to understand her perspective.", tags: ['empathy', 'emotional'] },
              { text: "Explain to Faizan that placement was decided by the curator and suggest he trust the process.", tags: ['conscientiousness'] },
              { text: "Propose a creative compromise — maybe Faizan's most contemplative piece goes to a quieter spot, while his bolder work stays at the entrance.", tags: ['creative'] },
              { text: "Let them work it out between themselves — it's not your place to intervene on your first day.", tags: ['emotional'] }
          ]
      },
      {
          text: "Thirty minutes before the exhibition opens, a school teacher arrives with 15 students — unannounced. The space isn't set up for a school group.",
          options: [
              { text: "Welcome them warmly, offer to give the students an informal walkthrough of the pieces that are ready.", tags: ['empathy'] },
              { text: "Politely ask them to come back in an hour when the exhibition officially opens.", tags: ['conscientiousness'] },
              { text: "Check with the curator first — it's their call, and you don't want to overstep.", tags: ['collaborative'] },
              { text: "Invite the students in but set up a temporary 'preview zone' with just a few pieces.", tags: ['creative', 'curiosity'] }
          ]
      },
      {
          text: "At the Philosophy Club, two members are passionately debating. You notice Zara — a new member — leaning forward as if she wants to speak, but keeps pulling back.",
          options: [
              { text: "During a natural pause, gently say: 'Zara, I noticed you might have a thought — we'd love to hear it.'", tags: ['collaborative', 'empathy'] },
              { text: "After the session, approach Zara privately and ask what she thought — offer to help her share next time.", tags: ['emotional'] },
              { text: "Suggest the group try a round-robin format so everyone gets a chance to speak.", tags: ['creative', 'collaborative'] },
              { text: "Let it be — she'll speak up when she's comfortable; forcing it might make things worse.", tags: ['emotional'] }
          ]
      },
      {
          text: "At a literature club evening, an audience member stands up and loudly says a poem being read isn't appropriate for a public event. The poet looks shaken.",
          options: [
              { text: "Acknowledge the audience member's concern respectfully, then affirm that Alfaaz is a space for all voices.", tags: ['emotional'] },
              { text: "Step in to support the poet — thank them for their courage and remind the audience that art often lives in uncomfortable places.", tags: ['empathy'] },
              { text: "Propose a brief pause — then open it up as a facilitated conversation, turning the tension into dialogue.", tags: ['creative', 'collaborative'] },
              { text: "Quietly check on the poet while someone else handles the audience — their emotional state is the priority.", tags: ['empathy'] }
          ]
      }
  ];

  let currentSjtIndex = 0;
  let sjtResponses = [];

  function beginSJT() {
      currentSjtIndex = 0;
      sjtResponses = [];
      renderSJTScenario();
  }

  function renderSJTScenario() {
      if (currentSjtIndex >= SJT_SCENARIOS.length) {
          initiateWritingPhase();
          return;
      }
      
      showScreen('sjt-play-screen');
      const scenario = SJT_SCENARIOS[currentSjtIndex];
      document.getElementById('sjt-progress').textContent = 'CYCLE III - SCENARIO ' + (currentSjtIndex + 1) + '/' + SJT_SCENARIOS.length;
      document.getElementById('sjt-text').textContent = scenario.text;
      
      const opts = document.getElementById('sjt-options');
      opts.innerHTML = '';
      
      scenario.options.forEach((opt, idx) => {
          const btn = document.createElement('button');
          btn.style.padding = '16px 20px';
          btn.style.background = 'transparent';
          btn.style.border = '1px solid #333';
          btn.style.color = '#ccc';
          btn.style.textAlign = 'left';
          btn.style.fontFamily = 'Helvetica Neue, sans-serif';
          btn.style.fontSize = '14px';
          btn.style.cursor = 'pointer';
          btn.style.transition = 'all 0.2s';
          btn.textContent = opt.text;
          
          btn.onmouseover = () => { btn.style.background = '#1a1a1a'; btn.style.borderColor = '#fafafa'; btn.style.color = '#fafafa'; };
          btn.onmouseout = () => { btn.style.background = 'transparent'; btn.style.borderColor = '#333'; btn.style.color = '#ccc'; };
          
          btn.onclick = () => {
              sjtResponses.push({ question: currentSjtIndex + 1, answer: idx, tags: opt.tags });
              currentSjtIndex++;
              renderSJTScenario();
          };
          opts.appendChild(btn);
      });
  }
'''
html = html.replace('function beginRetest() { testPhase = 2; initiateFlow(); }', 'function beginRetest() { testPhase = 2; initiateFlow(); }\n\n' + sjt_logic)

html = html.replace('''    if (currentTaskIdx >= TASKS.length) {
      if (testPhase === 1) {
        showScreen('retest-screen'); document.getElementById('hud').textContent = '';
      } else {
        initiateWritingPhase();
      }
    } else {''', '''    if (currentTaskIdx >= TASKS.length) {
      if (testPhase === 1) {
        showScreen('retest-screen'); document.getElementById('hud').textContent = '';
      } else if (testPhase === 2) {
        showScreen('sjt-intro-screen'); document.getElementById('hud').textContent = '';
      }
    } else {''')

html = re.sub(r'const payload = \{.*?writtenProposal: document.getElementById\(\'app-input\'\).value.trim\(\)\s*\};', 
'''const payload = {
      sessionId: SESSION_ID,
      motorBaselineMs,
      isReliable,
      isQualified,
      metricsC1: c1,
      metricsC2: c2,
      sjtResponses,
      writtenProposal: document.getElementById('app-input').value.trim()
    };''', html, flags=re.DOTALL)

with codecs.open('frontend/sequence.html', 'w', 'utf-8') as f:
    f.write(html)
