import"./components-CvPhcI-e.js";/* empty css               */document.addEventListener("DOMContentLoaded",()=>{async function n(){const t=document.getElementById("blogContainer");if(t)try{const e=await window.globalApiFetch("/blogs/");if(!e||!e.ok)throw new Error(`Failed to fetch: ${e==null?void 0:e.status}`);const a=await e.json();if(!a.length){t.innerHTML='<div class="loading-state">The archives are currently empty.</div>';return}t.innerHTML=a.map(r=>`
                <a href="post.html?id=${r.id}" class="archive-card">
                    <span class="archive-meta">${new Date(r.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})} // Curator's Notes</span>
                    <h2 class="archive-title">${r.title}</h2>
                    <p class="archive-excerpt">${r.excerpt||""}</p>
                </a>`).join(""),window.refreshGlobalEffects&&window.refreshGlobalEffects()}catch(e){t.innerHTML='<div class="loading-state" style="color: var(--accent-red);">[Error] Archives unavailable.</div>',console.error("Blog Fetch Error:",e)}}n()});
