var l=class extends HTMLElement{loading=null;config=JSON.parse(localStorage.getItem("csa-page-wrapper-settings"));constructor(){super(),this.load(sessionStorage.getItem("csa-lastPage")||this.getAttribute("csa-default-page")),this.getAttribute("csa-default-page")||console.warn(`DEFAULT_PAGE_UNDEFINED${this.id&&` on #${this.id}`}. This could result in pages not loading by default, only if navigated manually.`)}async load(s){try{this.innerHTML=await(await fetch(s)).text()}catch{}new n().set(),sessionStorage.setItem("csa-lastPage",s)}},u=class extends HTMLElement{constructor(){super();let scripts=this.querySelectorAll("script");scripts.forEach(e=>{eval(c(e.innerHTML))})}};var d=class extends HTMLElement{start_url=sessionStorage.getItem("csa-lastTab")||this.getAttribute("csa-default-tab");constructor(){super(),this.getAttribute("csa-default-tab")||console.warn(`DEFAULT_TAB_UNDEFINED${this.id&&` on #${this.id}`}. This could result in tabs not loading by default, only if navigated manually.`)}async change(target){let target_tab=this.querySelector(`csa-tab[name="${target}"]`);if(target_tab&&!target_tab.executed){let executeable=target_tab.querySelector("script[csa-execute]")?.innerHTML;executeable&&eval(c(executeable)),target_tab.executed=!0}let reexecuteable=target_tab?.querySelector("script[csa-reexecute]")?.innerHTML;reexecuteable&&eval(c(reexecuteable)),this.querySelectorAll("csa-tab").forEach(t=>{t&&t==target_tab?(t.setAttribute("csa-tab-active","true"),t.hidden=!1):t&&(t.setAttribute("csa-tab-active","false"),t.hidden=!0)}),sessionStorage.setItem("csa-lastTab",target_tab?.getAttribute("name")),new n().set()}},p=class extends HTMLElement{executed=!1;constructor(){super(),this.hidden=!0}async connectedCallback(){if(this.getAttribute("src")&&!this.getAttribute("csa-tab-lazy")){let t=await(await fetch(this.getAttribute("src"))).text();this.outerHTML=t}this.getAttribute("name")==document.querySelector("csa-tab-wrapper").start_url&&document.querySelector("csa-tab-wrapper").change(this.getAttribute("name"));let executeable=this.querySelector("script[csa-execute][csa-tab-init]")?.innerHTML,reexecuteable=this.querySelector("script[csa-reexecute][csa-tab-init]")?.innerHTML;executeable&&eval(c(executeable)),reexecuteable&&eval(c(reexecuteable))}};var n=class{config=JSON.parse(localStorage.getItem("csa-title-settings"));set(){let s=document.querySelector("csa-page")?.getAttribute("csa-title"),a=document.querySelector('csa-tab[csa-tab-active="true"]')?.getAttribute("csa-title"),r=this.config.format;s?.startsWith("!")?document.title=s.slice(1):a?.startsWith("!")?document.title=a.slice(1):(r=r.replace("$page",s),r=r.replace("$tab",a||""),r=r.replace(/\(.*\)/,s&&a?r.match(/\((.*)\)/)?.[1]:""),document.title=r)}},h=class extends HTMLAnchorElement{constructor(){super(),this.addEventListener("click",s=>{s.preventDefault();let a=this.getAttribute("href");this.getAttribute("csa-a-type")=="page"?document.querySelector("csa-page-wrapper").load(a):document.querySelector("csa-tab-wrapper").change(a)})}},m=class extends HTMLFormElement{constructor(){super(),this.getAttribute("csa-form-autosave")&&(this.addEventListener("input",()=>{this.save(`csa-form-autosave-#${this.id}:${document.querySelector("[csa-tab-active]").getAttribute("name")}`,this.getAttribute("csa-form-autosave"))}),this.getAttribute("csa-form-restore")=="true"&&this.load(`csa-form-autosave-#${this.id}:${document.querySelector("[csa-tab-active]").getAttribute("name")}`,this.getAttribute("csa-form-autosave"))),this.addEventListener("submit",async s=>{s.preventDefault(),this.submit?this.submit():console.error(`CSA_FORM_SUBMIT_UNDEFINED${this.id&&` on #${this.id}`}`)}),this.dispatchEvent(new Event("csa-form-init"))}save(s,a){a=="local"?localStorage.setItem(s,JSON.stringify(this.values())):a=="session"?sessionStorage.setItem(s,JSON.stringify(this.values())):(console.warn(`CSA_FROM_AUTOSAVE_LOCATION_UNDEFINED${this.id&&` on #${this.id}`}. This could result in csa-form elements not working as excepted.`),csa.watcher.set(s,this.values()))}load(s,a){let r={};a=="local"?r=JSON.parse(localStorage.getItem(s)):a=="session"?r=JSON.parse(sessionStorage.getItem(s)):(console.warn(`CSA_FROM_AUTOSAVE_LOCATION_UNDEFINED${this.id&&` on #${this.id}`}. This could result in csa-form elements not working as excepted.`),r=csa.watcher.get(s));for(let i in r)this.querySelector(`[name="${i}"]`).value=r[i]}values(){let s={};for(let a of this.elements)a.name&&(a.type=="checkbox"?s[a.name]=a.checked?a.value:"no":s[a.name]=a.value);return s}submit=null};function c(t){return`
(async () => {
  ${t}
})();
`}function $(t){for(let s in t)localStorage.setItem(s,JSON.stringify(t[s]));customElements.define("csa-page-wrapper",l),customElements.define("csa-page",u),customElements.define("csa-a",h,{extends:"a"}),customElements.define("csa-tab-wrapper",d),customElements.define("csa-tab",p),customElements.define("csa-form",m,{extends:"form"})}var E={get(t){return this.datas[t]},set(t,s,a){let r=this.get(t);this.datas[t]=s,document.querySelectorAll(`[csa-watch="${t}"]`).forEach(i=>{i.getAttribute("csa-map")?this.map(i):i.innerHTML=s}),a&&a(r,s)},bind(t,s){t.oninput=async()=>{let a=this.get(t.getAttribute("csa-bind")),r=t.value;this.set(t.getAttribute("csa-bind"),r),s&&await s(a,r)}},unbind(t){t.oninput=null},map(t,s,a){t.innerHTML="";let r=E.get(t.getAttribute("csa-watch")),i=document.querySelector('[csa-map-template="logs"]');r.forEach((f,g)=>{let o=i.cloneNode(!0);o.removeAttribute("csa-map-template"),o.hidden=!1;let A=t.getAttribute("csa-map-index"),y=t.getAttribute("csa-map-value"),x={[A]:g,[y]:f};o.querySelectorAll("[csa-map-render]").forEach(b=>{b.innerHTML=x[b.getAttribute("csa-map-render")]}),t.appendChild(o)})},datas:{}};Array.prototype.append=function(...t){return this.push(...t),this};Array.prototype.prepend=function(...t){return this.unshift(...t),this};Array.prototype.remove=function(t,s){return this.splice(t,s),this};export{h as Anchor,m as Form,u as Page,l as PageWrapper,p as Tab,d as TabWrapper,n as Title,c as addAsync,$ as init,E as watcher};