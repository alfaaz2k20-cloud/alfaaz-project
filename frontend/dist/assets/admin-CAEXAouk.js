import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",()=>{const N=localStorage.getItem("alfaaz_user");if(!N){window.location.href="login.html";return}let h;try{h=JSON.parse(N)}catch{localStorage.removeItem("alfaaz_user"),window.location.href="login.html";return}if(!h||h.status!=="ADMIN"){window.location.href="dashboard.html";return}const k=document.getElementById("logoutBtn");k&&k.addEventListener("click",()=>{localStorage.clear(),window.location.href="login.html"});const S={};window.switchTab=function(t){document.querySelectorAll(".tab-btn").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".tab-panel").forEach(e=>e.classList.remove("active"));const i=document.querySelector(`[onclick="switchTab('${t}')"]`);i&&i.classList.add("active");const n=document.getElementById(`tab-${t}`);n&&n.classList.add("active"),S[t]||(S[t]=!0,J(t))};function J(t){t==="events"&&window.loadEvents(),t==="exhibitions"&&(window.loadExhibitionManager(),window.loadExhibitionsData("ALL")),t==="clubs"&&window.loadClubs("ALL"),t==="roster"&&window.loadRoster(),t==="recruitment"&&window.loadRecruitment()}let E=[];window.loadEvents=async function(){const t=document.getElementById("eventsContainer");if(t)try{const i=await window.globalApiFetch("/admin/events");if(!i)return;if(E=await i.json(),!E.length){t.innerHTML='<div class="empty-state">No events found.</div>';return}t.innerHTML="",E.forEach(n=>{const e=document.createElement("div");e.className="data-card event-card";const a=n.registration_open,r=n.capacity===0?"∞":`${n.registered}/${n.capacity}`,s=window.escapeHtml(n.name),l=window.escapeHtml(n.description||"—"),p=window.escapeHtml(n.event_date||"—");e.innerHTML=`
            <div><div class="data-label">Event</div><div class="data-display">${s}</div><div style="font-size:11px; color:var(--text-secondary); margin-top: 4px;">${l}</div></div>
            <div><div class="data-label">Date</div><div class="data-display" style="font-size:12px;">${p}</div></div>
            <div><div class="data-label">Registered</div><div class="data-display">${r}</div></div>
            <div><div class="data-label">Status</div><span class="badge ${a?"badge-open":"badge-closed"}">${a?"Open":"Closed"}</span></div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              <button class="action-btn ${a?"":"gold"}" style="padding: 0.6rem; font-size:9px;" onclick="toggleEvent(${n.id}, this)">${a?"Close Registration":"Open Registration"}</button>
              <button class="action-btn gold" style="padding: 0.6rem; font-size:9px;" onclick="viewRegistrations(${n.id})">View List</button>
              <button class="action-btn" style="padding: 0.6rem; font-size:9px; border-color:var(--accent-red); color:var(--accent-red);" onclick="deleteEvent(${n.id}, '${s.replace(/'/g,"\\'")}', this)">Delete</button>
            </div>`,t.appendChild(e)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch{t.innerHTML='<div class="empty-state">Error loading events.</div>'}},window.handleCreateEvent=async function(){const t=document.getElementById("ev-name").value.trim(),i=document.getElementById("ev-date").value.trim(),n=parseInt(document.getElementById("ev-capacity").value)||0,e=document.getElementById("ev-desc").value.trim(),a=document.getElementById("ev-create-msg");if(!t)return;a.textContent="Creating...";const r=await window.globalApiFetch("/admin/events/create",{method:"POST",body:JSON.stringify({name:t,description:e,event_date:i,capacity:n})});r&&r.ok&&(a.textContent="✓ Created.",window.loadEvents())},window.toggleEvent=async function(t,i){i.textContent="...";const n=await window.globalApiFetch(`/admin/events/${t}/toggle`,{method:"PATCH"});n&&n.ok&&window.loadEvents()},window.deleteEvent=async function(t,i,n){if(!confirm(`Delete ${i}?`))return;n.textContent="...";const e=await window.globalApiFetch(`/admin/events/${t}`,{method:"DELETE"});e&&e.ok&&window.loadEvents()},window.viewRegistrations=async function(t){const i=E.find(r=>r.id===t);document.getElementById("modalTitle").textContent=i.name,document.getElementById("modalBody").innerHTML="Loading...",document.getElementById("regModal").classList.add("open");const n=await window.globalApiFetch(`/admin/events/${t}/registrations`);if(!n)return;const e=await n.json();let a=`<div style="font-size:12px; margin-bottom:1.5rem; color:var(--accent-gold); font-weight:600; letter-spacing: 1px; text-transform: uppercase;">Total Approved: ${e.registrations.length}</div>`;e.registrations.forEach((r,s)=>{const l=window.escapeHtml(r.email),p=r.whatsapp?"WA: "+window.escapeHtml(r.whatsapp):"No WA provided";a+=`<div style="padding:1rem 0; border-bottom:1px solid var(--grid-border); font-size:13px; display:flex; justify-content:space-between; align-items: center;"><span><strong style="color: var(--accent-gold); margin-right: 10px;">${s+1}.</strong> ${l}</span><span style="color:var(--text-primary); font-size: 11px; background: var(--bg-primary); padding: 4px 10px; border-radius: 2px;">${p}</span></div>`}),document.getElementById("modalBody").innerHTML=a||'<div class="empty-state">No registrations.</div>'},window.closeModal=function(){document.getElementById("regModal").classList.remove("open")};let $=[],_="ALL",w="ALL";window.loadExhibitionManager=async function(){const t=await window.globalApiFetch("/admin/exhibitions/list");if(!t||!t.ok)return;const i=await t.json(),n=document.getElementById("exhibitionListContainer"),e=document.getElementById("portalLiveStatus");if(!n)return;n.innerHTML="";const a=i.find(r=>r.is_active);if(a?e.innerHTML=`Currently Live: <strong style="color: var(--accent-green);">${window.escapeHtml(a.title)}</strong>`:e.innerHTML='<strong style="color: var(--accent-red);">CLOSED</strong> (No active exhibition)',i.length===0){n.innerHTML='<div style="font-size: 12px; color: var(--text-secondary);">No exhibitions created yet.</div>';return}i.forEach(r=>{const s=document.createElement("div");s.style.cssText=`border: 1px solid ${r.is_active?"var(--accent-gold)":"var(--grid-border)"}; padding: 1.5rem; background: ${r.is_active?"var(--bg-primary)":"transparent"}; transition: all 0.3s;`;const l=r.is_active?'<span style="font-size: 9px; padding: 3px 8px; background: var(--accent-gold); color: #fff; letter-spacing: 1px; text-transform: uppercase;">Live Now</span>':'<span style="font-size: 9px; padding: 3px 8px; border: 1px solid var(--grid-border); color: var(--text-secondary); letter-spacing: 1px; text-transform: uppercase;">Inactive</span>',p=window.escapeHtml(r.title),v=window.escapeHtml(r.date_text),g=r.is_active?'<button disabled style="font-family: var(--font-body); font-size: 10px; text-transform: uppercase; letter-spacing: 1px; padding: 0.5rem 1rem; background: transparent; border: 1px solid var(--grid-border); color: var(--text-secondary); cursor: not-allowed;">Currently Active</button>':`<button onclick="activateExhibition(${r.id}, '${p.replace(/'/g,"\\'")}')" class="action-btn gold" style="padding: 0.5rem 1rem; font-size: 10px;">Set as Live</button>`;s.innerHTML=`
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div>
              <div style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--text-primary); margin-bottom: 0.2rem;">${p}</div>
              <div style="font-size: 11px; color: var(--text-secondary);">${v}</div>
            </div>
            ${l}
          </div>
          <div>${g}</div>
        `,n.appendChild(s)})},window.createNewExhibition=async function(){const t=document.querySelector('button[onclick="createNewExhibition()"]'),i=document.getElementById("createExMsg"),n={title:document.getElementById("newExTitle").value.trim(),date_text:document.getElementById("newExDate").value.trim(),venue:document.getElementById("newExVenue").value.trim(),about_text:document.getElementById("newExDesc").value.trim(),tnc_pdf_url:document.getElementById("newExTnc").value.trim(),registration_fee:document.getElementById("newExFee").value.trim(),payment_qr_url:document.getElementById("newExQr").value.trim(),payment_instructions:document.getElementById("newExPayInst").value.trim()};if(!n.title||!n.date_text||!n.venue){i.textContent="Title, Dates, and Venue are required.",i.style.color="var(--accent-red)";return}t.textContent="Creating...",t.disabled=!0;const e=await window.globalApiFetch("/admin/exhibitions/create",{method:"POST",body:JSON.stringify(n)});e&&e.ok?(i.textContent="✓ Exhibition Created!",i.style.color="var(--accent-green)",document.querySelectorAll("#newExTitle, #newExDate, #newExVenue, #newExDesc, #newExTnc, #newExFee, #newExQr, #newExPayInst").forEach(a=>a.value=""),await window.loadExhibitionManager()):(i.textContent="Failed to create. Title might already exist.",i.style.color="var(--accent-red)"),t.textContent="Create Exhibition",t.disabled=!1,setTimeout(()=>i.textContent="",4e3)},window.activateExhibition=async function(t,i){if(!confirm(`Are you sure you want to make "${i}" the live exhibition on the public portal?`))return;const n=await window.globalApiFetch(`/admin/exhibitions/${t}/activate`,{method:"PATCH"});n&&n.ok?(await window.loadExhibitionManager(),await window.loadExhibitionsData("ALL")):alert("Failed to activate exhibition.")},window.deactivateAllExhibitions=async function(){if(!confirm("Are you sure you want to CLOSE the exhibition portal? The public will not be able to apply until you set a cycle to live."))return;const t=await window.globalApiFetch("/admin/exhibitions/deactivate-all",{method:"PATCH"});t&&t.ok?(await window.loadExhibitionManager(),alert("Portal successfully closed.")):alert("Failed to close portal.")};async function U(){const t=await window.globalApiFetch("/admin/exhibitions/cycles");if(!t||!t.ok)return;const{cycles:i,current:n}=await t.json(),e=document.getElementById("cycleSelectWrap");if(!e)return;let a=`<option value="">Active Now: ${n||"None"}</option>`;i.forEach(s=>{s!==n&&(a+=`<option value="${s}">${s}</option>`)}),a+='<option value="ALL">— All Archive —</option>',e.innerHTML=`
        <label style="font-size:10px;color:var(--text-secondary);text-transform:uppercase;letter-spacing:1px;margin-right:0.8rem;">Viewing Cycle:</label>
        <select id="cycleSelect" style="background:transparent;border:none;border-bottom:1px solid var(--grid-border);color:var(--text-primary);font-family:var(--font-body);font-size:12px;padding:0.4rem 0;outline:none;">
          ${a}
        </select>`;const r=document.getElementById("cycleSelect");r.value=w,r.addEventListener("change",async s=>{w=s.target.value;const l=w?`?cycle=${encodeURIComponent(w)}`:"",p=await window.globalApiFetch(`/admin/exhibitions${l}`);p&&p.ok&&($=await p.json(),window.filterExhibitions("ALL"))})}window.loadExhibitionsData=async function(t){w="ALL";const i=await window.globalApiFetch("/admin/exhibitions?cycle=ALL");i&&($=await i.json(),await U(),window.renderExhibitions(t))};const A=t=>t.registration_status==="SUBMITTED"||t.registration_status==="CONFIRMED"||!!t.payment_proof_url,q=t=>t.registration_status==="CONFIRMED"?"CONFIRMED":A(t)?"PAYMENT SUBMITTED":t.status;window.filterExhibitions=function(t){_=t,document.querySelectorAll('[id^="filt-"]').forEach(n=>n.classList.remove("gold"));const i=document.getElementById(`filt-${t}`);i&&i.classList.add("gold"),window.renderExhibitions(t)},window.renderExhibitions=function(t){const i=document.getElementById("exhibitionsContainer"),n=t==="ALL"?$:$.filter(e=>t==="FINALIZED"?A(e):t==="APPROVED"?e.status==="APPROVED"&&!A(e):e.status===t);if(i.innerHTML="",!n.length){i.innerHTML='<div class="empty-state">No portfolios found.</div>';return}n.forEach(e=>{const a=document.createElement("div");a.className="data-card exhib-card";const r=q(e),s=e.status==="PENDING"?"badge-pending":e.status==="APPROVED"?"badge-approved":"badge-rejected";let l=`<a href="${e.portfolio_url}" target="_blank" class="action-btn gold" style="padding:0.6rem;font-size:9px;text-align:center;">View Portfolio</a>`;e.status==="PENDING"?l+=`
            <button class="action-btn" style="padding:0.6rem;font-size:9px;" onclick="reviewExhibition(${e.id},'APPROVED',this)">Approve</button>
            <button class="action-btn" style="padding:0.6rem;font-size:9px;border-color:var(--accent-red);color:var(--accent-red);" onclick="reviewExhibition(${e.id},'REJECTED',this)">Reject</button>`:e.status==="REJECTED"&&(l+=`<button class="action-btn" style="padding:0.6rem;font-size:9px;" onclick="revertExhibition(${e.id},this)">Undo Rejection</button>`),e.payment_proof_url&&(l+=`<a href="${e.payment_proof_url}" target="_blank" class="action-btn" style="padding:0.6rem;font-size:9px;border-color:var(--accent-green);color:var(--accent-green);text-align:center;margin-top:0.5rem;">View Payment Receipt</a>`),e.registration_status==="SUBMITTED"&&(l+=`<button class="action-btn gold" style="padding:0.6rem;font-size:9px;" onclick="confirmExhibitionPayment(${e.id},this)">Confirm Payment</button>`);const v=`<div style="font-size:10px; margin-top:6px; color:var(--accent-gold); letter-spacing:1.5px; text-transform:uppercase; font-weight:600;">CYCLE: ${window.escapeHtml(e.exhibition_cycle?e.exhibition_cycle:"LEGACY ARCHIVE")}</div>`,g=window.escapeHtml(e.full_name),f=window.escapeHtml(e.user_email),y=window.escapeHtml(e.genre),m=window.escapeHtml(e.medium);a.innerHTML=`
          <div>
            <div class="data-label">Artist</div>
            <div class="data-display">${g}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">${f}</div>
            ${v}
          </div>
          <div>
            <div class="data-label">Art Profile</div>
            <div class="data-display" style="font-size:13px;">${y}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">Medium: ${m}</div>
          </div>
          <div><div class="data-label">Status</div><span class="badge ${s}">${r}</span></div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;">${l}</div>`,i.appendChild(a)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()},window.reviewExhibition=async function(t,i,n){const e=prompt("Curator Note to Artist (optional):");n.textContent="...",n.disabled=!0;const a=await window.globalApiFetch("/admin/exhibitions/review",{method:"POST",body:JSON.stringify({application_id:t,status:i,curator_note:e||null})});a&&a.ok?(await window.loadExhibitionsData("ALL"),window.filterExhibitions(_)):(n.textContent=i==="APPROVED"?"Approve":"Reject",n.disabled=!1)},window.revertExhibition=async function(t,i){if(!confirm("Undo rejection and return to Pending?"))return;i.textContent="...",i.disabled=!0;const n=await window.globalApiFetch(`/admin/exhibitions/${t}/revert`,{method:"PATCH"});n&&n.ok?(await window.loadExhibitionsData("ALL"),window.filterExhibitions(_)):(i.textContent="Undo Rejection",i.disabled=!1)},window.confirmExhibitionPayment=async function(t,i){if(!confirm("Confirm this payment? This will notify the artist."))return;i.textContent="...",i.disabled=!0;const n=await window.globalApiFetch(`/admin/exhibitions/${t}/confirm-payment`,{method:"PATCH"});n&&n.ok?(await window.loadExhibitionsData("ALL"),window.filterExhibitions("FINALIZED")):(i.textContent="Confirm Payment",i.disabled=!1)};let T=[];window.loadClubs=async function(t){const i=await window.globalApiFetch("/admin/club-applications");i&&(T=await i.json(),window.renderClubs(t))},window.filterClubs=function(t){document.querySelectorAll('[id^="filter-"]').forEach(n=>{n.classList.remove("gold"),n.style.color="",n.style.borderColor=""});const i=document.getElementById(`filter-${t}`);i&&i.classList.add("gold"),window.renderClubs(t)},window.renderClubs=function(t){const i=document.getElementById("clubsContainer"),n=t==="ALL"?T:T.filter(e=>e.status===t);if(i.innerHTML="",!n.length){i.innerHTML='<div class="empty-state">No applications found.</div>';return}n.forEach(e=>{const a=document.createElement("div");a.className="data-card club-card";const r=e.status==="PENDING"?"badge-pending":e.status==="APPROVED"?"badge-approved":"badge-rejected",s=window.escapeHtml(e.user_email),l=window.escapeHtml(e.club_name);a.innerHTML=`
          <div><div class="data-label">User</div><div class="data-display">${s}</div></div>
          <div><div class="data-label">Club</div><div class="data-display">${l}</div></div>
          <div><div class="data-label">Status</div><span class="badge ${r}">${e.status}</span></div>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${e.status==="PENDING"?`<button class="action-btn" style="padding:0.6rem; font-size:9px;" onclick="reviewClub(${e.id}, 'APPROVED', this)">Approve</button><button class="action-btn" style="padding:0.6rem; font-size:9px; border-color:var(--accent-red); color:var(--accent-red);" onclick="reviewClub(${e.id}, 'REJECTED', this)">Reject</button>`:""}
          ${e.status==="REJECTED"?`<button class="action-btn" style="padding:0.6rem; font-size:9px;" onclick="revertClub(${e.id}, this)">Undo</button>`:""}
          </div>`,i.appendChild(a)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()},window.reviewClub=async function(t,i,n){const e=i==="REJECTED"?prompt("Note:"):null;n.textContent="...";const a=await window.globalApiFetch("/admin/club-applications/review",{method:"POST",body:JSON.stringify({application_id:t,status:i,admin_note:e})});a&&a.ok&&window.loadClubs("ALL")},window.revertClub=async function(t,i){if(!confirm("Undo rejection?"))return;i.textContent="...",i.disabled=!0;const n=await window.globalApiFetch(`/admin/club-applications/${t}/revert`,{method:"PATCH"});n&&n.ok&&(window.loadClubs("ALL"),window.filterClubs("ALL"))},window.loadRoster=async function(){const t=document.getElementById("rosterContainer"),i=await window.globalApiFetch("/admin/users");if(!i)return;const n=await i.json();t.innerHTML="",n.forEach((e,a)=>{const r=document.createElement("div");r.className="data-card user-card";const s=window.escapeHtml(e.email);r.innerHTML=`
          <div><div class="data-label">User</div><div class="data-display">${s}</div></div>
          <div><div class="data-label">Role</div><select id="st-${a}" style="margin:0;"><option value="PARTICIPANT" ${e.status==="PARTICIPANT"?"selected":""}>Participant</option><option value="ADMIN" ${e.status==="ADMIN"?"selected":""}>Admin</option></select></div>
          <button class="action-btn gold" style="padding:0.8rem; font-size:9px;" onclick="updateStatus('${e.email}', ${a}, this)">Save Role</button>`,t.appendChild(r)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()},window.updateStatus=async function(t,i,n){const e=document.getElementById(`st-${i}`).value;n.textContent="...";const a=await window.globalApiFetch("/admin/update_status",{method:"POST",body:JSON.stringify({email:t,status:e})});a&&a.ok&&(t===h.email&&e==="PARTICIPANT"&&(localStorage.clear(),window.location.href="login.html"),n.textContent="✓",setTimeout(()=>n.textContent="Save Role",2e3))},window.loadRecruitment=async function(){const t=document.getElementById("recruitmentContainer");if(t){t.innerHTML='<div class="empty-state">Loading candidate records...</div>';try{const i=await window.globalApiFetch("/recruit/research/sessions");if(!i)return;const n=await i.json();if(!n||!n.length){t.innerHTML='<div class="empty-state">No recruitment assessment sessions found in registry.</div>';return}t.innerHTML="",n.forEach(e=>{const a=document.createElement("div");a.className="data-card user-card";const r=window.escapeHtml(e.full_name||"Anonymous Applicant"),s=window.escapeHtml(e.email||"—"),l=e.phone_or_contact?` · ${window.escapeHtml(e.phone_or_contact)}`:"",p=e.created_at?new Date(e.created_at).toLocaleString():"—",v=e.has_sjt?"SJT: Completed":"SJT: In Progress",g=e.has_sjt?"badge-approved":"badge-pending",f=e.completed_tasks_count||0,y=`Tasks: ${f} / 21 completed`,m=e.evidence_status||(f>=21&&e.has_sjt?"Evidence Collected":"In Progress"),L=m==="Evidence Collected"?"badge-approved":"badge-pending",b=e.status||"ACTIVE",z=["COMPLETE","COMPLETED"].includes(b)?"badge-approved":b==="CONSENTED"?"badge-pending":"badge-open";a.innerHTML=`
            <div style="flex:1;">
              <div class="data-label">Candidate · Status: <span class="badge ${z}" style="font-size:9px; padding:1px 5px; margin-left:4px;">${b}</span></div>
              <div class="data-display" style="font-weight: 500;">${r}</div>
              <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">${s}${l} · <span style="font-family:monospace; font-size:10px;">${e.session_id.slice(0,8)}...</span></div>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
                <span class="badge ${g}" style="font-size:10px;">${v}</span>
                <span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${y}</span>
                <span class="badge ${L}" style="font-size:10px;">${m}</span>
              </div>
            </div>
            <div style="min-width:200px;">
              <div class="data-label">Evidence & Extractor Calibration</div>
              <div style="display:flex; flex-direction:column; gap:4px; margin-top:4px;">
                <span class="badge" style="font-size:10px; background:#e8f4f8; color:#1e5066; border:1px solid #bce0ed; align-self:flex-start;">Active Extractors: 2 / 2 (A1, A2)</span>
                <span style="font-size:10px; color:var(--text-secondary); font-style:italic;">19 extractors pending derivation (Design Freeze v1.1)</span>
              </div>
              <div style="font-size:11px; color:var(--text-secondary); margin-top:6px;">Submitted: ${p}</div>
            </div>
            <div style="display:flex; justify-content:flex-end; align-items:center;">
              <button class="action-btn gold" style="padding:0.8rem 1.2rem; font-size:10px;" onclick="viewCandidateDossier('${e.session_id}')">
                Inspect Dossier &rarr;
              </button>
            </div>
          `,t.appendChild(a)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch{t.innerHTML='<div class="empty-state">Error loading recruitment sessions.</div>'}}};async function W(t){let i=null;for(let n=0;n<3;n++){try{if(i=await window.globalApiFetch(`/recruit/research/session/${t}`),!i||i.ok||i.status<500)return i}catch(e){if(n===2)throw e}await new Promise(e=>setTimeout(e,1200*(n+1)))}return i}window.viewCandidateDossier=async function(t){var n;document.getElementById("modalTitle").textContent="Candidate Evidence Dossier";const i=document.getElementById("modalBody");i.innerHTML=`
        <div style="padding: 3rem 1rem; text-align: center; color: var(--text-secondary);">
          <div class="w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-3" style="width:28px; height:28px; border-radius:50%; border:2px solid var(--accent-gold); border-top-color:transparent; animation: spin 1s linear infinite; margin: 0 auto 12px auto;"></div>
          <div style="font-size: 13px; font-family: var(--font-heading);">Retrieving Candidate Dossier...</div>
          <div style="font-size: 11px; margin-top: 4px;">Loading telemetry records from research registry.</div>
        </div>
      `,document.getElementById("regModal").classList.add("open");try{const e=await W(t);if(!e){i.innerHTML='<div style="padding:2rem; text-align:center; color:var(--accent-red);">Session expired or network error. Please refresh and try again.</div>';return}const a=await e.json();if(!e.ok){i.innerHTML=`<div style="padding:2rem; text-align:center; color:var(--accent-red); font-size:13px;">Error loading dossier (${e.status}): ${window.escapeHtml(a.detail||"Server error")}<br><br><button class="action-btn gold" onclick="viewCandidateDossier('${t}')" style="font-size:11px; padding:0.5rem 1rem;">Retry</button></div>`;return}const r=a.metadata||{},s=r.applicant||{},l=r.consent||{},p=a.evidence_by_parameter||{},v=a.features||[],g=a.data_quality_flags||[],f=a.task_records||[],y=a.measurement_comparisons||{},m=a.psychometric_status||{},L=a.task_records_statement||"Descriptive task counts; not a score, not norm-referenced, and not a basis for automated decisions.",b=window.escapeHtml(s.full_name||"Candidate"),P=window.escapeHtml(s.email||"—"),z=window.escapeHtml(s.phone_or_contact||"—"),Q=l.timestamp?new Date(l.timestamp).toLocaleString():r.created_at?new Date(r.created_at).toLocaleString():"—",Y=window.escapeHtml(l.consent_text_version||"1.0"),M=r.duration_minutes!==null&&r.duration_minutes!==void 0?`${r.duration_minutes} min`:"In progress",Z=((n=r.telemetry_summary)==null?void 0:n.total_events)??"Unavailable",K=["COMPLETE","COMPLETED"].includes(r.status);document.getElementById("modalTitle").textContent=`${b} — Assessment Evidence Dossier`;const X=`
          <div style="background:#faf8f5; border:1px solid var(--grid-border); padding:1.25rem; margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.75rem;">1. Candidate Identity & Consent Verification</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; font-size:12px;">
              <div><strong>Full Name:</strong> ${b}</div>
              <div><strong>Email:</strong> ${P}</div>
              <div><strong>Contact / Phone:</strong> ${z}</div>
              <div><strong>Session ID:</strong> <span style="font-family:monospace; font-size:11px;">${t}</span></div>
              <div><strong>Session Status:</strong> <span class="badge ${K?"badge-approved":"badge-pending"}" style="font-size:9px;">${window.escapeHtml(r.status||"ACTIVE")}</span></div>
              <div><strong>Duration:</strong> ${M}</div>
              <div><strong>Consent Recorded:</strong> ${Q}</div>
              <div><strong>DPDP Notice Version:</strong> <span style="font-family:monospace; font-size:11px;">v${Y}</span></div>
              <div><strong>Age Confirmation:</strong> Confirmed 18+</div>
            </div>
          </div>
        `,tt={empathy:"Empathy",conscientiousness:"Conscientiousness",collaborative_spirit:"Collaborative Spirit",emotional_agility:"Emotional Agility",curiosity:"Curiosity",creative_initiative:"Creative Initiative",motivation:"Motivation"},et=o=>{if(!o)return"DEVELOPING";const d=o.toUpperCase();return d==="HIGH"?"HIGH":d==="MODERATE"||d==="BALANCED"?"BALANCED":"DEVELOPING"};let H="";const R=Object.keys(p);R.length>0?H=R.map(o=>{const d=p[o],c=tt[o]||o.replace(/_/g," ").toUpperCase(),u=et(d.sjt_band);return`
              <div style="background:#ffffff; border:1px solid var(--grid-border); padding:1rem; margin-bottom:0.75rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--grid-border); padding-bottom:0.5rem; margin-bottom:0.5rem;">
                  <span style="font-size:12px; font-weight:600; color:var(--text-primary);">${c}</span>
                  <span style="font-size:11px; font-weight:700; color:${u==="HIGH"?"#2e7d32":u==="BALANCED"?"#b5832a":"#555"}; letter-spacing:0.5px;">${u}</span>
                </div>
                <div style="font-size:11px; color:var(--text-secondary); line-height:1.5;">
                  ${window.escapeHtml(d.observed_behavior||"Behavioral trade-off indicator recorded during situational judgment scenarios.")}
                </div>
              </div>
            `}).join(""):H='<div style="padding:1rem; text-align:center; color:var(--text-secondary); font-size:11px; background:#fff; border:1px solid var(--grid-border);">Situational Judgment responses are currently being recorded for this session.</div>';const it=`
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">2. Seven Parameter Summary (Situational Judgment)</div>
            <div style="font-size:11px; background:rgba(189,111,93,0.08); border-left:3px solid var(--accent-gold); padding:0.75rem 1rem; margin-bottom:1rem; line-height:1.5; color:var(--text-primary);">
              <strong>Notice:</strong> Parameters are derived from Situational Judgment responses. These are provisional ipsative indicators, NOT standardized scores.
            </div>
            ${H}
          </div>
        `,B=v.filter(o=>!o.is_quarantined),nt=B.find(o=>o.mini_game==="A1")||{value_raw:"—",label:"Attention to Detail (A1 Folio Sorting)"},at=B.find(o=>o.mini_game==="A2")||{value_raw:"—",label:"Exception Handling (A2 Fragile Leaf)"},D=o=>o!=null&&typeof o=="number"?Number.isInteger(o)?o:o.toFixed(2):o||"—",ot=`
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">3. Active Feature Extractors (2 of 21)</div>
            <div style="font-size:11px; background:#eef7f9; border-left:3px solid #3182ce; padding:0.75rem 1rem; margin-bottom:1rem; line-height:1.5; color:#1a365d;">
              <strong>Notice:</strong> Only A1 and A2 are active. The remaining 19 extractors are pending derivation under Design Freeze v1.1 pending empirical calibration.
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              <div style="background:#ffffff; border:1px solid var(--grid-border); padding:1rem;">
                <div style="font-size:10px; font-family:monospace; color:var(--accent-gold); font-weight:600; text-transform:uppercase;">A1 · The Archive</div>
                <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin:2px 0 6px 0;">Attention to Detail (Sorting Precision)</div>
                <div style="font-size:11px; color:var(--text-secondary);">Raw Metric: <strong style="color:var(--text-primary);">${D(nt.value_raw)}</strong></div>
                <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Observations: 5 classification trials · Status: ACTIVE</div>
              </div>
              <div style="background:#ffffff; border:1px solid var(--grid-border); padding:1rem;">
                <div style="font-size:10px; font-family:monospace; color:var(--accent-gold); font-weight:600; text-transform:uppercase;">A2 · The Archive</div>
                <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin:2px 0 6px 0;">Exception Handling (Fragile Foliar Review)</div>
                <div style="font-size:11px; color:var(--text-secondary);">Raw Metric: <strong style="color:var(--text-primary);">${D(at.value_raw)}</strong></div>
                <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Observations: 4 exception trials · Status: ACTIVE</div>
              </div>
            </div>
          </div>
        `,F=v.filter(o=>o.is_quarantined);let O="";F.length>0&&(O=F.map(o=>`
            <tr style="border-bottom:1px solid var(--grid-border); font-size:11px;">
              <td style="padding:0.5rem; color:var(--text-primary); font-weight:500;">${o.world_name}</td>
              <td style="padding:0.5rem; font-family:monospace; color:var(--text-secondary);">${o.mini_game}</td>
              <td style="padding:0.5rem; color:var(--text-primary);">${o.label||o.feature_name}</td>
              <td style="padding:0.5rem; text-align:center;"><span style="font-size:9px; background:#f0eeea; color:#666; padding:2px 6px; border:1px solid var(--grid-border); font-weight:600; letter-spacing:0.5px;">NOT YET DERIVED</span></td>
              <td style="padding:0.5rem; font-size:10px; color:var(--text-secondary); font-style:italic;">Awaiting calibration data (Design Freeze v1.1)</td>
            </tr>
          `).join(""));const rt=`
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">4. Pending Feature Extractors (19 of 21)</div>
            <div style="overflow-x:auto; border:1px solid var(--grid-border); background:#ffffff;">
              <table style="width:100%; border-collapse:collapse; text-align:left;">
                <thead>
                  <tr style="background:#f0eeea; font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-secondary); border-bottom:1px solid var(--grid-border);">
                    <th style="padding:0.5rem;">World</th>
                    <th style="padding:0.5rem;">ID</th>
                    <th style="padding:0.5rem;">Extractor Name</th>
                    <th style="padding:0.5rem; text-align:center;">Badge</th>
                    <th style="padding:0.5rem;">Quarantine Policy</th>
                  </tr>
                </thead>
                <tbody>
                  ${O||'<tr><td colspan="5" style="padding:1rem; text-align:center; font-size:11px; color:var(--text-secondary);">Quarantine catalog synchronized under Design Freeze v1.1.</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        `;let j="";f.length>0&&(j=f.map(o=>`
            <tr style="border-bottom:1px solid var(--grid-border); font-size:11px;">
              <td style="padding:0.5rem; font-weight:500; color:var(--text-primary);">${window.escapeHtml(o.world_name||o.world_id)}</td>
              <td style="padding:0.5rem; color:var(--text-secondary);"><span style="font-family:monospace; font-size:10px; background:#f0eeea; padding:1px 4px; border-radius:2px; margin-right:4px;">${window.escapeHtml(o.game_id)}</span> ${window.escapeHtml(o.game_name||o.game_id)}</td>
              <td style="padding:0.5rem; color:var(--text-primary);">${window.escapeHtml(o.display_text)}</td>
              <td style="padding:0.5rem; text-align:right; font-family:monospace; font-size:10px; color:${o.status==="RECORDED"?"#2e7d32":"var(--text-secondary)"}; font-weight:600;">${o.status}</td>
            </tr>
          `).join(""));const st=`
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.25rem;">5. 21-Game Descriptive Task Records</div>
            <p style="font-size:11px; color:var(--text-secondary); font-style:italic; margin-bottom:0.5rem;">${L}</p>
            <div style="overflow-x:auto; border:1px solid var(--grid-border); background:#ffffff;">
              <table style="width:100%; border-collapse:collapse; text-align:left;">
                <thead>
                  <tr style="background:#f0eeea; font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-secondary); border-bottom:1px solid var(--grid-border);">
                    <th style="padding:0.5rem;">World</th>
                    <th style="padding:0.5rem;">Interactive Task</th>
                    <th style="padding:0.5rem;">Factual Task Observation</th>
                    <th style="padding:0.5rem; text-align:right;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${j||'<tr><td colspan="4" style="padding:1rem; text-align:center; font-size:11px; color:var(--text-secondary);">Task records will be logged upon game battery completion.</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        `,dt=`
          <div style="margin-bottom:1.5rem; background:#faf8f5; border:1px solid var(--grid-border); padding:1.25rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.75rem;">6. Data Quality Flags & Telemetry Integrity</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; font-size:12px; margin-bottom:0.75rem;">
              <div><strong>Total Duration:</strong> ${M}</div>
              <div><strong>Raw Events Logged:</strong> ${Z}</div>
              <div><strong>Throttling:</strong> Not reported by this dossier endpoint</div>
              <div><strong>Data quality flags:</strong> ${g.length} recorded</div>
            </div>
            ${g.length>0?`
              <div style="margin-top:0.75rem; padding:0.75rem; background:#fff3e0; border:1px solid #ffe0b2; font-size:11px;">
                <strong style="color:#e65100; text-transform:uppercase;">Recorded Data Notices:</strong>
                <ul style="margin-top:0.25rem; margin-left:1.2rem; list-style-type:disc;">
                  ${g.map(o=>`<li><span style="font-family:monospace;">${o.scope}:</span> ${o.flag} (${o.detail||"Standard observation"})</li>`).join("")}
                </ul>
              </div>
            `:'<div style="font-size:11px; color:var(--text-secondary);">No data-quality flags are recorded. This does not independently verify telemetry completeness.</div>'}
          </div>
        `,V=new Map;Object.entries(y).forEach(([o,d])=>{(d.mini_games||[]).forEach(c=>V.set(c.mini_game,{parameter:o,game:c}))});const lt=f.map(o=>{const d=V.get(o.game_id),c=d==null?void 0:d.game,u=(c==null?void 0:c.features)||[],C=(c==null?void 0:c.feature_status)==="QUARANTINED"?"Evidence not yet derived":u.length?u.map(G=>`${window.escapeHtml(G.name)}: ${window.escapeHtml(D(G.value))}`).join("<br>"):"No feature derived",I=m.reliability==="ESTIMATED"?"See study estimate":"Not estimated",x=m.validity==="ESTIMATED"?"See study estimate":"Not estimated";return`<tr style="border-bottom:1px solid var(--grid-border); font-size:11px;">
            <td style="padding:0.5rem;">${window.escapeHtml(o.world_name||o.world_id)}</td>
            <td style="padding:0.5rem; font-family:monospace;">${window.escapeHtml(o.game_id)}</td>
            <td style="padding:0.5rem;">${window.escapeHtml((d==null?void 0:d.parameter)||"—")}</td>
            <td style="padding:0.5rem;">${window.escapeHtml((c==null?void 0:c.feature_status)||"NOT_DERIVED")}</td>
            <td style="padding:0.5rem;">${C}</td>
            <td style="padding:0.5rem;">${I}</td>
            <td style="padding:0.5rem;">${x}</td>
          </tr>`}).join(""),ct=Object.entries(y).map(([o,d])=>{const c=d.within_construct_pairwise_deltas||[],u=c.length?c.map(x=>`${window.escapeHtml(x.left_game)}–${window.escapeHtml(x.right_game)}: ${x.delta_bands} band(s)`).join("<br>"):"Not available until calibrated game bands exist",C=d.within_construct_delta_tolerance_bands==null?"Not set while uncalibrated":`${d.within_construct_delta_tolerance_bands} band(s)`,I=d.sjt_game_delta_bands==null?"Not available until both methods are calibrated":`${d.sjt_game_delta_bands} band(s)`;return`<tr style="border-bottom:1px solid var(--grid-border); font-size:11px;">
            <td style="padding:0.5rem;">${window.escapeHtml(o.replace(/_/g," "))}</td>
            <td style="padding:0.5rem;">${u}</td>
            <td style="padding:0.5rem;">${C}</td>
            <td style="padding:0.5rem;">${window.escapeHtml(d.sjt_band||"—")} / ${window.escapeHtml(d.game_band||"—")}</td>
            <td style="padding:0.5rem;">${I}</td>
            <td style="padding:0.5rem;">${window.escapeHtml(d.sjt_game_delta_tolerance==null?"Not set":d.sjt_game_delta_tolerance)}</td>
          </tr>`}).join(""),pt=`
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">7. Game Measurement & Calibration</div>
            <div style="font-size:11px; background:#fff3e0; border-left:3px solid #bd6f5d; padding:0.75rem 1rem; margin-bottom:1rem; line-height:1.5;">
              Reliability and validity are study-level estimates, not candidate-level scores. Current calibration: <strong>${window.escapeHtml(m.calibration_status||"UNKNOWN")}</strong>; regression: <strong>${window.escapeHtml(m.regression||"NOT_RUN")}</strong>. A single combined score is deliberately unavailable until its measurement model and thresholds are empirically calibrated.
            </div>
            <div style="overflow-x:auto; border:1px solid var(--grid-border); background:#fff; margin-bottom:1rem;">
              <table style="width:100%; border-collapse:collapse; text-align:left; min-width:760px;">
                <thead><tr style="background:#f0eeea; font-size:10px; text-transform:uppercase; color:var(--text-secondary);"><th style="padding:0.5rem;">World</th><th style="padding:0.5rem;">Game</th><th style="padding:0.5rem;">Intended construct</th><th style="padding:0.5rem;">Extractor state</th><th style="padding:0.5rem;">Observed feature(s)</th><th style="padding:0.5rem;">Reliability</th><th style="padding:0.5rem;">Validity</th></tr></thead>
                <tbody>${lt||'<tr><td colspan="7" style="padding:1rem;">Game catalog unavailable.</td></tr>'}</tbody>
              </table>
            </div>
            <div style="overflow-x:auto; border:1px solid var(--grid-border); background:#fff;">
              <table style="width:100%; border-collapse:collapse; text-align:left; min-width:760px;">
                <thead><tr style="background:#f0eeea; font-size:10px; text-transform:uppercase; color:var(--text-secondary);"><th style="padding:0.5rem;">Construct</th><th style="padding:0.5rem;">Game-to-game delta</th><th style="padding:0.5rem;">Acceptable delta</th><th style="padding:0.5rem;">SJT / game bands</th><th style="padding:0.5rem;">SJT-to-game delta</th><th style="padding:0.5rem;">Acceptable delta</th></tr></thead>
                <tbody>${ct||'<tr><td colspan="6" style="padding:1rem;">Construct comparisons unavailable.</td></tr>'}</tbody>
              </table>
            </div>
            <div style="font-size:10px; color:var(--text-secondary); margin-top:0.5rem;">Delta is a descriptive band distance, not a validity statistic. Thresholds must be prespecified and empirically justified; cross-method tolerance is currently unset. ${window.escapeHtml(m.reliability_note||"")} ${window.escapeHtml(m.validity_note||"")}</div>
          </div>
        `;i.innerHTML=`
          ${X}
          ${it}
          ${ot}
          ${rt}
          ${st}
          ${dt}
          ${pt}
        `}catch(e){console.error("Candidate dossier load error:",e);const a=(e==null?void 0:e.message)||"Please check server connection.";i.innerHTML=`<div style="padding:2rem; text-align:center; color:var(--accent-red);">Failed to load candidate dossier.<br><span style="font-size:11px; color:var(--text-secondary); margin-top:6px; display:inline-block;">${window.escapeHtml(a)}</span><br><br><button class="action-btn gold" onclick="viewCandidateDossier('${t}')" style="font-size:11px; padding:0.5rem 1rem;">Retry</button></div>`}},window.switchTab("events")});
