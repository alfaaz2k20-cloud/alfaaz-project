import"./global-DxYxv3W5.js";/* empty css               */const F={lines:["<strong>Estimated Total Time:</strong> ~20–25 minutes (SJT + brief exploratory micro-tasks).","<strong>Voluntary Nature:</strong> You may pause, skip tasks, or conclude at any time without penalty. Missing or skipped sections are recorded neutrally as insufficient data, never as a low score.","<strong>Simulated Partners:</strong> Some interactive tasks feature computer-controlled simulated characters. Their behavior is automated and scripted.","<strong>Data & Research Notice:</strong> This is a calibration-stage research instrument for unpaid volunteer recruitment, not a validated selection test. All raw telemetry is recorded under a pseudonymous session identifier."]},H={label:"I confirm that I am 18 years of age or older."},G={label:"I understand and agree to participate in this research session."},M={candidate_notice:F,age_confirmation:H,research_participation:G};function W(i,r){const{appContainer:t,miniGameIndex:p,logEvent:d,onMiniGameComplete:e}=i;switch(p){case 0:V(t,r,d,e);break;case 1:N(t,r,d,e);break;case 2:z(t,r,d,e);break}}function V(i,r,t,p){let d=!0,e=0,a=!1,s=0,b="mouse";const v=[{id:"DOC_01",title:"19th-Century Calligraphic Diwan (1842)",rule_prompt:"Filing Rule: Classify by Period",tags:["Year: 1842","19th Century","Parchment","Ghazal Verse"]},{id:"DOC_02",title:"Lyrical Ghazal Couplets Manuscript",rule_prompt:"Filing Rule: Classify by Genre",tags:["Genre: Poetry","Lyrical Verse","Urdu","Paper Folio"]},{id:"DOC_03",title:"Early 20th-Century Exhibition Register (1924)",rule_prompt:"Filing Rule: Classify by Period",tags:["Year: 1924","20th Century","Official Register","Signatures"]},{id:"DOC_04",title:"Lal Ded Vakh Verse Translations in Kashmiri",rule_prompt:"Filing Rule: Classify by Language",tags:["Language: Kashmiri","Vakh Verse","Vernacular Poetry"]},{id:"DOC_05",title:"Historical Tarikh Chronicle of Kashmir Artists",rule_prompt:"Filing Rule: Classify by Genre",tags:["Genre: Chronicle","Tarikh History","Biographical Record"]}],u=[{id:"19th_century",label:"19th Century Shelf",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},{id:"20th_century",label:"20th Century Shelf",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{id:"poetry",label:"Poetry & Verses Shelf",icon:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"},{id:"chronicle",label:"Chronicle Shelf",icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},{id:"kashmiri",label:"Kashmiri Vernacular Shelf",icon:"M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"}];function l(){var h,m;if(d){i.innerHTML=`
        <div>
          ${r("Part 1: The Manuscript Folios","Preserving and organizing historical folios and objects across 5 rule-based classification trials.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',goal:"Organize each historical item into its designated archive shelf based on archival classification rules.",steps:["Examine the item title and descriptor tags on each folio card.","Click the shelf guide button at any time to verify filing rules.","Select the appropriate shelf destination to file the folio."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{d=!1,e=0,s=performance.now(),l()});return}if(e>=v.length){p({mini_game:"A1",observations_count:v.length});return}const o=v[e];s=performance.now(),i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 1: The Manuscript Folios","Select the correct shelf for each historical archive artifact.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Folio ${e+1} of ${v.length}</span>
        </div>

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            ${o.rule_prompt}
          </span>
          <button id="guideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1 hover:bg-amber-50 transition flex items-center gap-1.5 rounded-xs" tabindex="0">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Shelf Guide
          </button>
        </div>

        <div id="guideModal" class="${a?"":"hidden"} p-4 mb-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] space-y-1 shadow-xs rounded-xs">
          <div>• <strong>Period Rule:</strong> Classify by creation century (19th Century vs 20th Century).</div>
          <div>• <strong>Genre Rule:</strong> Classify by literary format (Poetry vs Historical Chronicle).</div>
          <div>• <strong>Language Rule:</strong> Classify by primary linguistic medium (Kashmiri Vernacular).</div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase font-mono">${o.id}</span>
          <h3 class="text-lg font-serif text-[var(--text-primary)] font-medium mt-1 mb-3">${o.title}</h3>
          <div class="flex justify-center flex-wrap gap-2">
            ${o.tags.map(c=>`<span class="px-2.5 py-1 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)] rounded-xs">${c}</span>`).join("")}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          ${u.map(c=>`
            <button type="button" class="folder-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs flex flex-col items-center gap-1.5 rounded-xs" data-folder="${c.id}" tabindex="0">
              <svg class="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${c.icon}"></path></svg>
              ${c.label}
            </button>
          `).join("")}
        </div>
      </div>
    `,t("item_presented",{trial_index:e,stimulus_id:o.id,task_def_version:"1.0"}),(m=document.getElementById("guideBtn"))==null||m.addEventListener("click",()=>{const c=document.getElementById("guideModal");a=!(c!=null&&c.classList.contains("hidden")),c==null||c.classList.toggle("hidden"),a=!a,t("guide_viewed",{trial_index:e,stimulus_id:o.id,task_def_version:"1.0"})}),i.querySelectorAll(".folder-btn").forEach(c=>{const g=f=>{b=f;const _=c.getAttribute("data-folder"),S=performance.now()-s;t("item_sorted",{trial_index:e,stimulus_id:o.id,choice:_,dwell_ms:Math.round(S),input_modality:b,task_def_version:"1.0"}),e++,l()};c.addEventListener("click",()=>g("mouse")),c.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g("keyboard"))})})}l()}function N(i,r,t,p){let d=!0,e=0,a=null,s="mouse";const b=[{stimulus_id:"EXC_01",title:"19th-Century Kashmiri Ghazal Leaf with Water Wear",anomaly_description:'Water fading on lower margin. The accession year stamp is blurred and appears as "18--".',type_note:"Physical Damage & Indeterminate Year Stamp"},{stimulus_id:"EXC_02",title:"Pristine Persian Couplet Calligraphy (1890)",anomaly_description:"Intact rag fiber paper, clear black carbon ink, and standard accession stamp intact. No physical blemishes.",type_note:"Standard Folio Inspection"},{stimulus_id:"EXC_03",title:"Disbound Manuscript Folio with Pagination Jump",anomaly_description:"Binding threads severed. Margin numbering skips from Folio 14 directly to Folio 19 with missing text catchword.",type_note:"Structural Discrepancy & Missing Catchword"}],v=[{id:"flag_exception",title:"Flag for Conservator Review",desc:"Quarantine folio in acid-free protective sleeve and attach an anomaly notice for specialized review.",tag:"Specialized Preservation Quarantine"},{id:"file_standard",title:"Standard Catalog Accession",desc:"Accession the folio directly into the general catalog shelves under standard routine processing.",tag:"Routine Shelf Accession"},{id:"defer_review",title:"Hold in Pending Vault",desc:"Hold folio in pending intake storage without accessioning until provenance paperwork arrives.",tag:"Intake Deferral"}];function u(){var h;if(d){i.innerHTML=`
        <div>
          ${r("Part 2: The Fragile Leaf","Handling archival folios across 3 distinct accession decisions.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',goal:"Evaluate the physical condition of 3 folios and decide whether to flag an exception, file standardly, or hold.",steps:["Review the condition notes and physical examination summary for each folio.","Identify whether an anomaly or damage requires specialized conservation.","Select your archival handling recommendation across all 3 trials."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{d=!1,e=0,a=null,u()});return}const l=b[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 2: The Fragile Leaf","Examine the folio condition and select your archival handling recommendation.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Item ${e+1} of 3</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="w-10 h-10 rounded-full bg-amber-100 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] mx-auto mb-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <span class="text-[10px] tracking-widest text-[#bd6f5d] uppercase font-semibold font-mono">${l.stimulus_id} • ${l.type_note}</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-1 font-medium">${l.title}</h3>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mt-2">
            ${l.anomaly_description}
          </p>
        </div>

        <div class="space-y-3 mb-6">
          ${v.map(m=>`
            <div class="a2-opt p-4 bg-white border ${a===m.id?"border-[var(--accent-gold)] bg-amber-50/40 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs rounded-xs" data-action="${m.id}" tabindex="0" role="button">
              <div class="flex justify-between items-start">
                <div class="text-xs font-semibold text-[var(--text-primary)]">${m.title}</div>
                <span class="text-[10px] font-mono text-[var(--accent-gold)] uppercase tracking-wider">${m.tag}</span>
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">${m.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="a2ConfirmBtn" ${a?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<2?"Confirm Handling Decision &rarr;":"Finish Exception Evaluation &rarr;"}
          </button>
        </div>
      </div>
    `,t("item_presented",{trial_index:e,stimulus_id:l.stimulus_id,task_def_version:"1.0"});const o=document.getElementById("a2ConfirmBtn");i.querySelectorAll(".a2-opt").forEach(m=>{const c=g=>{s=g,a=m.getAttribute("data-action"),i.querySelectorAll(".a2-opt").forEach(f=>{f.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40","shadow-xs"),f.classList.add("border-[var(--grid-border)]")}),m.classList.add("border-[var(--accent-gold)]","bg-amber-50/40","shadow-xs"),m.classList.remove("border-[var(--grid-border)]"),o&&(o.disabled=!1)};m.addEventListener("click",()=>c("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),c("keyboard"))})}),o==null||o.addEventListener("click",()=>{t("decision_logged",{trial_index:e,stimulus_id:l.stimulus_id,action_id:a,input_modality:s,task_def_version:"1.0"}),e<2?(e++,a=null,u()):p({mini_game:"A2",observations_count:3})})}u()}function z(i,r,t,p){let d=!0,e=new Set,a=new Set,s="mouse";const b=[{id:"REC_01",title:"Placard 1: Habba Khatoon Folio",text:"Poet: Habba Khatoon | Era: 16th Century | Birthplace: Chandhara (Recorded as: Chanhadra)",note:"Folio Label Verification"},{id:"REC_02",title:"Placard 2: Carved Walnut Pen Box",text:"Artifact: Carved Walnut Calligraphy Pen Box | Dimensions: 24 cm x 6 cm | Medium: Seasoned Walnut",note:"Object Metadata Verification"},{id:"REC_03",title:"Placard 3: River Verse Excerpt",text:`Verse Excerpt: "The river remembers the boatman's song" | Translator: [Not Specified / Blank]`,note:"Folio Label Verification"},{id:"REC_04",title:"Placard 4: Kashmiri Vakh Folio Leaf",text:"Folio Leaf: Kashmiri Vakh Lyric Leaf | Script: Sharda & Persian | Accession: AR-1892",note:"Manuscript Leaf Verification"},{id:"REC_05",title:"Placard 5: Exhibition Opening Notice",text:"Exhibition Opening Reception: February 31st, 2026 | Location: Main Pavilion",note:"Public Schedule Verification"}];function v(){var u,l;if(d){i.innerHTML=`
        <div>
          ${r("Part 3: The Exhibition Ledger","Reviewing 5 exhibition placards for typographical, factual, and omission discrepancies.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',goal:"Carefully proofread all 5 display records. Flag only those with genuine discrepancies or factual errors.",steps:["Examine each display record description in the ledger.","Click or toggle the discrepancy flag on any record containing concrete errors.","Clean records should remain unflagged.","Verify and finalize the exhibition ledger."]})}
        </div>
      `,(u=document.getElementById("startActivityBtn"))==null||u.addEventListener("click",()=>{d=!1,e=new Set,a=new Set,v()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 3: The Exhibition Ledger","Proofread all 5 exhibition records. Flag any record that contains a discrepancy.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">5 Records</span>
        </div>

        <div class="space-y-3.5 mb-6">
          ${b.map((o,h)=>{const m=e.has(o.id);return`
              <div class="record-card p-4 bg-white border ${m?"border-[#bd6f5d] bg-amber-50/20":"border-[var(--grid-border)]"} rounded-xs transition shadow-xs flex items-start justify-between gap-4" data-id="${o.id}" tabindex="0">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-mono text-[var(--accent-gold)] uppercase tracking-wider">${o.id} • ${o.note}</span>
                  </div>
                  <div class="text-xs font-semibold text-[var(--text-primary)]">${o.title}</div>
                  <div class="text-xs text-[var(--text-secondary)] font-mono leading-relaxed bg-[#faf8f5] p-2 border border-[var(--grid-border)]/60 rounded-xs mt-1">
                    ${o.text}
                  </div>
                </div>

                <button type="button" class="toggle-flag-btn px-3 py-2 border text-xs font-mono uppercase tracking-wider shrink-0 transition rounded-xs ${m?"bg-[#bd6f5d] text-white border-[#bd6f5d]":"bg-white text-[var(--text-secondary)] border-[var(--grid-border)] hover:border-[var(--accent-gold)]"}" data-id="${o.id}">
                  ${m?"Discrepancy Flagged":"Flag Discrepancy"}
                </button>
              </div>
            `}).join("")}
        </div>

        <div class="flex justify-end">
          <button id="a3SubmitBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
            Verify & Approve Ledger &rarr;
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".record-card").forEach((o,h)=>{const m=o.getAttribute("data-id"),c=()=>{a.has(m)||(a.add(m),t("record_inspected",{trial_index:h,stimulus_id:m,task_def_version:"1.0"}))};o.addEventListener("focus",c),o.addEventListener("mouseenter",c)}),i.querySelectorAll(".toggle-flag-btn").forEach((o,h)=>{const m=o.getAttribute("data-id"),c=g=>{s=g;const f=!e.has(m);f?e.add(m):e.delete(m),t("discrepancy_toggled",{trial_index:h,stimulus_id:m,flagged_state:f,input_modality:s,task_def_version:"1.0"}),v()};o.addEventListener("click",()=>c("mouse")),o.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),c("keyboard"))})}),(l=document.getElementById("a3SubmitBtn"))==null||l.addEventListener("click",()=>{t("verification_finalized",{action_id:"approve_ledger",input_modality:s,task_def_version:"1.0"}),p({mini_game:"A3",observations_count:b.length})})}v()}function U(i,r){const{appContainer:t,miniGameIndex:p,logEvent:d,onMiniGameComplete:e}=i;switch(p){case 0:Q(t,r,d,e);break;case 1:J(t,r,d,e);break;case 2:K(t,r,d,e);break}}function Q(i,r,t,p){let d=!0,e=0,a=50,s="accommodate",b="mouse",v=null;const u=[{stimulus_id:"F1_T1",title:"Acoustic Note: Reverberant Strain",cue_text:'"The sound in the front row has a sharp treble edge and heavy wall reflection."',default_action:"accommodate"},{stimulus_id:"F1_T2",title:"Acoustic Note: Effortless Resonance",cue_text:'"Acoustics in the center hall are clear; resonance is balanced and effortless."',default_action:"maintain_objective"},{stimulus_id:"F1_T3",title:"Acoustic Note: Quiet Passage",cue_text:'"The speaker is reciting a whisper passage; verse intelligibility is dipping."',default_action:"accommodate"},{stimulus_id:"F1_T4",title:"Acoustic Note: Ambiguous Silence",cue_text:'"A sudden pause in the audio stream — could be dramatic silence or a channel fault."',default_action:"clarify"},{stimulus_id:"F1_T5",title:"Acoustic Note: Balanced Choral",cue_text:'"Choral recitation is balanced and rhythm is completely stable throughout the room."',default_action:"maintain_objective"},{stimulus_id:"F1_T6",title:"Acoustic Note: Projected Forte",cue_text:'"Vocal projection is peaking sharply on dramatic verse accents in the hall."',default_action:"accommodate"}];function l(){var S,I;if(v&&(cancelAnimationFrame(v),v=null),d){i.innerHTML=`
        <div>
          ${r("Part 1: Tuning the Hall","Calibrating the soundscape for the poetry recital across changing acoustic moments.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>',goal:"Observe each acoustic feedback note and adjust your approach accordingly across 6 trials.",steps:["Review the acoustic feedback note from the setup team.","Choose your response approach: Accommodate, Maintain Baseline, or Clarify.","Adjust the acoustic slider if needed, then confirm your setting."]})}
        </div>
      `,(S=document.getElementById("startActivityBtn"))==null||S.addEventListener("click",()=>{d=!1,e=0,a=50,s="accommodate",l()});return}const o=u[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 1: Tuning the Hall","Adjust the acoustic profile to support the recital.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Trial ${e+1} of 6</span>
        </div>

        <!-- Acoustic Dialogue Note -->
        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3 shadow-xs">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${o.title}</div>
            <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${o.cue_text}</div>
          </div>
        </div>

        <!-- Action Approach Selection -->
        <div class="mb-5">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-medium">Select Operational Response:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${s==="accommodate"?"border-[var(--accent-gold)] bg-amber-50/50":"border-[var(--grid-border)] bg-white"}" data-action="accommodate">
              <div class="text-xs font-semibold text-[var(--text-primary)]">Accommodate</div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">Adapt acoustic filter to assist the speaker</div>
            </button>
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${s==="maintain_objective"?"border-[var(--accent-gold)] bg-amber-50/50":"border-[var(--grid-border)] bg-white"}" data-action="maintain_objective">
              <div class="text-xs font-semibold text-[var(--text-primary)]">Maintain Objective</div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">Keep baseline acoustic balance undisturbed</div>
            </button>
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${s==="clarify"?"border-[var(--accent-gold)] bg-amber-50/50":"border-[var(--grid-border)] bg-white"}" data-action="clarify">
              <div class="text-xs font-semibold text-[var(--text-primary)]">Clarify Channel</div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">Verify audio signal before adjusting</div>
            </button>
          </div>
        </div>

        <!-- Interactive Animated Waveform Canvas -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-inner">
          <canvas id="waveCanvas" width="600" height="90" class="w-full h-24 bg-white border border-[var(--grid-border)] mb-4 rounded-xs"></canvas>

          <div class="w-full max-w-md mx-auto">
            <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-600 inline-block"></span> Muted (0)</span>
              <span class="font-mono text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)]" id="sliderValDisplay">${a}</span>
              <span class="flex items-center gap-1">Bright (100) <span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span></span>
            </div>
            <input type="range" id="freqSlider" min="0" max="100" step="5" value="${a}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
          </div>
        </div>

        <div class="flex justify-end">
          <button id="lockFreqBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            ${e<5?"Confirm Setting &rarr;":"Finish Acoustic Calibration &rarr;"}
          </button>
        </div>
      </div>
    `;const h=document.getElementById("waveCanvas"),m=h==null?void 0:h.getContext("2d"),c=document.getElementById("freqSlider"),g=document.getElementById("sliderValDisplay");let f=0;function _(){if(!m||!h)return;m.clearRect(0,0,h.width,h.height),m.strokeStyle="#f0eeea",m.lineWidth=1;for(let C=0;C<h.width;C+=30)m.beginPath(),m.moveTo(C,0),m.lineTo(C,h.height),m.stroke();m.strokeStyle="#bd6f5d",m.lineWidth=2.5,m.beginPath();const k=.015+a/100*.05,B=14+Math.abs(a-50)/50*16;for(let C=0;C<h.width;C++){const P=h.height/2+Math.sin(C*k+f)*B;C===0?m.moveTo(C,P):m.lineTo(C,P)}m.stroke(),f+=.04,v=requestAnimationFrame(_)}_(),i.querySelectorAll(".f1-action-btn").forEach(k=>{k.addEventListener("click",B=>{b="mouse",s=k.getAttribute("data-action"),i.querySelectorAll(".f1-action-btn").forEach(C=>{C.classList.remove("border-[var(--accent-gold)]","bg-amber-50/50"),C.classList.add("border-[var(--grid-border)]","bg-white")}),k.classList.add("border-[var(--accent-gold)]","bg-amber-50/50"),k.classList.remove("border-[var(--grid-border)]","bg-white")})}),c==null||c.addEventListener("input",k=>{b=k.pointerType||"mouse",a=parseInt(k.target.value,10),g&&(g.textContent=a),t("slider_input",{trial_index:e,stimulus_id:o.stimulus_id,slider_position_raw:a,input_modality:b,task_def_version:"1.0"})}),c==null||c.addEventListener("keydown",k=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(k.key)&&(b="keyboard")}),(I=document.getElementById("lockFreqBtn"))==null||I.addEventListener("click",()=>{v&&(cancelAnimationFrame(v),v=null),t("trial_submit",{trial_index:e,stimulus_id:o.stimulus_id,action_id:s,slider_position_raw:a,input_modality:b,task_def_version:"1.0"}),e<5?(e++,a=50,s=u[e].default_action,l()):p({mini_game:"F1",observations_count:6})})}l()}function J(i,r,t,p){let d=!0,e=0,a=null,s="mouse";const b=[{stimulus_id:"F2_T1",speaker_role:"Stage Director",cue_text:'"The reciting poet gestures clearly toward the side monitor speaker, explicitly requesting vocal support."',condition_label:"Direct Request"},{stimulus_id:"F2_T2",speaker_role:"Rehearsal Coordinator",cue_text:'"The speaker pauses mid-line with an uncertain expression; their tone is hesitant but no instruction is given."',condition_label:"Ambiguous Signal"},{stimulus_id:"F2_T3",speaker_role:"Sound Technician",cue_text:'"The performer delivers an impassioned verse with intense strain in their voice, as part of the theatrical performance."',condition_label:"Expressive Intensity"},{stimulus_id:"F2_T4",speaker_role:"Guest Accompanist",cue_text:'"The accompanying percussionist has subtly altered tempo and is watching the reciter intently to re-establish synchrony."',condition_label:"Subtle Drift"}],v=[{id:"act",title:"Act Directly",desc:"Take immediate operational action to adapt sound levels and support the speaker."},{id:"clarify",title:"Clarify Intent",desc:"Seek confirmation or verify the partner’s preference before making changes."},{id:"maintain",title:"Maintain Course",desc:"Preserve the ongoing acoustic cadence without premature intervention."}];function u(){var h;if(d){i.innerHTML=`
        <div>
          ${r("Part 2: The Gathering Voices","Coordinating acoustic clarity with your event colleagues across 4 communication situations.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>',goal:"Evaluate the communication cue in each trial and select whether to act, clarify, or maintain course.",steps:["Read the operational feedback and partner state description.","Assess whether information is clear, ambiguous, or misleading.","Choose your response: Act, Clarify, or Maintain."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{d=!1,e=0,a=null,u()});return}const l=b[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 2: The Gathering Voices","Evaluate the communication situation and choose your course of action.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Trial ${e+1} of 4</span>
        </div>

        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${l.speaker_role}</div>
            <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${l.cue_text}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${v.map(m=>`
            <div class="f2-card p-4 bg-white border ${a===m.id?"border-[var(--accent-gold)] bg-amber-50/40 shadow-sm":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2 rounded-xs" data-action="${m.id}" tabindex="0" role="button">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${a===m.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                ${m.title}
              </div>
              <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${m.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="f2ConfirmBtn" ${a?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            ${e<3?"Confirm Communication &rarr;":"Finish Coordination &rarr;"}
          </button>
        </div>
      </div>
    `;const o=document.getElementById("f2ConfirmBtn");i.querySelectorAll(".f2-card").forEach(m=>{const c=g=>{var f,_;s=g,a=m.getAttribute("data-action"),i.querySelectorAll(".f2-card").forEach(S=>{var I,k;S.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40","shadow-sm"),S.classList.add("border-[var(--grid-border)]"),(I=S.querySelector("span.rounded-full"))==null||I.classList.remove("bg-[var(--accent-gold)]"),(k=S.querySelector("span.rounded-full"))==null||k.classList.add("bg-stone-300")}),m.classList.add("border-[var(--accent-gold)]","bg-amber-50/40","shadow-sm"),m.classList.remove("border-[var(--grid-border)]"),(f=m.querySelector("span.rounded-full"))==null||f.classList.add("bg-[var(--accent-gold)]"),(_=m.querySelector("span.rounded-full"))==null||_.classList.remove("bg-stone-300"),o&&(o.disabled=!1)};m.addEventListener("click",()=>c("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),c("keyboard"))})}),o==null||o.addEventListener("click",()=>{t("trial_submit",{trial_index:e,stimulus_id:l.stimulus_id,action_id:a,input_modality:s,task_def_version:"1.0"}),e<3?(e++,a=null,u()):p({mini_game:"F2",observations_count:4})})}u()}function K(i,r,t,p){let d=!0,e=0,a=50,s="mouse";const b=[{stimulus_id:"F3_T1",venue_name:"Stone Hall",acoustic_shift:"The recitation enters the vaulted stone hall. Stone surfaces generate pronounced high-frequency reverberation.",objective_note:"Constant Objective: Keep recited poetry crisp, clear, and unblurred by the environment."},{stimulus_id:"F3_T2",venue_name:"Carpeted Courtyard",acoustic_shift:"The performance moves to the carpeted inner courtyard. Heavy tapestries and floor coverings deaden natural decay.",objective_note:"Constant Objective: Keep recited poetry crisp, clear, and unblurred by the environment."},{stimulus_id:"F3_T3",venue_name:"Open Colonnade",acoustic_shift:"The performance concludes in the open colonnade. Exterior breeze and open air introduce low-frequency ambient drift.",objective_note:"Constant Objective: Keep recited poetry crisp, clear, and unblurred by the environment."}];function v(){var m,c;if(d){i.innerHTML=`
        <div>
          ${r("Part 3: The Echo of the Room","Adapting acoustics across 3 distinct venue transitions while keeping verse clarity constant.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>',goal:"Maintain the constant objective of vocal clarity as the performance moves through 3 successive environments.",steps:["Notice the acoustic transition notice for the new venue space.","Remember the objective: maintain crisp, intelligible verse.","Adjust the acoustic balance slider for the new space and save."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{d=!1,e=0,a=50,u(),v()});return}const l=b[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 3: The Echo of the Room","Adapt natural acoustics as the performance transitions into a new space.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Transition ${e+1} of 3</span>
        </div>

        <!-- Constant Objective Banner -->
        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>Constant Objective:</strong> Maintain spoken verse clarity and intelligible presence.
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">Venue: ${l.venue_name}</span>
        </div>

        <!-- Venue Transition Notice -->
        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${l.venue_name} Acoustic Shift</div>
            <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${l.acoustic_shift}</div>
          </div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-inner">
          <div class="w-full max-w-md mx-auto">
            <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
              <span class="font-medium text-stone-700">Crisp Direct (0%)</span>
              <span class="font-mono text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)]" id="hallValDisplay">${a}%</span>
              <span class="font-medium text-stone-700">Open Ambient (100%)</span>
            </div>
            <input type="range" id="hallSlider" min="0" max="100" step="5" value="${a}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
          </div>
        </div>

        <div class="flex justify-end">
          <button id="f3LockBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            ${e<2?"Save Transition Setting &rarr;":"Finalize Acoustic Adaptation &rarr;"}
          </button>
        </div>
      </div>
    `;const o=document.getElementById("hallSlider"),h=document.getElementById("hallValDisplay");o==null||o.addEventListener("input",g=>{s=g.pointerType||"mouse",a=parseInt(g.target.value,10),h&&(h.textContent=`${a}%`),t("slider_input",{trial_index:e,stimulus_id:l.stimulus_id,slider_position_raw:a,input_modality:s,task_def_version:"1.0"})}),o==null||o.addEventListener("keydown",g=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(g.key)&&(s="keyboard")}),(c=document.getElementById("f3LockBtn"))==null||c.addEventListener("click",()=>{t("trial_submit",{trial_index:e,stimulus_id:l.stimulus_id,action_id:"update_acoustic_balance",slider_position_raw:a,input_modality:s,task_def_version:"1.0"}),e<2?(e++,a=50,u(),v()):p({mini_game:"F3",observations_count:3})})}function u(){const l=b[e];t("transition_presented",{trial_index:e,stimulus_id:l.stimulus_id,venue:l.venue_name,task_def_version:"1.0"})}v()}function Y(i,r){const{appContainer:t,miniGameIndex:p,logEvent:d,onMiniGameComplete:e}=i;switch(p){case 0:X(t,r,d,e);break;case 1:Z(t,r,d,e);break;case 2:ee(t,r,d,e);break}}function X(i,r,t,p){let d=!0,e=0,a=0,s="mouse";const b=[{stimulus_id:"C1_R1",title:"Round 1: Partner Mosaic Deficit",description:"Your partner’s workstation is short by 3 tiles to complete their mosaic panel. You have 8 tiles.",partner_initial:2,user_initial:8,default_transfer:0,context_note:"Partner Deficit Condition"},{stimulus_id:"C1_R2",title:"Round 2: Balanced Mosaic Workstation",description:"Both you and your partner have adequate supplies (5 tiles each) to complete your respective panels.",partner_initial:5,user_initial:5,default_transfer:0,context_note:"Balanced Need Condition"},{stimulus_id:"C1_R3",title:"Round 3: Partner Surplus Control",description:"Your partner already has an excess of materials (8 tiles) for their section, while you have 5 tiles.",partner_initial:8,user_initial:5,default_transfer:0,context_note:"Surplus / No-Need Control"}];function v(){var m,c,g,f;if(d){i.innerHTML=`
        <div>
          ${r("Part 1: The Artisan's Basket","Coordinating ceramic mosaic supplies with your workshop partner across 3 distinct inventory situations.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',goal:"Evaluate the inventory needs in each round and decide how many tiles (if any) to transfer from your basket.",steps:["Check both workstations to see if materials are in deficit, balanced, or surplus.","Use the + / - buttons to set your transfer count.","Confirm your distribution for each of the 3 rounds."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{d=!1,e=0,a=0,u(),v()});return}const l=b[e],o=l.partner_initial+a,h=l.user_initial-a;i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 1: The Artisan's Basket","Review workstation requirements and allocate tiles appropriately.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Round ${e+1} of 3</span>
        </div>

        <!-- Situation Banner -->
        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${l.title}:</strong> ${l.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${l.context_note}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-[var(--accent-gold)] uppercase font-semibold tracking-wider font-mono">Partner Basket</span>
              <div class="text-xl font-serif font-semibold text-[#bd6f5d] mt-1">${o} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0,o)).fill('<div class="w-4 h-4 bg-[#bd6f5d]/70 rounded-xs shadow-xs"></div>').join("")}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-emerald-700 uppercase font-semibold tracking-wider font-mono">Your Basket</span>
              <div class="text-xl font-serif font-semibold text-emerald-800 mt-1">${h} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0,h)).fill('<div class="w-4 h-4 bg-emerald-700/70 rounded-xs shadow-xs"></div>').join("")}
              </div>
            </div>
          </div>

          <div class="text-center pt-2 border-t border-[var(--grid-border)]">
            <div class="text-xs text-[var(--text-secondary)] mb-3 font-medium">Tiles to transfer to partner:</div>
            <div class="flex justify-center items-center gap-4">
              <button type="button" id="minusTileBtn" class="w-10 h-10 rounded-xs bg-white border border-[var(--grid-border)] text-lg font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs" tabindex="0">-</button>
              <span id="transferCount" class="font-serif text-3xl font-semibold text-[var(--accent-gold)] w-10 text-center">${a}</span>
              <button type="button" id="plusTileBtn" class="w-10 h-10 rounded-xs bg-white border border-[var(--grid-border)] text-lg font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs" tabindex="0">+</button>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmTransferBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
            ${e<2?"Confirm Allocation &rarr;":"Finish Resource Distribution &rarr;"}
          </button>
        </div>
      </div>
    `,(c=document.getElementById("minusTileBtn"))==null||c.addEventListener("click",()=>{s="mouse",a>0&&(a--,t("resource_transferred",{trial_index:e,stimulus_id:l.stimulus_id,delta:-1,action_type:"return_to_user",input_modality:s,task_def_version:"1.0"}),v())}),(g=document.getElementById("plusTileBtn"))==null||g.addEventListener("click",()=>{s="mouse",a<l.user_initial&&(a++,t("resource_transferred",{trial_index:e,stimulus_id:l.stimulus_id,delta:1,action_type:"transfer_to_partner",input_modality:s,task_def_version:"1.0"}),v())}),(f=document.getElementById("confirmTransferBtn"))==null||f.addEventListener("click",()=>{t("allocation_confirmed",{trial_index:e,stimulus_id:l.stimulus_id,input_modality:s,task_def_version:"1.0"}),e<2?(e++,a=0,u(),v()):p({mini_game:"C1",observations_count:3})})}function u(){const l=b[e];t("round_presented",{trial_index:e,stimulus_id:l.stimulus_id,input_modality:s,task_def_version:"1.0"})}v()}function Z(i,r,t,p){let d=!0,e=0,a=null,s="mouse";const b=[{stimulus_id:"C2_R1",title:"Round 1: Open Wall Turn",partner_desc:"Partner has hung their painting on the Upper Left (North) cluster.",slots:[{id:"SLOT_NORTH_RIGHT",label:"Upper Right (Balanced Spacing)"},{id:"SLOT_OVERLAP_LEFT",label:"Adjacent Left (Tight Cluster)"},{id:"SLOT_BOTTOM_CENTER",label:"Lower Center (Vertical Complement)"}]},{stimulus_id:"C2_R2",title:"Round 2: Restricted Wall Space",partner_desc:"Partner is framing the Center Hallway; central corridor clearance must remain open.",slots:[{id:"SLOT_PERIMETER_EAST",label:"East Perimeter (Clear Corridor)"},{id:"SLOT_CENTER_ADJACENT",label:"Center Blocking Slot (Crowds Hallway)"},{id:"SLOT_PERIMETER_WEST",label:"West Perimeter (Clear Corridor)"}]},{stimulus_id:"C2_R3",title:"Round 3: Dynamic Canvas Adjustment",partner_desc:"Partner shifted their composition toward the Lower (South) exhibition area.",slots:[{id:"SLOT_UPPER_GALLERY",label:"Upper Wall (Restores Bilateral Balance)"},{id:"SLOT_LOWER_CONGESTED",label:"Lower Wall (Overcrowds South)"},{id:"SLOT_MID_SIDE",label:"Mid-Side Niche (Neutral Position)"}]}];function v(){var o,h;if(d){i.innerHTML=`
        <div>
          ${r("Part 2: The Gallery Wall","Coordinating artwork hanging positions across 3 spatial layout rounds.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>',goal:"Select an artwork hanging slot in each round that complements your partner’s arrangement without interference.",steps:["Review your colleague’s hung piece and the layout state in each round.","Inspect the available placement slots on the wall.","Confirm your chosen position across all 3 rounds."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{d=!1,e=0,a=null,u(),v()});return}const l=b[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 2: The Gallery Wall","Coordinate placement with your partner’s artwork.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Round ${e+1} of 3</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${l.title}:</strong> ${l.partner_desc}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${l.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="w-full bg-white border border-[var(--grid-border)] p-6 rounded-xs shadow-inner mb-4">
            <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Available Wall Placement Slots:</div>
            <div class="flex flex-col gap-2.5">
              ${l.slots.map(m=>`
                <button type="button" class="slot-btn px-4 py-3 text-xs border rounded-xs ${a===m.id?"border-[var(--accent-gold)] bg-amber-50 font-semibold shadow-xs":"border-[var(--grid-border)] bg-white hover:border-[var(--accent-gold)]"} transition flex items-center justify-between" data-slot="${m.id}" tabindex="0">
                  <span class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${a===m.id?"bg-[var(--accent-gold)] text-white":"text-stone-400"}">${a===m.id?"✓":""}</span>
                    <span class="text-[var(--text-primary)]">${m.label}</span>
                  </span>
                  <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${m.id}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmWallBtn" ${a?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<2?"Confirm Placement &rarr;":"Finish Wall Coordination &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".slot-btn").forEach(m=>{const c=g=>{s=g,a=m.getAttribute("data-slot"),t("placement_attempted",{trial_index:e,stimulus_id:l.stimulus_id,slot_id:a,input_modality:s,task_def_version:"1.0"}),v()};m.addEventListener("click",()=>c("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),c("keyboard"))})}),(h=document.getElementById("confirmWallBtn"))==null||h.addEventListener("click",()=>{t("placement_confirmed",{trial_index:e,stimulus_id:l.stimulus_id,chosen_slot:a,input_modality:s,task_def_version:"1.0"}),e<2?(e++,a=null,u(),v()):p({mini_game:"C2",observations_count:3})})}function u(){const l=b[e];t("round_presented",{trial_index:e,stimulus_id:l.stimulus_id,task_def_version:"1.0"})}v()}function ee(i,r,t,p){let d=!0,e=0,a=null,s=null,b="mouse";const v=[{stimulus_id:"C3_R1",title:"Opportunity 1: Partner Circuit Breakdown",partner_state:"Partner’s exhibition lantern circuit has gone dark due to an electrical conduit misalignment.",condition_type:"identify_and_repair",fault_options:[{id:"fault_conduit_disconnected",label:"Conduit feeder disconnected at terminal block"},{id:"fault_bulb_broken",label:"Bulb filament shattered"},{id:"fault_switch_off",label:"Main pavilion master switch is turned off"}],repair_options:[{id:"adjust_conduit",label:"Realight conduit terminal and secure ground clamp"},{id:"call_help_desk",label:"Click general help desk button"},{id:"replace_lantern",label:"Dismantle lantern fixture"}],execution_action:"restore_power"},{stimulus_id:"C3_R2",title:"Opportunity 2: Hanging Rig Counterweight Jam",partner_state:"Partner’s ceiling suspension cable is jammed in the pulley guide, preventing joint panel alignment.",condition_type:"identify_and_repair",fault_options:[{id:"fault_cable_pulley_pinch",label:"Suspension cable wedged between pulley wheel and guide bracket"},{id:"fault_cable_snapped",label:"Counterweight line severed completely"},{id:"fault_wall_anchor_loose",label:"Wall anchor bolt loosened"}],repair_options:[{id:"reseat_pulley_cable",label:"Release tension lever and reseat cable into center pulley groove"},{id:"call_facility_maintenance",label:"Log generic facility maintenance request ticket"},{id:"force_pull_cable",label:"Yank cable forcefully downward"}],execution_action:"align_panel_height"},{stimulus_id:"C3_R3",title:"Opportunity 3: Shadow Corridor Obstruction",partner_state:"Partner’s painting is obscured by an accidental spotlight shadow barrier.",condition_type:"identify_and_repair",fault_options:[{id:"fault_blindspot_obstruction",label:"Spotlight angle obstructed by movable partition"},{id:"fault_color_distortion",label:"Color temperature mismatched"}],repair_options:[{id:"shift_lantern",label:"Re-angle spotlight beam 30 degrees to bypass obstruction"},{id:"generic_complaint",label:"Submit generic lighting complaint ticket"}],execution_action:"illuminate_path"}];function u(){var h,m;if(d){i.innerHTML=`
        <div>
          ${r("Part 3: The Dual Lanterns","Diagnosing and repairing collaborative workflow breakdowns across 3 exhibition situations.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',goal:"Collaboratively repair workflow breakdowns: identify the specific issue, perform a useful repair action, and execute the fix.",steps:["Examine the operational situation in each opportunity.","Identify the breakdown root cause (or recognize clean balance).","Select a constructive repair action and execute the solution."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{d=!1,e=0,a=null,s=null,l(),u()});return}const o=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 3: The Dual Lanterns","Resolve operational breakdowns to maintain joint exhibition harmony.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Opportunity ${e+1} of 3</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${o.title}:</strong> ${o.partner_state}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${o.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <!-- Step 1: Identify Breakdown -->
          <div class="mb-5">
            <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2">
              Step 1: Identify the Operational Breakdown
            </div>
            <div class="space-y-2">
              ${o.fault_options.map(c=>`
                <div class="fault-opt p-3 bg-white border ${a===c.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center gap-2" data-fault="${c.id}" tabindex="0" role="button">
                  <span class="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px] ${a===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${a===c.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)]">${c.label}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Step 2: Perform Constructive Repair -->
          ${a?`
            <div class="mb-5 pt-4 border-t border-[var(--grid-border)] animate-fadeIn">
              <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                Step 2: Perform Constructive Repair Action
              </div>
              <div class="space-y-2">
                ${o.repair_options.map(c=>`
                  <div class="repair-opt p-3 bg-white border ${s===c.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center gap-2" data-repair="${c.id}" tabindex="0" role="button">
                    <span class="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px] ${s===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${s===c.id?"✓":""}</span>
                    <span class="text-[var(--text-primary)]">${c.label}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          `:""}
        </div>

        <div class="flex justify-end">
          <button type="button" id="executeRepairBtn" ${a&&s?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<2?"Execute Repair & Proceed &rarr;":"Finalize Joint Repair &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".fault-opt").forEach(c=>{const g=f=>{b=f,a=c.getAttribute("data-fault"),t("breakdown_identified",{trial_index:e,stimulus_id:o.stimulus_id,fault_id:a,input_modality:b,task_def_version:"1.0"}),u()};c.addEventListener("click",()=>g("mouse")),c.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g("keyboard"))})}),i.querySelectorAll(".repair-opt").forEach(c=>{const g=f=>{b=f,s=c.getAttribute("data-repair"),t("repair_action_performed",{trial_index:e,stimulus_id:o.stimulus_id,repair_action_id:s,input_modality:b,task_def_version:"1.0"}),u()};c.addEventListener("click",()=>g("mouse")),c.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g("keyboard"))})}),(m=document.getElementById("executeRepairBtn"))==null||m.addEventListener("click",()=>{t("repaired_action_executed",{trial_index:e,stimulus_id:o.stimulus_id,fault_id:a,repair_action_id:s,execution_action_id:o.execution_action,input_modality:b,task_def_version:"1.0"}),e<2?(e++,a=null,s=null,l(),u()):p({mini_game:"C3",observations_count:3})})}function l(){const o=v[e];t("repair_presented",{trial_index:e,stimulus_id:o.stimulus_id,task_def_version:"1.0"})}u()}function te(i,r){const{appContainer:t,miniGameIndex:p,logEvent:d,onMiniGameComplete:e}=i;switch(p){case 0:ie(t,r,d,e);break;case 1:ae(t,r,d,e);break;case 2:re(t,r,d,e);break}}function ie(i,r,t,p){let d=!0,e=0,a="mouse";const s=[{stimulus_id:"E1_T1",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T2",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T3",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T4",color:"Sage",shape:"Square",icon:"&#9632;",label:"Sage Square"},{stimulus_id:"E1_T5",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T6",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T7",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T8",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T9",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"}];function b(){var l;if(d){i.innerHTML=`
        <div>
          ${r("Part 1: The Ceramic Mosaic","Sorting geometric tiles into exhibition bins across 9 successive sorting opportunities.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>',goal:"Observe each ceramic tile and assign it to the matching container.",steps:["Examine the stimulus tile presented on the central easel.","Choose Container 1 or Container 2 based on pattern correspondence.","Sort all 9 tiles to complete the series."]})}
        </div>
      `,(l=document.getElementById("startActivityBtn"))==null||l.addEventListener("click",()=>{d=!1,e=0,performance.now(),v(),b()});return}const u=s[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 1: The Ceramic Mosaic","Sort each mosaic tile into the appropriate exhibition container.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Tile ${e+1} of ${s.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>Mosaic Stage:</strong> Determine the matching container for the presented tile.
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${u.stimulus_id}</span>
        </div>

        <!-- Stimulus Presentation Area -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="text-5xl mb-2.5 transition-transform hover:scale-105 ${u.color==="Gold"?"text-[var(--accent-gold)]":"text-emerald-700"}">
            ${u.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${u.label}</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1 font-mono uppercase">${u.color} &bull; ${u.shape}</div>
        </div>

        <!-- Static Reference Containers (No Dynamic Relabeling) -->
        <div class="grid grid-cols-2 gap-4">
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 active:scale-98 transition text-center shadow-xs rounded-xs" data-choice="container_1" tabindex="0">
            <span class="text-2xl text-[var(--accent-gold)] block mb-1">&#9679;</span>
            <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 1</span>
            <span class="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-mono">Reference: Gold Circle</span>
          </button>
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 active:scale-98 transition text-center shadow-xs rounded-xs" data-choice="container_2" tabindex="0">
            <span class="text-2xl text-emerald-800 block mb-1">&#9632;</span>
            <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 2</span>
            <span class="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-mono">Reference: Sage Square</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".bin-btn").forEach(o=>{const h=m=>{a=m;const c=o.getAttribute("data-choice");t("tile_sorted",{trial_index:e,stimulus_id:u.stimulus_id,choice:c,input_modality:a,task_def_version:"1.0"}),e<s.length-1?(e++,performance.now(),v(),b()):p({mini_game:"E1",observations_count:9})};o.addEventListener("click",()=>h("mouse")),o.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),h("keyboard"))})})}function v(){const u=s[e];t("trial_presented",{trial_index:e,stimulus_id:u.stimulus_id,tile_color:u.color,tile_shape:u.shape,task_def_version:"1.0"})}b()}function ae(i,r,t,p){let d=!0,e=0,a=null,s="mouse";const b=[{stimulus_id:"E2_S1",title:"Sequence 1: Workspace Pigment Spill",situation:"A sudden ink droplet spilled across your active workstation layout card.",has_disruption:!0,disruption_type:"ink_spill_masking_workspace",options:[{id:"clear_workspace",label:"Dab spill with blotting linen and realign layout card",note:"Constructive recovery action"},{id:"rush_uncleaned",label:"Continue assembly without cleaning around the smudge",note:"Rushed compromise"},{id:"pause_idle",label:"Step away from the bench to wait for guidance",note:"Passive hesitation"}]},{stimulus_id:"E2_S2",title:"Sequence 2: Calm Working Cadence",situation:"The work area is undisturbed, materials are organized, and light is balanced.",has_disruption:!1,disruption_type:"undisrupted_control",options:[{id:"standard_sequence",label:"Proceed with planned standard mosaic montage sequence",note:"Standard constructive cadence"},{id:"unnecessary_rework",label:"Disassemble existing tiles to verify underlayer unnecessarily",note:"Unneeded re-examination"},{id:"pause_idle",label:"Pause activity to double-check surroundings",note:"Passive delay"}]},{stimulus_id:"E2_S3",title:"Sequence 3: Courtyard Draft Disruption",situation:"A courtyard breeze displaced your paper reference template off the table.",has_disruption:!0,disruption_type:"draft_blows_reference_card",options:[{id:"stabilize_reference",label:"Retrieve reference card and secure it with corner stone weight",note:"Constructive securing action"},{id:"guess_motif",label:"Continue placing tiles from rough memory without the template",note:"Unanchored improvisation"},{id:"pause_idle",label:"Wait for indoor air current to settle",note:"Passive hesitation"}]},{stimulus_id:"E2_S4",title:"Sequence 4: Misplaced Ceramic Tray",situation:"The neighboring glaze palette was nudged, obstructing your primary tool rest.",has_disruption:!0,disruption_type:"misplaced_pigment_tray",options:[{id:"reposition_tray",label:"Gently shift the neighboring palette back onto its runner",note:"Constructive realignment"},{id:"use_wrong_shade",label:"Work around the obstruction in an awkward wrist posture",note:"Rushed ergonomic compromise"},{id:"pause_idle",label:"Stop work until the assistant returns",note:"Passive hesitation"}]}];function v(){var o,h;if(d){i.innerHTML=`
        <div>
          ${r("Part 2: The Courtyard Setup","Managing operational adjustments and studio setbacks across 4 workshop sequences.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',goal:"Respond constructively to workshop situations and unexpected physical adjustments.",steps:["Review the atelier situation presented in each sequence.","Evaluate the 3 response options.","Select your constructive operational response across all 4 sequences."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{d=!1,e=0,a=null,u(),v()});return}const l=b[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 2: The Courtyard Setup","Select the appropriate constructive operational response.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Sequence ${e+1} of ${b.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${l.title}:</strong> ${l.situation}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${l.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Available Operational Responses:</div>
          <div class="space-y-3">
            ${l.options.map(m=>`
              <div class="e2-opt p-4 bg-white border ${a===m.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-action="${m.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${a===m.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${a===m.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${m.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${m.note}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmE2Btn" ${a?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<b.length-1?"Confirm Response &rarr;":"Finish Setup Sequences &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".e2-opt").forEach(m=>{const c=g=>{s=g,a=m.getAttribute("data-action"),t("action_selected",{trial_index:e,stimulus_id:l.stimulus_id,action_id:a,input_modality:s,task_def_version:"1.0"}),v()};m.addEventListener("click",()=>c("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),c("keyboard"))})}),(h=document.getElementById("confirmE2Btn"))==null||h.addEventListener("click",()=>{t("sequence_completed",{trial_index:e,stimulus_id:l.stimulus_id,chosen_action:a,input_modality:s,task_def_version:"1.0"}),e<b.length-1?(e++,a=null,u(),v()):p({mini_game:"E2",observations_count:4})})}function u(){const l=b[e];t("sequence_presented",{trial_index:e,stimulus_id:l.stimulus_id,has_disruption:l.has_disruption,disruption_type:l.disruption_type,task_def_version:"1.0"})}v()}function re(i,r,t,p){let d=!0,e=0,a=null,s="mouse";const b=[{stimulus_id:"E3_C1",title:"Condition 1: Full Tri-Tone Palette",constraint_state:"standard_three_color_palette",description:"Standard studio conditions: gold, sage, and terracotta pigments are all available on the bench.",options:[{id:"standard_layout",label:"Balanced Tri-Tone Motif (Symmetrical triad placement)"},{id:"tonal_adaptation",label:"Monochrome Grayscale Contrast (Single shade emphasis)"},{id:"compact_adaptation",label:"Half-Grid High Density Compression"}]},{stimulus_id:"E3_C2",title:"Condition 2: Monochrome Indigo Restriction",constraint_state:"monochrome_indigo_only",description:"Material restriction: only single indigo pigment is available; contrast must be achieved through tonal density.",options:[{id:"tonal_adaptation",label:"Tonal Value Gradient (Depth through hatching and value density)"},{id:"standard_layout",label:"Attempt Tri-Color Separation (Incompatible with single pigment)"},{id:"compact_adaptation",label:"Compressed Stamp Layout"}]},{stimulus_id:"E3_C3",title:"Condition 3: Constricted Border Grid",constraint_state:"boundary_constricted_half_grid",description:"Spatial constraint: available wall boundary is reduced to half-width; artwork must be scaled to compact dimensions.",options:[{id:"compact_adaptation",label:"Compact Geometric Scaling (Dense micro-mosaic adaptation)"},{id:"standard_layout",label:"Standard Wide Layout (Exceeds constricted boundary)"},{id:"tonal_adaptation",label:"Unscaled Shading Layout"}]}];function v(){var o,h;if(d){i.innerHTML=`
        <div>
          ${r("Part 3: The Shifting Medium","Adapting aesthetic compositions across 3 shifting environmental constraints.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>',goal:"Adapt your mosaic design strategy to match the shifting environmental conditions while maintaining aesthetic harmony.",steps:["Examine the active studio constraints in each transition.","Choose the layout adaptation best aligned with the constraints.","Confirm your composition across all 3 transitions."]})}
        </div>
      `,(o=document.getElementById("startActivityBtn"))==null||o.addEventListener("click",()=>{d=!1,e=0,a=null,u(),v()});return}const l=b[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 3: The Shifting Medium","Adapt composition strategy to active constraint requirements.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Condition ${e+1} of ${b.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${l.title}:</strong> ${l.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${l.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Composition Adaptation Strategies:</div>
          <div class="space-y-3">
            ${l.options.map(m=>`
              <div class="e3-opt p-4 bg-white border ${a===m.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-layout="${m.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${a===m.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${a===m.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${m.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${m.id}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmE3Btn" ${a?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<b.length-1?"Confirm Adaptation &rarr;":"Finish World 4 &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".e3-opt").forEach(m=>{const c=g=>{s=g,a=m.getAttribute("data-layout"),t("composition_action_attempted",{trial_index:e,stimulus_id:l.stimulus_id,action_id:a,input_modality:s,task_def_version:"1.0"}),v()};m.addEventListener("click",()=>c("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),c("keyboard"))})}),(h=document.getElementById("confirmE3Btn"))==null||h.addEventListener("click",()=>{t("composition_confirmed",{trial_index:e,stimulus_id:l.stimulus_id,chosen_action:a,input_modality:s,task_def_version:"1.0"}),e<b.length-1?(e++,a=null,u(),v()):p({mini_game:"E3",observations_count:3})})}function u(){const l=b[e];t("condition_presented",{trial_index:e,stimulus_id:l.stimulus_id,constraint_state:l.constraint_state,task_def_version:"1.0"})}v()}function ne(i,r){const{appContainer:t,miniGameIndex:p,logEvent:d,onMiniGameComplete:e}=i;switch(p){case 0:se(t,r,d,e);break;case 1:oe(t,r,d,e);break;case 2:de(t,r,d,e);break}}function se(i,r,t,p){let d=!0,e=0,a=null,s={},b="mouse";const v=[{stimulus_id:"Q1_D1",title:"Item 1: Antique Illuminated Manuscript Folio",scenario:"Determine the conservation binding strategy for a 19th-century gold-leaf manuscript.",options:[{id:"flexible_cord_binding",label:"Sewn Flexible Cord Binding (Accommodates fragile spine)"},{id:"tight_adhesive_clamp",label:"Rigid Resin Adhesive Clamp (Heavy structural hold)"},{id:"unbound_portfolio",label:"Unbound Archival Enclosure (Stored as loose leaves)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Calligraphy Binding Technique",info_value:"high",summary:"Traditional Srinagar binders utilized loose vegetable-tanned goat cords to allow spine flexing without fracturing gold leaf borders."},{id:"OPT_CONTROL_1",topic:"Catalog Inventory Stamp Dates",info_value:"low",summary:"Standard inventory accession stamps were introduced in colonial municipal records in October 1888."}]},{stimulus_id:"Q1_D2",title:"Item 2: Papier-Mâché Pen Case (Qalamdan)",scenario:"Select the surface curing and stabilization treatment for an heirloom lacquer case.",options:[{id:"curing_linseed_glaze",label:"Cold-Pressed Linseed Oil & Amber Varnish Curing"},{id:"quick_synthetic_seal",label:"Rapid Synthetic Acrylic Spray"},{id:"wax_buff_only",label:"Dry Carnauba Wax Buffing"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Papier-Mâché Lacquer Curing",info_value:"high",summary:"Slow solar drying combined with natural amber copal preserves organic earth pigments without clouding fine miniature brushwork."},{id:"OPT_CONTROL_2",topic:"Storage Cabinet Hinge Repairs",info_value:"low",summary:"Brass cabinet hinges require tallow lubrication twice annually to prevent creaking."}]},{stimulus_id:"Q1_D3",title:"Item 3: Workshop Ledger Attribution",scenario:"Classify the workshop provenance category for an undated Persian artisan register.",options:[{id:"guild_ledger_verified",label:"Official Guild Registry (Guildmaster seal entry)"},{id:"private_merchant_tally",label:"Informal Merchant Trade Tally"},{id:"state_excise_record",label:"Royal Treasury Revenue Record"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Calligraphy Binding Technique",info_value:"high",summary:"Binding stitches using dyed crimson thread typically indicate official royal artisan guild registers."},{id:"OPT_CONTROL_1",topic:"Catalog Inventory Stamp Dates",info_value:"low",summary:"Tax stamps are cataloged under Series B filing codes."}]},{stimulus_id:"Q1_D4",title:"Item 4: Botanical Pigment Specimen Jars",scenario:"Specify long-term climate preservation for delicate indigo and saffron plant extracts.",options:[{id:"dark_vented_cedar_chest",label:"Dark Cedar Cabinet with Moisture Buffers"},{id:"ambient_glass_display",label:"Unfiltered Daylight Gallery Vitrine"},{id:"sealed_vacuum_capsule",label:"Hermetic Zero-Humidity Chamber"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Organic Pigment Preservation",info_value:"high",summary:"Saffron and wild indigo degrade rapidly under ultraviolet exposure; cedarwood oils provide natural insect deterrence."},{id:"OPT_CONTROL_2",topic:"Storage Cabinet Hinge Repairs",info_value:"low",summary:"Cabinet shelves are load-rated for 25 kilograms."}]}];function u(){var h,m;if(d){i.innerHTML=`
        <div>
          ${r("Part 1: The Curatorial Dossier","Making 4 preservation cataloging decisions with optional archival reference dossiers.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',goal:"Make required cataloging decisions for 4 archival artifacts. You may voluntarily inspect optional reference notes at your discretion.",steps:["Examine the archival artifact and decision question.","Optionally review reference research notes if desired.","Select and confirm your curatorial decision for each of the 4 items."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{d=!1,e=0,a=null,l(),u()});return}const o=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 1: The Curatorial Dossier","Evaluate the cataloging decision. Reference notes are available below.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Decision ${e+1} of ${v.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${o.title}:</strong> ${o.scenario}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${o.stimulus_id}</span>
        </div>

        <!-- Optional Reference Resources Area (Voluntary) -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-xs">
          <div class="text-[10px] uppercase font-mono text-[var(--accent-gold)] font-semibold tracking-wider mb-2.5 flex items-center justify-between">
            <span>Optional Archival Reference Notes (Voluntary Consultation)</span>
            <span class="text-[9px] text-[var(--text-secondary)]">Click to expand notes</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            ${o.optional_resources.map(c=>`
              <div class="opt-res-card p-3 bg-white border ${s[c.id]?"border-[var(--accent-gold)] bg-amber-50/30":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs" data-res="${c.id}">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    ${c.topic}
                  </span>
                  <span class="text-[9px] font-mono uppercase text-[var(--text-secondary)]">${s[c.id]?"Read":"Inspect"}</span>
                </div>
                ${s[c.id]?`<p class="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--grid-border)] pt-2 animate-fadeIn">${c.summary}</p>`:""}
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Required Decision Options -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Curatorial Actions:</div>
          <div class="space-y-2.5">
            ${o.options.map(c=>`
              <div class="q1-opt p-3.5 bg-white border ${a===c.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-choice="${c.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${a===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${a===c.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${c.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${c.id}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmQ1Btn" ${a?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<v.length-1?"Confirm Decision &rarr;":"Finish Curatorial Decisions &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".opt-res-card").forEach(c=>{c.addEventListener("click",()=>{b="mouse";const g=c.getAttribute("data-res");s[g]=!0,t("optional_resource_viewed",{trial_index:e,stimulus_id:o.stimulus_id,resource_id:g,input_modality:b,task_def_version:"1.0"}),u()})}),i.querySelectorAll(".q1-opt").forEach(c=>{const g=f=>{b=f,a=c.getAttribute("data-choice"),u()};c.addEventListener("click",()=>g("mouse")),c.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g("keyboard"))})}),(m=document.getElementById("confirmQ1Btn"))==null||m.addEventListener("click",()=>{t("decision_submitted",{trial_index:e,stimulus_id:o.stimulus_id,choice:a,input_modality:b,task_def_version:"1.0"}),e<v.length-1?(e++,a=null,s={},l(),u()):p({mini_game:"Q1",observations_count:4})})}function l(){const o=v[e];t("decision_presented",{trial_index:e,stimulus_id:o.stimulus_id,task_def_version:"1.0"})}u()}function oe(i,r,t,p){let d=!0,e=0,a={},s=null,b="mouse";const v=[{stimulus_id:"Q2_T1",artifact_id:"manuscript_seal_1",title:"Relic 1: Wax Intaglio Seal on Vellum",description:"A dark carmine wax impression affixed to a vellum legal testament.",uncertainty_level:"moderate",expected_value:"high",clues:[{id:"CLUE_SEAL_INTAGLIO",label:"Intaglio Border Latin/Urdu Script",detail:"Identifies the imperial registrar stamp in Srinagar, dated roughly 1862."},{id:"CLUE_WAX_RESIN",label:"Resin and Lac Specimen Analysis",detail:"Shellac composition matches Himalayan pine resins rather than imported European seals."},{id:"CLUE_PARCHMENT_GRAIN",label:"Vellum Animal Grain Pattern",detail:"High-altitude goat skin with characteristic hand-scraped follicle margins."}],attributions:[{id:"attr_imperial_registrar_srinagar",label:"Imperial Registrar of Srinagar (1860s)"},{id:"attr_commercial_trader",label:"Commercial River Trader Manifest"},{id:"attr_modern_reproduction",label:"Late Twentieth Century Replica"}]},{stimulus_id:"Q2_T2",artifact_id:"ciphered_marginalia_2",title:"Relic 2: Ciphered Marginalia Folio",description:"Hand-written marginalia in an unfamiliar cursive cipher along the margins of an astronomy chart.",uncertainty_level:"high",expected_value:"high",clues:[{id:"CLUE_CIPHER_DIACRITIC",label:"Abjad Numerical Cryptography Marks",detail:"Ciphers decode to chronogram dates recording a solar eclipse in 1845."},{id:"CLUE_SCRIBE_HAND",label:"Cursive Calligraphic Flourish",detail:"Matches the private notebooks of court astrologer Mir Habib."},{id:"CLUE_GALL_INK_CORROSION",label:"Iron Gall Ink Vitriol Depth",detail:"Shows genuine chemical paper oxidation consistent with 180 years of aging."}],attributions:[{id:"attr_court_astrologer_notebook",label:"Court Astrologer Private Ephemeris"},{id:"attr_apothecary_recipe",label:"Herbalist Compound Recipe"},{id:"attr_random_scribble",label:"Unattributed Scribe Practice Marks"}]},{stimulus_id:"Q2_T3",artifact_id:"standard_receipt_3",title:"Relic 3: Uniform Municipal Tax Receipt (Control)",description:"A pre-printed municipal toll collection slip with printed column borders.",uncertainty_level:"low",expected_value:"low_control",clues:[{id:"CLUE_PRINT_TYPE",label:"Standard Moveable Type Lettering",detail:"Common mass-printed municipal transit form with no unique historical variance."},{id:"CLUE_STAMP_INK",label:"Blue Aniline Office Stamp",detail:"Routine commercial municipal ink with standard serial numbering."}],attributions:[{id:"attr_standard_tax_slip",label:"Standard Municipal Transit Receipt"},{id:"attr_royal_chancery_grant",label:"Royal Chancery Land Grant"},{id:"attr_secret_monastery_order",label:"Monastic Passage Certificate"}]},{stimulus_id:"Q2_T4",artifact_id:"unknown_crest_impression_4",title:"Relic 4: Embossed Paper Falcon Crest",description:"A relief-embossed paper emblem showing a falcon perched above mountain peaks.",uncertainty_level:"high",expected_value:"moderate",clues:[{id:"CLUE_FALCON_CREST",label:"Embossed Heraldic Falcon Motif",detail:"The falcon emblem was adopted by private paper ateliers along the Jhelum river."},{id:"CLUE_PAPER_WATERMARK",label:"Chain Line & Watermark Inspection",detail:"Contains fine wire watermark with the artisan initials M.K."}],attributions:[{id:"attr_jhelum_paper_atelier",label:"Jhelum River Private Paper Atelier"},{id:"attr_foreign_consulate_letter",label:"Foreign Consulate Diplomatic Stationery"},{id:"attr_unknown_unresolved",label:"Unresolved Provenance"}]}];function u(){var h,m;if(d){i.innerHTML=`
        <div>
          ${r("Part 2: The Antiquarian’s Bench","Investigating 4 uncataloged historical relics under varying uncertainty.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',goal:"Investigate physical clues on 4 historical relics to resolve provenance uncertainty.",steps:["Examine each uncataloged relic and its initial description.","Click clues to uncover material evidence at your discretion.","Attribute the relic based on your investigation."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{d=!1,e=0,a={},s=null,l(),u()});return}const o=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 2: The Antiquarian’s Bench","Inspect material clues to resolve provenance uncertainty.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Relic ${e+1} of ${v.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${o.title}:</strong> ${o.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${o.stimulus_id}</span>
        </div>

        <!-- Clues Inspection Grid -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-xs">
          <div class="text-[10px] uppercase font-mono text-[var(--accent-gold)] font-semibold tracking-wider mb-2.5 flex items-center justify-between">
            <span>Material Clues Available for Physical Inspection</span>
            <span class="text-[9px] text-[var(--text-secondary)]">Click clue to examine</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            ${o.clues.map(c=>`
              <div class="clue-btn p-3.5 bg-white border ${a[c.id]?"border-[var(--accent-gold)] bg-amber-50/40 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs" data-clue="${c.id}" tabindex="0" role="button">
                <div class="font-medium text-[var(--text-primary)] flex items-center justify-between">
                  <span>${c.label}</span>
                  <span class="text-[9px] font-mono uppercase text-[var(--text-secondary)]">${a[c.id]?"Inspected":"Inspect"}</span>
                </div>
                ${a[c.id]?`<p class="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--grid-border)] pt-2 animate-fadeIn">${c.detail}</p>`:""}
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Attribution Selection -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Conclude Archival Attribution:</div>
          <div class="space-y-2.5">
            ${o.attributions.map(c=>`
              <div class="q2-attr p-3.5 bg-white border ${s===c.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-attr="${c.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${s===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${s===c.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${c.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${c.id}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmQ2Btn" ${s?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<v.length-1?"Finalize Investigation &rarr;":"Finish Antiquarian Bench &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".clue-btn").forEach(c=>{const g=f=>{b=f;const _=c.getAttribute("data-clue");a[_]=!0,t("clue_inspected",{trial_index:e,stimulus_id:o.stimulus_id,artifact_id:o.artifact_id,clue_id:_,input_modality:b,task_def_version:"1.0"}),u()};c.addEventListener("click",()=>g("mouse")),c.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g("keyboard"))})}),i.querySelectorAll(".q2-attr").forEach(c=>{const g=f=>{b=f,s=c.getAttribute("data-attr"),u()};c.addEventListener("click",()=>g("mouse")),c.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g("keyboard"))})}),(m=document.getElementById("confirmQ2Btn"))==null||m.addEventListener("click",()=>{t("investigation_finalized",{trial_index:e,stimulus_id:o.stimulus_id,artifact_id:o.artifact_id,attribution_choice:s,input_modality:b,task_def_version:"1.0"}),e<v.length-1?(e++,a={},s=null,l(),u()):p({mini_game:"Q2",observations_count:4})})}function l(){const o=v[e];t("artifact_presented",{trial_index:e,stimulus_id:o.stimulus_id,artifact_id:o.artifact_id,uncertainty_level:o.uncertainty_level,expected_value:o.expected_value,task_def_version:"1.0"})}u()}function de(i,r,t,p){let d=!0,e=0,a=!1,s=null,b="mouse";const v=[{stimulus_id:"Q3_E1",title:"Episode 1: The Master Calligrapher’s Folio",ambiguity_type:"unattributed_artisan_folio",ambiguity_text:"An illuminated folio features miniature gold dust borders with charcoal underdrawing. Two Master Calligraphers worked during this era.",context_id:"provenance_context_1",context_title:"Archival Registry Dossier #104 (Rainawari Atelier)",context_text:"Archival records confirm Master Sadiq operated exclusively in the Rainawari workshop between 1870-1885 and pioneered willow-branch charcoal underdrawings with lapis border ruling.",decision_question:"Based on your synthesis, attribute the folio’s master atelier and technique lineage:",choices:[{id:"choice_sadiq_rainawari",label:"Master Sadiq (Rainawari Atelier — willow-branch underdrawing)"},{id:"choice_habib_court",label:"Master Habib (Royal Court Palace — imported pencil underdrawing)"},{id:"choice_generic_bazaar",label:"Unspecified Old Srinagar Commercial Bazaar Production"}]},{stimulus_id:"Q3_E2",title:"Episode 2: The Post-Flood Exhibition Pavilion",ambiguity_type:"mismatched_period_provenance",ambiguity_text:"A decorative ceiling panel displays carving motifs from both the late 19th and early 20th century reconstructions.",context_id:"provenance_context_2",context_title:"Municipal Public Works Ledger #88 (Dal Lake Pavilion)",context_text:"Following the devastating 1902 autumn flood, the pavilion ceiling was rebuilt using seasoned Himalayan cedar, while the pre-flood structure used soft river pine.",decision_question:"Integrate the structural timber provenance into your curatorial report:",choices:[{id:"choice_post_flood_cedar",label:"Post-1902 Flood Restoration (Himalayan seasoned cedar timber)"},{id:"choice_pre_flood_pine",label:"Original Pre-Flood Construction (Soft river pine timber)"},{id:"choice_modern_concrete",label:"Twentieth Century Composite Replica"}]},{stimulus_id:"Q3_E3",title:"Episode 3: The Shrine Couplet's Refrain",ambiguity_type:"regional_dialect_verse_origin",ambiguity_text:"A woven silk pashmina textile bears an embroidered couplet with an archaic Kashmiri metric cadence.",context_id:"provenance_context_3",context_title:"Oral Verse Anthology Vol. IV (Lalla-Ded Shrines)",context_text:'Couplets structured with the archaic 4-beat "Vakh" metric refrain originate specifically from the southern valley shrines (Pampore/Tral) rather than urban royal court poets.',decision_question:"Select the verified cultural and geographic lineage for the exhibition catalog:",choices:[{id:"choice_southern_vakh_shrine",label:"Southern Valley Shrine Lineage (Archaic 4-beat Vakh cadence)"},{id:"choice_urban_court_ghazal",label:"Urban Courtly Scribe Tradition (Formal Persian rhyming meter)"},{id:"choice_folk_bazaar_song",label:"Nomadic Commercial Caravan Song"}]}];function u(){var h,m,c;if(d){i.innerHTML=`
        <div>
          ${r("Part 3: The Weaver's Chronicle","Resolving 3 ambiguous curatorial episodes through optional archival context integration.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',goal:"Synthesize archival knowledge: retrieve optional context dossiers and integrate the insights into downstream decisions.",steps:["Read the historical ambiguity presented in each episode.","Optionally retrieve the archival context dossier to uncover provenance facts.","Integrate the facts into your final cataloging choice."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{d=!1,e=0,a=!1,s=null,l(),u()});return}const o=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${r("Part 3: The Weaver's Chronicle","Integrate archival context into catalog decisions.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Episode ${e+1} of ${v.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${o.title}:</strong> ${o.ambiguity_text}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${o.stimulus_id}</span>
        </div>

        <!-- Optional Context Retrieval Area -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-xs">
          <div class="flex justify-between items-center mb-2">
            <span class="text-[10px] uppercase font-mono text-[var(--accent-gold)] font-semibold tracking-wider">Archival Context Dossier</span>
            ${a?'<span class="text-[10px] font-mono text-emerald-700 font-semibold uppercase">Dossier Retrieved</span>':`
              <button type="button" id="retrieveContextBtn" class="px-3.5 py-1.5 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] text-[10px] font-mono uppercase tracking-wider text-[var(--text-primary)] hover:bg-amber-50 transition rounded-xs shadow-xs" tabindex="0">
                Retrieve Context Dossier &rarr;
              </button>
            `}
          </div>

          ${a?`
            <div class="p-4 bg-white border border-emerald-600/40 rounded-xs text-xs text-[var(--text-primary)] leading-relaxed animate-fadeIn">
              <div class="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">${o.context_title}</div>
              <div>${o.context_text}</div>
            </div>
          `:`
            <div class="text-xs text-[var(--text-secondary)] italic">
              Archival context is available to clarify historical ambiguities before finalizing attribution.
            </div>
          `}
        </div>

        <!-- Downstream Integration Decision -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-2.5">${o.decision_question}</div>
          <div class="space-y-2.5">
            ${o.choices.map(g=>`
              <div class="q3-choice p-3.5 bg-white border ${s===g.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-choice="${g.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${s===g.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${s===g.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${g.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${g.id}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmQ3Btn" ${s?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<v.length-1?"Confirm Synthesis &rarr;":"Finish World 5 &rarr;"}
          </button>
        </div>
      </div>
    `,(m=document.getElementById("retrieveContextBtn"))==null||m.addEventListener("click",()=>{b="mouse",a=!0,t("context_requested",{trial_index:e,stimulus_id:o.stimulus_id,context_id:o.context_id,input_modality:b,task_def_version:"1.0"}),u()}),i.querySelectorAll(".q3-choice").forEach(g=>{const f=_=>{b=_,s=g.getAttribute("data-choice"),u()};g.addEventListener("click",()=>f("mouse")),g.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),f("keyboard"))})}),(c=document.getElementById("confirmQ3Btn"))==null||c.addEventListener("click",()=>{t("decision_integrated",{trial_index:e,stimulus_id:o.stimulus_id,context_retrieved:a,choice:s,input_modality:b,task_def_version:"1.0"}),e<v.length-1?(e++,a=!1,s=null,l(),u()):p({mini_game:"Q3",observations_count:3})})}function l(){const o=v[e];t("episode_presented",{trial_index:e,stimulus_id:o.stimulus_id,ambiguity_type:o.ambiguity_type,task_def_version:"1.0"})}u()}function le(i,r){const{appContainer:t,miniGameIndex:p,logEvent:d,onMiniGameComplete:e}=i;switch(p){case 0:ce(t,r,d,e);break;case 1:ue(t,r,d,e);break;case 2:me(t,r,d,e);break}}function ce(i,r,t,p){let d=!0,e=["Twisted Hemp Cord","Steel Hanging Ring"];const a=[{id:"T_HEMP",name:"Twisted Hemp Cord",icon:"&#129526;"},{id:"T_BRASS",name:"Brass Chain Link",icon:"&#128279;"},{id:"T_CLIP",name:"Carved Walnut Clip",icon:"&#128206;"},{id:"T_RING",name:"Steel Hanging Ring",icon:"&#9711;"}];function s(){var b,v;if(d){i.innerHTML=`
        <div>
          ${r("Part 1: The Artisan's Cord","Assembling a custom mount for hanging an exhibition frame.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',goal:"Select at least 2 workbench items to assemble a durable frame mount.",steps:["Examine the workshop table supplies (cord, chain, clip, ring).","Click to combine at least 2 materials into your mounting rig.","Click Test Mount Stability to verify the assembly."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{d=!1,s()});return}i.innerHTML=`
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
            ${a.map(u=>`
              <button class="tool-btn p-3 bg-white border ${e.includes(u.name)?"border-[var(--accent-gold)] bg-amber-50/50 font-semibold shadow-xs":"border-[var(--grid-border)]"} text-xs hover:border-[var(--accent-gold)] transition text-center rounded-xs" data-name="${u.name}">
                <div class="text-2xl mb-1.5">${u.icon}</div>
                <div class="text-[11px] text-[var(--text-primary)]">${u.name}</div>
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
    `,i.querySelectorAll(".tool-btn").forEach(u=>{u.addEventListener("click",()=>{const l=u.getAttribute("data-name");e.includes(l)?e.length>1&&(e=e.filter(o=>o!==l)):e.push(l),t("material_toggled",{material:l,current_selection:e}),s()})}),(v=document.getElementById("testMountBtn"))==null||v.addEventListener("click",()=>{t("mount_built",{materials:e}),p({mini_game:"CR1",observations_count:1,materials_used:e.length})})}s()}function ue(i,r,t,p){let d=!0,e="S_360";const a=[{id:"S_360",title:"360° Wrap Display",desc:"Hang miniature framed poetry on all four faces of the stone pillar for a 360° walking gallery."},{id:"S_SHADOW",title:"Ambient Light Backdrop",desc:"Position warm ground lamps toward the pillar to cast atmospheric silhouettes for surrounding work."},{id:"S_SEAT",title:"Literary Reading Nook",desc:"Arrange low wooden seating and poetry anthologies around the pillar base for quiet reflection."}];function s(){var b,v;if(d){i.innerHTML=`
        <div>
          ${r("Part 2: The Central Pillar","Transforming a central architectural column into an exhibition feature.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',goal:"Select a creative layout concept to incorporate the center hall column into the event.",steps:["Review the 3 space curation ideas.","Choose the concept that creates the most welcoming guest experience.","Confirm your design."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{d=!1,s()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 2: The Central Pillar","A wide stone column sits in the hall center. Choose how to make it part of the exhibition.")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${a.map(u=>`
            <div class="cr2-card p-5 bg-white border ${e===u.id?"border-[var(--accent-gold)] bg-amber-50/40 font-semibold shadow-xs":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2.5 text-center shadow-xs rounded-xs" data-id="${u.id}">
              <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] font-serif text-lg">
                &#10038;
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${u.title}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${u.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="cr2ConfirmBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Confirm Space Concept &rarr;
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".cr2-card").forEach(u=>{u.addEventListener("click",()=>{e=u.getAttribute("data-id"),s()})}),(v=document.getElementById("cr2ConfirmBtn"))==null||v.addEventListener("click",()=>{t("pillar_solution_selected",{solution:e}),p({mini_game:"CR2",observations_count:1,solution:e})})}s()}function me(i,r,t,p){let d=!0,e="P_MINIMAL";const a=[{id:"P_MINIMAL",title:"Serene Minimalist",desc:"Spacious parchment backdrop highlighting a single handwritten verse in classical calligraphy."},{id:"P_CLASSIC",title:"Heritage Floral Border",desc:"Hand-drawn Chinar leaf border framing event details with warmth and historical resonance."},{id:"P_MODERN",title:"Warm Terracotta Split",desc:"Earthy terracotta wash on one half, structured typography on the other for high readability."}];function s(){var b,v;if(d){i.innerHTML=`
        <div>
          ${r("Part 3: The Printed Motif","Selecting visual invitation aesthetics for the exhibition announcement.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',goal:"Choose the visual card aesthetic that best reflects the collective’s creative tone.",steps:["Compare the 3 visual layout previews.","Select the invitation style you find most fitting.","Click Finish to conclude the workshop session."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{d=!1,s()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 3: The Printed Motif","Choose which visual style best communicates the spirit of the upcoming gathering.")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${a.map(u=>`
            <div class="cr3-card p-5 bg-white border ${e===u.id?"border-[var(--accent-gold)] bg-amber-50/40 font-semibold shadow-xs":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2.5 text-center shadow-xs rounded-xs" data-id="${u.id}">
              <div class="w-full h-24 bg-[#faf8f5] border border-[var(--grid-border)] flex flex-col items-center justify-center font-serif text-xs text-[var(--accent-gold)] mb-2 rounded-xs">
                <span class="text-xs uppercase font-medium tracking-wider">[Card Style]</span>
                <span class="text-[11px] text-[var(--text-secondary)] italic mt-1">${u.title}</span>
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${u.title}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${u.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="cr3FinishBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Confirm Style Choice &rarr;
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".cr3-card").forEach(u=>{u.addEventListener("click",()=>{e=u.getAttribute("data-id"),s()})}),(v=document.getElementById("cr3FinishBtn"))==null||v.addEventListener("click",()=>{t("poster_style_selected",{style:e}),p({mini_game:"CR3",observations_count:1,style:e})})}s()}function pe(i,r){const{appContainer:t,miniGameIndex:p,logEvent:d,onMiniGameComplete:e}=i;switch(p){case 0:ve(t,r,d,e);break;case 1:be(t,r,d,e);break;case 2:ge(t,r,d,e);break}}function ve(i,r,t,p){let d=!0;const e=[{id:"INV_1",recipient:"Senior Calligrapher — Master Ghulam"},{id:"INV_2",recipient:"Community Youth Art Collective"},{id:"INV_3",recipient:"Regional Heritage Conservation Trust"}];let a=0,s=[],b=performance.now();function v(){var l,o;if(d){i.innerHTML=`
        <div>
          ${r("Part 1: The Wax Seal","Sealing formal event invitations for visiting artists and guests.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',goal:"Apply the warm terracotta wax seal to each of the 3 handmade invitation envelopes.",steps:["Review the named recipient on the handcrafted envelope.","Click the Apply Wax Seal button to press the seal.","Complete all 3 invitations to proceed."]})}
        </div>
      `,(l=document.getElementById("startActivityBtn"))==null||l.addEventListener("click",()=>{d=!1,b=performance.now(),v()});return}if(a>=e.length){const h=s.reduce((m,c)=>m+c,0)/s.length;p({mini_game:"M1",observations_count:e.length,avg_latency_ms:h});return}const u=e[a];b=performance.now(),i.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 1: The Wax Seal","Apply the collective seal stamp to each of the 3 formal invitation envelopes.")}

        <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
          Envelope ${a+1} of ${e.length}
        </div>

        <!-- Interactive Envelope Preview -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <div class="w-full max-w-sm mx-auto h-40 bg-amber-50/70 border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative shadow-sm rounded-xs">
            <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Ceremonial Invitation</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1.5">${u.recipient}</div>
            
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
    `,t("invitation_presented",{inv_id:u.id}),(o=document.getElementById("stampBtn"))==null||o.addEventListener("click",()=>{const h=performance.now()-b;s.push(h),t("envelope_stamped",{inv_id:u.id,dwell_ms:h}),a++,v()})}v()}function be(i,r,t,p){let d=!0,e=0;const a=3;function s(){var b,v,u;if(d){i.innerHTML=`
        <div>
          ${r("Part 2: The Courtesy Sleeves","Preparing optional extra guest invitation folios.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',goal:"Optionally stamp additional courtesy sleeves for community elders and artisans, or conclude whenever you like.",steps:["The mandatory 3 invitations are already sealed.","Click + Seal Extra Sleeve if you choose to prepare more.","Click Proceed when you are ready."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{d=!1,s()});return}i.innerHTML=`
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
            ${e} of ${a} Extra Sleeves Sealed
          </div>

          <div class="flex justify-center gap-4">
            ${e<a?`
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
    `,(v=document.getElementById("stampExtraBtn"))==null||v.addEventListener("click",()=>{e++,t("optional_envelope_stamped",{count:e}),s()}),(u=document.getElementById("finishM2Btn"))==null||u.addEventListener("click",()=>{t("optional_stamping_done",{total_extra:e}),p({mini_game:"M2",observations_count:1,optional_completed:e})})}s()}function ge(i,r,t,p){let d=!0;const e=[{id:"T_LIGHTS",name:"Turn on Warm Gallery Spotlights and Lanterns"},{id:"T_PAMPHLETS",name:"Arrange Urdu & Kashmiri Poetry Guides on Welcome Stand"},{id:"T_FLOWERS",name:"Place Fresh Jasmine Petals at the Courtyard Entrance Urn"}];let a={T_LIGHTS:!0,T_PAMPHLETS:!0,T_FLOWERS:!0};function s(){var v,u;if(d){i.innerHTML=`
        <div>
          ${r("Part 3: The Evening Threshold","Exhibition readiness inspection for this stage.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>',goal:"Verify the 3 gallery readiness checkpoints to prepare the hall for evening arrival.",steps:["Check each gallery preparation item (lighting, guides, floral welcome).","Verify all 3 items to complete the ritual.","Click Complete Activity to proceed."]})}
        </div>
      `,(v=document.getElementById("startActivityBtn"))==null||v.addEventListener("click",()=>{d=!1,s()});return}const b=Object.values(a).filter(Boolean).length;i.innerHTML=`
      <div class="animate-fadeIn">
        ${r("Part 3: The Evening Threshold","Verify the 3-point checklist to complete this activity.")}

        <div class="space-y-3 mb-6">
          ${e.map((l,o)=>`
            <label class="flex items-center gap-3.5 p-4 bg-white border ${a[l.id]?"border-emerald-600 bg-emerald-50/30 shadow-xs":"border-[var(--grid-border)] shadow-xs"} cursor-pointer hover:border-[var(--accent-gold)] transition rounded-xs">
              <input type="checkbox" id="task_${l.id}" ${a[l.id]?"checked":""} class="accent-[#bd6f5d] w-4 h-4">
              <span class="text-xs font-medium text-[var(--text-primary)]">${o+1}. ${l.name}</span>
            </label>
          `).join("")}
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)] font-medium">${b} of 3 checkpoints verified</span>
          <button id="m3FinishBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            Complete Activity &rarr;
          </button>
        </div>
      </div>
    `,e.forEach(l=>{var o;(o=document.getElementById(`task_${l.id}`))==null||o.addEventListener("change",h=>{a[l.id]=h.target.checked,t("readiness_task_toggled",{task_id:l.id,checked:h.target.checked}),s()})}),(u=document.getElementById("m3FinishBtn"))==null||u.addEventListener("click",()=>{const l=Object.values(a).filter(Boolean).length/e.length;t("gallery_readiness_complete",{readiness_score:l}),p({mini_game:"M3",observations_count:e.length,readiness_score:l})})}s()}const he={W1:{name:"The Soundscape",name_ur:"تعدد",subtitle:"Acoustics & Dialogue"},W2:{name:"The Living Archive",name_ur:"دستاویز",subtitle:"Manuscripts & Preservation"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ نقش",subtitle:"Artisan Workshop"},W4:{name:"The Shifting Patterns",name_ur:"متغیر گرڈ",subtitle:"Mosaic & Rhythm"},W5:{name:"The Hidden Courtyard",name_ur:"نہاں خانہ",subtitle:"Exhibition Discovery"},W6:{name:"The Workshop Bench",name_ur:"شکستہ آلہ",subtitle:"Material Assembly"},W7:{name:"The Final Gathering",name_ur:"تکرار",subtitle:"Readiness & Ceremony"}};function y({icon:i,goal:r,steps:t,onStart:p}){return`
    <div class="tutorial-card p-6 border border-[var(--accent-gold)] bg-gradient-to-br from-[#faf8f5] to-[#f5efe8] space-y-4 mb-6 transition-all duration-300">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-amber-100/80 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)]">
          ${i||'<i data-lucide="compass" class="w-5 h-5"></i>'}
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-medium">Activity Guide · طریقہ کار</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] font-semibold">${r}</h3>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        ${t.map((d,e)=>`
          <div class="bg-white/80 border border-[var(--grid-border)] p-3 flex items-start gap-2.5">
            <span class="w-5 h-5 rounded-full bg-[var(--accent-gold)] text-white text-[10px] flex items-center justify-center font-serif shrink-0 mt-0.5">${e+1}</span>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">${d}</div>
          </div>
        `).join("")}
      </div>

      <div class="pt-2 flex justify-end">
        <button id="startActivityBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition flex items-center gap-2">
          Begin Activity &rarr;
        </button>
      </div>
    </div>
  `}function fe(i){const{appContainer:r,worldCode:t,worldIndex:p,miniGameIndex:d,onMiniGameComplete:e}=i,a=he[t]||{name:"Alfaaz Workshop",name_ur:""},s=(b,v)=>`
    <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${p+1} of 7: ${a.name}</span>
          <span class="font-serif text-lg text-[var(--text-secondary)]" style="direction: rtl;">${a.name_ur}</span>
        </div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">${b}</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">${v}</p>
      </div>
      <div class="text-right">
        <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Part ${d+1} of 3</span>
      </div>
    </div>
  `;switch(t){case"W1":U(i,s);break;case"W2":W(i,s);break;case"W3":Y(i,s);break;case"W4":te(i,s);break;case"W5":ne(i,s);break;case"W6":le(i,s);break;case"W7":pe(i,s);break;default:e&&e({});break}}let n={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1,activeMiniGameInProgress:!1,telemetryTerminal:!1};const R="alfaaz_recruit_state",q="alfaaz_recruit_unsent";function w(){try{const i={sessionId:n.sessionId,configHash:n.configHash,worldSequence:n.worldSequence,seeds:n.seeds,screen:n.screen,sjtScenarios:n.sjtScenarios,currentSjtIndex:n.currentSjtIndex,sjtResponses:n.sjtResponses,currentWorldIndex:n.currentWorldIndex,currentMiniGameIndex:n.currentMiniGameIndex,accessibilityModes:n.accessibilityModes,segmentId:n.segmentId,seq:n.seq,isPaused:n.isPaused,activeMiniGameInProgress:n.activeMiniGameInProgress||!1};sessionStorage.setItem(R,JSON.stringify(i)),sessionStorage.setItem(q,JSON.stringify(n.telemetryQueue))}catch(i){console.warn("[Persistence] Error saving sessionStorage:",i)}}function xe(){try{const i=sessionStorage.getItem(R),r=sessionStorage.getItem(q);if(r){const t=JSON.parse(r);Array.isArray(t)&&(n.telemetryQueue=t)}if(i){const t=JSON.parse(i);if(t.sessionId){if(n.sessionId=t.sessionId,n.configHash=t.configHash||null,n.worldSequence=t.worldSequence||[],n.seeds=t.seeds||{},n.screen=t.screen||"consent",n.sjtScenarios=t.sjtScenarios||[],n.currentSjtIndex=t.currentSjtIndex||0,n.sjtResponses=t.sjtResponses||{},n.currentWorldIndex=t.currentWorldIndex||0,n.currentMiniGameIndex=t.currentMiniGameIndex||0,n.accessibilityModes=t.accessibilityModes||[],n.seq=t.seq||1,n.isPaused=t.isPaused||!1,n.segmentId=(t.segmentId||1)+1,x(n.screen,"segment_start",{segment_id:n.segmentId}),t.activeMiniGameInProgress&&t.screen==="games"){const p=n.worldSequence[n.currentWorldIndex],d=j(p,n.currentMiniGameIndex);x("game","interrupted",{mini_game:d,reason:"page_reload"}),n.currentMiniGameIndex<2?n.currentMiniGameIndex++:(n.currentMiniGameIndex=0,n.currentWorldIndex++),n.activeMiniGameInProgress=!1}return w(),!0}}}catch(i){console.warn("[Persistence] Error restoring sessionStorage:",i)}return!1}async function T(i,r={}){if(window.globalApiFetch)return await window.globalApiFetch(i,r);const t=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",p={"Content-Type":"application/json",...r.headers||{}};return fetch(`${t}${i}`,{...r,headers:p})}function x(i,r,t={},p={},d="mouse",e=null,a=null){const s=performance.now();let b=t,v=p;try{const l=JSON.stringify(t),o=JSON.stringify(p),h=new TextEncoder().encode(l).length+new TextEncoder().encode(o).length;h>4096&&(b={event_oversize:!0,original_size_bytes:h},v={oversized:!0})}catch{}const u={seq:n.seq++,segment_id:n.segmentId,t_ms:s,screen:i,game_world:n.worldSequence[n.currentWorldIndex]||null,mini_game:e,trial:a,action:r,input_type:d,task_def_version:t&&t.task_def_version||"1.0",state:v,data:b};n.telemetryQueue.push(u),w(),(n.telemetryQueue.length>=50||r==="minigame_end"||r==="sjt_complete")&&$()}let L=!1;async function $(){if(L||!n.sessionId||n.telemetryQueue.length===0||n.telemetryTerminal)return;L=!0;const i=[...n.telemetryQueue],r=i.slice(0,100),t=i.slice(100);n.telemetryQueue=t,w();try{const p=await T("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:n.sessionId,events:r})});if(p&&p.status===422){const d=await p.json().catch(()=>({}));if(d.detail&&(d.detail.detail==="events_cap_reached"||d.detail.status==="DATA_LIMITED")){console.warn("[Telemetry] Terminal event cap reached (50,000). Halting future telemetry flushes."),n.telemetryTerminal=!0,n.telemetryQueue=[...r,...t],w(),L=!1;return}}if(p&&p.status===413){if(console.warn("[Telemetry] Batch rejected with HTTP 413 (oversize)."),r.length>1){const d=Math.ceil(r.length/2);n.telemetryQueue=[...r.slice(0,d),...r.slice(d),...t]}else console.error("[Telemetry] Single event exceeds body limit. Discarding oversized payload.");w(),L=!1;return}if(!p||!p.ok)throw new Error(p?`HTTP ${p.status}`:"No response");w()}catch(p){console.warn("[Telemetry] Flush failed, re-queuing:",p),n.telemetryQueue=[...r,...n.telemetryQueue],w()}finally{L=!1}}setInterval(()=>{n.sessionId&&n.telemetryQueue.length>0&&!n.telemetryTerminal&&$()},2500);window.addEventListener("beforeunload",()=>{if(n.sessionId&&n.telemetryQueue.length>0){const i=window.ALFAAZ_API_URL||"",r=JSON.stringify({session_id:n.sessionId,events:n.telemetryQueue.slice(0,100)});navigator.sendBeacon(`${i}/recruit/telemetry`,r)}});window.addEventListener("pagehide",()=>{if(n.sessionId&&n.telemetryQueue.length>0){const i=window.ALFAAZ_API_URL||"",r=JSON.stringify({session_id:n.sessionId,events:n.telemetryQueue.slice(0,100)});navigator.sendBeacon(`${i}/recruit/telemetry`,r)}});document.addEventListener("visibilitychange",()=>{document.hidden?(x(n.screen,"visibility_hidden",{timestamp:Date.now()}),x(n.screen,"tab_hidden",{timestamp:Date.now()}),$()):(x(n.screen,"visibility_visible",{timestamp:Date.now()}),x(n.screen,"tab_visible",{timestamp:Date.now()}))});window.addEventListener("blur",()=>{x(n.screen,"blur",{timestamp:Date.now()})});window.addEventListener("focus",()=>{x(n.screen,"focus",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{xe(),E(),ye()});function ye(){const i=document.getElementById("pauseBtn");i==null||i.addEventListener("click",D);const r=document.getElementById("exitBtn");r==null||r.addEventListener("click",()=>{confirm("Are you sure you wish to exit the volunteer assessment? You can return at any time.")&&(x(n.screen,"candidate_exited"),$(),window.location.href="index.html")})}function D(){n.isPaused?(n.isPaused=!1,x(n.screen,"resume"),n.screen=n.pausedPreviousScreen||"sjt",E()):(n.isPaused=!0,n.pausedPreviousScreen=n.screen,x(n.screen,"pause"),n.screen="paused",E())}function E(){const i=document.getElementById("recruitApp"),r=document.getElementById("sessionHeaderControls"),t=document.getElementById("topProgressBar"),p=document.getElementById("progressBarFill");switch(n.screen!=="consent"&&n.screen!=="complete"&&n.screen!=="paused"?(r==null||r.classList.remove("hidden"),t==null||t.classList.remove("hidden")):(r==null||r.classList.add("hidden"),t==null||t.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),n.screen){case"consent":_e(i);break;case"identity":we(i);break;case"accessibility":ke(i);break;case"warmup":Ce(i);break;case"sjt":A(i,p);break;case"games":O(i,p);break;case"paused":Te(i);break;case"complete":$e(i);break}}function _e(i){var e;i.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-4 text-center">
        <span class="act-badge">Onboarding & Research</span>
        <h1 class="text-3xl font-serif text-[var(--text-primary)]">Volunteer Exploratory Assessment</h1>
      </div>

      <div class="space-y-4 text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        ${M.candidate_notice.lines.map(a=>`<p>${a}</p>`).join("")}
      </div>

      <form id="consentForm" class="space-y-4 pt-2">
        <div class="flex items-center gap-2 pt-2">
          <input type="checkbox" id="ageConfirm" required class="w-4 h-4 accent-[#bd6f5d]">
          <label for="ageConfirm" class="text-xs text-[var(--text-primary)]">${M.age_confirmation.label}</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="consentAgree" required class="w-4 h-4 accent-[#bd6f5d]">
          <label for="consentAgree" class="text-xs text-[var(--text-primary)]">${M.research_participation.label}</label>
        </div>

        <div class="pt-4 flex justify-end">
          <button type="submit" aria-disabled="true" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition opacity-40">
            Continue &rarr;
          </button>
        </div>
      </form>
    </div>
  `;const r=document.getElementById("ageConfirm"),t=document.getElementById("consentAgree"),p=document.querySelector('#consentForm button[type="submit"]'),d=()=>{const a=!!(r!=null&&r.checked&&(t!=null&&t.checked));p==null||p.setAttribute("aria-disabled",String(!a)),p==null||p.classList.toggle("opacity-40",!a)};r==null||r.addEventListener("change",d),t==null||t.addEventListener("change",d),d(),(e=document.getElementById("consentForm"))==null||e.addEventListener("submit",async a=>{a.preventDefault();const s=a.target.querySelector('button[type="submit"]');if((s==null?void 0:s.getAttribute("aria-disabled"))==="true")return;const b=s?s.innerHTML:"Continue &rarr;";s&&(s.setAttribute("aria-disabled","true"),s.innerHTML="Connecting...");try{const v=r.checked,u=t.checked,l=await T("/recruit/consent",{method:"POST",body:JSON.stringify({choices:{research_telemetry:u},confirmed_18_plus:v,device_class:window.innerWidth<768?"mobile":"desktop",input_modality:"ontouchstart"in window?"touch":"mouse"})});if(!l||!l.ok){const h=l?await l.json().catch(()=>({})):{};throw new Error(h.detail||(l?`Server returned ${l.status}`:"No response from server"))}const o=await l.json();if(o.session_id)n.sessionId=o.session_id,n.configHash=o.config_hash,n.worldSequence=o.world_sequence,n.seeds=o.seeds,n.screen="identity",x("consent","consent_accepted"),w(),E();else throw new Error("Missing session ID")}catch(v){alert(`Unable to initialize session: ${v.message||"Please check connection."}`),console.error(v),s&&(d(),s.innerHTML=b)}})}function we(i){var r;i.innerHTML=`
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
  `,(r=document.getElementById("identityForm"))==null||r.addEventListener("submit",async t=>{t.preventDefault();const p=t.target.querySelector('button[type="submit"]'),d=p?p.innerHTML:"Begin Session &rarr;";p&&(p.disabled=!0,p.innerHTML="Connecting...");try{const e=await T("/recruit/identity",{method:"POST",body:JSON.stringify({session_id:n.sessionId,full_name:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim()})});if(!e||!e.ok){const a=e?await e.json().catch(()=>({})):{};throw new Error(a.detail||(e?`Server returned ${e.status}`:"No response from server"))}n.screen="accessibility",x("identity","identity_submitted"),w(),E()}catch(e){alert(`Unable to continue: ${e.message||"Please check connection."}`),p&&(p.disabled=!1,p.innerHTML=d)}})}function ke(i){var r;i.innerHTML=`
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
  `,(r=document.getElementById("saveA11yBtn"))==null||r.addEventListener("click",async()=>{var p,d,e,a;const t=[];(p=document.getElementById("a11y_keyboard"))!=null&&p.checked&&t.push("keyboard_navigation"),(d=document.getElementById("a11y_contrast"))!=null&&d.checked&&t.push("high_contrast"),(e=document.getElementById("a11y_motion"))!=null&&e.checked&&t.push("reduced_motion"),(a=document.getElementById("a11y_time"))!=null&&a.checked&&t.push("extended_time"),n.accessibilityModes=t;try{await T("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:n.sessionId,modes_enabled:t})})}catch(s){console.warn("Accessibility preferences save error:",s)}n.screen="warmup",x("accessibility","preferences_saved",{modes:t}),w(),E()})}function Ce(i){let r=[],t=performance.now();i.innerHTML=`
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
  `;const p=document.getElementById("tapTarget"),d=document.getElementById("warmupStatus");p==null||p.addEventListener("click",async()=>{r.push(performance.now());const e=r.length;if(p.textContent=`Tap (${e}/3)`,d.textContent=`Registered tap ${e} of 3`,e>=3){const a=[r[1]-r[0],r[2]-r[1]],s=(a[0]+a[1])/2,b=performance.now()-t;try{await T("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:n.sessionId,tap_latency_baseline_ms:s,reading_dwell_baseline_ms:b,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(v){console.warn("Warmup save error:",v)}x("warmup","warmup_completed",{avgLatency:s,readingDwell:b});try{const u=await(await T("/recruit/sjt/public")).json();n.sjtScenarios=u.scenarios||[],n.currentSjtIndex=0,n.screen="sjt",w(),E()}catch(v){console.error("Failed to load SJT payload:",v)}}})}function A(i,r){var v;const t=n.sjtScenarios[n.currentSjtIndex];if(!t){Se();return}const p=n.sjtScenarios.length,d=n.currentSjtIndex+1;r&&(r.style.width=`${(d-1)/(p+7)*100}%`);const e=document.getElementById("segmentProgress");e&&(e.textContent=`SJT ${d}/${p}`);const a=n.sjtResponses[t.id]||null,s=t.options.map(u=>`
    <div class="option-card ${a===u.id?"selected":""}" data-opt-id="${u.id}" tabindex="0" role="button">
      <span class="font-serif text-sm font-semibold text-[var(--accent-gold)]">${u.id.slice(-1)}.</span>
      <span class="text-sm text-[var(--text-primary)] leading-relaxed">${u.text}</span>
    </div>
  `).join("");i.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-3 flex justify-between items-end">
        <div>
          <span class="act-badge">Act ${t.act}: ${t.act_title_en}</span>
          <span class="act-title-ur font-serif">${t.act_title_ur||""}</span>
          <h2 class="text-2xl font-serif text-[var(--text-primary)]">Scenario ${t.id}</h2>
        </div>
        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
          Scenario ${d} of ${p}
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
        <button id="nextSjtBtn" ${a?"":"disabled"} class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] transition">
          ${d===p?"Complete SJT &rarr;":"Next Scenario &rarr;"}
        </button>
      </div>
    </div>
  `,x("sjt","scenario_displayed",{scenario_id:t.id,index:d}),i.querySelectorAll(".option-card").forEach(u=>{u.addEventListener("click",()=>{const l=u.getAttribute("data-opt-id");n.sjtResponses[t.id]=l,x("sjt","option_selected",{scenario_id:t.id,option_id:l}),A(i,r)})}),(v=document.getElementById("nextSjtBtn"))==null||v.addEventListener("click",()=>{n.sjtResponses[t.id]&&(n.currentSjtIndex++,A(i,r))});const b=u=>{if(["1","2","3","4"].includes(u.key)){const l=parseInt(u.key)-1;t.options[l]&&(n.sjtResponses[t.id]=t.options[l].id,x("sjt","option_selected_key",{scenario_id:t.id,option_id:t.options[l].id}),A(i,r))}};window.onkeydown=b}async function Se(){window.onkeydown=null;try{await T("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:n.sessionId,responses:n.sjtResponses})}),n.screen="games",n.currentWorldIndex=0,n.currentMiniGameIndex=0,x("sjt","sjt_complete",{response_count:Object.keys(n.sjtResponses).length}),w(),E()}catch(i){console.error("SJT submit error:",i)}}function O(i,r){const t=n.worldSequence[n.currentWorldIndex];if(!t||n.currentWorldIndex>=n.worldSequence.length){Ee();return}n.activeMiniGameInProgress=!0,w();const p=document.getElementById("segmentProgress");p&&(p.textContent=`World ${n.currentWorldIndex+1}/7`),r&&(r.style.width=`${(n.currentSjtIndex+n.currentWorldIndex+1)/(n.sjtScenarios.length+7)*100}%`),fe({appContainer:i,worldCode:t,worldIndex:n.currentWorldIndex,miniGameIndex:n.currentMiniGameIndex,logEvent:(d,e,a,s)=>{const b=j(t,n.currentMiniGameIndex);x("game",d,e,a,s,b)},onMiniGameComplete:d=>{n.activeMiniGameInProgress=!1;const e=j(t,n.currentMiniGameIndex);x("game","minigame_end",d,{},"mouse",e),$(),n.currentMiniGameIndex<2?n.currentMiniGameIndex++:(n.currentMiniGameIndex=0,n.currentWorldIndex++),w(),O(i,r)}})}function j(i,r){const t={W1:["F1","F2","F3"],W2:["A1","A2","A3"],W3:["C1","C2","C3"],W4:["E1","E2","E3"],W5:["Q1","Q2","Q3"],W6:["CR1","CR2","CR3"],W7:["M1","M2","M3"]};return t[i]&&t[i][r]||"MG"}async function Ee(){n.activeMiniGameInProgress=!1,w();const i=document.getElementById("recruitApp");i&&(i.innerHTML=`
      <div class="space-y-6 text-center py-16 animate-fadeIn">
        <div class="w-10 h-10 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">Finalizing Assessment...</h2>
        <p class="text-xs text-[var(--text-secondary)]">Safely recording research telemetry and saving your session profile.</p>
      </div>
    `),await $();try{await T("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:n.sessionId})})}catch(r){console.warn("Session complete submission error:",r)}n.screen="complete",w(),E()}function Te(i){var r;i.innerHTML=`
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
  `,(r=document.getElementById("resumeBtn"))==null||r.addEventListener("click",D)}function $e(i){i.innerHTML=`
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
