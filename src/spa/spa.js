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
      
      document.title = title;
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

    if (this.getAttribute('csa-form-autosave')) {
      this.addEventListener('input', () => {
        this.save(`csa-form-autosave-#${this.id}:${document.querySelector('[csa-tab-active]').getAttribute('name')}`, this.getAttribute('csa-form-autosave'));
      });
      if (this.getAttribute('csa-form-restore') == 'true') {
        this.load(`csa-form-autosave-#${this.id}:${document.querySelector('[csa-tab-active]').getAttribute('name')}`, this.getAttribute('csa-form-autosave'));
      }
    }

    this.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (this.submit) {
        this.submit();
      } else {
        console.error(`CSA_FORM_SUBMIT_UNDEFINED${this.id && ` on #${this.id}`}`);
      }
    });

    this.dispatchEvent(new Event('csa-form-init'));
  }

  save (name, storage) {
    if (storage == 'local') {
      localStorage.setItem(name, JSON.stringify(this.values()));
    } else if (storage == 'session') {
      sessionStorage.setItem(name, JSON.stringify(this.values()));
    } else {
      console.warn(`CSA_FROM_AUTOSAVE_LOCATION_UNDEFINED${this.id && ` on #${this.id}`}. This could result in csa-form elements not working as excepted.`);
      csa.watcher.set(name, this.values());
    }
  }

  load (name, storage) {
    let formData = {};
    if (storage == 'local') {
      formData = JSON.parse(localStorage.getItem(name));
    } else if (storage == 'session') {
      formData = JSON.parse(sessionStorage.getItem(name));
    } else {
      console.warn(`CSA_FROM_AUTOSAVE_LOCATION_UNDEFINED${this.id && ` on #${this.id}`}. This could result in csa-form elements not working as excepted.`);
      formData = csa.watcher.get(name);
    }

    // if (!formData) return;

    for (const key in formData) {
      this.querySelector(`[name="${key}"]`).value = formData[key];
    }
  }

  values () {
    const formData = {};

    for (const element of this.elements) {
      if (element.name) {
        if (element.type == 'checkbox') {
          formData[element.name] = element.checked ? element.value : 'no';
        } else {
          formData[element.name] = element.value;
        }
      }
    }

    return formData;
  }
  

  submit = null;
}

export function addAsync (s) {
  // console.log(`asynced ${s}`);
  // console.trace();
  return (
`
(async () => {
  ${s}
})();
`
  );
}