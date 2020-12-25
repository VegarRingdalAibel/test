var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {html} from "../../web_modules/lit-html.js";
import {customElement} from "../../web_modules/@simple-html/core.js";
import {gotoURL} from "../../web_modules/@simple-html/router.js";
let loggedin = false;
export function isAuthenticted() {
  return loggedin;
}
export function logout() {
  loggedin = false;
  gotoURL("");
}
let login_default = class extends HTMLElement {
  click() {
    loggedin = loggedin ? false : true;
    gotoURL("#child/protected");
  }
  render() {
    return html`
            <section>
                <h1>Auth component</h1>
                <button
                    class="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click=${this.click}
                >
                    ${isAuthenticted() ? "logout" : "login"}
                </button>
            </section>
        `;
  }
};
login_default = __decorate([
  customElement("login-route")
], login_default);
export default login_default;
