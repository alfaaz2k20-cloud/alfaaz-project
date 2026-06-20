import"./global-CjxeOYmg.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{function a(t){const e=document.createElement("div");return e.innerHTML=t,e.querySelectorAll("script, iframe, object, embed, form").forEach(r=>r.remove()),e.innerHTML}const n=document.getElementById("articleTarget"),o=new URLSearchParams(window.location.search).get("id");if(!o){n.innerHTML='<div class="loading-state" style="color:var(--accent-red);">[Error] Document ID missing.</div>';return}try{const t=await window.globalApiFetch(`/blogs/${o}`);if(!t||!t.ok)throw new Error("Article not found.");const e=await t.json(),r=new Date(e.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});n.innerHTML=`
                <div class="post-header">
                    <span class="post-meta">${r} // Curator's Notes</span>
                    <h1 class="post-title">${e.title}</h1>
                </div>
                <div class="post-content">${a(e.content)}</div>
            `,document.title=`${e.title} | Alfaaz Collective`,window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch{n.innerHTML='<div class="loading-state" style="color:var(--accent-red);">[Error] Connection failed.</div>'}});
