import"./global-DxYxv3W5.js";/* empty css               */function A(r,i){const{appContainer:t,miniGameIndex:d,logEvent:e,onMiniGameComplete:a}=r;switch(d){case 0:$(t,i,e,a);break;case 1:B(t,i,e,a);break;case 2:j(t,i,e,a);break}}function $(r,i,t,d){const e=[{id:"ITEM-1",title:"Handwritten Ghazal Manuscript (1842)",tags:["Poetry","Parchment","Ink"],targetCategory:"Books & Poetry"},{id:"ITEM-2",title:"Carved Wooden Printing Block",tags:["Object","Craft Tool","Walnut Wood"],targetCategory:"Art Objects"},{id:"ITEM-3",title:"Lal Ded Verse Translations",tags:["Poetry Book","Kashmiri","Paper"],targetCategory:"Books & Poetry"},{id:"ITEM-4",title:"Silver Thread Embroidery Sample",tags:["Fabric","Silk & Metal","Decorative"],targetCategory:"Art Objects"},{id:"ITEM-5",title:"1924 Exhibition Visitor Guestbook",tags:["Official Record","Signatures","Archive"],targetCategory:"Letters & Records"},{id:"ITEM-6",title:"Letter from Founder on Art Care",tags:["Letter","Preservation Guide","Archive"],targetCategory:"Letters & Records"}];let a=0,n=0,s=!1;function o(){var m;if(a>=e.length){const v=n/e.length;d({mini_game:"A1",observations_count:e.length,accuracy:v,guide_opened:s});return}const l=e[a];r.innerHTML=`
      <div>
        ${i("Task 1: Archiving Items","Place each historical item into the correct shelf.")}

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium">Item ${a+1} of ${e.length}</span>
          <button id="guideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1 hover:bg-amber-50 transition">
            &#128214; Shelf Guide
          </button>
        </div>

        <div id="guideModal" class="hidden p-4 mb-4 bg-amber-50/70 border border-[var(--accent-gold)]/30 text-xs text-[var(--text-primary)] space-y-1">
          <div>• <strong>1. Books & Poetry:</strong> Handwritten manuscripts, poetry books, written verse folios.</div>
          <div>• <strong>2. Art Objects:</strong> Wooden blocks, textile fragments, carved crafts, copper tools.</div>
          <div>• <strong>3. Letters & Records:</strong> Guestbooks, official letters, event rosters, receipts.</div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-sm">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase font-mono">${l.id}</span>
          <h3 class="text-lg font-serif text-[var(--text-primary)] font-medium mt-1 mb-3">${l.title}</h3>
          <div class="flex justify-center gap-2">
            ${l.tags.map(v=>`<span class="px-2.5 py-0.5 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)]">${v}</span>`).join("")}
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center" data-cat="Books & Poetry">
            1. Books & Poetry
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center" data-cat="Art Objects">
            2. Art Objects
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center" data-cat="Letters & Records">
            3. Letters & Records
          </button>
        </div>
      </div>
    `,t("item_presented",{doc_id:l.id,index:a}),(m=document.getElementById("guideBtn"))==null||m.addEventListener("click",()=>{const v=document.getElementById("guideModal");v==null||v.classList.toggle("hidden"),s=!0,t("guide_viewed",{doc_id:l.id})}),r.querySelectorAll(".cat-btn").forEach(v=>{v.addEventListener("click",()=>{const b=v.getAttribute("data-cat"),p=b===l.targetCategory;p&&n++,t("item_sorted",{doc_id:l.id,choice:b,is_correct:p}),a++,o()})})}o()}function B(r,i,t,d){let e=null;r.innerHTML=`
    <div>
      ${i("Task 2: Damaged Item Care","An old poem folio has faint water spots and the year stamp is partly blurred. How would you record it?")}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <span class="text-[10px] tracking-widest text-[#bd6f5d] uppercase font-semibold">Special Inspection</span>
        <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-2">19th Century Kashmiri Ghazal Leaf</h3>
        <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
          Condition: Light water fading on the lower corner. Year is smudged as "18--".
        </p>
      </div>

      <div class="space-y-3 mb-6">
        <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-action="FLAG_CARE">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Place in protective envelope and mark: "Year Estimated, Needs Conservator Review"</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Protects the item and alerts senior archivists to examine with magnifying tools.</div>
        </div>

        <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-action="ESTIMATE">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Record as "Circa 1850" based on similar handwriting styles</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Assigns a working estimate so it can be cataloged quickly.</div>
        </div>

        <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-action="HOLD">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Set aside in the pending box until the original donor is contacted</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Waits for complete confirmation before adding to the collection.</div>
        </div>
      </div>

      <div class="flex justify-end">
        <button id="a2ConfirmBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Confirm Action &rarr;
        </button>
      </div>
    </div>
  `;const a=document.getElementById("a2ConfirmBtn");r.querySelectorAll(".a2-opt").forEach(n=>{n.addEventListener("click",()=>{r.querySelectorAll(".a2-opt").forEach(s=>s.classList.remove("border-[var(--accent-gold)]","bg-amber-50/30")),n.classList.add("border-[var(--accent-gold)]","bg-amber-50/30"),e=n.getAttribute("data-action"),a&&(a.disabled=!1)})}),a==null||a.addEventListener("click",()=>{t("exception_resolved",{action:e}),d({mini_game:"A2",observations_count:1,chosen_action:e})})}function j(r,i,t,d){var a;const e=[{id:"Q1",text:"Poet: Habba Khatoon | Era: 16th Century | Language: Kashmiri",hasError:!1},{id:"Q2",text:"Artwork: Walnut Wood Plaque | Weight: 450 Kilograms (Expected: 450 Grams)",hasError:!0},{id:"Q3",text:"Notice Date: February 31st, 2026 | Location: Hall A",hasError:!0}];r.innerHTML=`
    <div>
      ${i("Task 3: Catalog Proofreading","Check the cards below before printing. Select any card that contains an error.")}

      <div class="space-y-4 mb-6">
        ${e.map((n,s)=>`
          <label class="flex items-start gap-3 p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition">
            <input type="checkbox" id="check_${n.id}" class="mt-1 accent-[#bd6f5d]">
            <div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">Label Card ${s+1}</div>
              <div class="text-xs text-[var(--text-secondary)] font-mono mt-1">${n.text}</div>
            </div>
          </label>
        `).join("")}
      </div>

      <div class="flex justify-end">
        <button id="a3SubmitBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Approve & Finish &rarr;
        </button>
      </div>
    </div>
  `,(a=document.getElementById("a3SubmitBtn"))==null||a.addEventListener("click",()=>{let n=0;e.forEach(o=>{var m;(((m=document.getElementById(`check_${o.id}`))==null?void 0:m.checked)||!1)===o.hasError&&n++});const s=n/e.length;t("quality_check_completed",{accuracy:s}),d({mini_game:"A3",observations_count:e.length,accuracy:s})})}function M(r,i){const{appContainer:t,miniGameIndex:d,logEvent:e,onMiniGameComplete:a}=r;switch(d){case 0:P(t,i,e,a);break;case 1:W(t,i,e,a);break;case 2:R(t,i,e,a);break}}function P(r,i,t,d){var T;let e=50,a=performance.now(),n=null,s=null;r.innerHTML=`
    <div>
      ${i("Task 1: Sound Tuning","Listen to your teammate and adjust the dial until the sound feels warm and comfortable.")}

      <!-- Partner Dialogue Bubble -->
      <div class="p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold">T</div>
        <div>
          <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Teammate Note</div>
          <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium">"The sound feels a bit sharp on the high notes. Could we soften it?"</div>
        </div>
      </div>

      <!-- Interactive Animated Waveform Canvas -->
      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <canvas id="waveCanvas" width="600" height="90" class="w-full h-20 bg-white border border-[var(--grid-border)] mb-4"></canvas>

        <div class="w-full max-w-md mx-auto">
          <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
            <span>Softer / Warm (0)</span>
            <span class="font-mono text-sm font-semibold text-[var(--text-primary)]" id="sliderValDisplay">50</span>
            <span>Brighter / Sharp (100)</span>
          </div>
          <input type="range" id="freqSlider" min="0" max="100" value="50" class="w-full accent-[#bd6f5d] cursor-pointer">
        </div>

        <div id="toneFeedback" class="text-xs text-[var(--text-secondary)] mt-3">
          Move the slider left to soften the sound.
        </div>
      </div>

      <div class="flex justify-end">
        <button id="lockFreqBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Set Sound &rarr;
        </button>
      </div>
    </div>
  `;const o=document.getElementById("waveCanvas"),l=o==null?void 0:o.getContext("2d"),m=document.getElementById("freqSlider"),v=document.getElementById("sliderValDisplay"),b=document.getElementById("toneFeedback");let p=0;function S(){if(!l||!o)return;l.clearRect(0,0,o.width,o.height),l.strokeStyle="#bd6f5d",l.lineWidth=2,l.beginPath();const f=.02+e/100*.06,w=15+Math.abs(e-35)/50*15;for(let h=0;h<o.width;h++){const C=o.height/2+Math.sin(h*f+p)*w;h===0?l.moveTo(h,C):l.lineTo(h,C)}l.stroke(),p+=.04,s=requestAnimationFrame(S)}S(),m==null||m.addEventListener("input",f=>{e=parseInt(f.target.value),v&&(v.textContent=e),n||(n=performance.now()),b&&(Math.abs(e-35)<=10?b.innerHTML='<span class="text-emerald-700 font-semibold">&#10003; Warm and balanced tone reached.</span>':e>35?b.textContent="Tone is still slightly sharp.":b.textContent="Tone is very muted."),t("slider_input",{value:e})}),(T=document.getElementById("lockFreqBtn"))==null||T.addEventListener("click",()=>{s&&cancelAnimationFrame(s);const f=n?n-a:2e3,w=Math.max(0,1-Math.abs(e-35)/50);t("tuning_locked",{final_value:e,latency_ms:f,accuracy:w}),d({mini_game:"F1",observations_count:1,latency_ms:f,accuracy:w})})}function W(r,i,t,d){let e=null;const a=[{id:"F2_ASK",title:"Clarify with Kindness",desc:'Ask: "Would you like the voice to sound a bit warmer or softer?"',detail:"Checks what the teammate is sensing before making changes."},{id:"F2_TEST",title:"Gentle Test Adjustment",desc:"Lower the bass slightly and ask if that feels more balanced.",detail:"Tries a small, careful change to see if it solves the issue."},{id:"F2_HOLD",title:"Test with the Room",desc:"Keep current level and invite the audience to give feedback.",detail:"Gathers feedback from listeners in the hall."}];r.innerHTML=`
    <div>
      ${i("Task 2: Unclear Feedback","Your teammate says something feels off, but is not sure what. Choose how to respond.")}

      <div class="p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold">T</div>
        <div>
          <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Teammate</div>
          <div class="text-xs text-[var(--text-primary)] font-medium">"Something feels a bit off with the sound, but I cannot quite tell what."</div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${a.map(s=>`
          <div class="f2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2" data-opt="${s.id}">
            <div class="text-xs font-semibold text-[var(--text-primary)]">${s.title}</div>
            <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${s.desc}</div>
            <div class="text-[10px] text-[var(--accent-gold)] pt-1 border-t border-[var(--grid-border)]">${s.detail}</div>
          </div>
        `).join("")}
      </div>

      <div class="flex justify-end">
        <button id="f2ConfirmBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Confirm Response &rarr;
        </button>
      </div>
    </div>
  `;const n=document.getElementById("f2ConfirmBtn");r.querySelectorAll(".f2-card").forEach(s=>{s.addEventListener("click",()=>{r.querySelectorAll(".f2-card").forEach(o=>o.classList.remove("border-[var(--accent-gold)]","bg-amber-50/30")),s.classList.add("border-[var(--accent-gold)]","bg-amber-50/30"),e=s.getAttribute("data-opt"),n&&(n.disabled=!1),t("dialogue_option_selected",{option:e})})}),n==null||n.addEventListener("click",()=>{t("ambiguity_resolved",{choice:e}),d({mini_game:"F2",observations_count:1,selected_option:e})})}function R(r,i,t,d){var o;let e=50;r.innerHTML=`
    <div>
      ${i("Task 3: Room Adaptation","The event moved into a large stone hall. Adjust the echo level for clear spoken poetry.")}

      <div class="p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold">T</div>
        <div>
          <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Venue Update</div>
          <div class="text-xs text-[var(--text-primary)] font-medium">"The large stone hall causes an echo. Please lower the echo to around 25%."</div>
        </div>
      </div>

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <div class="w-full max-w-md mx-auto">
          <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
            <span>Direct Clarity (0%)</span>
            <span class="font-mono text-sm font-semibold text-[var(--text-primary)]" id="hallValDisplay">50%</span>
            <span>Deep Echo (100%)</span>
          </div>
          <input type="range" id="hallSlider" min="0" max="100" value="50" class="w-full accent-[#bd6f5d] cursor-pointer">
        </div>

        <div id="hallFeedback" class="text-xs text-[var(--text-secondary)] mt-4">
          Adjust the slider until voice clarity is optimal.
        </div>
      </div>

      <div class="flex justify-end">
        <button id="f3LockBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Complete Task &rarr;
        </button>
      </div>
    </div>
  `;const a=document.getElementById("hallSlider"),n=document.getElementById("hallValDisplay"),s=document.getElementById("hallFeedback");a==null||a.addEventListener("input",l=>{e=parseInt(l.target.value),n&&(n.textContent=`${e}%`),s&&(Math.abs(e-25)<=8?s.innerHTML='<span class="text-emerald-700 font-semibold">&#10003; Clear spoken poetry acoustics achieved.</span>':s.textContent=`Echo level at ${e}%.`),t("hall_slider_input",{value:e})}),(o=document.getElementById("f3LockBtn"))==null||o.addEventListener("click",()=>{const l=Math.max(0,1-Math.abs(e-25)/50);t("hall_tuning_locked",{final_value:e,accuracy:l}),d({mini_game:"F3",observations_count:1,accuracy:l})})}function G(r,i){const{appContainer:t,miniGameIndex:d,logEvent:e,onMiniGameComplete:a}=r;switch(d){case 0:q(t,i,e,a);break;case 1:F(t,i,e,a);break;case 2:O(t,i,e,a);break}}function q(r,i,t,d){let e=3;function a(){var n,s,o;r.innerHTML=`
      <div>
        ${i("Task 1: Sharing Art Materials","You and your teammate are setting up a mosaic wall. Your teammate has 2 tiles. You have 8 tiles.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-3 bg-white border border-[var(--grid-border)]">
              <span class="text-[10px] text-[var(--text-secondary)] uppercase">Teammate Box</span>
              <div class="text-base font-serif font-semibold text-[#bd6f5d] mt-1">${2+e} Tiles</div>
              <div class="flex justify-center gap-1 mt-2">
                ${Array(2+e).fill('<div class="w-3 h-3 bg-[#bd6f5d]/60 rounded-xs"></div>').join("")}
              </div>
            </div>
            <div class="p-3 bg-white border border-[var(--grid-border)]">
              <span class="text-[10px] text-[var(--text-secondary)] uppercase">Your Box</span>
              <div class="text-base font-serif font-semibold text-emerald-800 mt-1">${8-e} Tiles</div>
              <div class="flex justify-center gap-1 mt-2">
                ${Array(8-e).fill('<div class="w-3 h-3 bg-emerald-700/60 rounded-xs"></div>').join("")}
              </div>
            </div>
          </div>

          <div class="text-center">
            <div class="text-xs text-[var(--text-secondary)] mb-2">Tiles to share with your teammate:</div>
            <div class="flex justify-center items-center gap-4">
              <button id="minusTileBtn" class="w-9 h-9 rounded bg-white border border-[var(--grid-border)] text-base font-bold hover:bg-amber-50">-</button>
              <span id="transferCount" class="font-serif text-2xl font-semibold text-[var(--accent-gold)] w-8">${e}</span>
              <button id="plusTileBtn" class="w-9 h-9 rounded bg-white border border-[var(--grid-border)] text-base font-bold hover:bg-amber-50">+</button>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmTransferBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Confirm Sharing &rarr;
          </button>
        </div>
      </div>
    `,(n=document.getElementById("minusTileBtn"))==null||n.addEventListener("click",()=>{e>0&&(e--,a())}),(s=document.getElementById("plusTileBtn"))==null||s.addEventListener("click",()=>{e<6&&(e++,a())}),(o=document.getElementById("confirmTransferBtn"))==null||o.addEventListener("click",()=>{t("resource_transfer_confirmed",{shared_amount:e}),d({mini_game:"C1",observations_count:1,sharing_index:e/6})})}a()}function F(r,i,t,d){let e=null;const a=[{id:"SLOT_TOP",label:"Top Center"},{id:"SLOT_RIGHT",label:"Right Side (Balanced)"},{id:"SLOT_BOTTOM",label:"Lower Right"}];function n(){var s;r.innerHTML=`
      <div>
        ${i("Task 2: Wall Coordination","Your teammate hung their painting on the left. Click a spot on the wall to place your piece.")}

        <!-- Interactive Gallery Wall Preview -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6">
          <div class="w-full h-48 bg-white border border-[var(--grid-border)] relative flex items-center justify-between p-6">
            <!-- Teammate Painting -->
            <div class="w-28 h-32 bg-amber-100 border-2 border-[var(--accent-gold)] flex flex-col items-center justify-center p-2 text-center shadow-sm">
              <span class="text-[10px] uppercase font-bold text-[var(--accent-gold)]">Teammate Art</span>
              <span class="text-[9px] text-[var(--text-secondary)] mt-1">"Autumn Leaf"</span>
            </div>

            <!-- Wall Slot Buttons -->
            <div class="flex flex-col gap-2">
              ${a.map(o=>`
                <button class="slot-btn px-4 py-2 text-xs border ${e===o.id?"border-[var(--accent-gold)] bg-amber-50 font-semibold":"border-dashed border-[var(--grid-border)] bg-transparent hover:border-solid hover:border-[var(--text-primary)]"} transition" data-slot="${o.id}">
                  ${e===o.id?"&#10003; Your Art Placed Here":`+ Hang at ${o.label}`}
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmWallBtn" ${e?"":"disabled"} class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
            Confirm Placement &rarr;
          </button>
        </div>
      </div>
    `,r.querySelectorAll(".slot-btn").forEach(o=>{o.addEventListener("click",()=>{e=o.getAttribute("data-slot"),t("wall_slot_selected",{slot:e}),n()})}),(s=document.getElementById("confirmWallBtn"))==null||s.addEventListener("click",()=>{t("wall_coordination_complete",{chosen_slot:e}),d({mini_game:"C2",observations_count:1,slot:e})})}n()}function O(r,i,t,d){let e=5,a=5;function n(){var s,o;r.innerHTML=`
      <div>
        ${i("Task 3: Shared Lighting Pool","The hall has 10 spotlight lamps. Adjust the slider to share lights between both display rooms.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-4 bg-white border border-[var(--grid-border)]">
              <span class="text-xs text-[var(--text-secondary)] uppercase font-medium">Room A (Partner)</span>
              <div class="text-xl font-serif font-bold text-[var(--accent-gold)] mt-1">${e} Lamps</div>
              <div class="flex justify-center gap-1 mt-2">
                ${Array(e).fill('<div class="w-3 h-3 bg-amber-400 rounded-full"></div>').join("")}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)]">
              <span class="text-xs text-[var(--text-secondary)] uppercase font-medium">Room B (You)</span>
              <div class="text-xl font-serif font-bold text-[var(--accent-gold)] mt-1">${a} Lamps</div>
              <div class="flex justify-center gap-1 mt-2">
                ${Array(a).fill('<div class="w-3 h-3 bg-amber-400 rounded-full"></div>').join("")}
              </div>
            </div>
          </div>

          <div class="w-full max-w-md mx-auto text-center">
            <input type="range" id="lightSlider" min="1" max="9" value="${e}" class="w-full accent-[#bd6f5d] cursor-pointer">
            <div class="flex justify-between text-[11px] text-[var(--text-secondary)] mt-1">
              <span>More to Partner</span>
              <span>Balanced (5 / 5)</span>
              <span>More to You</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmLightBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Finish &rarr;
          </button>
        </div>
      </div>
    `,(s=document.getElementById("lightSlider"))==null||s.addEventListener("input",l=>{e=parseInt(l.target.value),a=10-e,n()}),(o=document.getElementById("confirmLightBtn"))==null||o.addEventListener("click",()=>{t("light_balance_confirmed",{partner_lights:e,my_lights:a}),d({mini_game:"C3",observations_count:1,partner_lights:e,my_lights:a})})}n()}function H(r,i){const{appContainer:t,miniGameIndex:d,logEvent:e,onMiniGameComplete:a}=r;switch(d){case 0:D(t,i,e,a);break;case 1:N(t,i,e,a);break;case 2:Q(t,i,e,a);break}}function D(r,i,t,d){const e=[{id:"C1",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{id:"C2",color:"Sage",shape:"Square",icon:"&#9632;",label:"Sage Square"},{id:"C3",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{id:"C4",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{id:"C5",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{id:"C6",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"}];let a=0,n=0;function s(){if(a>=e.length){const m=n/e.length;d({mini_game:"E1",observations_count:e.length,accuracy:m});return}const o=e[a],l=a<3?"Match by Color":"Match by Shape";r.innerHTML=`
      <div>
        ${i("Task 1: Pattern Sorting","Sort each card into the matching box. Pay attention to the active rule!")}

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium">Card ${a+1} of ${e.length}</span>
          <span class="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-[var(--accent-gold)] border border-[var(--accent-gold)]/40">
            Rule: ${l}
          </span>
        </div>

        <!-- Current Card Display -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="text-4xl mb-2 ${o.color==="Gold"?"text-[var(--accent-gold)]":"text-emerald-700"}">
            ${o.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${o.label}</div>
        </div>

        <!-- Sorting Target Bins -->
        <div class="grid grid-cols-2 gap-4">
          ${a<3?`
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center" data-choice="Gold">
              <span class="text-xs font-semibold text-[var(--accent-gold)] block">Box 1: Gold Items</span>
            </button>
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center" data-choice="Sage">
              <span class="text-xs font-semibold text-emerald-800 block">Box 2: Sage Items</span>
            </button>
          `:`
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center" data-choice="Circle">
              <span class="text-xs font-semibold text-[var(--text-primary)] block">Box 1: Circles (&#9679;)</span>
            </button>
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center" data-choice="Square">
              <span class="text-xs font-semibold text-[var(--text-primary)] block">Box 2: Squares (&#9632;)</span>
            </button>
          `}
        </div>
      </div>
    `,t("card_presented",{card_id:o.id,rule:l}),r.querySelectorAll(".bin-btn").forEach(m=>{m.addEventListener("click",()=>{const v=m.getAttribute("data-choice");let b=!1;a<3?b=v===o.color:b=v===o.shape,b&&n++,t("card_sorted",{card_id:o.id,choice:v,is_correct:b}),a++,s()})})}s()}function N(r,i,t,d){let e=null;r.innerHTML=`
    <div>
      ${i("Task 2: Surprise Interruption","A sudden message arrives while you are preparing the room. Choose your next step.")}

      <div class="p-4 bg-amber-50 border border-amber-300 rounded-sm mb-6 flex items-start gap-3">
        <span class="text-base">&#9888;</span>
        <div>
          <div class="text-xs font-bold text-[#bd6f5d] uppercase">Urgent Notice</div>
          <div class="text-xs text-[var(--text-primary)] mt-0.5">
            "A sudden breeze in the courtyard blew over the welcome easel. The signs are scattered."
          </div>
        </div>
      </div>

      <div class="space-y-3 mb-6">
        <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-opt="QUICK_FIX">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Step outside for 2 minutes, set up the easel securely with a stone weight, then return</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Solves the outdoor issue immediately and returns to current work.</div>
        </div>

        <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-opt="ASK_TEAM">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Quickly check if a courtyard volunteer is already nearby to reset it</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Coordinates with outdoor teammates without breaking your own focus.</div>
        </div>

        <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-opt="FINISH_FIRST">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Finish your current indoor setup task first, then go out to reset the easel</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Ensures the critical indoor checklist is safely completed without losing rhythm.</div>
        </div>
      </div>

      <div class="flex justify-end">
        <button id="e2ConfirmBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Confirm Action &rarr;
        </button>
      </div>
    </div>
  `;const a=document.getElementById("e2ConfirmBtn");r.querySelectorAll(".e2-card").forEach(n=>{n.addEventListener("click",()=>{r.querySelectorAll(".e2-card").forEach(s=>s.classList.remove("border-[var(--accent-gold)]","bg-amber-50/30")),n.classList.add("border-[var(--accent-gold)]","bg-amber-50/30"),e=n.getAttribute("data-opt"),a&&(a.disabled=!1)})}),a==null||a.addEventListener("click",()=>{t("interruption_handled",{action:e}),d({mini_game:"E2",observations_count:1,action:e})})}function Q(r,i,t,d){let e=null;const a=[{id:"T1",label:"Geometric Diamond",desc:"Balanced diagonals that complement straight borders."},{id:"T2",label:"Flowing Wave",desc:"Curved lines that soften angular floor patterns."},{id:"T3",label:"Minimalist Dot",desc:"Open, calm space that leaves breathing room."}];r.innerHTML=`
    <div>
      ${i("Task 3: Pattern Harmony","Select the tile that creates the best harmony for the center gallery mat.")}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${a.map(s=>`
          <div class="e3-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition text-center space-y-2" data-tile="${s.id}">
            <div class="w-12 h-12 mx-auto bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center font-serif text-lg text-[var(--accent-gold)]">
              &#10022;
            </div>
            <div class="text-xs font-semibold text-[var(--text-primary)]">${s.label}</div>
            <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${s.desc}</div>
          </div>
        `).join("")}
      </div>

      <div class="flex justify-end">
        <button id="e3ConfirmBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Finish World 4 &rarr;
        </button>
      </div>
    </div>
  `;const n=document.getElementById("e3ConfirmBtn");r.querySelectorAll(".e3-card").forEach(s=>{s.addEventListener("click",()=>{r.querySelectorAll(".e3-card").forEach(o=>o.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40")),s.classList.add("border-[var(--accent-gold)]","bg-amber-50/40"),e=s.getAttribute("data-tile"),n&&(n.disabled=!1)})}),n==null||n.addEventListener("click",()=>{t("pattern_selected",{tile:e}),d({mini_game:"E3",observations_count:1,tile:e})})}function K(r,i){const{appContainer:t,miniGameIndex:d,logEvent:e,onMiniGameComplete:a}=r;switch(d){case 0:Y(t,i,e,a);break;case 1:J(t,i,e,a);break;case 2:U(t,i,e,a);break}}function Y(r,i,t,d){let e=0;const a=[{id:"ALC_1",title:"Room A: Natural Pigments",text:"Shows how blue lapis lazuli and gold leaf were ground by hand to create vibrant border illuminations."},{id:"ALC_2",title:"Room B: Paper Making",text:"Explains how traditional Kashmiri rag paper (Koshur Kagaz) is made from hemp and smoothed with agate stone."},{id:"ALC_3",title:"Room C: Oral Verse Metres",text:"Details how classical Kashmiri poetry metres were sung aloud to remember rhymes before printing existed."}];let n={};function s(){var o;r.innerHTML=`
      <div>
        ${i("Task 1: Gallery Walk","Walk through the exhibition. Click any side room to read its short story, or head straight to the exit.")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${a.map(l=>`
            <div class="p-4 bg-white border ${n[l.id]?"border-emerald-600 bg-emerald-50/20":"border-[var(--grid-border)]"} text-center space-y-2">
              <span class="text-[10px] uppercase font-bold text-[var(--accent-gold)] tracking-wider">Side Room</span>
              <h3 class="text-xs font-serif font-semibold text-[var(--text-primary)]">${l.title}</h3>
              <button class="alc-btn px-3 py-1.5 text-xs border border-[var(--grid-border)] bg-[#faf8f5] hover:border-[var(--accent-gold)] transition w-full" data-id="${l.id}">
                ${n[l.id]?"&#10003; Read Story":"Inspect Room"}
              </button>
            </div>
          `).join("")}
        </div>

        <div id="storyBox" class="hidden p-4 mb-6 bg-amber-50/70 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] leading-relaxed"></div>

        <div class="flex justify-between items-center pt-2">
          <span class="text-xs text-[var(--text-secondary)]">${e} of 3 optional rooms explored</span>
          <button id="exitGalleryBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Proceed to Exit &rarr;
          </button>
        </div>
      </div>
    `,r.querySelectorAll(".alc-btn").forEach(l=>{l.addEventListener("click",()=>{const m=l.getAttribute("data-id"),v=a.find(p=>p.id===m);n[m]||(n[m]=!0,e++);const b=document.getElementById("storyBox");b&&v&&(b.classList.remove("hidden"),b.innerHTML=`<strong>${v.title}:</strong> ${v.text}`),t("alcove_read",{alcove_id:m}),s()})}),(o=document.getElementById("exitGalleryBtn"))==null||o.addEventListener("click",()=>{t("gallery_walk_finished",{explored:e}),d({mini_game:"Q1",observations_count:1,exploration_rate:e/3})})}s()}function J(r,i,t,d){let e=0;const a=[{id:"C_PIGMENT",name:"Pigment Inspection",detail:"The red ink uses pure saffron flower pigment, common in mid-19th century regional manuscripts."},{id:"C_WOOD",name:"Backing Frame",detail:"The backing board is carved from seasoned Himalayan cedar with hand-forged iron nails."},{id:"C_SEAL",name:"Seal Impression",detail:"A faint circular wax seal in the lower corner bears the seal of a Srinagar bookbinder."}];let n={};function s(){var o;r.innerHTML=`
      <div>
        ${i("Task 2: Investigating an Artwork","An unsigned artwork arrived at the archive. Click on the clue cards below to learn more about its history.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <span class="text-[10px] tracking-widest text-[var(--accent-gold)] uppercase font-semibold">Unidentified Item</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-2">Illuminated Manuscript Border (Item #402)</h3>
          <p class="text-xs text-[var(--text-secondary)]">Click any clue below to reveal archival details.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          ${a.map(l=>`
            <div class="p-4 bg-white border ${n[l.id]?"border-[var(--accent-gold)] bg-amber-50/20":"border-[var(--grid-border)]"} text-center space-y-2 cursor-pointer clue-card" data-id="${l.id}">
              <div class="text-xs font-semibold text-[var(--text-primary)]">${l.name}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${n[l.id]?l.detail:"Click to inspect clue..."}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)]">${e} of 3 clues examined</span>
          <button id="finishCluesBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Finish Investigation &rarr;
          </button>
        </div>
      </div>
    `,r.querySelectorAll(".clue-card").forEach(l=>{l.addEventListener("click",()=>{const m=l.getAttribute("data-id");n[m]||(n[m]=!0,e++,t("clue_inspected",{clue_id:m}),s())})}),(o=document.getElementById("finishCluesBtn"))==null||o.addEventListener("click",()=>{t("investigation_completed",{clues_read:e}),d({mini_game:"Q2",observations_count:1,clues_read:e})})}s()}function U(r,i,t,d){let e=null;const a=[{id:"M_PROJECTION",title:"Poetry & Light Projection",desc:"Projecting animated Urdu and Kashmiri verses onto white plaster walls."},{id:"M_SOUND",title:"Acoustic Soundscapes",desc:"Recording sounds of mountain streams, paper workshops, and courtyard birds to accompany poetry."},{id:"M_TEXTILE",title:"Embroidered Wall Murals",desc:"Working with local artisans to embroider literary couplets into woven wool."}];r.innerHTML=`
    <div>
      ${i("Task 3: Creative Exploration","Which upcoming experimental showcase would you be most curious to explore and help set up?")}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${a.map(s=>`
          <div class="med-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2 text-center" data-id="${s.id}">
            <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] font-serif text-base">
              &#10023;
            </div>
            <div class="text-xs font-semibold text-[var(--text-primary)]">${s.title}</div>
            <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${s.desc}</div>
          </div>
        `).join("")}
      </div>

      <div class="flex justify-end">
        <button id="q3FinishBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Finish World 5 &rarr;
        </button>
      </div>
    </div>
  `;const n=document.getElementById("q3FinishBtn");r.querySelectorAll(".med-card").forEach(s=>{s.addEventListener("click",()=>{r.querySelectorAll(".med-card").forEach(o=>o.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40")),s.classList.add("border-[var(--accent-gold)]","bg-amber-50/40"),e=s.getAttribute("data-id"),n&&(n.disabled=!1)})}),n==null||n.addEventListener("click",()=>{t("medium_selected",{medium:e}),d({mini_game:"Q3",observations_count:1,medium:e})})}function V(r,i){const{appContainer:t,miniGameIndex:d,logEvent:e,onMiniGameComplete:a}=r;switch(d){case 0:z(t,i,e,a);break;case 1:X(t,i,e,a);break;case 2:Z(t,i,e,a);break}}function z(r,i,t,d){let e=[];const a=[{id:"T_HEMP",name:"Twisted Hemp Cord",icon:"&#129526;"},{id:"T_BRASS",name:"Brass Chain Link",icon:"&#128279;"},{id:"T_CLIP",name:"Carved Walnut Clip",icon:"&#128206;"},{id:"T_RING",name:"Steel Hanging Ring",icon:"&#9711;"}];function n(){var s;r.innerHTML=`
      <div>
        ${i("Task 1: Improvised Art Mount","The hanging wire broke right before the show. Pick at least 2 items from the table to build a strong, creative mount.")}

        <!-- Interactive Workbench Preview -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="w-full h-32 bg-white border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative mb-4">
            <div class="w-24 h-16 bg-amber-100 border border-[var(--accent-gold)] flex items-center justify-center text-[10px] uppercase font-bold text-[var(--accent-gold)] shadow-xs">
              Art Frame
            </div>
            <div class="text-xs text-[var(--text-secondary)] mt-2">
              Assembly: ${e.length>0?`<strong class="text-emerald-800">${e.join(" + ")}</strong>`:"No materials attached yet."}
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            ${a.map(o=>`
              <button class="tool-btn p-3 bg-white border ${e.includes(o.name)?"border-[var(--accent-gold)] bg-amber-50/50 font-semibold":"border-[var(--grid-border)]"} text-xs hover:border-[var(--accent-gold)] transition text-center" data-name="${o.name}">
                <div class="text-lg mb-1">${o.icon}</div>
                <div>${o.name}</div>
              </button>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)]">${e.length} items connected</span>
          <button id="testMountBtn" ${e.length>=2?"":"disabled"} class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
            Test Mount Stability &rarr;
          </button>
        </div>
      </div>
    `,r.querySelectorAll(".tool-btn").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-name");e.includes(l)?e=e.filter(m=>m!==l):e.push(l),t("material_toggled",{material:l,current_selection:e}),n()})}),(s=document.getElementById("testMountBtn"))==null||s.addEventListener("click",()=>{t("mount_built",{materials:e}),d({mini_game:"CR1",observations_count:1,materials_used:e.length})})}n()}function X(r,i,t,d){let e=null;const a=[{id:"S_360",title:"360° Wrap Display",desc:"Hang small framed poetry on all four sides of the pillar so visitors can walk around it."},{id:"S_SHADOW",title:"Shadow Projection Wall",desc:"Place a warm spotlight on the pillar to create an ambient shadow backdrop for nearby paintings."},{id:"S_SEAT",title:"Reading Bench Nook",desc:"Place a low wooden bench and poetry books at the pillar base for quiet reading."}];r.innerHTML=`
    <div>
      ${i("Task 2: Turning a Barrier into Art","A wide stone pillar stands in the center of the gallery. How would you incorporate it into the event?")}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${a.map(s=>`
          <div class="cr2-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2 text-center" data-id="${s.id}">
            <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] font-serif text-base">
              &#10038;
            </div>
            <div class="text-xs font-semibold text-[var(--text-primary)]">${s.title}</div>
            <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${s.desc}</div>
          </div>
        `).join("")}
      </div>

      <div class="flex justify-end">
        <button id="cr2ConfirmBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Confirm Idea &rarr;
        </button>
      </div>
    </div>
  `;const n=document.getElementById("cr2ConfirmBtn");r.querySelectorAll(".cr2-card").forEach(s=>{s.addEventListener("click",()=>{r.querySelectorAll(".cr2-card").forEach(o=>o.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40")),s.classList.add("border-[var(--accent-gold)]","bg-amber-50/40"),e=s.getAttribute("data-id"),n&&(n.disabled=!1)})}),n==null||n.addEventListener("click",()=>{t("pillar_solution_selected",{solution:e}),d({mini_game:"CR2",observations_count:1,solution:e})})}function Z(r,i,t,d){let e=null;const a=[{id:"P_MINIMAL",title:"Serene Minimalist",desc:"Large open white space with a single central poem line in elegant Nastaliq."},{id:"P_CLASSIC",title:"Traditional Floral Border",desc:"Handmade Kashmiri floral border pattern framing the event details."},{id:"P_MODERN",title:"Split Contrast",desc:"Warm terracotta block on one half, crisp typography on the other."}];r.innerHTML=`
    <div>
      ${i("Task 3: Event Invitation Design","Choose which visual style best reflects the welcoming spirit of the collective.")}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${a.map(s=>`
          <div class="cr3-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2 text-center" data-id="${s.id}">
            <div class="w-full h-24 bg-[#faf8f5] border border-[var(--grid-border)] flex items-center justify-center font-serif text-xs text-[var(--accent-gold)] mb-2">
              [Preview: ${s.title}]
            </div>
            <div class="text-xs font-semibold text-[var(--text-primary)]">${s.title}</div>
            <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${s.desc}</div>
          </div>
        `).join("")}
      </div>

      <div class="flex justify-end">
        <button id="cr3FinishBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Finish World 6 &rarr;
        </button>
      </div>
    </div>
  `;const n=document.getElementById("cr3FinishBtn");r.querySelectorAll(".cr3-card").forEach(s=>{s.addEventListener("click",()=>{r.querySelectorAll(".cr3-card").forEach(o=>o.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40")),s.classList.add("border-[var(--accent-gold)]","bg-amber-50/40"),e=s.getAttribute("data-id"),n&&(n.disabled=!1)})}),n==null||n.addEventListener("click",()=>{t("poster_style_selected",{style:e}),d({mini_game:"CR3",observations_count:1,style:e})})}function ee(r,i){const{appContainer:t,miniGameIndex:d,logEvent:e,onMiniGameComplete:a}=r;switch(d){case 0:te(t,i,e,a);break;case 1:re(t,i,e,a);break;case 2:ae(t,i,e,a);break}}function te(r,i,t,d){const e=[{id:"INV_1",recipient:"Senior Calligrapher — Master Ghulam"},{id:"INV_2",recipient:"Community Youth Art Collective"},{id:"INV_3",recipient:"Regional Heritage Conservation Trust"}];let a=0,n=[],s=performance.now();function o(){var m;if(a>=e.length){const v=n.reduce((b,p)=>b+p,0)/n.length;d({mini_game:"M1",observations_count:e.length,avg_latency_ms:v});return}const l=e[a];s=performance.now(),r.innerHTML=`
      <div>
        ${i("Task 1: Sealing Event Invitations","Apply the collective wax seal stamp to each of the 3 handmade invitation envelopes.")}

        <div class="text-xs text-[var(--text-secondary)] font-medium mb-4">
          Envelope ${a+1} of ${e.length}
        </div>

        <!-- Interactive Envelope Preview -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="w-full max-w-sm mx-auto h-36 bg-amber-50/60 border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative shadow-sm">
            <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Exhibition Invitation</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${l.recipient}</div>
            
            <div id="sealDisplay" class="w-10 h-10 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-[10px] text-[var(--accent-gold)] font-bold">
              SEAL
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <button id="stampBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            &#9998; Apply Wax Seal Stamp &rarr;
          </button>
        </div>
      </div>
    `,t("invitation_presented",{inv_id:l.id}),(m=document.getElementById("stampBtn"))==null||m.addEventListener("click",()=>{const v=performance.now()-s;n.push(v),t("envelope_stamped",{inv_id:l.id,dwell_ms:v}),a++,o()})}o()}function re(r,i,t,d){let e=0;const a=3;function n(){var s,o;r.innerHTML=`
      <div>
        ${i("Task 2: Extra Preparations","The required invitations are complete. 3 additional courtesy envelopes remain.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="text-sm font-serif text-[var(--text-primary)] mb-2 font-medium">
            Optional Courtesy Envelopes Available
          </div>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto mb-4">
            You may stamp additional invitations for guest artists, or complete this task at any time.
          </p>

          <div class="text-base font-serif font-bold text-[var(--accent-gold)] mb-4">
            ${e} of ${a} Extra Envelopes Sealed
          </div>

          <div class="flex justify-center gap-4">
            ${e<a?`
              <button id="stampExtraBtn" class="px-6 py-2.5 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-wider hover:bg-amber-50 transition">
                + Seal Extra Envelope
              </button>
            `:'<span class="text-xs text-emerald-700 font-semibold">&#10003; All extra envelopes completed.</span>'}
          </div>
        </div>

        <div class="flex justify-end">
          <button id="finishM2Btn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Proceed to Final Task &rarr;
          </button>
        </div>
      </div>
    `,(s=document.getElementById("stampExtraBtn"))==null||s.addEventListener("click",()=>{e++,t("optional_envelope_stamped",{count:e}),n()}),(o=document.getElementById("finishM2Btn"))==null||o.addEventListener("click",()=>{t("optional_stamping_done",{total_extra:e}),d({mini_game:"M2",observations_count:1,optional_completed:e})})}n()}function ae(r,i,t,d){const e=[{id:"T_LIGHTS",name:"Turn on Warm Gallery Spotlights"},{id:"T_PAMPHLETS",name:"Arrange Urdu & Kashmiri Poetry Guides on Welcome Table"},{id:"T_FLOWERS",name:"Place Fresh Jasmine Petals at the Entrance Urn"}];let a={};function n(){var o;const s=e.every(l=>a[l.id]);r.innerHTML=`
      <div>
        ${i("Task 3: Final Room Warmth","Complete the final 3-point checklist to make the gallery ready for evening guests.")}

        <div class="space-y-3 mb-6">
          ${e.map((l,m)=>`
            <label class="flex items-center gap-3 p-4 bg-white border ${a[l.id]?"border-emerald-600 bg-emerald-50/20":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition">
              <input type="checkbox" id="task_${l.id}" ${a[l.id]?"checked":""} class="accent-[#bd6f5d]">
              <span class="text-xs font-medium text-[var(--text-primary)]">${m+1}. ${l.name}</span>
            </label>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="m3FinishBtn" ${s?"":"disabled"} class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
            Finalize Assessment &rarr;
          </button>
        </div>
      </div>
    `,e.forEach(l=>{var m;(m=document.getElementById(`task_${l.id}`))==null||m.addEventListener("change",v=>{a[l.id]=v.target.checked,t("readiness_task_toggled",{task_id:l.id,checked:v.target.checked}),n()})}),(o=document.getElementById("m3FinishBtn"))==null||o.addEventListener("click",()=>{t("gallery_readiness_complete"),d({mini_game:"M3",observations_count:e.length,readiness_score:1})})}n()}const ie={W1:{name:"The Frequency",name_ur:"تعدد",param:"Empathy"},W2:{name:"The Archive",name_ur:"دستاویز",param:"Conscientiousness"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ نقش",param:"Collaborative Spirit"},W4:{name:"The Shifting Grid",name_ur:"متغیر گرڈ",param:"Emotional Agility"},W5:{name:"The Hidden Gallery",name_ur:"نہاں خانہ",param:"Curiosity"},W6:{name:"The Broken Tool",name_ur:"شکستہ آلہ",param:"Creative Initiative"},W7:{name:"The Repetition",name_ur:"تکرار",param:"Motivation"}};function se(r){const{appContainer:i,worldCode:t,worldIndex:d,miniGameIndex:e,onSkipWorld:a,onSkipAllGames:n}=r,s=ie[t]||{name:"Unknown World",name_ur:""},o=(l,m)=>`
    <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${d+1} of 7: ${s.name}</span>
          <span class="font-serif text-lg text-[var(--text-secondary)]" style="direction: rtl;">${s.name_ur}</span>
        </div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">${l}</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">${m}</p>
      </div>
      <div class="flex items-center gap-3">
        <button id="skipWorldBtn" class="skip-btn hover:text-[var(--accent-gold)]">Skip World</button>
        <button id="skipAllGamesBtn" class="skip-btn text-[var(--accent-gold)]">Skip All Games</button>
      </div>
    </div>
  `;switch(setTimeout(()=>{var l,m;(l=document.getElementById("skipWorldBtn"))==null||l.addEventListener("click",()=>{confirm("Skip this world? Incomplete micro-tasks will be marked neutrally as insufficient data, not a low score.")&&a()}),(m=document.getElementById("skipAllGamesBtn"))==null||m.addEventListener("click",()=>{confirm("Skip the entire interactive game battery and finalize?")&&n()})},50),t){case"W1":M(r,o);break;case"W2":A(r,o);break;case"W3":G(r,o);break;case"W4":H(r,o);break;case"W5":K(r,o);break;case"W6":V(r,o);break;case"W7":ee(r,o);break;default:a();break}}let c={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1};async function x(r,i={}){if(window.globalApiFetch)return await window.globalApiFetch(r,i);const t=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",d={"Content-Type":"application/json",...i.headers||{}};return fetch(`${t}${r}`,{...i,headers:d})}function u(r,i,t={},d={},e="mouse",a=null,n=null){const s=performance.now(),o={seq:c.seq++,segment_id:c.segmentId,t_ms:s,screen:r,game_world:c.worldSequence[c.currentWorldIndex]||null,mini_game:a,trial:n,action:i,input_type:e,state:d,data:t};c.telemetryQueue.push(o),(c.telemetryQueue.length>=10||i==="minigame_end"||i==="sjt_complete")&&y()}async function y(){if(!c.sessionId||c.telemetryQueue.length===0)return;const r=[...c.telemetryQueue];c.telemetryQueue=[];try{await x("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:c.sessionId,events:r})})}catch(i){console.warn("[Telemetry] Flush failed, re-queuing:",i),c.telemetryQueue=[...r,...c.telemetryQueue]}}window.addEventListener("beforeunload",()=>{if(c.sessionId&&c.telemetryQueue.length>0){const r=window.ALFAAZ_API_URL||"",i=JSON.stringify({session_id:c.sessionId,events:c.telemetryQueue});navigator.sendBeacon(`${r}/recruit/telemetry`,i)}});document.addEventListener("visibilitychange",()=>{document.hidden?u(c.screen,"visibility_hidden",{timestamp:Date.now()}):u(c.screen,"visibility_visible",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{g(),ne()});function ne(){const r=document.getElementById("pauseBtn");r==null||r.addEventListener("click",L)}function L(){c.isPaused?(c.isPaused=!1,u(c.screen,"resume"),c.screen=c.pausedPreviousScreen||"sjt",g()):(c.isPaused=!0,c.pausedPreviousScreen=c.screen,u(c.screen,"pause"),c.screen="paused",g())}function g(){const r=document.getElementById("recruitApp"),i=document.getElementById("sessionHeaderControls"),t=document.getElementById("topProgressBar"),d=document.getElementById("progressBarFill");switch(c.screen!=="consent"&&c.screen!=="complete"&&c.screen!=="paused"?(i==null||i.classList.remove("hidden"),t==null||t.classList.remove("hidden")):(i==null||i.classList.add("hidden"),t==null||t.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),c.screen){case"consent":oe(r);break;case"accessibility":de(r);break;case"warmup":ce(r);break;case"sjt":k(r,d);break;case"games":E(r,d);break;case"paused":me(r);break;case"complete":ve(r);break}}function oe(r){var i;r.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-4 text-center">
        <span class="act-badge">Onboarding & Research</span>
        <h1 class="text-3xl font-serif text-[var(--text-primary)]">Volunteer Exploratory Assessment</h1>
      </div>

      <div class="space-y-4 text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        <p><strong>Estimated Total Time:</strong> ~20–25 minutes (SJT + brief exploratory micro-tasks).</p>
        <p><strong>Voluntary Nature:</strong> You may pause, skip tasks, or conclude at any time without penalty. Missing or skipped sections are recorded neutrally as insufficient data, never as a low score.</p>
        <p><strong>Simulated Partners:</strong> Some interactive tasks feature computer-controlled simulated characters. Their behavior is automated and scripted.</p>
        <p><strong>Data & Research Notice:</strong> This is a calibration-stage research instrument for unpaid volunteer recruitment, not a validated selection test. All raw telemetry is recorded under a pseudonymous session identifier.</p>
      </div>

      <form id="startForm" class="space-y-4 pt-2">
        <div>
          <label class="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Full Name *</label>
          <input type="text" id="fullName" required class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="Your name">
        </div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Email Address *</label>
          <input type="email" id="email" required class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="you@example.com">
        </div>
        <div class="flex items-center gap-2 pt-2">
          <input type="checkbox" id="ageConfirm" required checked class="w-4 h-4 accent-[#bd6f5d]">
          <label for="ageConfirm" class="text-xs text-[var(--text-primary)]">I confirm that I am 18 years of age or older.</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="consentAgree" required checked class="w-4 h-4 accent-[#bd6f5d]">
          <label for="consentAgree" class="text-xs text-[var(--text-primary)]">I understand and agree to participate in this research session.</label>
        </div>

        <div class="pt-4 flex justify-end">
          <button type="submit" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Begin Session &rarr;
          </button>
        </div>
      </form>
    </div>
  `,(i=document.getElementById("startForm"))==null||i.addEventListener("submit",async t=>{t.preventDefault();const d=t.target.querySelector('button[type="submit"]'),e=d?d.innerHTML:"Begin Session &rarr;";d&&(d.disabled=!0,d.innerHTML="Connecting...");const a=document.getElementById("fullName").value.trim(),n=document.getElementById("email").value.trim();try{const s=await x("/recruit/session/start",{method:"POST",body:JSON.stringify({full_name:a,email:n,device_class:window.innerWidth<768?"mobile":"desktop",input_modality:"ontouchstart"in window?"touch":"mouse"})});if(!s||!s.ok){const l=s?await s.json().catch(()=>({})):{};throw new Error(l.detail||(s?`Server returned ${s.status}`:"No response from server"))}const o=await s.json();if(o.session_id)c.sessionId=o.session_id,c.configHash=o.config_hash,c.worldSequence=o.world_sequence,c.seeds=o.seeds,await x("/recruit/consent",{method:"POST",body:JSON.stringify({session_id:c.sessionId,consent_text_version:"2026-10-v2",choices:{research_telemetry:!0},confirmed_18_plus:!0})}),u("consent","consent_accepted",{full_name:a}),c.screen="accessibility",g();else throw new Error("Missing session ID")}catch(s){alert(`Unable to initialize session: ${s.message||"Please check connection."}`),console.error(s),d&&(d.disabled=!1,d.innerHTML=e)}})}function de(r){var i;r.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-3 text-center">
        <span class="act-badge">Preferences</span>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">Interaction & Accessibility</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-1">Adjust the environment to suit your input and comfort preferences.</p>
      </div>

      <div class="space-y-3 pt-2">
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_keyboard" class="mt-1 accent-[#bd6f5d]">
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">Keyboard / Non-Pointer Navigation</div>
            <div class="text-xs text-[var(--text-secondary)]">Optimizes interaction for tab, arrow keys, and numeric keypad shortcuts.</div>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_contrast" class="mt-1 accent-[#bd6f5d]">
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">High Contrast Display</div>
            <div class="text-xs text-[var(--text-secondary)]">Increases stroke density and foreground-background separation.</div>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_motion" class="mt-1 accent-[#bd6f5d]">
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">Reduced Motion</div>
            <div class="text-xs text-[var(--text-secondary)]">Disables pulsing transitions and rapid symbol shifting.</div>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_time" class="mt-1 accent-[#bd6f5d]">
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">Extended Time Allowance</div>
            <div class="text-xs text-[var(--text-secondary)]">Expands trial observation windows (timing metrics are automatically excluded from comparison).</div>
          </div>
        </label>
      </div>

      <div class="pt-4 flex justify-between items-center">
        <span class="text-xs text-[var(--text-secondary)]">Accessibility settings never lower any measurement.</span>
        <button id="saveA11yBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Continue &rarr;
        </button>
      </div>
    </div>
  `,(i=document.getElementById("saveA11yBtn"))==null||i.addEventListener("click",async()=>{var d,e,a,n;const t=[];(d=document.getElementById("a11y_keyboard"))!=null&&d.checked&&t.push("keyboard_navigation"),(e=document.getElementById("a11y_contrast"))!=null&&e.checked&&t.push("high_contrast"),(a=document.getElementById("a11y_motion"))!=null&&a.checked&&t.push("reduced_motion"),(n=document.getElementById("a11y_time"))!=null&&n.checked&&t.push("extended_time"),c.accessibilityModes=t;try{await x("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:c.sessionId,modes_enabled:t})})}catch(s){console.warn("Accessibility preferences save error:",s)}u("accessibility","preferences_saved",{modes:t}),c.screen="warmup",g()})}function ce(r){let i=[],t=performance.now();r.innerHTML=`
    <div class="space-y-6 text-center py-4">
      <span class="act-badge">Calibration</span>
      <h2 class="text-2xl font-serif text-[var(--text-primary)]">Interactive Calibration</h2>
      <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
        Please tap or click the center symbol 3 times at a natural, comfortable pace to establish your baseline device rhythm.
      </p>

      <div class="py-8 flex justify-center">
        <button id="tapTarget" class="w-24 h-24 rounded-full border-2 border-[var(--accent-gold)] bg-white text-[var(--accent-gold)] font-serif text-xl flex items-center justify-center hover:bg-amber-50 active:scale-95 transition shadow-sm">
          Tap (0/3)
        </button>
      </div>

      <div id="warmupStatus" class="text-xs text-[var(--text-secondary)] tracking-wider uppercase">
        Waiting for first tap...
      </div>
    </div>
  `;const d=document.getElementById("tapTarget"),e=document.getElementById("warmupStatus");d==null||d.addEventListener("click",async()=>{i.push(performance.now());const a=i.length;if(d.textContent=`Tap (${a}/3)`,e.textContent=`Registered tap ${a} of 3`,a>=3){const n=[i[1]-i[0],i[2]-i[1]],s=(n[0]+n[1])/2,o=performance.now()-t;try{await x("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:c.sessionId,tap_latency_baseline_ms:s,reading_dwell_baseline_ms:o,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(l){console.warn("Warmup save error:",l)}u("warmup","warmup_completed",{avgLatency:s,readingDwell:o});try{const m=await(await x("/recruit/sjt/public")).json();c.sjtScenarios=m.scenarios||[],c.currentSjtIndex=0,c.screen="sjt",g()}catch(l){console.error("Failed to load SJT payload:",l)}}})}function k(r,i){var l;const t=c.sjtScenarios[c.currentSjtIndex];if(!t){le();return}const d=c.sjtScenarios.length,e=c.currentSjtIndex+1;i&&(i.style.width=`${(e-1)/(d+7)*100}%`);const a=document.getElementById("segmentProgress");a&&(a.textContent=`SJT ${e}/${d}`);const n=c.sjtResponses[t.id]||null,s=t.options.map(m=>`
    <div class="option-card ${n===m.id?"selected":""}" data-opt-id="${m.id}" tabindex="0" role="button">
      <span class="font-serif text-sm font-semibold text-[var(--accent-gold)]">${m.id.slice(-1)}.</span>
      <span class="text-sm text-[var(--text-primary)] leading-relaxed">${m.text}</span>
    </div>
  `).join("");r.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-3 flex justify-between items-end">
        <div>
          <span class="act-badge">Act ${t.act}: ${t.act_title_en}</span>
          <span class="act-title-ur font-serif">${t.act_title_ur||""}</span>
          <h2 class="text-2xl font-serif text-[var(--text-primary)]">Scenario ${t.id}</h2>
        </div>
        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
          Scenario ${e} of ${d}
        </div>
      </div>

      <div class="text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        ${t.setup}
      </div>

      <div class="space-y-3">
        <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Choose the course of action you would most naturally take:</div>
        ${s}
      </div>

      <div class="pt-4 flex justify-between items-center border-t border-[var(--grid-border)]">
        <span class="text-xs text-[var(--text-secondary)]">Keyboard: Press 1–4 to choose</span>
        <button id="nextSjtBtn" ${n?"":"disabled"} class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] transition">
          ${e===d?"Complete SJT &rarr;":"Next Scenario &rarr;"}
        </button>
      </div>
    </div>
  `,u("sjt","scenario_displayed",{scenario_id:t.id,index:e}),r.querySelectorAll(".option-card").forEach(m=>{m.addEventListener("click",()=>{const v=m.getAttribute("data-opt-id");c.sjtResponses[t.id]=v,u("sjt","option_selected",{scenario_id:t.id,option_id:v}),k(r,i)})}),(l=document.getElementById("nextSjtBtn"))==null||l.addEventListener("click",()=>{c.sjtResponses[t.id]&&(c.currentSjtIndex++,k(r,i))});const o=m=>{if(["1","2","3","4"].includes(m.key)){const v=parseInt(m.key)-1;t.options[v]&&(c.sjtResponses[t.id]=t.options[v].id,u("sjt","option_selected_key",{scenario_id:t.id,option_id:t.options[v].id}),k(r,i))}};window.onkeydown=o}async function le(){window.onkeydown=null;try{await x("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:c.sessionId,responses:c.sjtResponses})}),u("sjt","sjt_complete",{response_count:Object.keys(c.sjtResponses).length}),c.screen="games",c.currentWorldIndex=0,c.currentMiniGameIndex=0,g()}catch(r){console.error("SJT submit error:",r)}}function E(r,i){const t=c.worldSequence[c.currentWorldIndex];if(!t||c.currentWorldIndex>=c.worldSequence.length){I();return}const d=document.getElementById("segmentProgress");d&&(d.textContent=`World ${c.currentWorldIndex+1}/7`),i&&(i.style.width=`${(c.currentSjtIndex+c.currentWorldIndex+1)/(c.sjtScenarios.length+7)*100}%`),se({appContainer:r,worldCode:t,worldIndex:c.currentWorldIndex,miniGameIndex:c.currentMiniGameIndex,logEvent:(e,a,n,s)=>{const o=_(t,c.currentMiniGameIndex);u("game",e,a,n,s,o)},onMiniGameComplete:e=>{const a=_(t,c.currentMiniGameIndex);u("game","minigame_end",e,{},"mouse",a),y(),c.currentMiniGameIndex<2?c.currentMiniGameIndex++:(c.currentMiniGameIndex=0,c.currentWorldIndex++),E(r,i)},onSkipWorld:()=>{const e=_(t,c.currentMiniGameIndex);u("game","world_skipped",{world:t},{},"mouse",e),y(),c.currentMiniGameIndex=0,c.currentWorldIndex++,E(r,i)},onSkipAllGames:()=>{u("game","all_games_skipped"),y(),I()}})}function _(r,i){const t={W1:["F1","F2","F3"],W2:["A1","A2","A3"],W3:["C1","C2","C3"],W4:["E1","E2","E3"],W5:["Q1","Q2","Q3"],W6:["CR1","CR2","CR3"],W7:["M1","M2","M3"]};return t[r]&&t[r][i]||"MG"}async function I(){try{await x("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:c.sessionId})})}catch(r){console.warn("Session complete submission error:",r)}y(),c.screen="complete",g()}function me(r){var i;r.innerHTML=`
    <div class="space-y-6 text-center py-12">
      <h2 class="text-3xl font-serif text-[var(--text-primary)]">Session Paused</h2>
      <p class="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
        Your progress has been preserved. Take as much time as you need. Timing metrics are suspended while paused.
      </p>
      <div class="pt-4">
        <button id="resumeBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Resume Session &rarr;
        </button>
      </div>
    </div>
  `,(i=document.getElementById("resumeBtn"))==null||i.addEventListener("click",L)}function ve(r){r.innerHTML=`
    <div class="space-y-6 text-center py-16">
      <div class="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 mx-auto flex items-center justify-center text-2xl font-serif">
        &#10003;
      </div>
      <h1 class="text-3xl font-serif text-[var(--text-primary)]">Assessment Complete</h1>
      <p class="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
        Thank you for your time, care, and attention. Your responses have been safely submitted to the Alfaaz Collective research registry.
      </p>
      <div class="pt-6">
        <a href="index.html" class="inline-block px-6 py-2.5 border border-[var(--grid-border)] text-xs uppercase tracking-widest text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition">
          Return to Alfaaz Home
        </a>
      </div>
    </div>
  `}
