import{a as _,b as I,d as L}from"./chunk.6RNNPUHQ.js";import{a,b as k,c as x,d as p}from"./chunk.SR7GRLS5.js";import"./chunk.K5OJMX56.js";import"./chunk.32AVIKSE.js";import{c as j,d as f}from"./chunk.3N2YFPE7.js";function E(){document.body&&requestAnimationFrame(()=>{let t=document.body.innerHTML;document.body.innerHTML="",document.body.innerHTML=t})}function d(){globalThis.hmrCache||(globalThis.hmrCache={},globalThis.hmrCacheSymbolAttributes={},globalThis.hmrCacheSymbolObserver={})}function u(t){return globalThis.hmrCache[t]}function w(t,i){globalThis.hmrCache[t]=i}function O(){return globalThis.hmrCache.initialized}function A(){globalThis.hmrCache.initialized=!0}function m(t){return globalThis.hmrCacheSymbolAttributes[t]||(globalThis.hmrCacheSymbolAttributes[t]=Symbol("observedAttributesArray")),globalThis.hmrCacheSymbolAttributes[t]}function b(t){return globalThis.hmrCacheSymbolObserver[t]||(globalThis.hmrCacheSymbolObserver[t]=Symbol("observedAttributesObserver")),globalThis.hmrCacheSymbolObserver[t]}function P(t,i){return class extends i{static get observedAttributes(){return[]}connectedCallback(){let o=u(t),s=o.prototype,e=o[m(t)],r={childList:!1,attributes:!0,attributeOldValue:!0,subtree:!1},l=n=>{n.forEach(c=>{s.attributeChangedCallback&&e&&e.indexOf(c.attributeName)!==-1&&s.attributeChangedCallback.apply(this,[c.attributeName,c.oldValue,this.getAttribute(c.attributeName),null])})};e&&(Array.isArray(e)?e.forEach(n=>{let c=this.getAttributeNode(n);c&&s.attributeChangedCallback.apply(this,[n,null,this.getAttribute(n),null])}):console.warn(`observedAttributes in ${t} is not array, please fix`)),this[b(t)]=new MutationObserver(l),this[b(t)].observe(this,r),s.connectedCallback&&s.connectedCallback.apply(this,arguments)}disconnectedCallback(){this[b(t)].disconnect(),this[b(t)]=null;let o=u(t).prototype;o.disconnectedCallback&&o.disconnectedCallback.apply(this,arguments)}adoptedCallback(){let o=u(t).prototype;o.adoptedCallback&&o.adoptedCallback.apply(this,arguments)}}}function g(t,i,o){let s=Object.getOwnPropertyNames(t),e=s.filter(r=>o.indexOf(r)===-1);for(let r=0;r<e.length;r++){let l=Object.getOwnPropertyDescriptor(t,e[r]);l&&(l.configurable?Object.defineProperty(i,e[r],l):console.warn("[custom-element-hmr-polyfill]",`${e[r]} is not configurable, skipping`))}}var y=[];function R(t,i,o){var s,e;let r=window[t.__proto__.name];if(r&&(r=window[t.__proto__.name].prototype instanceof Element),!r){let n=t.__proto__,c=null;for(;n&&!(((e=window[(s=n==null?void 0:n.__proto__)===null||s===void 0?void 0:s.name])===null||e===void 0?void 0:e.prototype)instanceof Element&&(c=n),c);)n=n.__proto__;window.HMR_SKIP_DEEP_PATCH||g(c.prototype,o.prototype,y)}g(t.prototype,o.prototype,y);let l=Reflect.construct(t,i,o);return l}function H(){if(!O()){A();let t=CustomElementRegistry.prototype.define;CustomElementRegistry.prototype.define=function(i,o,s){let e=customElements.get(i);if(o[m(i)]=o.observedAttributes,w(i,o),e){let r=globalThis.hmrCache.onCustomElementChange;r&&typeof r=="function"&&r(i,o,s)}else{let r=new Proxy(P(i,o),{construct:function(l,n,c){let v=u(i);return R(v,n,c)}});t.apply(this,[i,r,s])}}}}var M=t=>{d(),globalThis.hmrCache.onCustomElementChange||(globalThis.hmrCache.onCustomElementChange=t)},h;(function(t){t.RERENDER_INNER_HTML="rerenderInnnerHTML",t.NONE="none"})(h||(h={}));var S=(t=h.RERENDER_INNER_HTML,i=250,o)=>{let s,e=[];return o||(o=()=>{}),(r,l,n)=>{o&&o(r,l,n),t&&t===h.RERENDER_INNER_HTML&&(e.push(r),clearTimeout(s),s=setTimeout(()=>{E(),e=[]},i))}};function C(t=h.NONE,i=250,o){d(),H(),M(S(t,i,o))}document.body&&(document.body.innerHTML="",setTimeout(()=>{document.body.innerHTML="<app-root></app-root>"},0));C(h.NONE);var D=Object.defineProperty,$=Object.getOwnPropertyDescriptor,z=(t,i,o,s)=>{for(var e=s>1?void 0:s?$(i,o):i,r=t.length-1,l;r>=0;r--)(l=t[r])&&(e=(s?l(i,o,e):l(e))||e);return s&&e&&D(i,o,e),e},T=class extends HTMLElement{connectedCallback(){x(this,this.render)}render(){return f`
            <ul class="flex bg-green-500 p-6">
                ${k("main").map(t=>t.isNav?f`
                            <li class="mr-6">
                                <a class="text-green-200 hover:text-white" href="${t.href}"
                                    >${t.title}</a
                                >
                            </li>
                        `:"")}

                <li style="margin-left: auto;" class="mr-6">
                    <span
                        class="text-green-200 hover:text-white"
                        @click=${()=>{_()?I():L("#:path",{path:"login"})}}
                    >
                        ${_()?"Logout":"Login"}
                    </span>
                </li>
            </ul>

            <!--  if you want you could show more then 1 -->
            ${p(a.home.path,a.home.load,a.home.html)}
            ${p(a.settings.path,a.settings.load,a.settings.html)}
            ${p(a.login.path,a.login.load,a.login.html)}

            <!--  if you want you could show more then 1 -->
            ${p("#child/*",()=>import("./_dist_/routes/childrouter.js"),f` <childrouter-route></childrouter-route> `)}
        `}};T=z([j("app-root")],T);
