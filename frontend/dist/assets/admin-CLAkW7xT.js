import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",()=>{const I=localStorage.getItem("alfaaz_user");if(!I){window.location.href="login.html";return}let u;try{u=JSON.parse(I)}catch{localStorage.removeItem("alfaaz_user"),window.location.href="login.html";return}if(!u||u.status!=="ADMIN"){window.location.href="dashboard.html";return}const H=document.getElementById("logoutBtn");H&&H.addEventListener("click",()=>{localStorage.clear(),window.location.href="login.html"});const z={};window.switchTab=function(e){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-panel").forEach(t=>t.classList.remove("active"));const i=document.querySelector(`[onclick="switchTab('${e}')"]`);i&&i.classList.add("active");const n=document.getElementById(`tab-${e}`);n&&n.classList.add("active"),z[e]||(z[e]=!0,M(e))};function M(e){e==="events"&&window.loadEvents(),e==="exhibitions"&&(window.loadExhibitionManager(),window.loadExhibitionsData("ALL")),e==="clubs"&&window.loadClubs("ALL"),e==="roster"&&window.loadRoster(),e==="recruitment"&&window.loadRecruitment()}let w=[];window.loadEvents=async function(){const e=document.getElementById("eventsContainer");if(e)try{const i=await window.globalApiFetch("/admin/events");if(!i)return;if(w=await i.json(),!w.length){e.innerHTML='<div class="empty-state">No events found.</div>';return}e.innerHTML="",w.forEach(n=>{const t=document.createElement("div");t.className="data-card event-card";const a=n.registration_open,o=n.capacity===0?"∞":`${n.registered}/${n.capacity}`,s=window.escapeHtml(n.name),d=window.escapeHtml(n.description||"—"),l=window.escapeHtml(n.event_date||"—");t.innerHTML=`
            <div><div class="data-label">Event</div><div class="data-display">${s}</div><div style="font-size:11px; color:var(--text-secondary); margin-top: 4px;">${d}</div></div>
            <div><div class="data-label">Date</div><div class="data-display" style="font-size:12px;">${l}</div></div>
            <div><div class="data-label">Registered</div><div class="data-display">${o}</div></div>
            <div><div class="data-label">Status</div><span class="badge ${a?"badge-open":"badge-closed"}">${a?"Open":"Closed"}</span></div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              <button class="action-btn ${a?"":"gold"}" style="padding: 0.6rem; font-size:9px;" onclick="toggleEvent(${n.id}, this)">${a?"Close Registration":"Open Registration"}</button>
              <button class="action-btn gold" style="padding: 0.6rem; font-size:9px;" onclick="viewRegistrations(${n.id})">View List</button>
              <button class="action-btn" style="padding: 0.6rem; font-size:9px; border-color:var(--accent-red); color:var(--accent-red);" onclick="deleteEvent(${n.id}, '${s.replace(/'/g,"\\'")}', this)">Delete</button>
            </div>`,e.appendChild(t)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch{e.innerHTML='<div class="empty-state">Error loading events.</div>'}},window.handleCreateEvent=async function(){const e=document.getElementById("ev-name").value.trim(),i=document.getElementById("ev-date").value.trim(),n=parseInt(document.getElementById("ev-capacity").value)||0,t=document.getElementById("ev-desc").value.trim(),a=document.getElementById("ev-create-msg");if(!e)return;a.textContent="Creating...";const o=await window.globalApiFetch("/admin/events/create",{method:"POST",body:JSON.stringify({name:e,description:t,event_date:i,capacity:n})});o&&o.ok&&(a.textContent="✓ Created.",window.loadEvents())},window.toggleEvent=async function(e,i){i.textContent="...";const n=await window.globalApiFetch(`/admin/events/${e}/toggle`,{method:"PATCH"});n&&n.ok&&window.loadEvents()},window.deleteEvent=async function(e,i,n){if(!confirm(`Delete ${i}?`))return;n.textContent="...";const t=await window.globalApiFetch(`/admin/events/${e}`,{method:"DELETE"});t&&t.ok&&window.loadEvents()},window.viewRegistrations=async function(e){const i=w.find(o=>o.id===e);document.getElementById("modalTitle").textContent=i.name,document.getElementById("modalBody").innerHTML="Loading...",document.getElementById("regModal").classList.add("open");const n=await window.globalApiFetch(`/admin/events/${e}/registrations`);if(!n)return;const t=await n.json();let a=`<div style="font-size:12px; margin-bottom:1.5rem; color:var(--accent-gold); font-weight:600; letter-spacing: 1px; text-transform: uppercase;">Total Approved: ${t.registrations.length}</div>`;t.registrations.forEach((o,s)=>{const d=window.escapeHtml(o.email),l=o.whatsapp?"WA: "+window.escapeHtml(o.whatsapp):"No WA provided";a+=`<div style="padding:1rem 0; border-bottom:1px solid var(--grid-border); font-size:13px; display:flex; justify-content:space-between; align-items: center;"><span><strong style="color: var(--accent-gold); margin-right: 10px;">${s+1}.</strong> ${d}</span><span style="color:var(--text-primary); font-size: 11px; background: var(--bg-primary); padding: 4px 10px; border-radius: 2px;">${l}</span></div>`}),document.getElementById("modalBody").innerHTML=a||'<div class="empty-state">No registrations.</div>'},window.closeModal=function(){document.getElementById("regModal").classList.remove("open")};let y=[],x="ALL",g="ALL";window.loadExhibitionManager=async function(){const e=await window.globalApiFetch("/admin/exhibitions/list");if(!e||!e.ok)return;const i=await e.json(),n=document.getElementById("exhibitionListContainer"),t=document.getElementById("portalLiveStatus");if(!n)return;n.innerHTML="";const a=i.find(o=>o.is_active);if(a?t.innerHTML=`Currently Live: <strong style="color: var(--accent-green);">${window.escapeHtml(a.title)}</strong>`:t.innerHTML='<strong style="color: var(--accent-red);">CLOSED</strong> (No active exhibition)',i.length===0){n.innerHTML='<div style="font-size: 12px; color: var(--text-secondary);">No exhibitions created yet.</div>';return}i.forEach(o=>{const s=document.createElement("div");s.style.cssText=`border: 1px solid ${o.is_active?"var(--accent-gold)":"var(--grid-border)"}; padding: 1.5rem; background: ${o.is_active?"var(--bg-primary)":"transparent"}; transition: all 0.3s;`;const d=o.is_active?'<span style="font-size: 9px; padding: 3px 8px; background: var(--accent-gold); color: #fff; letter-spacing: 1px; text-transform: uppercase;">Live Now</span>':'<span style="font-size: 9px; padding: 3px 8px; border: 1px solid var(--grid-border); color: var(--text-secondary); letter-spacing: 1px; text-transform: uppercase;">Inactive</span>',l=window.escapeHtml(o.title),v=window.escapeHtml(o.date_text),f=o.is_active?'<button disabled style="font-family: var(--font-body); font-size: 10px; text-transform: uppercase; letter-spacing: 1px; padding: 0.5rem 1rem; background: transparent; border: 1px solid var(--grid-border); color: var(--text-secondary); cursor: not-allowed;">Currently Active</button>':`<button onclick="activateExhibition(${o.id}, '${l.replace(/'/g,"\\'")}')" class="action-btn gold" style="padding: 0.5rem 1rem; font-size: 10px;">Set as Live</button>`;s.innerHTML=`
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div>
              <div style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--text-primary); margin-bottom: 0.2rem;">${l}</div>
              <div style="font-size: 11px; color: var(--text-secondary);">${v}</div>
            </div>
            ${d}
          </div>
          <div>${f}</div>
        `,n.appendChild(s)})},window.createNewExhibition=async function(){const e=document.querySelector('button[onclick="createNewExhibition()"]'),i=document.getElementById("createExMsg"),n={title:document.getElementById("newExTitle").value.trim(),date_text:document.getElementById("newExDate").value.trim(),venue:document.getElementById("newExVenue").value.trim(),about_text:document.getElementById("newExDesc").value.trim(),tnc_pdf_url:document.getElementById("newExTnc").value.trim(),registration_fee:document.getElementById("newExFee").value.trim(),payment_qr_url:document.getElementById("newExQr").value.trim(),payment_instructions:document.getElementById("newExPayInst").value.trim()};if(!n.title||!n.date_text||!n.venue){i.textContent="Title, Dates, and Venue are required.",i.style.color="var(--accent-red)";return}e.textContent="Creating...",e.disabled=!0;const t=await window.globalApiFetch("/admin/exhibitions/create",{method:"POST",body:JSON.stringify(n)});t&&t.ok?(i.textContent="✓ Exhibition Created!",i.style.color="var(--accent-green)",document.querySelectorAll("#newExTitle, #newExDate, #newExVenue, #newExDesc, #newExTnc, #newExFee, #newExQr, #newExPayInst").forEach(a=>a.value=""),await window.loadExhibitionManager()):(i.textContent="Failed to create. Title might already exist.",i.style.color="var(--accent-red)"),e.textContent="Create Exhibition",e.disabled=!1,setTimeout(()=>i.textContent="",4e3)},window.activateExhibition=async function(e,i){if(!confirm(`Are you sure you want to make "${i}" the live exhibition on the public portal?`))return;const n=await window.globalApiFetch(`/admin/exhibitions/${e}/activate`,{method:"PATCH"});n&&n.ok?(await window.loadExhibitionManager(),await window.loadExhibitionsData("ALL")):alert("Failed to activate exhibition.")},window.deactivateAllExhibitions=async function(){if(!confirm("Are you sure you want to CLOSE the exhibition portal? The public will not be able to apply until you set a cycle to live."))return;const e=await window.globalApiFetch("/admin/exhibitions/deactivate-all",{method:"PATCH"});e&&e.ok?(await window.loadExhibitionManager(),alert("Portal successfully closed.")):alert("Failed to close portal.")};async function B(){const e=await window.globalApiFetch("/admin/exhibitions/cycles");if(!e||!e.ok)return;const{cycles:i,current:n}=await e.json(),t=document.getElementById("cycleSelectWrap");if(!t)return;let a=`<option value="">Active Now: ${n||"None"}</option>`;i.forEach(s=>{s!==n&&(a+=`<option value="${s}">${s}</option>`)}),a+='<option value="ALL">— All Archive —</option>',t.innerHTML=`
        <label style="font-size:10px;color:var(--text-secondary);text-transform:uppercase;letter-spacing:1px;margin-right:0.8rem;">Viewing Cycle:</label>
        <select id="cycleSelect" style="background:transparent;border:none;border-bottom:1px solid var(--grid-border);color:var(--text-primary);font-family:var(--font-body);font-size:12px;padding:0.4rem 0;outline:none;">
          ${a}
        </select>`;const o=document.getElementById("cycleSelect");o.value=g,o.addEventListener("change",async s=>{g=s.target.value;const d=g?`?cycle=${encodeURIComponent(g)}`:"",l=await window.globalApiFetch(`/admin/exhibitions${d}`);l&&l.ok&&(y=await l.json(),window.filterExhibitions("ALL"))})}window.loadExhibitionsData=async function(e){g="ALL";const i=await window.globalApiFetch("/admin/exhibitions?cycle=ALL");i&&(y=await i.json(),await B(),window.renderExhibitions(e))};const h=e=>e.registration_status==="SUBMITTED"||e.registration_status==="CONFIRMED"||!!e.payment_proof_url,P=e=>e.registration_status==="CONFIRMED"?"CONFIRMED":h(e)?"PAYMENT SUBMITTED":e.status;window.filterExhibitions=function(e){x=e,document.querySelectorAll('[id^="filt-"]').forEach(n=>n.classList.remove("gold"));const i=document.getElementById(`filt-${e}`);i&&i.classList.add("gold"),window.renderExhibitions(e)},window.renderExhibitions=function(e){const i=document.getElementById("exhibitionsContainer"),n=e==="ALL"?y:y.filter(t=>e==="FINALIZED"?h(t):e==="APPROVED"?t.status==="APPROVED"&&!h(t):t.status===e);if(i.innerHTML="",!n.length){i.innerHTML='<div class="empty-state">No portfolios found.</div>';return}n.forEach(t=>{const a=document.createElement("div");a.className="data-card exhib-card";const o=P(t),s=t.status==="PENDING"?"badge-pending":t.status==="APPROVED"?"badge-approved":"badge-rejected";let d=`<a href="${t.portfolio_url}" target="_blank" class="action-btn gold" style="padding:0.6rem;font-size:9px;text-align:center;">View Portfolio</a>`;t.status==="PENDING"?d+=`
            <button class="action-btn" style="padding:0.6rem;font-size:9px;" onclick="reviewExhibition(${t.id},'APPROVED',this)">Approve</button>
            <button class="action-btn" style="padding:0.6rem;font-size:9px;border-color:var(--accent-red);color:var(--accent-red);" onclick="reviewExhibition(${t.id},'REJECTED',this)">Reject</button>`:t.status==="REJECTED"&&(d+=`<button class="action-btn" style="padding:0.6rem;font-size:9px;" onclick="revertExhibition(${t.id},this)">Undo Rejection</button>`),t.payment_proof_url&&(d+=`<a href="${t.payment_proof_url}" target="_blank" class="action-btn" style="padding:0.6rem;font-size:9px;border-color:var(--accent-green);color:var(--accent-green);text-align:center;margin-top:0.5rem;">View Payment Receipt</a>`),t.registration_status==="SUBMITTED"&&(d+=`<button class="action-btn gold" style="padding:0.6rem;font-size:9px;" onclick="confirmExhibitionPayment(${t.id},this)">Confirm Payment</button>`);const v=`<div style="font-size:10px; margin-top:6px; color:var(--accent-gold); letter-spacing:1.5px; text-transform:uppercase; font-weight:600;">CYCLE: ${window.escapeHtml(t.exhibition_cycle?t.exhibition_cycle:"LEGACY ARCHIVE")}</div>`,f=window.escapeHtml(t.full_name),$=window.escapeHtml(t.user_email),C=window.escapeHtml(t.genre),b=window.escapeHtml(t.medium);a.innerHTML=`
          <div>
            <div class="data-label">Artist</div>
            <div class="data-display">${f}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">${$}</div>
            ${v}
          </div>
          <div>
            <div class="data-label">Art Profile</div>
            <div class="data-display" style="font-size:13px;">${C}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">Medium: ${b}</div>
          </div>
          <div><div class="data-label">Status</div><span class="badge ${s}">${o}</span></div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;">${d}</div>`,i.appendChild(a)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()},window.reviewExhibition=async function(e,i,n){const t=prompt("Curator Note to Artist (optional):");n.textContent="...",n.disabled=!0;const a=await window.globalApiFetch("/admin/exhibitions/review",{method:"POST",body:JSON.stringify({application_id:e,status:i,curator_note:t||null})});a&&a.ok?(await window.loadExhibitionsData("ALL"),window.filterExhibitions(x)):(n.textContent=i==="APPROVED"?"Approve":"Reject",n.disabled=!1)},window.revertExhibition=async function(e,i){if(!confirm("Undo rejection and return to Pending?"))return;i.textContent="...",i.disabled=!0;const n=await window.globalApiFetch(`/admin/exhibitions/${e}/revert`,{method:"PATCH"});n&&n.ok?(await window.loadExhibitionsData("ALL"),window.filterExhibitions(x)):(i.textContent="Undo Rejection",i.disabled=!1)},window.confirmExhibitionPayment=async function(e,i){if(!confirm("Confirm this payment? This will notify the artist."))return;i.textContent="...",i.disabled=!0;const n=await window.globalApiFetch(`/admin/exhibitions/${e}/confirm-payment`,{method:"PATCH"});n&&n.ok?(await window.loadExhibitionsData("ALL"),window.filterExhibitions("FINALIZED")):(i.textContent="Confirm Payment",i.disabled=!1)};let E=[];window.loadClubs=async function(e){const i=await window.globalApiFetch("/admin/club-applications");i&&(E=await i.json(),window.renderClubs(e))},window.filterClubs=function(e){document.querySelectorAll('[id^="filter-"]').forEach(n=>{n.classList.remove("gold"),n.style.color="",n.style.borderColor=""});const i=document.getElementById(`filter-${e}`);i&&i.classList.add("gold"),window.renderClubs(e)},window.renderClubs=function(e){const i=document.getElementById("clubsContainer"),n=e==="ALL"?E:E.filter(t=>t.status===e);if(i.innerHTML="",!n.length){i.innerHTML='<div class="empty-state">No applications found.</div>';return}n.forEach(t=>{const a=document.createElement("div");a.className="data-card club-card";const o=t.status==="PENDING"?"badge-pending":t.status==="APPROVED"?"badge-approved":"badge-rejected",s=window.escapeHtml(t.user_email),d=window.escapeHtml(t.club_name);a.innerHTML=`
          <div><div class="data-label">User</div><div class="data-display">${s}</div></div>
          <div><div class="data-label">Club</div><div class="data-display">${d}</div></div>
          <div><div class="data-label">Status</div><span class="badge ${o}">${t.status}</span></div>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${t.status==="PENDING"?`<button class="action-btn" style="padding:0.6rem; font-size:9px;" onclick="reviewClub(${t.id}, 'APPROVED', this)">Approve</button><button class="action-btn" style="padding:0.6rem; font-size:9px; border-color:var(--accent-red); color:var(--accent-red);" onclick="reviewClub(${t.id}, 'REJECTED', this)">Reject</button>`:""}
          ${t.status==="REJECTED"?`<button class="action-btn" style="padding:0.6rem; font-size:9px;" onclick="revertClub(${t.id}, this)">Undo</button>`:""}
          </div>`,i.appendChild(a)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()},window.reviewClub=async function(e,i,n){const t=i==="REJECTED"?prompt("Note:"):null;n.textContent="...";const a=await window.globalApiFetch("/admin/club-applications/review",{method:"POST",body:JSON.stringify({application_id:e,status:i,admin_note:t})});a&&a.ok&&window.loadClubs("ALL")},window.revertClub=async function(e,i){if(!confirm("Undo rejection?"))return;i.textContent="...",i.disabled=!0;const n=await window.globalApiFetch(`/admin/club-applications/${e}/revert`,{method:"PATCH"});n&&n.ok&&(window.loadClubs("ALL"),window.filterClubs("ALL"))},window.loadRoster=async function(){const e=document.getElementById("rosterContainer"),i=await window.globalApiFetch("/admin/users");if(!i)return;const n=await i.json();e.innerHTML="",n.forEach((t,a)=>{const o=document.createElement("div");o.className="data-card user-card";const s=window.escapeHtml(t.email);o.innerHTML=`
          <div><div class="data-label">User</div><div class="data-display">${s}</div></div>
          <div><div class="data-label">Role</div><select id="st-${a}" style="margin:0;"><option value="PARTICIPANT" ${t.status==="PARTICIPANT"?"selected":""}>Participant</option><option value="ADMIN" ${t.status==="ADMIN"?"selected":""}>Admin</option></select></div>
          <button class="action-btn gold" style="padding:0.8rem; font-size:9px;" onclick="updateStatus('${t.email}', ${a}, this)">Save Role</button>`,e.appendChild(o)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()},window.updateStatus=async function(e,i,n){const t=document.getElementById(`st-${i}`).value;n.textContent="...";const a=await window.globalApiFetch("/admin/update_status",{method:"POST",body:JSON.stringify({email:e,status:t})});a&&a.ok&&(e===u.email&&t==="PARTICIPANT"&&(localStorage.clear(),window.location.href="login.html"),n.textContent="✓",setTimeout(()=>n.textContent="Save Role",2e3))},window.loadRecruitment=async function(){const e=document.getElementById("recruitmentContainer");if(e){e.innerHTML='<div class="empty-state">Loading candidate records...</div>';try{const i=await window.globalApiFetch("/recruit/research/sessions");if(!i)return;const n=await i.json();if(!n||!n.length){e.innerHTML='<div class="empty-state">No recruitment assessment sessions found in registry.</div>';return}e.innerHTML="",n.forEach(t=>{const a=document.createElement("div");a.className="data-card user-card";const o=window.escapeHtml(t.full_name||"Anonymous Applicant"),s=window.escapeHtml(t.email||"—"),d=t.created_at?new Date(t.created_at).toLocaleString():"—";a.innerHTML=`
            <div>
              <div class="data-label">Candidate</div>
              <div class="data-display" style="font-weight: 500;">${o}</div>
              <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">${s} · <span style="font-family:monospace; font-size:10px;">${t.session_id.slice(0,8)}...</span></div>
            </div>
            <div>
              <div class="data-label">Submitted</div>
              <div class="data-display" style="font-size:12px;">${d}</div>
              <span class="badge ${t.status==="COMPLETE"?"badge-approved":"badge-pending"}" style="margin-top:6px;">${t.status}</span>
            </div>
            <div style="display:flex; justify-content:flex-end;">
              <button class="action-btn gold" style="padding:0.8rem 1.2rem; font-size:10px;" onclick="viewCandidateDossier('${t.session_id}')">
                Inspect Dossier &rarr;
              </button>
            </div>
          `,e.appendChild(a)}),window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch{e.innerHTML='<div class="empty-state">Error loading recruitment sessions.</div>'}}},window.viewCandidateDossier=async function(e){var n;document.getElementById("modalTitle").textContent="Candidate Evidence Dossier";const i=document.getElementById("modalBody");i.innerHTML=`
        <div style="padding: 3rem 1rem; text-align: center; color: var(--text-secondary);">
          <div class="w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-3" style="width:28px; height:28px; border-radius:50%; border:2px solid var(--accent-gold); border-top-color:transparent; animation: spin 1s linear infinite; margin: 0 auto 12px auto;"></div>
          <div style="font-size: 13px; font-family: var(--font-heading);">Retrieving Candidate Dossier...</div>
          <div style="font-size: 11px; margin-top: 4px;">Loading telemetry records from research registry.</div>
        </div>
      `,document.getElementById("regModal").classList.add("open");try{const t=await window.globalApiFetch(`/recruit/research/session/${e}`);if(!t){i.innerHTML='<div style="padding:2rem; text-align:center; color:var(--accent-red);">Session expired or network error. Please refresh and try again.</div>';return}const a=await t.json();if(!t.ok){i.innerHTML=`<div style="padding:2rem; text-align:center; color:var(--accent-red); font-size:13px;">Error loading dossier: ${window.escapeHtml(a.detail||"Server error")}</div>`;return}const o=a.metadata||{},s=o.applicant||{},d=a.evidence_by_parameter||{},l=a.features||[],v=a.data_quality_flags||[],f=window.escapeHtml(s.full_name||"Candidate"),$=window.escapeHtml(s.email||"—"),C=o.created_at?new Date(o.created_at).toLocaleString():"—",b=o.status||"ACTIVE";document.getElementById("modalTitle").textContent=`${f} — Assessment Dossier`;let L="";const k=Object.keys(d);k.length>0?L=k.map(c=>{const r=d[c],m=c.replace(/_/g," ").toUpperCase(),p=r.random_responder_reference||{};return`
              <div style="background:#faf8f5; border:1px solid var(--grid-border); padding:1.25rem; margin-bottom:1rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--grid-border); padding-bottom:0.5rem; margin-bottom:0.75rem;">
                  <span style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--text-primary);">${m}</span>
                  <span style="font-size:11px; font-weight:600; color:var(--accent-gold); text-transform:uppercase;">SJT Band: ${r.sjt_band||"UNAVAILABLE"}</span>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; font-size:11px; color:var(--text-secondary); margin-bottom:0.5rem;">
                  <div>
                    <div>Raw Score: <strong style="color:var(--text-primary);">${r.sjt_raw!==null&&r.sjt_raw!==void 0?r.sjt_raw:"—"}</strong> / ${r.sjt_max||12} (Span: ${r.sjt_span||12})</div>
                    <div style="font-size:10px; margin-top:2px;">Random Baseline: L: ${p.LOW||"—"} · M: ${p.MODERATE||"—"} · H: ${p.HIGH||"—"}</div>
                  </div>
                  <div>
                    <div>Game Activity Status: <strong style="color:${r.game_status==="OBSERVED"?"var(--accent-green, green)":"var(--text-primary)"};">${r.game_status||"UNCALIBRATED"}</strong></div>
                    <div>Evidence Confidence: <strong style="color:var(--text-primary);">${r.confidence||"LIMITED"}</strong></div>
                  </div>
                </div>
                <div style="font-size:11px; color:var(--text-primary); border-top:1px dashed var(--grid-border); margin-top:0.5rem; padding-top:0.5rem;">
                  <em>Observation:</em> ${window.escapeHtml(r.observed_behavior||"Awaiting assessment activity.")}
                </div>
              </div>
            `}).join(""):L=`
            <div style="padding: 1.5rem; background: #faf8f5; border: 1px solid var(--grid-border); text-align: center; color: var(--text-secondary); font-size: 11px;">
              SJT responses are currently being recorded for this session.
            </div>
          `;let A="";if(l.length>0){const c=l.map(r=>{const m=r.flags&&r.flags.includes("feature_not_implemented")||r.display_value==="Not implemented"||r.value_raw===null,p=m?"Not implemented":typeof r.value_raw=="number"?Number.isInteger(r.value_raw)?r.value_raw:r.value_raw.toFixed(2):r.value_raw||"—",T=m?"INSUFFICIENT":r.valid?"VALID":"FLAGGED",_=m?"var(--text-secondary, #666)":r.valid?"var(--accent-green, #2e7d32)":"var(--accent-red, #c62828)";return`
              <tr style="border-bottom: 1px solid var(--grid-border);">
                <td style="padding: 0.6rem 0.5rem; font-size: 11px; font-weight: 500; color: var(--text-primary);">${r.world_name||"—"}</td>
                <td style="padding: 0.6rem 0.5rem; font-size: 11px; color: var(--text-secondary);"><span style="font-family:monospace; font-size:10px; background:#f0eeea; padding:1px 4px; border-radius:2px; margin-right:4px;">${r.mini_game}</span> ${r.task_title||r.mini_game}</td>
                <td style="padding: 0.6rem 0.5rem; font-size: 11px; color: var(--text-primary);">${r.label||r.feature_name}</td>
                <td style="padding: 0.6rem 0.5rem; font-size: 11px; font-weight: ${m?"normal":"600"}; text-align: right; color: ${m?"var(--text-secondary)":"var(--accent-gold)"}; font-style: ${m?"italic":"normal"};">${p}</td>
                <td style="padding: 0.6rem 0.5rem; font-size: 10px; text-align: right;"><span style="color: ${_}; font-weight:600;">${T}</span></td>
              </tr>
            `}).join("");A=`
            <div style="margin-top: 2rem;">
              <h4 style="font-family:var(--font-heading); font-size:1.3rem; margin-bottom:0.75rem; color:var(--text-primary);">Interactive Mini-Game Telemetry (${l.length} Metrics Extracted)</h4>
              <div style="overflow-x: auto; border: 1px solid var(--grid-border); background: #faf8f5;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                  <thead>
                    <tr style="background: #f0eeea; border-bottom: 1px solid var(--grid-border); font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary);">
                      <th style="padding: 0.6rem 0.5rem;">World</th>
                      <th style="padding: 0.6rem 0.5rem;">Interactive Task</th>
                      <th style="padding: 0.6rem 0.5rem;">Extracted Behavioral Metric</th>
                      <th style="padding: 0.6rem 0.5rem; text-align: right;">Observed Value</th>
                      <th style="padding: 0.6rem 0.5rem; text-align: right;">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${c}
                  </tbody>
                </table>
              </div>
            </div>
          `}else A=`
            <div style="margin-top: 2rem; padding: 1.5rem; background: #faf8f5; border: 1px solid var(--grid-border); text-align: center; color: var(--text-secondary); font-size: 11px;">
              Interactive mini-game telemetry features will be extracted upon game battery submission.
            </div>
          `;let D="";v.length>0&&(D=`
            <div style="margin-top: 1.5rem; padding: 1rem; background: #fff3e0; border: 1px solid #ffe0b2; font-size: 11px;">
              <strong style="color: #e65100; text-transform: uppercase; letter-spacing: 1px;">Data Quality Notices:</strong>
              <ul style="margin-top: 0.5rem; margin-left: 1.2rem; list-style-type: disc;">
                ${v.map(c=>`<li><strong style="font-family:monospace;">${c.scope}:</strong> ${c.flag} (${c.detail||"Standard observation"})</li>`).join("")}
              </ul>
            </div>
          `);const S=a.task_records||[],R=a.task_records_statement||"Descriptive task counts; not a score, not norm-referenced, and not a basis for automated decisions.";let N="";if(S.length>0){const c=S.map(r=>{const m=window.escapeHtml(r.world_name||r.world_id),p=window.escapeHtml(r.game_name||r.game_id),T=window.escapeHtml(r.display_text),_=window.escapeHtml(r.game_id),F=r.status;return`
              <tr style="border-bottom: 1px solid var(--grid-border);">
                <td style="padding: 0.6rem 0.5rem; font-size: 11px; font-weight: 500; color: var(--text-primary);">${m}</td>
                <td style="padding: 0.6rem 0.5rem; font-size: 11px; color: var(--text-secondary);"><span style="font-family:monospace; font-size:10px; background:#f0eeea; padding:1px 4px; border-radius:2px; margin-right:4px;">${_}</span> ${p}</td>
                <td style="padding: 0.6rem 0.5rem; font-size: 11px; color: var(--text-primary);">${T}</td>
                <td style="padding: 0.6rem 0.5rem; font-size: 10px; text-align: right; font-family: monospace; color: var(--text-secondary);">${F}</td>
              </tr>
            `}).join("");N=`
            <div style="margin-top: 2rem;">
              <h4 style="font-family:var(--font-heading); font-size:1.3rem; margin-bottom:0.35rem; color:var(--text-primary);">Task record (descriptive)</h4>
              <p style="font-size:11px; color:var(--text-secondary); font-style:italic; margin-bottom:0.75rem;">${R}</p>
              <div style="overflow-x: auto; border: 1px solid var(--grid-border); background: #faf8f5;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                  <thead>
                    <tr style="background: #f0eeea; border-bottom: 1px solid var(--grid-border); font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary);">
                      <th style="padding: 0.6rem 0.5rem;">World</th>
                      <th style="padding: 0.6rem 0.5rem;">Interactive Task</th>
                      <th style="padding: 0.6rem 0.5rem;">Factual Task Observation</th>
                      <th style="padding: 0.6rem 0.5rem; text-align: right;">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${c}
                  </tbody>
                </table>
              </div>
            </div>
          `}i.innerHTML=`
          <div style="font-size:12px; margin-bottom:1.5rem; background:rgba(189,111,93,0.08); border:1px solid var(--accent-gold); padding:1rem; line-height:1.6;">
            <strong>Safeguard Note:</strong> ${((n=o.safeguards)==null?void 0:n.banner)||"Research evidence view. Not for automated selection decisions."} Scores reflect forced-choice trade-offs in scenario judgment and behavioral task observations.
          </div>
          <div style="margin-bottom:1.5rem; font-size:12px; display:flex; justify-content:space-between; border-bottom:1px solid var(--grid-border); padding-bottom:1rem;">
            <div>
              <div><strong>Email:</strong> ${$}</div>
              <div><strong>Session ID:</strong> <span style="font-family:monospace; font-size:10px;">${e}</span></div>
            </div>
            <div style="text-align:right;">
              <div><strong>Status:</strong> <span class="badge ${b==="COMPLETE"?"badge-approved":"badge-pending"}">${b}</span></div>
              <div style="margin-top: 4px;"><strong>Date:</strong> ${C}</div>
            </div>
          </div>
          <div>
            <h4 style="font-family:var(--font-heading); font-size:1.3rem; margin-bottom:1rem; color:var(--text-primary);">Evaluated Parameters (7)</h4>
            ${L}
          </div>
          ${N}
          ${A}
          ${D}
        `}catch(t){console.error("Candidate dossier load error:",t),i.innerHTML='<div style="padding:2rem; text-align:center; color:var(--accent-red);">Failed to load candidate dossier. Please check server connection.</div>'}},window.switchTab("events")});
