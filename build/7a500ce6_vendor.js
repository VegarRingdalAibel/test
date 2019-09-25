FuseBox.pkg("custom-elements-hmr-polyfill", {}, function(___scope___){
___scope___.file("dist/ES6/index.js", function(exports, require, module){
const __req3__ = require("./polyfill/reflowStrategy");
const __req2__ = require("./polyfill/applyPolyfill");
const __req1__ = require("./reflow-strategy/rerenderInnerHTML");
exports.rerenderInnerHTML = __req1__.rerenderInnerHTML;
exports.applyPolyfill = __req2__.applyPolyfill;
exports.ReflowStrategy = __req3__.ReflowStrategy;

});
___scope___.file("dist/ES6/reflow-strategy/rerenderInnerHTML.js", function(exports, require, module){
function rerenderInnerHTML() {
  if (document.body) {
    requestAnimationFrame(() => {
      const oldBodyHtml = document.body.innerHTML;
      document.body.innerHTML = "";
      document.body.innerHTML = oldBodyHtml;
    });
  }
}
exports.rerenderInnerHTML = rerenderInnerHTML;

});
___scope___.file("dist/ES6/polyfill/applyPolyfill.js", function(exports, require, module){
const __req1__ = require("./hmrCache");
const __req2__ = require("./overrideCustomElementDefine");
const __req3__ = require("./onCustomElementChange");
const __req4__ = require("./createHookElementChangeListener");
const __req5__ = require("./reflowStrategy");
function applyPolyfill(reflowStrategy = __req5__.ReflowStrategy.NONE, reflowDelayMs = 250, onCustomElementChangeListener) {
  __req1__.initCache();
  __req2__.overrideCustomElementDefine();
  __req3__.onCustomElementChange(__req4__.createHookElementChangeListener(reflowStrategy, reflowDelayMs, onCustomElementChangeListener));
}
exports.applyPolyfill = applyPolyfill;

});
___scope___.file("dist/ES6/polyfill/hmrCache.js", function(exports, require, module){
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
    globalThis.hmrCacheSymbolAttributes[elementName] = Symbol("observedAttributesArray");
    return globalThis.hmrCacheSymbolAttributes[elementName];
  } else {
    return globalThis.hmrCacheSymbolAttributes[elementName];
  }
}
exports.getSymbolAttributes = getSymbolAttributes;
function getSymbolObserver(elementName) {
  if (!globalThis.hmrCacheSymbolObserver[elementName]) {
    globalThis.hmrCacheSymbolObserver[elementName] = Symbol("observedAttributesObserver");
    return globalThis.hmrCacheSymbolObserver[elementName];
  } else {
    return globalThis.hmrCacheSymbolObserver[elementName];
  }
}
exports.getSymbolObserver = getSymbolObserver;

});
___scope___.file("dist/ES6/polyfill/overrideCustomElementDefine.js", function(exports, require, module){
const __req1__ = require("./hmrCache");
const __req2__ = require("./createHookClass");
const __req3__ = require("./constructInstance");
function overrideCustomElementDefine() {
  if (!__req1__.isCacheInitialized()) {
    __req1__.setCacheAsInitialized();
    const originalDefineFn = CustomElementRegistry.prototype.define;
    CustomElementRegistry.prototype.define = function (elementName, impl, options) {
      const registeredCustomElement = customElements.get(elementName);
      impl[__req1__.getSymbolAttributes(elementName)] = impl.observedAttributes;
      __req1__.setMostRecentImpl(elementName, impl);
      if (!registeredCustomElement) {
        const hookClass = new Proxy(__req2__.createHookClass(elementName, impl), {
          construct: function (element, args, newTarget) {
            const mostRecentImpl = __req1__.getMostRecentImpl(elementName);
            return __req3__.constructInstance(mostRecentImpl, args, newTarget);
          }
        });
        originalDefineFn.apply(this, [elementName, hookClass, options]);
      } else {
        const onCustomElementChange = globalThis.hmrCache.onCustomElementChange;
        if (onCustomElementChange && typeof onCustomElementChange === "function") {
          onCustomElementChange(elementName, impl, options);
        }
      }
    };
  }
}
exports.overrideCustomElementDefine = overrideCustomElementDefine;

});
___scope___.file("dist/ES6/polyfill/createHookClass.js", function(exports, require, module){
const __req1__ = require("./hmrCache");
function createHookClass(elementName, originalImpl) {
  return class extends originalImpl {
    static get observedAttributes() {
      return [];
    }
    connectedCallback() {
      const Impl = __req1__.getMostRecentImpl(elementName);
      const mostRecentImpl = Impl.prototype;
      const attributes = Impl[__req1__.getSymbolAttributes(elementName)];
      const observerOptions = {
        childList: false,
        attributes: true,
        attributeOldValue: true,
        subtree: false
      };
      const callback = mutationList => {
        mutationList.forEach(mutation => {
          if (mostRecentImpl.attributeChangedCallback && attributes && attributes.indexOf(mutation.attributeName) !== -1) {
            mostRecentImpl.attributeChangedCallback.apply(this, [mutation.attributeName, mutation.oldValue, mutation.target.getAttribute(mutation.attributeName)]);
          }
        });
      };
      if (attributes) {
        attributes.forEach(attributeName => {
          mostRecentImpl.attributeChangedCallback.apply(this, [attributeName, null, this.getAttribute(attributeName)]);
        });
      }
      this[__req1__.getSymbolObserver(elementName)] = new MutationObserver(callback);
      this[__req1__.getSymbolObserver(elementName)].observe(this, observerOptions);
      if (mostRecentImpl.connectedCallback) {
        mostRecentImpl.connectedCallback.apply(this, arguments);
      }
    }
    disconnectedCallback() {
      this[__req1__.getSymbolObserver(elementName)].disconnect();
      this[__req1__.getSymbolObserver(elementName)] = null;
      const mostRecentImpl = __req1__.getMostRecentImpl(elementName).prototype;
      if (mostRecentImpl.disconnectedCallback) {
        mostRecentImpl.disconnectedCallback.apply(this, arguments);
      }
    }
    adoptedCallback() {
      const mostRecentImpl = __req1__.getMostRecentImpl(elementName).prototype;
      if (mostRecentImpl.adoptedCallback) {
        mostRecentImpl.adoptedCallback.apply(this, arguments);
      }
    }
  };
}
exports.createHookClass = createHookClass;

});
___scope___.file("dist/ES6/polyfill/constructInstance.js", function(exports, require, module){
const BLACKLISTED_PROTOTYPE_PATCH_METHODS = ["constructor", "connectedCallback", "disconnectedCallback", "adoptedCallback", "attributeChangedCallback"];
exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS = BLACKLISTED_PROTOTYPE_PATCH_METHODS;
function constructInstance(mostRecentImpl, args, newTarget) {
  const prototypePropertyNames = Object.getOwnPropertyNames(mostRecentImpl.prototype);
  const whitelistedPrototypePropertyNames = prototypePropertyNames.filter(propertyName => {
    return BLACKLISTED_PROTOTYPE_PATCH_METHODS.indexOf(propertyName) === -1;
  });
  for (let i = 0; i < whitelistedPrototypePropertyNames.length; i++) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(mostRecentImpl.prototype, whitelistedPrototypePropertyNames[i]);
    if (propertyDescriptor) {
      if (propertyDescriptor.configurable) {
        Object.defineProperty(newTarget.prototype, whitelistedPrototypePropertyNames[i], propertyDescriptor);
      } else {
        console.warn("[custom-element-hmr-polyfill]", `${whitelistedPrototypePropertyNames[i]} is not configurable, skipping`);
      }
    }
  }
  const ownPropertyNames = Object.getOwnPropertyNames(mostRecentImpl);
  const whitelistedPropertyNames = ownPropertyNames.filter(propertyName => {
    return ["name", "prototype", "length"].indexOf(propertyName) === -1;
  });
  for (let i = 0; i < whitelistedPropertyNames.length; i++) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(mostRecentImpl, whitelistedPropertyNames[i]);
    if (propertyDescriptor) {
      if (propertyDescriptor.configurable) {
        Object.defineProperty(newTarget, whitelistedPropertyNames[i], propertyDescriptor);
      } else {
        console.warn("[custom-element-hmr-polyfill]", `${whitelistedPropertyNames[i]} is not configurable, skipping`);
      }
    }
  }
  const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);
  return customElementInstance;
}
exports.constructInstance = constructInstance;

});
___scope___.file("dist/ES6/polyfill/onCustomElementChange.js", function(exports, require, module){
const __req1__ = require("./hmrCache");
const onCustomElementChange = changeListener => {
  __req1__.initCache();
  if (!globalThis.hmrCache.onCustomElementChange) {
    globalThis.hmrCache.onCustomElementChange = changeListener;
  }
};
exports.onCustomElementChange = onCustomElementChange;

});
___scope___.file("dist/ES6/polyfill/createHookElementChangeListener.js", function(exports, require, module){
const __req1__ = require("./reflowStrategy");
const __req2__ = require("../reflow-strategy/rerenderInnerHTML");
const createHookElementChangeListener = (reflowStrategy = __req1__.ReflowStrategy.RERENDER_INNER_HTML, reflowDelayMs = 250, onCustomElementChangeListener) => {
  let timer;
  let elementsChanged = [];
  if (!onCustomElementChangeListener) {
    onCustomElementChangeListener = () => {};
  }
  return (elementName, impl, options) => {
    onCustomElementChangeListener(elementName, impl, options);
    if (reflowStrategy && reflowStrategy === __req1__.ReflowStrategy.RERENDER_INNER_HTML) {
      elementsChanged.push(elementName);
      clearTimeout(timer);
      timer = setTimeout(() => {
        __req2__.rerenderInnerHTML();
        elementsChanged = [];
      }, reflowDelayMs);
    }
  };
};
exports.createHookElementChangeListener = createHookElementChangeListener;

});
___scope___.file("dist/ES6/polyfill/reflowStrategy.js", function(exports, require, module){
(function (ReflowStrategy) {
  ReflowStrategy["RERENDER_INNER_HTML"] = "rerenderInnnerHTML";
  ReflowStrategy["NONE"] = "none";
})(exports.ReflowStrategy || (exports.ReflowStrategy = {}));

});
	___scope___.entry = "dist/ES6/index.js";
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
FuseBox.pkg("buffer", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
if (FuseBox.isServer) {
  module.exports = global.require("buffer");
} else {
  "use strict";
  var base64 = require("base64-js");
  var ieee754 = require("ieee754");
  exports.Buffer = Buffer;
  exports.FuseShim = true;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  var K_MAX_LENGTH = 2147483647;
  exports.kMaxLength = K_MAX_LENGTH;
  Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    console.error("This browser lacks typed array (Uint8Array) support which is required by " + "`buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  }
  function typedArraySupport() {
    try {
      var arr = new Uint8Array(1);
      arr.__proto__ = {
        __proto__: Uint8Array.prototype,
        foo: function () {
          return 42;
        }
      };
      return arr.foo() === 42;
    } catch (e) {
      return false;
    }
  }
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError("Invalid typed array length");
    }
    var buf = new Uint8Array(length);
    buf.__proto__ = Buffer.prototype;
    return buf;
  }
  function Buffer(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new Error("If encoding is specified then the first argument must be a string");
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  if (typeof Symbol !== "undefined" && Symbol.species && Buffer[Symbol.species] === Buffer) {
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true,
      enumerable: false,
      writable: false
    });
  }
  Buffer.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "number") {
      throw new TypeError("\"value\" argument must not be a number");
    }
    if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    return fromObject(value);
  }
  Buffer.from = function (value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError("\"size\" argument must be a number");
    } else if (size < 0) {
      throw new RangeError("\"size\" argument must not be negative");
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== undefined) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer.alloc = function (size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(size);
  };
  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError("\"encoding\" must be a valid string encoding");
    }
    var length = byteLength(string, encoding) | 0;
    var buf = createBuffer(length);
    var actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    var buf = createBuffer(length);
    for (var i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayBuffer(array, byteOffset, length) {
    array.byteLength;
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError("'offset' is out of bounds");
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError("'length' is out of bounds");
    }
    var buf;
    if (byteOffset === undefined && length === undefined) {
      buf = new Uint8Array(array);
    } else if (length === undefined) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    buf.__proto__ = Buffer.prototype;
    return buf;
  }
  function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
      var len = checked(obj.length) | 0;
      var buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj) {
      if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || ("length" in obj)) {
        if (typeof obj.length !== "number" || isnan(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer.alloc(+length);
  }
  Buffer.isBuffer = function isBuffer(b) {
    return !!(b != null && b._isBuffer);
  };
  Buffer.compare = function compare(a, b) {
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
      throw new TypeError("Arguments must be Buffers");
    }
    if (a === b) return 0;
    var x = a.length;
    var y = b.length;
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError("\"list\" argument must be an Array of Buffers");
    }
    if (list.length === 0) {
      return Buffer.alloc(0);
    }
    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (!Buffer.isBuffer(buf)) {
        throw new TypeError("\"list\" argument must be an Array of Buffers");
      }
      buf.copy(buffer, pos);
      pos += buf.length;
    }
    return buffer;
  };
  function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) {
      return string.length;
    }
    if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      string = "" + string;
    }
    var len = string.length;
    if (len === 0) return 0;
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
        case undefined:
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;
  function slowToString(encoding, start, end) {
    var loweredCase = false;
    if (start === undefined || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === undefined || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding) encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.prototype._isBuffer = true;
  function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  Buffer.prototype.swap16 = function swap16() {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer.prototype.swap32 = function swap32() {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer.prototype.swap64 = function swap64() {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer.prototype.toString = function toString() {
    var length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
  };
  Buffer.prototype.inspect = function inspect() {
    var str = "";
    var max = exports.INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
      if (this.length > max) str += " ... ";
    }
    return "<Buffer " + str + ">";
  };
  Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (!Buffer.isBuffer(target)) {
      throw new TypeError("Argument must be a Buffer");
    }
    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
      thisStart = 0;
    }
    if (thisEnd === undefined) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);
    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0) return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (isNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1; else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0; else return -1;
    }
    if (typeof val === "string") {
      val = Buffer.from(val, encoding);
    }
    if (Buffer.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i) {
      if (indexSize === 1) {
        return buf[i];
      } else {
        return buf.readUInt16BE(i * indexSize);
      }
    }
    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found) return i;
      }
    }
    return -1;
  }
  Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    var strLen = string.length;
    if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed)) return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function latin1Write(buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer.prototype.write = function write(string, offset, length, encoding) {
    if (offset === undefined) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === undefined && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === undefined) encoding = "utf8";
      } else {
        encoding = length;
        length = undefined;
      }
    } else {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding) encoding = "utf8";
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
          return asciiWrite(this, string, offset, length);
        case "latin1":
        case "binary":
          return latin1Write(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    var res = "";
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    var out = "";
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start) end = start;
    var newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }
    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 256)) {
      val += this[offset + --byteLength] * mul;
    }
    return val;
  };
  Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
  };
  Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
  };
  Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128)) return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError("\"buffer\" argument must be a Buffer instance");
    if (value > max || value < min) throw new RangeError("\"value\" argument is out of bounds");
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
  }
  Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    var mul = 1;
    var i = 0;
    this[offset] = value & 255;
    while (++i < byteLength && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);
      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);
      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
    if (value < 0) value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0) value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8, 1.7976931348623157e+308, -1.7976931348623157e+308);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    var len = end - start;
    var i;
    if (this === target && start < targetStart && targetStart < end) {
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000) {
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
    }
    return len;
  };
  Buffer.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (val.length === 1) {
        var code = val.charCodeAt(0);
        if (code < 256) {
          val = code;
        }
      }
      if (encoding !== undefined && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
    } else if (typeof val === "number") {
      val = val & 255;
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    var i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = Buffer.isBuffer(val) ? val : new Buffer(val, encoding);
      var len = bytes.length;
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = stringtrim(str).replace(INVALID_BASE64_RE, "");
    if (str.length < 2) return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function stringtrim(str) {
    if (str.trim) return str.trim();
    return str.replace(/^\s+|\s+$/g, "");
  }
  function toHex(n) {
    if (n < 16) return "0" + n.toString(16);
    return n.toString(16);
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0) break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0) break;
        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0) break;
        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length) break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isnan(val) {
    return val !== val;
  }
}

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("stream", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
if (FuseBox.isServer) {
  module.exports = global.require("stream");
} else {
  module.exports = require("stream-browserify");
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
FuseBox.pkg("base64-js", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
"use strict";
exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}
revLookup[("-").charCodeAt(0)] = 62;
revLookup[("_").charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
  }
  return parts.join("");
}

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("ieee754", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
var buffer = require("buffer").Buffer;
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; (e = e * 256 + buffer[offset + i], i += d, nBits -= 8)) {}
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; (m = m * 256 + buffer[offset + i], i += d, nBits -= 8)) {}
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; (buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8)) {}
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; (buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8)) {}
  buffer[offset + i - d] |= s * 128;
};

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("stream-browserify", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
module.exports = Stream;
var EE = require("events").EventEmitter;
var inherits = require("inherits/inherits_browser.js");
inherits(Stream, EE);
Stream.Readable = require("readable-stream/readable-browser.js");
Stream.Writable = require("readable-stream/writable-browser.js");
Stream.Duplex = require("readable-stream/duplex-browser.js");
Stream.Transform = require("readable-stream/transform.js");
Stream.PassThrough = require("readable-stream/passthrough.js");
Stream.Stream = Stream;
function Stream() {
  EE.call(this);
}
Stream.prototype.pipe = function (dest, options) {
  var source = this;
  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }
  source.on("data", ondata);
  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }
  dest.on("drain", ondrain);
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on("end", onend);
    source.on("close", onclose);
  }
  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;
    dest.end();
  }
  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;
    if (typeof dest.destroy === "function") dest.destroy();
  }
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, "error") === 0) {
      throw er;
    }
  }
  source.on("error", onerror);
  dest.on("error", onerror);
  function cleanup() {
    source.removeListener("data", ondata);
    dest.removeListener("drain", ondrain);
    source.removeListener("end", onend);
    source.removeListener("close", onclose);
    source.removeListener("error", onerror);
    dest.removeListener("error", onerror);
    source.removeListener("end", cleanup);
    source.removeListener("close", cleanup);
    dest.removeListener("close", cleanup);
  }
  source.on("end", cleanup);
  source.on("close", cleanup);
  dest.on("close", cleanup);
  dest.emit("pipe", source);
  return dest;
};

});
	___scope___.entry = "index.js";
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
FuseBox.pkg("inherits", {}, function(___scope___){
___scope___.file("inherits_browser.js", function(exports, require, module){
if (typeof Object.create === "function") {
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

});
	___scope___.entry = "inherits_browser.js";
})
FuseBox.pkg("readable-stream", {}, function(___scope___){
___scope___.file("readable-browser.js", function(exports, require, module){
exports = module.exports = require("./lib/_stream_readable.js");
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require("./lib/_stream_writable.js");
exports.Duplex = require("./lib/_stream_duplex.js");
exports.Transform = require("./lib/_stream_transform.js");
exports.PassThrough = require("./lib/_stream_passthrough.js");

});
___scope___.file("lib/_stream_readable.js", function(exports, require, module){
var stream = require("stream");
var process = require("process");
"use strict";
var pna = require("process-nextick-args");
module.exports = Readable;
var isArray = require("isarray");
var Duplex;
Readable.ReadableState = ReadableState;
var EE = require("events").EventEmitter;
var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
var Stream = require("readable-stream/lib/internal/streams/stream-browser.js");
var Buffer = require("safe-buffer").Buffer;
var OurUint8Array = global.Uint8Array || (function () {});
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
var util = require("core-util-is");
util.inherits = require("inherits/inherits_browser.js");
var debugUtil = require("fuse-empty-package");
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog("stream");
} else {
  debug = function () {};
}
var BufferList = require("./internal/streams/BufferList");
var destroyImpl = require("./internal/streams/destroy");
var StringDecoder;
util.inherits(Readable, Stream);
var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
function prependListener(emitter, event, fn) {
  if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn); else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn); else emitter._events[event] = [fn, emitter._events[event]];
}
function ReadableState(options, stream) {
  Duplex = Duplex || require("./_stream_duplex");
  options = options || ({});
  var isDuplex = stream instanceof Duplex;
  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  if (hwm || hwm === 0) this.highWaterMark = hwm; else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm; else this.highWaterMark = defaultHwm;
  this.highWaterMark = Math.floor(this.highWaterMark);
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;
  this.sync = true;
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.destroyed = false;
  this.defaultEncoding = options.defaultEncoding || "utf8";
  this.awaitDrain = 0;
  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require("string_decoder/").StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {
  Duplex = Duplex || require("./_stream_duplex");
  if (!(this instanceof Readable)) return new Readable(options);
  this._readableState = new ReadableState(options, this);
  this.readable = true;
  if (options) {
    if (typeof options.read === "function") this._read = options.read;
    if (typeof options.destroy === "function") this._destroy = options.destroy;
  }
  Stream.call(this);
}
Object.defineProperty(Readable.prototype, "destroyed", {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    if (!this._readableState) {
      return;
    }
    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;
  if (!state.objectMode) {
    if (typeof chunk === "string") {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = "";
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }
  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};
function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit("error", er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (addToFront) {
        if (state.endEmitted) stream.emit("error", new Error("stream.unshift() after end event")); else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit("error", new Error("stream.push() after EOF"));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false); else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }
  return needMoreData(state);
}
function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit("data", chunk);
    stream.read(0);
  } else {
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk); else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}
function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== undefined && !state.objectMode) {
    er = new TypeError("Invalid non-string/buffer chunk");
  }
  return er;
}
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}
Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require("string_decoder/").StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};
var MAX_HWM = 8388608;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    if (state.flowing && state.length) return state.buffer.head.data.length; else return state.length;
  }
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}
Readable.prototype.read = function (n) {
  debug("read", n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false;
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug("read: emitReadable", state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this); else emitReadable(this);
    return null;
  }
  n = howMuchToRead(n, state);
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }
  var doRead = state.needReadable;
  debug("need readable", doRead);
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug("length less than watermark", doRead);
  }
  if (state.ended || state.reading) {
    doRead = false;
    debug("reading or ended", doRead);
  } else if (doRead) {
    debug("do read");
    state.reading = true;
    state.sync = true;
    if (state.length === 0) state.needReadable = true;
    this._read(state.highWaterMark);
    state.sync = false;
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }
  var ret;
  if (n > 0) ret = fromList(n, state); else ret = null;
  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }
  if (state.length === 0) {
    if (!state.ended) state.needReadable = true;
    if (nOrig !== n && state.ended) endReadable(this);
  }
  if (ret !== null) this.emit("data", ret);
  return ret;
};
function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;
  emitReadable(stream);
}
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug("emitReadable", state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream); else emitReadable_(stream);
  }
}
function emitReadable_(stream) {
  debug("emit readable");
  stream.emit("readable");
  flow(stream);
}
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}
function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug("maybeReadMore read 0");
    stream.read(0);
    if (len === state.length) break; else len = state.length;
  }
  state.readingMore = false;
}
Readable.prototype._read = function (n) {
  this.emit("error", new Error("_read() is not implemented"));
};
Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;
  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn); else src.once("end", endFn);
  dest.on("unpipe", onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug("onunpipe");
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }
  function onend() {
    debug("onend");
    dest.end();
  }
  var ondrain = pipeOnDrain(src);
  dest.on("drain", ondrain);
  var cleanedUp = false;
  function cleanup() {
    debug("cleanup");
    dest.removeListener("close", onclose);
    dest.removeListener("finish", onfinish);
    dest.removeListener("drain", ondrain);
    dest.removeListener("error", onerror);
    dest.removeListener("unpipe", onunpipe);
    src.removeListener("end", onend);
    src.removeListener("end", unpipe);
    src.removeListener("data", ondata);
    cleanedUp = true;
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }
  var increasedAwaitDrain = false;
  src.on("data", ondata);
  function ondata(chunk) {
    debug("ondata");
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug("false write response, pause", src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }
  function onerror(er) {
    debug("onerror", er);
    unpipe();
    dest.removeListener("error", onerror);
    if (EElistenerCount(dest, "error") === 0) dest.emit("error", er);
  }
  prependListener(dest, "error", onerror);
  function onclose() {
    dest.removeListener("finish", onfinish);
    unpipe();
  }
  dest.once("close", onclose);
  function onfinish() {
    debug("onfinish");
    dest.removeListener("close", onclose);
    unpipe();
  }
  dest.once("finish", onfinish);
  function unpipe() {
    debug("unpipe");
    src.unpipe(dest);
  }
  dest.emit("pipe", src);
  if (!state.flowing) {
    debug("pipe resume");
    src.resume();
  }
  return dest;
};
function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug("pipeOnDrain", state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
      state.flowing = true;
      flow(src);
    }
  };
}
Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  };
  if (state.pipesCount === 0) return this;
  if (state.pipesCount === 1) {
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit("unpipe", this, unpipeInfo);
    return this;
  }
  if (!dest) {
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    for (var i = 0; i < len; i++) {
      dests[i].emit("unpipe", this, unpipeInfo);
    }
    return this;
  }
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit("unpipe", this, unpipeInfo);
  return this;
};
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  if (ev === "data") {
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === "readable") {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }
  return res;
};
Readable.prototype.addListener = Readable.prototype.on;
function nReadingNextTick(self) {
  debug("readable nexttick read 0");
  self.read(0);
}
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug("resume");
    state.flowing = true;
    resume(this, state);
  }
  return this;
};
function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}
function resume_(stream, state) {
  if (!state.reading) {
    debug("resume read 0");
    stream.read(0);
  }
  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit("resume");
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}
Readable.prototype.pause = function () {
  debug("call pause flowing=%j", this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug("pause");
    this._readableState.flowing = false;
    this.emit("pause");
  }
  return this;
};
function flow(stream) {
  var state = stream._readableState;
  debug("flow", state.flowing);
  while (state.flowing && stream.read() !== null) {}
}
Readable.prototype.wrap = function (stream) {
  var _this = this;
  var state = this._readableState;
  var paused = false;
  stream.on("end", function () {
    debug("wrapped end");
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }
    _this.push(null);
  });
  stream.on("data", function (chunk) {
    debug("wrapped data");
    if (state.decoder) chunk = state.decoder.write(chunk);
    if (state.objectMode && (chunk === null || chunk === undefined)) return; else if (!state.objectMode && (!chunk || !chunk.length)) return;
    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === "function") {
      this[i] = (function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      })(i);
    }
  }
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }
  this._read = function (n) {
    debug("wrapped _read", n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };
  return this;
};
Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});
Readable._fromList = fromList;
function fromList(n, state) {
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift(); else if (!n || n >= state.length) {
    if (state.decoder) ret = state.buffer.join(""); else if (state.buffer.length === 1) ret = state.buffer.head.data; else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    ret = fromListPartial(n, state.buffer, state.decoder);
  }
  return ret;
}
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    ret = list.shift();
  } else {
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str; else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next; else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next; else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}
function endReadable(stream) {
  var state = stream._readableState;
  if (state.length > 0) throw new Error("\"endReadable()\" called on non-empty stream");
  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}
