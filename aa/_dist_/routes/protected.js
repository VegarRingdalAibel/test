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
import {customElement, property} from "../../web_modules/@simple-html/core.js";
import {isAuthenticted} from "./login.js";
import {gotoURL} from "../../web_modules/@simple-html/router.js";
let protected_default = class extends HTMLElement {
  constructor() {
    super(...arguments);
    this.cool = 1;
  }
  connectedCallback() {
    if (!isAuthenticted()) {
      gotoURL("#login");
    }
  }
  render() {
    return html` <section><h1>Welcome to the inner circle :-)</h1></section> `;
  }
};
__decorate([
  property()
], protected_default.prototype, "cool", 2);
protected_default = __decorate([
  customElement("protected-route")
], protected_default);
export default protected_default;
