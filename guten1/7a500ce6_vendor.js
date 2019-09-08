FuseBox.pkg("custom-elements-hmr-polyfill", {}, function(___scope___){
___scope___.file("src/package/index.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
var rerenderInnerHTML_1 = require("./reflow-strategy/rerenderInnerHTML");
exports.rerenderInnerHTML = rerenderInnerHTML_1.rerenderInnerHTML;
var applyPolyfill_1 = require("./polyfill/applyPolyfill");
exports.applyPolyfill = applyPolyfill_1.applyPolyfill;
var reflowStrategy_1 = require("./polyfill/reflowStrategy");
exports.ReflowStrategy = reflowStrategy_1.ReflowStrategy;

});
___scope___.file("src/package/reflow-strategy/rerenderInnerHTML.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
function rerenderInnerHTML() {
    if (document.body) {
        requestAnimationFrame(() => {
            const oldBodyHtml = document.body.innerHTML;
            document.body.innerHTML = '';
            document.body.innerHTML = oldBodyHtml;
        });
    }
}
exports.rerenderInnerHTML = rerenderInnerHTML;

});
___scope___.file("src/package/polyfill/applyPolyfill.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const hmrCache_1 = require("./hmrCache");
const overrideCustomElementDefine_1 = require("./overrideCustomElementDefine");
const onCustomElementChange_1 = require("./onCustomElementChange");
const createHookElementChangeListener_1 = require("./createHookElementChangeListener");
const reflowStrategy_1 = require("./reflowStrategy");
function applyPolyfill(reflowStrategy = reflowStrategy_1.ReflowStrategy.NONE, reflowDelayMs = 250, onCustomElementChangeListener) {
    hmrCache_1.initCache();
    overrideCustomElementDefine_1.overrideCustomElementDefine();
    onCustomElementChange_1.onCustomElementChange(createHookElementChangeListener_1.createHookElementChangeListener(reflowStrategy, reflowDelayMs, onCustomElementChangeListener));
}
exports.applyPolyfill = applyPolyfill;

});
___scope___.file("src/package/polyfill/hmrCache.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
function initCache() {
    if (!globalThis.hmrCache) {
        globalThis.hmrCache = {};
        globalThis.hmrCacheSymbolAttributes = {};
        globalThis.hmrCacheSymbolObserver = {};
    }
}
exports.initCache = initCache;
function getMostRecentImpl(elementName) {
    return globalThis.hmrCache[elementName];
}
exports.getMostRecentImpl = getMostRecentImpl;
function setMostRecentImpl(elementName, impl) {
    globalThis.hmrCache[elementName] = impl;
}
exports.setMostRecentImpl = setMostRecentImpl;
function isCacheInitialized() {
    return globalThis.hmrCache.initialized;
}
exports.isCacheInitialized = isCacheInitialized;
function setCacheAsInitialized() {
    globalThis.hmrCache.initialized = true;
}
exports.setCacheAsInitialized = setCacheAsInitialized;
function getSymbolAttributes(elementName) {
    if (!globalThis.hmrCacheSymbolAttributes[elementName]) {
        globalThis.hmrCacheSymbolAttributes[elementName] = Symbol('observedAttributesArray');
        return globalThis.hmrCacheSymbolAttributes[elementName];
    }
    else {
        return globalThis.hmrCacheSymbolAttributes[elementName];
    }
}
exports.getSymbolAttributes = getSymbolAttributes;
function getSymbolObserver(elementName) {
    if (!globalThis.hmrCacheSymbolObserver[elementName]) {
        globalThis.hmrCacheSymbolObserver[elementName] = Symbol('observedAttributesObserver');
        return globalThis.hmrCacheSymbolObserver[elementName];
    }
    else {
        return globalThis.hmrCacheSymbolObserver[elementName];
    }
}
exports.getSymbolObserver = getSymbolObserver;

});
___scope___.file("src/package/polyfill/overrideCustomElementDefine.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const hmrCache_1 = require("./hmrCache");
const createHookClass_1 = require("./createHookClass");
const constructInstance_1 = require("./constructInstance");
function overrideCustomElementDefine() {
    if (!hmrCache_1.isCacheInitialized()) {
        hmrCache_1.setCacheAsInitialized();
        const originalDefineFn = CustomElementRegistry.prototype.define;
        CustomElementRegistry.prototype.define = function (elementName, impl, options) {
            const registeredCustomElement = customElements.get(elementName);
            impl[hmrCache_1.getSymbolAttributes(elementName)] = impl.observedAttributes;
            hmrCache_1.setMostRecentImpl(elementName, impl);
            if (!registeredCustomElement) {
                const hookClass = new Proxy(createHookClass_1.createHookClass(elementName, impl), {
                    construct: function (element, args, newTarget) {
                        const mostRecentImpl = hmrCache_1.getMostRecentImpl(elementName);
                        return constructInstance_1.constructInstance(mostRecentImpl, args, newTarget);
                    }
                });
                originalDefineFn.apply(this, [elementName, hookClass, options]);
            }
            else {
                const onCustomElementChange = globalThis.hmrCache.onCustomElementChange;
                if (onCustomElementChange && typeof onCustomElementChange === 'function') {
                    onCustomElementChange(elementName, impl, options);
                }
            }
        };
    }
}
exports.overrideCustomElementDefine = overrideCustomElementDefine;

});
___scope___.file("src/package/polyfill/createHookClass.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const hmrCache_1 = require("./hmrCache");
function createHookClass(elementName, originalImpl) {
    return class extends originalImpl {
        static get observedAttributes() {
            return [];
        }
        connectedCallback() {
            const Impl = hmrCache_1.getMostRecentImpl(elementName);
            const mostRecentImpl = Impl.prototype;
            const attributes = Impl[hmrCache_1.getSymbolAttributes(elementName)];
            const observerOptions = {
                childList: false,
                attributes: true,
                attributeOldValue: true,
                subtree: false
            };
            const callback = (mutationList) => {
                mutationList.forEach(mutation => {
                    if (mostRecentImpl.attributeChangedCallback &&
                        attributes &&
                        attributes.indexOf(mutation.attributeName) !== -1) {
                        mostRecentImpl.attributeChangedCallback.apply(this, [
                            mutation.attributeName,
                            mutation.oldValue,
                            mutation.target.getAttribute(mutation.attributeName)
                        ]);
                    }
                });
            };
            if (attributes) {
                attributes.forEach(attributeName => {
                    mostRecentImpl.attributeChangedCallback.apply(this, [
                        attributeName,
                        null,
                        this.getAttribute(attributeName)
                    ]);
                });
            }
            this[hmrCache_1.getSymbolObserver(elementName)] = new MutationObserver(callback);
            this[hmrCache_1.getSymbolObserver(elementName)].observe(this, observerOptions);
            if (mostRecentImpl.connectedCallback) {
                mostRecentImpl.connectedCallback.apply(this, arguments);
            }
        }
        disconnectedCallback() {
            this[hmrCache_1.getSymbolObserver(elementName)].disconnect();
            this[hmrCache_1.getSymbolObserver(elementName)] = null;
            const mostRecentImpl = hmrCache_1.getMostRecentImpl(elementName).prototype;
            if (mostRecentImpl.disconnectedCallback) {
                mostRecentImpl.disconnectedCallback.apply(this, arguments);
            }
        }
        adoptedCallback() {
            const mostRecentImpl = hmrCache_1.getMostRecentImpl(elementName).prototype;
            if (mostRecentImpl.adoptedCallback) {
                mostRecentImpl.adoptedCallback.apply(this, arguments);
            }
        }
    };
}
exports.createHookClass = createHookClass;

});
___scope___.file("src/package/polyfill/constructInstance.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS = [
    'constructor',
    'connectedCallback',
    'disconnectedCallback',
    'adoptedCallback',
    'attributeChangedCallback'
];
function constructInstance(mostRecentImpl, args, newTarget) {
    const prototypePropertyNames = Object.getOwnPropertyNames(mostRecentImpl.prototype);
    const whitelistedPrototypePropertyNames = prototypePropertyNames.filter((propertyName) => {
        return exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS.indexOf(propertyName) === -1;
    });
    for (let i = 0; i < whitelistedPrototypePropertyNames.length; i++) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(mostRecentImpl.prototype, whitelistedPrototypePropertyNames[i]);
        if (propertyDescriptor) {
            if (propertyDescriptor.configurable) {
                Object.defineProperty(newTarget.prototype, whitelistedPrototypePropertyNames[i], propertyDescriptor);
            }
            else {
                console.warn('[custom-element-hmr-polyfill]', `${whitelistedPrototypePropertyNames[i]} is not configurable, skipping`);
            }
        }
    }
    const ownPropertyNames = Object.getOwnPropertyNames(mostRecentImpl);
    const whitelistedPropertyNames = ownPropertyNames.filter((propertyName) => {
        return ['name', 'prototype', 'length'].indexOf(propertyName) === -1;
    });
    for (let i = 0; i < whitelistedPropertyNames.length; i++) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(mostRecentImpl, whitelistedPropertyNames[i]);
        if (propertyDescriptor) {
            if (propertyDescriptor.configurable) {
                Object.defineProperty(newTarget, whitelistedPropertyNames[i], propertyDescriptor);
            }
            else {
                console.warn('[custom-element-hmr-polyfill]', `${whitelistedPropertyNames[i]} is not configurable, skipping`);
            }
        }
    }
    const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);
    return customElementInstance;
}
exports.constructInstance = constructInstance;

});
___scope___.file("src/package/polyfill/onCustomElementChange.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const hmrCache_1 = require("./hmrCache");
exports.onCustomElementChange = (changeListener) => {
    hmrCache_1.initCache();
    if (!globalThis.hmrCache.onCustomElementChange) {
        globalThis.hmrCache.onCustomElementChange = changeListener;
    }
};

});
___scope___.file("src/package/polyfill/createHookElementChangeListener.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const reflowStrategy_1 = require("./reflowStrategy");
const rerenderInnerHTML_1 = require("../reflow-strategy/rerenderInnerHTML");
exports.createHookElementChangeListener = (reflowStrategy = reflowStrategy_1.ReflowStrategy.RERENDER_INNER_HTML, reflowDelayMs = 250, onCustomElementChangeListener) => {
    let timer;
    let elementsChanged = [];
    if (!onCustomElementChangeListener) {
        onCustomElementChangeListener = () => { };
    }
    return (elementName, impl, options) => {
        onCustomElementChangeListener(elementName, impl, options);
        if (reflowStrategy && reflowStrategy === reflowStrategy_1.ReflowStrategy.RERENDER_INNER_HTML) {
            elementsChanged.push(elementName);
            clearTimeout(timer);
            timer = setTimeout(() => {
                rerenderInnerHTML_1.rerenderInnerHTML();
                elementsChanged = [];
            }, reflowDelayMs);
        }
    };
};

});
___scope___.file("src/package/polyfill/reflowStrategy.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
var ReflowStrategy;
(function (ReflowStrategy) {
    ReflowStrategy["RERENDER_INNER_HTML"] = "rerenderInnnerHTML";
    ReflowStrategy["NONE"] = "none";
})(ReflowStrategy = exports.ReflowStrategy || (exports.ReflowStrategy = {}));

});
	___scope___.entry = "src/package/index.js";
})
FuseBox.pkg("@simple-html/core", {}, function(___scope___){
___scope___.file("dist/esm/index.js", function(exports, require, module){
const __req8__ = require("./eventAggregator");
const __req7__ = require("./fetchClient");
const __req6__ = require("./instance");
const __req5__ = require("./customElement");
const __req4__ = require("./property");
const __req3__ = require("./inject");
const __req2__ = require("./attribute");
require("tslib");
exports.attribute = __req2__.attribute;
exports.inject = __req3__.inject;
exports.property = __req4__.property;
exports.customElement = __req5__.customElement;
exports.instance = __req6__.instance;
exports.clearInstance = __req6__.clearInstance;
exports.FetchClient = __req7__.FetchClient;
exports.publish = __req8__.publish;
exports.subscribe = __req8__.subscribe;
exports.unSubscribe = __req8__.unSubscribe;

});
___scope___.file("dist/esm/attribute.js", function(exports, require, module){
const __req1__ = require("./requestRender");
const __req2__ = require("./symbols");
function attribute() {
  return function reg(_class, prop) {
    Object.defineProperty(_class, prop, {
      get: function () {
        return this[__req2__.getPropSymbol(this.tagName + "_" + prop)];
      },
      set: function (x) {
        const oldValue = this[__req2__.getPropSymbol(this.tagName + "_" + prop)];
        this[__req2__.getPropSymbol(this.tagName + "_" + prop)] = x;
        if (this.valuesChanged && oldValue !== x) {
          this.valuesChanged("property", prop, oldValue, x);
        }
        if (oldValue !== x) {
          __req1__.requestRender(this);
        }
      }
    });
    const attribute = prop.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase();
    if (!_class[__req2__.getObservedAttributesMapSymbol()]) {
      _class[__req2__.getObservedAttributesMapSymbol()] = new Map();
    }
    _class[__req2__.getObservedAttributesMapSymbol()].set(attribute, prop);
    if (_class[__req2__.getObservedAttributesSymbol()]) {
      _class[__req2__.getObservedAttributesSymbol()].push(attribute);
    } else {
      _class[__req2__.getObservedAttributesSymbol()] = [];
      _class[__req2__.getObservedAttributesSymbol()].push(attribute);
    }
  };
}
exports.attribute = attribute;

});
___scope___.file("dist/esm/requestRender.js", function(exports, require, module){
function requestRender(ctx) {
  if (ctx.isConnected) {
    if (ctx.__wait) {} else {
      ctx.__wait = true;
      requestAnimationFrame(() => {
        Promise.resolve(true);
        ctx.render();
        ctx.__wait = false;
      });
    }
  }
}
exports.requestRender = requestRender;

});
___scope___.file("dist/esm/symbols.js", function(exports, require, module){
function initSymbolCache() {
  if (!globalThis._LHF_SYMBOL) {
    globalThis._LHF_SYMBOL = {};
    globalThis._LHF_PROP_SYMBOL = {};
  }
}
exports.initSymbolCache = initSymbolCache;
function getObservedAttributesMapSymbol() {
  if (!globalThis._LHF_SYMBOL.observedAttributesMap) {
    globalThis._LHF_SYMBOL.observedAttributesMap = Symbol("observedAttributesMap");
    return globalThis._LHF_SYMBOL.observedAttributesMap;
  } else {
    return globalThis._LHF_SYMBOL.observedAttributesMap;
  }
}
exports.getObservedAttributesMapSymbol = getObservedAttributesMapSymbol;
function getObservedAttributesSymbol() {
  if (!globalThis._LHF_SYMBOL.observedAttributes) {
    globalThis._LHF_SYMBOL.observedAttributes = Symbol("observedAttributes");
    return globalThis._LHF_SYMBOL.observedAttributes;
  } else {
    return globalThis._LHF_SYMBOL.observedAttributes;
  }
}
exports.getObservedAttributesSymbol = getObservedAttributesSymbol;
function getInjectSymbol() {
  if (!globalThis._LHF_SYMBOL.inject) {
    globalThis._LHF_SYMBOL.inject = Symbol("inject");
    return globalThis._LHF_SYMBOL.inject;
  } else {
    return globalThis._LHF_SYMBOL.inject;
  }
}
exports.getInjectSymbol = getInjectSymbol;
function getPropSymbol(name) {
  if (!globalThis._LHF_PROP_SYMBOL[name]) {
    globalThis._LHF_PROP_SYMBOL[name] = Symbol(name);
    return globalThis._LHF_PROP_SYMBOL[name];
  } else {
    return globalThis._LHF_PROP_SYMBOL[name];
  }
}
exports.getPropSymbol = getPropSymbol;
function getiInjectSymbol() {
  if (!globalThis._LHF_SYMBOL.inject) {
    globalThis._LHF_SYMBOL.inject = Symbol("inject");
    return globalThis._LHF_SYMBOL.inject;
  } else {
    return globalThis._LHF_SYMBOL.inject;
  }
}
exports.getiInjectSymbol = getiInjectSymbol;
initSymbolCache();

});
___scope___.file("dist/esm/inject.js", function(exports, require, module){
const __req1__ = require("./symbols");
function inject(...args) {
  return function reg(elementClass) {
    elementClass.prototype[__req1__.getInjectSymbol()] = args;
  };
}
exports.inject = inject;

});
___scope___.file("dist/esm/property.js", function(exports, require, module){
const __req1__ = require("./requestRender");
const __req2__ = require("./symbols");
function property() {
  return function reg(_class, prop) {
    Object.defineProperty(_class, prop, {
      get: function () {
        return this[__req2__.getPropSymbol(this.tagName + "_" + prop)];
      },
      set: function (x) {
        const oldValue = this[__req2__.getPropSymbol(this.tagName + "_" + prop)];
        this[__req2__.getPropSymbol(this.tagName + "_" + prop)] = x;
        if (this.valuesChanged && oldValue !== x) {
          this.valuesChanged("property", prop, oldValue, x);
        }
        if (oldValue !== x) {
          __req1__.requestRender(this);
        }
      }
    });
  };
}
exports.property = property;

});
___scope___.file("dist/esm/customElement.js", function(exports, require, module){
const __req1__ = require("lit-html");
const __req2__ = require("./requestRender");
const __req3__ = require("./symbols");
const __req4__ = require("./instance");
function customElement(elementName, extended) {
  return function reg(elementClass) {
    Object.defineProperty(elementClass, "observedAttributes", {
      get: function () {
        return elementClass.prototype[__req3__.getObservedAttributesSymbol()];
      }
    });
    const getinject = args => {
      const classes = [];
      if (Array.isArray(args)) {
        args.forEach(element => {
          classes.push(__req4__.instance(element));
        });
      }
      return classes;
    };
    const base = class extends elementClass {
      constructor() {
        super(...getinject(elementClass.prototype[__req3__.getInjectSymbol()]));
      }
      render(...result) {
        __req1__.render(super.render.call(this, ...result), this, {
          eventContext: this
        });
        if (super.updated) {
          setTimeout(() => {
            super.updated();
          });
        }
      }
      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback.call(this);
        }
        this.render(this);
      }
      disconnectedCallback() {
        if (super.disconnectedCallback) {
          super.disconnectedCallback.call(this);
        }
      }
      attributeChangedCallback(name, oldValue, newValue) {
        const nameProp = this[__req3__.getObservedAttributesMapSymbol()].get(name);
        this[nameProp] = newValue || "";
        if (super.attributeChangedCallback) {
          super.attributeChangedCallback.call(this, name, oldValue, newValue);
        }
        if (super.valuesChangedMethod) {
          super.valuesChangedMethod("attribute", name, oldValue, newValue);
        }
        __req2__.requestRender(this);
      }
    };
    if (!customElements.get(elementName)) {
      if (extended) {
        customElements.define(elementName, base, extended);
      } else {
        customElements.define(elementName, base);
      }
    } else {
      if (globalThis.hmrCache) {
        if (extended) {
          customElements.define(elementName, base, extended);
        } else {
          customElements.define(elementName, base);
        }
      }
    }
  };
}
exports.customElement = customElement;

});
___scope___.file("dist/esm/instance.js", function(exports, require, module){
const __req1__ = require("./symbols");
let instanceMap = new Map();
const instance = _class => {
  if (instanceMap.has(_class)) {
    return instanceMap.get(_class);
  } else {
    const getinjectIT = args => {
      const classes = [];
      if (Array.isArray(args)) {
        args.forEach(element => {
          classes.push(instance(element));
        });
      }
      return classes;
    };
    const newclass = new _class(...getinjectIT(_class.prototype[__req1__.getInjectSymbol()]));
    instanceMap.set(_class, newclass);
    return newclass;
  }
};
exports.instance = instance;
function clearInstance(instance) {
  if (instanceMap.has(instance)) {
    instanceMap.delete(instance);
  } else {
    instanceMap = new Map();
  }
}
exports.clearInstance = clearInstance;

});
___scope___.file("dist/esm/fetchClient.js", function(exports, require, module){
class FetchClient {
  constructor(config = {}) {
    this.config = config;
    this.setConfig(config);
  }
  setConfig(config) {
    if (config.defaultUrl) {
      this.config.defaultUrl = config.defaultUrl;
    }
    if (config.cache) {
      this.config.cache = config.cache;
    }
    if (config.credentials) {
      this.config.credentials = config.credentials;
    }
    if (config.headers) {
      this.config.headers = config.headers;
    }
    if (config.method) {
      this.config.method = config.method;
    }
    if (config.mode) {
      this.config.mode = config.mode;
    }
    if (config.redirect) {
      this.config.redirect = config.redirect;
    }
    if (config.referrer) {
      this.config.referrer = config.referrer;
    }
  }
  getConfig() {
    return this.config;
  }
  fetch(url, options) {
    const fetchUrl = this.config.defaultUrl ? this.config.defaultUrl + url : url;
    const fetchOptions = {
      body: options.body ? options.body : undefined,
      cache: options.cache || this.config.cache,
      credentials: options.credentials || this.config.credentials,
      headers: options.headers || this.config.headers,
      method: options.method || this.config.method,
      mode: options.mode || this.config.mode,
      redirect: options.redirect || this.config.redirect,
      referrer: options.referrer || this.config.referrer
    };
    return fetch(fetchUrl, fetchOptions);
  }
}
exports.FetchClient = FetchClient;

});
___scope___.file("dist/esm/eventAggregator.js", function(exports, require, module){
const __req1__ = require("./instance");
class EventAggregator {
  constructor() {
    this.channels = {};
  }
  publish(channel, ...args) {
    Promise.resolve().then(() => {
      if (Array.isArray(this.channels[channel])) {
        for (let i = 0, len = this.channels[channel].length; i < len; i++) {
          const ctx = this.channels[channel][i].ctx;
          this.channels[channel][i].func.apply(ctx, args);
        }
      }
    });
  }
  publishNext(channel, ...args) {
    setTimeout(() => {
      if (Array.isArray(this.channels[channel])) {
        for (let i = 0, len = this.channels[channel].length; i < len; i++) {
          const ctx = this.channels[channel][i].ctx;
          this.channels[channel][i].func.apply(ctx, args);
        }
      }
    }, 0);
  }
  unSubscribe(channel, ctx) {
    if (Array.isArray(this.channels[channel])) {
      let events = this.channels[channel].filter(event => {
        if (event.ctx !== ctx) {
          return true;
        } else {
          return false;
        }
      });
      this.channels[channel] = events;
    }
  }
  subscribe(channel, ctx, func) {
    if (!Array.isArray(this.channels[channel])) {
      this.channels[channel] = [];
    }
    this.channels[channel].push({
      ctx: ctx,
      func: func
    });
  }
}
function publish(channel, ...args) {
  __req1__.instance(EventAggregator).publish(channel, ...args);
}
exports.publish = publish;
function publishNext(channel, ...args) {
  __req1__.instance(EventAggregator).publishNext(channel, ...args);
}
exports.publishNext = publishNext;
function unSubscribe(channel, ctx) {
  __req1__.instance(EventAggregator).unSubscribe(channel, ctx);
}
exports.unSubscribe = unSubscribe;
function subscribe(channel, ctx, func) {
  __req1__.instance(EventAggregator).subscribe(channel, ctx, func);
}
exports.subscribe = subscribe;

});
	___scope___.entry = "dist/esm/index.js";
})
FuseBox.pkg("fuse-box-css", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
var __filename = "index.js";
var runningInBrowser = FuseBox.isBrowser || FuseBox.target === "electron";
var cssHandler = function (__filename, contents) {
  if (runningInBrowser) {
    var styleId = __filename.replace(/[\.\/]+/g, "-");
    if (styleId.charAt(0) === "-") styleId = styleId.substring(1);
    var exists = document.getElementById(styleId);
    if (!exists) {
      var s = document.createElement(contents ? "style" : "link");
      s.id = styleId;
      s.type = "text/css";
      if (contents) {
        s.innerHTML = contents;
      } else {
        s.rel = "stylesheet";
        s.href = __filename;
      }
      document.getElementsByTagName("head")[0].appendChild(s);
    } else {
      if (contents) {
        exists.innerHTML = contents;
      }
    }
  }
};
module.exports = cssHandler;

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("lit-html", {}, function(___scope___){
___scope___.file("lit-html.js", function(exports, require, module){
const __req12__ = require("./lib/template.js");
const __req11__ = require("./lib/template-result.js");
const __req10__ = require("./lib/template-instance.js");
const __req9__ = require("./lib/template-factory.js");
const __req8__ = require("./lib/render.js");
const __req7__ = require("./lib/parts.js");
const __req6__ = require("./lib/part.js");
const __req5__ = require("./lib/dom.js");
const __req4__ = require("./lib/directive.js");
const __req3__ = require("./lib/default-template-processor.js");
const __req1__ = require("./lib/default-template-processor.js");
const __req2__ = require("./lib/template-result.js");
(window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.1.2");
const html = (strings, ...values) => new __req2__.TemplateResult(strings, values, "html", __req1__.defaultTemplateProcessor);
exports.html = html;
const svg = (strings, ...values) => new __req2__.SVGTemplateResult(strings, values, "svg", __req1__.defaultTemplateProcessor);
exports.svg = svg;
exports.DefaultTemplateProcessor = __req3__.DefaultTemplateProcessor;
exports.defaultTemplateProcessor = __req3__.defaultTemplateProcessor;
exports.directive = __req4__.directive;
exports.isDirective = __req4__.isDirective;
exports.removeNodes = __req5__.removeNodes;
exports.reparentNodes = __req5__.reparentNodes;
exports.noChange = __req6__.noChange;
exports.nothing = __req6__.nothing;
exports.AttributeCommitter = __req7__.AttributeCommitter;
exports.AttributePart = __req7__.AttributePart;
exports.BooleanAttributePart = __req7__.BooleanAttributePart;
exports.EventPart = __req7__.EventPart;
exports.isIterable = __req7__.isIterable;
exports.isPrimitive = __req7__.isPrimitive;
exports.NodePart = __req7__.NodePart;
exports.PropertyCommitter = __req7__.PropertyCommitter;
exports.PropertyPart = __req7__.PropertyPart;
exports.parts = __req8__.parts;
exports.render = __req8__.render;
exports.templateCaches = __req9__.templateCaches;
exports.templateFactory = __req9__.templateFactory;
exports.TemplateInstance = __req10__.TemplateInstance;
exports.SVGTemplateResult = __req11__.SVGTemplateResult;
exports.TemplateResult = __req11__.TemplateResult;
exports.createMarker = __req12__.createMarker;
exports.isTemplatePartActive = __req12__.isTemplatePartActive;
exports.Template = __req12__.Template;

});
___scope___.file("lib/default-template-processor.js", function(exports, require, module){
const __req1__ = require("./parts.js");
class DefaultTemplateProcessor {
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];
    if (prefix === ".") {
      const committer = new __req1__.PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }
    if (prefix === "@") {
      return [new __req1__.EventPart(element, name.slice(1), options.eventContext)];
    }
    if (prefix === "?") {
      return [new __req1__.BooleanAttributePart(element, name.slice(1), strings)];
    }
    const committer = new __req1__.AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  handleTextExpression(options) {
    return new __req1__.NodePart(options);
  }
}
exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
const defaultTemplateProcessor = new DefaultTemplateProcessor();
exports.defaultTemplateProcessor = defaultTemplateProcessor;

});
___scope___.file("lib/template-result.js", function(exports, require, module){
const __req1__ = require("./dom.js");
const __req2__ = require("./template.js");
const commentMarker = ` ${__req2__.marker} `;
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  getHTML() {
    const l = this.strings.length - 1;
    let html = "";
    let isCommentBinding = false;
    for (let i = 0; i < l; i++) {
      const s = this.strings[i];
      const commentOpen = s.lastIndexOf("<!--");
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf("-->", commentOpen + 1) === -1;
      const attributeMatch = __req2__.lastAttributeNameRegex.exec(s);
      if (attributeMatch === null) {
        html += s + (isCommentBinding ? commentMarker : __req2__.nodeMarker);
      } else {
        html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + __req2__.boundAttributeSuffix + attributeMatch[3] + __req2__.marker;
      }
    }
    html += this.strings[l];
    return html;
  }
  getTemplateElement() {
    const template = document.createElement("template");
    template.innerHTML = this.getHTML();
    return template;
  }
}
exports.TemplateResult = TemplateResult;
class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }
  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    __req1__.reparentNodes(content, svgElement.firstChild);
    return template;
  }
}
exports.SVGTemplateResult = SVGTemplateResult;

});
___scope___.file("lib/directive.js", function(exports, require, module){
const directives = new WeakMap();
const directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};
exports.directive = directive;
const isDirective = o => {
  return typeof o === "function" && directives.has(o);
};
exports.isDirective = isDirective;

});
___scope___.file("lib/dom.js", function(exports, require, module){
const isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
exports.isCEPolyfill = isCEPolyfill;
const reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.insertBefore(start, before);
    start = n;
  }
};
exports.reparentNodes = reparentNodes;
const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};
exports.removeNodes = removeNodes;

});
___scope___.file("lib/part.js", function(exports, require, module){
const noChange = {};
exports.noChange = noChange;
const nothing = {};
exports.nothing = nothing;

});
___scope___.file("lib/parts.js", function(exports, require, module){
const __req1__ = require("./directive.js");
const __req2__ = require("./dom.js");
const __req3__ = require("./part.js");
const __req4__ = require("./template-instance.js");
const __req5__ = require("./template-result.js");
const __req6__ = require("./template.js");
const isPrimitive = value => {
  return value === null || !(typeof value === "object" || typeof value === "function");
};
exports.isPrimitive = isPrimitive;
const isIterable = value => {
  return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
exports.isIterable = isIterable;
class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];
    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  _createPart() {
    return new AttributePart(this);
  }
  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    let text = "";
    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = this.parts[i];
      if (part !== undefined) {
        const v = part.value;
        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === "string" ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === "string" ? t : String(t);
          }
        }
      }
    }
    text += strings[l];
    return text;
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
}
exports.AttributeCommitter = AttributeCommitter;
class AttributePart {
  constructor(committer) {
    this.value = undefined;
    this.committer = committer;
  }
  setValue(value) {
    if (value !== __req3__.noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value;
      if (!__req1__.isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (__req1__.isDirective(this.value)) {
      const directive = this.value;
      this.value = __req3__.noChange;
      directive(this);
    }
    if (this.value === __req3__.noChange) {
      return;
    }
    this.committer.commit();
  }
}
exports.AttributePart = AttributePart;
class NodePart {
  constructor(options) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.options = options;
  }
  appendInto(container) {
    this.startNode = container.appendChild(__req6__.createMarker());
    this.endNode = container.appendChild(__req6__.createMarker());
  }
  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  appendIntoPart(part) {
    part.__insert(this.startNode = __req6__.createMarker());
    part.__insert(this.endNode = __req6__.createMarker());
  }
  insertAfterPart(ref) {
    ref.__insert(this.startNode = __req6__.createMarker());
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (__req1__.isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = __req3__.noChange;
      directive(this);
    }
    const value = this.__pendingValue;
    if (value === __req3__.noChange) {
      return;
    }
    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof __req5__.TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === __req3__.nothing) {
      this.value = __req3__.nothing;
      this.clear();
    } else {
      this.__commitText(value);
    }
  }
  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }
  __commitNode(value) {
    if (this.value === value) {
      return;
    }
    this.clear();
    this.__insert(value);
    this.value = value;
  }
  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? "" : value;
    const valueAsString = typeof value === "string" ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3) {
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof __req4__.TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      const instance = new __req4__.TemplateInstance(template, value.processor, this.options);
      const fragment = instance._clone();
      instance.update(value.values);
      this.__commitNode(fragment);
      this.value = instance;
    }
  }
  __commitIterable(value) {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }
    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      itemPart = itemParts[partIndex];
      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }
  clear(startNode = this.startNode) {
    __req2__.removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
}
exports.NodePart = NodePart;
class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;
    if (strings.length !== 2 || strings[0] !== "" || strings[1] !== "") {
      throw new Error("Boolean attributes can only contain a single expression");
    }
    this.element = element;
    this.name = name;
    this.strings = strings;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (__req1__.isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = __req3__.noChange;
      directive(this);
    }
    if (this.__pendingValue === __req3__.noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, "");
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = __req3__.noChange;
  }
}
exports.BooleanAttributePart = BooleanAttributePart;
class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === "" && strings[1] === "";
  }
  _createPart() {
    return new PropertyPart(this);
  }
  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element[this.name] = this._getValue();
    }
  }
}
exports.PropertyCommitter = PropertyCommitter;
class PropertyPart extends AttributePart {}
exports.PropertyPart = PropertyPart;
let eventOptionsSupported = false;
try {
  const options = {
    get capture() {
      eventOptionsSupported = true;
      return false;
    }
  };
  window.addEventListener("test", options, options);
  window.removeEventListener("test", options, options);
} catch (_e) {}
class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;
    this.__boundHandleEvent = e => this.handleEvent(e);
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (__req1__.isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = __req3__.noChange;
      directive(this);
    }
    if (this.__pendingValue === __req3__.noChange) {
      return;
    }
    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    this.value = newListener;
    this.__pendingValue = __req3__.noChange;
  }
  handleEvent(event) {
    if (typeof this.value === "function") {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }
}
exports.EventPart = EventPart;
const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);

});
___scope___.file("lib/render.js", function(exports, require, module){
const __req1__ = require("./dom.js");
const __req2__ = require("./parts.js");
const __req3__ = require("./template-factory.js");
const parts = new WeakMap();
exports.parts = parts;
const render = (result, container, options) => {
  let part = parts.get(container);
  if (part === undefined) {
    __req1__.removeNodes(container, container.firstChild);
    parts.set(container, part = new __req2__.NodePart(Object.assign({
      templateFactory: __req3__.templateFactory
    }, options)));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
};
exports.render = render;

});
___scope___.file("lib/template-factory.js", function(exports, require, module){
const __req1__ = require("./template.js");
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);
  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== undefined) {
    return template;
  }
  const key = result.strings.join(__req1__.marker);
  template = templateCache.keyString.get(key);
  if (template === undefined) {
    template = new __req1__.Template(result, result.getTemplateElement());
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
}
exports.templateFactory = templateFactory;
const templateCaches = new Map();
exports.templateCaches = templateCaches;

});
___scope___.file("lib/template-instance.js", function(exports, require, module){
const __req1__ = require("./dom.js");
const __req2__ = require("./template.js");
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }
  update(values) {
    let i = 0;
    for (const part of this.__parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }
      i++;
    }
    for (const part of this.__parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }
  _clone() {
    const fragment = __req1__.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts;
    const walker = document.createTreeWalker(fragment, 133, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    while (partIndex < parts.length) {
      part = parts[partIndex];
      if (!__req2__.isTemplatePartActive(part)) {
        this.__parts.push(undefined);
        partIndex++;
        continue;
      }
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      if (part.type === "node") {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);
        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (__req1__.isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
}
exports.TemplateInstance = TemplateInstance;

});
___scope___.file("lib/template.js", function(exports, require, module){
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
exports.marker = marker;
const nodeMarker = `<!--${marker}-->`;
exports.nodeMarker = nodeMarker;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
exports.markerRegex = markerRegex;
const boundAttributeSuffix = "$lit$";
exports.boundAttributeSuffix = boundAttributeSuffix;
class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = [];
    const walker = document.createTreeWalker(element.content, 133, null, false);
    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {strings, values: {length}} = result;
    while (partIndex < length) {
      const node = walker.nextNode();
      if (node === null) {
        walker.currentNode = stack.pop();
        continue;
      }
      index++;
      if (node.nodeType === 1) {
        if (node.hasAttributes()) {
          const attributes = node.attributes;
          const {length} = attributes;
          let count = 0;
          for (let i = 0; i < length; i++) {
            if (endsWith(attributes[i].name, boundAttributeSuffix)) {
              count++;
            }
          }
          while (count-- > 0) {
            const stringForPart = strings[partIndex];
            const name = lastAttributeNameRegex.exec(stringForPart)[2];
            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
            const attributeValue = node.getAttribute(attributeLookupName);
            node.removeAttribute(attributeLookupName);
            const statics = attributeValue.split(markerRegex);
            this.parts.push({
              type: "attribute",
              index,
              name,
              strings: statics
            });
            partIndex += statics.length - 1;
          }
        }
        if (node.tagName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
      } else if (node.nodeType === 3) {
        const data = node.data;
        if (data.indexOf(marker) >= 0) {
          const parent = node.parentNode;
          const strings = data.split(markerRegex);
          const lastIndex = strings.length - 1;
          for (let i = 0; i < lastIndex; i++) {
            let insert;
            let s = strings[i];
            if (s === "") {
              insert = createMarker();
            } else {
              const match = lastAttributeNameRegex.exec(s);
              if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
              }
              insert = document.createTextNode(s);
            }
            parent.insertBefore(insert, node);
            this.parts.push({
              type: "node",
              index: ++index
            });
          }
          if (strings[lastIndex] === "") {
            parent.insertBefore(createMarker(), node);
            nodesToRemove.push(node);
          } else {
            node.data = strings[lastIndex];
          }
          partIndex += lastIndex;
        }
      } else if (node.nodeType === 8) {
        if (node.data === marker) {
          const parent = node.parentNode;
          if (node.previousSibling === null || index === lastPartIndex) {
            index++;
            parent.insertBefore(createMarker(), node);
          }
          lastPartIndex = index;
          this.parts.push({
            type: "node",
            index
          });
          if (node.nextSibling === null) {
            node.data = "";
          } else {
            nodesToRemove.push(node);
            index--;
          }
          partIndex++;
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            this.parts.push({
              type: "node",
              index: -1
            });
            partIndex++;
          }
        }
      }
    }
    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }
}
exports.Template = Template;
const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = part => part.index !== -1;
exports.isTemplatePartActive = isTemplatePartActive;
const createMarker = () => document.createComment("");
exports.createMarker = createMarker;
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
exports.lastAttributeNameRegex = lastAttributeNameRegex;

});
	___scope___.entry = "lit-html.js";
})
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
if (FuseBox.isServer) {
  module.exports = global.require("events");
} else {
  function EventEmitter() {
    this._events = this._events || ({});
    this._maxListeners = this._maxListeners || undefined;
  }
  module.exports = EventEmitter;
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;
  EventEmitter.defaultMaxListeners = 10;
  EventEmitter.prototype.setMaxListeners = function (n) {
    if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
    this._maxListeners = n;
    return this;
  };
  EventEmitter.prototype.emit = function (type) {
    var er, handler, len, args, i, listeners;
    if (!this._events) this._events = {};
    if (type === "error") {
      if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er;
        }
        throw TypeError("Uncaught, unspecified \"error\" event.");
      }
    }
    handler = this._events[type];
    if (isUndefined(handler)) return false;
    if (isFunction(handler)) {
      switch (arguments.length) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = Array.prototype.slice.call(arguments, 1);
          handler.apply(this, args);
      }
    } else if (isObject(handler)) {
      args = Array.prototype.slice.call(arguments, 1);
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++) listeners[i].apply(this, args);
    }
    return true;
  };
  EventEmitter.prototype.addListener = function (type, listener) {
    var m;
    if (!isFunction(listener)) throw TypeError("listener must be a function");
    if (!this._events) this._events = {};
    if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
    if (!this._events[type]) this._events[type] = listener; else if (isObject(this._events[type])) this._events[type].push(listener); else this._events[type] = [this._events[type], listener];
    if (isObject(this._events[type]) && !this._events[type].warned) {
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }
      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
        if (typeof console.trace === "function") {
          console.trace();
        }
      }
    }
    return this;
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.once = function (type, listener) {
    if (!isFunction(listener)) throw TypeError("listener must be a function");
    var fired = false;
    function g() {
      this.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }
    g.listener = listener;
    this.on(type, g);
    return this;
  };
  EventEmitter.prototype.removeListener = function (type, listener) {
    var list, position, length, i;
    if (!isFunction(listener)) throw TypeError("listener must be a function");
    if (!this._events || !this._events[type]) return this;
    list = this._events[type];
    length = list.length;
    position = -1;
    if (list === listener || isFunction(list.listener) && list.listener === listener) {
      delete this._events[type];
      if (this._events.removeListener) this.emit("removeListener", type, listener);
    } else if (isObject(list)) {
      for (i = length; i-- > 0; ) {
        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          position = i;
          break;
        }
      }
      if (position < 0) return this;
      if (list.length === 1) {
        list.length = 0;
        delete this._events[type];
      } else {
        list.splice(position, 1);
      }
      if (this._events.removeListener) this.emit("removeListener", type, listener);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function (type) {
    var key, listeners;
    if (!this._events) return this;
    if (!this._events.removeListener) {
      if (arguments.length === 0) this._events = {}; else if (this._events[type]) delete this._events[type];
      return this;
    }
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === "removeListener") continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = {};
      return this;
    }
    listeners = this._events[type];
    if (isFunction(listeners)) {
      this.removeListener(type, listeners);
    } else if (listeners) {
      while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
    }
    delete this._events[type];
    return this;
  };
  EventEmitter.prototype.listeners = function (type) {
    var ret;
    if (!this._events || !this._events[type]) ret = []; else if (isFunction(this._events[type])) ret = [this._events[type]]; else ret = this._events[type].slice();
    return ret;
  };
  EventEmitter.prototype.listenerCount = function (type) {
    if (this._events) {
      var evlistener = this._events[type];
      if (isFunction(evlistener)) return 1; else if (evlistener) return evlistener.length;
    }
    return 0;
  };
  EventEmitter.listenerCount = function (emitter, type) {
    return emitter.listenerCount(type);
  };
  function isFunction(arg) {
    return typeof arg === "function";
  }
  function isNumber(arg) {
    return typeof arg === "number";
  }
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  function isUndefined(arg) {
    return arg === void 0;
  }
}

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("tslib", {}, function(___scope___){
___scope___.file("tslib.es6.js", function(exports, require, module){
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || ({
    __proto__: []
  }) instanceof Array && (function (d, b) {
    d.__proto__ = b;
  }) || (function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  });
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
exports.__extends = __extends;
var __assign = function () {
  __assign = Object.assign || (function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  });
  return __assign.apply(this, arguments);
};
exports.__assign = __assign;
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
exports.__rest = __rest;
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return (c > 3 && r && Object.defineProperty(target, key, r), r);
}
exports.__decorate = __decorate;
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
exports.__param = __param;
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
exports.__metadata = __metadata;
function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
exports.__awaiter = __awaiter;
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  }, f, y, t, g;
  return (g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g);
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if ((f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)) return t;
      if ((y = 0, t)) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
exports.__generator = __generator;
function __exportStar(m, exports) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__exportStar = __exportStar;
function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
  if (m) return m.call(o);
  return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}
exports.__values = __values;
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
exports.__read = __read;
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}
exports.__spread = __spread;
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; (j++, k++)) r[k] = a[j];
  return r;
}
exports.__spreadArrays = __spreadArrays;
;
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
exports.__await = __await;
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return (i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
  }
}
exports.__asyncGenerator = __asyncGenerator;
function __asyncDelegator(o) {
  var i, p;
  return (i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i);
  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
exports.__asyncDelegator = __asyncDelegator;
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && (function (v) {
      return new Promise(function (resolve, reject) {
        (v = o[n](v), settle(resolve, reject, v.done, v.value));
      });
    });
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
exports.__asyncValues = __asyncValues;
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
exports.__makeTemplateObject = __makeTemplateObject;
;
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result.default = mod;
  return result;
}
exports.__importStar = __importStar;
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
exports.__importDefault = __importDefault;

});
	___scope___.entry = "tslib.es6.js";
})