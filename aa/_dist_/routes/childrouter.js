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
import {navs, routerConfig as routerConfig2} from "./routerConfig.js";
import {connectHashChanges, routeMatchAsync} from "../../web_modules/@simple-html/router.js";
const childRoute = routerConfig2.child.children;
let childrouter_default = class extends HTMLElement {
  connectedCallback() {
    connectHashChanges(this, this.render);
  }
  render() {
    return html`
            <ul class="ani flex bg-indigo-500 p-6">
                ${navs("sub").map((route) => {
      if (route.isNav) {
        return html`
                            <li class="mr-6">
                                <a class="text-green-200 hover:text-white" href="${route.href}"
                                    >${route.title}</a
                                >
                            </li>
                        `;
      } else {
        return "";
      }
    })}
            </ul>

            ${routeMatchAsync(childRoute.subHome.path, () => import("./home.js"), html` <home-route></home-route> `)}
            ${routeMatchAsync(childRoute.subSettings.path, () => import("./settings.js"), html` <settings-route></settings-route> `)}
            ${routeMatchAsync(childRoute.protected.path, () => import("./protected.js"), html` <protected-route></protected-route> `)}
        `;
  }
};
childrouter_default = __decorate([
  customElement("childrouter-route")
], childrouter_default);
export default childrouter_default;
