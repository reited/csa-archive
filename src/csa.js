/**
 * welcome to csa (as in client side application)
 * this project is focused on making the implementation of reactive (literally = data change = ui change) spa-s (single page application) a little bit easier
 * 
 * todo
 * init script
 * spa, - navigation: routing based on fs or devdefined; loading animations
 * reactivity
 * useful functions, like useresource ...
 * webcomponents, like csa-forms ...
 */

import * as spa from "./spapp.js";
import * as reactivity from "./reactivity.js";

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

  window.watcher = {
    get (name) {
      return window.watcher[name];
    },
    set (name, value) {
      window.watcher[name] = value;
      document.querySelectorAll(`[csa-watch="${name}"]`).forEach((e) => e.innerHTML = value);
    },
    datas: {}
  }
}

// export { spa, reactivity };
export * from "./spapp.js";
export * from "./reactivity.js";