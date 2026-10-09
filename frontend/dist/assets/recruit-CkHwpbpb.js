import"./global-DxYxv3W5.js";/* empty css               */function re(r,n){const{appContainer:a,miniGameIndex:o,gameId:e,logEvent:t,onMiniGameComplete:i,worldIndex:s}=r,p=e||(o===0?"A1":o===1?"A2":"A3");p==="A1"?ne(a,n,t,i,s):p==="A2"?oe(a,n,t,i,s):de(a,n,t,i)}function ne(r,n,a,o,e=1){let t=0,i=!1,s=null,p="mouse";const x=[{id:"DOC_01",title:"Old Calligraphy Book (1842)",rule_prompt:"Sorting Rule: Sort by Century",tags:["Year: 1842","19th Century","Handmade Paper","Poem Verse"]},{id:"DOC_02",title:"Poetry Song Book",rule_prompt:"Sorting Rule: Sort by Type",tags:["Type: Poetry","Song Verses","Urdu","Paper Pages"]},{id:"DOC_03",title:"Exhibition Visitor Book (1924)",rule_prompt:"Sorting Rule: Sort by Century",tags:["Year: 1924","20th Century","Visitor List","Signatures"]},{id:"DOC_04",title:"Lal Ded Verses in Kashmiri",rule_prompt:"Sorting Rule: Sort by Language",tags:["Language: Kashmiri","Wise Verses","Local Poetry"]}],d=[{id:"19th_century",label:"19th Century Shelf",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},{id:"20th_century",label:"20th Century Shelf",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{id:"poetry",label:"Poetry Shelf",icon:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"},{id:"chronicle",label:"History Shelf",icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},{id:"kashmiri",label:"Kashmiri Language Shelf",icon:"M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"}];function c(){var f,g;if(t>=x.length){o({mini_game:"A1",observations_count:x.length});return}const l=x[t];performance.now();const v=`
    <div class="p-5 sm:p-6 bg-[#faf8f5] border-l-4 border-l-[var(--accent-gold)] border border-[var(--grid-border)] rounded-xs shadow-xs space-y-2">
      <div class="flex justify-between items-start mb-1">
        <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold">Folio ${t+1} of ${x.length}</span>
        <button id="guideBtn" type="button" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-2.5 py-1 interactive-option flex items-center gap-1.5 rounded-xs min-h-[32px] bg-white ${i?"":"pulse-btn"}" tabindex="0">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          ${i?"Close Guide":"Shelf Guide"}
        </button>
      </div>

      <div id="guideModal" class="${i?"":"hidden"} p-3 mb-2 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] space-y-1 rounded-xs">
        <div>&bull; <strong>Century Rule:</strong> Sort by century made (19th vs 20th Century).</div>
        <div>&bull; <strong>Type Rule:</strong> Sort by content type (Poetry vs History).</div>
        <div>&bull; <strong>Language Rule:</strong> Sort by language (Kashmiri).</div>
      </div>

      <h3 class="text-base sm:text-lg font-serif text-[var(--text-primary)] font-semibold leading-relaxed">${l.title}</h3>
      <div class="flex flex-wrap gap-2 pt-1">
        ${l.tags.map(y=>`<span class="px-2.5 py-1 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-primary)] font-medium rounded-xs">${y}</span>`).join("")}
      </div>
    </div>
  `,b=d.find(y=>y.id===s),h=`
 <div>
 <div class="text-base uppercase tracking-wider text-black mb-2 ">Select Destination Shelf:</div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
 ${d.map(y=>{const _=s===y.id;return`
 <button type="button" class="folder-btn p-3.5 bg-white border ${_?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} text-base font-semibold interactive-option text-left flex items-center justify-between rounded-xs min-h-[48px]" data-folder="${y.id}" tabindex="0">
 <span class="flex items-center gap-2.5">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${_?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${_?"✓":""}</span>
 <span class="text-[var(--text-primary)]">${y.label}</span>
 </span>
 <svg class="w-4 h-4 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${y.icon}"></path></svg>
 </button>
 `}).join("")}
 </div>
 </div>
 `,m=`
 <span>${s?`Selected shelf: <strong class="text-[var(--text-primary)]">${b==null?void 0:b.label}</strong>`:"Select a shelf above, then click Confirm."}</span>
 <span class="text-sm text-black ">${t+1} / ${x.length}</span>
 `;r.innerHTML=E({worldCode:"W2",worldIndex:e,title:"The Manuscript Folios",subtitle:"Sort each historical page onto its proper shelf.",instructionPrompt:"Your Task",instruction:`Pick the shelf below that matches this page (${l.rule_prompt}).`,stimulusContent:v,interactionContent:h,summaryContent:m,actionButtonId:"confirmShelfBtn",actionButtonText:t<x.length-1?"Confirm Shelf &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!s,progressText:`Page ${t+1} of ${x.length}`}),a("item_presented",{trial_index:t,stimulus_id:l.id,task_def_version:"1.0"}),(f=document.getElementById("guideBtn"))==null||f.addEventListener("click",()=>{i=!i,c(),a("guide_viewed",{trial_index:t,stimulus_id:l.id,task_def_version:"1.0"})}),r.querySelectorAll(".folder-btn").forEach(y=>{const _=C=>{p=C,s=y.getAttribute("data-folder"),c()};y.addEventListener("click",()=>_("mouse")),y.addEventListener("keydown",C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),_("keyboard"))})}),(g=document.getElementById("confirmShelfBtn"))==null||g.addEventListener("click",()=>{s&&(a("item_sorted",{trial_index:t,stimulus_id:l.id,choice:s,input_modality:p,task_def_version:"1.0"}),t++,s=null,c(),w())})}c()}function oe(r,n,a,o,e=1){let t=0,i=null,s="mouse";const p=[{stimulus_id:"EXC_01",title:"Kashmiri Poetry Page with Water Wear",anomaly_description:'Water fading on lower margin. The accession year stamp is blurred and appears as "18--".',type_note:"Physical Damage & Blurred Year"},{stimulus_id:"EXC_02",title:"Clean Calligraphy Page (1890)",anomaly_description:"The paper is clean, smooth, and strong. The black ink is clear with no stains or marks.",type_note:"Clean Page Inspection"},{stimulus_id:"EXC_03",title:"Loose Book Page with Number Jump",anomaly_description:"The binding threads are broken. The page numbers skip directly from page 14 to page 19.",type_note:"Missing Pages & Loose Thread"},{stimulus_id:"EXC_04",title:"Story Page with Split Binding",anomaly_description:"The middle fold is split down the center, and the red stamp is upside down.",type_note:"Broken Spine & Upside-Down Stamp"}],x=[{id:"flag_exception",title:"Flag for Special Repair",desc:"Place page in a clean protective folder for careful repair.",tag:"Special Repair"},{id:"file_standard",title:"Place on Regular Shelf",desc:"Place page directly onto the standard open shelves.",tag:"Regular Shelf"},{id:"defer_review",title:"Hold in Storage Box",desc:"Hold page safely in storage until more background notes arrive.",tag:"Hold in Box"}];function d(){const c=p[t],l=x.find(f=>f.id===i),v=`
    <div class="p-5 sm:p-6 bg-[#faf8f5] border-l-4 border-l-[var(--accent-gold)] border border-[var(--grid-border)] rounded-xs shadow-xs space-y-2">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold">${c.title}</span>
        <span class="text-xs text-[var(--text-secondary)] uppercase bg-white px-2 py-0.5 border border-[var(--grid-border)] rounded-xs">${c.type_note}</span>
      </div>
      <p class="text-base sm:text-lg font-serif text-[var(--text-primary)] leading-relaxed">
        ${c.anomaly_description}
      </p>
    </div>
  `,b=`
 <div class="space-y-2.5">
 <div class="text-base uppercase tracking-wider text-black mb-1 ">Choose handling action:</div>
 ${x.map(f=>`
 <div class="a2-opt p-3.5 bg-white border ${i===f.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} cursor-pointer interactive-option rounded-xs min-h-[52px]" data-action="${f.id}" tabindex="0" role="button">
 <div class="flex justify-between items-center mb-0.5">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${i===f.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${f.title}
 </div>
 </div>
 <div class="text-[11px] text-black leading-relaxed pl-3.5">${f.desc}</div>
 </div>
 `).join("")}
 </div>
 `,h=`
 <span>${i?`You selected: <strong class="text-[var(--text-primary)]">${l==null?void 0:l.title}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">${t+1} / 4</span>
 `;r.innerHTML=E({worldCode:"W2",worldIndex:e,title:"The Fragile Leaf",subtitle:"Examine page condition and choose a handling step.",instructionPrompt:"Your Task",instruction:"Check the condition notes above. Choose how you want to handle this page below.",stimulusContent:v,interactionContent:b,summaryContent:h,actionButtonId:"a2ConfirmBtn",actionButtonText:t<3?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!i,progressText:`Folio ${t+1} of 4`}),a("item_presented",{trial_index:t,stimulus_id:c.stimulus_id,task_def_version:"1.0"});const m=document.getElementById("a2ConfirmBtn");r.querySelectorAll(".a2-opt").forEach(f=>{const g=y=>{s=y,i=f.getAttribute("data-action"),d()};f.addEventListener("click",()=>g("mouse")),f.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),g("keyboard"))})}),m==null||m.addEventListener("click",()=>{a("decision_logged",{trial_index:t,stimulus_id:c.stimulus_id,action_id:i,input_modality:s,task_def_version:"1.0"}),t<3?(t++,i=null,d(),w()):o({mini_game:"A2",observations_count:4})})}d()}function de(r,n,a,o){let e=new Set,t=new Set,i="mouse";const s=[{id:"REC_01",title:"Card 1: Habba Khatoon Poem",text:"Poet: Habba Khatoon | Era: 16th Century | Birthplace: Chandhara (Recorded as: Chanhadra)",note:"Folio Label Verification"},{id:"REC_02",title:"Card 2: Carved Walnut Pen Box",text:"Artifact: Carved Walnut Calligraphy Pen Box | Dimensions: 24 cm x 6 cm | Medium: Seasoned Walnut",note:"Object Metadata Verification"},{id:"REC_03",title:"Card 3: River Verse Excerpt",text:`Verse Excerpt: "The river remembers the boatman's song" | Translator: [Not Specified / Blank]`,note:"Folio Label Verification"},{id:"REC_04",title:"Card 4: Kashmiri Vakh Lyric Leaf",text:"Folio Leaf: Kashmiri Vakh Lyric Leaf | Script: Sharda & Persian | Accession: AR-1892",note:"Manuscript Leaf Verification"},{id:"REC_05",title:"Card 5: Exhibition Opening Notice",text:"Exhibition Opening Reception: February 31st, 2026 | Location: Main Pavilion",note:"Public Schedule Verification"}];function p(){var x;r.innerHTML=`
 <div class="max-w-2xl mx-auto">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 2: The Archive</span>
 
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Exhibition Ledger</h2>
 <p class="text-base text-black mt-0.5">Proofread all 5 display cards. Flag any card that has an error.</p>
 </div>

 <!-- YOUR TASK -->
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed">
 Read all 5 display cards. Click flag if a card has a mistake. Leave clean cards unflagged.
 </div>
 </div>

 <!-- LOOK AT THIS & INTERACTION AREA -->
 <div class="space-y-3 mb-5 candidate-content-protected">
 ${s.map((d,c)=>{const l=e.has(d.id);return`
 <div class="record-card p-4 bg-white border ${l?"border-[var(--text-primary)] bg-amber-50/20":"border-[var(--grid-border)]"} rounded-xs interactive-option shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" data-id="${d.id}" tabindex="0">
 <div class="space-y-1 flex-1">
 <div class="flex items-center gap-2">
 <span class="text-sm text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Ledger Card ${c+1} of 5</span>
 </div>
 <div class="text-base font-semibold text-[var(--text-primary)]">${d.title}</div>
 <div class="text-base text-black leading-relaxed bg-[#faf8f5] p-2.5 border border-[var(--grid-border)]/60 rounded-xs mt-1">
 ${d.text}
 </div>
 </div>

 <button type="button" class="toggle-flag-btn px-4 py-2.5 border text-base uppercase tracking-wider shrink-0 interactive-option rounded-xs min-h-[44px] w-full sm:w-auto ${l?"bg-[var(--text-primary)] text-white border-[var(--text-primary)]":"bg-white text-black border-[var(--grid-border)] "}" data-id="${d.id}">
 ${l?"Mistake Flagged ✓":"Flag Mistake"}
 </button>
 </div>
 `}).join("")}
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>Cards flagged: <strong class="text-[var(--text-primary)]">${e.size} of 5</strong></span>
 <span class="text-sm text-black ">Clean cards remain unflagged</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button id="a3SubmitBtn" class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest interactive-option shadow-sm rounded-xs min-h-[44px]">
 Verify and Complete World 2 &rarr;
 </button>
 </div>
 </div>
 `,r.querySelectorAll(".record-card").forEach((d,c)=>{const l=d.getAttribute("data-id"),v=()=>{t.has(l)||(t.add(l),a("record_inspected",{trial_index:c,stimulus_id:l,task_def_version:"1.0"}))};d.addEventListener("focus",v),d.addEventListener("mouseenter",v)}),r.querySelectorAll(".toggle-flag-btn").forEach((d,c)=>{const l=d.getAttribute("data-id"),v=b=>{i=b;const h=!e.has(l);h?e.add(l):e.delete(l),a("discrepancy_toggled",{trial_index:c,stimulus_id:l,flagged_state:h,input_modality:i,task_def_version:"1.0"}),p()};d.addEventListener("click",()=>v("mouse")),d.addEventListener("keydown",b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),v("keyboard"))})}),(x=document.getElementById("a3SubmitBtn"))==null||x.addEventListener("click",()=>{a("verification_finalized",{action_id:"approve_ledger",input_modality:i,task_def_version:"1.0"}),o({mini_game:"A3",observations_count:s.length})})}p()}function le(r,n){const{appContainer:a,miniGameIndex:o,gameId:e,logEvent:t,onMiniGameComplete:i}=r,s=e||(o===0?"F1":o===1?"F2":"F3");s==="F1"?ce(a,n,t,i):s==="F2"?ue(a,n,t,i):pe(a,n,t,i)}function ce(r,n,a,o){let e=0,t=50,i=null,s="mouse",p=null;const x=[{stimulus_id:"F1_T1",title:"Sound Report: Front Row Echo",cue_text:'"Front rows are hearing too much echo from the wall speakers during the opening reading."',default_action:"accommodate",actionA_desc:"Change volume fader to balance echo",actionB_desc:"Keep acoustics as they are for reading",actionC_desc:"Run diagnostics on microphone cable"},{stimulus_id:"F1_T2",title:"Sound Report: Clear Hall Acoustics",cue_text:'"Center hall sound is clear, balanced, and easy to hear for all attendees."',default_action:"maintain_objective",actionA_desc:"Adjust volume fader settings anyway",actionB_desc:"Keep acoustics as they are for reading",actionC_desc:"Run diagnostics on microphone cable"},{stimulus_id:"F1_T3",title:"Sound Report: Quiet Whisper",cue_text:'"The speaker is reciting a whisper. Words are hard to hear in the rear seats."',default_action:"accommodate",actionA_desc:"Change volume fader to boost voice",actionB_desc:"Keep acoustics as they are for reading",actionC_desc:"Run diagnostics on microphone cable"},{stimulus_id:"F1_T4",title:"Sound Report: Audio Dropout",cue_text:'"Sound suddenly went silent. It could be an artistic pause or an equipment failure."',default_action:"clarify",actionA_desc:"Change volume fader to high level",actionB_desc:"Keep acoustics as they are for reading",actionC_desc:"Run diagnostics on microphone cable"},{stimulus_id:"F1_T5",title:"Sound Report: Steady Room Acoustics",cue_text:'"Group singing is steady and projected cleanly across the entire gallery hall."',default_action:"maintain_objective",actionA_desc:"Readjust volume fader across hall",actionB_desc:"Keep acoustics as they are for reading",actionC_desc:"Run diagnostics on microphone cable"}];function d(){var O;p&&(cancelAnimationFrame(p),p=null);const c=x[e];r.innerHTML=E({worldCode:"W1",worldIndex:0,title:"Tuning the Hall",goal:"Balance the room sound across 5 rounds.",subtitle:"Adjust the hall sound to support the poetry reading.",instructionPrompt:"Your Task",instruction:"Complete Step 1, then balance the volume in Step 2.",interactionContent:`
    <div class="space-y-4">
      <!-- STEP 1: REPORT + ACTION CHOICES -->
      <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
          <span class="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold flex items-center justify-center font-serif">1</span>
          <span class="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">Step 1: Read the report and choose an action</span>
        </div>
        <!-- Sound Report from Hall -->
        <div class="p-3.5 bg-[#faf8f5] border-l-4 border-l-[var(--accent-gold)] border border-[var(--grid-border)] rounded-xs">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold">${c.title}</span>
            <span class="text-xs text-[var(--text-secondary)] uppercase">Sound Report</span>
          </div>
          <div id="partnerSpeech" class="text-base sm:text-lg font-serif text-[var(--text-primary)] leading-relaxed italic">
            ${c.cue_text}
          </div>
        </div>
        <!-- Action Options Outside Tile with A, B, C bullets -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button type="button" class="outside-opt-card f1-action-btn ${i==="accommodate"?"selected":""}" data-action="accommodate">
            <div class="opt-bullet">A</div>
            <div style="flex:1;">
              <div class="text-sm font-semibold text-[var(--text-primary)]">Fix Sound</div>
              <div class="text-xs text-[var(--text-secondary)] mt-0.5">${c.actionA_desc||"Change volume fader to balance echo"}</div>
            </div>
          </button>
          <button type="button" class="outside-opt-card f1-action-btn ${i==="maintain_objective"?"selected":""}" data-action="maintain_objective">
            <div class="opt-bullet">B</div>
            <div style="flex:1;">
              <div class="text-sm font-semibold text-[var(--text-primary)]">Keep As Is</div>
              <div class="text-xs text-[var(--text-secondary)] mt-0.5">${c.actionB_desc||"Leave sound settings as they are"}</div>
            </div>
          </button>
          <button type="button" class="outside-opt-card f1-action-btn ${i==="clarify"?"selected":""}" data-action="clarify">
            <div class="opt-bullet">C</div>
            <div style="flex:1;">
              <div class="text-sm font-semibold text-[var(--text-primary)]">Check First</div>
              <div class="text-xs text-[var(--text-secondary)] mt-0.5">${c.actionC_desc||"Run test on microphone cable"}</div>
            </div>
          </button>
        </div>
      </div>

      <!-- TILE + STEP 2 AS ONE UNIT -->
      <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
          <span class="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold flex items-center justify-center font-serif">2</span>
          <span class="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">Step 2: Adjust Volume Fader</span>
        </div>
        <!-- Visual Tile: Acoustic Monitor -->
        <div class="p-2.5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs">
          <div class="flex items-center justify-between mb-1.5 px-1">
            <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold">Hall Acoustic Monitor</span>
            <span class="text-xs text-[var(--text-secondary)]">Live Waveform</span>
          </div>
          <canvas id="waveCanvas" width="600" height="80" class="w-full h-20 bg-stone-900 border border-stone-800 rounded-xs mb-1"></canvas>
        </div>
        <!-- Slider Control inside the unit -->
        <div class="w-full max-w-md mx-auto pt-1">
          <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-1 font-medium">
            <span>Soft (0)</span>
            <span class="text-xs font-semibold text-[var(--accent-gold)] bg-stone-100 px-3 py-1 border border-[var(--grid-border)] rounded-xs" id="sliderValDisplay">${t}</span>
            <span>Bright (100)</span>
          </div>
          <input type="range" id="freqSlider" min="0" max="100" step="5" value="${t}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg min-h-[44px]">
          <div class="text-center text-xs text-[var(--text-secondary)] mt-1">Slide control left or right to balance the sound</div>
        </div>
      </div>
    </div>
    `,summaryContent:`
      <span>Action: <strong class="text-[var(--text-primary)]" id="choiceSummary">${i?i==="accommodate"?"Fix Sound":i==="maintain_objective"?"Keep As Is":"Check First":"None selected"} (Fader: ${t})</strong></span>
      <span class="text-sm text-black">${e+1} / ${x.length}</span>
    `,actionButtonId:"lockFreqBtn",actionButtonDisabled:!i,actionButtonText:e<x.length-1?"Confirm Setting &rarr;":"Confirm & Finish &rarr;",progressText:`Sound Report ${e+1} of ${x.length}`});const l=document.getElementById("waveCanvas"),v=l==null?void 0:l.getContext("2d"),b=document.getElementById("freqSlider"),h=document.getElementById("sliderValDisplay"),m=document.getElementById("choiceSummary");let f=0;function g(){if(!v||!l)return;v.clearRect(0,0,l.width,l.height),v.strokeStyle="#f0eeea",v.lineWidth=1;for(let T=0;T<l.width;T+=30)v.beginPath(),v.moveTo(T,0),v.lineTo(T,l.height),v.stroke();v.strokeStyle="#bd6f5d",v.lineWidth=2.5,v.beginPath();const A=.015+t/100*.05,R=14+Math.abs(t-50)/50*16;for(let T=0;T<l.width;T++){const j=l.height/2+Math.sin(T*A+f)*R;T===0?v.moveTo(T,j):v.lineTo(T,j)}v.stroke(),f+=.04,p=requestAnimationFrame(g)}g(),r.querySelectorAll(".f1-action-btn").forEach(A=>{const R=T=>{if(s=T,i=A.getAttribute("data-action"),r.querySelectorAll(".f1-action-btn").forEach(N=>N.classList.remove("selected")),A.classList.add("selected"),m){const N=i==="accommodate"?"Fix Sound":i==="maintain_objective"?"Keep As Is":"Check First";m.textContent=`${N} (Fader: ${t})`}const j=document.getElementById("lockFreqBtn");j&&j.removeAttribute("disabled")};A.addEventListener("click",()=>R("mouse")),A.addEventListener("keydown",T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),R("keyboard"))})});let y=0,_=null;const C=(A,R)=>{a("slider_input",{trial_index:e,stimulus_id:c.stimulus_id,slider_position_raw:A,input_modality:R,task_def_version:"1.0"}),y=Date.now()};b==null||b.addEventListener("input",A=>{if(s=A.pointerType||"mouse",t=parseInt(A.target.value,10),h&&(h.textContent=t),m){const T=i==="accommodate"?"Adjust Sound":i==="maintain_objective"?"Keep Baseline":"Check Channel";m.textContent=`${T} (Level: ${t})`}const R=Date.now();R-y>=100?(_&&(clearTimeout(_),_=null),C(t,s)):_||(_=setTimeout(()=>{C(t,s),_=null},100-(R-y)))}),b==null||b.addEventListener("change",()=>{_&&(clearTimeout(_),_=null),C(t,s)}),b==null||b.addEventListener("keydown",A=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(A.key)&&(s="keyboard")}),(O=document.getElementById("lockFreqBtn"))==null||O.addEventListener("click",()=>{_&&(clearTimeout(_),_=null),p&&(cancelAnimationFrame(p),p=null),a("trial_submit",{trial_index:e,stimulus_id:c.stimulus_id,action_id:i,slider_position_raw:t,input_modality:s,task_def_version:"1.0"}),e<x.length-1?(e++,t=50,i=null,d(),w()):o({mini_game:"F1",observations_count:x.length})})}d()}function ue(r,n,a,o){let e=0,t=null,i="mouse";const s=[{stimulus_id:"F2_T1",speaker_role:"Stage Lead",cue_text:'"The poet gestures toward the side speaker, asking for sound help."',condition_label:"Direct Request"},{stimulus_id:"F2_T2",speaker_role:"Hall Helper",cue_text:'"The speaker pauses with an uncertain look. No words are spoken."',condition_label:"Ambiguous Signal"},{stimulus_id:"F2_T3",speaker_role:"Sound Helper",cue_text:'"The performer sings with intense emotion as part of the poem."',condition_label:"Expressive Intensity"}],p=[{id:"act",title:"Act Directly",desc:"Take action right away to help the speaker."},{id:"clarify",title:"Ask for Clarity",desc:"Check with the speaker before making any changes."},{id:"maintain",title:"Keep Course",desc:"Stay on course without stepping in too early."}];function x(){const d=s[e],c=p.find(b=>b.id===t);r.innerHTML=E({worldCode:"W1",worldIndex:0,title:"The Gathering Voices",subtitle:"Coordinate sound with your hall team.",instructionPrompt:"Your Task",instruction:"Choose how you want to respond right now:",stimulusContent:`
 <div class="p-5 sm:p-6 bg-[#faf8f5] border-l-4 border-l-[var(--accent-gold)] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="flex items-center justify-between mb-2">
 <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold">${d.speaker_role}</span>
 <span class="text-xs text-[var(--text-secondary)] uppercase">${d.condition_label||"Signal"}</span>
 </div>
 <div class="text-base sm:text-lg font-serif text-[var(--text-primary)] leading-relaxed italic">
 ${d.cue_text}
 </div>
 </div>
 `,interactionContent:`
 <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
 ${p.map(b=>`
 <div class="f2-card p-4 bg-white border ${t===b.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} cursor-pointer interactive-option space-y-1.5 rounded-xs min-h-[56px]" data-action="${b.id}" tabindex="0" role="button">
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${t===b.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${b.title}
 </div>
 <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${b.desc}</div>
 </div>
 `).join("")}
 </div>
 `,summaryContent:`
 <span id="f2ChoiceText">${t?`You selected: <strong class="text-[var(--text-primary)]">${c==null?void 0:c.title}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">${e+1} / ${s.length}</span>
 `,actionButtonId:"f2ConfirmBtn",actionButtonText:e<s.length-1?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Message ${e+1} of ${s.length}`});const l=document.getElementById("f2ConfirmBtn"),v=document.getElementById("f2ChoiceText");r.querySelectorAll(".f2-card").forEach(b=>{const h=m=>{var f,g;if(i=m,t=b.getAttribute("data-action"),r.querySelectorAll(".f2-card").forEach(y=>{var _,C;y.classList.remove("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),y.classList.add("border-[var(--grid-border)]"),(_=y.querySelector("span.rounded-full"))==null||_.classList.remove("bg-[var(--accent-gold)]"),(C=y.querySelector("span.rounded-full"))==null||C.classList.add("bg-stone-300")}),b.classList.add("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),b.classList.remove("border-[var(--grid-border)]"),(f=b.querySelector("span.rounded-full"))==null||f.classList.add("bg-[var(--accent-gold)]"),(g=b.querySelector("span.rounded-full"))==null||g.classList.remove("bg-stone-300"),l&&(l.disabled=!1),v){const y=p.find(_=>_.id===t);v.innerHTML=`You selected: <strong class="text-[var(--text-primary)]">${y==null?void 0:y.title}</strong>`}};b.addEventListener("click",()=>h("mouse")),b.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),h("keyboard"))})}),l==null||l.addEventListener("click",()=>{a("trial_submit",{trial_index:e,stimulus_id:d.stimulus_id,action_id:t,input_modality:i,task_def_version:"1.0"}),e<s.length-1?(e++,t=null,x(),w()):o({mini_game:"F2",observations_count:s.length})})}x()}function pe(r,n,a,o){let e=0,t="baseline",i=null,s=null,p="mouse";const x=[{stimulus_id:"F3_T1",cue_id:"cue_expressive_crescendo",title:"Round 1: Rising Voice Line",cue_text:'"The poet begins a rising, powerful verse."',baseline_context:"Small Practice Room — Sound dies down quickly with no echo.",baseline_options:[{id:"support_volume",label:"Support Volume",desc:"Lift volume so sound carries across the room."},{id:"dampen_level",label:"Lower Level",desc:"Turn volume down before the loud peak."},{id:"neutral_hold",label:"Keep Steady",desc:"Keep room settings steady without changes."}],shifted_context:"Stone Hall — High stone walls bounce sound and create heavy echo.",shifted_options:[{id:"attenuate_reverb",label:"Lower Echo",desc:"Trim room echo so words stay clear."},{id:"support_volume",label:"Support Volume",desc:"Keep the volume boost from the small room."},{id:"neutral_hold",label:"Keep Steady",desc:"Make no changes for the stone room."}]},{stimulus_id:"F3_T2",cue_id:"cue_sotto_voce_pause",title:"Round 2: Quiet Whisper",cue_text:'"The poet drops into a quiet whisper between lines."',baseline_context:"Quiet Sitting Room — Audience sits close and easily hears every word.",baseline_options:[{id:"preserve_natural_intimacy",label:"Keep Natural Tone",desc:"Keep sound soft and clear without extra volume."},{id:"boost_high_gain",label:"High Boost",desc:"Force the whisper to play at loud volume."},{id:"cut_channel",label:"Mute Feed",desc:"Treat quiet verse as dead sound."}],shifted_context:"Courtyard Gate — Nearby street chatter and fountain water cover soft voices.",shifted_options:[{id:"boost_intelligibility",label:"Boost Voice",desc:"Lift the voice so outdoor chatter does not hide it."},{id:"preserve_natural_intimacy",label:"Keep Natural Tone",desc:"Leave voice unboosted so whisper is hard to hear."},{id:"cut_channel",label:"Mute Feed",desc:"Treat quiet sound as an equipment issue."}]},{stimulus_id:"F3_T3",cue_id:"cue_rhythmic_syncopation",title:"Round 3: Pause Before Verse",cue_text:'"The poet pauses suddenly before the final line."',baseline_context:"Solo Recital — A single speaker recites at a steady, driving pace.",baseline_options:[{id:"sustain_cadence",label:"Keep Pace",desc:"Keep the steady beat moving through the pause."},{id:"halt_accompaniment",label:"Stop Sound",desc:"Stop all instruments abruptly on the pause."},{id:"force_metronome",label:"Speed Up",desc:"Push the recital forward past the pause."}],shifted_context:"Group Singing — A chorus enters during the pause to sing an answer line.",shifted_options:[{id:"open_reciprocal_space",label:"Make Space",desc:"Pause instruments to let the chorus answer clearly."},{id:"sustain_cadence",label:"Keep Pace",desc:"Play straight through without waiting for the chorus."},{id:"force_metronome",label:"Speed Up",desc:"Rush the group tempo forward."}]}];function d(){var v,b;const l=x[e];if(t==="baseline"){const h=l.baseline_options.find(m=>m.id===i);r.innerHTML=`
 <div class="max-w-2xl mx-auto">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 1: The Frequency</span>
 
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Echo of the Room</h2>
 <p class="text-base text-black mt-0.5">Pick your response for the first room setting.</p>
 </div>

 <!-- YOUR TASK -->
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed">
 Read the performer action in this room. Pick your first response.
 </div>
 </div>

 <!-- LOOK AT THIS -->
 <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected space-y-3">
 <div>
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Performer Action</span>
 <div class="text-base text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${l.cue_text}</div>
 </div>
 <div class="p-3 bg-amber-50/50 border border-[var(--grid-border)] rounded-xs">
 <span class="text-sm uppercase tracking-wider text-[var(--text-primary)] font-semibold">First Room Setting</span>
 <div class="text-base text-[var(--text-primary)] mt-0.5">${l.baseline_context}</div>
 </div>
 </div>

 <!-- INTERACTION AREA -->
 <div class="space-y-2.5 mb-4 candidate-content-protected">
 <div class="text-base uppercase tracking-wider text-black mb-1 ">Choose your response:</div>
 ${l.baseline_options.map(m=>`
 <div class="f3-opt p-3.5 bg-white border ${i===m.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer interactive-option rounded-xs min-h-[50px]" data-choice="${m.id}" tabindex="0" role="button">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${i===m.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${m.label}
 </div>
 <div class="text-[11px] text-black mt-0.5 leading-relaxed">${m.desc}</div>
 </div>
 `).join("")}
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>${i?`You selected: <strong class="text-[var(--text-primary)]">${h==null?void 0:h.label}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">Step 1 of 2</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button id="f3BaselineBtn" ${i?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 Confirm and See Room Shift &rarr;
 </button>
 </div>
 </div>
 `,r.querySelectorAll(".f3-opt").forEach(m=>{const f=g=>{p=g,i=m.getAttribute("data-choice"),d()};m.addEventListener("click",()=>f("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),f("keyboard"))})}),(v=document.getElementById("f3BaselineBtn"))==null||v.addEventListener("click",()=>{a("baseline_response_selected",{trial_index:e,stimulus_id:l.stimulus_id,cue_id:l.cue_id,choice_id:i,input_modality:p,task_def_version:"1.0"}),t="shifted",a("context_shifted",{trial_index:e,stimulus_id:l.stimulus_id,cue_id:l.cue_id,shifted_context:l.shifted_context,task_def_version:"1.0"}),d()})}else{const h=l.shifted_options.find(m=>m.id===s);r.innerHTML=`
 <div class="max-w-2xl mx-auto">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 1: The Frequency</span>
 
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Echo of the Room</h2>
 <p class="text-base text-black mt-0.5">The room has changed. Update your response.</p>
 </div>

 <!-- YOUR TASK -->
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed">
 The performer action is the same. Pick your updated response for the new room.
 </div>
 </div>

 <!-- LOOK AT THIS -->
 <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected space-y-3">
 <div>
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Same Performer Action</span>
 <div class="text-base text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${l.cue_text}</div>
 </div>
 <div class="p-3 bg-amber-100/70 border border-[var(--text-primary)]/50 rounded-xs">
 <span class="text-sm uppercase tracking-wider text-[var(--text-primary)] font-semibold">New Room Setting</span>
 <div class="text-base text-[var(--text-primary)] font-medium mt-0.5">${l.shifted_context}</div>
 </div>
 </div>

 <!-- INTERACTION AREA -->
 <div class="space-y-2.5 mb-4 candidate-content-protected">
 <div class="text-base uppercase tracking-wider text-black mb-1 ">Choose your updated response:</div>
 ${l.shifted_options.map(m=>`
 <div class="f3-updated-opt p-3.5 bg-white border ${s===m.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer interactive-option rounded-xs min-h-[50px]" data-choice="${m.id}" tabindex="0" role="button">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${s===m.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${m.label}
 </div>
 <div class="text-[11px] text-black mt-0.5 leading-relaxed">${m.desc}</div>
 </div>
 `).join("")}
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>${s?`You selected: <strong class="text-[var(--text-primary)]">${h==null?void 0:h.label}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">Step 2 of 2</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button id="f3UpdatedBtn" ${s?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 ${e<2?"Save Updated Setting & Next Round &rarr;":"Finish World 1 &rarr;"}
 </button>
 </div>
 </div>
 `,r.querySelectorAll(".f3-updated-opt").forEach(m=>{const f=g=>{p=g,s=m.getAttribute("data-choice"),d()};m.addEventListener("click",()=>f("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),f("keyboard"))})}),(b=document.getElementById("f3UpdatedBtn"))==null||b.addEventListener("click",()=>{a("updated_response_selected",{trial_index:e,stimulus_id:l.stimulus_id,cue_id:l.cue_id,choice_id:s,input_modality:p,task_def_version:"1.0"}),a("transition_completed",{trial_index:e,stimulus_id:l.stimulus_id,task_def_version:"1.0"}),e<2?(e++,t="baseline",i=null,s=null,c(),d(),w()):o({mini_game:"F3",observations_count:3})})}}function c(){const l=x[e];a("transition_presented",{trial_index:e,stimulus_id:l.stimulus_id,cue_id:l.cue_id,baseline_context:l.baseline_context,task_def_version:"1.0"})}d()}function me(r,n){const{appContainer:a,miniGameIndex:o,gameId:e,logEvent:t,onMiniGameComplete:i}=r,s=e||(o===0?"C1":o===1?"C2":"C3");s==="C1"?be(a,n,t,i):s==="C2"?xe(a,n,t,i):ve(a,n,t,i)}function be(r,n,a,o){let e=0,t=0,i="mouse";const s=[{stimulus_id:"C1_R1",title:"Round 1: Partner Needs Tiles",description:"Your partner needs 3 more tiles to finish. You have 8 tiles.",partner_initial:2,user_initial:8,default_transfer:0,context_note:"Partner Needs Help"},{stimulus_id:"C1_R3",title:"Round 2: Scarce Personal Supply",description:"You only have 3 tiles (need 5 to finish). Your partner already has 7 tiles.",partner_initial:7,user_initial:3,default_transfer:0,context_note:"You Are Short on Tiles"}];function p(){var v,b,h;const d=s[e],c=d.partner_initial+t,l=d.user_initial-t;r.innerHTML=E({worldCode:"W3",worldIndex:2,title:"Resource Cooperation",goal:"Share ceramic tiles so both you and your partner have enough to finish.",subtitle:"Coordinate ceramic tiles with your workshop partner.",instructionPrompt:"Your Task",instruction:"Use + / − to choose how many tiles to share with your partner.",stimulusContent:`
      <div class="stage-content">
        <div class="dual-boards">
          <div class="board-box">
            <div class="board-title">Your Wall</div>
            <div class="tiles-grid" id="youTilesGrid">
              ${Array.from({length:Math.max(0,l)},()=>'<div class="tile-chip"></div>').join("")}
            </div>
            <div style="font-size:0.75rem; color:#baa890; margin-top:6px;">You have: <span class="font-bold text-white">${l}</span> (Need 5)</div>
          </div>
          <div class="board-box">
            <div class="board-title">Partner&#39;s Wall</div>
            <div class="tiles-grid" id="partnerTilesGrid">
              ${Array.from({length:Math.max(0,c)},()=>'<div class="tile-chip partner"></div>').join("")}
            </div>
            <div style="font-size:0.75rem; margin-top:6px; color:${c>=5?"#8cd39e":"#e6be82"};">
              ${c>=5?`✓ Partner has enough tiles (${c}/5)`:`Partner needs ${5-c} more tile(s)`}
            </div>
          </div>
        </div>
      </div>
    `,interactionContent:`
      <div class="space-y-4">
        <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-[var(--grid-border)]">
            <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold">Round ${e+1} of ${s.length}: ${d.title}</span>
            <span class="text-xs text-[var(--text-secondary)]">${d.context_note}</span>
          </div>
          <p class="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
            ${d.description}
          </p>
          <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs text-center">
            <div class="counter-controls">
              <button type="button" class="counter-btn" id="minusTileBtn" aria-label="Decrease shared tiles">−</button>
              <span style="font-size:1.25rem; font-weight:800; color:var(--accent-gold); min-width:120px;" id="sharedCountText">${t} tile(s)</span>
              <button type="button" class="counter-btn" id="plusTileBtn" aria-label="Increase shared tiles">+</button>
            </div>
            <div class="text-xs text-[var(--text-secondary)] mt-2">Tap buttons to adjust tiles given to partner</div>
          </div>
        </div>
      </div>
    `,summaryContent:`
      <span>Sharing: <strong class="text-[var(--text-primary)]">${t} tiles</strong> (You keep ${l})</span>
      <span class="text-sm text-black">Round ${e+1} of ${s.length}</span>
    `,actionButtonId:"confirmTransferBtn",actionButtonText:e<s.length-1?"Confirm Allocation &rarr;":"Confirm & Finish &rarr;",progressText:`Round ${e+1} of ${s.length}`}),(v=document.getElementById("minusTileBtn"))==null||v.addEventListener("click",()=>{i="mouse",t>0&&(t--,a("resource_transferred",{trial_index:e,stimulus_id:d.stimulus_id,delta:-1,action_type:"return_to_user",input_modality:i,task_def_version:"1.0"}),p())}),(b=document.getElementById("plusTileBtn"))==null||b.addEventListener("click",()=>{i="mouse",t<d.user_initial&&(t++,a("resource_transferred",{trial_index:e,stimulus_id:d.stimulus_id,delta:1,action_type:"transfer_to_partner",input_modality:i,task_def_version:"1.0"}),p())}),(h=document.getElementById("confirmTransferBtn"))==null||h.addEventListener("click",()=>{a("allocation_confirmed",{trial_index:e,stimulus_id:d.stimulus_id,input_modality:i,task_def_version:"1.0"}),e<s.length-1?(e++,t=0,x(),p(),w()):o({mini_game:"C1",observations_count:s.length})})}function x(){const d=s[e];a("round_presented",{trial_index:e,stimulus_id:d.stimulus_id,input_modality:i,task_def_version:"1.0"})}p()}function xe(r,n,a,o){let e=0,t=null,i="mouse";const s=[{stimulus_id:"C2_R1",title:"Round 1: Open Wall Space",partner_desc:"Partner hung their painting on the top left corner.",slots:[{id:"SLOT_NORTH_RIGHT",label:"Top Right (Even Spacing)"},{id:"SLOT_OVERLAP_LEFT",label:"Next to Partner (Tight Cluster)"},{id:"SLOT_BOTTOM_CENTER",label:"Bottom Center (Center Spot)"}]},{stimulus_id:"C2_R2",title:"Round 2: Keep Hallway Clear",partner_desc:"Partner is framing the center hallway. Keep the doorway path clear.",slots:[{id:"SLOT_PERIMETER_EAST",label:"East Wall (Keeps Path Open)"},{id:"SLOT_CENTER_ADJACENT",label:"Center Slot (Crowds the Hall)"},{id:"SLOT_PERIMETER_WEST",label:"West Wall (Keeps Path Open)"}]}];function p(){var l,v,b,h;const d=s[e],c=d.slots.find(m=>m.id===t);r.innerHTML=E({worldCode:"W3",worldIndex:2,title:"The Gallery Wall",goal:"Choose where on the wall to hang your artwork alongside your partner's painting.",subtitle:"Coordinate artwork placement with your partner.",instructionPrompt:"Your Task",instruction:"Look at the wall layout above. Choose an open spot below to hang your artwork.",stimulusContent:`
      <div class="stage-content">
        <div class="wall-spots-canvas">
          <div class="partner-frame">Partner&#39;s Painting<br><span style="font-size:0.68rem; opacity:0.8;">(Already Hung)</span></div>
          <div class="hanging-spot-marker ${t===((l=d.slots[0])==null?void 0:l.id)?"active":""}" id="markerSpot1" style="right:20px; top:18px; width:72px; height:60px;">Spot 1</div>
          <div class="hanging-spot-marker ${t===((v=d.slots[1])==null?void 0:v.id)?"active":""}" id="markerSpot2" style="left:96px; top:24px; width:72px; height:76px;">Spot 2</div>
          <div class="hanging-spot-marker ${t===((b=d.slots[2])==null?void 0:b.id)?"active":""}" id="markerSpot3" style="bottom:12px; left:50%; transform:translateX(-50%); width:88px; height:46px;">Spot 3</div>
        </div>
        <div class="text-xs text-center text-[var(--text-secondary)] mt-2">
          ${d.partner_desc}
        </div>
      </div>
    `,interactionContent:`
      <div class="space-y-3">
        <div class="options-directive">
          <span>Choose where on the wall to hang your artwork:</span>
          <span style="font-size:0.75rem; color:var(--text-secondary);">Tap to select</span>
        </div>
        <div class="outside-options space-y-2.5">
          ${d.slots.map((m,f)=>{const g=String.fromCharCode(65+f);return`
              <button type="button" class="outside-opt-card slot-btn ${t===m.id?"selected":""}" data-slot="${m.id}" tabindex="0">
                <div class="opt-bullet">${g}</div>
                <div style="flex:1;">
                  <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${m.label}</div>
                  <div class="text-xs text-[var(--text-secondary)] mt-0.5">Wall Spot ${f+1}</div>
                </div>
              </button>
            `}).join("")}
        </div>
      </div>
    `,summaryContent:`
      <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${c==null?void 0:c.label}</strong>`:"Select a spot above to continue."}</span>
      <span class="text-sm text-black">Round ${e+1} of ${s.length}</span>
    `,actionButtonId:"confirmWallBtn",actionButtonText:e<s.length-1?"Confirm Placement &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Round ${e+1} of ${s.length}`}),r.querySelectorAll(".slot-btn").forEach(m=>{const f=g=>{i=g,t=m.getAttribute("data-slot"),a("placement_attempted",{trial_index:e,stimulus_id:d.stimulus_id,slot_id:t,input_modality:i,task_def_version:"1.0"}),p()};m.addEventListener("click",()=>f("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),f("keyboard"))})}),(h=document.getElementById("confirmWallBtn"))==null||h.addEventListener("click",()=>{a("placement_confirmed",{trial_index:e,stimulus_id:d.stimulus_id,chosen_slot:t,input_modality:i,task_def_version:"1.0"}),e<s.length-1?(e++,t=null,x(),p(),w()):o({mini_game:"C2",observations_count:s.length})})}function x(){const d=s[e];a("round_presented",{trial_index:e,stimulus_id:d.stimulus_id,task_def_version:"1.0"})}p()}function ve(r,n,a,o){let e=0,t=null,i=null,s="mouse";const p=[{stimulus_id:"C3_R1",title:"Opportunity 1: Partner Lantern is Dark",partner_state:"Your partner's lantern turned dark during setup.",condition_type:"identify_and_repair",fault_options:[{id:"fault_conduit_disconnected",label:"The wire came loose at the connector"},{id:"fault_bulb_broken",label:"The glass bulb is broken"},{id:"fault_switch_off",label:"The main hall switch is off"}],repair_options:[{id:"adjust_conduit",label:"Reconnect the loose wire and tighten the clamp"},{id:"call_help_desk",label:"Call the main help desk"},{id:"replace_lantern",label:"Take down the entire lamp"}],execution_action:"restore_power"},{stimulus_id:"C3_R2",title:"Opportunity 2: Hanging Rope Stuck",partner_state:"The hanging rope got caught in the wheel bracket.",condition_type:"identify_and_repair",fault_options:[{id:"fault_cable_pulley_pinch",label:"Rope is pinched between wheel and metal frame"},{id:"fault_cable_snapped",label:"The rope snapped completely"},{id:"fault_wall_anchor_loose",label:"The wall hook is loose"}],repair_options:[{id:"reseat_pulley_cable",label:"Loosen the lever and place the rope back on the wheel"},{id:"call_facility_maintenance",label:"File a general repair request"},{id:"force_pull_cable",label:"Pull the rope down hard"}],execution_action:"align_panel_height"},{stimulus_id:"C3_R3",title:"Opportunity 3: Shadow Blocks Artwork",partner_state:"A movable wooden screen casts a dark shadow over your partner's painting.",condition_type:"identify_and_repair",fault_options:[{id:"fault_blindspot_obstruction",label:"Wooden screen blocks the spotlight beam"},{id:"fault_color_distortion",label:"The light color looks wrong"}],repair_options:[{id:"shift_lantern",label:"Turn the spotlight slightly to shine around the screen"},{id:"generic_complaint",label:"Submit a general lighting complaint"}],execution_action:"illuminate_path"}];function x(){var v;const c=p[e];c.fault_options.find(b=>b.id===t);const l=c.repair_options.find(b=>b.id===i);r.innerHTML=`
 <div class="max-w-2xl mx-auto">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 3: The Shared Canvas</span>
 
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Dual Lanterns</h2>
 <p class="text-base text-black mt-0.5">Resolve studio issues to keep exhibition work moving.</p>
 </div>

 <!-- YOUR TASK -->
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed">
 Step 1: Identify what went wrong. Step 2: Choose how to fix it.
 </div>
 </div>

 <!-- LOOK AT THIS -->
 <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
 <span class="text-base text-[var(--text-primary)]">
 <strong>${c.title}:</strong> ${c.partner_state}
 </span>
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-medium">Stage ${e+1} of 3</span>
 </div>

 <!-- INTERACTION AREA -->
 <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
 <!-- Step 1: Identify Breakdown -->
 <div class="mb-4">
 <div class="text-base font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2 ">
 Step 1: What is the issue?
 </div>
 <div class="space-y-2">
 ${c.fault_options.map(b=>`
 <div class="fault-opt p-3 bg-white border ${t===b.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium":"border-[var(--grid-border)] "} rounded-xs cursor-pointer interactive-option text-base flex items-center gap-2 min-h-[44px]" data-fault="${b.id}" tabindex="0" role="button">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${t===b.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===b.id?"✓":""}</span>
 <span class="text-[var(--text-primary)]">${b.label}</span>
 </div>
 `).join("")}
 </div>
 </div>

 <!-- Step 2: Perform Constructive Repair -->
 ${t?`
 <div class="pt-4 border-t border-[var(--grid-border)] ">
 <div class="text-base font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2 ">
 Step 2: Choose a constructive fix:
 </div>
 <div class="space-y-2">
 ${c.repair_options.map(b=>`
 <div class="repair-opt p-3 bg-white border ${i===b.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium":"border-[var(--grid-border)] "} rounded-xs cursor-pointer interactive-option text-base flex items-center gap-2 min-h-[44px]" data-repair="${b.id}" tabindex="0" role="button">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${i===b.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${i===b.id?"✓":""}</span>
 <span class="text-[var(--text-primary)]">${b.label}</span>
 </div>
 `).join("")}
 </div>
 </div>
 `:""}
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>${t&&i?`Fix selected: <strong class="text-[var(--text-primary)]">${l==null?void 0:l.label}</strong>`:t?"Now choose a fix in Step 2.":"Select an issue in Step 1."}</span>
 <span class="text-sm text-black ">${e+1} / 3</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button type="button" id="executeRepairBtn" ${t&&i?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 ${e<2?"Apply Fix & Next Problem &rarr;":"Finish World 3 &rarr;"}
 </button>
 </div>
 </div>
 `,r.querySelectorAll(".fault-opt").forEach(b=>{const h=m=>{s=m,t=b.getAttribute("data-fault"),a("breakdown_identified",{trial_index:e,stimulus_id:c.stimulus_id,fault_id:t,input_modality:s,task_def_version:"1.0"}),x()};b.addEventListener("click",()=>h("mouse")),b.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),h("keyboard"))})}),r.querySelectorAll(".repair-opt").forEach(b=>{const h=m=>{s=m,i=b.getAttribute("data-repair"),a("repair_action_performed",{trial_index:e,stimulus_id:c.stimulus_id,repair_action_id:i,input_modality:s,task_def_version:"1.0"}),x()};b.addEventListener("click",()=>h("mouse")),b.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),h("keyboard"))})}),(v=document.getElementById("executeRepairBtn"))==null||v.addEventListener("click",()=>{a("repaired_action_executed",{trial_index:e,stimulus_id:c.stimulus_id,fault_id:t,repair_action_id:i,execution_action_id:c.execution_action,input_modality:s,task_def_version:"1.0"}),e<2?(e++,t=null,i=null,d(),x(),w()):o({mini_game:"C3",observations_count:3})})}function d(){const c=p[e];a("repair_presented",{trial_index:e,stimulus_id:c.stimulus_id,task_def_version:"1.0"})}x()}function fe(r,n){const{appContainer:a,miniGameIndex:o,gameId:e,logEvent:t,onMiniGameComplete:i}=r,s=e||(o===0?"E1":o===1?"E2":"E3");s==="E1"?ge(a,n,t,i):s==="E2"?he(a,n,t,i):ye(a,n,t,i)}function ge(r,n,a,o){let e=0,t=0,i="mouse";const s=[{stimulus_id:"E1_T1",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T2",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T3",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T4",color:"Sage",shape:"Square",icon:"&#9632;",label:"Sage Square"},{stimulus_id:"E1_T5",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T6",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T7",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T8",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"}];function p(){const d=s[e];r.innerHTML=E({worldCode:"W4",worldIndex:3,title:"The Ceramic Mosaic",goal:"Sort each tile into the matching container.",subtitle:"Sort each ceramic tile into the matching container.",instructionPrompt:"Your Task",instruction:"Tap Container 1 or Container 2 below to place this tile now.",stimulusContent:`
      <div class="stage-content">
        <div style="font-size:0.75rem; text-transform:uppercase; color:#baa890; margin-bottom:6px;">Tile to Sort (${e+1} of ${s.length})</div>
        <div style="width:72px; height:72px; background:${d.color==="Gold"?"#b38b4d":"#487352"}; border-radius:10px; border:2px solid ${d.color==="Gold"?"#5a421b":"#28442e"}; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 16px rgba(0,0,0,0.4); margin:0 auto;">
          <span style="font-size:2.4rem; color:#fff;">${d.shape==="Square"?"■":"●"}</span>
        </div>
        <div style="font-size:1rem; color:#f6efe5; margin-top:8px; font-weight:700;">${d.color} ${d.shape}</div>
      </div>
    `,interactionContent:`
      <div class="space-y-3">
        <div class="options-directive">
          <span>Tap Container 1 or Container 2 to place tile now:</span>
          <span style="font-size:0.75rem; color:var(--text-secondary);">Direct tap to sort</span>
        </div>
        <div class="mosaic-containers-row">
          <button type="button" class="container-box-btn bin-btn" data-choice="container_1" id="btnContainer1" tabindex="0">
            <div style="width:46px; height:46px; background:#b38b4d; border:2px solid #5a421b; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(0,0,0,0.18); margin:2px auto;">
              <span style="font-size:1.6rem; color:#fff; line-height:1;">●</span>
            </div>
            <div style="font-weight:700; font-size:1rem; margin-top:6px;">Container 1</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Reference: Gold Circle</div>
          </button>
          <button type="button" class="container-box-btn bin-btn" data-choice="container_2" id="btnContainer2" tabindex="0">
            <div style="width:46px; height:46px; background:#487352; border:2px solid #28442e; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(0,0,0,0.18); margin:2px auto;">
              <span style="font-size:1.6rem; color:#fff; line-height:1;">■</span>
            </div>
            <div style="font-weight:700; font-size:1rem; margin-top:6px;">Container 2</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Reference: Sage Square</div>
          </button>
        </div>
      </div>
    `,summaryContent:`
      <span>Sorting progress:</span>
      <span class="text-sm text-black">${e+1} / ${s.length}</span>
    `,progressText:`Tile ${e+1} of ${s.length}`}),r.querySelectorAll(".bin-btn").forEach(c=>{const l=v=>{i=v;const b=c.getAttribute("data-choice");c.style.borderColor="var(--accent-gold)";const h=Math.round(performance.now()-t);a("tile_sorted",{trial_index:e,stimulus_id:d.stimulus_id,choice:b,latency_ms:h,input_modality:i,task_def_version:"1.0"}),setTimeout(()=>{e<s.length-1?(e++,t=performance.now(),x(),p(),w()):o({mini_game:"E1",observations_count:s.length})},220)};c.addEventListener("click",v=>{v.preventDefault(),l("mouse")}),c.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),l("keyboard"))})})}function x(){const d=s[e];a("trial_presented",{trial_index:e,stimulus_id:d.stimulus_id,tile_color:d.color,tile_shape:d.shape,task_def_version:"1.0"})}p()}function he(r,n,a,o){let e=0,t=null,i="mouse";const s=[{stimulus_id:"E2_S1",title:"Sequence 1: Ink Spill on Desk",situation:"A small drop of ink spilled onto your active pattern card.",has_disruption:!0,disruption_type:"ink_spill_masking_workspace",options:[{id:"clear_workspace",label:"Dab ink with a cloth and straighten your card",note:"Calm cleanup"},{id:"rush_uncleaned",label:"Keep placing tiles around the wet ink",note:"Rushed step"},{id:"pause_idle",label:"Step away and wait for help",note:"Long wait"}]},{stimulus_id:"E2_S2",title:"Sequence 2: Calm Studio Work",situation:"The workbench is clean, tidy, and well lit.",has_disruption:!1,disruption_type:"undisrupted_control",options:[{id:"standard_sequence",label:"Continue placing tiles according to plan",note:"Steady step"},{id:"unnecessary_rework",label:"Take tiles apart to re-check for no reason",note:"Unneeded check"},{id:"pause_idle",label:"Stop and wait before continuing",note:"Unneeded pause"}]},{stimulus_id:"E2_S3",title:"Sequence 3: Breeze Blows Paper",situation:"A sudden breeze blew your reference drawing off the table.",has_disruption:!0,disruption_type:"draft_blows_reference_card",options:[{id:"stabilize_reference",label:"Pick up paper and weigh it down with a stone",note:"Fix and secure"},{id:"guess_motif",label:"Place tiles from memory without looking at plan",note:"Guessing"},{id:"pause_idle",label:"Wait for the wind to stop",note:"Waiting"}]}];function p(){var l;const d=s[e],c=d.options.find(v=>v.id===t);r.innerHTML=E({worldCode:"W4",worldIndex:3,title:"The Courtyard Setup",goal:"Respond calmly when unexpected studio events happen.",subtitle:"Choose the best response when unexpected studio events happen.",instructionPrompt:"Your Task",instruction:"Read what happened in the studio above. Choose your immediate response below.",stimulusContent:`
      <div class="stage-content space-y-3">
        <!-- Prominent Situation Cue -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs text-left">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold">${d.title}</span>
            <span class="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-medium">Studio Situation</span>
          </div>
          <div class="text-base sm:text-lg font-serif text-[var(--text-primary)] font-semibold leading-relaxed">
            ${d.situation}
          </div>
        </div>

        <!-- Visual Workshop Environment Tile -->
        <div class="realistic-ink-desk">
          <div class="desk-sheet">
            <div style="font-size:0.75rem; text-transform:uppercase; color:#786653; font-weight:700;">Studio Drawing Sheet</div>
            <div style="font-size:0.95rem; font-weight:700; margin:3px 0; color:#382d22;">${d.title}</div>
            <div style="font-size:0.85rem; color:#5c4e3f; line-height:1.4;">${d.situation}</div>
            ${d.stimulus_id==="E2_S1"?`
              <!-- Truly Random Organic Ink Splatter SVG -->
              <svg style="position:absolute; right:20px; bottom:10px; width:125px; height:95px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.6));" viewBox="0 0 120 90">
                <path d="M50,42 C38,30 22,38 18,50 C14,64 30,72 45,68 C58,65 65,74 78,70 C92,65 105,52 98,38 C92,25 78,20 68,32 C62,38 56,34 50,42 Z" fill="#0b0c0f"/>
                <path d="M72,30 C80,18 92,22 86,34 Z" fill="#0b0c0f"/>
                <circle cx="16" cy="36" r="3.2" fill="#0b0c0f"/>
                <circle cx="28" cy="22" r="2.4" fill="#0b0c0f"/>
                <circle cx="85" cy="18" r="3.8" fill="#0b0c0f"/>
                <circle cx="106" cy="46" r="2.8" fill="#0b0c0f"/>
                <circle cx="62" cy="78" r="3" fill="#0b0c0f"/>
                <circle cx="40" cy="80" r="2.2" fill="#0b0c0f"/>
              </svg>
            `:d.stimulus_id==="E2_S3"?`
              <!-- Wind Breeze Drift Graphic -->
              <div style="position:absolute; right:25px; bottom:15px; opacity:0.85; font-size:2.2rem;">
                🍃 📄
              </div>
            `:`
              <!-- Clean Steady Studio Graphic -->
              <div style="position:absolute; right:25px; bottom:15px; opacity:0.85; font-size:2.2rem;">
                ✨ 🎨
              </div>
            `}
          </div>
        </div>
      </div>
    `,interactionContent:`
      <div class="space-y-3">
        <div class="options-directive">
          <span>Choose what you would do right now:</span>
          <span style="font-size:0.75rem; color:var(--text-secondary);">Tap to select</span>
        </div>
        <div class="outside-options space-y-2.5">
          ${d.options.map((v,b)=>{const h=String.fromCharCode(65+b);return`
              <button type="button" class="outside-opt-card e2-opt ${t===v.id?"selected":""}" data-action="${v.id}" tabindex="0">
                <div class="opt-bullet">${h}</div>
                <div style="flex:1;">
                  <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${v.label}</div>
                  <div class="text-xs text-[var(--text-secondary)] mt-0.5">${v.note||""}</div>
                </div>
              </button>
            `}).join("")}
        </div>
      </div>
    `,summaryContent:`
      <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${c==null?void 0:c.label}</strong>`:"Select an option above to continue."}</span>
      <span class="text-sm text-black">${e+1} / ${s.length}</span>
    `,actionButtonId:"confirmE2Btn",actionButtonText:e<s.length-1?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Scenario ${e+1} of ${s.length}`}),r.querySelectorAll(".e2-opt").forEach(v=>{const b=h=>{i=h,t=v.getAttribute("data-action"),a("action_selected",{trial_index:e,stimulus_id:d.stimulus_id,action_id:t,input_modality:i,task_def_version:"1.0"}),p()};v.addEventListener("click",()=>b("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),b("keyboard"))})}),(l=document.getElementById("confirmE2Btn"))==null||l.addEventListener("click",()=>{a("sequence_completed",{trial_index:e,stimulus_id:d.stimulus_id,chosen_action:t,input_modality:i,task_def_version:"1.0"}),e<s.length-1?(e++,t=null,x(),p(),w()):o({mini_game:"E2",observations_count:s.length})})}function x(){const d=s[e];a("sequence_presented",{trial_index:e,stimulus_id:d.stimulus_id,has_disruption:d.has_disruption,disruption_type:d.disruption_type,task_def_version:"1.0"})}p()}function ye(r,n,a,o){let e=0,t=null,i="mouse";const s=[{stimulus_id:"E3_C1",title:"Condition 1: Three Colors Available",constraint_state:"standard_three_color_palette",description:"Gold, sage, and terracotta colors are all on the table.",options:[{id:"standard_layout",label:"Three-Color Pattern (Balanced three-color arrangement)"},{id:"tonal_adaptation",label:"Single Color Shades (One shade only)"},{id:"compact_adaptation",label:"Half-Grid Squeeze"}]},{stimulus_id:"E3_C2",title:"Condition 2: Only Indigo Blue Available",constraint_state:"monochrome_indigo_only",description:"Only one blue color is available on the table.",options:[{id:"tonal_adaptation",label:"Light and Dark Shading (Create depth using light and dark tones)"},{id:"standard_layout",label:"Try Three Colors (Cannot be done with one color)"},{id:"compact_adaptation",label:"Small Stamp Layout"}]},{stimulus_id:"E3_C3",title:"Condition 3: Half-Size Wall Space",constraint_state:"boundary_constricted_half_grid",description:"The wall space is cut in half. The artwork must fit smaller dimensions.",options:[{id:"compact_adaptation",label:"Compact Small Design (Scale down pattern to fit half wall)"},{id:"standard_layout",label:"Full Size Layout (Too wide for the small wall)"},{id:"tonal_adaptation",label:"Unscaled Shading Layout"}]}];function p(){var l;const d=s[e],c=d.options.find(v=>v.id===t);r.innerHTML=`
 <div class="max-w-2xl mx-auto">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 4: The Shifting Grid</span>
 
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Shifting Medium</h2>
 <p class="text-base text-black mt-0.5">Adapt design layout to active studio conditions.</p>
 </div>

 <!-- YOUR TASK -->
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed">
 Read the active condition below. Pick the layout that fits best.
 </div>
 </div>

 <!-- LOOK AT THIS -->
 <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
 <span class="text-base text-[var(--text-primary)]">
 <strong>${d.title}:</strong> ${d.description}
 </span>
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-medium">Layout ${e+1} of ${s.length}</span>
 </div>

 <!-- INTERACTION AREA -->
 <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Layout Options:</div>
 <div class="space-y-2.5">
 ${d.options.map(v=>`
 <div class="e3-opt p-3.5 bg-white border ${t===v.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-layout="${v.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===v.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===v.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${v.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Option ${v.id.replace("LAYOUT_","")}</span>
 </div>
 `).join("")}
 </div>
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${c==null?void 0:c.label}</strong>`:"Select a layout above to continue."}</span>
 <span class="text-sm text-black ">${e+1} / ${s.length}</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button type="button" id="confirmE3Btn" ${t?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 ${e<s.length-1?"Confirm Layout &rarr;":"Finish World 4 &rarr;"}
 </button>
 </div>
 </div>
 `,r.querySelectorAll(".e3-opt").forEach(v=>{const b=h=>{i=h,t=v.getAttribute("data-layout"),a("composition_action_attempted",{trial_index:e,stimulus_id:d.stimulus_id,action_id:t,input_modality:i,task_def_version:"1.0"}),p()};v.addEventListener("click",()=>b("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),b("keyboard"))})}),(l=document.getElementById("confirmE3Btn"))==null||l.addEventListener("click",()=>{a("composition_confirmed",{trial_index:e,stimulus_id:d.stimulus_id,chosen_action:t,input_modality:i,task_def_version:"1.0"}),e<s.length-1?(e++,t=null,x(),p(),w()):o({mini_game:"E3",observations_count:3})})}function x(){const d=s[e];a("condition_presented",{trial_index:e,stimulus_id:d.stimulus_id,constraint_state:d.constraint_state,task_def_version:"1.0"})}p()}function _e(r,n){const{appContainer:a,miniGameIndex:o,gameId:e,logEvent:t,onMiniGameComplete:i}=r,s=e||(o===0?"Q1":o===1?"Q2":"Q3");s==="Q1"?we(a,n,t,i):s==="Q2"?ke(a,n,t,i):Se(a,n,t,i)}function we(r,n,a,o){let e=0,t=null,i={},s="mouse";const p=[{stimulus_id:"Q1_D1",title:"Old Handwritten Manuscript Page",scenario:"Choose the best way to protect this delicate 19th-century manuscript page.",options:[{id:"flexible_cord_binding",label:"Soft Cord Binding (Allows the spine to bend gently)"},{id:"tight_adhesive_clamp",label:"Firm Glue Clamp (Holds the edge tight and stiff)"},{id:"unbound_portfolio",label:"Clean Paper Folder (Kept loose inside a safe folder)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Binding Methods Note",info_value:"high",summary:"Local bookbinders used soft cord to protect delicate paper borders."},{id:"OPT_CONTROL_1",topic:"Library Stamp Dates",info_value:"low",summary:"City library stamps began in late October 1888."}]},{stimulus_id:"Q1_D2",title:"Painted Wooden Pen Case",scenario:"The paint is old and tiny pieces of shiny coat are peeling off. Choose how to care for it.",options:[{id:"curing_linseed_glaze",label:"Natural Plant Oil (Wipes gently and dries slowly)"},{id:"quick_synthetic_seal",label:"Quick Spray Polish (Dries fast with a shiny coat)"},{id:"wax_buff_only",label:"Clean Dry Cloth (Gentle dry rub with soft cloth)"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Pen Case Care Note",info_value:"high",summary:"Natural oil dries slowly and keeps paint bright without cracking."},{id:"OPT_CONTROL_2",topic:"Cabinet Hinge Maintenance",info_value:"low",summary:"Brass display cabinet hinges need oiling twice each year."}]},{stimulus_id:"Q1_D3",title:"Artisan Workshop Register",scenario:"Identify the origin of this undated workshop record book.",options:[{id:"guild_ledger_verified",label:"Crafts Guild Register (Has official guild stamp)"},{id:"private_merchant_tally",label:"Shopkeeper Daily Notebook (Informal daily sales notes)"},{id:"state_excise_record",label:"City Tax Register (Official tax collection book)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Register Stitching Styles",info_value:"high",summary:"Red thread stitching was reserved for registered craft guilds."},{id:"OPT_CONTROL_1",topic:"Filing Code Reference",info_value:"low",summary:"Old municipal tax files use code series B."}]}];function x(){var b,h,m;const c=p[e],l=Object.keys(i).length>0;r.innerHTML=E({worldCode:"W5",worldIndex:4,title:"The Curatorial Dossier",goal:"Choose the best way to care for old objects.",subtitle:"Choose the best way to care for each historic item.",instructionPrompt:"Your Task",instruction:"Review the object and choose the best care action below. Open the research tip if helpful.",stimulusContent:`
      <div class="stage-content">
        <div style="width:92%; background:#2c241d; border:1px solid #4a3d31; border-radius:10px; padding:16px; margin:0 auto; text-align:left;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
            <span style="font-size:0.75rem; color:#d8baa0; text-transform:uppercase; font-weight:700;">Old Object ${e+1} of ${p.length}</span>
            <button type="button" class="btn ${l?"":"pulse-btn"}" id="btnResearchNote" style="padding:6px 12px; font-size:0.78rem; background:#4a392b; color:#ffffff; border:1.5px solid var(--accent-gold);">
              ${l?"📖 Research Tip Opened":"📖 Open Research Tip"}
            </button>
          </div>
          <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:6px;">${c.title}</div>
          <p style="font-size:0.88rem; color:#cfc2b2; margin:0; line-height:1.5;">
            ${c.scenario}
          </p>
          <div id="tipBox" style="display:${l?"block":"none"}; margin-top:12px; padding:10px 14px; background:#1e1712; border-left:3px solid var(--accent-gold); font-size:0.84rem; color:#e0d0b8; border-radius:4px;">
            <b>Tip from old makers:</b> ${((b=c.optional_resources[0])==null?void 0:b.summary)||"Natural tree oil dries slowly and keeps paint bright without cracking."}
          </div>
        </div>
      </div>
    `,interactionContent:`
      <div class="space-y-4">
        <!-- Outside Actions with A, B, C bullets -->
        <div class="space-y-3">
          <div class="options-directive">
            <span>Choose how to care for this object:</span>
            <span style="font-size:0.75rem; color:var(--text-secondary);">Tap to select</span>
          </div>
          <div class="outside-options space-y-2.5">
            ${c.options.map((f,g)=>{const y=String.fromCharCode(65+g);return`
                <button type="button" class="outside-opt-card q1-opt ${t===f.id?"selected":""}" data-choice="${f.id}" tabindex="0">
                  <div class="opt-bullet">${y}</div>
                  <div style="flex:1;">
                    <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${f.label}</div>
                    <div class="text-xs text-[var(--text-secondary)] mt-0.5">Action ${y}</div>
                  </div>
                </button>
              `}).join("")}
          </div>
        </div>
      </div>
    `,summaryContent:`
      <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${(h=c.options.find(f=>f.id===t))==null?void 0:h.label}</strong>`:"Select an action above to continue."}</span>
      <span class="text-sm text-black">${e+1} / ${p.length}</span>
    `,actionButtonId:"confirmQ1Btn",actionButtonText:e<p.length-1?"Confirm Decision &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Record ${e+1} of ${p.length}`});const v=document.getElementById("btnResearchNote");v&&(v.onclick=()=>{var g;const f=((g=c.optional_resources[0])==null?void 0:g.id)||"OPT_USEFUL_1";i[f]=!0,a("optional_resource_viewed",{trial_index:e,stimulus_id:c.stimulus_id,resource_id:f,input_modality:"mouse",task_def_version:"1.0"}),x()}),r.querySelectorAll(".opt-res-card").forEach(f=>{f.addEventListener("click",()=>{s="mouse";const g=f.getAttribute("data-res");i[g]=!0,a("optional_resource_viewed",{trial_index:e,stimulus_id:c.stimulus_id,resource_id:g,input_modality:s,task_def_version:"1.0"}),x()})}),r.querySelectorAll(".q1-opt").forEach(f=>{const g=y=>{s=y,t=f.getAttribute("data-choice"),x()};f.addEventListener("click",()=>g("mouse")),f.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),g("keyboard"))})}),(m=document.getElementById("confirmQ1Btn"))==null||m.addEventListener("click",()=>{a("decision_submitted",{trial_index:e,stimulus_id:c.stimulus_id,choice:t,input_modality:s,task_def_version:"1.0"}),e<p.length-1?(e++,t=null,i={},d(),x(),w()):o({mini_game:"Q1",observations_count:p.length})})}function d(){const c=p[e];a("decision_presented",{trial_index:e,stimulus_id:c.stimulus_id,task_def_version:"1.0"})}x()}function ke(r,n,a,o){let e=0,t={},i=null,s="mouse";const p=[{stimulus_id:"Q2_T1",artifact_id:"manuscript_seal_1",title:"Relic 1: Wax Seal on Parchment",description:"A dark red wax seal stamped onto an old parchment document.",uncertainty_level:"moderate",expected_value:"high",clues:[{id:"CLUE_SEAL_INTAGLIO",label:"Carved Seal Border Script",detail:"Shows the official stamp of the Srinagar city office from 1862."},{id:"CLUE_WAX_RESIN",label:"Wax Material Analysis",detail:"Made with local pine resin rather than imported European wax."},{id:"CLUE_PARCHMENT_GRAIN",label:"Parchment Skin Grain",detail:"Mountain goatskin with hand-scraped natural grain."}],attributions:[{id:"attr_imperial_registrar_srinagar",label:"City Office of Srinagar (1860s)"},{id:"attr_commercial_trader",label:"River Trader Shipping Record"},{id:"attr_modern_reproduction",label:"Modern Souvenir Copy"}]},{stimulus_id:"Q2_T2",artifact_id:"ciphered_marginalia_2",title:"Relic 2: Star Chart with Handwritten Notes",description:"Handwritten notes written in old cursive script along a star chart.",uncertainty_level:"high",expected_value:"high",clues:[{id:"CLUE_CIPHER_DIACRITIC",label:"Script Number Marks",detail:"Notes record the date of an eclipse in 1845."},{id:"CLUE_SCRIBE_HAND",label:"Penmanship Style",detail:"Matches the private notebook of court scholar Mir Habib."},{id:"CLUE_GALL_INK_CORROSION",label:"Ink Aging Depth",detail:"Natural ink aging shows paper is over 170 years old."}],attributions:[{id:"attr_court_astrologer_notebook",label:"Court Scholar Personal Notebook"},{id:"attr_apothecary_recipe",label:"Herbal Medicine Recipe"},{id:"attr_random_scribble",label:"Scribe Practice Scratches"}]},{stimulus_id:"Q2_T3",artifact_id:"standard_receipt_3",title:"Relic 3: City Transit Toll Receipt (Control)",description:"A printed paper slip with standard columns and serial numbers.",uncertainty_level:"low",expected_value:"low_control",clues:[{id:"CLUE_PRINT_TYPE",label:"Standard Moveable Type",detail:"Mass-printed transit slip used for routine city transport."},{id:"CLUE_STAMP_INK",label:"Routine Blue Ink Stamp",detail:"Common government office stamp with standard numbering."}],attributions:[{id:"attr_standard_tax_slip",label:"City Transit Pass Receipt"},{id:"attr_royal_chancery_grant",label:"Palace Land Grant"},{id:"attr_secret_monastery_order",label:"Monastic Travel Permission"}]}],x=[{badgeText:"SEAL",badgeBg:"#963728",badgeBorder:"#5a1c12",padBorder:"#48392d",noun:"wax seal",surface:"Velvet Display Pad"},{badgeText:"CHART",badgeBg:"#233554",badgeBorder:"#142038",padBorder:"#2d3d5e",noun:"star chart",surface:"Study Folio Desk"},{badgeText:"RECEIPT",badgeBg:"#443b32",badgeBorder:"#28221b",padBorder:"#4a3f35",noun:"transit receipt",surface:"Archival Tray"}];function d(){var m,f;const l=p[e],v=x[e]||x[0],b=Object.keys(t).pop(),h=b?l.clues.find(g=>g.id===b):null;r.innerHTML=E({worldCode:"W5",worldIndex:4,title:"The Relic Anomaly",goal:"Inspect clues on the old object to find where it came from.",subtitle:"Inspect physical clues to identify each historic object.",instructionPrompt:"Your Task",instruction:`Complete Step 1 by inspecting clues. Then choose where this ${v.noun} came from in Step 2.`,stimulusContent:`
      <div class="stage-content">
        <div style="width:86%; background:#292019; border:1.5px solid ${v.padBorder}; border-radius:10px; padding:16px; text-align:center; margin:0 auto;">
          <div style="font-size:0.75rem; color:#d8baa0; text-transform:uppercase; font-weight:700; letter-spacing:0.04em;">Historical Artifact on ${v.surface}</div>
          <div style="width:54px; height:54px; border-radius:50%; background:${v.badgeBg}; margin:10px auto; display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.72rem; font-weight:800; box-shadow:0 4px 10px rgba(0,0,0,0.5); border:2px solid ${v.badgeBorder}; letter-spacing:0.05em;">
            ${v.badgeText}
          </div>
          <div style="font-size:0.92rem; color:#f0e2d2; font-weight:600;">${l.title}</div>
          <div style="font-size:0.78rem; color:#ad9e8e; margin-top:3px; line-height:1.4;">${l.description}</div>
          <div style="font-size:0.75rem; color:#c4a482; margin-top:4px; font-style:italic;">Origin unknown · Inspect clues below to identify</div>
        </div>
      </div>
    `,interactionContent:`
      <div class="space-y-4">
        <!-- Step 1 Outside Tile: Clues Inspection Grid -->
        <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
          <div class="flex items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
            <span class="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold flex items-center justify-center font-serif">1</span>
            <span class="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">Step 1: Tap to check clues on this ${v.noun}</span>
          </div>
          <div class="flex gap-2 flex-wrap" id="clueRow">
            ${l.clues.map(g=>`
              <button type="button" class="btn clue-btn ${t[g.id]?"selected bg-amber-50/70 border-[var(--accent-gold)]":"bg-white border-[var(--grid-border)]"}" style="flex:1; min-width:120px; padding:8px 10px; font-size:0.8rem;" data-clue="${g.id}">
                🔍 ${g.label}
              </button>
            `).join("")}
          </div>
          <div id="clueNoteBox" class="text-xs sm:text-sm text-[var(--text-primary)] p-2.5 bg-[#faf8f5] rounded-xs border border-[var(--grid-border)]">
            ${h?`<b>${h.label}:</b> ${h.detail}`:"Tap any clue button above to inspect physical details."}
          </div>
        </div>

        <!-- Step 2 Outside Tile: Origin Attributions -->
        <div class="space-y-3">
          <div class="options-directive">
            <span>Step 2: Choose where this ${v.noun} came from:</span>
            <span style="font-size:0.75rem; color:var(--text-secondary);">Tap to select</span>
          </div>
          <div class="outside-options space-y-2.5">
            ${l.attributions.map((g,y)=>{const _=String.fromCharCode(65+y);return`
                <button type="button" class="outside-opt-card q2-attr ${i===g.id?"selected":""}" data-attr="${g.id}" tabindex="0">
                  <div class="opt-bullet">${_}</div>
                  <div style="flex:1;">
                    <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${g.label}</div>
                    <div class="text-xs text-[var(--text-secondary)] mt-0.5">Origin ${_}</div>
                  </div>
                </button>
              `}).join("")}
          </div>
        </div>
      </div>
    `,summaryContent:`
      <span>${i?`You selected: <strong class="text-[var(--text-primary)]">${(m=l.attributions.find(g=>g.id===i))==null?void 0:m.label}</strong>`:"Inspect clues and select an origin."}</span>
      <span class="text-sm text-black">${e+1} / ${p.length}</span>
    `,actionButtonId:"confirmQ2Btn",actionButtonText:e<p.length-1?"Confirm Origin &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!i,progressText:`Relic ${e+1} of ${p.length}`}),r.querySelectorAll(".clue-btn").forEach(g=>{const y=_=>{s=_;const C=g.getAttribute("data-clue");t[C]=!0,a("clue_inspected",{trial_index:e,stimulus_id:l.stimulus_id,artifact_id:l.artifact_id,clue_id:C,input_modality:s,task_def_version:"1.0"}),d()};g.addEventListener("click",()=>y("mouse")),g.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),y("keyboard"))})}),r.querySelectorAll(".q2-attr").forEach(g=>{const y=_=>{s=_,i=g.getAttribute("data-attr"),d()};g.addEventListener("click",()=>y("mouse")),g.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),y("keyboard"))})}),(f=document.getElementById("confirmQ2Btn"))==null||f.addEventListener("click",()=>{a("investigation_finalized",{trial_index:e,stimulus_id:l.stimulus_id,artifact_id:l.artifact_id,attribution_choice:i,input_modality:s,task_def_version:"1.0"}),e<p.length-1?(e++,t={},i=null,c(),d(),w()):o({mini_game:"Q2",observations_count:p.length})})}function c(){const l=p[e];a("artifact_presented",{trial_index:e,stimulus_id:l.stimulus_id,artifact_id:l.artifact_id,uncertainty_level:l.uncertainty_level,expected_value:l.expected_value,task_def_version:"1.0"})}d()}function Se(r,n,a,o){let e=0,t=!1,i=null,s="mouse";const p=[{stimulus_id:"Q3_E1",title:"Episode 1: The Master Painter’s Folio",ambiguity_type:"unattributed_artisan_folio",ambiguity_text:"An illuminated folio has gold dust borders and charcoal sketches. Two master painters worked during this era.",context_id:"provenance_context_1",context_title:"Rainawari Workshop Records (1870–1885)",context_text:"Records confirm Master Sadiq worked in Rainawari. He used willow-branch charcoal sketches and lapis blue borders.",decision_question:"Attribute the folio maker and technique lineage:",choices:[{id:"choice_sadiq_rainawari",label:"Master Sadiq (Rainawari workshop — willow charcoal sketch)"},{id:"choice_habib_court",label:"Master Habib (Palace court — imported graphite pencil)"},{id:"choice_generic_bazaar",label:"General City Market Production"}]},{stimulus_id:"Q3_E2",title:"Episode 2: The Exhibition Pavilion Ceiling",ambiguity_type:"mismatched_period_provenance",ambiguity_text:"A carved ceiling panel displays woodwork styles from two different rebuilding periods.",context_id:"provenance_context_2",context_title:"Dal Lake Pavilion Repair Notes (1902)",context_text:"Following the 1902 Dal Lake flood, builders used seasoned cedar wood. Earlier builders used soft river pine.",decision_question:"Identify the structural timber and repair era:",choices:[{id:"choice_post_flood_cedar",label:"Post-1902 Flood Repair (Seasoned mountain cedar wood)"},{id:"choice_pre_flood_pine",label:"Original Pre-Flood Building (Soft river pine wood)"},{id:"choice_modern_concrete",label:"Twentieth Century Replica"}]},{stimulus_id:"Q3_E3",title:"Episode 3: The Woven Silk Couplet",ambiguity_type:"regional_dialect_verse_origin",ambiguity_text:"A woven silk pashmina scarf has an old Kashmiri verse embroidered on it.",context_id:"provenance_context_3",context_title:"Valley Poetry Records (Lalla-Ded Shrines)",context_text:"Verses with this 4-beat pattern come from southern valley shrines (Pampore and Tral).",decision_question:"Select the verified cultural origin of this verse:",choices:[{id:"choice_southern_vakh_shrine",label:"Southern Valley Shrine Verse (Traditional 4-beat rhythm)"},{id:"choice_urban_court_ghazal",label:"Palace Court Scribe Poem (Formal Persian rhyming meter)"},{id:"choice_folk_bazaar_song",label:"Traveling Caravan Folk Song"}]}];function x(){var l,v;const c=p[e];r.innerHTML=`
 <div class="">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 5: The Hidden Gallery</span>
 
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Weaver's Chronicle</h2>
 <p class="text-base text-black mt-0.5">Connect historical clues to solve catalog questions.</p>
 </div>

 <!-- YOUR TASK -->
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed">
 Read the mystery below. You may open the reference note. Choose the best answer to continue.
 </div>
 </div>

 <!-- LOOK AT THIS -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-4 shadow-xs rounded-xs candidate-content-protected">
 <div class="flex items-center justify-between mb-2">
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Historic Case</span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Case ${e+1} of 3</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${c.title}</div>
 <div class="text-base text-black mt-1.5 leading-relaxed">${c.ambiguity_text}</div>
 </div>

 <!-- INTERACTION AREA 1: Optional Context Retrieval -->
 <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
 <span class="text-sm uppercase text-[var(--accent-gold)] font-semibold tracking-wider">Archival Research Note</span>
 ${t?'<span class="text-sm text-[var(--text-primary)] font-semibold uppercase">Note Opened</span>':`
 <button type="button" id="retrieveContextBtn" class="px-4 py-2 bg-white border border-[var(--grid-border)] text-sm uppercase tracking-wider text-[var(--text-primary)] interactive-option rounded-xs shadow-xs min-h-[44px] flex items-center justify-center gap-1.5" tabindex="0">
 <span>Open Research Note</span> &rarr;
 </button>
 `}
 </div>

 ${t?`
 <div class="p-3.5 bg-white border border-emerald-600/40 rounded-xs text-base text-[var(--text-primary)] leading-relaxed ">
 <div class="text-sm uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-1">${c.context_title}</div>
 <div>${c.context_text}</div>
 </div>
 `:`
 <div class="text-base text-black italic">
 Optional research notes are available to clarify historic details.
 </div>
 `}
 </div>

 <!-- YOUR CHOICE: Downstream Integration Decision -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">${c.decision_question}</div>
 <div class="space-y-2.5">
 ${c.choices.map(b=>`
 <div class="q3-choice p-3.5 bg-white border ${i===b.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-choice="${b.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2.5">
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${i===b.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${i===b.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${b.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium shrink-0">Format ${b.id.replace("CHOICE_","")}</span>
 </div>
 `).join("")}
 </div>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end mb-4">
 <button type="button" id="confirmQ3Btn" ${i?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 ${e<p.length-1?"Confirm Choice &rarr;":"Finish World 5 &rarr;"}
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${e+1} of ${p.length}
 </div>
 </div>
 `,(l=document.getElementById("retrieveContextBtn"))==null||l.addEventListener("click",()=>{s="mouse",t=!0,a("context_requested",{trial_index:e,stimulus_id:c.stimulus_id,context_id:c.context_id,input_modality:s,task_def_version:"1.0"}),x()}),r.querySelectorAll(".q3-choice").forEach(b=>{const h=m=>{s=m,i=b.getAttribute("data-choice"),x()};b.addEventListener("click",()=>h("mouse")),b.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),h("keyboard"))})}),(v=document.getElementById("confirmQ3Btn"))==null||v.addEventListener("click",()=>{a("decision_submitted",{trial_index:e,stimulus_id:c.stimulus_id,choice:i,input_modality:s,task_def_version:"1.0"}),e<p.length-1?(e++,t=!1,i=null,d(),x(),w()):o({mini_game:"Q3",observations_count:3})})}function d(){const c=p[e];a("episode_presented",{trial_index:e,stimulus_id:c.stimulus_id,ambiguity_type:c.ambiguity_type,task_def_version:"1.0"})}x()}function Te(r,n){const{appContainer:a,miniGameIndex:o,gameId:e,logEvent:t,onMiniGameComplete:i}=r,s=e||(o===0?"CR1":o===1?"CR3":"CR2");s==="CR1"?Ce(a,n,t,i):s==="CR3"?Ae(a,n,t,i):Ee(a,n,t,i)}function Ce(r,n,a,o){let e=0,t=[],i=null,s="mouse";const p=[{stage_id:"CR1_S1",title:"Stage 1: The Weaving Shuttle Rig",constraint:"missing_crossbar_shuttle",scenario:"A walnut loom shuttle crossbar has cracked. Build a working replacement with studio parts.",materials:[{id:"M_SPLIT_BAMBOO",name:"Split Bamboo Rib",icon:"&#127883;",role:"Flexible wooden bar"},{id:"M_BRASS_ROD",name:"Slotted Brass Rod",icon:"&#128296;",role:"Stiff metal bar"},{id:"M_CARVED_PINE",name:"Carved Pine Peg",icon:"&#129685;",role:"Lightweight wooden pin"},{id:"M_WAXED_CORD",name:"Waxed Linen Cord",icon:"&#129526;",role:"Strong binding string"},{id:"M_CERAMIC_WEIGHT",name:"Ceramic Weight",icon:"&#9711;",role:"Small balancing weight"}],valid_combinations:[["M_SPLIT_BAMBOO","M_WAXED_CORD"],["M_BRASS_ROD"],["M_CARVED_PINE","M_CERAMIC_WEIGHT"]]},{stage_id:"CR1_S2",title:"Stage 2: The Warp Tension Anchor",constraint:"tension_wire_unanchored",scenario:"The side tension cord needs an anchor point. Assemble a secure tie-down rig.",materials:[{id:"M_LEATHER_STRAP",name:"Leather Cinch Strap",icon:"&#129526;",role:"Firm gripping strap"},{id:"M_NOTCHED_PEG",name:"Hardwood Anchor Peg",icon:"&#129685;",role:"Notched wooden wedge"},{id:"M_COPPER_WIRE",name:"Flexible Copper Wire",icon:"&#9874;",role:"Bendable wrapping wire"},{id:"M_STONE_COUNTER",name:"Counterweight Stone",icon:"&#11044;",role:"Heavy balance stone"}],valid_combinations:[["M_LEATHER_STRAP","M_NOTCHED_PEG"],["M_COPPER_WIRE"],["M_LEATHER_STRAP","M_STONE_COUNTER"]]}];function x(){var v;const c=p[e];r.innerHTML=E({worldCode:"W6",worldIndex:5,title:"The Artisan's Assembly",goal:"Assemble working loom parts to replace a cracked shuttle crossbar.",subtitle:"Fix the broken part using items on the workbench.",instructionPrompt:"Your Task",instruction:"Equip parts from the workbench below, test your setup, and confirm.",stimulusContent:`
      <div class="stage-content">
        <div class="loom-rig-preview">
          <div style="font-size:0.72rem; text-transform:uppercase; color:#baa088; font-weight:700;">Weaving Loom Workbench</div>
          <div style="font-size:0.88rem; color:#f0e5d8; margin:2px 0;">${c.scenario}</div>
          <div class="rig-parts-row" id="equippedList">
            ${t.length===0?'<span style="color:#8a7968; font-size:0.75rem;">No items equipped yet</span>':t.map(b=>{var h;return'<span class="equipped-pill">'+(((h=c.materials.find(m=>m.id===b))==null?void 0:h.name)||b)+"</span>"}).join(" ")}
          </div>
        </div>
        <div class="tile-bottom-guide">⬇ Equip parts below, then click Test Setup</div>
      </div>
    `,interactionContent:`
      <div class="space-y-4">
        <!-- Step 1: Materials Options on Workbench -->
        <div class="space-y-2">
          <div class="options-directive">
            <span>Tap items below to equip or remove from workbench:</span>
            <span style="font-size:0.75rem; color:var(--text-secondary);">Add or remove</span>
          </div>
          <div class="materials-chip-grid" id="matGrid">
            ${c.materials.map(b=>{const h=t.includes(b.id);return`
                <div class="material-chip part-card ${h?"equipped":""}" data-id="${b.id}" tabindex="0" role="button">
                  <div>
                    <div class="font-bold text-sm sm:text-base text-[var(--text-primary)]">${b.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary);">${b.role}</div>
                  </div>
                  <span class="chip-state">${h?"✓ Added":"+ Add"}</span>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- Step 2: Dedicated Test Setup Area Placed AFTER Options and BEFORE Confirm Button -->
        <div style="background:var(--card); border:1.5px solid var(--grid-border); border-radius:var(--radius-md); padding:14px; margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-weight:700; font-size:0.92rem; color:var(--text-primary);">Test Your Assembled Parts</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);" id="testStatusText">
              ${i?i.valid?"✓ Setup works! Loom parts hold firmly.":i.message:t.length>0?"Parts equipped. Click Test Setup.":"Equip parts above, then test."}
            </div>
          </div>
          <button type="button" class="btn" id="btnTestRig" style="background:#4a392b; color:#ffffff; border:1px solid #68523e; padding:8px 18px; font-weight:700; border-radius:var(--radius-sm);" ${t.length===0?"disabled":""}>
            🔧 Test Setup
          </button>
        </div>
      </div>
    `,summaryContent:`
      <span>Equipped: <strong class="text-[var(--text-primary)]">${t.length>0?t.map(b=>{var h;return(h=c.materials.find(m=>m.id===b))==null?void 0:h.name}).join(" + "):"None"}</strong></span>
      <span class="text-sm text-black">Stage ${e+1} of ${p.length}</span>
    `,actionButtonId:"confirmStageBtn",actionButtonText:e<p.length-1?"Confirm Assembly &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:t.length===0,progressText:`Stage ${e+1} of ${p.length}`});const l=document.getElementById("btnTestRig");l&&(l.onclick=()=>{s="mouse";const b=new Set(t),h=c.valid_combinations.some(m=>m.every(f=>b.has(f)));i={valid:h,message:h?"Tension test passed. The loom parts balance smoothly.":"Test note: The parts wobble or do not connect tightly."},a("assembly_tested",{stage_id:c.stage_id,trial_index:e,parts:[...t],is_functional:h,input_modality:s,task_def_version:"1.0"}),x()}),r.querySelectorAll(".part-card").forEach(b=>{const h=m=>{s=m;const f=b.getAttribute("data-id");t.includes(f)?t=t.filter(g=>g!==f):t.push(f),i=null,a("part_toggled",{stage_id:c.stage_id,trial_index:e,part_id:f,selected_parts:[...t],input_modality:s,task_def_version:"1.0"}),x()};b.addEventListener("click",()=>h("mouse")),b.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),h("keyboard"))})}),(v=document.getElementById("confirmStageBtn"))==null||v.addEventListener("click",()=>{a("stage_completed",{stage_id:c.stage_id,trial_index:e,final_parts:[...t],input_modality:s,task_def_version:"1.0"}),e<p.length-1?(e++,t=[],i=null,d(),x(),w()):o({mini_game:"CR1",observations_count:2})})}function d(){const c=p[e];a("stage_presented",{stage_id:c.stage_id,trial_index:e,constraint:c.constraint,task_def_version:"1.0"})}x()}function Ee(r,n,a,o){let e=0,t="pre_shift",i=null,s=null,p="mouse";const x=[{episode_id:"CR2_E1",title:"Episode 1: The Central Pillar Chamber",pre_context:"Plan visitor walking paths through the grand exhibition hall.",pre_strategies:[{id:"S_CENTRAL_AVENUE",label:"Central Promenade",desc:"Single straight walkway down the center."},{id:"S_PERIMETER_LOOP",label:"Outer Wall Loop",desc:"Continuous gentle loop along outer walls."},{id:"S_ALCOVE_ISLANDS",label:"Display Islands",desc:"Separate display clusters across the floor."}],constraint_change:"central_pillar_blocks_corridor",shift_description:"Notice: A large carved stone pillar blocks the direct central pathway.",post_strategies:[{id:"split_flow",label:"Twin Walking Corridors (Split visitors smoothly around both sides of the pillar)",note:"Adapted Flow"},{id:"linear_flow",label:"Single Left Path (Route all visitors down the left aisle)",note:"Linear Channel"},{id:"stop_gap",label:"Central Waiting Area (Pause visitors and let small groups enter in turns)",note:"Batch Entry"}]},{episode_id:"CR2_E2",title:"Episode 2: West Gallery Safety Clearance",pre_context:"Arrange display stands across the wide western gallery corridor.",pre_strategies:[{id:"S_WALL_PANORAMA",label:"Wall Art Series",desc:"Continuous artwork hung along the west wall."},{id:"S_TRANSVERSE_SCREENS",label:"Crosswise Screens",desc:"Folding screens set across the corridor."},{id:"S_PAIRED_PLINTHS",label:"Center Display Stands",desc:"Two rows of waist-high display stands."}],constraint_change:"emergency_exit_clearance_widened",shift_description:"Safety rule: Keep a 3-meter wide open walkway along the west wall.",post_strategies:[{id:"perimeter_flow",label:"Clear Wall Pathway (Move displays inward to leave the west wall open)",note:"Adapted Flow"},{id:"central_cluster",label:"Center Grouping (Gather all stands tightly in the room center)",note:"Center Group"},{id:"diagonal_crossing",label:"Diagonal Zigzag (Weave walking paths between the doorways)",note:"Zigzag Path"}]},{episode_id:"CR2_E3",title:"Episode 3: North Archway Clearance",pre_context:"Display vertical banners and artwork in the north wing.",pre_strategies:[{id:"S_TALL_STELAE",label:"Tall Wooden Posts",desc:"Four-meter tall vertical banner posts."},{id:"S_HORIZONTAL_VITRINES",label:"Low Table Vitrines",desc:"Flat glass vitrines at waist height."},{id:"S_CEILING_SUSPENSION",label:"Ceiling Silk Banners",desc:"Flowing fabric banners hung from rafters."}],constraint_change:"low_ceiling_arch_support",shift_description:"Structural inspection: Low wooden ceiling beams limit overhead room to 2.2 meters.",post_strategies:[{id:"linear_flow",label:"Low Table Vitrines (Use waist-high displays to preserve headroom)",note:"Adapted Flow"},{id:"canopy_tent",label:"Hanging Fabric Canopy (Drape thin cloth below the beams)",note:"Low Drapery"},{id:"staggered_alcoves",label:"Wall Post Leaning (Lean tall banner boards against walls)",note:"Wall Lean"}]}];function d(){var v,b,h;const l=x[e];t==="pre_shift"?(r.innerHTML=`
 <div class="">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 6: The Broken Tool</span>
 
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Spatial Pivot</h2>
 <p class="text-base text-black mt-0.5">Adapt room layouts when conditions shift.</p>
 </div>

 <!-- YOUR TASK -->
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed">
 Read the room context below. Choose an initial layout concept for the gallery space.
 </div>
 </div>

 <!-- LOOK AT THIS: Context Card -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-4 shadow-xs rounded-xs candidate-content-protected">
 <div class="flex items-center justify-between mb-1.5">
 <span class="text-sm text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Gallery Layout Setting</span>
 <span class="text-sm text-[var(--accent-gold)] font-medium uppercase">Episode ${e+1} of ${x.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${l.title}</div>
 <div class="text-base text-black leading-relaxed">${l.pre_context}</div>
 </div>

 <!-- INTERACTION AREA: Initial Strategy Selection -->
 <div class="mb-5 space-y-2.5 candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider">Select Initial Curation Concept:</div>
 ${l.pre_strategies.map(m=>{const f=i===m.id;return`
 <div class="pre-strat-card p-3.5 sm:p-4 bg-white border ${f?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-id="${m.id}" tabindex="0" role="button" aria-label="${m.label}">
 <div>
 <div class="font-medium text-[var(--text-primary)]">${m.label}</div>
 <div class="text-[11px] text-black mt-0.5">${m.desc}</div>
 </div>
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${f?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${f?"&#10003;":""}</span>
 </div>
 `}).join("")}
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end mb-4">
 <button type="button" id="confirmPreShiftBtn" ${i?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 Set Plan & Proceed &rarr;
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${e+1} of ${x.length} &middot; Step 1
 </div>
 </div>
 `,r.querySelectorAll(".pre-strat-card").forEach(m=>{const f=g=>{p=g,i=m.getAttribute("data-id"),d()};m.addEventListener("click",()=>f("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),f("keyboard"))})}),(v=document.getElementById("confirmPreShiftBtn"))==null||v.addEventListener("click",()=>{a("initial_strategy_selected",{episode_id:l.episode_id,trial_index:e,strategy_id:i,input_modality:p,task_def_version:"1.0"}),a("constraint_shifted",{episode_id:l.episode_id,trial_index:e,constraint_change:l.constraint_change,task_def_version:"1.0"}),t="post_shift",s=i,d(),w()})):(r.innerHTML=`
 <div class="">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 6: The Broken Tool</span>
 
 </div>
 <div class="text-[11px] text-[var(--accent-gold)] font-medium">Condition Shift</div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Spatial Pivot</h2>
 <p class="text-base text-black mt-0.5">Adapt room layouts when conditions shift.</p>
 </div>

 <!-- Constraint Shift Notification Banner -->
 <div class="p-4 bg-amber-50 border border-amber-300/80 mb-4 rounded-xs candidate-content-protected">
 <div class="flex items-center gap-2 mb-1">
 <span class="w-2 h-2 rounded-full bg-amber-600 "></span>
 <span class="text-sm uppercase tracking-wider text-[var(--text-primary)] font-bold">New Room Condition Detected</span>
 </div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed ">${l.shift_description}</div>
 <div class="mt-2 text-[11px] text-[var(--text-primary)]">
 Prior Plan: <strong>${((b=l.pre_strategies.find(m=>m.id===i))==null?void 0:b.label)||i}</strong>
 </div>
 </div>

 <!-- INTERACTION AREA: Post-Shift Strategy Selection -->
 <div class="mb-5 space-y-2.5 candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider">Choose Adapted Layout:</div>
 ${l.post_strategies.map(m=>{const f=s===m.id;return`
 <div class="post-strat-card p-3.5 sm:p-4 bg-white border ${f?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-id="${m.id}" tabindex="0" role="button" aria-label="${m.label}">
 <div>
 <div class="font-medium text-[var(--text-primary)]">${m.label}</div>
 <div class="text-sm text-black mt-0.5">${m.note}</div>
 </div>
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${f?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${f?"&#10003;":""}</span>
 </div>
 `}).join("")}
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end mb-4">
 <button type="button" id="confirmPostShiftBtn" ${s?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 ${e<x.length-1?"Confirm Plan & Next Episode &rarr;":"Finish Part 2 &rarr;"}
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${e+1} of ${x.length} &middot; Step 2
 </div>
 </div>
 `,r.querySelectorAll(".post-strat-card").forEach(m=>{const f=g=>{p=g,s=m.getAttribute("data-id"),d()};m.addEventListener("click",()=>f("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),f("keyboard"))})}),(h=document.getElementById("confirmPostShiftBtn"))==null||h.addEventListener("click",()=>{a("strategy_revised",{episode_id:l.episode_id,trial_index:e,initial_strategy_id:i,revised_strategy_id:s,input_modality:p,task_def_version:"1.0"}),e<x.length-1?(e++,t="pre_shift",i=null,s=null,c(),d(),w()):o({mini_game:"CR2",observations_count:3})}))}function c(){const l=x[e];a("episode_presented",{episode_id:l.episode_id,trial_index:e,initial_context:l.pre_context,task_def_version:"1.0"})}d()}function Ae(r,n,a,o){let e=0,t=null,i=null,s=null,p="mouse";const x=[{stimulus_id:"CR3_T1",title:"Trial 1: The Crisp Paper Fold",target_motif:"burnished_crease",objective:"Form a sharp, smooth crease on thick paper without tearing surface fibers.",tools:[{id:"bone_folder",name:"Polished Bone Tool",icon:"&#129685;",affordance:"Smooth curved edge that applies friction gently"},{id:"metal_stylus",name:"Steel Scribe Stylus",icon:"&#128296;",affordance:"Hard pointed needle tip for sharp indentation"},{id:"bamboo_wedge",name:"Beveled Bamboo Scraper",icon:"&#127883;",affordance:"Broad flat wooden face for broad surface pressure"}],methods:[{id:"firm_edge_pass",name:"Firm Edge Pass",desc:"Slide smooth rounded edge along fold with gentle pressure."},{id:"flat_face_rub",name:"Flat Face Rub",desc:"Rub flat face firmly across fold line."},{id:"sharp_point_drag",name:"Sharp Point Drag",desc:"Drag sharp tip across paper to scratch fold."}],feedback_map:{"bone_folder:firm_edge_pass":{success:!0,text:"Clean, crisp burnished crease formed with zero surface abrasion."},"bamboo_wedge:flat_face_rub":{success:!0,text:"Smooth, even flattened fold achieved without marring surface grain."},"metal_stylus:sharp_point_drag":{success:!1,text:"Paper fibers sliced; sharp point cut through the paper fold."},"metal_stylus:firm_edge_pass":{success:!1,text:"Metal edge left dark metallic friction scuffs across the parchment."},"bone_folder:flat_face_rub":{success:!0,text:"Gentle, even crease formed; fibers compressed smoothly."},"bamboo_wedge:firm_edge_pass":{success:!0,text:"Uniform clean fold line established with natural wood contour."},"bone_folder:sharp_point_drag":{success:!1,text:"Uneven dragging motion; point dented paper surface."},"bamboo_wedge:sharp_point_drag":{success:!1,text:"Wood corner snagged on rough paper grain."},"metal_stylus:flat_face_rub":{success:!1,text:"Insufficient surface area; uneven pressure indentation."}}},{stimulus_id:"CR3_T2",title:"Trial 2: Mulberry Paper Stipple",target_motif:"fine_stipple",objective:"Produce an even scatter of tiny ink drops on fibrous paper.",tools:[{id:"horsehair_brush",name:"Stiff Hair Brush",icon:"&#128396;",affordance:"Springy stiff bristles that snap back easily"},{id:"sponge_block",name:"Natural Sea Sponge",icon:"&#9711;",affordance:"Soft porous texture that dabs damp color"},{id:"linen_swab",name:"Rolled Cloth Swab",icon:"&#129526;",affordance:"Rolled fabric tip that absorbs liquid quickly"}],methods:[{id:"textured_flick",name:"Bristle Flick",desc:"Pull loaded bristles back with thumb to release fine mist."},{id:"mottled_dab",name:"Surface Dab",desc:"Light stamp of textured surface directly on paper."},{id:"drag_stroke",name:"Smooth Sweep",desc:"Draw applicator steadily across page in sweeping stroke."}],feedback_map:{"horsehair_brush:textured_flick":{success:!0,text:"Fine, even constellation of organic micro-droplets dispersed across parchment."},"sponge_block:mottled_dab":{success:!0,text:"Rich textured tonal stipple with soft, organic cellular grain."},"linen_swab:drag_stroke":{success:!1,text:"Produced a single continuous solid streak; zero stipple effect."},"linen_swab:textured_flick":{success:!1,text:"Fabric has no elastic bristle snap; pigment remained bound in swab."},"sponge_block:drag_stroke":{success:!1,text:"Smeared broad irregular smudge across paper."},"horsehair_brush:drag_stroke":{success:!1,text:"Solid brushstroke line created; no dispersed speckling."},"horsehair_brush:mottled_dab":{success:!0,text:"Bristle tips formed delicate speckled texture upon contact."},"sponge_block:textured_flick":{success:!1,text:"Sponge cannot be flicked; dropped heavy inconsistent blot."},"linen_swab:mottled_dab":{success:!1,text:"Dense blot soaked through fiber without texture."}}}];function d(){var b,h;const l=x[e],v=e===0;r.innerHTML=E({worldCode:"W6",worldIndex:5,title:"The Improvised Tool",goal:l.objective,subtitle:"Choose a tool and action to solve the craft problem.",instructionPrompt:"Your Task",instruction:v?"Choose your tool and technique below. Test your crease before confirming.":"Choose your tool and technique below. Test your stippling before confirming.",stimulusContent:`
      <div class="stage-content">
        <div class="folio-sheet" style="width:92%; min-height:120px; text-align:center; margin:0 auto; padding:16px;">
          <div style="font-size:0.72rem; text-transform:uppercase; color:#855c3c; font-weight:700; letter-spacing:0.05em;">${v?"Paper Workbench":"Ink Workbench"}</div>
          <div style="font-size:1rem; font-weight:700; color:#2a2016; margin:4px 0;">${v?"Thick Paper Sheet":"Mulberry Paper Sheet"}</div>
          ${v?`
            <div style="height:3px; background:${s?s.includes("Clean")||s.includes("Smooth")||s.includes("Gentle")||s.includes("Uniform")?"#487352":"#8c4740":"#baa58c"}; width:80%; margin:10px auto; border-radius:2px;" id="creaseVisual"></div>
            <div style="font-size:0.82rem; color:#6d5b48;" id="creaseFeedback">${s||"Goal: "+l.objective}</div>
          `:`
            <div style="display:flex; justify-content:center; align-items:center; gap:6px; min-height:22px; margin:8px auto; width:80%;" id="stippleVisual">
              ${s?s.includes("Fine")||s.includes("Rich")||s.includes("speckled")?'<span style="color:#487352; font-size:1.15rem; letter-spacing:5px; font-weight:700;">• • • • • • •</span>':'<span style="color:#8c4740; font-size:0.85rem; font-weight:600;">— irregular pigment smudge —</span>':'<span style="color:#baa58c; font-size:1.15rem; letter-spacing:5px;">· · · · · · ·</span>'}
            </div>
            <div style="font-size:0.82rem; color:#6d5b48;" id="stippleFeedback">${s||"Goal: "+l.objective}</div>
          `}
        </div>
      </div>
    `,interactionContent:`
      <div class="space-y-4">
        <!-- Step 1: Pick Implement -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
          <div class="flex items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
            <span class="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold flex items-center justify-center font-serif">1</span>
            <span class="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">Step 1: Pick an implement</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            ${l.tools.map((m,f)=>{const g=t===m.id,y=String.fromCharCode(65+f);return`
                <button type="button" class="outside-opt-card cr3-tool-card ${g?"selected":""}" data-id="${m.id}" tabindex="0">
                  <div class="opt-bullet">${y}</div>
                  <div style="flex:1;">
                    <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${m.name}</div>
                    <div class="text-xs text-[var(--text-secondary)] mt-0.5">${m.affordance}</div>
                  </div>
                </button>
              `}).join("")}
          </div>
        </div>

        <!-- Step 2: Choose Technique -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] rounded-xs space-y-3">
          <div class="flex items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
            <span class="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-white text-xs font-bold flex items-center justify-center font-serif">2</span>
            <span class="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">Step 2: Choose action method</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            ${l.methods.map((m,f)=>{const g=i===m.id,y=String.fromCharCode(65+f);return`
                <button type="button" class="outside-opt-card cr3-method-card ${g?"selected":""}" data-id="${m.id}" tabindex="0">
                  <div class="opt-bullet">${y}</div>
                  <div style="flex:1;">
                    <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${m.name}</div>
                    <div class="text-xs text-[var(--text-secondary)] mt-0.5">${m.desc}</div>
                  </div>
                </button>
              `}).join("")}
          </div>
        </div>

        <!-- Step 3: Test Technique -->
        <div style="background:var(--card); border:1.5px solid var(--grid-border); border-radius:var(--radius-md); padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-weight:700; font-size:0.92rem; color:var(--text-primary);">Test Your Technique</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">
              ${s||(t&&i?"Tool and method chosen. Click Test Technique.":"Pick tool and method above, then test.")}
            </div>
          </div>
          <button type="button" class="btn" id="applyTechniqueBtn" style="background:#4a392b; color:#ffffff; border:1px solid #68523e; padding:8px 18px; font-weight:700; border-radius:var(--radius-sm);" ${t&&i?"":"disabled"}>
            🔧 Test Technique
          </button>
        </div>
      </div>
    `,summaryContent:`
      <span>Technique: <strong class="text-[var(--text-primary)]">${t&&i?"Ready to confirm":"In progress"}</strong></span>
      <span class="text-sm text-black">Round ${e+1} of ${x.length}</span>
    `,actionButtonId:"confirmTrialBtn",actionButtonText:e<x.length-1?"Confirm Technique &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t||!i,progressText:`Round ${e+1} of ${x.length}`}),r.querySelectorAll(".cr3-tool-card").forEach(m=>{const f=g=>{p=g,t=m.getAttribute("data-id"),a("tool_selected",{stimulus_id:l.stimulus_id,trial_index:e,tool_id:t,input_modality:p,task_def_version:"1.0"}),d()};m.addEventListener("click",()=>f("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),f("keyboard"))})}),r.querySelectorAll(".cr3-method-card").forEach(m=>{const f=g=>{p=g,i=m.getAttribute("data-id"),d()};m.addEventListener("click",()=>f("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),f("keyboard"))})}),(b=document.getElementById("applyTechniqueBtn"))==null||b.addEventListener("click",()=>{p="mouse";const m=`${t}:${i}`,f=l.feedback_map[m]||{text:"No noticeable craft adaptation observed."};s=f.text,a("action_applied",{stimulus_id:l.stimulus_id,trial_index:e,tool_id:t,action_method:i,input_modality:p,task_def_version:"1.0"}),a("feedback_observed",{stimulus_id:l.stimulus_id,trial_index:e,tool_id:t,action_method:i,outcome_feedback:f.text,task_def_version:"1.0"}),d()}),(h=document.getElementById("confirmTrialBtn"))==null||h.addEventListener("click",()=>{a("strategy_adapted",{stimulus_id:l.stimulus_id,trial_index:e,final_tool_id:t,final_method:i,input_modality:p,task_def_version:"1.0"}),e<x.length-1?(e++,t=null,i=null,s=null,c(),d(),w()):o({mini_game:"CR3",observations_count:x.length})})}function c(){const l=x[e];a("trial_presented",{stimulus_id:l.stimulus_id,trial_index:e,target_motif:l.target_motif,task_def_version:"1.0"})}d()}function $e(r,n){const{appContainer:a,miniGameIndex:o,gameId:e,logEvent:t,onMiniGameComplete:i}=r,s=e||(o===0?"M1":o===1?"M2":"M3");s==="M1"?Ie(a,n,t,i):s==="M2"?Re(a,n,t,i):Be(a,n,t,i)}function Ie(r,n,a,o){let e=0,t="mouse";const i=[{stimulus_id:"M1_U1",recipient:"Master Ghulam — Calligraphy Diwan",note:"Formal invitation envelope 1"},{stimulus_id:"M1_U2",recipient:"Valley Youth Literary Guild",note:"Formal invitation envelope 2"}];function s(){var c;const x=i[e];let d="seal_firm";r.innerHTML=E({worldCode:"W7",worldIndex:6,title:"The Ceremonial Seal",goal:"Apply wax seals to event invitations across 3 rounds.",subtitle:"Apply wax seals to event invitations.",instructionPrompt:"Your Task",instruction:"Choose your seal technique below, then apply the wax seal to the invitation.",stimulusContent:`
      <div class="stage-content">
        <div style="width:86%; background:#efe8db; border:1px solid #d8caa8; border-radius:10px; padding:16px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.25); margin:0 auto;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:#785c45; font-weight:700;">Event Invitation Envelope ${e+1} of ${i.length}</div>
          <div style="font-size:0.95rem; font-weight:700; color:#2d241c; margin:4px 0;">To: ${x.recipient}</div>
          <div style="width:44px; height:44px; border-radius:50%; background:#9c382a; margin:10px auto; display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.72rem; font-weight:700; box-shadow:0 3px 8px rgba(0,0,0,0.3);">
            SEAL
          </div>
          <div style="font-size:0.8rem; color:#635242;">${x.note} &bull; Warm red wax drop is ready</div>
        </div>
      </div>
    `,interactionContent:`
      <div class="space-y-3">
        <div class="options-directive">
          <span>Choose how you want to press the stamp:</span>
          <span style="font-size:0.75rem; color:var(--text-secondary);">Tap to select</span>
        </div>
        <div class="outside-options space-y-2.5">
          <button type="button" class="outside-opt-card seal-opt ${d==="seal_gentle"?"selected":""}" data-press="seal_gentle" tabindex="0">
            <div class="opt-bullet">A</div>
            <div style="flex:1;">
              <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">Gentle Press</div>
              <div class="text-xs text-[var(--text-secondary)] mt-0.5">Light touch on wax</div>
            </div>
          </button>
          <button type="button" class="outside-opt-card seal-opt ${d==="seal_firm"?"selected":""}" data-press="seal_firm" tabindex="0">
            <div class="opt-bullet">B</div>
            <div style="flex:1;">
              <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">Firm Balanced Press</div>
              <div class="text-xs text-[var(--text-secondary)] mt-0.5">Hold stamp steady for 2 seconds</div>
            </div>
          </button>
          <button type="button" class="outside-opt-card seal-opt ${d==="seal_quick"?"selected":""}" data-press="seal_quick" tabindex="0">
            <div class="opt-bullet">C</div>
            <div style="flex:1;">
              <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">Quick Tap</div>
              <div class="text-xs text-[var(--text-secondary)] mt-0.5">Fast downward stamp</div>
            </div>
          </button>
        </div>
      </div>
    `,summaryContent:`
      <span>Stamp technique: <strong class="text-[var(--text-primary)]">Ready to seal</strong></span>
      <span class="text-sm text-black">Envelope ${e+1} of ${i.length}</span>
    `,actionButtonId:"stampBtn",actionButtonText:e===i.length-1?"Confirm & Finish &rarr;":"Apply Wax Seal &rarr;",progressText:`Envelope ${e+1} of ${i.length} (Required Minimum: 2)`}),r.querySelectorAll(".seal-opt").forEach(l=>{l.onclick=()=>{r.querySelectorAll(".seal-opt").forEach(v=>v.classList.remove("selected")),l.classList.add("selected"),d=l.getAttribute("data-press")}}),(c=document.getElementById("stampBtn"))==null||c.addEventListener("click",()=>{t="mouse",a("unit_action_performed",{stimulus_id:x.stimulus_id,unit_index:e,action_type:"press_wax_seal",input_modality:t,task_def_version:"1.0"}),a("unit_completed",{stimulus_id:x.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<i.length-1?(e++,p(),s(),w()):o({mini_game:"M1",observations_count:i.length})})}function p(){const x=i[e];a("unit_presented",{stimulus_id:x.stimulus_id,unit_index:e,is_mandatory:!0,task_def_version:"1.0"})}s()}function Re(r,n,a,o){let e="mandatory",t=0,i=0,s="mouse";const p=[{stimulus_id:"M2_M1",label:"Guest Folder 1: Artisan Guild",is_mandatory:!0},{stimulus_id:"M2_M2",label:"Guest Folder 2: Regional Patrons",is_mandatory:!0}],x=[{stimulus_id:"M2_O1",label:"Extra Folder 1: Visiting Students",is_mandatory:!1},{stimulus_id:"M2_O2",label:"Extra Folder 2: Community Observers",is_mandatory:!1}];function d(){var l,v,b,h,m;if(e==="mandatory"){const f=p[t];r.innerHTML=E({worldCode:"W7",worldIndex:6,stepBadge:`Required Phase (${t+1}/2)`,title:"The Courtesy Sleeves",goal:"Assemble 2 required folders, then decide if you want to do extra.",subtitle:"Prepare courtesy sleeves for event attendees.",instructionPrompt:"Your Task",instruction:"Assemble the required folder below. Two required folders are needed to satisfy this activity.",stimulusContent:`
        <div class="stage-content">
          <div style="width:90%; background:#2f261e; border:1px solid #4a3d31; border-radius:10px; padding:16px; text-align:center; margin:0 auto;">
            <div style="font-size:0.75rem; text-transform:uppercase; color:#d4baa2; font-weight:700; margin-bottom:4px;">Required Folder ${t+1} of ${p.length}</div>
            <div style="font-size:1.05rem; font-weight:700; color:#fff; margin:6px 0;">${f.label}</div>
            <div style="font-size:0.82rem; color:#baa38c; margin-top:6px;">Place courtesy papers inside and fold sleeve closed</div>
          </div>
        </div>
      `,interactionContent:`
        <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs text-center space-y-2">
          <div class="text-sm font-semibold text-[var(--text-primary)]">Ready to assemble ${f.label}</div>
          <div class="text-xs text-[var(--text-secondary)]">Click button below to fold and seal this folder.</div>
        </div>
      `,actionButtonId:"foldSleeveBtn",actionButtonText:"Assemble Required Folder &rarr;",progressText:`Required Folder ${t+1} of ${p.length}`}),(l=document.getElementById("foldSleeveBtn"))==null||l.addEventListener("click",()=>{s="mouse",a("unit_action_performed",{stimulus_id:f.stimulus_id,unit_index:t,action_type:"assemble_sleeve",input_modality:s,task_def_version:"1.0"}),a("unit_completed",{stimulus_id:f.stimulus_id,unit_index:t,is_mandatory:!0,task_def_version:"1.0"}),t<p.length-1?(t++,c(p[t]),d(),w()):(e="choice",a("choice_presented",{trial_index:p.length,mandatory_completed_count:p.length,task_def_version:"1.0"}),d(),w())})}else if(e==="choice")r.innerHTML=E({worldCode:"W7",worldIndex:6,stepBadge:"Requirement Completed",title:"The Courtesy Sleeves",goal:"Assemble 2 required folders, then decide if you want to do extra.",subtitle:"Required minimum completed.",stimulusContent:`
        <div class="stage-content">
          <div style="width:90%; background:#2f261e; border:1px solid #4a3d31; border-radius:10px; padding:16px; text-align:center; margin:0 auto;">
            <div style="font-size:0.75rem; text-transform:uppercase; color:#8cd39e; font-weight:700; margin-bottom:4px;">✓ Requirement Satisfied</div>
            <div style="font-size:1.05rem; font-weight:700; color:#fff; margin:6px 0;">2 Required Folders Completed</div>
            <div style="font-size:0.82rem; color:#baa38c; margin-top:6px;">Stopping now fulfills the activity completely. You may finish or do extra.</div>
          </div>
        </div>
      `,interactionContent:`
        <div class="space-y-3">
          <div class="options-directive">
            <span>Required folders completed! You may finish or do extra:</span>
            <span style="font-size:0.75rem; color:var(--text-secondary);">Your choice</span>
          </div>
          <div class="grid grid-cols-1 gap-3">
            <button type="button" id="concludeBtn" class="btn primary full min-h-[48px] py-3.5" style="background:#2d6a3e; color:#fff; font-weight:700; border-radius:var(--radius-sm);" tabindex="0">
              ✓ Finish Activity Now (Requirement Met)
            </button>
            ${i<x.length?`
            <button type="button" id="continueOptionalBtn" class="btn full min-h-[48px] py-3.5 bg-white border border-[var(--grid-border)] text-[var(--text-primary)]" style="font-weight:600; border-radius:var(--radius-sm);" tabindex="0">
              + Assemble Optional Extra Folder (${i+1}/${x.length})
            </button>
            `:""}
          </div>
        </div>
      `,progressText:"Requirement Satisfied (2/2 Mandatory Completed)"}),(v=document.getElementById("concludeBtn"))==null||v.addEventListener("click",()=>{s="mouse",a("continuation_choice_selected",{choice:"conclude",optional_index:i,input_modality:s,task_def_version:"1.0"}),o({mini_game:"M2",observations_count:p.length+i})}),(b=document.getElementById("continueOptionalBtn"))==null||b.addEventListener("click",()=>{s="mouse",a("continuation_choice_selected",{choice:"continue",optional_index:i,input_modality:s,task_def_version:"1.0"}),e="optional",c(x[i]),d(),w()});else if(e==="optional"){const f=x[i];r.innerHTML=E({worldCode:"W7",worldIndex:6,stepBadge:"Voluntary Extra",title:"The Courtesy Sleeves",subtitle:"Voluntary extra folder preparation.",instructionPrompt:"Voluntary Extra",instruction:"You may assemble this extra folder or finish at any time. Stopping is completely neutral.",stimulusContent:`
 <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
 <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
 <span class="text-sm uppercase tracking-wider text-stone-500 ">Voluntary Courtesy Folder</span>
 <div class="text-sm font-semibold text-[var(--text-primary)] mt-1">${f.label}</div>
 </div>
 </div>
 `,secondaryActionHtml:`
 <button type="button" id="stopOptionalEarlyBtn" class="px-5 py-3 bg-stone-100 border border-stone-300 text-stone-700 text-base uppercase tracking-wider interactive-option rounded-xs w-full sm:w-auto min-h-[44px] cursor-pointer">
 Conclude Now
 </button>
 `,actionButtonId:"foldOptionalSleeveBtn",actionButtonText:i===x.length-1?"Confirm & Finish &rarr;":"Assemble Extra Folder &rarr;",progressText:`Extra Folder ${i+1} of ${x.length}`}),(h=document.getElementById("stopOptionalEarlyBtn"))==null||h.addEventListener("click",()=>{s="mouse",a("continuation_choice_selected",{choice:"conclude",optional_index:i,input_modality:s,task_def_version:"1.0"}),o({mini_game:"M2",observations_count:p.length+i})}),(m=document.getElementById("foldOptionalSleeveBtn"))==null||m.addEventListener("click",()=>{s="mouse",a("unit_action_performed",{stimulus_id:f.stimulus_id,unit_index:p.length+i,action_type:"assemble_sleeve",input_modality:s,task_def_version:"1.0"}),a("unit_completed",{stimulus_id:f.stimulus_id,unit_index:p.length+i,is_mandatory:!1,task_def_version:"1.0"}),i++,i<x.length?(e="choice",a("choice_presented",{trial_index:p.length+i,mandatory_completed_count:p.length,task_def_version:"1.0"}),d(),w()):o({mini_game:"M2",observations_count:p.length+i})})}}function c(l){a("unit_presented",{stimulus_id:l.stimulus_id,unit_index:l.is_mandatory?t:p.length+i,is_mandatory:l.is_mandatory,task_def_version:"1.0"})}d()}function Be(r,n,a,o){let e=0,t="mouse";const i=[{stimulus_id:"M3_U1",is_mandatory:!0,row_name:"Gallery Row 1: Lighting & Illumination Alignment",feedback_type:"salient"},{stimulus_id:"M3_U2",is_mandatory:!0,row_name:"Gallery Row 2: Poetry Anthologies Welcome Stand",feedback_type:"moderate"},{stimulus_id:"M3_U3",is_mandatory:!0,row_name:"Gallery Row 3: Courtyard Entry Floral Registry",feedback_type:"minimal"},{stimulus_id:"M3_U4",is_mandatory:!1,row_name:"Gallery Row 4: Auxiliary Bench Linen Inspection",feedback_type:"none"},{stimulus_id:"M3_U5",is_mandatory:!1,row_name:"Gallery Row 5: Outer Colonnade Lantern Wick Inspection",feedback_type:"none"},{stimulus_id:"M3_U6",is_mandatory:!1,row_name:"Gallery Row 6: Perimeter Garden Urn Water Check",feedback_type:"none"}],s=3;function p(){var l,v;const d=i[e],c=e>=s;r.innerHTML=`
 <div class="">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 7: The Repetition</span>
 
 </div>
 <div class="text-[11px] text-[var(--text-primary)] font-medium">
 ${c?"Optional Continuation":"Required Minimum (3)"}
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Evening Registry</h2>
 <p class="text-base text-black mt-0.5">
 ${c?"Requirement met (3/3). You may conclude now or continue.":"Mandatory requirement: 3 rows. Completing 3 satisfies the activity."}
 </p>
 </div>

 ${c?`
 <div class="p-3.5 bg-stone-50 border border-stone-200 rounded-xs text-base text-stone-700 mb-4 space-y-1 candidate-content-protected">
 <div class="flex items-center justify-between">
 <span class="font-medium text-[var(--text-primary)]">Mandatory minimum completed (3 of 3 rows).</span>
 <span class="text-sm text-stone-500 uppercase font-semibold">Stopping is neutral</span>
 </div>
 <p class="text-[11px] text-stone-600 leading-relaxed">
 You may finish this activity now, or verify extra rows. Feedback details decrease on later rows; this is normal and intentional.
 </p>
 </div>
 `:`
 <!-- YOUR TASK -->
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
 <div class="text-base text-[var(--text-primary)] leading-relaxed">
 Review the checklist row below and click Verify Row. Completing 3 rows satisfies the activity.
 </div>
 </div>
 `}

 <!-- LOOK AT THIS: Registry Row Item -->
 <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 text-center shadow-xs rounded-xs candidate-content-protected">
 <div class="max-w-md mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
 <span class="text-sm uppercase tracking-wider text-black ">Checklist Item</span>
 <div class="text-sm font-semibold text-[var(--text-primary)] mt-1">${d.row_name}</div>
 </div>
 </div>

 <!-- PRIMARY ACTION BUTTONS -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
 <div>
 ${c?`
 <button type="button" id="concludeM3Btn" class="px-6 py-3 bg-stone-100 border border-stone-300 text-stone-800 text-base uppercase tracking-wider interactive-option rounded-xs w-full sm:w-auto min-h-[44px]">
 Conclude Activity &rarr;
 </button>
 `:"<span></span>"}
 </div>
 <button type="button" id="verifyRowBtn" class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 Verify Row &rarr;
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Row ${e+1} of ${i.length}
 </div>
 </div>
 `,(l=document.getElementById("concludeM3Btn"))==null||l.addEventListener("click",()=>{t="mouse",a("conclude_selected",{stimulus_id:d.stimulus_id,unit_index:e,total_units_completed:e,input_modality:t,task_def_version:"1.0"}),o({mini_game:"M3",observations_count:e})}),(v=document.getElementById("verifyRowBtn"))==null||v.addEventListener("click",()=>{t="mouse",a("unit_action_performed",{stimulus_id:d.stimulus_id,unit_index:e,action_type:"verify_registry_entry",input_modality:t,task_def_version:"1.0"}),a("unit_completed",{stimulus_id:d.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<i.length-1?(e++,x(),p(),w()):o({mini_game:"M3",observations_count:i.length})})}function x(){const d=i[e];a("trial_presented",{stimulus_id:d.stimulus_id,unit_index:e,is_mandatory:d.is_mandatory,task_def_version:"1.0"})}p()}const Q={W1:{name:"The Frequency",name_ur:"آواز",subtitle:"Acoustics & Dialogue"},W2:{name:"The Archive",name_ur:"دستاویز",subtitle:"Manuscripts & Preservation"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ کینوس",subtitle:"Artisan Workshop"},W4:{name:"The Shifting Grid",name_ur:"بدلتا گرڈ",subtitle:"Mosaic & Rhythm"},W5:{name:"The Hidden Gallery",name_ur:"پوشیدہ گیلری",subtitle:"Exhibition Discovery"},W6:{name:"The Broken Tool",name_ur:"ٹوٹا آلہ",subtitle:"Material Assembly"},W7:{name:"The Repetition",name_ur:"دہرائی",subtitle:"Readiness & Ceremony"}};function E({worldCode:r="",worldIndex:n=0,stepBadge:a="",title:o="",goal:e="",subtitle:t="",instruction:i="",instructionPrompt:s="Your Task",preZoneContent:p="",stimulusContent:x="",interactionContent:d="",postZoneContent:c="",feedbackContent:l="",summaryContent:v="",actionButtonId:b="",actionButtonText:h="",actionButtonDisabled:m=!1,secondaryActionHtml:f="",progressText:g="",extraContent:y=""}){const _=Q[r]||{name:"Alfaaz Workshop",name_ur:""},C=typeof n=="number"?n:0,O=a&&!a.toLowerCase().includes("takes about")?a:"";return`
 <div class="max-w-2xl mx-auto space-y-3.5 sm:space-y-4">
 <!-- TOP BAR: English Left, Urdu Right -->
 <div class="flex justify-between items-start pb-2.5 sm:pb-3 border-b border-[var(--grid-border)]">
 <div>
 <span class="act-badge">World ${C+1} of 7 &middot; ${_.name}</span>
 <h2 class="text-base sm:text-xl font-serif text-[var(--text-primary)] mt-0.5">${o}</h2>
 </div>
 <div class="text-right shrink-0 ml-4">
 ${_.name_ur?`<span class="font-serif text-lg sm:text-2xl text-[var(--text-secondary)] block" style="font-family: var(--font-urdu); direction: rtl;">${_.name_ur}</span>`:""}
 ${O?`<span class="text-[10px] sm:text-[11px] text-[var(--accent-gold)] uppercase tracking-wider block mt-1">${O}</span>`:""}
 </div>
 </div>

 <!-- GOAL BANNER (Rendered BEFORE stimulus tile!) -->
 ${e?`
 <div class="gba-goal-banner candidate-content-protected">
 <span class="goal-badge">Goal</span>
 <span class="goal-text">${e}</span>
 </div>
 `:""}

 <!-- PRE ZONE (outside stage, e.g. Sound Report or Step 1 Clues) -->
 ${p?`
 <div class="candidate-content-protected">
 ${p}
 </div>
 `:""}

 <!-- MAIN STIMULUS / SITUATION (HERO: Inside stage / tile) -->
 ${x?`
 <div class="candidate-content-protected">
 ${x}
 </div>
 `:""}

 <!-- DIRECTIVE: Placed JUST BEFORE options -->
 ${i?`
 <div class="options-directive candidate-content-protected">
 <span>${i}</span>
 <span class="text-[11px] text-[var(--text-secondary)] font-medium lowercase">tap to select</span>
 </div>
 `:""}

 <!-- INTERACTION AREA (Options / Controls / Actions) -->
 ${d?`<div class="candidate-content-protected">${d}</div>`:""}

 <!-- POST ZONE (outside stage, e.g. Step 2 Volume Fader or Test Setup) -->
 ${c?`
 <div class="candidate-content-protected">
 ${c}
 </div>
 `:""}

 <!-- FEEDBACK REGION -->
 ${l?`
 <div class="candidate-content-protected">
 ${l}
 </div>
 `:""}

 <!-- ACTIVE SELECTION / SUMMARY AREA -->
 ${v?`
 <div class="p-2.5 sm:p-3.5 bg-white border border-[var(--grid-border)] rounded-xs text-xs sm:text-sm font-sans text-[var(--text-primary)] flex justify-between items-center candidate-content-protected">
 ${v}
 </div>
 `:""}

 <!-- PRIMARY ACTION BAR -->
 ${h||f?`
 <div class="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
 ${f||""}
 ${h?`
 <button type="button" id="${b}" ${m?"disabled":""} class="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3.5 bg-[var(--text-primary)] text-white text-xs font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer interactive-option shadow-sm rounded-xs flex items-center justify-center gap-2 min-h-[44px]">
 ${h}
 </button>
 `:""}
 </div>
 `:""}

 <!-- EXTRA CONTENT -->
 ${y||""}

 <!-- PROGRESS FOOTER -->
 ${g?`
 <div class="text-right text-xs text-[var(--text-secondary)] font-sans pt-1">
 ${g}
 </div>
 `:""}
 </div>
 `}const H={W1:["F1","F2"],W2:["A1","A2"],W3:["C1","C2"],W4:["E1","E2"],W5:["Q1","Q2"],W6:["CR1","CR3"],W7:["M1","M2"]};function w(r="smooth"){typeof window<"u"&&requestAnimationFrame(()=>{try{window.scrollTo({top:0,left:0,behavior:r})}catch{window.scrollTo(0,0)}})}function Le(r){w();const{appContainer:n,worldCode:a,worldIndex:o,miniGameIndex:e,gameId:t,onMiniGameComplete:i}=r,s=Q[a]||{name:"Alfaaz Workshop",name_ur:""},p=t||H[a]&&H[a][e]||null,x={...r,gameId:p},d=(c,l)=>`
 <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex justify-between items-start gap-4">
 <div>
 <span class="act-badge">World ${o+1} of 7 &middot; ${s.name}</span>
 <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${c}</h2>
 <p class="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">${l}</p>
 </div>
 <div class="text-right shrink-0">
 ${s.name_ur?`<span class="font-serif text-2xl sm:text-3xl text-[var(--text-secondary)] block" style="font-family: var(--font-urdu); direction: rtl;">${s.name_ur}</span>`:""}
 </div>
 </div>
 `;switch(a){case"W1":le(x,d);break;case"W2":re(x,d);break;case"W3":me(x,d);break;case"W4":fe(x,d);break;case"W5":_e(x,d);break;case"W6":Te(x,d);break;case"W7":$e(x,d);break;default:i&&i({});break}}const B={S1:{act_title_en:"The Exhibition",act_title_ur:"نمائش",setup:"The art exhibition opens in 2 hours. One artist's paintings have not arrived yet. The exhibition lead is very stressed while fixing the hall lights.",options:{S1A:"Quietly take over setup tasks and work quickly to give the lead space.",S1B:"Suggest rearranging the room layout right now to hide the empty wall.",S1C:"Go to the lead and ask directly how you can help them right now.",S1D:"Start calling contacts yourself to find the artist or get backup art."}},S2:{act_title_en:"The Exhibition",act_title_ur:"نمائش",setup:"An artist, Faizan, is upset because his artwork was placed near the noisy entrance. He wants a quiet corner. Another artist, Meher, is already in the quiet corner and is happy there.",options:{S2A:"Bring Faizan and Meher together to talk and find an agreement.",S2B:"Politely but firmly keep the original floor plan so things stay fair.",S2C:"Walk through the building to find an empty, unused corner for Faizan.",S2D:"Offer to stand near Faizan's artwork yourself to keep the crowd quiet."}},S3:{act_title_en:"The Exhibition",act_title_ur:"نمائش",setup:"A school teacher arrives without notice with 15 students. The room is still messy, with loose cables on the floor.",options:{S3A:"Gather the students in the entrance hall for a quick question-and-answer talk.",S3B:"Politely remind the teacher of the opening time, but take their details to book a tour later.",S3C:"Rope off a safe corner of the room and watch the students yourself.",S3D:"Show them one piece of art safely without disturbing the setup work."}},S4:{act_title_en:"The Circle",act_title_ur:"حلقہ",setup:"During a group discussion, Zara, a new member, leans forward to speak but pulls back nervously.",options:{S4A:"Wait for a quiet moment and gently invite her to speak.",S4B:"Notice what she is interested in and bring those topics up for the whole group.",S4C:"Talk to her privately after the gathering to chat one-on-one.",S4D:"Suggest a simple rule where everyone takes turns speaking in future meetings."}},S5:{act_title_en:"The Circle",act_title_ur:"حلقہ",setup:"A listener angrily interrupts a poet who is reading a sensitive, personal poem. The poet freezes.",options:{S5A:"Point to the community guidelines on respect and introduce the next reader.",S5B:"Walk up to stand beside the poet right away so they feel safe.",S5C:"Pause the event and let the angry person briefly explain what upset them.",S5D:"Ask everyone in the room to sit in quiet reflection for one minute."}},S6:{act_title_en:"The Outreach",act_title_ur:"رابطہ",setup:"An 8-year-old boy refuses to paint. An experienced team volunteer whispers, 'Just leave him alone.'",options:{S6A:"Listen to your teammate's advice, but keep a watchful eye on the boy from where you stand.",S6B:"Sit near him and draw quietly on your own paper so he feels no pressure.",S6C:"Build a small tower out of paint jars to catch his interest.",S6D:"Ask the full-time center staff what the boy usually enjoys doing."}},S7:{act_title_en:"The Outreach",act_title_ur:"رابطہ",setup:"You feel very tired from a long week. A close friend is visiting your town for only one day, but you promised earlier to help set up today's event.",options:{S7A:"Keep your full promise to work. Meet your friend only if work finishes early.",S7B:"Call the team leader honestly and offer to take a harder shift next week instead.",S7C:"Invite your friend to come with you and help out as a guest volunteer.",S7D:"Work the two hardest hours, hand over your jobs clearly to the team, and then leave."}}},J=Object.keys(B).map((r,n)=>({id:r,act:n<3?1:n<5?2:3,act_title_en:B[r].act_title_en,act_title_ur:B[r].act_title_ur,setup:B[r].setup,options:Object.keys(B[r].options).map(a=>({id:a,text:B[r].options[a]}))}));function Pe(){const r=window.ALFAAZ_API_URL||"";r&&(fetch(r+"/ping").catch(()=>{}),setInterval(()=>fetch(r+"/ping").catch(()=>{}),4*60*1e3))}let u={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1,activeMiniGameInProgress:!1,telemetryTerminal:!1};const q="alfaaz_recruit_state",Me="alfaaz_recruit_unsent",L={dbPromise:null,init(){return this.dbPromise=new Promise((r,n)=>{const a=indexedDB.open("AlfaazRecruitDB",3);a.onupgradeneeded=o=>{o.target.result.objectStoreNames.contains("outbox")?o.oldVersion<3&&(o.target.result.deleteObjectStore("outbox"),o.target.result.createObjectStore("outbox",{keyPath:"_idbKey"})):o.target.result.createObjectStore("outbox",{keyPath:"_idbKey"})},a.onsuccess=()=>r(a.result),a.onerror=()=>n(a.error)}),this.dbPromise},async append(r){r._idbKey||(r._idbKey=crypto.randomUUID());try{const n=await this.dbPromise;return new Promise((a,o)=>{const e=n.transaction("outbox","readwrite"),t=e.objectStore("outbox"),i={...r},s=t.add(i);s.onsuccess=()=>a(s.result),e.onerror=()=>o(e.error)})}catch(n){console.warn("IDB append failed. State will only be persistent for the session.",n),r._idbFailed=!0}},async deleteMany(r){if(!(!r||r.length===0))try{const n=await this.dbPromise;return new Promise((a,o)=>{const e=n.transaction("outbox","readwrite"),t=e.objectStore("outbox");r.forEach(i=>t.delete(i)),e.oncomplete=()=>a(),e.onerror=()=>o(e.error)})}catch(n){console.warn("IDB delete failed",n)}},async getAll(){try{const r=await this.dbPromise;return new Promise((n,a)=>{const o=r.transaction("outbox","readonly"),e=o.objectStore("outbox").getAll();e.onsuccess=()=>n(e.result),e.onerror=()=>a(o.error)})}catch(r){return console.warn("IDB getAll failed",r),[]}},async clear(){try{const r=await this.dbPromise;return new Promise((n,a)=>{const o=r.transaction("outbox","readwrite");o.objectStore("outbox").clear(),o.oncomplete=()=>n(),o.onerror=()=>a(o.error)})}catch{}}};L.init().catch(r=>console.warn("IDB init failed",r));let G=!1;function Y(){G=!1;try{const r={sessionId:u.sessionId,configHash:u.configHash,worldSequence:u.worldSequence,seeds:u.seeds,screen:u.screen,sjtScenarios:u.sjtScenarios,currentSjtIndex:u.currentSjtIndex,sjtResponses:u.sjtResponses,currentWorldIndex:u.currentWorldIndex,currentMiniGameIndex:u.currentMiniGameIndex,accessibilityModes:u.accessibilityModes,segmentId:u.segmentId,seq:u.seq,isPaused:u.isPaused,activeMiniGameInProgress:u.activeMiniGameInProgress||!1,telemetryTerminal:u.telemetryTerminal},n=JSON.stringify(r);sessionStorage.setItem(q,n),u.sessionId&&(sessionStorage.setItem(`${q}_${u.sessionId}`,n),sessionStorage.setItem("alfaaz_active_session_id",u.sessionId))}catch(r){console.warn("[Persistence] Error saving sessionStorage:",r)}}function k({immediate:r=!1}={}){if(r){Y();return}if(G)return;G=!0;const n=()=>Y();"requestIdleCallback"in window?window.requestIdleCallback(n,{timeout:500}):window.setTimeout(n,100)}async function Oe(){try{const r=sessionStorage.getItem("alfaaz_active_session_id"),n=r?`${q}_${r}`:q,a=sessionStorage.getItem(n)||sessionStorage.getItem(q),o=await L.getAll();if(o&&o.length>0)u.telemetryQueue=o;else{const e=sessionStorage.getItem(Me);if(e){const t=JSON.parse(e);Array.isArray(t)&&(u.telemetryQueue=t)}}if(a){const e=JSON.parse(a);if(e.sessionId){u.sessionId=e.sessionId,u.configHash=e.configHash||null,u.worldSequence=e.worldSequence||[],u.seeds=e.seeds||{},u.screen=e.screen||"consent";const t=e.sjtScenarios&&e.sjtScenarios.length>0?e.sjtScenarios:J;if(u.sjtScenarios=t.map(i=>{const s=B[i.id];return s?{...i,act_title_en:s.act_title_en||i.act_title_en,act_title_ur:s.act_title_ur||i.act_title_ur,setup:s.setup||i.setup,options:(i.options||[]).map(p=>({...p,text:s.options&&s.options[p.id]||p.text}))}:i}),u.currentSjtIndex=e.currentSjtIndex||0,u.sjtResponses=e.sjtResponses||{},u.currentWorldIndex=e.currentWorldIndex||0,u.currentMiniGameIndex=e.currentMiniGameIndex||0,u.accessibilityModes=e.accessibilityModes||[],ee(u.accessibilityModes),u.seq=e.seq||1,u.isPaused=e.isPaused||!1,u.telemetryTerminal=e.telemetryTerminal||!1,u.segmentId=(e.segmentId||1)+1,S(u.screen,"segment_start",{segment_id:u.segmentId}),e.activeMiniGameInProgress&&e.screen==="games"){const i=u.worldSequence[u.currentWorldIndex],s=U(i,u.currentMiniGameIndex);S("game","interrupted",{mini_game:s,reason:"page_reload"}),u.currentMiniGameIndex<1?u.currentMiniGameIndex++:(u.currentMiniGameIndex=0,u.currentWorldIndex++),u.activeMiniGameInProgress=!1}return k({immediate:!0}),!0}}}catch(r){console.warn("[Persistence] Error restoring sessionStorage:",r)}return!1}async function P(r,n={}){const a=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",o={"Content-Type":"application/json",...n.headers||{}};return fetch(`${a}${r}`,{...n,headers:o})}function S(r,n,a={},o={},e="mouse",t=null,i=null){const s=performance.now();let p=a,x=o;try{const c=JSON.stringify(a),l=JSON.stringify(o),v=new TextEncoder().encode(c).length+new TextEncoder().encode(l).length;v>4096&&(p={event_oversize:!0,original_size_bytes:v},x={oversized:!0})}catch{}const d={seq:u.seq++,segment_id:u.segmentId,t_ms:s,screen:r,game_world:u.worldSequence[u.currentWorldIndex]||null,mini_game:t,trial:i,action:n,input_type:e,task_def_version:a&&a.task_def_version||"1.0",state:x,data:p};d._idbKey=crypto.randomUUID(),u.telemetryQueue.push(d),k(),L.append(d).catch(c=>console.warn(c)),(u.telemetryQueue.length>=50||n==="minigame_end"||n==="sjt_complete")&&M()}let F=null,z=50;async function M(){if(!u.sessionId||u.telemetryQueue.length===0||u.telemetryTerminal)return!0;if(F)return F;F=je();try{return await F}finally{F=null}}async function je(){if(!u.sessionId||u.telemetryQueue.length===0||u.telemetryTerminal)return!0;const r=u.telemetryQueue.slice(0,z),n=r.map(o=>o._idbKey).filter(o=>o!==void 0),a=r.map(o=>{const e={...o};return delete e._idbKey,delete e._idbFailed,e});try{const o=await P("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:u.sessionId,events:a})});if(o&&o.status===422){const t=await o.json().catch(()=>({}));if(t.detail&&(t.detail.detail==="events_cap_reached"||t.detail.status==="DATA_LIMITED"))return console.warn("[Telemetry] Terminal event cap reached (50,000). Halting future telemetry flushes."),u.telemetryTerminal=!0,k({immediate:!0}),!0}if(o&&o.status===413)return console.warn("[Telemetry] Batch rejected with HTTP 413 (oversize)."),r.length>1?z=Math.max(1,Math.floor(r.length/2)):console.error("[Telemetry] A single telemetry event exceeds the body limit. It remains queued for recovery."),k({immediate:!0}),!1;if(o&&o.status===403){const t=await o.json().catch(()=>({}));if((typeof t.detail=="string"?t.detail:JSON.stringify(t.detail||"")).toLowerCase().includes("already complete"))return console.info("[Telemetry] Session is already complete on server; draining local queue."),u.telemetryQueue=[],L.clear().catch(s=>console.warn(s)),u.telemetryTerminal=!0,k({immediate:!0}),!0}if(!o||!o.ok)throw new Error(o?`HTTP ${o.status}`:"No response");const e=await o.json().catch(()=>({}));return e.result&&e.result.session_status==="COMPLETE"?(u.telemetryQueue.splice(0,r.length),n.length>0&&L.deleteMany(n),e.result.new_rejected_count>0&&(u.telemetryQueue=[],L.clear().catch(t=>console.warn(t)),u.telemetryTerminal=!0),k({immediate:!0}),!0):(u.telemetryQueue.splice(0,r.length),n.length>0&&L.deleteMany(n),k(),!0)}catch(o){return console.warn("[Telemetry] Flush failed; telemetry remains queued:",o),k({immediate:!0}),!1}}async function Fe(r=3){let n=0;for(;!u.telemetryTerminal&&u.telemetryQueue.length>0;){const a=u.telemetryQueue.length;if(!await M()||u.telemetryQueue.length>=a){if(n++,n>=r)return!1;await new Promise(e=>setTimeout(e,600*n))}else n=0}return!0}setInterval(()=>{u.sessionId&&u.telemetryQueue.length>0&&!u.telemetryTerminal&&M()},2500);window.addEventListener("pagehide",()=>{if(k({immediate:!0}),u.sessionId&&u.telemetryQueue.length>0){const r=window.ALFAAZ_API_URL||"",n=JSON.stringify({session_id:u.sessionId,events:u.telemetryQueue.slice(0,z)});navigator.sendBeacon(`${r}/recruit/telemetry`,new Blob([n],{type:"application/json"}))}});document.addEventListener("visibilitychange",()=>{document.hidden?(S(u.screen,"visibility_hidden",{timestamp:Date.now()}),S(u.screen,"tab_hidden",{timestamp:Date.now()}),M()):(S(u.screen,"visibility_visible",{timestamp:Date.now()}),S(u.screen,"tab_visible",{timestamp:Date.now()}))});window.addEventListener("blur",()=>{S(u.screen,"blur",{timestamp:Date.now()})});window.addEventListener("focus",()=>{S(u.screen,"focus",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{Pe(),await Oe(),$(),qe()});function qe(){const r=document.getElementById("pauseBtn");r==null||r.addEventListener("click",Z);const n=document.getElementById("exitBtn");n==null||n.addEventListener("click",()=>{confirm("Exit assessment for now? All completed responses are saved, and you can resume this session later on this device.")&&(S(u.screen,"candidate_exited"),M(),window.location.href="index.html")})}function Z(){u.isPaused?(u.isPaused=!1,S(u.screen,"resume"),u.screen=u.pausedPreviousScreen||"sjt",$()):(u.isPaused=!0,u.pausedPreviousScreen=u.screen,S(u.screen,"pause"),u.screen="paused",$())}function De(){requestAnimationFrame(()=>{const r=document.getElementById("recruitApp");if(!r)return;const n=r.querySelector('h1, h2, [role="heading"]');n&&(n.setAttribute("tabindex","-1"),n.focus({preventScroll:!0}))})}function X({title:r="Connection Notice",message:n="A temporary connection issue occurred. Your progress is kept safe.",onRetry:a=null}){var e,t;const o=document.createElement("div");return o.className="mt-5 p-4 sm:p-5 bg-[#fff8f5] border border-[#e8c8be] rounded-xs text-left shadow-xs space-y-3",o.setAttribute("role","alert"),o.innerHTML=`
    <div class="flex items-start gap-3">
      <div class="w-7 h-7 rounded-full bg-[#fceae5] border border-[#e8c8be] text-[#bd6f5d] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">!</div>
      <div class="space-y-1">
        <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">${window.escapeHtml?window.escapeHtml(r):r}</div>
        <p class="text-xs text-stone-600 leading-relaxed">${window.escapeHtml?window.escapeHtml(n):n}</p>
      </div>
    </div>
    <div class="flex flex-wrap gap-2.5 pt-2 border-t border-[#f2ded7]">
      ${a?'<button type="button" class="error-retry-btn min-h-[44px] px-4 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-wider hover:bg-[var(--accent-gold)] transition-colors rounded-xs cursor-pointer">Try Again</button>':""}
      <button type="button" class="error-refresh-btn min-h-[44px] px-4 py-2 bg-white border border-[var(--grid-border)] text-stone-700 text-xs uppercase tracking-wider hover:bg-[#faf8f5] transition-colors rounded-xs cursor-pointer">Refresh Page</button>
    </div>
  `,a&&((e=o.querySelector(".error-retry-btn"))==null||e.addEventListener("click",a)),(t=o.querySelector(".error-refresh-btn"))==null||t.addEventListener("click",()=>window.location.reload()),o}function $(){w();const r=document.getElementById("recruitApp"),n=document.getElementById("sessionHeaderControls"),a=document.getElementById("topProgressBar"),o=document.getElementById("progressBarFill");switch(u.screen!=="consent"&&u.screen!=="complete"&&u.screen!=="paused"?(n==null||n.classList.remove("hidden"),a==null||a.classList.remove("hidden")):(n==null||n.classList.add("hidden"),a==null||a.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),u.screen){case"consent":He(r);break;case"identity":Ne(r);break;case"accessibility":We(r);break;case"warmup":Ge(r);break;case"sjt_briefing":ze(r);break;case"sjt":te(r,o);break;case"gba_briefing":Ue(r);break;case"games":se(r,o);break;case"paused":Ye(r);break;case"complete":Ke(r);break}De()}function He(r){var t;r.innerHTML=`
 <div class="max-w-2xl mx-auto py-8 px-4">
 <div class="mb-12 text-center space-y-4">
 <span class="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-medium">Prologue &middot; Consent & Compliance</span>
 <h1 class="text-3xl text-[var(--text-primary)]">The Studio Assessment</h1>
 <p class="text-sm text-black italic max-w-lg mx-auto leading-relaxed">
 Before we begin our creative exchange, we require your explicit consent to ensure a safe and transparent environment.
 </p>
 </div>

 <div class="space-y-10">
 <!-- Section 1: The Experience -->
 <div class="relative pl-6 border-l border-[var(--grid-border)]">
 <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--bg-primary)] border border-[var(--accent-gold)]"></div>
 <h2 class="text-lg text-[var(--text-primary)] mb-2">The Experience</h2>
 <p class="text-sm text-black leading-relaxed">
 This is a 20-25 minute exploratory journey. You will encounter situational judgments and creative micro-tasks. 
 There are no right or wrong answers—only different perspectives. You may pause, skip, or withdraw at any time without penalty.
 </p>
 </div>

 <!-- Section 2: Why We Collect Data -->
 <div class="relative pl-6 border-l border-[var(--grid-border)]">
 <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--bg-primary)] border border-[var(--accent-green)]"></div>
 <h2 class="text-lg text-[var(--text-primary)] mb-2">Why We Observe</h2>
 <p class="text-sm text-black leading-relaxed">
 As you interact with the tasks, we collect behavioral telemetry. 
 <strong>Why do we do this?</strong> To understand your intuitive working style. It helps us match you to the right 
 creative roles within the collective. 
 Your raw data is pseudonymous and will never be used for automated rejection or sold to third parties.
 </p>
 <p class="text-sm text-black leading-relaxed">
 Contact Us: <a href="mailto:alfaaz2k20@gmail.com" class="text-[var(--accent-gold)] hover:underline">alfaaz2k20@gmail.com</a>
 </p>
 </div>
 </div>

 <form id="consentForm" class="mt-16 pt-8 border-t border-[var(--grid-border)] space-y-6">
 <div class="flex items-start gap-3">
 <input type="checkbox" id="ageConfirm" required class="mt-1 w-4 h-4 accent-[#bd6f5d] cursor-pointer">
 <label for="ageConfirm" class="text-sm text-[var(--text-primary)] cursor-pointer">
 I confirm that I am 18 years of age or older, and I am participating voluntarily.
 </label>
 </div>
 
 <div class="flex items-start gap-3">
 <input type="checkbox" id="consentAgree" required class="mt-1 w-4 h-4 accent-[#bd6f5d] cursor-pointer">
 <label for="consentAgree" class="text-sm text-[var(--text-primary)] cursor-pointer">
 I explicitly consent to the collection of my behavioral telemetry during this session to help the collective understand my creative profile.
 </label>
 </div>

 <div class="pt-8 flex justify-center sm:justify-end">
 <button type="submit" aria-disabled="true" class="interactive-option px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] opacity-40">
 Enter the Studio &rarr;
 </button>
 </div>
 </form>
 </div>
 `;const n=document.getElementById("ageConfirm"),a=document.getElementById("consentAgree"),o=document.querySelector('#consentForm button[type="submit"]'),e=()=>{const i=!!(n!=null&&n.checked&&(a!=null&&a.checked));o==null||o.setAttribute("aria-disabled",String(!i)),o==null||o.classList.toggle("opacity-40",!i)};n==null||n.addEventListener("change",e),a==null||a.addEventListener("change",e),e(),(t=document.getElementById("consentForm"))==null||t.addEventListener("submit",async i=>{i.preventDefault();const s=i.target.querySelector('button[type="submit"]');if((s==null?void 0:s.getAttribute("aria-disabled"))==="true")return;const p=s?s.innerHTML:"Enter the Studio &rarr;";s&&(s.setAttribute("aria-disabled","true"),s.innerHTML="Preparing Workspace...");try{const x=a.checked,d=await P("/recruit/consent",{method:"POST",body:JSON.stringify({choices:{research_telemetry:x}})});if(!d.ok)throw new Error(`Network error: ${d.status}`);const c=await d.json();u.sessionId=c.session_id,u.configHash=c.config_hash||null,u.worldSequence=c.world_sequence||[],u.seeds=c.seeds||{},k({immediate:!0}),M(),u.screen="identity",$()}catch(x){console.error("[Consent error]",x),s&&(s.innerHTML=p,s.setAttribute("aria-disabled","false"));const d=document.getElementById("consentForm");d==null||d.querySelectorAll(".error-banner").forEach(l=>l.remove());const c=X({title:"Unable to start session",message:"Could not connect to the studio server. Please check your connection and try again.",onRetry:()=>d==null?void 0:d.dispatchEvent(new Event("submit",{cancelable:!0}))});c.classList.add("error-banner"),d==null||d.appendChild(c)}})}function Ne(r){var n;r.innerHTML=`
 <div class="space-y-6">
 <div class="border-b border-[var(--grid-border)] pb-4 text-center">
 <span class="act-badge">Participant Details</span>
 <h1 class="text-3xl text-[var(--text-primary)]">About You</h1>
 </div>

 <form id="identityForm" class="space-y-4 pt-2">
 <div>
 <label class="block text-xs uppercase tracking-wider text-black mb-1">Full Name *</label>
 <input type="text" id="fullName" required class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="Your name">
 </div>
 <div>
 <label class="block text-xs uppercase tracking-wider text-black mb-1">Email Address *</label>
 <input type="email" id="email" required class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="you@example.com">
 </div>
 <div>
 <label class="block text-xs uppercase tracking-wider text-black mb-1">LinkedIn URL / CV Link</label>
 <input type="text" id="linkedinUrl" class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="https://linkedin.com/in/... or CV / portfolio link">
 </div>
 <div class="pt-4 flex justify-end">
 <button type="submit" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] ">
 Begin Session &rarr;
 </button>
 </div>
 </form>
 </div>
 `,(n=document.getElementById("identityForm"))==null||n.addEventListener("submit",async a=>{var t;a.preventDefault();const o=a.target.querySelector('button[type="submit"]'),e=o?o.innerHTML:"Begin Session &rarr;";o&&(o.disabled=!0,o.innerHTML="Connecting...");try{const i=((t=document.getElementById("linkedinUrl"))==null?void 0:t.value.trim())||null,s=await P("/recruit/identity",{method:"POST",body:JSON.stringify({session_id:u.sessionId,full_name:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim(),linkedin_url:i})});if(!s||!s.ok){const p=s?await s.json().catch(()=>({})):{};throw new Error(p.detail||(s?`Server returned ${s.status}`:"No response from server"))}u.screen="accessibility",S("identity","identity_submitted"),k({immediate:!0}),$()}catch(i){console.error("[Identity error]",i),o&&(o.disabled=!1,o.innerHTML=e);const s=document.getElementById("identityForm");s==null||s.querySelectorAll(".error-banner").forEach(x=>x.remove());const p=X({title:"Unable to register participant",message:"Could not submit your details due to a connection delay. Please try again.",onRetry:()=>s==null?void 0:s.dispatchEvent(new Event("submit",{cancelable:!0}))});p.classList.add("error-banner"),s==null||s.appendChild(p)}})}function ee(r=[]){if(typeof document>"u"||!document.documentElement)return;const n=document.documentElement;n.classList.toggle("a11y-high-contrast",r.includes("high_contrast")),n.classList.toggle("a11y-dyslexia-font",r.includes("dyslexia_font")),n.classList.toggle("a11y-reduced-motion",r.includes("reduced_motion"))}function We(r){var a;const n=u.accessibilityModes||[];r.innerHTML=`
 <div class="space-y-6">
 <div class="border-b border-[var(--grid-border)] pb-3 text-center">
 <span class="act-badge">Preferences · رہنمائی</span>
 <h2 class="text-2xl text-[var(--text-primary)]">Interaction & Accessibility</h2>
 <p class="text-xs text-black mt-2 max-w-lg mx-auto leading-relaxed">
 This section is here to make the assessment easier and more comfortable to use. Alfaaz Recruit measures thoughtful engagement, not visual conformity or motor speed. These options adjust the visual environment and presentation to suit your eyes, screen, and device.
 </p>
 </div>

 <div class="space-y-3 pt-2">
 <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
 <input type="checkbox" id="a11y_contrast" class="mt-1 accent-[#bd6f5d]" ${n.includes("high_contrast")?"checked":""}>
 <div>
 <div class="text-sm font-medium text-[var(--text-primary)]">High Contrast Display</div>
 <div class="text-xs text-black mt-0.5">Increases text contrast, element borders, and background separation for clearer visibility.</div>
 </div>
 </label>
 <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
 <input type="checkbox" id="a11y_dyslexia" class="mt-1 accent-[#bd6f5d]" ${n.includes("dyslexia_font")?"checked":""}>
 <div>
 <div class="text-sm font-medium text-[var(--text-primary)]">Dyslexia-Friendly Typography</div>
 <div class="text-xs text-black mt-0.5">Applies a high-legibility sans-serif typeface with enhanced letter and line spacing.</div>
 </div>
 </label>
 <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
 <input type="checkbox" id="a11y_motion" class="mt-1 accent-[#bd6f5d]" ${n.includes("reduced_motion")?"checked":""}>
 <div>
 <div class="text-sm font-medium text-[var(--text-primary)]">Reduced Motion</div>
 <div class="text-xs text-black mt-0.5">Removes non-essential animations, pulsing transitions, and rapid movement.</div>
 </div>
 </label>
 </div>

 <div class="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
 <span class="text-xs text-black italic">Accessibility settings do not lower your result or count against you in any way. Settings change interaction and presentation conditions, not candidate evaluation or suitability.</span>
 <button id="saveA11yBtn" class="min-h-[44px] px-8 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] shadow-sm rounded-xs">
 Continue &rarr;
 </button>
 </div>
 </div>
 `,(a=document.getElementById("saveA11yBtn"))==null||a.addEventListener("click",async o=>{var i,s,p;const e=o.currentTarget;if(e.disabled)return;e.disabled=!0,e.textContent="Saving...";const t=[];(i=document.getElementById("a11y_contrast"))!=null&&i.checked&&t.push("high_contrast"),(s=document.getElementById("a11y_dyslexia"))!=null&&s.checked&&t.push("dyslexia_font"),(p=document.getElementById("a11y_motion"))!=null&&p.checked&&t.push("reduced_motion"),u.accessibilityModes=t,ee(t);try{await P("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:u.sessionId,modes_enabled:t})})}catch(x){console.warn("Accessibility preferences save error:",x)}u.screen="warmup",S("accessibility","preferences_saved",{modes:t}),k({immediate:!0}),$()})}function Ge(r){let n=[],a=performance.now();r.innerHTML=`
 <div class="space-y-6 text-center py-4 ">
 <span class="act-badge">Device Check · رہنمائی</span>
 <h2 class="text-2xl text-[var(--text-primary)]">Screen & Rhythm Check</h2>
 <p class="text-xs text-black max-w-md mx-auto leading-relaxed">
 Please tap or click the center circle 3 times at a natural, comfortable pace to check your device.
 </p>

 <div class="py-8 flex justify-center">
 <button id="tapTarget" class="w-24 h-24 rounded-full border-2 border-[var(--accent-gold)] bg-white text-[var(--accent-gold)] text-xl flex items-center justify-center hover:bg-amber-50 shadow-sm">
 Tap (0/3)
 </button>
 </div>

 <div id="warmupStatus" class="text-xs text-black tracking-wider uppercase font-medium">
 Waiting for tap 1 of 3...
 </div>
 </div>
 `;const o=document.getElementById("tapTarget"),e=document.getElementById("warmupStatus");o==null||o.addEventListener("click",async()=>{n.push(performance.now());const t=n.length;if(o.textContent=`Tap (${t}/3)`,e.textContent=`Recorded tap ${t} of 3`,t>=3){o.setAttribute("disabled","true"),o.classList.add("opacity-50");const i=[n[1]-n[0],n[2]-n[1]],s=(i[0]+i[1])/2,p=performance.now()-a;try{await P("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:u.sessionId,tap_latency_baseline_ms:s,reading_dwell_baseline_ms:p,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(d){console.warn("Warmup save error:",d)}S("warmup","warmup_completed",{avgLatency:s,readingDwell:p});async function x(){var d;r.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="waiting-spinner"></div>
 <h2 class="text-xl text-[var(--text-primary)]">Loading Scenarios...</h2>
 <p class="text-xs text-black max-w-sm mx-auto leading-relaxed">
 Connecting to the assessment server. This may take a few moments if starting from cold.
 </p>
 </div>
 `;try{const c=await P("/recruit/sjt/public");if(!c||!c.ok)throw new Error(c?`Server returned HTTP ${c.status}`:"Network timeout");const l=await c.json(),v=l&&l.scenarios&&l.scenarios.length>0?l.scenarios:J;u.sjtScenarios=v.map(b=>{var m,f;const h=B[b.id];return h?{...b,act_title_en:h.act_title_en||((m=b.act_title)==null?void 0:m.en)||b.act_title_en,act_title_ur:h.act_title_ur||((f=b.act_title)==null?void 0:f.ur)||b.act_title_ur,setup:h.setup||b.setup,options:(b.options||[]).map(g=>({...g,text:h.options&&h.options[g.id]||g.text}))}:b}),u.currentSjtIndex=0,u.screen="sjt_briefing",k({immediate:!0}),$()}catch(c){console.warn("Failed to load SJT payload:",c),r.innerHTML=`
 <div class="space-y-6 text-center py-12 ">
 <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[var(--text-primary)] flex items-center justify-center mx-auto text-xl ">!</div>
 <h2 class="text-xl text-[var(--text-primary)]">Connection Notice</h2>
 <p class="text-xs text-black max-w-sm mx-auto leading-relaxed">
 The server is taking longer than expected to respond. Your device check is safely saved.
 </p>
 <div class="pt-2">
 <button id="retrySjtLoadBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] shadow-sm rounded-xs">
 Retry Connection &rarr;
 </button>
 </div>
 </div>
 `,(d=document.getElementById("retrySjtLoadBtn"))==null||d.addEventListener("click",()=>{x()})}}x()}})}function ze(r){var o;const n=document.getElementById("segmentProgress");n&&(n.innerHTML="<span>Section 1 &middot; Overview</span>");const a=document.getElementById("progressBarFill");a&&(a.style.width="0%"),r.innerHTML=`
 <div class="max-w-2xl mx-auto py-4 sm:py-6 space-y-6">
 <!-- Header: English Left, Urdu Right -->
 <div class="flex justify-between items-start pb-4 border-b border-[var(--grid-border)]">
 <div>
 <span class="act-badge">Section 1 &middot; Overview</span>
 <h1 class="text-xl sm:text-3xl font-serif text-[var(--text-primary)]">Situational Scenarios</h1>
 </div>
 <div class="text-right shrink-0">
 <span class="font-serif text-xl sm:text-3xl text-[var(--text-secondary)] block" style="font-family: var(--font-urdu); direction: rtl;">تفہیم و ارادہ</span>
 <span class="text-[10px] sm:text-xs text-[var(--accent-gold)] uppercase tracking-wider block mt-1">7 Scenarios</span>
 </div>
 </div>

 <p class="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
 You will read 7 short situations from creative studio life, community events, and teamwork.
 </p>

 <!-- 3 Spacious Step Cards (Zero Construct Exposure) -->
 <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-4 rounded-xs space-y-2">
 <div class="w-7 h-7 rounded-full bg-[var(--accent-gold)] text-white text-xs flex items-center justify-center font-serif">1</div>
 <h3 class="text-sm font-semibold text-[var(--text-primary)]">Read the Story</h3>
 <p class="text-xs text-[var(--text-secondary)] leading-relaxed">
 Each card describes a real situation that took place in the studio.
 </p>
 </div>

 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-4 rounded-xs space-y-2">
 <div class="w-7 h-7 rounded-full bg-[var(--accent-gold)] text-white text-xs flex items-center justify-center font-serif">2</div>
 <h3 class="text-sm font-semibold text-[var(--text-primary)]">Pick Your Choice</h3>
 <p class="text-xs text-[var(--text-secondary)] leading-relaxed">
 Choose the response that best matches what you would actually do.
 </p>
 </div>

 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-4 rounded-xs space-y-2">
 <div class="w-7 h-7 rounded-full bg-[var(--accent-gold)] text-white text-xs flex items-center justify-center font-serif">3</div>
 <h3 class="text-sm font-semibold text-[var(--text-primary)]">No Trick Questions</h3>
 <p class="text-xs text-[var(--text-secondary)] leading-relaxed">
 There is no right or wrong answer. Pick what you would genuinely do.
 </p>
 </div>
 </div>

 <!-- Pacing & Action Bar -->
 <div class="pt-6 border-t border-[var(--grid-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
 <span class="text-xs text-[var(--text-secondary)]">7 scenarios &middot; Self-paced (approx. 6–8 mins) &middot; Tap options or press keys 1–4</span>
 <button id="startSjtBtn" class="w-full sm:w-auto min-h-[44px] px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] shadow-sm rounded-xs">
 Begin Section 1: Scenarios &rarr;
 </button>
 </div>
 </div>
 `,S("sjt_briefing","briefing_viewed"),(o=document.getElementById("startSjtBtn"))==null||o.addEventListener("click",()=>{u.screen="sjt",k({immediate:!0}),$()})}let I=null;function K(r,n,a){if(u.sjtResponses[r.id]===n)return;u.sjtResponses[r.id]=n,S("sjt",a==="keyboard"?"option_selected_key":"option_selected",{scenario_id:r.id,option_id:n}),document.querySelectorAll(".option-card").forEach(t=>{t.getAttribute("data-opt-id")===n?(t.classList.add("selected"),t.setAttribute("aria-pressed","true"),t.focus()):(t.classList.remove("selected"),t.setAttribute("aria-pressed","false"))});const e=document.getElementById("nextSjtBtn");e&&(e.disabled=!1),k()}function te(r,n){var d;const a=u.sjtScenarios[u.currentSjtIndex];if(!a){ie();return}const o=B[a.id],e=o?{...a,act_title_en:o.act_title_en||a.act_title_en,act_title_ur:o.act_title_ur||a.act_title_ur,setup:o.setup||a.setup,options:(a.options||[]).map(c=>({...c,text:o.options&&o.options[c.id]||c.text}))}:a,t=u.sjtScenarios.length,i=u.currentSjtIndex+1;n&&(n.style.width=`${(i-1)/21*100}%`);const s=document.getElementById("segmentProgress");if(s){const c=Math.max(1,Math.round(((t-i+1)*35+448)/60));s.innerHTML=`<span class="text-black hidden sm:inline mr-2 text-[10px] sm:text-xs font-normal">About ${c} mins remaining</span><span>Judgment ${i} / ${t}</span>`}const p=u.sjtResponses[e.id]||null,x=e.options.map(c=>`
 <div class="outside-opt-card option-card ${p===c.id?"selected":""}" data-opt-id="${c.id}" tabindex="0" role="button" aria-pressed="${p===c.id?"true":"false"}" aria-label="Option ${c.id.slice(-1)}">
 <div class="opt-bullet">${c.id.slice(-1)}</div>
 <div style="flex:1;" class="text-[13px] sm:text-sm text-[var(--text-primary)] font-medium leading-snug sm:leading-normal">${c.text}</div>
 </div>
 `).join("");r.innerHTML=`
 <div class="space-y-3.5 sm:space-y-5">
 <!-- Top Context: English Title on Top-Left, Urdu on Top-Right -->
 <div class="border-b border-[var(--grid-border)] pb-2.5 sm:pb-3 flex justify-between items-start gap-3 sm:gap-4">
 <div>
 <span class="act-badge">Scenario ${i} of ${t}</span>
 <h2 class="text-base sm:text-xl font-serif text-[var(--text-primary)] mt-0.5">${e.act_title_en}</h2>
 </div>
 <div class="text-right shrink-0">
 ${e.act_title_ur?`<span class="font-serif text-lg sm:text-2xl text-[var(--text-secondary)] block" style="font-family: var(--font-urdu); direction: rtl;">${e.act_title_ur}</span>`:""}
 <span class="text-[10px] sm:text-xs text-[var(--accent-gold)] uppercase tracking-wider block mt-1">Section 1 &middot; ${i} of ${t}</span>
 </div>
 </div>

 <!-- SITUATION / STIMULUS: Prominent serif text (Hero) -->
 <div class="scenario-text text-sm sm:text-base font-serif text-[var(--text-primary)] leading-normal sm:leading-relaxed bg-[#faf8f5] p-3.5 sm:p-5 border-l-4 border-l-[var(--accent-gold)] border border-[var(--grid-border)] rounded-xs shadow-xs">
 ${e.setup}
 </div>

 <!-- YOUR TASK: Placed immediately before options -->
 <div class="py-2 px-2.5 sm:p-3 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs flex items-center gap-2">
 <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent-gold)] inline-block shrink-0"></span>
 <div class="text-[11px] sm:text-xs font-semibold text-[var(--text-primary)]">
 <strong class="uppercase text-[10px] sm:text-xs tracking-wider text-[var(--accent-gold)] mr-1">Your Task:</strong>
 Read the situation above and pick what you would do.
 </div>
 </div>

 <!-- OPTIONS -->
 <div class="space-y-2 sm:space-y-2.5">
 ${x}
 </div>

 <!-- PRIMARY ACTION -->
 <div class="pt-4 sm:pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[var(--grid-border)]">
 <span class="text-xs text-[var(--text-secondary)] order-2 sm:order-1 text-[11px]">Tip: Press keys 1 to 4 on your keyboard, or click an option</span>
 <button id="nextSjtBtn" ${p?"":"disabled"} class="w-full sm:w-auto min-h-[44px] px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] shadow-sm rounded-xs order-1 sm:order-2">
 ${i===t?"Complete Section 1 &rarr;":"Next Scenario &rarr;"}
 </button>
 </div>
 </div>
 `,S("sjt","scenario_displayed",{scenario_id:e.id,index:i}),r.querySelectorAll(".option-card").forEach(c=>{c.addEventListener("click",()=>{const l=c.getAttribute("data-opt-id");K(e,l,"pointer")})}),(d=document.getElementById("nextSjtBtn"))==null||d.addEventListener("click",()=>{u.sjtResponses[e.id]&&(u.currentSjtIndex++,I&&(document.removeEventListener("keydown",I),I=null),te(r,n),w())}),I&&document.removeEventListener("keydown",I),I=c=>{if(["1","2","3","4"].includes(c.key)){const l=parseInt(c.key)-1;e.options[l]&&K(e,e.options[l].id,"keyboard")}else if(c.key==="Enter"){const l=document.getElementById("nextSjtBtn");l&&!l.disabled&&l.click()}},document.addEventListener("keydown",I)}let W=!1;async function ie(){if(W)return;W=!0,I&&(document.removeEventListener("keydown",I),I=null);const r=document.getElementById("recruitApp");r&&(r.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="waiting-spinner"></div>
 <h2 class="text-xl text-[var(--text-primary)]">Saving Judgments...</h2>
 <p class="text-xs text-black">Recording your situation judgments to your session profile.</p>
 </div>
 `);try{const n=await P("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:u.sessionId,responses:u.sjtResponses})});if(!n||!n.ok)throw new Error(n?`Server returned HTTP ${n.status}`:"Connection failed");u.screen="gba_briefing",u.currentWorldIndex=0,u.currentMiniGameIndex=0,S("sjt","sjt_complete",{response_count:Object.keys(u.sjtResponses).length}),k({immediate:!0}),$()}catch(n){if(console.warn("SJT submit error:",n),r){r.innerHTML=`
 <div class="space-y-6 text-center py-12 ">
 <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[var(--text-primary)] flex items-center justify-center mx-auto text-xl ">!</div>
 <h2 class="text-xl text-[var(--text-primary)]">Submission Notice</h2>
 <p class="text-xs text-black max-w-sm mx-auto leading-relaxed">
 Could not record responses due to a temporary server connection delay. Your choices are safely kept.
 </p>
 <div class="pt-2">
 <button id="retrySjtSubmitBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] shadow-sm rounded-xs">
 Retry Submission &rarr;
 </button>
 </div>
 </div>
 `;const a=document.getElementById("retrySjtSubmitBtn");a&&a.addEventListener("click",()=>{a.disabled=!0,a.textContent="Submitting...",ie()})}}finally{W=!1}}function Ue(r){var o;const n=document.getElementById("segmentProgress");n&&(n.innerHTML="<span>Section 2 &middot; Overview</span>");const a=document.getElementById("progressBarFill");a&&(a.style.width=`${7/21*100}%`),r.innerHTML=`
 <div class="max-w-2xl mx-auto py-4 sm:py-6 space-y-6">
 <!-- Header: English Left, Urdu Right -->
 <div class="flex justify-between items-start pb-4 border-b border-[var(--grid-border)]">
 <div>
 <span class="act-badge">Section 2 &middot; Overview</span>
 <h1 class="text-xl sm:text-3xl font-serif text-[var(--text-primary)]">Interactive Studio Activities</h1>
 </div>
 <div class="text-right shrink-0">
 <span class="font-serif text-xl sm:text-3xl text-[var(--text-secondary)] block" style="font-family: var(--font-urdu); direction: rtl;">عملی مشاغل</span>
 <span class="text-[10px] sm:text-xs text-[var(--accent-gold)] uppercase tracking-wider block mt-1">14 Activities</span>
 </div>
 </div>

 <p class="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
 A series of 14 short interactive exercises across seven creative studio areas.
 </p>

 <!-- 3 Spacious Step Cards (Zero Construct Exposure) -->
 <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-4 rounded-xs space-y-2">
 <div class="w-7 h-7 rounded-full bg-[var(--accent-gold)] text-white text-xs flex items-center justify-center font-serif">1</div>
 <h3 class="text-sm font-semibold text-[var(--text-primary)]">Seven Areas</h3>
 <p class="text-xs text-[var(--text-secondary)] leading-relaxed">
 You will visit 7 studio rooms (Sound, Archives, Canvas, Mosaic, etc.).
 </p>
 </div>

 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-4 rounded-xs space-y-2">
 <div class="w-7 h-7 rounded-full bg-[var(--accent-gold)] text-white text-xs flex items-center justify-center font-serif">2</div>
 <h3 class="text-sm font-semibold text-[var(--text-primary)]">Simple Actions</h3>
 <p class="text-xs text-[var(--text-secondary)] leading-relaxed">
 Each activity has a simple 1-sentence task. Just click, tap, or drag.
 </p>
 </div>

 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-4 rounded-xs space-y-2">
 <div class="w-7 h-7 rounded-full bg-[var(--accent-gold)] text-white text-xs flex items-center justify-center font-serif">3</div>
 <h3 class="text-sm font-semibold text-[var(--text-primary)]">Not a Speed Test</h3>
 <p class="text-xs text-[var(--text-secondary)] leading-relaxed">
 These are not video games. Fast reflexes are not needed. Take your time.
 </p>
 </div>
 </div>

 <!-- Pacing & Action Bar -->
 <div class="pt-6 border-t border-[var(--grid-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
 <span class="text-xs text-[var(--text-secondary)]">14 short tasks (2 per area) &middot; 1 to 2 minutes each &middot; Self-paced</span>
 <button id="startGbaBtn" class="w-full sm:w-auto min-h-[44px] px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] shadow-sm rounded-xs">
 Enter World 1: The Frequency &rarr;
 </button>
 </div>
 </div>
 `,S("gba_briefing","briefing_viewed"),(o=document.getElementById("startGbaBtn"))==null||o.addEventListener("click",()=>{u.screen="games",k({immediate:!0}),$()})}function se(r,n){const a=u.worldSequence[u.currentWorldIndex];if(!a||u.currentWorldIndex>=u.worldSequence.length){ae();return}u.activeMiniGameInProgress=!0,k({immediate:!0});const o=u.currentWorldIndex*2+u.currentMiniGameIndex+1,e=14,t=document.getElementById("segmentProgress");if(t){const i=e-o+1,s=Math.max(1,Math.round(i*32/60));t.innerHTML=`<span class="text-black hidden sm:inline mr-2 text-[10px] sm:text-xs font-normal">About ${s} min${s>1?"s":""} remaining</span><span>Activities ${o} / ${e}</span>`}if(n){const i=7+(o-1);n.style.width=`${i/21*100}%`}Le({appContainer:r,worldCode:a,worldIndex:u.currentWorldIndex,miniGameIndex:u.currentMiniGameIndex,seeds:u.seeds,logEvent:(i,s,p,x)=>{const d=U(a,u.currentMiniGameIndex);S("game",i,s,p,x,d)},onMiniGameComplete:i=>{u.activeMiniGameInProgress=!1;const s=U(a,u.currentMiniGameIndex);S("game","minigame_end",i,{},"mouse",s),M(),u.currentMiniGameIndex<1?u.currentMiniGameIndex++:(u.currentMiniGameIndex=0,u.currentWorldIndex++),k({immediate:!0}),se(r,n)}})}function U(r,n){const a=H&&H[r];if(a&&a[n])return a[n];const o={W1:["F1","F2"],W2:["A1","A2"],W3:["C1","C2"],W4:["E1","E2"],W5:["Q1","Q2"],W6:["CR1","CR3"],W7:["M1","M2"]};return o[r]&&o[r][n]||"MG"}let D=!1;function V(r,n){if(!r)return;r.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[var(--text-primary)] flex items-center justify-center mx-auto text-xl ">!</div>
 <h2 class="text-2xl text-[var(--text-primary)]">Connection Notice</h2>
 <p class="text-xs text-black max-w-md mx-auto leading-relaxed">${n}</p>
 <div class="pt-2">
 <button id="retryFinalizationBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] shadow-sm rounded-xs">Retry Finalization &rarr;</button>
 </div>
 </div>
 `;const a=document.getElementById("retryFinalizationBtn");a&&a.addEventListener("click",()=>{a.disabled=!0,a.textContent="Connecting...",ae()})}async function ae(){if(D)return;D=!0,u.activeMiniGameInProgress=!1,k({immediate:!0});const r=document.getElementById("recruitApp");r&&(r.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="waiting-spinner"></div>
 <h2 id="finalizingHeading" class="text-2xl text-[var(--text-primary)]">Synchronizing activity...</h2>
 <p id="finalizingSubtext" class="text-xs text-black">Saving your completed activity... Please keep this page open.</p>
 </div>
 `);const n=a=>{["Enter"," ","Spacebar"].includes(a.key)&&a.preventDefault()};window.addEventListener("keydown",n,{capture:!0});try{if(!await Fe()){window.removeEventListener("keydown",n,{capture:!0}),D=!1,V(r,"Connection could not be confirmed. Your saved activity has not been discarded. You can retry.");return}const o=document.getElementById("finalizingHeading"),e=document.getElementById("finalizingSubtext");o&&(o.textContent="Finalizing assessment..."),e&&(e.textContent="Saving your completed activity... Please keep this page open.");let t=null;for(let s=0;s<3;s++){try{if(t=await P("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:u.sessionId})}),t&&t.ok)break}catch(p){if(s===2)throw p}await new Promise(p=>setTimeout(p,1e3*(s+1)))}if(!t||!t.ok)throw new Error(t?`Server returned HTTP ${t.status}`:"No response from server");const i=await t.json().catch(()=>({}));if(i.status==="SUCCESS"||i.session_status==="COMPLETE"||i.is_already_completed){window.removeEventListener("keydown",n,{capture:!0}),u.screen="complete",u.telemetryTerminal=!0,u.telemetryQueue=[],L.clear().catch(s=>console.warn(s)),k({immediate:!0}),$();return}throw new Error("Unexpected completion status")}catch(a){window.removeEventListener("keydown",n,{capture:!0}),console.warn("Session complete submission error:",a),V(r,"The final session confirmation was not received. Your saved activity has not been discarded. You can retry.")}finally{window.removeEventListener("keydown",n,{capture:!0}),D=!1}}function Ye(r){var n;r.innerHTML=`
 <div class="space-y-6 text-center py-12">
 <h2 class="text-3xl text-[var(--text-primary)]">Session Paused</h2>
 <p class="text-sm text-black max-w-md mx-auto">
 Your progress has been preserved. Take as much time as you need. Timing metrics are suspended while paused.
 </p>
 <div class="pt-4">
 <button id="resumeBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] ">
 Resume Session &rarr;
 </button>
 </div>
 </div>
 `,(n=document.getElementById("resumeBtn"))==null||n.addEventListener("click",Z)}function Ke(r){r.innerHTML=`
 <div class="space-y-6 text-center py-16">
 <div class="w-16 h-16 rounded-full bg-[var(--text-primary)] border border-emerald-200 text-[var(--text-primary)] mx-auto flex items-center justify-center text-2xl ">
 &#10003;
 </div>
 <h1 class="text-3xl text-[var(--text-primary)]">Assessment Complete</h1>
 <p class="text-sm text-black max-w-lg mx-auto leading-relaxed">
 Thank you for your time, care, and attention. Your responses have been safely submitted to the Alfaaz Collective research registry.
 </p>
 
 <div class="max-w-md mx-auto mt-8 p-5 bg-[#faf8f5] border border-[var(--grid-border)]">
 <h2 class="text-lg text-[var(--text-primary)] mb-2">Next Step: Interview Call</h2>
 <p class="text-xs text-black mb-4">
 Please schedule a Google Meet call with us to discuss your application. Select a date <strong>other than today</strong>.
 </p>
 <div class="flex flex-col gap-2">
 <a href="mailto:alfaaz2k20@gmail.com?subject=Volunteer%20Interview%20Call%20Request&body=Hi%20Alfaaz%20Team%2C%0D%0A%0D%0AI%20have%20completed%20the%20volunteer%20assessment.%20I%20would%20like%20to%20schedule%20a%20Google%20Meet%20call%20for%20my%20interview.%0D%0A%0D%0AProposed%20Date%20%28Please%20choose%20a%20future%20date%2C%20not%20today%29%3A%20%5BInsert%20Date%5D%0D%0AProposed%20Time%3A%20%5BInsert%20Time%5D%0D%0A%0D%0AThank%20you%2C%0D%0A%5BYour%20Name%5D" 
 class="inline-block w-full min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] shadow-sm rounded-xs">
 Open Email App
 </a>
 <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alfaaz2k20@gmail.com&su=Volunteer+Interview+Call+Request&body=Hi+Alfaaz+Team,%0A%0AI+have+completed+the+volunteer+assessment.+I+would+like+to+schedule+a+Google+Meet+call+for+my+interview.%0A%0AProposed+Date+(Please+choose+a+future+date,+not+today):+[Insert+Date]%0AProposed+Time:+[Insert+Time]%0A%0AThank+you,%0A[Your+Name]" target="_blank"
 class="inline-block w-full min-h-[44px] px-6 py-2.5 border border-[var(--grid-border)] text-[var(--text-primary)] bg-white text-xs uppercase tracking-widest hover:border-[var(--accent-gold)] shadow-sm rounded-xs">
 Open Gmail in Browser
 </a>
 <p class="text-[10px] text-black mt-2">
 Or manually email <strong class="select-all cursor-pointer text-[var(--text-primary)]">alfaaz2k20@gmail.com</strong>
 </p>
 </div>
 </div>

 <div class="pt-6">
 <a href="index.html" class="inline-block px-6 py-2.5 border border-[var(--grid-border)] text-xs uppercase tracking-widest text-[var(--text-primary)] hover:border-[var(--accent-gold)] ">
 Return to Alfaaz Home
 </a>
 </div>
 </div>
 `}
