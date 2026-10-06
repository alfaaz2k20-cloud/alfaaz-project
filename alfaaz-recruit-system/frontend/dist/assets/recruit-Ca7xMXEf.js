import"./global-BiS7FSLa.js";function ee(s,u){const{appContainer:i,miniGameIndex:b,gameId:e,logEvent:t,onMiniGameComplete:a,worldIndex:r}=s,m=e||(b===0?"A1":b===1?"A2":"A3");m==="A1"?te(i,u,t,a,r):m==="A2"?ie(i,u,t,a,r):ae(i,u,t,a)}function te(s,u,i,b,e=1){let t=0,a=!1,r=null,m="mouse";const x=[{id:"DOC_01",title:"Old Calligraphy Book (1842)",rule_prompt:"Sorting Rule: Sort by Century",tags:["Year: 1842","19th Century","Handmade Paper","Poem Verse"]},{id:"DOC_02",title:"Poetry Song Book",rule_prompt:"Sorting Rule: Sort by Type",tags:["Type: Poetry","Song Verses","Urdu","Paper Pages"]},{id:"DOC_03",title:"Exhibition Visitor Book (1924)",rule_prompt:"Sorting Rule: Sort by Century",tags:["Year: 1924","20th Century","Visitor List","Signatures"]},{id:"DOC_04",title:"Lal Ded Verses in Kashmiri",rule_prompt:"Sorting Rule: Sort by Language",tags:["Language: Kashmiri","Wise Verses","Local Poetry"]}],n=[{id:"19th_century",label:"19th Century Shelf",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},{id:"20th_century",label:"20th Century Shelf",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{id:"poetry",label:"Poetry Shelf",icon:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"},{id:"chronicle",label:"History Shelf",icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},{id:"kashmiri",label:"Kashmiri Language Shelf",icon:"M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"}];function d(){var f,h;if(t>=x.length){b({mini_game:"A1",observations_count:x.length});return}const l=x[t];performance.now();const c=`
 <div class="p-5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="flex justify-between items-start mb-2">
 <span class="text-sm tracking-widest text-[var(--accent-gold)] uppercase font-semibold">Folio ${t+1} of ${x.length}</span>
 <button id="guideBtn" type="button" class="text-base text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-2.5 py-1 interactive-option flex items-center gap-1.5 rounded-xs min-h-[32px]" tabindex="0">
 <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
 ${a?"Close Guide":"Shelf Guide"}
 </button>
 </div>

 <div id="guideModal" class="${a?"":"hidden"} p-3 mb-3 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-base text-[var(--text-primary)] space-y-1 rounded-xs">
 <div>&bull; <strong>Century Rule:</strong> Sort by century made (19th vs 20th Century).</div>
 <div>&bull; <strong>Type Rule:</strong> Sort by content type (Poetry vs History).</div>
 <div>&bull; <strong>Language Rule:</strong> Sort by language (Kashmiri).</div>
 </div>

 <h3 class="text-base sm:text-lg text-[var(--text-primary)] font-medium mt-1 mb-2.5">${l.title}</h3>
 <div class="flex flex-wrap gap-2">
 ${l.tags.map(_=>`<span class="px-2.5 py-1 bg-[#faf8f5] border border-[var(--grid-border)] text-base text-black rounded-xs">${_}</span>`).join("")}
 </div>
 </div>
 `,p=n.find(_=>_.id===r),g=`
 <div>
 <div class="text-base uppercase tracking-wider text-black mb-2 ">Select Destination Shelf:</div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
 ${n.map(_=>{const y=r===_.id;return`
 <button type="button" class="folder-btn p-3.5 bg-white border ${y?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} text-base font-semibold interactive-option text-left flex items-center justify-between rounded-xs min-h-[48px]" data-folder="${_.id}" tabindex="0">
 <span class="flex items-center gap-2.5">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${y?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${y?"✓":""}</span>
 <span class="text-[var(--text-primary)]">${_.label}</span>
 </span>
 <svg class="w-4 h-4 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${_.icon}"></path></svg>
 </button>
 `}).join("")}
 </div>
 </div>
 `,v=`
 <span>${r?`Selected shelf: <strong class="text-[var(--text-primary)]">${p==null?void 0:p.label}</strong>`:"Select a shelf above, then click Confirm."}</span>
 <span class="text-sm text-black ">${t+1} / ${x.length}</span>
 `;s.innerHTML=T({worldCode:"W2",worldIndex:e,title:"The Manuscript Folios",subtitle:"Sort each historical page onto its proper shelf.",instruction:"Examine this page. Pick the shelf that matches the active sorting rule.",instructionPrompt:l.rule_prompt,stimulusContent:c,interactionContent:g,summaryContent:v,actionButtonId:"confirmShelfBtn",actionButtonText:t<x.length-1?"Confirm Shelf &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!r,progressText:`Page ${t+1} of ${x.length}`}),i("item_presented",{trial_index:t,stimulus_id:l.id,task_def_version:"1.0"}),(f=document.getElementById("guideBtn"))==null||f.addEventListener("click",()=>{a=!a,d(),i("guide_viewed",{trial_index:t,stimulus_id:l.id,task_def_version:"1.0"})}),s.querySelectorAll(".folder-btn").forEach(_=>{const y=E=>{m=E,r=_.getAttribute("data-folder"),d()};_.addEventListener("click",()=>y("mouse")),_.addEventListener("keydown",E=>{(E.key==="Enter"||E.key===" ")&&(E.preventDefault(),y("keyboard"))})}),(h=document.getElementById("confirmShelfBtn"))==null||h.addEventListener("click",()=>{r&&(i("item_sorted",{trial_index:t,stimulus_id:l.id,choice:r,input_modality:m,task_def_version:"1.0"}),t++,r=null,d())})}d()}function ie(s,u,i,b,e=1){let t=0,a=null,r="mouse";const m=[{stimulus_id:"EXC_01",title:"Kashmiri Poetry Page with Water Wear",anomaly_description:'Water fading on lower margin. The accession year stamp is blurred and appears as "18--".',type_note:"Physical Damage & Blurred Year"},{stimulus_id:"EXC_02",title:"Clean Persian Calligraphy Page (1890)",anomaly_description:"Intact rag fiber paper, clear black ink, and standard accession stamp intact. No physical blemishes.",type_note:"Standard Page Inspection"},{stimulus_id:"EXC_03",title:"Loose Book Page with Number Jump",anomaly_description:"Binding threads severed. Margin numbering skips from Folio 14 directly to Folio 19 with missing text catchword.",type_note:"Missing Pages & Loose Thread"},{stimulus_id:"EXC_04",title:"Illustrated Story Page with Split Binding",anomaly_description:"Double folio split across signature gutter with inverted seal impressions and mismatched accession notation.",type_note:"Broken Spine & Upside-Down Seal"}],x=[{id:"flag_exception",title:"Flag for Special Repair",desc:"Place page in a protective sleeve for careful repair by a conservator.",tag:"Special Repair"},{id:"file_standard",title:"Place on Regular Shelf",desc:"Place page directly onto the standard open shelves.",tag:"Regular Shelf"},{id:"defer_review",title:"Hold in Storage Box",desc:"Hold page safely in storage until more background notes arrive.",tag:"Hold in Box"}];function n(){const d=m[t],l=x.find(f=>f.id===a),c=`
 <div class="p-5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="flex items-center justify-between mb-2">
 <span class="text-sm tracking-widest text-[var(--text-primary)] uppercase font-semibold">Manuscript Folio ${t+1} of 4</span>
 <span class="text-sm text-black uppercase bg-[#faf8f5] px-2 py-0.5 border border-[var(--grid-border)] rounded-xs font-medium">${d.type_note}</span>
 </div>
 <h3 class="text-base text-[var(--text-primary)] font-medium mb-1.5">${d.title}</h3>
 <p class="text-base text-black leading-relaxed bg-[#faf8f5] p-3 border border-[var(--grid-border)]/60 rounded-xs">
 ${d.anomaly_description}
 </p>
 </div>
 `,p=`
 <div class="space-y-2.5">
 <div class="text-base uppercase tracking-wider text-black mb-1 ">Choose handling action:</div>
 ${x.map(f=>`
 <div class="a2-opt p-3.5 bg-white border ${a===f.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} cursor-pointer interactive-option rounded-xs min-h-[52px]" data-action="${f.id}" tabindex="0" role="button">
 <div class="flex justify-between items-center mb-0.5">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${a===f.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${f.title}
 </div>
 </div>
 <div class="text-[11px] text-black leading-relaxed pl-3.5">${f.desc}</div>
 </div>
 `).join("")}
 </div>
 `,g=`
 <span>${a?`You selected: <strong class="text-[var(--text-primary)]">${l==null?void 0:l.title}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">${t+1} / 4</span>
 `;s.innerHTML=T({worldCode:"W2",worldIndex:e,title:"The Fragile Leaf",subtitle:"Examine page condition and choose a handling step.",instruction:"Read the page condition notes below. Choose the best handling option.",stimulusContent:c,interactionContent:p,summaryContent:g,actionButtonId:"a2ConfirmBtn",actionButtonText:t<3?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!a,progressText:`Folio ${t+1} of 4`}),i("item_presented",{trial_index:t,stimulus_id:d.stimulus_id,task_def_version:"1.0"});const v=document.getElementById("a2ConfirmBtn");s.querySelectorAll(".a2-opt").forEach(f=>{const h=_=>{r=_,a=f.getAttribute("data-action"),n()};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),h("keyboard"))})}),v==null||v.addEventListener("click",()=>{i("decision_logged",{trial_index:t,stimulus_id:d.stimulus_id,action_id:a,input_modality:r,task_def_version:"1.0"}),t<3?(t++,a=null,n()):b({mini_game:"A2",observations_count:4})})}n()}function ae(s,u,i,b){let e=new Set,t=new Set,a="mouse";const r=[{id:"REC_01",title:"Card 1: Habba Khatoon Poem",text:"Poet: Habba Khatoon | Era: 16th Century | Birthplace: Chandhara (Recorded as: Chanhadra)",note:"Folio Label Verification"},{id:"REC_02",title:"Card 2: Carved Walnut Pen Box",text:"Artifact: Carved Walnut Calligraphy Pen Box | Dimensions: 24 cm x 6 cm | Medium: Seasoned Walnut",note:"Object Metadata Verification"},{id:"REC_03",title:"Card 3: River Verse Excerpt",text:`Verse Excerpt: "The river remembers the boatman's song" | Translator: [Not Specified / Blank]`,note:"Folio Label Verification"},{id:"REC_04",title:"Card 4: Kashmiri Vakh Lyric Leaf",text:"Folio Leaf: Kashmiri Vakh Lyric Leaf | Script: Sharda & Persian | Accession: AR-1892",note:"Manuscript Leaf Verification"},{id:"REC_05",title:"Card 5: Exhibition Opening Notice",text:"Exhibition Opening Reception: February 31st, 2026 | Location: Main Pavilion",note:"Public Schedule Verification"}];function m(){var x;s.innerHTML=`
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
 ${r.map((n,d)=>{const l=e.has(n.id);return`
 <div class="record-card p-4 bg-white border ${l?"border-[var(--text-primary)] bg-amber-50/20":"border-[var(--grid-border)]"} rounded-xs interactive-option shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" data-id="${n.id}" tabindex="0">
 <div class="space-y-1 flex-1">
 <div class="flex items-center gap-2">
 <span class="text-sm text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Ledger Card ${d+1} of 5</span>
 </div>
 <div class="text-base font-semibold text-[var(--text-primary)]">${n.title}</div>
 <div class="text-base text-black leading-relaxed bg-[#faf8f5] p-2.5 border border-[var(--grid-border)]/60 rounded-xs mt-1">
 ${n.text}
 </div>
 </div>

 <button type="button" class="toggle-flag-btn px-4 py-2.5 border text-base uppercase tracking-wider shrink-0 interactive-option rounded-xs min-h-[44px] w-full sm:w-auto ${l?"bg-[var(--text-primary)] text-white border-[var(--text-primary)]":"bg-white text-black border-[var(--grid-border)] "}" data-id="${n.id}">
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
 `,s.querySelectorAll(".record-card").forEach((n,d)=>{const l=n.getAttribute("data-id"),c=()=>{t.has(l)||(t.add(l),i("record_inspected",{trial_index:d,stimulus_id:l,task_def_version:"1.0"}))};n.addEventListener("focus",c),n.addEventListener("mouseenter",c)}),s.querySelectorAll(".toggle-flag-btn").forEach((n,d)=>{const l=n.getAttribute("data-id"),c=p=>{a=p;const g=!e.has(l);g?e.add(l):e.delete(l),i("discrepancy_toggled",{trial_index:d,stimulus_id:l,flagged_state:g,input_modality:a,task_def_version:"1.0"}),m()};n.addEventListener("click",()=>c("mouse")),n.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),c("keyboard"))})}),(x=document.getElementById("a3SubmitBtn"))==null||x.addEventListener("click",()=>{i("verification_finalized",{action_id:"approve_ledger",input_modality:a,task_def_version:"1.0"}),b({mini_game:"A3",observations_count:r.length})})}m()}function re(s,u){const{appContainer:i,miniGameIndex:b,gameId:e,logEvent:t,onMiniGameComplete:a}=s,r=e||(b===0?"F1":b===1?"F2":"F3");r==="F1"?se(i,u,t,a):r==="F2"?ne(i,u,t,a):oe(i,u,t,a)}function se(s,u,i,b){let e=0,t=50,a="accommodate",r="mouse",m=null;const x=[{stimulus_id:"F1_T1",title:"Sound Note: Sharp Echo",cue_text:'"Front row sound has sharp treble and heavy wall echo."',default_action:"accommodate"},{stimulus_id:"F1_T2",title:"Sound Note: Clear Hall",cue_text:'"Center hall sound is clear, balanced, and easy to hear."',default_action:"maintain_objective"},{stimulus_id:"F1_T3",title:"Sound Note: Quiet Whisper",cue_text:'"The speaker is reciting a whisper. Words are hard to hear."',default_action:"accommodate"},{stimulus_id:"F1_T4",title:"Sound Note: Sudden Silence",cue_text:'"A sudden quiet pause. Could be a dramatic silence or equipment issue."',default_action:"clarify"},{stimulus_id:"F1_T5",title:"Sound Note: Group Singing",cue_text:'"Group singing is steady and balanced across the entire room."',default_action:"maintain_objective"}];function n(){var D;m&&(cancelAnimationFrame(m),m=null);const d=x[e];s.innerHTML=T({worldCode:"W1",worldIndex:0,title:"Tuning the Hall",subtitle:"Adjust the hall sound to support the poetry reading.",instructionPrompt:"Your Task",instruction:"Read the sound note below. Pick your response and move the slider.",stimulusContent:`
 <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center text-sm font-semibold shrink-0">
 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
 </div>
 <div>
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${d.title}</div>
 <div id="partnerSpeech" class="text-base text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${d.cue_text}</div>
 </div>
 </div>
 </div>
 `,interactionContent:`
 <div class="space-y-4">
 <div>
 <div class="text-base uppercase tracking-wider text-black mb-2 ">1. Choose your response:</div>
 <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${a==="accommodate"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"}" data-action="accommodate">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${a==="accommodate"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 Adjust Sound
 </div>
 <div class="text-[11px] text-black mt-1 leading-relaxed">Change the sound setting to help the speaker.</div>
 </button>
 <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${a==="maintain_objective"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"}" data-action="maintain_objective">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${a==="maintain_objective"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 Keep Baseline
 </div>
 <div class="text-[11px] text-black mt-1 leading-relaxed">Leave the current sound setting as it is.</div>
 </button>
 <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${a==="clarify"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"}" data-action="clarify">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${a==="clarify"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
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
 <span>Your setting: <strong class="text-[var(--text-primary)]" id="choiceSummary">${a==="accommodate"?"Adjust Sound":a==="maintain_objective"?"Keep Baseline":"Check Channel"} (Level: ${t})</strong></span>
 <span class="text-sm text-black ">${e+1} / 6</span>
 `,actionButtonId:"lockFreqBtn",actionButtonText:e<5?"Confirm Setting &rarr;":"Confirm & Finish &rarr;",progressText:`Sound Note ${e+1} of 6`});const l=document.getElementById("waveCanvas"),c=l==null?void 0:l.getContext("2d"),p=document.getElementById("freqSlider"),g=document.getElementById("sliderValDisplay"),v=document.getElementById("choiceSummary");let f=0;function h(){if(!c||!l)return;c.clearRect(0,0,l.width,l.height),c.strokeStyle="#f0eeea",c.lineWidth=1;for(let S=0;S<l.width;S+=30)c.beginPath(),c.moveTo(S,0),c.lineTo(S,l.height),c.stroke();c.strokeStyle="#bd6f5d",c.lineWidth=2.5,c.beginPath();const C=.015+t/100*.05,$=14+Math.abs(t-50)/50*16;for(let S=0;S<l.width;S++){const A=l.height/2+Math.sin(S*C+f)*$;S===0?c.moveTo(S,A):c.lineTo(S,A)}c.stroke(),f+=.04,m=requestAnimationFrame(h)}h(),s.querySelectorAll(".f1-action-btn").forEach(C=>{C.addEventListener("click",()=>{var $,S;if(r="mouse",a=C.getAttribute("data-action"),s.querySelectorAll(".f1-action-btn").forEach(A=>{var W,q;A.classList.remove("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),A.classList.add("border-[var(--grid-border)]","bg-white"),(W=A.querySelector("span.rounded-full"))==null||W.classList.remove("bg-[var(--accent-gold)]"),(q=A.querySelector("span.rounded-full"))==null||q.classList.add("bg-stone-300")}),C.classList.add("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),C.classList.remove("border-[var(--grid-border)]","bg-white"),($=C.querySelector("span.rounded-full"))==null||$.classList.add("bg-[var(--accent-gold)]"),(S=C.querySelector("span.rounded-full"))==null||S.classList.remove("bg-stone-300"),v){const A=a==="accommodate"?"Adjust Sound":a==="maintain_objective"?"Keep Baseline":"Check Channel";v.textContent=`${A} (Level: ${t})`}})});let _=0,y=null;const E=(C,$)=>{i("slider_input",{trial_index:e,stimulus_id:d.stimulus_id,slider_position_raw:C,input_modality:$,task_def_version:"1.0"}),_=Date.now()};p==null||p.addEventListener("input",C=>{if(r=C.pointerType||"mouse",t=parseInt(C.target.value,10),g&&(g.textContent=t),v){const S=a==="accommodate"?"Adjust Sound":a==="maintain_objective"?"Keep Baseline":"Check Channel";v.textContent=`${S} (Level: ${t})`}const $=Date.now();$-_>=100?(y&&(clearTimeout(y),y=null),E(t,r)):y||(y=setTimeout(()=>{E(t,r),y=null},100-($-_)))}),p==null||p.addEventListener("change",()=>{y&&(clearTimeout(y),y=null),E(t,r)}),p==null||p.addEventListener("keydown",C=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(C.key)&&(r="keyboard")}),(D=document.getElementById("lockFreqBtn"))==null||D.addEventListener("click",()=>{y&&(clearTimeout(y),y=null),m&&(cancelAnimationFrame(m),m=null),i("trial_submit",{trial_index:e,stimulus_id:d.stimulus_id,action_id:a,slider_position_raw:t,input_modality:r,task_def_version:"1.0"}),e<5?(e++,t=50,a=x[e].default_action,n()):b({mini_game:"F1",observations_count:6})})}n()}function ne(s,u,i,b){let e=0,t=null,a="mouse";const r=[{stimulus_id:"F2_T1",speaker_role:"Stage Lead",cue_text:'"The poet gestures toward the side speaker, asking for sound help."',condition_label:"Direct Request"},{stimulus_id:"F2_T2",speaker_role:"Hall Helper",cue_text:'"The speaker pauses with an uncertain look. No words are spoken."',condition_label:"Ambiguous Signal"},{stimulus_id:"F2_T3",speaker_role:"Sound Helper",cue_text:'"The performer sings with intense emotion as part of the poem."',condition_label:"Expressive Intensity"}],m=[{id:"act",title:"Act Directly",desc:"Take action right away to help the speaker."},{id:"clarify",title:"Ask for Clarity",desc:"Check with the speaker before making any changes."},{id:"maintain",title:"Keep Course",desc:"Stay on course without stepping in too early."}];function x(){const n=r[e],d=m.find(p=>p.id===t);s.innerHTML=T({worldCode:"W1",worldIndex:0,title:"The Gathering Voices",subtitle:"Coordinate sound with your hall team.",instructionPrompt:"Your Task",instruction:"Read the message from your teammate. Pick the best response below.",stimulusContent:`
 <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center text-sm font-semibold shrink-0">
 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
 </div>
 <div>
 <div class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${n.speaker_role}</div>
 <div class="text-base text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${n.cue_text}</div>
 </div>
 </div>
 </div>
 `,interactionContent:`
 <div>
 <div class="text-base uppercase tracking-wider text-black mb-2 ">Pick your response:</div>
 <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
 ${m.map(p=>`
 <div class="f2-card p-4 bg-white border ${t===p.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} cursor-pointer interactive-option space-y-1.5 rounded-xs min-h-[56px]" data-action="${p.id}" tabindex="0" role="button">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${t===p.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${p.title}
 </div>
 <div class="text-[11px] text-black leading-relaxed">${p.desc}</div>
 </div>
 `).join("")}
 </div>
 </div>
 `,summaryContent:`
 <span id="f2ChoiceText">${t?`You selected: <strong class="text-[var(--text-primary)]">${d==null?void 0:d.title}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">${e+1} / ${r.length}</span>
 `,actionButtonId:"f2ConfirmBtn",actionButtonText:e<r.length-1?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Message ${e+1} of ${r.length}`});const l=document.getElementById("f2ConfirmBtn"),c=document.getElementById("f2ChoiceText");s.querySelectorAll(".f2-card").forEach(p=>{const g=v=>{var f,h;if(a=v,t=p.getAttribute("data-action"),s.querySelectorAll(".f2-card").forEach(_=>{var y,E;_.classList.remove("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),_.classList.add("border-[var(--grid-border)]"),(y=_.querySelector("span.rounded-full"))==null||y.classList.remove("bg-[var(--accent-gold)]"),(E=_.querySelector("span.rounded-full"))==null||E.classList.add("bg-stone-300")}),p.classList.add("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),p.classList.remove("border-[var(--grid-border)]"),(f=p.querySelector("span.rounded-full"))==null||f.classList.add("bg-[var(--accent-gold)]"),(h=p.querySelector("span.rounded-full"))==null||h.classList.remove("bg-stone-300"),l&&(l.disabled=!1),c){const _=m.find(y=>y.id===t);c.innerHTML=`You selected: <strong class="text-[var(--text-primary)]">${_==null?void 0:_.title}</strong>`}};p.addEventListener("click",()=>g("mouse")),p.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g("keyboard"))})}),l==null||l.addEventListener("click",()=>{i("trial_submit",{trial_index:e,stimulus_id:n.stimulus_id,action_id:t,input_modality:a,task_def_version:"1.0"}),e<r.length-1?(e++,t=null,x()):b({mini_game:"F2",observations_count:r.length})})}x()}function oe(s,u,i,b){let e=0,t="baseline",a=null,r=null,m="mouse";const x=[{stimulus_id:"F3_T1",cue_id:"cue_expressive_crescendo",title:"Round 1: Rising Voice Line",cue_text:'"The poet begins a rising, powerful verse."',baseline_context:"Small Practice Room — Sound dies down quickly with no echo.",baseline_options:[{id:"support_volume",label:"Support Volume",desc:"Lift volume so sound carries across the room."},{id:"dampen_level",label:"Lower Level",desc:"Turn volume down before the loud peak."},{id:"neutral_hold",label:"Keep Steady",desc:"Keep room settings steady without changes."}],shifted_context:"Stone Hall — High stone walls bounce sound and create heavy echo.",shifted_options:[{id:"attenuate_reverb",label:"Lower Echo",desc:"Trim room echo so words stay clear."},{id:"support_volume",label:"Support Volume",desc:"Keep the volume boost from the small room."},{id:"neutral_hold",label:"Keep Steady",desc:"Make no changes for the stone room."}]},{stimulus_id:"F3_T2",cue_id:"cue_sotto_voce_pause",title:"Round 2: Quiet Whisper",cue_text:'"The poet drops into a quiet whisper between lines."',baseline_context:"Quiet Sitting Room — Audience sits close and easily hears every word.",baseline_options:[{id:"preserve_natural_intimacy",label:"Keep Natural Tone",desc:"Keep sound soft and clear without extra volume."},{id:"boost_high_gain",label:"High Boost",desc:"Force the whisper to play at loud volume."},{id:"cut_channel",label:"Mute Feed",desc:"Treat quiet verse as dead sound."}],shifted_context:"Courtyard Gate — Nearby street chatter and fountain water cover soft voices.",shifted_options:[{id:"boost_intelligibility",label:"Boost Voice",desc:"Lift the voice so outdoor chatter does not hide it."},{id:"preserve_natural_intimacy",label:"Keep Natural Tone",desc:"Leave voice unboosted so whisper is hard to hear."},{id:"cut_channel",label:"Mute Feed",desc:"Treat quiet sound as an equipment issue."}]},{stimulus_id:"F3_T3",cue_id:"cue_rhythmic_syncopation",title:"Round 3: Pause Before Verse",cue_text:'"The poet pauses suddenly before the final line."',baseline_context:"Solo Recital — A single speaker recites at a steady, driving pace.",baseline_options:[{id:"sustain_cadence",label:"Keep Pace",desc:"Keep the steady beat moving through the pause."},{id:"halt_accompaniment",label:"Stop Sound",desc:"Stop all instruments abruptly on the pause."},{id:"force_metronome",label:"Speed Up",desc:"Push the recital forward past the pause."}],shifted_context:"Group Singing — A chorus enters during the pause to sing an answer line.",shifted_options:[{id:"open_reciprocal_space",label:"Make Space",desc:"Pause instruments to let the chorus answer clearly."},{id:"sustain_cadence",label:"Keep Pace",desc:"Play straight through without waiting for the chorus."},{id:"force_metronome",label:"Speed Up",desc:"Rush the group tempo forward."}]}];function n(){var c,p;const l=x[e];if(t==="baseline"){const g=l.baseline_options.find(v=>v.id===a);s.innerHTML=`
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
 ${l.baseline_options.map(v=>`
 <div class="f3-opt p-3.5 bg-white border ${a===v.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer interactive-option rounded-xs min-h-[50px]" data-choice="${v.id}" tabindex="0" role="button">
 <div class="text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
 <span class="w-2 h-2 rounded-full ${a===v.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
 ${v.label}
 </div>
 <div class="text-[11px] text-black mt-0.5 leading-relaxed">${v.desc}</div>
 </div>
 `).join("")}
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>${a?`You selected: <strong class="text-[var(--text-primary)]">${g==null?void 0:g.label}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">Step 1 of 2</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button id="f3BaselineBtn" ${a?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 Confirm and See Room Shift &rarr;
 </button>
 </div>
 </div>
 `,s.querySelectorAll(".f3-opt").forEach(v=>{const f=h=>{m=h,a=v.getAttribute("data-choice"),n()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(c=document.getElementById("f3BaselineBtn"))==null||c.addEventListener("click",()=>{i("baseline_response_selected",{trial_index:e,stimulus_id:l.stimulus_id,cue_id:l.cue_id,choice_id:a,input_modality:m,task_def_version:"1.0"}),t="shifted",i("context_shifted",{trial_index:e,stimulus_id:l.stimulus_id,cue_id:l.cue_id,shifted_context:l.shifted_context,task_def_version:"1.0"}),n()})}else{const g=l.shifted_options.find(v=>v.id===r);s.innerHTML=`
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
 ${l.shifted_options.map(v=>`
 <div class="f3-updated-opt p-3.5 bg-white border ${r===v.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer interactive-option rounded-xs min-h-[50px]" data-choice="${v.id}" tabindex="0" role="button">
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
 <span class="text-sm text-black ">Step 2 of 2</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button id="f3UpdatedBtn" ${r?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 ${e<2?"Save Updated Setting & Next Round &rarr;":"Finish World 1 &rarr;"}
 </button>
 </div>
 </div>
 `,s.querySelectorAll(".f3-updated-opt").forEach(v=>{const f=h=>{m=h,r=v.getAttribute("data-choice"),n()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(p=document.getElementById("f3UpdatedBtn"))==null||p.addEventListener("click",()=>{i("updated_response_selected",{trial_index:e,stimulus_id:l.stimulus_id,cue_id:l.cue_id,choice_id:r,input_modality:m,task_def_version:"1.0"}),i("transition_completed",{trial_index:e,stimulus_id:l.stimulus_id,task_def_version:"1.0"}),e<2?(e++,t="baseline",a=null,r=null,d(),n()):b({mini_game:"F3",observations_count:3})})}}function d(){const l=x[e];i("transition_presented",{trial_index:e,stimulus_id:l.stimulus_id,cue_id:l.cue_id,baseline_context:l.baseline_context,task_def_version:"1.0"})}n()}function de(s,u){const{appContainer:i,miniGameIndex:b,gameId:e,logEvent:t,onMiniGameComplete:a}=s,r=e||(b===0?"C1":b===1?"C2":"C3");r==="C1"?le(i,u,t,a):r==="C2"?ce(i,u,t,a):ue(i,u,t,a)}function le(s,u,i,b){let e=0,t=0,a="mouse";const r=[{stimulus_id:"C1_R1",title:"Round 1: Partner Needs Tiles",description:"Your partner needs 3 more tiles to finish. You have 8 tiles.",partner_initial:2,user_initial:8,default_transfer:0,context_note:"Partner Needs Help"},{stimulus_id:"C1_R2",title:"Round 2: Balanced Baskets",description:"Both you and your partner have 5 tiles. Both have enough to finish.",partner_initial:5,user_initial:5,default_transfer:0,context_note:"Both Have Enough"}];function m(){var c,p,g;const n=r[e],d=n.partner_initial+t,l=n.user_initial-t;s.innerHTML=T({worldCode:"W3",worldIndex:2,title:"The Artisan's Basket",subtitle:"Coordinate ceramic tiles with your workshop partner.",instructionPrompt:"Your Task",instruction:"Check tile counts below. Move tiles to your partner if needed.",stimulusContent:`
 <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs flex items-center justify-between">
 <span class="text-base text-[var(--text-primary)]">
 <strong>${n.title}:</strong> ${n.description}
 </span>
 
 </div>
 `,interactionContent:`
 <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="grid grid-cols-2 gap-4 text-center mb-5">
 <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <span class="text-sm text-[var(--accent-gold)] uppercase font-semibold ">Partner Basket</span>
 <div class="text-xl font-semibold text-[var(--text-primary)] mt-1">${d} Tiles</div>
 <div class="flex justify-center gap-1 mt-2.5 flex-wrap max-w-[140px] mx-auto">
 ${Array(Math.max(0,d)).fill('<div class="w-3.5 h-3.5 bg-[var(--text-primary)]/70 rounded-xs shadow-xs"></div>').join("")}
 </div>
 </div>
 <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
 <span class="text-sm text-[var(--text-primary)] uppercase font-semibold ">Your Basket</span>
 <div class="text-xl font-semibold text-[var(--text-primary)] mt-1">${l} Tiles</div>
 <div class="flex justify-center gap-1 mt-2.5 flex-wrap max-w-[140px] mx-auto">
 ${Array(Math.max(0,l)).fill('<div class="w-3.5 h-3.5 bg-[var(--text-primary)]/70 rounded-xs shadow-xs"></div>').join("")}
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
 <span>Sharing: <strong class="text-[var(--text-primary)]">${t} tiles</strong> (You keep ${l})</span>
 <span class="text-sm text-black ">Round ${e+1} of ${r.length}</span>
 `,actionButtonId:"confirmTransferBtn",actionButtonText:e<r.length-1?"Confirm Allocation &rarr;":"Confirm & Finish &rarr;",progressText:`Round ${e+1} of ${r.length}`}),(c=document.getElementById("minusTileBtn"))==null||c.addEventListener("click",()=>{a="mouse",t>0&&(t--,i("resource_transferred",{trial_index:e,stimulus_id:n.stimulus_id,delta:-1,action_type:"return_to_user",input_modality:a,task_def_version:"1.0"}),m())}),(p=document.getElementById("plusTileBtn"))==null||p.addEventListener("click",()=>{a="mouse",t<n.user_initial&&(t++,i("resource_transferred",{trial_index:e,stimulus_id:n.stimulus_id,delta:1,action_type:"transfer_to_partner",input_modality:a,task_def_version:"1.0"}),m())}),(g=document.getElementById("confirmTransferBtn"))==null||g.addEventListener("click",()=>{i("allocation_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,input_modality:a,task_def_version:"1.0"}),e<r.length-1?(e++,t=0,x(),m()):b({mini_game:"C1",observations_count:r.length})})}function x(){const n=r[e];i("round_presented",{trial_index:e,stimulus_id:n.stimulus_id,input_modality:a,task_def_version:"1.0"})}m()}function ce(s,u,i,b){let e=0,t=null,a="mouse";const r=[{stimulus_id:"C2_R1",title:"Round 1: Open Wall Space",partner_desc:"Partner hung their painting on the top left corner.",slots:[{id:"SLOT_NORTH_RIGHT",label:"Top Right (Even Spacing)"},{id:"SLOT_OVERLAP_LEFT",label:"Next to Partner (Tight Cluster)"},{id:"SLOT_BOTTOM_CENTER",label:"Bottom Center (Center Spot)"}]},{stimulus_id:"C2_R2",title:"Round 2: Keep Hallway Clear",partner_desc:"Partner is framing the center hallway. Keep the doorway path clear.",slots:[{id:"SLOT_PERIMETER_EAST",label:"East Wall (Keeps Path Open)"},{id:"SLOT_CENTER_ADJACENT",label:"Center Slot (Crowds the Hall)"},{id:"SLOT_PERIMETER_WEST",label:"West Wall (Keeps Path Open)"}]}];function m(){var l;const n=r[e],d=n.slots.find(c=>c.id===t);s.innerHTML=T({worldCode:"W3",worldIndex:2,title:"The Gallery Wall",subtitle:"Coordinate artwork placement with your partner.",instructionPrompt:"Your Task",instruction:"Check your partner's position. Choose an open spot that balances the wall.",stimulusContent:`
 <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs flex items-center justify-between">
 <span class="text-base text-[var(--text-primary)]">
 <strong>${n.title}:</strong> ${n.partner_desc}
 </span>
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-medium">Round ${e+1} of ${r.length}</span>
 </div>
 `,interactionContent:`
 <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Available Wall Placement Slots:</div>
 <div class="flex flex-col gap-2.5">
 ${n.slots.map(c=>`
 <button type="button" class="slot-btn px-4 py-3 text-base border rounded-xs ${t===c.id?"border-[var(--accent-gold)] bg-amber-50/70 font-semibold shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"} interactive-option flex items-center justify-between min-h-[48px]" data-slot="${c.id}" tabindex="0">
 <span class="flex items-center gap-2">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===c.id?"bg-[var(--accent-gold)] text-white":"text-black"}">${t===c.id?"✓":""}</span>
 <span class="text-[var(--text-primary)]">${c.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] font-medium uppercase">Slot ${c.id.replace("SLOT_","")}</span>
 </button>
 `).join("")}
 </div>
 </div>
 `,summaryContent:`
 <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${d==null?void 0:d.label}</strong>`:"Select a spot above to continue."}</span>
 <span class="text-sm text-black ">Round ${e+1} of ${r.length}</span>
 `,actionButtonId:"confirmWallBtn",actionButtonText:e<r.length-1?"Confirm Placement &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Round ${e+1} of ${r.length}`}),s.querySelectorAll(".slot-btn").forEach(c=>{const p=g=>{a=g,t=c.getAttribute("data-slot"),i("placement_attempted",{trial_index:e,stimulus_id:n.stimulus_id,slot_id:t,input_modality:a,task_def_version:"1.0"}),m()};c.addEventListener("click",()=>p("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),p("keyboard"))})}),(l=document.getElementById("confirmWallBtn"))==null||l.addEventListener("click",()=>{i("placement_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_slot:t,input_modality:a,task_def_version:"1.0"}),e<r.length-1?(e++,t=null,x(),m()):b({mini_game:"C2",observations_count:r.length})})}function x(){const n=r[e];i("round_presented",{trial_index:e,stimulus_id:n.stimulus_id,task_def_version:"1.0"})}m()}function ue(s,u,i,b){let e=0,t=null,a=null,r="mouse";const m=[{stimulus_id:"C3_R1",title:"Opportunity 1: Partner Lantern is Dark",partner_state:"Your partner's lantern turned dark during setup.",condition_type:"identify_and_repair",fault_options:[{id:"fault_conduit_disconnected",label:"The wire came loose at the connector"},{id:"fault_bulb_broken",label:"The glass bulb is broken"},{id:"fault_switch_off",label:"The main hall switch is off"}],repair_options:[{id:"adjust_conduit",label:"Reconnect the loose wire and tighten the clamp"},{id:"call_help_desk",label:"Call the main help desk"},{id:"replace_lantern",label:"Take down the entire lamp"}],execution_action:"restore_power"},{stimulus_id:"C3_R2",title:"Opportunity 2: Hanging Rope Stuck",partner_state:"The hanging rope got caught in the wheel bracket.",condition_type:"identify_and_repair",fault_options:[{id:"fault_cable_pulley_pinch",label:"Rope is pinched between wheel and metal frame"},{id:"fault_cable_snapped",label:"The rope snapped completely"},{id:"fault_wall_anchor_loose",label:"The wall hook is loose"}],repair_options:[{id:"reseat_pulley_cable",label:"Loosen the lever and place the rope back on the wheel"},{id:"call_facility_maintenance",label:"File a general repair request"},{id:"force_pull_cable",label:"Pull the rope down hard"}],execution_action:"align_panel_height"},{stimulus_id:"C3_R3",title:"Opportunity 3: Shadow Blocks Artwork",partner_state:"A movable wooden screen casts a dark shadow over your partner's painting.",condition_type:"identify_and_repair",fault_options:[{id:"fault_blindspot_obstruction",label:"Wooden screen blocks the spotlight beam"},{id:"fault_color_distortion",label:"The light color looks wrong"}],repair_options:[{id:"shift_lantern",label:"Turn the spotlight slightly to shine around the screen"},{id:"generic_complaint",label:"Submit a general lighting complaint"}],execution_action:"illuminate_path"}];function x(){var c;const d=m[e];d.fault_options.find(p=>p.id===t);const l=d.repair_options.find(p=>p.id===a);s.innerHTML=`
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
 <strong>${d.title}:</strong> ${d.partner_state}
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
 ${d.fault_options.map(p=>`
 <div class="fault-opt p-3 bg-white border ${t===p.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium":"border-[var(--grid-border)] "} rounded-xs cursor-pointer interactive-option text-base flex items-center gap-2 min-h-[44px]" data-fault="${p.id}" tabindex="0" role="button">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${t===p.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===p.id?"✓":""}</span>
 <span class="text-[var(--text-primary)]">${p.label}</span>
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
 ${d.repair_options.map(p=>`
 <div class="repair-opt p-3 bg-white border ${a===p.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium":"border-[var(--grid-border)] "} rounded-xs cursor-pointer interactive-option text-base flex items-center gap-2 min-h-[44px]" data-repair="${p.id}" tabindex="0" role="button">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${a===p.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${a===p.id?"✓":""}</span>
 <span class="text-[var(--text-primary)]">${p.label}</span>
 </div>
 `).join("")}
 </div>
 </div>
 `:""}
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>${t&&a?`Fix selected: <strong class="text-[var(--text-primary)]">${l==null?void 0:l.label}</strong>`:t?"Now choose a fix in Step 2.":"Select an issue in Step 1."}</span>
 <span class="text-sm text-black ">${e+1} / 3</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button type="button" id="executeRepairBtn" ${t&&a?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 ${e<2?"Apply Fix & Next Problem &rarr;":"Finish World 3 &rarr;"}
 </button>
 </div>
 </div>
 `,s.querySelectorAll(".fault-opt").forEach(p=>{const g=v=>{r=v,t=p.getAttribute("data-fault"),i("breakdown_identified",{trial_index:e,stimulus_id:d.stimulus_id,fault_id:t,input_modality:r,task_def_version:"1.0"}),x()};p.addEventListener("click",()=>g("mouse")),p.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g("keyboard"))})}),s.querySelectorAll(".repair-opt").forEach(p=>{const g=v=>{r=v,a=p.getAttribute("data-repair"),i("repair_action_performed",{trial_index:e,stimulus_id:d.stimulus_id,repair_action_id:a,input_modality:r,task_def_version:"1.0"}),x()};p.addEventListener("click",()=>g("mouse")),p.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g("keyboard"))})}),(c=document.getElementById("executeRepairBtn"))==null||c.addEventListener("click",()=>{i("repaired_action_executed",{trial_index:e,stimulus_id:d.stimulus_id,fault_id:t,repair_action_id:a,execution_action_id:d.execution_action,input_modality:r,task_def_version:"1.0"}),e<2?(e++,t=null,a=null,n(),x()):b({mini_game:"C3",observations_count:3})})}function n(){const d=m[e];i("repair_presented",{trial_index:e,stimulus_id:d.stimulus_id,task_def_version:"1.0"})}x()}function me(s,u){const{appContainer:i,miniGameIndex:b,gameId:e,logEvent:t,onMiniGameComplete:a}=s,r=e||(b===0?"E1":b===1?"E2":"E3");r==="E1"?pe(i,u,t,a):r==="E2"?be(i,u,t,a):xe(i,u,t,a)}function pe(s,u,i,b){let e=0,t="mouse",a=null;const r=[{stimulus_id:"E1_T1",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T2",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T3",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T4",color:"Sage",shape:"Square",icon:"&#9632;",label:"Sage Square"},{stimulus_id:"E1_T5",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T6",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T7",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T8",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"}];function m(){var d;const n=r[e];s.innerHTML=T({worldCode:"W4",worldIndex:3,title:"The Ceramic Mosaic",subtitle:"Sort each ceramic tile into the matching container.",instructionPrompt:"Your Task",instruction:"Examine the tile below. Click Container 1 or 2 to file it.",stimulusContent:`
 <div class="p-6 bg-white border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
 <div class="text-5xl mb-2 ${n.color==="Gold"?"text-[var(--accent-gold)]":"text-[var(--text-primary)]"}">
 ${n.icon}
 </div>
 <div class="text-sm font-semibold text-[var(--text-primary)]">${n.label}</div>
 <div class="text-[11px] text-black mt-0.5 uppercase">${n.color} &bull; ${n.shape}</div>
 </div>
 `,interactionContent:`
 <div class="grid grid-cols-2 gap-4">
 <button type="button" class="bin-btn p-5 bg-white border ${a==="container_1"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_1" tabindex="0">
 <span class="text-2xl text-[var(--accent-gold)] block mb-1">&#9679;</span>
 <span class="text-base font-semibold text-[var(--text-primary)] block">Container 1</span>
 <span class="text-sm text-black block mt-0.5 ">Reference: Gold Circle</span>
 </button>
 <button type="button" class="bin-btn p-5 bg-white border ${a==="container_2"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_2" tabindex="0">
 <span class="text-2xl text-[var(--text-primary)] block mb-1">&#9632;</span>
 <span class="text-base font-semibold text-[var(--text-primary)] block">Container 2</span>
 <span class="text-sm text-black block mt-0.5 ">Reference: Sage Square</span>
 </button>
 </div>
 `,summaryContent:`
 <span>${a?`You selected: <strong class="text-[var(--text-primary)]">${a==="container_1"?"Container 1":"Container 2"}</strong>`:"Choose the option to continue."}</span>
 <span class="text-sm text-black ">${e+1} / ${r.length}</span>
 `,actionButtonId:"confirmE1Btn",actionButtonText:e<r.length-1?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!a,progressText:`Tile ${e+1} of ${r.length}`}),s.querySelectorAll(".bin-btn").forEach(l=>{const c=p=>{t=p,a=l.getAttribute("data-choice"),m()};l.addEventListener("click",()=>c("mouse")),l.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),c("keyboard"))})}),(d=document.getElementById("confirmE1Btn"))==null||d.addEventListener("click",()=>{i("tile_sorted",{trial_index:e,stimulus_id:n.stimulus_id,choice:a,input_modality:t,task_def_version:"1.0"}),e<r.length-1?(e++,a=null,performance.now(),x(),m()):b({mini_game:"E1",observations_count:r.length})})}function x(){const n=r[e];i("trial_presented",{trial_index:e,stimulus_id:n.stimulus_id,tile_color:n.color,tile_shape:n.shape,task_def_version:"1.0"})}m()}function be(s,u,i,b){let e=0,t=null,a="mouse";const r=[{stimulus_id:"E2_S1",title:"Sequence 1: Ink Spill on Desk",situation:"A small drop of ink spilled onto your active pattern card.",has_disruption:!0,disruption_type:"ink_spill_masking_workspace",options:[{id:"clear_workspace",label:"Dab ink with a cloth and straighten your card",note:"Calm cleanup"},{id:"rush_uncleaned",label:"Keep placing tiles around the wet ink",note:"Rushed step"},{id:"pause_idle",label:"Step away and wait for help",note:"Long wait"}]},{stimulus_id:"E2_S2",title:"Sequence 2: Calm Studio Work",situation:"The workbench is clean, tidy, and well lit.",has_disruption:!1,disruption_type:"undisrupted_control",options:[{id:"standard_sequence",label:"Continue placing tiles according to plan",note:"Steady step"},{id:"unnecessary_rework",label:"Take tiles apart to re-check for no reason",note:"Unneeded check"},{id:"pause_idle",label:"Stop and wait before continuing",note:"Unneeded pause"}]},{stimulus_id:"E2_S3",title:"Sequence 3: Breeze Blows Paper",situation:"A sudden breeze blew your reference drawing off the table.",has_disruption:!0,disruption_type:"draft_blows_reference_card",options:[{id:"stabilize_reference",label:"Pick up paper and weigh it down with a stone",note:"Fix and secure"},{id:"guess_motif",label:"Place tiles from memory without looking at plan",note:"Guessing"},{id:"pause_idle",label:"Wait for the wind to stop",note:"Waiting"}]}];function m(){var l;const n=r[e],d=n.options.find(c=>c.id===t);s.innerHTML=T({worldCode:"W4",worldIndex:3,title:"The Courtyard Setup",subtitle:"Choose the best response when unexpected studio events happen.",instructionPrompt:"Your Task",instruction:"Read the situation below. Pick the most practical next step.",stimulusContent:`
 <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs flex items-center justify-between">
 <span class="text-base text-[var(--text-primary)]">
 <strong>${n.title}:</strong> ${n.situation}
 </span>
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-medium">Scenario ${e+1} of ${r.length}</span>
 </div>
 `,interactionContent:`
 <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Available Responses:</div>
 <div class="space-y-2.5">
 ${n.options.map(c=>`
 <div class="e2-opt p-3.5 bg-white border ${t===c.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-action="${c.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===c.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${c.label}</span>
 </span>
 
 </div>
 `).join("")}
 </div>
 </div>
 `,summaryContent:`
 <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${d==null?void 0:d.label}</strong>`:"Select an option above to continue."}</span>
 <span class="text-sm text-black ">${e+1} / ${r.length}</span>
 `,actionButtonId:"confirmE2Btn",actionButtonText:e<r.length-1?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Scenario ${e+1} of ${r.length}`}),s.querySelectorAll(".e2-opt").forEach(c=>{const p=g=>{a=g,t=c.getAttribute("data-action"),i("action_selected",{trial_index:e,stimulus_id:n.stimulus_id,action_id:t,input_modality:a,task_def_version:"1.0"}),m()};c.addEventListener("click",()=>p("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),p("keyboard"))})}),(l=document.getElementById("confirmE2Btn"))==null||l.addEventListener("click",()=>{i("sequence_completed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_action:t,input_modality:a,task_def_version:"1.0"}),e<r.length-1?(e++,t=null,x(),m()):b({mini_game:"E2",observations_count:r.length})})}function x(){const n=r[e];i("sequence_presented",{trial_index:e,stimulus_id:n.stimulus_id,has_disruption:n.has_disruption,disruption_type:n.disruption_type,task_def_version:"1.0"})}m()}function xe(s,u,i,b){let e=0,t=null,a="mouse";const r=[{stimulus_id:"E3_C1",title:"Condition 1: Three Colors Available",constraint_state:"standard_three_color_palette",description:"Gold, sage, and terracotta colors are all on the table.",options:[{id:"standard_layout",label:"Three-Color Pattern (Balanced three-color arrangement)"},{id:"tonal_adaptation",label:"Single Color Shades (One shade only)"},{id:"compact_adaptation",label:"Half-Grid Squeeze"}]},{stimulus_id:"E3_C2",title:"Condition 2: Only Indigo Blue Available",constraint_state:"monochrome_indigo_only",description:"Only one blue color is available on the table.",options:[{id:"tonal_adaptation",label:"Light and Dark Shading (Create depth using light and dark tones)"},{id:"standard_layout",label:"Try Three Colors (Cannot be done with one color)"},{id:"compact_adaptation",label:"Small Stamp Layout"}]},{stimulus_id:"E3_C3",title:"Condition 3: Half-Size Wall Space",constraint_state:"boundary_constricted_half_grid",description:"The wall space is cut in half. The artwork must fit smaller dimensions.",options:[{id:"compact_adaptation",label:"Compact Small Design (Scale down pattern to fit half wall)"},{id:"standard_layout",label:"Full Size Layout (Too wide for the small wall)"},{id:"tonal_adaptation",label:"Unscaled Shading Layout"}]}];function m(){var l;const n=r[e],d=n.options.find(c=>c.id===t);s.innerHTML=`
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
 <strong>${n.title}:</strong> ${n.description}
 </span>
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-medium">Layout ${e+1} of ${r.length}</span>
 </div>

 <!-- INTERACTION AREA -->
 <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Layout Options:</div>
 <div class="space-y-2.5">
 ${n.options.map(c=>`
 <div class="e3-opt p-3.5 bg-white border ${t===c.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-layout="${c.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2">
 <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===c.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${c.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Option ${c.id.replace("LAYOUT_","")}</span>
 </div>
 `).join("")}
 </div>
 </div>

 <!-- YOUR CHOICE -->
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-base text-black flex justify-between items-center">
 <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${d==null?void 0:d.label}</strong>`:"Select a layout above to continue."}</span>
 <span class="text-sm text-black ">${e+1} / ${r.length}</span>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end">
 <button type="button" id="confirmE3Btn" ${t?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
 ${e<r.length-1?"Confirm Layout &rarr;":"Finish World 4 &rarr;"}
 </button>
 </div>
 </div>
 `,s.querySelectorAll(".e3-opt").forEach(c=>{const p=g=>{a=g,t=c.getAttribute("data-layout"),i("composition_action_attempted",{trial_index:e,stimulus_id:n.stimulus_id,action_id:t,input_modality:a,task_def_version:"1.0"}),m()};c.addEventListener("click",()=>p("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),p("keyboard"))})}),(l=document.getElementById("confirmE3Btn"))==null||l.addEventListener("click",()=>{i("composition_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_action:t,input_modality:a,task_def_version:"1.0"}),e<r.length-1?(e++,t=null,x(),m()):b({mini_game:"E3",observations_count:3})})}function x(){const n=r[e];i("condition_presented",{trial_index:e,stimulus_id:n.stimulus_id,constraint_state:n.constraint_state,task_def_version:"1.0"})}m()}function ve(s,u){const{appContainer:i,miniGameIndex:b,gameId:e,logEvent:t,onMiniGameComplete:a}=s,r=e||(b===0?"Q1":b===1?"Q2":"Q3");r==="Q1"?ge(i,u,t,a):r==="Q2"?fe(i,u,t,a):he(i,u,t,a)}function ge(s,u,i,b){let e=0,t=null,a={},r="mouse";const m=[{stimulus_id:"Q1_D1",title:"Antique Gold-Leaf Manuscript Leaf",scenario:"Choose the binding method for a fragile 19th-century manuscript page.",options:[{id:"flexible_cord_binding",label:"Sewn Flexible Cord (Allows spine to bend safely)"},{id:"tight_adhesive_clamp",label:"Rigid Glue Clamp (Firm hold on spine)"},{id:"unbound_portfolio",label:"Loose Archival Folder (Kept as separate sheets)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Binding Methods Note",info_value:"high",summary:"Srinagar bookbinders used soft vegetable cord to protect delicate gold borders."},{id:"OPT_CONTROL_1",topic:"Library Stamp Dates",info_value:"low",summary:"City library accession stamps began in late October 1888."}]},{stimulus_id:"Q1_D2",title:"Papier-Mâché Pen Case (Qalamdan)",scenario:"Select a protective surface coating for this painted lacquer case.",options:[{id:"curing_linseed_glaze",label:"Linseed Oil & Amber Varnish (Traditional slow curing glaze)"},{id:"quick_synthetic_seal",label:"Quick Synthetic Clear Spray (Modern fast-drying finish)"},{id:"wax_buff_only",label:"Dry Wax Polish (Gentle surface buffing)"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Papier-Mâché Care Guide",info_value:"high",summary:"Slow drying with natural amber resin keeps natural mineral colors bright."},{id:"OPT_CONTROL_2",topic:"Cabinet Hinge Maintenance",info_value:"low",summary:"Brass display cabinet hinges need oiling twice each year."}]},{stimulus_id:"Q1_D3",title:"Workshop Artisan Register",scenario:"Identify the origin of this undated Persian artisan register.",options:[{id:"guild_ledger_verified",label:"Official Guild Register (Bears official guildmaster seal)"},{id:"private_merchant_tally",label:"Merchant Shop Notebook (Informal daily trade tally)"},{id:"state_excise_record",label:"Treasury Tax Record (Official tax register)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Register Stitching Styles",info_value:"high",summary:"Crimson thread stitching was reserved for registered royal guilds."},{id:"OPT_CONTROL_1",topic:"Filing Code Reference",info_value:"low",summary:"Old municipal tax files use code series B."}]}];function x(){var l;const d=m[e];s.innerHTML=T({worldCode:"W5",worldIndex:4,title:"The Curatorial Dossier",subtitle:"Choose the best way to care for each historic item.",instructionPrompt:"Your Task",instruction:"Review the artifact below. Choose an action. Optional reference notes are available if you want them.",stimulusContent:`
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="flex items-center justify-between mb-2">
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Artifact Record</span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Record ${e+1} of ${m.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${d.title}</div>
 <div class="text-base text-black mt-1.5 leading-relaxed">${d.scenario}</div>
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
 ${d.optional_resources.map(c=>`
 <div class="opt-res-card p-3 bg-white border ${a[c.id]?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base min-h-[48px] flex flex-col justify-center" data-res="${c.id}">
 <div class="flex items-center justify-between">
 <span class="font-medium text-[var(--text-primary)] flex items-center gap-1.5">
 <svg class="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
 ${c.topic}
 </span>
 <span class="text-[9px] uppercase text-black">${a[c.id]?"Opened":"Inspect"}</span>
 </div>
 ${a[c.id]?`<p class="mt-2 text-[11px] text-black leading-relaxed border-t border-[var(--grid-border)] pt-2 ">${c.summary}</p>`:""}
 </div>
 `).join("")}
 </div>
 </div>

 <!-- Curatorial Actions -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Choose Preservation Action:</div>
 <div class="space-y-2.5">
 ${d.options.map(c=>`
 <div class="q1-opt p-3.5 bg-white border ${t===c.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-choice="${c.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2.5">
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${t===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===c.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${c.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium shrink-0">Action ${String.fromCharCode(65+d.options.indexOf(c))}</span>
 </div>
 `).join("")}
 </div>
 </div>
 </div>
 `,actionButtonId:"confirmQ1Btn",actionButtonText:e<m.length-1?"Confirm Decision &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Record ${e+1} of ${m.length}`}),s.querySelectorAll(".opt-res-card").forEach(c=>{c.addEventListener("click",()=>{r="mouse";const p=c.getAttribute("data-res");a[p]=!0,i("optional_resource_viewed",{trial_index:e,stimulus_id:d.stimulus_id,resource_id:p,input_modality:r,task_def_version:"1.0"}),x()})}),s.querySelectorAll(".q1-opt").forEach(c=>{const p=g=>{r=g,t=c.getAttribute("data-choice"),x()};c.addEventListener("click",()=>p("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),p("keyboard"))})}),(l=document.getElementById("confirmQ1Btn"))==null||l.addEventListener("click",()=>{i("decision_submitted",{trial_index:e,stimulus_id:d.stimulus_id,choice:t,input_modality:r,task_def_version:"1.0"}),e<m.length-1?(e++,t=null,a={},n(),x()):b({mini_game:"Q1",observations_count:m.length})})}function n(){const d=m[e];i("decision_presented",{trial_index:e,stimulus_id:d.stimulus_id,task_def_version:"1.0"})}x()}function fe(s,u,i,b){let e=0,t={},a=null,r="mouse";const m=[{stimulus_id:"Q2_T1",artifact_id:"manuscript_seal_1",title:"Relic 1: Wax Seal on Parchment",description:"A dark red wax seal stamped onto an old parchment document.",uncertainty_level:"moderate",expected_value:"high",clues:[{id:"CLUE_SEAL_INTAGLIO",label:"Carved Seal Border Script",detail:"Shows the official stamp of the Srinagar city office from 1862."},{id:"CLUE_WAX_RESIN",label:"Wax Material Analysis",detail:"Made with local pine resin rather than imported European wax."},{id:"CLUE_PARCHMENT_GRAIN",label:"Parchment Skin Grain",detail:"Mountain goatskin with hand-scraped natural grain."}],attributions:[{id:"attr_imperial_registrar_srinagar",label:"City Office of Srinagar (1860s)"},{id:"attr_commercial_trader",label:"River Trader Shipping Record"},{id:"attr_modern_reproduction",label:"Modern Souvenir Copy"}]},{stimulus_id:"Q2_T2",artifact_id:"ciphered_marginalia_2",title:"Relic 2: Star Chart with Handwritten Notes",description:"Handwritten notes written in old cursive script along a star chart.",uncertainty_level:"high",expected_value:"high",clues:[{id:"CLUE_CIPHER_DIACRITIC",label:"Script Number Marks",detail:"Notes record the date of an eclipse in 1845."},{id:"CLUE_SCRIBE_HAND",label:"Penmanship Style",detail:"Matches the private notebook of court scholar Mir Habib."},{id:"CLUE_GALL_INK_CORROSION",label:"Ink Aging Depth",detail:"Natural ink aging shows paper is over 170 years old."}],attributions:[{id:"attr_court_astrologer_notebook",label:"Court Scholar Personal Notebook"},{id:"attr_apothecary_recipe",label:"Herbal Medicine Recipe"},{id:"attr_random_scribble",label:"Scribe Practice Scratches"}]},{stimulus_id:"Q2_T3",artifact_id:"standard_receipt_3",title:"Relic 3: City Transit Toll Receipt (Control)",description:"A printed paper slip with standard columns and serial numbers.",uncertainty_level:"low",expected_value:"low_control",clues:[{id:"CLUE_PRINT_TYPE",label:"Standard Moveable Type",detail:"Mass-printed transit slip used for routine city transport."},{id:"CLUE_STAMP_INK",label:"Routine Blue Ink Stamp",detail:"Common government office stamp with standard numbering."}],attributions:[{id:"attr_standard_tax_slip",label:"City Transit Pass Receipt"},{id:"attr_royal_chancery_grant",label:"Palace Land Grant"},{id:"attr_secret_monastery_order",label:"Monastic Travel Permission"}]}];function x(){var l;const d=m[e];s.innerHTML=T({worldCode:"W5",worldIndex:4,title:"The Antiquarian’s Bench",subtitle:"Inspect physical clues to identify each historic object.",instructionPrompt:"Your Task",instruction:"Examine the relic below. Inspect any clues you wish. Then choose its origin.",stimulusContent:`
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="flex items-center justify-between mb-2">
 <span class="text-sm uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Relic Specimen</span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium">Specimen ${e+1} of ${m.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${d.title}</div>
 <div class="text-base text-black mt-1.5 leading-relaxed">${d.description}</div>
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
 ${d.clues.map(c=>`
 <div class="clue-btn p-3.5 bg-white border ${t[c.id]?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base min-h-[48px] flex flex-col justify-between" data-clue="${c.id}" tabindex="0" role="button">
 <div class="font-medium text-[var(--text-primary)] flex items-center justify-between">
 <span>${c.label}</span>
 <span class="text-[9px] uppercase text-black">${t[c.id]?"Inspected":"Inspect"}</span>
 </div>
 ${t[c.id]?`<p class="mt-2 text-[11px] text-black leading-relaxed border-t border-[var(--grid-border)] pt-2 ">${c.detail}</p>`:""}
 </div>
 `).join("")}
 </div>
 </div>

 <!-- Attribution Selection -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">Conclude Historical Origin:</div>
 <div class="space-y-2.5">
 ${d.attributions.map(c=>`
 <div class="q2-attr p-3.5 bg-white border ${a===c.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-attr="${c.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2.5">
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${a===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${a===c.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${c.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium shrink-0">Origin ${String.fromCharCode(65+d.attributions.indexOf(c))}</span>
 </div>
 `).join("")}
 </div>
 </div>
 </div>
 `,actionButtonId:"confirmQ2Btn",actionButtonText:e<m.length-1?"Confirm Origin &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!a,progressText:`Relic ${e+1} of ${m.length}`}),s.querySelectorAll(".clue-btn").forEach(c=>{const p=g=>{r=g;const v=c.getAttribute("data-clue");t[v]=!0,i("clue_inspected",{trial_index:e,stimulus_id:d.stimulus_id,artifact_id:d.artifact_id,clue_id:v,input_modality:r,task_def_version:"1.0"}),x()};c.addEventListener("click",()=>p("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),p("keyboard"))})}),s.querySelectorAll(".q2-attr").forEach(c=>{const p=g=>{r=g,a=c.getAttribute("data-attr"),x()};c.addEventListener("click",()=>p("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),p("keyboard"))})}),(l=document.getElementById("confirmQ2Btn"))==null||l.addEventListener("click",()=>{i("investigation_finalized",{trial_index:e,stimulus_id:d.stimulus_id,artifact_id:d.artifact_id,attribution_choice:a,input_modality:r,task_def_version:"1.0"}),e<m.length-1?(e++,t={},a=null,n(),x()):b({mini_game:"Q2",observations_count:m.length})})}function n(){const d=m[e];i("artifact_presented",{trial_index:e,stimulus_id:d.stimulus_id,artifact_id:d.artifact_id,uncertainty_level:d.uncertainty_level,expected_value:d.expected_value,task_def_version:"1.0"})}x()}function he(s,u,i,b){let e=0,t=!1,a=null,r="mouse";const m=[{stimulus_id:"Q3_E1",title:"Episode 1: The Master Painter’s Folio",ambiguity_type:"unattributed_artisan_folio",ambiguity_text:"An illuminated folio has gold dust borders and charcoal sketches. Two master painters worked during this era.",context_id:"provenance_context_1",context_title:"Rainawari Workshop Records (1870–1885)",context_text:"Records confirm Master Sadiq worked in Rainawari. He used willow-branch charcoal sketches and lapis blue borders.",decision_question:"Attribute the folio maker and technique lineage:",choices:[{id:"choice_sadiq_rainawari",label:"Master Sadiq (Rainawari workshop — willow charcoal sketch)"},{id:"choice_habib_court",label:"Master Habib (Palace court — imported graphite pencil)"},{id:"choice_generic_bazaar",label:"General City Market Production"}]},{stimulus_id:"Q3_E2",title:"Episode 2: The Exhibition Pavilion Ceiling",ambiguity_type:"mismatched_period_provenance",ambiguity_text:"A carved ceiling panel displays woodwork styles from two different rebuilding periods.",context_id:"provenance_context_2",context_title:"Dal Lake Pavilion Repair Notes (1902)",context_text:"Following the 1902 Dal Lake flood, builders used seasoned cedar wood. Earlier builders used soft river pine.",decision_question:"Identify the structural timber and repair era:",choices:[{id:"choice_post_flood_cedar",label:"Post-1902 Flood Repair (Seasoned mountain cedar wood)"},{id:"choice_pre_flood_pine",label:"Original Pre-Flood Building (Soft river pine wood)"},{id:"choice_modern_concrete",label:"Twentieth Century Replica"}]},{stimulus_id:"Q3_E3",title:"Episode 3: The Woven Silk Couplet",ambiguity_type:"regional_dialect_verse_origin",ambiguity_text:"A woven silk pashmina scarf has an old Kashmiri verse embroidered on it.",context_id:"provenance_context_3",context_title:"Valley Poetry Records (Lalla-Ded Shrines)",context_text:"Verses with this 4-beat pattern come from southern valley shrines (Pampore and Tral).",decision_question:"Select the verified cultural origin of this verse:",choices:[{id:"choice_southern_vakh_shrine",label:"Southern Valley Shrine Verse (Traditional 4-beat rhythm)"},{id:"choice_urban_court_ghazal",label:"Palace Court Scribe Poem (Formal Persian rhyming meter)"},{id:"choice_folk_bazaar_song",label:"Traveling Caravan Folk Song"}]}];function x(){var l,c;const d=m[e];s.innerHTML=`
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
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)]">${d.title}</div>
 <div class="text-base text-black mt-1.5 leading-relaxed">${d.ambiguity_text}</div>
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
 <div class="text-sm uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-1">${d.context_title}</div>
 <div>${d.context_text}</div>
 </div>
 `:`
 <div class="text-base text-black italic">
 Optional research notes are available to clarify historic details.
 </div>
 `}
 </div>

 <!-- YOUR CHOICE: Downstream Integration Decision -->
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider mb-2.5">${d.decision_question}</div>
 <div class="space-y-2.5">
 ${d.choices.map(p=>`
 <div class="q3-choice p-3.5 bg-white border ${a===p.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex items-center justify-between min-h-[48px]" data-choice="${p.id}" tabindex="0" role="button">
 <span class="flex items-center gap-2.5">
 <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-sm shrink-0 ${a===p.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${a===p.id?"✓":""}</span>
 <span class="text-[var(--text-primary)] font-medium">${p.label}</span>
 </span>
 <span class="text-sm text-[var(--accent-gold)] uppercase font-medium shrink-0">Format ${p.id.replace("CHOICE_","")}</span>
 </div>
 `).join("")}
 </div>
 </div>

 <!-- PRIMARY ACTION BUTTON -->
 <div class="flex justify-end mb-4">
 <button type="button" id="confirmQ3Btn" ${a?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 ${e<m.length-1?"Confirm Choice &rarr;":"Finish World 5 &rarr;"}
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${e+1} of ${m.length}
 </div>
 </div>
 `,(l=document.getElementById("retrieveContextBtn"))==null||l.addEventListener("click",()=>{r="mouse",t=!0,i("context_requested",{trial_index:e,stimulus_id:d.stimulus_id,context_id:d.context_id,input_modality:r,task_def_version:"1.0"}),x()}),s.querySelectorAll(".q3-choice").forEach(p=>{const g=v=>{r=v,a=p.getAttribute("data-choice"),x()};p.addEventListener("click",()=>g("mouse")),p.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g("keyboard"))})}),(c=document.getElementById("confirmQ3Btn"))==null||c.addEventListener("click",()=>{i("decision_submitted",{trial_index:e,stimulus_id:d.stimulus_id,choice:a,input_modality:r,task_def_version:"1.0"}),e<m.length-1?(e++,t=!1,a=null,n(),x()):b({mini_game:"Q3",observations_count:3})})}function n(){const d=m[e];i("episode_presented",{trial_index:e,stimulus_id:d.stimulus_id,ambiguity_type:d.ambiguity_type,task_def_version:"1.0"})}x()}function _e(s,u){const{appContainer:i,miniGameIndex:b,gameId:e,logEvent:t,onMiniGameComplete:a}=s,r=e||(b===0?"CR1":b===1?"CR3":"CR2");r==="CR1"?ye(i,u,t,a):r==="CR3"?ke(i,u,t,a):we(i,u,t,a)}function ye(s,u,i,b){let e=0,t=[],a=null,r="mouse";const m=[{stage_id:"CR1_S1",title:"Stage 1: The Weaving Shuttle Rig",constraint:"missing_crossbar_shuttle",scenario:"A walnut loom shuttle crossbar has cracked. Build a working replacement with studio parts.",materials:[{id:"M_SPLIT_BAMBOO",name:"Split Bamboo Rib",icon:"&#127883;",role:"Flexible wooden bar"},{id:"M_BRASS_ROD",name:"Slotted Brass Rod",icon:"&#128296;",role:"Stiff metal bar"},{id:"M_CARVED_PINE",name:"Carved Pine Peg",icon:"&#129685;",role:"Lightweight wooden pin"},{id:"M_WAXED_CORD",name:"Waxed Linen Cord",icon:"&#129526;",role:"Strong binding string"},{id:"M_CERAMIC_WEIGHT",name:"Ceramic Weight",icon:"&#9711;",role:"Small balancing weight"}],valid_combinations:[["M_SPLIT_BAMBOO","M_WAXED_CORD"],["M_BRASS_ROD"],["M_CARVED_PINE","M_CERAMIC_WEIGHT"]]},{stage_id:"CR1_S2",title:"Stage 2: The Warp Tension Anchor",constraint:"tension_wire_unanchored",scenario:"The side tension cord needs an anchor point. Assemble a secure tie-down rig.",materials:[{id:"M_LEATHER_STRAP",name:"Leather Cinch Strap",icon:"&#129526;",role:"Firm gripping strap"},{id:"M_NOTCHED_PEG",name:"Hardwood Anchor Peg",icon:"&#129685;",role:"Notched wooden wedge"},{id:"M_COPPER_WIRE",name:"Flexible Copper Wire",icon:"&#9874;",role:"Bendable wrapping wire"},{id:"M_STONE_COUNTER",name:"Counterweight Stone",icon:"&#11044;",role:"Heavy balance stone"}],valid_combinations:[["M_LEATHER_STRAP","M_NOTCHED_PEG"],["M_COPPER_WIRE"],["M_LEATHER_STRAP","M_STONE_COUNTER"]]}];function x(){var l,c;const d=m[e];s.innerHTML=T({worldCode:"W6",worldIndex:5,title:"The Artisan's Assembly",subtitle:"Build a working workshop fixture from available parts.",instructionPrompt:"Your Task",instruction:"Review the broken part below. Select one or more workbench items to fix it. Multiple valid combinations exist.",stimulusContent:`
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="flex items-center justify-between mb-1.5">
 <span class="text-sm text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Atelier Hardware Need</span>
 <span class="text-sm text-[var(--accent-gold)] font-medium uppercase">Stage ${e+1} of ${m.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${d.title}</div>
 <div class="text-base text-black leading-relaxed">${d.scenario}</div>
 </div>
 `,interactionContent:`
 <div class="p-4 sm:p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs">
 <div class="text-sm text-black uppercase tracking-wider mb-3">Available Workbench Components (Click to Equip)</div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-4">
 ${d.materials.map(p=>{const g=t.includes(p.id);return`
 <div class="part-card p-3.5 bg-white border ${g?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base flex flex-col justify-between min-h-[72px]" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.name}">
 <div>
 <div class="text-lg mb-1 text-stone-700">${p.icon}</div>
 <div class="font-medium text-[var(--text-primary)] mb-0.5">${p.name}</div>
 <div class="text-sm text-black">${p.role}</div>
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
 Equipped: <strong class="text-[var(--text-primary)]">${t.length>0?t.map(p=>{var g;return(g=d.materials.find(v=>v.id===p))==null?void 0:g.name}).join(" + "):"None selected"}</strong>
 </div>
 <button type="button" id="testAssemblyBtn" ${t.length>0?"":"disabled"} class="px-4 py-2 bg-stone-100 border border-stone-300 text-[var(--text-primary)] text-base uppercase tracking-wider disabled:opacity-40 interactive-option rounded-xs min-h-[44px]">
 Test Assembly
 </button>
 </div>

 ${a?`
 <div class="mt-3 p-3 bg-white border ${a.valid?"border-emerald-600/40 text-[var(--text-primary)]":"border-amber-600/40 text-[var(--text-primary)]"} text-base rounded-xs leading-relaxed ">
 <span class="text-sm uppercase font-semibold block mb-0.5">${a.valid?"Assembly Test: Passed":"Assembly Test: Note"}</span>
 ${a.message}
 </div>
 `:""}
 </div>
 `,actionButtonId:"confirmStageBtn",actionButtonText:e<m.length-1?"Confirm Assembly &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:t.length===0,progressText:`Stage ${e+1} of ${m.length}`}),s.querySelectorAll(".part-card").forEach(p=>{const g=v=>{r=v;const f=p.getAttribute("data-id");t.includes(f)?t=t.filter(h=>h!==f):t.push(f),a=null,i("part_toggled",{stage_id:d.stage_id,trial_index:e,part_id:f,selected_parts:[...t],input_modality:r,task_def_version:"1.0"}),x()};p.addEventListener("click",()=>g("mouse")),p.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g("keyboard"))})}),(l=document.getElementById("testAssemblyBtn"))==null||l.addEventListener("click",()=>{r="mouse";const p=new Set(t),g=d.valid_combinations.some(v=>v.every(f=>p.has(f)));a={valid:g,message:g?"Tension test passed. The loom parts balance smoothly.":"Test note: The parts wobble or do not connect tightly."},i("assembly_tested",{stage_id:d.stage_id,trial_index:e,parts:[...t],input_modality:r,task_def_version:"1.0"}),x()}),(c=document.getElementById("confirmStageBtn"))==null||c.addEventListener("click",()=>{i("stage_completed",{stage_id:d.stage_id,trial_index:e,final_parts:[...t],input_modality:r,task_def_version:"1.0"}),e<m.length-1?(e++,t=[],a=null,n(),x()):b({mini_game:"CR1",observations_count:2})})}function n(){const d=m[e];i("stage_presented",{stage_id:d.stage_id,trial_index:e,constraint:d.constraint,task_def_version:"1.0"})}x()}function we(s,u,i,b){let e=0,t="pre_shift",a=null,r=null,m="mouse";const x=[{episode_id:"CR2_E1",title:"Episode 1: The Central Pillar Chamber",pre_context:"Plan visitor walking paths through the grand exhibition hall.",pre_strategies:[{id:"S_CENTRAL_AVENUE",label:"Central Promenade",desc:"Single straight walkway down the center."},{id:"S_PERIMETER_LOOP",label:"Outer Wall Loop",desc:"Continuous gentle loop along outer walls."},{id:"S_ALCOVE_ISLANDS",label:"Display Islands",desc:"Separate display clusters across the floor."}],constraint_change:"central_pillar_blocks_corridor",shift_description:"Notice: A large carved stone pillar blocks the direct central pathway.",post_strategies:[{id:"split_flow",label:"Twin Walking Corridors (Split visitors smoothly around both sides of the pillar)",note:"Adapted Flow"},{id:"linear_flow",label:"Single Left Path (Route all visitors down the left aisle)",note:"Linear Channel"},{id:"stop_gap",label:"Central Waiting Area (Pause visitors and let small groups enter in turns)",note:"Batch Entry"}]},{episode_id:"CR2_E2",title:"Episode 2: West Gallery Safety Clearance",pre_context:"Arrange display stands across the wide western gallery corridor.",pre_strategies:[{id:"S_WALL_PANORAMA",label:"Wall Art Series",desc:"Continuous artwork hung along the west wall."},{id:"S_TRANSVERSE_SCREENS",label:"Crosswise Screens",desc:"Folding screens set across the corridor."},{id:"S_PAIRED_PLINTHS",label:"Center Display Stands",desc:"Two rows of waist-high display stands."}],constraint_change:"emergency_exit_clearance_widened",shift_description:"Safety rule: Keep a 3-meter wide open walkway along the west wall.",post_strategies:[{id:"perimeter_flow",label:"Clear Wall Pathway (Move displays inward to leave the west wall open)",note:"Adapted Flow"},{id:"central_cluster",label:"Center Grouping (Gather all stands tightly in the room center)",note:"Center Group"},{id:"diagonal_crossing",label:"Diagonal Zigzag (Weave walking paths between the doorways)",note:"Zigzag Path"}]},{episode_id:"CR2_E3",title:"Episode 3: North Archway Clearance",pre_context:"Display vertical banners and artwork in the north wing.",pre_strategies:[{id:"S_TALL_STELAE",label:"Tall Wooden Posts",desc:"Four-meter tall vertical banner posts."},{id:"S_HORIZONTAL_VITRINES",label:"Low Table Vitrines",desc:"Flat glass vitrines at waist height."},{id:"S_CEILING_SUSPENSION",label:"Ceiling Silk Banners",desc:"Flowing fabric banners hung from rafters."}],constraint_change:"low_ceiling_arch_support",shift_description:"Structural inspection: Low wooden ceiling beams limit overhead room to 2.2 meters.",post_strategies:[{id:"linear_flow",label:"Low Table Vitrines (Use waist-high displays to preserve headroom)",note:"Adapted Flow"},{id:"canopy_tent",label:"Hanging Fabric Canopy (Drape thin cloth below the beams)",note:"Low Drapery"},{id:"staggered_alcoves",label:"Wall Post Leaning (Lean tall banner boards against walls)",note:"Wall Lean"}]}];function n(){var c,p,g;const l=x[e];t==="pre_shift"?(s.innerHTML=`
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
 ${l.pre_strategies.map(v=>{const f=a===v.id;return`
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
 <button type="button" id="confirmPreShiftBtn" ${a?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 Set Plan & Proceed &rarr;
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${e+1} of ${x.length} &middot; Step 1
 </div>
 </div>
 `,s.querySelectorAll(".pre-strat-card").forEach(v=>{const f=h=>{m=h,a=v.getAttribute("data-id"),n()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(c=document.getElementById("confirmPreShiftBtn"))==null||c.addEventListener("click",()=>{i("initial_strategy_selected",{episode_id:l.episode_id,trial_index:e,strategy_id:a,input_modality:m,task_def_version:"1.0"}),i("constraint_shifted",{episode_id:l.episode_id,trial_index:e,constraint_change:l.constraint_change,task_def_version:"1.0"}),t="post_shift",r=a,n()})):(s.innerHTML=`
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
 Prior Plan: <strong>${((p=l.pre_strategies.find(v=>v.id===a))==null?void 0:p.label)||a}</strong>
 </div>
 </div>

 <!-- INTERACTION AREA: Post-Shift Strategy Selection -->
 <div class="mb-5 space-y-2.5 candidate-content-protected">
 <div class="text-sm text-black uppercase tracking-wider">Choose Adapted Layout:</div>
 ${l.post_strategies.map(v=>{const f=r===v.id;return`
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
 <button type="button" id="confirmPostShiftBtn" ${r?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
 ${e<x.length-1?"Confirm Plan & Next Episode &rarr;":"Finish Part 2 &rarr;"}
 </button>
 </div>

 <!-- Progress Footer -->
 <div class="text-right text-[11px] text-black ">
 Episode ${e+1} of ${x.length} &middot; Step 2
 </div>
 </div>
 `,s.querySelectorAll(".post-strat-card").forEach(v=>{const f=h=>{m=h,r=v.getAttribute("data-id"),n()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(g=document.getElementById("confirmPostShiftBtn"))==null||g.addEventListener("click",()=>{i("strategy_revised",{episode_id:l.episode_id,trial_index:e,initial_strategy_id:a,revised_strategy_id:r,input_modality:m,task_def_version:"1.0"}),e<x.length-1?(e++,t="pre_shift",a=null,r=null,d(),n()):b({mini_game:"CR2",observations_count:3})}))}function d(){const l=x[e];i("episode_presented",{episode_id:l.episode_id,trial_index:e,initial_context:l.pre_context,task_def_version:"1.0"})}n()}function ke(s,u,i,b){let e=0,t=null,a=null,r=null,m="mouse";const x=[{stimulus_id:"CR3_T1",title:"Trial 1: The Crisp Paper Fold",target_motif:"burnished_crease",objective:"Form a sharp, smooth crease on thick paper without tearing surface fibers.",tools:[{id:"bone_folder",name:"Polished Bone Tool",icon:"&#129685;",affordance:"Smooth curved edge that applies friction gently"},{id:"metal_stylus",name:"Steel Scribe Stylus",icon:"&#128296;",affordance:"Hard pointed needle tip for sharp indentation"},{id:"bamboo_wedge",name:"Beveled Bamboo Scraper",icon:"&#127883;",affordance:"Broad flat wooden face for broad surface pressure"}],methods:[{id:"firm_edge_pass",name:"Firm Edge Pass",desc:"Slide rounded edge along ruler with continuous diagonal pressure."},{id:"flat_face_rub",name:"Flat Face Rub",desc:"Distribute wide surface friction across fold line."},{id:"sharp_point_drag",name:"Sharp Point Drag",desc:"Draw tip directly across surface to score the fiber line."}],feedback_map:{"bone_folder:firm_edge_pass":{success:!0,text:"Clean, crisp burnished crease formed with zero surface abrasion."},"bamboo_wedge:flat_face_rub":{success:!0,text:"Smooth, even flattened fold achieved without marring surface grain."},"metal_stylus:sharp_point_drag":{success:!1,text:"Paper fibers sliced; sharp point cut through the paper fold."},"metal_stylus:firm_edge_pass":{success:!1,text:"Metal edge left dark metallic friction scuffs across the parchment."},"bone_folder:flat_face_rub":{success:!0,text:"Gentle, even crease formed; fibers compressed smoothly."},"bamboo_wedge:firm_edge_pass":{success:!0,text:"Uniform clean fold line established with natural wood contour."},"bone_folder:sharp_point_drag":{success:!1,text:"Uneven dragging motion; point dented paper surface."},"bamboo_wedge:sharp_point_drag":{success:!1,text:"Wood corner snagged on rough paper grain."},"metal_stylus:flat_face_rub":{success:!1,text:"Insufficient surface area; uneven pressure indentation."}}},{stimulus_id:"CR3_T2",title:"Trial 2: Mulberry Paper Stipple",target_motif:"fine_stipple",objective:"Produce an even scatter of tiny ink drops on fibrous paper.",tools:[{id:"horsehair_brush",name:"Stiff Hair Brush",icon:"&#128396;",affordance:"Springy stiff bristles that snap back easily"},{id:"sponge_block",name:"Natural Sea Sponge",icon:"&#9711;",affordance:"Soft porous texture that dabs damp color"},{id:"linen_swab",name:"Rolled Cloth Swab",icon:"&#129526;",affordance:"Rolled fabric tip that absorbs liquid quickly"}],methods:[{id:"textured_flick",name:"Bristle Flick",desc:"Pull loaded bristles back with thumb to release fine mist."},{id:"mottled_dab",name:"Surface Dab",desc:"Light stamp of textured surface directly on paper."},{id:"drag_stroke",name:"Smooth Sweep",desc:"Draw applicator steadily across page in sweeping stroke."}],feedback_map:{"horsehair_brush:textured_flick":{success:!0,text:"Fine, even constellation of organic micro-droplets dispersed across parchment."},"sponge_block:mottled_dab":{success:!0,text:"Rich textured tonal stipple with soft, organic cellular grain."},"linen_swab:drag_stroke":{success:!1,text:"Produced a single continuous solid streak; zero stipple effect."},"linen_swab:textured_flick":{success:!1,text:"Fabric has no elastic bristle snap; pigment remained bound in swab."},"sponge_block:drag_stroke":{success:!1,text:"Smeared broad irregular smudge across paper."},"horsehair_brush:drag_stroke":{success:!1,text:"Solid brushstroke line created; no dispersed speckling."},"horsehair_brush:mottled_dab":{success:!0,text:"Bristle tips formed delicate speckled texture upon contact."},"sponge_block:textured_flick":{success:!1,text:"Sponge cannot be flicked; dropped heavy inconsistent blot."},"linen_swab:mottled_dab":{success:!1,text:"Dense blot soaked through fiber without texture."}}}];function n(){var c,p,g,v;const l=x[e];s.innerHTML=T({worldCode:"W6",worldIndex:5,title:"The Improvised Tool",subtitle:"Adapt craft technique from physical feedback.",instructionPrompt:"Your Task",instruction:"Pick a tool and an action method below. Click Apply Technique to test your result. You can change your choice before confirming.",stimulusContent:`
 <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
 <div class="flex items-center justify-between mb-1.5">
 <span class="text-sm text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Craft Objective</span>
 <span class="text-sm text-[var(--accent-gold)] font-medium uppercase">Trial ${e+1} of ${x.length}</span>
 </div>
 <div class="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${l.title}</div>
 <div class="text-base text-black leading-relaxed">${l.objective}</div>
 </div>
 `,interactionContent:`
 <div class="space-y-4">
 <!-- Tool Selection -->
 <div>
 <div class="text-sm text-black uppercase tracking-wider mb-2">1. Select Implement:</div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
 ${l.tools.map(f=>`
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
 <div class="text-sm text-black uppercase tracking-wider mb-2">2. Choose Action Method:</div>
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
 ${l.methods.map(f=>`
 <div class="cr3-method-card p-3.5 sm:p-4 bg-white border ${a===f.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-base min-h-[64px]" data-id="${f.id}" tabindex="0" role="button" aria-label="${f.name}">
 <div class="font-medium text-[var(--text-primary)] mb-0.5">${f.name}</div>
 <div class="text-[11px] text-black leading-relaxed">${f.desc}</div>
 </div>
 `).join("")}
 </div>
 </div>

 <!-- Apply & Observe Feedback -->
 <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
 <div class="text-base text-black">
 Active Pairing: <strong class="text-[var(--text-primary)]">${t?(c=l.tools.find(f=>f.id===t))==null?void 0:c.name:"None"} + ${a?(p=l.methods.find(f=>f.id===a))==null?void 0:p.name:"None"}</strong>
 </div>
 <button type="button" id="applyTechniqueBtn" ${t&&a?"":"disabled"} class="px-5 py-2.5 bg-stone-100 border border-stone-300 text-[var(--text-primary)] text-base uppercase tracking-wider disabled:opacity-40 interactive-option rounded-xs min-h-[44px]">
 Apply Technique
 </button>
 </div>

 ${r?`
 <div class="p-4 bg-white border ${r.success?"border-emerald-600/40 text-[var(--text-primary)]":"border-amber-600/40 text-[var(--text-primary)]"} rounded-xs text-base leading-relaxed ">
 <div class="text-sm uppercase font-semibold mb-1 ${r.success,"text-[var(--text-primary)]"}">Material Outcome Observation</div>
 <div>${r.text}</div>
 </div>
 `:""}
 </div>
 `,actionButtonId:"confirmTrialBtn",actionButtonText:e<x.length-1?"Confirm Technique &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!(t&&a),progressText:`Trial ${e+1} of ${x.length}`}),s.querySelectorAll(".cr3-tool-card").forEach(f=>{const h=_=>{m=_,t=f.getAttribute("data-id"),i("tool_selected",{stimulus_id:l.stimulus_id,trial_index:e,tool_id:t,input_modality:m,task_def_version:"1.0"}),n()};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),h("keyboard"))})}),s.querySelectorAll(".cr3-method-card").forEach(f=>{const h=_=>{m=_,a=f.getAttribute("data-id"),n()};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),h("keyboard"))})}),(g=document.getElementById("applyTechniqueBtn"))==null||g.addEventListener("click",()=>{m="mouse";const f=`${t}:${a}`,h=l.feedback_map[f]||{success:!1,text:"No noticeable craft adaptation observed."};r=h,i("action_applied",{stimulus_id:l.stimulus_id,trial_index:e,tool_id:t,action_method:a,input_modality:m,task_def_version:"1.0"}),i("feedback_observed",{stimulus_id:l.stimulus_id,trial_index:e,tool_id:t,action_method:a,outcome_feedback:h.text,task_def_version:"1.0"}),n()}),(v=document.getElementById("confirmTrialBtn"))==null||v.addEventListener("click",()=>{i("strategy_adapted",{stimulus_id:l.stimulus_id,trial_index:e,final_tool_id:t,final_method:a,input_modality:m,task_def_version:"1.0"}),e<x.length-1?(e++,t=null,a=null,r=null,d(),n()):b({mini_game:"CR3",observations_count:x.length})})}function d(){const l=x[e];i("trial_presented",{stimulus_id:l.stimulus_id,trial_index:e,target_motif:l.target_motif,task_def_version:"1.0"})}n()}function Se(s,u){const{appContainer:i,miniGameIndex:b,gameId:e,logEvent:t,onMiniGameComplete:a}=s,r=e||(b===0?"M1":b===1?"M2":"M3");r==="M1"?Te(i,u,t,a):r==="M2"?Ce(i,u,t,a):Ee(i,u,t,a)}function Te(s,u,i,b){let e=0,t="mouse";const a=[{stimulus_id:"M1_U1",recipient:"Master Ghulam — Calligraphy Diwan",note:"Formal invitation envelope 1"},{stimulus_id:"M1_U2",recipient:"Valley Youth Literary Guild",note:"Formal invitation envelope 2"}];function r(){var n;const x=a[e];s.innerHTML=T({worldCode:"W7",worldIndex:6,title:"The Ceremonial Seal",subtitle:"Apply wax seals to event invitations.",instructionPrompt:"Your Task",instruction:"Review the recipient below. Click Apply Wax Seal. Completing all 3 fulfills this activity.",stimulusContent:`
 <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
 <div class="w-full max-w-sm mx-auto min-h-[140px] bg-amber-50/70 border border-[var(--grid-border)] flex flex-col items-center justify-center p-5 relative shadow-sm rounded-xs">
 <span class="text-sm uppercase tracking-widest text-black ">Ceremonial Invitation</span>
 <div class="text-sm font-semibold text-[var(--text-primary)] mt-1.5">${x.recipient}</div>
 <div class="text-[11px] text-stone-500 mt-0.5">${x.note}</div>

 <div id="sealDisplay" class="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-sm text-[var(--accent-gold)] font-bold shadow-xs">
 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
 </div>
 </div>
 </div>
 `,actionButtonId:"stampBtn",actionButtonText:e===a.length-1?"Confirm & Finish &rarr;":"Apply Wax Seal &rarr;",progressText:`Envelope ${e+1} of ${a.length} (Required Minimum: 2)`}),(n=document.getElementById("stampBtn"))==null||n.addEventListener("click",()=>{t="mouse",i("unit_action_performed",{stimulus_id:x.stimulus_id,unit_index:e,action_type:"press_wax_seal",input_modality:t,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:x.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<a.length-1?(e++,m(),r()):b({mini_game:"M1",observations_count:a.length})})}function m(){const x=a[e];i("unit_presented",{stimulus_id:x.stimulus_id,unit_index:e,is_mandatory:!0,task_def_version:"1.0"})}r()}function Ce(s,u,i,b){let e="mandatory",t=0,a=0,r="mouse";const m=[{stimulus_id:"M2_M1",label:"Guest Folder 1: Artisan Guild",is_mandatory:!0},{stimulus_id:"M2_M2",label:"Guest Folder 2: Regional Patrons",is_mandatory:!0}],x=[{stimulus_id:"M2_O1",label:"Extra Folder 1: Visiting Students",is_mandatory:!1},{stimulus_id:"M2_O2",label:"Extra Folder 2: Community Observers",is_mandatory:!1}];function n(){var l,c,p,g,v;if(e==="mandatory"){const f=m[t];s.innerHTML=T({worldCode:"W7",worldIndex:6,stepBadge:`Required Phase (${t+1}/2)`,title:"The Courtesy Sleeves",subtitle:"Prepare courtesy sleeves for event attendees.",instructionPrompt:"Your Task",instruction:"Assemble the required folder below. Two required folders are needed to satisfy this activity.",stimulusContent:`
 <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
 <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
 <span class="text-sm uppercase tracking-wider text-stone-500 ">Required Courtesy Folder</span>
 <div class="text-sm font-semibold text-[var(--text-primary)] mt-1">${f.label}</div>
 </div>
 </div>
 `,actionButtonId:"foldSleeveBtn",actionButtonText:"Assemble Required Folder &rarr;",progressText:`Required Folder ${t+1} of ${m.length}`}),(l=document.getElementById("foldSleeveBtn"))==null||l.addEventListener("click",()=>{r="mouse",i("unit_action_performed",{stimulus_id:f.stimulus_id,unit_index:t,action_type:"assemble_sleeve",input_modality:r,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:f.stimulus_id,unit_index:t,is_mandatory:!0,task_def_version:"1.0"}),t<m.length-1?(t++,d(m[t]),n()):(e="choice",i("choice_presented",{trial_index:m.length,mandatory_completed_count:m.length,task_def_version:"1.0"}),n())})}else if(e==="choice")s.innerHTML=T({worldCode:"W7",worldIndex:6,stepBadge:"Requirement Completed",title:"The Courtesy Sleeves",subtitle:"Required minimum completed.",stimulusContent:`
 <div class="p-6 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs text-center">
 <div class="w-10 h-10 mx-auto rounded-full bg-[var(--text-primary)] border border-emerald-300 flex items-center justify-center text-[var(--text-primary)] text-lg mb-2">
 &#10003;
 </div>
 <div class="text-sm font-semibold text-[var(--text-primary)] mb-1">Required Minimum Satisfied</div>
 <p class="text-base text-black max-w-md mx-auto leading-relaxed mb-6">
 You have completed the required 2 courtesy folders. You may conclude this activity now, or make up to ${x.length-a} extra folders.
 <br><strong class="text-stone-700 mt-1 inline-block">Stopping at the minimum is completely neutral.</strong>
 </p>

 <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
 <button type="button" id="concludeBtn" class="px-6 py-3.5 bg-[var(--text-primary)] text-white text-base uppercase tracking-widest interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px] cursor-pointer">
 Conclude Activity Now &rarr;
 </button>
 ${a<x.length?`
 <button type="button" id="continueOptionalBtn" class="px-6 py-3.5 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-base uppercase tracking-widest interactive-option shadow-xs rounded-xs w-full sm:w-auto min-h-[44px] cursor-pointer">
 + Prepare Extra Folder (${a+1}/${x.length})
 </button>
 `:""}
 </div>
 </div>
 `,progressText:"Choice Point &middot; Stopping is neutral"}),(c=document.getElementById("concludeBtn"))==null||c.addEventListener("click",()=>{r="mouse",i("continuation_choice_selected",{choice:"conclude",optional_index:a,input_modality:r,task_def_version:"1.0"}),b({mini_game:"M2",observations_count:m.length+a})}),(p=document.getElementById("continueOptionalBtn"))==null||p.addEventListener("click",()=>{r="mouse",i("continuation_choice_selected",{choice:"continue",optional_index:a,input_modality:r,task_def_version:"1.0"}),e="optional",d(x[a]),n()});else if(e==="optional"){const f=x[a];s.innerHTML=T({worldCode:"W7",worldIndex:6,stepBadge:"Voluntary Extra",title:"The Courtesy Sleeves",subtitle:"Voluntary extra folder preparation.",instructionPrompt:"Voluntary Extra",instruction:"You may assemble this extra folder or finish at any time. Stopping is completely neutral.",stimulusContent:`
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
 `,actionButtonId:"foldOptionalSleeveBtn",actionButtonText:a===x.length-1?"Confirm & Finish &rarr;":"Assemble Extra Folder &rarr;",progressText:`Extra Folder ${a+1} of ${x.length}`}),(g=document.getElementById("stopOptionalEarlyBtn"))==null||g.addEventListener("click",()=>{r="mouse",i("continuation_choice_selected",{choice:"conclude",optional_index:a,input_modality:r,task_def_version:"1.0"}),b({mini_game:"M2",observations_count:m.length+a})}),(v=document.getElementById("foldOptionalSleeveBtn"))==null||v.addEventListener("click",()=>{r="mouse",i("unit_action_performed",{stimulus_id:f.stimulus_id,unit_index:m.length+a,action_type:"assemble_sleeve",input_modality:r,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:f.stimulus_id,unit_index:m.length+a,is_mandatory:!1,task_def_version:"1.0"}),a++,a<x.length?(e="choice",i("choice_presented",{trial_index:m.length+a,mandatory_completed_count:m.length,task_def_version:"1.0"}),n()):b({mini_game:"M2",observations_count:m.length+a})})}}function d(l){i("unit_presented",{stimulus_id:l.stimulus_id,unit_index:l.is_mandatory?t:m.length+a,is_mandatory:l.is_mandatory,task_def_version:"1.0"})}n()}function Ee(s,u,i,b){let e=0,t="mouse";const a=[{stimulus_id:"M3_U1",is_mandatory:!0,row_name:"Gallery Row 1: Lighting & Illumination Alignment",feedback_type:"salient"},{stimulus_id:"M3_U2",is_mandatory:!0,row_name:"Gallery Row 2: Poetry Anthologies Welcome Stand",feedback_type:"moderate"},{stimulus_id:"M3_U3",is_mandatory:!0,row_name:"Gallery Row 3: Courtyard Entry Floral Registry",feedback_type:"minimal"},{stimulus_id:"M3_U4",is_mandatory:!1,row_name:"Gallery Row 4: Auxiliary Bench Linen Inspection",feedback_type:"none"},{stimulus_id:"M3_U5",is_mandatory:!1,row_name:"Gallery Row 5: Outer Colonnade Lantern Wick Inspection",feedback_type:"none"},{stimulus_id:"M3_U6",is_mandatory:!1,row_name:"Gallery Row 6: Perimeter Garden Urn Water Check",feedback_type:"none"}],r=3;function m(){var l,c;const n=a[e],d=e>=r;s.innerHTML=`
 <div class="">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
 <div class="flex items-center gap-2">
 <span class="act-badge">World 7: The Repetition</span>
 
 </div>
 <div class="text-[11px] text-[var(--text-primary)] font-medium">
 ${d?"Optional Continuation":"Required Minimum (3)"}
 </div>
 </div>

 <!-- TASK HEADER -->
 <div class="mb-4">
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)]">The Evening Registry</h2>
 <p class="text-base text-black mt-0.5">
 ${d?"Requirement met (3/3). You may conclude now or continue.":"Mandatory requirement: 3 rows. Completing 3 satisfies the activity."}
 </p>
 </div>

 ${d?`
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
 <div class="text-sm font-semibold text-[var(--text-primary)] mt-1">${n.row_name}</div>
 </div>
 </div>

 <!-- PRIMARY ACTION BUTTONS -->
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
 <div>
 ${d?`
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
 Row ${e+1} of ${a.length}
 </div>
 </div>
 `,(l=document.getElementById("concludeM3Btn"))==null||l.addEventListener("click",()=>{t="mouse",i("conclude_selected",{stimulus_id:n.stimulus_id,unit_index:e,total_units_completed:e,input_modality:t,task_def_version:"1.0"}),b({mini_game:"M3",observations_count:e})}),(c=document.getElementById("verifyRowBtn"))==null||c.addEventListener("click",()=>{t="mouse",i("unit_action_performed",{stimulus_id:n.stimulus_id,unit_index:e,action_type:"verify_registry_entry",input_modality:t,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:n.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<a.length-1?(e++,x(),m()):b({mini_game:"M3",observations_count:a.length})})}function x(){const n=a[e];i("trial_presented",{stimulus_id:n.stimulus_id,unit_index:e,is_mandatory:n.is_mandatory,task_def_version:"1.0"})}m()}const U={W1:{name:"The Frequency",name_ur:"آواز",subtitle:"Acoustics & Dialogue"},W2:{name:"The Archive",name_ur:"دستاویز",subtitle:"Manuscripts & Preservation"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ کینوس",subtitle:"Artisan Workshop"},W4:{name:"The Shifting Grid",name_ur:"بدلتا گرڈ",subtitle:"Mosaic & Rhythm"},W5:{name:"The Hidden Gallery",name_ur:"پوشیدہ گیلری",subtitle:"Exhibition Discovery"},W6:{name:"The Broken Tool",name_ur:"ٹوٹا آلہ",subtitle:"Material Assembly"},W7:{name:"The Repetition",name_ur:"دہرائی",subtitle:"Readiness & Ceremony"}};function T({worldCode:s="",worldIndex:u=0,stepBadge:i="",title:b="",subtitle:e="",instruction:t="",instructionPrompt:a="Your Task",stimulusContent:r="",interactionContent:m="",feedbackContent:x="",summaryContent:n="",actionButtonId:d="",actionButtonText:l="",actionButtonDisabled:c=!1,secondaryActionHtml:p="",progressText:g="",extraContent:v=""}){const f=U[s]||{name:"Alfaaz Workshop",name_ur:""},h=typeof u=="number"?u:0,_=i&&!i.toLowerCase().includes("takes about")?i:"";return`
 <div class="max-w-2xl mx-auto space-y-4">
 <!-- TOP BAR -->
 <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
 <div class="flex items-center gap-2">
 <span class="act-badge">World ${h+1} of 7: ${f.name}</span>
 ${f.name_ur?`<span class="font-serif text-base sm:text-lg text-black" style="direction: rtl;">${f.name_ur}</span>`:""}
 </div>
 ${_?`<div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">${_}</div>`:""}
 </div>

 <!-- TASK HEADER -->
 <div>
 <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">${b}</h2>
 ${e?`<p class="text-base text-black mt-1 leading-relaxed font-medium">${e}</p>`:""}
 </div>

 <!-- INSTRUCTION / CONTEXT BOX -->
 ${t?`
 <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs candidate-content-protected">
 <div class="text-sm uppercase tracking-wider font-sans text-[var(--accent-gold)] font-bold mb-1">${a}</div>
 <div class="text-base text-black leading-relaxed font-medium">
 ${t}
 </div>
 </div>
 `:""}

 <!-- MAIN STIMULUS AREA -->
 ${r?`<div class="candidate-content-protected">${r}</div>`:""}

 <!-- INTERACTION AREA -->
 ${m?`<div class="candidate-content-protected">${m}</div>`:""}

 <!-- FEEDBACK REGION -->
 ${x?`
 <div class="candidate-content-protected">
 ${x}
 </div>
 `:""}

 <!-- ACTIVE SELECTION / SUMMARY AREA -->
 ${n?`
 <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs text-base font-sans text-black flex justify-between items-center candidate-content-protected">
 ${n}
 </div>
 `:""}

 <!-- PRIMARY ACTION BAR -->
 ${l||p?`
 <div class="flex flex-col sm:flex-row justify-end items-center gap-3 pt-1">
 ${p||""}
 ${l?`
 <button type="button" id="${d}" ${c?"disabled":""} class="w-full sm:w-auto px-7 py-3.5 bg-[var(--text-primary)] text-white text-sm font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer interactive-option shadow-sm rounded-xs flex items-center justify-center gap-2 min-h-[44px]">
 ${l}
 </button>
 `:""}
 </div>
 `:""}

 <!-- EXTRA CONTENT -->
 ${v||""}

 <!-- PROGRESS FOOTER -->
 ${g?`
 <div class="text-right text-sm text-black font-sans pt-1">
 ${g}
 </div>
 `:""}
 </div>
 `}const O={W1:["F1","F2"],W2:["A1","A2"],W3:["C1","C2"],W4:["E1","E2"],W5:["Q1","Q2"],W6:["CR1","CR3"],W7:["M1","M2"]};function $e(s){const{appContainer:u,worldCode:i,worldIndex:b,miniGameIndex:e,gameId:t,onMiniGameComplete:a}=s,r=U[i]||{name:"Alfaaz Workshop",name_ur:""},m=t||O[i]&&O[i][e]||null,x={...s,gameId:m},n=(d,l)=>`
 <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
 <div>
 <div class="flex items-center gap-2">
 <span class="act-badge">World ${b+1} of 7: ${r.name}</span>
 <span class="font-serif text-base sm:text-lg text-black" style="direction: rtl;">${r.name_ur}</span>
 </div>
 <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${d}</h2>
 <p class="text-base text-black mt-1 leading-relaxed font-medium">${l}</p>
 </div>
 </div>
 `;switch(i){case"W1":re(x,n);break;case"W2":ee(x,n);break;case"W3":de(x,n);break;case"W4":me(x,n);break;case"W5":ve(x,n);break;case"W6":_e(x,n);break;case"W7":Se(x,n);break;default:a&&a({});break}}function Ae(){const s=window.ALFAAZ_API_URL||"";s&&(fetch(s+"/ping").catch(()=>{}),setInterval(()=>fetch(s+"/ping").catch(()=>{}),4*60*1e3))}let o={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1,activeMiniGameInProgress:!1,telemetryTerminal:!1};const K="alfaaz_recruit_state",V="alfaaz_recruit_unsent";let N=!1;function G(){N=!1;try{const s={sessionId:o.sessionId,configHash:o.configHash,worldSequence:o.worldSequence,seeds:o.seeds,screen:o.screen,sjtScenarios:o.sjtScenarios,currentSjtIndex:o.currentSjtIndex,sjtResponses:o.sjtResponses,currentWorldIndex:o.currentWorldIndex,currentMiniGameIndex:o.currentMiniGameIndex,accessibilityModes:o.accessibilityModes,segmentId:o.segmentId,seq:o.seq,isPaused:o.isPaused,activeMiniGameInProgress:o.activeMiniGameInProgress||!1,telemetryTerminal:o.telemetryTerminal};sessionStorage.setItem(K,JSON.stringify(s)),sessionStorage.setItem(V,JSON.stringify(o.telemetryQueue.slice(-100)))}catch(s){console.warn("[Persistence] Error saving sessionStorage:",s)}}function k({immediate:s=!1}={}){if(s){G();return}if(N)return;N=!0;const u=()=>G();"requestIdleCallback"in window?window.requestIdleCallback(u,{timeout:500}):window.setTimeout(u,100)}function Ie(){try{const s=sessionStorage.getItem(K),u=sessionStorage.getItem(V);if(u){const i=JSON.parse(u);Array.isArray(i)&&(o.telemetryQueue=i)}if(s){const i=JSON.parse(s);if(i.sessionId){if(o.sessionId=i.sessionId,o.configHash=i.configHash||null,o.worldSequence=i.worldSequence||[],o.seeds=i.seeds||{},o.screen=i.screen||"consent",o.sjtScenarios=i.sjtScenarios||[],o.currentSjtIndex=i.currentSjtIndex||0,o.sjtResponses=i.sjtResponses||{},o.currentWorldIndex=i.currentWorldIndex||0,o.currentMiniGameIndex=i.currentMiniGameIndex||0,o.accessibilityModes=i.accessibilityModes||[],Q(o.accessibilityModes),o.seq=i.seq||1,o.isPaused=i.isPaused||!1,o.telemetryTerminal=i.telemetryTerminal||!1,o.segmentId=(i.segmentId||1)+1,w(o.screen,"segment_start",{segment_id:o.segmentId}),i.activeMiniGameInProgress&&i.screen==="games"){const b=o.worldSequence[o.currentWorldIndex],e=H(b,o.currentMiniGameIndex);w("game","interrupted",{mini_game:e,reason:"page_reload"}),o.currentMiniGameIndex<1?o.currentMiniGameIndex++:(o.currentMiniGameIndex=0,o.currentWorldIndex++),o.activeMiniGameInProgress=!1}return k({immediate:!0}),!0}}}catch(s){console.warn("[Persistence] Error restoring sessionStorage:",s)}return!1}async function R(s,u={}){const i=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",b={"Content-Type":"application/json",...u.headers||{}};return fetch(`${i}${s}`,{...u,headers:b})}function w(s,u,i={},b={},e="mouse",t=null,a=null){const r=performance.now();let m=i,x=b;try{const d=JSON.stringify(i),l=JSON.stringify(b),c=new TextEncoder().encode(d).length+new TextEncoder().encode(l).length;c>4096&&(m={event_oversize:!0,original_size_bytes:c},x={oversized:!0})}catch{}const n={seq:o.seq++,segment_id:o.segmentId,t_ms:r,screen:s,game_world:o.worldSequence[o.currentWorldIndex]||null,mini_game:t,trial:a,action:u,input_type:e,task_def_version:i&&i.task_def_version||"1.0",state:x,data:m};o.telemetryQueue.push(n),k(),(o.telemetryQueue.length>=50||u==="minigame_end"||u==="sjt_complete")&&L()}let B=null,F=50;async function L(){if(!o.sessionId||o.telemetryQueue.length===0||o.telemetryTerminal)return!0;if(B)return B;B=Re();try{return await B}finally{B=null}}async function Re(){if(!o.sessionId||o.telemetryQueue.length===0||o.telemetryTerminal)return!0;const s=o.telemetryQueue.slice(0,F),u=s.map(i=>{const b={...i};return delete b._idbKey,delete b._idbFailed,b});try{const i=await R("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:o.sessionId,events:u})});if(i&&i.status===422){const e=await i.json().catch(()=>({}));if(e.detail&&(e.detail.detail==="events_cap_reached"||e.detail.status==="DATA_LIMITED"))return console.warn("[Telemetry] Terminal event cap reached (50,000). Halting future telemetry flushes."),o.telemetryTerminal=!0,k({immediate:!0}),!0}if(i&&i.status===413)return console.warn("[Telemetry] Batch rejected with HTTP 413 (oversize)."),s.length>1?F=Math.max(1,Math.floor(s.length/2)):console.error("[Telemetry] A single telemetry event exceeds the body limit. It remains queued for recovery."),k({immediate:!0}),!1;if(i&&i.status===403){const e=await i.json().catch(()=>({}));if((typeof e.detail=="string"?e.detail:JSON.stringify(e.detail||"")).toLowerCase().includes("already complete"))return console.info("[Telemetry] Session is already complete on server; draining local queue."),o.telemetryQueue=[],o.telemetryTerminal=!0,k({immediate:!0}),!0}if(!i||!i.ok)throw new Error(i?`HTTP ${i.status}`:"No response");const b=await i.json().catch(()=>({}));return b.result&&b.result.session_status==="COMPLETE"?(o.telemetryQueue.splice(0,s.length),b.result.new_rejected_count>0&&(o.telemetryQueue=[],o.telemetryTerminal=!0),k({immediate:!0}),!0):(o.telemetryQueue.splice(0,s.length),k(),!0)}catch(i){return console.warn("[Telemetry] Flush failed; telemetry remains queued:",i),k({immediate:!0}),!1}}async function Le(s=3){let u=0;for(;!o.telemetryTerminal&&o.telemetryQueue.length>0;){const i=o.telemetryQueue.length;if(!await L()||o.telemetryQueue.length>=i){if(u++,u>=s)return!1;await new Promise(e=>setTimeout(e,600*u))}else u=0}return!0}setInterval(()=>{o.sessionId&&o.telemetryQueue.length>0&&!o.telemetryTerminal&&L()},2500);window.addEventListener("pagehide",()=>{if(k({immediate:!0}),o.sessionId&&o.telemetryQueue.length>0){const s=window.ALFAAZ_API_URL||"",u=JSON.stringify({session_id:o.sessionId,events:o.telemetryQueue.slice(0,F)});navigator.sendBeacon(`${s}/recruit/telemetry`,new Blob([u],{type:"application/json"}))}});document.addEventListener("visibilitychange",()=>{document.hidden?(w(o.screen,"visibility_hidden",{timestamp:Date.now()}),w(o.screen,"tab_hidden",{timestamp:Date.now()}),L()):(w(o.screen,"visibility_visible",{timestamp:Date.now()}),w(o.screen,"tab_visible",{timestamp:Date.now()}))});window.addEventListener("blur",()=>{w(o.screen,"blur",{timestamp:Date.now()})});window.addEventListener("focus",()=>{w(o.screen,"focus",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{Ae(),Ie(),I(),Be()});function Be(){const s=document.getElementById("pauseBtn");s==null||s.addEventListener("click",z);const u=document.getElementById("exitBtn");u==null||u.addEventListener("click",()=>{confirm("Are you sure you wish to exit the volunteer assessment? You can return at any time.")&&(w(o.screen,"candidate_exited"),L(),window.location.href="index.html")})}function z(){o.isPaused?(o.isPaused=!1,w(o.screen,"resume"),o.screen=o.pausedPreviousScreen||"sjt",I()):(o.isPaused=!0,o.pausedPreviousScreen=o.screen,w(o.screen,"pause"),o.screen="paused",I())}function I(){const s=document.getElementById("recruitApp"),u=document.getElementById("sessionHeaderControls"),i=document.getElementById("topProgressBar"),b=document.getElementById("progressBarFill");switch(o.screen!=="consent"&&o.screen!=="complete"&&o.screen!=="paused"?(u==null||u.classList.remove("hidden"),i==null||i.classList.remove("hidden")):(u==null||u.classList.add("hidden"),i==null||i.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),o.screen){case"consent":Pe(s);break;case"identity":Me(s);break;case"accessibility":Oe(s);break;case"warmup":je(s);break;case"sjt":M(s,b);break;case"games":X(s,b);break;case"paused":Ne(s);break;case"complete":Fe(s);break}}function Pe(s){var t;s.innerHTML=`
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
 `;const u=document.getElementById("ageConfirm"),i=document.getElementById("consentAgree"),b=document.querySelector('#consentForm button[type="submit"]'),e=()=>{const a=!!(u!=null&&u.checked&&(i!=null&&i.checked));b==null||b.setAttribute("aria-disabled",String(!a)),b==null||b.classList.toggle("opacity-40",!a)};u==null||u.addEventListener("change",e),i==null||i.addEventListener("change",e),e(),(t=document.getElementById("consentForm"))==null||t.addEventListener("submit",async a=>{a.preventDefault();const r=a.target.querySelector('button[type="submit"]');if((r==null?void 0:r.getAttribute("aria-disabled"))==="true")return;const m=r?r.innerHTML:"Enter the Studio &rarr;";r&&(r.setAttribute("aria-disabled","true"),r.innerHTML="Preparing Workspace...");try{const x=i.checked,n=await R("/recruit/consent",{method:"POST",body:JSON.stringify({choices:{research_telemetry:x}})});if(!n.ok)throw new Error(`Network error: ${n.status}`);const d=await n.json();o.sessionId=d.session_id,o.configHash=d.config_hash||null,o.worldSequence=d.world_sequence||[],o.seeds=d.seeds||{},k({immediate:!0}),L(),o.screen="identity",I()}catch(x){alert(`Unable to initialize session: ${x.message||"Please check connection."}`),console.error(x),r&&(r.innerHTML=m,r.setAttribute("aria-disabled","false"))}})}function Me(s){var u;s.innerHTML=`
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
 `,(u=document.getElementById("identityForm"))==null||u.addEventListener("submit",async i=>{i.preventDefault();const b=i.target.querySelector('button[type="submit"]'),e=b?b.innerHTML:"Begin Session &rarr;";b&&(b.disabled=!0,b.innerHTML="Connecting...");try{const t=await R("/recruit/identity",{method:"POST",body:JSON.stringify({session_id:o.sessionId,full_name:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim()})});if(!t||!t.ok){const a=t?await t.json().catch(()=>({})):{};throw new Error(a.detail||(t?`Server returned ${t.status}`:"No response from server"))}o.screen="accessibility",w("identity","identity_submitted"),k({immediate:!0}),I()}catch(t){alert(`Unable to continue: ${t.message||"Please check connection."}`),b&&(b.disabled=!1,b.innerHTML=e)}})}function Q(s=[]){if(typeof document>"u"||!document.documentElement)return;const u=document.documentElement;u.classList.toggle("a11y-high-contrast",s.includes("high_contrast")),u.classList.toggle("a11y-dyslexia-font",s.includes("dyslexia_font")),u.classList.toggle("a11y-reduced-motion",s.includes("reduced_motion"))}function Oe(s){var i;const u=o.accessibilityModes||[];s.innerHTML=`
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
 <input type="checkbox" id="a11y_contrast" class="mt-1 accent-[#bd6f5d]" ${u.includes("high_contrast")?"checked":""}>
 <div>
 <div class="text-sm font-medium text-[var(--text-primary)]">High Contrast Display</div>
 <div class="text-xs text-black mt-0.5">Increases text contrast, element borders, and background separation for clearer visibility.</div>
 </div>
 </label>
 <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
 <input type="checkbox" id="a11y_dyslexia" class="mt-1 accent-[#bd6f5d]" ${u.includes("dyslexia_font")?"checked":""}>
 <div>
 <div class="text-sm font-medium text-[var(--text-primary)]">Dyslexia-Friendly Typography</div>
 <div class="text-xs text-black mt-0.5">Applies a high-legibility sans-serif typeface with enhanced letter and line spacing.</div>
 </div>
 </label>
 <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
 <input type="checkbox" id="a11y_motion" class="mt-1 accent-[#bd6f5d]" ${u.includes("reduced_motion")?"checked":""}>
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
 `,(i=document.getElementById("saveA11yBtn"))==null||i.addEventListener("click",async b=>{var a,r,m;const e=b.currentTarget;if(e.disabled)return;e.disabled=!0,e.textContent="Saving...";const t=[];(a=document.getElementById("a11y_contrast"))!=null&&a.checked&&t.push("high_contrast"),(r=document.getElementById("a11y_dyslexia"))!=null&&r.checked&&t.push("dyslexia_font"),(m=document.getElementById("a11y_motion"))!=null&&m.checked&&t.push("reduced_motion"),o.accessibilityModes=t,Q(t);try{await R("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:o.sessionId,modes_enabled:t})})}catch(x){console.warn("Accessibility preferences save error:",x)}o.screen="warmup",w("accessibility","preferences_saved",{modes:t}),k({immediate:!0}),I()})}function je(s){let u=[],i=performance.now();s.innerHTML=`
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
 `;const b=document.getElementById("tapTarget"),e=document.getElementById("warmupStatus");b==null||b.addEventListener("click",async()=>{u.push(performance.now());const t=u.length;if(b.textContent=`Tap (${t}/3)`,e.textContent=`Recorded tap ${t} of 3`,t>=3){b.setAttribute("disabled","true"),b.classList.add("opacity-50");const a=[u[1]-u[0],u[2]-u[1]],r=(a[0]+a[1])/2,m=performance.now()-i;try{await R("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:o.sessionId,tap_latency_baseline_ms:r,reading_dwell_baseline_ms:m,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(n){console.warn("Warmup save error:",n)}w("warmup","warmup_completed",{avgLatency:r,readingDwell:m});async function x(){var n;s.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="waiting-spinner"></div>
 <h2 class="text-xl text-[var(--text-primary)]">Loading Scenarios...</h2>
 <p class="text-xs text-black max-w-sm mx-auto leading-relaxed">
 Connecting to the assessment server. This may take a few moments if starting from cold.
 </p>
 </div>
 `;try{const d=await R("/recruit/sjt/public");if(!d||!d.ok)throw new Error(d?`Server returned HTTP ${d.status}`:"Network timeout");const l=await d.json();o.sjtScenarios=l.scenarios||[],o.currentSjtIndex=0,o.screen="sjt",k({immediate:!0}),I()}catch(d){console.warn("Failed to load SJT payload:",d),s.innerHTML=`
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
 `,(n=document.getElementById("retrySjtLoadBtn"))==null||n.addEventListener("click",()=>{x()})}}x()}})}function M(s,u){var x;const i=o.sjtScenarios[o.currentSjtIndex];if(!i){J();return}const b=o.sjtScenarios.length,e=o.currentSjtIndex+1;u&&(u.style.width=`${(e-1)/21*100}%`);const t=document.getElementById("segmentProgress");if(t){const n=Math.max(1,Math.round(((b-e+1)*35+448)/60));t.innerHTML=`<span class="text-black hidden sm:inline mr-2 text-[10px] sm:text-xs font-normal">About ${n} mins remaining</span><span>Judgment ${e} / ${b}</span>`}const a=o.sjtResponses[i.id]||null,r=i.options.map(n=>`
 <div class="option-card min-h-[48px] ${a===n.id?"selected":""}" data-opt-id="${n.id}" tabindex="0" role="button" aria-label="Option ${n.id.slice(-1)}">
 <span class="text-sm font-semibold text-[var(--accent-gold)] shrink-0">${n.id.slice(-1)}.</span>
 <span class="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">${n.text}</span>
 </div>
 `).join("");s.innerHTML=`
 <div class="space-y-5 ">
 <!-- Top Context and Step -->
 <div class="border-b border-[var(--grid-border)] pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1">
 <div>
 <span class="act-badge">Judgment ${e} of ${b}</span>
 <span class="act-title-ur ">${i.act_title_ur||""}</span>
 <h2 class="text-xl sm:text-2xl text-[var(--text-primary)] mt-0.5">${i.act_title_en}</h2>
 </div>
 <div class="text-[11px] sm:text-xs text-[var(--accent-gold)] uppercase tracking-wider font-medium">
 Section 1 &middot; ${e} of ${b}
 </div>
 </div>

 <!-- YOUR TASK -->
 <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-xs text-xs text-[var(--text-primary)] flex items-center gap-2">
 <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block shrink-0"></span>
 <span><strong>Your Task:</strong> Read the situation below and choose what you would do.</span>
 </div>

 <!-- SITUATION -->
 <div class="scenario-text text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-4 sm:p-5 border border-[var(--grid-border)] rounded-xs">
 ${i.setup}
 </div>

 <!-- YOUR CHOICE -->
 <div class="space-y-2.5">
 <div class="text-[11px] uppercase tracking-wider text-black font-medium">Choose one response:</div>
 ${r}
 </div>

 <!-- PRIMARY ACTION -->
 <div class="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[var(--grid-border)]">
 <span class="text-xs text-black order-2 sm:order-1 text-[11px]">Tip: Press keys 1-4 to choose</span>
 <button id="nextSjtBtn" ${a?"":"disabled"} class="w-full sm:w-auto min-h-[44px] px-7 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] shadow-sm rounded-xs order-1 sm:order-2">
 ${e===b?"Complete Judgment Section &rarr;":"Next Scenario &rarr;"}
 </button>
 </div>
 </div>
 `,w("sjt","scenario_displayed",{scenario_id:i.id,index:e}),s.querySelectorAll(".option-card").forEach(n=>{n.addEventListener("click",()=>{const d=n.getAttribute("data-opt-id");o.sjtResponses[i.id]=d,w("sjt","option_selected",{scenario_id:i.id,option_id:d}),M(s,u)})}),(x=document.getElementById("nextSjtBtn"))==null||x.addEventListener("click",()=>{o.sjtResponses[i.id]&&(o.currentSjtIndex++,M(s,u))});const m=n=>{if(["1","2","3","4"].includes(n.key)){const d=parseInt(n.key)-1;i.options[d]&&(o.sjtResponses[i.id]=i.options[d].id,w("sjt","option_selected_key",{scenario_id:i.id,option_id:i.options[d].id}),M(s,u))}};window.onkeydown=m}let j=!1;async function J(){if(j)return;j=!0,window.onkeydown=null;const s=document.getElementById("recruitApp");s&&(s.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="waiting-spinner"></div>
 <h2 class="text-xl text-[var(--text-primary)]">Saving Judgments...</h2>
 <p class="text-xs text-black">Recording your situation judgments to your session profile.</p>
 </div>
 `);try{const u=await R("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:o.sessionId,responses:o.sjtResponses})});if(!u||!u.ok)throw new Error(u?`Server returned HTTP ${u.status}`:"Connection failed");o.screen="games",o.currentWorldIndex=0,o.currentMiniGameIndex=0,w("sjt","sjt_complete",{response_count:Object.keys(o.sjtResponses).length}),k({immediate:!0}),I()}catch(u){if(console.warn("SJT submit error:",u),s){s.innerHTML=`
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
 `;const i=document.getElementById("retrySjtSubmitBtn");i&&i.addEventListener("click",()=>{i.disabled=!0,i.textContent="Submitting...",J()})}}finally{j=!1}}function X(s,u){const i=o.worldSequence[o.currentWorldIndex];if(!i||o.currentWorldIndex>=o.worldSequence.length){Z();return}o.activeMiniGameInProgress=!0,k({immediate:!0});const b=o.currentWorldIndex*2+o.currentMiniGameIndex+1,e=14,t=document.getElementById("segmentProgress");if(t){const a=e-b+1,r=Math.max(1,Math.round(a*32/60));t.innerHTML=`<span class="text-black hidden sm:inline mr-2 text-[10px] sm:text-xs font-normal">About ${r} min${r>1?"s":""} remaining</span><span>Activities ${b} / ${e}</span>`}if(u){const a=7+(b-1);u.style.width=`${a/21*100}%`}$e({appContainer:s,worldCode:i,worldIndex:o.currentWorldIndex,miniGameIndex:o.currentMiniGameIndex,seeds:o.seeds,logEvent:(a,r,m,x)=>{const n=H(i,o.currentMiniGameIndex);w("game",a,r,m,x,n)},onMiniGameComplete:a=>{o.activeMiniGameInProgress=!1;const r=H(i,o.currentMiniGameIndex);w("game","minigame_end",a,{},"mouse",r),L(),o.currentMiniGameIndex<1?o.currentMiniGameIndex++:(o.currentMiniGameIndex=0,o.currentWorldIndex++),k({immediate:!0}),X(s,u)}})}function H(s,u){const i=O&&O[s];if(i&&i[u])return i[u];const b={W1:["F1","F2"],W2:["A1","A2"],W3:["C1","C2"],W4:["E1","E2"],W5:["Q1","Q2"],W6:["CR1","CR3"],W7:["M1","M2"]};return b[s]&&b[s][u]||"MG"}let P=!1;function Y(s,u){if(!s)return;s.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[var(--text-primary)] flex items-center justify-center mx-auto text-xl ">!</div>
 <h2 class="text-2xl text-[var(--text-primary)]">Connection Notice</h2>
 <p class="text-xs text-black max-w-md mx-auto leading-relaxed">${u}</p>
 <div class="pt-2">
 <button id="retryFinalizationBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] shadow-sm rounded-xs">Retry Finalization &rarr;</button>
 </div>
 </div>
 `;const i=document.getElementById("retryFinalizationBtn");i&&i.addEventListener("click",()=>{i.disabled=!0,i.textContent="Connecting...",Z()})}async function Z(){if(P)return;P=!0,o.activeMiniGameInProgress=!1,k({immediate:!0});const s=document.getElementById("recruitApp");s&&(s.innerHTML=`
 <div class="space-y-6 text-center py-16 ">
 <div class="waiting-spinner"></div>
 <h2 id="finalizingHeading" class="text-2xl text-[var(--text-primary)]">Synchronizing activity...</h2>
 <p id="finalizingSubtext" class="text-xs text-black">Saving your completed activity... Please keep this page open.</p>
 </div>
 `);const u=i=>{["Enter"," ","Spacebar"].includes(i.key)&&i.preventDefault()};window.addEventListener("keydown",u,{capture:!0});try{if(!await Le()){window.removeEventListener("keydown",u,{capture:!0}),P=!1,Y(s,"Connection could not be confirmed. Your saved activity has not been discarded. You can retry.");return}const b=document.getElementById("finalizingHeading"),e=document.getElementById("finalizingSubtext");b&&(b.textContent="Finalizing assessment..."),e&&(e.textContent="Saving your completed activity... Please keep this page open.");let t=null;for(let r=0;r<3;r++){try{if(t=await R("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:o.sessionId})}),t&&t.ok)break}catch(m){if(r===2)throw m}await new Promise(m=>setTimeout(m,1e3*(r+1)))}if(!t||!t.ok)throw new Error(t?`Server returned HTTP ${t.status}`:"No response from server");const a=await t.json().catch(()=>({}));if(a.status==="SUCCESS"||a.session_status==="COMPLETE"||a.is_already_completed){window.removeEventListener("keydown",u,{capture:!0}),o.screen="complete",o.telemetryTerminal=!0,o.telemetryQueue=[],k({immediate:!0}),I();return}throw new Error("Unexpected completion status")}catch(i){window.removeEventListener("keydown",u,{capture:!0}),console.warn("Session complete submission error:",i),Y(s,"The final session confirmation was not received. Your saved activity has not been discarded. You can retry.")}finally{window.removeEventListener("keydown",u,{capture:!0}),P=!1}}function Ne(s){var u;s.innerHTML=`
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
 `,(u=document.getElementById("resumeBtn"))==null||u.addEventListener("click",z)}function Fe(s){s.innerHTML=`
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
