// import * as csa from "../src/csa.js";
import * as csa from "../get/csa.js";

csa.init({
  "csa-page-wrapper-settings": {
    defaultPage: './pages/home.html',
    formatTitle: '{} - csa',
    loadingAnimation: '<p>loading...</p>',
    onError: '<p>an error has occurred</p>'
  }
});