function endReadableNT(state, stream) {
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit("end");
  }
}
function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

});
___scope___.file("lib/internal/streams/stream-browser.js", function(exports, require, module){
module.exports = require("events").EventEmitter;

});
___scope___.file("lib/internal/streams/BufferList.js", function(exports, require, module){
"use strict";
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Buffer = require("safe-buffer").Buffer;
var util = require("fuse-empty-package");
function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}
module.exports = (function () {
  function BufferList() {
    _classCallCheck(this, BufferList);
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  BufferList.prototype.push = function push(v) {
    var entry = {
      data: v,
      next: null
    };
    if (this.length > 0) this.tail.next = entry; else this.head = entry;
    this.tail = entry;
    ++this.length;
  };
  BufferList.prototype.unshift = function unshift(v) {
    var entry = {
      data: v,
      next: this.head
    };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };
  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null; else this.head = this.head.next;
    --this.length;
    return ret;
  };
  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };
  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return "";
    var p = this.head;
    var ret = "" + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }
    return ret;
  };
  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };
  return BufferList;
})();
if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({
      length: this.length
    });
    return this.constructor.name + " " + obj;
  };
}

});
___scope___.file("lib/internal/streams/destroy.js", function(exports, require, module){
"use strict";
var pna = require("process-nextick-args");
function destroy(err, cb) {
  var _this = this;
  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;
  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }
  if (this._readableState) {
    this._readableState.destroyed = true;
  }
  if (this._writableState) {
    this._writableState.destroyed = true;
  }
  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
  return this;
}
function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }
  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}
