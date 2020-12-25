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
let unknown_default = class extends HTMLElement {
  render() {
    return html` <section><h1>Are you lost ?</h1></section> `;
  }
};
unknown_default = __decorate([
  customElement("unknown-route")
], unknown_default);
export default unknown_default;
