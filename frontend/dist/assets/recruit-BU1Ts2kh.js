import"./global-DxYxv3W5.js";/* empty css               */const W={lines:["<strong>Estimated Total Time:</strong> ~20–25 minutes (SJT + brief exploratory micro-tasks).","<strong>Voluntary Nature:</strong> You may pause, skip tasks, or conclude at any time without penalty. Missing or skipped sections are recorded neutrally as insufficient data, never as a low score.","<strong>Simulated Partners:</strong> Some interactive tasks feature computer-controlled simulated characters. Their behavior is automated and scripted.","<strong>Data & Research Notice:</strong> This is a calibration-stage research instrument for unpaid volunteer recruitment, not a validated selection test. All raw telemetry is recorded under a pseudonymous session identifier."]},G={label:"I confirm that I am 18 years of age or older."},D={label:"I understand and agree to participate in this research session."},A={candidate_notice:W,age_confirmation:G,research_participation:D};function O(i,a){const{appContainer:t,miniGameIndex:l,logEvent:o,onMiniGameComplete:e}=i;switch(l){case 0:V(t,a,o,e);break;case 1:z(t,a,o,e);break;case 2:N(t,a,o,e);break}}function V(i,a,t,l){let o=!0,e=0,r=!1,d=0,v="mouse";const p=[{id:"DOC_01",title:"19th-Century Calligraphic Diwan (1842)",rule_prompt:"Filing Rule: Classify by Period",tags:["Year: 1842","19th Century","Parchment","Ghazal Verse"]},{id:"DOC_02",title:"Lyrical Ghazal Couplets Manuscript",rule_prompt:"Filing Rule: Classify by Genre",tags:["Genre: Poetry","Lyrical Verse","Urdu","Paper Folio"]},{id:"DOC_03",title:"Early 20th-Century Exhibition Register (1924)",rule_prompt:"Filing Rule: Classify by Period",tags:["Year: 1924","20th Century","Official Register","Signatures"]},{id:"DOC_04",title:"Lal Ded Vakh Verse Translations in Kashmiri",rule_prompt:"Filing Rule: Classify by Language",tags:["Language: Kashmiri","Vakh Verse","Vernacular Poetry"]},{id:"DOC_05",title:"Historical Tarikh Chronicle of Kashmir Artists",rule_prompt:"Filing Rule: Classify by Genre",tags:["Genre: Chronicle","Tarikh History","Biographical Record"]}],u=[{id:"19th_century",label:"19th Century Shelf",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},{id:"20th_century",label:"20th Century Shelf",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{id:"poetry",label:"Poetry & Verses Shelf",icon:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"},{id:"chronicle",label:"Chronicle Shelf",icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},{id:"kashmiri",label:"Kashmiri Vernacular Shelf",icon:"M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"}];function n(){var h,c;if(o){i.innerHTML=`
        <div>
          ${a("Part 1: The Manuscript Folios","Preserving and organizing historical folios and objects across 5 rule-based classification trials.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',goal:"Organize each historical item into its designated archive shelf based on archival classification rules.",steps:["Examine the item title and descriptor tags on each folio card.","Click the shelf guide button at any time to verify filing rules.","Select the appropriate shelf destination to file the folio."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{o=!1,e=0,d=performance.now(),n()});return}if(e>=p.length){l({mini_game:"A1",observations_count:p.length});return}const m=p[e];d=performance.now(),i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 1: The Manuscript Folios","Select the correct shelf for each historical archive artifact.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Folio ${e+1} of ${p.length}</span>
        </div>

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            ${m.rule_prompt}
          </span>
          <button id="guideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1 hover:bg-amber-50 transition flex items-center gap-1.5 rounded-xs" tabindex="0">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Shelf Guide
          </button>
        </div>

        <div id="guideModal" class="${r?"":"hidden"} p-4 mb-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] space-y-1 shadow-xs rounded-xs">
          <div>• <strong>Period Rule:</strong> Classify by creation century (19th Century vs 20th Century).</div>
          <div>• <strong>Genre Rule:</strong> Classify by literary format (Poetry vs Historical Chronicle).</div>
          <div>• <strong>Language Rule:</strong> Classify by primary linguistic medium (Kashmiri Vernacular).</div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase font-mono">${m.id}</span>
          <h3 class="text-lg font-serif text-[var(--text-primary)] font-medium mt-1 mb-3">${m.title}</h3>
          <div class="flex justify-center flex-wrap gap-2">
            ${m.tags.map(b=>`<span class="px-2.5 py-1 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)] rounded-xs">${b}</span>`).join("")}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          ${u.map(b=>`
            <button type="button" class="folder-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs flex flex-col items-center gap-1.5 rounded-xs" data-folder="${b.id}" tabindex="0">
              <svg class="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${b.icon}"></path></svg>
              ${b.label}
            </button>
          `).join("")}
        </div>
      </div>
    `,t("item_presented",{trial_index:e,stimulus_id:m.id,task_def_version:"1.0"}),(c=document.getElementById("guideBtn"))==null||c.addEventListener("click",()=>{const b=document.getElementById("guideModal");r=!(b!=null&&b.classList.contains("hidden")),b==null||b.classList.toggle("hidden"),r=!r,t("guide_viewed",{trial_index:e,stimulus_id:m.id,task_def_version:"1.0"})}),i.querySelectorAll(".folder-btn").forEach(b=>{const g=f=>{v=f;const E=b.getAttribute("data-folder"),C=performance.now()-d;t("item_sorted",{trial_index:e,stimulus_id:m.id,choice:E,dwell_ms:Math.round(C),input_modality:v,task_def_version:"1.0"}),e++,n()};b.addEventListener("click",()=>g("mouse")),b.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g("keyboard"))})})}n()}function z(i,a,t,l){let o=!0,e=0,r=null,d="mouse";const v=[{stimulus_id:"EXC_01",title:"19th-Century Kashmiri Ghazal Leaf with Water Wear",anomaly_description:'Water fading on lower margin. The accession year stamp is blurred and appears as "18--".',type_note:"Physical Damage & Indeterminate Year Stamp"},{stimulus_id:"EXC_02",title:"Pristine Persian Couplet Calligraphy (1890)",anomaly_description:"Intact rag fiber paper, clear black carbon ink, and standard accession stamp intact. No physical blemishes.",type_note:"Standard Folio Inspection"},{stimulus_id:"EXC_03",title:"Disbound Manuscript Folio with Pagination Jump",anomaly_description:"Binding threads severed. Margin numbering skips from Folio 14 directly to Folio 19 with missing text catchword.",type_note:"Structural Discrepancy & Missing Catchword"}],p=[{id:"flag_exception",title:"Flag for Conservator Review",desc:"Quarantine folio in acid-free protective sleeve and attach an anomaly notice for specialized review.",tag:"Specialized Preservation Quarantine"},{id:"file_standard",title:"Standard Catalog Accession",desc:"Accession the folio directly into the general catalog shelves under standard routine processing.",tag:"Routine Shelf Accession"},{id:"defer_review",title:"Hold in Pending Vault",desc:"Hold folio in pending intake storage without accessioning until provenance paperwork arrives.",tag:"Intake Deferral"}];function u(){var h;if(o){i.innerHTML=`
        <div>
          ${a("Part 2: The Fragile Leaf","Handling archival folios across 3 distinct accession decisions.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',goal:"Evaluate the physical condition of 3 folios and decide whether to flag an exception, file standardly, or hold.",steps:["Review the condition notes and physical examination summary for each folio.","Identify whether an anomaly or damage requires specialized conservation.","Select your archival handling recommendation across all 3 trials."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{o=!1,e=0,r=null,u()});return}const n=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 2: The Fragile Leaf","Examine the folio condition and select your archival handling recommendation.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Item ${e+1} of 3</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="w-10 h-10 rounded-full bg-amber-100 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] mx-auto mb-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <span class="text-[10px] tracking-widest text-[#bd6f5d] uppercase font-semibold font-mono">${n.stimulus_id} • ${n.type_note}</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-1 font-medium">${n.title}</h3>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mt-2">
            ${n.anomaly_description}
          </p>
        </div>

        <div class="space-y-3 mb-6">
          ${p.map(c=>`
            <div class="a2-opt p-4 bg-white border ${r===c.id?"border-[var(--accent-gold)] bg-amber-50/40 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs rounded-xs" data-action="${c.id}" tabindex="0" role="button">
              <div class="flex justify-between items-start">
                <div class="text-xs font-semibold text-[var(--text-primary)]">${c.title}</div>
                <span class="text-[10px] font-mono text-[var(--accent-gold)] uppercase tracking-wider">${c.tag}</span>
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">${c.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="a2ConfirmBtn" ${r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<2?"Confirm Handling Decision &rarr;":"Finish Exception Evaluation &rarr;"}
          </button>
        </div>
      </div>
    `,t("item_presented",{trial_index:e,stimulus_id:n.stimulus_id,task_def_version:"1.0"});const m=document.getElementById("a2ConfirmBtn");i.querySelectorAll(".a2-opt").forEach(c=>{const b=g=>{d=g,r=c.getAttribute("data-action"),i.querySelectorAll(".a2-opt").forEach(f=>{f.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40","shadow-xs"),f.classList.add("border-[var(--grid-border)]")}),c.classList.add("border-[var(--accent-gold)]","bg-amber-50/40","shadow-xs"),c.classList.remove("border-[var(--grid-border)]"),m&&(m.disabled=!1)};c.addEventListener("click",()=>b("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),b("keyboard"))})}),m==null||m.addEventListener("click",()=>{t("decision_logged",{trial_index:e,stimulus_id:n.stimulus_id,action_id:r,input_modality:d,task_def_version:"1.0"}),e<2?(e++,r=null,u()):l({mini_game:"A2",observations_count:3})})}u()}function N(i,a,t,l){let o=!0,e=new Set,r=new Set,d="mouse";const v=[{id:"REC_01",title:"Placard 1: Habba Khatoon Folio",text:"Poet: Habba Khatoon | Era: 16th Century | Birthplace: Chandhara (Recorded as: Chanhadra)",note:"Folio Label Verification"},{id:"REC_02",title:"Placard 2: Carved Walnut Pen Box",text:"Artifact: Carved Walnut Calligraphy Pen Box | Dimensions: 24 cm x 6 cm | Medium: Seasoned Walnut",note:"Object Metadata Verification"},{id:"REC_03",title:"Placard 3: River Verse Excerpt",text:`Verse Excerpt: "The river remembers the boatman's song" | Translator: [Not Specified / Blank]`,note:"Folio Label Verification"},{id:"REC_04",title:"Placard 4: Kashmiri Vakh Folio Leaf",text:"Folio Leaf: Kashmiri Vakh Lyric Leaf | Script: Sharda & Persian | Accession: AR-1892",note:"Manuscript Leaf Verification"},{id:"REC_05",title:"Placard 5: Exhibition Opening Notice",text:"Exhibition Opening Reception: February 31st, 2026 | Location: Main Pavilion",note:"Public Schedule Verification"}];function p(){var u,n;if(o){i.innerHTML=`
        <div>
          ${a("Part 3: The Exhibition Ledger","Reviewing 5 exhibition placards for typographical, factual, and omission discrepancies.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',goal:"Carefully proofread all 5 display records. Flag only those with genuine discrepancies or factual errors.",steps:["Examine each display record description in the ledger.","Click or toggle the discrepancy flag on any record containing concrete errors.","Clean records should remain unflagged.","Verify and finalize the exhibition ledger."]})}
        </div>
      `,(u=document.getElementById("startActivityBtn"))==null||u.addEventListener("click",()=>{o=!1,e=new Set,r=new Set,p()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 3: The Exhibition Ledger","Proofread all 5 exhibition records. Flag any record that contains a discrepancy.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">5 Records</span>
        </div>

        <div class="space-y-3.5 mb-6">
          ${v.map((m,h)=>{const c=e.has(m.id);return`
              <div class="record-card p-4 bg-white border ${c?"border-[#bd6f5d] bg-amber-50/20":"border-[var(--grid-border)]"} rounded-xs transition shadow-xs flex items-start justify-between gap-4" data-id="${m.id}" tabindex="0">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-mono text-[var(--accent-gold)] uppercase tracking-wider">${m.id} • ${m.note}</span>
                  </div>
                  <div class="text-xs font-semibold text-[var(--text-primary)]">${m.title}</div>
                  <div class="text-xs text-[var(--text-secondary)] font-mono leading-relaxed bg-[#faf8f5] p-2 border border-[var(--grid-border)]/60 rounded-xs mt-1">
                    ${m.text}
                  </div>
                </div>

                <button type="button" class="toggle-flag-btn px-3 py-2 border text-xs font-mono uppercase tracking-wider shrink-0 transition rounded-xs ${c?"bg-[#bd6f5d] text-white border-[#bd6f5d]":"bg-white text-[var(--text-secondary)] border-[var(--grid-border)] hover:border-[var(--accent-gold)]"}" data-id="${m.id}">
                  ${c?"Discrepancy Flagged":"Flag Discrepancy"}
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
    `,i.querySelectorAll(".record-card").forEach((m,h)=>{const c=m.getAttribute("data-id"),b=()=>{r.has(c)||(r.add(c),t("record_inspected",{trial_index:h,stimulus_id:c,task_def_version:"1.0"}))};m.addEventListener("focus",b),m.addEventListener("mouseenter",b)}),i.querySelectorAll(".toggle-flag-btn").forEach((m,h)=>{const c=m.getAttribute("data-id"),b=g=>{d=g;const f=!e.has(c);f?e.add(c):e.delete(c),t("discrepancy_toggled",{trial_index:h,stimulus_id:c,flagged_state:f,input_modality:d,task_def_version:"1.0"}),p()};m.addEventListener("click",()=>b("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),b("keyboard"))})}),(n=document.getElementById("a3SubmitBtn"))==null||n.addEventListener("click",()=>{t("verification_finalized",{action_id:"approve_ledger",input_modality:d,task_def_version:"1.0"}),l({mini_game:"A3",observations_count:v.length})})}p()}function Q(i,a){const{appContainer:t,miniGameIndex:l,logEvent:o,onMiniGameComplete:e}=i;switch(l){case 0:J(t,a,o,e);break;case 1:U(t,a,o,e);break;case 2:K(t,a,o,e);break}}function J(i,a,t,l){let o=!0,e=0,r=50,d="accommodate",v="mouse",p=null;const u=[{stimulus_id:"F1_T1",title:"Acoustic Note: Reverberant Strain",cue_text:'"The sound in the front row has a sharp treble edge and heavy wall reflection."',default_action:"accommodate"},{stimulus_id:"F1_T2",title:"Acoustic Note: Effortless Resonance",cue_text:'"Acoustics in the center hall are clear; resonance is balanced and effortless."',default_action:"maintain_objective"},{stimulus_id:"F1_T3",title:"Acoustic Note: Quiet Passage",cue_text:'"The speaker is reciting a whisper passage; verse intelligibility is dipping."',default_action:"accommodate"},{stimulus_id:"F1_T4",title:"Acoustic Note: Ambiguous Silence",cue_text:'"A sudden pause in the audio stream — could be dramatic silence or a channel fault."',default_action:"clarify"},{stimulus_id:"F1_T5",title:"Acoustic Note: Balanced Choral",cue_text:'"Choral recitation is balanced and rhythm is completely stable throughout the room."',default_action:"maintain_objective"},{stimulus_id:"F1_T6",title:"Acoustic Note: Projected Forte",cue_text:'"Vocal projection is peaking sharply on dramatic verse accents in the hall."',default_action:"accommodate"}];function n(){var C,I;if(p&&(cancelAnimationFrame(p),p=null),o){i.innerHTML=`
        <div>
          ${a("Part 1: Tuning the Hall","Calibrating the soundscape for the poetry recital across changing acoustic moments.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>',goal:"Observe each acoustic feedback note and adjust your approach accordingly across 6 trials.",steps:["Review the acoustic feedback note from the setup team.","Choose your response approach: Accommodate, Maintain Baseline, or Clarify.","Adjust the acoustic slider if needed, then confirm your setting."]})}
        </div>
      `,(C=document.getElementById("startActivityBtn"))==null||C.addEventListener("click",()=>{o=!1,e=0,r=50,d="accommodate",n()});return}const m=u[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 1: Tuning the Hall","Adjust the acoustic profile to support the recital.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Trial ${e+1} of 6</span>
        </div>

        <!-- Acoustic Dialogue Note -->
        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3 shadow-xs">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${m.title}</div>
            <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${m.cue_text}</div>
          </div>
        </div>

        <!-- Action Approach Selection -->
        <div class="mb-5">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-medium">Select Operational Response:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${d==="accommodate"?"border-[var(--accent-gold)] bg-amber-50/50":"border-[var(--grid-border)] bg-white"}" data-action="accommodate">
              <div class="text-xs font-semibold text-[var(--text-primary)]">Accommodate</div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">Adapt acoustic filter to assist the speaker</div>
            </button>
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${d==="maintain_objective"?"border-[var(--accent-gold)] bg-amber-50/50":"border-[var(--grid-border)] bg-white"}" data-action="maintain_objective">
              <div class="text-xs font-semibold text-[var(--text-primary)]">Maintain Objective</div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">Keep baseline acoustic balance undisturbed</div>
            </button>
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${d==="clarify"?"border-[var(--accent-gold)] bg-amber-50/50":"border-[var(--grid-border)] bg-white"}" data-action="clarify">
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
              <span class="font-mono text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)]" id="sliderValDisplay">${r}</span>
              <span class="flex items-center gap-1">Bright (100) <span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span></span>
            </div>
            <input type="range" id="freqSlider" min="0" max="100" step="5" value="${r}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
          </div>
        </div>

        <div class="flex justify-end">
          <button id="lockFreqBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            ${e<5?"Confirm Setting &rarr;":"Finish Acoustic Calibration &rarr;"}
          </button>
        </div>
      </div>
    `;const h=document.getElementById("waveCanvas"),c=h==null?void 0:h.getContext("2d"),b=document.getElementById("freqSlider"),g=document.getElementById("sliderValDisplay");let f=0;function E(){if(!c||!h)return;c.clearRect(0,0,h.width,h.height),c.strokeStyle="#f0eeea",c.lineWidth=1;for(let k=0;k<h.width;k+=30)c.beginPath(),c.moveTo(k,0),c.lineTo(k,h.height),c.stroke();c.strokeStyle="#bd6f5d",c.lineWidth=2.5,c.beginPath();const w=.015+r/100*.05,B=14+Math.abs(r-50)/50*16;for(let k=0;k<h.width;k++){const P=h.height/2+Math.sin(k*w+f)*B;k===0?c.moveTo(k,P):c.lineTo(k,P)}c.stroke(),f+=.04,p=requestAnimationFrame(E)}E(),i.querySelectorAll(".f1-action-btn").forEach(w=>{w.addEventListener("click",B=>{v="mouse",d=w.getAttribute("data-action"),i.querySelectorAll(".f1-action-btn").forEach(k=>{k.classList.remove("border-[var(--accent-gold)]","bg-amber-50/50"),k.classList.add("border-[var(--grid-border)]","bg-white")}),w.classList.add("border-[var(--accent-gold)]","bg-amber-50/50"),w.classList.remove("border-[var(--grid-border)]","bg-white")})}),b==null||b.addEventListener("input",w=>{v=w.pointerType||"mouse",r=parseInt(w.target.value,10),g&&(g.textContent=r),t("slider_input",{trial_index:e,stimulus_id:m.stimulus_id,slider_position_raw:r,input_modality:v,task_def_version:"1.0"})}),b==null||b.addEventListener("keydown",w=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(w.key)&&(v="keyboard")}),(I=document.getElementById("lockFreqBtn"))==null||I.addEventListener("click",()=>{p&&(cancelAnimationFrame(p),p=null),t("trial_submit",{trial_index:e,stimulus_id:m.stimulus_id,action_id:d,slider_position_raw:r,input_modality:v,task_def_version:"1.0"}),e<5?(e++,r=50,d=u[e].default_action,n()):l({mini_game:"F1",observations_count:6})})}n()}function U(i,a,t,l){let o=!0,e=0,r=null,d="mouse";const v=[{stimulus_id:"F2_T1",speaker_role:"Stage Director",cue_text:'"The reciting poet gestures clearly toward the side monitor speaker, explicitly requesting vocal support."',condition_label:"Direct Request"},{stimulus_id:"F2_T2",speaker_role:"Rehearsal Coordinator",cue_text:'"The speaker pauses mid-line with an uncertain expression; their tone is hesitant but no instruction is given."',condition_label:"Ambiguous Signal"},{stimulus_id:"F2_T3",speaker_role:"Sound Technician",cue_text:'"The performer delivers an impassioned verse with intense strain in their voice, as part of the theatrical performance."',condition_label:"Expressive Intensity"},{stimulus_id:"F2_T4",speaker_role:"Guest Accompanist",cue_text:'"The accompanying percussionist has subtly altered tempo and is watching the reciter intently to re-establish synchrony."',condition_label:"Subtle Drift"}],p=[{id:"act",title:"Act Directly",desc:"Take immediate operational action to adapt sound levels and support the speaker."},{id:"clarify",title:"Clarify Intent",desc:"Seek confirmation or verify the partner’s preference before making changes."},{id:"maintain",title:"Maintain Course",desc:"Preserve the ongoing acoustic cadence without premature intervention."}];function u(){var h;if(o){i.innerHTML=`
        <div>
          ${a("Part 2: The Gathering Voices","Coordinating acoustic clarity with your event colleagues across 4 communication situations.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>',goal:"Evaluate the communication cue in each trial and select whether to act, clarify, or maintain course.",steps:["Read the operational feedback and partner state description.","Assess whether information is clear, ambiguous, or misleading.","Choose your response: Act, Clarify, or Maintain."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{o=!1,e=0,r=null,u()});return}const n=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 2: The Gathering Voices","Evaluate the communication situation and choose your course of action.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Trial ${e+1} of 4</span>
        </div>

        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${n.speaker_role}</div>
            <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${n.cue_text}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${p.map(c=>`
            <div class="f2-card p-4 bg-white border ${r===c.id?"border-[var(--accent-gold)] bg-amber-50/40 shadow-sm":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2 rounded-xs" data-action="${c.id}" tabindex="0" role="button">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${r===c.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                ${c.title}
              </div>
              <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${c.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="f2ConfirmBtn" ${r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            ${e<3?"Confirm Communication &rarr;":"Finish Coordination &rarr;"}
          </button>
        </div>
      </div>
    `;const m=document.getElementById("f2ConfirmBtn");i.querySelectorAll(".f2-card").forEach(c=>{const b=g=>{var f,E;d=g,r=c.getAttribute("data-action"),i.querySelectorAll(".f2-card").forEach(C=>{var I,w;C.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40","shadow-sm"),C.classList.add("border-[var(--grid-border)]"),(I=C.querySelector("span.rounded-full"))==null||I.classList.remove("bg-[var(--accent-gold)]"),(w=C.querySelector("span.rounded-full"))==null||w.classList.add("bg-stone-300")}),c.classList.add("border-[var(--accent-gold)]","bg-amber-50/40","shadow-sm"),c.classList.remove("border-[var(--grid-border)]"),(f=c.querySelector("span.rounded-full"))==null||f.classList.add("bg-[var(--accent-gold)]"),(E=c.querySelector("span.rounded-full"))==null||E.classList.remove("bg-stone-300"),m&&(m.disabled=!1)};c.addEventListener("click",()=>b("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),b("keyboard"))})}),m==null||m.addEventListener("click",()=>{t("trial_submit",{trial_index:e,stimulus_id:n.stimulus_id,action_id:r,input_modality:d,task_def_version:"1.0"}),e<3?(e++,r=null,u()):l({mini_game:"F2",observations_count:4})})}u()}function K(i,a,t,l){let o=!0,e=0,r=50,d="mouse";const v=[{stimulus_id:"F3_T1",venue_name:"Stone Hall",acoustic_shift:"The recitation enters the vaulted stone hall. Stone surfaces generate pronounced high-frequency reverberation.",objective_note:"Constant Objective: Keep recited poetry crisp, clear, and unblurred by the environment."},{stimulus_id:"F3_T2",venue_name:"Carpeted Courtyard",acoustic_shift:"The performance moves to the carpeted inner courtyard. Heavy tapestries and floor coverings deaden natural decay.",objective_note:"Constant Objective: Keep recited poetry crisp, clear, and unblurred by the environment."},{stimulus_id:"F3_T3",venue_name:"Open Colonnade",acoustic_shift:"The performance concludes in the open colonnade. Exterior breeze and open air introduce low-frequency ambient drift.",objective_note:"Constant Objective: Keep recited poetry crisp, clear, and unblurred by the environment."}];function p(){var c,b;if(o){i.innerHTML=`
        <div>
          ${a("Part 3: The Echo of the Room","Adapting acoustics across 3 distinct venue transitions while keeping verse clarity constant.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>',goal:"Maintain the constant objective of vocal clarity as the performance moves through 3 successive environments.",steps:["Notice the acoustic transition notice for the new venue space.","Remember the objective: maintain crisp, intelligible verse.","Adjust the acoustic balance slider for the new space and save."]})}
        </div>
      `,(c=document.getElementById("startActivityBtn"))==null||c.addEventListener("click",()=>{o=!1,e=0,r=50,u(),p()});return}const n=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 3: The Echo of the Room","Adapt natural acoustics as the performance transitions into a new space.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Transition ${e+1} of 3</span>
        </div>

        <!-- Constant Objective Banner -->
        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>Constant Objective:</strong> Maintain spoken verse clarity and intelligible presence.
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">Venue: ${n.venue_name}</span>
        </div>

        <!-- Venue Transition Notice -->
        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${n.venue_name} Acoustic Shift</div>
            <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${n.acoustic_shift}</div>
          </div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-inner">
          <div class="w-full max-w-md mx-auto">
            <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
              <span class="font-medium text-stone-700">Crisp Direct (0%)</span>
              <span class="font-mono text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)]" id="hallValDisplay">${r}%</span>
              <span class="font-medium text-stone-700">Open Ambient (100%)</span>
            </div>
            <input type="range" id="hallSlider" min="0" max="100" step="5" value="${r}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
          </div>
        </div>

        <div class="flex justify-end">
          <button id="f3LockBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            ${e<2?"Save Transition Setting &rarr;":"Finalize Acoustic Adaptation &rarr;"}
          </button>
        </div>
      </div>
    `;const m=document.getElementById("hallSlider"),h=document.getElementById("hallValDisplay");m==null||m.addEventListener("input",g=>{d=g.pointerType||"mouse",r=parseInt(g.target.value,10),h&&(h.textContent=`${r}%`),t("slider_input",{trial_index:e,stimulus_id:n.stimulus_id,slider_position_raw:r,input_modality:d,task_def_version:"1.0"})}),m==null||m.addEventListener("keydown",g=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(g.key)&&(d="keyboard")}),(b=document.getElementById("f3LockBtn"))==null||b.addEventListener("click",()=>{t("trial_submit",{trial_index:e,stimulus_id:n.stimulus_id,action_id:"update_acoustic_balance",slider_position_raw:r,input_modality:d,task_def_version:"1.0"}),e<2?(e++,r=50,u(),p()):l({mini_game:"F3",observations_count:3})})}function u(){const n=v[e];t("transition_presented",{trial_index:e,stimulus_id:n.stimulus_id,venue:n.venue_name,task_def_version:"1.0"})}p()}function Y(i,a){const{appContainer:t,miniGameIndex:l,logEvent:o,onMiniGameComplete:e}=i;switch(l){case 0:X(t,a,o,e);break;case 1:Z(t,a,o,e);break;case 2:ee(t,a,o,e);break}}function X(i,a,t,l){let o=!0,e=0,r=0,d="mouse";const v=[{stimulus_id:"C1_R1",title:"Round 1: Partner Mosaic Deficit",description:"Your partner’s workstation is short by 3 tiles to complete their mosaic panel. You have 8 tiles.",partner_initial:2,user_initial:8,default_transfer:0,context_note:"Partner Deficit Condition"},{stimulus_id:"C1_R2",title:"Round 2: Balanced Mosaic Workstation",description:"Both you and your partner have adequate supplies (5 tiles each) to complete your respective panels.",partner_initial:5,user_initial:5,default_transfer:0,context_note:"Balanced Need Condition"},{stimulus_id:"C1_R3",title:"Round 3: Partner Surplus Control",description:"Your partner already has an excess of materials (8 tiles) for their section, while you have 5 tiles.",partner_initial:8,user_initial:5,default_transfer:0,context_note:"Surplus / No-Need Control"}];function p(){var c,b,g,f;if(o){i.innerHTML=`
        <div>
          ${a("Part 1: The Artisan's Basket","Coordinating ceramic mosaic supplies with your workshop partner across 3 distinct inventory situations.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',goal:"Evaluate the inventory needs in each round and decide how many tiles (if any) to transfer from your basket.",steps:["Check both workstations to see if materials are in deficit, balanced, or surplus.","Use the + / - buttons to set your transfer count.","Confirm your distribution for each of the 3 rounds."]})}
        </div>
      `,(c=document.getElementById("startActivityBtn"))==null||c.addEventListener("click",()=>{o=!1,e=0,r=0,u(),p()});return}const n=v[e],m=n.partner_initial+r,h=n.user_initial-r;i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 1: The Artisan's Basket","Review workstation requirements and allocate tiles appropriately.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Round ${e+1} of 3</span>
        </div>

        <!-- Situation Banner -->
        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${n.title}:</strong> ${n.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${n.context_note}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-[var(--accent-gold)] uppercase font-semibold tracking-wider font-mono">Partner Basket</span>
              <div class="text-xl font-serif font-semibold text-[#bd6f5d] mt-1">${m} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0,m)).fill('<div class="w-4 h-4 bg-[#bd6f5d]/70 rounded-xs shadow-xs"></div>').join("")}
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
              <span id="transferCount" class="font-serif text-3xl font-semibold text-[var(--accent-gold)] w-10 text-center">${r}</span>
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
    `,(b=document.getElementById("minusTileBtn"))==null||b.addEventListener("click",()=>{d="mouse",r>0&&(r--,t("resource_transferred",{trial_index:e,stimulus_id:n.stimulus_id,delta:-1,action_type:"return_to_user",input_modality:d,task_def_version:"1.0"}),p())}),(g=document.getElementById("plusTileBtn"))==null||g.addEventListener("click",()=>{d="mouse",r<n.user_initial&&(r++,t("resource_transferred",{trial_index:e,stimulus_id:n.stimulus_id,delta:1,action_type:"transfer_to_partner",input_modality:d,task_def_version:"1.0"}),p())}),(f=document.getElementById("confirmTransferBtn"))==null||f.addEventListener("click",()=>{t("allocation_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,input_modality:d,task_def_version:"1.0"}),e<2?(e++,r=0,u(),p()):l({mini_game:"C1",observations_count:3})})}function u(){const n=v[e];t("round_presented",{trial_index:e,stimulus_id:n.stimulus_id,input_modality:d,task_def_version:"1.0"})}p()}function Z(i,a,t,l){let o=!0,e=0,r=null,d="mouse";const v=[{stimulus_id:"C2_R1",title:"Round 1: Open Wall Turn",partner_desc:"Partner has hung their painting on the Upper Left (North) cluster.",slots:[{id:"SLOT_NORTH_RIGHT",label:"Upper Right (Balanced Spacing)"},{id:"SLOT_OVERLAP_LEFT",label:"Adjacent Left (Tight Cluster)"},{id:"SLOT_BOTTOM_CENTER",label:"Lower Center (Vertical Complement)"}]},{stimulus_id:"C2_R2",title:"Round 2: Restricted Wall Space",partner_desc:"Partner is framing the Center Hallway; central corridor clearance must remain open.",slots:[{id:"SLOT_PERIMETER_EAST",label:"East Perimeter (Clear Corridor)"},{id:"SLOT_CENTER_ADJACENT",label:"Center Blocking Slot (Crowds Hallway)"},{id:"SLOT_PERIMETER_WEST",label:"West Perimeter (Clear Corridor)"}]},{stimulus_id:"C2_R3",title:"Round 3: Dynamic Canvas Adjustment",partner_desc:"Partner shifted their composition toward the Lower (South) exhibition area.",slots:[{id:"SLOT_UPPER_GALLERY",label:"Upper Wall (Restores Bilateral Balance)"},{id:"SLOT_LOWER_CONGESTED",label:"Lower Wall (Overcrowds South)"},{id:"SLOT_MID_SIDE",label:"Mid-Side Niche (Neutral Position)"}]}];function p(){var m,h;if(o){i.innerHTML=`
        <div>
          ${a("Part 2: The Gallery Wall","Coordinating artwork hanging positions across 3 spatial layout rounds.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>',goal:"Select an artwork hanging slot in each round that complements your partner’s arrangement without interference.",steps:["Review your colleague’s hung piece and the layout state in each round.","Inspect the available placement slots on the wall.","Confirm your chosen position across all 3 rounds."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{o=!1,e=0,r=null,u(),p()});return}const n=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 2: The Gallery Wall","Coordinate placement with your partner’s artwork.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Round ${e+1} of 3</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${n.title}:</strong> ${n.partner_desc}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${n.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="w-full bg-white border border-[var(--grid-border)] p-6 rounded-xs shadow-inner mb-4">
            <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Available Wall Placement Slots:</div>
            <div class="flex flex-col gap-2.5">
              ${n.slots.map(c=>`
                <button type="button" class="slot-btn px-4 py-3 text-xs border rounded-xs ${r===c.id?"border-[var(--accent-gold)] bg-amber-50 font-semibold shadow-xs":"border-[var(--grid-border)] bg-white hover:border-[var(--accent-gold)]"} transition flex items-center justify-between" data-slot="${c.id}" tabindex="0">
                  <span class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${r===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-400"}">${r===c.id?"✓":""}</span>
                    <span class="text-[var(--text-primary)]">${c.label}</span>
                  </span>
                  <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${c.id}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmWallBtn" ${r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<2?"Confirm Placement &rarr;":"Finish Wall Coordination &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".slot-btn").forEach(c=>{const b=g=>{d=g,r=c.getAttribute("data-slot"),t("placement_attempted",{trial_index:e,stimulus_id:n.stimulus_id,slot_id:r,input_modality:d,task_def_version:"1.0"}),p()};c.addEventListener("click",()=>b("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),b("keyboard"))})}),(h=document.getElementById("confirmWallBtn"))==null||h.addEventListener("click",()=>{t("placement_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_slot:r,input_modality:d,task_def_version:"1.0"}),e<2?(e++,r=null,u(),p()):l({mini_game:"C2",observations_count:3})})}function u(){const n=v[e];t("round_presented",{trial_index:e,stimulus_id:n.stimulus_id,task_def_version:"1.0"})}p()}function ee(i,a,t,l){let o=!0,e=0,r=null,d=null,v="mouse";const p=[{stimulus_id:"C3_R1",title:"Opportunity 1: Partner Circuit Breakdown",partner_state:"Partner’s exhibition lantern circuit has gone dark due to an electrical conduit misalignment.",condition_type:"identify_and_repair",fault_options:[{id:"fault_conduit_disconnected",label:"Conduit feeder disconnected at terminal block"},{id:"fault_bulb_broken",label:"Bulb filament shattered"},{id:"fault_switch_off",label:"Main pavilion master switch is turned off"}],repair_options:[{id:"adjust_conduit",label:"Realight conduit terminal and secure ground clamp"},{id:"call_help_desk",label:"Click general help desk button"},{id:"replace_lantern",label:"Dismantle lantern fixture"}],execution_action:"restore_power"},{stimulus_id:"C3_R2",title:"Opportunity 2: Hanging Rig Counterweight Jam",partner_state:"Partner’s ceiling suspension cable is jammed in the pulley guide, preventing joint panel alignment.",condition_type:"identify_and_repair",fault_options:[{id:"fault_cable_pulley_pinch",label:"Suspension cable wedged between pulley wheel and guide bracket"},{id:"fault_cable_snapped",label:"Counterweight line severed completely"},{id:"fault_wall_anchor_loose",label:"Wall anchor bolt loosened"}],repair_options:[{id:"reseat_pulley_cable",label:"Release tension lever and reseat cable into center pulley groove"},{id:"call_facility_maintenance",label:"Log generic facility maintenance request ticket"},{id:"force_pull_cable",label:"Yank cable forcefully downward"}],execution_action:"align_panel_height"},{stimulus_id:"C3_R3",title:"Opportunity 3: Shadow Corridor Obstruction",partner_state:"Partner’s painting is obscured by an accidental spotlight shadow barrier.",condition_type:"identify_and_repair",fault_options:[{id:"fault_blindspot_obstruction",label:"Spotlight angle obstructed by movable partition"},{id:"fault_color_distortion",label:"Color temperature mismatched"}],repair_options:[{id:"shift_lantern",label:"Re-angle spotlight beam 30 degrees to bypass obstruction"},{id:"generic_complaint",label:"Submit generic lighting complaint ticket"}],execution_action:"illuminate_path"}];function u(){var h,c;if(o){i.innerHTML=`
        <div>
          ${a("Part 3: The Dual Lanterns","Diagnosing and repairing collaborative workflow breakdowns across 3 exhibition situations.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',goal:"Collaboratively repair workflow breakdowns: identify the specific issue, perform a useful repair action, and execute the fix.",steps:["Examine the operational situation in each opportunity.","Identify the breakdown root cause (or recognize clean balance).","Select a constructive repair action and execute the solution."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{o=!1,e=0,r=null,d=null,n(),u()});return}const m=p[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 3: The Dual Lanterns","Resolve operational breakdowns to maintain joint exhibition harmony.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Opportunity ${e+1} of 3</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${m.title}:</strong> ${m.partner_state}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${m.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <!-- Step 1: Identify Breakdown -->
          <div class="mb-5">
            <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2">
              Step 1: Identify the Operational Breakdown
            </div>
            <div class="space-y-2">
              ${m.fault_options.map(b=>`
                <div class="fault-opt p-3 bg-white border ${r===b.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center gap-2" data-fault="${b.id}" tabindex="0" role="button">
                  <span class="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px] ${r===b.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${r===b.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)]">${b.label}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Step 2: Perform Constructive Repair -->
          ${r?`
            <div class="mb-5 pt-4 border-t border-[var(--grid-border)] animate-fadeIn">
              <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                Step 2: Perform Constructive Repair Action
              </div>
              <div class="space-y-2">
                ${m.repair_options.map(b=>`
                  <div class="repair-opt p-3 bg-white border ${d===b.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center gap-2" data-repair="${b.id}" tabindex="0" role="button">
                    <span class="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px] ${d===b.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${d===b.id?"✓":""}</span>
                    <span class="text-[var(--text-primary)]">${b.label}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          `:""}
        </div>

        <div class="flex justify-end">
          <button type="button" id="executeRepairBtn" ${r&&d?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<2?"Execute Repair & Proceed &rarr;":"Finalize Joint Repair &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".fault-opt").forEach(b=>{const g=f=>{v=f,r=b.getAttribute("data-fault"),t("breakdown_identified",{trial_index:e,stimulus_id:m.stimulus_id,fault_id:r,input_modality:v,task_def_version:"1.0"}),u()};b.addEventListener("click",()=>g("mouse")),b.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g("keyboard"))})}),i.querySelectorAll(".repair-opt").forEach(b=>{const g=f=>{v=f,d=b.getAttribute("data-repair"),t("repair_action_performed",{trial_index:e,stimulus_id:m.stimulus_id,repair_action_id:d,input_modality:v,task_def_version:"1.0"}),u()};b.addEventListener("click",()=>g("mouse")),b.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g("keyboard"))})}),(c=document.getElementById("executeRepairBtn"))==null||c.addEventListener("click",()=>{t("repaired_action_executed",{trial_index:e,stimulus_id:m.stimulus_id,fault_id:r,repair_action_id:d,execution_action_id:m.execution_action,input_modality:v,task_def_version:"1.0"}),e<2?(e++,r=null,d=null,n(),u()):l({mini_game:"C3",observations_count:3})})}function n(){const m=p[e];t("repair_presented",{trial_index:e,stimulus_id:m.stimulus_id,task_def_version:"1.0"})}u()}function te(i,a){const{appContainer:t,miniGameIndex:l,logEvent:o,onMiniGameComplete:e}=i;switch(l){case 0:ie(t,a,o,e);break;case 1:ae(t,a,o,e);break;case 2:re(t,a,o,e);break}}function ie(i,a,t,l){let o=!0,e=0,r=0,d="mouse";const v=[{stimulus_id:"E1_T1",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T2",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T3",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T4",color:"Sage",shape:"Square",icon:"&#9632;",label:"Sage Square"},{stimulus_id:"E1_T5",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T6",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T7",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T8",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T9",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"}];function p(){var m;if(o){i.innerHTML=`
        <div>
          ${a("Part 1: The Ceramic Mosaic","Sorting geometric tiles into exhibition bins across 9 successive sorting opportunities.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>',goal:"Observe each ceramic tile and assign it to the matching container.",steps:["Examine the stimulus tile presented on the central easel.","Choose Container 1 or Container 2 based on pattern correspondence.","Sort all 9 tiles to complete the series."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{o=!1,e=0,r=performance.now(),u(),p()});return}const n=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 1: The Ceramic Mosaic","Sort each mosaic tile into the appropriate exhibition container.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Tile ${e+1} of ${v.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>Mosaic Stage:</strong> Determine the matching container for the presented tile.
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${n.stimulus_id}</span>
        </div>

        <!-- Stimulus Presentation Area -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="text-5xl mb-2.5 transition-transform hover:scale-105 ${n.color==="Gold"?"text-[var(--accent-gold)]":"text-emerald-700"}">
            ${n.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${n.label}</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1 font-mono uppercase">${n.color} &bull; ${n.shape}</div>
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
    `,i.querySelectorAll(".bin-btn").forEach(h=>{const c=b=>{d=b;const g=h.getAttribute("data-choice"),f=Math.max(10,performance.now()-r);t("tile_sorted",{trial_index:e,stimulus_id:n.stimulus_id,choice:g,dwell_ms:Math.round(f),input_modality:d,task_def_version:"1.0"}),e<v.length-1?(e++,r=performance.now(),u(),p()):l({mini_game:"E1",observations_count:9})};h.addEventListener("click",()=>c("mouse")),h.addEventListener("keydown",b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),c("keyboard"))})})}function u(){const n=v[e];t("trial_presented",{trial_index:e,stimulus_id:n.stimulus_id,tile_color:n.color,tile_shape:n.shape,task_def_version:"1.0"})}p()}function ae(i,a,t,l){let o=!0,e=0,r=null,d="mouse";const v=[{stimulus_id:"E2_S1",title:"Sequence 1: Workspace Pigment Spill",situation:"A sudden ink droplet spilled across your active workstation layout card.",has_disruption:!0,disruption_type:"ink_spill_masking_workspace",options:[{id:"clear_workspace",label:"Dab spill with blotting linen and realign layout card",note:"Constructive recovery action"},{id:"rush_uncleaned",label:"Continue assembly without cleaning around the smudge",note:"Rushed compromise"},{id:"pause_idle",label:"Step away from the bench to wait for guidance",note:"Passive hesitation"}]},{stimulus_id:"E2_S2",title:"Sequence 2: Calm Working Cadence",situation:"The work area is undisturbed, materials are organized, and light is balanced.",has_disruption:!1,disruption_type:"undisrupted_control",options:[{id:"standard_sequence",label:"Proceed with planned standard mosaic montage sequence",note:"Standard constructive cadence"},{id:"unnecessary_rework",label:"Disassemble existing tiles to verify underlayer unnecessarily",note:"Unneeded re-examination"},{id:"pause_idle",label:"Pause activity to double-check surroundings",note:"Passive delay"}]},{stimulus_id:"E2_S3",title:"Sequence 3: Courtyard Draft Disruption",situation:"A courtyard breeze displaced your paper reference template off the table.",has_disruption:!0,disruption_type:"draft_blows_reference_card",options:[{id:"stabilize_reference",label:"Retrieve reference card and secure it with corner stone weight",note:"Constructive securing action"},{id:"guess_motif",label:"Continue placing tiles from rough memory without the template",note:"Unanchored improvisation"},{id:"pause_idle",label:"Wait for indoor air current to settle",note:"Passive hesitation"}]},{stimulus_id:"E2_S4",title:"Sequence 4: Misplaced Ceramic Tray",situation:"The neighboring glaze palette was nudged, obstructing your primary tool rest.",has_disruption:!0,disruption_type:"misplaced_pigment_tray",options:[{id:"reposition_tray",label:"Gently shift the neighboring palette back onto its runner",note:"Constructive realignment"},{id:"use_wrong_shade",label:"Work around the obstruction in an awkward wrist posture",note:"Rushed ergonomic compromise"},{id:"pause_idle",label:"Stop work until the assistant returns",note:"Passive hesitation"}]}];function p(){var m,h;if(o){i.innerHTML=`
        <div>
          ${a("Part 2: The Courtyard Setup","Managing operational adjustments and studio setbacks across 4 workshop sequences.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',goal:"Respond constructively to workshop situations and unexpected physical adjustments.",steps:["Review the atelier situation presented in each sequence.","Evaluate the 3 response options.","Select your constructive operational response across all 4 sequences."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{o=!1,e=0,r=null,u(),p()});return}const n=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 2: The Courtyard Setup","Select the appropriate constructive operational response.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Sequence ${e+1} of ${v.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${n.title}:</strong> ${n.situation}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${n.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Available Operational Responses:</div>
          <div class="space-y-3">
            ${n.options.map(c=>`
              <div class="e2-opt p-4 bg-white border ${r===c.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-action="${c.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${r===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${r===c.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${c.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${c.note}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmE2Btn" ${r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<v.length-1?"Confirm Response &rarr;":"Finish Setup Sequences &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".e2-opt").forEach(c=>{const b=g=>{d=g,r=c.getAttribute("data-action"),t("action_selected",{trial_index:e,stimulus_id:n.stimulus_id,action_id:r,input_modality:d,task_def_version:"1.0"}),p()};c.addEventListener("click",()=>b("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),b("keyboard"))})}),(h=document.getElementById("confirmE2Btn"))==null||h.addEventListener("click",()=>{t("sequence_completed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_action:r,input_modality:d,task_def_version:"1.0"}),e<v.length-1?(e++,r=null,u(),p()):l({mini_game:"E2",observations_count:4})})}function u(){const n=v[e];t("sequence_presented",{trial_index:e,stimulus_id:n.stimulus_id,has_disruption:n.has_disruption,disruption_type:n.disruption_type,task_def_version:"1.0"})}p()}function re(i,a,t,l){let o=!0,e=0,r=null,d="mouse";const v=[{stimulus_id:"E3_C1",title:"Condition 1: Full Tri-Tone Palette",constraint_state:"standard_three_color_palette",description:"Standard studio conditions: gold, sage, and terracotta pigments are all available on the bench.",options:[{id:"standard_layout",label:"Balanced Tri-Tone Motif (Symmetrical triad placement)"},{id:"tonal_adaptation",label:"Monochrome Grayscale Contrast (Single shade emphasis)"},{id:"compact_adaptation",label:"Half-Grid High Density Compression"}]},{stimulus_id:"E3_C2",title:"Condition 2: Monochrome Indigo Restriction",constraint_state:"monochrome_indigo_only",description:"Material restriction: only single indigo pigment is available; contrast must be achieved through tonal density.",options:[{id:"tonal_adaptation",label:"Tonal Value Gradient (Depth through hatching and value density)"},{id:"standard_layout",label:"Attempt Tri-Color Separation (Incompatible with single pigment)"},{id:"compact_adaptation",label:"Compressed Stamp Layout"}]},{stimulus_id:"E3_C3",title:"Condition 3: Constricted Border Grid",constraint_state:"boundary_constricted_half_grid",description:"Spatial constraint: available wall boundary is reduced to half-width; artwork must be scaled to compact dimensions.",options:[{id:"compact_adaptation",label:"Compact Geometric Scaling (Dense micro-mosaic adaptation)"},{id:"standard_layout",label:"Standard Wide Layout (Exceeds constricted boundary)"},{id:"tonal_adaptation",label:"Unscaled Shading Layout"}]}];function p(){var m,h;if(o){i.innerHTML=`
        <div>
          ${a("Part 3: The Shifting Medium","Adapting aesthetic compositions across 3 shifting environmental constraints.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>',goal:"Adapt your mosaic design strategy to match the shifting environmental conditions while maintaining aesthetic harmony.",steps:["Examine the active studio constraints in each transition.","Choose the layout adaptation best aligned with the constraints.","Confirm your composition across all 3 transitions."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{o=!1,e=0,r=null,u(),p()});return}const n=v[e];i.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${a("Part 3: The Shifting Medium","Adapt composition strategy to active constraint requirements.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Condition ${e+1} of ${v.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${n.title}:</strong> ${n.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${n.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Composition Adaptation Strategies:</div>
          <div class="space-y-3">
            ${n.options.map(c=>`
              <div class="e3-opt p-4 bg-white border ${r===c.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-layout="${c.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${r===c.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${r===c.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${c.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${c.id}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmE3Btn" ${r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<v.length-1?"Confirm Adaptation &rarr;":"Finish World 4 &rarr;"}
          </button>
        </div>
      </div>
    `,i.querySelectorAll(".e3-opt").forEach(c=>{const b=g=>{d=g,r=c.getAttribute("data-layout"),t("composition_action_attempted",{trial_index:e,stimulus_id:n.stimulus_id,action_id:r,input_modality:d,task_def_version:"1.0"}),p()};c.addEventListener("click",()=>b("mouse")),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),b("keyboard"))})}),(h=document.getElementById("confirmE3Btn"))==null||h.addEventListener("click",()=>{t("composition_confirmed",{trial_index:e,stimulus_id:n.stimulus_id,chosen_action:r,input_modality:d,task_def_version:"1.0"}),e<v.length-1?(e++,r=null,u(),p()):l({mini_game:"E3",observations_count:3})})}function u(){const n=v[e];t("condition_presented",{trial_index:e,stimulus_id:n.stimulus_id,constraint_state:n.constraint_state,task_def_version:"1.0"})}p()}function ne(i,a){const{appContainer:t,miniGameIndex:l,logEvent:o,onMiniGameComplete:e}=i;switch(l){case 0:se(t,a,o,e);break;case 1:oe(t,a,o,e);break;case 2:de(t,a,o,e);break}}function se(i,a,t,l){let o=!0,e=0;const r=[{id:"ALC_1",title:"Chamber I: Mineral Pigments",text:"Shows how blue lapis lazuli and gold leaf were ground by hand to create vibrant border illuminations in ancient Srinagar."},{id:"ALC_2",title:"Chamber II: Koshur Paper",text:"Explains how traditional Kashmiri rag paper (Koshur Kagaz) is made from hemp pulp and burnished with smooth agate stone."},{id:"ALC_3",title:"Chamber III: Oral Verse Metres",text:"Details how classical Sufi poetry metres were sung aloud across courtyards to remember rhymes before printing existed."}];let d={};function v(){var p,u;if(o){i.innerHTML=`
        <div>
          ${a("Part 1: The Three Chambers","Exploring optional historical side chambers across the courtyard.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',goal:"Visit side chambers to learn about historical craft traditions, or proceed directly.",steps:["Click any side chamber card to uncover its archival story.","Read the historical technique recorded by the collective.","Proceed when you are ready."]})}
        </div>
      `,(p=document.getElementById("startActivityBtn"))==null||p.addEventListener("click",()=>{o=!1,v()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        ${a("Part 1: The Three Chambers","Walk through the courtyard. Click any side chamber to read its craft story.")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${r.map(n=>`
            <div class="p-4 bg-white border ${d[n.id]?"border-emerald-600 bg-emerald-50/30 shadow-xs":"border-[var(--grid-border)] shadow-xs"} text-center space-y-2 rounded-xs">
              <span class="text-[10px] uppercase font-bold text-[var(--accent-gold)] tracking-wider">Archival Chamber</span>
              <h3 class="text-xs font-serif font-semibold text-[var(--text-primary)]">${n.title}</h3>
              <button class="alc-btn px-3 py-1.5 text-xs border border-[var(--grid-border)] bg-[#faf8f5] hover:border-[var(--accent-gold)] hover:bg-white transition w-full shadow-xs" data-id="${n.id}">
                ${d[n.id]?"✓ Read Narrative":"Inspect Chamber"}
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
    `,i.querySelectorAll(".alc-btn").forEach(n=>{n.addEventListener("click",()=>{const m=n.getAttribute("data-id"),h=r.find(b=>b.id===m);d[m]||(d[m]=!0,e++);const c=document.getElementById("storyBox");c&&h&&(c.classList.remove("hidden"),c.innerHTML=`<strong>${h.title}:</strong> ${h.text}`),t("alcove_read",{alcove_id:m}),v()})}),(u=document.getElementById("exitGalleryBtn"))==null||u.addEventListener("click",()=>{t("gallery_walk_finished",{explored:e}),l({mini_game:"Q1",observations_count:1,exploration_rate:e/3})})}v()}function oe(i,a,t,l){let o=!0,e=0;const r=[{id:"C_PIGMENT",name:"Pigment Inspection",detail:"The red ink uses pure saffron flower pigment, common in mid-19th century regional manuscripts."},{id:"C_WOOD",name:"Backing Frame",detail:"The backing board is carved from seasoned Himalayan cedar with hand-forged iron nails."},{id:"C_SEAL",name:"Seal Impression",detail:"A faint circular wax seal in the lower corner bears the mark of a historic Srinagar bookbinder."}];let d={};function v(){var p,u;if(o){i.innerHTML=`
        <div>
          ${a("Part 2: The Uncataloged Seal","Investigating provenance details of an anonymous illuminated border.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',goal:"Click on archaeological clue cards to inspect physical attributes of the folio.",steps:["Examine the uncataloged border manuscript card.","Click each clue card to inspect ink, wood, and wax marks.","Click Finish Investigation when done."]})}
        </div>
      `,(p=document.getElementById("startActivityBtn"))==null||p.addEventListener("click",()=>{o=!1,v()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        ${a("Part 2: The Uncataloged Seal","An unsigned artwork arrived at the collection. Click clue cards to inspect details.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <span class="text-[10px] tracking-widest text-[var(--accent-gold)] uppercase font-semibold">Uncataloged Acquisition</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-2 font-medium">Illuminated Manuscript Border (Item #402)</h3>
          <p class="text-xs text-[var(--text-secondary)]">Click any clue below to uncover archival details.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          ${r.map(n=>`
            <div class="p-4 bg-white border ${d[n.id]?"border-[var(--accent-gold)] bg-amber-50/30 shadow-xs":"border-[var(--grid-border)]"} text-center space-y-2 cursor-pointer clue-card rounded-xs transition hover:border-[var(--accent-gold)]" data-id="${n.id}">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                ${n.name}
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${d[n.id]?n.detail:"Click to inspect clue..."}</div>
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
    `,i.querySelectorAll(".clue-card").forEach(n=>{n.addEventListener("click",()=>{const m=n.getAttribute("data-id");d[m]||(d[m]=!0,e++,t("clue_inspected",{clue_id:m}),v())})}),(u=document.getElementById("finishCluesBtn"))==null||u.addEventListener("click",()=>{t("investigation_completed",{clues_read:e}),l({mini_game:"Q2",observations_count:1,clues_read:e})})}v()}function de(i,a,t,l){let o=!0,e=null;const r=[{id:"M_PROJECTION",title:"Poetry & Light Projection",desc:"Projecting animated Kashmiri and Urdu verses onto white lime plaster walls."},{id:"M_SOUND",title:"Acoustic Soundscapes",desc:"Recording sounds of mountain streams, wooden looms, and courtyard birds alongside poetry."},{id:"M_TEXTILE",title:"Embroidered Wall Hangings",desc:"Partnering with local master weavers to embroider literary couplets into woven pashmina."}];function d(){var p;if(o){i.innerHTML=`
        <div>
          ${a("Part 3: The Weaver's Chronicle","Selecting an expressive creative medium for upcoming exhibitions.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>',goal:"Choose which cultural format you would find most inspiring to curate.",steps:["Review the 3 proposed experimental exhibition formats.","Select the artistic medium you are most drawn to explore.","Confirm your choice to complete the courtyard discovery."]})}
        </div>
      `,(p=document.getElementById("startActivityBtn"))==null||p.addEventListener("click",()=>{o=!1,d()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        ${a("Part 3: The Weaver's Chronicle","Which upcoming experimental showcase format would you be most curious to help create?")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${r.map(u=>`
            <div class="med-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2.5 text-center shadow-xs rounded-xs" data-id="${u.id}">
              <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] font-serif text-lg">
                &#10023;
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${u.title}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${u.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="q3FinishBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Selection &rarr;
          </button>
        </div>
      </div>
    `;const v=document.getElementById("q3FinishBtn");i.querySelectorAll(".med-card").forEach(u=>{u.addEventListener("click",()=>{i.querySelectorAll(".med-card").forEach(n=>n.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40")),u.classList.add("border-[var(--accent-gold)]","bg-amber-50/40"),e=u.getAttribute("data-id"),v&&(v.disabled=!1)})}),v==null||v.addEventListener("click",()=>{t("medium_selected",{medium:e}),l({mini_game:"Q3",observations_count:1,medium:e})})}d()}function le(i,a){const{appContainer:t,miniGameIndex:l,logEvent:o,onMiniGameComplete:e}=i;switch(l){case 0:ce(t,a,o,e);break;case 1:ue(t,a,o,e);break;case 2:me(t,a,o,e);break}}function ce(i,a,t,l){let o=!0,e=["Twisted Hemp Cord","Steel Hanging Ring"];const r=[{id:"T_HEMP",name:"Twisted Hemp Cord",icon:"&#129526;"},{id:"T_BRASS",name:"Brass Chain Link",icon:"&#128279;"},{id:"T_CLIP",name:"Carved Walnut Clip",icon:"&#128206;"},{id:"T_RING",name:"Steel Hanging Ring",icon:"&#9711;"}];function d(){var v,p;if(o){i.innerHTML=`
        <div>
          ${a("Part 1: The Artisan's Cord","Assembling a custom mount for hanging an exhibition frame.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',goal:"Select at least 2 workbench items to assemble a durable frame mount.",steps:["Examine the workshop table supplies (cord, chain, clip, ring).","Click to combine at least 2 materials into your mounting rig.","Click Test Mount Stability to verify the assembly."]})}
        </div>
      `,(v=document.getElementById("startActivityBtn"))==null||v.addEventListener("click",()=>{o=!1,d()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        ${a("Part 1: The Artisan's Cord","Standard wire is unavailable. Pick at least 2 items to build a stable mount.")}

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
            ${r.map(u=>`
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
    `,i.querySelectorAll(".tool-btn").forEach(u=>{u.addEventListener("click",()=>{const n=u.getAttribute("data-name");e.includes(n)?e.length>1&&(e=e.filter(m=>m!==n)):e.push(n),t("material_toggled",{material:n,current_selection:e}),d()})}),(p=document.getElementById("testMountBtn"))==null||p.addEventListener("click",()=>{t("mount_built",{materials:e}),l({mini_game:"CR1",observations_count:1,materials_used:e.length})})}d()}function ue(i,a,t,l){let o=!0,e="S_360";const r=[{id:"S_360",title:"360° Wrap Display",desc:"Hang miniature framed poetry on all four faces of the stone pillar for a 360° walking gallery."},{id:"S_SHADOW",title:"Ambient Light Backdrop",desc:"Position warm ground lamps toward the pillar to cast atmospheric silhouettes for surrounding work."},{id:"S_SEAT",title:"Literary Reading Nook",desc:"Arrange low wooden seating and poetry anthologies around the pillar base for quiet reflection."}];function d(){var v,p;if(o){i.innerHTML=`
        <div>
          ${a("Part 2: The Central Pillar","Transforming a central architectural column into an exhibition feature.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',goal:"Select a creative layout concept to incorporate the center hall column into the event.",steps:["Review the 3 space curation ideas.","Choose the concept that creates the most welcoming guest experience.","Confirm your design."]})}
        </div>
      `,(v=document.getElementById("startActivityBtn"))==null||v.addEventListener("click",()=>{o=!1,d()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        ${a("Part 2: The Central Pillar","A wide stone column sits in the hall center. Choose how to make it part of the exhibition.")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${r.map(u=>`
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
    `,i.querySelectorAll(".cr2-card").forEach(u=>{u.addEventListener("click",()=>{e=u.getAttribute("data-id"),d()})}),(p=document.getElementById("cr2ConfirmBtn"))==null||p.addEventListener("click",()=>{t("pillar_solution_selected",{solution:e}),l({mini_game:"CR2",observations_count:1,solution:e})})}d()}function me(i,a,t,l){let o=!0,e="P_MINIMAL";const r=[{id:"P_MINIMAL",title:"Serene Minimalist",desc:"Spacious parchment backdrop highlighting a single handwritten verse in classical calligraphy."},{id:"P_CLASSIC",title:"Heritage Floral Border",desc:"Hand-drawn Chinar leaf border framing event details with warmth and historical resonance."},{id:"P_MODERN",title:"Warm Terracotta Split",desc:"Earthy terracotta wash on one half, structured typography on the other for high readability."}];function d(){var v,p;if(o){i.innerHTML=`
        <div>
          ${a("Part 3: The Printed Motif","Selecting visual invitation aesthetics for the exhibition announcement.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',goal:"Choose the visual card aesthetic that best reflects the collective’s creative tone.",steps:["Compare the 3 visual layout previews.","Select the invitation style you find most fitting.","Click Finish to conclude the workshop session."]})}
        </div>
      `,(v=document.getElementById("startActivityBtn"))==null||v.addEventListener("click",()=>{o=!1,d()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        ${a("Part 3: The Printed Motif","Choose which visual style best communicates the spirit of the upcoming gathering.")}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${r.map(u=>`
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
    `,i.querySelectorAll(".cr3-card").forEach(u=>{u.addEventListener("click",()=>{e=u.getAttribute("data-id"),d()})}),(p=document.getElementById("cr3FinishBtn"))==null||p.addEventListener("click",()=>{t("poster_style_selected",{style:e}),l({mini_game:"CR3",observations_count:1,style:e})})}d()}function pe(i,a){const{appContainer:t,miniGameIndex:l,logEvent:o,onMiniGameComplete:e}=i;switch(l){case 0:ve(t,a,o,e);break;case 1:be(t,a,o,e);break;case 2:he(t,a,o,e);break}}function ve(i,a,t,l){let o=!0;const e=[{id:"INV_1",recipient:"Senior Calligrapher — Master Ghulam"},{id:"INV_2",recipient:"Community Youth Art Collective"},{id:"INV_3",recipient:"Regional Heritage Conservation Trust"}];let r=0,d=[],v=performance.now();function p(){var n,m;if(o){i.innerHTML=`
        <div>
          ${a("Part 1: The Wax Seal","Sealing formal event invitations for visiting artists and guests.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',goal:"Apply the warm terracotta wax seal to each of the 3 handmade invitation envelopes.",steps:["Review the named recipient on the handcrafted envelope.","Click the Apply Wax Seal button to press the seal.","Complete all 3 invitations to proceed."]})}
        </div>
      `,(n=document.getElementById("startActivityBtn"))==null||n.addEventListener("click",()=>{o=!1,v=performance.now(),p()});return}if(r>=e.length){const h=d.reduce((c,b)=>c+b,0)/d.length;l({mini_game:"M1",observations_count:e.length,avg_latency_ms:h});return}const u=e[r];v=performance.now(),i.innerHTML=`
      <div class="animate-fadeIn">
        ${a("Part 1: The Wax Seal","Apply the collective seal stamp to each of the 3 formal invitation envelopes.")}

        <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
          Envelope ${r+1} of ${e.length}
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
    `,t("invitation_presented",{inv_id:u.id}),(m=document.getElementById("stampBtn"))==null||m.addEventListener("click",()=>{const h=performance.now()-v;d.push(h),t("envelope_stamped",{inv_id:u.id,dwell_ms:h}),r++,p()})}p()}function be(i,a,t,l){let o=!0,e=0;const r=3;function d(){var v,p,u;if(o){i.innerHTML=`
        <div>
          ${a("Part 2: The Courtesy Sleeves","Preparing optional extra guest invitation folios.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',goal:"Optionally stamp additional courtesy sleeves for community elders and artisans, or conclude whenever you like.",steps:["The mandatory 3 invitations are already sealed.","Click + Seal Extra Sleeve if you choose to prepare more.","Click Proceed when you are ready."]})}
        </div>
      `,(v=document.getElementById("startActivityBtn"))==null||v.addEventListener("click",()=>{o=!1,d()});return}i.innerHTML=`
      <div class="animate-fadeIn">
        ${a("Part 2: The Courtesy Sleeves","The required invitations are complete. 3 voluntary courtesy sleeves remain on the table.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <div class="text-sm font-serif text-[var(--text-primary)] mb-1.5 font-medium">
            Optional Courtesy Sleeves Available
          </div>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto mb-4 leading-relaxed">
            You may stamp additional invitations for visiting youth guilds, or proceed at any time.
          </p>

          <div class="text-lg font-serif font-bold text-[var(--accent-gold)] mb-4">
            ${e} of ${r} Extra Sleeves Sealed
          </div>

          <div class="flex justify-center gap-4">
            ${e<r?`
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
    `,(p=document.getElementById("stampExtraBtn"))==null||p.addEventListener("click",()=>{e++,t("optional_envelope_stamped",{count:e}),d()}),(u=document.getElementById("finishM2Btn"))==null||u.addEventListener("click",()=>{t("optional_stamping_done",{total_extra:e}),l({mini_game:"M2",observations_count:1,optional_completed:e})})}d()}function he(i,a,t,l){let o=!0;const e=[{id:"T_LIGHTS",name:"Turn on Warm Gallery Spotlights and Lanterns"},{id:"T_PAMPHLETS",name:"Arrange Urdu & Kashmiri Poetry Guides on Welcome Stand"},{id:"T_FLOWERS",name:"Place Fresh Jasmine Petals at the Courtyard Entrance Urn"}];let r={T_LIGHTS:!0,T_PAMPHLETS:!0,T_FLOWERS:!0};function d(){var p,u;if(o){i.innerHTML=`
        <div>
          ${a("Part 3: The Evening Threshold","Exhibition readiness inspection for this stage.")}
          ${y({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>',goal:"Verify the 3 gallery readiness checkpoints to prepare the hall for evening arrival.",steps:["Check each gallery preparation item (lighting, guides, floral welcome).","Verify all 3 items to complete the ritual.","Click Complete Activity to proceed."]})}
        </div>
      `,(p=document.getElementById("startActivityBtn"))==null||p.addEventListener("click",()=>{o=!1,d()});return}const v=Object.values(r).filter(Boolean).length;i.innerHTML=`
      <div class="animate-fadeIn">
        ${a("Part 3: The Evening Threshold","Verify the 3-point checklist to complete this activity.")}

        <div class="space-y-3 mb-6">
          ${e.map((n,m)=>`
            <label class="flex items-center gap-3.5 p-4 bg-white border ${r[n.id]?"border-emerald-600 bg-emerald-50/30 shadow-xs":"border-[var(--grid-border)] shadow-xs"} cursor-pointer hover:border-[var(--accent-gold)] transition rounded-xs">
              <input type="checkbox" id="task_${n.id}" ${r[n.id]?"checked":""} class="accent-[#bd6f5d] w-4 h-4">
              <span class="text-xs font-medium text-[var(--text-primary)]">${m+1}. ${n.name}</span>
            </label>
          `).join("")}
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)] font-medium">${v} of 3 checkpoints verified</span>
          <button id="m3FinishBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            Complete Activity &rarr;
          </button>
        </div>
      </div>
    `,e.forEach(n=>{var m;(m=document.getElementById(`task_${n.id}`))==null||m.addEventListener("change",h=>{r[n.id]=h.target.checked,t("readiness_task_toggled",{task_id:n.id,checked:h.target.checked}),d()})}),(u=document.getElementById("m3FinishBtn"))==null||u.addEventListener("click",()=>{const n=Object.values(r).filter(Boolean).length/e.length;t("gallery_readiness_complete",{readiness_score:n}),l({mini_game:"M3",observations_count:e.length,readiness_score:n})})}d()}const ge={W1:{name:"The Soundscape",name_ur:"تعدد",subtitle:"Acoustics & Dialogue"},W2:{name:"The Living Archive",name_ur:"دستاویز",subtitle:"Manuscripts & Preservation"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ نقش",subtitle:"Artisan Workshop"},W4:{name:"The Shifting Patterns",name_ur:"متغیر گرڈ",subtitle:"Mosaic & Rhythm"},W5:{name:"The Hidden Courtyard",name_ur:"نہاں خانہ",subtitle:"Exhibition Discovery"},W6:{name:"The Workshop Bench",name_ur:"شکستہ آلہ",subtitle:"Material Assembly"},W7:{name:"The Final Gathering",name_ur:"تکرار",subtitle:"Readiness & Ceremony"}};function y({icon:i,goal:a,steps:t,onStart:l}){return`
    <div class="tutorial-card p-6 border border-[var(--accent-gold)] bg-gradient-to-br from-[#faf8f5] to-[#f5efe8] space-y-4 mb-6 transition-all duration-300">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-amber-100/80 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)]">
          ${i||'<i data-lucide="compass" class="w-5 h-5"></i>'}
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-medium">Activity Guide · طریقہ کار</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] font-semibold">${a}</h3>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        ${t.map((o,e)=>`
          <div class="bg-white/80 border border-[var(--grid-border)] p-3 flex items-start gap-2.5">
            <span class="w-5 h-5 rounded-full bg-[var(--accent-gold)] text-white text-[10px] flex items-center justify-center font-serif shrink-0 mt-0.5">${e+1}</span>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">${o}</div>
          </div>
        `).join("")}
      </div>

      <div class="pt-2 flex justify-end">
        <button id="startActivityBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition flex items-center gap-2">
          Begin Activity &rarr;
        </button>
      </div>
    </div>
  `}function fe(i){const{appContainer:a,worldCode:t,worldIndex:l,miniGameIndex:o,onMiniGameComplete:e}=i,r=ge[t]||{name:"Alfaaz Workshop",name_ur:""},d=(v,p)=>`
    <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${l+1} of 7: ${r.name}</span>
          <span class="font-serif text-lg text-[var(--text-secondary)]" style="direction: rtl;">${r.name_ur}</span>
        </div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">${v}</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">${p}</p>
      </div>
      <div class="text-right">
        <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Part ${o+1} of 3</span>
      </div>
    </div>
  `;switch(t){case"W1":Q(i,d);break;case"W2":O(i,d);break;case"W3":Y(i,d);break;case"W4":te(i,d);break;case"W5":ne(i,d);break;case"W6":le(i,d);break;case"W7":pe(i,d);break;default:e&&e({});break}}let s={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1,activeMiniGameInProgress:!1,telemetryTerminal:!1};const R="alfaaz_recruit_state",H="alfaaz_recruit_unsent";function _(){try{const i={sessionId:s.sessionId,configHash:s.configHash,worldSequence:s.worldSequence,seeds:s.seeds,screen:s.screen,sjtScenarios:s.sjtScenarios,currentSjtIndex:s.currentSjtIndex,sjtResponses:s.sjtResponses,currentWorldIndex:s.currentWorldIndex,currentMiniGameIndex:s.currentMiniGameIndex,accessibilityModes:s.accessibilityModes,segmentId:s.segmentId,seq:s.seq,isPaused:s.isPaused,activeMiniGameInProgress:s.activeMiniGameInProgress||!1};sessionStorage.setItem(R,JSON.stringify(i)),sessionStorage.setItem(H,JSON.stringify(s.telemetryQueue))}catch(i){console.warn("[Persistence] Error saving sessionStorage:",i)}}function xe(){try{const i=sessionStorage.getItem(R),a=sessionStorage.getItem(H);if(a){const t=JSON.parse(a);Array.isArray(t)&&(s.telemetryQueue=t)}if(i){const t=JSON.parse(i);if(t.sessionId){if(s.sessionId=t.sessionId,s.configHash=t.configHash||null,s.worldSequence=t.worldSequence||[],s.seeds=t.seeds||{},s.screen=t.screen||"consent",s.sjtScenarios=t.sjtScenarios||[],s.currentSjtIndex=t.currentSjtIndex||0,s.sjtResponses=t.sjtResponses||{},s.currentWorldIndex=t.currentWorldIndex||0,s.currentMiniGameIndex=t.currentMiniGameIndex||0,s.accessibilityModes=t.accessibilityModes||[],s.seq=t.seq||1,s.isPaused=t.isPaused||!1,s.segmentId=(t.segmentId||1)+1,x(s.screen,"segment_start",{segment_id:s.segmentId}),t.activeMiniGameInProgress&&t.screen==="games"){const l=s.worldSequence[s.currentWorldIndex],o=j(l,s.currentMiniGameIndex);x("game","interrupted",{mini_game:o,reason:"page_reload"}),s.currentMiniGameIndex<2?s.currentMiniGameIndex++:(s.currentMiniGameIndex=0,s.currentWorldIndex++),s.activeMiniGameInProgress=!1}return _(),!0}}}catch(i){console.warn("[Persistence] Error restoring sessionStorage:",i)}return!1}async function T(i,a={}){if(window.globalApiFetch)return await window.globalApiFetch(i,a);const t=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",l={"Content-Type":"application/json",...a.headers||{}};return fetch(`${t}${i}`,{...a,headers:l})}function x(i,a,t={},l={},o="mouse",e=null,r=null){const d=performance.now();let v=t,p=l;try{const n=JSON.stringify(t),m=JSON.stringify(l),h=new TextEncoder().encode(n).length+new TextEncoder().encode(m).length;h>4096&&(v={event_oversize:!0,original_size_bytes:h},p={oversized:!0})}catch{}const u={seq:s.seq++,segment_id:s.segmentId,t_ms:d,screen:i,game_world:s.worldSequence[s.currentWorldIndex]||null,mini_game:e,trial:r,action:a,input_type:o,task_def_version:t&&t.task_def_version||"1.0",state:p,data:v};s.telemetryQueue.push(u),_(),(s.telemetryQueue.length>=50||a==="minigame_end"||a==="sjt_complete")&&$()}let L=!1;async function $(){if(L||!s.sessionId||s.telemetryQueue.length===0||s.telemetryTerminal)return;L=!0;const i=[...s.telemetryQueue],a=i.slice(0,100),t=i.slice(100);s.telemetryQueue=t,_();try{const l=await T("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:s.sessionId,events:a})});if(l&&l.status===422){const o=await l.json().catch(()=>({}));if(o.detail&&(o.detail.detail==="events_cap_reached"||o.detail.status==="DATA_LIMITED")){console.warn("[Telemetry] Terminal event cap reached (50,000). Halting future telemetry flushes."),s.telemetryTerminal=!0,s.telemetryQueue=[...a,...t],_(),L=!1;return}}if(l&&l.status===413){if(console.warn("[Telemetry] Batch rejected with HTTP 413 (oversize)."),a.length>1){const o=Math.ceil(a.length/2);s.telemetryQueue=[...a.slice(0,o),...a.slice(o),...t]}else console.error("[Telemetry] Single event exceeds body limit. Discarding oversized payload.");_(),L=!1;return}if(!l||!l.ok)throw new Error(l?`HTTP ${l.status}`:"No response");_()}catch(l){console.warn("[Telemetry] Flush failed, re-queuing:",l),s.telemetryQueue=[...a,...s.telemetryQueue],_()}finally{L=!1}}setInterval(()=>{s.sessionId&&s.telemetryQueue.length>0&&!s.telemetryTerminal&&$()},2500);window.addEventListener("beforeunload",()=>{if(s.sessionId&&s.telemetryQueue.length>0){const i=window.ALFAAZ_API_URL||"",a=JSON.stringify({session_id:s.sessionId,events:s.telemetryQueue.slice(0,100)});navigator.sendBeacon(`${i}/recruit/telemetry`,a)}});window.addEventListener("pagehide",()=>{if(s.sessionId&&s.telemetryQueue.length>0){const i=window.ALFAAZ_API_URL||"",a=JSON.stringify({session_id:s.sessionId,events:s.telemetryQueue.slice(0,100)});navigator.sendBeacon(`${i}/recruit/telemetry`,a)}});document.addEventListener("visibilitychange",()=>{document.hidden?(x(s.screen,"visibility_hidden",{timestamp:Date.now()}),x(s.screen,"tab_hidden",{timestamp:Date.now()}),$()):(x(s.screen,"visibility_visible",{timestamp:Date.now()}),x(s.screen,"tab_visible",{timestamp:Date.now()}))});window.addEventListener("blur",()=>{x(s.screen,"blur",{timestamp:Date.now()})});window.addEventListener("focus",()=>{x(s.screen,"focus",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{xe(),S(),ye()});function ye(){const i=document.getElementById("pauseBtn");i==null||i.addEventListener("click",q);const a=document.getElementById("exitBtn");a==null||a.addEventListener("click",()=>{confirm("Are you sure you wish to exit the volunteer assessment? You can return at any time.")&&(x(s.screen,"candidate_exited"),$(),window.location.href="index.html")})}function q(){s.isPaused?(s.isPaused=!1,x(s.screen,"resume"),s.screen=s.pausedPreviousScreen||"sjt",S()):(s.isPaused=!0,s.pausedPreviousScreen=s.screen,x(s.screen,"pause"),s.screen="paused",S())}function S(){const i=document.getElementById("recruitApp"),a=document.getElementById("sessionHeaderControls"),t=document.getElementById("topProgressBar"),l=document.getElementById("progressBarFill");switch(s.screen!=="consent"&&s.screen!=="complete"&&s.screen!=="paused"?(a==null||a.classList.remove("hidden"),t==null||t.classList.remove("hidden")):(a==null||a.classList.add("hidden"),t==null||t.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),s.screen){case"consent":_e(i);break;case"identity":we(i);break;case"accessibility":ke(i);break;case"warmup":Ce(i);break;case"sjt":M(i,l);break;case"games":F(i,l);break;case"paused":Ee(i);break;case"complete":$e(i);break}}function _e(i){var e;i.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-4 text-center">
        <span class="act-badge">Onboarding & Research</span>
        <h1 class="text-3xl font-serif text-[var(--text-primary)]">Volunteer Exploratory Assessment</h1>
      </div>

      <div class="space-y-4 text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        ${A.candidate_notice.lines.map(r=>`<p>${r}</p>`).join("")}
      </div>

      <form id="consentForm" class="space-y-4 pt-2">
        <div class="flex items-center gap-2 pt-2">
          <input type="checkbox" id="ageConfirm" required class="w-4 h-4 accent-[#bd6f5d]">
          <label for="ageConfirm" class="text-xs text-[var(--text-primary)]">${A.age_confirmation.label}</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="consentAgree" required class="w-4 h-4 accent-[#bd6f5d]">
          <label for="consentAgree" class="text-xs text-[var(--text-primary)]">${A.research_participation.label}</label>
        </div>

        <div class="pt-4 flex justify-end">
          <button type="submit" aria-disabled="true" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition opacity-40">
            Continue &rarr;
          </button>
        </div>
      </form>
    </div>
  `;const a=document.getElementById("ageConfirm"),t=document.getElementById("consentAgree"),l=document.querySelector('#consentForm button[type="submit"]'),o=()=>{const r=!!(a!=null&&a.checked&&(t!=null&&t.checked));l==null||l.setAttribute("aria-disabled",String(!r)),l==null||l.classList.toggle("opacity-40",!r)};a==null||a.addEventListener("change",o),t==null||t.addEventListener("change",o),o(),(e=document.getElementById("consentForm"))==null||e.addEventListener("submit",async r=>{r.preventDefault();const d=r.target.querySelector('button[type="submit"]');if((d==null?void 0:d.getAttribute("aria-disabled"))==="true")return;const v=d?d.innerHTML:"Continue &rarr;";d&&(d.setAttribute("aria-disabled","true"),d.innerHTML="Connecting...");try{const p=a.checked,u=t.checked,n=await T("/recruit/consent",{method:"POST",body:JSON.stringify({choices:{research_telemetry:u},confirmed_18_plus:p,device_class:window.innerWidth<768?"mobile":"desktop",input_modality:"ontouchstart"in window?"touch":"mouse"})});if(!n||!n.ok){const h=n?await n.json().catch(()=>({})):{};throw new Error(h.detail||(n?`Server returned ${n.status}`:"No response from server"))}const m=await n.json();if(m.session_id)s.sessionId=m.session_id,s.configHash=m.config_hash,s.worldSequence=m.world_sequence,s.seeds=m.seeds,s.screen="identity",x("consent","consent_accepted"),_(),S();else throw new Error("Missing session ID")}catch(p){alert(`Unable to initialize session: ${p.message||"Please check connection."}`),console.error(p),d&&(o(),d.innerHTML=v)}})}function we(i){var a;i.innerHTML=`
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
  `,(a=document.getElementById("identityForm"))==null||a.addEventListener("submit",async t=>{t.preventDefault();const l=t.target.querySelector('button[type="submit"]'),o=l?l.innerHTML:"Begin Session &rarr;";l&&(l.disabled=!0,l.innerHTML="Connecting...");try{const e=await T("/recruit/identity",{method:"POST",body:JSON.stringify({session_id:s.sessionId,full_name:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim()})});if(!e||!e.ok){const r=e?await e.json().catch(()=>({})):{};throw new Error(r.detail||(e?`Server returned ${e.status}`:"No response from server"))}s.screen="accessibility",x("identity","identity_submitted"),_(),S()}catch(e){alert(`Unable to continue: ${e.message||"Please check connection."}`),l&&(l.disabled=!1,l.innerHTML=o)}})}function ke(i){var a;i.innerHTML=`
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
  `,(a=document.getElementById("saveA11yBtn"))==null||a.addEventListener("click",async()=>{var l,o,e,r;const t=[];(l=document.getElementById("a11y_keyboard"))!=null&&l.checked&&t.push("keyboard_navigation"),(o=document.getElementById("a11y_contrast"))!=null&&o.checked&&t.push("high_contrast"),(e=document.getElementById("a11y_motion"))!=null&&e.checked&&t.push("reduced_motion"),(r=document.getElementById("a11y_time"))!=null&&r.checked&&t.push("extended_time"),s.accessibilityModes=t;try{await T("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:s.sessionId,modes_enabled:t})})}catch(d){console.warn("Accessibility preferences save error:",d)}s.screen="warmup",x("accessibility","preferences_saved",{modes:t}),_(),S()})}function Ce(i){let a=[],t=performance.now();i.innerHTML=`
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
  `;const l=document.getElementById("tapTarget"),o=document.getElementById("warmupStatus");l==null||l.addEventListener("click",async()=>{a.push(performance.now());const e=a.length;if(l.textContent=`Tap (${e}/3)`,o.textContent=`Registered tap ${e} of 3`,e>=3){const r=[a[1]-a[0],a[2]-a[1]],d=(r[0]+r[1])/2,v=performance.now()-t;try{await T("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:s.sessionId,tap_latency_baseline_ms:d,reading_dwell_baseline_ms:v,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(p){console.warn("Warmup save error:",p)}x("warmup","warmup_completed",{avgLatency:d,readingDwell:v});try{const u=await(await T("/recruit/sjt/public")).json();s.sjtScenarios=u.scenarios||[],s.currentSjtIndex=0,s.screen="sjt",_(),S()}catch(p){console.error("Failed to load SJT payload:",p)}}})}function M(i,a){var p;const t=s.sjtScenarios[s.currentSjtIndex];if(!t){Se();return}const l=s.sjtScenarios.length,o=s.currentSjtIndex+1;a&&(a.style.width=`${(o-1)/(l+7)*100}%`);const e=document.getElementById("segmentProgress");e&&(e.textContent=`SJT ${o}/${l}`);const r=s.sjtResponses[t.id]||null,d=t.options.map(u=>`
    <div class="option-card ${r===u.id?"selected":""}" data-opt-id="${u.id}" tabindex="0" role="button">
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
          Scenario ${o} of ${l}
        </div>
      </div>

      <div class="text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        ${t.setup}
      </div>

      <div class="space-y-3">
        <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Choose the course of action you would most naturally take:</div>
        ${d}
      </div>

      <div class="pt-4 flex justify-between items-center border-t border-[var(--grid-border)]">
        <span class="text-xs text-[var(--text-secondary)]">Keyboard: Press 1–4 to choose</span>
        <button id="nextSjtBtn" ${r?"":"disabled"} class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] transition">
          ${o===l?"Complete SJT &rarr;":"Next Scenario &rarr;"}
        </button>
      </div>
    </div>
  `,x("sjt","scenario_displayed",{scenario_id:t.id,index:o}),i.querySelectorAll(".option-card").forEach(u=>{u.addEventListener("click",()=>{const n=u.getAttribute("data-opt-id");s.sjtResponses[t.id]=n,x("sjt","option_selected",{scenario_id:t.id,option_id:n}),M(i,a)})}),(p=document.getElementById("nextSjtBtn"))==null||p.addEventListener("click",()=>{s.sjtResponses[t.id]&&(s.currentSjtIndex++,M(i,a))});const v=u=>{if(["1","2","3","4"].includes(u.key)){const n=parseInt(u.key)-1;t.options[n]&&(s.sjtResponses[t.id]=t.options[n].id,x("sjt","option_selected_key",{scenario_id:t.id,option_id:t.options[n].id}),M(i,a))}};window.onkeydown=v}async function Se(){window.onkeydown=null;try{await T("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:s.sessionId,responses:s.sjtResponses})}),s.screen="games",s.currentWorldIndex=0,s.currentMiniGameIndex=0,x("sjt","sjt_complete",{response_count:Object.keys(s.sjtResponses).length}),_(),S()}catch(i){console.error("SJT submit error:",i)}}function F(i,a){const t=s.worldSequence[s.currentWorldIndex];if(!t||s.currentWorldIndex>=s.worldSequence.length){Te();return}s.activeMiniGameInProgress=!0,_();const l=document.getElementById("segmentProgress");l&&(l.textContent=`World ${s.currentWorldIndex+1}/7`),a&&(a.style.width=`${(s.currentSjtIndex+s.currentWorldIndex+1)/(s.sjtScenarios.length+7)*100}%`),fe({appContainer:i,worldCode:t,worldIndex:s.currentWorldIndex,miniGameIndex:s.currentMiniGameIndex,logEvent:(o,e,r,d)=>{const v=j(t,s.currentMiniGameIndex);x("game",o,e,r,d,v)},onMiniGameComplete:o=>{s.activeMiniGameInProgress=!1;const e=j(t,s.currentMiniGameIndex);x("game","minigame_end",o,{},"mouse",e),$(),s.currentMiniGameIndex<2?s.currentMiniGameIndex++:(s.currentMiniGameIndex=0,s.currentWorldIndex++),_(),F(i,a)}})}function j(i,a){const t={W1:["F1","F2","F3"],W2:["A1","A2","A3"],W3:["C1","C2","C3"],W4:["E1","E2","E3"],W5:["Q1","Q2","Q3"],W6:["CR1","CR2","CR3"],W7:["M1","M2","M3"]};return t[i]&&t[i][a]||"MG"}async function Te(){s.activeMiniGameInProgress=!1,_();const i=document.getElementById("recruitApp");i&&(i.innerHTML=`
      <div class="space-y-6 text-center py-16 animate-fadeIn">
        <div class="w-10 h-10 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">Finalizing Assessment...</h2>
        <p class="text-xs text-[var(--text-secondary)]">Safely recording research telemetry and saving your session profile.</p>
      </div>
    `),await $();try{await T("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:s.sessionId})})}catch(a){console.warn("Session complete submission error:",a)}s.screen="complete",_(),S()}function Ee(i){var a;i.innerHTML=`
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
  `,(a=document.getElementById("resumeBtn"))==null||a.addEventListener("click",q)}function $e(i){i.innerHTML=`
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
