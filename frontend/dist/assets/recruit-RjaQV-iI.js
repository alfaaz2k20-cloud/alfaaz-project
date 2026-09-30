import"./global-DxYxv3W5.js";/* empty css               */function S(a,n){const{appContainer:t,miniGameIndex:i,logEvent:e,onMiniGameComplete:r}=a;switch(i){case 0:A(t,n,e,r);break;case 1:I(t,n,e,r);break;case 2:B(t,n,e,r);break}}function A(a,n,t,i){const e=[{id:"DOC-101",title:"Calligraphic Ghazal Folio (1842)",tags:["Manuscript","Ink on Parchment","19th Century"],targetCategory:"Manuscripts"},{id:"DOC-102",title:"Copper Engraved Astrolabe Plate",tags:["Object","Metalwork","Classical"],targetCategory:"Artifacts"},{id:"DOC-103",title:"Lal Ded Vakhs Translation Ledger",tags:["Text","Poetry Commentary","Kashmiri"],targetCategory:"Manuscripts"},{id:"DOC-104",title:"Silver Zari Textile Fragment",tags:["Weaving","Silk & Metal","Decorative"],targetCategory:"Artifacts"},{id:"DOC-105",title:"1920 Exhibition Registration Roster",tags:["Administrative","Official Record","Modern"],targetCategory:"Records"},{id:"DOC-106",title:"Curatorial Letter on Paper Conservation",tags:["Correspondence","Preservation","Archive"],targetCategory:"Records"}];let r=0,c=0,o=0,d=performance.now(),u=null;function p(){if(r>=e.length){const v=c/e.length;i({mini_game:"A1",observations_count:e.length,accuracy:v,rule_guide_time_ms:o});return}const l=e[r];d=performance.now(),a.innerHTML=`
      <div>
        ${n("A1: Document Classification","Sort cultural items into designated archival vaults according to preservation criteria.")}

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Document ${r+1} of ${e.length}</span>
          <button id="ruleGuideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1 hover:bg-amber-50 transition">
            <i data-lucide="book-open" class="w-3.5 h-3.5 inline mr-1"></i> View Archival Rubric
          </button>
        </div>

        <div id="ruleGuideModal" class="hidden p-4 mb-4 bg-amber-50/60 border border-[var(--accent-gold)]/30 text-xs text-[var(--text-primary)] space-y-1.5">
          <div class="font-semibold uppercase tracking-wider text-[var(--accent-gold)]">Archival Sorting Rubric:</div>
          <div>• <strong>Manuscripts:</strong> Handwritten poetry folios, literary commentary, vakhs, calligraphy.</div>
          <div>• <strong>Artifacts:</strong> Metalwork, decorative textiles, physical implements, copper plates.</div>
          <div>• <strong>Records:</strong> Official administrative rosters, letters, preservation logs, institutional documentation.</div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">${l.id}</span>
          <h3 class="text-xl font-serif text-[var(--text-primary)] mt-1 mb-3">${l.title}</h3>
          <div class="flex justify-center gap-2">
            ${l.tags.map(v=>`<span class="px-2.5 py-0.5 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)]">${v}</span>`).join("")}
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center font-medium" data-cat="Manuscripts">
            1. Manuscripts
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center font-medium" data-cat="Artifacts">
            2. Artifacts
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center font-medium" data-cat="Records">
            3. Records
          </button>
        </div>
      </div>
    `,t("document_presented",{doc_id:l.id,index:r});const m=document.getElementById("ruleGuideBtn"),b=document.getElementById("ruleGuideModal");m==null||m.addEventListener("click",()=>{(b==null?void 0:b.classList.contains("hidden"))?(b==null||b.classList.remove("hidden"),u=performance.now(),t("rule_guide_viewed",{doc_id:l.id})):(b==null||b.classList.add("hidden"),u&&(o+=performance.now()-u,u=null))}),a.querySelectorAll(".cat-btn").forEach(v=>{v.addEventListener("click",()=>{const y=v.getAttribute("data-cat"),_=y===l.targetCategory;_&&c++,t("document_filed",{doc_id:l.id,selected_category:y,target_category:l.targetCategory,is_correct:_,dwell_ms:performance.now()-d}),r++,p()})})}p()}function I(a,n,t,i){const e=[{id:"EXP-201",title:"Bilingual Poetry Fragment with Mixed Binding",tags:["Damaged Paper","Dual Period Inscription"],isException:!0,description:"Contains 17th century Persian script overlaid on 19th century binding. Exceeds standard single-vault criteria."},{id:"EXP-202",title:"Standard Exhibition Catalog (1998)",tags:["Printed Book","Single Subject"],isException:!1,description:"Standard publication catalog in pristine condition with complete metadata."},{id:"EXP-203",title:"Severely Oxidized Metal Seal with Illegible Seal Script",tags:["Physical Seal","Fragile","Verification Required"],isException:!0,description:"Requires metallurgical assessment before standard drawer assignment."},{id:"EXP-204",title:"Curatorial Diary Notebook (2015)",tags:["Manuscript","Modern Archive"],isException:!1,description:"Complete and verified curatorial notes from the Alfaaz inaugural salon."}];let r=0,c=0;function o(){var u,p;if(r>=e.length){const l=c/e.length;i({mini_game:"A2",observations_count:e.length,precision:l});return}const d=e[r];a.innerHTML=`
      <div>
        ${n("A2: Exception Protocol","Identify and quarantine records with protocol anomalies or conflicting criteria.")}

        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          Item ${r+1} of ${e.length}
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">${d.id}</span>
              <h3 class="text-xl font-serif text-[var(--text-primary)] mt-0.5">${d.title}</h3>
            </div>
          </div>
          <div class="flex gap-2 my-3">
            ${d.tags.map(l=>`<span class="px-2 py-0.5 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)]">${l}</span>`).join("")}
          </div>
          <p class="text-xs text-[var(--text-primary)] leading-relaxed mt-2 border-t border-[var(--grid-border)] pt-2">
            <strong>Condition Notes:</strong> ${d.description}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button id="standardFileBtn" class="p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center font-medium">
            File into Standard Catalog
          </button>
          <button id="flagExceptionBtn" class="p-4 bg-white border border-amber-300 text-xs uppercase tracking-wider text-[#bd6f5d] hover:bg-amber-50 transition text-center font-medium">
            <i data-lucide="flag" class="w-3.5 h-3.5 inline mr-1"></i> Quarantine as Protocol Exception
          </button>
        </div>
      </div>
    `,t("exception_presented",{item_id:d.id}),(u=document.getElementById("standardFileBtn"))==null||u.addEventListener("click",()=>{const l=!d.isException;l&&c++,t("decision_logged",{item_id:d.id,action:"standard_file",is_correct:l}),r++,o()}),(p=document.getElementById("flagExceptionBtn"))==null||p.addEventListener("click",()=>{const l=d.isException;l&&c++,t("decision_logged",{item_id:d.id,action:"flag_exception",is_correct:l}),r++,o()})}o()}function B(a,n,t,i){const e=[{id:"REC-01",title:"Lalla Vakhs (14th C)",category:"Manuscripts",hasError:!1},{id:"REC-02",title:"Copper Tray Engraving",category:"Manuscripts",hasError:!0,correctCat:"Artifacts"},{id:"REC-03",title:"Kashmir Shawl Pattern",category:"Artifacts",hasError:!1},{id:"REC-04",title:"Curatorial Roster 2024",category:"Records",hasError:!1},{id:"REC-05",title:"Habba Khatoon Folio",category:"Records",hasError:!0,correctCat:"Manuscripts"},{id:"REC-06",title:"Clay Terracotta Vessel",category:"Artifacts",hasError:!1}];let r={};function c(){var d;const o=e.map(u=>{const p=r[u.id]!==void 0,l=p?r[u.id]:u.category;return`
        <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5]">
          <td class="p-3 font-mono text-xs text-[var(--text-secondary)]">${u.id}</td>
          <td class="p-3 font-serif text-sm text-[var(--text-primary)]">${u.title}</td>
          <td class="p-3 text-xs">
            <span class="px-2 py-0.5 bg-white border border-[var(--grid-border)] ${p?"border-emerald-400 text-emerald-800":"text-[var(--text-secondary)]"}">
              ${l} ${p?"&#10003;":""}
            </span>
          </td>
          <td class="p-3 text-right">
            <select class="cat-select text-xs p-1 bg-white border border-[var(--grid-border)] focus:outline-none" data-id="${u.id}">
              <option value="">Edit Tag...</option>
              <option value="Manuscripts">Manuscripts</option>
              <option value="Artifacts">Artifacts</option>
              <option value="Records">Records</option>
            </select>
          </td>
        </tr>
      `}).join("");a.innerHTML=`
      <div>
        ${n("A3: Quality Control & Audit","Verify catalog records against standard criteria and correct any discrepancies before final archival seal.")}

        <div class="border border-[var(--grid-border)] bg-white overflow-hidden mb-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#faf8f5] border-b border-[var(--grid-border)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                <th class="p-3">ID</th>
                <th class="p-3">Title</th>
                <th class="p-3">Current Vault</th>
                <th class="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              ${o}
            </tbody>
          </table>
        </div>

        <div class="flex justify-between items-center pt-2">
          <span class="text-xs text-[var(--text-secondary)]">Take your time to review. You may approve as is or submit corrections.</span>
          <button id="finalizeLedgerBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Finalize & Seal Archive &rarr;
          </button>
        </div>
      </div>
    `,t("ledger_opened",{total_rows:e.length}),a.querySelectorAll(".cat-select").forEach(u=>{u.addEventListener("change",p=>{const l=u.getAttribute("data-id"),m=u.value;m&&(r[l]=m,t("correction_applied",{row_id:l,new_category:m}),c())})}),(d=document.getElementById("finalizeLedgerBtn"))==null||d.addEventListener("click",()=>{let u=0,p=0;e.forEach(b=>{b.hasError?r[b.id]===b.correctCat&&u++:r[b.id]!==void 0&&r[b.id]!==b.category&&p++});const l=u/2,m=p/4;t("ledger_finalized",{true_errors_detected:u,false_alarms:p,sensitivity:l,false_alarm_rate:m}),i({mini_game:"A3",observations_count:1,sensitivity:l,false_alarm_rate:m})})}c()}function T(a,n){const{appContainer:t,miniGameIndex:i,logEvent:e,onMiniGameComplete:r}=a;switch(i){case 0:L(t,n,e,r);break;case 1:M(t,n,e,r);break;case 2:R(t,n,e,r);break}}function L(a,n,t,i){var p;let e=50,r=performance.now()+1500,c=null;a.innerHTML=`
    <div>
      ${n("F1: Resonance Tuning","Tune the audio frequency slider to achieve collective resonance with your simulated partner.")}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <div id="partnerStatus" class="text-xs text-[var(--text-secondary)] mb-4">Partner Status: Listening...</div>
        <div class="w-full max-w-md mx-auto">
          <input type="range" id="freqSlider" min="0" max="100" value="50" class="w-full accent-[#bd6f5d]">
          <div class="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1">
            <span>Low Harmonic (0)</span>
            <span id="sliderValDisplay">50</span>
            <span>High Harmonic (100)</span>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button id="lockFreqBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Lock Frequency &rarr;
        </button>
      </div>
    </div>
  `;const o=document.getElementById("freqSlider"),d=document.getElementById("sliderValDisplay"),u=document.getElementById("partnerStatus");setTimeout(()=>{u&&(u.innerHTML='<span class="text-[#bd6f5d] font-medium">Partner Cue: "Sound feels slightly harsh on the higher register."</span>',r=performance.now(),t("partner_cue_onset",{target_optimal:35}))},1200),o==null||o.addEventListener("input",l=>{e=parseInt(l.target.value),d&&(d.textContent=e),!c&&performance.now()>r&&(c=performance.now()),t("slider_input",{value:e})}),(p=document.getElementById("lockFreqBtn"))==null||p.addEventListener("click",()=>{const l=c?c-r:2500;t("tuning_locked",{final_value:e,latency_ms:l}),i({mini_game:"F1",observations_count:1,latency_ms:l,accuracy:Math.abs(e-35)/50})})}function M(a,n,t,i){a.innerHTML=`
    <div>
      ${n("F2: Ambiguity Resolution","Respond to subtle or ambiguous partner communication during tuning.")}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <p class="text-xs text-[var(--text-secondary)] mb-2">Simulated Partner Dialogue:</p>
        <p class="text-sm font-serif text-[var(--text-primary)] italic">"Something feels slightly off in the overall balance, but I cannot quite pinpoint the channel."</p>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <button class="choice-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-choice="clarify">
          Ask for Clarification
        </button>
        <button class="choice-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-choice="adjust">
          Make Immediate Guess Adjustment
        </button>
        <button class="choice-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-choice="maintain">
          Maintain Current Calibration
        </button>
      </div>
    </div>
  `,a.querySelectorAll(".choice-btn").forEach(e=>{e.addEventListener("click",()=>{const r=e.getAttribute("data-choice");t("ambiguity_choice_made",{choice:r}),i({mini_game:"F2",observations_count:1,clarification_ratio:r==="clarify"?1:0})})})}function R(a,n,t,i){var e;a.innerHTML=`
    <div>
      ${n("F3: Dynamic Updating","Recalibrate output when partner environment constraints shift mid-stream.")}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <div class="p-3 bg-amber-50 border border-amber-200 text-xs text-[#bd6f5d] font-medium mb-3">
          Notice: Partner has moved to an open hall with higher acoustic reverberation.
        </div>
        <p class="text-xs text-[var(--text-secondary)]">Recalibrate frequency to absorb low-end echo.</p>
      </div>

      <div class="flex justify-center">
        <button id="recalibrateBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Apply Acoustic Adjustment &rarr;
        </button>
      </div>
    </div>
  `,(e=document.getElementById("recalibrateBtn"))==null||e.addEventListener("click",()=>{t("acoustic_recalibration_applied"),i({mini_game:"F3",observations_count:1,adaptation_latency_ms:1200})})}function $(a,n){const{appContainer:t,miniGameIndex:i,logEvent:e,onMiniGameComplete:r}=a;switch(i){case 0:j(t,n,e,r);break;case 1:P(t,n,e,r);break;case 2:G(t,n,e,r);break}}function j(a,n,t,i){var c,o,d;let e=0;a.innerHTML=`
    <div>
      ${n("C1: Mosaic Allocation","Collaborate on a joint mosaic mural. Your partner holds 2 tiles; you hold 8 surplus tiles.")}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <p class="text-xs text-[var(--text-secondary)] mb-1">Partner Resource Reserve: <strong class="text-[#bd6f5d]">Low (2 Tiles)</strong></p>
        <p class="text-xs text-[var(--text-secondary)] mb-4">Your Resource Reserve: <strong class="text-emerald-800">Surplus (8 Tiles)</strong></p>

        <div class="flex justify-center items-center gap-4">
          <button id="minusTileBtn" class="w-8 h-8 rounded border border-[var(--grid-border)] bg-white">-</button>
          <span id="transferCount" class="font-serif text-lg font-semibold text-[var(--accent-gold)]">0</span>
          <button id="plusTileBtn" class="w-8 h-8 rounded border border-[var(--grid-border)] bg-white">+</button>
        </div>
        <p class="text-[10px] text-[var(--text-secondary)] mt-2">Tiles to transfer into shared pool</p>
      </div>

      <div class="flex justify-end">
        <button id="confirmTransferBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Confirm Allocation &rarr;
        </button>
      </div>
    </div>
  `;const r=document.getElementById("transferCount");(c=document.getElementById("minusTileBtn"))==null||c.addEventListener("click",()=>{e>0&&(e--,r&&(r.textContent=e))}),(o=document.getElementById("plusTileBtn"))==null||o.addEventListener("click",()=>{e<6&&(e++,r&&(r.textContent=e))}),(d=document.getElementById("confirmTransferBtn"))==null||d.addEventListener("click",()=>{t("resource_transfer_confirmed",{shared_amount:e}),i({mini_game:"C1",observations_count:1,sharing_index:e/6})})}function P(a,n,t,i){var e;a.innerHTML=`
    <div>
      ${n("C2: Synchronous Stroke Pacing","Blend border gradients in harmony with your simulated partner.")}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <p class="text-xs text-[var(--text-secondary)] mb-2">Partner Stroke Rhythm: Steady 1.5s Intervals</p>
        <div class="w-full h-12 bg-white border border-[var(--grid-border)] flex items-center justify-center">
          <span class="text-xs text-[var(--accent-gold)] tracking-widest">STROKE HARMONY ACTIVE</span>
        </div>
      </div>

      <div class="flex justify-center">
        <button id="coordinateStrokeBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Apply Harmonized Brush Stroke &rarr;
        </button>
      </div>
    </div>
  `,(e=document.getElementById("coordinateStrokeBtn"))==null||e.addEventListener("click",()=>{t("coordinated_stroke_applied"),i({mini_game:"C2",observations_count:1,collision_avoidance_rate:.95})})}function G(a,n,t,i){a.innerHTML=`
    <div>
      ${n("C3: Alignment Repair","Resolve an unintended motif discrepancy in the collective artwork.")}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <p class="text-xs text-[var(--text-secondary)] mb-3">Notice: Partner inadvertently placed terracotta tiles across a sage border.</p>
        <div class="grid grid-cols-3 gap-3">
          <button class="repair-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-strategy="harmonize">
            1. Harmonize Border (Integrate Motif)
          </button>
          <button class="repair-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-strategy="realign">
            2. Re-tile Jointly
          </button>
          <button class="repair-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-strategy="isolate">
            3. Isolate Section
          </button>
        </div>
      </div>
    </div>
  `,a.querySelectorAll(".repair-btn").forEach(e=>{e.addEventListener("click",()=>{const r=e.getAttribute("data-strategy");t("repair_strategy_selected",{strategy:r}),i({mini_game:"C3",observations_count:1,constructive_repair_score:r==="harmonize"?1:r==="realign"?.75:.4})})})}function q(a,n){const{appContainer:t,miniGameIndex:i,logEvent:e,onMiniGameComplete:r}=a;switch(i){case 0:O(t,n,e,r);break;case 1:D(t,n,e,r);break;case 2:N(t,n,e,r);break}}function O(a,n,t,i){const e=[{color:"gold",shape:"circle",symbol:"alpha",label:"Golden Sun"},{color:"green",shape:"square",symbol:"beta",label:"Sage Cube"},{color:"gold",shape:"square",symbol:"alpha",label:"Golden Cube"},{color:"green",shape:"circle",symbol:"beta",label:"Sage Sun"},{color:"gold",shape:"circle",symbol:"beta",label:"Golden Crest"},{color:"green",shape:"square",symbol:"alpha",label:"Sage Glyph"},{color:"gold",shape:"square",symbol:"alpha",label:"Golden Cube"},{color:"green",shape:"circle",symbol:"beta",label:"Sage Sun"},{color:"gold",shape:"circle",symbol:"alpha",label:"Golden Sun"},{color:"green",shape:"square",symbol:"beta",label:"Sage Cube"},{color:"gold",shape:"circle",symbol:"beta",label:"Golden Crest"},{color:"green",shape:"square",symbol:"alpha",label:"Sage Glyph"}];let r=0,c=0,o="color";function d(){if(r>=e.length){i({mini_game:"E1",observations_count:e.length,perseverative_errors:c});return}r===6&&(o="shape",t("rule_shift_triggered",{new_rule:"shape",trial:r}));const u=e[r];a.innerHTML=`
      <div>
        ${n("E1: Symbolic Sorting","Sort symbols into matching quadrants based on active sorting criteria.")}

        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          Trial ${r+1} of ${e.length}
        </div>

        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="text-sm font-serif text-[var(--text-primary)] font-medium mb-1">${u.label}</div>
          <div class="text-xs text-[var(--text-secondary)]">Attributes: [Color: ${u.color}, Shape: ${u.shape}]</div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button class="quad-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)]" data-rule-color="gold" data-rule-shape="circle">
            Quadrant 1: Gold / Circle
          </button>
          <button class="quad-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)]" data-rule-color="green" data-rule-shape="square">
            Quadrant 2: Green / Square
          </button>
          <button class="quad-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)]" data-rule-color="gold" data-rule-shape="square">
            Quadrant 3: Gold / Square
          </button>
          <button class="quad-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)]" data-rule-color="green" data-rule-shape="circle">
            Quadrant 4: Green / Circle
          </button>
        </div>
      </div>
    `,t("symbol_presented",{trial:r,symbol:u}),a.querySelectorAll(".quad-btn").forEach(p=>{p.addEventListener("click",()=>{const l=p.getAttribute("data-rule-color"),m=p.getAttribute("data-rule-shape");let b=!1;o==="color"?b=l===u.color:(b=m===u.shape,!b&&l===u.color&&c++),t("quadrant_selected",{trial:r,is_correct:b,active_rule:o,perseverative:!b&&l===u.color}),r++,d()})})}d()}function D(a,n,t,i){let e=0,r=[],c=performance.now(),o=!1;function d(){var u,p;if(e>=4){const l=(r[0]+r[1])/2,m=r[3]||l,b=l>0?m/l:1;i({mini_game:"E2",observations_count:4,cadence_stability_ratio:b});return}if(c=performance.now(),e===2&&!o){o=!0,t("system_recalibration_reset",{step:2}),a.innerHTML=`
        <div>
          ${n("E2: Sequence Cadence","Maintain behavioral rhythm through system state transitions.")}

          <div class="p-6 bg-amber-50/60 border border-[var(--accent-gold)]/30 text-center mb-6">
            <p class="text-xs text-[var(--accent-gold)] font-medium mb-1">System Notice: Minor Buffer Recalibration</p>
            <p class="text-xs text-[var(--text-secondary)]">The layout has updated. Continue your sequence normally.</p>
          </div>

          <div class="flex justify-center">
            <button id="resumeSequenceBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
              Resume Assembly &rarr;
            </button>
          </div>
        </div>
      `,(u=document.getElementById("resumeSequenceBtn"))==null||u.addEventListener("click",()=>{r.push(performance.now()-c),e++,d()});return}a.innerHTML=`
      <div>
        ${n("E2: Sequence Cadence","Connect sequence nodes at a steady cadence.")}

        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          Node ${e+1} of 4
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="font-serif text-lg text-[var(--text-primary)]">Assemble Sequence Node ${e+1}</div>
        </div>

        <div class="flex justify-center">
          <button id="advanceNodeBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Connect Node &rarr;
          </button>
        </div>
      </div>
    `,(p=document.getElementById("advanceNodeBtn"))==null||p.addEventListener("click",()=>{r.push(performance.now()-c),e++,d()})}d()}function N(a,n,t,i){let e=0;const r=3;function c(){var d;if(e>=r){i({mini_game:"E3",observations_count:r,strategy_shift_efficiency:.92});return}const o=["Open Matrix","Constrained Grid","Dense Labyrinth"];a.innerHTML=`
      <div>
        ${n("E3: Strategy Shift","Navigate shifting grid densities.")}

        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          Phase ${e+1} of ${r}: ${o[e]}
        </div>

        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <p class="text-xs text-[var(--text-secondary)] mb-2">Grid Constraint: ${o[e]}</p>
          <div class="font-serif text-sm text-[var(--text-primary)]">Optimize route traversal under modified parameters.</div>
        </div>

        <div class="flex justify-center">
          <button id="completePhaseBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Execute Traversal &rarr;
          </button>
        </div>
      </div>
    `,t("density_phase_presented",{phase:e,density:o[e]}),(d=document.getElementById("completePhaseBtn"))==null||d.addEventListener("click",()=>{t("density_phase_completed",{phase:e}),e++,c()})}c()}function W(a,n){const{appContainer:t,miniGameIndex:i,logEvent:e,onMiniGameComplete:r}=a;switch(i){case 0:F(t,n,e,r);break;case 1:H(t,n,e,r);break;case 2:Q(t,n,e,r);break}}function F(a,n,t,i){let e=0;const r=3;function c(){var d,u,p,l;a.innerHTML=`
      <div>
        ${n("Q1: Gallery Navigation","Navigate the exhibition floorplan to the pavilion exit. Side alcoves contain unrequired archival manuscripts.")}

        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="p-4 bg-white border border-[var(--grid-border)] text-center">
            <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">Alcove A</span>
            <p class="font-serif text-xs text-[var(--text-primary)] mt-1 mb-3">18th C. Astrolabe Schematics</p>
            <button id="alcoveABtn" class="px-3 py-1 text-xs border border-[var(--grid-border)] hover:border-[var(--accent-gold)]">
              Inspect Alcove
            </button>
          </div>
          <div class="p-4 bg-white border border-[var(--grid-border)] text-center">
            <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">Alcove B</span>
            <p class="font-serif text-xs text-[var(--text-primary)] mt-1 mb-3">Persian Calligraphy Pigments</p>
            <button id="alcoveBBtn" class="px-3 py-1 text-xs border border-[var(--grid-border)] hover:border-[var(--accent-gold)]">
              Inspect Alcove
            </button>
          </div>
          <div class="p-4 bg-white border border-[var(--grid-border)] text-center">
            <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">Alcove C</span>
            <p class="font-serif text-xs text-[var(--text-primary)] mt-1 mb-3">Lal Ded Verse Annotations</p>
            <button id="alcoveCBtn" class="px-3 py-1 text-xs border border-[var(--grid-border)] hover:border-[var(--accent-gold)]">
              Inspect Alcove
            </button>
          </div>
        </div>

        <div id="alcoveContent" class="hidden p-4 bg-amber-50/50 border border-[var(--accent-gold)]/30 text-xs text-[var(--text-primary)] mb-6"></div>

        <div class="flex justify-between items-center pt-2">
          <span class="text-xs text-[var(--text-secondary)]">${e} of ${r} optional alcoves visited</span>
          <button id="exitGalleryBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Reach Pavilion Exit &rarr;
          </button>
        </div>
      </div>
    `,t("gallery_floorplan_viewed",{alcoves_visited:e});const o=(m,b)=>{e++;const v=document.getElementById("alcoveContent");v&&(v.classList.remove("hidden"),v.innerHTML=`<strong>${m}:</strong> ${b}`),t("alcove_explored",{alcove:m})};(d=document.getElementById("alcoveABtn"))==null||d.addEventListener("click",()=>o("Alcove A (Astrolabe)","Notes how brass astrolabes utilized latitude projection plates calibrated for Kashmir valleys.")),(u=document.getElementById("alcoveBBtn"))==null||u.addEventListener("click",()=>o("Alcove B (Pigments)","Details how lapis lazuli was ground into gum arabic for illuminated Quranic borders.")),(p=document.getElementById("alcoveCBtn"))==null||p.addEventListener("click",()=>o("Alcove C (Lal Ded)","Examines oral poetic meter structures passed through feminine Kashmiri idioms.")),(l=document.getElementById("exitGalleryBtn"))==null||l.addEventListener("click",()=>{t("gallery_exited",{total_explored:e}),i({mini_game:"Q1",observations_count:1,exploration_rate:e/r})})}c()}function H(a,n,t,i){let e=0;const r=3;function c(){var o,d;a.innerHTML=`
      <div>
        ${n("Q2: The Inscription Anomaly","An exhibit artifact displays an unexplained cipher inscription.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">Artifact Inscription #402</span>
          <h3 class="text-xl font-serif text-[var(--text-primary)] mt-1 mb-2">Uncatalogued Marginal Cipher</h3>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
            A handwritten marginal symbol appears beside the 16th century seal. Standard documentation does not mention this mark.
          </p>
          <div id="depthDetails" class="mt-4 text-xs text-[var(--text-primary)] space-y-2">
            ${e>=1?'<div class="p-2 bg-white border border-[var(--grid-border)]"><strong>Layer 1:</strong> Cipher resembles 16th century trade shorthand.</div>':""}
            ${e>=2?'<div class="p-2 bg-white border border-[var(--grid-border)]"><strong>Layer 2:</strong> UV spectroscopy reveals hidden iron gall ink underneath.</div>':""}
            ${e>=3?'<div class="p-2 bg-white border border-[var(--grid-border)]"><strong>Layer 3:</strong> Cross-referenced with Silk Road merchant marks.</div>':""}
          </div>
        </div>

        <div class="flex justify-between items-center">
          ${e<r?`
          <button id="probeDeeperBtn" class="px-5 py-2 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-wider hover:bg-amber-50 transition">
            Probe Cipher Depth (${e}/${r})
          </button>`:"<span></span>"}
          <button id="concludeQ2Btn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Continue Journey &rarr;
          </button>
        </div>
      </div>
    `,t("mystery_station_presented",{current_depth:e}),(o=document.getElementById("probeDeeperBtn"))==null||o.addEventListener("click",()=>{e++,t("anomaly_layer_unlocked",{depth:e}),c()}),(d=document.getElementById("concludeQ2Btn"))==null||d.addEventListener("click",()=>{i({mini_game:"Q2",observations_count:Math.max(1,e),investigation_depth:e/r})})}c()}function Q(a,n,t,i){var e;a.innerHTML=`
    <div>
      ${n("Q3: Archival Synthesis","Synthesize archival observations into a curatorial summary.")}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6">
        <p class="text-sm font-serif text-[var(--text-primary)] mb-3">
          Which metallurgical characteristic accounts for the preservation of Kashmiri astrolabe latitude projection plates?
        </p>
        <div class="space-y-2">
          <label class="block p-3 bg-white border border-[var(--grid-border)] text-xs cursor-pointer hover:border-[var(--accent-gold)]">
            <input type="radio" name="synthQ" value="A" class="mr-2 accent-[#bd6f5d]"> Brass alloy calibrated specifically for valley latitude projection.
          </label>
          <label class="block p-3 bg-white border border-[var(--grid-border)] text-xs cursor-pointer hover:border-[var(--accent-gold)]">
            <input type="radio" name="synthQ" value="B" class="mr-2 accent-[#bd6f5d]"> Standard iron gall coating.
          </label>
        </div>
      </div>

      <div class="flex justify-end">
        <button id="submitSynthesisBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Submit Synthesis &rarr;
        </button>
      </div>
    </div>
  `,(e=document.getElementById("submitSynthesisBtn"))==null||e.addEventListener("click",()=>{t("synthesis_completed"),i({mini_game:"Q3",observations_count:1,synthesis_score:1})})}function z(a,n){const{appContainer:t,miniGameIndex:i,logEvent:e,onMiniGameComplete:r}=a;switch(i){case 0:U(t,n,e,r);break;case 1:V(t,n,e,r);break;case 2:J(t,n,e,r);break}}function U(a,n,t,i){let e=[];function r(){var c;a.innerHTML=`
      <div>
        ${n("CR1: Open Bridge Assembly","Assemble an asymmetric architectural cantilever to bridge the structural span.")}

        <div class="h-40 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 flex items-center justify-center relative">
          <div class="absolute left-8 bottom-0 w-24 h-16 bg-[#2d312e]"></div>
          <div class="absolute right-8 bottom-0 w-24 h-16 bg-[#2d312e]"></div>
          <div class="text-xs text-[var(--text-secondary)]">
            Span Status: ${e.length>=2?'<span class="text-emerald-700 font-medium">Span Connected</span>':"Unbridged Gap"}
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 mb-6">
          <button class="block-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-block="Arch Truss">
            + Place Arch Truss
          </button>
          <button class="block-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-block="Counterweight Wedge">
            + Place Counterweight
          </button>
          <button class="block-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-block="Tension Cable">
            + Place Tension Cable
          </button>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)]">${e.length} structural elements placed</span>
          <button id="testStructureBtn" ${e.length>=2?"":"disabled"} class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
            Test Load Stability &rarr;
          </button>
        </div>
      </div>
    `,t("construction_state_rendered",{blocks_placed:e.length}),a.querySelectorAll(".block-btn").forEach(o=>{o.addEventListener("click",()=>{const d=o.getAttribute("data-block");e.push(d),t("element_placed",{block:d}),r()})}),(c=document.getElementById("testStructureBtn"))==null||c.addEventListener("click",()=>{t("structure_tested",{total_elements:e.length}),i({mini_game:"CR1",observations_count:1,uniqueness_index:.85})})}r()}function V(a,n,t,i){let e=!1;function r(){var c,o;a.innerHTML=`
      <div>
        ${n("CR2: Material Pivot","Adapt structural strategy when primary fastener supply is depleted.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          ${e?`
            <div class="p-3 bg-amber-50 border border-amber-200 text-xs text-[#bd6f5d] font-medium mb-3">
              Notice: Primary Joint Fasteners Exhausted. Pivot to interlocking friction joints.
            </div>
            <button id="pivotActionBtn" class="px-6 py-2.5 bg-[var(--accent-gold)] text-white text-xs uppercase tracking-widest hover:opacity-90 transition">
              Deploy Interlocking Friction Joints &rarr;
            </button>
          `:`
            <p class="text-xs text-[var(--text-secondary)] mb-4">Fastening main truss beam...</p>
            <button id="fastenBeamBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
              Apply Standard Fastener
            </button>
          `}
        </div>
      </div>
    `,(c=document.getElementById("fastenBeamBtn"))==null||c.addEventListener("click",()=>{e=!0,t("primary_tool_depleted"),r()}),(o=document.getElementById("pivotActionBtn"))==null||o.addEventListener("click",()=>{t("creative_pivot_succeeded"),i({mini_game:"CR2",observations_count:1,pivot_latency_ms:1400})})}r()}function J(a,n,t,i){a.innerHTML=`
    <div>
      ${n("CR3: Affordance Transfer","Re-purpose standard archival tools to stabilize an uncalibrated optical balance.")}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <p class="text-xs text-[var(--text-secondary)] mb-3">Objective: Level the optical projection plane without a standard spirit level.</p>
        <div class="grid grid-cols-3 gap-3">
          <button class="tool-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-tool="Water Droplet Pipette">
            Use Pipette (Surface Tension Level)
          </button>
          <button class="tool-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-tool="Brass Bookmark">
            Use Bookmark (Cantilever Shorter)
          </button>
          <button class="tool-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-tool="Linen Ribbon">
            Use Ribbon (Plumb Line)
          </button>
        </div>
      </div>
    </div>
  `,a.querySelectorAll(".tool-btn").forEach(e=>{e.addEventListener("click",()=>{const r=e.getAttribute("data-tool");t("unconventional_tool_selected",{tool:r}),i({mini_game:"CR3",observations_count:1,affordance_transfer:1})})})}function Y(a,n){const{appContainer:t,miniGameIndex:i,logEvent:e,onMiniGameComplete:r}=a;switch(i){case 0:K(t,n,e,r);break;case 1:X(t,n,e,r);break;case 2:Z(t,n,e,r);break}}function K(a,n,t,i){const e=[{id:"REC-1",raw:"ALFAAZ  COLLECTIVE —   SPRING  SALON",clean:"ALFAAZ COLLECTIVE — SPRING SALON"},{id:"REC-2",raw:"POETRY   READING   SERIES   VOL  II",clean:"POETRY READING SERIES VOL II"},{id:"REC-3",raw:"DOCUMENTARY   SCREENING   AND   TALK",clean:"DOCUMENTARY SCREENING AND TALK"}];let r=0,c=[],o=performance.now();function d(){var p;if(r>=e.length){const l=c.reduce((v,y)=>v+y,0)/c.length,m=c.reduce((v,y)=>v+Math.pow(y-l,2),0)/c.length,b=l>0?Math.sqrt(m)/l:0;i({mini_game:"M1",observations_count:e.length,cadence_consistency:b});return}const u=e[r];o=performance.now(),a.innerHTML=`
      <div>
        ${n("M1: Baseline Formatting","Standardize typography spacing for historical event notices (3 mandatory units).")}

        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          Required Unit ${r+1} of ${e.length}
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="text-xs text-[var(--text-secondary)] uppercase mb-2">Unformatted Header String:</div>
          <div class="font-mono text-sm bg-white p-3 border border-[var(--grid-border)] inline-block tracking-wider">
            ${u.raw}
          </div>
        </div>

        <div class="flex justify-center gap-4">
          <button id="formatBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Apply Normalized Spacing &rarr;
          </button>
        </div>
      </div>
    `,t("mandatory_unit_presented",{unit_id:u.id}),(p=document.getElementById("formatBtn"))==null||p.addEventListener("click",()=>{const l=performance.now()-o;c.push(l),t("mandatory_unit_completed",{unit_id:u.id,duration_ms:l}),r++,d()})}d()}function X(a,n,t,i){let e=0,r=0,c=0;const o=5;function d(){var p,l;a.innerHTML=`
      <div class="text-center py-6 space-y-5">
        ${n("M2: Task Continuation","Mandatory baseline completed. Additional catalog records remain.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] max-w-lg mx-auto text-sm text-[var(--text-primary)]">
          <p class="font-medium mb-1">Standard required quota is complete.</p>
          <p class="text-xs text-[var(--text-secondary)]">You may choose to continue formatting additional archival units (${e}/${o} completed) or conclude this section now. Stopping now is completely valid.</p>
        </div>

        <div class="flex justify-center gap-4 pt-2">
          <button id="finishNowBtn" class="px-6 py-2.5 border border-[var(--grid-border)] text-xs uppercase tracking-widest text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition">
            Conclude & Continue &rarr;
          </button>
          ${e<o?`
          <button id="continueFormatBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Format Another Record
          </button>`:""}
        </div>
      </div>
    `,t("optional_prompt_presented",{optional_completed:e}),(p=document.getElementById("finishNowBtn"))==null||p.addEventListener("click",()=>{t("optional_session_concluded",{optional_completed:e,voluntary_time_ms:r}),i({mini_game:"M2",observations_count:Math.max(1,e),optional_units:e,voluntary_duration_ms:r})}),(l=document.getElementById("continueFormatBtn"))==null||l.addEventListener("click",()=>{u()})}function u(){var p;c=performance.now(),a.innerHTML=`
      <div>
        ${n("M2: Optional Formatting",`Optional record ${e+1} of ${o}.`)}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="text-xs text-[var(--text-secondary)] uppercase mb-2">Archival Notice Line:</div>
          <div class="font-mono text-sm bg-white p-3 border border-[var(--grid-border)] inline-block">
            EXHIBIT CATALOG — ENTRY 0${e+4} / ARCHIVE
          </div>
        </div>

        <div class="flex justify-center">
          <button id="saveOptionalBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Verify & Save Record &rarr;
          </button>
        </div>
      </div>
    `,(p=document.getElementById("saveOptionalBtn"))==null||p.addEventListener("click",()=>{const l=performance.now()-c;r+=l,e++,t("optional_unit_saved",{unit_index:e,dwell_ms:l}),e>=o?i({mini_game:"M2",observations_count:e,optional_units:e,voluntary_duration_ms:r}):d()})}d()}function Z(a,n,t,i){let e=0;const r=3;function c(){var o,d;if(e>=r){i({mini_game:"M3",observations_count:e,reduced_feedback_persistence:e});return}a.innerHTML=`
      <div>
        ${n("M3: Unannounced Batch Sync","Low-stimulation archival synchronization.")}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <p class="text-xs text-[var(--text-secondary)] mb-3">Syncing background repository record...</p>
          <div class="font-mono text-xs text-[var(--text-primary)]">RECORD_ID_00${e+1}</div>
        </div>

        <div class="flex justify-between items-center">
          <button id="concludeM3Btn" class="skip-btn">Proceed to Next World &rarr;</button>
          <button id="syncUnitBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Confirm Indexing
          </button>
        </div>
      </div>
    `,t("reduced_reward_unit_displayed",{index:e}),(o=document.getElementById("concludeM3Btn"))==null||o.addEventListener("click",()=>{t("m3_concluded_early",{completed:e}),i({mini_game:"M3",observations_count:Math.max(1,e),reduced_feedback_persistence:e})}),(d=document.getElementById("syncUnitBtn"))==null||d.addEventListener("click",()=>{e++,t("reduced_reward_synced",{index:e}),c()})}c()}const ee={W1:{name:"The Frequency",name_ur:"تعدد",param:"Empathy"},W2:{name:"The Archive",name_ur:"دستاویز",param:"Conscientiousness"},W3:{name:"The Shared Canvas",name_ur:"مشترکہ نقش",param:"Collaborative Spirit"},W4:{name:"The Shifting Grid",name_ur:"متغیر گرڈ",param:"Emotional Agility"},W5:{name:"The Hidden Gallery",name_ur:"نہاں خانہ",param:"Curiosity"},W6:{name:"The Broken Tool",name_ur:"شکستہ آلہ",param:"Creative Initiative"},W7:{name:"The Repetition",name_ur:"تکرار",param:"Motivation"}};function te(a){const{appContainer:n,worldCode:t,worldIndex:i,miniGameIndex:e,onSkipWorld:r,onSkipAllGames:c}=a,o=ee[t]||{name:"Unknown World",name_ur:""},d=(u,p)=>`
    <div class="border-b border-[var(--grid-border)] pb-3 mb-5 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2">
          <span class="act-badge">World ${i+1} of 7: ${o.name}</span>
          <span class="font-serif text-lg text-[var(--text-secondary)]" style="direction: rtl;">${o.name_ur}</span>
        </div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">${u}</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">${p}</p>
      </div>
      <div class="flex items-center gap-3">
        <button id="skipWorldBtn" class="skip-btn hover:text-[var(--accent-gold)]">Skip World</button>
        <button id="skipAllGamesBtn" class="skip-btn text-[var(--accent-gold)]">Skip All Games</button>
      </div>
    </div>
  `;switch(setTimeout(()=>{var u,p;(u=document.getElementById("skipWorldBtn"))==null||u.addEventListener("click",()=>{confirm("Skip this world? Incomplete micro-tasks will be marked neutrally as insufficient data, not a low score.")&&r()}),(p=document.getElementById("skipAllGamesBtn"))==null||p.addEventListener("click",()=>{confirm("Skip the entire interactive game battery and finalize?")&&c()})},50),t){case"W1":T(a,d);break;case"W2":S(a,d);break;case"W3":$(a,d);break;case"W4":q(a,d);break;case"W5":W(a,d);break;case"W6":z(a,d);break;case"W7":Y(a,d);break;default:r();break}}let s={sessionId:null,configHash:null,worldSequence:[],seeds:{},screen:"consent",pausedPreviousScreen:null,sjtScenarios:[],currentSjtIndex:0,sjtResponses:{},currentWorldIndex:0,currentMiniGameIndex:0,accessibilityModes:[],segmentId:1,seq:1,telemetryQueue:[],isPaused:!1};async function x(a,n={}){if(window.globalApiFetch)return await window.globalApiFetch(a,n);const t=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",i={"Content-Type":"application/json",...n.headers||{}};return fetch(`${t}${a}`,{...n,headers:i})}function g(a,n,t={},i={},e="mouse",r=null,c=null){const o=performance.now(),d={seq:s.seq++,segment_id:s.segmentId,t_ms:o,screen:a,game_world:s.worldSequence[s.currentWorldIndex]||null,mini_game:r,trial:c,action:n,input_type:e,state:i,data:t};s.telemetryQueue.push(d),(s.telemetryQueue.length>=10||n==="minigame_end"||n==="sjt_complete")&&C()}async function C(){if(!s.sessionId||s.telemetryQueue.length===0)return;const a=[...s.telemetryQueue];s.telemetryQueue=[];try{await x("/recruit/telemetry",{method:"POST",body:JSON.stringify({session_id:s.sessionId,events:a})})}catch(n){console.warn("[Telemetry] Flush failed, re-queuing:",n),s.telemetryQueue=[...a,...s.telemetryQueue]}}window.addEventListener("beforeunload",()=>{if(s.sessionId&&s.telemetryQueue.length>0){const a=window.ALFAAZ_API_URL||"",n=JSON.stringify({session_id:s.sessionId,events:s.telemetryQueue});navigator.sendBeacon(`${a}/recruit/telemetry`,n)}});document.addEventListener("visibilitychange",()=>{document.hidden?g(s.screen,"visibility_hidden",{timestamp:Date.now()}):g(s.screen,"visibility_visible",{timestamp:Date.now()})});document.addEventListener("DOMContentLoaded",async()=>{f(),re()});function re(){const a=document.getElementById("pauseBtn");a==null||a.addEventListener("click",E)}function E(){s.isPaused?(s.isPaused=!1,g(s.screen,"resume"),s.screen=s.pausedPreviousScreen||"sjt",f()):(s.isPaused=!0,s.pausedPreviousScreen=s.screen,g(s.screen,"pause"),s.screen="paused",f())}function f(){const a=document.getElementById("recruitApp"),n=document.getElementById("sessionHeaderControls"),t=document.getElementById("topProgressBar"),i=document.getElementById("progressBarFill");switch(s.screen!=="consent"&&s.screen!=="complete"&&s.screen!=="paused"?(n==null||n.classList.remove("hidden"),t==null||t.classList.remove("hidden")):(n==null||n.classList.add("hidden"),t==null||t.classList.add("hidden")),window.lucide&&window.lucide.createIcons(),s.screen){case"consent":ae(a);break;case"accessibility":ne(a);break;case"warmup":ie(a);break;case"sjt":h(a,i);break;case"games":w(a,i);break;case"paused":de(a);break;case"complete":ce(a);break}}function ae(a){var n;a.innerHTML=`
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
  `,(n=document.getElementById("startForm"))==null||n.addEventListener("submit",async t=>{t.preventDefault();const i=t.target.querySelector('button[type="submit"]'),e=i?i.innerHTML:"Begin Session &rarr;";i&&(i.disabled=!0,i.innerHTML="Connecting...");const r=document.getElementById("fullName").value.trim(),c=document.getElementById("email").value.trim();try{const o=await x("/recruit/session/start",{method:"POST",body:JSON.stringify({full_name:r,email:c,device_class:window.innerWidth<768?"mobile":"desktop",input_modality:"ontouchstart"in window?"touch":"mouse"})});if(!o||!o.ok){const u=o?await o.json().catch(()=>({})):{};throw new Error(u.detail||(o?`Server returned ${o.status}`:"No response from server"))}const d=await o.json();if(d.session_id)s.sessionId=d.session_id,s.configHash=d.config_hash,s.worldSequence=d.world_sequence,s.seeds=d.seeds,await x("/recruit/consent",{method:"POST",body:JSON.stringify({session_id:s.sessionId,consent_text_version:"2026-10-v2",choices:{research_telemetry:!0},confirmed_18_plus:!0})}),g("consent","consent_accepted",{full_name:r}),s.screen="accessibility",f();else throw new Error("Missing session ID")}catch(o){alert(`Unable to initialize session: ${o.message||"Please check connection."}`),console.error(o),i&&(i.disabled=!1,i.innerHTML=e)}})}function ne(a){var n;a.innerHTML=`
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
  `,(n=document.getElementById("saveA11yBtn"))==null||n.addEventListener("click",async()=>{var i,e,r,c;const t=[];(i=document.getElementById("a11y_keyboard"))!=null&&i.checked&&t.push("keyboard_navigation"),(e=document.getElementById("a11y_contrast"))!=null&&e.checked&&t.push("high_contrast"),(r=document.getElementById("a11y_motion"))!=null&&r.checked&&t.push("reduced_motion"),(c=document.getElementById("a11y_time"))!=null&&c.checked&&t.push("extended_time"),s.accessibilityModes=t;try{await x("/recruit/accessibility",{method:"POST",body:JSON.stringify({session_id:s.sessionId,modes_enabled:t})})}catch(o){console.warn("Accessibility preferences save error:",o)}g("accessibility","preferences_saved",{modes:t}),s.screen="warmup",f()})}function ie(a){let n=[],t=performance.now();a.innerHTML=`
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
  `;const i=document.getElementById("tapTarget"),e=document.getElementById("warmupStatus");i==null||i.addEventListener("click",async()=>{n.push(performance.now());const r=n.length;if(i.textContent=`Tap (${r}/3)`,e.textContent=`Registered tap ${r} of 3`,r>=3){const c=[n[1]-n[0],n[2]-n[1]],o=(c[0]+c[1])/2,d=performance.now()-t;try{await x("/recruit/warmup",{method:"POST",body:JSON.stringify({session_id:s.sessionId,tap_latency_baseline_ms:o,reading_dwell_baseline_ms:d,pointer_type:"ontouchstart"in window?"touch":"mouse",viewport_class:window.innerWidth<768?"mobile":"desktop"})})}catch(u){console.warn("Warmup save error:",u)}g("warmup","warmup_completed",{avgLatency:o,readingDwell:d});try{const p=await(await x("/recruit/sjt/public")).json();s.sjtScenarios=p.scenarios||[],s.currentSjtIndex=0,s.screen="sjt",f()}catch(u){console.error("Failed to load SJT payload:",u)}}})}function h(a,n){var u;const t=s.sjtScenarios[s.currentSjtIndex];if(!t){se();return}const i=s.sjtScenarios.length,e=s.currentSjtIndex+1;n&&(n.style.width=`${(e-1)/(i+7)*100}%`);const r=document.getElementById("segmentProgress");r&&(r.textContent=`SJT ${e}/${i}`);const c=s.sjtResponses[t.id]||null,o=t.options.map(p=>`
    <div class="option-card ${c===p.id?"selected":""}" data-opt-id="${p.id}" tabindex="0" role="button">
      <span class="font-serif text-sm font-semibold text-[var(--accent-gold)]">${p.id.slice(-1)}.</span>
      <span class="text-sm text-[var(--text-primary)] leading-relaxed">${p.text}</span>
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
          Scenario ${e} of ${i}
        </div>
      </div>

      <div class="text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        ${t.setup}
      </div>

      <div class="space-y-3">
        <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Choose the course of action you would most naturally take:</div>
        ${o}
      </div>

      <div class="pt-4 flex justify-between items-center border-t border-[var(--grid-border)]">
        <span class="text-xs text-[var(--text-secondary)]">Keyboard: Press 1–4 to choose</span>
        <button id="nextSjtBtn" ${c?"":"disabled"} class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] transition">
          ${e===i?"Complete SJT &rarr;":"Next Scenario &rarr;"}
        </button>
      </div>
    </div>
  `,g("sjt","scenario_displayed",{scenario_id:t.id,index:e}),a.querySelectorAll(".option-card").forEach(p=>{p.addEventListener("click",()=>{const l=p.getAttribute("data-opt-id");s.sjtResponses[t.id]=l,g("sjt","option_selected",{scenario_id:t.id,option_id:l}),h(a,n)})}),(u=document.getElementById("nextSjtBtn"))==null||u.addEventListener("click",()=>{s.sjtResponses[t.id]&&(s.currentSjtIndex++,h(a,n))});const d=p=>{if(["1","2","3","4"].includes(p.key)){const l=parseInt(p.key)-1;t.options[l]&&(s.sjtResponses[t.id]=t.options[l].id,g("sjt","option_selected_key",{scenario_id:t.id,option_id:t.options[l].id}),h(a,n))}};window.onkeydown=d}async function se(){window.onkeydown=null;try{await x("/recruit/sjt/submit",{method:"POST",body:JSON.stringify({session_id:s.sessionId,responses:s.sjtResponses})}),g("sjt","sjt_complete",{response_count:Object.keys(s.sjtResponses).length}),s.screen="games",s.currentWorldIndex=0,s.currentMiniGameIndex=0,f()}catch(a){console.error("SJT submit error:",a)}}function w(a,n){const t=s.worldSequence[s.currentWorldIndex];if(!t||s.currentWorldIndex>=s.worldSequence.length){k();return}const i=document.getElementById("segmentProgress");i&&(i.textContent=`World ${s.currentWorldIndex+1}/7`),n&&(n.style.width=`${(s.currentSjtIndex+s.currentWorldIndex+1)/(s.sjtScenarios.length+7)*100}%`),te({appContainer:a,worldCode:t,worldIndex:s.currentWorldIndex,miniGameIndex:s.currentMiniGameIndex,logEvent:(e,r,c,o)=>{const d=oe(t,s.currentMiniGameIndex);g("game",e,r,c,o,d)},onMiniGameComplete:e=>{g("game","minigame_end",e),s.currentMiniGameIndex<2?s.currentMiniGameIndex++:(s.currentMiniGameIndex=0,s.currentWorldIndex++),w(a,n)},onSkipWorld:()=>{g("game","world_skipped",{world:t}),s.currentMiniGameIndex=0,s.currentWorldIndex++,w(a,n)},onSkipAllGames:()=>{g("game","all_games_skipped"),k()}})}function oe(a,n){const t={W1:["F1","F2","F3"],W2:["A1","A2","A3"],W3:["C1","C2","C3"],W4:["E1","E2","E3"],W5:["Q1","Q2","Q3"],W6:["CR1","CR2","CR3"],W7:["M1","M2","M3"]};return t[a]&&t[a][n]||"MG"}async function k(){try{await x("/recruit/complete",{method:"POST",body:JSON.stringify({session_id:s.sessionId})})}catch(a){console.warn("Session complete submission error:",a)}C(),s.screen="complete",f()}function de(a){var n;a.innerHTML=`
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
  `,(n=document.getElementById("resumeBtn"))==null||n.addEventListener("click",E)}function ce(a){a.innerHTML=`
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
