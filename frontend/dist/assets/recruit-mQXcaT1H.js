import"./global-DxYxv3W5.js";/* empty css               */function ie(a,o){const{appContainer:i,miniGameIndex:n,gameId:e,logEvent:t,onMiniGameComplete:r,worldIndex:s}=a,p=e||(n===0?"A1":n===1?"A2":"A3");p==="A1"?re(i,o,t,r,s):p==="A2"?ae(i,o,t,r,s):se(i,o,t,r)}function re(a,o,i,n,e=1){let t=0,r=!1,s=null,p="mouse";const b=[{id:"DOC_01",title:"Old Calligraphy Book (1842)",rule_prompt:"Sorting Rule: Sort by Century",tags:["Year: 1842","19th Century","Handmade Paper","Poem Verse"]},{id:"DOC_02",title:"Poetry Song Book",rule_prompt:"Sorting Rule: Sort by Type",tags:["Type: Poetry","Song Verses","Urdu","Paper Pages"]},{id:"DOC_03",title:"Exhibition Visitor Book (1924)",rule_prompt:"Sorting Rule: Sort by Century",tags:["Year: 1924","20th Century","Visitor List","Signatures"]},{id:"DOC_04",title:"Lal Ded Verses in Kashmiri",rule_prompt:"Sorting Rule: Sort by Language",tags:["Language: Kashmiri","Wise Verses","Local Poetry"]}],d=[{id:"19th_century",label:"19th Century Shelf",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},{id:"20th_century",label:"20th Century Shelf",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{id:"poetry",label:"Poetry Shelf",icon:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"},{id:"chronicle",label:"History Shelf",icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},{id:"kashmiri",label:"Kashmiri Language Shelf",icon:"M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"}];function c(){var f,h;if(t>=b.length){n({mini_game:"A1",observations_count:b.length});return}const u=b[t];performance.now();const m=`
 <div class="p-5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="flex justify-between items-start mb-2">
 <span class="text-sm tracking-widest text-[var(--accent-gold)] uppercase font-semibold">Folio ${t+1} of ${b.length}</span>
 <button id="guideBtn" type="button" class="text-base text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-2.5 py-1 interactive-option flex items-center gap-1.5 rounded-xs min-h-[32px]" tabindex="0">
 <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
 ${r?"Close Guide":"Shelf Guide"}
 </button>
 </div>

 <div id="guideModal" class="${r?"":"hidden"} p-3 mb-3 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-base text-[var(--text-primary)] space-y-1 rounded-xs">
 <div>&bull; <strong>Century Rule:</strong> Sort by century made (19th vs 20th Century).</div>
 <div>&bull; <strong>Type Rule:</strong> Sort by content type (Poetry vs History).</div>
 <div>&bull; <strong>Language Rule:</strong> Sort by language (Kashmiri).</div>
 </div>

 <h3 class="text-base sm:text-lg text-[var(--text-primary)] font-medium mt-1 mb-2.5">${u.title}</h3>
 <div class="flex flex-wrap gap-2">
 ${u.tags.map(y=>`<span class="px-2.5 py-1 bg-[#faf8f5] border border-[var(--grid-border)] text-base text-black rounded-xs">${y}</span>`).join("")}
 </div>
 </div>
 `,x=d.find(y=>y.id===s),g=`
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
 `,v=`
 <span>${s?`Selected shelf: <strong class="text-[var(--text-primary)]">${x==null?void 0:x.label}</strong>`:"Select a shelf above, then click Confirm."}</span>
 <span class="text-sm text-black ">${t+1} / ${b.length}</span>
 `;a.innerHTML=T({worldCode:"W2",worldIndex:e,title:"The Manuscript Folios",subtitle:"Sort each historical page onto its proper shelf.",instruction:"Examine this page. Pick the shelf that matches the active sorting rule.",instructionPrompt:u.rule_prompt,stimulusContent:m,interactionContent:g,summaryContent:v,actionButtonId:"confirmShelfBtn",actionButtonText:t<b.length-1?"Confirm Shelf &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!s,progressText:`Page ${t+1} of ${b.length}`}),i("item_presented",{trial_index:t,stimulus_id:u.id,task_def_version:"1.0"}),(f=document.getElementById("guideBtn"))==null||f.addEventListener("click",()=>{r=!r,c(),i("guide_viewed",{trial_index:t,stimulus_id:u.id,task_def_version:"1.0"})}),a.querySelectorAll(".folder-btn").forEach(y=>{const _=E=>{p=E,s=y.getAttribute("data-folder"),c()};y.addEventListener("click",()=>_("mouse")),y.addEventListener("keydown",E=>{(E.key==="Enter"||E.key===" ")&&(E.preventDefault(),_("keyboard"))})}),(h=document.getElementById("confirmShelfBtn"))==null||h.addEventListener("click",()=>{s&&(i("item_sorted",{trial_index:t,stimulus_id:u.id,choice:s,input_modality:p,task_def_version:"1.0"}),t++,s=null,c())})}c()}function ae(a,o,i,n,e=1){let t=0,r=null,s="mouse";const p=[{stimulus_id:"EXC_01",title:"Kashmiri Poetry Page with Water Wear",anomaly_description:'Water fading on lower margin. The accession year stamp is blurred and appears as "18--".',type_note:"Physical Damage & Blurred Year"},{stimulus_id:"EXC_02",title:"Clean Persian Calligraphy Page (1890)",anomaly_description:"Intact rag fiber paper, clear black ink, and standard accession stamp intact. No physical blemishes.",type_note:"Standard Page Inspection"},{stimulus_id:"EXC_03",title:"Loose Book Page with Number Jump",anomaly_description:"Binding threads severed. Margin numbering skips from Folio 14 directly to Folio 19 with missing text catchword.",type_note:"Missing Pages & Loose Thread"},{stimulus_id:"EXC_04",title:"Illustrated Story Page with Split Binding",anomaly_description:"Double folio split across signature gutter with inverted seal impressions and mismatched accession notation.",type_note:"Broken Spine & Upside-Down Seal"}],b=[{id:"flag_exception",title:"Flag for Special Repair",desc:"Place page in a protective sleeve for careful repair by a conservator.",tag:"Special Repair"},{id:"file_standard",title:"Place on Regular Shelf",desc:"Place page directly onto the standard open shelves.",tag:"Regular Shelf"},{id:"defer_review",title:"Hold in Storage Box",desc:"Hold page safely in storage until more background notes arrive.",tag:"Hold in Box"}];function d(){const c=p[t],u=b.find(f=>f.id===r),m=`
 <div class="p-5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="flex items-center justify-between mb-2">
 <span class="text-sm tracking-widest text-[var(--text-primary)] uppercase font-semibold">Manuscript Folio ${t+1} of 4</span>
 <span class="text-sm text-black uppercase bg-[#faf8f5] px-2 py-0.5 border border-[var(--grid-border)] rounded-xs font-medium">${c.type_note}</span>
 </div>
 <h3 class="text-base text-[var(--text-primary)] font-medium mb-1.5">${c.title}</h3>
 <p class="text-base text-black leading-relaxed bg-[#faf8f5] p-3 border border-[var(--grid-border)]/60 rounded-xs">
 ${c.anomaly_description}
 </p>
 </div>
 `,x=`
 <div class="space-y-2.5">
 <div class="text-base uppercase tracking-wider text-black mb-1 ">Choose handling action:</div>
 ${b.map(f=>`
 <div class="a2-opt p-3.5 bg-white border ${r===f.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} cursor-pointer interactive-option rounded-xs min-h-[52px]" data-action="${f.id}" tabindex="0" role="button">
 <div class="flex justify-between items-center mb-0.5">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${r===f.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${f.title}
 </div>
 </div>
 <div class="text-[11px] text-black leading-relaxed pl-3.5">${f.desc}</div>
 </div>
 `).join("")}
 </div>
 `,g=`
 <span>${r?`You selected: <strong class="text-[var(--text-primary)]">${u==null?void 0:u.title}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">${t+1} / 4</span>
 `;a.innerHTML=T({worldCode:"W2",worldIndex:e,title:"The Fragile Leaf",subtitle:"Examine page condition and choose a handling step.",instruction:"Read the page condition notes below. Choose the best handling option.",stimulusContent:m,interactionContent:x,summaryContent:g,actionButtonId:"a2ConfirmBtn",actionButtonText:t<3?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!r,progressText:`Folio ${t+1} of 4`}),i("item_presented",{trial_index:t,stimulus_id:c.stimulus_id,task_def_version:"1.0"});const v=document.getElementById("a2ConfirmBtn");a.querySelectorAll(".a2-opt").forEach(f=>{const h=y=>{s=y,r=f.getAttribute("data-action"),d()};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),h("keyboard"))})}),v==null||v.addEventListener("click",()=>{i("decision_logged",{trial_index:t,stimulus_id:c.stimulus_id,action_id:r,input_modality:s,task_def_version:"1.0"}),t<3?(t++,r=null,d()):n({mini_game:"A2",observations_count:4})})}d()}function se(a,o,i,n){let e=new Set,t=new Set,r="mouse";const s=[{id:"REC_01",title:"Card 1: Habba Khatoon Poem",text:"Poet: Habba Khatoon | Era: 16th Century | Birthplace: Chandhara (Recorded as: Chanhadra)",note:"Folio Label Verification"},{id:"REC_02",title:"Card 2: Carved Walnut Pen Box",text:"Artifact: Carved Walnut Calligraphy Pen Box | Dimensions: 24 cm x 6 cm | Medium: Seasoned Walnut",note:"Object Metadata Verification"},{id:"REC_03",title:"Card 3: River Verse Excerpt",text:`Verse Excerpt: "The river remembers the boatman's song" | Translator: [Not Specified / Blank]`,note:"Folio Label Verification"},{id:"REC_04",title:"Card 4: Kashmiri Vakh Lyric Leaf",text:"Folio Leaf: Kashmiri Vakh Lyric Leaf | Script: Sharda & Persian | Accession: AR-1892",note:"Manuscript Leaf Verification"},{id:"REC_05",title:"Card 5: Exhibition Opening Notice",text:"Exhibition Opening Reception: February 31st, 2026 | Location: Main Pavilion",note:"Public Schedule Verification"}];function p(){var b;a.innerHTML=`
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
 ${s.map((d,c)=>{const u=e.has(d.id);return`
 <div class="record-card p-4 bg-white border ${u?"border-[var(--text-primary)] bg-amber-50/20":"border-[var(--grid-border)]"} rounded-xs interactive-option shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" data-id="${d.id}" tabindex="0">
 <div class="space-y-1 flex-1">
 <div class="flex items-center gap-2">
 <span class="text-sm text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Ledger Card ${c+1} of 5</span>
 </div>
 <div class="text-base font-semibold text-[var(--text-primary)]">${d.title}</div>
 <div class="text-base text-black leading-relaxed bg-[#faf8f5] p-2.5 border border-[var(--grid-border)]/60 rounded-xs mt-1">
 ${d.text}
 </div>
 </div>

 <button type="button" class="toggle-flag-btn px-4 py-2.5 border text-base uppercase tracking-wider shrink-0 interactive-option rounded-xs min-h-[44px] w-full sm:w-auto ${u?"bg-[var(--text-primary)] text-white border-[var(--text-primary)]":"bg-white text-black border-[var(--grid-border)] "}" data-id="${d.id}">
 ${u?"Mistake Flagged ✓":"Flag Mistake"}
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
 `,a.querySelectorAll(".record-card").forEach((d,c)=>{const u=d.getAttribute("data-id"),m=()=>{t.has(u)||(t.add(u),i("record_inspected",{trial_index:c,stimulus_id:u,task_def_version:"1.0"}))};d.addEventListener("focus",m),d.addEventListener("mouseenter",m)}),a.querySelectorAll(".toggle-flag-btn").forEach((d,c)=>{const u=d.getAttribute("data-id"),m=x=>{r=x;const g=!e.has(u);g?e.add(u):e.delete(u),i("discrepancy_toggled",{trial_index:c,stimulus_id:u,flagged_state:g,input_modality:r,task_def_version:"1.0"}),p()};d.addEventListener("click",()=>m("mouse")),d.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),m("keyboard"))})}),(b=document.getElementById("a3SubmitBtn"))==null||b.addEventListener("click",()=>{i("verification_finalized",{action_id:"approve_ledger",input_modality:r,task_def_version:"1.0"}),n({mini_game:"A3",observations_count:s.length})})}p()}function ne(a,o){const{appContainer:i,miniGameIndex:n,gameId:e,logEvent:t,onMiniGameComplete:r}=a,s=e||(n===0?"F1":n===1?"F2":"F3");s==="F1"?oe(i,o,t,r):s==="F2"?de(i,o,t,r):le(i,o,t,r)}function oe(a,o,i,n){let e=0,t=50,r="accommodate",s="mouse",p=null;const b=[{stimulus_id:"F1_T1",title:"Sound Note: Sharp Echo",cue_text:'"Front row sound has sharp treble and heavy wall echo."',default_action:"accommodate"},{stimulus_id:"F1_T2",title:"Sound Note: Clear Hall",cue_text:'"Center hall sound is clear, balanced, and easy to hear."',default_action:"maintain_objective"},{stimulus_id:"F1_T3",title:"Sound Note: Quiet Whisper",cue_text:'"The speaker is reciting a whisper. Words are hard to hear."',default_action:"accommodate"},{stimulus_id:"F1_T4",title:"Sound Note: Sudden Silence",cue_text:'"A sudden quiet pause. Could be a dramatic silence or equipment issue."',default_action:"clarify"},{stimulus_id:"F1_T5",title:"Sound Note: Group Singing",cue_text:'"Group singing is steady and balanced across the entire room."',default_action:"maintain_objective"}];function d(){var W;p&&(cancelAnimationFrame(p),p=null);const c=b[e];a.innerHTML=T({worldCode:"W1",worldIndex:0,title:"Tuning the Hall",subtitle:"Adjust the hall sound to support the poetry reading.",instructionPrompt:"Your Task",instruction:"Read the sound note below. Pick your response and move the slider.",stimulusContent:`
 <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center text-sm font-semibold shrink-0">
 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
 </div>
 <div>
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${c.title}</div>
 <div id="partnerSpeech" class="text-base text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${c.cue_text}</div>
 </div>
 </div>
 </div>
 `,interactionContent:`
 <div class="space-y-4">
 <div>
 <div class="text-base uppercase tracking-wider text-black mb-2 ">1. Choose your response:</div>
 <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${r==="accommodate"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"}" data-action="accommodate">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${r==="accommodate"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 Adjust Sound
 </div>
 <div class="text-[11px] text-black mt-1 leading-relaxed">Change the sound setting to help the speaker.</div>
 </button>
 <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${r==="maintain_objective"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"}" data-action="maintain_objective">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${r==="maintain_objective"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 Keep Baseline
 </div>
 <div class="text-[11px] text-black mt-1 leading-relaxed">Leave the current sound setting as it is.</div>
 </button>
 <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${r==="clarify"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"}" data-action="clarify">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${r==="clarify"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 Check Channel
 </div>
 <div class="text-[11px] text-black mt-1 leading-relaxed">Check the audio signal before changing settings.</div>
 </button>
 </div>
 </div>

 <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-inner">
 <div class="text-base uppercase tracking-wider text-black mb-2 text-center">2. Adjust sound level:</div>
 <canvas id="waveCanvas" width="600" height="80" class="w-full h-20 bg-white border border-[var(--grid-border)] mb-3 rounded-xs"></canvas>

 <div class="w-full max-w-md mx-auto">
 <div class="flex justify-between items-center text-base text-black mb-2">
 <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-600 inline-block"></span> Soft (0)</span>
 <span class="text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)] rounded-xs" id="sliderValDisplay">${t}</span>
 <span class="flex items-center gap-1">Bright (100) <span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span></span>
 </div>
 <input type="range" id="freqSlider" min="0" max="100" step="5" value="${t}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg min-h-[44px]">
 </div>
 </div>
 </div>
 `,summaryContent:`
 <span>Your setting: <strong class="text-[var(--text-primary)]" id="choiceSummary">${r==="accommodate"?"Adjust Sound":r==="maintain_objective"?"Keep Baseline":"Check Channel"} (Level: ${t})</strong></span>
 <span class="text-sm text-black ">${e+1} / 6</span>
 `,actionButtonId:"lockFreqBtn",actionButtonText:e<5?"Confirm Setting &rarr;":"Confirm & Finish &rarr;",progressText:`Sound Note ${e+1} of 6`});const u=document.getElementById("waveCanvas"),m=u==null?void 0:u.getContext("2d"),x=document.getElementById("freqSlider"),g=document.getElementById("sliderValDisplay"),v=document.getElementById("choiceSummary");let f=0;function h(){if(!m||!u)return;m.clearRect(0,0,u.width,u.height),m.strokeStyle="#f0eeea",m.lineWidth=1;for(let S=0;S<u.width;S+=30)m.beginPath(),m.moveTo(S,0),m.lineTo(S,u.height),m.stroke();m.strokeStyle="#bd6f5d",m.lineWidth=2.5,m.beginPath();const C=.015+t/100*.05,I=14+Math.abs(t-50)/50*16;for(let S=0;S<u.width;S++){const R=u.height/2+Math.sin(S*C+f)*I;S===0?m.moveTo(S,R):m.lineTo(S,R)}m.stroke(),f+=.04,p=requestAnimationFrame(h)}h(),a.querySelectorAll(".f1-action-btn").forEach(C=>{C.addEventListener("click",()=>{var I,S;if(s="mouse",r=C.getAttribute("data-action"),a.querySelectorAll(".f1-action-btn").forEach(R=>{var q,G;R.classList.remove("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),R.classList.add("border-[var(--grid-border)]","bg-white"),(q=R.querySelector("span.rounded-full"))==null||q.classList.remove("bg-[var(--accent-gold)]"),(G=R.querySelector("span.rounded-full"))==null||G.classList.add("bg-stone-300")}),C.classList.add("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),C.classList.remove("border-[var(--grid-border)]","bg-white"),(I=C.querySelector("span.rounded-full"))==null||I.classList.add("bg-[var(--accent-gold)]"),(S=C.querySelector("span.rounded-full"))==null||S.classList.remove("bg-stone-300"),v){const R=r==="accommodate"?"Adjust Sound":r==="maintain_objective"?"Keep Baseline":"Check Channel";v.textContent=`${R} (Level: ${t})`}})});let y=0,_=null;const E=(C,I)=>{i("slider_input",{trial_index:e,stimulus_id:c.stimulus_id,slider_position_raw:C,input_modality:I,task_def_version:"1.0"}),y=Date.now()};x==null||x.addEventListener("input",C=>{if(s=C.pointerType||"mouse",t=parseInt(C.target.value,10),g&&(g.textContent=t),v){const S=r==="accommodate"?"Adjust Sound":r==="maintain_objective"?"Keep Baseline":"Check Channel";v.textContent=`${S} (Level: ${t})`}const I=Date.now();I-y>=100?(_&&(clearTimeout(_),_=null),E(t,s)):_||(_=setTimeout(()=>{E(t,s),_=null},100-(I-y)))}),x==null||x.addEventListener("change",()=>{_&&(clearTimeout(_),_=null),E(t,s)}),x==null||x.addEventListener("keydown",C=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(C.key)&&(s="keyboard")}),(W=document.getElementById("lockFreqBtn"))==null||W.addEventListener("click",()=>{_&&(clearTimeout(_),_=null),p&&(cancelAnimationFrame(p),p=null),i("trial_submit",{trial_index:e,stimulus_id:c.stimulus_id,action_id:r,slider_position_raw:t,input_modality:s,task_def_version:"1.0"}),e<5?(e++,t=50,r=b[e].default_action,d()):n({mini_game:"F1",observations_count:6})})}d()}function de(a,o,i,n){let e=0,t=null,r="mouse";const s=[{stimulus_id:"F2_T1",speaker_role:"Stage Lead",cue_text:'"The poet gestures toward the side speaker, asking for sound help."',condition_label:"Direct Request"},{stimulus_id:"F2_T2",speaker_role:"Hall Helper",cue_text:'"The speaker pauses with an uncertain look. No words are spoken."',condition_label:"Ambiguous Signal"},{stimulus_id:"F2_T3",speaker_role:"Sound Helper",cue_text:'"The performer sings with intense emotion as part of the poem."',condition_label:"Expressive Intensity"}],p=[{id:"act",title:"Act Directly",desc:"Take action right away to help the speaker."},{id:"clarify",title:"Ask for Clarity",desc:"Check with the speaker before making any changes."},{id:"maintain",title:"Keep Course",desc:"Stay on course without stepping in too early."}];function b(){const d=s[e],c=p.find(x=>x.id===t);a.innerHTML=T({worldCode:"W1",worldIndex:0,title:"The Gathering Voices",subtitle:"Coordinate sound with your hall team.",instructionPrompt:"Your Task",instruction:"Read the message from your teammate. Pick the best response below.",stimulusContent:`
 <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center text-sm font-semibold shrink-0">
 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
 </div>
 <div>
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${d.speaker_role}</div>
 <div class="text-base text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${d.cue_text}</div>
 </div>
 </div>
 </div>
 `,interactionContent:`
 <div>
 <div class="text-base uppercase tracking-wider text-black mb-2 ">Pick your response:</div>
 <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
 ${p.map(x=>`
 <div class="f2-card p-4 bg-white border ${t===x.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} cursor-pointer interactive-option space-y-1.5 rounded-xs min-h-[56px]" data-action="${x.id}" tabindex="0" role="button">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${t===x.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${x.title}
 </div>
 <div class="text-[11px] text-black leading-relaxed">${x.desc}</div>
 </div>
 `).join("")}
 </div>
 </div>
 `,summaryContent:`
 <span id="f2ChoiceText">${t?`You selected: <strong class="text-[var(--text-primary)]">${c==null?void 0:c.title}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">${e+1} / ${s.length}</span>
 `,actionButtonId:"f2ConfirmBtn",actionButtonText:e<s.length-1?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Message ${e+1} of ${s.length}`});const u=document.getElementById("f2ConfirmBtn"),m=document.getElementById("f2ChoiceText");a.querySelectorAll(".f2-card").forEach(x=>{const g=v=>{var f,h;if(r=v,t=x.getAttribute("data-action"),a.querySelectorAll(".f2-card").forEach(y=>{var _,E;y.classList.remove("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),y.classList.add("border-[var(--grid-border)]"),(_=y.querySelector("span.rounded-full"))==null||_.classList.remove("bg-[var(--accent-gold)]"),(E=y.querySelector("span.rounded-full"))==null||E.classList.add("bg-stone-300")}),x.classList.add("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),x.classList.remove("border-[var(--grid-border)]"),(f=x.querySelector("span.rounded-full"))==null||f.classList.add("bg-[var(--accent-gold)]"),(h=x.querySelector("span.rounded-full"))==null||h.classList.remove("bg-stone-300"),u&&(u.disabled=!1),m){const y=p.find(_=>_.id===t);m.innerHTML=`You selected: <strong class="text-[var(--text-primary)]">${y==null?void 0:y.title}</strong>`}};x.addEventListener("click",()=>g("mouse")),x.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g("keyboard"))})}),u==null||u.addEventListener("click",()=>{i("trial_submit",{trial_index:e,stimulus_id:d.stimulus_id,action_id:t,input_modality:r,task_def_version:"1.0"}),e<s.length-1?(e++,t=null,b()):n({mini_game:"F2",observations_count:s.length})})}b()}function le(a,o,i,n){let e=0,t="baseline",r=null,s=null,p="mouse";const b=[{stimulus_id:"F3_T1",cue_id:"cue_expressive_crescendo",title:"Round 1: Rising Voice Line",cue_text:'"The poet begins a rising, powerful verse."',baseline_context:"Small Practice Room — Sound dies down quickly with no echo.",baseline_options:[{id:"support_volume",label:"Support Volume",desc:"Lift volume so sound carries across the room."},{id:"dampen_level",label:"Lower Level",desc:"Turn volume down before the loud peak."},{id:"neutral_hold",label:"Keep Steady",desc:"Keep room settings steady without changes."}],shifted_context:"Stone Hall — High stone walls bounce sound and create heavy echo.",shifted_options:[{id:"attenuate_reverb",label:"Lower Echo",desc:"Trim room echo so words stay clear."},{id:"support_volume",label:"Support Volume",desc:"Keep the volume boost from the small room."},{id:"neutral_hold",label:"Keep Steady",desc:"Make no changes for the stone room."}]},{stimulus_id:"F3_T2",cue_id:"cue_sotto_voce_pause",title:"Round 2: Quiet Whisper",cue_text:'"The poet drops into a quiet whisper between lines."',baseline_context:"Quiet Sitting Room — Audience sits close and easily hears every word.",baseline_options:[{id:"preserve_natural_intimacy",label:"Keep Natural Tone",desc:"Keep sound soft and clear without extra volume."},{id:"boost_high_gain",label:"High Boost",desc:"Force the whisper to play at loud volume."},{id:"cut_channel",label:"Mute Feed",desc:"Treat quiet verse as dead sound."}],shifted_context:"Courtyard Gate — Nearby street chatter and fountain water cover soft voices.",shifted_options:[{id:"boost_intelligibility",label:"Boost Voice",desc:"Lift the voice so outdoor chatter does not hide it."},{id:"preserve_natural_intimacy",label:"Keep Natural Tone",desc:"Leave voice unboosted so whisper is hard to hear."},{id:"cut_channel",label:"Mute Feed",desc:"Treat quiet sound as an equipment issue."}]},{stimulus_id:"F3_T3",cue_id:"cue_rhythmic_syncopation",title:"Round 3: Pause Before Verse",cue_text:'"The poet pauses suddenly before the final line."',baseline_context:"Solo Recital — A single speaker recites at a steady, driving pace.",baseline_options:[{id:"sustain_cadence",label:"Keep Pace",desc:"Keep the steady beat moving through the pause."},{id:"halt_accompaniment",label:"Stop Sound",desc:"Stop all instruments abruptly on the pause."},{id:"force_metronome",label:"Speed Up",desc:"Push the recital forward past the pause."}],shifted_context:"Group Singing — A chorus enters during the pause to sing an answer line.",shifted_options:[{id:"open_reciprocal_space",label:"Make Space",desc:"Pause instruments to let the chorus answer clearly."},{id:"sustain_cadence",label:"Keep Pace",desc:"Play straight through without waiting for the chorus."},{id:"force_metronome",label:"Speed Up",desc:"Rush the group tempo forward."}]}];function d(){var m,x;const u=b[e];if(t==="baseline"){const g=u.baseline_options.find(v=>v.id===r);a.innerHTML=`
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
 <div class="text-base text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${u.cue_text}</div>
 </div>
 <div class="p-3 bg-amber-50/50 border border-[var(--grid-border)] rounded-xs">
 <span class="text-sm uppercase tracking-wider text-[var(--text-primary)] font-semibold">First Room Setting</span>
 <div class="text-base text-[var(--text-primary)] mt-0.5">${u.baseline_context}</div>
 </div>
 </div>

 <!-- INTERACTION AREA -->
 <div class="space-y-2.5 mb-4 candidate-content-protected">
 <div class="text-base uppercase tracking-wider text-black mb-1 ">Choose your response:</div>
 ${u.baseline_options.map(v=>`
 <div class="f3-opt p-3.5 bg-white border ${r===v.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer interactive-option rounded-xs min-h-[50px]" data-choice="${v.id}" tabindex="0" role="button">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${r===v.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${v.label}
 </div>
 <div class="text-[11px] text-black mt-0.5 leading-relaxed">${v.desc}</div>
 </div>
 `).join("")}
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>${r?`You selected: <strong class="text-[var(--text-primary)]">${g==null?void 0:g.label}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">Step 1 of 2</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button id="f3BaselineBtn" ${r?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 Confirm and See Room Shift &rarr;
 </button>
 </div>
 </div>
 `,a.querySelectorAll(".f3-opt").forEach(v=>{const f=h=>{p=h,r=v.getAttribute("data-choice"),d()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(m=document.getElementById("f3BaselineBtn"))==null||m.addEventListener("click",()=>{i("baseline_response_selected",{trial_index:e,stimulus_id:u.stimulus_id,cue_id:u.cue_id,choice_id:r,input_modality:p,task_def_version:"1.0"}),t="shifted",i("context_shifted",{trial_index:e,stimulus_id:u.stimulus_id,cue_id:u.cue_id,shifted_context:u.shifted_context,task_def_version:"1.0"}),d()})}else{const g=u.shifted_options.find(v=>v.id===s);a.innerHTML=`
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
 <div class="text-base text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${u.cue_text}</div>
 </div>
 <div class="p-3 bg-amber-100/70 border border-[var(--text-primary)]/50 rounded-xs">
 <span class="text-sm uppercase tracking-wider text-[var(--text-primary)] font-semibold">New Room Setting</span>
 <div class="text-base text-[var(--text-primary)] font-medium mt-0.5">${u.shifted_context}</div>
 </div>
 </div>

 <!-- INTERACTION AREA -->
 <div class="space-y-2.5 mb-4 candidate-content-protected">
 <div class="text-base uppercase tracking-wider text-black mb-1 ">Choose your updated response:</div>
 ${u.shifted_options.map(v=>`
 <div class="f3-updated-opt p-3.5 bg-white border ${s===v.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer interactive-option rounded-xs min-h-[50px]" data-choice="${v.id}" tabindex="0" role="button">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${s===v.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${v.label}
 </div>
 <div class="text-[11px] text-black mt-0.5 leading-relaxed">${v.desc}</div>
 </div>
 `).join("")}
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>${s?`You selected: <strong class="text-[var(--text-primary)]">${g==null?void 0:g.label}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">Step 2 of 2</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button id="f3UpdatedBtn" ${s?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 ${e<2?"Save Updated Setting & Next Round &rarr;":"Finish World 1 &rarr;"}
 </button>
 </div>
 </div>
 `,a.querySelectorAll(".f3-updated-opt").forEach(v=>{const f=h=>{p=h,s=v.getAttribute("data-choice"),d()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(x=document.getElementById("f3UpdatedBtn"))==null||x.addEventListener("click",()=>{i("updated_response_selected",{trial_index:e,stimulus_id:u.stimulus_id,cue_id:u.cue_id,choice_id:s,input_modality:p,task_def_version:"1.0"}),i("transition_completed",{trial_index:e,stimulus_id:u.stimulus_id,task_def_version:"1.0"}),e<2?(e++,t="baseline",r=null,s=null,c(),d()):n({mini_game:"F3",observations_count:3})})}}function c(){const u=b[e];i("transition_presented",{trial_index:e,stimulus_id:u.stimulus_id,cue_id:u.cue_id,baseline_context:u.baseline_context,task_def_version:"1.0"})}d()}function ce(a,o){const{appContainer:i,miniGameIndex:n,gameId:e,logEvent:t,onMiniGameComplete:r}=a,s=e||(n===0?"C1":n===1?"C2":"C3");s==="C1"?ue(i,o,t,r):s==="C2"?me(i,o,t,r):pe(i,o,t,r)}function ue(a,o,i,n){let e=0,t=0,r="mouse";const s=[{stimulus_id:"C1_R1",title:"Round 1: Partner Needs Tiles",description:"Your partner needs 3 more tiles to finish. You have 8 tiles.",partner_initial:2,user_initial:8,default_transfer:0,context_note:"Partner Needs Help"},{stimulus_id:"C1_R2",title:"Round 2: Balanced Baskets",description:"Both you and your partner have 5 tiles. Both have enough to finish.",partner_initial:5,user_initial:5,default_transfer:0,context_note:"Both Have Enough"}];function p(){var m,x,g;const d=s[e],c=d.partner_initial+t,u=d.user_initial-t;a.innerHTML=T({worldCode:"W3",worldIndex:2,title:"The Artisan's Basket",subtitle:"Coordinate ceramic tiles with your workshop partner.",instructionPrompt:"Your Task",instruction:"Check tile counts below. Move tiles to your partner if needed.",stimulusContent:`
 <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs flex items-center justify-between">
 <span class="text-base text-[var(--text-primary)]">
 <strong>${d.title}:</strong> ${d.description}
 </span>
 
 </div>
 `,interactionContent:`
 <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="grid grid-cols-2 gap-4 text-center mb-5">
 <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <span class="text-sm text-[var(--accent-gold)] uppercase font-semibold ">Partner Basket</span>
 <div class="text-xl font-semibold text-[var(--text-primary)] mt-1">${c} Tiles</div>
 <div class="flex justify-center gap-1 mt-2.5 flex-wrap max-w-[140px] mx-auto">
 ${Array(Math.max(0,c)).fill('<div class="w-3.5 h-3.5 bg-[var(--text-primary)]/70 rounded-xs shadow-xs"></div>').join("")}
 </div>
 </div>
 <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <span class="text-sm text-[var(--text-primary)] uppercase font-semibold ">Your Basket</span>
 <div class="text-xl font-semibold text-[var(--text-primary)] mt-1">${u} Tiles</div>
 <div class="flex justify-center gap-1 mt-2.5 flex-wrap max-w-[140px] mx-auto">
 ${Array(Math.max(0,u)).fill('<div class="w-3.5 h-3.5 bg-[var(--text-primary)]/70 rounded-xs shadow-xs"></div>').join("")}
 </div>
 </div>
 </div>

 <div class="text-center pt-3 border-t border-[var(--grid-border)]">
 <div class="text-base text-black mb-2 ">Tiles to share with partner:</div>
 <div class="flex justify-center items-center gap-4">
 <button type="button" id="minusTileBtn" class="w-12 h-12 rounded-xs bg-white border border-[var(--grid-border)] text-xl font-bold interactive-option shadow-xs flex items-center justify-center min-h-[44px]" tabindex="0">-</button>
 <span id="transferCount" class="text-3xl font-semibold text-[var(--accent-gold)] w-12 text-center">${t}</span>
 <button type="button" id="plusTileBtn" class="w-12 h-12 rounded-xs bg-white border border-[var(--grid-border)] text-xl font-bold interactive-option shadow-xs flex items-center justify-center min-h-[44px]" tabindex="0">+</button>
 </div>
 </div>
 </div>
 `,summaryContent:`
 <span>Sharing: <strong class="text-[var(--text-primary)]">${t} tiles</strong> (You keep ${u})</span>
 <span class="text-sm text-black ">Round ${e+1} of ${s.length}</span>
 `,actionButtonId:"confirmTransferBtn",actionButtonText:e<s.length-1?"Confirm Allocation &rarr;":"Confirm & Finish &rarr;",progressText:`Round ${e+1} of ${s.length}`}),(m=document.getElementById("minusTileBtn"))==null||m.addEventListener("click",()=>{r="mouse",t>0&&(t--,i("resource_transferred",{trial_index:e,stimulus_id:d.stimulus_id,delta:-1,action_type:"return_to_user",input_modality:r,task_def_version:"1.0"}),p())}),(x=document.getElementById("plusTileBtn"))==null||x.addEventListener("click",()=>{r="mouse",t<d.user_initial&&(t++,i("resource_transferred",{trial_index:e,stimulus_id:d.stimulus_id,delta:1,action_type:"transfer_to_partner",input_modality:r,task_def_version:"1.0"}),p())}),(g=document.getElementById("confirmTransferBtn"))==null||g.addEventListener("click",()=>{i("allocation_confirmed",{trial_index:e,stimulus_id:d.stimulus_id,input_modality:r,task_def_version:"1.0"}),e<s.length-1?(e++,t=0,b(),p()):n({mini_game:"C1",observations_count:s.length})})}function b(){const d=s[e];i("round_presented",{trial_index:e,stimulus_id:d.stimulus_id,input_modality:r,task_def_version:"1.0"})}p()}function me(a,o,i,n){let e=0,t=null,r="mouse";const s=[{stimulus_id:"C2_R1",title:"Round 1: Open Wall Space",partner_desc:"Partner hung their painting on the top left corner.",slots:[{id:"SLOT_NORTH_RIGHT",label:"Top Right (Even Spacing)"},{id:"SLOT_OVERLAP_LEFT",label:"Next to Partner (Tight Cluster)"},{id:"SLOT_BOTTOM_CENTER",label:"Bottom Center (Center Spot)"}]},{stimulus_id:"C2_R2",title:"Round 2: Keep Hallway Clear",partner_desc:"Partner is framing the center hallway. Keep the doorway path clear.",slots:[{id:"SLOT_PERIMETER_EAST",label:"East Wall (Keeps Path Open)"},{id:"SLOT_CENTER_ADJACENT",label:"Center Slot (Crowds the Hall)"},{id:"SLOT_PERIMETER_WEST",label:"West Wall (Keeps Path Open)"}]}];function p(){var u;const d=s[e],c=d.slots.find(m=>m.id===t);a.innerHTML=T({worldCode:"W3",worldIndex:2,title:"The Gallery Wall",subtitle:"Coordinate artwork placement with your partner.",instructionPrompt:"Your Task",instruction:"Check your partner's position. Choose an open spot that balances the wall.",stimulusContent:`
 <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs flex items-center justify-between">
 <span class="text-base text-[var(--text-primary)]">
 <strong>${d.title}:</strong> ${d.partner_desc}
 </span>
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-medium">Round ${e+1} of ${s.length}</span>
 </div>
 `,interactionContent:`
 <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Available Wall Placement Slots:</div>
 <div class="flex flex-col gap-2.5">
 ${d.slots.map(m=>`
 <button type="button" class="slot-btn px-4 py-3 text-base border rounded-xs ${t===m.id?"border-[var(--accent-gold)] bg-amber-50/70 font-semibold shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"} interactive-option flex items-center justify-between min-h-[48px]" data-slot="${m.id}" tabindex="0">
 <span class="flex items-center gap-2">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===m.id?"bg-[var(--accent-gold)] text-white":"text-black"}">${t===m.id?"✓":""}</span>
 <span class="text-[var(--text-primary)]">${m.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] font-medium uppercase">Slot ${m.id.replace("SLOT_","")}</span>
 </button>
 `).join("")}
 </div>
 </div>
 `,summaryContent:`
 <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${c==null?void 0:c.label}</strong>`:"Select a spot above to continue."}</span>
 <span class="text-sm text-black ">Round ${e+1} of ${s.length}</span>
 `,actionButtonId:"confirmWallBtn",actionButtonText:e<s.length-1?"Confirm Placement &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Round ${e+1} of ${s.length}`}),a.querySelectorAll(".slot-btn").forEach(m=>{const x=g=>{r=g,t=m.getAttribute("data-slot"),i("placement_attempted",{trial_index:e,stimulus_id:d.stimulus_id,slot_id:t,input_modality:r,task_def_version:"1.0"}),p()};m.addEventListener("click",()=>x("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),x("keyboard"))})}),(u=document.getElementById("confirmWallBtn"))==null||u.addEventListener("click",()=>{i("placement_confirmed",{trial_index:e,stimulus_id:d.stimulus_id,chosen_slot:t,input_modality:r,task_def_version:"1.0"}),e<s.length-1?(e++,t=null,b(),p()):n({mini_game:"C2",observations_count:s.length})})}function b(){const d=s[e];i("round_presented",{trial_index:e,stimulus_id:d.stimulus_id,task_def_version:"1.0"})}p()}function pe(a,o,i,n){let e=0,t=null,r=null,s="mouse";const p=[{stimulus_id:"C3_R1",title:"Opportunity 1: Partner Lantern is Dark",partner_state:"Your partner's lantern turned dark during setup.",condition_type:"identify_and_repair",fault_options:[{id:"fault_conduit_disconnected",label:"The wire came loose at the connector"},{id:"fault_bulb_broken",label:"The glass bulb is broken"},{id:"fault_switch_off",label:"The main hall switch is off"}],repair_options:[{id:"adjust_conduit",label:"Reconnect the loose wire and tighten the clamp"},{id:"call_help_desk",label:"Call the main help desk"},{id:"replace_lantern",label:"Take down the entire lamp"}],execution_action:"restore_power"},{stimulus_id:"C3_R2",title:"Opportunity 2: Hanging Rope Stuck",partner_state:"The hanging rope got caught in the wheel bracket.",condition_type:"identify_and_repair",fault_options:[{id:"fault_cable_pulley_pinch",label:"Rope is pinched between wheel and metal frame"},{id:"fault_cable_snapped",label:"The rope snapped completely"},{id:"fault_wall_anchor_loose",label:"The wall hook is loose"}],repair_options:[{id:"reseat_pulley_cable",label:"Loosen the lever and place the rope back on the wheel"},{id:"call_facility_maintenance",label:"File a general repair request"},{id:"force_pull_cable",label:"Pull the rope down hard"}],execution_action:"align_panel_height"},{stimulus_id:"C3_R3",title:"Opportunity 3: Shadow Blocks Artwork",partner_state:"A movable wooden screen casts a dark shadow over your partner's painting.",condition_type:"identify_and_repair",fault_options:[{id:"fault_blindspot_obstruction",label:"Wooden screen blocks the spotlight beam"},{id:"fault_color_distortion",label:"The light color looks wrong"}],repair_options:[{id:"shift_lantern",label:"Turn the spotlight slightly to shine around the screen"},{id:"generic_complaint",label:"Submit a general lighting complaint"}],execution_action:"illuminate_path"}];function b(){var m;const c=p[e];c.fault_options.find(x=>x.id===t);const u=c.repair_options.find(x=>x.id===r);a.innerHTML=`
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
 ${c.fault_options.map(x=>`
 <div class="fault-opt p-3 bg-white border ${t===x.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium":"border-[var(--grid-border)] "} rounded-xs cursor-pointer interactive-option text-base flex items-center gap-2 min-h-[44px]" data-fault="${x.id}" tabindex="0" role="button">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${t===x.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===x.id?"✓":""}</span>
 <span class="text-[var(--text-primary)]">${x.label}</span>
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
 ${c.repair_options.map(x=>`
 <div class="repair-opt p-3 bg-white border ${r===x.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium":"border-[var(--grid-border)] "} rounded-xs cursor-pointer interactive-option text-base flex items-center gap-2 min-h-[44px]" data-repair="${x.id}" tabindex="0" role="button">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${r===x.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${r===x.id?"✓":""}</span>
 <span class="text-[var(--text-primary)]">${x.label}</span>
 </div>
 `).join("")}
 </div>
 </div>
 `:""}
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>${t&&r?`Fix selected: <strong class="text-[var(--text-primary)]">${u==null?void 0:u.label}</strong>`:t?"Now choose a fix in Step 2.":"Select an issue in Step 1."}</span>
 <span class="text-sm text-black ">${e+1} / 3</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button type="button" id="executeRepairBtn" ${t&&r?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 ${e<2?"Apply Fix & Next Problem &rarr;":"Finish World 3 &rarr;"}
 </button>
 </div>
 </div>
 `,a.querySelectorAll(".fault-opt").forEach(x=>{const g=v=>{s=v,t=x.getAttribute("data-fault"),i("breakdown_identified",{trial_index:e,stimulus_id:c.stimulus_id,fault_id:t,input_modality:s,task_def_version:"1.0"}),b()};x.addEventListener("click",()=>g("mouse")),x.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g("keyboard"))})}),a.querySelectorAll(".repair-opt").forEach(x=>{const g=v=>{s=v,r=x.getAttribute("data-repair"),i("repair_action_performed",{trial_index:e,stimulus_id:c.stimulus_id,repair_action_id:r,input_modality:s,task_def_version:"1.0"}),b()};x.addEventListener("click",()=>g("mouse")),x.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g("keyboard"))})}),(m=document.getElementById("executeRepairBtn"))==null||m.addEventListener("click",()=>{i("repaired_action_executed",{trial_index:e,stimulus_id:c.stimulus_id,fault_id:t,repair_action_id:r,execution_action_id:c.execution_action,input_modality:s,task_def_version:"1.0"}),e<2?(e++,t=null,r=null,d(),b()):n({mini_game:"C3",observations_count:3})})}function d(){const c=p[e];i("repair_presented",{trial_index:e,stimulus_id:c.stimulus_id,task_def_version:"1.0"})}b()}function be(a,o){const{appContainer:i,miniGameIndex:n,gameId:e,logEvent:t,onMiniGameComplete:r}=a,s=e||(n===0?"E1":n===1?"E2":"E3");s==="E1"?xe(i,o,t,r):s==="E2"?ve(i,o,t,r):ge(i,o,t,r)}function xe(a,o,i,n){let e=0,t="mouse",r=null;const s=[{stimulus_id:"E1_T1",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T2",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T3",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T4",color:"Sage",shape:"Square",icon:"&#9632;",label:"Sage Square"},{stimulus_id:"E1_T5",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T6",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T7",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T8",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"}];function p(){var c;const d=s[e];a.innerHTML=T({worldCode:"W4",worldIndex:3,title:"The Ceramic Mosaic",subtitle:"Sort each ceramic tile into the matching container.",instructionPrompt:"Your Task",instruction:"Examine the tile below. Click Container 1 or 2 to file it.",stimulusContent:`
 <div class="p-6 bg-white border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
 <div class="text-5xl mb-2 ${d.color==="Gold"?"text-[var(--accent-gold)]":"text-[var(--text-primary)]"}">
 ${d.icon}
 </div>
 <div class="text-sm font-semibold text-[var(--text-primary)]">${d.label}</div>
 <div class="text-[11px] text-black mt-0.5 uppercase">${d.color} &bull; ${d.shape}</div>
 </div>
 `,interactionContent:`
 <div class="grid grid-cols-2 gap-4">
 <button type="button" class="bin-btn p-5 bg-white border ${r==="container_1"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_1" tabindex="0">
 <span class="text-2xl text-[var(--accent-gold)] block mb-1">&#9679;</span>
 <span class="text-base font-semibold text-[var(--text-primary)] block">Container 1</span>
 <span class="text-sm text-black block mt-0.5 ">Reference: Gold Circle</span>
 </button>
 <button type="button" class="bin-btn p-5 bg-white border ${r==="container_2"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_2" tabindex="0">
 <span class="text-2xl text-[var(--text-primary)] block mb-1">&#9632;</span>
 <span class="text-base font-semibold text-[var(--text-primary)] block">Container 2</span>
 <span class="text-sm text-black block mt-0.5 ">Reference: Sage Square</span>
 </button>
 </div>
 `,summaryContent:`
 <span>${r?`You selected: <strong class="text-[var(--text-primary)]">${r==="container_1"?"Container 1":"Container 2"}</strong>`:"Choose the option to continue."}</span>
 <span class="text-sm text-black ">${e+1} / ${s.length}</span>
 `,actionButtonId:"confirmE1Btn",actionButtonText:e<s.length-1?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!r,progressText:`Tile ${e+1} of ${s.length}`}),a.querySelectorAll(".bin-btn").forEach(u=>{const m=x=>{t=x,r=u.getAttribute("data-choice"),p()};u.addEventListener("click",()=>m("mouse")),u.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),m("keyboard"))})}),(c=document.getElementById("confirmE1Btn"))==null||c.addEventListener("click",()=>{i("tile_sorted",{trial_index:e,stimulus_id:d.stimulus_id,choice:r,input_modality:t,task_def_version:"1.0"}),e<s.length-1?(e++,r=null,performance.now(),b(),p()):n({mini_game:"E1",observations_count:s.length})})}function b(){const d=s[e];i("trial_presented",{trial_index:e,stimulus_id:d.stimulus_id,tile_color:d.color,tile_shape:d.shape,task_def_version:"1.0"})}p()}function ve(a,o,i,n){let e=0,t=null,r="mouse";const s=[{stimulus_id:"E2_S1",title:"Sequence 1: Ink Spill on Desk",situation:"A small drop of ink spilled onto your active pattern card.",has_disruption:!0,disruption_type:"ink_spill_masking_workspace",options:[{id:"clear_workspace",label:"Dab ink with a cloth and straighten your card",note:"Calm cleanup"},{id:"rush_uncleaned",label:"Keep placing tiles around the wet ink",note:"Rushed step"},{id:"pause_idle",label:"Step away and wait for help",note:"Long wait"}]},{stimulus_id:"E2_S2",title:"Sequence 2: Calm Studio Work",situation:"The workbench is clean, tidy, and well lit.",has_disruption:!1,disruption_type:"undisrupted_control",options:[{id:"standard_sequence",label:"Continue placing tiles according to plan",note:"Steady step"},{id:"unnecessary_rework",label:"Take tiles apart to re-check for no reason",note:"Unneeded check"},{id:"pause_idle",label:"Stop and wait before continuing",note:"Unneeded pause"}]},{stimulus_id:"E2_S3",title:"Sequence 3: Breeze Blows Paper",situation:"A sudden breeze blew your reference drawing off the table.",has_disruption:!0,disruption_type:"draft_blows_reference_card",options:[{id:"stabilize_reference",label:"Pick up paper and weigh it down with a stone",note:"Fix and secure"},{id:"guess_motif",label:"Place tiles from memory without looking at plan",note:"Guessing"},{id:"pause_idle",label:"Wait for the wind to stop",note:"Waiting"}]}];function p(){var u;const d=s[e],c=d.options.find(m=>m.id===t);a.innerHTML=T({worldCode:"W4",worldIndex:3,title:"The Courtyard Setup",subtitle:"Choose the best response when unexpected studio events happen.",instructionPrompt:"Your Task",instruction:"Read the situation below. Pick the most practical next step.",stimulusContent:`
 <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs flex items-center justify-between">
 <span class="text-base text-[var(--text-primary)]">
 <strong>${d.title}:</strong> ${d.situation}
 </span>
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-medium">Scenario ${e+1} of ${s.length}</span>
 </div>
 `,interactionContent:`
 <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Available Responses:</div>
 <div class="space-y-2.5">
 ${d.options.map(m=>`
 <div class="e2-opt p-3.5 bg-white border ${t===m.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-action="${m.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===m.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===m.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${m.label}</span>
 </span>
 
 </div>
 `).join("")}
 </div>
 </div>
 `,summaryContent:`
 <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${c==null?void 0:c.label}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">${e+1} / ${s.length}</span>
 `,actionButtonId:"confirmE2Btn",actionButtonText:e<s.length-1?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Scenario ${e+1} of ${s.length}`}),a.querySelectorAll(".e2-opt").forEach(m=>{const x=g=>{r=g,t=m.getAttribute("data-action"),i("action_selected",{trial_index:e,stimulus_id:d.stimulus_id,action_id:t,input_modality:r,task_def_version:"1.0"}),p()};m.addEventListener("click",()=>x("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),x("keyboard"))})}),(u=document.getElementById("confirmE2Btn"))==null||u.addEventListener("click",()=>{i("sequence_completed",{trial_index:e,stimulus_id:d.stimulus_id,chosen_action:t,input_modality:r,task_def_version:"1.0"}),e<s.length-1?(e++,t=null,b(),p()):n({mini_game:"E2",observations_count:s.length})})}function b(){const d=s[e];i("sequence_presented",{trial_index:e,stimulus_id:d.stimulus_id,has_disruption:d.has_disruption,disruption_type:d.disruption_type,task_def_version:"1.0"})}p()}function ge(a,o,i,n){let e=0,t=null,r="mouse";const s=[{stimulus_id:"E3_C1",title:"Condition 1: Three Colors Available",constraint_state:"standard_three_color_palette",description:"Gold, sage, and terracotta colors are all on the table.",options:[{id:"standard_layout",label:"Three-Color Pattern (Balanced three-color arrangement)"},{id:"tonal_adaptation",label:"Single Color Shades (One shade only)"},{id:"compact_adaptation",label:"Half-Grid Squeeze"}]},{stimulus_id:"E3_C2",title:"Condition 2: Only Indigo Blue Available",constraint_state:"monochrome_indigo_only",description:"Only one blue color is available on the table.",options:[{id:"tonal_adaptation",label:"Light and Dark Shading (Create depth using light and dark tones)"},{id:"standard_layout",label:"Try Three Colors (Cannot be done with one color)"},{id:"compact_adaptation",label:"Small Stamp Layout"}]},{stimulus_id:"E3_C3",title:"Condition 3: Half-Size Wall Space",constraint_state:"boundary_constricted_half_grid",description:"The wall space is cut in half. The artwork must fit smaller dimensions.",options:[{id:"compact_adaptation",label:"Compact Small Design (Scale down pattern to fit half wall)"},{id:"standard_layout",label:"Full Size Layout (Too wide for the small wall)"},{id:"tonal_adaptation",label:"Unscaled Shading Layout"}]}];function p(){var u;const d=s[e],c=d.options.find(m=>m.id===t);a.innerHTML=`
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
 ${d.options.map(m=>`
 <div class="e3-opt p-3.5 bg-white border ${t===m.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-layout="${m.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===m.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===m.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${m.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Option ${m.id.replace("LAYOUT_","")}</span>
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
 `,a.querySelectorAll(".e3-opt").forEach(m=>{const x=g=>{r=g,t=m.getAttribute("data-layout"),i("composition_action_attempted",{trial_index:e,stimulus_id:d.stimulus_id,action_id:t,input_modality:r,task_def_version:"1.0"}),p()};m.addEventListener("click",()=>x("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),x("keyboard"))})}),(u=document.getElementById("confirmE3Btn"))==null||u.addEventListener("click",()=>{i("composition_confirmed",{trial_index:e,stimulus_id:d.stimulus_id,chosen_action:t,input_modality:r,task_def_version:"1.0"}),e<s.length-1?(e++,t=null,b(),p()):n({mini_game:"E3",observations_count:3})})}function b(){const d=s[e];i("condition_presented",{trial_index:e,stimulus_id:d.stimulus_id,constraint_state:d.constraint_state,task_def_version:"1.0"})}p()}function fe(a,o){const{appContainer:i,miniGameIndex:n,gameId:e,logEvent:t,onMiniGameComplete:r}=a,s=e||(n===0?"Q1":n===1?"Q2":"Q3");s==="Q1"?he(i,o,t,r):s==="Q2"?ye(i,o,t,r):_e(i,o,t,r)}function he(a,o,i,n){let e=0,t=null,r={},s="mouse";const p=[{stimulus_id:"Q1_D1",title:"Antique Gold-Leaf Manuscript Leaf",scenario:"Choose the binding method for a fragile 19th-century manuscript page.",options:[{id:"flexible_cord_binding",label:"Sewn Flexible Cord (Allows spine to bend safely)"},{id:"tight_adhesive_clamp",label:"Rigid Glue Clamp (Firm hold on spine)"},{id:"unbound_portfolio",label:"Loose Archival Folder (Kept as separate sheets)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Binding Methods Note",info_value:"high",summary:"Srinagar bookbinders used soft vegetable cord to protect delicate gold borders."},{id:"OPT_CONTROL_1",topic:"Library Stamp Dates",info_value:"low",summary:"City library accession stamps began in late October 1888."}]},{stimulus_id:"Q1_D2",title:"Papier-Mâché Pen Case (Qalamdan)",scenario:"Select a protective surface coating for this painted lacquer case.",options:[{id:"curing_linseed_glaze",label:"Linseed Oil & Amber Varnish (Traditional slow curing glaze)"},{id:"quick_synthetic_seal",label:"Quick Synthetic Clear Spray (Modern fast-drying finish)"},{id:"wax_buff_only",label:"Dry Wax Polish (Gentle surface buffing)"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Papier-Mâché Care Guide",info_value:"high",summary:"Slow drying with natural amber resin keeps natural mineral colors bright."},{id:"OPT_CONTROL_2",topic:"Cabinet Hinge Maintenance",info_value:"low",summary:"Brass display cabinet hinges need oiling twice each year."}]},{stimulus_id:"Q1_D3",title:"Workshop Artisan Register",scenario:"Identify the origin of this undated Persian artisan register.",options:[{id:"guild_ledger_verified",label:"Official Guild Register (Bears official guildmaster seal)"},{id:"private_merchant_tally",label:"Merchant Shop Notebook (Informal daily trade tally)"},{id:"state_excise_record",label:"Treasury Tax Record (Official tax register)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Register Stitching Styles",info_value:"high",summary:"Crimson thread stitching was reserved for registered royal guilds."},{id:"OPT_CONTROL_1",topic:"Filing Code Reference",info_value:"low",summary:"Old municipal tax files use code series B."}]}];function b(){var u;const c=p[e];a.innerHTML=T({worldCode:"W5",worldIndex:4,title:"The Curatorial Dossier",subtitle:"Choose the best way to care for each historic item.",instructionPrompt:"Your Task",instruction:"Review the artifact below. Choose an action. Optional reference notes are available if you want them.",stimulusContent:`
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="flex items-center justify-between mb-2">
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Artifact Record</span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Record ${e+1} of ${p.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${c.title}</div>
 <div class="text-base text-black mt-1.5 leading-relaxed">${c.scenario}</div>
 </div>
 `,interactionContent:`
 <div class="space-y-4">
 <!-- Optional Reference Notes -->
 <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="text-sm uppercase text-[var(--accent-gold)] font-semibold tracking-wider mb-2 flex items-center justify-between">
 <span>Optional Reference Notes (Click to Open)</span>
 <span class="text-[9px] text-black font-normal">Voluntary consultation</span>
 </div>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
 ${c.optional_resources.map(m=>`
 <div class="opt-res-card p-3 bg-white border ${r[m.id]?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base min-h-[48px] flex flex-col justify-center" data-res="${m.id}">
 <div class="flex items-center justify-between">
 <span class="font-medium text-[var(--text-primary)] flex items-center gap-1.5">
 <svg class="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
 ${m.topic}
 </span>
 <span class="text-[9px] uppercase text-black">${r[m.id]?"Opened":"Inspect"}</span>
 </div>
 ${r[m.id]?`<p class="mt-2 text-[11px] text-black leading-relaxed border-t border-[var(--grid-border)] pt-2 ">${m.summary}</p>`:""}
 </div>
 `).join("")}
 </div>
 </div>

 <!-- Curatorial Actions -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Choose Preservation Action:</div>
 <div class="space-y-2.5">
 ${c.options.map(m=>`
 <div class="q1-opt p-3.5 bg-white border ${t===m.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-choice="${m.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2.5">
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${t===m.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===m.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${m.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium shrink-0">Action ${String.fromCharCode(65+c.options.indexOf(m))}</span>
 </div>
 `).join("")}
 </div>
 </div>
 </div>
 `,actionButtonId:"confirmQ1Btn",actionButtonText:e<p.length-1?"Confirm Decision &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Record ${e+1} of ${p.length}`}),a.querySelectorAll(".opt-res-card").forEach(m=>{m.addEventListener("click",()=>{s="mouse";const x=m.getAttribute("data-res");r[x]=!0,i("optional_resource_viewed",{trial_index:e,stimulus_id:c.stimulus_id,resource_id:x,input_modality:s,task_def_version:"1.0"}),b()})}),a.querySelectorAll(".q1-opt").forEach(m=>{const x=g=>{s=g,t=m.getAttribute("data-choice"),b()};m.addEventListener("click",()=>x("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),x("keyboard"))})}),(u=document.getElementById("confirmQ1Btn"))==null||u.addEventListener("click",()=>{i("decision_submitted",{trial_index:e,stimulus_id:c.stimulus_id,choice:t,input_modality:s,task_def_version:"1.0"}),e<p.length-1?(e++,t=null,r={},d(),b()):n({mini_game:"Q1",observations_count:p.length})})}function d(){const c=p[e];i("decision_presented",{trial_index:e,stimulus_id:c.stimulus_id,task_def_version:"1.0"})}b()}function ye(a,o,i,n){let e=0,t={},r=null,s="mouse";const p=[{stimulus_id:"Q2_T1",artifact_id:"manuscript_seal_1",title:"Relic 1: Wax Seal on Parchment",description:"A dark red wax seal stamped onto an old parchment document.",uncertainty_level:"moderate",expected_value:"high",clues:[{id:"CLUE_SEAL_INTAGLIO",label:"Carved Seal Border Script",detail:"Shows the official stamp of the Srinagar city office from 1862."},{id:"CLUE_WAX_RESIN",label:"Wax Material Analysis",detail:"Made with local pine resin rather than imported European wax."},{id:"CLUE_PARCHMENT_GRAIN",label:"Parchment Skin Grain",detail:"Mountain goatskin with hand-scraped natural grain."}],attributions:[{id:"attr_imperial_registrar_srinagar",label:"City Office of Srinagar (1860s)"},{id:"attr_commercial_trader",label:"River Trader Shipping Record"},{id:"attr_modern_reproduction",label:"Modern Souvenir Copy"}]},{stimulus_id:"Q2_T2",artifact_id:"ciphered_marginalia_2",title:"Relic 2: Star Chart with Handwritten Notes",description:"Handwritten notes written in old cursive script along a star chart.",uncertainty_level:"high",expected_value:"high",clues:[{id:"CLUE_CIPHER_DIACRITIC",label:"Script Number Marks",detail:"Notes record the date of an eclipse in 1845."},{id:"CLUE_SCRIBE_HAND",label:"Penmanship Style",detail:"Matches the private notebook of court scholar Mir Habib."},{id:"CLUE_GALL_INK_CORROSION",label:"Ink Aging Depth",detail:"Natural ink aging shows paper is over 170 years old."}],attributions:[{id:"attr_court_astrologer_notebook",label:"Court Scholar Personal Notebook"},{id:"attr_apothecary_recipe",label:"Herbal Medicine Recipe"},{id:"attr_random_scribble",label:"Scribe Practice Scratches"}]},{stimulus_id:"Q2_T3",artifact_id:"standard_receipt_3",title:"Relic 3: City Transit Toll Receipt (Control)",description:"A printed paper slip with standard columns and serial numbers.",uncertainty_level:"low",expected_value:"low_control",clues:[{id:"CLUE_PRINT_TYPE",label:"Standard Moveable Type",detail:"Mass-printed transit slip used for routine city transport."},{id:"CLUE_STAMP_INK",label:"Routine Blue Ink Stamp",detail:"Common government office stamp with standard numbering."}],attributions:[{id:"attr_standard_tax_slip",label:"City Transit Pass Receipt"},{id:"attr_royal_chancery_grant",label:"Palace Land Grant"},{id:"attr_secret_monastery_order",label:"Monastic Travel Permission"}]}];function b(){var u;const c=p[e];a.innerHTML=T({worldCode:"W5",worldIndex:4,title:"The Antiquarian’s Bench",subtitle:"Inspect physical clues to identify each historic object.",instructionPrompt:"Your Task",instruction:"Examine the relic below. Inspect any clues you wish. Then choose its origin.",stimulusContent:`
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="flex items-center justify-between mb-2">
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Relic Specimen</span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Specimen ${e+1} of ${p.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${c.title}</div>
 <div class="text-base text-black mt-1.5 leading-relaxed">${c.description}</div>
 </div>
 `,interactionContent:`
 <div class="space-y-4">
 <!-- Clues Inspection Grid -->
 <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="text-sm uppercase text-[var(--accent-gold)] font-semibold tracking-wider mb-2 flex items-center justify-between">
 <span>Physical Clues Available for Inspection</span>
 <span class="text-[9px] text-black font-normal">Click clue to examine</span>
 </div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
 ${c.clues.map(m=>`
 <div class="clue-btn p-3.5 bg-white border ${t[m.id]?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base min-h-[48px] flex flex-col justify-between" data-clue="${m.id}" tabindex="0" role="button">
 <div class="font-medium text-[var(--text-primary)] flex items-center justify-between">
 <span>${m.label}</span>
 <span class="text-[9px] uppercase text-black">${t[m.id]?"Inspected":"Inspect"}</span>
 </div>
 ${t[m.id]?`<p class="mt-2 text-[11px] text-black leading-relaxed border-t border-[var(--grid-border)] pt-2 ">${m.detail}</p>`:""}
 </div>
 `).join("")}
 </div>
 </div>

 <!-- Attribution Selection -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Conclude Historical Origin:</div>
 <div class="space-y-2.5">
 ${c.attributions.map(m=>`
 <div class="q2-attr p-3.5 bg-white border ${r===m.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-attr="${m.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2.5">
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${r===m.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${r===m.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${m.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium shrink-0">Origin ${String.fromCharCode(65+c.attributions.indexOf(m))}</span>
 </div>
 `).join("")}
 </div>
 </div>
 </div>
 `,actionButtonId:"confirmQ2Btn",actionButtonText:e<p.length-1?"Confirm Origin &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!r,progressText:`Relic ${e+1} of ${p.length}`}),a.querySelectorAll(".clue-btn").forEach(m=>{const x=g=>{s=g;const v=m.getAttribute("data-clue");t[v]=!0,i("clue_inspected",{trial_index:e,stimulus_id:c.stimulus_id,artifact_id:c.artifact_id,clue_id:v,input_modality:s,task_def_version:"1.0"}),b()};m.addEventListener("click",()=>x("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),x("keyboard"))})}),a.querySelectorAll(".q2-attr").forEach(m=>{const x=g=>{s=g,r=m.getAttribute("data-attr"),b()};m.addEventListener("click",()=>x("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),x("keyboard"))})}),(u=document.getElementById("confirmQ2Btn"))==null||u.addEventListener("click",()=>{i("investigation_finalized",{trial_index:e,stimulus_id:c.stimulus_id,artifact_id:c.artifact_id,attribution_choice:r,input_modality:s,task_def_version:"1.0"}),e<p.length-1?(e++,t={},r=null,d(),b()):n({mini_game:"Q2",observations_count:p.length})})}function d(){const c=p[e];i("artifact_presented",{trial_index:e,stimulus_id:c.stimulus_id,artifact_id:c.artifact_id,uncertainty_level:c.uncertainty_level,expected_value:c.expected_value,task_def_version:"1.0"})}b()}function _e(a,o,i,n){let e=0,t=!1,r=null,s="mouse";const p=[{stimulus_id:"Q3_E1",title:"Episode 1: The Master Painter’s Folio",ambiguity_type:"unattributed_artisan_folio",ambiguity_text:"An illuminated folio has gold dust borders and charcoal sketches. Two master painters worked during this era.",context_id:"provenance_context_1",context_title:"Rainawari Workshop Records (1870–1885)",context_text:"Records confirm Master Sadiq worked in Rainawari. He used willow-branch charcoal sketches and lapis blue borders.",decision_question:"Attribute the folio maker and technique lineage:",choices:[{id:"choice_sadiq_rainawari",label:"Master Sadiq (Rainawari workshop — willow charcoal sketch)"},{id:"choice_habib_court",label:"Master Habib (Palace court — imported graphite pencil)"},{id:"choice_generic_bazaar",label:"General City Market Production"}]},{stimulus_id:"Q3_E2",title:"Episode 2: The Exhibition Pavilion Ceiling",ambiguity_type:"mismatched_period_provenance",ambiguity_text:"A carved ceiling panel displays woodwork styles from two different rebuilding periods.",context_id:"provenance_context_2",context_title:"Dal Lake Pavilion Repair Notes (1902)",context_text:"Following the 1902 Dal Lake flood, builders used seasoned cedar wood. Earlier builders used soft river pine.",decision_question:"Identify the structural timber and repair era:",choices:[{id:"choice_post_flood_cedar",label:"Post-1902 Flood Repair (Seasoned mountain cedar wood)"},{id:"choice_pre_flood_pine",label:"Original Pre-Flood Building (Soft river pine wood)"},{id:"choice_modern_concrete",label:"Twentieth Century Replica"}]},{stimulus_id:"Q3_E3",title:"Episode 3: The Woven Silk Couplet",ambiguity_type:"regional_dialect_verse_origin",ambiguity_text:"A woven silk pashmina scarf has an old Kashmiri verse embroidered on it.",context_id:"provenance_context_3",context_title:"Valley Poetry Records (Lalla-Ded Shrines)",context_text:"Verses with this 4-beat pattern come from southern valley shrines (Pampore and Tral).",decision_question:"Select the verified cultural origin of this verse:",choices:[{id:"choice_southern_vakh_shrine",label:"Southern Valley Shrine Verse (Traditional 4-beat rhythm)"},{id:"choice_urban_court_ghazal",label:"Palace Court Scribe Poem (Formal Persian rhyming meter)"},{id:"choice_folk_bazaar_song",label:"Traveling Caravan Folk Song"}]}];function b(){var u,m;const c=p[e];a.innerHTML=`
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
 ${c.choices.map(x=>`
 <div class="q3-choice p-3.5 bg-white border ${r===x.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-choice="${x.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2.5">
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${r===x.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${r===x.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${x.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium shrink-0">Format ${x.id.replace("CHOICE_","")}</span>
 </div>
 `).join("")}
 </div>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end mb-4">
 <button type="button" id="confirmQ3Btn" ${r?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 ${e<p.length-1?"Confirm Choice &rarr;":"Finish World 5 &rarr;"}
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${e+1} of ${p.length}
 </div>
 </div>
 `,(u=document.getElementById("retrieveContextBtn"))==null||u.addEventListener("click",()=>{s="mouse",t=!0,i("context_requested",{trial_index:e,stimulus_id:c.stimulus_id,context_id:c.context_id,input_modality:s,task_def_version:"1.0"}),b()}),a.querySelectorAll(".q3-choice").forEach(x=>{const g=v=>{s=v,r=x.getAttribute("data-choice"),b()};x.addEventListener("click",()=>g("mouse")),x.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g("keyboard"))})}),(m=document.getElementById("confirmQ3Btn"))==null||m.addEventListener("click",()=>{i("decision_submitted",{trial_index:e,stimulus_id:c.stimulus_id,choice:r,input_modality:s,task_def_version:"1.0"}),e<p.length-1?(e++,t=!1,r=null,d(),b()):n({mini_game:"Q3",observations_count:3})})}function d(){const c=p[e];i("episode_presented",{trial_index:e,stimulus_id:c.stimulus_id,ambiguity_type:c.ambiguity_type,task_def_version:"1.0"})}b()}function we(a,o){const{appContainer:i,miniGameIndex:n,gameId:e,logEvent:t,onMiniGameComplete:r}=a,s=e||(n===0?"CR1":n===1?"CR3":"CR2");s==="CR1"?ke(i,o,t,r):s==="CR3"?Te(i,o,t,r):Se(i,o,t,r)}function ke(a,o,i,n){let e=0,t=[],r=null,s="mouse";const p=[{stage_id:"CR1_S1",title:"Stage 1: The Weaving Shuttle Rig",constraint:"missing_crossbar_shuttle",scenario:"A walnut loom shuttle crossbar has cracked. Build a working replacement with studio parts.",materials:[{id:"M_SPLIT_BAMBOO",name:"Split Bamboo Rib",icon:"&#127883;",role:"Flexible wooden bar"},{id:"M_BRASS_ROD",name:"Slotted Brass Rod",icon:"&#128296;",role:"Stiff metal bar"},{id:"M_CARVED_PINE",name:"Carved Pine Peg",icon:"&#129685;",role:"Lightweight wooden pin"},{id:"M_WAXED_CORD",name:"Waxed Linen Cord",icon:"&#129526;",role:"Strong binding string"},{id:"M_CERAMIC_WEIGHT",name:"Ceramic Weight",icon:"&#9711;",role:"Small balancing weight"}],valid_combinations:[["M_SPLIT_BAMBOO","M_WAXED_CORD"],["M_BRASS_ROD"],["M_CARVED_PINE","M_CERAMIC_WEIGHT"]]},{stage_id:"CR1_S2",title:"Stage 2: The Warp Tension Anchor",constraint:"tension_wire_unanchored",scenario:"The side tension cord needs an anchor point. Assemble a secure tie-down rig.",materials:[{id:"M_LEATHER_STRAP",name:"Leather Cinch Strap",icon:"&#129526;",role:"Firm gripping strap"},{id:"M_NOTCHED_PEG",name:"Hardwood Anchor Peg",icon:"&#129685;",role:"Notched wooden wedge"},{id:"M_COPPER_WIRE",name:"Flexible Copper Wire",icon:"&#9874;",role:"Bendable wrapping wire"},{id:"M_STONE_COUNTER",name:"Counterweight Stone",icon:"&#11044;",role:"Heavy balance stone"}],valid_combinations:[["M_LEATHER_STRAP","M_NOTCHED_PEG"],["M_COPPER_WIRE"],["M_LEATHER_STRAP","M_STONE_COUNTER"]]}];function b(){var u,m;const c=p[e];a.innerHTML=T({worldCode:"W6",worldIndex:5,title:"The Artisan's Assembly",subtitle:"Fix the broken part using items on the workbench.",instructionPrompt:"Your Task",instruction:"1. Read what is broken below. 2. Click bench items to add or remove them. 3. Click Test, then Confirm.",stimulusContent:`
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="flex items-center justify-between mb-1.5">
 <span class="text-xs text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Stage ${e+1} of ${p.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${c.title}</div>
 <div class="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">${c.scenario}</div>
 </div>
 `,interactionContent:`
 <div class="p-4 sm:p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs">
 <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-medium mb-3">Workbench Items (Click to Add or Remove):</div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-4">
 ${c.materials.map(x=>{const g=t.includes(x.id);return`
 <div class="part-card p-3.5 bg-white border ${g?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex flex-col justify-between min-h-[72px]" data-id="${x.id}" tabindex="0" role="button" aria-label="${x.name}">
 <div>
 <div class="text-lg mb-1 text-stone-700">${x.icon}</div>
 <div class="font-medium text-[var(--text-primary)] mb-0.5">${x.name}</div>
 <div class="text-sm text-black">${x.role}</div>
 </div>
 <div class="mt-2 text-right">
 <span class="text-sm font-semibold ${g?"text-[var(--accent-gold)]":"text-black"}">${g?"&#10003; EQUIPPED":"+ ADD"}</span>
 </div>
 </div>
 `}).join("")}
 </div>

 <!-- Assembly Status & Test Button -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-200">
 <div class="text-base text-black">
 Equipped: <strong class="text-[var(--text-primary)]">${t.length>0?t.map(x=>{var g;return(g=c.materials.find(v=>v.id===x))==null?void 0:g.name}).join(" + "):"None selected"}</strong>
 </div>
 <button type="button" id="testAssemblyBtn" ${t.length>0?"":"disabled"} class="px-4 py-2 bg-stone-100 border border-stone-300 text-[var(--text-primary)] text-base uppercase tracking-wider disabled:opacity-40 interactive-option rounded-xs min-h-[44px]">
 Test Assembly
 </button>
 </div>

 ${r?`
 <div class="mt-3 p-3 bg-white border ${r.valid?"border-emerald-600/40 text-[var(--text-primary)]":"border-amber-600/40 text-[var(--text-primary)]"} text-base rounded-xs leading-relaxed ">
 <span class="text-sm uppercase font-semibold block mb-0.5">${r.valid?"Assembly Test: Passed":"Assembly Test: Note"}</span>
 ${r.message}
 </div>
 `:""}
 </div>
 `,actionButtonId:"confirmStageBtn",actionButtonText:e<p.length-1?"Confirm Assembly &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:t.length===0,progressText:`Stage ${e+1} of ${p.length}`}),a.querySelectorAll(".part-card").forEach(x=>{const g=v=>{s=v;const f=x.getAttribute("data-id");t.includes(f)?t=t.filter(h=>h!==f):t.push(f),r=null,i("part_toggled",{stage_id:c.stage_id,trial_index:e,part_id:f,selected_parts:[...t],input_modality:s,task_def_version:"1.0"}),b()};x.addEventListener("click",()=>g("mouse")),x.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g("keyboard"))})}),(u=document.getElementById("testAssemblyBtn"))==null||u.addEventListener("click",()=>{s="mouse";const x=new Set(t),g=c.valid_combinations.some(v=>v.every(f=>x.has(f)));r={valid:g,message:g?"Tension test passed. The loom parts balance smoothly.":"Test note: The parts wobble or do not connect tightly."},i("assembly_tested",{stage_id:c.stage_id,trial_index:e,parts:[...t],input_modality:s,task_def_version:"1.0"}),b()}),(m=document.getElementById("confirmStageBtn"))==null||m.addEventListener("click",()=>{i("stage_completed",{stage_id:c.stage_id,trial_index:e,final_parts:[...t],input_modality:s,task_def_version:"1.0"}),e<p.length-1?(e++,t=[],r=null,d(),b()):n({mini_game:"CR1",observations_count:2})})}function d(){const c=p[e];i("stage_presented",{stage_id:c.stage_id,trial_index:e,constraint:c.constraint,task_def_version:"1.0"})}b()}function Se(a,o,i,n){let e=0,t="pre_shift",r=null,s=null,p="mouse";const b=[{episode_id:"CR2_E1",title:"Episode 1: The Central Pillar Chamber",pre_context:"Plan visitor walking paths through the grand exhibition hall.",pre_strategies:[{id:"S_CENTRAL_AVENUE",label:"Central Promenade",desc:"Single straight walkway down the center."},{id:"S_PERIMETER_LOOP",label:"Outer Wall Loop",desc:"Continuous gentle loop along outer walls."},{id:"S_ALCOVE_ISLANDS",label:"Display Islands",desc:"Separate display clusters across the floor."}],constraint_change:"central_pillar_blocks_corridor",shift_description:"Notice: A large carved stone pillar blocks the direct central pathway.",post_strategies:[{id:"split_flow",label:"Twin Walking Corridors (Split visitors smoothly around both sides of the pillar)",note:"Adapted Flow"},{id:"linear_flow",label:"Single Left Path (Route all visitors down the left aisle)",note:"Linear Channel"},{id:"stop_gap",label:"Central Waiting Area (Pause visitors and let small groups enter in turns)",note:"Batch Entry"}]},{episode_id:"CR2_E2",title:"Episode 2: West Gallery Safety Clearance",pre_context:"Arrange display stands across the wide western gallery corridor.",pre_strategies:[{id:"S_WALL_PANORAMA",label:"Wall Art Series",desc:"Continuous artwork hung along the west wall."},{id:"S_TRANSVERSE_SCREENS",label:"Crosswise Screens",desc:"Folding screens set across the corridor."},{id:"S_PAIRED_PLINTHS",label:"Center Display Stands",desc:"Two rows of waist-high display stands."}],constraint_change:"emergency_exit_clearance_widened",shift_description:"Safety rule: Keep a 3-meter wide open walkway along the west wall.",post_strategies:[{id:"perimeter_flow",label:"Clear Wall Pathway (Move displays inward to leave the west wall open)",note:"Adapted Flow"},{id:"central_cluster",label:"Center Grouping (Gather all stands tightly in the room center)",note:"Center Group"},{id:"diagonal_crossing",label:"Diagonal Zigzag (Weave walking paths between the doorways)",note:"Zigzag Path"}]},{episode_id:"CR2_E3",title:"Episode 3: North Archway Clearance",pre_context:"Display vertical banners and artwork in the north wing.",pre_strategies:[{id:"S_TALL_STELAE",label:"Tall Wooden Posts",desc:"Four-meter tall vertical banner posts."},{id:"S_HORIZONTAL_VITRINES",label:"Low Table Vitrines",desc:"Flat glass vitrines at waist height."},{id:"S_CEILING_SUSPENSION",label:"Ceiling Silk Banners",desc:"Flowing fabric banners hung from rafters."}],constraint_change:"low_ceiling_arch_support",shift_description:"Structural inspection: Low wooden ceiling beams limit overhead room to 2.2 meters.",post_strategies:[{id:"linear_flow",label:"Low Table Vitrines (Use waist-high displays to preserve headroom)",note:"Adapted Flow"},{id:"canopy_tent",label:"Hanging Fabric Canopy (Drape thin cloth below the beams)",note:"Low Drapery"},{id:"staggered_alcoves",label:"Wall Post Leaning (Lean tall banner boards against walls)",note:"Wall Lean"}]}];function d(){var m,x,g;const u=b[e];t==="pre_shift"?(a.innerHTML=`
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
 <span class="text-sm text-[var(--accent-gold)] font-medium uppercase">Episode ${e+1} of ${b.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${u.title}</div>
 <div class="text-base text-black leading-relaxed">${u.pre_context}</div>
 </div>

 <!-- INTERACTION AREA: Initial Strategy Selection -->
 <div class="mb-5 space-y-2.5 candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider">Select Initial Curation Concept:</div>
 ${u.pre_strategies.map(v=>{const f=r===v.id;return`
 <div class="pre-strat-card p-3.5 sm:p-4 bg-white border ${f?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-id="${v.id}" tabindex="0" role="button" aria-label="${v.label}">
 <div>
 <div class="font-medium text-[var(--text-primary)]">${v.label}</div>
 <div class="text-[11px] text-black mt-0.5">${v.desc}</div>
 </div>
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${f?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${f?"&#10003;":""}</span>
 </div>
 `}).join("")}
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end mb-4">
 <button type="button" id="confirmPreShiftBtn" ${r?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 Set Plan & Proceed &rarr;
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${e+1} of ${b.length} &middot; Step 1
 </div>
 </div>
 `,a.querySelectorAll(".pre-strat-card").forEach(v=>{const f=h=>{p=h,r=v.getAttribute("data-id"),d()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(m=document.getElementById("confirmPreShiftBtn"))==null||m.addEventListener("click",()=>{i("initial_strategy_selected",{episode_id:u.episode_id,trial_index:e,strategy_id:r,input_modality:p,task_def_version:"1.0"}),i("constraint_shifted",{episode_id:u.episode_id,trial_index:e,constraint_change:u.constraint_change,task_def_version:"1.0"}),t="post_shift",s=r,d()})):(a.innerHTML=`
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
 <div class="text-base text-[var(--text-primary)] leading-relaxed ">${u.shift_description}</div>
 <div class="mt-2 text-[11px] text-[var(--text-primary)]">
 Prior Plan: <strong>${((x=u.pre_strategies.find(v=>v.id===r))==null?void 0:x.label)||r}</strong>
 </div>
 </div>

 <!-- INTERACTION AREA: Post-Shift Strategy Selection -->
 <div class="mb-5 space-y-2.5 candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider">Choose Adapted Layout:</div>
 ${u.post_strategies.map(v=>{const f=s===v.id;return`
 <div class="post-strat-card p-3.5 sm:p-4 bg-white border ${f?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-id="${v.id}" tabindex="0" role="button" aria-label="${v.label}">
 <div>
 <div class="font-medium text-[var(--text-primary)]">${v.label}</div>
 <div class="text-sm text-black mt-0.5">${v.note}</div>
 </div>
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${f?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${f?"&#10003;":""}</span>
 </div>
 `}).join("")}
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end mb-4">
 <button type="button" id="confirmPostShiftBtn" ${s?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 ${e<b.length-1?"Confirm Plan & Next Episode &rarr;":"Finish Part 2 &rarr;"}
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${e+1} of ${b.length} &middot; Step 2
 </div>
 </div>
 `,a.querySelectorAll(".post-strat-card").forEach(v=>{const f=h=>{p=h,s=v.getAttribute("data-id"),d()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(g=document.getElementById("confirmPostShiftBtn"))==null||g.addEventListener("click",()=>{i("strategy_revised",{episode_id:u.episode_id,trial_index:e,initial_strategy_id:r,revised_strategy_id:s,input_modality:p,task_def_version:"1.0"}),e<b.length-1?(e++,t="pre_shift",r=null,s=null,c(),d()):n({mini_game:"CR2",observations_count:3})}))}function c(){const u=b[e];i("episode_presented",{episode_id:u.episode_id,trial_index:e,initial_context:u.pre_context,task_def_version:"1.0"})}d()}function Te(a,o,i,n){let e=0,t=null,r=null,s=null,p="mouse";const b=[{stimulus_id:"CR3_T1",title:"Trial 1: The Crisp Paper Fold",target_motif:"burnished_crease",objective:"Form a sharp, smooth crease on thick paper without tearing surface fibers.",tools:[{id:"bone_folder",name:"Polished Bone Tool",icon:"&#129685;",affordance:"Smooth curved edge that applies friction gently"},{id:"metal_stylus",name:"Steel Scribe Stylus",icon:"&#128296;",affordance:"Hard pointed needle tip for sharp indentation"},{id:"bamboo_wedge",name:"Beveled Bamboo Scraper",icon:"&#127883;",affordance:"Broad flat wooden face for broad surface pressure"}],methods:[{id:"firm_edge_pass",name:"Firm Edge Pass",desc:"Slide rounded edge along ruler with continuous diagonal pressure."},{id:"flat_face_rub",name:"Flat Face Rub",desc:"Distribute wide surface friction across fold line."},{id:"sharp_point_drag",name:"Sharp Point Drag",desc:"Draw tip directly across surface to score the fiber line."}],feedback_map:{"bone_folder:firm_edge_pass":{success:!0,text:"Clean, crisp burnished crease formed with zero surface abrasion."},"bamboo_wedge:flat_face_rub":{success:!0,text:"Smooth, even flattened fold achieved without marring surface grain."},"metal_stylus:sharp_point_drag":{success:!1,text:"Paper fibers sliced; sharp point cut through the paper fold."},"metal_stylus:firm_edge_pass":{success:!1,text:"Metal edge left dark metallic friction scuffs across the parchment."},"bone_folder:flat_face_rub":{success:!0,text:"Gentle, even crease formed; fibers compressed smoothly."},"bamboo_wedge:firm_edge_pass":{success:!0,text:"Uniform clean fold line established with natural wood contour."},"bone_folder:sharp_point_drag":{success:!1,text:"Uneven dragging motion; point dented paper surface."},"bamboo_wedge:sharp_point_drag":{success:!1,text:"Wood corner snagged on rough paper grain."},"metal_stylus:flat_face_rub":{success:!1,text:"Insufficient surface area; uneven pressure indentation."}}},{stimulus_id:"CR3_T2",title:"Trial 2: Mulberry Paper Stipple",target_motif:"fine_stipple",objective:"Produce an even scatter of tiny ink drops on fibrous paper.",tools:[{id:"horsehair_brush",name:"Stiff Hair Brush",icon:"&#128396;",affordance:"Springy stiff bristles that snap back easily"},{id:"sponge_block",name:"Natural Sea Sponge",icon:"&#9711;",affordance:"Soft porous texture that dabs damp color"},{id:"linen_swab",name:"Rolled Cloth Swab",icon:"&#129526;",affordance:"Rolled fabric tip that absorbs liquid quickly"}],methods:[{id:"textured_flick",name:"Bristle Flick",desc:"Pull loaded bristles back with thumb to release fine mist."},{id:"mottled_dab",name:"Surface Dab",desc:"Light stamp of textured surface directly on paper."},{id:"drag_stroke",name:"Smooth Sweep",desc:"Draw applicator steadily across page in sweeping stroke."}],feedback_map:{"horsehair_brush:textured_flick":{success:!0,text:"Fine, even constellation of organic micro-droplets dispersed across parchment."},"sponge_block:mottled_dab":{success:!0,text:"Rich textured tonal stipple with soft, organic cellular grain."},"linen_swab:drag_stroke":{success:!1,text:"Produced a single continuous solid streak; zero stipple effect."},"linen_swab:textured_flick":{success:!1,text:"Fabric has no elastic bristle snap; pigment remained bound in swab."},"sponge_block:drag_stroke":{success:!1,text:"Smeared broad irregular smudge across paper."},"horsehair_brush:drag_stroke":{success:!1,text:"Solid brushstroke line created; no dispersed speckling."},"horsehair_brush:mottled_dab":{success:!0,text:"Bristle tips formed delicate speckled texture upon contact."},"sponge_block:textured_flick":{success:!1,text:"Sponge cannot be flicked; dropped heavy inconsistent blot."},"linen_swab:mottled_dab":{success:!1,text:"Dense blot soaked through fiber without texture."}}}];function d(){var m,x,g,v;const u=b[e];a.innerHTML=T({worldCode:"W6",worldIndex:5,title:"The Improvised Tool",subtitle:"Choose a tool and action to solve the craft problem.",instructionPrompt:"Your Task",instruction:"1. Look at the goal below. 2. Pick a tool and an action. 3. Click Test to see what happens, then Confirm.",stimulusContent:`
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="flex items-center justify-between mb-1.5">
 <span class="text-xs text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Round ${e+1} of ${b.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${u.title}</div>
 <div class="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">${u.objective}</div>
 </div>
 `,interactionContent:`
 <div class="space-y-4">
 <!-- Tool Selection -->
 <div>
 <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-medium mb-2">1. Pick an Implement:</div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
 ${u.tools.map(f=>`
 <div class="cr3-tool-card p-3.5 sm:p-4 bg-white border ${t===f.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base min-h-[64px]" data-id="${f.id}" tabindex="0" role="button" aria-label="${f.name}">
 <div class="flex items-center gap-2 mb-1">
 <span class="text-lg">${f.icon}</span>
 <span class="font-medium text-[var(--text-primary)]">${f.name}</span>
 </div>
 <div class="text-[11px] text-black leading-relaxed">${f.affordance}</div>
 </div>
 `).join("")}
 </div>
 </div>

 <!-- Method Selection -->
 <div>
 <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-medium mb-2">2. Choose an Action:</div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
 ${u.methods.map(f=>`
 <div class="cr3-method-card p-3.5 sm:p-4 bg-white border ${r===f.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base min-h-[64px]" data-id="${f.id}" tabindex="0" role="button" aria-label="${f.name}">
 <div class="font-medium text-[var(--text-primary)] mb-0.5">${f.name}</div>
 <div class="text-[11px] text-black leading-relaxed">${f.desc}</div>
 </div>
 `).join("")}
 </div>
 </div>

 <!-- Apply & Observe Feedback -->
 <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
 <div class="text-base text-black">
 Active Pairing: <strong class="text-[var(--text-primary)]">${t?(m=u.tools.find(f=>f.id===t))==null?void 0:m.name:"None"} + ${r?(x=u.methods.find(f=>f.id===r))==null?void 0:x.name:"None"}</strong>
 </div>
 <button type="button" id="applyTechniqueBtn" ${t&&r?"":"disabled"} class="px-5 py-2.5 bg-stone-100 border border-stone-300 text-[var(--text-primary)] text-base uppercase tracking-wider disabled:opacity-40 interactive-option rounded-xs min-h-[44px]">
 Apply Technique
 </button>
 </div>

 ${s?`
 <div class="p-4 bg-white border ${s.success?"border-emerald-600/40 text-[var(--text-primary)]":"border-amber-600/40 text-[var(--text-primary)]"} rounded-xs text-base leading-relaxed ">
 <div class="text-sm uppercase font-semibold mb-1 ${s.success,"text-[var(--text-primary)]"}">Material Outcome Observation</div>
 <div>${s.text}</div>
 </div>
 `:""}
 </div>
 `,actionButtonId:"confirmTrialBtn",actionButtonText:e<b.length-1?"Confirm Technique &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!(t&&r),progressText:`Trial ${e+1} of ${b.length}`}),a.querySelectorAll(".cr3-tool-card").forEach(f=>{const h=y=>{p=y,t=f.getAttribute("data-id"),i("tool_selected",{stimulus_id:u.stimulus_id,trial_index:e,tool_id:t,input_modality:p,task_def_version:"1.0"}),d()};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),h("keyboard"))})}),a.querySelectorAll(".cr3-method-card").forEach(f=>{const h=y=>{p=y,r=f.getAttribute("data-id"),d()};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),h("keyboard"))})}),(g=document.getElementById("applyTechniqueBtn"))==null||g.addEventListener("click",()=>{p="mouse";const f=`${t}:${r}`,h=u.feedback_map[f]||{success:!1,text:"No noticeable craft adaptation observed."};s=h,i("action_applied",{stimulus_id:u.stimulus_id,trial_index:e,tool_id:t,action_method:r,input_modality:p,task_def_version:"1.0"}),i("feedback_observed",{stimulus_id:u.stimulus_id,trial_index:e,tool_id:t,action_method:r,outcome_feedback:h.text,task_def_version:"1.0"}),d()}),(v=document.getElementById("confirmTrialBtn"))==null||v.addEventListener("click",()=>{i("strategy_adapted",{stimulus_id:u.stimulus_id,trial_index:e,final_tool_id:t,final_method:r,input_modality:p,task_def_version:"1.0"}),e<b.length-1?(e++,t=null,r=null,s=null,c(),d()):n({mini_game:"CR3",observations_count:b.length})})}function c(){const u=b[e];i("trial_presented",{stimulus_id:u.stimulus_id,trial_index:e,target_motif:u.target_motif,task_def_version:"1.0"})}d()}function Ce(a,o){const{appContainer:i,miniGameIndex:n,gameId:e,logEvent:t,onMiniGameComplete:r}=a,s=e||(n===0?"M1":n===1?"M2":"M3");s==="M1"?Ee(i,o,t,r):s==="M2"?Ae(i,o,t,r):$e(i,o,t,r)}function Ee(a,o,i,n){let e=0,t="mouse";const r=[{stimulus_id:"M1_U1",recipient:"Master Ghulam — Calligraphy Diwan",note:"Formal invitation envelope 1"},{stimulus_id:"M1_U2",recipient:"Valley Youth Literary Guild",note:"Formal invitation envelope 2"}];function s(){var d;const b=r[e];a.innerHTML=T({worldCode:"W7",worldIndex:6,title:"The Ceremonial Seal",subtitle:"Apply wax seals to event invitations.",instructionPrompt:"Your Task",instruction:"Review the recipient below. Click Apply Wax Seal. Completing all 3 fulfills this activity.",stimulusContent:`
 <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
 <div class="w-full max-w-sm mx-auto min-h-[140px] bg-amber-50/70 border border-[var(--grid-border)] flex flex-col items-center justify-center p-5 relative shadow-sm rounded-xs">
 <span class="text-sm uppercase tracking-widest text-black ">Ceremonial Invitation</span>
 <div class="text-sm font-semibold text-[var(--text-primary)] mt-1.5">${b.recipient}</div>
 <div class="text-[11px] text-stone-500 mt-0.5">${b.note}</div>

 <div id="sealDisplay" class="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-sm text-[var(--accent-gold)] font-bold shadow-xs">
 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
 </div>
 </div>
 </div>
 `,actionButtonId:"stampBtn",actionButtonText:e===r.length-1?"Confirm & Finish &rarr;":"Apply Wax Seal &rarr;",progressText:`Envelope ${e+1} of ${r.length} (Required Minimum: 2)`}),(d=document.getElementById("stampBtn"))==null||d.addEventListener("click",()=>{t="mouse",i("unit_action_performed",{stimulus_id:b.stimulus_id,unit_index:e,action_type:"press_wax_seal",input_modality:t,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:b.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<r.length-1?(e++,p(),s()):n({mini_game:"M1",observations_count:r.length})})}function p(){const b=r[e];i("unit_presented",{stimulus_id:b.stimulus_id,unit_index:e,is_mandatory:!0,task_def_version:"1.0"})}s()}function Ae(a,o,i,n){let e="mandatory",t=0,r=0,s="mouse";const p=[{stimulus_id:"M2_M1",label:"Guest Folder 1: Artisan Guild",is_mandatory:!0},{stimulus_id:"M2_M2",label:"Guest Folder 2: Regional Patrons",is_mandatory:!0}],b=[{stimulus_id:"M2_O1",label:"Extra Folder 1: Visiting Students",is_mandatory:!1},{stimulus_id:"M2_O2",label:"Extra Folder 2: Community Observers",is_mandatory:!1}];function d(){var u,m,x,g,v;if(e==="mandatory"){const f=p[t];a.innerHTML=T({worldCode:"W7",worldIndex:6,stepBadge:`Required Phase (${t+1}/2)`,title:"The Courtesy Sleeves",subtitle:"Prepare courtesy sleeves for event attendees.",instructionPrompt:"Your Task",instruction:"Assemble the required folder below. Two required folders are needed to satisfy this activity.",stimulusContent:`
 <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
 <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
 <span class="text-sm uppercase tracking-wider text-stone-500 ">Required Courtesy Folder</span>
 <div class="text-sm font-semibold text-[var(--text-primary)] mt-1">${f.label}</div>
 </div>
 </div>
 `,actionButtonId:"foldSleeveBtn",actionButtonText:"Assemble Required Folder &rarr;",progressText:`Required Folder ${t+1} of ${p.length}`}),(u=document.getElementById("foldSleeveBtn"))==null||u.addEventListener("click",()=>{s="mouse",i("unit_action_performed",{stimulus_id:f.stimulus_id,unit_index:t,action_type:"assemble_sleeve",input_modality:s,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:f.stimulus_id,unit_index:t,is_mandatory:!0,task_def_version:"1.0"}),t<p.length-1?(t++,c(p[t]),d()):(e="choice",i("choice_presented",{trial_index:p.length,mandatory_completed_count:p.length,task_def_version:"1.0"}),d())})}else if(e==="choice")a.innerHTML=T({worldCode:"W7",worldIndex:6,stepBadge:"Requirement Completed",title:"The Courtesy Sleeves",subtitle:"Required minimum completed.",stimulusContent:`
 <div class="p-6 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs text-center">
 <div class="w-10 h-10 mx-auto rounded-full bg-[var(--text-primary)] border border-emerald-300 flex items-center justify-center text-[var(--text-primary)] text-lg mb-2">
 &#10003;
 </div>
 <div class="text-sm font-semibold text-[var(--text-primary)] mb-1">Required Minimum Satisfied</div>
 <p class="text-base text-black max-w-md mx-auto leading-relaxed mb-6">
 You have completed the required 2 courtesy folders. You may conclude this activity now, or make up to ${b.length-r} extra folders.
 <br><strong class="text-stone-700 mt-1 inline-block">Stopping at the minimum is completely neutral.</strong>
 </p>

 <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
 <button type="button" id="concludeBtn" class="px-6 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px] cursor-pointer">
 Conclude Activity Now &rarr;
 </button>
 ${r<b.length?`
 <button type="button" id="continueOptionalBtn" class="px-6 py-3.5 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-base uppercase tracking-widest interactive-option shadow-xs rounded-xs w-full sm:w-auto min-h-[44px] cursor-pointer">
 + Prepare Extra Folder (${r+1}/${b.length})
 </button>
 `:""}
 </div>
 </div>
 `,progressText:"Choice Point &middot; Stopping is neutral"}),(m=document.getElementById("concludeBtn"))==null||m.addEventListener("click",()=>{s="mouse",i("continuation_choice_selected",{choice:"conclude",optional_index:r,input_modality:s,task_def_version:"1.0"}),n({mini_game:"M2",observations_count:p.length+r})}),(x=document.getElementById("continueOptionalBtn"))==null||x.addEventListener("click",()=>{s="mouse",i("continuation_choice_selected",{choice:"continue",optional_index:r,input_modality:s,task_def_version:"1.0"}),e="optional",c(b[r]),d()});else if(e==="optional"){const f=b[r];a.innerHTML=T({worldCode:"W7",worldIndex:6,stepBadge:"Voluntary Extra",title:"The Courtesy Sleeves",subtitle:"Voluntary extra folder preparation.",instructionPrompt:"Voluntary Extra",instruction:"You may assemble this extra folder or finish at any time. Stopping is completely neutral.",stimulusContent:`
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
 `,actionButtonId:"foldOptionalSleeveBtn",actionButtonText:r===b.length-1?"Confirm & Finish &rarr;":"Assemble Extra Folder &rarr;",progressText:`Extra Folder ${r+1} of ${b.length}`}),(g=document.getElementById("stopOptionalEarlyBtn"))==null||g.addEventListener("click",()=>{s="mouse",i("continuation_choice_selected",{choice:"conclude",optional_index:r,input_modality:s,task_def_version:"1.0"}),n({mini_game:"M2",observations_count:p.length+r})}),(v=document.getElementById("foldOptionalSleeveBtn"))==null||v.addEventListener("click",()=>{s="mouse",i("unit_action_performed",{stimulus_id:f.stimulus_id,unit_index:p.length+r,action_type:"assemble_sleeve",input_modality:s,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:f.stimulus_id,unit_index:p.length+r,is_mandatory:!1,task_def_version:"1.0"}),r++,r<b.length?(e="choice",i("choice_presented",{trial_index:p.length+r,mandatory_completed_count:p.length,task_def_version:"1.0"}),d()):n({mini_game:"M2",observations_count:p.length+r})})}}function c(u){i("unit_presented",{stimulus_id:u.stimulus_id,unit_index:u.is_mandatory?t:p.length+r,is_mandatory:u.is_mandatory,task_def_version:"1.0"})}d()}function $e(a,o,i,n){let e=0,t="mouse";const r=[{stimulus_id:"M3_U1",is_mandatory:!0,row_name:"Gallery Row 1: Lighting & Illumination Alignment",feedback_type:"salient"},{stimulus_id:"M3_U2",is_mandatory:!0,row_name:"Gallery Row 2: Poetry Anthologies Welcome Stand",feedback_type:"moderate"},{stimulus_id:"M3_U3",is_mandatory:!0,row_name:"Gallery Row 3: Courtyard Entry Floral Registry",feedback_type:"minimal"},{stimulus_id:"M3_U4",is_mandatory:!1,row_name:"Gallery Row 4: Auxiliary Bench Linen Inspection",feedback_type:"none"},{stimulus_id:"M3_U5",is_mandatory:!1,row_name:"Gallery Row 5: Outer Colonnade Lantern Wick Inspection",feedback_type:"none"},{stimulus_id:"M3_U6",is_mandatory:!1,row_name:"Gallery Row 6: Perimeter Garden Urn Water Check",feedback_type:"none"}],s=3;function p(){var u,m;const d=r[e],c=e>=s;a.innerHTML=`
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
 Row ${e+1} of ${r.length}
 </div>
 </div>
 `,(u=document.getElementById("concludeM3Btn"))==null||u.addEventListener("click",()=>{t="mouse",i("conclude_selected",{stimulus_id:d.stimulus_id,unit_index:e,total_units_completed:e,input_modality:t,task_def_version:"1.0"}),n({mini_game:"M3",observations_count:e})}),(m=document.getElementById("verifyRowBtn"))==null||m.addEventListener("click",()=>{t="mouse",i("unit_action_performed",{stimulus_id:d.stimulus_id,unit_index:e,action_type:"verify_registry_entry",input_modality:t,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:d.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<r.length-1?(e++,b(),p()):n({mini_game:"M3",observations_count:r.length})})}function b(){const d=r[e];i("trial_presented",{stimulus_id:d.stimulus_id,unit_index:e,is_mandatory:d.is_mandatory,task_def_version:"1.0"})}p()}const V={W1:{name:"The Frequency",name_ur:"آواز",subtitle:"Acoustics & Dialogue"},W2:{name:"The Archive",name_ur:"دستاویز",subtitle:"Manuscripts & Preservation"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ کینوس",subtitle:"Artisan Workshop"},W4:{name:"The Shifting Grid",name_ur:"بدلتا گرڈ",subtitle:"Mosaic & Rhythm"},W5:{name:"The Hidden Gallery",name_ur:"پوشیدہ گیلری",subtitle:"Exhibition Discovery"},W6:{name:"The Broken Tool",name_ur:"ٹوٹا آلہ",subtitle:"Material Assembly"},W7:{name:"The Repetition",name_ur:"دہرائی",subtitle:"Readiness & Ceremony"}};function T({worldCode:a="",worldIndex:o=0,stepBadge:i="",title:n="",subtitle:e="",instruction:t="",instructionPrompt:r="Your Task",stimulusContent:s="",interactionContent:p="",feedbackContent:b="",summaryContent:d="",actionButtonId:c="",actionButtonText:u="",actionButtonDisabled:m=!1,secondaryActionHtml:x="",progressText:g="",extraContent:v=""}){const f=V[a]||{name:"Alfaaz Workshop",name_ur:""},h=typeof o=="number"?o:0,y=i&&!i.toLowerCase().includes("takes about")?i:"";return`
 <div class="max-w-2xl mx-auto space-y-5">
 <!-- TOP BAR: English Left, Urdu Right -->
 <div class="flex justify-between items-start pb-3 border-b border-[var(--grid-border)]">
 <div>
 <span class="act-badge">World ${h+1} of 7 &middot; ${f.name}</span>
 <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${n}</h2>
 ${e?`<p class="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">${e}</p>`:""}
 </div>
 <div class="text-right shrink-0 ml-4">
 ${f.name_ur?`<span class="font-serif text-2xl sm:text-3xl text-[var(--text-secondary)] block" style="font-family: var(--font-urdu); direction: rtl;">${f.name_ur}</span>`:""}
 ${y?`<span class="text-[11px] text-[var(--accent-gold)] uppercase tracking-wider block mt-1">${y}</span>`:""}
 </div>
 </div>

 <!-- CLEAR, SPACIOUS INSTRUCTION / CONTEXT BOX -->
 ${t?`
 <div class="p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs candidate-content-protected">
 <div class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold mb-1">${r}</div>
 <div class="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
 ${t}
 </div>
 </div>
 `:""}

 <!-- MAIN STIMULUS AREA -->
 ${s?`<div class="candidate-content-protected">${s}</div>`:""}

 <!-- INTERACTION AREA -->
 ${p?`<div class="candidate-content-protected">${p}</div>`:""}

 <!-- FEEDBACK REGION -->
 ${b?`
 <div class="candidate-content-protected">
 ${b}
 </div>
 `:""}

 <!-- ACTIVE SELECTION / SUMMARY AREA -->
 ${d?`
 <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs text-sm font-sans text-[var(--text-primary)] flex justify-between items-center candidate-content-protected">
 ${d}
 </div>
 `:""}

 <!-- PRIMARY ACTION BAR -->
 ${u||x?`
 <div class="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
 ${x||""}
 ${u?`
 <button type="button" id="${c}" ${m?"disabled":""} class="w-full sm:w-auto px-8 py-3.5 bg-[var(--text-primary)] text-white text-xs font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer interactive-option shadow-sm rounded-xs flex items-center justify-center gap-2 min-h-[44px]">
 ${u}
 </button>
 `:""}
 </div>
 `:""}

 <!-- EXTRA CONTENT -->
 ${v||""}

 <!-- PROGRESS FOOTER -->
 ${g?`
 <div class="text-right text-xs text-[var(--text-secondary)] font-sans pt-1">
 ${g}
 </div>
 `:""}
 </div>
 `}const O={W1:["F1","F2"],W2:["A1","A2"],W3:["C1","C2"],W4:["E1","E2"],W5:["Q1","Q2"],W6:["CR1","CR3"],W7:["M1","M2"]};function Ie(a){const{appContainer:o,worldCode:i,worldIndex:n,miniGameIndex:e,gameId:t,onMiniGameComplete:r}=a,s=V[i]||{name:"Alfaaz Workshop",name_ur:""},p=t||O[i]&&O[i][e]||null,b={...a,gameId:p},d=(c,u)=>`
 <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex justify-between items-start gap-4">
 <div>
 <span class="act-badge">World ${n+1} of 7 &middot; ${s.name}</span>
 <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${c}</h2>
 <p class="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">${u}</p>
 </div>
 <div class="text-right shrink-0">
 ${s.name_ur?`<span class="font-serif text-2xl sm:text-3xl text-[var(--text-secondary)] block" style="font-family: var(--font-urdu); direction: rtl;">${s.name_ur}</span>`:""}
 </div>
 </div>
 `;switch(i){case"W1":ne(b,d);break;case"W2":ie(b,d);break;case"W3":ce(b,d);break;case"W4":be(b,d);break;case"W5":fe(b,d);break;case"W6":we(b,d);break;case"W7":Ce(b,d);break;default:r&&r({});break}}function Re(){const a=window.ALFAAZ_API_URL||"";a&&(fetch(a+"/ping").catch(()=>{}),setInterval(()=>fetch(a+"/ping").catch(()=>{}),4*60*1e3))}let l={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1,activeMiniGameInProgress:!1,telemetryTerminal:!1};const z="alfaaz_recruit_state",Le="alfaaz_recruit_unsent",L={dbPromise:null,init(){return this.dbPromise=new Promise((a,o)=>{const i=indexedDB.open("AlfaazRecruitDB",3);i.onupgradeneeded=n=>{n.target.result.objectStoreNames.contains("outbox")?n.oldVersion<3&&(n.target.result.deleteObjectStore("outbox"),n.target.result.createObjectStore("outbox",{keyPath:"_idbKey"})):n.target.result.createObjectStore("outbox",{keyPath:"_idbKey"})},i.onsuccess=()=>a(i.result),i.onerror=()=>o(i.error)}),this.dbPromise},async append(a){a._idbKey||(a._idbKey=crypto.randomUUID());try{const o=await this.dbPromise;return new Promise((i,n)=>{const e=o.transaction("outbox","readwrite"),t=e.objectStore("outbox"),r={...a},s=t.add(r);s.onsuccess=()=>i(s.result),e.onerror=()=>n(e.error)})}catch(o){console.warn("IDB append failed. State will only be persistent for the session.",o),a._idbFailed=!0}},async deleteMany(a){if(!(!a||a.length===0))try{const o=await this.dbPromise;return new Promise((i,n)=>{const e=o.transaction("outbox","readwrite"),t=e.objectStore("outbox");a.forEach(r=>t.delete(r)),e.oncomplete=()=>i(),e.onerror=()=>n(e.error)})}catch(o){console.warn("IDB delete failed",o)}},async getAll(){try{const a=await this.dbPromise;return new Promise((o,i)=>{const n=a.transaction("outbox","readonly"),e=n.objectStore("outbox").getAll();e.onsuccess=()=>o(e.result),e.onerror=()=>i(n.error)})}catch(a){return console.warn("IDB getAll failed",a),[]}},async clear(){try{const a=await this.dbPromise;return new Promise((o,i)=>{const n=a.transaction("outbox","readwrite");n.objectStore("outbox").clear(),n.oncomplete=()=>o(),n.onerror=()=>i(n.error)})}catch{}}};L.init().catch(a=>console.warn("IDB init failed",a));let N=!1;function U(){N=!1;try{const a={sessionId:l.sessionId,configHash:l.configHash,worldSequence:l.worldSequence,seeds:l.seeds,screen:l.screen,sjtScenarios:l.sjtScenarios,currentSjtIndex:l.currentSjtIndex,sjtResponses:l.sjtResponses,currentWorldIndex:l.currentWorldIndex,currentMiniGameIndex:l.currentMiniGameIndex,accessibilityModes:l.accessibilityModes,segmentId:l.segmentId,seq:l.seq,isPaused:l.isPaused,activeMiniGameInProgress:l.activeMiniGameInProgress||!1,telemetryTerminal:l.telemetryTerminal};sessionStorage.setItem(z,JSON.stringify(a))}catch(a){console.warn("[Persistence] Error saving sessionStorage:",a)}}function w({immediate:a=!1}={}){if(a){U();return}if(N)return;N=!0;const o=()=>U();"requestIdleCallback"in window?window.requestIdleCallback(o,{timeout:500}):window.setTimeout(o,100)}async function Be(){try{const a=sessionStorage.getItem(z),o=await L.getAll();if(o&&o.length>0)l.telemetryQueue=o;else{const i=sessionStorage.getItem(Le);if(i){const n=JSON.parse(i);Array.isArray(n)&&(l.telemetryQueue=n)}}if(a){const i=JSON.parse(a);if(i.sessionId){if(l.sessionId=i.sessionId,l.configHash=i.configHash||null,l.worldSequence=i.worldSequence||[],l.seeds=i.seeds||{},l.screen=i.screen||"consent",l.sjtScenarios=i.sjtScenarios||[],l.currentSjtIndex=i.currentSjtIndex||0,l.sjtResponses=i.sjtResponses||{},l.currentWorldIndex=i.currentWorldIndex||0,l.currentMiniGameIndex=i.currentMiniGameIndex||0,l.accessibilityModes=i.accessibilityModes||[],J(l.accessibilityModes),l.seq=i.seq||1,l.isPaused=i.isPaused||!1,l.telemetryTerminal=i.telemetryTerminal||!1,l.segmentId=(i.segmentId||1)+1,k(l.screen,"segment_start",{segment_id:l.segmentId}),i.activeMiniGameInProgress&&i.screen==="games"){const n=l.worldSequence[l.currentWorldIndex],e=H(n,l.currentMiniGameIndex);k("game","interrupted",{mini_game:e,reason:"page_reload"}),l.currentMiniGameIndex<1?l.currentMiniGameIndex++:(l.currentMiniGameIndex=0,l.currentWorldIndex++),l.activeMiniGameInProgress=!1}return w({immediate:!0}),!0}}}catch(a){console.warn("[Persistence] Error restoring sessionStorage:",a)}return!1}async function B(a,o={}){const i=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",n={"Content-Type":"application/json",...o.headers||{}};return fetch(`${i}${a}`,{...o,headers:n})}function k(a,o,i={},n={},e="mouse",t=null,r=null){const s=performance.now();let p=i,b=n;try{const c=JSON.stringify(i),u=JSON.stringify(n),m=new TextEncoder().encode(c).length+new TextEncoder().encode(u).length;m>4096&&(p={event_oversize:!0,original_size_bytes:m},b={oversized:!0})}catch{}const d={seq:l.seq++,segment_id:l.segmentId,t_ms:s,screen:a,game_world:l.worldSequence[l.currentWorldIndex]||null,mini_game:t,trial:r,action:o,input_type:e,task_def_version:i&&i.task_def_version||"1.0",state:b,data:p};d._idbKey=crypto.randomUUID(),l.telemetryQueue.push(d),w(),L.append(d).catch(c=>console.warn(c)),(l.telemetryQueue.length>=50||o==="minigame_end"||o==="sjt_complete")&&P()}let M=null,D=50;async function P(){if(!l.sessionId||l.telemetryQueue.length===0||l.telemetryTerminal)return!0;if(M)return M;M=Pe();try{return await M}finally{M=null}}async function Pe(){if(!l.sessionId||l.telemetryQueue.length===0||l.telemetryTerminal)return!0;const a=l.telemetryQueue.slice(0,D),o=a.map(n=>n._idbKey).filter(n=>n!==void 0),i=a.map(n=>{const e={...n};return delete e._idbKey,delete e._idbFailed,e});try{const n=await B("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:l.sessionId,events:i})});if(n&&n.status===422){const t=await n.json().catch(()=>({}));if(t.detail&&(t.detail.detail==="events_cap_reached"||t.detail.status==="DATA_LIMITED"))return console.warn("[Telemetry] Terminal event cap reached (50,000). Halting future telemetry flushes."),l.telemetryTerminal=!0,w({immediate:!0}),!0}if(n&&n.status===413)return console.warn("[Telemetry] Batch rejected with HTTP 413 (oversize)."),a.length>1?D=Math.max(1,Math.floor(a.length/2)):console.error("[Telemetry] A single telemetry event exceeds the body limit. It remains queued for recovery."),w({immediate:!0}),!1;if(n&&n.status===403){const t=await n.json().catch(()=>({}));if((typeof t.detail=="string"?t.detail:JSON.stringify(t.detail||"")).toLowerCase().includes("already complete"))return console.info("[Telemetry] Session is already complete on server; draining local queue."),l.telemetryQueue=[],L.clear().catch(s=>console.warn(s)),l.telemetryTerminal=!0,w({immediate:!0}),!0}if(!n||!n.ok)throw new Error(n?`HTTP ${n.status}`:"No response");const e=await n.json().catch(()=>({}));return e.result&&e.result.session_status==="COMPLETE"?(l.telemetryQueue.splice(0,a.length),o.length>0&&L.deleteMany(o),e.result.new_rejected_count>0&&(l.telemetryQueue=[],L.clear().catch(t=>console.warn(t)),l.telemetryTerminal=!0),w({immediate:!0}),!0):(l.telemetryQueue.splice(0,a.length),o.length>0&&L.deleteMany(o),w(),!0)}catch(n){return console.warn("[Telemetry] Flush failed; telemetry remains queued:",n),w({immediate:!0}),!1}}async function Me(a=3){let o=0;for(;!l.telemetryTerminal&&l.telemetryQueue.length>0;){const i=l.telemetryQueue.length;if(!await P()||l.telemetryQueue.length>=i){if(o++,o>=a)return!1;await new Promise(e=>setTimeout(e,600*o))}else o=0}return!0}setInterval(()=>{l.sessionId&&l.telemetryQueue.length>0&&!l.telemetryTerminal&&P()},2500);window.addEventListener("pagehide",()=>{if(w({immediate:!0}),l.sessionId&&l.telemetryQueue.length>0){const a=window.ALFAAZ_API_URL||"",o=JSON.stringify({session_id:l.sessionId,events:l.telemetryQueue.slice(0,D)});navigator.sendBeacon(`${a}/recruit/telemetry`,new Blob([o],{type:"application/json"}))}});document.addEventListener("visibilitychange",()=>{document.hidden?(k(l.screen,"visibility_hidden",{timestamp:Date.now()}),k(l.screen,"tab_hidden",{timestamp:Date.now()}),P()):(k(l.screen,"visibility_visible",{timestamp:Date.now()}),k(l.screen,"tab_visible",{timestamp:Date.now()}))});window.addEventListener("blur",()=>{k(l.screen,"blur",{timestamp:Date.now()})});window.addEventListener("focus",()=>{k(l.screen,"focus",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{Re(),await Be(),A(),je()});function je(){const a=document.getElementById("pauseBtn");a==null||a.addEventListener("click",Q);const o=document.getElementById("exitBtn");o==null||o.addEventListener("click",()=>{confirm("Are you sure you wish to exit the volunteer assessment? You can return at any time.")&&(k(l.screen,"candidate_exited"),P(),window.location.href="index.html")})}function Q(){l.isPaused?(l.isPaused=!1,k(l.screen,"resume"),l.screen=l.pausedPreviousScreen||"sjt",A()):(l.isPaused=!0,l.pausedPreviousScreen=l.screen,k(l.screen,"pause"),l.screen="paused",A())}function A(){const a=document.getElementById("recruitApp"),o=document.getElementById("sessionHeaderControls"),i=document.getElementById("topProgressBar"),n=document.getElementById("progressBarFill");switch(l.screen!=="consent"&&l.screen!=="complete"&&l.screen!=="paused"?(o==null||o.classList.remove("hidden"),i==null||i.classList.remove("hidden")):(o==null||o.classList.add("hidden"),i==null||i.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),l.screen){case"consent":Oe(a);break;case"identity":Fe(a);break;case"accessibility":Ne(a);break;case"warmup":De(a);break;case"sjt_briefing":He(a);break;case"sjt":X(a,n);break;case"gba_briefing":We(a);break;case"games":ee(a,n);break;case"paused":qe(a);break;case"complete":Ge(a);break}}function Oe(a){var t;a.innerHTML=`
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
 `;const o=document.getElementById("ageConfirm"),i=document.getElementById("consentAgree"),n=document.querySelector('#consentForm button[type="submit"]'),e=()=>{const r=!!(o!=null&&o.checked&&(i!=null&&i.checked));n==null||n.setAttribute("aria-disabled",String(!r)),n==null||n.classList.toggle("opacity-40",!r)};o==null||o.addEventListener("change",e),i==null||i.addEventListener("change",e),e(),(t=document.getElementById("consentForm"))==null||t.addEventListener("submit",async r=>{r.preventDefault();const s=r.target.querySelector('button[type="submit"]');if((s==null?void 0:s.getAttribute("aria-disabled"))==="true")return;const p=s?s.innerHTML:"Enter the Studio &rarr;";s&&(s.setAttribute("aria-disabled","true"),s.innerHTML="Preparing Workspace...");try{const b=i.checked,d=await B("/recruit/consent",{method:"POST",body:JSON.stringify({choices:{research_telemetry:b}})});if(!d.ok)throw new Error(`Network error: ${d.status}`);const c=await d.json();l.sessionId=c.session_id,l.configHash=c.config_hash||null,l.worldSequence=c.world_sequence||[],l.seeds=c.seeds||{},w({immediate:!0}),P(),l.screen="identity",A()}catch(b){alert(`Unable to initialize session: ${b.message||"Please check connection."}`),console.error(b),s&&(s.innerHTML=p,s.setAttribute("aria-disabled","false"))}})}function Fe(a){var o;a.innerHTML=`
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
 <div class="pt-4 flex justify-end">
 <button type="submit" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] ">
 Begin Session &rarr;
 </button>
 </div>
 </form>
 </div>
 `,(o=document.getElementById("identityForm"))==null||o.addEventListener("submit",async i=>{i.preventDefault();const n=i.target.querySelector('button[type="submit"]'),e=n?n.innerHTML:"Begin Session &rarr;";n&&(n.disabled=!0,n.innerHTML="Connecting...");try{const t=await B("/recruit/identity",{method:"POST",body:JSON.stringify({session_id:l.sessionId,full_name:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim()})});if(!t||!t.ok){const r=t?await t.json().catch(()=>({})):{};throw new Error(r.detail||(t?`Server returned ${t.status}`:"No response from server"))}l.screen="accessibility",k("identity","identity_submitted"),w({immediate:!0}),A()}catch(t){alert(`Unable to continue: ${t.message||"Please check connection."}`),n&&(n.disabled=!1,n.innerHTML=e)}})}function J(a=[]){if(typeof document>"u"||!document.documentElement)return;const o=document.documentElement;o.classList.toggle("a11y-high-contrast",a.includes("high_contrast")),o.classList.toggle("a11y-dyslexia-font",a.includes("dyslexia_font")),o.classList.toggle("a11y-reduced-motion",a.includes("reduced_motion"))}function Ne(a){var i;const o=l.accessibilityModes||[];a.innerHTML=`
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
 <input type="checkbox" id="a11y_contrast" class="mt-1 accent-[#bd6f5d]" ${o.includes("high_contrast")?"checked":""}>
 <div>
 <div class="text-sm font-medium text-[var(--text-primary)]">High Contrast Display</div>
 <div class="text-xs text-black mt-0.5">Increases text contrast, element borders, and background separation for clearer visibility.</div>
 </div>
 </label>
 <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
 <input type="checkbox" id="a11y_dyslexia" class="mt-1 accent-[#bd6f5d]" ${o.includes("dyslexia_font")?"checked":""}>
 <div>
 <div class="text-sm font-medium text-[var(--text-primary)]">Dyslexia-Friendly Typography</div>
 <div class="text-xs text-black mt-0.5">Applies a high-legibility sans-serif typeface with enhanced letter and line spacing.</div>
 </div>
 </label>
 <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
 <input type="checkbox" id="a11y_motion" class="mt-1 accent-[#bd6f5d]" ${o.includes("reduced_motion")?"checked":""}>
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
 `,(i=document.getElementById("saveA11yBtn"))==null||i.addEventListener("click",async n=>{var r,s,p;const e=n.currentTarget;if(e.disabled)return;e.disabled=!0,e.textContent="Saving...";const t=[];(r=document.getElementById("a11y_contrast"))!=null&&r.checked&&t.push("high_contrast"),(s=document.getElementById("a11y_dyslexia"))!=null&&s.checked&&t.push("dyslexia_font"),(p=document.getElementById("a11y_motion"))!=null&&p.checked&&t.push("reduced_motion"),l.accessibilityModes=t,J(t);try{await B("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:l.sessionId,modes_enabled:t})})}catch(b){console.warn("Accessibility preferences save error:",b)}l.screen="warmup",k("accessibility","preferences_saved",{modes:t}),w({immediate:!0}),A()})}function De(a){let o=[],i=performance.now();a.innerHTML=`
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
 `;const n=document.getElementById("tapTarget"),e=document.getElementById("warmupStatus");n==null||n.addEventListener("click",async()=>{o.push(performance.now());const t=o.length;if(n.textContent=`Tap (${t}/3)`,e.textContent=`Recorded tap ${t} of 3`,t>=3){n.setAttribute("disabled","true"),n.classList.add("opacity-50");const r=[o[1]-o[0],o[2]-o[1]],s=(r[0]+r[1])/2,p=performance.now()-i;try{await B("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:l.sessionId,tap_latency_baseline_ms:s,reading_dwell_baseline_ms:p,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(d){console.warn("Warmup save error:",d)}k("warmup","warmup_completed",{avgLatency:s,readingDwell:p});async function b(){var d;a.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="waiting-spinner"></div>
 <h2 class="text-xl text-[var(--text-primary)]">Loading Scenarios...</h2>
 <p class="text-xs text-black max-w-sm mx-auto leading-relaxed">
 Connecting to the assessment server. This may take a few moments if starting from cold.
 </p>
 </div>
 `;try{const c=await B("/recruit/sjt/public");if(!c||!c.ok)throw new Error(c?`Server returned HTTP ${c.status}`:"Network timeout");const u=await c.json();l.sjtScenarios=u.scenarios||[],l.currentSjtIndex=0,l.screen="sjt_briefing",w({immediate:!0}),A()}catch(c){console.warn("Failed to load SJT payload:",c),a.innerHTML=`
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
 `,(d=document.getElementById("retrySjtLoadBtn"))==null||d.addEventListener("click",()=>{b()})}}b()}})}function He(a){var n;const o=document.getElementById("segmentProgress");o&&(o.innerHTML="<span>Section 1 &middot; Overview</span>");const i=document.getElementById("progressBarFill");i&&(i.style.width="0%"),a.innerHTML=`
 <div class="max-w-2xl mx-auto py-4 sm:py-6 space-y-6">
 <!-- Header: English Left, Urdu Right -->
 <div class="flex justify-between items-start pb-4 border-b border-[var(--grid-border)]">
 <div>
 <span class="act-badge">Section 1 &middot; Overview</span>
 <h1 class="text-2xl sm:text-3xl font-serif text-[var(--text-primary)]">Situational Scenarios</h1>
 </div>
 <div class="text-right shrink-0">
 <span class="font-serif text-2xl sm:text-3xl text-[var(--text-secondary)] block" style="font-family: var(--font-urdu); direction: rtl;">تفہیم و ارادہ</span>
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
 `,k("sjt_briefing","briefing_viewed"),(n=document.getElementById("startSjtBtn"))==null||n.addEventListener("click",()=>{l.screen="sjt",w({immediate:!0}),A()})}let $=null;function Y(a,o,i){if(l.sjtResponses[a.id]===o)return;l.sjtResponses[a.id]=o,k("sjt",i==="keyboard"?"option_selected_key":"option_selected",{scenario_id:a.id,option_id:o}),document.querySelectorAll(".option-card").forEach(t=>{t.getAttribute("data-opt-id")===o?(t.classList.add("selected"),t.setAttribute("aria-pressed","true"),t.focus()):(t.classList.remove("selected"),t.setAttribute("aria-pressed","false"))});const e=document.getElementById("nextSjtBtn");e&&(e.disabled=!1),w()}function X(a,o){var p;const i=l.sjtScenarios[l.currentSjtIndex];if(!i){Z();return}const n=l.sjtScenarios.length,e=l.currentSjtIndex+1;o&&(o.style.width=`${(e-1)/21*100}%`);const t=document.getElementById("segmentProgress");if(t){const b=Math.max(1,Math.round(((n-e+1)*35+448)/60));t.innerHTML=`<span class="text-black hidden sm:inline mr-2 text-[10px] sm:text-xs font-normal">About ${b} mins remaining</span><span>Scenario ${e} / ${n}</span>`}const r=l.sjtResponses[i.id]||null,s=i.options.map(b=>`
 <div class="option-card min-h-[52px] p-4 sm:p-5 rounded-xs border transition-all ${r===b.id?"selected":""}" data-opt-id="${b.id}" tabindex="0" role="button" aria-pressed="${r===b.id?"true":"false"}" aria-label="Option ${b.id.slice(-1)}">
 <span class="w-7 h-7 rounded-xs bg-stone-100 border border-[var(--grid-border)] flex items-center justify-center text-xs font-semibold text-[var(--accent-gold)] shrink-0 mt-0.5">${b.id.slice(-1)}</span>
 <span class="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">${b.text}</span>
 </div>
 `).join("");a.innerHTML=`
 <div class="space-y-5">
 <!-- Top Context: English Title on Top-Left, Urdu on Top-Right -->
 <div class="border-b border-[var(--grid-border)] pb-3 flex justify-between items-start gap-4">
 <div>
 <span class="act-badge">Scenario ${e} of ${n}</span>
 <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${i.act_title_en}</h2>
 </div>
 <div class="text-right shrink-0">
 ${i.act_title_ur?`<span class="font-serif text-2xl sm:text-3xl text-[var(--text-secondary)] block" style="font-family: var(--font-urdu); direction: rtl;">${i.act_title_ur}</span>`:""}
 <span class="text-[10px] sm:text-xs text-[var(--accent-gold)] uppercase tracking-wider block mt-1">Section 1 &middot; ${e} of ${n}</span>
 </div>
 </div>

 <!-- SITUATION: Clean paper card without repetitive labels -->
 <div class="scenario-text text-sm sm:text-base text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 sm:p-6 border border-[var(--grid-border)] rounded-xs">
 ${i.setup}
 </div>

 <!-- OPTIONS -->
 <div class="space-y-3">
 <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-medium">Choose what you would do:</div>
 ${s}
 </div>

 <!-- PRIMARY ACTION -->
 <div class="pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[var(--grid-border)]">
 <span class="text-xs text-[var(--text-secondary)] order-2 sm:order-1 text-[11px]">Tip: Press keys 1 to 4 on your keyboard, or click an option</span>
 <button id="nextSjtBtn" ${r?"":"disabled"} class="w-full sm:w-auto min-h-[44px] px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] shadow-sm rounded-xs order-1 sm:order-2">
 ${e===n?"Complete Section 1 &rarr;":"Next Scenario &rarr;"}
 </button>
 </div>
 </div>
 `,k("sjt","scenario_displayed",{scenario_id:i.id,index:e}),a.querySelectorAll(".option-card").forEach(b=>{b.addEventListener("click",()=>{const d=b.getAttribute("data-opt-id");Y(i,d,"pointer")})}),(p=document.getElementById("nextSjtBtn"))==null||p.addEventListener("click",()=>{l.sjtResponses[i.id]&&(l.currentSjtIndex++,$&&(document.removeEventListener("keydown",$),$=null),X(a,o))}),$&&document.removeEventListener("keydown",$),$=b=>{if(["1","2","3","4"].includes(b.key)){const d=parseInt(b.key)-1;i.options[d]&&Y(i,i.options[d].id,"keyboard")}else if(b.key==="Enter"){const d=document.getElementById("nextSjtBtn");d&&!d.disabled&&d.click()}},document.addEventListener("keydown",$)}let F=!1;async function Z(){if(F)return;F=!0,$&&(document.removeEventListener("keydown",$),$=null);const a=document.getElementById("recruitApp");a&&(a.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="waiting-spinner"></div>
 <h2 class="text-xl text-[var(--text-primary)]">Saving Judgments...</h2>
 <p class="text-xs text-black">Recording your situation judgments to your session profile.</p>
 </div>
 `);try{const o=await B("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:l.sessionId,responses:l.sjtResponses})});if(!o||!o.ok)throw new Error(o?`Server returned HTTP ${o.status}`:"Connection failed");l.screen="gba_briefing",l.currentWorldIndex=0,l.currentMiniGameIndex=0,k("sjt","sjt_complete",{response_count:Object.keys(l.sjtResponses).length}),w({immediate:!0}),A()}catch(o){if(console.warn("SJT submit error:",o),a){a.innerHTML=`
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
 `;const i=document.getElementById("retrySjtSubmitBtn");i&&i.addEventListener("click",()=>{i.disabled=!0,i.textContent="Submitting...",Z()})}}finally{F=!1}}function We(a){var n;const o=document.getElementById("segmentProgress");o&&(o.innerHTML="<span>Section 2 &middot; Overview</span>");const i=document.getElementById("progressBarFill");i&&(i.style.width=`${7/21*100}%`),a.innerHTML=`
 <div class="max-w-2xl mx-auto py-4 sm:py-6 space-y-6">
 <!-- Header: English Left, Urdu Right -->
 <div class="flex justify-between items-start pb-4 border-b border-[var(--grid-border)]">
 <div>
 <span class="act-badge">Section 2 &middot; Overview</span>
 <h1 class="text-2xl sm:text-3xl font-serif text-[var(--text-primary)]">Interactive Studio Activities</h1>
 </div>
 <div class="text-right shrink-0">
 <span class="font-serif text-2xl sm:text-3xl text-[var(--text-secondary)] block" style="font-family: var(--font-urdu); direction: rtl;">عملی مشاغل</span>
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
 `,k("gba_briefing","briefing_viewed"),(n=document.getElementById("startGbaBtn"))==null||n.addEventListener("click",()=>{l.screen="games",w({immediate:!0}),A()})}function ee(a,o){const i=l.worldSequence[l.currentWorldIndex];if(!i||l.currentWorldIndex>=l.worldSequence.length){te();return}l.activeMiniGameInProgress=!0,w({immediate:!0});const n=l.currentWorldIndex*2+l.currentMiniGameIndex+1,e=14,t=document.getElementById("segmentProgress");if(t){const r=e-n+1,s=Math.max(1,Math.round(r*32/60));t.innerHTML=`<span class="text-black hidden sm:inline mr-2 text-[10px] sm:text-xs font-normal">About ${s} min${s>1?"s":""} remaining</span><span>Activities ${n} / ${e}</span>`}if(o){const r=7+(n-1);o.style.width=`${r/21*100}%`}Ie({appContainer:a,worldCode:i,worldIndex:l.currentWorldIndex,miniGameIndex:l.currentMiniGameIndex,seeds:l.seeds,logEvent:(r,s,p,b)=>{const d=H(i,l.currentMiniGameIndex);k("game",r,s,p,b,d)},onMiniGameComplete:r=>{l.activeMiniGameInProgress=!1;const s=H(i,l.currentMiniGameIndex);k("game","minigame_end",r,{},"mouse",s),P(),l.currentMiniGameIndex<1?l.currentMiniGameIndex++:(l.currentMiniGameIndex=0,l.currentWorldIndex++),w({immediate:!0}),ee(a,o)}})}function H(a,o){const i=O&&O[a];if(i&&i[o])return i[o];const n={W1:["F1","F2"],W2:["A1","A2"],W3:["C1","C2"],W4:["E1","E2"],W5:["Q1","Q2"],W6:["CR1","CR3"],W7:["M1","M2"]};return n[a]&&n[a][o]||"MG"}let j=!1;function K(a,o){if(!a)return;a.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[var(--text-primary)] flex items-center justify-center mx-auto text-xl ">!</div>
 <h2 class="text-2xl text-[var(--text-primary)]">Connection Notice</h2>
 <p class="text-xs text-black max-w-md mx-auto leading-relaxed">${o}</p>
 <div class="pt-2">
 <button id="retryFinalizationBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] shadow-sm rounded-xs">Retry Finalization &rarr;</button>
 </div>
 </div>
 `;const i=document.getElementById("retryFinalizationBtn");i&&i.addEventListener("click",()=>{i.disabled=!0,i.textContent="Connecting...",te()})}async function te(){if(j)return;j=!0,l.activeMiniGameInProgress=!1,w({immediate:!0});const a=document.getElementById("recruitApp");a&&(a.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="waiting-spinner"></div>
 <h2 id="finalizingHeading" class="text-2xl text-[var(--text-primary)]">Synchronizing activity...</h2>
 <p id="finalizingSubtext" class="text-xs text-black">Saving your completed activity... Please keep this page open.</p>
 </div>
 `);const o=i=>{["Enter"," ","Spacebar"].includes(i.key)&&i.preventDefault()};window.addEventListener("keydown",o,{capture:!0});try{if(!await Me()){window.removeEventListener("keydown",o,{capture:!0}),j=!1,K(a,"Connection could not be confirmed. Your saved activity has not been discarded. You can retry.");return}const n=document.getElementById("finalizingHeading"),e=document.getElementById("finalizingSubtext");n&&(n.textContent="Finalizing assessment..."),e&&(e.textContent="Saving your completed activity... Please keep this page open.");let t=null;for(let s=0;s<3;s++){try{if(t=await B("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:l.sessionId})}),t&&t.ok)break}catch(p){if(s===2)throw p}await new Promise(p=>setTimeout(p,1e3*(s+1)))}if(!t||!t.ok)throw new Error(t?`Server returned HTTP ${t.status}`:"No response from server");const r=await t.json().catch(()=>({}));if(r.status==="SUCCESS"||r.session_status==="COMPLETE"||r.is_already_completed){window.removeEventListener("keydown",o,{capture:!0}),l.screen="complete",l.telemetryTerminal=!0,l.telemetryQueue=[],L.clear().catch(s=>console.warn(s)),w({immediate:!0}),A();return}throw new Error("Unexpected completion status")}catch(i){window.removeEventListener("keydown",o,{capture:!0}),console.warn("Session complete submission error:",i),K(a,"The final session confirmation was not received. Your saved activity has not been discarded. You can retry.")}finally{window.removeEventListener("keydown",o,{capture:!0}),j=!1}}function qe(a){var o;a.innerHTML=`
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
 `,(o=document.getElementById("resumeBtn"))==null||o.addEventListener("click",Q)}function Ge(a){a.innerHTML=`
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
