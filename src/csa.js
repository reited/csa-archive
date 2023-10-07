/**
 * welcome to csa (as in client side application)
 * this project is focused on making the implementation of reactive (literally = data change = ui change) spa-s (single page application) a little bit easier
 * 
 * todo:
 * spa, - navigation: href prefix or devdefined, hidden loading when navigating on the same page, onnavigation() onfinished()
 * reactivity
 * forced lazyloaded, forced prefetch tabs
 * useful functions, like useresource ...
 *  - csa-bind (for auto update based on value change)
 * webcomponents, like csa-forms ...
 *  - form autosave
 */

import * as spa from "./spa/spa.js";

/**
 * the init function, the functions relating to the loaded page are runned here, etc ...
 * @param {*} o 
 */
export function init(o) {
  // set up csa

  for (const key in o) {
    localStorage.setItem(key, JSON.stringify(o[key]));
  }
  
  customElements.define('csa-page-wrapper', spa.PageWrapper);
  customElements.define('csa-page', spa.Page);
  customElements.define('csa-a', spa.Anchor, { extends: 'a' });
  customElements.define('csa-tab-wrapper', spa.TabWrapper);
  customElements.define('csa-tab', spa.Tab);
  customElements.define('csa-form', spa.Form, { extends: 'form' });
}

export const watcher = {
  get (name) {
    return this.datas[name];
  },
  set (name, value) {
    this.datas[name] = value;
    document.querySelectorAll(`[csa-watch="${name}"]`).forEach((e) => e.innerHTML = value);
  },
  datas: {}
}

// export { spa, reactivity };
export * from "./spa/spa.js";