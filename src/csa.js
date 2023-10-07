/**
 * welcome to csa (as in client side application)
 * this project is focused on making the implementation of reactive (literally => data change = ui change) spa-s (single page application) a little bit easier
 * 
 * todo:
 * spa, - navigation: href prefix or devdefined, hidden loading when navigating on the same page, onnavigation() onfinished()
 * reactivity
 * forced lazyloaded, forced prefetch pages
 *  - form autosave
 *  isolates (reactivity)
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval! && https://esbuild.github.io/content-types/#direct-eval
 * 
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
  set (name, value, callback) {
    const oldValue = this.get(name);
    this.datas[name] = value;
    document.querySelectorAll(`[csa-watch="${name}"]`).forEach((e) => {
      if (e.getAttribute('csa-map')) {
        this.map(e);
      } else {
        e.innerHTML = value
      }
    });

    callback && callback(oldValue, value);
  },
  bind (target, callback) {
    target.oninput = async () => {
      const oldValue = this.get(target.getAttribute('csa-bind'));
      const newValue = target.value;
      this.set(target.getAttribute('csa-bind'), newValue);
      callback && await callback(oldValue, newValue);
    }
  },
  unbind (target) {
    target.oninput = null;
  },
  map (target, lambda, callback) {
    target.innerHTML = '';
    const list = watcher.get(target.getAttribute('csa-watch'));
    const template = document.querySelector('[csa-map-template="logs"]');

    list.forEach((value, i) => {
      let temp = template.cloneNode(true);
      temp.removeAttribute('csa-map-template');
      temp.hidden = false;

      // render
      const index_representer = target.getAttribute('csa-map-index');
      const value_representer = target.getAttribute('csa-map-value');

      const dict = {
        [index_representer]: i,
        [value_representer]: value
      }

      const renders = temp.querySelectorAll('[csa-map-render]');
      renders.forEach((f) => {
        f.innerHTML = dict[f.getAttribute('csa-map-render')];
      });

      target.appendChild(temp);

      // lambda(e, i, temp);
    });
  },
  datas: {}
}

Array.prototype.append = function(...elements) {
  this.push(...elements);
  return this;
}
Array.prototype.prepend = function(...elements) {
  this.unshift(...elements);
  return this;
}
Array.prototype.remove = function(index, count) {
  this.splice(index, count);
  return this;
}
// Object.prototype.get = function(name) {
//   return this[name];
// }
// Object.prototype.stringGet = function(name) {
//   let keys = name.split('.');

//   let result = this;
//   keys.forEach((e) => {
//     result = result.get(e);
//   });

//   return result;
// }

export * from "./spa/spa.js";