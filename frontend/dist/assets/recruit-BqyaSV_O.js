import"./global-DxYxv3W5.js";/* empty css               */function $(t,r){const{appContainer:a,miniGameIndex:d,logEvent:n,onMiniGameComplete:e}=t;switch(d){case 0:j(a,r,n,e);break;case 1:P(a,r,n,e);break;case 2:H(a,r,n,e);break}}function j(t,r,a,d){let n=!0;const e=[{id:"FOLIO-1",title:"Handwritten Ghazal Manuscript (1842)",tags:["Poetry","Parchment","Ink"],targetCategory:"Books & Poetry"},{id:"FOLIO-2",title:"Carved Walnut Printing Block",tags:["Object","Craft Tool","Wood"],targetCategory:"Art Objects"},{id:"FOLIO-3",title:"Lal Ded Vakh Verse Translations",tags:["Poetry Book","Kashmiri","Paper"],targetCategory:"Books & Poetry"},{id:"FOLIO-4",title:"Silver Thread Embroidery Sample",tags:["Fabric","Silk & Metal","Textile"],targetCategory:"Art Objects"},{id:"FOLIO-5",title:"1924 Exhibition Visitor Guestbook",tags:["Official Record","Signatures","Ledger"],targetCategory:"Letters & Records"},{id:"FOLIO-6",title:"Founder Letter on Folio Care",tags:["Letter","Preservation Guide","Archive"],targetCategory:"Letters & Records"}];let c=0,s=0,o=!1;function l(){var m,v;if(n){t.innerHTML=`
        <div>
          ${r("Part 1: The Manuscript Folios","Preserving and organizing historical folios and objects.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',goal:"Organize each historical item into its designated archive shelf.",steps:["Examine the item title and descriptor tags on the card.","Click the shelf guide button if you want to verify category rules.","Select the appropriate archive shelf to place the folio."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{n=!1,l()});return}if(c>=e.length){const h=s/e.length;d({mini_game:"A1",observations_count:e.length,accuracy:h,guide_opened:o});return}const i=e[c];t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 1: The Manuscript Folios","Select the correct shelf for each historical archive artifact.")}

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            Folio ${c+1} of ${e.length}
          </span>
          <button id="guideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1 hover:bg-amber-50 transition flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Shelf Guide
          </button>
        </div>

        <div id="guideModal" class="hidden p-4 mb-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] space-y-1 shadow-xs">
          <div>• <strong>1. Books & Poetry:</strong> Handwritten manuscripts, poetry leaves, verse folios.</div>
          <div>• <strong>2. Art Objects:</strong> Wooden blocks, textile fragments, metal craft tools.</div>
          <div>• <strong>3. Letters & Records:</strong> Guestbooks, official letters, event registers.</div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase font-mono">${i.id}</span>
          <h3 class="text-lg font-serif text-[var(--text-primary)] font-medium mt-1 mb-3">${i.title}</h3>
          <div class="flex justify-center gap-2">
            ${i.tags.map(h=>`<span class="px-2.5 py-1 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)] rounded-xs">${h}</span>`).join("")}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs flex flex-col items-center gap-1" data-cat="Books & Poetry">
            <svg class="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            Books & Poetry
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs flex flex-col items-center gap-1" data-cat="Art Objects">
            <svg class="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Art Objects
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs flex flex-col items-center gap-1" data-cat="Letters & Records">
            <svg class="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Letters & Records
          </button>
        </div>
      </div>
    `,a("item_presented",{doc_id:i.id,index:c}),(v=document.getElementById("guideBtn"))==null||v.addEventListener("click",()=>{const h=document.getElementById("guideModal");h==null||h.classList.toggle("hidden"),o=!0,a("guide_viewed",{doc_id:i.id})}),t.querySelectorAll(".cat-btn").forEach(h=>{h.addEventListener("click",()=>{const g=h.getAttribute("data-cat"),f=g===i.targetCategory;f&&s++,a("item_sorted",{doc_id:i.id,choice:g,is_correct:f}),c++,l()})})}l()}function P(t,r,a,d){let n=!0,e=null;function c(){var o;if(n){t.innerHTML=`
        <div>
          ${r("Part 2: The Fragile Leaf","Handling an archival leaf with partial water wear.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',goal:"Decide how to preserve an ancient poem leaf with faint, blurred dating.",steps:["Review the condition notes for the 19th-century ghazal leaf.","Assess the preservation options for accessioning.","Select your archival handling recommendation."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{n=!1,c()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 2: The Fragile Leaf","A 19th-century poem leaf has faint water spots and a blurred year stamp. Select your approach.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <div class="w-10 h-10 rounded-full bg-amber-100 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] mx-auto mb-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <span class="text-[10px] tracking-widest text-[#bd6f5d] uppercase font-semibold">Special Conservation Inspection</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-1">19th Century Kashmiri Ghazal Leaf</h3>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
            Condition: Water fading on lower margin. Year stamp appears as "18--".
          </p>
        </div>

        <div class="space-y-3 mb-6">
          <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-action="FLAG_CARE">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Place in acid-free envelope with notice: "Year Estimated, Needs Conservator Review"</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Safeguards the paper and alerts archival specialists to inspect under magnification.</div>
          </div>

          <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-action="ESTIMATE">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Record as "Circa 1850" based on typical script styling</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Assigns a working approximation so the folio enters the active catalog immediately.</div>
          </div>

          <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-action="HOLD">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Hold in the pending vault until historical donor provenance is confirmed</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Waits for complete documentation before placing into public exhibition shelves.</div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="a2ConfirmBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Conservation Choice &rarr;
          </button>
        </div>
      </div>
    `;const s=document.getElementById("a2ConfirmBtn");t.querySelectorAll(".a2-opt").forEach(l=>{l.addEventListener("click",()=>{t.querySelectorAll(".a2-opt").forEach(i=>i.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40")),l.classList.add("border-[var(--accent-gold)]","bg-amber-50/40"),e=l.getAttribute("data-action"),s&&(s.disabled=!1)})}),s==null||s.addEventListener("click",()=>{a("exception_resolved",{action:e}),d({mini_game:"A2",observations_count:1,chosen_action:e})})}c()}function H(t,r,a,d){let n=!0;const e=[{id:"Q1",text:"Poet: Habba Khatoon | Era: 16th Century | Language: Kashmiri",hasError:!1},{id:"Q2",text:"Artwork: Walnut Wood Plaque | Weight: 450 Kilograms (Expected: 450 Grams)",hasError:!0},{id:"Q3",text:"Notice Date: February 31st, 2026 | Location: Hall A",hasError:!0}];function c(){var s,o;if(n){t.innerHTML=`
        <div>
          ${r("Part 3: The Exhibition Ledger","Reviewing exhibition cards for printing accuracy.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',goal:"Proofread exhibition display cards and check any that contain typographical errors.",steps:["Read through each exhibition placard text line.","Check the box next to cards that contain obvious unit or calendar errors.","Click Approve & Finish to verify the ledger."]})}
        </div>
      `,(s=document.getElementById("startActivityBtn"))==null||s.addEventListener("click",()=>{n=!1,c()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 3: The Exhibition Ledger","Proofread the 3 label cards before final printing. Check any card containing an error.")}

        <div class="space-y-4 mb-6">
          ${e.map((l,i)=>`
            <label class="flex items-start gap-3.5 p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs">
              <input type="checkbox" id="check_${l.id}" class="mt-1 accent-[#bd6f5d] w-4 h-4">
              <div>
                <div class="text-xs font-semibold text-[var(--text-primary)]">Placard ${i+1}</div>
                <div class="text-xs text-[var(--text-secondary)] font-mono mt-1">${l.text}</div>
              </div>
            </label>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="a3SubmitBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Approve & Finish &rarr;
          </button>
        </div>
      </div>
    `,(o=document.getElementById("a3SubmitBtn"))==null||o.addEventListener("click",()=>{let l=0;e.forEach(m=>{var h;(((h=document.getElementById(`check_${m.id}`))==null?void 0:h.checked)||!1)===m.hasError&&l++});const i=l/e.length;a("quality_check_completed",{accuracy:i}),d({mini_game:"A3",observations_count:e.length,accuracy:i})})}c()}function R(t,r){const{appContainer:a,miniGameIndex:d,logEvent:n,onMiniGameComplete:e}=t;switch(d){case 0:W(a,r,n,e);break;case 1:G(a,r,n,e);break;case 2:O(a,r,n,e);break}}function W(t,r,a,d){let n=!0,e=50,c=performance.now(),s=null,o=null;function l(){var L,S;if(n){t.innerHTML=`
        <div>
          ${r("Part 1: Tuning the Hall","Calibrating the soundscape for the poetry recital.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>',goal:"Dial the audio frequency into the comfortable, warm zone.",steps:["Review the acoustic feedback note from the setup team.","Drag the golden slider to soften high frequencies.","Observe the waveform until the green balance zone appears."]})}
        </div>
      `,(L=document.getElementById("startActivityBtn"))==null||L.addEventListener("click",()=>{n=!1,c=performance.now(),l()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 1: Tuning the Hall","Adjust the acoustic slider until the voice feels warm and balanced.")}

        <!-- Acoustic Dialogue Note -->
        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3 shadow-xs">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Hall Acoustic Observation</div>
            <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium mt-0.5">"The sound in the front row has a sharp treble edge. Let us soften it slightly."</div>
          </div>
        </div>

        <!-- Interactive Animated Waveform Canvas -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-inner">
          <canvas id="waveCanvas" width="600" height="90" class="w-full h-24 bg-white border border-[var(--grid-border)] mb-4 rounded-xs"></canvas>

          <div class="w-full max-w-md mx-auto">
            <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-600 inline-block"></span> Muted (0)</span>
              <span class="font-mono text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)]" id="sliderValDisplay">${e}</span>
              <span class="flex items-center gap-1">Bright (100) <span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span></span>
            </div>
            <input type="range" id="freqSlider" min="0" max="100" value="${e}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
          </div>

          <div id="toneFeedback" class="text-xs text-[var(--text-secondary)] mt-4 font-medium">
            Slide toward the left to soften the sound frequency.
          </div>
        </div>

        <div class="flex justify-end">
          <button id="lockFreqBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            Lock Acoustic Setting &rarr;
          </button>
        </div>
      </div>
    `;const i=document.getElementById("waveCanvas"),m=i==null?void 0:i.getContext("2d"),v=document.getElementById("freqSlider"),h=document.getElementById("sliderValDisplay"),g=document.getElementById("toneFeedback");let f=0;function E(){if(!m||!i)return;m.clearRect(0,0,i.width,i.height),m.strokeStyle="#f0eeea",m.lineWidth=1;for(let x=0;x<i.width;x+=30)m.beginPath(),m.moveTo(x,0),m.lineTo(x,i.height),m.stroke();m.strokeStyle="#bd6f5d",m.lineWidth=2.5,m.beginPath();const k=.015+e/100*.05,C=14+Math.abs(e-35)/50*16;for(let x=0;x<i.width;x++){const I=i.height/2+Math.sin(x*k+f)*C;x===0?m.moveTo(x,I):m.lineTo(x,I)}m.stroke(),f+=.04,o=requestAnimationFrame(E)}E(),v==null||v.addEventListener("input",k=>{e=parseInt(k.target.value),h&&(h.textContent=e),s||(s=performance.now()),g&&(Math.abs(e-35)<=10?g.innerHTML='<span class="text-emerald-700 font-semibold flex items-center justify-center gap-1">&#10003; Acoustic balance reached — warm and pleasant tone.</span>':e>35?g.textContent="Tone remains slightly sharp on highs.":g.textContent="Tone is currently subdued."),a("slider_input",{value:e})}),(S=document.getElementById("lockFreqBtn"))==null||S.addEventListener("click",()=>{o&&cancelAnimationFrame(o);const k=s?s-c:1800,C=Math.max(0,1-Math.abs(e-35)/50);a("tuning_locked",{final_value:e,latency_ms:k,accuracy:C}),d({mini_game:"F1",observations_count:1,latency_ms:k,accuracy:C})})}l()}function G(t,r,a,d){let n=!0,e=null;const c=[{id:"F2_ASK",title:"Clarify with Kindness",desc:'Ask: "Would you like the recital microphone to sound warmer or softer?"',detail:"Checks the exact preference before making audio changes."},{id:"F2_TEST",title:"Gentle Test Adjustment",desc:"Lower the bass slightly and ask if that feels more balanced.",detail:"Tries a modest change to see if it immediately solves the issue."},{id:"F2_HOLD",title:"Consult the Hall",desc:"Keep current level and invite the listeners to give live feedback.",detail:"Gathers input directly from audience members."}];function s(){var l;if(n){t.innerHTML=`
        <div>
          ${r("Part 2: The Gathering Voices","Coordinating acoustic clarity with your event colleagues.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>',goal:"Choose how to address ambiguous acoustic feedback.",steps:["Read the setup volunteer’s impression of the audio balance.","Review the three constructive communication choices.","Select the dialogue approach you would take."]})}
        </div>
      `,(l=document.getElementById("startActivityBtn"))==null||l.addEventListener("click",()=>{n=!1,s()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 2: The Gathering Voices","A team member shares an impression. Choose your approach.")}

        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Stage Volunteer</div>
            <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">"Something feels a bit off with the spoken audio in the center aisle, though I cannot pinpoint it."</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${c.map(i=>`
            <div class="f2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] hover:shadow-sm transition space-y-2" data-opt="${i.id}">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)]"></span>
                ${i.title}
              </div>
              <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${i.desc}</div>
              <div class="text-[10px] text-[var(--accent-gold)] pt-2 border-t border-[var(--grid-border)] font-medium">${i.detail}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="f2ConfirmBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Communication &rarr;
          </button>
        </div>
      </div>
    `;const o=document.getElementById("f2ConfirmBtn");t.querySelectorAll(".f2-card").forEach(i=>{i.addEventListener("click",()=>{t.querySelectorAll(".f2-card").forEach(m=>m.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40","shadow-sm")),i.classList.add("border-[var(--accent-gold)]","bg-amber-50/40","shadow-sm"),e=i.getAttribute("data-opt"),o&&(o.disabled=!1),a("dialogue_option_selected",{option:e})})}),o==null||o.addEventListener("click",()=>{a("ambiguity_resolved",{choice:e}),d({mini_game:"F2",observations_count:1,selected_option:e})})}s()}function O(t,r,a,d){let n=!0,e=50;function c(){var i,m;if(n){t.innerHTML=`
        <div>
          ${r("Part 3: The Echo of the Room","Adjusting natural reverberation for spoken poetry.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>',goal:"Adapt natural hall acoustics to ensure every recited verse carries clearly.",steps:["Notice the new venue acoustic condition notice.","Adjust the reverberation dial toward crisp vocal clarity.","Lock in the setting when the acoustic check shows green."]})}
        </div>
      `,(i=document.getElementById("startActivityBtn"))==null||i.addEventListener("click",()=>{n=!1,c()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 3: The Echo of the Room","The performance moved into the stone courtyard. Set the echo balance.")}

        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Courtyard Acoustic Note</div>
            <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">"The arched stone walls create reverberation. Bring the echo down to roughly 25%."</div>
          </div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-inner">
          <div class="w-full max-w-md mx-auto">
            <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
              <span class="font-medium text-stone-700">Direct Clarity (0%)</span>
              <span class="font-mono text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)]" id="hallValDisplay">${e}%</span>
              <span class="font-medium text-stone-700">Full Echo (100%)</span>
            </div>
            <input type="range" id="hallSlider" min="0" max="100" value="${e}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
          </div>

          <div id="hallFeedback" class="text-xs text-[var(--text-secondary)] mt-4 font-medium">
            Adjust the slider until vocal clarity is aligned.
          </div>
        </div>

        <div class="flex justify-end">
          <button id="f3LockBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Save Courtyard Setting &rarr;
          </button>
        </div>
      </div>
    `;const s=document.getElementById("hallSlider"),o=document.getElementById("hallValDisplay"),l=document.getElementById("hallFeedback");s==null||s.addEventListener("input",v=>{e=parseInt(v.target.value),o&&(o.textContent=`${e}%`),l&&(Math.abs(e-25)<=8?l.innerHTML='<span class="text-emerald-700 font-semibold">&#10003; Clear spoken poetry acoustics achieved.</span>':l.textContent=`Echo level at ${e}%.`),a("hall_slider_input",{value:e})}),(m=document.getElementById("f3LockBtn"))==null||m.addEventListener("click",()=>{const v=Math.max(0,1-Math.abs(e-25)/50);a("hall_tuning_locked",{final_value:e,accuracy:v}),d({mini_game:"F3",observations_count:1,accuracy:v})})}c()}function F(t,r){const{appContainer:a,miniGameIndex:d,logEvent:n,onMiniGameComplete:e}=t;switch(d){case 0:q(a,r,n,e);break;case 1:z(a,r,n,e);break;case 2:D(a,r,n,e);break}}function q(t,r,a,d){let n=!0,e=3;function c(){var s,o,l,i;if(n){t.innerHTML=`
        <div>
          ${r("Part 1: The Artisan's Basket","Coordinating ceramic mosaic tiles with your workshop partner.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',goal:"Distribute ceramic mosaic tiles between your station and your partner’s workbench.",steps:["Check your starting tile basket (8 tiles) and your partner’s supply (2 tiles).","Use the + / - buttons to transfer tiles to the shared basket.","Confirm your distribution when you are satisfied."]})}
        </div>
      `,(s=document.getElementById("startActivityBtn"))==null||s.addEventListener("click",()=>{n=!1,c()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 1: The Artisan's Basket","You have 8 mosaic tiles; your partner has 2. Choose how many to place into their basket.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-[var(--accent-gold)] uppercase font-semibold tracking-wider">Partner Basket</span>
              <div class="text-xl font-serif font-semibold text-[#bd6f5d] mt-1">${2+e} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(2+e).fill('<div class="w-4 h-4 bg-[#bd6f5d]/70 rounded-xs shadow-xs transition-transform hover:scale-110"></div>').join("")}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-emerald-700 uppercase font-semibold tracking-wider">Your Basket</span>
              <div class="text-xl font-serif font-semibold text-emerald-800 mt-1">${8-e} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(8-e).fill('<div class="w-4 h-4 bg-emerald-700/70 rounded-xs shadow-xs transition-transform hover:scale-110"></div>').join("")}
              </div>
            </div>
          </div>

          <div class="text-center pt-2 border-t border-[var(--grid-border)]">
            <div class="text-xs text-[var(--text-secondary)] mb-3 font-medium">Tiles transferred to partner's workstation:</div>
            <div class="flex justify-center items-center gap-4">
              <button id="minusTileBtn" class="w-10 h-10 rounded bg-white border border-[var(--grid-border)] text-lg font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs">-</button>
              <span id="transferCount" class="font-serif text-3xl font-semibold text-[var(--accent-gold)] w-10 text-center">${e}</span>
              <button id="plusTileBtn" class="w-10 h-10 rounded bg-white border border-[var(--grid-border)] text-lg font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs">+</button>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmTransferBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Confirm Basket Sharing &rarr;
          </button>
        </div>
      </div>
    `,(o=document.getElementById("minusTileBtn"))==null||o.addEventListener("click",()=>{e>0&&(e--,c())}),(l=document.getElementById("plusTileBtn"))==null||l.addEventListener("click",()=>{e<6&&(e++,c())}),(i=document.getElementById("confirmTransferBtn"))==null||i.addEventListener("click",()=>{a("resource_transfer_confirmed",{shared_amount:e}),d({mini_game:"C1",observations_count:1,sharing_index:e/6})})}c()}function z(t,r,a,d){let n=!0,e=null;const c=[{id:"SLOT_TOP",label:"Upper Center Slot"},{id:"SLOT_RIGHT",label:"Right Center Slot (Even Spacing)"},{id:"SLOT_BOTTOM",label:"Lower Right Corner"}];function s(){var o,l;if(n){t.innerHTML=`
        <div>
          ${r("Part 2: The Gallery Wall","Coordinating artwork spacing across the central exhibition wall.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>',goal:"Select a placement slot on the wall that balances with your colleague’s hung piece.",steps:["Observe the position of the existing painting on the left wall.","Inspect the 3 available wall hanging slots.","Click on your preferred wall slot and confirm placement."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{n=!1,s()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 2: The Gallery Wall","Your partner hung their artwork on the left wall. Choose a slot for your piece.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs">
          <div class="w-full h-52 bg-white border border-[var(--grid-border)] relative flex items-center justify-between p-6 rounded-xs shadow-inner">
            <!-- Partner Artwork -->
            <div class="w-32 h-36 bg-amber-50 border-2 border-[var(--accent-gold)] flex flex-col items-center justify-center p-3 text-center shadow-xs">
              <svg class="w-6 h-6 text-[var(--accent-gold)] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span class="text-[10px] uppercase font-bold text-[var(--accent-gold)]">Partner Painting</span>
              <span class="text-[9px] text-[var(--text-secondary)] italic mt-0.5">"Chinar at Twilight"</span>
            </div>

            <!-- Wall Slot Options -->
            <div class="flex flex-col gap-2.5">
              ${c.map(i=>`
                <button class="slot-btn px-4 py-2.5 text-xs border ${e===i.id?"border-[var(--accent-gold)] bg-amber-50 font-semibold shadow-xs":"border-dashed border-[var(--grid-border)] bg-transparent hover:border-solid hover:border-[var(--text-primary)]"} transition flex items-center gap-2" data-slot="${i.id}">
                  <span class="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px]">${e===i.id?"✓":"+"}</span>
                  ${e===i.id?`Your Art Positioned: ${i.label}`:`Hang at ${i.label}`}
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmWallBtn" ${e?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Wall Placement &rarr;
          </button>
        </div>
      </div>
    `,t.querySelectorAll(".slot-btn").forEach(i=>{i.addEventListener("click",()=>{e=i.getAttribute("data-slot"),a("wall_slot_selected",{slot:e}),s()})}),(l=document.getElementById("confirmWallBtn"))==null||l.addEventListener("click",()=>{a("wall_coordination_complete",{chosen_slot:e}),d({mini_game:"C2",observations_count:1,slot:e})})}s()}function D(t,r,a,d){let n=!0,e=5,c=5;function s(){var o,l,i;if(n){t.innerHTML=`
        <div>
          ${r("Part 3: The Dual Lanterns","Sharing spotlight lanterns between both exhibition pavilions.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',goal:"Balance the 10 available warm spotlight lanterns between Gallery Room A and Room B.",steps:["Review the current lighting allotment across both halls.","Slide the balance bar to assign spotlights where needed.","Click Finish to confirm the lighting arrangement."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{n=!1,s()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 3: The Dual Lanterns","10 spotlight lanterns are shared between Room A and Room B. Adjust the balance.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-xs text-[var(--text-secondary)] uppercase font-semibold tracking-wider">Room A (Partner Gallery)</span>
              <div class="text-2xl font-serif font-bold text-[var(--accent-gold)] mt-1">${e} Lanterns</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap">
                ${Array(e).fill('<div class="w-3.5 h-3.5 bg-amber-400 rounded-full shadow-xs"></div>').join("")}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-xs text-[var(--text-secondary)] uppercase font-semibold tracking-wider">Room B (Your Gallery)</span>
              <div class="text-2xl font-serif font-bold text-[var(--accent-gold)] mt-1">${c} Lanterns</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap">
                ${Array(c).fill('<div class="w-3.5 h-3.5 bg-amber-400 rounded-full shadow-xs"></div>').join("")}
              </div>
            </div>
          </div>

          <div class="w-full max-w-md mx-auto text-center pt-2">
            <input type="range" id="lightSlider" min="1" max="9" value="${e}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
            <div class="flex justify-between text-[11px] text-[var(--text-secondary)] mt-2 font-medium">
              <span>More to Room A</span>
              <span class="text-[var(--accent-gold)] font-semibold">Equal Balance (5 / 5)</span>
              <span>More to Room B</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmLightBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Lock Lantern Arrangement &rarr;
          </button>
        </div>
      </div>
    `,(l=document.getElementById("lightSlider"))==null||l.addEventListener("input",m=>{e=parseInt(m.target.value),c=10-e,s()}),(i=document.getElementById("confirmLightBtn"))==null||i.addEventListener("click",()=>{a("light_balance_confirmed",{partner_lights:e,my_lights:c}),d({mini_game:"C3",observations_count:1,partner_lights:e,my_lights:c})})}s()}function V(t,r){const{appContainer:a,miniGameIndex:d,logEvent:n,onMiniGameComplete:e}=t;switch(d){case 0:N(a,r,n,e);break;case 1:Q(a,r,n,e);break;case 2:K(a,r,n,e);break}}function N(t,r,a,d){let n=!0;const e=[{id:"C1",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{id:"C2",color:"Sage",shape:"Square",icon:"&#9632;",label:"Sage Square"},{id:"C3",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{id:"C4",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{id:"C5",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{id:"C6",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"}];let c=0,s=0;function o(){var m;if(n){t.innerHTML=`
        <div>
          ${r("Part 1: The Ceramic Mosaic","Sorting geometric tiles under changing design requirements.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>',goal:"Sort each geometric tile into the correct bin based on the active sorting rule badge.",steps:["Check the active sorting rule badge at the top (e.g. Color or Shape).","Observe the tile presented in the center stage.","Click the matching target bin to place the tile."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{n=!1,o()});return}if(c>=e.length){const v=s/e.length;d({mini_game:"E1",observations_count:e.length,accuracy:v});return}const l=e[c],i=c<3?"Match by Color":"Match by Shape";t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 1: The Ceramic Mosaic","Sort each tile into the matching container according to the active rule.")}

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            Tile ${c+1} of ${e.length}
          </span>
          <span class="text-xs font-semibold px-3 py-1 bg-amber-50 text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 shadow-xs flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Active Rule: ${i}
          </span>
        </div>

        <!-- Current Card Display -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="text-5xl mb-2.5 transition-transform hover:scale-105 ${l.color==="Gold"?"text-[var(--accent-gold)]":"text-emerald-700"}">
            ${l.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${l.label}</div>
        </div>

        <!-- Target Bins -->
        <div class="grid grid-cols-2 gap-4">
          ${c<3?`
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs" data-choice="Gold">
              <span class="text-xs font-semibold text-[var(--accent-gold)] block">Container 1: Gold Items</span>
            </button>
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs" data-choice="Sage">
              <span class="text-xs font-semibold text-emerald-800 block">Container 2: Sage Items</span>
            </button>
          `:`
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs" data-choice="Circle">
              <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 1: Circles (&#9679;)</span>
            </button>
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs" data-choice="Square">
              <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 2: Squares (&#9632;)</span>
            </button>
          `}
        </div>
      </div>
    `,a("card_presented",{card_id:l.id,rule:i}),t.querySelectorAll(".bin-btn").forEach(v=>{v.addEventListener("click",()=>{const h=v.getAttribute("data-choice");let g=!1;c<3?g=h===l.color:g=h===l.shape,g&&s++,a("card_sorted",{card_id:l.id,choice:h,is_correct:g}),c++,o()})})}o()}function Q(t,r,a,d){let n=!0,e=null;function c(){var o;if(n){t.innerHTML=`
        <div>
          ${r("Part 2: The Unexpected Guest","Responding calmly to mid-task courtyard changes.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',goal:"Choose how to handle an unexpected visitor or outdoor change while setting up.",steps:["Read the situation update from the gallery entrance.","Evaluate the 3 calm, constructive coordination responses.","Select your preferred response."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{n=!1,c()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 2: The Unexpected Guest","A sudden gust in the courtyard tipped the welcome easel. Choose your response.")}

        <div class="p-4 bg-amber-50/80 border border-amber-300 rounded-sm mb-6 flex items-start gap-3 shadow-xs">
          <div class="w-9 h-9 rounded-full bg-amber-200 border border-amber-400 flex items-center justify-center text-amber-900 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] font-bold text-[#bd6f5d] uppercase tracking-wider">Courtyard Notice</div>
            <div class="text-xs text-[var(--text-primary)] mt-0.5 leading-relaxed">
              "A sudden breeze tipped over the welcome board in the courtyard. Signs are displaced."
            </div>
          </div>
        </div>

        <div class="space-y-3 mb-6">
          <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-opt="QUICK_FIX">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Step out for 2 minutes to secure the easel with a stone weight, then return</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Resolves the outdoor entrance quickly before continuing indoor preparation.</div>
          </div>

          <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-opt="ASK_TEAM">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Check if a courtyard volunteer is already stationed outside to adjust it</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Coordinates with outdoor colleagues without breaking your current momentum.</div>
          </div>

          <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-opt="FINISH_FIRST">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Complete your current indoor setup task first, then reset the outer board</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Ensures the critical indoor checklist stays on schedule before attending to the yard.</div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="e2ConfirmBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Action Choice &rarr;
          </button>
        </div>
      </div>
    `;const s=document.getElementById("e2ConfirmBtn");t.querySelectorAll(".e2-card").forEach(l=>{l.addEventListener("click",()=>{t.querySelectorAll(".e2-card").forEach(i=>i.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40")),l.classList.add("border-[var(--accent-gold)]","bg-amber-50/40"),e=l.getAttribute("data-opt"),s&&(s.disabled=!1)})}),s==null||s.addEventListener("click",()=>{a("interruption_handled",{action:e}),d({mini_game:"E2",observations_count:1,action:e})})}c()}function K(t,r,a,d){let n=!0,e=null;const c=[{id:"T1",label:"Geometric Diamond",desc:"Symmetrical diagonal motifs that complement straight wooden borders."},{id:"T2",label:"Flowing Wave Motif",desc:"Curved lines that soften angular architectural lines in the room."},{id:"T3",label:"Minimalist Dot Grid",desc:"Quiet, unadorned spacing that leaves breathing room for the artwork."}];function s(){var l;if(n){t.innerHTML=`
        <div>
          ${r("Part 3: The Geometric Harmony","Balancing visual motifs for the central gallery floor mat.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>',goal:"Select the geometric decorative motif that establishes aesthetic harmony in the center hall.",steps:["Examine the 3 decorative tile patterns.","Choose the motif that best suits the gathering hall ambience.","Click to confirm your selection."]})}
        </div>
      `,(l=document.getElementById("startActivityBtn"))==null||l.addEventListener("click",()=>{n=!1,s()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 3: The Geometric Harmony","Choose the tile motif that best balances the central gallery aesthetic.")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${c.map(i=>`
            <div class="e3-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition text-center space-y-2.5 shadow-xs" data-tile="${i.id}">
              <div class="w-12 h-12 mx-auto bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center font-serif text-xl text-[var(--accent-gold)] rounded-xs">
                &#10022;
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${i.label}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${i.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="e3ConfirmBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Motif & Finish &rarr;
          </button>
        </div>
      </div>
    `;const o=document.getElementById("e3ConfirmBtn");t.querySelectorAll(".e3-card").forEach(i=>{i.addEventListener("click",()=>{t.querySelectorAll(".e3-card").forEach(m=>m.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40")),i.classList.add("border-[var(--accent-gold)]","bg-amber-50/40"),e=i.getAttribute("data-tile"),o&&(o.disabled=!1)})}),o==null||o.addEventListener("click",()=>{a("pattern_selected",{tile:e}),d({mini_game:"E3",observations_count:1,tile:e})})}s()}function U(t,r){const{appContainer:a,miniGameIndex:d,logEvent:n,onMiniGameComplete:e}=t;switch(d){case 0:J(a,r,n,e);break;case 1:Y(a,r,n,e);break;case 2:X(a,r,n,e);break}}function J(t,r,a,d){let n=!0,e=0;const c=[{id:"ALC_1",title:"Chamber I: Mineral Pigments",text:"Shows how blue lapis lazuli and gold leaf were ground by hand to create vibrant border illuminations in ancient Srinagar."},{id:"ALC_2",title:"Chamber II: Koshur Paper",text:"Explains how traditional Kashmiri rag paper (Koshur Kagaz) is made from hemp pulp and burnished with smooth agate stone."},{id:"ALC_3",title:"Chamber III: Oral Verse Metres",text:"Details how classical Sufi poetry metres were sung aloud across courtyards to remember rhymes before printing existed."}];let s={};function o(){var l,i;if(n){t.innerHTML=`
        <div>
          ${r("Part 1: The Three Chambers","Exploring optional historical side chambers across the courtyard.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',goal:"Visit side chambers to learn about historical craft traditions, or proceed directly.",steps:["Click any side chamber card to uncover its archival story.","Read the historical technique recorded by the collective.","Proceed when you are ready."]})}
        </div>
      `,(l=document.getElementById("startActivityBtn"))==null||l.addEventListener("click",()=>{n=!1,o()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 1: The Three Chambers","Walk through the courtyard. Click any side chamber to read its craft story.")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${c.map(m=>`
            <div class="p-4 bg-white border ${s[m.id]?"border-emerald-600 bg-emerald-50/30 shadow-xs":"border-[var(--grid-border)] shadow-xs"} text-center space-y-2 rounded-xs">
              <span class="text-[10px] uppercase font-bold text-[var(--accent-gold)] tracking-wider">Archival Chamber</span>
              <h3 class="text-xs font-serif font-semibold text-[var(--text-primary)]">${m.title}</h3>
              <button class="alc-btn px-3 py-1.5 text-xs border border-[var(--grid-border)] bg-[#faf8f5] hover:border-[var(--accent-gold)] hover:bg-white transition w-full shadow-xs" data-id="${m.id}">
                ${s[m.id]?"✓ Read Narrative":"Inspect Chamber"}
              </button>
            </div>
          `).join("")}
        </div>

        <div id="storyBox" class="hidden p-4 mb-6 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] leading-relaxed shadow-xs rounded-xs"></div>

        <div class="flex justify-between items-center pt-2">
          <span class="text-xs text-[var(--text-secondary)] font-medium">${e} of 3 chambers visited</span>
          <button id="exitGalleryBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Proceed Ahead &rarr;
          </button>
        </div>
      </div>
    `,t.querySelectorAll(".alc-btn").forEach(m=>{m.addEventListener("click",()=>{const v=m.getAttribute("data-id"),h=c.find(f=>f.id===v);s[v]||(s[v]=!0,e++);const g=document.getElementById("storyBox");g&&h&&(g.classList.remove("hidden"),g.innerHTML=`<strong>${h.title}:</strong> ${h.text}`),a("alcove_read",{alcove_id:v}),o()})}),(i=document.getElementById("exitGalleryBtn"))==null||i.addEventListener("click",()=>{a("gallery_walk_finished",{explored:e}),d({mini_game:"Q1",observations_count:1,exploration_rate:e/3})})}o()}function Y(t,r,a,d){let n=!0,e=0;const c=[{id:"C_PIGMENT",name:"Pigment Inspection",detail:"The red ink uses pure saffron flower pigment, common in mid-19th century regional manuscripts."},{id:"C_WOOD",name:"Backing Frame",detail:"The backing board is carved from seasoned Himalayan cedar with hand-forged iron nails."},{id:"C_SEAL",name:"Seal Impression",detail:"A faint circular wax seal in the lower corner bears the mark of a historic Srinagar bookbinder."}];let s={};function o(){var l,i;if(n){t.innerHTML=`
        <div>
          ${r("Part 2: The Uncataloged Seal","Investigating provenance details of an anonymous illuminated border.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',goal:"Click on archaeological clue cards to inspect physical attributes of the folio.",steps:["Examine the uncataloged border manuscript card.","Click each clue card to inspect ink, wood, and wax marks.","Click Finish Investigation when done."]})}
        </div>
      `,(l=document.getElementById("startActivityBtn"))==null||l.addEventListener("click",()=>{n=!1,o()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 2: The Uncataloged Seal","An unsigned artwork arrived at the collection. Click clue cards to inspect details.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <span class="text-[10px] tracking-widest text-[var(--accent-gold)] uppercase font-semibold">Uncataloged Acquisition</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-2 font-medium">Illuminated Manuscript Border (Item #402)</h3>
          <p class="text-xs text-[var(--text-secondary)]">Click any clue below to uncover archival details.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          ${c.map(m=>`
            <div class="p-4 bg-white border ${s[m.id]?"border-[var(--accent-gold)] bg-amber-50/30 shadow-xs":"border-[var(--grid-border)]"} text-center space-y-2 cursor-pointer clue-card rounded-xs transition hover:border-[var(--accent-gold)]" data-id="${m.id}">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                ${m.name}
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${s[m.id]?m.detail:"Click to inspect clue..."}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)] font-medium">${e} of 3 clues examined</span>
          <button id="finishCluesBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Finish Inspection &rarr;
          </button>
        </div>
      </div>
    `,t.querySelectorAll(".clue-card").forEach(m=>{m.addEventListener("click",()=>{const v=m.getAttribute("data-id");s[v]||(s[v]=!0,e++,a("clue_inspected",{clue_id:v}),o())})}),(i=document.getElementById("finishCluesBtn"))==null||i.addEventListener("click",()=>{a("investigation_completed",{clues_read:e}),d({mini_game:"Q2",observations_count:1,clues_read:e})})}o()}function X(t,r,a,d){let n=!0,e=null;const c=[{id:"M_PROJECTION",title:"Poetry & Light Projection",desc:"Projecting animated Kashmiri and Urdu verses onto white lime plaster walls."},{id:"M_SOUND",title:"Acoustic Soundscapes",desc:"Recording sounds of mountain streams, wooden looms, and courtyard birds alongside poetry."},{id:"M_TEXTILE",title:"Embroidered Wall Hangings",desc:"Partnering with local master weavers to embroider literary couplets into woven pashmina."}];function s(){var l;if(n){t.innerHTML=`
        <div>
          ${r("Part 3: The Weaver's Chronicle","Selecting an expressive creative medium for upcoming exhibitions.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>',goal:"Choose which cultural format you would find most inspiring to curate.",steps:["Review the 3 proposed experimental exhibition formats.","Select the artistic medium you are most drawn to explore.","Confirm your choice to complete the courtyard discovery."]})}
        </div>
      `,(l=document.getElementById("startActivityBtn"))==null||l.addEventListener("click",()=>{n=!1,s()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 3: The Weaver's Chronicle","Which upcoming experimental showcase format would you be most curious to help create?")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${c.map(i=>`
            <div class="med-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2.5 text-center shadow-xs rounded-xs" data-id="${i.id}">
              <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] font-serif text-lg">
                &#10023;
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${i.title}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${i.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="q3FinishBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Selection &rarr;
          </button>
        </div>
      </div>
    `;const o=document.getElementById("q3FinishBtn");t.querySelectorAll(".med-card").forEach(i=>{i.addEventListener("click",()=>{t.querySelectorAll(".med-card").forEach(m=>m.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40")),i.classList.add("border-[var(--accent-gold)]","bg-amber-50/40"),e=i.getAttribute("data-id"),o&&(o.disabled=!1)})}),o==null||o.addEventListener("click",()=>{a("medium_selected",{medium:e}),d({mini_game:"Q3",observations_count:1,medium:e})})}s()}function Z(t,r){const{appContainer:a,miniGameIndex:d,logEvent:n,onMiniGameComplete:e}=t;switch(d){case 0:ee(a,r,n,e);break;case 1:te(a,r,n,e);break;case 2:re(a,r,n,e);break}}function ee(t,r,a,d){let n=!0,e=["Twisted Hemp Cord","Steel Hanging Ring"];const c=[{id:"T_HEMP",name:"Twisted Hemp Cord",icon:"&#129526;"},{id:"T_BRASS",name:"Brass Chain Link",icon:"&#128279;"},{id:"T_CLIP",name:"Carved Walnut Clip",icon:"&#128206;"},{id:"T_RING",name:"Steel Hanging Ring",icon:"&#9711;"}];function s(){var o,l;if(n){t.innerHTML=`
        <div>
          ${r("Part 1: The Artisan's Cord","Assembling a custom mount for hanging an exhibition frame.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',goal:"Select at least 2 workbench items to assemble a durable frame mount.",steps:["Examine the workshop table supplies (cord, chain, clip, ring).","Click to combine at least 2 materials into your mounting rig.","Click Test Mount Stability to verify the assembly."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{n=!1,s()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 1: The Artisan's Cord","Standard wire is unavailable. Pick at least 2 items to build a stable mount.")}

        <!-- Interactive Workbench Preview -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <div class="w-full h-36 bg-white border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative mb-4 rounded-xs shadow-inner">
            <div class="w-28 h-20 bg-amber-50 border-2 border-[var(--accent-gold)] flex items-center justify-center text-[10px] uppercase font-bold text-[var(--accent-gold)] shadow-xs">
              Art Frame
            </div>
            <div class="text-xs text-[var(--text-secondary)] mt-2 font-medium">
              Rig Configuration: ${e.length>0?`<strong class="text-emerald-800 font-semibold">${e.join(" + ")}</strong>`:"No workshop materials connected."}
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            ${c.map(i=>`
              <button class="tool-btn p-3 bg-white border ${e.includes(i.name)?"border-[var(--accent-gold)] bg-amber-50/50 font-semibold shadow-xs":"border-[var(--grid-border)]"} text-xs hover:border-[var(--accent-gold)] transition text-center rounded-xs" data-name="${i.name}">
                <div class="text-2xl mb-1.5">${i.icon}</div>
                <div class="text-[11px] text-[var(--text-primary)]">${i.name}</div>
              </button>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)] font-medium">${e.length} materials selected</span>
          <button id="testMountBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Test Mount Stability &rarr;
          </button>
        </div>
      </div>
    `,t.querySelectorAll(".tool-btn").forEach(i=>{i.addEventListener("click",()=>{const m=i.getAttribute("data-name");e.includes(m)?e.length>1&&(e=e.filter(v=>v!==m)):e.push(m),a("material_toggled",{material:m,current_selection:e}),s()})}),(l=document.getElementById("testMountBtn"))==null||l.addEventListener("click",()=>{a("mount_built",{materials:e}),d({mini_game:"CR1",observations_count:1,materials_used:e.length})})}s()}function te(t,r,a,d){let n=!0,e="S_360";const c=[{id:"S_360",title:"360° Wrap Display",desc:"Hang miniature framed poetry on all four faces of the stone pillar for a 360° walking gallery."},{id:"S_SHADOW",title:"Ambient Light Backdrop",desc:"Position warm ground lamps toward the pillar to cast atmospheric silhouettes for surrounding work."},{id:"S_SEAT",title:"Literary Reading Nook",desc:"Arrange low wooden seating and poetry anthologies around the pillar base for quiet reflection."}];function s(){var o,l;if(n){t.innerHTML=`
        <div>
          ${r("Part 2: The Central Pillar","Transforming a central architectural column into an exhibition feature.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',goal:"Select a creative layout concept to incorporate the center hall column into the event.",steps:["Review the 3 space curation ideas.","Choose the concept that creates the most welcoming guest experience.","Confirm your design."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{n=!1,s()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 2: The Central Pillar","A wide stone column sits in the hall center. Choose how to make it part of the exhibition.")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${c.map(i=>`
            <div class="cr2-card p-5 bg-white border ${e===i.id?"border-[var(--accent-gold)] bg-amber-50/40 font-semibold shadow-xs":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2.5 text-center shadow-xs rounded-xs" data-id="${i.id}">
              <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] font-serif text-lg">
                &#10038;
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${i.title}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${i.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="cr2ConfirmBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Confirm Space Concept &rarr;
          </button>
        </div>
      </div>
    `,t.querySelectorAll(".cr2-card").forEach(i=>{i.addEventListener("click",()=>{e=i.getAttribute("data-id"),s()})}),(l=document.getElementById("cr2ConfirmBtn"))==null||l.addEventListener("click",()=>{a("pillar_solution_selected",{solution:e}),d({mini_game:"CR2",observations_count:1,solution:e})})}s()}function re(t,r,a,d){let n=!0,e="P_MINIMAL";const c=[{id:"P_MINIMAL",title:"Serene Minimalist",desc:"Spacious parchment backdrop highlighting a single handwritten verse in classical calligraphy."},{id:"P_CLASSIC",title:"Heritage Floral Border",desc:"Hand-drawn Chinar leaf border framing event details with warmth and historical resonance."},{id:"P_MODERN",title:"Warm Terracotta Split",desc:"Earthy terracotta wash on one half, structured typography on the other for high readability."}];function s(){var o,l;if(n){t.innerHTML=`
        <div>
          ${r("Part 3: The Printed Motif","Selecting visual invitation aesthetics for the exhibition announcement.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',goal:"Choose the visual card aesthetic that best reflects the collective’s creative tone.",steps:["Compare the 3 visual layout previews.","Select the invitation style you find most fitting.","Click Finish to conclude the workshop session."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{n=!1,s()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 3: The Printed Motif","Choose which visual style best communicates the spirit of the upcoming gathering.")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${c.map(i=>`
            <div class="cr3-card p-5 bg-white border ${e===i.id?"border-[var(--accent-gold)] bg-amber-50/40 font-semibold shadow-xs":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2.5 text-center shadow-xs rounded-xs" data-id="${i.id}">
              <div class="w-full h-24 bg-[#faf8f5] border border-[var(--grid-border)] flex flex-col items-center justify-center font-serif text-xs text-[var(--accent-gold)] mb-2 rounded-xs">
                <span class="text-xs uppercase font-medium tracking-wider">[Card Style]</span>
                <span class="text-[11px] text-[var(--text-secondary)] italic mt-1">${i.title}</span>
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${i.title}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${i.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="cr3FinishBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Confirm Style Choice &rarr;
          </button>
        </div>
      </div>
    `,t.querySelectorAll(".cr3-card").forEach(i=>{i.addEventListener("click",()=>{e=i.getAttribute("data-id"),s()})}),(l=document.getElementById("cr3FinishBtn"))==null||l.addEventListener("click",()=>{a("poster_style_selected",{style:e}),d({mini_game:"CR3",observations_count:1,style:e})})}s()}function ae(t,r){const{appContainer:a,miniGameIndex:d,logEvent:n,onMiniGameComplete:e}=t;switch(d){case 0:ie(a,r,n,e);break;case 1:ne(a,r,n,e);break;case 2:se(a,r,n,e);break}}function ie(t,r,a,d){let n=!0;const e=[{id:"INV_1",recipient:"Senior Calligrapher — Master Ghulam"},{id:"INV_2",recipient:"Community Youth Art Collective"},{id:"INV_3",recipient:"Regional Heritage Conservation Trust"}];let c=0,s=[],o=performance.now();function l(){var m,v;if(n){t.innerHTML=`
        <div>
          ${r("Part 1: The Wax Seal","Sealing formal event invitations for visiting artists and guests.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',goal:"Apply the warm terracotta wax seal to each of the 3 handmade invitation envelopes.",steps:["Review the named recipient on the handcrafted envelope.","Click the Apply Wax Seal button to press the seal.","Complete all 3 invitations to proceed."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{n=!1,o=performance.now(),l()});return}if(c>=e.length){const h=s.reduce((g,f)=>g+f,0)/s.length;d({mini_game:"M1",observations_count:e.length,avg_latency_ms:h});return}const i=e[c];o=performance.now(),t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 1: The Wax Seal","Apply the collective seal stamp to each of the 3 formal invitation envelopes.")}

        <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
          Envelope ${c+1} of ${e.length}
        </div>

        <!-- Interactive Envelope Preview -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <div class="w-full max-w-sm mx-auto h-40 bg-amber-50/70 border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative shadow-sm rounded-xs">
            <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Ceremonial Invitation</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1.5">${i.recipient}</div>
            
            <div id="sealDisplay" class="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-[10px] text-[var(--accent-gold)] font-bold shadow-xs">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <button id="stampBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Press Wax Seal &rarr;
          </button>
        </div>
      </div>
    `,a("invitation_presented",{inv_id:i.id}),(v=document.getElementById("stampBtn"))==null||v.addEventListener("click",()=>{const h=performance.now()-o;s.push(h),a("envelope_stamped",{inv_id:i.id,dwell_ms:h}),c++,l()})}l()}function ne(t,r,a,d){let n=!0,e=0;const c=3;function s(){var o,l,i;if(n){t.innerHTML=`
        <div>
          ${r("Part 2: The Courtesy Sleeves","Preparing optional extra guest invitation folios.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',goal:"Optionally stamp additional courtesy sleeves for community elders and artisans, or conclude whenever you like.",steps:["The mandatory 3 invitations are already sealed.","Click + Seal Extra Sleeve if you choose to prepare more.","Click Proceed when you are ready."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{n=!1,s()});return}t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 2: The Courtesy Sleeves","The required invitations are complete. 3 voluntary courtesy sleeves remain on the table.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <div class="text-sm font-serif text-[var(--text-primary)] mb-1.5 font-medium">
            Optional Courtesy Sleeves Available
          </div>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto mb-4 leading-relaxed">
            You may stamp additional invitations for visiting youth guilds, or proceed at any time.
          </p>

          <div class="text-lg font-serif font-bold text-[var(--accent-gold)] mb-4">
            ${e} of ${c} Extra Sleeves Sealed
          </div>

          <div class="flex justify-center gap-4">
            ${e<c?`
              <button id="stampExtraBtn" class="px-6 py-2.5 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-wider hover:bg-amber-50 transition shadow-xs flex items-center gap-1.5">
                + Seal Extra Courtesy Sleeve
              </button>
            `:'<span class="text-xs text-emerald-700 font-semibold flex items-center gap-1">&#10003; All optional sleeves sealed.</span>'}
          </div>
        </div>

        <div class="flex justify-end">
          <button id="finishM2Btn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Proceed to Final Check &rarr;
          </button>
        </div>
      </div>
    `,(l=document.getElementById("stampExtraBtn"))==null||l.addEventListener("click",()=>{e++,a("optional_envelope_stamped",{count:e}),s()}),(i=document.getElementById("finishM2Btn"))==null||i.addEventListener("click",()=>{a("optional_stamping_done",{total_extra:e}),d({mini_game:"M2",observations_count:1,optional_completed:e})})}s()}function se(t,r,a,d){let n=!0;const e=[{id:"T_LIGHTS",name:"Turn on Warm Gallery Spotlights and Lanterns"},{id:"T_PAMPHLETS",name:"Arrange Urdu & Kashmiri Poetry Guides on Welcome Stand"},{id:"T_FLOWERS",name:"Place Fresh Jasmine Petals at the Courtyard Entrance Urn"}];let c={T_LIGHTS:!0,T_PAMPHLETS:!0,T_FLOWERS:!0};function s(){var l,i;if(n){t.innerHTML=`
        <div>
          ${r("Part 3: The Evening Threshold","Final 3-point exhibition readiness inspection before guests arrive.")}
          ${p({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>',goal:"Verify the 3 gallery readiness checkpoints to prepare the hall for evening arrival.",steps:["Check each gallery preparation item (lighting, guides, floral welcome).","Verify all 3 items to complete the ritual.","Click Finalize Assessment to submit your session."]})}
        </div>
      `,(l=document.getElementById("startActivityBtn"))==null||l.addEventListener("click",()=>{n=!1,s()});return}const o=Object.values(c).filter(Boolean).length;t.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 3: The Evening Threshold","Verify the final 3-point checklist to make the gallery ready for evening guests.")}

        <div class="space-y-3 mb-6">
          ${e.map((m,v)=>`
            <label class="flex items-center gap-3.5 p-4 bg-white border ${c[m.id]?"border-emerald-600 bg-emerald-50/30 shadow-xs":"border-[var(--grid-border)] shadow-xs"} cursor-pointer hover:border-[var(--accent-gold)] transition rounded-xs">
              <input type="checkbox" id="task_${m.id}" ${c[m.id]?"checked":""} class="accent-[#bd6f5d] w-4 h-4">
              <span class="text-xs font-medium text-[var(--text-primary)]">${v+1}. ${m.name}</span>
            </label>
          `).join("")}
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)] font-medium">${o} of 3 checkpoints verified</span>
          <button id="m3FinishBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            Finalize Assessment &rarr;
          </button>
        </div>
      </div>
    `,e.forEach(m=>{var v;(v=document.getElementById(`task_${m.id}`))==null||v.addEventListener("change",h=>{c[m.id]=h.target.checked,a("readiness_task_toggled",{task_id:m.id,checked:h.target.checked}),s()})}),(i=document.getElementById("m3FinishBtn"))==null||i.addEventListener("click",()=>{const m=Object.values(c).filter(Boolean).length/e.length;a("gallery_readiness_complete",{readiness_score:m}),d({mini_game:"M3",observations_count:e.length,readiness_score:m})})}s()}const oe={W1:{name:"The Soundscape",name_ur:"تعدد",subtitle:"Acoustics & Dialogue"},W2:{name:"The Living Archive",name_ur:"دستاویز",subtitle:"Manuscripts & Preservation"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ نقش",subtitle:"Artisan Workshop"},W4:{name:"The Shifting Patterns",name_ur:"متغیر گرڈ",subtitle:"Mosaic & Rhythm"},W5:{name:"The Hidden Courtyard",name_ur:"نہاں خانہ",subtitle:"Exhibition Discovery"},W6:{name:"The Workshop Bench",name_ur:"شکستہ آلہ",subtitle:"Material Assembly"},W7:{name:"The Final Gathering",name_ur:"تکرار",subtitle:"Readiness & Ceremony"}};function p({icon:t,goal:r,steps:a,onStart:d}){return`
    <div class="tutorial-card p-6 border border-[var(--accent-gold)] bg-gradient-to-br from-[#faf8f5] to-[#f5efe8] space-y-4 mb-6 transition-all duration-300">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-amber-100/80 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)]">
          ${t||'<i data-lucide="compass" class="w-5 h-5"></i>'}
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-medium">Activity Guide · طریقہ کار</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] font-semibold">${r}</h3>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        ${a.map((n,e)=>`
          <div class="bg-white/80 border border-[var(--grid-border)] p-3 flex items-start gap-2.5">
            <span class="w-5 h-5 rounded-full bg-[var(--accent-gold)] text-white text-[10px] flex items-center justify-center font-serif shrink-0 mt-0.5">${e+1}</span>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">${n}</div>
          </div>
        `).join("")}
      </div>

      <div class="pt-2 flex justify-end">
        <button id="startActivityBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition flex items-center gap-2">
          Begin Activity &rarr;
        </button>
      </div>
    </div>
  `}function de(t){const{appContainer:r,worldCode:a,worldIndex:d,miniGameIndex:n,onMiniGameComplete:e}=t,c=oe[a]||{name:"Alfaaz Workshop",name_ur:""},s=(o,l)=>`
    <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${d+1} of 7: ${c.name}</span>
          <span class="font-serif text-lg text-[var(--text-secondary)]" style="direction: rtl;">${c.name_ur}</span>
        </div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">${o}</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">${l}</p>
      </div>
      <div class="text-right">
        <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Part ${n+1} of 3</span>
      </div>
    </div>
  `;switch(a){case"W1":R(t,s);break;case"W2":$(t,s);break;case"W3":F(t,s);break;case"W4":V(t,s);break;case"W5":U(t,s);break;case"W6":Z(t,s);break;case"W7":ae(t,s);break;default:e&&e({});break}}let u={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1};async function y(t,r={}){if(window.globalApiFetch)return await window.globalApiFetch(t,r);const a=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",d={"Content-Type":"application/json",...r.headers||{}};return fetch(`${a}${t}`,{...r,headers:d})}function b(t,r,a={},d={},n="mouse",e=null,c=null){const s=performance.now(),o={seq:u.seq++,segment_id:u.segmentId,t_ms:s,screen:t,game_world:u.worldSequence[u.currentWorldIndex]||null,mini_game:e,trial:c,action:r,input_type:n,state:d,data:a};u.telemetryQueue.push(o),(u.telemetryQueue.length>=10||r==="minigame_end"||r==="sjt_complete")&&T()}async function T(){if(!u.sessionId||u.telemetryQueue.length===0)return;const t=[...u.telemetryQueue];u.telemetryQueue=[];try{await y("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:u.sessionId,events:t})})}catch(r){console.warn("[Telemetry] Flush failed, re-queuing:",r),u.telemetryQueue=[...t,...u.telemetryQueue]}}window.addEventListener("beforeunload",()=>{if(u.sessionId&&u.telemetryQueue.length>0){const t=window.ALFAAZ_API_URL||"",r=JSON.stringify({session_id:u.sessionId,events:u.telemetryQueue});navigator.sendBeacon(`${t}/recruit/telemetry`,r)}});document.addEventListener("visibilitychange",()=>{document.hidden?b(u.screen,"visibility_hidden",{timestamp:Date.now()}):b(u.screen,"visibility_visible",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{document.addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("copy",t=>t.preventDefault()),document.addEventListener("cut",t=>t.preventDefault()),document.addEventListener("dragstart",t=>t.preventDefault()),document.addEventListener("keydown",t=>{if((t.ctrlKey||t.metaKey)&&["c","p","s","u"].includes(t.key.toLowerCase())&&t.preventDefault(),t.key==="PrintScreen")try{navigator.clipboard.writeText("")}catch{}}),w(),ce()});function ce(){const t=document.getElementById("pauseBtn");t==null||t.addEventListener("click",M);const r=document.getElementById("exitBtn");r==null||r.addEventListener("click",()=>{confirm("Are you sure you wish to exit the volunteer assessment? You can return at any time.")&&(b(u.screen,"candidate_exited"),T(),window.location.href="index.html")})}function M(){u.isPaused?(u.isPaused=!1,b(u.screen,"resume"),u.screen=u.pausedPreviousScreen||"sjt",w()):(u.isPaused=!0,u.pausedPreviousScreen=u.screen,b(u.screen,"pause"),u.screen="paused",w())}function w(){const t=document.getElementById("recruitApp"),r=document.getElementById("sessionHeaderControls"),a=document.getElementById("topProgressBar"),d=document.getElementById("progressBarFill");switch(u.screen!=="consent"&&u.screen!=="complete"&&u.screen!=="paused"?(r==null||r.classList.remove("hidden"),a==null||a.classList.remove("hidden")):(r==null||r.classList.add("hidden"),a==null||a.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),u.screen){case"consent":le(t);break;case"accessibility":ue(t);break;case"warmup":me(t);break;case"sjt":_(t,d);break;case"games":A(t,d);break;case"paused":pe(t);break;case"complete":ge(t);break}}function le(t){var r;t.innerHTML=`
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
  `,(r=document.getElementById("startForm"))==null||r.addEventListener("submit",async a=>{a.preventDefault();const d=a.target.querySelector('button[type="submit"]'),n=d?d.innerHTML:"Begin Session &rarr;";d&&(d.disabled=!0,d.innerHTML="Connecting...");const e=document.getElementById("fullName").value.trim(),c=document.getElementById("email").value.trim();try{const s=await y("/recruit/session/start",{method:"POST",body:JSON.stringify({full_name:e,email:c,device_class:window.innerWidth<768?"mobile":"desktop",input_modality:"ontouchstart"in window?"touch":"mouse"})});if(!s||!s.ok){const l=s?await s.json().catch(()=>({})):{};throw new Error(l.detail||(s?`Server returned ${s.status}`:"No response from server"))}const o=await s.json();if(o.session_id)u.sessionId=o.session_id,u.configHash=o.config_hash,u.worldSequence=o.world_sequence,u.seeds=o.seeds,await y("/recruit/consent",{method:"POST",body:JSON.stringify({session_id:u.sessionId,consent_text_version:"2026-10-v2",choices:{research_telemetry:!0},confirmed_18_plus:!0})}),b("consent","consent_accepted",{full_name:e}),u.screen="accessibility",w();else throw new Error("Missing session ID")}catch(s){alert(`Unable to initialize session: ${s.message||"Please check connection."}`),console.error(s),d&&(d.disabled=!1,d.innerHTML=n)}})}function ue(t){var r;t.innerHTML=`
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
  `,(r=document.getElementById("saveA11yBtn"))==null||r.addEventListener("click",async()=>{var d,n,e,c;const a=[];(d=document.getElementById("a11y_keyboard"))!=null&&d.checked&&a.push("keyboard_navigation"),(n=document.getElementById("a11y_contrast"))!=null&&n.checked&&a.push("high_contrast"),(e=document.getElementById("a11y_motion"))!=null&&e.checked&&a.push("reduced_motion"),(c=document.getElementById("a11y_time"))!=null&&c.checked&&a.push("extended_time"),u.accessibilityModes=a;try{await y("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:u.sessionId,modes_enabled:a})})}catch(s){console.warn("Accessibility preferences save error:",s)}b("accessibility","preferences_saved",{modes:a}),u.screen="warmup",w()})}function me(t){let r=[],a=performance.now();t.innerHTML=`
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
  `;const d=document.getElementById("tapTarget"),n=document.getElementById("warmupStatus");d==null||d.addEventListener("click",async()=>{r.push(performance.now());const e=r.length;if(d.textContent=`Tap (${e}/3)`,n.textContent=`Registered tap ${e} of 3`,e>=3){const c=[r[1]-r[0],r[2]-r[1]],s=(c[0]+c[1])/2,o=performance.now()-a;try{await y("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:u.sessionId,tap_latency_baseline_ms:s,reading_dwell_baseline_ms:o,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(l){console.warn("Warmup save error:",l)}b("warmup","warmup_completed",{avgLatency:s,readingDwell:o});try{const i=await(await y("/recruit/sjt/public")).json();u.sjtScenarios=i.scenarios||[],u.currentSjtIndex=0,u.screen="sjt",w()}catch(l){console.error("Failed to load SJT payload:",l)}}})}function _(t,r){var l;const a=u.sjtScenarios[u.currentSjtIndex];if(!a){ve();return}const d=u.sjtScenarios.length,n=u.currentSjtIndex+1;r&&(r.style.width=`${(n-1)/(d+7)*100}%`);const e=document.getElementById("segmentProgress");e&&(e.textContent=`SJT ${n}/${d}`);const c=u.sjtResponses[a.id]||null,s=a.options.map(i=>`
    <div class="option-card ${c===i.id?"selected":""}" data-opt-id="${i.id}" tabindex="0" role="button">
      <span class="font-serif text-sm font-semibold text-[var(--accent-gold)]">${i.id.slice(-1)}.</span>
      <span class="text-sm text-[var(--text-primary)] leading-relaxed">${i.text}</span>
    </div>
  `).join("");t.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-3 flex justify-between items-end">
        <div>
          <span class="act-badge">Act ${a.act}: ${a.act_title_en}</span>
          <span class="act-title-ur font-serif">${a.act_title_ur||""}</span>
          <h2 class="text-2xl font-serif text-[var(--text-primary)]">Scenario ${a.id}</h2>
        </div>
        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
          Scenario ${n} of ${d}
        </div>
      </div>

      <div class="text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        ${a.setup}
      </div>

      <div class="space-y-3">
        <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Choose the course of action you would most naturally take:</div>
        ${s}
      </div>

      <div class="pt-4 flex justify-between items-center border-t border-[var(--grid-border)]">
        <span class="text-xs text-[var(--text-secondary)]">Keyboard: Press 1–4 to choose</span>
        <button id="nextSjtBtn" ${c?"":"disabled"} class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] transition">
          ${n===d?"Complete SJT &rarr;":"Next Scenario &rarr;"}
        </button>
      </div>
    </div>
  `,b("sjt","scenario_displayed",{scenario_id:a.id,index:n}),t.querySelectorAll(".option-card").forEach(i=>{i.addEventListener("click",()=>{const m=i.getAttribute("data-opt-id");u.sjtResponses[a.id]=m,b("sjt","option_selected",{scenario_id:a.id,option_id:m}),_(t,r)})}),(l=document.getElementById("nextSjtBtn"))==null||l.addEventListener("click",()=>{u.sjtResponses[a.id]&&(u.currentSjtIndex++,_(t,r))});const o=i=>{if(["1","2","3","4"].includes(i.key)){const m=parseInt(i.key)-1;a.options[m]&&(u.sjtResponses[a.id]=a.options[m].id,b("sjt","option_selected_key",{scenario_id:a.id,option_id:a.options[m].id}),_(t,r))}};window.onkeydown=o}async function ve(){window.onkeydown=null;try{await y("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:u.sessionId,responses:u.sjtResponses})}),b("sjt","sjt_complete",{response_count:Object.keys(u.sjtResponses).length}),u.screen="games",u.currentWorldIndex=0,u.currentMiniGameIndex=0,w()}catch(t){console.error("SJT submit error:",t)}}function A(t,r){const a=u.worldSequence[u.currentWorldIndex];if(!a||u.currentWorldIndex>=u.worldSequence.length){he();return}const d=document.getElementById("segmentProgress");d&&(d.textContent=`World ${u.currentWorldIndex+1}/7`),r&&(r.style.width=`${(u.currentSjtIndex+u.currentWorldIndex+1)/(u.sjtScenarios.length+7)*100}%`),de({appContainer:t,worldCode:a,worldIndex:u.currentWorldIndex,miniGameIndex:u.currentMiniGameIndex,logEvent:(n,e,c,s)=>{const o=B(a,u.currentMiniGameIndex);b("game",n,e,c,s,o)},onMiniGameComplete:n=>{const e=B(a,u.currentMiniGameIndex);b("game","minigame_end",n,{},"mouse",e),T(),u.currentMiniGameIndex<2?u.currentMiniGameIndex++:(u.currentMiniGameIndex=0,u.currentWorldIndex++),A(t,r)}})}function B(t,r){const a={W1:["F1","F2","F3"],W2:["A1","A2","A3"],W3:["C1","C2","C3"],W4:["E1","E2","E3"],W5:["Q1","Q2","Q3"],W6:["CR1","CR2","CR3"],W7:["M1","M2","M3"]};return a[t]&&a[t][r]||"MG"}async function he(){const t=document.getElementById("recruitApp");t&&(t.innerHTML=`
      <div class="space-y-6 text-center py-16 animate-fadeIn">
        <div class="w-10 h-10 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">Finalizing Assessment...</h2>
        <p class="text-xs text-[var(--text-secondary)]">Safely recording research telemetry and saving your session profile.</p>
      </div>
    `);try{await y("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:u.sessionId})})}catch(r){console.warn("Session complete submission error:",r)}T(),u.screen="complete",w()}function pe(t){var r;t.innerHTML=`
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
  `,(r=document.getElementById("resumeBtn"))==null||r.addEventListener("click",M)}function ge(t){t.innerHTML=`
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
