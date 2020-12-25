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
import {html} from "../web_modules/lit-html.js";
import {customElement} from "../web_modules/@simple-html/core.js";
import {navs, routerConfig as routerConfig2} from "./routes/routerConfig.js";
import {gotoURL, connectHashChanges} from "../web_modules/@simple-html/router.js";
import {routeMatchAsync} from "../web_modules/@simple-html/router.js";
import {isAuthenticted, logout} from "./routes/login.js";
let app_root_default = class extends HTMLElement {
  connectedCallback() {
    connectHashChanges(this, this.render);
  }
  render() {
    return html`
            <ul class="flex bg-green-500 p-6">
                ${navs("main").map((route) => {
      if (route.isNav) {
        return html`
                            <li class="mr-6">
                                <a class="text-green-200 hover:text-white" href="${route.href}"
                                    >${route.title}</a
                                >
                            </li>
                        `;
      }
      return "";
    })}

                <li style="margin-left: auto;" class="mr-6">
                    <span
                        class="text-green-200 hover:text-white"
                        @click=${() => {
      if (isAuthenticted()) {
        logout();
      } else {
        gotoURL("#:path", {path: "login"});
      }
    }}
                    >
                        ${isAuthenticted() ? "Logout" : "Login"}
                    </span>
                </li>
            </ul>

            <!--  if you want you could show more then 1 -->
            ${routeMatchAsync(routerConfig2.home.path, routerConfig2.home.load, routerConfig2.home.html)}
            ${routeMatchAsync(routerConfig2.settings.path, routerConfig2.settings.load, routerConfig2.settings.html)}
            ${routeMatchAsync(routerConfig2.login.path, routerConfig2.login.load, routerConfig2.login.html)}

            <!--  if you want you could show more then 1 -->
            ${routeMatchAsync("#child/*", () => import("./routes/childrouter.js"), html` <childrouter-route></childrouter-route> `)}
        `;
  }
};
app_root_default = __decorate([
  customElement("app-root")
], app_root_default);
export default app_root_default;
