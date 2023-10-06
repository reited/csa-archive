import * as csa from "../src/csa.js";
// import * as csa from "../get/csa@v0.0.2.js";

window.csa = csa; // making it available globally
csa.init({
  "csa-title-settings": {
    format: '$page(/)$tab - csa'
  }
});