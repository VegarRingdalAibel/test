import {applyPolyfill, ReflowStrategy} from "../web_modules/custom-elements-hmr-polyfill.js";
if (document.body) {
  document.body.innerHTML = "";
  setTimeout(() => {
    document.body.innerHTML = "<app-root></app-root>";
  }, 0);
}
applyPolyfill(ReflowStrategy.NONE);