function emitErrorNT(self, err) {
  self.emit("error", err);
}
module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

});
___scope___.file("lib/_stream_writable.js", function(exports, require, module){
var process = require("process");
var stream = require("stream");
"use strict";
var pna = require("process-nextick-args");
module.exports = Writable;
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}
function CorkedRequest(state) {
  var _this = this;
  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
var Duplex;
Writable.WritableState = WritableState;
var util = require("core-util-is");
util.inherits = require("inherits/inherits_browser.js");
var internalUtil = {
  deprecate: require("util-deprecate/browser.js")
};
var Stream = require("readable-stream/lib/internal/streams/stream-browser.js");
var Buffer = require("safe-buffer").Buffer;
var OurUint8Array = global.Uint8Array || (function () {});
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
var destroyImpl = require("./internal/streams/destroy");
util.inherits(Writable, Stream);
function nop() {}
function WritableState(options, stream) {
  Duplex = Duplex || require("./_stream_duplex");
  options = options || ({});
  var isDuplex = stream instanceof Duplex;
  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  if (hwm || hwm === 0) this.highWaterMark = hwm; else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm; else this.highWaterMark = defaultHwm;
  this.highWaterMark = Math.floor(this.highWaterMark);
  this.finalCalled = false;
  this.needDrain = false;
  this.ending = false;
  this.ended = false;
  this.finished = false;
  this.destroyed = false;
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;
  this.defaultEncoding = options.defaultEncoding || "utf8";
  this.length = 0;
  this.writing = false;
  this.corked = 0;
  this.sync = true;
  this.bufferProcessing = false;
  this.onwrite = function (er) {
    onwrite(stream, er);
  };
  this.writecb = null;
  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null;
  this.pendingcb = 0;
  this.prefinished = false;
  this.errorEmitted = false;
  this.bufferedRequestCount = 0;
  this.corkedRequestsFree = new CorkedRequest(this);
}
WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};
(function () {
  try {
    Object.defineProperty(WritableState.prototype, "buffer", {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer " + "instead.", "DEP0003")
    });
  } catch (_) {}
})();
var realHasInstance;
if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}
function Writable(options) {
  Duplex = Duplex || require("./_stream_duplex");
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }
  this._writableState = new WritableState(options, this);
  this.writable = true;
  if (options) {
    if (typeof options.write === "function") this._write = options.write;
    if (typeof options.writev === "function") this._writev = options.writev;
    if (typeof options.destroy === "function") this._destroy = options.destroy;
    if (typeof options.final === "function") this._final = options.final;
  }
  Stream.call(this);
}
Writable.prototype.pipe = function () {
  this.emit("error", new Error("Cannot pipe, not readable"));
};
function writeAfterEnd(stream, cb) {
  var er = new Error("write after end");
  stream.emit("error", er);
  pna.nextTick(cb, er);
}
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  if (chunk === null) {
    er = new TypeError("May not write null values to stream");
  } else if (typeof chunk !== "string" && chunk !== undefined && !state.objectMode) {
    er = new TypeError("Invalid non-string/buffer chunk");
  }
  if (er) {
    stream.emit("error", er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}
Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);
  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }
  if (typeof encoding === "function") {
    cb = encoding;
    encoding = null;
  }
  if (isBuf) encoding = "buffer"; else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== "function") cb = nop;
  if (state.ended) writeAfterEnd(this, cb); else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};
