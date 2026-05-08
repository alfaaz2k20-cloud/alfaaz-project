// post.js — Centralized Article Fetching Logic
document.addEventListener('DOMContentLoaded', () => {
    function sanitizeHTML(html) {
        const div = document.createElement('div'); 
        div.innerHTML = html;
        div.querySelectorAll('script, iframe, object, embed, form').forEach(el => el.remove());
        div.querySelectorAll('*').forEach(el => { 
            [...el.attributes].forEach(attr => { 
                if (attr.name.startsWith('on') || attr.name === 'href' && attr.value.startsWith('javascript:')) 
                    el.removeAttribute(attr.name); 
            }); 
        });
        return div.innerHTML;
    }

    async function loadArticle() {
        const target = document.getElementById('articleTarget');
        const articleId = new URLSearchParams(window.location.search).get('id');
        
        if (!target) return;

        if (!articleId) { 
            target.innerHTML = '<div class="loading-state" style="color:var(--accent-red);">[Error] Document ID missing.</div>'; 
            return; 
        }
        
        try {
            // Updated to fetch directly from the backend URL matching the new architecture
            const res = await fetch(`https://alfaaz-project.onrender.com/blogs/${articleId}`);
            if (!res.ok) throw new Error("Article not found or server error.");
            
            const article = await res.json();
            const dateStr = new Date(article.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            target.innerHTML = `
                <div class="post-header">
                    <span class="post-meta">${dateStr} // Curator's Notes</span>
                    <h1 class="post-title">${article.title}</h1>
                </div>
                <div class="post-content">${sanitizeHTML(article.content)}</div>
            `;
            document.title = `${article.title} | Alfaaz Archives`;
            
            if (window.refreshGlobalEffects) window.refreshGlobalEffects();
        } catch (error) { 
            target.innerHTML = '<div class="loading-state" style="color:var(--accent-red);">[Error] Connection failed or article not found.</div>'; 
        }
    }
    
    loadArticle();
});
