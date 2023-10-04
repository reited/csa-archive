export * from './page.js';
export * from './tab.js';

export class Title {
  /**
   * title knowledgebase:
   *  - ! escapes formatting
   *  - default is to format
   * ( - csa-useintitle if more page is represented (why would anyone do that))
   *  - $page for page title, $tab for tab title
   *  - (*) if both of them is represented
   */

  config = JSON.parse(localStorage.getItem('csa-title-settings'))

  set () {
    let pagetitle = document.querySelector('csa-page')?.getAttribute('csa-title');
    let tabtitle = document.querySelector('csa-tab[csa-tab-active="true"]')?.getAttribute('csa-title');
    let title = this.config.format;

    if (pagetitle?.startsWith('!')) {
      document.title = pagetitle.slice(1);
    }
    else if (tabtitle?.startsWith('!')) {
      document.title = tabtitle.slice(1);
    }
    else {
      title = title.replace('$page', pagetitle);
      title = title.replace('$tab', tabtitle || '');

      title = title.replace(/\(.*\)/, 
        !!pagetitle && !!tabtitle ?
        title.match(/\((.*)\)/)?.[1] :
        ''
      );
      // console.log(!!pagetitle && !!tabtitle);
      // console.log(title.match(/\((.*)\)/)?.[1]);
      
      document.title = title;
      console.log(`setting title: ${title}`)
    }
  }
}

export class Anchor extends HTMLAnchorElement {
  constructor () {
    super();

    this.addEventListener('click', (e) => {
      e.preventDefault();
      let url = this.getAttribute('href');
      this.getAttribute('csa-a-type') == 'page' ? document.querySelector('csa-page-wrapper').load(url) : document.querySelector('csa-tab-wrapper').change(url);
    });
  }
}

export class Form extends HTMLFormElement {
  constructor () {
    super();

    this.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.onsend();
    });
  }

  onsend = null;
}

/*
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
*/