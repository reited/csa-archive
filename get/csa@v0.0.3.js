var n=class extends HTMLElement{loading=null;config=JSON.parse(localStorage.getItem("csa-page-wrapper-settings"));constructor(){super(),this.load(sessionStorage.getItem("csa-lastPage")||this.getAttribute("csa-default-page")),this.getAttribute("csa-default-page")||console.warn(`DEFAULT_PAGE_UNDEFINED${this.id&&` on #${this.id}`}. This could result in pages not loading by default, only if navigated manually.`)}async load(t){try{this.innerHTML=await(await fetch(t)).text()}catch{}new c().set(),sessionStorage.setItem("csa-lastPage",t)}},l=class extends HTMLElement{constructor(){super();let scripts=this.querySelectorAll("script");scripts.forEach(e=>{eval(e.text)})}};var o=class extends HTMLElement{start_url=sessionStorage.getItem("csa-lastTab")||this.getAttribute("csa-default-tab");constructor(){super(),this.getAttribute("csa-default-tab")||console.warn(`DEFAULT_TAB_UNDEFINED${this.id&&` on #${this.id}`}. This could result in tabs not loading by default, only if navigated manually.`)}async change(target){let target_tab=this.querySelector(`csa-tab[name="${target}"]`);if(target_tab&&!target_tab.executed){let executeable=target_tab.querySelector("script[csa-execute]")?.innerHTML;executeable&&eval(i(executeable)),target_tab.executed=!0}let reexecuteable=target_tab?.querySelector("script[csa-reexecute]")?.innerHTML;reexecuteable&&eval(i(reexecuteable)),this.querySelectorAll("csa-tab").forEach(a=>{a&&a==target_tab?(a.setAttribute("csa-tab-active","true"),a.hidden=!1):a&&(a.setAttribute("csa-tab-active","false"),a.hidden=!0)}),sessionStorage.setItem("csa-lastTab",target_tab?.getAttribute("name")),new c().set()}},u=class extends HTMLElement{executed=!1;constructor(){super(),this.hidden=!0}async connectedCallback(){if(this.getAttribute("src")&&!this.getAttribute("csa-tab-lazy")){let a=await(await fetch(this.getAttribute("src"))).text();this.outerHTML=a}this.getAttribute("name")==document.querySelector("csa-tab-wrapper").start_url&&document.querySelector("csa-tab-wrapper").change(this.getAttribute("name"));let executeable=this.querySelector("script[csa-execute][csa-tab-init]")?.innerHTML,reexecuteable=this.querySelector("script[csa-reexecute][csa-tab-init]")?.innerHTML;executeable&&eval(i(executeable)),reexecuteable&&eval(i(reexecuteable))}};var c=class{config=JSON.parse(localStorage.getItem("csa-title-settings"));set(){let t=document.querySelector("csa-page")?.getAttribute("csa-title"),s=document.querySelector('csa-tab[csa-tab-active="true"]')?.getAttribute("csa-title"),r=this.config.format;t?.startsWith("!")?document.title=t.slice(1):s?.startsWith("!")?document.title=s.slice(1):(r=r.replace("$page",t),r=r.replace("$tab",s||""),r=r.replace(/\(.*\)/,t&&s?r.match(/\((.*)\)/)?.[1]:""),document.title=r)}},d=class extends HTMLAnchorElement{constructor(){super(),this.addEventListener("click",t=>{t.preventDefault();let s=this.getAttribute("href");this.getAttribute("csa-a-type")=="page"?document.querySelector("csa-page-wrapper").load(s):document.querySelector("csa-tab-wrapper").change(s)})}},p=class extends HTMLFormElement{constructor(){super(),this.addEventListener("submit",async t=>{t.preventDefault(),this.submit?this.submit():console.error(`CSA_FORM_SUBMIT_UNDEFINED${this.id&&` on #${this.id}`}`)}),this.dispatchEvent(new Event("csa-form-init"))}submit=null};function i(a){return`
(async () => {
  ${a}
})();
`}function E(a){for(let t in a)localStorage.setItem(t,JSON.stringify(a[t]));customElements.define("csa-page-wrapper",n),customElements.define("csa-page",l),customElements.define("csa-a",d,{extends:"a"}),customElements.define("csa-tab-wrapper",o),customElements.define("csa-tab",u),customElements.define("csa-form",p,{extends:"form"}),window.watcher={get(t){return window.watcher[t]},set(t,s){window.watcher[t]=s,document.querySelectorAll(`[csa-watch="${t}"]`).forEach(r=>r.innerHTML=s)},datas:{}}}export{d as Anchor,p as Form,l as Page,n as PageWrapper,u as Tab,o as TabWrapper,c as Title,i as addAsync,E as init};
