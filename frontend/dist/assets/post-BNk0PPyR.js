import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",()=>{function o(e){const t=document.createElement("div");return t.innerHTML=e,t.querySelectorAll("script, iframe, object, embed, form").forEach(r=>r.remove()),t.innerHTML}async function a(){const e=document.getElementById("articleTarget"),t=new URLSearchParams(window.location.search).get("id");if(e){if(!t){e.innerHTML='<div class="loading-state" style="color:var(--accent-red);">[Error] Document ID missing.</div>';return}try{const r=await window.globalApiFetch(`/blogs/${t}`);if(!r||!r.ok)throw new Error("Article not found or server error.");const n=await r.json(),i=new Date(n.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});e.innerHTML=`
 <div class="post-header">
 <span class="post-meta">${i} // Curator's Notes</span>
 <h1 class="post-title">${window.escapeHtml(n.title)}</h1>
 </div>
 <div class="post-content">${o(n.content)}</div>
 `,document.title=`${n.title} | Alfaaz Archives`,window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch{e.innerHTML='<div class="loading-state" style="color:var(--accent-red);">[Error] Connection failed or article not found.</div>'}}}a()});
