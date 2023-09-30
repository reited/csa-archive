export class PageWrapper extends HTMLElement {
  url = null;
  loading = null;
  config = JSON.parse(localStorage.getItem('csa-page-wrapper-settings'));

  constructor () {
    super();

    if (!this.url) {
      this.load(this.config.defaultPage);
      return;
    }

    this.load(this.url);
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
    

    // setting the title
    let doctitle = document.querySelector('csa-page').getAttribute('title')?.match(/{ (.*) }/)?.[1];
    let escapes_formatTitle = document.querySelector('csa-page').getAttribute('title').startsWith('!') && doctitle;
    let result_title = this.config.formatTitle;
    result_title = doctitle && !escapes_formatTitle ? result_title.replace('{}', doctitle) : escapes_formatTitle ? document.querySelector('csa-page').getAttribute('title').slice(1) : document.querySelector('csa-page').getAttribute('title');
    document.title = result_title;
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

export class Anchor extends HTMLAnchorElement {
  constructor () {
    super();

    this.addEventListener('click', (e) => {
      e.preventDefault();
      let url = this.getAttribute('href');
      document.querySelector('csa-page-wrapper').load(url);
    });
  }
}

export class PageData {
  save () {
    localStorage.setItem(`csa-pagedata`, JSON.stringify(window.watcher));
  }
  restore () {
    return JSON.parse(localStorage.getItem(`csa-pagedata`));
  }
  delete () {
    localStorage.removeItem(`csa-pagedata`);
  }
  has () {
    return !!localStorage.getItem(`csa-pagedata`);
  }
}