import { Title, addAsync } from "./spa.js";

export class TabWrapper extends HTMLElement {
  // config = JSON.parse(localStorage.getItem('csa-tab-wrapper-settings'));

  start_url = sessionStorage.getItem('csa-lastTab') || this.getAttribute('csa-default-tab');

  constructor () {
    super();

    if (!this.getAttribute('csa-default-tab')) {
      console.warn(`DEFAULT_TAB_UNDEFINED${this.id && ` on #${this.id}`}. This could result in tabs not loading by default, only if navigated manually.`);
    }
  }

  async change (target) {
    // searching for the tab by name or src
    const target_tab = this.querySelector(`csa-tab[name="${target}"]`);
    // console.log('changing to tab', target_tab);

    // // if it hasn't been loaded yet, load it
    if (target_tab && !target_tab.executed) {
      // console.log('executing script', target_tab);

      const executeable = target_tab.querySelector('script[csa-execute]')?.innerHTML;
      executeable && eval(addAsync(executeable));
      // executeable && eval(executeable);
      target_tab.executed = true;
    }
    const reexecuteable = target_tab?.querySelector('script[csa-reexecute]')?.innerHTML;
    reexecuteable && eval(addAsync(reexecuteable));
    // reexecuteable && eval(reexecuteable);

    // hide all unneccessary tabs, only show currently selected
    this.querySelectorAll('csa-tab').forEach((e) => {
      if (e && e == target_tab) {
        e.setAttribute('csa-tab-active', 'true');
        e.hidden = false;
      }
      else if (e) {
        e.setAttribute('csa-tab-active', 'false');
        e.hidden = true;
      }
    });

    // set lastTab history and document.title
    sessionStorage.setItem('csa-lastTab', target_tab?.getAttribute('name'));
    new Title().set();
  }
}


export class Tab extends HTMLElement {
  executed = false;

  constructor () {
    super();

    this.hidden = true;
  }

  async connectedCallback () {
    // console.log('initing tab', this);

    if (this.getAttribute('src') && !this.getAttribute('csa-tab-lazy')) {
      const tab_html = await (await fetch(this.getAttribute('src'))).text();
      this.outerHTML = tab_html;
    }

    if (this.getAttribute('name') == document.querySelector('csa-tab-wrapper').start_url) {
      document.querySelector('csa-tab-wrapper').change(this.getAttribute('name'));
    }

    // search for execute and reexecute
    const executeable = this.querySelector('script[csa-execute][csa-tab-init]')?.innerHTML;
    const reexecuteable = this.querySelector('script[csa-reexecute][csa-tab-init]')?.innerHTML;

    // when initing, it must run both
    executeable && eval(addAsync(executeable));
    // executeable && eval(executeable);
    reexecuteable && eval(addAsync(reexecuteable));
    // reexecuteable && eval(reexecuteable);
  }
}