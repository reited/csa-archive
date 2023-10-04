import { Title } from "./spa.js";

export class PageWrapper extends HTMLElement {
  loading = null;
  config = JSON.parse(localStorage.getItem('csa-page-wrapper-settings'));

  constructor () {
    super();

    this.load(sessionStorage.getItem('csa-lastPage') || this.config.defaultPage);
    return;
  }

  async load (url) {
    // simply load the html
    if (this.config.loadingAnimation) {
      this.innerHTML = this.config.loadingAnimation;
    }

    try {
      this.innerHTML = await (await fetch(url)).text();
    } catch (error) {
      this.innerHTML = this.config.onError || null;
    }
    
    new Title().set();
    sessionStorage.setItem('csa-lastPage', url);
  }
}

export class Page extends HTMLElement {
  constructor () {
    super();

    // running the scripts
    let scripts = this.querySelectorAll('script');
    scripts.forEach((e) => {
      // later for myself: https://esbuild.github.io/content-types/#direct-eval
      eval(e.text);
    });
  }
}