Writable.prototype.cork = function () {
  var state = this._writableState;
  state.corked++;
};
Writable.prototype.uncork = function () {
  var state = this._writableState;
  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  if (typeof encoding === "string") encoding = encoding.toLowerCase();
  if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};
function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}
Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = "buffer";
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark;
  if (!ret) state.needDrain = true;
  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }
  return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite); else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}
function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) {
    pna.nextTick(cb, er);
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit("error", er);
  } else {
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit("error", er);
    finishMaybe(stream, state);
  }
}
function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}
function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb); else {
    var finished = needFinish(state);
    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }
    if (sync) {
      asyncWrite(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}
function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit("drain");
  }
}
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;
  if (stream._writev && entry && entry.next) {
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, "", holder.finish);
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      if (state.writing) {
        break;
      }
    }
    if (entry === null) state.lastBufferedRequest = null;
  }
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}
Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error("_write() is not implemented"));
};
Writable.prototype._writev = null;
Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;
  if (typeof chunk === "function") {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === "function") {
    cb = encoding;
    encoding = null;
  }
  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};
function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit("error", err);
    }
    state.prefinished = true;
    stream.emit("prefinish");
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === "function") {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit("prefinish");
    }
  }
}
function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit("finish");
    }
  }
  return need;
}
function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb); else stream.once("finish", cb);
  }
  state.ended = true;
  stream.writable = false;
}
function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}
Object.defineProperty(Writable.prototype, "destroyed", {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    if (!this._writableState) {
      return;
    }
    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};

});
___scope___.file("lib/_stream_duplex.js", function(exports, require, module){
"use strict";
var pna = require("process-nextick-args");
var objectKeys = Object.keys || (function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
});
module.exports = Duplex;
var util = require("core-util-is");
util.inherits = require("inherits/inherits_browser.js");
var Readable = require("./_stream_readable");
var Writable = require("./_stream_writable");
util.inherits(Duplex, Readable);
{
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}
function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  if (options && options.readable === false) this.readable = false;
  if (options && options.writable === false) this.writable = false;
  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
  this.once("end", onend);
}
Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});
function onend() {
  if (this.allowHalfOpen || this._writableState.ended) return;
  pna.nextTick(onEndNT, this);
}
function onEndNT(self) {
  self.end();
}
Object.defineProperty(Duplex.prototype, "destroyed", {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();
  pna.nextTick(cb, err);
};

});
___scope___.file("lib/_stream_transform.js", function(exports, require, module){
var stream = require("stream");
"use strict";
module.exports = Transform;
var Duplex = require("./_stream_duplex");
var util = require("core-util-is");
util.inherits = require("inherits/inherits_browser.js");
util.inherits(Transform, Duplex);
function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;
  if (!cb) {
    return this.emit("error", new Error("write callback called multiple times"));
  }
  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}
function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };
  this._readableState.needReadable = true;
  this._readableState.sync = false;
  if (options) {
    if (typeof options.transform === "function") this._transform = options.transform;
    if (typeof options.flush === "function") this._flush = options.flush;
  }
  this.on("prefinish", prefinish);
}
function prefinish() {
  var _this = this;
  if (typeof this._flush === "function") {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}
Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error("_transform() is not implemented");
};
Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};
Transform.prototype._read = function (n) {
  var ts = this._transformState;
  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    ts.needTransform = true;
  }
};
Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit("close");
  });
};
function done(stream, er, data) {
  if (er) return stream.emit("error", er);
  if (data != null) stream.push(data);
  if (stream._writableState.length) throw new Error("Calling transform done when ws.length != 0");
  if (stream._transformState.transforming) throw new Error("Calling transform done when still transforming");
  return stream.push(null);
}

});
___scope___.file("lib/_stream_passthrough.js", function(exports, require, module){
"use strict";
module.exports = PassThrough;
var Transform = require("./_stream_transform");
var util = require("core-util-is");
util.inherits = require("inherits/inherits_browser.js");
util.inherits(PassThrough, Transform);
function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}
PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

});
___scope___.file("writable-browser.js", function(exports, require, module){
module.exports = require("./lib/_stream_writable.js");

});
___scope___.file("duplex-browser.js", function(exports, require, module){
module.exports = require("./lib/_stream_duplex.js");

});
___scope___.file("transform.js", function(exports, require, module){
module.exports = require("readable-stream/readable-browser.js").Transform;

});
___scope___.file("readable-browser.js", function(exports, require, module){
exports = module.exports = require("./lib/_stream_readable.js");
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require("./lib/_stream_writable.js");
exports.Duplex = require("./lib/_stream_duplex.js");
exports.Transform = require("./lib/_stream_transform.js");
exports.PassThrough = require("./lib/_stream_passthrough.js");

});
___scope___.file("passthrough.js", function(exports, require, module){
module.exports = require("readable-stream/readable-browser.js").PassThrough;

});
})
FuseBox.pkg("process-nextick-args", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
var process = require("process");
"use strict";
if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {
  module.exports = {
    nextTick: nextTick
  };
} else {
  module.exports = process;
}
function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== "function") {
    throw new TypeError("\"callback\" argument must be a function");
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
    case 0:
    case 1:
      return process.nextTick(fn);
    case 2:
      return process.nextTick(function afterTickOne() {
        fn.call(null, arg1);
      });
    case 3:
      return process.nextTick(function afterTickTwo() {
        fn.call(null, arg1, arg2);
      });
    case 4:
      return process.nextTick(function afterTickThree() {
        fn.call(null, arg1, arg2, arg3);
      });
    default:
      args = new Array(len - 1);
      i = 0;
      while (i < args.length) {
        args[i++] = arguments[i];
      }
      return process.nextTick(function afterTick() {
        fn.apply(null, args);
      });
  }
}

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("process", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
if (FuseBox.isServer) {
  if (typeof __process_env__ !== "undefined") {
    Object.assign(global.process.env, __process_env__);
  }
  module.exports = global.process;
} else {
  if (typeof Object.assign != "function") {
    Object.assign = function (target, varArgs) {
      "use strict";
      if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    };
  }
  var productionEnv = false;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function () {
    this.fun.apply(null, this.array);
  };
  process.title = "browser";
  process.browser = true;
  process.env = FuseBox.processEnv;
  if (typeof __process_env__ !== "undefined") {
    Object.assign(process.env, __process_env__);
  }
  process.argv = [];
  process.version = "";
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function (name) {
    throw new Error("process.binding is not supported");
  };
  process.cwd = function () {
    return "/";
  };
  process.chdir = function (dir) {
    throw new Error("process.chdir is not supported");
  };
  process.umask = function () {
    return 0;
  };
}

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("isarray", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
var toString = ({}).toString;
module.exports = Array.isArray || (function (arr) {
  return toString.call(arr) == "[object Array]";
});

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("safe-buffer", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
var buffer = require("buffer");
var Buffer = buffer.Buffer;
function copyProps(src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length);
}
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === "number") {
    throw new TypeError("Argument must not be a number");
  }
  return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== "number") {
    throw new TypeError("Argument must be a number");
  }
  var buf = Buffer(size);
  if (fill !== undefined) {
    if (typeof encoding === "string") {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }
  return buf;
};
SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== "number") {
    throw new TypeError("Argument must be a number");
  }
  return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== "number") {
    throw new TypeError("Argument must be a number");
  }
  return buffer.SlowBuffer(size);
};

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("core-util-is", {}, function(___scope___){
___scope___.file("lib/util.js", function(exports, require, module){
var Buffer = require("buffer").Buffer;
function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === "[object Array]";
}
exports.isArray = isArray;
function isBoolean(arg) {
  return typeof arg === "boolean";
}
exports.isBoolean = isBoolean;
function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;
function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isNumber(arg) {
  return typeof arg === "number";
}
exports.isNumber = isNumber;
function isString(arg) {
  return typeof arg === "string";
}
exports.isString = isString;
function isSymbol(arg) {
  return typeof arg === "symbol";
}
exports.isSymbol = isSymbol;
function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;
function isRegExp(re) {
  return objectToString(re) === "[object RegExp]";
}
exports.isRegExp = isRegExp;
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
exports.isObject = isObject;
function isDate(d) {
  return objectToString(d) === "[object Date]";
}
exports.isDate = isDate;
function isError(e) {
  return objectToString(e) === "[object Error]" || e instanceof Error;
}
exports.isError = isError;
function isFunction(arg) {
  return typeof arg === "function";
}
exports.isFunction = isFunction;
function isPrimitive(arg) {
  return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
}
exports.isPrimitive = isPrimitive;
exports.isBuffer = Buffer.isBuffer;
function objectToString(o) {
  return Object.prototype.toString.call(o);
}

});
	___scope___.entry = "lib/util.js";
})
FuseBox.pkg("fuse-empty-package", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
module.exports = undefined;

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("string_decoder", {}, function(___scope___){
___scope___.file("lib/string_decoder.js", function(exports, require, module){
"use strict";
var Buffer = require("safe-buffer").Buffer;
var isEncoding = Buffer.isEncoding || (function (encoding) {
  encoding = "" + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
    case "raw":
      return true;
    default:
      return false;
  }
});
function _normalizeEncoding(enc) {
  if (!enc) return "utf8";
  var retried;
  while (true) {
    switch (enc) {
      case "utf8":
      case "utf-8":
        return "utf8";
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return "utf16le";
      case "latin1":
      case "binary":
        return "latin1";
      case "base64":
      case "ascii":
      case "hex":
        return enc;
      default:
        if (retried) return;
        enc = ("" + enc).toLowerCase();
        retried = true;
    }
  }
}
;
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== "string" && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
  return nenc || enc;
}
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case "utf16le":
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case "utf8":
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case "base64":
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}
StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return "";
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return "";
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || "";
};
StringDecoder.prototype.end = utf8End;
StringDecoder.prototype.text = utf8Text;
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};
function utf8CheckByte(byte) {
  if (byte <= 127) return 0; else if (byte >> 5 === 6) return 2; else if (byte >> 4 === 14) return 3; else if (byte >> 3 === 30) return 4;
  return byte >> 6 === 2 ? -1 : -2;
}
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0; else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 192) !== 128) {
    self.lastNeed = 0;
    return "�";
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 192) !== 128) {
      self.lastNeed = 1;
      return "�";
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 192) !== 128) {
        self.lastNeed = 2;
        return "�";
      }
    }
  }
}
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString("utf8", i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString("utf8", i, end);
}
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed) return r + "�";
  return r;
}
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString("utf16le", i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 55296 && c <= 56319) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString("utf16le", i, buf.length - 1);
}
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString("utf16le", 0, end);
  }
  return r;
}
function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString("base64", i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString("base64", i, buf.length - n);
}
function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
  return r;
}
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}
function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : "";
}

});
	___scope___.entry = "lib/string_decoder.js";
})
FuseBox.pkg("util-deprecate", {}, function(___scope___){
___scope___.file("browser.js", function(exports, require, module){
module.exports = deprecate;
function deprecate(fn, msg) {
  if (config("noDeprecation")) {
    return fn;
  }
  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config("throwDeprecation")) {
        throw new Error(msg);
      } else if (config("traceDeprecation")) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
}
function config(name) {
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === "true";
}

});
	___scope___.entry = "browser.js";
})