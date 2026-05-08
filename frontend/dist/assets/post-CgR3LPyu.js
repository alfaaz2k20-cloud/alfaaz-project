import"./global-BnpDR9S0.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{function a(t){const e=document.createElement("div");return e.innerHTML=t,e.querySelectorAll("script, iframe, object, embed, form").forEach(n=>n.remove()),e.innerHTML}const r=document.getElementById("articleTarget"),o=new URLSearchParams(window.location.search).get("id");if(!o){r.innerHTML='<div class="loading-state" style="color:var(--accent-red);">[Error] Document ID missing.</div>';return}try{const t=await fetch(`https://alfaaz-project.onrender.com/blogs/${o}`);if(!t.ok)throw new Error("Article not found.");const e=await t.json(),n=new Date(e.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});r.innerHTML=`
                <div class="post-header">
                    <span class="post-meta">${n} // Curator's Notes</span>
                    <h1 class="post-title">${e.title}</h1>
                </div>
                <div class="post-content">${a(e.content)}</div>
            `,document.title=`${e.title} | Alfaaz Collective`,window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch{r.innerHTML='<div class="loading-state" style="color:var(--accent-red);">[Error] Connection failed.</div>'}});
