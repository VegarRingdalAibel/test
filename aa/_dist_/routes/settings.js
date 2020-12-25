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
import {
  subscribeCanDeactivateEvent,
  unSubscribeCanDeactivateEvent,
  stopCanDeactivate
} from "../../web_modules/@simple-html/router.js";
let settings_default = class extends HTMLElement {
  constructor() {
    super(...arguments);
    this.locked = false;
  }
  connectedCallback() {
    subscribeCanDeactivateEvent(this, function() {
      console.log("trigger settings event", this.counter);
      stopCanDeactivate(new Promise((resolve) => {
        if (this.locked) {
          alert("sorry");
          resolve(false);
        } else {
          resolve(true);
        }
        console.log("stopevent");
      }));
    });
  }
  disconnectedCallback() {
    unSubscribeCanDeactivateEvent(this);
  }
  clicker() {
    this.locked = this.locked ? false : true;
  }
  render() {
    return html`
            <section>
                <h1>Settings</h1>
                <br />
                Locked:<input type="checkbox" @click=${this.clicker} .checked=${this.locked} />
            </section>
        `;
  }
};
settings_default = __decorate([
  customElement("settings-route")
], settings_default);
export default settings_default;
