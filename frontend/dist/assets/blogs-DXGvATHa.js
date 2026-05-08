import"./global-BnpDR9S0.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{const r=document.getElementById("blogContainer");try{const e=await fetch("https://alfaaz-project.onrender.com/blogs/");if(!e.ok)throw new Error(`Failed to fetch: ${e.status}`);const a=await e.json();if(!a.length){r.innerHTML='<div class="loading-state">The archives are currently empty.</div>';return}r.innerHTML=a.map(t=>`
          <a href="post.html?id=${t.id}" class="archive-card">
            <span class="archive-meta">${new Date(t.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})} // Curator's Notes</span>
            <h2 class="archive-title">${t.title}</h2>
            <p class="archive-excerpt">${t.excerpt||""}</p>
          </a>`).join(""),window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch(e){r.innerHTML='<div class="loading-state" style="color: var(--accent-red);">[Error] Archives unavailable.</div>',console.error("Blog Fetch Error:",e)}});
