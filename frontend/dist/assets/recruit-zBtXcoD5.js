import"./global-DxYxv3W5.js";/* empty css               */const F={lines:["<strong>Estimated Total Time:</strong> ~20–25 minutes (SJT + brief exploratory micro-tasks).","<strong>Voluntary Nature:</strong> You may pause, skip tasks, or conclude at any time without penalty. Missing or skipped sections are recorded neutrally as insufficient data, never as a low score.","<strong>Simulated Partners:</strong> Some interactive tasks feature computer-controlled simulated characters. Their behavior is automated and scripted.","<strong>Data & Research Notice:</strong> This is a calibration-stage research instrument for unpaid volunteer recruitment, not a validated selection test. All raw telemetry is recorded under a pseudonymous session identifier."]},G={label:"I confirm that I am 18 years of age or older."},H={label:"I understand and agree to participate in this research session."},L={candidate_notice:F,age_confirmation:G,research_participation:H};function W(a,n){const{appContainer:t,miniGameIndex:f,logEvent:u,onMiniGameComplete:e}=a;switch(f){case 0:N(t,n,u,e);break;case 1:V(t,n,u,e);break;case 2:z(t,n,u,e);break}}function N(a,n,t,f){let u=!0,e=0,i=!1,r=0,p="mouse";const c=[{id:"DOC_01",title:"19th-Century Calligraphic Diwan (1842)",rule_prompt:"Filing Rule: Classify by Period",tags:["Year: 1842","19th Century","Parchment","Ghazal Verse"]},{id:"DOC_02",title:"Lyrical Ghazal Couplets Manuscript",rule_prompt:"Filing Rule: Classify by Genre",tags:["Genre: Poetry","Lyrical Verse","Urdu","Paper Folio"]},{id:"DOC_03",title:"Early 20th-Century Exhibition Register (1924)",rule_prompt:"Filing Rule: Classify by Period",tags:["Year: 1924","20th Century","Official Register","Signatures"]},{id:"DOC_04",title:"Lal Ded Vakh Verse Translations in Kashmiri",rule_prompt:"Filing Rule: Classify by Language",tags:["Language: Kashmiri","Vakh Verse","Vernacular Poetry"]},{id:"DOC_05",title:"Historical Tarikh Chronicle of Kashmir Artists",rule_prompt:"Filing Rule: Classify by Genre",tags:["Genre: Chronicle","Tarikh History","Biographical Record"]},{id:"DOC_06",title:"19th-Century Calligraphic Diwan Supplement (1876)",rule_prompt:"Filing Rule: Classify by Period",tags:["Year: 1876","19th Century","Manuscript Diwan","Illuminated Border"]},{id:"DOC_07",title:"Mathnawi Rhymed Couplets Anthology",rule_prompt:"Filing Rule: Classify by Genre",tags:["Genre: Poetry","Mathnawi Verse","Poetic Meters"]},{id:"DOC_08",title:"Mid-20th-Century Cultural Congress Charter (1948)",rule_prompt:"Filing Rule: Classify by Period",tags:["Year: 1948","20th Century","Official Charter","Archival Record"]},{id:"DOC_09",title:"Waqiat-i-Kashmir Historical Annals",rule_prompt:"Filing Rule: Classify by Genre",tags:["Genre: Chronicle","Historical Narrative","Atelier Register"]},{id:"DOC_10",title:"Mahmud Gami Kashmiri Shireen-Khusraw Folio",rule_prompt:"Filing Rule: Classify by Language",tags:["Language: Kashmiri","Vernacular Verse","Sufi Couplets"]},{id:"DOC_11",title:"Late 19th-Century Silk Route Revenue Survey (1885)",rule_prompt:"Filing Rule: Classify by Period",tags:["Year: 1885","19th Century","Trade Ledger","Accession Seals"]},{id:"DOC_12",title:"Rasul Mir Romantic Ghazal Folio",rule_prompt:"Filing Rule: Classify by Genre",tags:["Genre: Poetry","Lyric Ghazal","Calligraphic Rubrication"]}],v=[{id:"19th_century",label:"19th Century Shelf",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},{id:"20th_century",label:"20th Century Shelf",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{id:"poetry",label:"Poetry & Verses Shelf",icon:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"},{id:"chronicle",label:"Chronicle Shelf",icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},{id:"kashmiri",label:"Kashmiri Vernacular Shelf",icon:"M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"}];function d(){var b,m;if(u){a.innerHTML=`
        <div>
          ${n("Part 1: The Manuscript Folios","Preserving and organizing historical folios and objects across 12 rule-based classification trials.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',goal:"Organize each historical item into its designated archive shelf based on archival classification rules.",steps:["Examine the item title and descriptor tags on each folio card.","Click the shelf guide button at any time to verify filing rules.","Select the appropriate shelf destination to file the folio."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{u=!1,e=0,r=performance.now(),d()});return}if(e>=c.length){f({mini_game:"A1",observations_count:c.length});return}const s=c[e];r=performance.now(),a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 1: The Manuscript Folios","Select the correct shelf for each historical archive artifact.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Folio ${e+1} of ${c.length}</span>
        </div>

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            ${s.rule_prompt}
          </span>
          <button id="guideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1 hover:bg-amber-50 transition flex items-center gap-1.5 rounded-xs" tabindex="0">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Shelf Guide
          </button>
        </div>

        <div id="guideModal" class="${i?"":"hidden"} p-4 mb-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] space-y-1 shadow-xs rounded-xs">
          <div>• <strong>Period Rule:</strong> Classify by creation century (19th Century vs 20th Century).</div>
          <div>• <strong>Genre Rule:</strong> Classify by literary format (Poetry vs Historical Chronicle).</div>
          <div>• <strong>Language Rule:</strong> Classify by primary linguistic medium (Kashmiri Vernacular).</div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase font-mono">${s.id}</span>
          <h3 class="text-lg font-serif text-[var(--text-primary)] font-medium mt-1 mb-3">${s.title}</h3>
          <div class="flex justify-center flex-wrap gap-2">
            ${s.tags.map(l=>`<span class="px-2.5 py-1 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)] rounded-xs">${l}</span>`).join("")}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          ${v.map(l=>`
            <button type="button" class="folder-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs flex flex-col items-center gap-1.5 rounded-xs" data-folder="${l.id}" tabindex="0">
              <svg class="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${l.icon}"></path></svg>
              ${l.label}
            </button>
          `).join("")}
        </div>
      </div>
    `,t("item_presented",{trial_index:e,stimulus_id:s.id,task_def_version:"1.0"}),(m=document.getElementById("guideBtn"))==null||m.addEventListener("click",()=>{const l=document.getElementById("guideModal");i=!(l!=null&&l.classList.contains("hidden")),l==null||l.classList.toggle("hidden"),i=!i,t("guide_viewed",{trial_index:e,stimulus_id:s.id,task_def_version:"1.0"})}),a.querySelectorAll(".folder-btn").forEach(l=>{const g=x=>{p=x;const _=l.getAttribute("data-folder"),h=performance.now()-r;t("item_sorted",{trial_index:e,stimulus_id:s.id,choice:_,dwell_ms:Math.round(h),input_modality:p,task_def_version:"1.0"}),e++,d()};l.addEventListener("click",()=>g("mouse")),l.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),g("keyboard"))})})}d()}function V(a,n,t,f){let u=!0,e=0,i=null,r="mouse";const p=[{stimulus_id:"EXC_01",title:"19th-Century Kashmiri Ghazal Leaf with Water Wear",anomaly_description:'Water fading on lower margin. The accession year stamp is blurred and appears as "18--".',type_note:"Physical Damage & Indeterminate Year Stamp"},{stimulus_id:"EXC_02",title:"Pristine Persian Couplet Calligraphy (1890)",anomaly_description:"Intact rag fiber paper, clear black carbon ink, and standard accession stamp intact. No physical blemishes.",type_note:"Standard Folio Inspection"},{stimulus_id:"EXC_03",title:"Disbound Manuscript Folio with Pagination Jump",anomaly_description:"Binding threads severed. Margin numbering skips from Folio 14 directly to Folio 19 with missing text catchword.",type_note:"Structural Discrepancy & Missing Catchword"}],c=[{id:"flag_exception",title:"Flag for Conservator Review",desc:"Quarantine folio in acid-free protective sleeve and attach an anomaly notice for specialized review.",tag:"Specialized Preservation Quarantine"},{id:"file_standard",title:"Standard Catalog Accession",desc:"Accession the folio directly into the general catalog shelves under standard routine processing.",tag:"Routine Shelf Accession"},{id:"defer_review",title:"Hold in Pending Vault",desc:"Hold folio in pending intake storage without accessioning until provenance paperwork arrives.",tag:"Intake Deferral"}];function v(){var b;if(u){a.innerHTML=`
        <div>
          ${n("Part 2: The Fragile Leaf","Handling archival folios across 3 distinct accession decisions.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',goal:"Evaluate the physical condition of 3 folios and decide whether to flag an exception, file standardly, or hold.",steps:["Review the condition notes and physical examination summary for each folio.","Identify whether an anomaly or damage requires specialized conservation.","Select your archival handling recommendation across all 3 trials."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{u=!1,e=0,i=null,v()});return}const d=p[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 2: The Fragile Leaf","Examine the folio condition and select your archival handling recommendation.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Item ${e+1} of 3</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="w-10 h-10 rounded-full bg-amber-100 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] mx-auto mb-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <span class="text-[10px] tracking-widest text-[#bd6f5d] uppercase font-semibold font-mono">${d.stimulus_id} • ${d.type_note}</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-1 font-medium">${d.title}</h3>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mt-2">
            ${d.anomaly_description}
          </p>
        </div>

        <div class="space-y-3 mb-6">
          ${c.map(m=>`
            <div class="a2-opt p-4 bg-white border ${i===m.id?"border-[var(--accent-gold)] bg-amber-50/40 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs rounded-xs" data-action="${m.id}" tabindex="0" role="button">
              <div class="flex justify-between items-start">
                <div class="text-xs font-semibold text-[var(--text-primary)]">${m.title}</div>
                <span class="text-[10px] font-mono text-[var(--accent-gold)] uppercase tracking-wider">${m.tag}</span>
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">${m.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="a2ConfirmBtn" ${i?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<2?"Confirm Handling Decision &rarr;":"Finish Exception Evaluation &rarr;"}
          </button>
        </div>
      </div>
    `,t("item_presented",{trial_index:e,stimulus_id:d.stimulus_id,task_def_version:"1.0"});const s=document.getElementById("a2ConfirmBtn");a.querySelectorAll(".a2-opt").forEach(m=>{const l=g=>{r=g,i=m.getAttribute("data-action"),a.querySelectorAll(".a2-opt").forEach(x=>{x.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40","shadow-xs"),x.classList.add("border-[var(--grid-border)]")}),m.classList.add("border-[var(--accent-gold)]","bg-amber-50/40","shadow-xs"),m.classList.remove("border-[var(--grid-border)]"),s&&(s.disabled=!1)};m.addEventListener("click",()=>l("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),l("keyboard"))})}),s==null||s.addEventListener("click",()=>{t("decision_logged",{trial_index:e,stimulus_id:d.stimulus_id,action_id:i,input_modality:r,task_def_version:"1.0"}),e<2?(e++,i=null,v()):f({mini_game:"A2",observations_count:3})})}v()}function z(a,n,t,f){let u=!0,e=new Set,i=new Set,r="mouse";const p=[{id:"REC_01",title:"Placard 1: Habba Khatoon Folio",text:"Poet: Habba Khatoon | Era: 16th Century | Birthplace: Chandhara (Recorded as: Chanhadra)",note:"Folio Label Verification"},{id:"REC_02",title:"Placard 2: Carved Walnut Pen Box",text:"Artifact: Carved Walnut Calligraphy Pen Box | Dimensions: 24 cm x 6 cm | Medium: Seasoned Walnut",note:"Object Metadata Verification"},{id:"REC_03",title:"Placard 3: River Verse Excerpt",text:`Verse Excerpt: "The river remembers the boatman's song" | Translator: [Not Specified / Blank]`,note:"Folio Label Verification"},{id:"REC_04",title:"Placard 4: Kashmiri Vakh Folio Leaf",text:"Folio Leaf: Kashmiri Vakh Lyric Leaf | Script: Sharda & Persian | Accession: AR-1892",note:"Manuscript Leaf Verification"},{id:"REC_05",title:"Placard 5: Exhibition Opening Notice",text:"Exhibition Opening Reception: February 31st, 2026 | Location: Main Pavilion",note:"Public Schedule Verification"},{id:"REC_06",title:"Placard 6: Hand-Forged Brass Book Clasp",text:"Artifact: Hand-Forged Brass Bookbinding Clasp | Provenance: Srinagar Royal Atelier | Era: 1880",note:"Hardware Object Verification"},{id:"REC_07",title:"Placard 7: Silk Sash Exhibition Label",text:"Accession: AR-1904 | Medium: Silk & Silver Zari | Cataloger Notes: Discrepancy in accession serial numbering [Duplicate Entry]",note:"Accession Number Verification"},{id:"REC_08",title:"Placard 8: Valley Calligraphers Guild Roll",text:"Roll of Scribes: 14 Registered Master Scribes | Inscription Language: Persian Nasta'liq | Status: Verified Complete",note:"Guild Roll Verification"}];function c(){var v,d;if(u){a.innerHTML=`
        <div>
          ${n("Part 3: The Exhibition Ledger","Reviewing 8 exhibition placards for typographical, factual, and omission discrepancies.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',goal:"Carefully proofread all 8 display records. Flag only those with genuine discrepancies or factual errors.",steps:["Examine each display record description in the ledger.","Click or toggle the discrepancy flag on any record containing concrete errors.","Clean records should remain unflagged.","Verify and finalize the exhibition ledger."]})}
        </div>
      `,(v=document.getElementById("startActivityBtn"))==null||v.addEventListener("click",()=>{u=!1,e=new Set,i=new Set,c()});return}a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 3: The Exhibition Ledger","Proofread all 8 exhibition records. Flag any record that contains a discrepancy.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">8 Records</span>
        </div>

        <div class="space-y-3.5 mb-6">
          ${p.map((s,b)=>{const m=e.has(s.id);return`
              <div class="record-card p-4 bg-white border ${m?"border-[#bd6f5d] bg-amber-50/20":"border-[var(--grid-border)]"} rounded-xs transition shadow-xs flex items-start justify-between gap-4" data-id="${s.id}" tabindex="0">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-mono text-[var(--accent-gold)] uppercase tracking-wider">${s.id} • ${s.note}</span>
                  </div>
                  <div class="text-xs font-semibold text-[var(--text-primary)]">${s.title}</div>
                  <div class="text-xs text-[var(--text-secondary)] font-mono leading-relaxed bg-[#faf8f5] p-2 border border-[var(--grid-border)]/60 rounded-xs mt-1">
                    ${s.text}
                  </div>
                </div>

                <button type="button" class="toggle-flag-btn px-3 py-2 border text-xs font-mono uppercase tracking-wider shrink-0 transition rounded-xs ${m?"bg-[#bd6f5d] text-white border-[#bd6f5d]":"bg-white text-[var(--text-secondary)] border-[var(--grid-border)] hover:border-[var(--accent-gold)]"}" data-id="${s.id}">
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
    `,a.querySelectorAll(".record-card").forEach((s,b)=>{const m=s.getAttribute("data-id"),l=()=>{i.has(m)||(i.add(m),t("record_inspected",{trial_index:b,stimulus_id:m,task_def_version:"1.0"}))};s.addEventListener("focus",l),s.addEventListener("mouseenter",l)}),a.querySelectorAll(".toggle-flag-btn").forEach((s,b)=>{const m=s.getAttribute("data-id"),l=g=>{r=g;const x=!e.has(m);x?e.add(m):e.delete(m),t("discrepancy_toggled",{trial_index:b,stimulus_id:m,flagged_state:x,input_modality:r,task_def_version:"1.0"}),c()};s.addEventListener("click",()=>l("mouse")),s.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),l("keyboard"))})}),(d=document.getElementById("a3SubmitBtn"))==null||d.addEventListener("click",()=>{t("verification_finalized",{action_id:"approve_ledger",input_modality:r,task_def_version:"1.0"}),f({mini_game:"A3",observations_count:p.length})})}c()}function U(a,n){const{appContainer:t,miniGameIndex:f,logEvent:u,onMiniGameComplete:e}=a;switch(f){case 0:Q(t,n,u,e);break;case 1:Y(t,n,u,e);break;case 2:J(t,n,u,e);break}}function Q(a,n,t,f){let u=!0,e=0,i=50,r="accommodate",p="mouse",c=null;const v=[{stimulus_id:"F1_T1",title:"Acoustic Note: Reverberant Strain",cue_text:'"The sound in the front row has a sharp treble edge and heavy wall reflection."',default_action:"accommodate"},{stimulus_id:"F1_T2",title:"Acoustic Note: Effortless Resonance",cue_text:'"Acoustics in the center hall are clear; resonance is balanced and effortless."',default_action:"maintain_objective"},{stimulus_id:"F1_T3",title:"Acoustic Note: Quiet Passage",cue_text:'"The speaker is reciting a whisper passage; verse intelligibility is dipping."',default_action:"accommodate"},{stimulus_id:"F1_T4",title:"Acoustic Note: Ambiguous Silence",cue_text:'"A sudden pause in the audio stream — could be dramatic silence or a channel fault."',default_action:"clarify"},{stimulus_id:"F1_T5",title:"Acoustic Note: Balanced Choral",cue_text:'"Choral recitation is balanced and rhythm is completely stable throughout the room."',default_action:"maintain_objective"},{stimulus_id:"F1_T6",title:"Acoustic Note: Projected Forte",cue_text:'"Vocal projection is peaking sharply on dramatic verse accents in the hall."',default_action:"accommodate"}];function d(){var h,y;if(c&&(cancelAnimationFrame(c),c=null),u){a.innerHTML=`
        <div>
          ${n("Part 1: Tuning the Hall","Calibrating the soundscape for the poetry recital across changing acoustic moments.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>',goal:"Observe each acoustic feedback note and adjust your approach accordingly across 6 trials.",steps:["Review the acoustic feedback note from the setup team.","Choose your response approach: Accommodate, Maintain Baseline, or Clarify.","Adjust the acoustic slider if needed, then confirm your setting."]})}
        </div>
      `,(h=document.getElementById("startActivityBtn"))==null||h.addEventListener("click",()=>{u=!1,e=0,i=50,r="accommodate",d()});return}const s=v[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 1: Tuning the Hall","Adjust the acoustic profile to support the recital.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Trial ${e+1} of 6</span>
        </div>

        <!-- Acoustic Dialogue Note -->
        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3 shadow-xs">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${s.title}</div>
            <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${s.cue_text}</div>
          </div>
        </div>

        <!-- Action Approach Selection -->
        <div class="mb-5">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-medium">Select Operational Response:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${r==="accommodate"?"border-[var(--accent-gold)] bg-amber-50/50":"border-[var(--grid-border)] bg-white"}" data-action="accommodate">
              <div class="text-xs font-semibold text-[var(--text-primary)]">Accommodate</div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">Adapt acoustic filter to assist the speaker</div>
            </button>
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${r==="maintain_objective"?"border-[var(--accent-gold)] bg-amber-50/50":"border-[var(--grid-border)] bg-white"}" data-action="maintain_objective">
              <div class="text-xs font-semibold text-[var(--text-primary)]">Maintain Objective</div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">Keep baseline acoustic balance undisturbed</div>
            </button>
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${r==="clarify"?"border-[var(--accent-gold)] bg-amber-50/50":"border-[var(--grid-border)] bg-white"}" data-action="clarify">
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
              <span class="font-mono text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)]" id="sliderValDisplay">${i}</span>
              <span class="flex items-center gap-1">Bright (100) <span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span></span>
            </div>
            <input type="range" id="freqSlider" min="0" max="100" step="5" value="${i}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
          </div>
        </div>

        <div class="flex justify-end">
          <button id="lockFreqBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            ${e<5?"Confirm Setting &rarr;":"Finish Acoustic Calibration &rarr;"}
          </button>
        </div>
      </div>
    `;const b=document.getElementById("waveCanvas"),m=b==null?void 0:b.getContext("2d"),l=document.getElementById("freqSlider"),g=document.getElementById("sliderValDisplay");let x=0;function _(){if(!m||!b)return;m.clearRect(0,0,b.width,b.height),m.strokeStyle="#f0eeea",m.lineWidth=1;for(let E=0;E<b.width;E+=30)m.beginPath(),m.moveTo(E,0),m.lineTo(E,b.height),m.stroke();m.strokeStyle="#bd6f5d",m.lineWidth=2.5,m.beginPath();const w=.015+i/100*.05,P=14+Math.abs(i-50)/50*16;for(let E=0;E<b.width;E++){const B=b.height/2+Math.sin(E*w+x)*P;E===0?m.moveTo(E,B):m.lineTo(E,B)}m.stroke(),x+=.04,c=requestAnimationFrame(_)}_(),a.querySelectorAll(".f1-action-btn").forEach(w=>{w.addEventListener("click",P=>{p="mouse",r=w.getAttribute("data-action"),a.querySelectorAll(".f1-action-btn").forEach(E=>{E.classList.remove("border-[var(--accent-gold)]","bg-amber-50/50"),E.classList.add("border-[var(--grid-border)]","bg-white")}),w.classList.add("border-[var(--accent-gold)]","bg-amber-50/50"),w.classList.remove("border-[var(--grid-border)]","bg-white")})}),l==null||l.addEventListener("input",w=>{p=w.pointerType||"mouse",i=parseInt(w.target.value,10),g&&(g.textContent=i),t("slider_input",{trial_index:e,stimulus_id:s.stimulus_id,slider_position_raw:i,input_modality:p,task_def_version:"1.0"})}),l==null||l.addEventListener("keydown",w=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(w.key)&&(p="keyboard")}),(y=document.getElementById("lockFreqBtn"))==null||y.addEventListener("click",()=>{c&&(cancelAnimationFrame(c),c=null),t("trial_submit",{trial_index:e,stimulus_id:s.stimulus_id,action_id:r,slider_position_raw:i,input_modality:p,task_def_version:"1.0"}),e<5?(e++,i=50,r=v[e].default_action,d()):f({mini_game:"F1",observations_count:6})})}d()}function Y(a,n,t,f){let u=!0,e=0,i=null,r="mouse";const p=[{stimulus_id:"F2_T1",speaker_role:"Stage Director",cue_text:'"The reciting poet gestures clearly toward the side monitor speaker, explicitly requesting vocal support."',condition_label:"Direct Request"},{stimulus_id:"F2_T2",speaker_role:"Rehearsal Coordinator",cue_text:'"The speaker pauses mid-line with an uncertain expression; their tone is hesitant but no instruction is given."',condition_label:"Ambiguous Signal"},{stimulus_id:"F2_T3",speaker_role:"Sound Technician",cue_text:'"The performer delivers an impassioned verse with intense strain in their voice, as part of the theatrical performance."',condition_label:"Expressive Intensity"},{stimulus_id:"F2_T4",speaker_role:"Guest Accompanist",cue_text:'"The accompanying percussionist has subtly altered tempo and is watching the reciter intently to re-establish synchrony."',condition_label:"Subtle Drift"}],c=[{id:"act",title:"Act Directly",desc:"Take immediate operational action to adapt sound levels and support the speaker."},{id:"clarify",title:"Clarify Intent",desc:"Seek confirmation or verify the partner’s preference before making changes."},{id:"maintain",title:"Maintain Course",desc:"Preserve the ongoing acoustic cadence without premature intervention."}];function v(){var b;if(u){a.innerHTML=`
        <div>
          ${n("Part 2: The Gathering Voices","Coordinating acoustic clarity with your event colleagues across 4 communication situations.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>',goal:"Evaluate the communication cue in each trial and select whether to act, clarify, or maintain course.",steps:["Read the operational feedback and partner state description.","Assess whether information is clear, ambiguous, or misleading.","Choose your response: Act, Clarify, or Maintain."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{u=!1,e=0,i=null,v()});return}const d=p[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 2: The Gathering Voices","Evaluate the communication situation and choose your course of action.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Trial ${e+1} of 4</span>
        </div>

        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${d.speaker_role}</div>
            <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${d.cue_text}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${c.map(m=>`
            <div class="f2-card p-4 bg-white border ${i===m.id?"border-[var(--accent-gold)] bg-amber-50/40 shadow-sm":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2 rounded-xs" data-action="${m.id}" tabindex="0" role="button">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${i===m.id?"bg-[var(--accent-gold)]":"bg-stone-300"}"></span>
                ${m.title}
              </div>
              <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${m.desc}</div>
            </div>
          `).join("")}
        </div>

        <div class="flex justify-end">
          <button id="f2ConfirmBtn" ${i?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            ${e<3?"Confirm Communication &rarr;":"Finish Coordination &rarr;"}
          </button>
        </div>
      </div>
    `;const s=document.getElementById("f2ConfirmBtn");a.querySelectorAll(".f2-card").forEach(m=>{const l=g=>{var x,_;r=g,i=m.getAttribute("data-action"),a.querySelectorAll(".f2-card").forEach(h=>{var y,w;h.classList.remove("border-[var(--accent-gold)]","bg-amber-50/40","shadow-sm"),h.classList.add("border-[var(--grid-border)]"),(y=h.querySelector("span.rounded-full"))==null||y.classList.remove("bg-[var(--accent-gold)]"),(w=h.querySelector("span.rounded-full"))==null||w.classList.add("bg-stone-300")}),m.classList.add("border-[var(--accent-gold)]","bg-amber-50/40","shadow-sm"),m.classList.remove("border-[var(--grid-border)]"),(x=m.querySelector("span.rounded-full"))==null||x.classList.add("bg-[var(--accent-gold)]"),(_=m.querySelector("span.rounded-full"))==null||_.classList.remove("bg-stone-300"),s&&(s.disabled=!1)};m.addEventListener("click",()=>l("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),l("keyboard"))})}),s==null||s.addEventListener("click",()=>{t("trial_submit",{trial_index:e,stimulus_id:d.stimulus_id,action_id:i,input_modality:r,task_def_version:"1.0"}),e<3?(e++,i=null,v()):f({mini_game:"F2",observations_count:4})})}v()}function J(a,n,t,f){let u=!0,e=0,i="baseline",r=null,p=null,c="mouse";const v=[{stimulus_id:"F3_T1",cue_id:"cue_expressive_crescendo",title:"Transition 1: Vocal Projection Crescendo",cue_text:'"The reciting poet initiates an impassioned vocal crescendo on a climactic verse."',baseline_context:"Dry Rehearsal Studio — Acoustic decay is rapid and unamplified.",baseline_options:[{id:"support_volume",label:"Support Volume",desc:"Apply gain to sustain acoustic projection in dry room."},{id:"dampen_level",label:"Dampen Level",desc:"Reduce level immediately before the peak."},{id:"neutral_hold",label:"Neutral Hold",desc:"Keep baseline settings without adjustment."}],shifted_context:"Vaulted Stone Chamber — High-reverberation stone walls amplify natural decay; boosting gain causes muddy reverberation clash.",shifted_options:[{id:"attenuate_reverb",label:"Attenuate Reverb",desc:"Dampen decay tails so reflective walls do not blur verse clarity."},{id:"support_volume",label:"Support Volume",desc:"Maintain dry-studio gain boost (causes severe echo clash)."},{id:"neutral_hold",label:"Neutral Hold",desc:"Ignore acoustic environment shift."}]},{stimulus_id:"F3_T2",cue_id:"cue_sotto_voce_pause",title:"Transition 2: Sotto-Voce Whisper",cue_text:'"The performer drops into a delicate, hushed whisper between stanza strophes."',baseline_context:"Quiet Intimate Salon — Close audience seating; natural whisper is completely audible.",baseline_options:[{id:"preserve_natural_intimacy",label:"Preserve Natural Intimacy",desc:"Keep sound transparent without artificial amplification."},{id:"boost_high_gain",label:"High Gain Boost",desc:"Force whisper volume to loud recital level."},{id:"cut_channel",label:"Mute Channel",desc:"Treat volume dip as dead air."}],shifted_context:"Bustling Courtyard Entrance — Distant street traffic and fountain murmur mask delicate acoustic signals.",shifted_options:[{id:"boost_intelligibility",label:"Boost Intelligibility",desc:"Lift vocal presence so outdoor murmur does not drown out verse."},{id:"preserve_natural_intimacy",label:"Preserve Natural Intimacy",desc:"Leave unboosted (whisper is completely obscured)."},{id:"cut_channel",label:"Mute Channel",desc:"Treat dip as audio fault."}]},{stimulus_id:"F3_T3",cue_id:"cue_rhythmic_syncopation",title:"Transition 3: Syncopated Metric Pause",cue_text:'"The performer introduces an abrupt, syncopated metric pause before the final couplet."',baseline_context:"Continuous Solo Recitation — Solitary speaker; steady driving tempo is expected.",baseline_options:[{id:"sustain_cadence",label:"Sustain Cadence",desc:"Maintain driving tempo support across the pause."},{id:"halt_accompaniment",label:"Halt Accompaniment",desc:"Stop abruptly on sudden pause."},{id:"force_metronome",label:"Force Accelerated Tempo",desc:"Push recitation forward past pause."}],shifted_context:"Call-and-Response Ensemble — Vocal chorus enters in the pause to provide reciprocal answering refrain.",shifted_options:[{id:"open_reciprocal_space",label:"Open Reciprocal Space",desc:"Yield direct tempo drive to let the chorus answer breathe."},{id:"sustain_cadence",label:"Sustain Cadence",desc:"Drive straight through the chorus reply without pausing."},{id:"force_metronome",label:"Force Accelerated Tempo",desc:"Rush ensemble timing."}]}];function d(){var m,l,g;if(u){a.innerHTML=`
        <div>
          ${n("Part 3: The Echo of the Room","Reinterpreting performance cues across 3 venue transitions as environmental context changes.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>',goal:"Observe how the exact same performance cue requires an updated response when the venue context changes.",steps:["Review the performer cue in the baseline context and select your initial response.","Observe the context transition: the setting changes, altering the cue's meaning.","Select your updated response to maintain objective across all 3 transitions."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{u=!1,e=0,i="baseline",r=null,p=null,s(),d()});return}const b=v[e];i==="baseline"?(a.innerHTML=`
        <div class="animate-fadeIn">
          <div class="flex justify-between items-center mb-2">
            ${n("Part 3: The Echo of the Room","Initial baseline context: determine your response to the performer's cue.")}
            <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Transition ${e+1} of 3 (Stage 1)</span>
          </div>

          <!-- Performer Cue -->
          <div class="p-5 bg-stone-50 border border-[var(--grid-border)] rounded-sm mb-4">
            <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-gold)] font-semibold">Performer Cue</span>
            <div class="text-sm font-serif text-[var(--text-primary)] font-medium mt-1">${b.cue_text}</div>
          </div>

          <!-- Baseline Setting -->
          <div class="p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-xs font-semibold shrink-0">1</div>
            <div>
              <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Baseline Context</div>
              <div class="text-xs text-[var(--text-primary)] mt-0.5">${b.baseline_context}</div>
            </div>
          </div>

          <!-- Baseline Options -->
          <div class="space-y-3 mb-6">
            ${b.baseline_options.map(x=>`
              <div class="f3-opt p-4 bg-white border ${r===x.id?"border-[var(--accent-gold)] bg-amber-50/40 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition rounded-xs" data-choice="${x.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)]">${x.label}</div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-1">${x.desc}</div>
              </div>
            `).join("")}
          </div>

          <div class="flex justify-end">
            <button id="f3BaselineBtn" ${r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
              Confirm Baseline & Proceed to Context Shift &rarr;
            </button>
          </div>
        </div>
      `,a.querySelectorAll(".f3-opt").forEach(x=>{const _=h=>{c=h,r=x.getAttribute("data-choice"),d()};x.addEventListener("click",()=>_("mouse")),x.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),_("keyboard"))})}),(l=document.getElementById("f3BaselineBtn"))==null||l.addEventListener("click",()=>{t("baseline_response_selected",{trial_index:e,stimulus_id:b.stimulus_id,cue_id:b.cue_id,choice_id:r,input_modality:c,task_def_version:"1.0"}),i="shifted",t("context_shifted",{trial_index:e,stimulus_id:b.stimulus_id,cue_id:b.cue_id,shifted_context:b.shifted_context,task_def_version:"1.0"}),d()})):(a.innerHTML=`
        <div class="animate-fadeIn">
          <div class="flex justify-between items-center mb-2">
            ${n("Part 3: The Echo of the Room","The context has shifted: re-evaluate the same cue under new acoustic conditions.")}
            <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Transition ${e+1} of 3 (Stage 2)</span>
          </div>

          <!-- Performer Cue (Unchanged) -->
          <div class="p-4 bg-stone-50 border border-[var(--grid-border)] rounded-sm mb-3">
            <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-gold)] font-semibold">Same Performer Cue</span>
            <div class="text-xs font-serif text-[var(--text-primary)] font-medium mt-0.5">${b.cue_text}</div>
          </div>

          <!-- Shifted Context Notice -->
          <div class="p-4 bg-amber-100/70 border border-[#bd6f5d]/50 rounded-sm mb-6 flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-[#bd6f5d] text-white flex items-center justify-center font-serif text-xs font-semibold shrink-0">2</div>
            <div>
              <div class="text-[10px] uppercase tracking-wider text-[#bd6f5d] font-semibold">New Context Shift</div>
              <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${b.shifted_context}</div>
            </div>
          </div>

          <!-- Shifted Options -->
          <div class="space-y-3 mb-6">
            ${b.shifted_options.map(x=>`
              <div class="f3-updated-opt p-4 bg-white border ${p===x.id?"border-[var(--accent-gold)] bg-amber-50/40 shadow-xs":"border-[var(--grid-border)]"} cursor-pointer hover:border-[var(--accent-gold)] transition rounded-xs" data-choice="${x.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)]">${x.label}</div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-1">${x.desc}</div>
              </div>
            `).join("")}
          </div>

          <div class="flex justify-end">
            <button id="f3UpdatedBtn" ${p?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
              ${e<2?"Save Updated Setting & Next Transition &rarr;":"Finalize Context Updating &rarr;"}
            </button>
          </div>
        </div>
      `,a.querySelectorAll(".f3-updated-opt").forEach(x=>{const _=h=>{c=h,p=x.getAttribute("data-choice"),d()};x.addEventListener("click",()=>_("mouse")),x.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),_("keyboard"))})}),(g=document.getElementById("f3UpdatedBtn"))==null||g.addEventListener("click",()=>{t("updated_response_selected",{trial_index:e,stimulus_id:b.stimulus_id,cue_id:b.cue_id,choice_id:p,input_modality:c,task_def_version:"1.0"}),t("transition_completed",{trial_index:e,stimulus_id:b.stimulus_id,task_def_version:"1.0"}),e<2?(e++,i="baseline",r=null,p=null,s(),d()):f({mini_game:"F3",observations_count:3})}))}function s(){const b=v[e];t("transition_presented",{trial_index:e,stimulus_id:b.stimulus_id,cue_id:b.cue_id,baseline_context:b.baseline_context,task_def_version:"1.0"})}d()}function K(a,n){const{appContainer:t,miniGameIndex:f,logEvent:u,onMiniGameComplete:e}=a;switch(f){case 0:Z(t,n,u,e);break;case 1:X(t,n,u,e);break;case 2:ee(t,n,u,e);break}}function Z(a,n,t,f){let u=!0,e=0,i=0,r="mouse";const p=[{stimulus_id:"C1_R1",title:"Round 1: Partner Mosaic Deficit",description:"Your partner’s workstation is short by 3 tiles to complete their mosaic panel. You have 8 tiles.",partner_initial:2,user_initial:8,default_transfer:0,context_note:"Partner Deficit Condition"},{stimulus_id:"C1_R2",title:"Round 2: Balanced Mosaic Workstation",description:"Both you and your partner have adequate supplies (5 tiles each) to complete your respective panels.",partner_initial:5,user_initial:5,default_transfer:0,context_note:"Balanced Need Condition"},{stimulus_id:"C1_R3",title:"Round 3: Partner Surplus Control",description:"Your partner already has an excess of materials (8 tiles) for their section, while you have 5 tiles.",partner_initial:8,user_initial:5,default_transfer:0,context_note:"Surplus / No-Need Control"},{stimulus_id:"C1_R4",title:"Round 4: Self-Station Ceramic Shortage",description:"Your workstation has a critical deficit (3 tiles; quota requires 6), while your partner has 7 tiles (requires 4). Over-sharing deprives your station and halts assembly; retaining resources is appropriate.",partner_initial:7,user_initial:3,default_transfer:0,context_note:"Retaining Resource Condition"}];function c(){var m,l,g,x;if(u){a.innerHTML=`
        <div>
          ${n("Part 1: The Artisan's Basket","Coordinating ceramic mosaic supplies with your workshop partner across 4 distinct inventory situations.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',goal:"Evaluate the inventory needs in each round and decide how many tiles (if any) to transfer from your basket.",steps:["Check both workstations to see if materials are in deficit, balanced, or surplus.","Use the + / - buttons to set your transfer count.","Confirm your distribution for each of the 4 rounds."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{u=!1,e=0,i=0,v(),c()});return}const d=p[e],s=d.partner_initial+i,b=d.user_initial-i;a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 1: The Artisan's Basket","Review workstation requirements and allocate tiles appropriately.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Round ${e+1} of 4</span>
        </div>

        <!-- Situation Banner -->
        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${d.title}:</strong> ${d.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${d.context_note}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-[var(--accent-gold)] uppercase font-semibold tracking-wider font-mono">Partner Basket</span>
              <div class="text-xl font-serif font-semibold text-[#bd6f5d] mt-1">${s} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0,s)).fill('<div class="w-4 h-4 bg-[#bd6f5d]/70 rounded-xs shadow-xs"></div>').join("")}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-emerald-700 uppercase font-semibold tracking-wider font-mono">Your Basket</span>
              <div class="text-xl font-serif font-semibold text-emerald-800 mt-1">${b} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0,b)).fill('<div class="w-4 h-4 bg-emerald-700/70 rounded-xs shadow-xs"></div>').join("")}
              </div>
            </div>
          </div>

          <div class="text-center pt-2 border-t border-[var(--grid-border)]">
            <div class="text-xs text-[var(--text-secondary)] mb-3 font-medium">Tiles to transfer to partner:</div>
            <div class="flex justify-center items-center gap-4">
              <button type="button" id="minusTileBtn" class="w-10 h-10 rounded-xs bg-white border border-[var(--grid-border)] text-lg font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs" tabindex="0">-</button>
              <span id="transferCount" class="font-serif text-3xl font-semibold text-[var(--accent-gold)] w-10 text-center">${i}</span>
              <button type="button" id="plusTileBtn" class="w-10 h-10 rounded-xs bg-white border border-[var(--grid-border)] text-lg font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs" tabindex="0">+</button>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmTransferBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
            ${e<3?"Confirm Allocation &rarr;":"Finish Resource Distribution &rarr;"}
          </button>
        </div>
      </div>
    `,(l=document.getElementById("minusTileBtn"))==null||l.addEventListener("click",()=>{r="mouse",i>0&&(i--,t("resource_transferred",{trial_index:e,stimulus_id:d.stimulus_id,delta:-1,action_type:"return_to_user",input_modality:r,task_def_version:"1.0"}),c())}),(g=document.getElementById("plusTileBtn"))==null||g.addEventListener("click",()=>{r="mouse",i<d.user_initial&&(i++,t("resource_transferred",{trial_index:e,stimulus_id:d.stimulus_id,delta:1,action_type:"transfer_to_partner",input_modality:r,task_def_version:"1.0"}),c())}),(x=document.getElementById("confirmTransferBtn"))==null||x.addEventListener("click",()=>{t("allocation_confirmed",{trial_index:e,stimulus_id:d.stimulus_id,input_modality:r,task_def_version:"1.0"}),e<3?(e++,i=0,v(),c()):f({mini_game:"C1",observations_count:4})})}function v(){const d=p[e];t("round_presented",{trial_index:e,stimulus_id:d.stimulus_id,input_modality:r,task_def_version:"1.0"})}c()}function X(a,n,t,f){let u=!0,e=0,i=null,r="mouse";const p=[{stimulus_id:"C2_R1",title:"Round 1: Open Wall Turn",partner_desc:"Partner has hung their painting on the Upper Left (North) cluster.",slots:[{id:"SLOT_NORTH_RIGHT",label:"Upper Right (Balanced Spacing)"},{id:"SLOT_OVERLAP_LEFT",label:"Adjacent Left (Tight Cluster)"},{id:"SLOT_BOTTOM_CENTER",label:"Lower Center (Vertical Complement)"}]},{stimulus_id:"C2_R2",title:"Round 2: Restricted Wall Space",partner_desc:"Partner is framing the Center Hallway; central corridor clearance must remain open.",slots:[{id:"SLOT_PERIMETER_EAST",label:"East Perimeter (Clear Corridor)"},{id:"SLOT_CENTER_ADJACENT",label:"Center Blocking Slot (Crowds Hallway)"},{id:"SLOT_PERIMETER_WEST",label:"West Perimeter (Clear Corridor)"}]},{stimulus_id:"C2_R3",title:"Round 3: Dynamic Canvas Adjustment",partner_desc:"Partner shifted their composition toward the Lower (South) exhibition area.",slots:[{id:"SLOT_UPPER_GALLERY",label:"Upper Wall (Restores Bilateral Balance)"},{id:"SLOT_LOWER_CONGESTED",label:"Lower Wall (Overcrowds South)"},{id:"SLOT_MID_SIDE",label:"Mid-Side Niche (Neutral Position)"}]}];function c(){var s,b;if(u){a.innerHTML=`
        <div>
          ${n("Part 2: The Gallery Wall","Coordinating artwork hanging positions across 3 spatial layout rounds.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>',goal:"Select an artwork hanging slot in each round that complements your partner’s arrangement without interference.",steps:["Review your colleague’s hung piece and the layout state in each round.","Inspect the available placement slots on the wall.","Confirm your chosen position across all 3 rounds."]})}
        </div>
      `,(s=document.getElementById("startActivityBtn"))==null||s.addEventListener("click",()=>{u=!1,e=0,i=null,v(),c()});return}const d=p[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 2: The Gallery Wall","Coordinate placement with your partner’s artwork.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Round ${e+1} of 3</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${d.title}:</strong> ${d.partner_desc}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${d.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="w-full bg-white border border-[var(--grid-border)] p-6 rounded-xs shadow-inner mb-4">
            <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Available Wall Placement Slots:</div>
            <div class="flex flex-col gap-2.5">
              ${d.slots.map(m=>`
                <button type="button" class="slot-btn px-4 py-3 text-xs border rounded-xs ${i===m.id?"border-[var(--accent-gold)] bg-amber-50 font-semibold shadow-xs":"border-[var(--grid-border)] bg-white hover:border-[var(--accent-gold)]"} transition flex items-center justify-between" data-slot="${m.id}" tabindex="0">
                  <span class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${i===m.id?"bg-[var(--accent-gold)] text-white":"text-stone-400"}">${i===m.id?"✓":""}</span>
                    <span class="text-[var(--text-primary)]">${m.label}</span>
                  </span>
                  <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${m.id}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmWallBtn" ${i?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<2?"Confirm Placement &rarr;":"Finish Wall Coordination &rarr;"}
          </button>
        </div>
      </div>
    `,a.querySelectorAll(".slot-btn").forEach(m=>{const l=g=>{r=g,i=m.getAttribute("data-slot"),t("placement_attempted",{trial_index:e,stimulus_id:d.stimulus_id,slot_id:i,input_modality:r,task_def_version:"1.0"}),c()};m.addEventListener("click",()=>l("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),l("keyboard"))})}),(b=document.getElementById("confirmWallBtn"))==null||b.addEventListener("click",()=>{t("placement_confirmed",{trial_index:e,stimulus_id:d.stimulus_id,chosen_slot:i,input_modality:r,task_def_version:"1.0"}),e<2?(e++,i=null,v(),c()):f({mini_game:"C2",observations_count:3})})}function v(){const d=p[e];t("round_presented",{trial_index:e,stimulus_id:d.stimulus_id,task_def_version:"1.0"})}c()}function ee(a,n,t,f){let u=!0,e=0,i=null,r=null,p="mouse";const c=[{stimulus_id:"C3_R1",title:"Opportunity 1: Partner Circuit Breakdown",partner_state:"Partner’s exhibition lantern circuit has gone dark due to an electrical conduit misalignment.",condition_type:"identify_and_repair",fault_options:[{id:"fault_conduit_disconnected",label:"Conduit feeder disconnected at terminal block"},{id:"fault_bulb_broken",label:"Bulb filament shattered"},{id:"fault_switch_off",label:"Main pavilion master switch is turned off"}],repair_options:[{id:"adjust_conduit",label:"Realight conduit terminal and secure ground clamp"},{id:"call_help_desk",label:"Click general help desk button"},{id:"replace_lantern",label:"Dismantle lantern fixture"}],execution_action:"restore_power"},{stimulus_id:"C3_R2",title:"Opportunity 2: Hanging Rig Counterweight Jam",partner_state:"Partner’s ceiling suspension cable is jammed in the pulley guide, preventing joint panel alignment.",condition_type:"identify_and_repair",fault_options:[{id:"fault_cable_pulley_pinch",label:"Suspension cable wedged between pulley wheel and guide bracket"},{id:"fault_cable_snapped",label:"Counterweight line severed completely"},{id:"fault_wall_anchor_loose",label:"Wall anchor bolt loosened"}],repair_options:[{id:"reseat_pulley_cable",label:"Release tension lever and reseat cable into center pulley groove"},{id:"call_facility_maintenance",label:"Log generic facility maintenance request ticket"},{id:"force_pull_cable",label:"Yank cable forcefully downward"}],execution_action:"align_panel_height"},{stimulus_id:"C3_R3",title:"Opportunity 3: Shadow Corridor Obstruction",partner_state:"Partner’s painting is obscured by an accidental spotlight shadow barrier.",condition_type:"identify_and_repair",fault_options:[{id:"fault_blindspot_obstruction",label:"Spotlight angle obstructed by movable partition"},{id:"fault_color_distortion",label:"Color temperature mismatched"}],repair_options:[{id:"shift_lantern",label:"Re-angle spotlight beam 30 degrees to bypass obstruction"},{id:"generic_complaint",label:"Submit generic lighting complaint ticket"}],execution_action:"illuminate_path"}];function v(){var b,m;if(u){a.innerHTML=`
        <div>
          ${n("Part 3: The Dual Lanterns","Diagnosing and repairing collaborative workflow breakdowns across 3 exhibition situations.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',goal:"Collaboratively repair workflow breakdowns: identify the specific issue, perform a useful repair action, and execute the fix.",steps:["Examine the operational situation in each opportunity.","Identify the breakdown root cause (or recognize clean balance).","Select a constructive repair action and execute the solution."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{u=!1,e=0,i=null,r=null,d(),v()});return}const s=c[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 3: The Dual Lanterns","Resolve operational breakdowns to maintain joint exhibition harmony.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Opportunity ${e+1} of 3</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${s.title}:</strong> ${s.partner_state}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${s.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <!-- Step 1: Identify Breakdown -->
          <div class="mb-5">
            <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2">
              Step 1: Identify the Operational Breakdown
            </div>
            <div class="space-y-2">
              ${s.fault_options.map(l=>`
                <div class="fault-opt p-3 bg-white border ${i===l.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center gap-2" data-fault="${l.id}" tabindex="0" role="button">
                  <span class="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px] ${i===l.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${i===l.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)]">${l.label}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Step 2: Perform Constructive Repair -->
          ${i?`
            <div class="mb-5 pt-4 border-t border-[var(--grid-border)] animate-fadeIn">
              <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                Step 2: Perform Constructive Repair Action
              </div>
              <div class="space-y-2">
                ${s.repair_options.map(l=>`
                  <div class="repair-opt p-3 bg-white border ${r===l.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center gap-2" data-repair="${l.id}" tabindex="0" role="button">
                    <span class="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px] ${r===l.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${r===l.id?"✓":""}</span>
                    <span class="text-[var(--text-primary)]">${l.label}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          `:""}
        </div>

        <div class="flex justify-end">
          <button type="button" id="executeRepairBtn" ${i&&r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<2?"Execute Repair & Proceed &rarr;":"Finalize Joint Repair &rarr;"}
          </button>
        </div>
      </div>
    `,a.querySelectorAll(".fault-opt").forEach(l=>{const g=x=>{p=x,i=l.getAttribute("data-fault"),t("breakdown_identified",{trial_index:e,stimulus_id:s.stimulus_id,fault_id:i,input_modality:p,task_def_version:"1.0"}),v()};l.addEventListener("click",()=>g("mouse")),l.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),g("keyboard"))})}),a.querySelectorAll(".repair-opt").forEach(l=>{const g=x=>{p=x,r=l.getAttribute("data-repair"),t("repair_action_performed",{trial_index:e,stimulus_id:s.stimulus_id,repair_action_id:r,input_modality:p,task_def_version:"1.0"}),v()};l.addEventListener("click",()=>g("mouse")),l.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),g("keyboard"))})}),(m=document.getElementById("executeRepairBtn"))==null||m.addEventListener("click",()=>{t("repaired_action_executed",{trial_index:e,stimulus_id:s.stimulus_id,fault_id:i,repair_action_id:r,execution_action_id:s.execution_action,input_modality:p,task_def_version:"1.0"}),e<2?(e++,i=null,r=null,d(),v()):f({mini_game:"C3",observations_count:3})})}function d(){const s=c[e];t("repair_presented",{trial_index:e,stimulus_id:s.stimulus_id,task_def_version:"1.0"})}v()}function te(a,n){const{appContainer:t,miniGameIndex:f,logEvent:u,onMiniGameComplete:e}=a;switch(f){case 0:ie(t,n,u,e);break;case 1:ae(t,n,u,e);break;case 2:re(t,n,u,e);break}}function ie(a,n,t,f){let u=!0,e=0,i="mouse";const r=[{stimulus_id:"E1_T1",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T2",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T3",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T4",color:"Sage",shape:"Square",icon:"&#9632;",label:"Sage Square"},{stimulus_id:"E1_T5",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T6",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"},{stimulus_id:"E1_T7",color:"Gold",shape:"Circle",icon:"&#9679;",label:"Gold Circle"},{stimulus_id:"E1_T8",color:"Gold",shape:"Square",icon:"&#9632;",label:"Gold Square"},{stimulus_id:"E1_T9",color:"Sage",shape:"Circle",icon:"&#9679;",label:"Sage Circle"}];function p(){var d;if(u){a.innerHTML=`
        <div>
          ${n("Part 1: The Ceramic Mosaic","Sorting geometric tiles into exhibition bins across 9 successive sorting opportunities.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>',goal:"Observe each ceramic tile and assign it to the matching container.",steps:["Examine the stimulus tile presented on the central easel.","Choose Container 1 or Container 2 based on pattern correspondence.","Sort all 9 tiles to complete the series."]})}
        </div>
      `,(d=document.getElementById("startActivityBtn"))==null||d.addEventListener("click",()=>{u=!1,e=0,performance.now(),c(),p()});return}const v=r[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 1: The Ceramic Mosaic","Sort each mosaic tile into the appropriate exhibition container.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Tile ${e+1} of ${r.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>Mosaic Stage:</strong> Determine the matching container for the presented tile.
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${v.stimulus_id}</span>
        </div>

        <!-- Stimulus Presentation Area -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="text-5xl mb-2.5 transition-transform hover:scale-105 ${v.color==="Gold"?"text-[var(--accent-gold)]":"text-emerald-700"}">
            ${v.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${v.label}</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1 font-mono uppercase">${v.color} &bull; ${v.shape}</div>
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
    `,a.querySelectorAll(".bin-btn").forEach(s=>{const b=m=>{i=m;const l=s.getAttribute("data-choice");t("tile_sorted",{trial_index:e,stimulus_id:v.stimulus_id,choice:l,input_modality:i,task_def_version:"1.0"}),e<r.length-1?(e++,performance.now(),c(),p()):f({mini_game:"E1",observations_count:9})};s.addEventListener("click",()=>b("mouse")),s.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),b("keyboard"))})})}function c(){const v=r[e];t("trial_presented",{trial_index:e,stimulus_id:v.stimulus_id,tile_color:v.color,tile_shape:v.shape,task_def_version:"1.0"})}p()}function ae(a,n,t,f){let u=!0,e=0,i=null,r="mouse";const p=[{stimulus_id:"E2_S1",title:"Sequence 1: Workspace Pigment Spill",situation:"A sudden ink droplet spilled across your active workstation layout card.",has_disruption:!0,disruption_type:"ink_spill_masking_workspace",options:[{id:"clear_workspace",label:"Dab spill with blotting linen and realign layout card",note:"Constructive recovery action"},{id:"rush_uncleaned",label:"Continue assembly without cleaning around the smudge",note:"Rushed compromise"},{id:"pause_idle",label:"Step away from the bench to wait for guidance",note:"Passive hesitation"}]},{stimulus_id:"E2_S2",title:"Sequence 2: Calm Working Cadence",situation:"The work area is undisturbed, materials are organized, and light is balanced.",has_disruption:!1,disruption_type:"undisrupted_control",options:[{id:"standard_sequence",label:"Proceed with planned standard mosaic montage sequence",note:"Standard constructive cadence"},{id:"unnecessary_rework",label:"Disassemble existing tiles to verify underlayer unnecessarily",note:"Unneeded re-examination"},{id:"pause_idle",label:"Pause activity to double-check surroundings",note:"Passive delay"}]},{stimulus_id:"E2_S3",title:"Sequence 3: Courtyard Draft Disruption",situation:"A courtyard breeze displaced your paper reference template off the table.",has_disruption:!0,disruption_type:"draft_blows_reference_card",options:[{id:"stabilize_reference",label:"Retrieve reference card and secure it with corner stone weight",note:"Constructive securing action"},{id:"guess_motif",label:"Continue placing tiles from rough memory without the template",note:"Unanchored improvisation"},{id:"pause_idle",label:"Wait for indoor air current to settle",note:"Passive hesitation"}]},{stimulus_id:"E2_S4",title:"Sequence 4: Misplaced Ceramic Tray",situation:"The neighboring glaze palette was nudged, obstructing your primary tool rest.",has_disruption:!0,disruption_type:"misplaced_pigment_tray",options:[{id:"reposition_tray",label:"Gently shift the neighboring palette back onto its runner",note:"Constructive realignment"},{id:"use_wrong_shade",label:"Work around the obstruction in an awkward wrist posture",note:"Rushed ergonomic compromise"},{id:"pause_idle",label:"Stop work until the assistant returns",note:"Passive hesitation"}]}];function c(){var s,b;if(u){a.innerHTML=`
        <div>
          ${n("Part 2: The Courtyard Setup","Managing operational adjustments and studio setbacks across 4 workshop sequences.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',goal:"Respond constructively to workshop situations and unexpected physical adjustments.",steps:["Review the atelier situation presented in each sequence.","Evaluate the 3 response options.","Select your constructive operational response across all 4 sequences."]})}
        </div>
      `,(s=document.getElementById("startActivityBtn"))==null||s.addEventListener("click",()=>{u=!1,e=0,i=null,v(),c()});return}const d=p[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 2: The Courtyard Setup","Select the appropriate constructive operational response.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Sequence ${e+1} of ${p.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${d.title}:</strong> ${d.situation}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${d.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Available Operational Responses:</div>
          <div class="space-y-3">
            ${d.options.map(m=>`
              <div class="e2-opt p-4 bg-white border ${i===m.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-action="${m.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${i===m.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${i===m.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${m.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${m.note}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmE2Btn" ${i?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<p.length-1?"Confirm Response &rarr;":"Finish Setup Sequences &rarr;"}
          </button>
        </div>
      </div>
    `,a.querySelectorAll(".e2-opt").forEach(m=>{const l=g=>{r=g,i=m.getAttribute("data-action"),t("action_selected",{trial_index:e,stimulus_id:d.stimulus_id,action_id:i,input_modality:r,task_def_version:"1.0"}),c()};m.addEventListener("click",()=>l("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),l("keyboard"))})}),(b=document.getElementById("confirmE2Btn"))==null||b.addEventListener("click",()=>{t("sequence_completed",{trial_index:e,stimulus_id:d.stimulus_id,chosen_action:i,input_modality:r,task_def_version:"1.0"}),e<p.length-1?(e++,i=null,v(),c()):f({mini_game:"E2",observations_count:4})})}function v(){const d=p[e];t("sequence_presented",{trial_index:e,stimulus_id:d.stimulus_id,has_disruption:d.has_disruption,disruption_type:d.disruption_type,task_def_version:"1.0"})}c()}function re(a,n,t,f){let u=!0,e=0,i=null,r="mouse";const p=[{stimulus_id:"E3_C1",title:"Condition 1: Full Tri-Tone Palette",constraint_state:"standard_three_color_palette",description:"Standard studio conditions: gold, sage, and terracotta pigments are all available on the bench.",options:[{id:"standard_layout",label:"Balanced Tri-Tone Motif (Symmetrical triad placement)"},{id:"tonal_adaptation",label:"Monochrome Grayscale Contrast (Single shade emphasis)"},{id:"compact_adaptation",label:"Half-Grid High Density Compression"}]},{stimulus_id:"E3_C2",title:"Condition 2: Monochrome Indigo Restriction",constraint_state:"monochrome_indigo_only",description:"Material restriction: only single indigo pigment is available; contrast must be achieved through tonal density.",options:[{id:"tonal_adaptation",label:"Tonal Value Gradient (Depth through hatching and value density)"},{id:"standard_layout",label:"Attempt Tri-Color Separation (Incompatible with single pigment)"},{id:"compact_adaptation",label:"Compressed Stamp Layout"}]},{stimulus_id:"E3_C3",title:"Condition 3: Constricted Border Grid",constraint_state:"boundary_constricted_half_grid",description:"Spatial constraint: available wall boundary is reduced to half-width; artwork must be scaled to compact dimensions.",options:[{id:"compact_adaptation",label:"Compact Geometric Scaling (Dense micro-mosaic adaptation)"},{id:"standard_layout",label:"Standard Wide Layout (Exceeds constricted boundary)"},{id:"tonal_adaptation",label:"Unscaled Shading Layout"}]}];function c(){var s,b;if(u){a.innerHTML=`
        <div>
          ${n("Part 3: The Shifting Medium","Adapting aesthetic compositions across 3 shifting environmental constraints.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>',goal:"Adapt your mosaic design strategy to match the shifting environmental conditions while maintaining aesthetic harmony.",steps:["Examine the active studio constraints in each transition.","Choose the layout adaptation best aligned with the constraints.","Confirm your composition across all 3 transitions."]})}
        </div>
      `,(s=document.getElementById("startActivityBtn"))==null||s.addEventListener("click",()=>{u=!1,e=0,i=null,v(),c()});return}const d=p[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 3: The Shifting Medium","Adapt composition strategy to active constraint requirements.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Condition ${e+1} of ${p.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${d.title}:</strong> ${d.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${d.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Composition Adaptation Strategies:</div>
          <div class="space-y-3">
            ${d.options.map(m=>`
              <div class="e3-opt p-4 bg-white border ${i===m.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-layout="${m.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${i===m.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${i===m.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${m.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${m.id}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmE3Btn" ${i?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<p.length-1?"Confirm Adaptation &rarr;":"Finish World 4 &rarr;"}
          </button>
        </div>
      </div>
    `,a.querySelectorAll(".e3-opt").forEach(m=>{const l=g=>{r=g,i=m.getAttribute("data-layout"),t("composition_action_attempted",{trial_index:e,stimulus_id:d.stimulus_id,action_id:i,input_modality:r,task_def_version:"1.0"}),c()};m.addEventListener("click",()=>l("mouse")),m.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),l("keyboard"))})}),(b=document.getElementById("confirmE3Btn"))==null||b.addEventListener("click",()=>{t("composition_confirmed",{trial_index:e,stimulus_id:d.stimulus_id,chosen_action:i,input_modality:r,task_def_version:"1.0"}),e<p.length-1?(e++,i=null,v(),c()):f({mini_game:"E3",observations_count:3})})}function v(){const d=p[e];t("condition_presented",{trial_index:e,stimulus_id:d.stimulus_id,constraint_state:d.constraint_state,task_def_version:"1.0"})}c()}function ne(a,n){const{appContainer:t,miniGameIndex:f,logEvent:u,onMiniGameComplete:e}=a;switch(f){case 0:se(t,n,u,e);break;case 1:oe(t,n,u,e);break;case 2:de(t,n,u,e);break}}function se(a,n,t,f){let u=!0,e=0,i=null,r={},p="mouse";const c=[{stimulus_id:"Q1_D1",title:"Item 1: Antique Illuminated Manuscript Folio",scenario:"Determine the conservation binding strategy for a 19th-century gold-leaf manuscript.",options:[{id:"flexible_cord_binding",label:"Sewn Flexible Cord Binding (Accommodates fragile spine)"},{id:"tight_adhesive_clamp",label:"Rigid Resin Adhesive Clamp (Heavy structural hold)"},{id:"unbound_portfolio",label:"Unbound Archival Enclosure (Stored as loose leaves)"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Calligraphy Binding Technique",info_value:"high",summary:"Traditional Srinagar binders utilized loose vegetable-tanned goat cords to allow spine flexing without fracturing gold leaf borders."},{id:"OPT_CONTROL_1",topic:"Catalog Inventory Stamp Dates",info_value:"low",summary:"Standard inventory accession stamps were introduced in colonial municipal records in October 1888."}]},{stimulus_id:"Q1_D2",title:"Item 2: Papier-Mâché Pen Case (Qalamdan)",scenario:"Select the surface curing and stabilization treatment for an heirloom lacquer case.",options:[{id:"curing_linseed_glaze",label:"Cold-Pressed Linseed Oil & Amber Varnish Curing"},{id:"quick_synthetic_seal",label:"Rapid Synthetic Acrylic Spray"},{id:"wax_buff_only",label:"Dry Carnauba Wax Buffing"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Papier-Mâché Lacquer Curing",info_value:"high",summary:"Slow solar drying combined with natural amber copal preserves organic earth pigments without clouding fine miniature brushwork."},{id:"OPT_CONTROL_2",topic:"Storage Cabinet Hinge Repairs",info_value:"low",summary:"Brass cabinet hinges require tallow lubrication twice annually to prevent creaking."}]},{stimulus_id:"Q1_D3",title:"Item 3: Workshop Ledger Attribution",scenario:"Classify the workshop provenance category for an undated Persian artisan register.",options:[{id:"guild_ledger_verified",label:"Official Guild Registry (Guildmaster seal entry)"},{id:"private_merchant_tally",label:"Informal Merchant Trade Tally"},{id:"state_excise_record",label:"Royal Treasury Revenue Record"}],optional_resources:[{id:"OPT_USEFUL_1",topic:"Calligraphy Binding Technique",info_value:"high",summary:"Binding stitches using dyed crimson thread typically indicate official royal artisan guild registers."},{id:"OPT_CONTROL_1",topic:"Catalog Inventory Stamp Dates",info_value:"low",summary:"Tax stamps are cataloged under Series B filing codes."}]},{stimulus_id:"Q1_D4",title:"Item 4: Botanical Pigment Specimen Jars",scenario:"Specify long-term climate preservation for delicate indigo and saffron plant extracts.",options:[{id:"dark_vented_cedar_chest",label:"Dark Cedar Cabinet with Moisture Buffers"},{id:"ambient_glass_display",label:"Unfiltered Daylight Gallery Vitrine"},{id:"sealed_vacuum_capsule",label:"Hermetic Zero-Humidity Chamber"}],optional_resources:[{id:"OPT_USEFUL_2",topic:"Organic Pigment Preservation",info_value:"high",summary:"Saffron and wild indigo degrade rapidly under ultraviolet exposure; cedarwood oils provide natural insect deterrence."},{id:"OPT_CONTROL_2",topic:"Storage Cabinet Hinge Repairs",info_value:"low",summary:"Cabinet shelves are load-rated for 25 kilograms."}]}];function v(){var b,m;if(u){a.innerHTML=`
        <div>
          ${n("Part 1: The Curatorial Dossier","Making 4 preservation cataloging decisions with optional archival reference dossiers.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',goal:"Make required cataloging decisions for 4 archival artifacts. You may voluntarily inspect optional reference notes at your discretion.",steps:["Examine the archival artifact and decision question.","Optionally review reference research notes if desired.","Select and confirm your curatorial decision for each of the 4 items."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{u=!1,e=0,i=null,d(),v()});return}const s=c[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 1: The Curatorial Dossier","Evaluate the cataloging decision. Reference notes are available below.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Decision ${e+1} of ${c.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${s.title}:</strong> ${s.scenario}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${s.stimulus_id}</span>
        </div>

        <!-- Optional Reference Resources Area (Voluntary) -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-xs">
          <div class="text-[10px] uppercase font-mono text-[var(--accent-gold)] font-semibold tracking-wider mb-2.5 flex items-center justify-between">
            <span>Optional Archival Reference Notes (Voluntary Consultation)</span>
            <span class="text-[9px] text-[var(--text-secondary)]">Click to expand notes</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            ${s.optional_resources.map(l=>`
              <div class="opt-res-card p-3 bg-white border ${r[l.id]?"border-[var(--accent-gold)] bg-amber-50/30":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs" data-res="${l.id}">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    ${l.topic}
                  </span>
                  <span class="text-[9px] font-mono uppercase text-[var(--text-secondary)]">${r[l.id]?"Read":"Inspect"}</span>
                </div>
                ${r[l.id]?`<p class="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--grid-border)] pt-2 animate-fadeIn">${l.summary}</p>`:""}
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Required Decision Options -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Curatorial Actions:</div>
          <div class="space-y-2.5">
            ${s.options.map(l=>`
              <div class="q1-opt p-3.5 bg-white border ${i===l.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-choice="${l.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${i===l.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${i===l.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${l.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${l.id}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmQ1Btn" ${i?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<c.length-1?"Confirm Decision &rarr;":"Finish Curatorial Decisions &rarr;"}
          </button>
        </div>
      </div>
    `,a.querySelectorAll(".opt-res-card").forEach(l=>{l.addEventListener("click",()=>{p="mouse";const g=l.getAttribute("data-res");r[g]=!0,t("optional_resource_viewed",{trial_index:e,stimulus_id:s.stimulus_id,resource_id:g,input_modality:p,task_def_version:"1.0"}),v()})}),a.querySelectorAll(".q1-opt").forEach(l=>{const g=x=>{p=x,i=l.getAttribute("data-choice"),v()};l.addEventListener("click",()=>g("mouse")),l.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),g("keyboard"))})}),(m=document.getElementById("confirmQ1Btn"))==null||m.addEventListener("click",()=>{t("decision_submitted",{trial_index:e,stimulus_id:s.stimulus_id,choice:i,input_modality:p,task_def_version:"1.0"}),e<c.length-1?(e++,i=null,r={},d(),v()):f({mini_game:"Q1",observations_count:4})})}function d(){const s=c[e];t("decision_presented",{trial_index:e,stimulus_id:s.stimulus_id,task_def_version:"1.0"})}v()}function oe(a,n,t,f){let u=!0,e=0,i={},r=null,p="mouse";const c=[{stimulus_id:"Q2_T1",artifact_id:"manuscript_seal_1",title:"Relic 1: Wax Intaglio Seal on Vellum",description:"A dark carmine wax impression affixed to a vellum legal testament.",uncertainty_level:"moderate",expected_value:"high",clues:[{id:"CLUE_SEAL_INTAGLIO",label:"Intaglio Border Latin/Urdu Script",detail:"Identifies the imperial registrar stamp in Srinagar, dated roughly 1862."},{id:"CLUE_WAX_RESIN",label:"Resin and Lac Specimen Analysis",detail:"Shellac composition matches Himalayan pine resins rather than imported European seals."},{id:"CLUE_PARCHMENT_GRAIN",label:"Vellum Animal Grain Pattern",detail:"High-altitude goat skin with characteristic hand-scraped follicle margins."}],attributions:[{id:"attr_imperial_registrar_srinagar",label:"Imperial Registrar of Srinagar (1860s)"},{id:"attr_commercial_trader",label:"Commercial River Trader Manifest"},{id:"attr_modern_reproduction",label:"Late Twentieth Century Replica"}]},{stimulus_id:"Q2_T2",artifact_id:"ciphered_marginalia_2",title:"Relic 2: Ciphered Marginalia Folio",description:"Hand-written marginalia in an unfamiliar cursive cipher along the margins of an astronomy chart.",uncertainty_level:"high",expected_value:"high",clues:[{id:"CLUE_CIPHER_DIACRITIC",label:"Abjad Numerical Cryptography Marks",detail:"Ciphers decode to chronogram dates recording a solar eclipse in 1845."},{id:"CLUE_SCRIBE_HAND",label:"Cursive Calligraphic Flourish",detail:"Matches the private notebooks of court astrologer Mir Habib."},{id:"CLUE_GALL_INK_CORROSION",label:"Iron Gall Ink Vitriol Depth",detail:"Shows genuine chemical paper oxidation consistent with 180 years of aging."}],attributions:[{id:"attr_court_astrologer_notebook",label:"Court Astrologer Private Ephemeris"},{id:"attr_apothecary_recipe",label:"Herbalist Compound Recipe"},{id:"attr_random_scribble",label:"Unattributed Scribe Practice Marks"}]},{stimulus_id:"Q2_T3",artifact_id:"standard_receipt_3",title:"Relic 3: Uniform Municipal Tax Receipt (Control)",description:"A pre-printed municipal toll collection slip with printed column borders.",uncertainty_level:"low",expected_value:"low_control",clues:[{id:"CLUE_PRINT_TYPE",label:"Standard Moveable Type Lettering",detail:"Common mass-printed municipal transit form with no unique historical variance."},{id:"CLUE_STAMP_INK",label:"Blue Aniline Office Stamp",detail:"Routine commercial municipal ink with standard serial numbering."}],attributions:[{id:"attr_standard_tax_slip",label:"Standard Municipal Transit Receipt"},{id:"attr_royal_chancery_grant",label:"Royal Chancery Land Grant"},{id:"attr_secret_monastery_order",label:"Monastic Passage Certificate"}]},{stimulus_id:"Q2_T4",artifact_id:"unknown_crest_impression_4",title:"Relic 4: Embossed Paper Falcon Crest",description:"A relief-embossed paper emblem showing a falcon perched above mountain peaks.",uncertainty_level:"high",expected_value:"moderate",clues:[{id:"CLUE_FALCON_CREST",label:"Embossed Heraldic Falcon Motif",detail:"The falcon emblem was adopted by private paper ateliers along the Jhelum river."},{id:"CLUE_PAPER_WATERMARK",label:"Chain Line & Watermark Inspection",detail:"Contains fine wire watermark with the artisan initials M.K."}],attributions:[{id:"attr_jhelum_paper_atelier",label:"Jhelum River Private Paper Atelier"},{id:"attr_foreign_consulate_letter",label:"Foreign Consulate Diplomatic Stationery"},{id:"attr_unknown_unresolved",label:"Unresolved Provenance"}]}];function v(){var b,m;if(u){a.innerHTML=`
        <div>
          ${n("Part 2: The Antiquarian’s Bench","Investigating 4 uncataloged historical relics under varying uncertainty.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',goal:"Investigate physical clues on 4 historical relics to resolve provenance uncertainty.",steps:["Examine each uncataloged relic and its initial description.","Click clues to uncover material evidence at your discretion.","Attribute the relic based on your investigation."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{u=!1,e=0,i={},r=null,d(),v()});return}const s=c[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 2: The Antiquarian’s Bench","Inspect material clues to resolve provenance uncertainty.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Relic ${e+1} of ${c.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${s.title}:</strong> ${s.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${s.stimulus_id}</span>
        </div>

        <!-- Clues Inspection Grid -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-xs">
          <div class="text-[10px] uppercase font-mono text-[var(--accent-gold)] font-semibold tracking-wider mb-2.5 flex items-center justify-between">
            <span>Material Clues Available for Physical Inspection</span>
            <span class="text-[9px] text-[var(--text-secondary)]">Click clue to examine</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            ${s.clues.map(l=>`
              <div class="clue-btn p-3.5 bg-white border ${i[l.id]?"border-[var(--accent-gold)] bg-amber-50/40 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs" data-clue="${l.id}" tabindex="0" role="button">
                <div class="font-medium text-[var(--text-primary)] flex items-center justify-between">
                  <span>${l.label}</span>
                  <span class="text-[9px] font-mono uppercase text-[var(--text-secondary)]">${i[l.id]?"Inspected":"Inspect"}</span>
                </div>
                ${i[l.id]?`<p class="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--grid-border)] pt-2 animate-fadeIn">${l.detail}</p>`:""}
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Attribution Selection -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Conclude Archival Attribution:</div>
          <div class="space-y-2.5">
            ${s.attributions.map(l=>`
              <div class="q2-attr p-3.5 bg-white border ${r===l.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-attr="${l.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${r===l.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${r===l.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${l.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${l.id}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmQ2Btn" ${r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<c.length-1?"Finalize Investigation &rarr;":"Finish Antiquarian Bench &rarr;"}
          </button>
        </div>
      </div>
    `,a.querySelectorAll(".clue-btn").forEach(l=>{const g=x=>{p=x;const _=l.getAttribute("data-clue");i[_]=!0,t("clue_inspected",{trial_index:e,stimulus_id:s.stimulus_id,artifact_id:s.artifact_id,clue_id:_,input_modality:p,task_def_version:"1.0"}),v()};l.addEventListener("click",()=>g("mouse")),l.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),g("keyboard"))})}),a.querySelectorAll(".q2-attr").forEach(l=>{const g=x=>{p=x,r=l.getAttribute("data-attr"),v()};l.addEventListener("click",()=>g("mouse")),l.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),g("keyboard"))})}),(m=document.getElementById("confirmQ2Btn"))==null||m.addEventListener("click",()=>{t("investigation_finalized",{trial_index:e,stimulus_id:s.stimulus_id,artifact_id:s.artifact_id,attribution_choice:r,input_modality:p,task_def_version:"1.0"}),e<c.length-1?(e++,i={},r=null,d(),v()):f({mini_game:"Q2",observations_count:4})})}function d(){const s=c[e];t("artifact_presented",{trial_index:e,stimulus_id:s.stimulus_id,artifact_id:s.artifact_id,uncertainty_level:s.uncertainty_level,expected_value:s.expected_value,task_def_version:"1.0"})}v()}function de(a,n,t,f){let u=!0,e=0,i=!1,r=null,p="mouse";const c=[{stimulus_id:"Q3_E1",title:"Episode 1: The Master Calligrapher’s Folio",ambiguity_type:"unattributed_artisan_folio",ambiguity_text:"An illuminated folio features miniature gold dust borders with charcoal underdrawing. Two Master Calligraphers worked during this era.",context_id:"provenance_context_1",context_title:"Archival Registry Dossier #104 (Rainawari Atelier)",context_text:"Archival records confirm Master Sadiq operated exclusively in the Rainawari workshop between 1870-1885 and pioneered willow-branch charcoal underdrawings with lapis border ruling.",decision_question:"Based on your synthesis, attribute the folio’s master atelier and technique lineage:",choices:[{id:"choice_sadiq_rainawari",label:"Master Sadiq (Rainawari Atelier — willow-branch underdrawing)"},{id:"choice_habib_court",label:"Master Habib (Royal Court Palace — imported pencil underdrawing)"},{id:"choice_generic_bazaar",label:"Unspecified Old Srinagar Commercial Bazaar Production"}]},{stimulus_id:"Q3_E2",title:"Episode 2: The Post-Flood Exhibition Pavilion",ambiguity_type:"mismatched_period_provenance",ambiguity_text:"A decorative ceiling panel displays carving motifs from both the late 19th and early 20th century reconstructions.",context_id:"provenance_context_2",context_title:"Municipal Public Works Ledger #88 (Dal Lake Pavilion)",context_text:"Following the devastating 1902 autumn flood, the pavilion ceiling was rebuilt using seasoned Himalayan cedar, while the pre-flood structure used soft river pine.",decision_question:"Integrate the structural timber provenance into your curatorial report:",choices:[{id:"choice_post_flood_cedar",label:"Post-1902 Flood Restoration (Himalayan seasoned cedar timber)"},{id:"choice_pre_flood_pine",label:"Original Pre-Flood Construction (Soft river pine timber)"},{id:"choice_modern_concrete",label:"Twentieth Century Composite Replica"}]},{stimulus_id:"Q3_E3",title:"Episode 3: The Shrine Couplet's Refrain",ambiguity_type:"regional_dialect_verse_origin",ambiguity_text:"A woven silk pashmina textile bears an embroidered couplet with an archaic Kashmiri metric cadence.",context_id:"provenance_context_3",context_title:"Oral Verse Anthology Vol. IV (Lalla-Ded Shrines)",context_text:'Couplets structured with the archaic 4-beat "Vakh" metric refrain originate specifically from the southern valley shrines (Pampore/Tral) rather than urban royal court poets.',decision_question:"Select the verified cultural and geographic lineage for the exhibition catalog:",choices:[{id:"choice_southern_vakh_shrine",label:"Southern Valley Shrine Lineage (Archaic 4-beat Vakh cadence)"},{id:"choice_urban_court_ghazal",label:"Urban Courtly Scribe Tradition (Formal Persian rhyming meter)"},{id:"choice_folk_bazaar_song",label:"Nomadic Commercial Caravan Song"}]}];function v(){var b,m,l;if(u){a.innerHTML=`
        <div>
          ${n("Part 3: The Weaver's Chronicle","Resolving 3 ambiguous curatorial episodes through optional archival context integration.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',goal:"Synthesize archival knowledge: retrieve optional context dossiers and integrate the insights into downstream decisions.",steps:["Read the historical ambiguity presented in each episode.","Optionally retrieve the archival context dossier to uncover provenance facts.","Integrate the facts into your final cataloging choice."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{u=!1,e=0,i=!1,r=null,d(),v()});return}const s=c[e];a.innerHTML=`
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${n("Part 3: The Weaver's Chronicle","Integrate archival context into catalog decisions.")}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Episode ${e+1} of ${c.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${s.title}:</strong> ${s.ambiguity_text}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${s.stimulus_id}</span>
        </div>

        <!-- Optional Context Retrieval Area -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-xs">
          <div class="flex justify-between items-center mb-2">
            <span class="text-[10px] uppercase font-mono text-[var(--accent-gold)] font-semibold tracking-wider">Archival Context Dossier</span>
            ${i?'<span class="text-[10px] font-mono text-emerald-700 font-semibold uppercase">Dossier Retrieved</span>':`
              <button type="button" id="retrieveContextBtn" class="px-3.5 py-1.5 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] text-[10px] font-mono uppercase tracking-wider text-[var(--text-primary)] hover:bg-amber-50 transition rounded-xs shadow-xs" tabindex="0">
                Retrieve Context Dossier &rarr;
              </button>
            `}
          </div>

          ${i?`
            <div class="p-4 bg-white border border-emerald-600/40 rounded-xs text-xs text-[var(--text-primary)] leading-relaxed animate-fadeIn">
              <div class="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">${s.context_title}</div>
              <div>${s.context_text}</div>
            </div>
          `:`
            <div class="text-xs text-[var(--text-secondary)] italic">
              Archival context is available to clarify historical ambiguities before finalizing attribution.
            </div>
          `}
        </div>

        <!-- Downstream Integration Decision -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-2.5">${s.decision_question}</div>
          <div class="space-y-2.5">
            ${s.choices.map(g=>`
              <div class="q3-choice p-3.5 bg-white border ${r===g.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-choice="${g.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${r===g.id?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${r===g.id?"✓":""}</span>
                  <span class="text-[var(--text-primary)] font-medium">${g.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${g.id}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmQ3Btn" ${r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<c.length-1?"Confirm Synthesis &rarr;":"Finish World 5 &rarr;"}
          </button>
        </div>
      </div>
    `,(m=document.getElementById("retrieveContextBtn"))==null||m.addEventListener("click",()=>{p="mouse",i=!0,t("context_requested",{trial_index:e,stimulus_id:s.stimulus_id,context_id:s.context_id,input_modality:p,task_def_version:"1.0"}),v()}),a.querySelectorAll(".q3-choice").forEach(g=>{const x=_=>{p=_,r=g.getAttribute("data-choice"),v()};g.addEventListener("click",()=>x("mouse")),g.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),x("keyboard"))})}),(l=document.getElementById("confirmQ3Btn"))==null||l.addEventListener("click",()=>{t("decision_submitted",{trial_index:e,stimulus_id:s.stimulus_id,choice:r,input_modality:p,task_def_version:"1.0"}),e<c.length-1?(e++,i=!1,r=null,d(),v()):f({mini_game:"Q3",observations_count:3})})}function d(){const s=c[e];t("episode_presented",{trial_index:e,stimulus_id:s.stimulus_id,ambiguity_type:s.ambiguity_type,task_def_version:"1.0"})}v()}function le(a,n){const{appContainer:t,miniGameIndex:f,logEvent:u,onMiniGameComplete:e}=a;switch(f){case 0:ce(t,n,u,e);break;case 1:ue(t,n,u,e);break;case 2:me(t,n,u,e);break}}function ce(a,n,t,f){let u=!0,e=0,i=[],r=null,p="mouse";const c=[{stage_id:"CR1_S1",title:"Stage 1: The Weaving Shuttle Rig",constraint:"missing_crossbar_shuttle",scenario:"A traditional walnut loom shuttle crossbar has fractured. Construct a functional substitute using available studio materials.",materials:[{id:"M_SPLIT_BAMBOO",name:"Split Bamboo Rib",icon:"&#127883;",role:"Flexible rigid bar"},{id:"M_BRASS_ROD",name:"Slotted Brass Tension Rod",icon:"&#128296;",role:"Rigid direct mount"},{id:"M_CARVED_PINE",name:"Carved Pine Dowel",icon:"&#129685;",role:"Lightweight dowel"},{id:"M_WAXED_CORD",name:"Waxed Linen Binder Cord",icon:"&#129526;",role:"Tensile binding wrap"},{id:"M_CERAMIC_WEIGHT",name:"Glazed Counterbalance Weight",icon:"&#9711;",role:"Pendular stabilizing mass"}],valid_combinations:[["M_SPLIT_BAMBOO","M_WAXED_CORD"],["M_BRASS_ROD"],["M_CARVED_PINE","M_CERAMIC_WEIGHT"]]},{stage_id:"CR1_S2",title:"Stage 2: The Warp Tension Anchor",constraint:"tension_wire_unanchored",scenario:"The lateral warp tension wire lacks an anchor point on the frame edge. Assemble a secure tensioning rig.",materials:[{id:"M_LEATHER_STRAP",name:"Oil-Tanned Leather Cinch Strap",icon:"&#129526;",role:"High-friction cinch"},{id:"M_NOTCHED_PEG",name:"Hardwood Notched Anchor Peg",icon:"&#129685;",role:"Wedge anchor"},{id:"M_COPPER_WIRE",name:"Annealed Copper Binding Wire",icon:"&#9874;",role:"Pliable wrapped fastener"},{id:"M_STONE_COUNTER",name:"Basalt Counterweight Stone",icon:"&#11044;",role:"Static gravity balance"}],valid_combinations:[["M_LEATHER_STRAP","M_NOTCHED_PEG"],["M_COPPER_WIRE"],["M_LEATHER_STRAP","M_STONE_COUNTER"]]}];function v(){var b,m,l;if(u){a.innerHTML=`
        <div>
          ${n("Part 1: The Artisan's Assembly","Constructing mechanical studio fixtures under physical material constraints.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',goal:"Select and test functional materials to overcome missing hardware across 2 stages.",steps:["Examine the structural constraint and available workbench materials.","Toggle parts to assemble your custom solution (multiple valid designs exist).","Optionally test the assembly to observe mechanical balance.","Confirm your completed assembly to advance."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{u=!1,e=0,i=[],r=null,d(),v()});return}const s=c[e];a.innerHTML=`
      <div class="animate-fadeIn">
        ${n(`Part 1: The Artisan's Assembly (${e+1}/2)`,s.title)}

        <!-- Constraint Card -->
        <div class="p-5 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--accent-gold)] font-mono uppercase tracking-wider mb-1 font-semibold">Atelier Hardware Constraint</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed font-serif">${s.scenario}</div>
        </div>

        <!-- Workbench Selection -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs">
          <div class="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-3">Available Workbench Components</div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            ${s.materials.map(g=>{const x=i.includes(g.id);return`
                <div class="part-card p-3.5 bg-white border ${x?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex flex-col justify-between" data-id="${g.id}" tabindex="0" role="button" aria-label="${g.name}">
                  <div>
                    <div class="text-xl mb-1 text-stone-700">${g.icon}</div>
                    <div class="font-medium text-[var(--text-primary)] mb-0.5">${g.name}</div>
                    <div class="text-[10px] text-[var(--text-secondary)]">${g.role}</div>
                  </div>
                  <div class="mt-2 text-right">
                    <span class="text-[10px] font-mono font-semibold ${x?"text-[var(--accent-gold)]":"text-stone-300"}">${x?"&#10003; EQUIPPED":"+ ADD"}</span>
                  </div>
                </div>
              `}).join("")}
          </div>

          <!-- Assembly Status -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-stone-200">
            <div class="text-xs text-[var(--text-secondary)]">
              Current Configuration: <strong class="text-[var(--text-primary)]">${i.length>0?i.map(g=>{var x;return(x=s.materials.find(_=>_.id===g))==null?void 0:x.name}).join(" + "):"None selected"}</strong>
            </div>
            <button type="button" id="testAssemblyBtn" ${i.length>0?"":"disabled"} class="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[var(--text-primary)] text-xs uppercase tracking-wider disabled:opacity-40 transition rounded-xs">
              Test Stability
            </button>
          </div>

          ${r?`
            <div class="mt-3 p-3 bg-white border ${r.valid?"border-emerald-600/40 text-emerald-900":"border-amber-600/40 text-amber-900"} text-xs rounded-xs leading-relaxed animate-fadeIn">
              <span class="font-mono text-[10px] uppercase font-semibold block mb-0.5">${r.valid?"Rig Alignment Confirmed":"Rig Observation Note"}</span>
              ${r.message}
            </div>
          `:""}
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmStageBtn" ${i.length>0?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<c.length-1?"Confirm Assembly & Next Stage &rarr;":"Finish Part 1 &rarr;"}
          </button>
        </div>
      </div>
    `,a.querySelectorAll(".part-card").forEach(g=>{const x=_=>{p=_;const h=g.getAttribute("data-id");i.includes(h)?i=i.filter(y=>y!==h):i.push(h),r=null,t("part_toggled",{stage_id:s.stage_id,trial_index:e,part_id:h,selected_parts:[...i],input_modality:p,task_def_version:"1.0"}),v()};g.addEventListener("click",()=>x("mouse")),g.addEventListener("keydown",_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),x("keyboard"))})}),(m=document.getElementById("testAssemblyBtn"))==null||m.addEventListener("click",()=>{p="mouse";const g=new Set(i),x=s.valid_combinations.some(_=>_.every(h=>g.has(h)));r={valid:x,message:x?"Physical tension test successful: load distribution is balanced and functional.":"Physical test indicates unanchored lateral play or incomplete tension linkage."},t("assembly_tested",{stage_id:s.stage_id,trial_index:e,parts:[...i],input_modality:p,task_def_version:"1.0"}),v()}),(l=document.getElementById("confirmStageBtn"))==null||l.addEventListener("click",()=>{t("stage_completed",{stage_id:s.stage_id,trial_index:e,final_parts:[...i],input_modality:p,task_def_version:"1.0"}),e<c.length-1?(e++,i=[],r=null,d(),v()):f({mini_game:"CR1",observations_count:2})})}function d(){const s=c[e];t("stage_presented",{stage_id:s.stage_id,trial_index:e,constraint:s.constraint,task_def_version:"1.0"})}v()}function ue(a,n,t,f){let u=!0,e=0,i="pre_shift",r=null,p=null,c="mouse";const v=[{episode_id:"CR2_E1",title:"Episode 1: The Central Pillar Chamber",pre_context:"Initial gallery setup: plan visitor flow through the grand hall.",pre_strategies:[{id:"S_CENTRAL_AVENUE",label:"Direct Central Promenade",desc:"Single wide central walkway down the axis."},{id:"S_PERIMETER_LOOP",label:"Outer Wall Perimeter Loop",desc:"Continuous clockwise loop along outer walls."},{id:"S_ALCOVE_ISLANDS",label:"Discrete Island Clusters",desc:"Scattered standalone display pods."}],constraint_change:"central_pillar_blocks_corridor",shift_description:"Architectural constraint: A massive four-sided carved stone pillar unexpectedly blocks direct transit down the central axis.",post_strategies:[{id:"split_flow",label:"Bifurcated Twin Corridor (Diverge flow into dual harmonious paths around pillar)",note:"Aligned Reframing"},{id:"linear_flow",label:"Single Forced Bypass (Compress all visitors down the narrow left aisle)",note:"Linear Compression"},{id:"stop_gap",label:"Central Waiting Cordon (Halt progression for scheduled batch entry)",note:"Static Delay"}]},{episode_id:"CR2_E2",title:"Episode 2: West Cloister Evacuation Clearance",pre_context:"Initial layout: arrange modular exhibits across the wide western cloister corridor.",pre_strategies:[{id:"S_WALL_PANORAMA",label:"Continuous Wall Panorama",desc:"Continuous hanging series along the west wall."},{id:"S_TRANSVERSE_SCREENS",label:"Transverse Privacy Partitions",desc:"Folding screens perpendicular to the corridor."},{id:"S_PAIRED_PLINTHS",label:"Center Floor Display Pedestals",desc:"Double row of waist-high sculpture plinths."}],constraint_change:"emergency_exit_clearance_widened",shift_description:"Municipal safety decree: A 3-meter wide clearway must be preserved along the western wall for rapid egress.",post_strategies:[{id:"perimeter_flow",label:"Perimeter Clearance (Recede all displays to inner column line, maintaining open exitway)",note:"Aligned Reframing"},{id:"central_cluster",label:"Dense Central Plinth Island (Compress all plinths tightly in the center)",note:"Central Density"},{id:"diagonal_crossing",label:"Diagonal Zigzag Pathway (Weave visitors between emergency doors)",note:"Unanchored Path"}]},{episode_id:"CR2_E3",title:"Episode 3: North Transept Arch Clearance",pre_context:"Initial design: display vertical banners and illuminated manuscripts in the north transept.",pre_strategies:[{id:"S_TALL_STELAE",label:"Towering Timber Stelae",desc:"Four-meter vertical calligraphy totems."},{id:"S_HORIZONTAL_VITRINES",label:"Horizontal Table Vitrines",desc:"Low vitrines at waist height."},{id:"S_CEILING_SUSPENSION",label:"Suspended Silk Drapery",desc:"Overhead flowing banners hung from rafters."}],constraint_change:"low_ceiling_arch_support",shift_description:"Structural inspection: Ancient low-hanging timber bracing arches restrict overhead vertical clearance to 2.2 meters.",post_strategies:[{id:"linear_flow",label:"Low-Profile Horizontal Progression (Ground-level vitrine displays preserving archway headroom)",note:"Aligned Reframing"},{id:"canopy_tent",label:"Overhead Fabric Canopy (Drape fabric beneath the timber bracing)",note:"Overhead Clutter"},{id:"staggered_alcoves",label:"Dispersed Floor Alcoves (Place stelae horizontally against walls)",note:"Irregular Clutter"}]}];function d(){var m,l,g,x;if(u){a.innerHTML=`
        <div>
          ${n("Part 2: The Spatial Pivot","Reframing spatial layouts when unexpected architectural constraints arise.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',goal:"Establish an initial spatial strategy, then constructively reframe your approach when structural conditions shift.",steps:["Review the gallery space and select an initial visitor flow concept.","Observe the unexpected architectural constraint change introduced.","Revise your layout strategy to creatively adapt to the new constraint.","Confirm your revised plan across all 3 episodes."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{u=!1,e=0,i="pre_shift",r=null,p=null,s(),d()});return}const b=v[e];i==="pre_shift"?(a.innerHTML=`
        <div class="animate-fadeIn">
          ${n(`Part 2: The Spatial Pivot (${e+1}/3)`,b.title)}

          <div class="p-5 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs">
            <div class="text-[10px] text-[var(--accent-gold)] font-mono uppercase tracking-wider mb-1 font-semibold">Initial Spatial Context</div>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed font-serif">${b.pre_context}</div>
          </div>

          <div class="mb-6 space-y-3">
            <div class="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">Select Initial Curation Concept</div>
            ${b.pre_strategies.map(_=>{const h=r===_.id;return`
                <div class="pre-strat-card p-4 bg-white border ${h?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-id="${_.id}" tabindex="0" role="button" aria-label="${_.label}">
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">${_.label}</div>
                    <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">${_.desc}</div>
                  </div>
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${h?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${h?"&#10003;":""}</span>
                </div>
              `}).join("")}
          </div>

          <div class="flex justify-end">
            <button type="button" id="confirmPreShiftBtn" ${r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
              Establish Strategy & Proceed &rarr;
            </button>
          </div>
        </div>
      `,a.querySelectorAll(".pre-strat-card").forEach(_=>{const h=y=>{c=y,r=_.getAttribute("data-id"),d()};_.addEventListener("click",()=>h("mouse")),_.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),h("keyboard"))})}),(l=document.getElementById("confirmPreShiftBtn"))==null||l.addEventListener("click",()=>{t("initial_strategy_selected",{episode_id:b.episode_id,trial_index:e,strategy_id:r,input_modality:c,task_def_version:"1.0"}),t("constraint_shifted",{episode_id:b.episode_id,trial_index:e,constraint_change:b.constraint_change,task_def_version:"1.0"}),i="post_shift",p=r,d()})):(a.innerHTML=`
        <div class="animate-fadeIn">
          ${n(`Part 2: The Spatial Pivot (${e+1}/3)`,b.title)}

          <!-- Constraint Shift Notification Banner -->
          <div class="p-4 bg-amber-50 border border-amber-300/80 mb-5 rounded-xs animate-fadeIn">
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              <span class="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold">Structural Condition Change Detected</span>
            </div>
            <div class="text-xs text-amber-950 leading-relaxed font-serif">${b.shift_description}</div>
            <div class="mt-2 text-[11px] text-amber-800">
              Prior Strategy: <strong>${((g=b.pre_strategies.find(_=>_.id===r))==null?void 0:g.label)||r}</strong>
            </div>
          </div>

          <div class="mb-6 space-y-3">
            <div class="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">Select Adaptive Constraint Shift</div>
            ${b.post_strategies.map(_=>{const h=p===_.id;return`
                <div class="post-strat-card p-4 bg-white border ${h?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-id="${_.id}" tabindex="0" role="button" aria-label="${_.label}">
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">${_.label}</div>
                    <div class="text-[10px] font-mono text-[var(--text-secondary)] mt-0.5">${_.note}</div>
                  </div>
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${h?"bg-[var(--accent-gold)] text-white":"text-stone-300"}">${h?"&#10003;":""}</span>
                </div>
              `}).join("")}
          </div>

          <div class="flex justify-end">
            <button type="button" id="confirmPostShiftBtn" ${p?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
              ${e<v.length-1?"Confirm Reframing & Next Episode &rarr;":"Finish Part 2 &rarr;"}
            </button>
          </div>
        </div>
      `,a.querySelectorAll(".post-strat-card").forEach(_=>{const h=y=>{c=y,p=_.getAttribute("data-id"),d()};_.addEventListener("click",()=>h("mouse")),_.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),h("keyboard"))})}),(x=document.getElementById("confirmPostShiftBtn"))==null||x.addEventListener("click",()=>{t("strategy_revised",{episode_id:b.episode_id,trial_index:e,initial_strategy_id:r,revised_strategy_id:p,input_modality:c,task_def_version:"1.0"}),e<v.length-1?(e++,i="pre_shift",r=null,p=null,s(),d()):f({mini_game:"CR2",observations_count:3})}))}function s(){const b=v[e];t("episode_presented",{episode_id:b.episode_id,trial_index:e,initial_context:b.pre_context,task_def_version:"1.0"})}d()}function me(a,n,t,f){let u=!0,e=0,i=null,r=null,p=null,c="mouse";const v=[{stimulus_id:"CR3_T1",title:"Trial 1: The Pristine Paper Crease",target_motif:"burnished_crease",objective:"Form a sharp, permanent crease on heavy cotton-rag paper without splitting surface fibers or tearing the sheet.",tools:[{id:"bone_folder",name:"Polished Bone Folder",icon:"&#129685;",affordance:"Smooth rounded contour; distributes friction safely"},{id:"metal_stylus",name:"Steel Scribe Stylus",icon:"&#128296;",affordance:"Hard needle point; concentrates extreme line pressure"},{id:"bamboo_wedge",name:"Beveled Bamboo Scraper",icon:"&#127883;",affordance:"Broad beveled wooden plane; gentle planar pressure"}],methods:[{id:"firm_edge_pass",name:"Firm Edge Pass",desc:"Slide rounded edge along ruler with continuous diagonal pressure."},{id:"flat_face_rub",name:"Flat Face Rub",desc:"Distribute wide surface friction across fold line."},{id:"sharp_point_drag",name:"Sharp Point Drag",desc:"Draw tip directly across surface to score the fiber line."}],feedback_map:{"bone_folder:firm_edge_pass":{success:!0,text:"Clean, crisp burnished crease formed with zero surface abrasion."},"bamboo_wedge:flat_face_rub":{success:!0,text:"Smooth, even flattened fold achieved without marring surface grain."},"metal_stylus:sharp_point_drag":{success:!1,text:"Paper fibers sliced; sharp point cut through the paper fold."},"metal_stylus:firm_edge_pass":{success:!1,text:"Metal edge left dark metallic friction scuffs across the parchment."},"bone_folder:flat_face_rub":{success:!0,text:"Gentle, even crease formed; fibers compressed smoothly."},"bamboo_wedge:firm_edge_pass":{success:!0,text:"Uniform clean fold line established with natural wood contour."},"bone_folder:sharp_point_drag":{success:!1,text:"Uneven dragging motion; point dented paper surface."},"bamboo_wedge:sharp_point_drag":{success:!1,text:"Wood corner snagged on rough paper grain."},"metal_stylus:flat_face_rub":{success:!1,text:"Insufficient surface area; uneven pressure indentation."}}},{stimulus_id:"CR3_T2",title:"Trial 2: Mulberry Parchment Stipple",target_motif:"fine_stipple",objective:"Produce a delicate, even constellation of dispersed pigment micro-droplets on fibrous mulberry paper.",tools:[{id:"horsehair_brush",name:"Stiff Horsehair Brush",icon:"&#128396;",affordance:"Resilient coarse bristles; springs back under tension"},{id:"sponge_block",name:"Natural Porous Sea Sponge",icon:"&#9711;",affordance:"Irregular cellular cavities; holds and dabs damp pigment"},{id:"linen_swab",name:"Wound Linen Swab",icon:"&#129526;",affordance:"Dense rolled fabric tip; absorbs liquid rapidly"}],methods:[{id:"textured_flick",name:"Textured Bristle Flick",desc:"Pull loaded bristles back with thumb to release fine mist."},{id:"mottled_dab",name:"Mottled Perpendicular Dab",desc:"Light stamp of textured surface directly on paper."},{id:"drag_stroke",name:"Continuous Fluid Drag",desc:"Draw applicator steadily across page in sweeping stroke."}],feedback_map:{"horsehair_brush:textured_flick":{success:!0,text:"Fine, even constellation of organic micro-droplets dispersed across parchment."},"sponge_block:mottled_dab":{success:!0,text:"Rich textured tonal stipple with soft, organic cellular grain."},"linen_swab:drag_stroke":{success:!1,text:"Produced a single continuous solid streak; zero stipple effect."},"linen_swab:textured_flick":{success:!1,text:"Fabric has no elastic bristle snap; pigment remained bound in swab."},"sponge_block:drag_stroke":{success:!1,text:"Smeared broad irregular smudge across paper."},"horsehair_brush:drag_stroke":{success:!1,text:"Solid brushstroke line created; no dispersed speckling."},"horsehair_brush:mottled_dab":{success:!0,text:"Bristle tips formed delicate speckled texture upon contact."},"sponge_block:textured_flick":{success:!1,text:"Sponge cannot be flicked; dropped heavy inconsistent blot."},"linen_swab:mottled_dab":{success:!1,text:"Dense blot soaked through fiber without texture."}}},{stimulus_id:"CR3_T3",title:"Trial 3: Specular Gold Leaf Seal",target_motif:"gold_leaf_seal",objective:"Burnish delicate gold leaf onto a seal impression to achieve mirror-like specular reflectivity without flaking.",tools:[{id:"agate_stone",name:"Dog-Tooth Agate Burnisher",icon:"&#11044;",affordance:"Micro-crystalline smooth gemstone; zero surface drag"},{id:"polished_wood",name:"Dense Boxwood Block",icon:"&#129685;",affordance:"Planar ultra-dense fruitwood; uniform planar pressure"},{id:"copper_burnisher",name:"Curved Copper Spoon",icon:"&#129348;",affordance:"Pliable polished metal bowl; warm specular glide"}],methods:[{id:"friction_free_rub",name:"Micro-Circular Polishing Rub",desc:"Small gliding circular motions with light steady contact."},{id:"planar_press",name:"Direct Clamping Press",desc:"Perpendicular downward pressure without lateral motion."},{id:"chisel_scrape",name:"Angled Edge Scrape",desc:"Shearing drag across surface with acute blade angle."}],feedback_map:{"agate_stone:friction_free_rub":{success:!0,text:"Flawless mirror-like specular gold luster achieved with zero abrasion."},"polished_wood:planar_press":{success:!0,text:"Uniformly bonded gold leaf with balanced satin foundation."},"copper_burnisher:friction_free_rub":{success:!0,text:"Deep warm metallic sheen burnished smoothly over seal."},"agate_stone:planar_press":{success:!0,text:"Firm adhesion established; solid reflective gilding."},"polished_wood:friction_free_rub":{success:!0,text:"Subtle warm satin luster across gold leaf."},"copper_burnisher:planar_press":{success:!0,text:"Stable flat bond achieved under spoon bowl."},"agate_stone:chisel_scrape":{success:!1,text:"Hard edge scratched through delicate gold foil."},"polished_wood:chisel_scrape":{success:!1,text:"Wood corner tore gold leaf away from size."},"copper_burnisher:chisel_scrape":{success:!1,text:"Metal rim gouged underlying paper impression."}}}];function d(){var m,l,g,x,_;if(u){a.innerHTML=`
        <div>
          ${n("Part 3: The Improvised Tool","Investigating material affordances and adapting craft technique from mechanical feedback.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>',goal:"Select a tool and action method, observe the craft outcome feedback, and adapt your approach across 3 trials.",steps:["Examine the craft goal and available implements.","Pair a tool with an action method and apply it.","Observe physical feedback on the material.","Refine your choice and confirm your final craft technique."]})}
        </div>
      `,(m=document.getElementById("startActivityBtn"))==null||m.addEventListener("click",()=>{u=!1,e=0,i=null,r=null,p=null,s(),d()});return}const b=v[e];a.innerHTML=`
      <div class="animate-fadeIn">
        ${n(`Part 3: The Improvised Tool (${e+1}/3)`,b.title)}

        <!-- Craft Objective Card -->
        <div class="p-5 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--accent-gold)] font-mono uppercase tracking-wider mb-1 font-semibold">Craft Objective</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed font-serif">${b.objective}</div>
        </div>

        <!-- Tool Selection -->
        <div class="mb-5">
          <div class="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-2.5">1. Select Implement</div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            ${b.tools.map(h=>`
                <div class="cr3-tool-card p-4 bg-white border ${i===h.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs" data-id="${h.id}" tabindex="0" role="button" aria-label="${h.name}">
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-lg">${h.icon}</span>
                    <span class="font-medium text-[var(--text-primary)]">${h.name}</span>
                  </div>
                  <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${h.affordance}</div>
                </div>
              `).join("")}
          </div>
        </div>

        <!-- Method Selection -->
        <div class="mb-5">
          <div class="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-2.5">2. Choose Action Method</div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            ${b.methods.map(h=>`
                <div class="cr3-method-card p-4 bg-white border ${r===h.id?"border-[var(--accent-gold)] bg-amber-50/50 shadow-xs":"border-[var(--grid-border)]"} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs" data-id="${h.id}" tabindex="0" role="button" aria-label="${h.name}">
                  <div class="font-medium text-[var(--text-primary)] mb-1">${h.name}</div>
                  <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${h.desc}</div>
                </div>
              `).join("")}
          </div>
        </div>

        <!-- Apply & Observe Feedback -->
        <div class="p-4 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div class="text-xs text-[var(--text-secondary)]">
            Active Pairing: <strong class="text-[var(--text-primary)]">${i?(l=b.tools.find(h=>h.id===i))==null?void 0:l.name:"None"} + ${r?(g=b.methods.find(h=>h.id===r))==null?void 0:g.name:"None"}</strong>
          </div>
          <button type="button" id="applyTechniqueBtn" ${i&&r?"":"disabled"} class="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[var(--text-primary)] text-xs uppercase tracking-wider disabled:opacity-40 transition rounded-xs">
            Apply Technique
          </button>
        </div>

        ${p?`
          <div class="p-4 bg-white border ${p.success?"border-emerald-600/40 text-emerald-950":"border-amber-600/40 text-amber-950"} mb-5 rounded-xs text-xs leading-relaxed animate-fadeIn">
            <div class="font-mono text-[10px] uppercase font-semibold mb-1 ${p.success?"text-emerald-800":"text-amber-800"}">Material Outcome Observation</div>
            <div>${p.text}</div>
          </div>
        `:""}

        <div class="flex justify-end">
          <button type="button" id="confirmTrialBtn" ${i&&r?"":"disabled"} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${e<v.length-1?"Confirm Technique & Next Trial &rarr;":"Finish World 6 &rarr;"}
          </button>
        </div>
      </div>
    `,a.querySelectorAll(".cr3-tool-card").forEach(h=>{const y=w=>{c=w,i=h.getAttribute("data-id"),t("tool_selected",{stimulus_id:b.stimulus_id,trial_index:e,tool_id:i,input_modality:c,task_def_version:"1.0"}),d()};h.addEventListener("click",()=>y("mouse")),h.addEventListener("keydown",w=>{(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),y("keyboard"))})}),a.querySelectorAll(".cr3-method-card").forEach(h=>{const y=w=>{c=w,r=h.getAttribute("data-id"),d()};h.addEventListener("click",()=>y("mouse")),h.addEventListener("keydown",w=>{(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),y("keyboard"))})}),(x=document.getElementById("applyTechniqueBtn"))==null||x.addEventListener("click",()=>{c="mouse";const h=`${i}:${r}`,y=b.feedback_map[h]||{success:!1,text:"No noticeable craft adaptation observed."};p=y,t("action_applied",{stimulus_id:b.stimulus_id,trial_index:e,tool_id:i,action_method:r,input_modality:c,task_def_version:"1.0"}),t("feedback_observed",{stimulus_id:b.stimulus_id,trial_index:e,tool_id:i,action_method:r,outcome_feedback:y.text,task_def_version:"1.0"}),d()}),(_=document.getElementById("confirmTrialBtn"))==null||_.addEventListener("click",()=>{t("strategy_adapted",{stimulus_id:b.stimulus_id,trial_index:e,final_tool_id:i,final_method:r,input_modality:c,task_def_version:"1.0"}),e<v.length-1?(e++,i=null,r=null,p=null,s(),d()):f({mini_game:"CR3",observations_count:3})})}function s(){const b=v[e];t("trial_presented",{stimulus_id:b.stimulus_id,trial_index:e,target_motif:b.target_motif,task_def_version:"1.0"})}d()}function pe(a,n){const{appContainer:t,miniGameIndex:f,logEvent:u,onMiniGameComplete:e}=a;switch(f){case 0:be(t,n,u,e);break;case 1:ve(t,n,u,e);break;case 2:fe(t,n,u,e);break}}function be(a,n,t,f){let u=!0,e=0,i="mouse";const r=[{stimulus_id:"M1_U1",recipient:"Master Ghulam — Classical Calligraphy Diwan",note:"Formal invitation folio 1"},{stimulus_id:"M1_U2",recipient:"Valley Youth Literary Guild",note:"Formal invitation folio 2"},{stimulus_id:"M1_U3",recipient:"Regional Heritage Conservation Archive",note:"Formal invitation folio 3"}];function p(){var d,s;if(u){a.innerHTML=`
        <div>
          ${n("Part 1: The Ceremonial Seal","Sealing formal event invitation folios for the exhibition gathering.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',goal:"Apply the terracotta wax seal to each of the 3 required invitation folios.",steps:["Mandatory requirement: Exactly 3 invitations.","Review the named recipient on the handcrafted envelope.","Press the wax seal stamp on each envelope.","Completing all 3 fulfills the activity requirement."]})}
        </div>
      `,(d=document.getElementById("startActivityBtn"))==null||d.addEventListener("click",()=>{u=!1,e=0,c(),p()});return}const v=r[e];a.innerHTML=`
      <div class="animate-fadeIn">
        ${n("Part 1: The Ceremonial Seal","Mandatory requirement: 3 folios. Completing all 3 satisfies this activity.")}

        <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <span>Folio ${e+1} of ${r.length} (Required Minimum)</span>
          </div>
          <span class="text-[10px] font-mono uppercase tracking-wider text-stone-500">Requirement: 3 Mandatory Units</span>
        </div>

        <!-- Envelope Preview -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="w-full max-w-sm mx-auto h-40 bg-amber-50/70 border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative shadow-sm rounded-xs">
            <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-mono">Ceremonial Invitation</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1.5">${v.recipient}</div>
            <div class="text-[10px] text-stone-500 mt-0.5">${v.note}</div>
            
            <div id="sealDisplay" class="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-[10px] text-[var(--accent-gold)] font-bold shadow-xs">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <button type="button" id="stampBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2 rounded-xs">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Press Wax Seal &rarr;
          </button>
        </div>
      </div>
    `,(s=document.getElementById("stampBtn"))==null||s.addEventListener("click",()=>{i="mouse",t("unit_action_performed",{stimulus_id:v.stimulus_id,unit_index:e,action_type:"press_wax_seal",input_modality:i,task_def_version:"1.0"}),t("unit_completed",{stimulus_id:v.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<r.length-1?(e++,c(),p()):f({mini_game:"M1",observations_count:r.length})})}function c(){const v=r[e];t("unit_presented",{stimulus_id:v.stimulus_id,unit_index:e,is_mandatory:!0,task_def_version:"1.0"})}p()}function ve(a,n,t,f){let u=!0,e="mandatory",i=0,r=0,p="mouse";const c=[{stimulus_id:"M2_M1",label:"Primary Guest Folio — Artisan Guild",is_mandatory:!0},{stimulus_id:"M2_M2",label:"Primary Guest Folio — Regional Patrons",is_mandatory:!0},{stimulus_id:"M2_M3",label:"Primary Guest Folio — Visiting Calligraphers",is_mandatory:!0}],v=[{stimulus_id:"M2_O1",label:"Courtesy Sleeve 1 — Visiting Apprentices",is_mandatory:!1},{stimulus_id:"M2_O2",label:"Courtesy Sleeve 2 — Community Archive Observers",is_mandatory:!1},{stimulus_id:"M2_O3",label:"Courtesy Sleeve 3 — Auxiliary Studio Assistants",is_mandatory:!1}];function d(){var b,m,l,g,x,_;if(u){a.innerHTML=`
        <div>
          ${n("Part 2: The Courtesy Sleeves","Preparing required and optional courtesy sleeves for visiting artisans.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',goal:"Prepare the 3 required sleeves, then decide whether to finish or prepare extra sleeves.",steps:["Complete the 3 required courtesy sleeves.","After completing the required sleeves, you will be given an explicit choice.","You may conclude the activity immediately, or prepare up to 3 optional sleeves.","Stopping at the minimum is completely neutral."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{u=!1,e="mandatory",i=0,r=0,s(c[0]),d()});return}if(e==="mandatory"){const h=c[i];a.innerHTML=`
        <div class="animate-fadeIn">
          ${n("Part 2: The Courtesy Sleeves",`Mandatory phase: ${c.length} required sleeves. Required for activity completion.`)}

          <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
              <span>Required Sleeve ${i+1} of ${c.length}</span>
            </div>
            <span class="text-[10px] font-mono uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-200 rounded-xs">Required Minimum</span>
          </div>

          <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
            <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase tracking-wider text-stone-500 font-mono">Ceremonial Courtesy Sleeve</span>
              <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${h.label}</div>
            </div>
          </div>

          <div class="flex justify-center">
            <button type="button" id="foldSleeveBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
              Assemble Required Sleeve &rarr;
            </button>
          </div>
        </div>
      `,(m=document.getElementById("foldSleeveBtn"))==null||m.addEventListener("click",()=>{p="mouse",t("unit_action_performed",{stimulus_id:h.stimulus_id,unit_index:i,action_type:"assemble_sleeve",input_modality:p,task_def_version:"1.0"}),t("unit_completed",{stimulus_id:h.stimulus_id,unit_index:i,is_mandatory:!0,task_def_version:"1.0"}),i<c.length-1?(i++,s(c[i]),d()):(e="choice",t("choice_presented",{trial_index:c.length,mandatory_completed_count:c.length,task_def_version:"1.0"}),d())})}else if(e==="choice")a.innerHTML=`
        <div class="animate-fadeIn">
          ${n("Part 2: The Courtesy Sleeves",`Required minimum completed (${c.length} of ${c.length}). You may conclude or prepare additional sleeves.`)}

          <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs text-center">
            <div class="w-10 h-10 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 text-lg mb-2">
              &#10003;
            </div>
            <div class="text-sm font-serif font-semibold text-[var(--text-primary)] mb-1">Required Minimum Satisfied</div>
            <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mb-6">
              You have completed the required minimum of ${c.length} courtesy sleeves. You may conclude this activity now and advance, or optionally prepare up to ${v.length-r} additional sleeves.
              <br><span class="italic text-stone-500 font-serif">Stopping at the minimum is completely neutral.</span>
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button type="button" id="concludeBtn" class="px-6 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs w-full sm:w-auto">
                Conclude Activity Now &rarr;
              </button>
              ${r<v.length?`
                <button type="button" id="continueOptionalBtn" class="px-6 py-3 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-widest hover:bg-amber-50 transition shadow-xs rounded-xs w-full sm:w-auto">
                  + Prepare Extra Sleeve (${r+1}/${v.length})
                </button>
              `:""}
            </div>
          </div>
        </div>
      `,(l=document.getElementById("concludeBtn"))==null||l.addEventListener("click",()=>{p="mouse",t("continuation_choice_selected",{choice:"conclude",optional_index:r,input_modality:p,task_def_version:"1.0"}),f({mini_game:"M2",observations_count:c.length+r})}),(g=document.getElementById("continueOptionalBtn"))==null||g.addEventListener("click",()=>{p="mouse",t("continuation_choice_selected",{choice:"continue",optional_index:r,input_modality:p,task_def_version:"1.0"}),e="optional",s(v[r]),d()});else if(e==="optional"){const h=v[r];a.innerHTML=`
        <div class="animate-fadeIn">
          ${n("Part 2: The Courtesy Sleeves","Voluntary extra sleeve preparation. You may finish at any time.")}

          <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
              <span>Voluntary Courtesy Sleeve ${r+1} of ${v.length}</span>
            </div>
            <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-xs">Voluntary</span>
          </div>

          <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
            <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase tracking-wider text-stone-500 font-mono">Voluntary Courtesy Sleeve</span>
              <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${h.label}</div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <button type="button" id="stopOptionalEarlyBtn" class="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs uppercase tracking-wider transition rounded-xs">
              Conclude Now
            </button>
            <button type="button" id="foldOptionalSleeveBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
              Assemble Voluntary Sleeve &rarr;
            </button>
          </div>
        </div>
      `,(x=document.getElementById("stopOptionalEarlyBtn"))==null||x.addEventListener("click",()=>{p="mouse",t("continuation_choice_selected",{choice:"conclude",optional_index:r,input_modality:p,task_def_version:"1.0"}),f({mini_game:"M2",observations_count:c.length+r})}),(_=document.getElementById("foldOptionalSleeveBtn"))==null||_.addEventListener("click",()=>{p="mouse",t("unit_action_performed",{stimulus_id:h.stimulus_id,unit_index:c.length+r,action_type:"assemble_sleeve",input_modality:p,task_def_version:"1.0"}),t("unit_completed",{stimulus_id:h.stimulus_id,unit_index:c.length+r,is_mandatory:!1,task_def_version:"1.0"}),r++,r<v.length?(e="choice",t("choice_presented",{trial_index:c.length+r,mandatory_completed_count:c.length,task_def_version:"1.0"}),d()):f({mini_game:"M2",observations_count:c.length+r})})}}function s(b){t("unit_presented",{stimulus_id:b.stimulus_id,unit_index:b.is_mandatory?i:c.length+r,is_mandatory:b.is_mandatory,task_def_version:"1.0"})}d()}function fe(a,n,t,f){let u=!0,e=0,i="mouse";const r=[{stimulus_id:"M3_U1",is_mandatory:!0,row_name:"Gallery Row 1: Lighting & Illumination Alignment",feedback_type:"salient"},{stimulus_id:"M3_U2",is_mandatory:!0,row_name:"Gallery Row 2: Poetry Anthologies Welcome Stand",feedback_type:"moderate"},{stimulus_id:"M3_U3",is_mandatory:!0,row_name:"Gallery Row 3: Courtyard Entry Floral Registry",feedback_type:"minimal"},{stimulus_id:"M3_U4",is_mandatory:!1,row_name:"Gallery Row 4: Auxiliary Bench Linen Inspection",feedback_type:"none"},{stimulus_id:"M3_U5",is_mandatory:!1,row_name:"Gallery Row 5: Outer Colonnade Lantern Wick Inspection",feedback_type:"none"},{stimulus_id:"M3_U6",is_mandatory:!1,row_name:"Gallery Row 6: Perimeter Garden Urn Water Check",feedback_type:"none"}],p=3;function c(){var b,m,l;if(u){a.innerHTML=`
        <div>
          ${n("Part 3: The Evening Registry","Verifying event readiness records under routine repetitive conditions.")}
          ${C({icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',goal:"Verify ledger rows for gallery preparation. A minimum of 3 rows is required.",steps:["Mandatory minimum: Exactly 3 ledger rows.","Once you complete 3 rows, you have satisfied the requirement.","You may conclude the activity at any time after row 3, or continue. Stopping is neutral.","Feedback saliency decreases during continuation; this is an intentional part of the activity, not an error or submission state."]})}
        </div>
      `,(b=document.getElementById("startActivityBtn"))==null||b.addEventListener("click",()=>{u=!1,e=0,v(),c()});return}const d=r[e],s=e>=p;a.innerHTML=`
      <div class="animate-fadeIn">
        ${n("Part 3: The Evening Registry",s?"Requirement met (3/3). You may conclude the activity now or continue.":"Mandatory requirement: 3 rows. Completing 3 satisfies the activity.")}

        <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full ${s?"bg-emerald-600":"bg-[var(--accent-gold)]"} inline-block"></span>
            <span>Ledger Row ${e+1} of ${r.length} ${s?"(Optional Continuation)":"(Required Minimum)"}</span>
          </div>
          <span class="text-[10px] font-mono uppercase tracking-wider ${s?"text-emerald-800 bg-emerald-50 border-emerald-200":"text-amber-800 bg-amber-50 border-amber-200"} px-2 py-0.5 border rounded-xs">
            ${s?"Optional Beyond Minimum":"Required Minimum (3)"}
          </span>
        </div>

        ${s?`
          <div class="p-3 bg-stone-50 border border-stone-200 rounded-xs text-xs text-stone-700 mb-4 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-medium text-[var(--text-primary)]">Mandatory minimum completed (3 of 3 rows).</span>
              <span class="text-[10px] font-mono text-stone-500 uppercase font-semibold">Stopping is neutral</span>
            </div>
            <p class="text-[11px] text-stone-600 leading-relaxed">
              You may conclude the activity now, or voluntarily verify additional rows. Feedback saliency decreases during continuation; this gradual reduction is an intentional part of the activity design and does not indicate an error or submission state.
            </p>
          </div>
        `:""}

        <!-- Registry Row Item -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="max-w-md mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
            <span class="text-[10px] uppercase tracking-wider text-stone-400 font-mono">Registry Verification Item</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${d.row_name}</div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div>
            ${s?`
              <button type="button" id="concludeM3Btn" class="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs uppercase tracking-wider transition rounded-xs">
                Conclude Activity &rarr;
              </button>
            `:"<span></span>"}
          </div>
          <button type="button" id="verifyRowBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
            Verify Row &rarr;
          </button>
        </div>
      </div>
    `,(m=document.getElementById("concludeM3Btn"))==null||m.addEventListener("click",()=>{i="mouse",t("conclude_selected",{stimulus_id:d.stimulus_id,unit_index:e,total_units_completed:e,input_modality:i,task_def_version:"1.0"}),f({mini_game:"M3",observations_count:e})}),(l=document.getElementById("verifyRowBtn"))==null||l.addEventListener("click",()=>{i="mouse",t("unit_action_performed",{stimulus_id:d.stimulus_id,unit_index:e,action_type:"verify_registry_entry",input_modality:i,task_def_version:"1.0"}),t("unit_completed",{stimulus_id:d.stimulus_id,unit_index:e,task_def_version:"1.0"}),e<r.length-1?(e++,v(),c()):f({mini_game:"M3",observations_count:r.length})})}function v(){const d=r[e];t("trial_presented",{stimulus_id:d.stimulus_id,unit_index:e,is_mandatory:d.is_mandatory,task_def_version:"1.0"})}c()}const ge={W1:{name:"The Frequency",name_ur:"تعدد",subtitle:"Acoustics & Dialogue"},W2:{name:"The Archive",name_ur:"دستاویز",subtitle:"Manuscripts & Preservation"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ نقش",subtitle:"Artisan Workshop"},W4:{name:"The Shifting Grid",name_ur:"متغیر گرڈ",subtitle:"Mosaic & Rhythm"},W5:{name:"The Hidden Gallery",name_ur:"نہاں خانہ",subtitle:"Exhibition Discovery"},W6:{name:"The Broken Tool",name_ur:"شکستہ آلہ",subtitle:"Material Assembly"},W7:{name:"The Repetition",name_ur:"تکرار",subtitle:"Readiness & Ceremony"}};function C({icon:a,goal:n,steps:t,onStart:f}){return`
    <div class="tutorial-card p-6 border border-[var(--accent-gold)] bg-gradient-to-br from-[#faf8f5] to-[#f5efe8] space-y-4 mb-6 transition-all duration-300">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-amber-100/80 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)]">
          ${a||'<i data-lucide="compass" class="w-5 h-5"></i>'}
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-medium">Activity Guide · طریقہ کار</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] font-semibold">${n}</h3>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        ${t.map((u,e)=>`
          <div class="bg-white/80 border border-[var(--grid-border)] p-3 flex items-start gap-2.5">
            <span class="w-5 h-5 rounded-full bg-[var(--accent-gold)] text-white text-[10px] flex items-center justify-center font-serif shrink-0 mt-0.5">${e+1}</span>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">${u}</div>
          </div>
        `).join("")}
      </div>

      <div class="pt-2 flex justify-end">
        <button id="startActivityBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition flex items-center gap-2">
          Begin Activity &rarr;
        </button>
      </div>
    </div>
  `}function xe(a){const{appContainer:n,worldCode:t,worldIndex:f,miniGameIndex:u,onMiniGameComplete:e}=a,i=ge[t]||{name:"Alfaaz Workshop",name_ur:""},r=(p,c)=>`
    <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${f+1} of 7: ${i.name}</span>
          <span class="font-serif text-lg text-[var(--text-secondary)]" style="direction: rtl;">${i.name_ur}</span>
        </div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">${p}</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">${c}</p>
      </div>
      <div class="text-right">
        <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Part ${u+1} of 3</span>
      </div>
    </div>
  `;switch(t){case"W1":U(a,r);break;case"W2":W(a,r);break;case"W3":K(a,r);break;case"W4":te(a,r);break;case"W5":ne(a,r);break;case"W6":le(a,r);break;case"W7":pe(a,r);break;default:e&&e({});break}}let o={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1,activeMiniGameInProgress:!1,telemetryTerminal:!1};const j="alfaaz_recruit_state",D="alfaaz_recruit_unsent";function S(){try{const a={sessionId:o.sessionId,configHash:o.configHash,worldSequence:o.worldSequence,seeds:o.seeds,screen:o.screen,sjtScenarios:o.sjtScenarios,currentSjtIndex:o.currentSjtIndex,sjtResponses:o.sjtResponses,currentWorldIndex:o.currentWorldIndex,currentMiniGameIndex:o.currentMiniGameIndex,accessibilityModes:o.accessibilityModes,segmentId:o.segmentId,seq:o.seq,isPaused:o.isPaused,activeMiniGameInProgress:o.activeMiniGameInProgress||!1};sessionStorage.setItem(j,JSON.stringify(a)),sessionStorage.setItem(D,JSON.stringify(o.telemetryQueue))}catch(a){console.warn("[Persistence] Error saving sessionStorage:",a)}}function he(){try{const a=sessionStorage.getItem(j),n=sessionStorage.getItem(D);if(n){const t=JSON.parse(n);Array.isArray(t)&&(o.telemetryQueue=t)}if(a){const t=JSON.parse(a);if(t.sessionId){if(o.sessionId=t.sessionId,o.configHash=t.configHash||null,o.worldSequence=t.worldSequence||[],o.seeds=t.seeds||{},o.screen=t.screen||"consent",o.sjtScenarios=t.sjtScenarios||[],o.currentSjtIndex=t.currentSjtIndex||0,o.sjtResponses=t.sjtResponses||{},o.currentWorldIndex=t.currentWorldIndex||0,o.currentMiniGameIndex=t.currentMiniGameIndex||0,o.accessibilityModes=t.accessibilityModes||[],o.seq=t.seq||1,o.isPaused=t.isPaused||!1,o.segmentId=(t.segmentId||1)+1,k(o.screen,"segment_start",{segment_id:o.segmentId}),t.activeMiniGameInProgress&&t.screen==="games"){const f=o.worldSequence[o.currentWorldIndex],u=R(f,o.currentMiniGameIndex);k("game","interrupted",{mini_game:u,reason:"page_reload"}),o.currentMiniGameIndex<2?o.currentMiniGameIndex++:(o.currentMiniGameIndex=0,o.currentWorldIndex++),o.activeMiniGameInProgress=!1}return S(),!0}}}catch(a){console.warn("[Persistence] Error restoring sessionStorage:",a)}return!1}async function T(a,n={}){if(window.globalApiFetch)return await window.globalApiFetch(a,n);const t=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",f={"Content-Type":"application/json",...n.headers||{}};return fetch(`${t}${a}`,{...n,headers:f})}function k(a,n,t={},f={},u="mouse",e=null,i=null){const r=performance.now();let p=t,c=f;try{const d=JSON.stringify(t),s=JSON.stringify(f),b=new TextEncoder().encode(d).length+new TextEncoder().encode(s).length;b>4096&&(p={event_oversize:!0,original_size_bytes:b},c={oversized:!0})}catch{}const v={seq:o.seq++,segment_id:o.segmentId,t_ms:r,screen:a,game_world:o.worldSequence[o.currentWorldIndex]||null,mini_game:e,trial:i,action:n,input_type:u,task_def_version:t&&t.task_def_version||"1.0",state:c,data:p};o.telemetryQueue.push(v),S(),(o.telemetryQueue.length>=50||n==="minigame_end"||n==="sjt_complete")&&I()}let A=!1;async function I(){if(A||!o.sessionId||o.telemetryQueue.length===0||o.telemetryTerminal)return;A=!0;const a=[...o.telemetryQueue],n=a.slice(0,100),t=a.slice(100);o.telemetryQueue=t,S();try{const f=await T("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:o.sessionId,events:n})});if(f&&f.status===422){const u=await f.json().catch(()=>({}));if(u.detail&&(u.detail.detail==="events_cap_reached"||u.detail.status==="DATA_LIMITED")){console.warn("[Telemetry] Terminal event cap reached (50,000). Halting future telemetry flushes."),o.telemetryTerminal=!0,o.telemetryQueue=[...n,...t],S(),A=!1;return}}if(f&&f.status===413){if(console.warn("[Telemetry] Batch rejected with HTTP 413 (oversize)."),n.length>1){const u=Math.ceil(n.length/2);o.telemetryQueue=[...n.slice(0,u),...n.slice(u),...t]}else console.error("[Telemetry] Single event exceeds body limit. Discarding oversized payload.");S(),A=!1;return}if(!f||!f.ok)throw new Error(f?`HTTP ${f.status}`:"No response");S()}catch(f){console.warn("[Telemetry] Flush failed, re-queuing:",f),o.telemetryQueue=[...n,...o.telemetryQueue],S()}finally{A=!1}}setInterval(()=>{o.sessionId&&o.telemetryQueue.length>0&&!o.telemetryTerminal&&I()},2500);window.addEventListener("beforeunload",()=>{if(o.sessionId&&o.telemetryQueue.length>0){const a=window.ALFAAZ_API_URL||"",n=JSON.stringify({session_id:o.sessionId,events:o.telemetryQueue.slice(0,100)});navigator.sendBeacon(`${a}/recruit/telemetry`,n)}});window.addEventListener("pagehide",()=>{if(o.sessionId&&o.telemetryQueue.length>0){const a=window.ALFAAZ_API_URL||"",n=JSON.stringify({session_id:o.sessionId,events:o.telemetryQueue.slice(0,100)});navigator.sendBeacon(`${a}/recruit/telemetry`,n)}});document.addEventListener("visibilitychange",()=>{document.hidden?(k(o.screen,"visibility_hidden",{timestamp:Date.now()}),k(o.screen,"tab_hidden",{timestamp:Date.now()}),I()):(k(o.screen,"visibility_visible",{timestamp:Date.now()}),k(o.screen,"tab_visible",{timestamp:Date.now()}))});window.addEventListener("blur",()=>{k(o.screen,"blur",{timestamp:Date.now()})});window.addEventListener("focus",()=>{k(o.screen,"focus",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{he(),$(),_e()});function _e(){const a=document.getElementById("pauseBtn");a==null||a.addEventListener("click",O);const n=document.getElementById("exitBtn");n==null||n.addEventListener("click",()=>{confirm("Are you sure you wish to exit the volunteer assessment? You can return at any time.")&&(k(o.screen,"candidate_exited"),I(),window.location.href="index.html")})}function O(){o.isPaused?(o.isPaused=!1,k(o.screen,"resume"),o.screen=o.pausedPreviousScreen||"sjt",$()):(o.isPaused=!0,o.pausedPreviousScreen=o.screen,k(o.screen,"pause"),o.screen="paused",$())}function $(){const a=document.getElementById("recruitApp"),n=document.getElementById("sessionHeaderControls"),t=document.getElementById("topProgressBar"),f=document.getElementById("progressBarFill");switch(o.screen!=="consent"&&o.screen!=="complete"&&o.screen!=="paused"?(n==null||n.classList.remove("hidden"),t==null||t.classList.remove("hidden")):(n==null||n.classList.add("hidden"),t==null||t.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),o.screen){case"consent":ye(a);break;case"identity":we(a);break;case"accessibility":ke(a);break;case"warmup":Ce(a);break;case"sjt":M(a,f);break;case"games":q(a,f);break;case"paused":$e(a);break;case"complete":Te(a);break}}function ye(a){var e;a.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-4 text-center">
        <span class="act-badge">Onboarding & Research</span>
        <h1 class="text-3xl font-serif text-[var(--text-primary)]">Volunteer Exploratory Assessment</h1>
      </div>

      <div class="space-y-4 text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        ${L.candidate_notice.lines.map(i=>`<p>${i}</p>`).join("")}
      </div>

      <form id="consentForm" class="space-y-4 pt-2">
        <div class="flex items-center gap-2 pt-2">
          <input type="checkbox" id="ageConfirm" required class="w-4 h-4 accent-[#bd6f5d]">
          <label for="ageConfirm" class="text-xs text-[var(--text-primary)]">${L.age_confirmation.label}</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="consentAgree" required class="w-4 h-4 accent-[#bd6f5d]">
          <label for="consentAgree" class="text-xs text-[var(--text-primary)]">${L.research_participation.label}</label>
        </div>

        <div class="pt-4 flex justify-end">
          <button type="submit" aria-disabled="true" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition opacity-40">
            Continue &rarr;
          </button>
        </div>
      </form>
    </div>
  `;const n=document.getElementById("ageConfirm"),t=document.getElementById("consentAgree"),f=document.querySelector('#consentForm button[type="submit"]'),u=()=>{const i=!!(n!=null&&n.checked&&(t!=null&&t.checked));f==null||f.setAttribute("aria-disabled",String(!i)),f==null||f.classList.toggle("opacity-40",!i)};n==null||n.addEventListener("change",u),t==null||t.addEventListener("change",u),u(),(e=document.getElementById("consentForm"))==null||e.addEventListener("submit",async i=>{i.preventDefault();const r=i.target.querySelector('button[type="submit"]');if((r==null?void 0:r.getAttribute("aria-disabled"))==="true")return;const p=r?r.innerHTML:"Continue &rarr;";r&&(r.setAttribute("aria-disabled","true"),r.innerHTML="Connecting...");try{const c=n.checked,v=t.checked,d=await T("/recruit/consent",{method:"POST",body:JSON.stringify({choices:{research_telemetry:v},confirmed_18_plus:c,device_class:window.innerWidth<768?"mobile":"desktop",input_modality:"ontouchstart"in window?"touch":"mouse"})});if(!d||!d.ok){const b=d?await d.json().catch(()=>({})):{};throw new Error(b.detail||(d?`Server returned ${d.status}`:"No response from server"))}const s=await d.json();if(s.session_id)o.sessionId=s.session_id,o.configHash=s.config_hash,o.worldSequence=s.world_sequence,o.seeds=s.seeds,o.screen="identity",k("consent","consent_accepted"),S(),$();else throw new Error("Missing session ID")}catch(c){alert(`Unable to initialize session: ${c.message||"Please check connection."}`),console.error(c),r&&(u(),r.innerHTML=p)}})}function we(a){var n;a.innerHTML=`
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
  `,(n=document.getElementById("identityForm"))==null||n.addEventListener("submit",async t=>{t.preventDefault();const f=t.target.querySelector('button[type="submit"]'),u=f?f.innerHTML:"Begin Session &rarr;";f&&(f.disabled=!0,f.innerHTML="Connecting...");try{const e=await T("/recruit/identity",{method:"POST",body:JSON.stringify({session_id:o.sessionId,full_name:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim()})});if(!e||!e.ok){const i=e?await e.json().catch(()=>({})):{};throw new Error(i.detail||(e?`Server returned ${e.status}`:"No response from server"))}o.screen="accessibility",k("identity","identity_submitted"),S(),$()}catch(e){alert(`Unable to continue: ${e.message||"Please check connection."}`),f&&(f.disabled=!1,f.innerHTML=u)}})}function ke(a){var n;a.innerHTML=`
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
  `,(n=document.getElementById("saveA11yBtn"))==null||n.addEventListener("click",async()=>{var f,u,e,i;const t=[];(f=document.getElementById("a11y_keyboard"))!=null&&f.checked&&t.push("keyboard_navigation"),(u=document.getElementById("a11y_contrast"))!=null&&u.checked&&t.push("high_contrast"),(e=document.getElementById("a11y_motion"))!=null&&e.checked&&t.push("reduced_motion"),(i=document.getElementById("a11y_time"))!=null&&i.checked&&t.push("extended_time"),o.accessibilityModes=t;try{await T("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:o.sessionId,modes_enabled:t})})}catch(r){console.warn("Accessibility preferences save error:",r)}o.screen="warmup",k("accessibility","preferences_saved",{modes:t}),S(),$()})}function Ce(a){let n=[],t=performance.now();a.innerHTML=`
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
  `;const f=document.getElementById("tapTarget"),u=document.getElementById("warmupStatus");f==null||f.addEventListener("click",async()=>{n.push(performance.now());const e=n.length;if(f.textContent=`Tap (${e}/3)`,u.textContent=`Registered tap ${e} of 3`,e>=3){const i=[n[1]-n[0],n[2]-n[1]],r=(i[0]+i[1])/2,p=performance.now()-t;try{await T("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:o.sessionId,tap_latency_baseline_ms:r,reading_dwell_baseline_ms:p,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(c){console.warn("Warmup save error:",c)}k("warmup","warmup_completed",{avgLatency:r,readingDwell:p});try{const v=await(await T("/recruit/sjt/public")).json();o.sjtScenarios=v.scenarios||[],o.currentSjtIndex=0,o.screen="sjt",S(),$()}catch(c){console.error("Failed to load SJT payload:",c)}}})}function M(a,n){var c;const t=o.sjtScenarios[o.currentSjtIndex];if(!t){Se();return}const f=o.sjtScenarios.length,u=o.currentSjtIndex+1;n&&(n.style.width=`${(u-1)/(f+7)*100}%`);const e=document.getElementById("segmentProgress");e&&(e.textContent=`SJT ${u}/${f}`);const i=o.sjtResponses[t.id]||null,r=t.options.map(v=>`
    <div class="option-card ${i===v.id?"selected":""}" data-opt-id="${v.id}" tabindex="0" role="button">
      <span class="font-serif text-sm font-semibold text-[var(--accent-gold)]">${v.id.slice(-1)}.</span>
      <span class="text-sm text-[var(--text-primary)] leading-relaxed">${v.text}</span>
    </div>
  `).join("");a.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-3 flex justify-between items-end">
        <div>
          <span class="act-badge">Act ${t.act}: ${t.act_title_en}</span>
          <span class="act-title-ur font-serif">${t.act_title_ur||""}</span>
          <h2 class="text-2xl font-serif text-[var(--text-primary)]">Scenario ${t.id}</h2>
        </div>
        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
          Scenario ${u} of ${f}
        </div>
      </div>

      <div class="text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        ${t.setup}
      </div>

      <div class="space-y-3">
        <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Choose the course of action you would most naturally take:</div>
        ${r}
      </div>

      <div class="pt-4 flex justify-between items-center border-t border-[var(--grid-border)]">
        <span class="text-xs text-[var(--text-secondary)]">Keyboard: Press 1–4 to choose</span>
        <button id="nextSjtBtn" ${i?"":"disabled"} class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] transition">
          ${u===f?"Complete SJT &rarr;":"Next Scenario &rarr;"}
        </button>
      </div>
    </div>
  `,k("sjt","scenario_displayed",{scenario_id:t.id,index:u}),a.querySelectorAll(".option-card").forEach(v=>{v.addEventListener("click",()=>{const d=v.getAttribute("data-opt-id");o.sjtResponses[t.id]=d,k("sjt","option_selected",{scenario_id:t.id,option_id:d}),M(a,n)})}),(c=document.getElementById("nextSjtBtn"))==null||c.addEventListener("click",()=>{o.sjtResponses[t.id]&&(o.currentSjtIndex++,M(a,n))});const p=v=>{if(["1","2","3","4"].includes(v.key)){const d=parseInt(v.key)-1;t.options[d]&&(o.sjtResponses[t.id]=t.options[d].id,k("sjt","option_selected_key",{scenario_id:t.id,option_id:t.options[d].id}),M(a,n))}};window.onkeydown=p}async function Se(){window.onkeydown=null;try{await T("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:o.sessionId,responses:o.sjtResponses})}),o.screen="games",o.currentWorldIndex=0,o.currentMiniGameIndex=0,k("sjt","sjt_complete",{response_count:Object.keys(o.sjtResponses).length}),S(),$()}catch(a){console.error("SJT submit error:",a)}}function q(a,n){const t=o.worldSequence[o.currentWorldIndex];if(!t||o.currentWorldIndex>=o.worldSequence.length){Ee();return}o.activeMiniGameInProgress=!0,S();const f=document.getElementById("segmentProgress");f&&(f.textContent=`World ${o.currentWorldIndex+1}/7`),n&&(n.style.width=`${(o.currentSjtIndex+o.currentWorldIndex+1)/(o.sjtScenarios.length+7)*100}%`),xe({appContainer:a,worldCode:t,worldIndex:o.currentWorldIndex,miniGameIndex:o.currentMiniGameIndex,logEvent:(u,e,i,r)=>{const p=R(t,o.currentMiniGameIndex);k("game",u,e,i,r,p)},onMiniGameComplete:u=>{o.activeMiniGameInProgress=!1;const e=R(t,o.currentMiniGameIndex);k("game","minigame_end",u,{},"mouse",e),I(),o.currentMiniGameIndex<2?o.currentMiniGameIndex++:(o.currentMiniGameIndex=0,o.currentWorldIndex++),S(),q(a,n)}})}function R(a,n){const t={W1:["F1","F2","F3"],W2:["A1","A2","A3"],W3:["C1","C2","C3"],W4:["E1","E2","E3"],W5:["Q1","Q2","Q3"],W6:["CR1","CR2","CR3"],W7:["M1","M2","M3"]};return t[a]&&t[a][n]||"MG"}async function Ee(){o.activeMiniGameInProgress=!1,S();const a=document.getElementById("recruitApp");a&&(a.innerHTML=`
      <div class="space-y-6 text-center py-16 animate-fadeIn">
        <div class="w-10 h-10 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">Finalizing Assessment...</h2>
        <p class="text-xs text-[var(--text-secondary)]">Safely recording research telemetry and saving your session profile.</p>
      </div>
    `),await I();try{await T("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:o.sessionId})})}catch(n){console.warn("Session complete submission error:",n)}o.screen="complete",S(),$()}function $e(a){var n;a.innerHTML=`
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
  `,(n=document.getElementById("resumeBtn"))==null||n.addEventListener("click",O)}function Te(a){a.innerHTML=`
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
