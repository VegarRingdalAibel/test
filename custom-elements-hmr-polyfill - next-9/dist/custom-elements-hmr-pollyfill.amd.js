define(["exports"],(function(e){"use strict";function t(){document.body&&requestAnimationFrame(()=>{const e=document.body.innerHTML;document.body.innerHTML="",document.body.innerHTML=e})}function o(){globalThis.hmrCache||(globalThis.hmrCache={},globalThis.hmrCacheSymbolAttributes={},globalThis.hmrCacheSymbolObserver={})}function r(e){return globalThis.hmrCache[e]}function n(e){return globalThis.hmrCacheSymbolAttributes[e]?globalThis.hmrCacheSymbolAttributes[e]:(globalThis.hmrCacheSymbolAttributes[e]=Symbol("observedAttributesArray"),globalThis.hmrCacheSymbolAttributes[e])}function l(e){return globalThis.hmrCacheSymbolObserver[e]?globalThis.hmrCacheSymbolObserver[e]:(globalThis.hmrCacheSymbolObserver[e]=Symbol("observedAttributesObserver"),globalThis.hmrCacheSymbolObserver[e])}function a(e,t,o){const r=Object.getOwnPropertyNames(e).filter(e=>-1===o.indexOf(e));for(let o=0;o<r.length;o++){const n=Object.getOwnPropertyDescriptor(e,r[o]);n&&(n.configurable?Object.defineProperty(t,r[o],n):console.warn("[custom-element-hmr-polyfill]",`${r[o]} is not configurable, skipping`))}}const i=[],s=["name","prototype","length"];function c(){if(!globalThis.hmrCache.initialized){globalThis.hmrCache.initialized=!0;const e=CustomElementRegistry.prototype.define;CustomElementRegistry.prototype.define=function(t,o,c){const b=customElements.get(t);if(o[n(t)]=o.observedAttributes,function(e,t){globalThis.hmrCache[e]=t}(t,o),b){const e=globalThis.hmrCache.onCustomElementChange;e&&"function"==typeof e&&e(t,o,c)}else{const b=new Proxy(function(e,t){return class extends t{static get observedAttributes(){return[]}connectedCallback(){const t=r(e),o=t.prototype,a=t[n(e)];a&&(Array.isArray(a)?a.forEach(e=>{o.attributeChangedCallback.apply(this,[e,null,this.getAttribute(e)])}):console.warn(`observedAttributes in ${e} is not array, please fix`)),this[l(e)]=new MutationObserver(e=>{e.forEach(e=>{o.attributeChangedCallback&&a&&-1!==a.indexOf(e.attributeName)&&o.attributeChangedCallback.apply(this,[e.attributeName,e.oldValue,e.target.getAttribute(e.attributeName)])})}),this[l(e)].observe(this,{childList:!1,attributes:!0,attributeOldValue:!0,subtree:!1}),o.connectedCallback&&o.connectedCallback.apply(this,arguments)}disconnectedCallback(){this[l(e)].disconnect(),this[l(e)]=null;const t=r(e).prototype;t.disconnectedCallback&&t.disconnectedCallback.apply(this,arguments)}adoptedCallback(){const t=r(e).prototype;t.adoptedCallback&&t.adoptedCallback.apply(this,arguments)}}}(t,o),{construct:function(e,o,n){return function(e,t,o){let r=window[e.__proto__.name];return r&&(r=window[e.__proto__.name].prototype instanceof Element),r||(a(e.__proto__.prototype,o.prototype,i),a(e.__proto__,o,s)),a(e.prototype,o.prototype,i),a(e,e,s),Reflect.construct(e,t,o)}(r(t),o,n)}});e.apply(this,[t,b,c])}}}}const b=e=>{o(),globalThis.hmrCache.onCustomElementChange||(globalThis.hmrCache.onCustomElementChange=e)};var h;(h=e.ReflowStrategy||(e.ReflowStrategy={})).RERENDER_INNER_HTML="rerenderInnnerHTML",h.NONE="none";const u=(o=e.ReflowStrategy.RERENDER_INNER_HTML,r=250,n)=>{let l,a=[];return n||(n=()=>{}),(i,s,c)=>{n(i,s,c),o&&o===e.ReflowStrategy.RERENDER_INNER_HTML&&(a.push(i),clearTimeout(l),l=setTimeout(()=>{t(),a=[]},r))}};e.applyPolyfill=function(t=e.ReflowStrategy.NONE,r=250,n){o(),c(),b(u(t,r,n))},e.rerenderInnerHTML=t,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=custom-elements-hmr-pollyfill.amd.js.map