// import * as csa from "../src/csa.js";
import * as csa from "../get/csa@v0.0.2.js";
window.csa = csa; // making it available globally
csa.init({
  "csa-page-wrapper-settings": {
    defaultPage: './pages/about.html',
    loadingAnimation: '<p>loading...</p>',
    onError: '<p>an error has occurred</p>'
  },
  "csa-tab-wrapper-settings": {
    defaultTab: './pages/demos/tabs/counter-with-slider.html'
  },
  "csa-title-settings": {
    format: '$page(/)$tab - csa'
  }
});