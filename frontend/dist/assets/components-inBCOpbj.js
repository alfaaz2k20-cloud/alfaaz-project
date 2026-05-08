(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const i="https://alfaaz-project.onrender.com";window.refreshGlobalEffects=function(){window.lucide&&window.lucide.createIcons()};document.addEventListener("DOMContentLoaded",()=>{window.refreshGlobalEffects();const n=document.querySelector("alfaaz-nav nav");if(n){let e=window.scrollY;window.addEventListener("scroll",()=>{const a=window.scrollY;a>80?n.classList.add("scrolled"):n.classList.remove("scrolled"),a>e&&a>120?n.classList.add("hidden"):n.classList.remove("hidden"),e=a},{passive:!0})}});window.globalApiFetch=async function(n,e={}){const a=localStorage.getItem("alfaaz_token"),s={"Content-Type":"application/json"};a&&(s.Authorization=`Bearer ${a}`);try{const t=await fetch(`${i}${n}`,{...e,headers:{...s,...e.headers||{}}});return t.status===401||t.status===403?(localStorage.clear(),window.location.pathname.endsWith("login.html")||(window.location.href="login.html"),null):t}catch(t){throw console.error("API fetch error:",t),t}};(function(){function n(){const e=document.querySelectorAll(".ur-hover");e.length!==0&&setInterval(()=>{e.forEach((a,s)=>{setTimeout(()=>{a.classList.toggle("lang-swapped")},s*120)})},5e3)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()})();async function l(){try{await fetch(`${i}/`)}catch{}}l();setInterval(l,10*60*1e3);class c extends HTMLElement{constructor(){super(),this.isLoggedIn=!!localStorage.getItem("alfaaz_token")}connectedCallback(){this.render(),this.setupEvents(),this.updateActiveLinks()}render(){const e=this.isLoggedIn?"Dashboard":"Login / Register",a=this.isLoggedIn?"dashboard.html":"login.html";window.location.pathname.includes("/")&&!window.location.pathname.endsWith("index.html")&&window.location.pathname,this.innerHTML=`
      <nav id="navbar">
        <a href="index.html" class="logo ur-hover" data-ur="الفاظ">
          <span class="en-text">ALFAAZ</span>
        </a>
        
        <div class="nav-links" id="navLinks">
          <a href="index.html#home" class="ur-hover" data-ur="ابتداء"><span class="en-text">Home</span></a>
          <a href="index.html#updates" class="ur-hover" data-ur="اطلاع"><span class="en-text">Updates</span></a>
          <a href="blogs.html" class="ur-hover" data-ur="رسالہ"><span class="en-text">Journal</span></a>
          <a href="submit.html" class="ur-hover" data-ur="ذخیرہ"><span class="en-text">Storage</span></a>
          <a href="${a}" class="mobile-only-link ur-hover" data-ur="داخلہ"><span class="en-text">${e}</span></a>
        </div>

        <div class="nav-actions">
          <a href="${a}" id="navLoginBtn" class="nav-login">${e}</a>
          <a href="https://tchandervar.neocities.org" target="_blank" class="cta-btn" style="padding: 0.6rem 1.2rem; font-size: 10px;">Tchandervar</a>
          
          <button id="menuToggle" aria-label="Toggle menu" aria-expanded="false">
            <i data-lucide="menu" class="w-6 h-6 hamburger-open"></i>
            <i data-lucide="x" class="w-6 h-6 hamburger-close"></i>
          </button>
        </div>
      </nav>
    `}setupEvents(){const e=this.querySelector("#menuToggle"),a=this.querySelector("#navLinks");e==null||e.addEventListener("click",()=>{const s=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-expanded",!s),e.classList.toggle("active"),a.classList.toggle("active")}),window.lucide&&window.lucide.createIcons()}updateActiveLinks(){const e=window.location.pathname;this.querySelectorAll(".nav-links a").forEach(s=>{s.getAttribute("href")===e.split("/").pop()&&s.classList.add("active")})}}customElements.define("alfaaz-nav",c);
