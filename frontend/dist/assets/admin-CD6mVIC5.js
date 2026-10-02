import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",()=>{const _=localStorage.getItem("alfaaz_user");if(!_){window.location.href="login.html";return}let b;try{b=JSON.parse(_)}catch{localStorage.removeItem("alfaaz_user"),window.location.href="login.html";return}if(!b||b.status!=="ADMIN"){window.location.href="dashboard.html";return}const z=document.getElementById("logoutBtn");z&&z.addEventListener("click",()=>{localStorage.clear(),window.location.href="login.html"});const D={};window.switchTab=function(t){document.querySelectorAll(".tab-btn").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".tab-panel").forEach(e=>e.classList.remove("active"));const i=document.querySelector(`[onclick="switchTab('${t}')"]`);i&&i.classList.add("active");const n=document.getElementById(`tab-${t}`);n&&n.classList.add("active"),D[t]||(D[t]=!0,R(t))};function R(t){t==="events"&&window.loadEvents(),t==="exhibitions"&&(window.loadExhibitionManager(),window.loadExhibitionsData("ALL")),t==="clubs"&&window.loadClubs("ALL"),t==="roster"&&window.loadRoster(),t==="recruitment"&&window.loadRecruitment()}let w=[];window.loadEvents=async function(){const t=document.getElementById("eventsContainer");if(t)try{const i=await window.globalApiFetch("/admin/events");if(!i)return;if(w=await i.json(),!w.length){t.innerHTML='<div class="empty-state">No events found.</div>';return}t.innerHTML="",w.forEach(n=>{const e=document.createElement("div");e.className="data-card event-card";const o=n.registration_open,a=n.capacity===0?"∞":`${n.registered}/${n.capacity}`,s=window.escapeHtml(n.name),d=window.escapeHtml(n.description||"—"),l=window.escapeHtml(n.event_date||"—");e.innerHTML=`
            <div><div class="data-label">Event</div><div class="data-display">${s}</div><div style="font-size:11px; color:var(--text-secondary); margin-top: 4px;">${d}</div></div>
            <div><div class="data-label">Date</div><div class="data-display" style="font-size:12px;">${l}</div></div>
            <div><div class="data-label">Registered</div><div class="data-display">${a}</div></div>
            <div><div class="data-label">Status</div><span class="badge ${o?"badge-open":"badge-closed"}">${o?"Open":"Closed"}</span></div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              <button class="action-btn ${o?"":"gold"}" style="padding: 0.6rem; font-size:9px;" onclick="toggleEvent(${n.id}, this)">${o?"Close Registration":"Open Registration"}</button>
              <button class="action-btn gold" style="padding: 0.6rem; font-size:9px;" onclick="viewRegistrations(${n.id})">View List</button>
              <button class="action-btn" style="padding: 0.6rem; font-size:9px; border-color:var(--accent-red); color:var(--accent-red);" onclick="deleteEvent(${n.id}, '${s.replace(/'/g,"\\'")}', this)">Delete</button>
            </div>`,t.appendChild(e)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch{t.innerHTML='<div class="empty-state">Error loading events.</div>'}},window.handleCreateEvent=async function(){const t=document.getElementById("ev-name").value.trim(),i=document.getElementById("ev-date").value.trim(),n=parseInt(document.getElementById("ev-capacity").value)||0,e=document.getElementById("ev-desc").value.trim(),o=document.getElementById("ev-create-msg");if(!t)return;o.textContent="Creating...";const a=await window.globalApiFetch("/admin/events/create",{method:"POST",body:JSON.stringify({name:t,description:e,event_date:i,capacity:n})});a&&a.ok&&(o.textContent="✓ Created.",window.loadEvents())},window.toggleEvent=async function(t,i){i.textContent="...";const n=await window.globalApiFetch(`/admin/events/${t}/toggle`,{method:"PATCH"});n&&n.ok&&window.loadEvents()},window.deleteEvent=async function(t,i,n){if(!confirm(`Delete ${i}?`))return;n.textContent="...";const e=await window.globalApiFetch(`/admin/events/${t}`,{method:"DELETE"});e&&e.ok&&window.loadEvents()},window.viewRegistrations=async function(t){const i=w.find(a=>a.id===t);document.getElementById("modalTitle").textContent=i.name,document.getElementById("modalBody").innerHTML="Loading...",document.getElementById("regModal").classList.add("open");const n=await window.globalApiFetch(`/admin/events/${t}/registrations`);if(!n)return;const e=await n.json();let o=`<div style="font-size:12px; margin-bottom:1.5rem; color:var(--accent-gold); font-weight:600; letter-spacing: 1px; text-transform: uppercase;">Total Approved: ${e.registrations.length}</div>`;e.registrations.forEach((a,s)=>{const d=window.escapeHtml(a.email),l=a.whatsapp?"WA: "+window.escapeHtml(a.whatsapp):"No WA provided";o+=`<div style="padding:1rem 0; border-bottom:1px solid var(--grid-border); font-size:13px; display:flex; justify-content:space-between; align-items: center;"><span><strong style="color: var(--accent-gold); margin-right: 10px;">${s+1}.</strong> ${d}</span><span style="color:var(--text-primary); font-size: 11px; background: var(--bg-primary); padding: 4px 10px; border-radius: 2px;">${l}</span></div>`}),document.getElementById("modalBody").innerHTML=o||'<div class="empty-state">No registrations.</div>'},window.closeModal=function(){document.getElementById("regModal").classList.remove("open")};let x=[],h="ALL",f="ALL";window.loadExhibitionManager=async function(){const t=await window.globalApiFetch("/admin/exhibitions/list");if(!t||!t.ok)return;const i=await t.json(),n=document.getElementById("exhibitionListContainer"),e=document.getElementById("portalLiveStatus");if(!n)return;n.innerHTML="";const o=i.find(a=>a.is_active);if(o?e.innerHTML=`Currently Live: <strong style="color: var(--accent-green);">${window.escapeHtml(o.title)}</strong>`:e.innerHTML='<strong style="color: var(--accent-red);">CLOSED</strong> (No active exhibition)',i.length===0){n.innerHTML='<div style="font-size: 12px; color: var(--text-secondary);">No exhibitions created yet.</div>';return}i.forEach(a=>{const s=document.createElement("div");s.style.cssText=`border: 1px solid ${a.is_active?"var(--accent-gold)":"var(--grid-border)"}; padding: 1.5rem; background: ${a.is_active?"var(--bg-primary)":"transparent"}; transition: all 0.3s;`;const d=a.is_active?'<span style="font-size: 9px; padding: 3px 8px; background: var(--accent-gold); color: #fff; letter-spacing: 1px; text-transform: uppercase;">Live Now</span>':'<span style="font-size: 9px; padding: 3px 8px; border: 1px solid var(--grid-border); color: var(--text-secondary); letter-spacing: 1px; text-transform: uppercase;">Inactive</span>',l=window.escapeHtml(a.title),c=window.escapeHtml(a.date_text),p=a.is_active?'<button disabled style="font-family: var(--font-body); font-size: 10px; text-transform: uppercase; letter-spacing: 1px; padding: 0.5rem 1rem; background: transparent; border: 1px solid var(--grid-border); color: var(--text-secondary); cursor: not-allowed;">Currently Active</button>':`<button onclick="activateExhibition(${a.id}, '${l.replace(/'/g,"\\'")}')" class="action-btn gold" style="padding: 0.5rem 1rem; font-size: 10px;">Set as Live</button>`;s.innerHTML=`
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div>
              <div style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--text-primary); margin-bottom: 0.2rem;">${l}</div>
              <div style="font-size: 11px; color: var(--text-secondary);">${c}</div>
            </div>
            ${d}
          </div>
          <div>${p}</div>
        `,n.appendChild(s)})},window.createNewExhibition=async function(){const t=document.querySelector('button[onclick="createNewExhibition()"]'),i=document.getElementById("createExMsg"),n={title:document.getElementById("newExTitle").value.trim(),date_text:document.getElementById("newExDate").value.trim(),venue:document.getElementById("newExVenue").value.trim(),about_text:document.getElementById("newExDesc").value.trim(),tnc_pdf_url:document.getElementById("newExTnc").value.trim(),registration_fee:document.getElementById("newExFee").value.trim(),payment_qr_url:document.getElementById("newExQr").value.trim(),payment_instructions:document.getElementById("newExPayInst").value.trim()};if(!n.title||!n.date_text||!n.venue){i.textContent="Title, Dates, and Venue are required.",i.style.color="var(--accent-red)";return}t.textContent="Creating...",t.disabled=!0;const e=await window.globalApiFetch("/admin/exhibitions/create",{method:"POST",body:JSON.stringify(n)});e&&e.ok?(i.textContent="✓ Exhibition Created!",i.style.color="var(--accent-green)",document.querySelectorAll("#newExTitle, #newExDate, #newExVenue, #newExDesc, #newExTnc, #newExFee, #newExQr, #newExPayInst").forEach(o=>o.value=""),await window.loadExhibitionManager()):(i.textContent="Failed to create. Title might already exist.",i.style.color="var(--accent-red)"),t.textContent="Create Exhibition",t.disabled=!1,setTimeout(()=>i.textContent="",4e3)},window.activateExhibition=async function(t,i){if(!confirm(`Are you sure you want to make "${i}" the live exhibition on the public portal?`))return;const n=await window.globalApiFetch(`/admin/exhibitions/${t}/activate`,{method:"PATCH"});n&&n.ok?(await window.loadExhibitionManager(),await window.loadExhibitionsData("ALL")):alert("Failed to activate exhibition.")},window.deactivateAllExhibitions=async function(){if(!confirm("Are you sure you want to CLOSE the exhibition portal? The public will not be able to apply until you set a cycle to live."))return;const t=await window.globalApiFetch("/admin/exhibitions/deactivate-all",{method:"PATCH"});t&&t.ok?(await window.loadExhibitionManager(),alert("Portal successfully closed.")):alert("Failed to close portal.")};async function B(){const t=await window.globalApiFetch("/admin/exhibitions/cycles");if(!t||!t.ok)return;const{cycles:i,current:n}=await t.json(),e=document.getElementById("cycleSelectWrap");if(!e)return;let o=`<option value="">Active Now: ${n||"None"}</option>`;i.forEach(s=>{s!==n&&(o+=`<option value="${s}">${s}</option>`)}),o+='<option value="ALL">— All Archive —</option>',e.innerHTML=`
        <label style="font-size:10px;color:var(--text-secondary);text-transform:uppercase;letter-spacing:1px;margin-right:0.8rem;">Viewing Cycle:</label>
        <select id="cycleSelect" style="background:transparent;border:none;border-bottom:1px solid var(--grid-border);color:var(--text-primary);font-family:var(--font-body);font-size:12px;padding:0.4rem 0;outline:none;">
          ${o}
        </select>`;const a=document.getElementById("cycleSelect");a.value=f,a.addEventListener("change",async s=>{f=s.target.value;const d=f?`?cycle=${encodeURIComponent(f)}`:"",l=await window.globalApiFetch(`/admin/exhibitions${d}`);l&&l.ok&&(x=await l.json(),window.filterExhibitions("ALL"))})}window.loadExhibitionsData=async function(t){f="ALL";const i=await window.globalApiFetch("/admin/exhibitions?cycle=ALL");i&&(x=await i.json(),await B(),window.renderExhibitions(t))};const E=t=>t.registration_status==="SUBMITTED"||t.registration_status==="CONFIRMED"||!!t.payment_proof_url,F=t=>t.registration_status==="CONFIRMED"?"CONFIRMED":E(t)?"PAYMENT SUBMITTED":t.status;window.filterExhibitions=function(t){h=t,document.querySelectorAll('[id^="filt-"]').forEach(n=>n.classList.remove("gold"));const i=document.getElementById(`filt-${t}`);i&&i.classList.add("gold"),window.renderExhibitions(t)},window.renderExhibitions=function(t){const i=document.getElementById("exhibitionsContainer"),n=t==="ALL"?x:x.filter(e=>t==="FINALIZED"?E(e):t==="APPROVED"?e.status==="APPROVED"&&!E(e):e.status===t);if(i.innerHTML="",!n.length){i.innerHTML='<div class="empty-state">No portfolios found.</div>';return}n.forEach(e=>{const o=document.createElement("div");o.className="data-card exhib-card";const a=F(e),s=e.status==="PENDING"?"badge-pending":e.status==="APPROVED"?"badge-approved":"badge-rejected";let d=`<a href="${e.portfolio_url}" target="_blank" class="action-btn gold" style="padding:0.6rem;font-size:9px;text-align:center;">View Portfolio</a>`;e.status==="PENDING"?d+=`
            <button class="action-btn" style="padding:0.6rem;font-size:9px;" onclick="reviewExhibition(${e.id},'APPROVED',this)">Approve</button>
            <button class="action-btn" style="padding:0.6rem;font-size:9px;border-color:var(--accent-red);color:var(--accent-red);" onclick="reviewExhibition(${e.id},'REJECTED',this)">Reject</button>`:e.status==="REJECTED"&&(d+=`<button class="action-btn" style="padding:0.6rem;font-size:9px;" onclick="revertExhibition(${e.id},this)">Undo Rejection</button>`),e.payment_proof_url&&(d+=`<a href="${e.payment_proof_url}" target="_blank" class="action-btn" style="padding:0.6rem;font-size:9px;border-color:var(--accent-green);color:var(--accent-green);text-align:center;margin-top:0.5rem;">View Payment Receipt</a>`),e.registration_status==="SUBMITTED"&&(d+=`<button class="action-btn gold" style="padding:0.6rem;font-size:9px;" onclick="confirmExhibitionPayment(${e.id},this)">Confirm Payment</button>`);const c=`<div style="font-size:10px; margin-top:6px; color:var(--accent-gold); letter-spacing:1.5px; text-transform:uppercase; font-weight:600;">CYCLE: ${window.escapeHtml(e.exhibition_cycle?e.exhibition_cycle:"LEGACY ARCHIVE")}</div>`,p=window.escapeHtml(e.full_name),m=window.escapeHtml(e.user_email),u=window.escapeHtml(e.genre),g=window.escapeHtml(e.medium);o.innerHTML=`
          <div>
            <div class="data-label">Artist</div>
            <div class="data-display">${p}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">${m}</div>
            ${c}
          </div>
          <div>
            <div class="data-label">Art Profile</div>
            <div class="data-display" style="font-size:13px;">${u}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">Medium: ${g}</div>
          </div>
          <div><div class="data-label">Status</div><span class="badge ${s}">${a}</span></div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;">${d}</div>`,i.appendChild(o)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()},window.reviewExhibition=async function(t,i,n){const e=prompt("Curator Note to Artist (optional):");n.textContent="...",n.disabled=!0;const o=await window.globalApiFetch("/admin/exhibitions/review",{method:"POST",body:JSON.stringify({application_id:t,status:i,curator_note:e||null})});o&&o.ok?(await window.loadExhibitionsData("ALL"),window.filterExhibitions(h)):(n.textContent=i==="APPROVED"?"Approve":"Reject",n.disabled=!1)},window.revertExhibition=async function(t,i){if(!confirm("Undo rejection and return to Pending?"))return;i.textContent="...",i.disabled=!0;const n=await window.globalApiFetch(`/admin/exhibitions/${t}/revert`,{method:"PATCH"});n&&n.ok?(await window.loadExhibitionsData("ALL"),window.filterExhibitions(h)):(i.textContent="Undo Rejection",i.disabled=!1)},window.confirmExhibitionPayment=async function(t,i){if(!confirm("Confirm this payment? This will notify the artist."))return;i.textContent="...",i.disabled=!0;const n=await window.globalApiFetch(`/admin/exhibitions/${t}/confirm-payment`,{method:"PATCH"});n&&n.ok?(await window.loadExhibitionsData("ALL"),window.filterExhibitions("FINALIZED")):(i.textContent="Confirm Payment",i.disabled=!1)};let C=[];window.loadClubs=async function(t){const i=await window.globalApiFetch("/admin/club-applications");i&&(C=await i.json(),window.renderClubs(t))},window.filterClubs=function(t){document.querySelectorAll('[id^="filter-"]').forEach(n=>{n.classList.remove("gold"),n.style.color="",n.style.borderColor=""});const i=document.getElementById(`filter-${t}`);i&&i.classList.add("gold"),window.renderClubs(t)},window.renderClubs=function(t){const i=document.getElementById("clubsContainer"),n=t==="ALL"?C:C.filter(e=>e.status===t);if(i.innerHTML="",!n.length){i.innerHTML='<div class="empty-state">No applications found.</div>';return}n.forEach(e=>{const o=document.createElement("div");o.className="data-card club-card";const a=e.status==="PENDING"?"badge-pending":e.status==="APPROVED"?"badge-approved":"badge-rejected",s=window.escapeHtml(e.user_email),d=window.escapeHtml(e.club_name);o.innerHTML=`
          <div><div class="data-label">User</div><div class="data-display">${s}</div></div>
          <div><div class="data-label">Club</div><div class="data-display">${d}</div></div>
          <div><div class="data-label">Status</div><span class="badge ${a}">${e.status}</span></div>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${e.status==="PENDING"?`<button class="action-btn" style="padding:0.6rem; font-size:9px;" onclick="reviewClub(${e.id}, 'APPROVED', this)">Approve</button><button class="action-btn" style="padding:0.6rem; font-size:9px; border-color:var(--accent-red); color:var(--accent-red);" onclick="reviewClub(${e.id}, 'REJECTED', this)">Reject</button>`:""}
          ${e.status==="REJECTED"?`<button class="action-btn" style="padding:0.6rem; font-size:9px;" onclick="revertClub(${e.id}, this)">Undo</button>`:""}
          </div>`,i.appendChild(o)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()},window.reviewClub=async function(t,i,n){const e=i==="REJECTED"?prompt("Note:"):null;n.textContent="...";const o=await window.globalApiFetch("/admin/club-applications/review",{method:"POST",body:JSON.stringify({application_id:t,status:i,admin_note:e})});o&&o.ok&&window.loadClubs("ALL")},window.revertClub=async function(t,i){if(!confirm("Undo rejection?"))return;i.textContent="...",i.disabled=!0;const n=await window.globalApiFetch(`/admin/club-applications/${t}/revert`,{method:"PATCH"});n&&n.ok&&(window.loadClubs("ALL"),window.filterClubs("ALL"))},window.loadRoster=async function(){const t=document.getElementById("rosterContainer"),i=await window.globalApiFetch("/admin/users");if(!i)return;const n=await i.json();t.innerHTML="",n.forEach((e,o)=>{const a=document.createElement("div");a.className="data-card user-card";const s=window.escapeHtml(e.email);a.innerHTML=`
          <div><div class="data-label">User</div><div class="data-display">${s}</div></div>
          <div><div class="data-label">Role</div><select id="st-${o}" style="margin:0;"><option value="PARTICIPANT" ${e.status==="PARTICIPANT"?"selected":""}>Participant</option><option value="ADMIN" ${e.status==="ADMIN"?"selected":""}>Admin</option></select></div>
          <button class="action-btn gold" style="padding:0.8rem; font-size:9px;" onclick="updateStatus('${e.email}', ${o}, this)">Save Role</button>`,t.appendChild(a)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()},window.updateStatus=async function(t,i,n){const e=document.getElementById(`st-${i}`).value;n.textContent="...";const o=await window.globalApiFetch("/admin/update_status",{method:"POST",body:JSON.stringify({email:t,status:e})});o&&o.ok&&(t===b.email&&e==="PARTICIPANT"&&(localStorage.clear(),window.location.href="login.html"),n.textContent="✓",setTimeout(()=>n.textContent="Save Role",2e3))},window.loadRecruitment=async function(){const t=document.getElementById("recruitmentContainer");if(t){t.innerHTML='<div class="empty-state">Loading candidate records...</div>';try{const i=await window.globalApiFetch("/recruit/research/sessions");if(!i)return;const n=await i.json();if(!n||!n.length){t.innerHTML='<div class="empty-state">No recruitment assessment sessions found in registry.</div>';return}t.innerHTML="",n.forEach(e=>{const o=document.createElement("div");o.className="data-card user-card";const a=window.escapeHtml(e.full_name||"Anonymous Applicant"),s=window.escapeHtml(e.email||"—"),d=e.phone_or_contact?` · ${window.escapeHtml(e.phone_or_contact)}`:"",l=e.created_at?new Date(e.created_at).toLocaleString():"—",c=e.has_sjt?"SJT: Completed":"SJT: In Progress",p=e.has_sjt?"badge-approved":"badge-pending",m=e.completed_tasks_count||0,u=`Tasks: ${m} / 21 completed`,g=e.evidence_status||(m>=21&&e.has_sjt?"Evidence Collected":"In Progress"),$=g==="Evidence Collected"?"badge-approved":"badge-pending",y=e.status||"ACTIVE",A=y==="COMPLETED"?"badge-approved":y==="CONSENTED"?"badge-pending":"badge-open";o.innerHTML=`
            <div style="flex:1;">
              <div class="data-label">Candidate · Status: <span class="badge ${A}" style="font-size:9px; padding:1px 5px; margin-left:4px;">${y}</span></div>
              <div class="data-display" style="font-weight: 500;">${a}</div>
              <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">${s}${d} · <span style="font-family:monospace; font-size:10px;">${e.session_id.slice(0,8)}...</span></div>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
                <span class="badge ${p}" style="font-size:10px;">${c}</span>
                <span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${u}</span>
                <span class="badge ${$}" style="font-size:10px;">${g}</span>
              </div>
            </div>
            <div style="min-width:200px;">
              <div class="data-label">Evidence & Extractor Calibration</div>
              <div style="display:flex; flex-direction:column; gap:4px; margin-top:4px;">
                <span class="badge" style="font-size:10px; background:#e8f4f8; color:#1e5066; border:1px solid #bce0ed; align-self:flex-start;">Active Extractors: 2 / 2 (A1, A2)</span>
                <span style="font-size:10px; color:var(--text-secondary); font-style:italic;">19 extractors quarantined (Design Freeze v1.1)</span>
              </div>
              <div style="font-size:11px; color:var(--text-secondary); margin-top:6px;">Submitted: ${l}</div>
            </div>
            <div style="display:flex; justify-content:flex-end; align-items:center;">
              <button class="action-btn gold" style="padding:0.8rem 1.2rem; font-size:10px;" onclick="viewCandidateDossier('${e.session_id}')">
                Inspect Dossier &rarr;
              </button>
            </div>
          `,t.appendChild(o)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch{t.innerHTML='<div class="empty-state">Error loading recruitment sessions.</div>'}}},window.viewCandidateDossier=async function(t){var n;document.getElementById("modalTitle").textContent="Candidate Evidence Dossier";const i=document.getElementById("modalBody");i.innerHTML=`
        <div style="padding: 3rem 1rem; text-align: center; color: var(--text-secondary);">
          <div class="w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-3" style="width:28px; height:28px; border-radius:50%; border:2px solid var(--accent-gold); border-top-color:transparent; animation: spin 1s linear infinite; margin: 0 auto 12px auto;"></div>
          <div style="font-size: 13px; font-family: var(--font-heading);">Retrieving Candidate Dossier...</div>
          <div style="font-size: 11px; margin-top: 4px;">Loading telemetry records from research registry.</div>
        </div>
      `,document.getElementById("regModal").classList.add("open");try{const e=await window.globalApiFetch(`/recruit/research/session/${t}`);if(!e){i.innerHTML='<div style="padding:2rem; text-align:center; color:var(--accent-red);">Session expired or network error. Please refresh and try again.</div>';return}const o=await e.json();if(!e.ok){i.innerHTML=`<div style="padding:2rem; text-align:center; color:var(--accent-red); font-size:13px;">Error loading dossier (${e.status}): ${window.escapeHtml(o.detail||"Server error")}<br><br><button class="action-btn gold" onclick="viewCandidateDossier('${t}')" style="font-size:11px; padding:0.5rem 1rem;">Retry</button></div>`;return}const a=o.metadata||{},s=a.applicant||{},d=a.consent||{},l=o.evidence_by_parameter||{},c=o.features||[],p=o.data_quality_flags||[],m=o.task_records||[],u=o.task_records_statement||"Descriptive task counts; not a score, not norm-referenced, and not a basis for automated decisions.",g=window.escapeHtml(s.full_name||"Candidate"),$=window.escapeHtml(s.email||"—"),y=window.escapeHtml(s.phone_or_contact||"—"),A=d.timestamp?new Date(d.timestamp).toLocaleString():a.created_at?new Date(a.created_at).toLocaleString():"—",O=window.escapeHtml(d.consent_text_version||"1.0"),I=a.duration_minutes!==null&&a.duration_minutes!==void 0?`${a.duration_minutes} min`:"In progress",j=((n=a.telemetry_summary)==null?void 0:n.total_events)||"Recorded";document.getElementById("modalTitle").textContent=`${g} — Assessment Evidence Dossier`;const V=`
          <div style="background:#faf8f5; border:1px solid var(--grid-border); padding:1.25rem; margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.75rem;">1. Candidate Identity & Consent Verification</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; font-size:12px;">
              <div><strong>Full Name:</strong> ${g}</div>
              <div><strong>Email:</strong> ${$}</div>
              <div><strong>Contact / Phone:</strong> ${y}</div>
              <div><strong>Session ID:</strong> <span style="font-family:monospace; font-size:11px;">${t}</span></div>
              <div><strong>Session Status:</strong> <span class="badge ${a.status==="COMPLETED"?"badge-approved":"badge-pending"}" style="font-size:9px;">${a.status||"ACTIVE"}</span></div>
              <div><strong>Duration:</strong> ${I}</div>
              <div><strong>Consent Recorded:</strong> ${A}</div>
              <div><strong>DPDP Notice Version:</strong> <span style="font-family:monospace; font-size:11px;">v${O}</span></div>
              <div><strong>Age Confirmation:</strong> Confirmed 18+</div>
            </div>
          </div>
        `,G={empathy:"Empathy",conscientiousness:"Conscientiousness",collaborative_spirit:"Collaborative Spirit",emotional_agility:"Emotional Agility",curiosity:"Curiosity",creative_initiative:"Creative Initiative",motivation:"Motivation"},J=r=>{if(!r)return"DEVELOPING";const v=r.toUpperCase();return v==="HIGH"?"HIGH":v==="MODERATE"||v==="BALANCED"?"BALANCED":"DEVELOPING"};let L="";const H=Object.keys(l);H.length>0?L=H.map(r=>{const v=l[r],K=G[r]||r.replace(/_/g," ").toUpperCase(),T=J(v.sjt_band);return`
              <div style="background:#ffffff; border:1px solid var(--grid-border); padding:1rem; margin-bottom:0.75rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--grid-border); padding-bottom:0.5rem; margin-bottom:0.5rem;">
                  <span style="font-size:12px; font-weight:600; color:var(--text-primary);">${K}</span>
                  <span style="font-size:11px; font-weight:700; color:${T==="HIGH"?"#2e7d32":T==="BALANCED"?"#b5832a":"#555"}; letter-spacing:0.5px;">${T}</span>
                </div>
                <div style="font-size:11px; color:var(--text-secondary); line-height:1.5;">
                  ${window.escapeHtml(v.observed_behavior||"Behavioral trade-off indicator recorded during situational judgment scenarios.")}
                </div>
              </div>
            `}).join(""):L='<div style="padding:1rem; text-align:center; color:var(--text-secondary); font-size:11px; background:#fff; border:1px solid var(--grid-border);">Situational Judgment responses are currently being recorded for this session.</div>';const q=`
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">2. Seven Parameter Summary (Situational Judgment)</div>
            <div style="font-size:11px; background:rgba(189,111,93,0.08); border-left:3px solid var(--accent-gold); padding:0.75rem 1rem; margin-bottom:1rem; line-height:1.5; color:var(--text-primary);">
              <strong>Notice:</strong> Parameters are derived from Situational Judgment responses. These are provisional ipsative indicators, NOT standardized scores.
            </div>
            ${L}
          </div>
        `,k=c.filter(r=>!r.is_quarantined),U=k.find(r=>r.mini_game==="A1")||{value_raw:"—",label:"Attention to Detail (A1 Folio Sorting)"},Q=k.find(r=>r.mini_game==="A2")||{value_raw:"—",label:"Exception Handling (A2 Fragile Leaf)"},S=r=>r!=null&&typeof r=="number"?Number.isInteger(r)?r:r.toFixed(2):r||"—",W=`
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">3. Active Feature Extractors (2 of 21)</div>
            <div style="font-size:11px; background:#eef7f9; border-left:3px solid #3182ce; padding:0.75rem 1rem; margin-bottom:1rem; line-height:1.5; color:#1a365d;">
              <strong>Notice:</strong> Only A1 and A2 are active. The remaining 19 extractors are quarantined under Design Freeze v1.1 pending empirical calibration.
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              <div style="background:#ffffff; border:1px solid var(--grid-border); padding:1rem;">
                <div style="font-size:10px; font-family:monospace; color:var(--accent-gold); font-weight:600; text-transform:uppercase;">A1 · The Archive</div>
                <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin:2px 0 6px 0;">Attention to Detail (Sorting Precision)</div>
                <div style="font-size:11px; color:var(--text-secondary);">Raw Metric: <strong style="color:var(--text-primary);">${S(U.value_raw)}</strong></div>
                <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Observations: 5 classification trials · Status: ACTIVE</div>
              </div>
              <div style="background:#ffffff; border:1px solid var(--grid-border); padding:1rem;">
                <div style="font-size:10px; font-family:monospace; color:var(--accent-gold); font-weight:600; text-transform:uppercase;">A2 · The Archive</div>
                <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin:2px 0 6px 0;">Exception Handling (Fragile Foliar Review)</div>
                <div style="font-size:11px; color:var(--text-secondary);">Raw Metric: <strong style="color:var(--text-primary);">${S(Q.value_raw)}</strong></div>
                <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Observations: 4 exception trials · Status: ACTIVE</div>
              </div>
            </div>
          </div>
        `,N=c.filter(r=>r.is_quarantined);let P="";N.length>0&&(P=N.map(r=>`
            <tr style="border-bottom:1px solid var(--grid-border); font-size:11px;">
              <td style="padding:0.5rem; color:var(--text-primary); font-weight:500;">${r.world_name}</td>
              <td style="padding:0.5rem; font-family:monospace; color:var(--text-secondary);">${r.mini_game}</td>
              <td style="padding:0.5rem; color:var(--text-primary);">${r.label||r.feature_name}</td>
              <td style="padding:0.5rem; text-align:center;"><span style="font-size:9px; background:#f0eeea; color:#666; padding:2px 6px; border:1px solid var(--grid-border); font-weight:600; letter-spacing:0.5px;">QUARANTINED</span></td>
              <td style="padding:0.5rem; font-size:10px; color:var(--text-secondary); font-style:italic;">Awaiting calibration data (Design Freeze v1.1)</td>
            </tr>
          `).join(""));const Z=`
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">4. Quarantined Feature Extractors (19 of 21)</div>
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
                  ${P||'<tr><td colspan="5" style="padding:1rem; text-align:center; font-size:11px; color:var(--text-secondary);">Quarantine catalog synchronized under Design Freeze v1.1.</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        `;let M="";m.length>0&&(M=m.map(r=>`
            <tr style="border-bottom:1px solid var(--grid-border); font-size:11px;">
              <td style="padding:0.5rem; font-weight:500; color:var(--text-primary);">${window.escapeHtml(r.world_name||r.world_id)}</td>
              <td style="padding:0.5rem; color:var(--text-secondary);"><span style="font-family:monospace; font-size:10px; background:#f0eeea; padding:1px 4px; border-radius:2px; margin-right:4px;">${window.escapeHtml(r.game_id)}</span> ${window.escapeHtml(r.game_name||r.game_id)}</td>
              <td style="padding:0.5rem; color:var(--text-primary);">${window.escapeHtml(r.display_text)}</td>
              <td style="padding:0.5rem; text-align:right; font-family:monospace; font-size:10px; color:${r.status==="RECORDED"?"#2e7d32":"var(--text-secondary)"}; font-weight:600;">${r.status}</td>
            </tr>
          `).join(""));const Y=`
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.25rem;">5. 21-Game Descriptive Task Records</div>
            <p style="font-size:11px; color:var(--text-secondary); font-style:italic; margin-bottom:0.5rem;">${u}</p>
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
                  ${M||'<tr><td colspan="4" style="padding:1rem; text-align:center; font-size:11px; color:var(--text-secondary);">Task records will be logged upon game battery completion.</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        `,X=`
          <div style="margin-bottom:1.5rem; background:#faf8f5; border:1px solid var(--grid-border); padding:1.25rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.75rem;">6. Data Quality Flags & Telemetry Integrity</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; font-size:12px; margin-bottom:0.75rem;">
              <div><strong>Total Duration:</strong> ${I}</div>
              <div><strong>Raw Events Logged:</strong> ${j}</div>
              <div><strong>Throttling Rate:</strong> Normal (100ms slider limit active)</div>
              <div><strong>Integrity Status:</strong> Clean / Zero Critical Conflicts</div>
            </div>
            ${p.length>0?`
              <div style="margin-top:0.75rem; padding:0.75rem; background:#fff3e0; border:1px solid #ffe0b2; font-size:11px;">
                <strong style="color:#e65100; text-transform:uppercase;">Recorded Data Notices:</strong>
                <ul style="margin-top:0.25rem; margin-left:1.2rem; list-style-type:disc;">
                  ${p.map(r=>`<li><span style="font-family:monospace;">${r.scope}:</span> ${r.flag} (${r.detail||"Standard observation"})</li>`).join("")}
                </ul>
              </div>
            `:'<div style="font-size:11px; color:#2e7d32; font-weight:500;">✓ No data quality flags triggered. Zero telemetry loss detected.</div>'}
          </div>
        `;i.innerHTML=`
          ${V}
          ${q}
          ${W}
          ${Z}
          ${Y}
          ${X}
        `}catch(e){console.error("Candidate dossier load error:",e);const o=(e==null?void 0:e.message)||"Please check server connection.";i.innerHTML=`<div style="padding:2rem; text-align:center; color:var(--accent-red);">Failed to load candidate dossier.<br><span style="font-size:11px; color:var(--text-secondary); margin-top:6px; display:inline-block;">${window.escapeHtml(o)}</span><br><br><button class="action-btn gold" onclick="viewCandidateDossier('${t}')" style="font-size:11px; padding:0.5rem 1rem;">Retry</button></div>`}},window.switchTab("events")});
