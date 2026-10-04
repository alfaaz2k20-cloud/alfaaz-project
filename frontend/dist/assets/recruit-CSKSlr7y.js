import"./global-DxYxv3W5.js";/* empty css               */function te(i,r){const{appContainer:a,miniGameIndex:m,gameId:b,logEvent:e,onMiniGameComplete:t}=i,s=b||(m===0?"A1":m===1?"A2":"A3");s==="A1"?ae(a,r,e,t):s==="A2"?se(a,r,e,t):ie(a,r,e,t)}function ae(i,r,a,m){let b=!0,e=0,t=!1,s="mouse";const p=[{id:"DOC_01",title:"Old Calligraphy Book (1842)",rule_prompt:"Sorting Rule: Sort by Century",tags:["Year: 1842","19th Century","Handmade Paper","Poem Verse"]},{id:"DOC_02",title:"Poetry Song Book",rule_prompt:"Sorting Rule: Sort by Type",tags:["Type: Poetry","Song Verses","Urdu","Paper Pages"]},{id:"DOC_03",title:"Exhibition Visitor Book (1924)",rule_prompt:"Sorting Rule: Sort by Century",tags:["Year: 1924","20th Century","Visitor List","Signatures"]},{id:"DOC_04",title:"Lal Ded Verses in Kashmiri",rule_prompt:"Sorting Rule: Sort by Language",tags:["Language: Kashmiri","Wise Verses","Local Poetry"]},{id:"DOC_05",title:"History Book of Kashmir Artists",rule_prompt:"Sorting Rule: Sort by Type",tags:["Type: History","Artist Stories","Life Records"]}],c=[{id:"19th_century",label:"19th Century Shelf",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},{id:"20th_century",label:"20th Century Shelf",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{id:"poetry",label:"Poetry Shelf",icon:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"},{id:"chronicle",label:"History Shelf",icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},{id:"kashmiri",label:"Kashmiri Language Shelf",icon:"M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"}];function l(){var x;if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Manuscript Folios","Sort each historical page onto its proper shelf.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',goal:"File each document onto the correct shelf across 5 rounds.",steps:["Check the date and description on each document card.","Click the matching shelf to file it.","Open the shelf guide anytime if you need a reminder."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,performance.now(),l()});return}if(e>=p.length){m({mini_game:"A1",observations_count:p.length});return}const n=p[e];performance.now(),i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 2: The Archive</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Manuscript Folios</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Sort each historical page onto its proper shelf.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="flex justify-between items-center mb-1">
            <span class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold">Your Task</span>
            <span class="text-xs text-[var(--accent-gold)] font-sans font-medium">${n.rule_prompt}</span>
          </div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Examine this page. Pick the shelf that matches the active sorting rule.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected">
          <div class="flex justify-between items-start mb-2">
            <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase font-medium">Folio ${e+1} of ${p.length}</span>
            <button id="guideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-2.5 py-1 hover:bg-amber-50 interactive-option flex items-center gap-1.5 rounded-xs min-h-[32px]" tabindex="0">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ${t?"Close Guide":"Shelf Guide"}
            </button>
          </div>

          <div id="guideModal" class="${t?"":"hidden"} p-3 mb-3 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] space-y-1 rounded-xs">
            <div>• <strong>Century Rule:</strong> Sort by century made (19th vs 20th Century).</div>
            <div>• <strong>Type Rule:</strong> Sort by content type (Poetry vs History).</div>
            <div>• <strong>Language Rule:</strong> Sort by language (Kashmiri).</div>
          </div>

          <h3 class="text-base sm:text-lg font-serif text-[var(--text-primary)] font-medium mt-1 mb-2.5">${n.title}</h3>
          <div class="flex flex-wrap gap-2">
            ${n.tags.map(u=>`<span class="px-2.5 py-1 bg-[#faf8f5] border border-[var(--grid-border)] text-xs text-[var(--text-secondary)] rounded-xs">${u}</span>`).join("")}
          </div>
        </div>

        <!-- INTERACTION AREA -->
        <div class="mb-4 candidate-content-protected">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-sans">Select Destination Shelf:</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            ${c.map(u=>`
              <button type="button" class="folder-btn p-3.5 bg-white border border-[var(--grid-border)] text-xs font-semibold  hover:bg-amber-50/40 interactive-option text-left shadow-xs flex items-center gap-2.5 rounded-xs min-h-[48px]" data-folder="${u.id}" tabindex="0">
                <svg class="w-4 h-4 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${u.icon}"></path></svg>
                <span class="text-[var(--text-primary)]">${u.label}</span>
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Page ${e+1} of ${p.length}
        </div>
      </div>
    `,a("item_presented",{trial_index:e,stimulus_id:n.id,task_def_version:"1.0"}),(x=document.getElementById("guideBtn"))==null||x.addEventListener("click",()=>{t=!t,l(),a("guide_viewed",{trial_index:e,stimulus_id:n.id,task_def_version:"1.0"})}),i.querySelectorAll(".folder-btn").forEach(u=>{const o=v=>{s=v;const f=u.getAttribute("data-folder");a("item_sorted",{trial_index:e,stimulus_id:n.id,choice:f,input_modality:s,task_def_version:"1.0"}),e++,l()};u.addEventListener("click",()=>o("mouse")),u.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),o("keyboard"))})})}l()}function se(i,r,a,m){let b=!0,e=0,t=null,s="mouse";const p=[{stimulus_id:"EXC_01",title:"Kashmiri Poetry Page with Water Wear",anomaly_description:'Water fading on lower margin. The accession year stamp is blurred and appears as "18--".',type_note:"Physical Damage & Blurred Year"},{stimulus_id:"EXC_02",title:"Clean Persian Calligraphy Page (1890)",anomaly_description:"Intact rag fiber paper, clear black ink, and standard accession stamp intact. No physical blemishes.",type_note:"Standard Page Inspection"},{stimulus_id:"EXC_03",title:"Loose Book Page with Number Jump",anomaly_description:"Binding threads severed. Margin numbering skips from Folio 14 directly to Folio 19 with missing text catchword.",type_note:"Missing Pages & Loose Thread"},{stimulus_id:"EXC_04",title:"Illustrated Story Page with Split Binding",anomaly_description:"Double folio split across signature gutter with inverted seal impressions and mismatched accession notation.",type_note:"Broken Spine & Upside-Down Seal"}],c=[{id:"flag_exception",title:"Flag for Special Repair",desc:"Place page in a protective sleeve for careful repair by a conservator.",tag:"Special Repair"},{id:"file_standard",title:"Place on Regular Shelf",desc:"Place page directly onto the standard open shelves.",tag:"Regular Shelf"},{id:"defer_review",title:"Hold in Storage Box",desc:"Hold page safely in storage until more background notes arrive.",tag:"Hold in Box"}];function l(){if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Fragile Leaf","Examine the page condition and choose a handling step.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',goal:"Check the condition of 4 pages and choose how to handle them.",steps:["Look at the condition notes on the page.","Decide if the page is clean or damaged.","Choose whether to file normally, quarantine for repair, or consult."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=null,l()});return}const n=p[e],x=c.find(o=>o.id===t);i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 2: The Archive</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Fragile Leaf</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Examine page condition and choose a handling step.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read the page condition notes below. Choose the best handling option.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-5 bg-white border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] tracking-widest text-[#bd6f5d] uppercase font-semibold">Manuscript Folio ${e+1} of 4</span>
            <span class="text-[10px] text-[var(--text-secondary)] uppercase bg-[#faf8f5] px-2 py-0.5 border border-[var(--grid-border)] rounded-xs font-medium">${n.type_note}</span>
          </div>
          <h3 class="text-base font-serif text-[var(--text-primary)] font-medium mb-1.5">${n.title}</h3>
          <p class="text-xs text-[var(--text-secondary)] leading-relaxed bg-[#faf8f5] p-3 border border-[var(--grid-border)]/60 rounded-xs">
            ${n.anomaly_description}
          </p>
        </div>

        <!-- INTERACTION AREA -->
        <div class="space-y-2.5 mb-4 candidate-content-protected">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 font-sans">Choose handling action:</div>
          ${c.map(o=>`
            <div class="a2-opt p-3.5 bg-white border ${t===o.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer  interactive-option rounded-xs min-h-[52px]" data-action="${o.id}" tabindex="0" role="button">
              <div class="flex justify-between items-center mb-0.5">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${t===o.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                  ${o.title}
                </div>
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-3.5">${o.desc}</div>
            </div>
          `).join("")}
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${x==null?void 0:x.title}</strong>`:"Select an option above to continue."}</span>
          <span class="text-[10px] text-stone-400 font-sans">${e+1} / 4</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button id="a2ConfirmBtn" ${t?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
            ${e<3?"Confirm Handling Decision &rarr;":"Finish Page Evaluation &rarr;"}
          </button>
        </div>
      </div>
    `,a("item_presented",{trial_index:e,stimulus_id:n.stimulus_id,task_def_version:"1.0"});const u=document.getElementById("a2ConfirmBtn");i.querySelectorAll(".a2-opt").forEach(o=>{const v=f=>{s=f,t=o.getAttribute("data-action"),l()};o.addEventListener("click",()=>v("mouse")),o.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),v("keyboard"))})}),u==null||u.addEventListener("click",()=>{a("decision_logged",{trial_index:e,stimulus_id:n.stimulus_id,action_id:t,input_modality:s,task_def_version:"1.0"}),e<3?(e++,t=null,l()):m({mini_game:"A2",observations_count:4})})}l()}function ie(i,r,a,m){let b=!0,e=new Set,t=new Set,s="mouse";const p=[{id:"REC_01",title:"Card 1: Habba Khatoon Poem",text:"Poet: Habba Khatoon | Era: 16th Century | Birthplace: Chandhara (Recorded as: Chanhadra)",note:"Folio Label Verification"},{id:"REC_02",title:"Card 2: Carved Walnut Pen Box",text:"Artifact: Carved Walnut Calligraphy Pen Box | Dimensions: 24 cm x 6 cm | Medium: Seasoned Walnut",note:"Object Metadata Verification"},{id:"REC_03",title:"Card 3: River Verse Excerpt",text:`Verse Excerpt: "The river remembers the boatman's song" | Translator: [Not Specified / Blank]`,note:"Folio Label Verification"},{id:"REC_04",title:"Card 4: Kashmiri Vakh Lyric Leaf",text:"Folio Leaf: Kashmiri Vakh Lyric Leaf | Script: Sharda & Persian | Accession: AR-1892",note:"Manuscript Leaf Verification"},{id:"REC_05",title:"Card 5: Exhibition Opening Notice",text:"Exhibition Opening Reception: February 31st, 2026 | Location: Main Pavilion",note:"Public Schedule Verification"}];function c(){var l;if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Exhibition Ledger","Review 5 display cards for factual mistakes.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',goal:"Carefully proofread all 5 display records. Flag only those with clear errors.",steps:["Read each display card carefully.","Click the flag button on any card that contains an error.","Clean cards should remain unflagged.","Click verify when finished."]})}
        </div>
      `,k(i,()=>{b=!1,e=new Set,t=new Set,c()});return}i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 2: The Archive</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Exhibition Ledger</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Proofread all 5 display cards. Flag any card that has an error.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read all 5 display cards. Click flag if a card has a mistake. Leave clean cards unflagged.
          </div>
        </div>

        <!-- LOOK AT THIS & INTERACTION AREA -->
        <div class="space-y-3 mb-5 candidate-content-protected">
          ${p.map((n,x)=>{const u=e.has(n.id);return`
              <div class="record-card p-4 bg-white border ${u?"border-[#bd6f5d] bg-amber-50/20":"border-[var(--grid-border)]"} rounded-xs interactive-option shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" data-id="${n.id}" tabindex="0">
                <div class="space-y-1 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Ledger Card ${x+1} of 5</span>
                  </div>
                  <div class="text-xs font-semibold text-[var(--text-primary)]">${n.title}</div>
                  <div class="text-xs text-[var(--text-secondary)] leading-relaxed bg-[#faf8f5] p-2.5 border border-[var(--grid-border)]/60 rounded-xs mt-1">
                    ${n.text}
                  </div>
                </div>

                <button type="button" class="toggle-flag-btn px-4 py-2.5 border text-xs font-sans uppercase tracking-wider shrink-0 interactive-option rounded-xs min-h-[44px] w-full sm:w-auto ${u?"bg-[#bd6f5d] text-white border-[#bd6f5d]":"bg-white text-[var(--text-secondary)] border-[var(--grid-border)] "}" data-id="${n.id}">
                  ${u?"Mistake Flagged ✓":"Flag Mistake"}
                </button>
              </div>
            `}).join("")}
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>Cards flagged: <strong class="text-[var(--text-primary)]">${e.size} of 5</strong></span>
          <span class="text-[10px] text-stone-400 font-sans">Clean cards remain unflagged</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button id="a3SubmitBtn" class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] interactive-option shadow-sm rounded-xs min-h-[44px]">
            Verify and Complete World 2 &rarr;
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".record-card").forEach((n,x)=>{const u=n.getAttribute("data-id"),o=()=>{t.has(u)||(t.add(u),a("record_inspected",{trial_index:x,stimulus_id:u,task_def_version:"1.0"}))};n.addEventListener("focus",o),n.addEventListener("mouseenter",o)}),i.querySelectorAll(".toggle-flag-btn").forEach((n,x)=>{const u=n.getAttribute("data-id"),o=v=>{s=v;const f=!e.has(u);f?e.add(u):e.delete(u),a("discrepancy_toggled",{trial_index:x,stimulus_id:u,flagged_state:f,input_modality:s,task_def_version:"1.0"}),c()};n.addEventListener("click",()=>o("mouse")),n.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),o("keyboard"))})}),(l=document.getElementById("a3SubmitBtn"))==null||l.addEventListener("click",()=>{a("verification_finalized",{action_id:"approve_ledger",input_modality:s,task_def_version:"1.0"}),m({mini_game:"A3",observations_count:p.length})})}c()}function re(i,r){const{appContainer:a,miniGameIndex:m,gameId:b,logEvent:e,onMiniGameComplete:t}=i,s=b||(m===0?"F1":m===1?"F2":"F3");s==="F1"?ne(a,r,e,t):s==="F2"?oe(a,r,e,t):de(a,r,e,t)}function ne(i,r,a,m){let b=!0,e=0,t=50,s="accommodate",p="mouse",c=null;const l=[{stimulus_id:"F1_T1",title:"Sound Note: Sharp Echo",cue_text:'"Front row sound has sharp treble and heavy wall echo."',default_action:"accommodate"},{stimulus_id:"F1_T2",title:"Sound Note: Clear Hall",cue_text:'"Center hall sound is clear, balanced, and easy to hear."',default_action:"maintain_objective"},{stimulus_id:"F1_T3",title:"Sound Note: Quiet Whisper",cue_text:'"The speaker is reciting a whisper. Words are hard to hear."',default_action:"accommodate"},{stimulus_id:"F1_T4",title:"Sound Note: Sudden Silence",cue_text:'"A sudden quiet pause. Could be a dramatic silence or equipment issue."',default_action:"clarify"},{stimulus_id:"F1_T5",title:"Sound Note: Group Singing",cue_text:'"Group singing is steady and balanced across the entire room."',default_action:"maintain_objective"},{stimulus_id:"F1_T6",title:"Sound Note: Loud Voice Peak",cue_text:`"The speaker's voice peaks loudly on strong dramatic verse lines."`,default_action:"accommodate"}];function n(){var q;if(c&&(cancelAnimationFrame(c),c=null),b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("Tuning the Hall","Adjust the hall sound to support the poetry reading.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>',goal:"Balance the room sound for the reading across 6 rounds.",steps:["Read the sound note from the hall.","Choose what to do: Adjust, Keep, or Check.","Move the volume slider if needed, then click Confirm."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=50,s="accommodate",n()});return}const x=l[e];i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 1: The Frequency</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">Tuning the Hall</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Adjust the hall sound to support the poetry reading.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read the sound note below. Pick your response and move the slider.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold">${x.title}</div>
              <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${x.cue_text}</div>
            </div>
          </div>
        </div>

        <!-- INTERACTION AREA -->
        <div class="mb-5 candidate-content-protected">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-sans">1. Choose your response:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${s==="accommodate"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)] bg-white "}" data-action="accommodate">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${s==="accommodate"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                Adjust Sound
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">Change the sound setting to help the speaker.</div>
            </button>
            <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${s==="maintain_objective"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)] bg-white "}" data-action="maintain_objective">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${s==="maintain_objective"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                Keep Baseline
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">Leave the current sound setting as it is.</div>
            </button>
            <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${s==="clarify"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)] bg-white "}" data-action="clarify">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${s==="clarify"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                Check Channel
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">Check the audio signal before changing settings.</div>
            </button>
          </div>
        </div>

        <!-- Slider Area -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-inner candidate-content-protected">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-sans text-center">2. Adjust sound level:</div>
          <canvas id="waveCanvas" width="600" height="80" class="w-full h-20 bg-white border border-[var(--grid-border)] mb-4 rounded-xs"></canvas>

          <div class="w-full max-w-md mx-auto">
            <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-600 inline-block"></span> Soft (0)</span>
              <span class="font-sans text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)] rounded-xs" id="sliderValDisplay">${t}</span>
              <span class="flex items-center gap-1">Bright (100) <span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span></span>
            </div>
            <input type="range" id="freqSlider" min="0" max="100" step="5" value="${t}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg min-h-[44px]">
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>Your setting: <strong class="text-[var(--text-primary)]" id="choiceSummary">${s==="accommodate"?"Adjust Sound":s==="maintain_objective"?"Keep Baseline":"Check Channel"} (Level: ${t})</strong></span>
          <span class="text-[10px] text-stone-400 font-sans">${e+1} / 6</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button id="lockFreqBtn" class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] interactive-option shadow-sm rounded-xs flex items-center justify-center gap-2 min-h-[44px]">
            ${e<5?"Confirm Setting &rarr;":"Finish Sound Setup &rarr;"}
          </button>
        </div>
      </div>
    `;const u=document.getElementById("waveCanvas"),o=u==null?void 0:u.getContext("2d"),v=document.getElementById("freqSlider"),f=document.getElementById("sliderValDisplay"),h=document.getElementById("choiceSummary");let g=0;function y(){if(!o||!u)return;o.clearRect(0,0,u.width,u.height),o.strokeStyle="#f0eeea",o.lineWidth=1;for(let A=0;A<u.width;A+=30)o.beginPath(),o.moveTo(A,0),o.lineTo(A,u.height),o.stroke();o.strokeStyle="#bd6f5d",o.lineWidth=2.5,o.beginPath();const E=.015+t/100*.05,R=14+Math.abs(t-50)/50*16;for(let A=0;A<u.width;A++){const I=u.height/2+Math.sin(A*E+g)*R;A===0?o.moveTo(A,I):o.lineTo(A,I)}o.stroke(),g+=.04,c=requestAnimationFrame(y)}y(),i.querySelectorAll(".f1-action-btn").forEach(E=>{E.addEventListener("click",()=>{var R,A;if(p="mouse",s=E.getAttribute("data-action"),i.querySelectorAll(".f1-action-btn").forEach(I=>{var G,U;I.classList.remove("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),I.classList.add("border-[var(--grid-border)]","bg-white"),(G=I.querySelector("span.rounded-full"))==null||G.classList.remove("bg-[var(--accent-gold)]"),(U=I.querySelector("span.rounded-full"))==null||U.classList.add("bg-stone-300")}),E.classList.add("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),E.classList.remove("border-[var(--grid-border)]","bg-white"),(R=E.querySelector("span.rounded-full"))==null||R.classList.add("bg-[var(--accent-gold)]"),(A=E.querySelector("span.rounded-full"))==null||A.classList.remove("bg-stone-300"),h){const I=s==="accommodate"?"Adjust Sound":s==="maintain_objective"?"Keep Baseline":"Check Channel";h.textContent=`${I} (Level: ${t})`}})});let _=0,C=null;const O=(E,R)=>{a("slider_input",{trial_index:e,stimulus_id:x.stimulus_id,slider_position_raw:E,input_modality:R,task_def_version:"1.0"}),_=Date.now()};v==null||v.addEventListener("input",E=>{if(p=E.pointerType||"mouse",t=parseInt(E.target.value,10),f&&(f.textContent=t),h){const A=s==="accommodate"?"Adjust Sound":s==="maintain_objective"?"Keep Baseline":"Check Channel";h.textContent=`${A} (Level: ${t})`}const R=Date.now();R-_>=100?(C&&(clearTimeout(C),C=null),O(t,p)):C||(C=setTimeout(()=>{O(t,p),C=null},100-(R-_)))}),v==null||v.addEventListener("change",()=>{C&&(clearTimeout(C),C=null),O(t,p)}),v==null||v.addEventListener("keydown",E=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(E.key)&&(p="keyboard")}),(q=document.getElementById("lockFreqBtn"))==null||q.addEventListener("click",()=>{C&&(clearTimeout(C),C=null),c&&(cancelAnimationFrame(c),c=null),a("trial_submit",{trial_index:e,stimulus_id:x.stimulus_id,action_id:s,slider_position_raw:t,input_modality:p,task_def_version:"1.0"}),e<5?(e++,t=50,s=l[e].default_action,n()):m({mini_game:"F1",observations_count:6})})}n()}function oe(i,r,a,m){let b=!0,e=0,t=null,s="mouse";const p=[{stimulus_id:"F2_T1",speaker_role:"Stage Lead",cue_text:'"The poet gestures toward the side speaker, asking for sound help."',condition_label:"Direct Request"},{stimulus_id:"F2_T2",speaker_role:"Hall Helper",cue_text:'"The speaker pauses with an uncertain look. No words are spoken."',condition_label:"Ambiguous Signal"},{stimulus_id:"F2_T3",speaker_role:"Sound Helper",cue_text:'"The performer sings with intense emotion as part of the poem."',condition_label:"Expressive Intensity"},{stimulus_id:"F2_T4",speaker_role:"Guest Drummer",cue_text:'"The drum player slowed tempo and watches the speaker closely."',condition_label:"Subtle Drift"}],c=[{id:"act",title:"Act Directly",desc:"Take action right away to help the speaker."},{id:"clarify",title:"Ask for Clarity",desc:"Check with the speaker before making any changes."},{id:"maintain",title:"Keep Course",desc:"Stay on course without stepping in too early."}];function l(){var o;if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Gathering Voices","Coordinate sound with your hall team.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>',goal:"Respond to teammate messages across 4 rounds.",steps:["Read the message from your teammate.","Choose your next step: Act, Ask, or Keep Course.","Click Confirm to save your choice."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=null,l()});return}const n=p[e];i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 1: The Frequency</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Gathering Voices</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Coordinate sound with your hall team.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read the message from your teammate. Pick the best response below.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold">${n.speaker_role}</div>
              <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${n.cue_text}</div>
            </div>
          </div>
        </div>

        <!-- INTERACTION AREA -->
        <div class="mb-4 candidate-content-protected">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-sans">Pick your response:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${c.map(v=>`
              <div class="f2-card p-4 bg-white border ${t===v.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer  interactive-option space-y-1.5 rounded-xs min-h-[56px]" data-action="${v.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${t===v.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                  ${v.title}
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${v.desc}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span id="f2ChoiceText">${t?`You selected: <strong class="text-[var(--text-primary)]">${(o=c.find(v=>v.id===t))==null?void 0:o.title}</strong>`:"Select an option above to continue."}</span>
          <span class="text-[10px] text-stone-400 font-sans">${e+1} / 4</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button id="f2ConfirmBtn" ${t?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
            ${e<3?"Confirm Choice &rarr;":"Finish Team Coordination &rarr;"}
          </button>
        </div>
      </div>
    `;const x=document.getElementById("f2ConfirmBtn"),u=document.getElementById("f2ChoiceText");i.querySelectorAll(".f2-card").forEach(v=>{const f=h=>{var g,y;if(s=h,t=v.getAttribute("data-action"),i.querySelectorAll(".f2-card").forEach(_=>{var C,O;_.classList.remove("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),_.classList.add("border-[var(--grid-border)]"),(C=_.querySelector("span.rounded-full"))==null||C.classList.remove("bg-[var(--accent-gold)]"),(O=_.querySelector("span.rounded-full"))==null||O.classList.add("bg-stone-300")}),v.classList.add("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),v.classList.remove("border-[var(--grid-border)]"),(g=v.querySelector("span.rounded-full"))==null||g.classList.add("bg-[var(--accent-gold)]"),(y=v.querySelector("span.rounded-full"))==null||y.classList.remove("bg-stone-300"),x&&(x.disabled=!1),u){const _=c.find(C=>C.id===t);u.innerHTML=`You selected: <strong class="text-[var(--text-primary)]">${_==null?void 0:_.title}</strong>`}};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),x==null||x.addEventListener("click",()=>{a("trial_submit",{trial_index:e,stimulus_id:n.stimulus_id,action_id:t,input_modality:s,task_def_version:"1.0"}),e<3?(e++,t=null,l()):m({mini_game:"F2",observations_count:4})})}l()}function de(i,r,a,m){let b=!0,e=0,t="baseline",s=null,p=null,c="mouse";const l=[{stimulus_id:"F3_T1",cue_id:"cue_expressive_crescendo",title:"Round 1: Rising Voice Line",cue_text:'"The poet begins a rising, powerful verse."',baseline_context:"Small Practice Room — Sound dies down quickly with no echo.",baseline_options:[{id:"support_volume",label:"Support Volume",desc:"Lift volume so sound carries across the room."},{id:"dampen_level",label:"Lower Level",desc:"Turn volume down before the loud peak."},{id:"neutral_hold",label:"Keep Steady",desc:"Keep room settings steady without changes."}],shifted_context:"Stone Hall — High stone walls bounce sound and create heavy echo.",shifted_options:[{id:"attenuate_reverb",label:"Lower Echo",desc:"Trim room echo so words stay clear."},{id:"support_volume",label:"Support Volume",desc:"Keep the volume boost from the small room."},{id:"neutral_hold",label:"Keep Steady",desc:"Make no changes for the stone room."}]},{stimulus_id:"F3_T2",cue_id:"cue_sotto_voce_pause",title:"Round 2: Quiet Whisper",cue_text:'"The poet drops into a quiet whisper between lines."',baseline_context:"Quiet Sitting Room — Audience sits close and easily hears every word.",baseline_options:[{id:"preserve_natural_intimacy",label:"Keep Natural Tone",desc:"Keep sound soft and clear without extra volume."},{id:"boost_high_gain",label:"High Boost",desc:"Force the whisper to play at loud volume."},{id:"cut_channel",label:"Mute Feed",desc:"Treat quiet verse as dead sound."}],shifted_context:"Courtyard Gate — Nearby street chatter and fountain water cover soft voices.",shifted_options:[{id:"boost_intelligibility",label:"Boost Voice",desc:"Lift the voice so outdoor chatter does not hide it."},{id:"preserve_natural_intimacy",label:"Keep Natural Tone",desc:"Leave voice unboosted so whisper is hard to hear."},{id:"cut_channel",label:"Mute Feed",desc:"Treat quiet sound as an equipment issue."}]},{stimulus_id:"F3_T3",cue_id:"cue_rhythmic_syncopation",title:"Round 3: Pause Before Verse",cue_text:'"The poet pauses suddenly before the final line."',baseline_context:"Solo Recital — A single speaker recites at a steady, driving pace.",baseline_options:[{id:"sustain_cadence",label:"Keep Pace",desc:"Keep the steady beat moving through the pause."},{id:"halt_accompaniment",label:"Stop Sound",desc:"Stop all instruments abruptly on the pause."},{id:"force_metronome",label:"Speed Up",desc:"Push the recital forward past the pause."}],shifted_context:"Group Singing — A chorus enters during the pause to sing an answer line.",shifted_options:[{id:"open_reciprocal_space",label:"Make Space",desc:"Pause instruments to let the chorus answer clearly."},{id:"sustain_cadence",label:"Keep Pace",desc:"Play straight through without waiting for the chorus."},{id:"force_metronome",label:"Speed Up",desc:"Rush the group tempo forward."}]}];function n(){var o,v;if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Echo of the Room","Adjust your choices when room sound changes.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>',goal:"See how the same performance needs a new response when the room changes.",steps:["Read what the performer does in the first room.","Pick your first response.","See the new room setting and pick an updated response."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t="baseline",s=null,p=null,x(),n()});return}const u=l[e];if(t==="baseline"){const f=u.baseline_options.find(h=>h.id===s);i.innerHTML=`
        <div class="animate-soft-fade-in max-w-2xl mx-auto">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 1: The Frequency</span>
              
            </div>
            <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Echo of the Room</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Pick your response for the first room setting.</p>
          </div>

          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">
              Read the performer action in this room. Pick your first response.
            </div>
          </div>

          <!-- LOOK AT THIS -->
          <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected space-y-3">
            <div>
              <span class="text-[10px] uppercase font-sans tracking-wider text-[var(--accent-gold)] font-semibold">Performer Action</span>
              <div class="text-xs font-serif text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${u.cue_text}</div>
            </div>
            <div class="p-3 bg-amber-50/50 border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase font-sans tracking-wider text-amber-800 font-semibold">First Room Setting</span>
              <div class="text-xs text-[var(--text-primary)] mt-0.5">${u.baseline_context}</div>
            </div>
          </div>

          <!-- INTERACTION AREA -->
          <div class="space-y-2.5 mb-4 candidate-content-protected">
            <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 font-sans">Choose your response:</div>
            ${u.baseline_options.map(h=>`
              <div class="f3-opt p-3.5 bg-white border ${s===h.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer  interactive-option rounded-xs min-h-[50px]" data-choice="${h.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${s===h.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                  ${h.label}
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">${h.desc}</div>
              </div>
            `).join("")}
          </div>

          <!-- YOUR CHOICE -->
          <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
            <span>${s?`You selected: <strong class="text-[var(--text-primary)]">${f==null?void 0:f.label}</strong>`:"Select an option above to continue."}</span>
            <span class="text-[10px] text-stone-400 font-sans">Step 1 of 2</span>
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end">
            <button id="f3BaselineBtn" ${s?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
              Confirm and See Room Shift &rarr;
            </button>
          </div>
        </div>
      `,i.querySelectorAll(".f3-opt").forEach(h=>{const g=y=>{c=y,s=h.getAttribute("data-choice"),n()};h.addEventListener("click",()=>g("mouse")),h.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),g("keyboard"))})}),(o=document.getElementById("f3BaselineBtn"))==null||o.addEventListener("click",()=>{a("baseline_response_selected",{trial_index:e,stimulus_id:u.stimulus_id,cue_id:u.cue_id,choice_id:s,input_modality:c,task_def_version:"1.0"}),t="shifted",a("context_shifted",{trial_index:e,stimulus_id:u.stimulus_id,cue_id:u.cue_id,shifted_context:u.shifted_context,task_def_version:"1.0"}),n()})}else{const f=u.shifted_options.find(h=>h.id===p);i.innerHTML=`
        <div class="animate-soft-fade-in max-w-2xl mx-auto">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 1: The Frequency</span>
              
            </div>
            <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Echo of the Room</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">The room has changed. Update your response.</p>
          </div>

          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">
              The performer action is the same. Pick your updated response for the new room.
            </div>
          </div>

          <!-- LOOK AT THIS -->
          <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected space-y-3">
            <div>
              <span class="text-[10px] uppercase font-sans tracking-wider text-[var(--accent-gold)] font-semibold">Same Performer Action</span>
              <div class="text-xs font-serif text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${u.cue_text}</div>
            </div>
            <div class="p-3 bg-amber-100/70 border border-[#bd6f5d]/50 rounded-xs">
              <span class="text-[10px] uppercase font-sans tracking-wider text-[#bd6f5d] font-semibold">New Room Setting</span>
              <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${u.shifted_context}</div>
            </div>
          </div>

          <!-- INTERACTION AREA -->
          <div class="space-y-2.5 mb-4 candidate-content-protected">
            <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 font-sans">Choose your updated response:</div>
            ${u.shifted_options.map(h=>`
              <div class="f3-updated-opt p-3.5 bg-white border ${p===h.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer  interactive-option rounded-xs min-h-[50px]" data-choice="${h.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${p===h.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                  ${h.label}
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">${h.desc}</div>
              </div>
            `).join("")}
          </div>

          <!-- YOUR CHOICE -->
          <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
            <span>${p?`You selected: <strong class="text-[var(--text-primary)]">${f==null?void 0:f.label}</strong>`:"Select an option above to continue."}</span>
            <span class="text-[10px] text-stone-400 font-sans">Step 2 of 2</span>
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end">
            <button id="f3UpdatedBtn" ${p?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
              ${e<2?"Save Updated Setting & Next Round &rarr;":"Finish World 1 &rarr;"}
            </button>
          </div>
        </div>
      `,i.querySelectorAll(".f3-updated-opt").forEach(h=>{const g=y=>{c=y,p=h.getAttribute("data-choice"),n()};h.addEventListener("click",()=>g("mouse")),h.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),g("keyboard"))})}),(v=document.getElementById("f3UpdatedBtn"))==null||v.addEventListener("click",()=>{a("updated_response_selected",{trial_index:e,stimulus_id:u.stimulus_id,cue_id:u.cue_id,choice_id:p,input_modality:c,task_def_version:"1.0"}),a("transition_completed",{trial_index:e,stimulus_id:u.stimulus_id,task_def_version:"1.0"}),e<2?(e++,t="baseline",s=null,p=null,x(),n()):m({mini_game:"F3",observations_count:3})})}}function x(){const u=l[e];a("transition_presented",{trial_index:e,stimulus_id:u.stimulus_id,cue_id:u.cue_id,baseline_context:u.baseline_context,task_def_version:"1.0"})}n()}function le(i,r){const{appContainer:a,miniGameIndex:m,gameId:b,logEvent:e,onMiniGameComplete:t}=i,s=b||(m===0?"C1":m===1?"C2":"C3");s==="C1"?ce(a,r,e,t):s==="C2"?ue(a,r,e,t):pe(a,r,e,t)}function ce(i,r,a,m){let b=!0,e=0,t=0,s="mouse";const p=[{stimulus_id:"C1_R1",title:"Round 1: Partner Needs Tiles",description:"Your partner needs 3 more tiles to finish. You have 8 tiles.",partner_initial:2,user_initial:8,default_transfer:0,context_note:"Partner Needs Help"},{stimulus_id:"C1_R2",title:"Round 2: Balanced Baskets",description:"Both you and your partner have 5 tiles. Both have enough to finish.",partner_initial:5,user_initial:5,default_transfer:0,context_note:"Both Have Enough"},{stimulus_id:"C1_R3",title:"Round 3: Your Basket is Low",description:"Your basket has only 3 tiles (you need 6). Your partner has 7 tiles.",partner_initial:7,user_initial:3,default_transfer:0,context_note:"Keep Your Tiles"}];function c(){var o,v,f;if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Artisan's Basket","Coordinate ceramic tiles with your workshop partner.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',goal:"Share tiles with your partner across 3 rounds.",steps:["Check how many tiles you and your partner currently have.","Use plus and minus to move tiles if you wish.","Click Confirm to complete the round."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=0,l(),c()});return}const n=p[e],x=n.partner_initial+t,u=n.user_initial-t;i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 3: The Shared Canvas</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Artisan's Basket</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Coordinate ceramic tiles with your workshop partner.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Check tile counts below. Move tiles to your partner if needed.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${n.title}:</strong> ${n.description}
          </span>
          <span class="text-[10px] font-sans uppercase tracking-wider text-[var(--text-secondary)]">${n.context_note}</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="grid grid-cols-2 gap-4 text-center mb-5">
            <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
              <span class="text-[10px] text-[var(--accent-gold)] uppercase font-semibold font-sans">Partner Basket</span>
              <div class="text-xl font-serif font-semibold text-[#bd6f5d] mt-1">${x} Tiles</div>
              <div class="flex justify-center gap-1 mt-2.5 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0,x)).fill('<div class="w-3.5 h-3.5 bg-[#bd6f5d]/70 rounded-xs shadow-xs"></div>').join("")}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
              <span class="text-[10px] text-emerald-700 uppercase font-semibold font-sans">Your Basket</span>
              <div class="text-xl font-serif font-semibold text-emerald-800 mt-1">${u} Tiles</div>
              <div class="flex justify-center gap-1 mt-2.5 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0,u)).fill('<div class="w-3.5 h-3.5 bg-emerald-700/70 rounded-xs shadow-xs"></div>').join("")}
              </div>
            </div>
          </div>

          <div class="text-center pt-3 border-t border-[var(--grid-border)]">
            <div class="text-xs text-[var(--text-secondary)] mb-2 font-sans">Tiles to share with partner:</div>
            <div class="flex justify-center items-center gap-4">
              <button type="button" id="minusTileBtn" class="w-12 h-12 rounded-xs bg-white border border-[var(--grid-border)] text-xl font-bold  hover:bg-amber-50  interactive-option shadow-xs flex items-center justify-center min-h-[44px]" tabindex="0">-</button>
              <span id="transferCount" class="font-serif text-3xl font-semibold text-[var(--accent-gold)] w-12 text-center">${t}</span>
              <button type="button" id="plusTileBtn" class="w-12 h-12 rounded-xs bg-white border border-[var(--grid-border)] text-xl font-bold  hover:bg-amber-50  interactive-option shadow-xs flex items-center justify-center min-h-[44px]" tabindex="0">+</button>
            </div>
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>Sharing: <strong class="text-[var(--text-primary)]">${t} tiles</strong> (You keep ${u})</span>
          <span class="text-[10px] text-stone-400 font-sans">Round ${e+1} of 3</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="confirmTransferBtn" class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] interactive-option shadow-sm rounded-xs min-h-[44px]">
            ${e<2?"Confirm Tile Sharing &rarr;":"Finish Tile Allocation &rarr;"}
          </button>
        </div>
      </div>
    `,(o=document.getElementById("minusTileBtn"))==null||o.addEventListener("click",()=>{s="mouse",t>0&&(t--,a("resource_transferred",{trial_index:e,stimulus_id:n.stimulus_id,delta:-1,action_type:"return_to_user",input_modality:s,task_def_version:"1.0"}),c())}),(v=document.getElementById("plusTileBtn"))==null||v.addEventListener("click",()=>{s="mouse",t<n.user_initial&&(t++,a("resource_transferred",{trial_index:e,stimulus_id:n.stimulus_id,delta:1,action_type:"transfer_to_partner",input_modality:s,task_def_version:"1.0"}),c())}),(f=document.getElementById("confirmTransferBtn"))==null||f.addEventListener("click",()=>{a("allocation_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,input_modality:s,task_def_version:"1.0"}),e<2?(e++,t=0,l(),c()):m({mini_game:"C1",observations_count:3})})}function l(){const n=p[e];a("round_presented",{trial_index:e,stimulus_id:n.stimulus_id,input_modality:s,task_def_version:"1.0"})}c()}function ue(i,r,a,m){let b=!0,e=0,t=null,s="mouse";const p=[{stimulus_id:"C2_R1",title:"Round 1: Open Wall Space",partner_desc:"Partner hung their painting on the top left corner.",slots:[{id:"SLOT_NORTH_RIGHT",label:"Top Right (Even Spacing)"},{id:"SLOT_OVERLAP_LEFT",label:"Next to Partner (Tight Cluster)"},{id:"SLOT_BOTTOM_CENTER",label:"Bottom Center (Center Spot)"}]},{stimulus_id:"C2_R2",title:"Round 2: Keep Hallway Clear",partner_desc:"Partner is framing the center hallway. Keep the doorway path clear.",slots:[{id:"SLOT_PERIMETER_EAST",label:"East Wall (Keeps Path Open)"},{id:"SLOT_CENTER_ADJACENT",label:"Center Slot (Crowds the Hall)"},{id:"SLOT_PERIMETER_WEST",label:"West Wall (Keeps Path Open)"}]},{stimulus_id:"C2_R3",title:"Round 3: Partner Moved Down",partner_desc:"Partner moved their artwork down to the lower wall.",slots:[{id:"SLOT_UPPER_GALLERY",label:"Top Wall (Balances Both Sides)"},{id:"SLOT_LOWER_CONGESTED",label:"Lower Wall (Crowds Lower Wall)"},{id:"SLOT_MID_SIDE",label:"Side Niche (Side Corner)"}]}];function c(){var u;if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Gallery Wall","Coordinate artwork placement with your partner.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>',goal:"Choose a wall spot for your piece across 3 rounds.",steps:["See where your partner hung their artwork.","Choose an open wall spot from the options.","Click Confirm to hang your piece."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=null,l(),c()});return}const n=p[e],x=n.slots.find(o=>o.id===t);i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 3: The Shared Canvas</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Gallery Wall</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Coordinate artwork placement with your partner.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Check your partner's position. Choose an open spot that balances the wall.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${n.title}:</strong> ${n.partner_desc}
          </span>
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Round ${e+1} of 3</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Available Wall Placement Slots:</div>
          <div class="flex flex-col gap-2.5">
            ${n.slots.map(o=>`
              <button type="button" class="slot-btn px-4 py-3 text-xs border rounded-xs ${t===o.id?"border-[var(--accent-gold)] bg-amber-50/70 font-semibold shadow-xs":"border-[var(--grid-border)] bg-white "} interactive-option flex items-center justify-between min-h-[48px]" data-slot="${o.id}" tabindex="0">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===o.id?"bg-[var(--accent-gold)] text-white":"text-stone-400"}">${t===o.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)]">${o.label}</span>
                </span>
                <span class="text-[10px] text-[var(--accent-gold)] font-medium uppercase">Slot ${o.id.replace("SLOT_","")}</span>
              </button>
            `).join("")}
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${x==null?void 0:x.label}</strong>`:"Select a spot above to continue."}</span>
          <span class="text-[10px] text-stone-400 font-sans">Round ${e+1} of 3</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="confirmWallBtn" ${t?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
            ${e<2?"Confirm Placement &rarr;":"Finish Wall Coordination &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".slot-btn").forEach(o=>{const v=f=>{s=f,t=o.getAttribute("data-slot"),a("placement_attempted",{trial_index:e,stimulus_id:n.stimulus_id,slot_id:t,input_modality:s,task_def_version:"1.0"}),c()};o.addEventListener("click",()=>v("mouse")),o.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),v("keyboard"))})}),(u=document.getElementById("confirmWallBtn"))==null||u.addEventListener("click",()=>{a("placement_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_slot:t,input_modality:s,task_def_version:"1.0"}),e<2?(e++,t=null,l(),c()):m({mini_game:"C2",observations_count:3})})}function l(){const n=p[e];a("round_presented",{trial_index:e,stimulus_id:n.stimulus_id,task_def_version:"1.0"})}c()}function pe(i,r,a,m){let b=!0,e=0,t=null,s=null,p="mouse";const c=[{stimulus_id:"C3_R1",title:"Opportunity 1: Partner Lantern is Dark",partner_state:"Your partner's lantern turned dark during setup.",condition_type:"identify_and_repair",fault_options:[{id:"fault_conduit_disconnected",label:"The wire came loose at the connector"},{id:"fault_bulb_broken",label:"The glass bulb is broken"},{id:"fault_switch_off",label:"The main hall switch is off"}],repair_options:[{id:"adjust_conduit",label:"Reconnect the loose wire and tighten the clamp"},{id:"call_help_desk",label:"Call the main help desk"},{id:"replace_lantern",label:"Take down the entire lamp"}],execution_action:"restore_power"},{stimulus_id:"C3_R2",title:"Opportunity 2: Hanging Rope Stuck",partner_state:"The hanging rope got caught in the wheel bracket.",condition_type:"identify_and_repair",fault_options:[{id:"fault_cable_pulley_pinch",label:"Rope is pinched between wheel and metal frame"},{id:"fault_cable_snapped",label:"The rope snapped completely"},{id:"fault_wall_anchor_loose",label:"The wall hook is loose"}],repair_options:[{id:"reseat_pulley_cable",label:"Loosen the lever and place the rope back on the wheel"},{id:"call_facility_maintenance",label:"File a general repair request"},{id:"force_pull_cable",label:"Pull the rope down hard"}],execution_action:"align_panel_height"},{stimulus_id:"C3_R3",title:"Opportunity 3: Shadow Blocks Artwork",partner_state:"A movable wooden screen casts a dark shadow over your partner's painting.",condition_type:"identify_and_repair",fault_options:[{id:"fault_blindspot_obstruction",label:"Wooden screen blocks the spotlight beam"},{id:"fault_color_distortion",label:"The light color looks wrong"}],repair_options:[{id:"shift_lantern",label:"Turn the spotlight slightly to shine around the screen"},{id:"generic_complaint",label:"Submit a general lighting complaint"}],execution_action:"illuminate_path"}];function l(){var o;if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Dual Lanterns","Resolve studio breakdowns to keep the hall ready.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',goal:"Find the work issue, pick a fix, and repair it together.",steps:["Examine the situation described in each round.","Identify the issue from the list.","Choose a helpful fix and apply the repair."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=null,s=null,n(),l()});return}const x=c[e];x.fault_options.find(v=>v.id===t);const u=x.repair_options.find(v=>v.id===s);i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 3: The Shared Canvas</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Dual Lanterns</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Resolve studio issues to keep exhibition work moving.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Step 1: Identify what went wrong. Step 2: Choose how to fix it.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${x.title}:</strong> ${x.partner_state}
          </span>
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Stage ${e+1} of 3</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <!-- Step 1: Identify Breakdown -->
          <div class="mb-4">
            <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2 font-sans">
              Step 1: What is the issue?
            </div>
            <div class="space-y-2">
              ${x.fault_options.map(v=>`
                <div class="fault-opt p-3 bg-white border ${t===v.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium":"border-[var(--grid-border)] "} rounded-xs cursor-pointer interactive-option text-xs flex items-center gap-2 min-h-[44px]" data-fault="${v.id}" tabindex="0" role="button">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${t===v.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===v.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)]">${v.label}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Step 2: Perform Constructive Repair -->
          ${t?`
            <div class="pt-4 border-t border-[var(--grid-border)] animate-soft-fade-in">
              <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2 font-sans">
                Step 2: Choose a constructive fix:
              </div>
              <div class="space-y-2">
                ${x.repair_options.map(v=>`
                  <div class="repair-opt p-3 bg-white border ${s===v.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium":"border-[var(--grid-border)] "} rounded-xs cursor-pointer interactive-option text-xs flex items-center gap-2 min-h-[44px]" data-repair="${v.id}" tabindex="0" role="button">
                    <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${s===v.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${s===v.id?"✓":""}</span>
                    <span class="text-[var(--text-primary)]">${v.label}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          `:""}
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${t&&s?`Fix selected: <strong class="text-[var(--text-primary)]">${u==null?void 0:u.label}</strong>`:t?"Now choose a fix in Step 2.":"Select an issue in Step 1."}</span>
          <span class="text-[10px] text-stone-400 font-sans">${e+1} / 3</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="executeRepairBtn" ${t&&s?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
            ${e<2?"Apply Fix & Next Problem &rarr;":"Finish World 3 &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".fault-opt").forEach(v=>{const f=h=>{p=h,t=v.getAttribute("data-fault"),a("breakdown_identified",{trial_index:e,stimulus_id:x.stimulus_id,fault_id:t,input_modality:p,task_def_version:"1.0"}),l()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),i.querySelectorAll(".repair-opt").forEach(v=>{const f=h=>{p=h,s=v.getAttribute("data-repair"),a("repair_action_performed",{trial_index:e,stimulus_id:x.stimulus_id,repair_action_id:s,input_modality:p,task_def_version:"1.0"}),l()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(o=document.getElementById("executeRepairBtn"))==null||o.addEventListener("click",()=>{a("repaired_action_executed",{trial_index:e,stimulus_id:x.stimulus_id,fault_id:t,repair_action_id:s,execution_action_id:x.execution_action,input_modality:p,task_def_version:"1.0"}),e<2?(e++,t=null,s=null,n(),l()):m({mini_game:"C3",observations_count:3})})}function n(){const x=c[e];a("repair_presented",{trial_index:e,stimulus_id:x.stimulus_id,task_def_version:"1.0"})}l()}function me(i,r){const{appContainer:a,miniGameIndex:m,gameId:b,logEvent:e,onMiniGameComplete:t}=i,s=b||(m===0?"E1":m===1?"E2":"E3");s==="E1"?xe(a,r,e,t):s==="E2"?ve(a,r,e,t):be(a,r,e,t)}function xe(i,r,a,m){let b=!0,e=0,t="mouse";const s=[{stimulus_id:"E1_T1",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T2",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T3",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T4",color:"Sage",shape:"Square",icon:"&#9632;",label:"Sage Square"},{stimulus_id:"E1_T5",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T6",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T7",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T8",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T9",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"}];function p(){if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Ceramic Mosaic","Sort each tile into the matching container.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>',goal:"Sort 9 tiles into the matching containers.",steps:["Look at the tile shape and color.","Click Container 1 or Container 2 to place it.","Watch the feedback note to see if your choice fit the rule."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,performance.now(),c(),p()});return}const l=s[e];i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 4: The Shifting Grid</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Ceramic Mosaic</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Sort each ceramic tile into the matching container.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Examine the tile below. Click Container 1 or 2 to file it.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-4 text-center shadow-xs rounded-xs candidate-content-protected">
          <div class="text-5xl mb-2 ${l.color==="Gold"?"text-[var(--accent-gold)]":"text-emerald-700"}">
            ${l.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${l.label}</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-0.5 font-sans uppercase">${l.color} &bull; ${l.shape}</div>
        </div>

        <!-- INTERACTION AREA -->
        <div class="grid grid-cols-2 gap-4 mb-4 candidate-content-protected">
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)]  hover:bg-amber-50/40  interactive-option text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_1" tabindex="0">
            <span class="text-2xl text-[var(--accent-gold)] block mb-1">&#9679;</span>
            <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 1</span>
            <span class="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-sans">Reference: Gold Circle</span>
          </button>
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)]  hover:bg-amber-50/40  interactive-option text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_2" tabindex="0">
            <span class="text-2xl text-emerald-800 block mb-1">&#9632;</span>
            <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 2</span>
            <span class="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-sans">Reference: Sage Square</span>
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Tile ${e+1} of ${s.length}
        </div>
      </div>
    `,i.querySelectorAll(".bin-btn").forEach(n=>{const x=u=>{t=u;const o=n.getAttribute("data-choice");a("tile_sorted",{trial_index:e,stimulus_id:l.stimulus_id,choice:o,input_modality:t,task_def_version:"1.0"}),e<s.length-1?(e++,performance.now(),c(),p()):m({mini_game:"E1",observations_count:9})};n.addEventListener("click",()=>x("mouse")),n.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),x("keyboard"))})})}function c(){const l=s[e];a("trial_presented",{trial_index:e,stimulus_id:l.stimulus_id,tile_color:l.color,tile_shape:l.shape,task_def_version:"1.0"})}p()}function ve(i,r,a,m){let b=!0,e=0,t=null,s="mouse";const p=[{stimulus_id:"E2_S1",title:"Sequence 1: Ink Spill on Desk",situation:"A small drop of ink spilled onto your active pattern card.",has_disruption:!0,disruption_type:"ink_spill_masking_workspace",options:[{id:"clear_workspace",label:"Dab ink with a cloth and straighten your card",note:"Calm cleanup"},{id:"rush_uncleaned",label:"Keep placing tiles around the wet ink",note:"Rushed step"},{id:"pause_idle",label:"Step away and wait for help",note:"Long wait"}]},{stimulus_id:"E2_S2",title:"Sequence 2: Calm Studio Work",situation:"The workbench is clean, tidy, and well lit.",has_disruption:!1,disruption_type:"undisrupted_control",options:[{id:"standard_sequence",label:"Continue placing tiles according to plan",note:"Steady step"},{id:"unnecessary_rework",label:"Take tiles apart to re-check for no reason",note:"Unneeded check"},{id:"pause_idle",label:"Stop and wait before continuing",note:"Unneeded pause"}]},{stimulus_id:"E2_S3",title:"Sequence 3: Breeze Blows Paper",situation:"A sudden breeze blew your reference drawing off the table.",has_disruption:!0,disruption_type:"draft_blows_reference_card",options:[{id:"stabilize_reference",label:"Pick up paper and weigh it down with a stone",note:"Fix and secure"},{id:"guess_motif",label:"Place tiles from memory without looking at plan",note:"Guessing"},{id:"pause_idle",label:"Wait for the wind to stop",note:"Waiting"}]},{stimulus_id:"E2_S4",title:"Sequence 4: Color Tray in the Way",situation:"A color tray was nudged and blocks your tool holder.",has_disruption:!0,disruption_type:"misplaced_pigment_tray",options:[{id:"reposition_tray",label:"Slide the tray back to its own side",note:"Move tray"},{id:"use_wrong_shade",label:"Work around the tray at an awkward angle",note:"Awkward reach"},{id:"pause_idle",label:"Stop work until someone comes back",note:"Waiting"}]}];function c(){var u;if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Courtyard Setup","Respond constructively to workshop situations.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',goal:"Respond to unexpected workshop situations across 4 rounds.",steps:["Read what just happened in the workshop.","Pick what you would do next from the 3 options.","Click Confirm to move to the next situation."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=null,l(),c()});return}const n=p[e],x=n.options.find(o=>o.id===t);i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 4: The Shifting Grid</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Courtyard Setup</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Choose the best response when unexpected studio events happen.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read the situation below. Pick the most practical next step.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${n.title}:</strong> ${n.situation}
          </span>
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Scenario ${e+1} of 4</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Available Responses:</div>
          <div class="space-y-2.5">
            ${n.options.map(o=>`
              <div class="e2-opt p-3.5 bg-white border ${t===o.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-action="${o.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===o.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===o.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${o.label}</span>
                </span>
                <span class="text-[10px] text-[var(--text-secondary)] uppercase font-medium">${o.note}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${x==null?void 0:x.label}</strong>`:"Select an option above to continue."}</span>
          <span class="text-[10px] text-stone-400 font-sans">${e+1} / ${p.length}</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="confirmE2Btn" ${t?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
            ${e<p.length-1?"Confirm Choice &rarr;":"Finish Setup Sequences &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".e2-opt").forEach(o=>{const v=f=>{s=f,t=o.getAttribute("data-action"),a("action_selected",{trial_index:e,stimulus_id:n.stimulus_id,action_id:t,input_modality:s,task_def_version:"1.0"}),c()};o.addEventListener("click",()=>v("mouse")),o.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),v("keyboard"))})}),(u=document.getElementById("confirmE2Btn"))==null||u.addEventListener("click",()=>{a("sequence_completed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_action:t,input_modality:s,task_def_version:"1.0"}),e<p.length-1?(e++,t=null,l(),c()):m({mini_game:"E2",observations_count:4})})}function l(){const n=p[e];a("sequence_presented",{trial_index:e,stimulus_id:n.stimulus_id,has_disruption:n.has_disruption,disruption_type:n.disruption_type,task_def_version:"1.0"})}c()}function be(i,r,a,m){let b=!0,e=0,t=null,s="mouse";const p=[{stimulus_id:"E3_C1",title:"Condition 1: Three Colors Available",constraint_state:"standard_three_color_palette",description:"Gold, sage, and terracotta colors are all on the table.",options:[{id:"standard_layout",label:"Three-Color Pattern (Balanced three-color arrangement)"},{id:"tonal_adaptation",label:"Single Color Shades (One shade only)"},{id:"compact_adaptation",label:"Half-Grid Squeeze"}]},{stimulus_id:"E3_C2",title:"Condition 2: Only Indigo Blue Available",constraint_state:"monochrome_indigo_only",description:"Only one blue color is available on the table.",options:[{id:"tonal_adaptation",label:"Light and Dark Shading (Create depth using light and dark tones)"},{id:"standard_layout",label:"Try Three Colors (Cannot be done with one color)"},{id:"compact_adaptation",label:"Small Stamp Layout"}]},{stimulus_id:"E3_C3",title:"Condition 3: Half-Size Wall Space",constraint_state:"boundary_constricted_half_grid",description:"The wall space is cut in half. The artwork must fit smaller dimensions.",options:[{id:"compact_adaptation",label:"Compact Small Design (Scale down pattern to fit half wall)"},{id:"standard_layout",label:"Full Size Layout (Too wide for the small wall)"},{id:"tonal_adaptation",label:"Unscaled Shading Layout"}]}];function c(){var u;if(b){i.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${r("The Shifting Medium","Adapt design layout when studio materials change.")}
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>',goal:"Adapt your mosaic design strategy to match shifting studio constraints.",steps:["Examine the active studio condition in each round.","Choose the layout option that matches the condition.","Confirm your choice across all 3 rounds."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=null,l(),c()});return}const n=p[e],x=n.options.find(o=>o.id===t);i.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 4: The Shifting Grid</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Shifting Medium</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Adapt design layout to active studio conditions.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read the active condition below. Pick the layout that fits best.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${n.title}:</strong> ${n.description}
          </span>
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Layout ${e+1} of ${p.length}</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Layout Options:</div>
          <div class="space-y-2.5">
            ${n.options.map(o=>`
              <div class="e3-opt p-3.5 bg-white border ${t===o.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-layout="${o.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===o.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===o.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${o.label}</span>
                </span>
                <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium">Option ${o.id.replace("LAYOUT_","")}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${x==null?void 0:x.label}</strong>`:"Select a layout above to continue."}</span>
          <span class="text-[10px] text-stone-400 font-sans">${e+1} / ${p.length}</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="confirmE3Btn" ${t?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
            ${e<p.length-1?"Confirm Layout &rarr;":"Finish World 4 &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".e3-opt").forEach(o=>{const v=f=>{s=f,t=o.getAttribute("data-layout"),a("composition_action_attempted",{trial_index:e,stimulus_id:n.stimulus_id,action_id:t,input_modality:s,task_def_version:"1.0"}),c()};o.addEventListener("click",()=>v("mouse")),o.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),v("keyboard"))})}),(u=document.getElementById("confirmE3Btn"))==null||u.addEventListener("click",()=>{a("composition_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_action:t,input_modality:s,task_def_version:"1.0"}),e<p.length-1?(e++,t=null,l(),c()):m({mini_game:"E3",observations_count:3})})}function l(){const n=p[e];a("condition_presented",{trial_index:e,stimulus_id:n.stimulus_id,constraint_state:n.constraint_state,task_def_version:"1.0"})}c()}function fe(i,r){const{appContainer:a,miniGameIndex:m,gameId:b,logEvent:e,onMiniGameComplete:t}=i,s=b||(m===0?"Q1":m===1?"Q2":"Q3");s==="Q1"?he(a,r,e,t):s==="Q2"?ge(a,r,e,t):ye(a,r,e,t)}function he(i,r,a,m){let b=!0,e=0,t=null,s={},p="mouse";const c=[{stimulus_id:"Q1_D1",title:"Antique Gold-Leaf Manuscript Leaf",scenario:"Choose the binding method for a fragile 19th-century manuscript page.",options:[{id:"flexible_cord_binding",label:"Sewn Flexible Cord (Allows spine to bend safely)"},{id:"tight_adhesive_clamp",label:"Rigid Glue Clamp (Firm hold on spine)"},{id:"unbound_portfolio",label:"Loose Archival Folder (Kept as separate sheets)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Binding Methods Note",info_value:"high",summary:"Srinagar bookbinders used soft vegetable cord to protect delicate gold borders."},{id:"OPT_CONTROL_1",topic:"Library Stamp Dates",info_value:"low",summary:"City library accession stamps began in late October 1888."}]},{stimulus_id:"Q1_D2",title:"Papier-Mâché Pen Case (Qalamdan)",scenario:"Select a protective surface coating for this painted lacquer case.",options:[{id:"curing_linseed_glaze",label:"Linseed Oil & Amber Varnish (Traditional slow curing glaze)"},{id:"quick_synthetic_seal",label:"Quick Synthetic Clear Spray (Modern fast-drying finish)"},{id:"wax_buff_only",label:"Dry Wax Polish (Gentle surface buffing)"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Papier-Mâché Care Guide",info_value:"high",summary:"Slow drying with natural amber resin keeps natural mineral colors bright."},{id:"OPT_CONTROL_2",topic:"Cabinet Hinge Maintenance",info_value:"low",summary:"Brass display cabinet hinges need oiling twice each year."}]},{stimulus_id:"Q1_D3",title:"Workshop Artisan Register",scenario:"Identify the origin of this undated Persian artisan register.",options:[{id:"guild_ledger_verified",label:"Official Guild Register (Bears official guildmaster seal)"},{id:"private_merchant_tally",label:"Merchant Shop Notebook (Informal daily trade tally)"},{id:"state_excise_record",label:"Treasury Tax Record (Official tax register)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Register Stitching Styles",info_value:"high",summary:"Crimson thread stitching was reserved for registered royal guilds."},{id:"OPT_CONTROL_1",topic:"Filing Code Reference",info_value:"low",summary:"Old municipal tax files use code series B."}]},{stimulus_id:"Q1_D4",title:"Natural Pigment Jars",scenario:"Select storage conditions for delicate saffron and indigo pigments.",options:[{id:"dark_vented_cedar_chest",label:"Dark Cedar Chest (Controlled humidity and shade)"},{id:"ambient_glass_display",label:"Open Glass Vitrine (Direct gallery daylight)"},{id:"sealed_vacuum_capsule",label:"Sealed Dry Capsule (Zero-humidity container)"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Natural Pigment Care",info_value:"high",summary:"Direct sunlight fades saffron. Cedar wood naturally repels insects."},{id:"OPT_CONTROL_2",topic:"Shelf Weight Limits",info_value:"low",summary:"Wooden display shelves can hold up to 25 kilograms."}]}];function l(){var u;if(b){i.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 5: The Hidden Gallery</span>
            
          </div>
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',goal:"Make preservation choices for 4 historic items.",steps:["Read the artifact prompt and choose your option.","Click optional research notes if you want more background.","Click Confirm when you are ready to continue."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=null,n(),l()});return}const x=c[e];i.innerHTML=`
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 5: The Hidden Gallery</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 2 minutes</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Curatorial Dossier</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Choose the best way to care for each historic item.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Review the artifact below. Choose an action. Optional reference notes are available if you want them.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-4 shadow-xs rounded-xs candidate-content-protected">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-sans uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Artifact Record</span>
            <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium">Record ${e+1} of 4</span>
          </div>
          <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)]">${x.title}</div>
          <div class="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">${x.scenario}</div>
        </div>

        <!-- INTERACTION AREA: Optional Reference Notes -->
        <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="text-[10px] uppercase font-sans text-[var(--accent-gold)] font-semibold tracking-wider mb-2 flex items-center justify-between">
            <span>Optional Reference Notes (Click to Open)</span>
            <span class="text-[9px] text-[var(--text-secondary)] font-normal">Voluntary consultation</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${x.optional_resources.map(o=>`
              <div class="opt-res-card p-3 bg-white border ${s[o.id]?"border-[var(--accent-gold)] bg-amber-50/30":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs min-h-[48px] flex flex-col justify-center" data-res="${o.id}">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    ${o.topic}
                  </span>
                  <span class="text-[9px] font-sans uppercase text-[var(--text-secondary)]">${s[o.id]?"Opened":"Inspect"}</span>
                </div>
                ${s[o.id]?`<p class="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--grid-border)] pt-2 animate-soft-fade-in">${o.summary}</p>`:""}
              </div>
            `).join("")}
          </div>
        </div>

        <!-- YOUR CHOICE: Curatorial Actions -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Choose Preservation Action:</div>
          <div class="space-y-2.5">
            ${x.options.map(o=>`
              <div class="q1-opt p-3.5 bg-white border ${t===o.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-choice="${o.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 ${t===o.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===o.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${o.label}</span>
                </span>
                <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium shrink-0">Action ${String.fromCharCode(65+x.options.indexOf(o))}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end mb-4">
          <button type="button" id="confirmQ1Btn" ${t?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
            ${e<c.length-1?"Confirm Decision &rarr;":"Finish Curatorial Decisions &rarr;"}
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          
        </div>
      </div>
    `,i.querySelectorAll(".opt-res-card").forEach(o=>{o.addEventListener("click",()=>{p="mouse";const v=o.getAttribute("data-res");s[v]=!0,a("optional_resource_viewed",{trial_index:e,stimulus_id:x.stimulus_id,resource_id:v,input_modality:p,task_def_version:"1.0"}),l()})}),i.querySelectorAll(".q1-opt").forEach(o=>{const v=f=>{p=f,t=o.getAttribute("data-choice"),l()};o.addEventListener("click",()=>v("mouse")),o.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),v("keyboard"))})}),(u=document.getElementById("confirmQ1Btn"))==null||u.addEventListener("click",()=>{a("decision_submitted",{trial_index:e,stimulus_id:x.stimulus_id,choice:t,input_modality:p,task_def_version:"1.0"}),e<c.length-1?(e++,t=null,s={},n(),l()):m({mini_game:"Q1",observations_count:4})})}function n(){const x=c[e];a("decision_presented",{trial_index:e,stimulus_id:x.stimulus_id,task_def_version:"1.0"})}l()}function ge(i,r,a,m){let b=!0,e=0,t={},s=null,p="mouse";const c=[{stimulus_id:"Q2_T1",artifact_id:"manuscript_seal_1",title:"Relic 1: Wax Seal on Parchment",description:"A dark red wax seal stamped onto an old parchment document.",uncertainty_level:"moderate",expected_value:"high",clues:[{id:"CLUE_SEAL_INTAGLIO",label:"Carved Seal Border Script",detail:"Shows the official stamp of the Srinagar city office from 1862."},{id:"CLUE_WAX_RESIN",label:"Wax Material Analysis",detail:"Made with local pine resin rather than imported European wax."},{id:"CLUE_PARCHMENT_GRAIN",label:"Parchment Skin Grain",detail:"Mountain goatskin with hand-scraped natural grain."}],attributions:[{id:"attr_imperial_registrar_srinagar",label:"City Office of Srinagar (1860s)"},{id:"attr_commercial_trader",label:"River Trader Shipping Record"},{id:"attr_modern_reproduction",label:"Modern Souvenir Copy"}]},{stimulus_id:"Q2_T2",artifact_id:"ciphered_marginalia_2",title:"Relic 2: Star Chart with Handwritten Notes",description:"Handwritten notes written in old cursive script along a star chart.",uncertainty_level:"high",expected_value:"high",clues:[{id:"CLUE_CIPHER_DIACRITIC",label:"Script Number Marks",detail:"Notes record the date of an eclipse in 1845."},{id:"CLUE_SCRIBE_HAND",label:"Penmanship Style",detail:"Matches the private notebook of court scholar Mir Habib."},{id:"CLUE_GALL_INK_CORROSION",label:"Ink Aging Depth",detail:"Natural ink aging shows paper is over 170 years old."}],attributions:[{id:"attr_court_astrologer_notebook",label:"Court Scholar Personal Notebook"},{id:"attr_apothecary_recipe",label:"Herbal Medicine Recipe"},{id:"attr_random_scribble",label:"Scribe Practice Scratches"}]},{stimulus_id:"Q2_T3",artifact_id:"standard_receipt_3",title:"Relic 3: City Transit Toll Receipt (Control)",description:"A printed paper slip with standard columns and serial numbers.",uncertainty_level:"low",expected_value:"low_control",clues:[{id:"CLUE_PRINT_TYPE",label:"Standard Moveable Type",detail:"Mass-printed transit slip used for routine city transport."},{id:"CLUE_STAMP_INK",label:"Routine Blue Ink Stamp",detail:"Common government office stamp with standard numbering."}],attributions:[{id:"attr_standard_tax_slip",label:"City Transit Pass Receipt"},{id:"attr_royal_chancery_grant",label:"Palace Land Grant"},{id:"attr_secret_monastery_order",label:"Monastic Travel Permission"}]},{stimulus_id:"Q2_T4",artifact_id:"unknown_crest_impression_4",title:"Relic 4: Embossed Paper Falcon Stamp",description:"A raised paper emblem showing a falcon above mountain ridges.",uncertainty_level:"high",expected_value:"moderate",clues:[{id:"CLUE_FALCON_CREST",label:"Raised Falcon Symbol",detail:"Used by paper makers working along the Jhelum River."},{id:"CLUE_PAPER_WATERMARK",label:"Paper Watermark Inspection",detail:"Fine wire watermark includes maker initials M.K."}],attributions:[{id:"attr_jhelum_paper_atelier",label:"Jhelum River Paper Workshop"},{id:"attr_foreign_consulate_letter",label:"Foreign Embassy Stationery"},{id:"attr_unknown_unresolved",label:"Unresolved Historical Origin"}]}];function l(){var u;if(b){i.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 5: The Hidden Gallery</span>
            
          </div>
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',goal:"Inspect 4 historic relics to identify where they came from.",steps:["Read the description of the relic.","Click any clues you want to inspect.","Pick your conclusion and click Confirm."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t={},s=null,n(),l()});return}const x=c[e];i.innerHTML=`
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 5: The Hidden Gallery</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 2 minutes</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Antiquarian’s Bench</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Inspect physical clues to identify each historic object.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Examine the relic below. Inspect any clues you wish. Then choose its origin.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-4 shadow-xs rounded-xs candidate-content-protected">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-sans uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Relic Specimen</span>
            <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium">Specimen ${e+1} of 3</span>
          </div>
          <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)]">${x.title}</div>
          <div class="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">${x.description}</div>
        </div>

        <!-- INTERACTION AREA: Clues Inspection Grid -->
        <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="text-[10px] uppercase font-sans text-[var(--accent-gold)] font-semibold tracking-wider mb-2 flex items-center justify-between">
            <span>Physical Clues Available for Inspection</span>
            <span class="text-[9px] text-[var(--text-secondary)] font-normal">Click clue to examine</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            ${x.clues.map(o=>`
              <div class="clue-btn p-3.5 bg-white border ${t[o.id]?"border-[var(--accent-gold)] bg-amber-50/40 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs min-h-[48px] flex flex-col justify-between" data-clue="${o.id}" tabindex="0" role="button">
                <div class="font-medium text-[var(--text-primary)] flex items-center justify-between">
                  <span>${o.label}</span>
                  <span class="text-[9px] font-sans uppercase text-[var(--text-secondary)]">${t[o.id]?"Inspected":"Inspect"}</span>
                </div>
                ${t[o.id]?`<p class="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--grid-border)] pt-2 animate-soft-fade-in">${o.detail}</p>`:""}
              </div>
            `).join("")}
          </div>
        </div>

        <!-- YOUR CHOICE: Attribution Selection -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Conclude Historical Origin:</div>
          <div class="space-y-2.5">
            ${x.attributions.map(o=>`
              <div class="q2-attr p-3.5 bg-white border ${s===o.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-attr="${o.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 ${s===o.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${s===o.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${o.label}</span>
                </span>
                <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium shrink-0">Origin ${String.fromCharCode(65+x.attributions.indexOf(o))}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end mb-4">
          <button type="button" id="confirmQ2Btn" ${s?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
            ${e<c.length-1?"Finalize Investigation &rarr;":"Finish Antiquarian Bench &rarr;"}
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Relic ${e+1} of ${c.length}
        </div>
      </div>
    `,i.querySelectorAll(".clue-btn").forEach(o=>{const v=f=>{p=f;const h=o.getAttribute("data-clue");t[h]=!0,a("clue_inspected",{trial_index:e,stimulus_id:x.stimulus_id,artifact_id:x.artifact_id,clue_id:h,input_modality:p,task_def_version:"1.0"}),l()};o.addEventListener("click",()=>v("mouse")),o.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),v("keyboard"))})}),i.querySelectorAll(".q2-attr").forEach(o=>{const v=f=>{p=f,s=o.getAttribute("data-attr"),l()};o.addEventListener("click",()=>v("mouse")),o.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),v("keyboard"))})}),(u=document.getElementById("confirmQ2Btn"))==null||u.addEventListener("click",()=>{a("investigation_finalized",{trial_index:e,stimulus_id:x.stimulus_id,artifact_id:x.artifact_id,attribution_choice:s,input_modality:p,task_def_version:"1.0"}),e<c.length-1?(e++,t={},s=null,n(),l()):m({mini_game:"Q2",observations_count:4})})}function n(){const x=c[e];a("artifact_presented",{trial_index:e,stimulus_id:x.stimulus_id,artifact_id:x.artifact_id,uncertainty_level:x.uncertainty_level,expected_value:x.expected_value,task_def_version:"1.0"})}l()}function ye(i,r,a,m){let b=!0,e=0,t=!1,s=null,p="mouse";const c=[{stimulus_id:"Q3_E1",title:"Episode 1: The Master Painter’s Folio",ambiguity_type:"unattributed_artisan_folio",ambiguity_text:"An illuminated folio has gold dust borders and charcoal sketches. Two master painters worked during this era.",context_id:"provenance_context_1",context_title:"Rainawari Workshop Records (1870–1885)",context_text:"Records confirm Master Sadiq worked in Rainawari. He used willow-branch charcoal sketches and lapis blue borders.",decision_question:"Attribute the folio maker and technique lineage:",choices:[{id:"choice_sadiq_rainawari",label:"Master Sadiq (Rainawari workshop — willow charcoal sketch)"},{id:"choice_habib_court",label:"Master Habib (Palace court — imported graphite pencil)"},{id:"choice_generic_bazaar",label:"General City Market Production"}]},{stimulus_id:"Q3_E2",title:"Episode 2: The Exhibition Pavilion Ceiling",ambiguity_type:"mismatched_period_provenance",ambiguity_text:"A carved ceiling panel displays woodwork styles from two different rebuilding periods.",context_id:"provenance_context_2",context_title:"Dal Lake Pavilion Repair Notes (1902)",context_text:"Following the 1902 Dal Lake flood, builders used seasoned cedar wood. Earlier builders used soft river pine.",decision_question:"Identify the structural timber and repair era:",choices:[{id:"choice_post_flood_cedar",label:"Post-1902 Flood Repair (Seasoned mountain cedar wood)"},{id:"choice_pre_flood_pine",label:"Original Pre-Flood Building (Soft river pine wood)"},{id:"choice_modern_concrete",label:"Twentieth Century Replica"}]},{stimulus_id:"Q3_E3",title:"Episode 3: The Woven Silk Couplet",ambiguity_type:"regional_dialect_verse_origin",ambiguity_text:"A woven silk pashmina scarf has an old Kashmiri verse embroidered on it.",context_id:"provenance_context_3",context_title:"Valley Poetry Records (Lalla-Ded Shrines)",context_text:"Verses with this 4-beat pattern come from southern valley shrines (Pampore and Tral).",decision_question:"Select the verified cultural origin of this verse:",choices:[{id:"choice_southern_vakh_shrine",label:"Southern Valley Shrine Verse (Traditional 4-beat rhythm)"},{id:"choice_urban_court_ghazal",label:"Palace Court Scribe Poem (Formal Persian rhyming meter)"},{id:"choice_folk_bazaar_song",label:"Traveling Caravan Folk Song"}]}];function l(){var u,o;if(b){i.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 5: The Hidden Gallery</span>
            
          </div>
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',goal:"Connect archival clues to solve catalog questions across 3 episodes.",steps:["Read the historical question in each episode.","Click to open the archival research note if you need facts.","Select your catalog conclusion.","Click confirm to finish World 5."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=!1,s=null,n(),l()});return}const x=c[e];i.innerHTML=`
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 5: The Hidden Gallery</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 2 minutes</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Weaver's Chronicle</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Connect historical clues to solve catalog questions.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read the mystery below. You may open the reference note. Choose the best answer to continue.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-4 shadow-xs rounded-xs candidate-content-protected">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-sans uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Historic Case</span>
            <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium">Case ${e+1} of 3</span>
          </div>
          <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)]">${x.title}</div>
          <div class="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">${x.ambiguity_text}</div>
        </div>

        <!-- INTERACTION AREA 1: Optional Context Retrieval -->
        <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <span class="text-[10px] uppercase font-sans text-[var(--accent-gold)] font-semibold tracking-wider">Archival Research Note</span>
            ${t?'<span class="text-[10px] font-sans text-emerald-700 font-semibold uppercase">Note Opened</span>':`
              <button type="button" id="retrieveContextBtn" class="px-4 py-2 bg-white border border-[var(--grid-border)]  text-[10px] font-sans uppercase tracking-wider text-[var(--text-primary)] hover:bg-amber-50 interactive-option rounded-xs shadow-xs min-h-[44px] flex items-center justify-center gap-1.5" tabindex="0">
                <span>Open Research Note</span> &rarr;
              </button>
            `}
          </div>

          ${t?`
            <div class="p-3.5 bg-white border border-emerald-600/40 rounded-xs text-xs text-[var(--text-primary)] leading-relaxed animate-soft-fade-in">
              <div class="text-[10px] font-sans uppercase tracking-wider text-emerald-800 font-semibold mb-1">${x.context_title}</div>
              <div>${x.context_text}</div>
            </div>
          `:`
            <div class="text-xs text-[var(--text-secondary)] italic">
              Optional research notes are available to clarify historic details.
            </div>
          `}
        </div>

        <!-- YOUR CHOICE: Downstream Integration Decision -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">${x.decision_question}</div>
          <div class="space-y-2.5">
            ${x.choices.map(v=>`
              <div class="q3-choice p-3.5 bg-white border ${s===v.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-choice="${v.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 ${s===v.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${s===v.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${v.label}</span>
                </span>
                <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium shrink-0">Format ${v.id.replace("CHOICE_","")}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end mb-4">
          <button type="button" id="confirmQ3Btn" ${s?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
            ${e<c.length-1?"Confirm Choice &rarr;":"Finish World 5 &rarr;"}
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Episode ${e+1} of ${c.length}
        </div>
      </div>
    `,(u=document.getElementById("retrieveContextBtn"))==null||u.addEventListener("click",()=>{p="mouse",t=!0,a("context_requested",{trial_index:e,stimulus_id:x.stimulus_id,context_id:x.context_id,input_modality:p,task_def_version:"1.0"}),l()}),i.querySelectorAll(".q3-choice").forEach(v=>{const f=h=>{p=h,s=v.getAttribute("data-choice"),l()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(o=document.getElementById("confirmQ3Btn"))==null||o.addEventListener("click",()=>{a("decision_submitted",{trial_index:e,stimulus_id:x.stimulus_id,choice:s,input_modality:p,task_def_version:"1.0"}),e<c.length-1?(e++,t=!1,s=null,n(),l()):m({mini_game:"Q3",observations_count:3})})}function n(){const x=c[e];a("episode_presented",{trial_index:e,stimulus_id:x.stimulus_id,ambiguity_type:x.ambiguity_type,task_def_version:"1.0"})}l()}function _e(i,r){const{appContainer:a,miniGameIndex:m,gameId:b,logEvent:e,onMiniGameComplete:t}=i,s=b||(m===0?"CR1":m===1?"CR3":"CR2");s==="CR1"?we(a,r,e,t):s==="CR3"?Te(a,r,e,t):ke(a,r,e,t)}function we(i,r,a,m){let b=!0,e=0,t=[],s=null,p="mouse";const c=[{stage_id:"CR1_S1",title:"Stage 1: The Weaving Shuttle Rig",constraint:"missing_crossbar_shuttle",scenario:"A walnut loom shuttle crossbar has cracked. Build a working replacement with studio parts.",materials:[{id:"M_SPLIT_BAMBOO",name:"Split Bamboo Rib",icon:"&#127883;",role:"Flexible wooden bar"},{id:"M_BRASS_ROD",name:"Slotted Brass Rod",icon:"&#128296;",role:"Stiff metal bar"},{id:"M_CARVED_PINE",name:"Carved Pine Peg",icon:"&#129685;",role:"Lightweight wooden pin"},{id:"M_WAXED_CORD",name:"Waxed Linen Cord",icon:"&#129526;",role:"Strong binding string"},{id:"M_CERAMIC_WEIGHT",name:"Ceramic Weight",icon:"&#9711;",role:"Small balancing weight"}],valid_combinations:[["M_SPLIT_BAMBOO","M_WAXED_CORD"],["M_BRASS_ROD"],["M_CARVED_PINE","M_CERAMIC_WEIGHT"]]},{stage_id:"CR1_S2",title:"Stage 2: The Warp Tension Anchor",constraint:"tension_wire_unanchored",scenario:"The side tension cord needs an anchor point. Assemble a secure tie-down rig.",materials:[{id:"M_LEATHER_STRAP",name:"Leather Cinch Strap",icon:"&#129526;",role:"Firm gripping strap"},{id:"M_NOTCHED_PEG",name:"Hardwood Anchor Peg",icon:"&#129685;",role:"Notched wooden wedge"},{id:"M_COPPER_WIRE",name:"Flexible Copper Wire",icon:"&#9874;",role:"Bendable wrapping wire"},{id:"M_STONE_COUNTER",name:"Counterweight Stone",icon:"&#11044;",role:"Heavy balance stone"}],valid_combinations:[["M_LEATHER_STRAP","M_NOTCHED_PEG"],["M_COPPER_WIRE"],["M_LEATHER_STRAP","M_STONE_COUNTER"]]}];function l(){var u,o;if(b){i.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 6: The Broken Tool</span>
            
          </div>
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',goal:"Build a working replacement tool across 2 stages.",steps:["Read what needs to be fixed.","Click items on the workbench to add or remove them.","Click Test to check your setup, then click Confirm."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=[],s=null,n(),l()});return}const x=c[e];i.innerHTML=`
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 6: The Broken Tool</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 2 minutes</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Artisan's Assembly</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Build a working workshop fixture from available parts.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Review the broken part below. Select one or more workbench items to fix it. Multiple valid combinations exist.
          </div>
        </div>

        <!-- LOOK AT THIS: Constraint Card -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-4 shadow-xs rounded-xs candidate-content-protected">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] text-[var(--accent-gold)] font-sans uppercase tracking-wider font-semibold">Atelier Hardware Need</span>
            <span class="text-[10px] text-[var(--accent-gold)] font-medium uppercase">Stage ${e+1} of ${c.length}</span>
          </div>
          <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${x.title}</div>
          <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${x.scenario}</div>
        </div>

        <!-- INTERACTION AREA: Workbench Selection -->
        <div class="p-4 sm:p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs candidate-content-protected">
          <div class="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider mb-3">Available Workbench Components (Click to Equip)</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-4">
            ${x.materials.map(v=>{const f=t.includes(v.id);return`
                <div class="part-card p-3.5 bg-white border ${f?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex flex-col justify-between min-h-[72px]" data-id="${v.id}" tabindex="0" role="button" aria-label="${v.name}">
                  <div>
                    <div class="text-lg mb-1 text-stone-700">${v.icon}</div>
                    <div class="font-medium text-[var(--text-primary)] mb-0.5">${v.name}</div>
                    <div class="text-[10px] text-[var(--text-secondary)]">${v.role}</div>
                  </div>
                  <div class="mt-2 text-right">
                    <span class="text-[10px] font-sans font-semibold ${f?"text-[var(--accent-gold)]":"text-stone-400"}">${f?"&#10003; EQUIPPED":"+ ADD"}</span>
                  </div>
                </div>
              `}).join("")}
          </div>

          <!-- Assembly Status & Test Button -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-200">
            <div class="text-xs text-[var(--text-secondary)]">
              Equipped: <strong class="text-[var(--text-primary)]">${t.length>0?t.map(v=>{var f;return(f=x.materials.find(h=>h.id===v))==null?void 0:f.name}).join(" + "):"None selected"}</strong>
            </div>
            <button type="button" id="testAssemblyBtn" ${t.length>0?"":"disabled"} class="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[var(--text-primary)] text-xs uppercase tracking-wider disabled:opacity-40 interactive-option rounded-xs min-h-[44px]">
              Test Assembly
            </button>
          </div>

          ${s?`
            <div class="mt-3 p-3 bg-white border ${s.valid?"border-emerald-600/40 text-emerald-900":"border-amber-600/40 text-amber-900"} text-xs rounded-xs leading-relaxed animate-soft-fade-in">
              <span class="font-sans text-[10px] uppercase font-semibold block mb-0.5">${s.valid?"Assembly Test: Passed":"Assembly Test: Note"}</span>
              ${s.message}
            </div>
          `:""}
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end mb-4">
          <button type="button" id="confirmStageBtn" ${t.length>0?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
            ${e<c.length-1?"Confirm Assembly & Next Stage &rarr;":"Finish Part 1 &rarr;"}
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Stage ${e+1} of ${c.length}
        </div>
      </div>
    `,i.querySelectorAll(".part-card").forEach(v=>{const f=h=>{p=h;const g=v.getAttribute("data-id");t.includes(g)?t=t.filter(y=>y!==g):t.push(g),s=null,a("part_toggled",{stage_id:x.stage_id,trial_index:e,part_id:g,selected_parts:[...t],input_modality:p,task_def_version:"1.0"}),l()};v.addEventListener("click",()=>f("mouse")),v.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(u=document.getElementById("testAssemblyBtn"))==null||u.addEventListener("click",()=>{p="mouse";const v=new Set(t),f=x.valid_combinations.some(h=>h.every(g=>v.has(g)));s={valid:f,message:f?"Tension test passed. The loom parts balance smoothly.":"Test note: The parts wobble or do not connect tightly."},a("assembly_tested",{stage_id:x.stage_id,trial_index:e,parts:[...t],input_modality:p,task_def_version:"1.0"}),l()}),(o=document.getElementById("confirmStageBtn"))==null||o.addEventListener("click",()=>{a("stage_completed",{stage_id:x.stage_id,trial_index:e,final_parts:[...t],input_modality:p,task_def_version:"1.0"}),e<c.length-1?(e++,t=[],s=null,n(),l()):m({mini_game:"CR1",observations_count:2})})}function n(){const x=c[e];a("stage_presented",{stage_id:x.stage_id,trial_index:e,constraint:x.constraint,task_def_version:"1.0"})}l()}function ke(i,r,a,m){let b=!0,e=0,t="pre_shift",s=null,p=null,c="mouse";const l=[{episode_id:"CR2_E1",title:"Episode 1: The Central Pillar Chamber",pre_context:"Plan visitor walking paths through the grand exhibition hall.",pre_strategies:[{id:"S_CENTRAL_AVENUE",label:"Central Promenade",desc:"Single straight walkway down the center."},{id:"S_PERIMETER_LOOP",label:"Outer Wall Loop",desc:"Continuous gentle loop along outer walls."},{id:"S_ALCOVE_ISLANDS",label:"Display Islands",desc:"Separate display clusters across the floor."}],constraint_change:"central_pillar_blocks_corridor",shift_description:"Notice: A large carved stone pillar blocks the direct central pathway.",post_strategies:[{id:"split_flow",label:"Twin Walking Corridors (Split visitors smoothly around both sides of the pillar)",note:"Adapted Flow"},{id:"linear_flow",label:"Single Left Path (Route all visitors down the left aisle)",note:"Linear Channel"},{id:"stop_gap",label:"Central Waiting Area (Pause visitors and let small groups enter in turns)",note:"Batch Entry"}]},{episode_id:"CR2_E2",title:"Episode 2: West Gallery Safety Clearance",pre_context:"Arrange display stands across the wide western gallery corridor.",pre_strategies:[{id:"S_WALL_PANORAMA",label:"Wall Art Series",desc:"Continuous artwork hung along the west wall."},{id:"S_TRANSVERSE_SCREENS",label:"Crosswise Screens",desc:"Folding screens set across the corridor."},{id:"S_PAIRED_PLINTHS",label:"Center Display Stands",desc:"Two rows of waist-high display stands."}],constraint_change:"emergency_exit_clearance_widened",shift_description:"Safety rule: Keep a 3-meter wide open walkway along the west wall.",post_strategies:[{id:"perimeter_flow",label:"Clear Wall Pathway (Move displays inward to leave the west wall open)",note:"Adapted Flow"},{id:"central_cluster",label:"Center Grouping (Gather all stands tightly in the room center)",note:"Center Group"},{id:"diagonal_crossing",label:"Diagonal Zigzag (Weave walking paths between the doorways)",note:"Zigzag Path"}]},{episode_id:"CR2_E3",title:"Episode 3: North Archway Clearance",pre_context:"Display vertical banners and artwork in the north wing.",pre_strategies:[{id:"S_TALL_STELAE",label:"Tall Wooden Posts",desc:"Four-meter tall vertical banner posts."},{id:"S_HORIZONTAL_VITRINES",label:"Low Table Vitrines",desc:"Flat glass vitrines at waist height."},{id:"S_CEILING_SUSPENSION",label:"Ceiling Silk Banners",desc:"Flowing fabric banners hung from rafters."}],constraint_change:"low_ceiling_arch_support",shift_description:"Structural inspection: Low wooden ceiling beams limit overhead room to 2.2 meters.",post_strategies:[{id:"linear_flow",label:"Low Table Vitrines (Use waist-high displays to preserve headroom)",note:"Adapted Flow"},{id:"canopy_tent",label:"Hanging Fabric Canopy (Drape thin cloth below the beams)",note:"Low Drapery"},{id:"staggered_alcoves",label:"Wall Post Leaning (Lean tall banner boards against walls)",note:"Wall Lean"}]}];function n(){var o,v,f;if(b){i.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 6: The Broken Tool</span>
            
          </div>
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',goal:"Pick a layout strategy, then adapt your plan when a space condition changes.",steps:["Review the gallery space and pick an initial floor plan.","A structural change will appear in the room.","Choose how to adapt your plan to the new condition.","Confirm your choice across 3 episodes."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t="pre_shift",s=null,p=null,x(),n()});return}const u=l[e];t==="pre_shift"?(i.innerHTML=`
        <div class="animate-soft-fade-in">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 6: The Broken Tool</span>
              
            </div>
            <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 2 minutes</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Spatial Pivot</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Adapt room layouts when conditions shift.</p>
          </div>

          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">
              Read the room context below. Choose an initial layout concept for the gallery space.
            </div>
          </div>

          <!-- LOOK AT THIS: Context Card -->
          <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-4 shadow-xs rounded-xs candidate-content-protected">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[10px] text-[var(--accent-gold)] font-sans uppercase tracking-wider font-semibold">Gallery Layout Setting</span>
              <span class="text-[10px] text-[var(--accent-gold)] font-medium uppercase">Episode ${e+1} of ${l.length}</span>
            </div>
            <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${u.title}</div>
            <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${u.pre_context}</div>
          </div>

          <!-- INTERACTION AREA: Initial Strategy Selection -->
          <div class="mb-5 space-y-2.5 candidate-content-protected">
            <div class="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider">Select Initial Curation Concept:</div>
            ${u.pre_strategies.map(h=>{const g=s===h.id;return`
                <div class="pre-strat-card p-3.5 sm:p-4 bg-white border ${g?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-id="${h.id}" tabindex="0" role="button" aria-label="${h.label}">
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">${h.label}</div>
                    <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">${h.desc}</div>
                  </div>
                  <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 ${g?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${g?"&#10003;":""}</span>
                </div>
              `}).join("")}
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end mb-4">
            <button type="button" id="confirmPreShiftBtn" ${s?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
              Set Plan & Proceed &rarr;
            </button>
          </div>

          <!-- Progress Footer -->
          <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
            Episode ${e+1} of ${l.length} &middot; Step 1
          </div>
        </div>
      `,i.querySelectorAll(".pre-strat-card").forEach(h=>{const g=y=>{c=y,s=h.getAttribute("data-id"),n()};h.addEventListener("click",()=>g("mouse")),h.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),g("keyboard"))})}),(o=document.getElementById("confirmPreShiftBtn"))==null||o.addEventListener("click",()=>{a("initial_strategy_selected",{episode_id:u.episode_id,trial_index:e,strategy_id:s,input_modality:c,task_def_version:"1.0"}),a("constraint_shifted",{episode_id:u.episode_id,trial_index:e,constraint_change:u.constraint_change,task_def_version:"1.0"}),t="post_shift",p=s,n()})):(i.innerHTML=`
        <div class="animate-soft-fade-in">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 6: The Broken Tool</span>
              
            </div>
            <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Condition Shift</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Spatial Pivot</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Adapt room layouts when conditions shift.</p>
          </div>

          <!-- Constraint Shift Notification Banner -->
          <div class="p-4 bg-amber-50 border border-amber-300/80 mb-4 rounded-xs animate-soft-fade-in candidate-content-protected">
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2 h-2 rounded-full bg-amber-600 "></span>
              <span class="text-[10px] font-sans uppercase tracking-wider text-amber-900 font-bold">New Room Condition Detected</span>
            </div>
            <div class="text-xs text-amber-950 leading-relaxed font-serif">${u.shift_description}</div>
            <div class="mt-2 text-[11px] text-amber-800">
              Prior Plan: <strong>${((v=u.pre_strategies.find(h=>h.id===s))==null?void 0:v.label)||s}</strong>
            </div>
          </div>

          <!-- INTERACTION AREA: Post-Shift Strategy Selection -->
          <div class="mb-5 space-y-2.5 candidate-content-protected">
            <div class="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider">Choose Adapted Layout:</div>
            ${u.post_strategies.map(h=>{const g=p===h.id;return`
                <div class="post-strat-card p-3.5 sm:p-4 bg-white border ${g?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-id="${h.id}" tabindex="0" role="button" aria-label="${h.label}">
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">${h.label}</div>
                    <div class="text-[10px] font-sans text-[var(--text-secondary)] mt-0.5">${h.note}</div>
                  </div>
                  <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 ${g?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${g?"&#10003;":""}</span>
                </div>
              `}).join("")}
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end mb-4">
            <button type="button" id="confirmPostShiftBtn" ${p?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
              ${e<l.length-1?"Confirm Plan & Next Episode &rarr;":"Finish Part 2 &rarr;"}
            </button>
          </div>

          <!-- Progress Footer -->
          <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
            Episode ${e+1} of ${l.length} &middot; Step 2
          </div>
        </div>
      `,i.querySelectorAll(".post-strat-card").forEach(h=>{const g=y=>{c=y,p=h.getAttribute("data-id"),n()};h.addEventListener("click",()=>g("mouse")),h.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),g("keyboard"))})}),(f=document.getElementById("confirmPostShiftBtn"))==null||f.addEventListener("click",()=>{a("strategy_revised",{episode_id:u.episode_id,trial_index:e,initial_strategy_id:s,revised_strategy_id:p,input_modality:c,task_def_version:"1.0"}),e<l.length-1?(e++,t="pre_shift",s=null,p=null,x(),n()):m({mini_game:"CR2",observations_count:3})}))}function x(){const u=l[e];a("episode_presented",{episode_id:u.episode_id,trial_index:e,initial_context:u.pre_context,task_def_version:"1.0"})}n()}function Te(i,r,a,m){let b=!0,e=0,t=null,s=null,p=null,c="mouse";const l=[{stimulus_id:"CR3_T1",title:"Trial 1: The Crisp Paper Fold",target_motif:"burnished_crease",objective:"Form a sharp, smooth crease on thick paper without tearing surface fibers.",tools:[{id:"bone_folder",name:"Polished Bone Tool",icon:"&#129685;",affordance:"Smooth curved edge that applies friction gently"},{id:"metal_stylus",name:"Steel Scribe Stylus",icon:"&#128296;",affordance:"Hard pointed needle tip for sharp indentation"},{id:"bamboo_wedge",name:"Beveled Bamboo Scraper",icon:"&#127883;",affordance:"Broad flat wooden face for broad surface pressure"}],methods:[{id:"firm_edge_pass",name:"Firm Edge Pass",desc:"Slide rounded edge along ruler with continuous diagonal pressure."},{id:"flat_face_rub",name:"Flat Face Rub",desc:"Distribute wide surface friction across fold line."},{id:"sharp_point_drag",name:"Sharp Point Drag",desc:"Draw tip directly across surface to score the fiber line."}],feedback_map:{"bone_folder:firm_edge_pass":{success:!0,text:"Clean, crisp burnished crease formed with zero surface abrasion."},"bamboo_wedge:flat_face_rub":{success:!0,text:"Smooth, even flattened fold achieved without marring surface grain."},"metal_stylus:sharp_point_drag":{success:!1,text:"Paper fibers sliced; sharp point cut through the paper fold."},"metal_stylus:firm_edge_pass":{success:!1,text:"Metal edge left dark metallic friction scuffs across the parchment."},"bone_folder:flat_face_rub":{success:!0,text:"Gentle, even crease formed; fibers compressed smoothly."},"bamboo_wedge:firm_edge_pass":{success:!0,text:"Uniform clean fold line established with natural wood contour."},"bone_folder:sharp_point_drag":{success:!1,text:"Uneven dragging motion; point dented paper surface."},"bamboo_wedge:sharp_point_drag":{success:!1,text:"Wood corner snagged on rough paper grain."},"metal_stylus:flat_face_rub":{success:!1,text:"Insufficient surface area; uneven pressure indentation."}}},{stimulus_id:"CR3_T2",title:"Trial 2: Mulberry Paper Stipple",target_motif:"fine_stipple",objective:"Produce an even scatter of tiny ink drops on fibrous paper.",tools:[{id:"horsehair_brush",name:"Stiff Hair Brush",icon:"&#128396;",affordance:"Springy stiff bristles that snap back easily"},{id:"sponge_block",name:"Natural Sea Sponge",icon:"&#9711;",affordance:"Soft porous texture that dabs damp color"},{id:"linen_swab",name:"Rolled Cloth Swab",icon:"&#129526;",affordance:"Rolled fabric tip that absorbs liquid quickly"}],methods:[{id:"textured_flick",name:"Bristle Flick",desc:"Pull loaded bristles back with thumb to release fine mist."},{id:"mottled_dab",name:"Surface Dab",desc:"Light stamp of textured surface directly on paper."},{id:"drag_stroke",name:"Smooth Sweep",desc:"Draw applicator steadily across page in sweeping stroke."}],feedback_map:{"horsehair_brush:textured_flick":{success:!0,text:"Fine, even constellation of organic micro-droplets dispersed across parchment."},"sponge_block:mottled_dab":{success:!0,text:"Rich textured tonal stipple with soft, organic cellular grain."},"linen_swab:drag_stroke":{success:!1,text:"Produced a single continuous solid streak; zero stipple effect."},"linen_swab:textured_flick":{success:!1,text:"Fabric has no elastic bristle snap; pigment remained bound in swab."},"sponge_block:drag_stroke":{success:!1,text:"Smeared broad irregular smudge across paper."},"horsehair_brush:drag_stroke":{success:!1,text:"Solid brushstroke line created; no dispersed speckling."},"horsehair_brush:mottled_dab":{success:!0,text:"Bristle tips formed delicate speckled texture upon contact."},"sponge_block:textured_flick":{success:!1,text:"Sponge cannot be flicked; dropped heavy inconsistent blot."},"linen_swab:mottled_dab":{success:!1,text:"Dense blot soaked through fiber without texture."}}},{stimulus_id:"CR3_T3",title:"Trial 3: Gold Leaf Polish",target_motif:"gold_leaf_seal",objective:"Smooth delicate gold leaf onto a seal for a mirror-like shine.",tools:[{id:"agate_stone",name:"Agate Burnisher Stone",icon:"&#11044;",affordance:"Silky smooth gemstone tip with zero friction"},{id:"polished_wood",name:"Dense Boxwood Block",icon:"&#129685;",affordance:"Dense wood block that gives flat pressure"},{id:"copper_burnisher",name:"Curved Copper Spoon",icon:"&#129348;",affordance:"Polished metal curve for gentle gliding"}],methods:[{id:"friction_free_rub",name:"Small Circles",desc:"Small circular motions with light steady contact."},{id:"planar_press",name:"Flat Press",desc:"Straight downward pressure without sliding sideways."},{id:"chisel_scrape",name:"Angled Scrape",desc:"Drag across surface with sharp edge."}],feedback_map:{"agate_stone:friction_free_rub":{success:!0,text:"Flawless mirror-like specular gold luster achieved with zero abrasion."},"polished_wood:planar_press":{success:!0,text:"Uniformly bonded gold leaf with balanced satin foundation."},"copper_burnisher:friction_free_rub":{success:!0,text:"Deep warm metallic sheen burnished smoothly over seal."},"agate_stone:planar_press":{success:!0,text:"Firm adhesion established; solid reflective gilding."},"polished_wood:friction_free_rub":{success:!0,text:"Subtle warm satin luster across gold leaf."},"copper_burnisher:planar_press":{success:!0,text:"Stable flat bond achieved under spoon bowl."},"agate_stone:chisel_scrape":{success:!1,text:"Hard edge scratched through delicate gold foil."},"polished_wood:chisel_scrape":{success:!1,text:"Wood corner tore gold leaf away from size."},"copper_burnisher:chisel_scrape":{success:!1,text:"Metal rim gouged underlying paper impression."}}}];function n(){var o,v,f,h;if(b){i.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 6: The Broken Tool</span>
            
          </div>
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>',goal:"Choose and test tools for craft tasks across 3 rounds.",steps:["Read the craft goal on the workbench.","Pick a tool and choose how you will use it.","Click Test Technique to see the result, then click Confirm."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,t=null,s=null,p=null,x(),n()});return}const u=l[e];i.innerHTML=`
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 6: The Broken Tool</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 2 minutes</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Improvised Tool</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Adapt craft technique from physical feedback.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Pick a tool and an action method below. Click Apply Technique to test your result. You can change your choice before confirming.
          </div>
        </div>

        <!-- LOOK AT THIS: Craft Objective Card -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-4 shadow-xs rounded-xs candidate-content-protected">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] text-[var(--accent-gold)] font-sans uppercase tracking-wider font-semibold">Craft Objective</span>
            <span class="text-[10px] text-[var(--accent-gold)] font-medium uppercase">Trial ${e+1} of ${l.length}</span>
          </div>
          <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${u.title}</div>
          <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${u.objective}</div>
        </div>

        <!-- INTERACTION AREA 1: Tool Selection -->
        <div class="mb-4 candidate-content-protected">
          <div class="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider mb-2">1. Select Implement:</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            ${u.tools.map(g=>`
                <div class="cr3-tool-card p-3.5 sm:p-4 bg-white border ${t===g.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs min-h-[64px]" data-id="${g.id}" tabindex="0" role="button" aria-label="${g.name}">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-lg">${g.icon}</span>
                    <span class="font-medium text-[var(--text-primary)]">${g.name}</span>
                  </div>
                  <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${g.affordance}</div>
                </div>
              `).join("")}
          </div>
        </div>

        <!-- INTERACTION AREA 2: Method Selection -->
        <div class="mb-4 candidate-content-protected">
          <div class="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider mb-2">2. Choose Action Method:</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            ${u.methods.map(g=>`
                <div class="cr3-method-card p-3.5 sm:p-4 bg-white border ${s===g.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs min-h-[64px]" data-id="${g.id}" tabindex="0" role="button" aria-label="${g.name}">
                  <div class="font-medium text-[var(--text-primary)] mb-0.5">${g.name}</div>
                  <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${g.desc}</div>
                </div>
              `).join("")}
          </div>
        </div>

        <!-- Apply & Observe Feedback -->
        <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 candidate-content-protected">
          <div class="text-xs text-[var(--text-secondary)]">
            Active Pairing: <strong class="text-[var(--text-primary)]">${t?(o=u.tools.find(g=>g.id===t))==null?void 0:o.name:"None"} + ${s?(v=u.methods.find(g=>g.id===s))==null?void 0:v.name:"None"}</strong>
          </div>
          <button type="button" id="applyTechniqueBtn" ${t&&s?"":"disabled"} class="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[var(--text-primary)] text-xs uppercase tracking-wider disabled:opacity-40 interactive-option rounded-xs min-h-[44px]">
            Apply Technique
          </button>
        </div>

        ${p?`
          <div class="p-4 bg-white border ${p.success?"border-emerald-600/40 text-emerald-950":"border-amber-600/40 text-amber-950"} mb-4 rounded-xs text-xs leading-relaxed animate-soft-fade-in candidate-content-protected">
            <div class="font-sans text-[10px] uppercase font-semibold mb-1 ${p.success?"text-emerald-800":"text-amber-800"}">Material Outcome Observation</div>
            <div>${p.text}</div>
          </div>
        `:""}

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end mb-4">
          <button type="button" id="confirmTrialBtn" ${t&&s?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
            ${e<l.length-1?"Confirm Technique & Next Trial &rarr;":"Finish World 6 &rarr;"}
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Trial ${e+1} of ${l.length}
        </div>
      </div>
    `,i.querySelectorAll(".cr3-tool-card").forEach(g=>{const y=_=>{c=_,t=g.getAttribute("data-id"),a("tool_selected",{stimulus_id:u.stimulus_id,trial_index:e,tool_id:t,input_modality:c,task_def_version:"1.0"}),n()};g.addEventListener("click",()=>y("mouse")),g.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),y("keyboard"))})}),i.querySelectorAll(".cr3-method-card").forEach(g=>{const y=_=>{c=_,s=g.getAttribute("data-id"),n()};g.addEventListener("click",()=>y("mouse")),g.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),y("keyboard"))})}),(f=document.getElementById("applyTechniqueBtn"))==null||f.addEventListener("click",()=>{c="mouse";const g=`${t}:${s}`,y=u.feedback_map[g]||{success:!1,text:"No noticeable craft adaptation observed."};p=y,a("action_applied",{stimulus_id:u.stimulus_id,trial_index:e,tool_id:t,action_method:s,input_modality:c,task_def_version:"1.0"}),a("feedback_observed",{stimulus_id:u.stimulus_id,trial_index:e,tool_id:t,action_method:s,outcome_feedback:y.text,task_def_version:"1.0"}),n()}),(h=document.getElementById("confirmTrialBtn"))==null||h.addEventListener("click",()=>{a("strategy_adapted",{stimulus_id:u.stimulus_id,trial_index:e,final_tool_id:t,final_method:s,input_modality:c,task_def_version:"1.0"}),e<l.length-1?(e++,t=null,s=null,p=null,x(),n()):m({mini_game:"CR3",observations_count:3})})}function x(){const u=l[e];a("trial_presented",{stimulus_id:u.stimulus_id,trial_index:e,target_motif:u.target_motif,task_def_version:"1.0"})}n()}function Se(i,r){const{appContainer:a,miniGameIndex:m,gameId:b,logEvent:e,onMiniGameComplete:t}=i,s=b||(m===0?"M1":m===1?"M2":"M3");s==="M1"?Ce(a,r,e,t):s==="M2"?Ae(a,r,e,t):Ee(a,r,e,t)}function Ce(i,r,a,m){let b=!0,e=0,t="mouse";const s=[{stimulus_id:"M1_U1",recipient:"Master Ghulam — Calligraphy Diwan",note:"Formal invitation envelope 1"},{stimulus_id:"M1_U2",recipient:"Valley Youth Literary Guild",note:"Formal invitation envelope 2"},{stimulus_id:"M1_U3",recipient:"Regional Heritage Conservation Archive",note:"Formal invitation envelope 3"}];function p(){var n;if(b){i.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 7: The Repetition</span>
            
          </div>
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',goal:"Apply wax seals to 3 invitation envelopes.",steps:["Look at the named recipient on the envelope.","Click the button to apply the wax seal.","Completing all 3 envelopes finishes this activity."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,c(),p()});return}const l=s[e];i.innerHTML=`
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 7: The Repetition</span>
            
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Ceremonial Seal</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Apply wax seals to event invitations.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Review the recipient below. Click Press Wax Seal. Completing all 3 fulfills this activity.
          </div>
        </div>

        <!-- LOOK AT THIS: Envelope Preview -->
        <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 text-center shadow-xs rounded-xs candidate-content-protected">
          <div class="w-full max-w-sm mx-auto min-h-[140px] bg-amber-50/70 border border-[var(--grid-border)] flex flex-col items-center justify-center p-5 relative shadow-sm rounded-xs">
            <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-sans">Ceremonial Invitation</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1.5">${l.recipient}</div>
            <div class="text-[11px] text-stone-500 mt-0.5">${l.note}</div>

            <div id="sealDisplay" class="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-[10px] text-[var(--accent-gold)] font-bold shadow-xs">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
            </div>
          </div>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end mb-4">
          <button type="button" id="stampBtn" class="px-8 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] interactive-option shadow-sm flex items-center justify-center gap-2 rounded-xs w-full sm:w-auto min-h-[44px]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Press Wax Seal &rarr;
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Envelope ${e+1} of ${s.length} (Required Minimum: 3)
        </div>
      </div>
    `,(n=document.getElementById("stampBtn"))==null||n.addEventListener("click",()=>{t="mouse",a("unit_action_performed",{stimulus_id:l.stimulus_id,unit_index:e,action_type:"press_wax_seal",input_modality:t,task_def_version:"1.0"}),a("unit_completed",{stimulus_id:l.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<s.length-1?(e++,c(),p()):m({mini_game:"M1",observations_count:s.length})})}function c(){const l=s[e];a("unit_presented",{stimulus_id:l.stimulus_id,unit_index:e,is_mandatory:!0,task_def_version:"1.0"})}p()}function Ae(i,r,a,m){let b=!0,e="mandatory",t=0,s=0,p="mouse";const c=[{stimulus_id:"M2_M1",label:"Guest Folder 1: Artisan Guild",is_mandatory:!0},{stimulus_id:"M2_M2",label:"Guest Folder 2: Regional Patrons",is_mandatory:!0},{stimulus_id:"M2_M3",label:"Guest Folder 3: Visiting Artists",is_mandatory:!0}],l=[{stimulus_id:"M2_O1",label:"Extra Folder 1: Visiting Students",is_mandatory:!1},{stimulus_id:"M2_O2",label:"Extra Folder 2: Community Observers",is_mandatory:!1},{stimulus_id:"M2_O3",label:"Extra Folder 3: Studio Assistants",is_mandatory:!1}];function n(){var u,o,v,f,h;if(b){i.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 7: The Repetition</span>
            
          </div>
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',goal:"Stamp 3 required folders, then decide if you want to continue.",steps:["Stamp the 3 required guest folders.","After folder 3, you choose whether to finish or do optional extras.","Stopping after 3 is completely fine and has no penalty."]})}
        </div>
      `,k(i,()=>{b=!1,e="mandatory",t=0,s=0,x(c[0]),n()});return}if(e==="mandatory"){const g=c[t];i.innerHTML=`
        <div class="animate-soft-fade-in">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 7: The Repetition</span>
              
            </div>
            <div class="text-[11px] text-amber-800 font-sans font-medium">Required Phase (${t+1}/3)</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Courtesy Sleeves</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Prepare courtesy sleeves for event attendees.</p>
          </div>

          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">
              Assemble the required folder below. Three required folders are needed to satisfy this activity.
            </div>
          </div>

          <!-- LOOK AT THIS: Folder Card -->
          <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 text-center shadow-xs rounded-xs candidate-content-protected">
            <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase tracking-wider text-stone-500 font-sans">Required Courtesy Folder</span>
              <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${g.label}</div>
            </div>
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end mb-4">
            <button type="button" id="foldSleeveBtn" class="px-8 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
              Assemble Required Folder &rarr;
            </button>
          </div>

          <!-- Progress Footer -->
          <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
            Required Folder ${t+1} of ${c.length}
          </div>
        </div>
      `,(u=document.getElementById("foldSleeveBtn"))==null||u.addEventListener("click",()=>{p="mouse",a("unit_action_performed",{stimulus_id:g.stimulus_id,unit_index:t,action_type:"assemble_sleeve",input_modality:p,task_def_version:"1.0"}),a("unit_completed",{stimulus_id:g.stimulus_id,unit_index:t,is_mandatory:!0,task_def_version:"1.0"}),t<c.length-1?(t++,x(c[t]),n()):(e="choice",a("choice_presented",{trial_index:c.length,mandatory_completed_count:c.length,task_def_version:"1.0"}),n())})}else if(e==="choice")i.innerHTML=`
        <div class="animate-soft-fade-in">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 7: The Repetition</span>
              
            </div>
            <div class="text-[11px] text-emerald-800 font-sans font-medium">Requirement Completed</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Courtesy Sleeves</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Required minimum completed.</p>
          </div>

          <!-- LOOK AT THIS: Choice Card -->
          <div class="p-6 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs text-center candidate-content-protected">
            <div class="w-10 h-10 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 text-lg mb-2">
              &#10003;
            </div>
            <div class="text-sm font-serif font-semibold text-[var(--text-primary)] mb-1">Required Minimum Satisfied</div>
            <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mb-6">
              You have completed the required 3 courtesy folders. You may conclude this activity now, or make up to ${l.length-s} extra folders.
              <br><strong class="text-stone-700 mt-1 inline-block">Stopping at the minimum is completely neutral.</strong>
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button type="button" id="concludeBtn" class="px-6 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
                Conclude Activity Now &rarr;
              </button>
              ${s<l.length?`
                <button type="button" id="continueOptionalBtn" class="px-6 py-3.5 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-widest hover:bg-amber-50 interactive-option shadow-xs rounded-xs w-full sm:w-auto min-h-[44px]">
                  + Prepare Extra Folder (${s+1}/${l.length})
                </button>
              `:""}
            </div>
          </div>

          <!-- Progress Footer -->
          <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
            Choice Point &middot; Stopping is neutral
          </div>
        </div>
      `,(o=document.getElementById("concludeBtn"))==null||o.addEventListener("click",()=>{p="mouse",a("continuation_choice_selected",{choice:"conclude",optional_index:s,input_modality:p,task_def_version:"1.0"}),m({mini_game:"M2",observations_count:c.length+s})}),(v=document.getElementById("continueOptionalBtn"))==null||v.addEventListener("click",()=>{p="mouse",a("continuation_choice_selected",{choice:"continue",optional_index:s,input_modality:p,task_def_version:"1.0"}),e="optional",x(l[s]),n()});else if(e==="optional"){const g=l[s];i.innerHTML=`
        <div class="animate-soft-fade-in">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 7: The Repetition</span>
              
            </div>
            <div class="text-[11px] text-emerald-800 font-sans font-medium">Voluntary Extra</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Courtesy Sleeves</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Voluntary extra folder preparation.</p>
          </div>

          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-emerald-50/70 border border-emerald-400/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-sans text-emerald-800 font-semibold mb-1">Voluntary Extra</div>
            <div class="text-xs text-emerald-950 leading-relaxed">
              You may assemble this extra folder or finish at any time. Stopping is completely neutral.
            </div>
          </div>

          <!-- LOOK AT THIS: Folder Card -->
          <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 text-center shadow-xs rounded-xs candidate-content-protected">
            <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase tracking-wider text-stone-500 font-sans">Voluntary Courtesy Folder</span>
              <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${g.label}</div>
            </div>
          </div>

          <!-- PRIMARY ACTION BUTTONS -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <button type="button" id="stopOptionalEarlyBtn" class="px-5 py-3 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs uppercase tracking-wider interactive-option rounded-xs w-full sm:w-auto min-h-[44px]">
              Conclude Now
            </button>
            <button type="button" id="foldOptionalSleeveBtn" class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
              Assemble Extra Folder &rarr;
            </button>
          </div>

          <!-- Progress Footer -->
          <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
            Extra Folder ${s+1} of ${l.length}
          </div>
        </div>
      `,(f=document.getElementById("stopOptionalEarlyBtn"))==null||f.addEventListener("click",()=>{p="mouse",a("continuation_choice_selected",{choice:"conclude",optional_index:s,input_modality:p,task_def_version:"1.0"}),m({mini_game:"M2",observations_count:c.length+s})}),(h=document.getElementById("foldOptionalSleeveBtn"))==null||h.addEventListener("click",()=>{p="mouse",a("unit_action_performed",{stimulus_id:g.stimulus_id,unit_index:c.length+s,action_type:"assemble_sleeve",input_modality:p,task_def_version:"1.0"}),a("unit_completed",{stimulus_id:g.stimulus_id,unit_index:c.length+s,is_mandatory:!1,task_def_version:"1.0"}),s++,s<l.length?(e="choice",a("choice_presented",{trial_index:c.length+s,mandatory_completed_count:c.length,task_def_version:"1.0"}),n()):m({mini_game:"M2",observations_count:c.length+s})})}}function x(u){a("unit_presented",{stimulus_id:u.stimulus_id,unit_index:u.is_mandatory?t:c.length+s,is_mandatory:u.is_mandatory,task_def_version:"1.0"})}n()}function Ee(i,r,a,m){let b=!0,e=0,t="mouse";const s=[{stimulus_id:"M3_U1",is_mandatory:!0,row_name:"Gallery Row 1: Lighting & Illumination Alignment",feedback_type:"salient"},{stimulus_id:"M3_U2",is_mandatory:!0,row_name:"Gallery Row 2: Poetry Anthologies Welcome Stand",feedback_type:"moderate"},{stimulus_id:"M3_U3",is_mandatory:!0,row_name:"Gallery Row 3: Courtyard Entry Floral Registry",feedback_type:"minimal"},{stimulus_id:"M3_U4",is_mandatory:!1,row_name:"Gallery Row 4: Auxiliary Bench Linen Inspection",feedback_type:"none"},{stimulus_id:"M3_U5",is_mandatory:!1,row_name:"Gallery Row 5: Outer Colonnade Lantern Wick Inspection",feedback_type:"none"},{stimulus_id:"M3_U6",is_mandatory:!1,row_name:"Gallery Row 6: Perimeter Garden Urn Water Check",feedback_type:"none"}],p=3;function c(){var u,o;if(b){i.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 7: The Repetition</span>
            
          </div>
          ${w({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',goal:"Verify checklist rows for gallery preparation. A minimum of 3 rows is required.",steps:["Mandatory requirement: Exactly 3 checklist rows.","Completing 3 rows satisfies this activity.","You may conclude at any time after row 3, or continue. Stopping is neutral.","Feedback messages become shorter on later rows. This is normal and intentional."]})}
        </div>
      `,k(i,()=>{b=!1,e=0,l(),c()});return}const n=s[e],x=e>=p;i.innerHTML=`
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 7: The Repetition</span>
            
          </div>
          <div class="text-[11px] ${x?"text-emerald-800":"text-amber-800"} font-sans font-medium">
            ${x?"Optional Continuation":"Required Minimum (3)"}
          </div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Evening Registry</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            ${x?"Requirement met (3/3). You may conclude now or continue.":"Mandatory requirement: 3 rows. Completing 3 satisfies the activity."}
          </p>
        </div>

        ${x?`
          <div class="p-3.5 bg-stone-50 border border-stone-200 rounded-xs text-xs text-stone-700 mb-4 space-y-1 candidate-content-protected">
            <div class="flex items-center justify-between">
              <span class="font-medium text-[var(--text-primary)]">Mandatory minimum completed (3 of 3 rows).</span>
              <span class="text-[10px] font-sans text-stone-500 uppercase font-semibold">Stopping is neutral</span>
            </div>
            <p class="text-[11px] text-stone-600 leading-relaxed">
              You may finish this activity now, or verify extra rows. Feedback details decrease on later rows; this is normal and intentional.
            </p>
          </div>
        `:`
          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">
              Review the checklist row below and click Verify Row. Completing 3 rows satisfies the activity.
            </div>
          </div>
        `}

        <!-- LOOK AT THIS: Registry Row Item -->
        <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 text-center shadow-xs rounded-xs candidate-content-protected">
          <div class="max-w-md mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
            <span class="text-[10px] uppercase tracking-wider text-stone-400 font-sans">Checklist Item</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${n.row_name}</div>
          </div>
        </div>

        <!-- PRIMARY ACTION BUTTONS -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            ${x?`
              <button type="button" id="concludeM3Btn" class="px-6 py-3 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs uppercase tracking-wider interactive-option rounded-xs w-full sm:w-auto min-h-[44px]">
                Conclude Activity &rarr;
              </button>
            `:"<span></span>"}
          </div>
          <button type="button" id="verifyRowBtn" class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
            Verify Row &rarr;
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Row ${e+1} of ${s.length}
        </div>
      </div>
    `,(u=document.getElementById("concludeM3Btn"))==null||u.addEventListener("click",()=>{t="mouse",a("conclude_selected",{stimulus_id:n.stimulus_id,unit_index:e,total_units_completed:e,input_modality:t,task_def_version:"1.0"}),m({mini_game:"M3",observations_count:e})}),(o=document.getElementById("verifyRowBtn"))==null||o.addEventListener("click",()=>{t="mouse",a("unit_action_performed",{stimulus_id:n.stimulus_id,unit_index:e,action_type:"verify_registry_entry",input_modality:t,task_def_version:"1.0"}),a("unit_completed",{stimulus_id:n.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<s.length-1?(e++,l(),c()):m({mini_game:"M3",observations_count:s.length})})}function l(){const n=s[e];a("trial_presented",{stimulus_id:n.stimulus_id,unit_index:e,is_mandatory:n.is_mandatory,task_def_version:"1.0"})}c()}const Re={W1:{name:"The Frequency",name_ur:"آواز",subtitle:"Acoustics & Dialogue"},W2:{name:"The Archive",name_ur:"دستاویز",subtitle:"Manuscripts & Preservation"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ کینوس",subtitle:"Artisan Workshop"},W4:{name:"The Shifting Grid",name_ur:"بدلتا گرڈ",subtitle:"Mosaic & Rhythm"},W5:{name:"The Hidden Gallery",name_ur:"پوشیدہ گیلری",subtitle:"Exhibition Discovery"},W6:{name:"The Broken Tool",name_ur:"ٹوٹا آلہ",subtitle:"Material Assembly"},W7:{name:"The Repetition",name_ur:"دہرائی",subtitle:"Readiness & Ceremony"}},H={W1:["F1","F2"],W2:["A1","A2"],W3:["C1","C2"],W4:["E1","E2"],W5:["Q1","Q2"],W6:["CR1","CR3"],W7:["M1","M2"]};function w({icon:i,goal:r,steps:a}){return`
    <div class="tutorial-card cursor-pointer p-6 border border-[var(--accent-gold)] bg-gradient-to-br from-[#faf8f5] to-[#f5efe8] space-y-4 mb-6 interactive-option duration-300" tabindex="0" role="button" aria-label="Begin Activity Guide">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-amber-100/80 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] shrink-0">
          ${i||'<i data-lucide="compass" class="w-5 h-5"></i>'}
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-medium">Activity Guide &middot; رہنمائے عمل</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] font-semibold">${r}</h3>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        ${a.map((m,b)=>`
          <div class="bg-white/80 border border-[var(--grid-border)] p-3 flex items-start gap-2.5">
            <span class="w-5 h-5 rounded-full bg-[var(--accent-gold)] text-white text-[10px] flex items-center justify-center font-serif shrink-0 mt-0.5">${b+1}</span>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">${m}</div>
          </div>
        `).join("")}
      </div>

      <div class="pt-2 flex justify-between items-center">
        <span class="text-[11px] text-[var(--text-secondary)] italic">Click anywhere or press Enter to begin</span>
        <button id="startActivityBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] interactive-option flex items-center gap-2">
          Begin Activity &rarr;
        </button>
      </div>
    </div>
  `}function k(i,r){let a=!1;const m=t=>{t&&(typeof t.preventDefault=="function"&&t.preventDefault(),typeof t.stopPropagation=="function"&&t.stopPropagation()),!a&&(a=!0,r())},b=i.querySelector("#startActivityBtn"),e=i.querySelector(".tutorial-card");b&&b.addEventListener("click",m,{once:!0}),e&&(e.addEventListener("click",t=>{m(t)},{once:!0}),e.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&m(t)},{once:!0}))}function Ie(i){const{appContainer:r,worldCode:a,worldIndex:m,miniGameIndex:b,gameId:e,onMiniGameComplete:t}=i,s=Re[a]||{name:"Alfaaz Workshop",name_ur:""},p=e||H[a]&&H[a][b]||null,c={...i,gameId:p},l=(n,x)=>`
    <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
      <div>
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${m+1} of 7: ${s.name}</span>
          <span class="font-serif text-base sm:text-lg text-[var(--text-secondary)]" style="direction: rtl;">${s.name_ur}</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${n}</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">${x}</p>
      </div>
      
    </div>
  `;switch(a){case"W1":re(c,l);break;case"W2":te(c,l);break;case"W3":le(c,l);break;case"W4":me(c,l);break;case"W5":fe(c,l);break;case"W6":_e(c,l);break;case"W7":Se(c,l);break;default:t&&t({});break}}function $e(){const i=window.ALFAAZ_API_URL||"";i&&(fetch(i+"/ping").catch(()=>{}),setInterval(()=>fetch(i+"/ping").catch(()=>{}),4*60*1e3))}let d={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1,activeMiniGameInProgress:!1,telemetryTerminal:!1};const z="alfaaz_recruit_state",V="alfaaz_recruit_unsent";let F=!1;function Y(){F=!1;try{const i={sessionId:d.sessionId,configHash:d.configHash,worldSequence:d.worldSequence,seeds:d.seeds,screen:d.screen,sjtScenarios:d.sjtScenarios,currentSjtIndex:d.currentSjtIndex,sjtResponses:d.sjtResponses,currentWorldIndex:d.currentWorldIndex,currentMiniGameIndex:d.currentMiniGameIndex,accessibilityModes:d.accessibilityModes,segmentId:d.segmentId,seq:d.seq,isPaused:d.isPaused,activeMiniGameInProgress:d.activeMiniGameInProgress||!1,telemetryTerminal:d.telemetryTerminal};sessionStorage.setItem(z,JSON.stringify(i)),sessionStorage.setItem(V,JSON.stringify(d.telemetryQueue.slice(-100)))}catch(i){console.warn("[Persistence] Error saving sessionStorage:",i)}}function S({immediate:i=!1}={}){if(i){Y();return}if(F)return;F=!0;const r=()=>Y();"requestIdleCallback"in window?window.requestIdleCallback(r,{timeout:500}):window.setTimeout(r,100)}function Le(){try{const i=sessionStorage.getItem(z),r=sessionStorage.getItem(V);if(r){const a=JSON.parse(r);Array.isArray(a)&&(d.telemetryQueue=a)}if(i){const a=JSON.parse(i);if(a.sessionId){if(d.sessionId=a.sessionId,d.configHash=a.configHash||null,d.worldSequence=a.worldSequence||[],d.seeds=a.seeds||{},d.screen=a.screen||"consent",d.sjtScenarios=a.sjtScenarios||[],d.currentSjtIndex=a.currentSjtIndex||0,d.sjtResponses=a.sjtResponses||{},d.currentWorldIndex=a.currentWorldIndex||0,d.currentMiniGameIndex=a.currentMiniGameIndex||0,d.accessibilityModes=a.accessibilityModes||[],J(d.accessibilityModes),d.seq=a.seq||1,d.isPaused=a.isPaused||!1,d.telemetryTerminal=a.telemetryTerminal||!1,d.segmentId=(a.segmentId||1)+1,T(d.screen,"segment_start",{segment_id:d.segmentId}),a.activeMiniGameInProgress&&a.screen==="games"){const m=d.worldSequence[d.currentWorldIndex],b=W(m,d.currentMiniGameIndex);T("game","interrupted",{mini_game:b,reason:"page_reload"}),d.currentMiniGameIndex<1?d.currentMiniGameIndex++:(d.currentMiniGameIndex=0,d.currentWorldIndex++),d.activeMiniGameInProgress=!1}return S({immediate:!0}),!0}}}catch(i){console.warn("[Persistence] Error restoring sessionStorage:",i)}return!1}async function L(i,r={}){const a=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",m={"Content-Type":"application/json",...r.headers||{}};return fetch(`${a}${i}`,{...r,headers:m})}function T(i,r,a={},m={},b="mouse",e=null,t=null){const s=performance.now();let p=a,c=m;try{const n=JSON.stringify(a),x=JSON.stringify(m),u=new TextEncoder().encode(n).length+new TextEncoder().encode(x).length;u>4096&&(p={event_oversize:!0,original_size_bytes:u},c={oversized:!0})}catch{}const l={seq:d.seq++,segment_id:d.segmentId,t_ms:s,screen:i,game_world:d.worldSequence[d.currentWorldIndex]||null,mini_game:e,trial:t,action:r,input_type:b,task_def_version:a&&a.task_def_version||"1.0",state:c,data:p};d.telemetryQueue.push(l),S(),(d.telemetryQueue.length>=50||r==="minigame_end"||r==="sjt_complete")&&M()}let P=null,D=50;async function M(){if(!d.sessionId||d.telemetryQueue.length===0||d.telemetryTerminal)return!0;if(P)return P;P=Me();try{return await P}finally{P=null}}async function Me(){if(!d.sessionId||d.telemetryQueue.length===0||d.telemetryTerminal)return!0;const i=d.telemetryQueue.slice(0,D);try{const r=await L("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:d.sessionId,events:i})});if(r&&r.status===422){const m=await r.json().catch(()=>({}));if(m.detail&&(m.detail.detail==="events_cap_reached"||m.detail.status==="DATA_LIMITED"))return console.warn("[Telemetry] Terminal event cap reached (50,000). Halting future telemetry flushes."),d.telemetryTerminal=!0,S({immediate:!0}),!0}if(r&&r.status===413)return console.warn("[Telemetry] Batch rejected with HTTP 413 (oversize)."),i.length>1?D=Math.max(1,Math.floor(i.length/2)):console.error("[Telemetry] A single telemetry event exceeds the body limit. It remains queued for recovery."),S({immediate:!0}),!1;if(r&&r.status===403){const m=await r.json().catch(()=>({}));if((typeof m.detail=="string"?m.detail:JSON.stringify(m.detail||"")).toLowerCase().includes("already complete"))return console.info("[Telemetry] Session is already complete on server; draining local queue."),d.telemetryQueue=[],d.telemetryTerminal=!0,S({immediate:!0}),!0}if(!r||!r.ok)throw new Error(r?`HTTP ${r.status}`:"No response");const a=await r.json().catch(()=>({}));return a.result&&a.result.session_status==="COMPLETE"?(d.telemetryQueue.splice(0,i.length),a.result.new_rejected_count>0&&(d.telemetryQueue=[],d.telemetryTerminal=!0),S({immediate:!0}),!0):(d.telemetryQueue.splice(0,i.length),S(),!0)}catch(r){return console.warn("[Telemetry] Flush failed; telemetry remains queued:",r),S({immediate:!0}),!1}}async function Oe(i=3){let r=0;for(;!d.telemetryTerminal&&d.telemetryQueue.length>0;){const a=d.telemetryQueue.length;if(!await M()||d.telemetryQueue.length>=a){if(r++,r>=i)return!1;await new Promise(b=>setTimeout(b,600*r))}else r=0}return!0}setInterval(()=>{d.sessionId&&d.telemetryQueue.length>0&&!d.telemetryTerminal&&M()},2500);window.addEventListener("pagehide",()=>{if(S({immediate:!0}),d.sessionId&&d.telemetryQueue.length>0){const i=window.ALFAAZ_API_URL||"",r=JSON.stringify({session_id:d.sessionId,events:d.telemetryQueue.slice(0,D)});navigator.sendBeacon(`${i}/recruit/telemetry`,new Blob([r],{type:"application/json"}))}});document.addEventListener("visibilitychange",()=>{document.hidden?(T(d.screen,"visibility_hidden",{timestamp:Date.now()}),T(d.screen,"tab_hidden",{timestamp:Date.now()}),M()):(T(d.screen,"visibility_visible",{timestamp:Date.now()}),T(d.screen,"tab_visible",{timestamp:Date.now()}))});window.addEventListener("blur",()=>{T(d.screen,"blur",{timestamp:Date.now()})});window.addEventListener("focus",()=>{T(d.screen,"focus",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{$e(),Le(),$(),Pe()});function Pe(){const i=document.getElementById("pauseBtn");i==null||i.addEventListener("click",Q);const r=document.getElementById("exitBtn");r==null||r.addEventListener("click",()=>{confirm("Are you sure you wish to exit the volunteer assessment? You can return at any time.")&&(T(d.screen,"candidate_exited"),M(),window.location.href="index.html")})}function Q(){d.isPaused?(d.isPaused=!1,T(d.screen,"resume"),d.screen=d.pausedPreviousScreen||"sjt",$()):(d.isPaused=!0,d.pausedPreviousScreen=d.screen,T(d.screen,"pause"),d.screen="paused",$())}function $(){const i=document.getElementById("recruitApp"),r=document.getElementById("sessionHeaderControls"),a=document.getElementById("topProgressBar"),m=document.getElementById("progressBarFill");switch(d.screen!=="consent"&&d.screen!=="complete"&&d.screen!=="paused"?(r==null||r.classList.remove("hidden"),a==null||a.classList.remove("hidden")):(r==null||r.classList.add("hidden"),a==null||a.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),d.screen){case"consent":Be(i);break;case"identity":je(i);break;case"accessibility":He(i);break;case"warmup":Ne(i);break;case"sjt":j(i,m);break;case"games":Z(i,m);break;case"paused":Fe(i);break;case"complete":De(i);break}}function Be(i){var e;i.innerHTML=`
    <div class="animate-soft-fade-in max-w-2xl mx-auto py-8 px-4">
      <div class="mb-12 text-center space-y-4">
        <span class="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-medium">Prologue &middot; Consent & Compliance</span>
        <h1 class="text-3xl font-serif text-[var(--text-primary)]">The Studio Assessment</h1>
        <p class="text-sm text-[var(--text-secondary)] italic max-w-lg mx-auto leading-relaxed">
          Before we begin our creative exchange, we require your explicit consent to ensure a safe and transparent environment.
        </p>
      </div>

      <div class="space-y-10">
        <!-- Section 1: The Experience -->
        <div class="relative pl-6 border-l border-[var(--grid-border)]">
          <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--bg-primary)] border border-[var(--accent-gold)]"></div>
          <h2 class="text-lg font-serif text-[var(--text-primary)] mb-2">The Experience</h2>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed">
            This is a 20-25 minute exploratory journey. You will encounter situational judgments and creative micro-tasks. 
            There are no right or wrong answers—only different perspectives. You may pause, skip, or withdraw at any time without penalty.
          </p>
        </div>

        <!-- Section 2: Why We Collect Data -->
        <div class="relative pl-6 border-l border-[var(--grid-border)]">
          <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--bg-primary)] border border-[var(--accent-green)]"></div>
          <h2 class="text-lg font-serif text-[var(--text-primary)] mb-2">Why We Observe</h2>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed">
            As you interact with the tasks, we collect behavioral telemetry. 
            <strong>Why do we do this?</strong> To understand your intuitive working style. It helps us match you to the right 
            creative roles within the collective. 
            Your raw data is pseudonymous and will never be used for automated rejection or sold to third parties.
          </p>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed">
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
  `;const r=document.getElementById("ageConfirm"),a=document.getElementById("consentAgree"),m=document.querySelector('#consentForm button[type="submit"]'),b=()=>{const t=!!(r!=null&&r.checked&&(a!=null&&a.checked));m==null||m.setAttribute("aria-disabled",String(!t)),m==null||m.classList.toggle("opacity-40",!t)};r==null||r.addEventListener("change",b),a==null||a.addEventListener("change",b),b(),(e=document.getElementById("consentForm"))==null||e.addEventListener("submit",async t=>{t.preventDefault();const s=t.target.querySelector('button[type="submit"]');if((s==null?void 0:s.getAttribute("aria-disabled"))==="true")return;const p=s?s.innerHTML:"Enter the Studio &rarr;";s&&(s.setAttribute("aria-disabled","true"),s.innerHTML="Preparing Workspace...");try{const c=await L("/recruit/consent",{method:"POST",body:JSON.stringify({choices:{research_telemetry:a==null?void 0:a.checked}})});if(!c.ok)throw new Error(`Network error: ${c.status}`);const l=await c.json();d.sessionId=l.session_id,d.configHash=l.config_hash||null,d.worldSequence=l.world_sequence||[],d.seeds=l.seeds||{},S({immediate:!0}),M(),d.screen="identity",$()}catch(c){alert(`Unable to initialize session: ${c.message||"Please check connection."}`),console.error(c),s&&(s.innerHTML=p,s.setAttribute("aria-disabled","false"))}})}function je(i){var r;i.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-4 text-center">
        <span class="act-badge">Participant Details</span>
        <h1 class="text-3xl font-serif text-[var(--text-primary)]">About You</h1>
      </div>

      <form id="identityForm" class="space-y-4 pt-2">
        <div>
          <label class="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Full Name *</label>
          <input type="text" id="fullName" required class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="Your name">
        </div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Email Address *</label>
          <input type="email" id="email" required class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="you@example.com">
        </div>
        <div class="pt-4 flex justify-end">
          <button type="submit" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Begin Session &rarr;
          </button>
        </div>
      </form>
    </div>
  `,(r=document.getElementById("identityForm"))==null||r.addEventListener("submit",async a=>{a.preventDefault();const m=a.target.querySelector('button[type="submit"]'),b=m?m.innerHTML:"Begin Session &rarr;";m&&(m.disabled=!0,m.innerHTML="Connecting...");try{const e=await L("/recruit/identity",{method:"POST",body:JSON.stringify({session_id:d.sessionId,full_name:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim()})});if(!e||!e.ok){const t=e?await e.json().catch(()=>({})):{};throw new Error(t.detail||(e?`Server returned ${e.status}`:"No response from server"))}d.screen="accessibility",T("identity","identity_submitted"),S({immediate:!0}),$()}catch(e){alert(`Unable to continue: ${e.message||"Please check connection."}`),m&&(m.disabled=!1,m.innerHTML=b)}})}function J(i=[]){if(typeof document>"u"||!document.documentElement)return;const r=document.documentElement;r.classList.toggle("a11y-high-contrast",i.includes("high_contrast")),r.classList.toggle("a11y-dyslexia-font",i.includes("dyslexia_font")),r.classList.toggle("a11y-reduced-motion",i.includes("reduced_motion"))}function He(i){var a;const r=d.accessibilityModes||[];i.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-3 text-center">
        <span class="act-badge">Preferences · رہنمائی</span>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">Interaction & Accessibility</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-2 max-w-lg mx-auto leading-relaxed">
          This section is here to make the assessment easier and more comfortable to use. Alfaaz Recruit measures thoughtful engagement, not visual conformity or motor speed. These options adjust the visual environment and presentation to suit your eyes, screen, and device.
        </p>
      </div>

      <div class="space-y-3 pt-2">
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_contrast" class="mt-1 accent-[#bd6f5d]" ${r.includes("high_contrast")?"checked":""}>
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">High Contrast Display</div>
            <div class="text-xs text-[var(--text-secondary)] mt-0.5">Increases text contrast, element borders, and background separation for clearer visibility.</div>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_dyslexia" class="mt-1 accent-[#bd6f5d]" ${r.includes("dyslexia_font")?"checked":""}>
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">Dyslexia-Friendly Typography</div>
            <div class="text-xs text-[var(--text-secondary)] mt-0.5">Applies a high-legibility sans-serif typeface with enhanced letter and line spacing.</div>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_motion" class="mt-1 accent-[#bd6f5d]" ${r.includes("reduced_motion")?"checked":""}>
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">Reduced Motion</div>
            <div class="text-xs text-[var(--text-secondary)] mt-0.5">Removes non-essential animations, pulsing transitions, and rapid movement.</div>
          </div>
        </label>
      </div>

      <div class="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span class="text-xs text-[var(--text-secondary)] italic">Accessibility settings do not lower your result or count against you in any way. Settings change interaction and presentation conditions, not candidate evaluation or suitability.</span>
        <button id="saveA11yBtn" class="min-h-[44px] px-8 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
          Continue &rarr;
        </button>
      </div>
    </div>
  `,(a=document.getElementById("saveA11yBtn"))==null||a.addEventListener("click",async m=>{var t,s,p;const b=m.currentTarget;if(b.disabled)return;b.disabled=!0,b.textContent="Saving...";const e=[];(t=document.getElementById("a11y_contrast"))!=null&&t.checked&&e.push("high_contrast"),(s=document.getElementById("a11y_dyslexia"))!=null&&s.checked&&e.push("dyslexia_font"),(p=document.getElementById("a11y_motion"))!=null&&p.checked&&e.push("reduced_motion"),d.accessibilityModes=e,J(e);try{await L("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:d.sessionId,modes_enabled:e})})}catch(c){console.warn("Accessibility preferences save error:",c)}d.screen="warmup",T("accessibility","preferences_saved",{modes:e}),S({immediate:!0}),$()})}function Ne(i){let r=[],a=performance.now();i.innerHTML=`
    <div class="space-y-6 text-center py-4 animate-soft-fade-in">
      <span class="act-badge">Device Check · رہنمائی</span>
      <h2 class="text-2xl font-serif text-[var(--text-primary)]">Screen & Rhythm Check</h2>
      <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
        Please tap or click the center circle 3 times at a natural, comfortable pace to check your device.
      </p>

      <div class="py-8 flex justify-center">
        <button id="tapTarget" class="w-24 h-24 rounded-full border-2 border-[var(--accent-gold)] bg-white text-[var(--accent-gold)] font-serif text-xl flex items-center justify-center hover:bg-amber-50 active:scale-95 transition shadow-sm">
          Tap (0/3)
        </button>
      </div>

      <div id="warmupStatus" class="text-xs text-[var(--text-secondary)] tracking-wider uppercase font-medium">
        Waiting for tap 1 of 3...
      </div>
    </div>
  `;const m=document.getElementById("tapTarget"),b=document.getElementById("warmupStatus");m==null||m.addEventListener("click",async()=>{r.push(performance.now());const e=r.length;if(m.textContent=`Tap (${e}/3)`,b.textContent=`Recorded tap ${e} of 3`,e>=3){m.setAttribute("disabled","true"),m.classList.add("opacity-50");const t=[r[1]-r[0],r[2]-r[1]],s=(t[0]+t[1])/2,p=performance.now()-a;try{await L("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:d.sessionId,tap_latency_baseline_ms:s,reading_dwell_baseline_ms:p,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(l){console.warn("Warmup save error:",l)}T("warmup","warmup_completed",{avgLatency:s,readingDwell:p});async function c(){var l;i.innerHTML=`
          <div class="space-y-6 text-center py-16 animate-soft-fade-in">
            <div class="waiting-spinner"></div>
            <h2 class="text-xl font-serif text-[var(--text-primary)]">Loading Scenarios...</h2>
            <p class="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
              Connecting to the assessment server. This may take a few moments if starting from cold.
            </p>
          </div>
        `;try{const n=await L("/recruit/sjt/public");if(!n||!n.ok)throw new Error(n?`Server returned HTTP ${n.status}`:"Network timeout");const x=await n.json();d.sjtScenarios=x.scenarios||[],d.currentSjtIndex=0,d.screen="sjt",S({immediate:!0}),$()}catch(n){console.warn("Failed to load SJT payload:",n),i.innerHTML=`
            <div class="space-y-6 text-center py-12 animate-soft-fade-in">
              <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto text-xl font-serif">!</div>
              <h2 class="text-xl font-serif text-[var(--text-primary)]">Connection Notice</h2>
              <p class="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                The server is taking longer than expected to respond. Your device check is safely saved.
              </p>
              <div class="pt-2">
                <button id="retrySjtLoadBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
                  Retry Connection &rarr;
                </button>
              </div>
            </div>
          `,(l=document.getElementById("retrySjtLoadBtn"))==null||l.addEventListener("click",()=>{c()})}}c()}})}function j(i,r){var c;const a=d.sjtScenarios[d.currentSjtIndex];if(!a){X();return}const m=d.sjtScenarios.length,b=d.currentSjtIndex+1;r&&(r.style.width=`${(b-1)/21*100}%`);const e=document.getElementById("segmentProgress");if(e){const l=Math.max(1,Math.round(((m-b+1)*35+448)/60));e.innerHTML=`<span class="text-[var(--text-secondary)] hidden sm:inline mr-2 text-[10px] sm:text-xs font-normal">About ${l} mins remaining</span><span>Judgment ${b} / ${m}</span>`}const t=d.sjtResponses[a.id]||null,s=a.options.map(l=>`
    <div class="option-card min-h-[48px] ${t===l.id?"selected":""}" data-opt-id="${l.id}" tabindex="0" role="button" aria-label="Option ${l.id.slice(-1)}">
      <span class="font-serif text-sm font-semibold text-[var(--accent-gold)] shrink-0">${l.id.slice(-1)}.</span>
      <span class="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">${l.text}</span>
    </div>
  `).join("");i.innerHTML=`
    <div class="space-y-5 animate-soft-fade-in">
      <!-- Top Context and Step -->
      <div class="border-b border-[var(--grid-border)] pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1">
        <div>
          <span class="act-badge">Judgment ${b} of ${m}</span>
          <span class="act-title-ur font-serif">${a.act_title_ur||""}</span>
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${a.act_title_en}</h2>
        </div>
        <div class="text-[11px] sm:text-xs text-[var(--accent-gold)] uppercase tracking-wider font-medium">
          Section 1 &middot; ${b} of ${m}
        </div>
      </div>

      <!-- YOUR TASK -->
      <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-xs text-xs font-serif text-[var(--text-primary)] flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block shrink-0"></span>
        <span><strong>Your Task:</strong> Read the situation below and choose what you would do.</span>
      </div>

      <!-- SITUATION -->
      <div class="scenario-text text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-4 sm:p-5 border border-[var(--grid-border)] rounded-xs">
        ${a.setup}
      </div>

      <!-- YOUR CHOICE -->
      <div class="space-y-2.5">
        <div class="text-[11px] uppercase tracking-wider text-[var(--text-secondary)] font-medium">Choose one response:</div>
        ${s}
      </div>

      <!-- PRIMARY ACTION -->
      <div class="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[var(--grid-border)]">
        <span class="text-xs text-[var(--text-secondary)] order-2 sm:order-1 text-[11px]">Tip: Press keys 1-4 to choose</span>
        <button id="nextSjtBtn" ${t?"":"disabled"} class="w-full sm:w-auto min-h-[44px] px-7 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] transition shadow-sm rounded-xs order-1 sm:order-2">
          ${b===m?"Complete Judgment Section &rarr;":"Next Scenario &rarr;"}
        </button>
      </div>
    </div>
  `,T("sjt","scenario_displayed",{scenario_id:a.id,index:b}),i.querySelectorAll(".option-card").forEach(l=>{l.addEventListener("click",()=>{const n=l.getAttribute("data-opt-id");d.sjtResponses[a.id]=n,T("sjt","option_selected",{scenario_id:a.id,option_id:n}),j(i,r)})}),(c=document.getElementById("nextSjtBtn"))==null||c.addEventListener("click",()=>{d.sjtResponses[a.id]&&(d.currentSjtIndex++,j(i,r))});const p=l=>{if(["1","2","3","4"].includes(l.key)){const n=parseInt(l.key)-1;a.options[n]&&(d.sjtResponses[a.id]=a.options[n].id,T("sjt","option_selected_key",{scenario_id:a.id,option_id:a.options[n].id}),j(i,r))}};window.onkeydown=p}let N=!1;async function X(){if(N)return;N=!0,window.onkeydown=null;const i=document.getElementById("recruitApp");i&&(i.innerHTML=`
      <div class="space-y-6 text-center py-16 animate-soft-fade-in">
        <div class="waiting-spinner"></div>
        <h2 class="text-xl font-serif text-[var(--text-primary)]">Saving Judgments...</h2>
        <p class="text-xs text-[var(--text-secondary)]">Recording your situation judgments to your session profile.</p>
      </div>
    `);try{const r=await L("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:d.sessionId,responses:d.sjtResponses})});if(!r||!r.ok)throw new Error(r?`Server returned HTTP ${r.status}`:"Connection failed");d.screen="games",d.currentWorldIndex=0,d.currentMiniGameIndex=0,T("sjt","sjt_complete",{response_count:Object.keys(d.sjtResponses).length}),S({immediate:!0}),$()}catch(r){if(console.warn("SJT submit error:",r),i){i.innerHTML=`
        <div class="space-y-6 text-center py-12 animate-soft-fade-in">
          <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto text-xl font-serif">!</div>
          <h2 class="text-xl font-serif text-[var(--text-primary)]">Submission Notice</h2>
          <p class="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
            Could not record responses due to a temporary server connection delay. Your choices are safely kept.
          </p>
          <div class="pt-2">
            <button id="retrySjtSubmitBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
              Retry Submission &rarr;
            </button>
          </div>
        </div>
      `;const a=document.getElementById("retrySjtSubmitBtn");a&&a.addEventListener("click",()=>{a.disabled=!0,a.textContent="Submitting...",X()})}}finally{N=!1}}function Z(i,r){const a=d.worldSequence[d.currentWorldIndex];if(!a||d.currentWorldIndex>=d.worldSequence.length){ee();return}d.activeMiniGameInProgress=!0,S({immediate:!0});const m=d.currentWorldIndex*2+d.currentMiniGameIndex+1,b=14,e=document.getElementById("segmentProgress");if(e){const t=b-m+1,s=Math.max(1,Math.round(t*32/60));e.innerHTML=`<span class="text-[var(--text-secondary)] hidden sm:inline mr-2 text-[10px] sm:text-xs font-normal">About ${s} min${s>1?"s":""} remaining</span><span>Activities ${m} / ${b}</span>`}if(r){const t=7+(m-1);r.style.width=`${t/21*100}%`}Ie({appContainer:i,worldCode:a,worldIndex:d.currentWorldIndex,miniGameIndex:d.currentMiniGameIndex,seeds:d.seeds,logEvent:(t,s,p,c)=>{const l=W(a,d.currentMiniGameIndex);T("game",t,s,p,c,l)},onMiniGameComplete:t=>{d.activeMiniGameInProgress=!1;const s=W(a,d.currentMiniGameIndex);T("game","minigame_end",t,{},"mouse",s),M(),d.currentMiniGameIndex<1?d.currentMiniGameIndex++:(d.currentMiniGameIndex=0,d.currentWorldIndex++),S({immediate:!0}),Z(i,r)}})}function W(i,r){const a=H&&H[i];if(a&&a[r])return a[r];const m={W1:["F1","F2"],W2:["A1","A2"],W3:["C1","C2"],W4:["E1","E2"],W5:["Q1","Q2"],W6:["CR1","CR3"],W7:["M1","M2"]};return m[i]&&m[i][r]||"MG"}let B=!1;function K(i,r){if(!i)return;i.innerHTML=`
    <div class="space-y-6 text-center py-16 animate-soft-fade-in">
      <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto text-xl font-serif">!</div>
      <h2 class="text-2xl font-serif text-[var(--text-primary)]">Connection Notice</h2>
      <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">${r}</p>
      <div class="pt-2">
        <button id="retryFinalizationBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">Retry Finalization &rarr;</button>
      </div>
    </div>
  `;const a=document.getElementById("retryFinalizationBtn");a&&a.addEventListener("click",()=>{a.disabled=!0,a.textContent="Connecting...",ee()})}async function ee(){if(B)return;B=!0,d.activeMiniGameInProgress=!1,S({immediate:!0});const i=document.getElementById("recruitApp");i&&(i.innerHTML=`
      <div class="space-y-6 text-center py-16 animate-soft-fade-in">
        <div class="waiting-spinner"></div>
        <h2 id="finalizingHeading" class="text-2xl font-serif text-[var(--text-primary)]">Synchronizing activity...</h2>
        <p id="finalizingSubtext" class="text-xs text-[var(--text-secondary)]">Saving your completed activity... Please keep this page open.</p>
      </div>
    `);const r=a=>{["Enter"," ","Spacebar"].includes(a.key)&&a.preventDefault()};window.addEventListener("keydown",r,{capture:!0});try{if(!await Oe()){window.removeEventListener("keydown",r,{capture:!0}),B=!1,K(i,"Connection could not be confirmed. Your saved activity has not been discarded. You can retry.");return}const m=document.getElementById("finalizingHeading"),b=document.getElementById("finalizingSubtext");m&&(m.textContent="Finalizing assessment..."),b&&(b.textContent="Saving your completed activity... Please keep this page open.");let e=null;for(let s=0;s<3;s++){try{if(e=await L("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:d.sessionId})}),e&&e.ok)break}catch(p){if(s===2)throw p}await new Promise(p=>setTimeout(p,1e3*(s+1)))}if(!e||!e.ok)throw new Error(e?`Server returned HTTP ${e.status}`:"No response from server");const t=await e.json().catch(()=>({}));if(t.status==="SUCCESS"||t.session_status==="COMPLETE"||t.is_already_completed){window.removeEventListener("keydown",r,{capture:!0}),d.screen="complete",d.telemetryTerminal=!0,d.telemetryQueue=[],S({immediate:!0}),$();return}throw new Error("Unexpected completion status")}catch(a){window.removeEventListener("keydown",r,{capture:!0}),console.warn("Session complete submission error:",a),K(i,"The final session confirmation was not received. Your saved activity has not been discarded. You can retry.")}finally{window.removeEventListener("keydown",r,{capture:!0}),B=!1}}function Fe(i){var r;i.innerHTML=`
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
  `,(r=document.getElementById("resumeBtn"))==null||r.addEventListener("click",Q)}function De(i){i.innerHTML=`
    <div class="space-y-6 text-center py-16">
      <div class="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 mx-auto flex items-center justify-center text-2xl font-serif">
        &#10003;
      </div>
      <h1 class="text-3xl font-serif text-[var(--text-primary)]">Assessment Complete</h1>
      <p class="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
        Thank you for your time, care, and attention. Your responses have been safely submitted to the Alfaaz Collective research registry.
      </p>
      
      <div class="max-w-md mx-auto mt-8 p-5 bg-[#faf8f5] border border-[var(--grid-border)]">
        <h2 class="text-lg font-serif text-[var(--text-primary)] mb-2">Next Step: Interview Call</h2>
        <p class="text-xs text-[var(--text-secondary)] mb-4">
          Please schedule a Google Meet call with us to discuss your application. Select a date <strong>other than today</strong>.
        </p>
        <div class="flex flex-col gap-2">
          <a href="mailto:alfaaz2k20@gmail.com?subject=Volunteer%20Interview%20Call%20Request&body=Hi%20Alfaaz%20Team%2C%0D%0A%0D%0AI%20have%20completed%20the%20volunteer%20assessment.%20I%20would%20like%20to%20schedule%20a%20Google%20Meet%20call%20for%20my%20interview.%0D%0A%0D%0AProposed%20Date%20%28Please%20choose%20a%20future%20date%2C%20not%20today%29%3A%20%5BInsert%20Date%5D%0D%0AProposed%20Time%3A%20%5BInsert%20Time%5D%0D%0A%0D%0AThank%20you%2C%0D%0A%5BYour%20Name%5D" 
             class="inline-block w-full min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
            Open Email App
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alfaaz2k20@gmail.com&su=Volunteer+Interview+Call+Request&body=Hi+Alfaaz+Team,%0A%0AI+have+completed+the+volunteer+assessment.+I+would+like+to+schedule+a+Google+Meet+call+for+my+interview.%0A%0AProposed+Date+(Please+choose+a+future+date,+not+today):+[Insert+Date]%0AProposed+Time:+[Insert+Time]%0A%0AThank+you,%0A[Your+Name]" target="_blank"
             class="inline-block w-full min-h-[44px] px-6 py-2.5 border border-[var(--grid-border)] text-[var(--text-primary)] bg-white text-xs uppercase tracking-widest hover:border-[var(--accent-gold)] transition shadow-sm rounded-xs">
            Open Gmail in Browser
          </a>
          <p class="text-[10px] text-[var(--text-secondary)] mt-2">
            Or manually email <strong class="select-all cursor-pointer text-[var(--text-primary)]">alfaaz2k20@gmail.com</strong>
          </p>
        </div>
      </div>

      <div class="pt-6">
        <a href="index.html" class="inline-block px-6 py-2.5 border border-[var(--grid-border)] text-xs uppercase tracking-widest text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition">
          Return to Alfaaz Home
        </a>
      </div>
    </div>
  `}
