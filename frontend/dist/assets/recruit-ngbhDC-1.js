import"./global-DxYxv3W5.js";/* empty css               */function se(r,a){const{appContainer:i,miniGameIndex:x,gameId:v,logEvent:e,onMiniGameComplete:t,worldIndex:s}=r,l=v||(x===0?"A1":x===1?"A2":"A3");l==="A1"?re(i,a,e,t,s):l==="A2"?ae(i,a,e,t,s):ne(i,a,e,t)}function re(r,a,i,x,v=1){let e=!0,t=0,s=!1,l=null,c="mouse";const o=[{id:"DOC_01",title:"Old Calligraphy Book (1842)",rule_prompt:"Sorting Rule: Sort by Century",tags:["Year: 1842","19th Century","Handmade Paper","Poem Verse"]},{id:"DOC_02",title:"Poetry Song Book",rule_prompt:"Sorting Rule: Sort by Type",tags:["Type: Poetry","Song Verses","Urdu","Paper Pages"]},{id:"DOC_03",title:"Exhibition Visitor Book (1924)",rule_prompt:"Sorting Rule: Sort by Century",tags:["Year: 1924","20th Century","Visitor List","Signatures"]},{id:"DOC_04",title:"Lal Ded Verses in Kashmiri",rule_prompt:"Sorting Rule: Sort by Language",tags:["Language: Kashmiri","Wise Verses","Local Poetry"]},{id:"DOC_05",title:"History Book of Kashmir Artists",rule_prompt:"Sorting Rule: Sort by Type",tags:["Type: History","Artist Stories","Life Records"]}],n=[{id:"19th_century",label:"19th Century Shelf",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},{id:"20th_century",label:"20th Century Shelf",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{id:"poetry",label:"Poetry Shelf",icon:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"},{id:"chronicle",label:"History Shelf",icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},{id:"kashmiri",label:"Kashmiri Language Shelf",icon:"M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"}];function m(){var g,y;if(e){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Manuscript Folios","Sort each historical page onto its proper shelf.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',goal:"File each document onto the correct shelf across 5 rounds.",steps:["Check the date and description on each document card.","Click the matching shelf to file it.","Open the shelf guide anytime if you need a reminder."]})}
        </div>
      `,T(r,()=>{e=!1,t=0,l=null,performance.now(),m()});return}if(t>=o.length){x({mini_game:"A1",observations_count:o.length});return}const p=o[t];performance.now();const u=`
      <div class="p-5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
        <div class="flex justify-between items-start mb-2">
          <span class="text-[10px] tracking-widest text-[var(--accent-gold)] uppercase font-semibold">Folio ${t+1} of ${o.length}</span>
          <button id="guideBtn" type="button" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-2.5 py-1 hover:bg-amber-50 interactive-option flex items-center gap-1.5 rounded-xs min-h-[32px]" tabindex="0">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ${s?"Close Guide":"Shelf Guide"}
          </button>
        </div>

        <div id="guideModal" class="${s?"":"hidden"} p-3 mb-3 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] space-y-1 rounded-xs">
          <div>&bull; <strong>Century Rule:</strong> Sort by century made (19th vs 20th Century).</div>
          <div>&bull; <strong>Type Rule:</strong> Sort by content type (Poetry vs History).</div>
          <div>&bull; <strong>Language Rule:</strong> Sort by language (Kashmiri).</div>
        </div>

        <h3 class="text-base sm:text-lg font-serif text-[var(--text-primary)] font-medium mt-1 mb-2.5">${p.title}</h3>
        <div class="flex flex-wrap gap-2">
          ${p.tags.map(_=>`<span class="px-2.5 py-1 bg-[#faf8f5] border border-[var(--grid-border)] text-xs text-[var(--text-secondary)] rounded-xs">${_}</span>`).join("")}
        </div>
      </div>
    `,f=n.find(_=>_.id===l),h=`
      <div>
        <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-sans">Select Destination Shelf:</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          ${n.map(_=>{const w=l===_.id;return`
              <button type="button" class="folder-btn p-3.5 bg-white border ${w?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} text-xs font-semibold hover:bg-amber-50/40 interactive-option text-left flex items-center justify-between rounded-xs min-h-[48px]" data-folder="${_.id}" tabindex="0">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${w?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${w?"✓":""}</span>
                  <span class="text-[var(--text-primary)]">${_.label}</span>
                </span>
                <svg class="w-4 h-4 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${_.icon}"></path></svg>
              </button>
            `}).join("")}
        </div>
      </div>
    `,b=`
      <span>${l?`Selected shelf: <strong class="text-[var(--text-primary)]">${f==null?void 0:f.label}</strong>`:"Select a shelf above, then click Confirm."}</span>
      <span class="text-[10px] text-stone-400 font-sans">${t+1} / ${o.length}</span>
    `;r.innerHTML=A({worldCode:"W2",worldIndex:v,title:"The Manuscript Folios",subtitle:"Sort each historical page onto its proper shelf.",instruction:"Examine this page. Pick the shelf that matches the active sorting rule.",instructionPrompt:p.rule_prompt,stimulusContent:u,interactionContent:h,summaryContent:b,actionButtonId:"confirmShelfBtn",actionButtonText:t<o.length-1?"Confirm Shelf &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!l,progressText:`Page ${t+1} of ${o.length}`}),i("item_presented",{trial_index:t,stimulus_id:p.id,task_def_version:"1.0"}),(g=document.getElementById("guideBtn"))==null||g.addEventListener("click",()=>{s=!s,m(),i("guide_viewed",{trial_index:t,stimulus_id:p.id,task_def_version:"1.0"})}),r.querySelectorAll(".folder-btn").forEach(_=>{const w=I=>{c=I,l=_.getAttribute("data-folder"),m()};_.addEventListener("click",()=>w("mouse")),_.addEventListener("keydown",I=>{(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),w("keyboard"))})}),(y=document.getElementById("confirmShelfBtn"))==null||y.addEventListener("click",()=>{l&&(i("item_sorted",{trial_index:t,stimulus_id:p.id,choice:l,input_modality:c,task_def_version:"1.0"}),t++,l=null,m())})}m()}function ae(r,a,i,x,v=1){let e=!0,t=0,s=null,l="mouse";const c=[{stimulus_id:"EXC_01",title:"Kashmiri Poetry Page with Water Wear",anomaly_description:'Water fading on lower margin. The accession year stamp is blurred and appears as "18--".',type_note:"Physical Damage & Blurred Year"},{stimulus_id:"EXC_02",title:"Clean Persian Calligraphy Page (1890)",anomaly_description:"Intact rag fiber paper, clear black ink, and standard accession stamp intact. No physical blemishes.",type_note:"Standard Page Inspection"},{stimulus_id:"EXC_03",title:"Loose Book Page with Number Jump",anomaly_description:"Binding threads severed. Margin numbering skips from Folio 14 directly to Folio 19 with missing text catchword.",type_note:"Missing Pages & Loose Thread"},{stimulus_id:"EXC_04",title:"Illustrated Story Page with Split Binding",anomaly_description:"Double folio split across signature gutter with inverted seal impressions and mismatched accession notation.",type_note:"Broken Spine & Upside-Down Seal"}],o=[{id:"flag_exception",title:"Flag for Special Repair",desc:"Place page in a protective sleeve for careful repair by a conservator.",tag:"Special Repair"},{id:"file_standard",title:"Place on Regular Shelf",desc:"Place page directly onto the standard open shelves.",tag:"Regular Shelf"},{id:"defer_review",title:"Hold in Storage Box",desc:"Hold page safely in storage until more background notes arrive.",tag:"Hold in Box"}];function n(){if(e){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Fragile Leaf","Examine the page condition and choose a handling step.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',goal:"Check the condition of 4 pages and choose how to handle them.",steps:["Look at the condition notes on the page.","Decide if the page is clean or damaged.","Choose whether to file normally, quarantine for repair, or consult."]})}
        </div>
      `,T(r,()=>{e=!1,t=0,s=null,n()});return}const m=c[t],p=o.find(g=>g.id===s),u=`
      <div class="p-5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] tracking-widest text-[#bd6f5d] uppercase font-semibold">Manuscript Folio ${t+1} of 4</span>
          <span class="text-[10px] text-[var(--text-secondary)] uppercase bg-[#faf8f5] px-2 py-0.5 border border-[var(--grid-border)] rounded-xs font-medium">${m.type_note}</span>
        </div>
        <h3 class="text-base font-serif text-[var(--text-primary)] font-medium mb-1.5">${m.title}</h3>
        <p class="text-xs text-[var(--text-secondary)] leading-relaxed bg-[#faf8f5] p-3 border border-[var(--grid-border)]/60 rounded-xs">
          ${m.anomaly_description}
        </p>
      </div>
    `,f=`
      <div class="space-y-2.5">
        <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 font-sans">Choose handling action:</div>
        ${o.map(g=>`
          <div class="a2-opt p-3.5 bg-white border ${s===g.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} cursor-pointer interactive-option rounded-xs min-h-[52px]" data-action="${g.id}" tabindex="0" role="button">
            <div class="flex justify-between items-center mb-0.5">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${s===g.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                ${g.title}
              </div>
            </div>
            <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-3.5">${g.desc}</div>
          </div>
        `).join("")}
      </div>
    `,h=`
      <span>${s?`You selected: <strong class="text-[var(--text-primary)]">${p==null?void 0:p.title}</strong>`:"Select an option above to continue."}</span>
      <span class="text-[10px] text-stone-400 font-sans">${t+1} / 4</span>
    `;r.innerHTML=A({worldCode:"W2",worldIndex:v,title:"The Fragile Leaf",subtitle:"Examine page condition and choose a handling step.",instruction:"Read the page condition notes below. Choose the best handling option.",stimulusContent:u,interactionContent:f,summaryContent:h,actionButtonId:"a2ConfirmBtn",actionButtonText:t<3?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!s,progressText:`Folio ${t+1} of 4`}),i("item_presented",{trial_index:t,stimulus_id:m.stimulus_id,task_def_version:"1.0"});const b=document.getElementById("a2ConfirmBtn");r.querySelectorAll(".a2-opt").forEach(g=>{const y=_=>{l=_,s=g.getAttribute("data-action"),n()};g.addEventListener("click",()=>y("mouse")),g.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),y("keyboard"))})}),b==null||b.addEventListener("click",()=>{i("decision_logged",{trial_index:t,stimulus_id:m.stimulus_id,action_id:s,input_modality:l,task_def_version:"1.0"}),t<3?(t++,s=null,n()):x({mini_game:"A2",observations_count:4})})}n()}function ne(r,a,i,x){let v=!0,e=new Set,t=new Set,s="mouse";const l=[{id:"REC_01",title:"Card 1: Habba Khatoon Poem",text:"Poet: Habba Khatoon | Era: 16th Century | Birthplace: Chandhara (Recorded as: Chanhadra)",note:"Folio Label Verification"},{id:"REC_02",title:"Card 2: Carved Walnut Pen Box",text:"Artifact: Carved Walnut Calligraphy Pen Box | Dimensions: 24 cm x 6 cm | Medium: Seasoned Walnut",note:"Object Metadata Verification"},{id:"REC_03",title:"Card 3: River Verse Excerpt",text:`Verse Excerpt: "The river remembers the boatman's song" | Translator: [Not Specified / Blank]`,note:"Folio Label Verification"},{id:"REC_04",title:"Card 4: Kashmiri Vakh Lyric Leaf",text:"Folio Leaf: Kashmiri Vakh Lyric Leaf | Script: Sharda & Persian | Accession: AR-1892",note:"Manuscript Leaf Verification"},{id:"REC_05",title:"Card 5: Exhibition Opening Notice",text:"Exhibition Opening Reception: February 31st, 2026 | Location: Main Pavilion",note:"Public Schedule Verification"}];function c(){var o;if(v){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Exhibition Ledger","Review 5 display cards for factual mistakes.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',goal:"Carefully proofread all 5 display records. Flag only those with clear errors.",steps:["Read each display card carefully.","Click the flag button on any card that contains an error.","Clean cards should remain unflagged.","Click verify when finished."]})}
        </div>
      `,T(r,()=>{v=!1,e=new Set,t=new Set,c()});return}r.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 2: The Archive</span>
            
          </div>
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
          ${l.map((n,m)=>{const p=e.has(n.id);return`
              <div class="record-card p-4 bg-white border ${p?"border-[#bd6f5d] bg-amber-50/20":"border-[var(--grid-border)]"} rounded-xs interactive-option shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" data-id="${n.id}" tabindex="0">
                <div class="space-y-1 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] text-[var(--accent-gold)] uppercase tracking-wider font-semibold">Ledger Card ${m+1} of 5</span>
                  </div>
                  <div class="text-xs font-semibold text-[var(--text-primary)]">${n.title}</div>
                  <div class="text-xs text-[var(--text-secondary)] leading-relaxed bg-[#faf8f5] p-2.5 border border-[var(--grid-border)]/60 rounded-xs mt-1">
                    ${n.text}
                  </div>
                </div>

                <button type="button" class="toggle-flag-btn px-4 py-2.5 border text-xs font-sans uppercase tracking-wider shrink-0 interactive-option rounded-xs min-h-[44px] w-full sm:w-auto ${p?"bg-[#bd6f5d] text-white border-[#bd6f5d]":"bg-white text-[var(--text-secondary)] border-[var(--grid-border)] "}" data-id="${n.id}">
                  ${p?"Mistake Flagged ✓":"Flag Mistake"}
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
    `,r.querySelectorAll(".record-card").forEach((n,m)=>{const p=n.getAttribute("data-id"),u=()=>{t.has(p)||(t.add(p),i("record_inspected",{trial_index:m,stimulus_id:p,task_def_version:"1.0"}))};n.addEventListener("focus",u),n.addEventListener("mouseenter",u)}),r.querySelectorAll(".toggle-flag-btn").forEach((n,m)=>{const p=n.getAttribute("data-id"),u=f=>{s=f;const h=!e.has(p);h?e.add(p):e.delete(p),i("discrepancy_toggled",{trial_index:m,stimulus_id:p,flagged_state:h,input_modality:s,task_def_version:"1.0"}),c()};n.addEventListener("click",()=>u("mouse")),n.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),u("keyboard"))})}),(o=document.getElementById("a3SubmitBtn"))==null||o.addEventListener("click",()=>{i("verification_finalized",{action_id:"approve_ledger",input_modality:s,task_def_version:"1.0"}),x({mini_game:"A3",observations_count:l.length})})}c()}function oe(r,a){const{appContainer:i,miniGameIndex:x,gameId:v,logEvent:e,onMiniGameComplete:t}=r,s=v||(x===0?"F1":x===1?"F2":"F3");s==="F1"?de(i,a,e,t):s==="F2"?le(i,a,e,t):ce(i,a,e,t)}function de(r,a,i,x){let v=!0,e=0,t=50,s="accommodate",l="mouse",c=null;const o=[{stimulus_id:"F1_T1",title:"Sound Note: Sharp Echo",cue_text:'"Front row sound has sharp treble and heavy wall echo."',default_action:"accommodate"},{stimulus_id:"F1_T2",title:"Sound Note: Clear Hall",cue_text:'"Center hall sound is clear, balanced, and easy to hear."',default_action:"maintain_objective"},{stimulus_id:"F1_T3",title:"Sound Note: Quiet Whisper",cue_text:'"The speaker is reciting a whisper. Words are hard to hear."',default_action:"accommodate"},{stimulus_id:"F1_T4",title:"Sound Note: Sudden Silence",cue_text:'"A sudden quiet pause. Could be a dramatic silence or equipment issue."',default_action:"clarify"},{stimulus_id:"F1_T5",title:"Sound Note: Group Singing",cue_text:'"Group singing is steady and balanced across the entire room."',default_action:"maintain_objective"},{stimulus_id:"F1_T6",title:"Sound Note: Loud Voice Peak",cue_text:`"The speaker's voice peaks loudly on strong dramatic verse lines."`,default_action:"accommodate"}];function n(){var G;if(c&&(cancelAnimationFrame(c),c=null),v){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("Tuning the Hall","Adjust the hall sound to support the poetry reading.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>',goal:"Balance the room sound for the reading across 6 rounds.",steps:["Read the sound note from the hall.","Choose what to do: Adjust, Keep, or Check.","Move the volume slider if needed, then click Confirm."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=50,s="accommodate",n()});return}const m=o[e];r.innerHTML=A({worldCode:"W1",worldIndex:0,title:"Tuning the Hall",subtitle:"Adjust the hall sound to support the poetry reading.",instructionPrompt:"Your Task",instruction:"Read the sound note below. Pick your response and move the slider.",stimulusContent:`
        <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold">${m.title}</div>
              <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${m.cue_text}</div>
            </div>
          </div>
        </div>
      `,interactionContent:`
        <div class="space-y-4">
          <div>
            <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-sans">1. Choose your response:</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${s==="accommodate"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"}" data-action="accommodate">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${s==="accommodate"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                  Adjust Sound
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">Change the sound setting to help the speaker.</div>
              </button>
              <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${s==="maintain_objective"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"}" data-action="maintain_objective">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${s==="maintain_objective"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                  Keep Baseline
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">Leave the current sound setting as it is.</div>
              </button>
              <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs interactive-option min-h-[56px] ${s==="clarify"?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"}" data-action="clarify">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${s==="clarify"?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                  Check Channel
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">Check the audio signal before changing settings.</div>
              </button>
            </div>
          </div>

          <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-inner">
            <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-sans text-center">2. Adjust sound level:</div>
            <canvas id="waveCanvas" width="600" height="80" class="w-full h-20 bg-white border border-[var(--grid-border)] mb-3 rounded-xs"></canvas>

            <div class="w-full max-w-md mx-auto">
              <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
                <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-600 inline-block"></span> Soft (0)</span>
                <span class="font-sans text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)] rounded-xs" id="sliderValDisplay">${t}</span>
                <span class="flex items-center gap-1">Bright (100) <span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span></span>
              </div>
              <input type="range" id="freqSlider" min="0" max="100" step="5" value="${t}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg min-h-[44px]">
            </div>
          </div>
        </div>
      `,summaryContent:`
        <span>Your setting: <strong class="text-[var(--text-primary)]" id="choiceSummary">${s==="accommodate"?"Adjust Sound":s==="maintain_objective"?"Keep Baseline":"Check Channel"} (Level: ${t})</strong></span>
        <span class="text-[10px] text-stone-400 font-sans">${e+1} / 6</span>
      `,actionButtonId:"lockFreqBtn",actionButtonText:e<5?"Confirm Setting &rarr;":"Confirm & Finish &rarr;",progressText:`Sound Note ${e+1} of 6`});const p=document.getElementById("waveCanvas"),u=p==null?void 0:p.getContext("2d"),f=document.getElementById("freqSlider"),h=document.getElementById("sliderValDisplay"),b=document.getElementById("choiceSummary");let g=0;function y(){if(!u||!p)return;u.clearRect(0,0,p.width,p.height),u.strokeStyle="#f0eeea",u.lineWidth=1;for(let E=0;E<p.width;E+=30)u.beginPath(),u.moveTo(E,0),u.lineTo(E,p.height),u.stroke();u.strokeStyle="#bd6f5d",u.lineWidth=2.5,u.beginPath();const $=.015+t/100*.05,R=14+Math.abs(t-50)/50*16;for(let E=0;E<p.width;E++){const L=p.height/2+Math.sin(E*$+g)*R;E===0?u.moveTo(E,L):u.lineTo(E,L)}u.stroke(),g+=.04,c=requestAnimationFrame(y)}y(),r.querySelectorAll(".f1-action-btn").forEach($=>{$.addEventListener("click",()=>{var R,E;if(l="mouse",s=$.getAttribute("data-action"),r.querySelectorAll(".f1-action-btn").forEach(L=>{var U,Y;L.classList.remove("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),L.classList.add("border-[var(--grid-border)]","bg-white"),(U=L.querySelector("span.rounded-full"))==null||U.classList.remove("bg-[var(--accent-gold)]"),(Y=L.querySelector("span.rounded-full"))==null||Y.classList.add("bg-stone-300")}),$.classList.add("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),$.classList.remove("border-[var(--grid-border)]","bg-white"),(R=$.querySelector("span.rounded-full"))==null||R.classList.add("bg-[var(--accent-gold)]"),(E=$.querySelector("span.rounded-full"))==null||E.classList.remove("bg-stone-300"),b){const L=s==="accommodate"?"Adjust Sound":s==="maintain_objective"?"Keep Baseline":"Check Channel";b.textContent=`${L} (Level: ${t})`}})});let _=0,w=null;const I=($,R)=>{i("slider_input",{trial_index:e,stimulus_id:m.stimulus_id,slider_position_raw:$,input_modality:R,task_def_version:"1.0"}),_=Date.now()};f==null||f.addEventListener("input",$=>{if(l=$.pointerType||"mouse",t=parseInt($.target.value,10),h&&(h.textContent=t),b){const E=s==="accommodate"?"Adjust Sound":s==="maintain_objective"?"Keep Baseline":"Check Channel";b.textContent=`${E} (Level: ${t})`}const R=Date.now();R-_>=100?(w&&(clearTimeout(w),w=null),I(t,l)):w||(w=setTimeout(()=>{I(t,l),w=null},100-(R-_)))}),f==null||f.addEventListener("change",()=>{w&&(clearTimeout(w),w=null),I(t,l)}),f==null||f.addEventListener("keydown",$=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes($.key)&&(l="keyboard")}),(G=document.getElementById("lockFreqBtn"))==null||G.addEventListener("click",()=>{w&&(clearTimeout(w),w=null),c&&(cancelAnimationFrame(c),c=null),i("trial_submit",{trial_index:e,stimulus_id:m.stimulus_id,action_id:s,slider_position_raw:t,input_modality:l,task_def_version:"1.0"}),e<5?(e++,t=50,s=o[e].default_action,n()):x({mini_game:"F1",observations_count:6})})}n()}function le(r,a,i,x){let v=!0,e=0,t=null,s="mouse";const l=[{stimulus_id:"F2_T1",speaker_role:"Stage Lead",cue_text:'"The poet gestures toward the side speaker, asking for sound help."',condition_label:"Direct Request"},{stimulus_id:"F2_T2",speaker_role:"Hall Helper",cue_text:'"The speaker pauses with an uncertain look. No words are spoken."',condition_label:"Ambiguous Signal"},{stimulus_id:"F2_T3",speaker_role:"Sound Helper",cue_text:'"The performer sings with intense emotion as part of the poem."',condition_label:"Expressive Intensity"},{stimulus_id:"F2_T4",speaker_role:"Guest Drummer",cue_text:'"The drum player slowed tempo and watches the speaker closely."',condition_label:"Subtle Drift"}],c=[{id:"act",title:"Act Directly",desc:"Take action right away to help the speaker."},{id:"clarify",title:"Ask for Clarity",desc:"Check with the speaker before making any changes."},{id:"maintain",title:"Keep Course",desc:"Stay on course without stepping in too early."}];function o(){if(v){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Gathering Voices","Coordinate sound with your hall team.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>',goal:"Respond to teammate messages across 4 rounds.",steps:["Read the message from your teammate.","Choose your next step: Act, Ask, or Keep Course.","Click Confirm to save your choice."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=null,o()});return}const n=l[e],m=c.find(f=>f.id===t);r.innerHTML=A({worldCode:"W1",worldIndex:0,title:"The Gathering Voices",subtitle:"Coordinate sound with your hall team.",instructionPrompt:"Your Task",instruction:"Read the message from your teammate. Pick the best response below.",stimulusContent:`
        <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
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
      `,interactionContent:`
        <div>
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-sans">Pick your response:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${c.map(f=>`
              <div class="f2-card p-4 bg-white border ${t===f.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} cursor-pointer interactive-option space-y-1.5 rounded-xs min-h-[56px]" data-action="${f.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${t===f.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                  ${f.title}
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${f.desc}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `,summaryContent:`
        <span id="f2ChoiceText">${t?`You selected: <strong class="text-[var(--text-primary)]">${m==null?void 0:m.title}</strong>`:"Select an option above to continue."}</span>
        <span class="text-[10px] text-stone-400 font-sans">${e+1} / 4</span>
      `,actionButtonId:"f2ConfirmBtn",actionButtonText:e<3?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Message ${e+1} of 4`});const p=document.getElementById("f2ConfirmBtn"),u=document.getElementById("f2ChoiceText");r.querySelectorAll(".f2-card").forEach(f=>{const h=b=>{var g,y;if(s=b,t=f.getAttribute("data-action"),r.querySelectorAll(".f2-card").forEach(_=>{var w,I;_.classList.remove("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),_.classList.add("border-[var(--grid-border)]"),(w=_.querySelector("span.rounded-full"))==null||w.classList.remove("bg-[var(--accent-gold)]"),(I=_.querySelector("span.rounded-full"))==null||I.classList.add("bg-stone-300")}),f.classList.add("border-[var(--accent-gold)]","bg-amber-50/70","shadow-xs"),f.classList.remove("border-[var(--grid-border)]"),(g=f.querySelector("span.rounded-full"))==null||g.classList.add("bg-[var(--accent-gold)]"),(y=f.querySelector("span.rounded-full"))==null||y.classList.remove("bg-stone-300"),p&&(p.disabled=!1),u){const _=c.find(w=>w.id===t);u.innerHTML=`You selected: <strong class="text-[var(--text-primary)]">${_==null?void 0:_.title}</strong>`}};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),h("keyboard"))})}),p==null||p.addEventListener("click",()=>{i("trial_submit",{trial_index:e,stimulus_id:n.stimulus_id,action_id:t,input_modality:s,task_def_version:"1.0"}),e<3?(e++,t=null,o()):x({mini_game:"F2",observations_count:4})})}o()}function ce(r,a,i,x){let v=!0,e=0,t="baseline",s=null,l=null,c="mouse";const o=[{stimulus_id:"F3_T1",cue_id:"cue_expressive_crescendo",title:"Round 1: Rising Voice Line",cue_text:'"The poet begins a rising, powerful verse."',baseline_context:"Small Practice Room — Sound dies down quickly with no echo.",baseline_options:[{id:"support_volume",label:"Support Volume",desc:"Lift volume so sound carries across the room."},{id:"dampen_level",label:"Lower Level",desc:"Turn volume down before the loud peak."},{id:"neutral_hold",label:"Keep Steady",desc:"Keep room settings steady without changes."}],shifted_context:"Stone Hall — High stone walls bounce sound and create heavy echo.",shifted_options:[{id:"attenuate_reverb",label:"Lower Echo",desc:"Trim room echo so words stay clear."},{id:"support_volume",label:"Support Volume",desc:"Keep the volume boost from the small room."},{id:"neutral_hold",label:"Keep Steady",desc:"Make no changes for the stone room."}]},{stimulus_id:"F3_T2",cue_id:"cue_sotto_voce_pause",title:"Round 2: Quiet Whisper",cue_text:'"The poet drops into a quiet whisper between lines."',baseline_context:"Quiet Sitting Room — Audience sits close and easily hears every word.",baseline_options:[{id:"preserve_natural_intimacy",label:"Keep Natural Tone",desc:"Keep sound soft and clear without extra volume."},{id:"boost_high_gain",label:"High Boost",desc:"Force the whisper to play at loud volume."},{id:"cut_channel",label:"Mute Feed",desc:"Treat quiet verse as dead sound."}],shifted_context:"Courtyard Gate — Nearby street chatter and fountain water cover soft voices.",shifted_options:[{id:"boost_intelligibility",label:"Boost Voice",desc:"Lift the voice so outdoor chatter does not hide it."},{id:"preserve_natural_intimacy",label:"Keep Natural Tone",desc:"Leave voice unboosted so whisper is hard to hear."},{id:"cut_channel",label:"Mute Feed",desc:"Treat quiet sound as an equipment issue."}]},{stimulus_id:"F3_T3",cue_id:"cue_rhythmic_syncopation",title:"Round 3: Pause Before Verse",cue_text:'"The poet pauses suddenly before the final line."',baseline_context:"Solo Recital — A single speaker recites at a steady, driving pace.",baseline_options:[{id:"sustain_cadence",label:"Keep Pace",desc:"Keep the steady beat moving through the pause."},{id:"halt_accompaniment",label:"Stop Sound",desc:"Stop all instruments abruptly on the pause."},{id:"force_metronome",label:"Speed Up",desc:"Push the recital forward past the pause."}],shifted_context:"Group Singing — A chorus enters during the pause to sing an answer line.",shifted_options:[{id:"open_reciprocal_space",label:"Make Space",desc:"Pause instruments to let the chorus answer clearly."},{id:"sustain_cadence",label:"Keep Pace",desc:"Play straight through without waiting for the chorus."},{id:"force_metronome",label:"Speed Up",desc:"Rush the group tempo forward."}]}];function n(){var u,f;if(v){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Echo of the Room","Adjust your choices when room sound changes.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>',goal:"See how the same performance needs a new response when the room changes.",steps:["Read what the performer does in the first room.","Pick your first response.","See the new room setting and pick an updated response."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t="baseline",s=null,l=null,m(),n()});return}const p=o[e];if(t==="baseline"){const h=p.baseline_options.find(b=>b.id===s);r.innerHTML=`
        <div class="animate-soft-fade-in max-w-2xl mx-auto">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 1: The Frequency</span>
              
            </div>
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
              <div class="text-xs font-serif text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${p.cue_text}</div>
            </div>
            <div class="p-3 bg-amber-50/50 border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase font-sans tracking-wider text-amber-800 font-semibold">First Room Setting</span>
              <div class="text-xs text-[var(--text-primary)] mt-0.5">${p.baseline_context}</div>
            </div>
          </div>

          <!-- INTERACTION AREA -->
          <div class="space-y-2.5 mb-4 candidate-content-protected">
            <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 font-sans">Choose your response:</div>
            ${p.baseline_options.map(b=>`
              <div class="f3-opt p-3.5 bg-white border ${s===b.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer  interactive-option rounded-xs min-h-[50px]" data-choice="${b.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${s===b.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                  ${b.label}
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">${b.desc}</div>
              </div>
            `).join("")}
          </div>

          <!-- YOUR CHOICE -->
          <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
            <span>${s?`You selected: <strong class="text-[var(--text-primary)]">${h==null?void 0:h.label}</strong>`:"Select an option above to continue."}</span>
            <span class="text-[10px] text-stone-400 font-sans">Step 1 of 2</span>
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end">
            <button id="f3BaselineBtn" ${s?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
              Confirm and See Room Shift &rarr;
            </button>
          </div>
        </div>
      `,r.querySelectorAll(".f3-opt").forEach(b=>{const g=y=>{c=y,s=b.getAttribute("data-choice"),n()};b.addEventListener("click",()=>g("mouse")),b.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),g("keyboard"))})}),(u=document.getElementById("f3BaselineBtn"))==null||u.addEventListener("click",()=>{i("baseline_response_selected",{trial_index:e,stimulus_id:p.stimulus_id,cue_id:p.cue_id,choice_id:s,input_modality:c,task_def_version:"1.0"}),t="shifted",i("context_shifted",{trial_index:e,stimulus_id:p.stimulus_id,cue_id:p.cue_id,shifted_context:p.shifted_context,task_def_version:"1.0"}),n()})}else{const h=p.shifted_options.find(b=>b.id===l);r.innerHTML=`
        <div class="animate-soft-fade-in max-w-2xl mx-auto">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 1: The Frequency</span>
              
            </div>
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
              <div class="text-xs font-serif text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${p.cue_text}</div>
            </div>
            <div class="p-3 bg-amber-100/70 border border-[#bd6f5d]/50 rounded-xs">
              <span class="text-[10px] uppercase font-sans tracking-wider text-[#bd6f5d] font-semibold">New Room Setting</span>
              <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${p.shifted_context}</div>
            </div>
          </div>

          <!-- INTERACTION AREA -->
          <div class="space-y-2.5 mb-4 candidate-content-protected">
            <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 font-sans">Choose your updated response:</div>
            ${p.shifted_options.map(b=>`
              <div class="f3-updated-opt p-3.5 bg-white border ${l===b.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer  interactive-option rounded-xs min-h-[50px]" data-choice="${b.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${l===b.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                  ${b.label}
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">${b.desc}</div>
              </div>
            `).join("")}
          </div>

          <!-- YOUR CHOICE -->
          <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
            <span>${l?`You selected: <strong class="text-[var(--text-primary)]">${h==null?void 0:h.label}</strong>`:"Select an option above to continue."}</span>
            <span class="text-[10px] text-stone-400 font-sans">Step 2 of 2</span>
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end">
            <button id="f3UpdatedBtn" ${l?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
              ${e<2?"Save Updated Setting & Next Round &rarr;":"Finish World 1 &rarr;"}
            </button>
          </div>
        </div>
      `,r.querySelectorAll(".f3-updated-opt").forEach(b=>{const g=y=>{c=y,l=b.getAttribute("data-choice"),n()};b.addEventListener("click",()=>g("mouse")),b.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),g("keyboard"))})}),(f=document.getElementById("f3UpdatedBtn"))==null||f.addEventListener("click",()=>{i("updated_response_selected",{trial_index:e,stimulus_id:p.stimulus_id,cue_id:p.cue_id,choice_id:l,input_modality:c,task_def_version:"1.0"}),i("transition_completed",{trial_index:e,stimulus_id:p.stimulus_id,task_def_version:"1.0"}),e<2?(e++,t="baseline",s=null,l=null,m(),n()):x({mini_game:"F3",observations_count:3})})}}function m(){const p=o[e];i("transition_presented",{trial_index:e,stimulus_id:p.stimulus_id,cue_id:p.cue_id,baseline_context:p.baseline_context,task_def_version:"1.0"})}n()}function ue(r,a){const{appContainer:i,miniGameIndex:x,gameId:v,logEvent:e,onMiniGameComplete:t}=r,s=v||(x===0?"C1":x===1?"C2":"C3");s==="C1"?pe(i,a,e,t):s==="C2"?me(i,a,e,t):xe(i,a,e,t)}function pe(r,a,i,x){let v=!0,e=0,t=0,s="mouse";const l=[{stimulus_id:"C1_R1",title:"Round 1: Partner Needs Tiles",description:"Your partner needs 3 more tiles to finish. You have 8 tiles.",partner_initial:2,user_initial:8,default_transfer:0,context_note:"Partner Needs Help"},{stimulus_id:"C1_R2",title:"Round 2: Balanced Baskets",description:"Both you and your partner have 5 tiles. Both have enough to finish.",partner_initial:5,user_initial:5,default_transfer:0,context_note:"Both Have Enough"},{stimulus_id:"C1_R3",title:"Round 3: Your Basket is Low",description:"Your basket has only 3 tiles (you need 6). Your partner has 7 tiles.",partner_initial:7,user_initial:3,default_transfer:0,context_note:"Keep Your Tiles"}];function c(){var u,f,h;if(v){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Artisan's Basket","Coordinate ceramic tiles with your workshop partner.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',goal:"Share tiles with your partner across 3 rounds.",steps:["Check how many tiles you and your partner currently have.","Use plus and minus to move tiles if you wish.","Click Confirm to complete the round."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=0,o(),c()});return}const n=l[e],m=n.partner_initial+t,p=n.user_initial-t;r.innerHTML=A({worldCode:"W3",worldIndex:2,title:"The Artisan's Basket",subtitle:"Coordinate ceramic tiles with your workshop partner.",instructionPrompt:"Your Task",instruction:"Check tile counts below. Move tiles to your partner if needed.",stimulusContent:`
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${n.title}:</strong> ${n.description}
          </span>
          <span class="text-[10px] font-sans uppercase tracking-wider text-[var(--text-secondary)]">${n.context_note}</span>
        </div>
      `,interactionContent:`
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
          <div class="grid grid-cols-2 gap-4 text-center mb-5">
            <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
              <span class="text-[10px] text-[var(--accent-gold)] uppercase font-semibold font-sans">Partner Basket</span>
              <div class="text-xl font-serif font-semibold text-[#bd6f5d] mt-1">${m} Tiles</div>
              <div class="flex justify-center gap-1 mt-2.5 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0,m)).fill('<div class="w-3.5 h-3.5 bg-[#bd6f5d]/70 rounded-xs shadow-xs"></div>').join("")}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
              <span class="text-[10px] text-emerald-700 uppercase font-semibold font-sans">Your Basket</span>
              <div class="text-xl font-serif font-semibold text-emerald-800 mt-1">${p} Tiles</div>
              <div class="flex justify-center gap-1 mt-2.5 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0,p)).fill('<div class="w-3.5 h-3.5 bg-emerald-700/70 rounded-xs shadow-xs"></div>').join("")}
              </div>
            </div>
          </div>

          <div class="text-center pt-3 border-t border-[var(--grid-border)]">
            <div class="text-xs text-[var(--text-secondary)] mb-2 font-sans">Tiles to share with partner:</div>
            <div class="flex justify-center items-center gap-4">
              <button type="button" id="minusTileBtn" class="w-12 h-12 rounded-xs bg-white border border-[var(--grid-border)] text-xl font-bold hover:bg-amber-50 interactive-option shadow-xs flex items-center justify-center min-h-[44px]" tabindex="0">-</button>
              <span id="transferCount" class="font-serif text-3xl font-semibold text-[var(--accent-gold)] w-12 text-center">${t}</span>
              <button type="button" id="plusTileBtn" class="w-12 h-12 rounded-xs bg-white border border-[var(--grid-border)] text-xl font-bold hover:bg-amber-50 interactive-option shadow-xs flex items-center justify-center min-h-[44px]" tabindex="0">+</button>
            </div>
          </div>
        </div>
      `,summaryContent:`
        <span>Sharing: <strong class="text-[var(--text-primary)]">${t} tiles</strong> (You keep ${p})</span>
        <span class="text-[10px] text-stone-400 font-sans">Round ${e+1} of 3</span>
      `,actionButtonId:"confirmTransferBtn",actionButtonText:e<2?"Confirm Allocation &rarr;":"Confirm & Finish &rarr;",progressText:`Round ${e+1} of 3`}),(u=document.getElementById("minusTileBtn"))==null||u.addEventListener("click",()=>{s="mouse",t>0&&(t--,i("resource_transferred",{trial_index:e,stimulus_id:n.stimulus_id,delta:-1,action_type:"return_to_user",input_modality:s,task_def_version:"1.0"}),c())}),(f=document.getElementById("plusTileBtn"))==null||f.addEventListener("click",()=>{s="mouse",t<n.user_initial&&(t++,i("resource_transferred",{trial_index:e,stimulus_id:n.stimulus_id,delta:1,action_type:"transfer_to_partner",input_modality:s,task_def_version:"1.0"}),c())}),(h=document.getElementById("confirmTransferBtn"))==null||h.addEventListener("click",()=>{i("allocation_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,input_modality:s,task_def_version:"1.0"}),e<2?(e++,t=0,o(),c()):x({mini_game:"C1",observations_count:3})})}function o(){const n=l[e];i("round_presented",{trial_index:e,stimulus_id:n.stimulus_id,input_modality:s,task_def_version:"1.0"})}c()}function me(r,a,i,x){let v=!0,e=0,t=null,s="mouse";const l=[{stimulus_id:"C2_R1",title:"Round 1: Open Wall Space",partner_desc:"Partner hung their painting on the top left corner.",slots:[{id:"SLOT_NORTH_RIGHT",label:"Top Right (Even Spacing)"},{id:"SLOT_OVERLAP_LEFT",label:"Next to Partner (Tight Cluster)"},{id:"SLOT_BOTTOM_CENTER",label:"Bottom Center (Center Spot)"}]},{stimulus_id:"C2_R2",title:"Round 2: Keep Hallway Clear",partner_desc:"Partner is framing the center hallway. Keep the doorway path clear.",slots:[{id:"SLOT_PERIMETER_EAST",label:"East Wall (Keeps Path Open)"},{id:"SLOT_CENTER_ADJACENT",label:"Center Slot (Crowds the Hall)"},{id:"SLOT_PERIMETER_WEST",label:"West Wall (Keeps Path Open)"}]},{stimulus_id:"C2_R3",title:"Round 3: Partner Moved Down",partner_desc:"Partner moved their artwork down to the lower wall.",slots:[{id:"SLOT_UPPER_GALLERY",label:"Top Wall (Balances Both Sides)"},{id:"SLOT_LOWER_CONGESTED",label:"Lower Wall (Crowds Lower Wall)"},{id:"SLOT_MID_SIDE",label:"Side Niche (Side Corner)"}]}];function c(){var p;if(v){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Gallery Wall","Coordinate artwork placement with your partner.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>',goal:"Choose a wall spot for your piece across 3 rounds.",steps:["See where your partner hung their artwork.","Choose an open wall spot from the options.","Click Confirm to hang your piece."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=null,o(),c()});return}const n=l[e],m=n.slots.find(u=>u.id===t);r.innerHTML=A({worldCode:"W3",worldIndex:2,title:"The Gallery Wall",subtitle:"Coordinate artwork placement with your partner.",instructionPrompt:"Your Task",instruction:"Check your partner's position. Choose an open spot that balances the wall.",stimulusContent:`
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${n.title}:</strong> ${n.partner_desc}
          </span>
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Round ${e+1} of 3</span>
        </div>
      `,interactionContent:`
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Available Wall Placement Slots:</div>
          <div class="flex flex-col gap-2.5">
            ${n.slots.map(u=>`
              <button type="button" class="slot-btn px-4 py-3 text-xs border rounded-xs ${t===u.id?"border-[var(--accent-gold)] bg-amber-50/70 font-semibold shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)] bg-white"} interactive-option flex items-center justify-between min-h-[48px]" data-slot="${u.id}" tabindex="0">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===u.id?"bg-[var(--accent-gold)] text-white":"text-stone-400"}">${t===u.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)]">${u.label}</span>
                </span>
                <span class="text-[10px] text-[var(--accent-gold)] font-medium uppercase">Slot ${u.id.replace("SLOT_","")}</span>
              </button>
            `).join("")}
          </div>
        </div>
      `,summaryContent:`
        <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${m==null?void 0:m.label}</strong>`:"Select a spot above to continue."}</span>
        <span class="text-[10px] text-stone-400 font-sans">Round ${e+1} of 3</span>
      `,actionButtonId:"confirmWallBtn",actionButtonText:e<2?"Confirm Placement &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Round ${e+1} of 3`}),r.querySelectorAll(".slot-btn").forEach(u=>{const f=h=>{s=h,t=u.getAttribute("data-slot"),i("placement_attempted",{trial_index:e,stimulus_id:n.stimulus_id,slot_id:t,input_modality:s,task_def_version:"1.0"}),c()};u.addEventListener("click",()=>f("mouse")),u.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(p=document.getElementById("confirmWallBtn"))==null||p.addEventListener("click",()=>{i("placement_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_slot:t,input_modality:s,task_def_version:"1.0"}),e<2?(e++,t=null,o(),c()):x({mini_game:"C2",observations_count:3})})}function o(){const n=l[e];i("round_presented",{trial_index:e,stimulus_id:n.stimulus_id,task_def_version:"1.0"})}c()}function xe(r,a,i,x){let v=!0,e=0,t=null,s=null,l="mouse";const c=[{stimulus_id:"C3_R1",title:"Opportunity 1: Partner Lantern is Dark",partner_state:"Your partner's lantern turned dark during setup.",condition_type:"identify_and_repair",fault_options:[{id:"fault_conduit_disconnected",label:"The wire came loose at the connector"},{id:"fault_bulb_broken",label:"The glass bulb is broken"},{id:"fault_switch_off",label:"The main hall switch is off"}],repair_options:[{id:"adjust_conduit",label:"Reconnect the loose wire and tighten the clamp"},{id:"call_help_desk",label:"Call the main help desk"},{id:"replace_lantern",label:"Take down the entire lamp"}],execution_action:"restore_power"},{stimulus_id:"C3_R2",title:"Opportunity 2: Hanging Rope Stuck",partner_state:"The hanging rope got caught in the wheel bracket.",condition_type:"identify_and_repair",fault_options:[{id:"fault_cable_pulley_pinch",label:"Rope is pinched between wheel and metal frame"},{id:"fault_cable_snapped",label:"The rope snapped completely"},{id:"fault_wall_anchor_loose",label:"The wall hook is loose"}],repair_options:[{id:"reseat_pulley_cable",label:"Loosen the lever and place the rope back on the wheel"},{id:"call_facility_maintenance",label:"File a general repair request"},{id:"force_pull_cable",label:"Pull the rope down hard"}],execution_action:"align_panel_height"},{stimulus_id:"C3_R3",title:"Opportunity 3: Shadow Blocks Artwork",partner_state:"A movable wooden screen casts a dark shadow over your partner's painting.",condition_type:"identify_and_repair",fault_options:[{id:"fault_blindspot_obstruction",label:"Wooden screen blocks the spotlight beam"},{id:"fault_color_distortion",label:"The light color looks wrong"}],repair_options:[{id:"shift_lantern",label:"Turn the spotlight slightly to shine around the screen"},{id:"generic_complaint",label:"Submit a general lighting complaint"}],execution_action:"illuminate_path"}];function o(){var u;if(v){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Dual Lanterns","Resolve studio breakdowns to keep the hall ready.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',goal:"Find the work issue, pick a fix, and repair it together.",steps:["Examine the situation described in each round.","Identify the issue from the list.","Choose a helpful fix and apply the repair."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=null,s=null,n(),o()});return}const m=c[e];m.fault_options.find(f=>f.id===t);const p=m.repair_options.find(f=>f.id===s);r.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 3: The Shared Canvas</span>
            
          </div>
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
            <strong>${m.title}:</strong> ${m.partner_state}
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
              ${m.fault_options.map(f=>`
                <div class="fault-opt p-3 bg-white border ${t===f.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium":"border-[var(--grid-border)] "} rounded-xs cursor-pointer interactive-option text-xs flex items-center gap-2 min-h-[44px]" data-fault="${f.id}" tabindex="0" role="button">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${t===f.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===f.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)]">${f.label}</span>
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
                ${m.repair_options.map(f=>`
                  <div class="repair-opt p-3 bg-white border ${s===f.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium":"border-[var(--grid-border)] "} rounded-xs cursor-pointer interactive-option text-xs flex items-center gap-2 min-h-[44px]" data-repair="${f.id}" tabindex="0" role="button">
                    <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${s===f.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${s===f.id?"✓":""}</span>
                    <span class="text-[var(--text-primary)]">${f.label}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          `:""}
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${t&&s?`Fix selected: <strong class="text-[var(--text-primary)]">${p==null?void 0:p.label}</strong>`:t?"Now choose a fix in Step 2.":"Select an issue in Step 1."}</span>
          <span class="text-[10px] text-stone-400 font-sans">${e+1} / 3</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="executeRepairBtn" ${t&&s?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
            ${e<2?"Apply Fix & Next Problem &rarr;":"Finish World 3 &rarr;"}
          </button>
        </div>
      </div>
    `,r.querySelectorAll(".fault-opt").forEach(f=>{const h=b=>{l=b,t=f.getAttribute("data-fault"),i("breakdown_identified",{trial_index:e,stimulus_id:m.stimulus_id,fault_id:t,input_modality:l,task_def_version:"1.0"}),o()};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),h("keyboard"))})}),r.querySelectorAll(".repair-opt").forEach(f=>{const h=b=>{l=b,s=f.getAttribute("data-repair"),i("repair_action_performed",{trial_index:e,stimulus_id:m.stimulus_id,repair_action_id:s,input_modality:l,task_def_version:"1.0"}),o()};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),h("keyboard"))})}),(u=document.getElementById("executeRepairBtn"))==null||u.addEventListener("click",()=>{i("repaired_action_executed",{trial_index:e,stimulus_id:m.stimulus_id,fault_id:t,repair_action_id:s,execution_action_id:m.execution_action,input_modality:l,task_def_version:"1.0"}),e<2?(e++,t=null,s=null,n(),o()):x({mini_game:"C3",observations_count:3})})}function n(){const m=c[e];i("repair_presented",{trial_index:e,stimulus_id:m.stimulus_id,task_def_version:"1.0"})}o()}function fe(r,a){const{appContainer:i,miniGameIndex:x,gameId:v,logEvent:e,onMiniGameComplete:t}=r,s=v||(x===0?"E1":x===1?"E2":"E3");s==="E1"?ve(i,a,e,t):s==="E2"?be(i,a,e,t):he(i,a,e,t)}function ve(r,a,i,x){let v=!0,e=0,t="mouse";const s=[{stimulus_id:"E1_T1",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T2",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T3",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T4",color:"Sage",shape:"Square",icon:"&#9632;",label:"Sage Square"},{stimulus_id:"E1_T5",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T6",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T7",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T8",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T9",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"}];function l(){if(v){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Ceramic Mosaic","Sort each tile into the matching container.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>',goal:"Sort 9 tiles into the matching containers.",steps:["Look at the tile shape and color.","Click Container 1 or Container 2 to place it.","Watch the feedback note to see if your choice fit the rule."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,performance.now(),c(),l()});return}const o=s[e];r.innerHTML=A({worldCode:"W4",worldIndex:3,title:"The Ceramic Mosaic",subtitle:"Sort each ceramic tile into the matching container.",instructionPrompt:"Your Task",instruction:"Examine the tile below. Click Container 1 or 2 to file it.",stimulusContent:`
        <div class="p-6 bg-white border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
          <div class="text-5xl mb-2 ${o.color==="Gold"?"text-[var(--accent-gold)]":"text-emerald-700"}">
            ${o.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${o.label}</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-0.5 font-sans uppercase">${o.color} &bull; ${o.shape}</div>
        </div>
      `,interactionContent:`
        <div class="grid grid-cols-2 gap-4">
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)] hover:bg-amber-50/40 interactive-option text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_1" tabindex="0">
            <span class="text-2xl text-[var(--accent-gold)] block mb-1">&#9679;</span>
            <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 1</span>
            <span class="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-sans">Reference: Gold Circle</span>
          </button>
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)] hover:bg-amber-50/40 interactive-option text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_2" tabindex="0">
            <span class="text-2xl text-emerald-800 block mb-1">&#9632;</span>
            <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 2</span>
            <span class="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-sans">Reference: Sage Square</span>
          </button>
        </div>
      `,progressText:`Tile ${e+1} of ${s.length}`}),r.querySelectorAll(".bin-btn").forEach(n=>{const m=p=>{t=p;const u=n.getAttribute("data-choice");i("tile_sorted",{trial_index:e,stimulus_id:o.stimulus_id,choice:u,input_modality:t,task_def_version:"1.0"}),e<s.length-1?(e++,performance.now(),c(),l()):x({mini_game:"E1",observations_count:9})};n.addEventListener("click",()=>m("mouse")),n.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),m("keyboard"))})})}function c(){const o=s[e];i("trial_presented",{trial_index:e,stimulus_id:o.stimulus_id,tile_color:o.color,tile_shape:o.shape,task_def_version:"1.0"})}l()}function be(r,a,i,x){let v=!0,e=0,t=null,s="mouse";const l=[{stimulus_id:"E2_S1",title:"Sequence 1: Ink Spill on Desk",situation:"A small drop of ink spilled onto your active pattern card.",has_disruption:!0,disruption_type:"ink_spill_masking_workspace",options:[{id:"clear_workspace",label:"Dab ink with a cloth and straighten your card",note:"Calm cleanup"},{id:"rush_uncleaned",label:"Keep placing tiles around the wet ink",note:"Rushed step"},{id:"pause_idle",label:"Step away and wait for help",note:"Long wait"}]},{stimulus_id:"E2_S2",title:"Sequence 2: Calm Studio Work",situation:"The workbench is clean, tidy, and well lit.",has_disruption:!1,disruption_type:"undisrupted_control",options:[{id:"standard_sequence",label:"Continue placing tiles according to plan",note:"Steady step"},{id:"unnecessary_rework",label:"Take tiles apart to re-check for no reason",note:"Unneeded check"},{id:"pause_idle",label:"Stop and wait before continuing",note:"Unneeded pause"}]},{stimulus_id:"E2_S3",title:"Sequence 3: Breeze Blows Paper",situation:"A sudden breeze blew your reference drawing off the table.",has_disruption:!0,disruption_type:"draft_blows_reference_card",options:[{id:"stabilize_reference",label:"Pick up paper and weigh it down with a stone",note:"Fix and secure"},{id:"guess_motif",label:"Place tiles from memory without looking at plan",note:"Guessing"},{id:"pause_idle",label:"Wait for the wind to stop",note:"Waiting"}]},{stimulus_id:"E2_S4",title:"Sequence 4: Color Tray in the Way",situation:"A color tray was nudged and blocks your tool holder.",has_disruption:!0,disruption_type:"misplaced_pigment_tray",options:[{id:"reposition_tray",label:"Slide the tray back to its own side",note:"Move tray"},{id:"use_wrong_shade",label:"Work around the tray at an awkward angle",note:"Awkward reach"},{id:"pause_idle",label:"Stop work until someone comes back",note:"Waiting"}]}];function c(){var p;if(v){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Courtyard Setup","Respond constructively to workshop situations.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',goal:"Respond to unexpected workshop situations across 4 rounds.",steps:["Read what just happened in the workshop.","Pick what you would do next from the 3 options.","Click Confirm to move to the next situation."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=null,o(),c()});return}const n=l[e],m=n.options.find(u=>u.id===t);r.innerHTML=A({worldCode:"W4",worldIndex:3,title:"The Courtyard Setup",subtitle:"Choose the best response when unexpected studio events happen.",instructionPrompt:"Your Task",instruction:"Read the situation below. Pick the most practical next step.",stimulusContent:`
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${n.title}:</strong> ${n.situation}
          </span>
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Scenario ${e+1} of 4</span>
        </div>
      `,interactionContent:`
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Available Responses:</div>
          <div class="space-y-2.5">
            ${n.options.map(u=>`
              <div class="e2-opt p-3.5 bg-white border ${t===u.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-xs flex items-center justify-between min-h-[48px]" data-action="${u.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===u.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===u.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${u.label}</span>
                </span>
                <span class="text-[10px] text-[var(--text-secondary)] uppercase font-medium">${u.note}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `,summaryContent:`
        <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${m==null?void 0:m.label}</strong>`:"Select an option above to continue."}</span>
        <span class="text-[10px] text-stone-400 font-sans">${e+1} / ${l.length}</span>
      `,actionButtonId:"confirmE2Btn",actionButtonText:e<l.length-1?"Confirm Choice &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Scenario ${e+1} of ${l.length}`}),r.querySelectorAll(".e2-opt").forEach(u=>{const f=h=>{s=h,t=u.getAttribute("data-action"),i("action_selected",{trial_index:e,stimulus_id:n.stimulus_id,action_id:t,input_modality:s,task_def_version:"1.0"}),c()};u.addEventListener("click",()=>f("mouse")),u.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(p=document.getElementById("confirmE2Btn"))==null||p.addEventListener("click",()=>{i("sequence_completed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_action:t,input_modality:s,task_def_version:"1.0"}),e<l.length-1?(e++,t=null,o(),c()):x({mini_game:"E2",observations_count:4})})}function o(){const n=l[e];i("sequence_presented",{trial_index:e,stimulus_id:n.stimulus_id,has_disruption:n.has_disruption,disruption_type:n.disruption_type,task_def_version:"1.0"})}c()}function he(r,a,i,x){let v=!0,e=0,t=null,s="mouse";const l=[{stimulus_id:"E3_C1",title:"Condition 1: Three Colors Available",constraint_state:"standard_three_color_palette",description:"Gold, sage, and terracotta colors are all on the table.",options:[{id:"standard_layout",label:"Three-Color Pattern (Balanced three-color arrangement)"},{id:"tonal_adaptation",label:"Single Color Shades (One shade only)"},{id:"compact_adaptation",label:"Half-Grid Squeeze"}]},{stimulus_id:"E3_C2",title:"Condition 2: Only Indigo Blue Available",constraint_state:"monochrome_indigo_only",description:"Only one blue color is available on the table.",options:[{id:"tonal_adaptation",label:"Light and Dark Shading (Create depth using light and dark tones)"},{id:"standard_layout",label:"Try Three Colors (Cannot be done with one color)"},{id:"compact_adaptation",label:"Small Stamp Layout"}]},{stimulus_id:"E3_C3",title:"Condition 3: Half-Size Wall Space",constraint_state:"boundary_constricted_half_grid",description:"The wall space is cut in half. The artwork must fit smaller dimensions.",options:[{id:"compact_adaptation",label:"Compact Small Design (Scale down pattern to fit half wall)"},{id:"standard_layout",label:"Full Size Layout (Too wide for the small wall)"},{id:"tonal_adaptation",label:"Unscaled Shading Layout"}]}];function c(){var p;if(v){r.innerHTML=`
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${a("The Shifting Medium","Adapt design layout when studio materials change.")}
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>',goal:"Adapt your mosaic design strategy to match shifting studio constraints.",steps:["Examine the active studio condition in each round.","Choose the layout option that matches the condition.","Confirm your choice across all 3 rounds."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=null,o(),c()});return}const n=l[e],m=n.options.find(u=>u.id===t);r.innerHTML=`
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 4: The Shifting Grid</span>
            
          </div>
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
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Layout ${e+1} of ${l.length}</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Layout Options:</div>
          <div class="space-y-2.5">
            ${n.options.map(u=>`
              <div class="e3-opt p-3.5 bg-white border ${t===u.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-layout="${u.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${t===u.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===u.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${u.label}</span>
                </span>
                <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium">Option ${u.id.replace("LAYOUT_","")}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${t?`You selected: <strong class="text-[var(--text-primary)]">${m==null?void 0:m.label}</strong>`:"Select a layout above to continue."}</span>
          <span class="text-[10px] text-stone-400 font-sans">${e+1} / ${l.length}</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="confirmE3Btn" ${t?"":"disabled"} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs min-h-[44px]">
            ${e<l.length-1?"Confirm Layout &rarr;":"Finish World 4 &rarr;"}
          </button>
        </div>
      </div>
    `,r.querySelectorAll(".e3-opt").forEach(u=>{const f=h=>{s=h,t=u.getAttribute("data-layout"),i("composition_action_attempted",{trial_index:e,stimulus_id:n.stimulus_id,action_id:t,input_modality:s,task_def_version:"1.0"}),c()};u.addEventListener("click",()=>f("mouse")),u.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(p=document.getElementById("confirmE3Btn"))==null||p.addEventListener("click",()=>{i("composition_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_action:t,input_modality:s,task_def_version:"1.0"}),e<l.length-1?(e++,t=null,o(),c()):x({mini_game:"E3",observations_count:3})})}function o(){const n=l[e];i("condition_presented",{trial_index:e,stimulus_id:n.stimulus_id,constraint_state:n.constraint_state,task_def_version:"1.0"})}c()}function ge(r,a){const{appContainer:i,miniGameIndex:x,gameId:v,logEvent:e,onMiniGameComplete:t}=r,s=v||(x===0?"Q1":x===1?"Q2":"Q3");s==="Q1"?ye(i,a,e,t):s==="Q2"?_e(i,a,e,t):we(i,a,e,t)}function ye(r,a,i,x){let v=!0,e=0,t=null,s={},l="mouse";const c=[{stimulus_id:"Q1_D1",title:"Antique Gold-Leaf Manuscript Leaf",scenario:"Choose the binding method for a fragile 19th-century manuscript page.",options:[{id:"flexible_cord_binding",label:"Sewn Flexible Cord (Allows spine to bend safely)"},{id:"tight_adhesive_clamp",label:"Rigid Glue Clamp (Firm hold on spine)"},{id:"unbound_portfolio",label:"Loose Archival Folder (Kept as separate sheets)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Binding Methods Note",info_value:"high",summary:"Srinagar bookbinders used soft vegetable cord to protect delicate gold borders."},{id:"OPT_CONTROL_1",topic:"Library Stamp Dates",info_value:"low",summary:"City library accession stamps began in late October 1888."}]},{stimulus_id:"Q1_D2",title:"Papier-Mâché Pen Case (Qalamdan)",scenario:"Select a protective surface coating for this painted lacquer case.",options:[{id:"curing_linseed_glaze",label:"Linseed Oil & Amber Varnish (Traditional slow curing glaze)"},{id:"quick_synthetic_seal",label:"Quick Synthetic Clear Spray (Modern fast-drying finish)"},{id:"wax_buff_only",label:"Dry Wax Polish (Gentle surface buffing)"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Papier-Mâché Care Guide",info_value:"high",summary:"Slow drying with natural amber resin keeps natural mineral colors bright."},{id:"OPT_CONTROL_2",topic:"Cabinet Hinge Maintenance",info_value:"low",summary:"Brass display cabinet hinges need oiling twice each year."}]},{stimulus_id:"Q1_D3",title:"Workshop Artisan Register",scenario:"Identify the origin of this undated Persian artisan register.",options:[{id:"guild_ledger_verified",label:"Official Guild Register (Bears official guildmaster seal)"},{id:"private_merchant_tally",label:"Merchant Shop Notebook (Informal daily trade tally)"},{id:"state_excise_record",label:"Treasury Tax Record (Official tax register)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Register Stitching Styles",info_value:"high",summary:"Crimson thread stitching was reserved for registered royal guilds."},{id:"OPT_CONTROL_1",topic:"Filing Code Reference",info_value:"low",summary:"Old municipal tax files use code series B."}]},{stimulus_id:"Q1_D4",title:"Natural Pigment Jars",scenario:"Select storage conditions for delicate saffron and indigo pigments.",options:[{id:"dark_vented_cedar_chest",label:"Dark Cedar Chest (Controlled humidity and shade)"},{id:"ambient_glass_display",label:"Open Glass Vitrine (Direct gallery daylight)"},{id:"sealed_vacuum_capsule",label:"Sealed Dry Capsule (Zero-humidity container)"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Natural Pigment Care",info_value:"high",summary:"Direct sunlight fades saffron. Cedar wood naturally repels insects."},{id:"OPT_CONTROL_2",topic:"Shelf Weight Limits",info_value:"low",summary:"Wooden display shelves can hold up to 25 kilograms."}]}];function o(){var p;if(v){r.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 5: The Hidden Gallery</span>
            
          </div>
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',goal:"Make preservation choices for 4 historic items.",steps:["Read the artifact prompt and choose your option.","Click optional research notes if you want more background.","Click Confirm when you are ready to continue."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=null,n(),o()});return}const m=c[e];r.innerHTML=A({worldCode:"W5",worldIndex:4,title:"The Curatorial Dossier",subtitle:"Choose the best way to care for each historic item.",instructionPrompt:"Your Task",instruction:"Review the artifact below. Choose an action. Optional reference notes are available if you want them.",stimulusContent:`
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-sans uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Artifact Record</span>
            <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium">Record ${e+1} of 4</span>
          </div>
          <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)]">${m.title}</div>
          <div class="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">${m.scenario}</div>
        </div>
      `,interactionContent:`
        <div class="space-y-4">
          <!-- Optional Reference Notes -->
          <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
            <div class="text-[10px] uppercase font-sans text-[var(--accent-gold)] font-semibold tracking-wider mb-2 flex items-center justify-between">
              <span>Optional Reference Notes (Click to Open)</span>
              <span class="text-[9px] text-[var(--text-secondary)] font-normal">Voluntary consultation</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${m.optional_resources.map(u=>`
                <div class="opt-res-card p-3 bg-white border ${s[u.id]?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-xs min-h-[48px] flex flex-col justify-center" data-res="${u.id}">
                  <div class="flex items-center justify-between">
                    <span class="font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      ${u.topic}
                    </span>
                    <span class="text-[9px] font-sans uppercase text-[var(--text-secondary)]">${s[u.id]?"Opened":"Inspect"}</span>
                  </div>
                  ${s[u.id]?`<p class="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--grid-border)] pt-2 animate-soft-fade-in">${u.summary}</p>`:""}
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Curatorial Actions -->
          <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
            <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Choose Preservation Action:</div>
            <div class="space-y-2.5">
              ${m.options.map(u=>`
                <div class="q1-opt p-3.5 bg-white border ${t===u.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-xs flex items-center justify-between min-h-[48px]" data-choice="${u.id}" tabindex="0" role="button">
                  <span class="flex items-center gap-2.5">
                    <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 ${t===u.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${t===u.id?"✓":""}</span>
                    <span class="text-[var(--text-primary)] font-medium">${u.label}</span>
                  </span>
                  <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium shrink-0">Action ${String.fromCharCode(65+m.options.indexOf(u))}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `,actionButtonId:"confirmQ1Btn",actionButtonText:e<c.length-1?"Confirm Decision &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!t,progressText:`Record ${e+1} of ${c.length}`}),r.querySelectorAll(".opt-res-card").forEach(u=>{u.addEventListener("click",()=>{l="mouse";const f=u.getAttribute("data-res");s[f]=!0,i("optional_resource_viewed",{trial_index:e,stimulus_id:m.stimulus_id,resource_id:f,input_modality:l,task_def_version:"1.0"}),o()})}),r.querySelectorAll(".q1-opt").forEach(u=>{const f=h=>{l=h,t=u.getAttribute("data-choice"),o()};u.addEventListener("click",()=>f("mouse")),u.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(p=document.getElementById("confirmQ1Btn"))==null||p.addEventListener("click",()=>{i("decision_submitted",{trial_index:e,stimulus_id:m.stimulus_id,choice:t,input_modality:l,task_def_version:"1.0"}),e<c.length-1?(e++,t=null,s={},n(),o()):x({mini_game:"Q1",observations_count:4})})}function n(){const m=c[e];i("decision_presented",{trial_index:e,stimulus_id:m.stimulus_id,task_def_version:"1.0"})}o()}function _e(r,a,i,x){let v=!0,e=0,t={},s=null,l="mouse";const c=[{stimulus_id:"Q2_T1",artifact_id:"manuscript_seal_1",title:"Relic 1: Wax Seal on Parchment",description:"A dark red wax seal stamped onto an old parchment document.",uncertainty_level:"moderate",expected_value:"high",clues:[{id:"CLUE_SEAL_INTAGLIO",label:"Carved Seal Border Script",detail:"Shows the official stamp of the Srinagar city office from 1862."},{id:"CLUE_WAX_RESIN",label:"Wax Material Analysis",detail:"Made with local pine resin rather than imported European wax."},{id:"CLUE_PARCHMENT_GRAIN",label:"Parchment Skin Grain",detail:"Mountain goatskin with hand-scraped natural grain."}],attributions:[{id:"attr_imperial_registrar_srinagar",label:"City Office of Srinagar (1860s)"},{id:"attr_commercial_trader",label:"River Trader Shipping Record"},{id:"attr_modern_reproduction",label:"Modern Souvenir Copy"}]},{stimulus_id:"Q2_T2",artifact_id:"ciphered_marginalia_2",title:"Relic 2: Star Chart with Handwritten Notes",description:"Handwritten notes written in old cursive script along a star chart.",uncertainty_level:"high",expected_value:"high",clues:[{id:"CLUE_CIPHER_DIACRITIC",label:"Script Number Marks",detail:"Notes record the date of an eclipse in 1845."},{id:"CLUE_SCRIBE_HAND",label:"Penmanship Style",detail:"Matches the private notebook of court scholar Mir Habib."},{id:"CLUE_GALL_INK_CORROSION",label:"Ink Aging Depth",detail:"Natural ink aging shows paper is over 170 years old."}],attributions:[{id:"attr_court_astrologer_notebook",label:"Court Scholar Personal Notebook"},{id:"attr_apothecary_recipe",label:"Herbal Medicine Recipe"},{id:"attr_random_scribble",label:"Scribe Practice Scratches"}]},{stimulus_id:"Q2_T3",artifact_id:"standard_receipt_3",title:"Relic 3: City Transit Toll Receipt (Control)",description:"A printed paper slip with standard columns and serial numbers.",uncertainty_level:"low",expected_value:"low_control",clues:[{id:"CLUE_PRINT_TYPE",label:"Standard Moveable Type",detail:"Mass-printed transit slip used for routine city transport."},{id:"CLUE_STAMP_INK",label:"Routine Blue Ink Stamp",detail:"Common government office stamp with standard numbering."}],attributions:[{id:"attr_standard_tax_slip",label:"City Transit Pass Receipt"},{id:"attr_royal_chancery_grant",label:"Palace Land Grant"},{id:"attr_secret_monastery_order",label:"Monastic Travel Permission"}]},{stimulus_id:"Q2_T4",artifact_id:"unknown_crest_impression_4",title:"Relic 4: Embossed Paper Falcon Stamp",description:"A raised paper emblem showing a falcon above mountain ridges.",uncertainty_level:"high",expected_value:"moderate",clues:[{id:"CLUE_FALCON_CREST",label:"Raised Falcon Symbol",detail:"Used by paper makers working along the Jhelum River."},{id:"CLUE_PAPER_WATERMARK",label:"Paper Watermark Inspection",detail:"Fine wire watermark includes maker initials M.K."}],attributions:[{id:"attr_jhelum_paper_atelier",label:"Jhelum River Paper Workshop"},{id:"attr_foreign_consulate_letter",label:"Foreign Embassy Stationery"},{id:"attr_unknown_unresolved",label:"Unresolved Historical Origin"}]}];function o(){var p;if(v){r.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 5: The Hidden Gallery</span>
            
          </div>
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',goal:"Inspect 4 historic relics to identify where they came from.",steps:["Read the description of the relic.","Click any clues you want to inspect.","Pick your conclusion and click Confirm."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t={},s=null,n(),o()});return}const m=c[e];r.innerHTML=A({worldCode:"W5",worldIndex:4,title:"The Antiquarian’s Bench",subtitle:"Inspect physical clues to identify each historic object.",instructionPrompt:"Your Task",instruction:"Examine the relic below. Inspect any clues you wish. Then choose its origin.",stimulusContent:`
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-sans uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Relic Specimen</span>
            <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium">Specimen ${e+1} of ${c.length}</span>
          </div>
          <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)]">${m.title}</div>
          <div class="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">${m.description}</div>
        </div>
      `,interactionContent:`
        <div class="space-y-4">
          <!-- Clues Inspection Grid -->
          <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs shadow-xs">
            <div class="text-[10px] uppercase font-sans text-[var(--accent-gold)] font-semibold tracking-wider mb-2 flex items-center justify-between">
              <span>Physical Clues Available for Inspection</span>
              <span class="text-[9px] text-[var(--text-secondary)] font-normal">Click clue to examine</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              ${m.clues.map(u=>`
                <div class="clue-btn p-3.5 bg-white border ${t[u.id]?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-xs min-h-[48px] flex flex-col justify-between" data-clue="${u.id}" tabindex="0" role="button">
                  <div class="font-medium text-[var(--text-primary)] flex items-center justify-between">
                    <span>${u.label}</span>
                    <span class="text-[9px] font-sans uppercase text-[var(--text-secondary)]">${t[u.id]?"Inspected":"Inspect"}</span>
                  </div>
                  ${t[u.id]?`<p class="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--grid-border)] pt-2 animate-soft-fade-in">${u.detail}</p>`:""}
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Attribution Selection -->
          <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
            <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Conclude Historical Origin:</div>
            <div class="space-y-2.5">
              ${m.attributions.map(u=>`
                <div class="q2-attr p-3.5 bg-white border ${s===u.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-xs flex items-center justify-between min-h-[48px]" data-attr="${u.id}" tabindex="0" role="button">
                  <span class="flex items-center gap-2.5">
                    <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 ${s===u.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${s===u.id?"✓":""}</span>
                    <span class="text-[var(--text-primary)] font-medium">${u.label}</span>
                  </span>
                  <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium shrink-0">Origin ${String.fromCharCode(65+m.attributions.indexOf(u))}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `,actionButtonId:"confirmQ2Btn",actionButtonText:e<c.length-1?"Confirm Origin &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!s,progressText:`Relic ${e+1} of ${c.length}`}),r.querySelectorAll(".clue-btn").forEach(u=>{const f=h=>{l=h;const b=u.getAttribute("data-clue");t[b]=!0,i("clue_inspected",{trial_index:e,stimulus_id:m.stimulus_id,artifact_id:m.artifact_id,clue_id:b,input_modality:l,task_def_version:"1.0"}),o()};u.addEventListener("click",()=>f("mouse")),u.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),r.querySelectorAll(".q2-attr").forEach(u=>{const f=h=>{l=h,s=u.getAttribute("data-attr"),o()};u.addEventListener("click",()=>f("mouse")),u.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),f("keyboard"))})}),(p=document.getElementById("confirmQ2Btn"))==null||p.addEventListener("click",()=>{i("investigation_finalized",{trial_index:e,stimulus_id:m.stimulus_id,artifact_id:m.artifact_id,attribution_choice:s,input_modality:l,task_def_version:"1.0"}),e<c.length-1?(e++,t={},s=null,n(),o()):x({mini_game:"Q2",observations_count:4})})}function n(){const m=c[e];i("artifact_presented",{trial_index:e,stimulus_id:m.stimulus_id,artifact_id:m.artifact_id,uncertainty_level:m.uncertainty_level,expected_value:m.expected_value,task_def_version:"1.0"})}o()}function we(r,a,i,x){let v=!0,e=0,t=!1,s=null,l="mouse";const c=[{stimulus_id:"Q3_E1",title:"Episode 1: The Master Painter’s Folio",ambiguity_type:"unattributed_artisan_folio",ambiguity_text:"An illuminated folio has gold dust borders and charcoal sketches. Two master painters worked during this era.",context_id:"provenance_context_1",context_title:"Rainawari Workshop Records (1870–1885)",context_text:"Records confirm Master Sadiq worked in Rainawari. He used willow-branch charcoal sketches and lapis blue borders.",decision_question:"Attribute the folio maker and technique lineage:",choices:[{id:"choice_sadiq_rainawari",label:"Master Sadiq (Rainawari workshop — willow charcoal sketch)"},{id:"choice_habib_court",label:"Master Habib (Palace court — imported graphite pencil)"},{id:"choice_generic_bazaar",label:"General City Market Production"}]},{stimulus_id:"Q3_E2",title:"Episode 2: The Exhibition Pavilion Ceiling",ambiguity_type:"mismatched_period_provenance",ambiguity_text:"A carved ceiling panel displays woodwork styles from two different rebuilding periods.",context_id:"provenance_context_2",context_title:"Dal Lake Pavilion Repair Notes (1902)",context_text:"Following the 1902 Dal Lake flood, builders used seasoned cedar wood. Earlier builders used soft river pine.",decision_question:"Identify the structural timber and repair era:",choices:[{id:"choice_post_flood_cedar",label:"Post-1902 Flood Repair (Seasoned mountain cedar wood)"},{id:"choice_pre_flood_pine",label:"Original Pre-Flood Building (Soft river pine wood)"},{id:"choice_modern_concrete",label:"Twentieth Century Replica"}]},{stimulus_id:"Q3_E3",title:"Episode 3: The Woven Silk Couplet",ambiguity_type:"regional_dialect_verse_origin",ambiguity_text:"A woven silk pashmina scarf has an old Kashmiri verse embroidered on it.",context_id:"provenance_context_3",context_title:"Valley Poetry Records (Lalla-Ded Shrines)",context_text:"Verses with this 4-beat pattern come from southern valley shrines (Pampore and Tral).",decision_question:"Select the verified cultural origin of this verse:",choices:[{id:"choice_southern_vakh_shrine",label:"Southern Valley Shrine Verse (Traditional 4-beat rhythm)"},{id:"choice_urban_court_ghazal",label:"Palace Court Scribe Poem (Formal Persian rhyming meter)"},{id:"choice_folk_bazaar_song",label:"Traveling Caravan Folk Song"}]}];function o(){var p,u;if(v){r.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 5: The Hidden Gallery</span>
            
          </div>
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',goal:"Connect archival clues to solve catalog questions across 3 episodes.",steps:["Read the historical question in each episode.","Click to open the archival research note if you need facts.","Select your catalog conclusion.","Click confirm to finish World 5."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=!1,s=null,n(),o()});return}const m=c[e];r.innerHTML=`
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 5: The Hidden Gallery</span>
            
          </div>
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
          <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)]">${m.title}</div>
          <div class="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">${m.ambiguity_text}</div>
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
              <div class="text-[10px] font-sans uppercase tracking-wider text-emerald-800 font-semibold mb-1">${m.context_title}</div>
              <div>${m.context_text}</div>
            </div>
          `:`
            <div class="text-xs text-[var(--text-secondary)] italic">
              Optional research notes are available to clarify historic details.
            </div>
          `}
        </div>

        <!-- YOUR CHOICE: Downstream Integration Decision -->
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">${m.decision_question}</div>
          <div class="space-y-2.5">
            ${m.choices.map(f=>`
              <div class="q3-choice p-3.5 bg-white border ${s===f.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-choice="${f.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 ${s===f.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${s===f.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${f.label}</span>
                </span>
                <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium shrink-0">Format ${f.id.replace("CHOICE_","")}</span>
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
    `,(p=document.getElementById("retrieveContextBtn"))==null||p.addEventListener("click",()=>{l="mouse",t=!0,i("context_requested",{trial_index:e,stimulus_id:m.stimulus_id,context_id:m.context_id,input_modality:l,task_def_version:"1.0"}),o()}),r.querySelectorAll(".q3-choice").forEach(f=>{const h=b=>{l=b,s=f.getAttribute("data-choice"),o()};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),h("keyboard"))})}),(u=document.getElementById("confirmQ3Btn"))==null||u.addEventListener("click",()=>{i("decision_submitted",{trial_index:e,stimulus_id:m.stimulus_id,choice:s,input_modality:l,task_def_version:"1.0"}),e<c.length-1?(e++,t=!1,s=null,n(),o()):x({mini_game:"Q3",observations_count:3})})}function n(){const m=c[e];i("episode_presented",{trial_index:e,stimulus_id:m.stimulus_id,ambiguity_type:m.ambiguity_type,task_def_version:"1.0"})}o()}function ke(r,a){const{appContainer:i,miniGameIndex:x,gameId:v,logEvent:e,onMiniGameComplete:t}=r,s=v||(x===0?"CR1":x===1?"CR3":"CR2");s==="CR1"?Te(i,a,e,t):s==="CR3"?Se(i,a,e,t):Ce(i,a,e,t)}function Te(r,a,i,x){let v=!0,e=0,t=[],s=null,l="mouse";const c=[{stage_id:"CR1_S1",title:"Stage 1: The Weaving Shuttle Rig",constraint:"missing_crossbar_shuttle",scenario:"A walnut loom shuttle crossbar has cracked. Build a working replacement with studio parts.",materials:[{id:"M_SPLIT_BAMBOO",name:"Split Bamboo Rib",icon:"&#127883;",role:"Flexible wooden bar"},{id:"M_BRASS_ROD",name:"Slotted Brass Rod",icon:"&#128296;",role:"Stiff metal bar"},{id:"M_CARVED_PINE",name:"Carved Pine Peg",icon:"&#129685;",role:"Lightweight wooden pin"},{id:"M_WAXED_CORD",name:"Waxed Linen Cord",icon:"&#129526;",role:"Strong binding string"},{id:"M_CERAMIC_WEIGHT",name:"Ceramic Weight",icon:"&#9711;",role:"Small balancing weight"}],valid_combinations:[["M_SPLIT_BAMBOO","M_WAXED_CORD"],["M_BRASS_ROD"],["M_CARVED_PINE","M_CERAMIC_WEIGHT"]]},{stage_id:"CR1_S2",title:"Stage 2: The Warp Tension Anchor",constraint:"tension_wire_unanchored",scenario:"The side tension cord needs an anchor point. Assemble a secure tie-down rig.",materials:[{id:"M_LEATHER_STRAP",name:"Leather Cinch Strap",icon:"&#129526;",role:"Firm gripping strap"},{id:"M_NOTCHED_PEG",name:"Hardwood Anchor Peg",icon:"&#129685;",role:"Notched wooden wedge"},{id:"M_COPPER_WIRE",name:"Flexible Copper Wire",icon:"&#9874;",role:"Bendable wrapping wire"},{id:"M_STONE_COUNTER",name:"Counterweight Stone",icon:"&#11044;",role:"Heavy balance stone"}],valid_combinations:[["M_LEATHER_STRAP","M_NOTCHED_PEG"],["M_COPPER_WIRE"],["M_LEATHER_STRAP","M_STONE_COUNTER"]]}];function o(){var p,u;if(v){r.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 6: The Broken Tool</span>
            
          </div>
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',goal:"Build a working replacement tool across 2 stages.",steps:["Read what needs to be fixed.","Click items on the workbench to add or remove them.","Click Test to check your setup, then click Confirm."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=[],s=null,n(),o()});return}const m=c[e];r.innerHTML=A({worldCode:"W6",worldIndex:5,title:"The Artisan's Assembly",subtitle:"Build a working workshop fixture from available parts.",instructionPrompt:"Your Task",instruction:"Review the broken part below. Select one or more workbench items to fix it. Multiple valid combinations exist.",stimulusContent:`
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] text-[var(--accent-gold)] font-sans uppercase tracking-wider font-semibold">Atelier Hardware Need</span>
            <span class="text-[10px] text-[var(--accent-gold)] font-medium uppercase">Stage ${e+1} of ${c.length}</span>
          </div>
          <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${m.title}</div>
          <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${m.scenario}</div>
        </div>
      `,interactionContent:`
        <div class="p-4 sm:p-5 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs">
          <div class="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider mb-3">Available Workbench Components (Click to Equip)</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-4">
            ${m.materials.map(f=>{const h=t.includes(f.id);return`
                <div class="part-card p-3.5 bg-white border ${h?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-xs flex flex-col justify-between min-h-[72px]" data-id="${f.id}" tabindex="0" role="button" aria-label="${f.name}">
                  <div>
                    <div class="text-lg mb-1 text-stone-700">${f.icon}</div>
                    <div class="font-medium text-[var(--text-primary)] mb-0.5">${f.name}</div>
                    <div class="text-[10px] text-[var(--text-secondary)]">${f.role}</div>
                  </div>
                  <div class="mt-2 text-right">
                    <span class="text-[10px] font-sans font-semibold ${h?"text-[var(--accent-gold)]":"text-stone-400"}">${h?"&#10003; EQUIPPED":"+ ADD"}</span>
                  </div>
                </div>
              `}).join("")}
          </div>

          <!-- Assembly Status & Test Button -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-200">
            <div class="text-xs text-[var(--text-secondary)]">
              Equipped: <strong class="text-[var(--text-primary)]">${t.length>0?t.map(f=>{var h;return(h=m.materials.find(b=>b.id===f))==null?void 0:h.name}).join(" + "):"None selected"}</strong>
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
      `,actionButtonId:"confirmStageBtn",actionButtonText:e<c.length-1?"Confirm Assembly &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:t.length===0,progressText:`Stage ${e+1} of ${c.length}`}),r.querySelectorAll(".part-card").forEach(f=>{const h=b=>{l=b;const g=f.getAttribute("data-id");t.includes(g)?t=t.filter(y=>y!==g):t.push(g),s=null,i("part_toggled",{stage_id:m.stage_id,trial_index:e,part_id:g,selected_parts:[...t],input_modality:l,task_def_version:"1.0"}),o()};f.addEventListener("click",()=>h("mouse")),f.addEventListener("keydown",b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),h("keyboard"))})}),(p=document.getElementById("testAssemblyBtn"))==null||p.addEventListener("click",()=>{l="mouse";const f=new Set(t),h=m.valid_combinations.some(b=>b.every(g=>f.has(g)));s={valid:h,message:h?"Tension test passed. The loom parts balance smoothly.":"Test note: The parts wobble or do not connect tightly."},i("assembly_tested",{stage_id:m.stage_id,trial_index:e,parts:[...t],input_modality:l,task_def_version:"1.0"}),o()}),(u=document.getElementById("confirmStageBtn"))==null||u.addEventListener("click",()=>{i("stage_completed",{stage_id:m.stage_id,trial_index:e,final_parts:[...t],input_modality:l,task_def_version:"1.0"}),e<c.length-1?(e++,t=[],s=null,n(),o()):x({mini_game:"CR1",observations_count:2})})}function n(){const m=c[e];i("stage_presented",{stage_id:m.stage_id,trial_index:e,constraint:m.constraint,task_def_version:"1.0"})}o()}function Ce(r,a,i,x){let v=!0,e=0,t="pre_shift",s=null,l=null,c="mouse";const o=[{episode_id:"CR2_E1",title:"Episode 1: The Central Pillar Chamber",pre_context:"Plan visitor walking paths through the grand exhibition hall.",pre_strategies:[{id:"S_CENTRAL_AVENUE",label:"Central Promenade",desc:"Single straight walkway down the center."},{id:"S_PERIMETER_LOOP",label:"Outer Wall Loop",desc:"Continuous gentle loop along outer walls."},{id:"S_ALCOVE_ISLANDS",label:"Display Islands",desc:"Separate display clusters across the floor."}],constraint_change:"central_pillar_blocks_corridor",shift_description:"Notice: A large carved stone pillar blocks the direct central pathway.",post_strategies:[{id:"split_flow",label:"Twin Walking Corridors (Split visitors smoothly around both sides of the pillar)",note:"Adapted Flow"},{id:"linear_flow",label:"Single Left Path (Route all visitors down the left aisle)",note:"Linear Channel"},{id:"stop_gap",label:"Central Waiting Area (Pause visitors and let small groups enter in turns)",note:"Batch Entry"}]},{episode_id:"CR2_E2",title:"Episode 2: West Gallery Safety Clearance",pre_context:"Arrange display stands across the wide western gallery corridor.",pre_strategies:[{id:"S_WALL_PANORAMA",label:"Wall Art Series",desc:"Continuous artwork hung along the west wall."},{id:"S_TRANSVERSE_SCREENS",label:"Crosswise Screens",desc:"Folding screens set across the corridor."},{id:"S_PAIRED_PLINTHS",label:"Center Display Stands",desc:"Two rows of waist-high display stands."}],constraint_change:"emergency_exit_clearance_widened",shift_description:"Safety rule: Keep a 3-meter wide open walkway along the west wall.",post_strategies:[{id:"perimeter_flow",label:"Clear Wall Pathway (Move displays inward to leave the west wall open)",note:"Adapted Flow"},{id:"central_cluster",label:"Center Grouping (Gather all stands tightly in the room center)",note:"Center Group"},{id:"diagonal_crossing",label:"Diagonal Zigzag (Weave walking paths between the doorways)",note:"Zigzag Path"}]},{episode_id:"CR2_E3",title:"Episode 3: North Archway Clearance",pre_context:"Display vertical banners and artwork in the north wing.",pre_strategies:[{id:"S_TALL_STELAE",label:"Tall Wooden Posts",desc:"Four-meter tall vertical banner posts."},{id:"S_HORIZONTAL_VITRINES",label:"Low Table Vitrines",desc:"Flat glass vitrines at waist height."},{id:"S_CEILING_SUSPENSION",label:"Ceiling Silk Banners",desc:"Flowing fabric banners hung from rafters."}],constraint_change:"low_ceiling_arch_support",shift_description:"Structural inspection: Low wooden ceiling beams limit overhead room to 2.2 meters.",post_strategies:[{id:"linear_flow",label:"Low Table Vitrines (Use waist-high displays to preserve headroom)",note:"Adapted Flow"},{id:"canopy_tent",label:"Hanging Fabric Canopy (Drape thin cloth below the beams)",note:"Low Drapery"},{id:"staggered_alcoves",label:"Wall Post Leaning (Lean tall banner boards against walls)",note:"Wall Lean"}]}];function n(){var u,f,h;if(v){r.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 6: The Broken Tool</span>
            
          </div>
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',goal:"Pick a layout strategy, then adapt your plan when a space condition changes.",steps:["Review the gallery space and pick an initial floor plan.","A structural change will appear in the room.","Choose how to adapt your plan to the new condition.","Confirm your choice across 3 episodes."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t="pre_shift",s=null,l=null,m(),n()});return}const p=o[e];t==="pre_shift"?(r.innerHTML=`
        <div class="animate-soft-fade-in">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 6: The Broken Tool</span>
              
            </div>
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
              <span class="text-[10px] text-[var(--accent-gold)] font-medium uppercase">Episode ${e+1} of ${o.length}</span>
            </div>
            <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${p.title}</div>
            <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${p.pre_context}</div>
          </div>

          <!-- INTERACTION AREA: Initial Strategy Selection -->
          <div class="mb-5 space-y-2.5 candidate-content-protected">
            <div class="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider">Select Initial Curation Concept:</div>
            ${p.pre_strategies.map(b=>{const g=s===b.id;return`
                <div class="pre-strat-card p-3.5 sm:p-4 bg-white border ${g?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-id="${b.id}" tabindex="0" role="button" aria-label="${b.label}">
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">${b.label}</div>
                    <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">${b.desc}</div>
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
            Episode ${e+1} of ${o.length} &middot; Step 1
          </div>
        </div>
      `,r.querySelectorAll(".pre-strat-card").forEach(b=>{const g=y=>{c=y,s=b.getAttribute("data-id"),n()};b.addEventListener("click",()=>g("mouse")),b.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),g("keyboard"))})}),(u=document.getElementById("confirmPreShiftBtn"))==null||u.addEventListener("click",()=>{i("initial_strategy_selected",{episode_id:p.episode_id,trial_index:e,strategy_id:s,input_modality:c,task_def_version:"1.0"}),i("constraint_shifted",{episode_id:p.episode_id,trial_index:e,constraint_change:p.constraint_change,task_def_version:"1.0"}),t="post_shift",l=s,n()})):(r.innerHTML=`
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
            <div class="text-xs text-amber-950 leading-relaxed font-serif">${p.shift_description}</div>
            <div class="mt-2 text-[11px] text-amber-800">
              Prior Plan: <strong>${((f=p.pre_strategies.find(b=>b.id===s))==null?void 0:f.label)||s}</strong>
            </div>
          </div>

          <!-- INTERACTION AREA: Post-Shift Strategy Selection -->
          <div class="mb-5 space-y-2.5 candidate-content-protected">
            <div class="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider">Choose Adapted Layout:</div>
            ${p.post_strategies.map(b=>{const g=l===b.id;return`
                <div class="post-strat-card p-3.5 sm:p-4 bg-white border ${g?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer  interactive-option text-xs flex items-center justify-between min-h-[48px]" data-id="${b.id}" tabindex="0" role="button" aria-label="${b.label}">
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">${b.label}</div>
                    <div class="text-[10px] font-sans text-[var(--text-secondary)] mt-0.5">${b.note}</div>
                  </div>
                  <span class="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 ${g?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${g?"&#10003;":""}</span>
                </div>
              `}).join("")}
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end mb-4">
            <button type="button" id="confirmPostShiftBtn" ${l?"":"disabled"} class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
              ${e<o.length-1?"Confirm Plan & Next Episode &rarr;":"Finish Part 2 &rarr;"}
            </button>
          </div>

          <!-- Progress Footer -->
          <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
            Episode ${e+1} of ${o.length} &middot; Step 2
          </div>
        </div>
      `,r.querySelectorAll(".post-strat-card").forEach(b=>{const g=y=>{c=y,l=b.getAttribute("data-id"),n()};b.addEventListener("click",()=>g("mouse")),b.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),g("keyboard"))})}),(h=document.getElementById("confirmPostShiftBtn"))==null||h.addEventListener("click",()=>{i("strategy_revised",{episode_id:p.episode_id,trial_index:e,initial_strategy_id:s,revised_strategy_id:l,input_modality:c,task_def_version:"1.0"}),e<o.length-1?(e++,t="pre_shift",s=null,l=null,m(),n()):x({mini_game:"CR2",observations_count:3})}))}function m(){const p=o[e];i("episode_presented",{episode_id:p.episode_id,trial_index:e,initial_context:p.pre_context,task_def_version:"1.0"})}n()}function Se(r,a,i,x){let v=!0,e=0,t=null,s=null,l=null,c="mouse";const o=[{stimulus_id:"CR3_T1",title:"Trial 1: The Crisp Paper Fold",target_motif:"burnished_crease",objective:"Form a sharp, smooth crease on thick paper without tearing surface fibers.",tools:[{id:"bone_folder",name:"Polished Bone Tool",icon:"&#129685;",affordance:"Smooth curved edge that applies friction gently"},{id:"metal_stylus",name:"Steel Scribe Stylus",icon:"&#128296;",affordance:"Hard pointed needle tip for sharp indentation"},{id:"bamboo_wedge",name:"Beveled Bamboo Scraper",icon:"&#127883;",affordance:"Broad flat wooden face for broad surface pressure"}],methods:[{id:"firm_edge_pass",name:"Firm Edge Pass",desc:"Slide rounded edge along ruler with continuous diagonal pressure."},{id:"flat_face_rub",name:"Flat Face Rub",desc:"Distribute wide surface friction across fold line."},{id:"sharp_point_drag",name:"Sharp Point Drag",desc:"Draw tip directly across surface to score the fiber line."}],feedback_map:{"bone_folder:firm_edge_pass":{success:!0,text:"Clean, crisp burnished crease formed with zero surface abrasion."},"bamboo_wedge:flat_face_rub":{success:!0,text:"Smooth, even flattened fold achieved without marring surface grain."},"metal_stylus:sharp_point_drag":{success:!1,text:"Paper fibers sliced; sharp point cut through the paper fold."},"metal_stylus:firm_edge_pass":{success:!1,text:"Metal edge left dark metallic friction scuffs across the parchment."},"bone_folder:flat_face_rub":{success:!0,text:"Gentle, even crease formed; fibers compressed smoothly."},"bamboo_wedge:firm_edge_pass":{success:!0,text:"Uniform clean fold line established with natural wood contour."},"bone_folder:sharp_point_drag":{success:!1,text:"Uneven dragging motion; point dented paper surface."},"bamboo_wedge:sharp_point_drag":{success:!1,text:"Wood corner snagged on rough paper grain."},"metal_stylus:flat_face_rub":{success:!1,text:"Insufficient surface area; uneven pressure indentation."}}},{stimulus_id:"CR3_T2",title:"Trial 2: Mulberry Paper Stipple",target_motif:"fine_stipple",objective:"Produce an even scatter of tiny ink drops on fibrous paper.",tools:[{id:"horsehair_brush",name:"Stiff Hair Brush",icon:"&#128396;",affordance:"Springy stiff bristles that snap back easily"},{id:"sponge_block",name:"Natural Sea Sponge",icon:"&#9711;",affordance:"Soft porous texture that dabs damp color"},{id:"linen_swab",name:"Rolled Cloth Swab",icon:"&#129526;",affordance:"Rolled fabric tip that absorbs liquid quickly"}],methods:[{id:"textured_flick",name:"Bristle Flick",desc:"Pull loaded bristles back with thumb to release fine mist."},{id:"mottled_dab",name:"Surface Dab",desc:"Light stamp of textured surface directly on paper."},{id:"drag_stroke",name:"Smooth Sweep",desc:"Draw applicator steadily across page in sweeping stroke."}],feedback_map:{"horsehair_brush:textured_flick":{success:!0,text:"Fine, even constellation of organic micro-droplets dispersed across parchment."},"sponge_block:mottled_dab":{success:!0,text:"Rich textured tonal stipple with soft, organic cellular grain."},"linen_swab:drag_stroke":{success:!1,text:"Produced a single continuous solid streak; zero stipple effect."},"linen_swab:textured_flick":{success:!1,text:"Fabric has no elastic bristle snap; pigment remained bound in swab."},"sponge_block:drag_stroke":{success:!1,text:"Smeared broad irregular smudge across paper."},"horsehair_brush:drag_stroke":{success:!1,text:"Solid brushstroke line created; no dispersed speckling."},"horsehair_brush:mottled_dab":{success:!0,text:"Bristle tips formed delicate speckled texture upon contact."},"sponge_block:textured_flick":{success:!1,text:"Sponge cannot be flicked; dropped heavy inconsistent blot."},"linen_swab:mottled_dab":{success:!1,text:"Dense blot soaked through fiber without texture."}}},{stimulus_id:"CR3_T3",title:"Trial 3: Gold Leaf Polish",target_motif:"gold_leaf_seal",objective:"Smooth delicate gold leaf onto a seal for a mirror-like shine.",tools:[{id:"agate_stone",name:"Agate Burnisher Stone",icon:"&#11044;",affordance:"Silky smooth gemstone tip with zero friction"},{id:"polished_wood",name:"Dense Boxwood Block",icon:"&#129685;",affordance:"Dense wood block that gives flat pressure"},{id:"copper_burnisher",name:"Curved Copper Spoon",icon:"&#129348;",affordance:"Polished metal curve for gentle gliding"}],methods:[{id:"friction_free_rub",name:"Small Circles",desc:"Small circular motions with light steady contact."},{id:"planar_press",name:"Flat Press",desc:"Straight downward pressure without sliding sideways."},{id:"chisel_scrape",name:"Angled Scrape",desc:"Drag across surface with sharp edge."}],feedback_map:{"agate_stone:friction_free_rub":{success:!0,text:"Flawless mirror-like specular gold luster achieved with zero abrasion."},"polished_wood:planar_press":{success:!0,text:"Uniformly bonded gold leaf with balanced satin foundation."},"copper_burnisher:friction_free_rub":{success:!0,text:"Deep warm metallic sheen burnished smoothly over seal."},"agate_stone:planar_press":{success:!0,text:"Firm adhesion established; solid reflective gilding."},"polished_wood:friction_free_rub":{success:!0,text:"Subtle warm satin luster across gold leaf."},"copper_burnisher:planar_press":{success:!0,text:"Stable flat bond achieved under spoon bowl."},"agate_stone:chisel_scrape":{success:!1,text:"Hard edge scratched through delicate gold foil."},"polished_wood:chisel_scrape":{success:!1,text:"Wood corner tore gold leaf away from size."},"copper_burnisher:chisel_scrape":{success:!1,text:"Metal rim gouged underlying paper impression."}}}];function n(){var u,f,h,b;if(v){r.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 6: The Broken Tool</span>
            
          </div>
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>',goal:"Choose and test tools for craft tasks across 3 rounds.",steps:["Read the craft goal on the workbench.","Pick a tool and choose how you will use it.","Click Test Technique to see the result, then click Confirm."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,t=null,s=null,l=null,m(),n()});return}const p=o[e];r.innerHTML=A({worldCode:"W6",worldIndex:5,title:"The Improvised Tool",subtitle:"Adapt craft technique from physical feedback.",instructionPrompt:"Your Task",instruction:"Pick a tool and an action method below. Click Apply Technique to test your result. You can change your choice before confirming.",stimulusContent:`
        <div class="p-4 sm:p-5 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] text-[var(--accent-gold)] font-sans uppercase tracking-wider font-semibold">Craft Objective</span>
            <span class="text-[10px] text-[var(--accent-gold)] font-medium uppercase">Trial ${e+1} of ${o.length}</span>
          </div>
          <div class="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">${p.title}</div>
          <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${p.objective}</div>
        </div>
      `,interactionContent:`
        <div class="space-y-4">
          <!-- Tool Selection -->
          <div>
            <div class="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider mb-2">1. Select Implement:</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              ${p.tools.map(g=>`
                  <div class="cr3-tool-card p-3.5 sm:p-4 bg-white border ${t===g.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-xs min-h-[64px]" data-id="${g.id}" tabindex="0" role="button" aria-label="${g.name}">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-lg">${g.icon}</span>
                      <span class="font-medium text-[var(--text-primary)]">${g.name}</span>
                    </div>
                    <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${g.affordance}</div>
                  </div>
                `).join("")}
            </div>
          </div>

          <!-- Method Selection -->
          <div>
            <div class="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider mb-2">2. Choose Action Method:</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              ${p.methods.map(g=>`
                  <div class="cr3-method-card p-3.5 sm:p-4 bg-white border ${s===g.id?"border-[var(--accent-gold)] bg-amber-50/70 shadow-xs ring-1 ring-[var(--accent-gold)]/40":"border-[var(--grid-border)]"} rounded-xs cursor-pointer interactive-option text-xs min-h-[64px]" data-id="${g.id}" tabindex="0" role="button" aria-label="${g.name}">
                    <div class="font-medium text-[var(--text-primary)] mb-0.5">${g.name}</div>
                    <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${g.desc}</div>
                  </div>
                `).join("")}
            </div>
          </div>

          <!-- Apply & Observe Feedback -->
          <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="text-xs text-[var(--text-secondary)]">
              Active Pairing: <strong class="text-[var(--text-primary)]">${t?(u=p.tools.find(g=>g.id===t))==null?void 0:u.name:"None"} + ${s?(f=p.methods.find(g=>g.id===s))==null?void 0:f.name:"None"}</strong>
            </div>
            <button type="button" id="applyTechniqueBtn" ${t&&s?"":"disabled"} class="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[var(--text-primary)] text-xs uppercase tracking-wider disabled:opacity-40 interactive-option rounded-xs min-h-[44px]">
              Apply Technique
            </button>
          </div>

          ${l?`
            <div class="p-4 bg-white border ${l.success?"border-emerald-600/40 text-emerald-950":"border-amber-600/40 text-amber-950"} rounded-xs text-xs leading-relaxed animate-soft-fade-in">
              <div class="font-sans text-[10px] uppercase font-semibold mb-1 ${l.success?"text-emerald-800":"text-amber-800"}">Material Outcome Observation</div>
              <div>${l.text}</div>
            </div>
          `:""}
        </div>
      `,actionButtonId:"confirmTrialBtn",actionButtonText:e<o.length-1?"Confirm Technique &rarr;":"Confirm & Finish &rarr;",actionButtonDisabled:!(t&&s),progressText:`Trial ${e+1} of ${o.length}`}),r.querySelectorAll(".cr3-tool-card").forEach(g=>{const y=_=>{c=_,t=g.getAttribute("data-id"),i("tool_selected",{stimulus_id:p.stimulus_id,trial_index:e,tool_id:t,input_modality:c,task_def_version:"1.0"}),n()};g.addEventListener("click",()=>y("mouse")),g.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),y("keyboard"))})}),r.querySelectorAll(".cr3-method-card").forEach(g=>{const y=_=>{c=_,s=g.getAttribute("data-id"),n()};g.addEventListener("click",()=>y("mouse")),g.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),y("keyboard"))})}),(h=document.getElementById("applyTechniqueBtn"))==null||h.addEventListener("click",()=>{c="mouse";const g=`${t}:${s}`,y=p.feedback_map[g]||{success:!1,text:"No noticeable craft adaptation observed."};l=y,i("action_applied",{stimulus_id:p.stimulus_id,trial_index:e,tool_id:t,action_method:s,input_modality:c,task_def_version:"1.0"}),i("feedback_observed",{stimulus_id:p.stimulus_id,trial_index:e,tool_id:t,action_method:s,outcome_feedback:y.text,task_def_version:"1.0"}),n()}),(b=document.getElementById("confirmTrialBtn"))==null||b.addEventListener("click",()=>{i("strategy_adapted",{stimulus_id:p.stimulus_id,trial_index:e,final_tool_id:t,final_method:s,input_modality:c,task_def_version:"1.0"}),e<o.length-1?(e++,t=null,s=null,l=null,m(),n()):x({mini_game:"CR3",observations_count:3})})}function m(){const p=o[e];i("trial_presented",{stimulus_id:p.stimulus_id,trial_index:e,target_motif:p.target_motif,task_def_version:"1.0"})}n()}function Ee(r,a){const{appContainer:i,miniGameIndex:x,gameId:v,logEvent:e,onMiniGameComplete:t}=r,s=v||(x===0?"M1":x===1?"M2":"M3");s==="M1"?Ae(i,a,e,t):s==="M2"?$e(i,a,e,t):Ie(i,a,e,t)}function Ae(r,a,i,x){let v=!0,e=0,t="mouse";const s=[{stimulus_id:"M1_U1",recipient:"Master Ghulam — Calligraphy Diwan",note:"Formal invitation envelope 1"},{stimulus_id:"M1_U2",recipient:"Valley Youth Literary Guild",note:"Formal invitation envelope 2"},{stimulus_id:"M1_U3",recipient:"Regional Heritage Conservation Archive",note:"Formal invitation envelope 3"}];function l(){var n;if(v){r.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 7: The Repetition</span>
            
          </div>
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',goal:"Apply wax seals to 3 invitation envelopes.",steps:["Look at the named recipient on the envelope.","Click the button to apply the wax seal.","Completing all 3 envelopes finishes this activity."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,c(),l()});return}const o=s[e];r.innerHTML=A({worldCode:"W7",worldIndex:6,title:"The Ceremonial Seal",subtitle:"Apply wax seals to event invitations.",instructionPrompt:"Your Task",instruction:"Review the recipient below. Click Apply Wax Seal. Completing all 3 fulfills this activity.",stimulusContent:`
        <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
          <div class="w-full max-w-sm mx-auto min-h-[140px] bg-amber-50/70 border border-[var(--grid-border)] flex flex-col items-center justify-center p-5 relative shadow-sm rounded-xs">
            <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-sans">Ceremonial Invitation</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1.5">${o.recipient}</div>
            <div class="text-[11px] text-stone-500 mt-0.5">${o.note}</div>

            <div id="sealDisplay" class="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-[10px] text-[var(--accent-gold)] font-bold shadow-xs">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
            </div>
          </div>
        </div>
      `,actionButtonId:"stampBtn",actionButtonText:e===s.length-1?"Confirm & Finish &rarr;":"Apply Wax Seal &rarr;",progressText:`Envelope ${e+1} of ${s.length} (Required Minimum: 3)`}),(n=document.getElementById("stampBtn"))==null||n.addEventListener("click",()=>{t="mouse",i("unit_action_performed",{stimulus_id:o.stimulus_id,unit_index:e,action_type:"press_wax_seal",input_modality:t,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:o.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<s.length-1?(e++,c(),l()):x({mini_game:"M1",observations_count:s.length})})}function c(){const o=s[e];i("unit_presented",{stimulus_id:o.stimulus_id,unit_index:e,is_mandatory:!0,task_def_version:"1.0"})}l()}function $e(r,a,i,x){let v=!0,e="mandatory",t=0,s=0,l="mouse";const c=[{stimulus_id:"M2_M1",label:"Guest Folder 1: Artisan Guild",is_mandatory:!0},{stimulus_id:"M2_M2",label:"Guest Folder 2: Regional Patrons",is_mandatory:!0},{stimulus_id:"M2_M3",label:"Guest Folder 3: Visiting Artists",is_mandatory:!0}],o=[{stimulus_id:"M2_O1",label:"Extra Folder 1: Visiting Students",is_mandatory:!1},{stimulus_id:"M2_O2",label:"Extra Folder 2: Community Observers",is_mandatory:!1},{stimulus_id:"M2_O3",label:"Extra Folder 3: Studio Assistants",is_mandatory:!1}];function n(){var p,u,f,h,b;if(v){r.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 7: The Repetition</span>
            
          </div>
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',goal:"Stamp 3 required folders, then decide if you want to continue.",steps:["Stamp the 3 required guest folders.","After folder 3, you choose whether to finish or do optional extras.","Stopping after 3 is completely fine and has no penalty."]})}
        </div>
      `,T(r,()=>{v=!1,e="mandatory",t=0,s=0,m(c[0]),n()});return}if(e==="mandatory"){const g=c[t];r.innerHTML=A({worldCode:"W7",worldIndex:6,stepBadge:`Required Phase (${t+1}/3)`,title:"The Courtesy Sleeves",subtitle:"Prepare courtesy sleeves for event attendees.",instructionPrompt:"Your Task",instruction:"Assemble the required folder below. Three required folders are needed to satisfy this activity.",stimulusContent:`
          <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
            <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase tracking-wider text-stone-500 font-sans">Required Courtesy Folder</span>
              <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${g.label}</div>
            </div>
          </div>
        `,actionButtonId:"foldSleeveBtn",actionButtonText:"Assemble Required Folder &rarr;",progressText:`Required Folder ${t+1} of ${c.length}`}),(p=document.getElementById("foldSleeveBtn"))==null||p.addEventListener("click",()=>{l="mouse",i("unit_action_performed",{stimulus_id:g.stimulus_id,unit_index:t,action_type:"assemble_sleeve",input_modality:l,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:g.stimulus_id,unit_index:t,is_mandatory:!0,task_def_version:"1.0"}),t<c.length-1?(t++,m(c[t]),n()):(e="choice",i("choice_presented",{trial_index:c.length,mandatory_completed_count:c.length,task_def_version:"1.0"}),n())})}else if(e==="choice")r.innerHTML=A({worldCode:"W7",worldIndex:6,stepBadge:"Requirement Completed",title:"The Courtesy Sleeves",subtitle:"Required minimum completed.",stimulusContent:`
          <div class="p-6 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs text-center">
            <div class="w-10 h-10 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 text-lg mb-2">
              &#10003;
            </div>
            <div class="text-sm font-serif font-semibold text-[var(--text-primary)] mb-1">Required Minimum Satisfied</div>
            <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mb-6">
              You have completed the required 3 courtesy folders. You may conclude this activity now, or make up to ${o.length-s} extra folders.
              <br><strong class="text-stone-700 mt-1 inline-block">Stopping at the minimum is completely neutral.</strong>
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button type="button" id="concludeBtn" class="px-6 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors duration-150 font-sans interactive-option shadow-sm rounded-xs w-full sm:w-auto min-h-[44px] cursor-pointer">
                Conclude Activity Now &rarr;
              </button>
              ${s<o.length?`
                <button type="button" id="continueOptionalBtn" class="px-6 py-3.5 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-widest hover:bg-amber-50 transition-colors duration-150 font-sans interactive-option shadow-xs rounded-xs w-full sm:w-auto min-h-[44px] cursor-pointer">
                  + Prepare Extra Folder (${s+1}/${o.length})
                </button>
              `:""}
            </div>
          </div>
        `,progressText:"Choice Point &middot; Stopping is neutral"}),(u=document.getElementById("concludeBtn"))==null||u.addEventListener("click",()=>{l="mouse",i("continuation_choice_selected",{choice:"conclude",optional_index:s,input_modality:l,task_def_version:"1.0"}),x({mini_game:"M2",observations_count:c.length+s})}),(f=document.getElementById("continueOptionalBtn"))==null||f.addEventListener("click",()=>{l="mouse",i("continuation_choice_selected",{choice:"continue",optional_index:s,input_modality:l,task_def_version:"1.0"}),e="optional",m(o[s]),n()});else if(e==="optional"){const g=o[s];r.innerHTML=A({worldCode:"W7",worldIndex:6,stepBadge:"Voluntary Extra",title:"The Courtesy Sleeves",subtitle:"Voluntary extra folder preparation.",instructionPrompt:"Voluntary Extra",instruction:"You may assemble this extra folder or finish at any time. Stopping is completely neutral.",stimulusContent:`
          <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] text-center shadow-xs rounded-xs">
            <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase tracking-wider text-stone-500 font-sans">Voluntary Courtesy Folder</span>
              <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${g.label}</div>
            </div>
          </div>
        `,secondaryActionHtml:`
          <button type="button" id="stopOptionalEarlyBtn" class="px-5 py-3 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs uppercase tracking-wider font-sans interactive-option rounded-xs w-full sm:w-auto min-h-[44px] cursor-pointer">
            Conclude Now
          </button>
        `,actionButtonId:"foldOptionalSleeveBtn",actionButtonText:s===o.length-1?"Confirm & Finish &rarr;":"Assemble Extra Folder &rarr;",progressText:`Extra Folder ${s+1} of ${o.length}`}),(h=document.getElementById("stopOptionalEarlyBtn"))==null||h.addEventListener("click",()=>{l="mouse",i("continuation_choice_selected",{choice:"conclude",optional_index:s,input_modality:l,task_def_version:"1.0"}),x({mini_game:"M2",observations_count:c.length+s})}),(b=document.getElementById("foldOptionalSleeveBtn"))==null||b.addEventListener("click",()=>{l="mouse",i("unit_action_performed",{stimulus_id:g.stimulus_id,unit_index:c.length+s,action_type:"assemble_sleeve",input_modality:l,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:g.stimulus_id,unit_index:c.length+s,is_mandatory:!1,task_def_version:"1.0"}),s++,s<o.length?(e="choice",i("choice_presented",{trial_index:c.length+s,mandatory_completed_count:c.length,task_def_version:"1.0"}),n()):x({mini_game:"M2",observations_count:c.length+s})})}}function m(p){i("unit_presented",{stimulus_id:p.stimulus_id,unit_index:p.is_mandatory?t:c.length+s,is_mandatory:p.is_mandatory,task_def_version:"1.0"})}n()}function Ie(r,a,i,x){let v=!0,e=0,t="mouse";const s=[{stimulus_id:"M3_U1",is_mandatory:!0,row_name:"Gallery Row 1: Lighting & Illumination Alignment",feedback_type:"salient"},{stimulus_id:"M3_U2",is_mandatory:!0,row_name:"Gallery Row 2: Poetry Anthologies Welcome Stand",feedback_type:"moderate"},{stimulus_id:"M3_U3",is_mandatory:!0,row_name:"Gallery Row 3: Courtyard Entry Floral Registry",feedback_type:"minimal"},{stimulus_id:"M3_U4",is_mandatory:!1,row_name:"Gallery Row 4: Auxiliary Bench Linen Inspection",feedback_type:"none"},{stimulus_id:"M3_U5",is_mandatory:!1,row_name:"Gallery Row 5: Outer Colonnade Lantern Wick Inspection",feedback_type:"none"},{stimulus_id:"M3_U6",is_mandatory:!1,row_name:"Gallery Row 6: Perimeter Garden Urn Water Check",feedback_type:"none"}],l=3;function c(){var p,u;if(v){r.innerHTML=`
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 7: The Repetition</span>
            
          </div>
          ${k({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',goal:"Verify checklist rows for gallery preparation. A minimum of 3 rows is required.",steps:["Mandatory requirement: Exactly 3 checklist rows.","Completing 3 rows satisfies this activity.","You may conclude at any time after row 3, or continue. Stopping is neutral.","Feedback messages become shorter on later rows. This is normal and intentional."]})}
        </div>
      `,T(r,()=>{v=!1,e=0,o(),c()});return}const n=s[e],m=e>=l;r.innerHTML=`
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 7: The Repetition</span>
            
          </div>
          <div class="text-[11px] ${m?"text-emerald-800":"text-amber-800"} font-sans font-medium">
            ${m?"Optional Continuation":"Required Minimum (3)"}
          </div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Evening Registry</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            ${m?"Requirement met (3/3). You may conclude now or continue.":"Mandatory requirement: 3 rows. Completing 3 satisfies the activity."}
          </p>
        </div>

        ${m?`
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
            ${m?`
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
    `,(p=document.getElementById("concludeM3Btn"))==null||p.addEventListener("click",()=>{t="mouse",i("conclude_selected",{stimulus_id:n.stimulus_id,unit_index:e,total_units_completed:e,input_modality:t,task_def_version:"1.0"}),x({mini_game:"M3",observations_count:e})}),(u=document.getElementById("verifyRowBtn"))==null||u.addEventListener("click",()=>{t="mouse",i("unit_action_performed",{stimulus_id:n.stimulus_id,unit_index:e,action_type:"verify_registry_entry",input_modality:t,task_def_version:"1.0"}),i("unit_completed",{stimulus_id:n.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<s.length-1?(e++,o(),c()):x({mini_game:"M3",observations_count:s.length})})}function o(){const n=s[e];i("trial_presented",{stimulus_id:n.stimulus_id,unit_index:e,is_mandatory:n.is_mandatory,task_def_version:"1.0"})}c()}const K={W1:{name:"The Frequency",name_ur:"آواز",subtitle:"Acoustics & Dialogue"},W2:{name:"The Archive",name_ur:"دستاویز",subtitle:"Manuscripts & Preservation"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ کینوس",subtitle:"Artisan Workshop"},W4:{name:"The Shifting Grid",name_ur:"بدلتا گرڈ",subtitle:"Mosaic & Rhythm"},W5:{name:"The Hidden Gallery",name_ur:"پوشیدہ گیلری",subtitle:"Exhibition Discovery"},W6:{name:"The Broken Tool",name_ur:"ٹوٹا آلہ",subtitle:"Material Assembly"},W7:{name:"The Repetition",name_ur:"دہرائی",subtitle:"Readiness & Ceremony"}};function A({worldCode:r="",worldIndex:a=0,stepBadge:i="",title:x="",subtitle:v="",instruction:e="",instructionPrompt:t="Your Task",stimulusContent:s="",interactionContent:l="",feedbackContent:c="",summaryContent:o="",actionButtonId:n="",actionButtonText:m="",actionButtonDisabled:p=!1,secondaryActionHtml:u="",progressText:f="",extraContent:h=""}){const b=K[r]||{name:"Alfaaz Workshop",name_ur:""},g=typeof a=="number"?a:0,y=i&&!i.toLowerCase().includes("takes about")?i:"";return`
    <div class="animate-soft-fade-in max-w-2xl mx-auto space-y-4">
      <!-- TOP BAR -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-[var(--grid-border)]">
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${g+1} of 7: ${b.name}</span>
          ${b.name_ur?`<span class="font-serif text-base sm:text-lg text-[var(--text-secondary)]" style="direction: rtl;">${b.name_ur}</span>`:""}
        </div>
        ${y?`<div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">${y}</div>`:""}
      </div>

      <!-- TASK HEADER -->
      <div>
        <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">${x}</h2>
        ${v?`<p class="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">${v}</p>`:""}
      </div>

      <!-- INSTRUCTION / CONTEXT BOX -->
      ${e?`
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">${t}</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            ${e}
          </div>
        </div>
      `:""}

      <!-- MAIN STIMULUS AREA -->
      ${s?`<div class="candidate-content-protected">${s}</div>`:""}

      <!-- INTERACTION AREA -->
      ${l?`<div class="candidate-content-protected">${l}</div>`:""}

      <!-- FEEDBACK REGION -->
      ${c?`
        <div class="candidate-content-protected">
          ${c}
        </div>
      `:""}

      <!-- ACTIVE SELECTION / SUMMARY AREA -->
      ${o?`
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center candidate-content-protected">
          ${o}
        </div>
      `:""}

      <!-- PRIMARY ACTION BAR -->
      ${m||u?`
        <div class="flex flex-col sm:flex-row justify-end items-center gap-3 pt-1">
          ${u||""}
          ${m?`
            <button type="button" id="${n}" ${p?"disabled":""} class="w-full sm:w-auto px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer interactive-option shadow-sm rounded-xs flex items-center justify-center gap-2 min-h-[44px]">
              ${m}
            </button>
          `:""}
        </div>
      `:""}

      <!-- EXTRA CONTENT -->
      ${h||""}

      <!-- PROGRESS FOOTER -->
      ${f?`
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans pt-1">
          ${f}
        </div>
      `:""}
    </div>
  `}const W={W1:["F1","F2"],W2:["A1","A2"],W3:["C1","C2"],W4:["E1","E2"],W5:["Q1","Q2"],W6:["CR1","CR3"],W7:["M1","M2"]};function k({icon:r,goal:a,steps:i}){return`
    <div class="tutorial-card cursor-pointer p-6 border border-[var(--accent-gold)] bg-gradient-to-br from-[#faf8f5] to-[#f5efe8] space-y-4 mb-6 interactive-option duration-300" tabindex="0" role="button" aria-label="Begin Activity Guide">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-amber-100/80 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] shrink-0">
          ${r||'<i data-lucide="compass" class="w-5 h-5"></i>'}
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-medium">Activity Guide &middot; رہنمائے عمل</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] font-semibold">${a}</h3>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        ${i.map((x,v)=>`
          <div class="bg-white/80 border border-[var(--grid-border)] p-3 flex items-start gap-2.5">
            <span class="w-5 h-5 rounded-full bg-[var(--accent-gold)] text-white text-[10px] flex items-center justify-center font-serif shrink-0 mt-0.5">${v+1}</span>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">${x}</div>
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
  `}function T(r,a){let i=!1;const x=t=>{t&&(typeof t.preventDefault=="function"&&t.preventDefault(),typeof t.stopPropagation=="function"&&t.stopPropagation()),!i&&(i=!0,a())},v=r.querySelector("#startActivityBtn"),e=r.querySelector(".tutorial-card");v&&v.addEventListener("click",x,{once:!0}),e&&(e.addEventListener("click",t=>{x(t)},{once:!0}),e.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&x(t)},{once:!0}))}function Re(r){const{appContainer:a,worldCode:i,worldIndex:x,miniGameIndex:v,gameId:e,onMiniGameComplete:t}=r,s=K[i]||{name:"Alfaaz Workshop",name_ur:""},l=e||W[i]&&W[i][v]||null,c={...r,gameId:l},o=(n,m)=>`
    <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
      <div>
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${x+1} of 7: ${s.name}</span>
          <span class="font-serif text-base sm:text-lg text-[var(--text-secondary)]" style="direction: rtl;">${s.name_ur}</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${n}</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">${m}</p>
      </div>
    </div>
  `;switch(i){case"W1":oe(c,o);break;case"W2":se(c,o);break;case"W3":ue(c,o);break;case"W4":fe(c,o);break;case"W5":ge(c,o);break;case"W6":ke(c,o);break;case"W7":Ee(c,o);break;default:t&&t({});break}}function Le(){const r=window.ALFAAZ_API_URL||"";r&&(fetch(r+"/ping").catch(()=>{}),setInterval(()=>fetch(r+"/ping").catch(()=>{}),4*60*1e3))}let d={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1,activeMiniGameInProgress:!1,telemetryTerminal:!1};const Q="alfaaz_recruit_state",J="alfaaz_recruit_unsent";let D=!1;function V(){D=!1;try{const r={sessionId:d.sessionId,configHash:d.configHash,worldSequence:d.worldSequence,seeds:d.seeds,screen:d.screen,sjtScenarios:d.sjtScenarios,currentSjtIndex:d.currentSjtIndex,sjtResponses:d.sjtResponses,currentWorldIndex:d.currentWorldIndex,currentMiniGameIndex:d.currentMiniGameIndex,accessibilityModes:d.accessibilityModes,segmentId:d.segmentId,seq:d.seq,isPaused:d.isPaused,activeMiniGameInProgress:d.activeMiniGameInProgress||!1,telemetryTerminal:d.telemetryTerminal};sessionStorage.setItem(Q,JSON.stringify(r)),sessionStorage.setItem(J,JSON.stringify(d.telemetryQueue.slice(-100)))}catch(r){console.warn("[Persistence] Error saving sessionStorage:",r)}}function S({immediate:r=!1}={}){if(r){V();return}if(D)return;D=!0;const a=()=>V();"requestIdleCallback"in window?window.requestIdleCallback(a,{timeout:500}):window.setTimeout(a,100)}function Me(){try{const r=sessionStorage.getItem(Q),a=sessionStorage.getItem(J);if(a){const i=JSON.parse(a);Array.isArray(i)&&(d.telemetryQueue=i)}if(r){const i=JSON.parse(r);if(i.sessionId){if(d.sessionId=i.sessionId,d.configHash=i.configHash||null,d.worldSequence=i.worldSequence||[],d.seeds=i.seeds||{},d.screen=i.screen||"consent",d.sjtScenarios=i.sjtScenarios||[],d.currentSjtIndex=i.currentSjtIndex||0,d.sjtResponses=i.sjtResponses||{},d.currentWorldIndex=i.currentWorldIndex||0,d.currentMiniGameIndex=i.currentMiniGameIndex||0,d.accessibilityModes=i.accessibilityModes||[],Z(d.accessibilityModes),d.seq=i.seq||1,d.isPaused=i.isPaused||!1,d.telemetryTerminal=i.telemetryTerminal||!1,d.segmentId=(i.segmentId||1)+1,C(d.screen,"segment_start",{segment_id:d.segmentId}),i.activeMiniGameInProgress&&i.screen==="games"){const x=d.worldSequence[d.currentWorldIndex],v=q(x,d.currentMiniGameIndex);C("game","interrupted",{mini_game:v,reason:"page_reload"}),d.currentMiniGameIndex<1?d.currentMiniGameIndex++:(d.currentMiniGameIndex=0,d.currentWorldIndex++),d.activeMiniGameInProgress=!1}return S({immediate:!0}),!0}}}catch(r){console.warn("[Persistence] Error restoring sessionStorage:",r)}return!1}async function B(r,a={}){const i=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",x={"Content-Type":"application/json",...a.headers||{}};return fetch(`${i}${r}`,{...a,headers:x})}function C(r,a,i={},x={},v="mouse",e=null,t=null){const s=performance.now();let l=i,c=x;try{const n=JSON.stringify(i),m=JSON.stringify(x),p=new TextEncoder().encode(n).length+new TextEncoder().encode(m).length;p>4096&&(l={event_oversize:!0,original_size_bytes:p},c={oversized:!0})}catch{}const o={seq:d.seq++,segment_id:d.segmentId,t_ms:s,screen:r,game_world:d.worldSequence[d.currentWorldIndex]||null,mini_game:e,trial:t,action:a,input_type:v,task_def_version:i&&i.task_def_version||"1.0",state:c,data:l};d.telemetryQueue.push(o),S(),(d.telemetryQueue.length>=50||a==="minigame_end"||a==="sjt_complete")&&P()}let j=null,N=50;async function P(){if(!d.sessionId||d.telemetryQueue.length===0||d.telemetryTerminal)return!0;if(j)return j;j=Be();try{return await j}finally{j=null}}async function Be(){if(!d.sessionId||d.telemetryQueue.length===0||d.telemetryTerminal)return!0;const r=d.telemetryQueue.slice(0,N);try{const a=await B("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:d.sessionId,events:r})});if(a&&a.status===422){const x=await a.json().catch(()=>({}));if(x.detail&&(x.detail.detail==="events_cap_reached"||x.detail.status==="DATA_LIMITED"))return console.warn("[Telemetry] Terminal event cap reached (50,000). Halting future telemetry flushes."),d.telemetryTerminal=!0,S({immediate:!0}),!0}if(a&&a.status===413)return console.warn("[Telemetry] Batch rejected with HTTP 413 (oversize)."),r.length>1?N=Math.max(1,Math.floor(r.length/2)):console.error("[Telemetry] A single telemetry event exceeds the body limit. It remains queued for recovery."),S({immediate:!0}),!1;if(a&&a.status===403){const x=await a.json().catch(()=>({}));if((typeof x.detail=="string"?x.detail:JSON.stringify(x.detail||"")).toLowerCase().includes("already complete"))return console.info("[Telemetry] Session is already complete on server; draining local queue."),d.telemetryQueue=[],d.telemetryTerminal=!0,S({immediate:!0}),!0}if(!a||!a.ok)throw new Error(a?`HTTP ${a.status}`:"No response");const i=await a.json().catch(()=>({}));return i.result&&i.result.session_status==="COMPLETE"?(d.telemetryQueue.splice(0,r.length),i.result.new_rejected_count>0&&(d.telemetryQueue=[],d.telemetryTerminal=!0),S({immediate:!0}),!0):(d.telemetryQueue.splice(0,r.length),S(),!0)}catch(a){return console.warn("[Telemetry] Flush failed; telemetry remains queued:",a),S({immediate:!0}),!1}}async function Pe(r=3){let a=0;for(;!d.telemetryTerminal&&d.telemetryQueue.length>0;){const i=d.telemetryQueue.length;if(!await P()||d.telemetryQueue.length>=i){if(a++,a>=r)return!1;await new Promise(v=>setTimeout(v,600*a))}else a=0}return!0}setInterval(()=>{d.sessionId&&d.telemetryQueue.length>0&&!d.telemetryTerminal&&P()},2500);window.addEventListener("pagehide",()=>{if(S({immediate:!0}),d.sessionId&&d.telemetryQueue.length>0){const r=window.ALFAAZ_API_URL||"",a=JSON.stringify({session_id:d.sessionId,events:d.telemetryQueue.slice(0,N)});navigator.sendBeacon(`${r}/recruit/telemetry`,new Blob([a],{type:"application/json"}))}});document.addEventListener("visibilitychange",()=>{document.hidden?(C(d.screen,"visibility_hidden",{timestamp:Date.now()}),C(d.screen,"tab_hidden",{timestamp:Date.now()}),P()):(C(d.screen,"visibility_visible",{timestamp:Date.now()}),C(d.screen,"tab_visible",{timestamp:Date.now()}))});window.addEventListener("blur",()=>{C(d.screen,"blur",{timestamp:Date.now()})});window.addEventListener("focus",()=>{C(d.screen,"focus",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{Le(),Me(),M(),je()});function je(){const r=document.getElementById("pauseBtn");r==null||r.addEventListener("click",X);const a=document.getElementById("exitBtn");a==null||a.addEventListener("click",()=>{confirm("Are you sure you wish to exit the volunteer assessment? You can return at any time.")&&(C(d.screen,"candidate_exited"),P(),window.location.href="index.html")})}function X(){d.isPaused?(d.isPaused=!1,C(d.screen,"resume"),d.screen=d.pausedPreviousScreen||"sjt",M()):(d.isPaused=!0,d.pausedPreviousScreen=d.screen,C(d.screen,"pause"),d.screen="paused",M())}function M(){const r=document.getElementById("recruitApp"),a=document.getElementById("sessionHeaderControls"),i=document.getElementById("topProgressBar"),x=document.getElementById("progressBarFill");switch(d.screen!=="consent"&&d.screen!=="complete"&&d.screen!=="paused"?(a==null||a.classList.remove("hidden"),i==null||i.classList.remove("hidden")):(a==null||a.classList.add("hidden"),i==null||i.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),d.screen){case"consent":Oe(r);break;case"identity":He(r);break;case"accessibility":We(r);break;case"warmup":Fe(r);break;case"sjt":H(r,x);break;case"games":te(r,x);break;case"paused":De(r);break;case"complete":Ne(r);break}}function Oe(r){var e;r.innerHTML=`
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
  `;const a=document.getElementById("ageConfirm"),i=document.getElementById("consentAgree"),x=document.querySelector('#consentForm button[type="submit"]'),v=()=>{const t=!!(a!=null&&a.checked&&(i!=null&&i.checked));x==null||x.setAttribute("aria-disabled",String(!t)),x==null||x.classList.toggle("opacity-40",!t)};a==null||a.addEventListener("change",v),i==null||i.addEventListener("change",v),v(),(e=document.getElementById("consentForm"))==null||e.addEventListener("submit",async t=>{t.preventDefault();const s=t.target.querySelector('button[type="submit"]');if((s==null?void 0:s.getAttribute("aria-disabled"))==="true")return;const l=s?s.innerHTML:"Enter the Studio &rarr;";s&&(s.setAttribute("aria-disabled","true"),s.innerHTML="Preparing Workspace...");try{const c=await B("/recruit/consent",{method:"POST",body:JSON.stringify({choices:{research_telemetry:i==null?void 0:i.checked}})});if(!c.ok)throw new Error(`Network error: ${c.status}`);const o=await c.json();d.sessionId=o.session_id,d.configHash=o.config_hash||null,d.worldSequence=o.world_sequence||[],d.seeds=o.seeds||{},S({immediate:!0}),P(),d.screen="identity",M()}catch(c){alert(`Unable to initialize session: ${c.message||"Please check connection."}`),console.error(c),s&&(s.innerHTML=l,s.setAttribute("aria-disabled","false"))}})}function He(r){var a;r.innerHTML=`
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
  `,(a=document.getElementById("identityForm"))==null||a.addEventListener("submit",async i=>{i.preventDefault();const x=i.target.querySelector('button[type="submit"]'),v=x?x.innerHTML:"Begin Session &rarr;";x&&(x.disabled=!0,x.innerHTML="Connecting...");try{const e=await B("/recruit/identity",{method:"POST",body:JSON.stringify({session_id:d.sessionId,full_name:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim()})});if(!e||!e.ok){const t=e?await e.json().catch(()=>({})):{};throw new Error(t.detail||(e?`Server returned ${e.status}`:"No response from server"))}d.screen="accessibility",C("identity","identity_submitted"),S({immediate:!0}),M()}catch(e){alert(`Unable to continue: ${e.message||"Please check connection."}`),x&&(x.disabled=!1,x.innerHTML=v)}})}function Z(r=[]){if(typeof document>"u"||!document.documentElement)return;const a=document.documentElement;a.classList.toggle("a11y-high-contrast",r.includes("high_contrast")),a.classList.toggle("a11y-dyslexia-font",r.includes("dyslexia_font")),a.classList.toggle("a11y-reduced-motion",r.includes("reduced_motion"))}function We(r){var i;const a=d.accessibilityModes||[];r.innerHTML=`
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
          <input type="checkbox" id="a11y_contrast" class="mt-1 accent-[#bd6f5d]" ${a.includes("high_contrast")?"checked":""}>
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">High Contrast Display</div>
            <div class="text-xs text-[var(--text-secondary)] mt-0.5">Increases text contrast, element borders, and background separation for clearer visibility.</div>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_dyslexia" class="mt-1 accent-[#bd6f5d]" ${a.includes("dyslexia_font")?"checked":""}>
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">Dyslexia-Friendly Typography</div>
            <div class="text-xs text-[var(--text-secondary)] mt-0.5">Applies a high-legibility sans-serif typeface with enhanced letter and line spacing.</div>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_motion" class="mt-1 accent-[#bd6f5d]" ${a.includes("reduced_motion")?"checked":""}>
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
  `,(i=document.getElementById("saveA11yBtn"))==null||i.addEventListener("click",async x=>{var t,s,l;const v=x.currentTarget;if(v.disabled)return;v.disabled=!0,v.textContent="Saving...";const e=[];(t=document.getElementById("a11y_contrast"))!=null&&t.checked&&e.push("high_contrast"),(s=document.getElementById("a11y_dyslexia"))!=null&&s.checked&&e.push("dyslexia_font"),(l=document.getElementById("a11y_motion"))!=null&&l.checked&&e.push("reduced_motion"),d.accessibilityModes=e,Z(e);try{await B("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:d.sessionId,modes_enabled:e})})}catch(c){console.warn("Accessibility preferences save error:",c)}d.screen="warmup",C("accessibility","preferences_saved",{modes:e}),S({immediate:!0}),M()})}function Fe(r){let a=[],i=performance.now();r.innerHTML=`
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
  `;const x=document.getElementById("tapTarget"),v=document.getElementById("warmupStatus");x==null||x.addEventListener("click",async()=>{a.push(performance.now());const e=a.length;if(x.textContent=`Tap (${e}/3)`,v.textContent=`Recorded tap ${e} of 3`,e>=3){x.setAttribute("disabled","true"),x.classList.add("opacity-50");const t=[a[1]-a[0],a[2]-a[1]],s=(t[0]+t[1])/2,l=performance.now()-i;try{await B("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:d.sessionId,tap_latency_baseline_ms:s,reading_dwell_baseline_ms:l,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(o){console.warn("Warmup save error:",o)}C("warmup","warmup_completed",{avgLatency:s,readingDwell:l});async function c(){var o;r.innerHTML=`
          <div class="space-y-6 text-center py-16 animate-soft-fade-in">
            <div class="waiting-spinner"></div>
            <h2 class="text-xl font-serif text-[var(--text-primary)]">Loading Scenarios...</h2>
            <p class="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
              Connecting to the assessment server. This may take a few moments if starting from cold.
            </p>
          </div>
        `;try{const n=await B("/recruit/sjt/public");if(!n||!n.ok)throw new Error(n?`Server returned HTTP ${n.status}`:"Network timeout");const m=await n.json();d.sjtScenarios=m.scenarios||[],d.currentSjtIndex=0,d.screen="sjt",S({immediate:!0}),M()}catch(n){console.warn("Failed to load SJT payload:",n),r.innerHTML=`
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
          `,(o=document.getElementById("retrySjtLoadBtn"))==null||o.addEventListener("click",()=>{c()})}}c()}})}function H(r,a){var c;const i=d.sjtScenarios[d.currentSjtIndex];if(!i){ee();return}const x=d.sjtScenarios.length,v=d.currentSjtIndex+1;a&&(a.style.width=`${(v-1)/21*100}%`);const e=document.getElementById("segmentProgress");if(e){const o=Math.max(1,Math.round(((x-v+1)*35+448)/60));e.innerHTML=`<span class="text-[var(--text-secondary)] hidden sm:inline mr-2 text-[10px] sm:text-xs font-normal">About ${o} mins remaining</span><span>Judgment ${v} / ${x}</span>`}const t=d.sjtResponses[i.id]||null,s=i.options.map(o=>`
    <div class="option-card min-h-[48px] ${t===o.id?"selected":""}" data-opt-id="${o.id}" tabindex="0" role="button" aria-label="Option ${o.id.slice(-1)}">
      <span class="font-serif text-sm font-semibold text-[var(--accent-gold)] shrink-0">${o.id.slice(-1)}.</span>
      <span class="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">${o.text}</span>
    </div>
  `).join("");r.innerHTML=`
    <div class="space-y-5 animate-soft-fade-in">
      <!-- Top Context and Step -->
      <div class="border-b border-[var(--grid-border)] pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1">
        <div>
          <span class="act-badge">Judgment ${v} of ${x}</span>
          <span class="act-title-ur font-serif">${i.act_title_ur||""}</span>
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">${i.act_title_en}</h2>
        </div>
        <div class="text-[11px] sm:text-xs text-[var(--accent-gold)] uppercase tracking-wider font-medium">
          Section 1 &middot; ${v} of ${x}
        </div>
      </div>

      <!-- YOUR TASK -->
      <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-xs text-xs font-serif text-[var(--text-primary)] flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block shrink-0"></span>
        <span><strong>Your Task:</strong> Read the situation below and choose what you would do.</span>
      </div>

      <!-- SITUATION -->
      <div class="scenario-text text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-4 sm:p-5 border border-[var(--grid-border)] rounded-xs">
        ${i.setup}
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
          ${v===x?"Complete Judgment Section &rarr;":"Next Scenario &rarr;"}
        </button>
      </div>
    </div>
  `,C("sjt","scenario_displayed",{scenario_id:i.id,index:v}),r.querySelectorAll(".option-card").forEach(o=>{o.addEventListener("click",()=>{const n=o.getAttribute("data-opt-id");d.sjtResponses[i.id]=n,C("sjt","option_selected",{scenario_id:i.id,option_id:n}),H(r,a)})}),(c=document.getElementById("nextSjtBtn"))==null||c.addEventListener("click",()=>{d.sjtResponses[i.id]&&(d.currentSjtIndex++,H(r,a))});const l=o=>{if(["1","2","3","4"].includes(o.key)){const n=parseInt(o.key)-1;i.options[n]&&(d.sjtResponses[i.id]=i.options[n].id,C("sjt","option_selected_key",{scenario_id:i.id,option_id:i.options[n].id}),H(r,a))}};window.onkeydown=l}let F=!1;async function ee(){if(F)return;F=!0,window.onkeydown=null;const r=document.getElementById("recruitApp");r&&(r.innerHTML=`
      <div class="space-y-6 text-center py-16 animate-soft-fade-in">
        <div class="waiting-spinner"></div>
        <h2 class="text-xl font-serif text-[var(--text-primary)]">Saving Judgments...</h2>
        <p class="text-xs text-[var(--text-secondary)]">Recording your situation judgments to your session profile.</p>
      </div>
    `);try{const a=await B("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:d.sessionId,responses:d.sjtResponses})});if(!a||!a.ok)throw new Error(a?`Server returned HTTP ${a.status}`:"Connection failed");d.screen="games",d.currentWorldIndex=0,d.currentMiniGameIndex=0,C("sjt","sjt_complete",{response_count:Object.keys(d.sjtResponses).length}),S({immediate:!0}),M()}catch(a){if(console.warn("SJT submit error:",a),r){r.innerHTML=`
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
      `;const i=document.getElementById("retrySjtSubmitBtn");i&&i.addEventListener("click",()=>{i.disabled=!0,i.textContent="Submitting...",ee()})}}finally{F=!1}}function te(r,a){const i=d.worldSequence[d.currentWorldIndex];if(!i||d.currentWorldIndex>=d.worldSequence.length){ie();return}d.activeMiniGameInProgress=!0,S({immediate:!0});const x=d.currentWorldIndex*2+d.currentMiniGameIndex+1,v=14,e=document.getElementById("segmentProgress");if(e){const t=v-x+1,s=Math.max(1,Math.round(t*32/60));e.innerHTML=`<span class="text-[var(--text-secondary)] hidden sm:inline mr-2 text-[10px] sm:text-xs font-normal">About ${s} min${s>1?"s":""} remaining</span><span>Activities ${x} / ${v}</span>`}if(a){const t=7+(x-1);a.style.width=`${t/21*100}%`}Re({appContainer:r,worldCode:i,worldIndex:d.currentWorldIndex,miniGameIndex:d.currentMiniGameIndex,seeds:d.seeds,logEvent:(t,s,l,c)=>{const o=q(i,d.currentMiniGameIndex);C("game",t,s,l,c,o)},onMiniGameComplete:t=>{d.activeMiniGameInProgress=!1;const s=q(i,d.currentMiniGameIndex);C("game","minigame_end",t,{},"mouse",s),P(),d.currentMiniGameIndex<1?d.currentMiniGameIndex++:(d.currentMiniGameIndex=0,d.currentWorldIndex++),S({immediate:!0}),te(r,a)}})}function q(r,a){const i=W&&W[r];if(i&&i[a])return i[a];const x={W1:["F1","F2"],W2:["A1","A2"],W3:["C1","C2"],W4:["E1","E2"],W5:["Q1","Q2"],W6:["CR1","CR3"],W7:["M1","M2"]};return x[r]&&x[r][a]||"MG"}let O=!1;function z(r,a){if(!r)return;r.innerHTML=`
    <div class="space-y-6 text-center py-16 animate-soft-fade-in">
      <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto text-xl font-serif">!</div>
      <h2 class="text-2xl font-serif text-[var(--text-primary)]">Connection Notice</h2>
      <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">${a}</p>
      <div class="pt-2">
        <button id="retryFinalizationBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">Retry Finalization &rarr;</button>
      </div>
    </div>
  `;const i=document.getElementById("retryFinalizationBtn");i&&i.addEventListener("click",()=>{i.disabled=!0,i.textContent="Connecting...",ie()})}async function ie(){if(O)return;O=!0,d.activeMiniGameInProgress=!1,S({immediate:!0});const r=document.getElementById("recruitApp");r&&(r.innerHTML=`
      <div class="space-y-6 text-center py-16 animate-soft-fade-in">
        <div class="waiting-spinner"></div>
        <h2 id="finalizingHeading" class="text-2xl font-serif text-[var(--text-primary)]">Synchronizing activity...</h2>
        <p id="finalizingSubtext" class="text-xs text-[var(--text-secondary)]">Saving your completed activity... Please keep this page open.</p>
      </div>
    `);const a=i=>{["Enter"," ","Spacebar"].includes(i.key)&&i.preventDefault()};window.addEventListener("keydown",a,{capture:!0});try{if(!await Pe()){window.removeEventListener("keydown",a,{capture:!0}),O=!1,z(r,"Connection could not be confirmed. Your saved activity has not been discarded. You can retry.");return}const x=document.getElementById("finalizingHeading"),v=document.getElementById("finalizingSubtext");x&&(x.textContent="Finalizing assessment..."),v&&(v.textContent="Saving your completed activity... Please keep this page open.");let e=null;for(let s=0;s<3;s++){try{if(e=await B("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:d.sessionId})}),e&&e.ok)break}catch(l){if(s===2)throw l}await new Promise(l=>setTimeout(l,1e3*(s+1)))}if(!e||!e.ok)throw new Error(e?`Server returned HTTP ${e.status}`:"No response from server");const t=await e.json().catch(()=>({}));if(t.status==="SUCCESS"||t.session_status==="COMPLETE"||t.is_already_completed){window.removeEventListener("keydown",a,{capture:!0}),d.screen="complete",d.telemetryTerminal=!0,d.telemetryQueue=[],S({immediate:!0}),M();return}throw new Error("Unexpected completion status")}catch(i){window.removeEventListener("keydown",a,{capture:!0}),console.warn("Session complete submission error:",i),z(r,"The final session confirmation was not received. Your saved activity has not been discarded. You can retry.")}finally{window.removeEventListener("keydown",a,{capture:!0}),O=!1}}function De(r){var a;r.innerHTML=`
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
  `,(a=document.getElementById("resumeBtn"))==null||a.addEventListener("click",X)}function Ne(r){r.innerHTML=`
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
