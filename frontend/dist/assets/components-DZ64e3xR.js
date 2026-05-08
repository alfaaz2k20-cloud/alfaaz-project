(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();const r="https://alfaaz-project.onrender.com";window.initMagnetic=function(){document.querySelectorAll(".magnetic").forEach(e=>{e.addEventListener("mousemove",function(n){const a=e.getBoundingClientRect(),t=n.clientX-a.left-a.width/2,i=n.clientY-a.top-a.height/2;e.style.transform=`translate(${t*.3}px, ${i*.3}px)`}),e.addEventListener("mouseleave",function(){e.style.transform="translate(0px, 0px)"})})};window.refreshGlobalEffects=function(){window.lucide&&window.lucide.createIcons(),window.initMagnetic()};document.addEventListener("DOMContentLoaded",()=>{window.refreshGlobalEffects();const s=document.querySelector("alfaaz-nav nav");if(s){let e=window.scrollY;window.addEventListener("scroll",()=>{const n=window.scrollY;n>80?s.classList.add("scrolled"):s.classList.remove("scrolled"),n>e&&n>120?s.classList.add("hidden"):s.classList.remove("hidden"),e=n},{passive:!0})}});window.globalApiFetch=async function(s,e={}){const n=localStorage.getItem("alfaaz_token"),a={"Content-Type":"application/json"};n&&(a.Authorization=`Bearer ${n}`);try{const t=await fetch(`${r}${s}`,{...e,headers:{...a,...e.headers||{}}});return t.status===401||t.status===403?(localStorage.clear(),window.location.pathname.endsWith("login.html")||(window.location.href="login.html"),null):t}catch(t){throw console.error("API fetch error:",t),t}};(function(){function s(){const e=document.querySelectorAll(".ur-hover");e.length!==0&&setInterval(()=>{e.forEach((n,a)=>{setTimeout(()=>{n.classList.toggle("lang-swapped")},a*120)})},5e3)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s):s()})();async function c(){try{await fetch(`${r}/`)}catch{}}c();setInterval(c,10*60*1e3);class l extends HTMLElement{constructor(){super(),this.isLoggedIn=!!localStorage.getItem("alfaaz_token")}connectedCallback(){this.render(),this.setupEvents(),this.updateActiveLinks()}render(){const e=this.isLoggedIn?"Dashboard":"Login / Register",n=this.isLoggedIn?"dashboard.html":"login.html";window.location.pathname.includes("/")&&!window.location.pathname.endsWith("index.html")&&window.location.pathname,this.innerHTML=`
      <nav id="navbar">
        <a href="index.html" class="logo magnetic ur-hover" data-ur="الفاظ">
          <span class="en-text">ALFAAZ</span>
        </a>
        
        <div class="nav-links" id="navLinks">
          <a href="index.html#home" class="magnetic ur-hover" data-ur="ابتداء"><span class="en-text">Home</span></a>
          <a href="index.html#updates" class="magnetic ur-hover" data-ur="اطلاع"><span class="en-text">Updates</span></a>
          <a href="blogs.html" class="magnetic ur-hover" data-ur="رسالہ"><span class="en-text">Journal</span></a>
          <a href="submit.html" class="magnetic ur-hover" data-ur="ذخیرہ"><span class="en-text">Storage</span></a>
          <a href="${n}" class="mobile-only-link magnetic ur-hover" data-ur="داخلہ"><span class="en-text">${e}</span></a>
        </div>

        <div class="nav-actions">
          <a href="${n}" id="navLoginBtn" class="nav-login magnetic">${e}</a>
          <a href="https://tchandervar.neocities.org" target="_blank" class="cta-btn magnetic" style="padding: 0.6rem 1.2rem; font-size: 10px;">Tchandervar</a>
          
          <button id="menuToggle" aria-label="Toggle menu" aria-expanded="false">
            <i data-lucide="menu" class="w-6 h-6 hamburger-open"></i>
            <i data-lucide="x" class="w-6 h-6 hamburger-close"></i>
          </button>
        </div>
      </nav>
    `}setupEvents(){const e=this.querySelector("#menuToggle"),n=this.querySelector("#navLinks");e==null||e.addEventListener("click",()=>{const a=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-expanded",!a),e.classList.toggle("active"),n.classList.toggle("active")}),window.lucide&&window.lucide.createIcons(),window.initMagnetic&&window.initMagnetic()}updateActiveLinks(){const e=window.location.pathname;this.querySelectorAll(".nav-links a").forEach(a=>{a.getAttribute("href")===e.split("/").pop()&&a.classList.add("active")})}}customElements.define("alfaaz-nav",l);
