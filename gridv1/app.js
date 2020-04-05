(function() {
  var f = window.__fuse = window.__fuse || {};
  var modules = f.modules = f.modules || {}; f.dt = function (x) { return x && x.__esModule ? x : { "default": x }; };

f.modules = modules;
  f.bundle = function(collection, fn) {
    for (var num in collection) {
      modules[num] = collection[num];
    }
    fn ? fn() : void 0;
  };
  f.c = {};
  f.r = function(id) {
    var cached = f.c[id];
    if (cached) return cached.m.exports;
    var module = modules[id];
    if (!module) {
      
      throw new Error('Module ' + id + ' was not found');
    }
    cached = f.c[id] = {};
    cached.exports = {};
    cached.m = { exports: cached.exports };
    module(f.r, cached.exports, cached.m);
    return cached.m.exports;
  }; 
})();
__fuse.bundle({

// samples/grid-sample/src/fuseHmrPlugin.ts @2
2: function(__fusereq, exports, module){
exports.__esModule = true;
function __DefaultExport__(payload, helper) {
  const {updates} = payload;
  window.dispatchEvent(new CustomEvent('HMR-FUSEBOX'));
  if (helper.isStylesheeetUpdate) {
    helper.flushModules(updates);
    helper.updateModules();
    helper.callModules(updates);
  } else {
    helper.flushAll();
    helper.updateModules();
    helper.callEntries();
  }
}
exports.default = __DefaultExport__;

},

// samples/grid-sample/src/hmr.ts @4
4: function(__fusereq, exports, module){
exports.__esModule = true;
var custom_elements_hmr_polyfill_1 = __fusereq(12);
custom_elements_hmr_polyfill_1.rerenderInnerHTML();
custom_elements_hmr_polyfill_1.applyPolyfill(custom_elements_hmr_polyfill_1.ReflowStrategy.NONE, -1, elementName => {
  console.log(elementName, 'updated');
});

},

// packages/grid/src/grid.css @5
5: function(__fusereq, exports, module){
__fusereq(6)("packages/grid/src/grid.css",".free-grid {\r\n    --freegrid-main-bg-color: #5a5a5a;\r\n    --freegrid-sec-bg-color: #616060;\r\n    --freegrid-alt-bg-color: #797979;\r\n    --freegrid-main-bg-border: #464444;\r\n    --freegrid-sec-bg-border:#565656;\r\n    --freegrid-main-bg-selected: #4b4d4e;\r\n    --freegrid-main-font-color: #eae6e6;\r\n    --freegrid-sec-font-color: #979494;\r\n    --freegrid-font-size: 11px;\r\n    --freegrid-font-weight: 500;\r\n    --freegrid-font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;\r\n    border: 0;\r\n    -webkit-touch-callout: none;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    overflow: hidden;\r\n    display: block;\r\n    position: relative;\r\n    outline-color: var(--freegrid-main-bg-color);\r\n    font-family: var(--freegrid-font-family);\r\n    font-size: var(--freegrid-font-size);\r\n    font-weight: var(--freegrid-font-weight);\r\n    color: var(--freegrid-main-font-color);\r\n    background-color: var(--freegrid-main-bg-color);\r\n}\r\n\r\nfree-grid-body::-webkit-scrollbar {\r\n    width: 1em;\r\n}\r\nfree-grid-body::-webkit-scrollbar-track {\r\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\r\n}\r\nfree-grid-body::-webkit-scrollbar-thumb {\r\n    background-color: var(--freegrid-main-bg-selected);\r\n    outline: 1px solid var(--freegrid-main-bg-border);\r\n}\r\n\r\n\r\n\r\n.free-grid .free-grid-row {\r\n    border: 0;\r\n    width: 100%;\r\n    min-width: 100%; /*without this left scrolltop will not be set when hidden*/\r\n    border-bottom: 1px solid var(--freegrid-main-bg-border);\r\n    box-sizing: border-box;\r\n    position: absolute;\r\n    overflow: hidden;\r\n}\r\n\r\n\r\n.free-grid input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */\r\n    color: var(--freegrid-sec-font-color);;\r\n    opacity: 1; /* Firefox */\r\n  }\r\n\r\n.free-grid .free-grid-col {\r\n    border: 0;\r\n    border-right: 1px solid var(--freegrid-main-bg-border);\r\n    /* border-top: 1px solid var(--freegrid-main-bg-border); */\r\n    box-sizing: border-box;\r\n    position: absolute;\r\n    height: 100%;\r\n}\r\n\r\n.free-grid .free-grid-panel {\r\n    border: 0;\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    width: 100%;\r\n    top: 0;\r\n    background-color: var(--freegrid-main-bg-color);\r\n    border-left: 1px solid var(--freegrid-main-bg-border);\r\n    border-right: 1px solid var(--freegrid-main-bg-border);\r\n    border-top: 1px solid var(--freegrid-main-bg-border);\r\n}\r\n\r\n.free-grid .free-grid-footer {\r\n    border: 0;\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    width: 100%;\r\n    bottom: 0;\r\n    border-top: 1px solid var(--freegrid-main-bg-border);\r\n    background-color: var(--freegrid-main-bg-color);\r\n    border-left: 1px solid var(--freegrid-main-bg-border);\r\n    border-right: 1px solid var(--freegrid-main-bg-border);\r\n    border-bottom: 1px solid var(--freegrid-main-bg-border);\r\n}\r\n\r\n.free-grid .free-grid-header {\r\n    border: 0;\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    display: inline-block;\r\n    min-width: 100%;\r\n    background-color: var(--freegrid-main-bg-color);\r\n    border-right: 1px solid var(--freegrid-main-bg-border);\r\n    border-top: 1px solid var(--freegrid-main-bg-border);\r\n}\r\n\r\n.free-grid .free-grid-body {\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    border-top: 1px solid var(--freegrid-main-bg-border);\r\n    \r\n    min-width: 100%;\r\n    overflow-y: auto;\r\n}\r\n\r\n.free-grid .free-grid-content {\r\n    background-color: var(--freegrid-sec-bg-color);\r\n    min-width: 100%;\r\n    z-index: 6;\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    height: 100%;\r\n    overflow: hidden;\r\n    overflow-x: hidden;\r\n    overflow-y: hidden;\r\n}\r\n\r\n.free-grid .free-grid-group-row {\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    border: 0;\r\n    border-right: 1px solid var(--freegrid-sec-bg-border);\r\n}\r\n\r\n.free-grid .free-grid-group-filter {\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    border: 0;\r\n    border-right: 1px solid var(--freegrid-sec-bg-border);\r\n\r\n}\r\n\r\n.free-grid .free-grid-group-label {\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    border: 0;\r\n    border-right: 1px solid var(--freegrid-sec-bg-border);\r\n}\r\n\r\n\r\n\r\n\r\n.free-grid .free-grid-cell-label {\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    border: 0;\r\n    border-radius: initial;\r\n    box-shadow: initial;\r\n    border-bottom: 1px solid var(--freegrid-sec-bg-border);\r\n    border-right: 1px solid var(--freegrid-sec-bg-border);\r\n    background-color: var(--freegrid-sec-bg-color);\r\n    margin: initial;\r\n    transition: initial;\r\n    outline-color: var(--freegrid-main-bg-color);\r\n    color: var(--freegrid-main-font-color);\r\n \r\n}\r\n\r\n.free-grid .free-grid-image-round {\r\n    border-radius: 50%;\r\n    height: 100%;\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    left: 50%;\r\n    transform: translateX(-50%);\r\n}\r\n\r\n.free-grid .free-grid-cell-filter {\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    border: 0;\r\n    border-radius: initial;\r\n    box-shadow: initial;\r\n    border-top: 1px solid var(--freegrid-sec-bg-border);\r\n    border-right: 1px solid var(--freegrid-sec-bg-border);\r\n    background-color: var(--freegrid-alt-bg-color);\r\n    margin: initial;\r\n    transition: initial;\r\n    outline-color: var(--freegrid-main-bg-color);\r\n    color: var(--freegrid-main-font-color);\r\n    font-family: var(--freegrid-font-family);\r\n    font-size: var(--freegrid-font-size);\r\n    font-weight: var(--freegrid-font-weight);\r\n\r\n}\r\n\r\n.free-grid .free-grid-cell-row {\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    border: 0;\r\n    border-radius: initial;\r\n    box-shadow: initial;\r\n    border-bottom: 1px solid var(--freegrid-sec-bg-border);\r\n    border-right: 1px solid var(--freegrid-sec-bg-border);\r\n   \r\n    margin: initial;\r\n    transition: initial;\r\n    outline-color: var(--freegrid-main-bg-color);\r\n    color: var(--freegrid-main-font-color);\r\n\r\n}\r\n\r\n.free-grid .free-grid-row-checkbox {\r\n    width: initial;\r\n    opacity: initial;\r\n    position: initial;\r\n    display: block;\r\n    margin: auto;\r\n    padding-top: 2px;\r\n    height: 100%;\r\n    background-color: var(--freegrid-sec-bg-color);\r\n    color: var(--freegrid-main-font-color);\r\n}\r\n\r\n.free-grid .free-grid-row-input {\r\n    box-sizing: border-box;\r\n    border: 0;\r\n    position: absolute;\r\n    border-radius: initial;\r\n    box-shadow: initial;\r\n    width: 100%;\r\n    height: 100%;\r\n    padding-left: 5px;\r\n    background-color: transparent;\r\n    outline-color: var(--freegrid-main-bg-color);\r\n    color: var(--freegrid-main-font-color);\r\n    font-family: var(--freegrid-font-family);\r\n    font-size: var(--freegrid-font-size);\r\n    font-weight: var(--freegrid-font-weight);\r\n}\r\n\r\n.free-grid .free-grid-label {\r\n    box-sizing: border-box;\r\n    border: 0;\r\n    border-radius: initial;\r\n    box-shadow: initial;\r\n    height: 100%;\r\n    width: 100%;\r\n    padding: 5px;\r\n    position: absolute;\r\n    text-align: center;\r\n    overflow: hidden;\r\n    user-select: none;\r\n    margin: initial;\r\n    font-family: var(--freegrid-font-family);\r\n    font-size: var(--freegrid-font-size);\r\n    font-weight: var(--freegrid-font-weight);\r\n}\r\n\r\n.free-grid .free-grid-selected-row {\r\n    box-shadow: none;\r\n    background-color: var(--freegrid-main-bg-selected);\r\n}\r\n\r\n.free-grid .free-grid-draggable-handler {\r\n    position: absolute;\r\n    cursor: w-resize;\r\n    width: 15px;\r\n    right: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n    z-index: 900;\r\n    border: initial;\r\n}\r\n\r\n.free-grid .free-grid-vGridDragHandle {\r\n    cursor: move;\r\n}\r\n\r\n.free-grid .free-grid-fa-sort-number[data-vgridsort]:after {\r\n    font: x-small;\r\n    font-size: 8px;\r\n    content: attr(data-vgridsort);\r\n}\r\n\r\n.free-grid .free-grid-icon {\r\n    fill: currentColor;\r\n    width: 1em;\r\n    height: 1em;\r\n    vertical-align: -0.15em;\r\n    overflow: hidden;\r\n    display: initial;\r\n}\r\n\r\n.free-grid .free-grid-iconhidden {\r\n    display: none;\r\n}\r\n\r\n.free-grid .free-grid-dragHandle {\r\n    cursor: move;\r\n}\r\n\r\n.free-grid.free-grid-drag {\r\n    border: 1px solid var(--freegrid-main-bg-border);\r\n    box-sizing: border-box;\r\n    box-shadow: initial;\r\n    line-height: 50%;\r\n    pointer-events: none;\r\n    background-color: var(--freegrid-main-bg-selected);\r\n    height: 25px;\r\n    display: block;\r\n    min-width: 100px;\r\n    position: absolute;\r\n    padding-top: 5px;\r\n    text-align: center;\r\n    z-index: 50;\r\n    font-weight: 700;\r\n    color: var(--freegrid-main-font-color);\r\n}\r\n\r\n.free-grid .free-grid-grouping-panel-container {\r\n    background-color: var(--freegrid-main-bg-color);\r\n    position: relative;\r\n    margin: 3px;\r\n    height: 80%;\r\n    box-sizing: border-box;\r\n    padding-left: 10px;\r\n    padding-right: 10px;\r\n    display: block;\r\n    float: left;\r\n    border: 1px solid var(--freegrid-main-bg-border);\r\n}\r\n\r\n\r\n\r\n.free-grid .free-grid-grouping-row {\r\n    height: 100%;\r\n    box-sizing: border-box;\r\n    position: absolute;\r\n    background-color: var(--freegrid-main-bg-color);\r\n    border-right: 1px solid var(--freegrid-main-bg-border);\r\n}\r\n\r\n.free-grid .free-grid-col-group {\r\n    pointer-events: all;\r\n    box-sizing: border-box;\r\n    white-space: nowrap;\r\n    position: absolute;\r\n    border: 0;\r\n    border-radius: initial;\r\n    box-shadow: initial;\r\n    padding: 5px 10px;\r\n    height: 100%;\r\n    background-color: var(--freegrid-main-bg-color);\r\n}\r\n\r\n.free-grid .free-grid-grouping-panel-p {\r\n    box-sizing: border-box;\r\n    border: 0;\r\n    border-radius: initial;\r\n    box-shadow: initial;\r\n    height: 100%;\r\n    width: 100%;\r\n    position: relative;\r\n    margin: 0;\r\n    display: flex;\r\n    text-align: center;\r\n}\r\n\r\n.free-grid .free-grid-candrop {\r\n\r\n    background-color: var(--freegrid-alt-bg-color);\r\n}\r\n")
},

// samples/grid-sample/src/index.css @7
7: function(__fusereq, exports, module){
__fusereq(6)("samples/grid-sample/src/index.css",".m-1 {\r\n    margin-top: 10px;\r\n}\r\n\r\n.p-1 {\r\n    padding: 2px;\r\n}\r\n\r\n.flex{\r\n    display: flex;\r\n}\r\n\r\n.flex-col{\r\n    flex-direction: column;\r\n}\r\n\r\n.free-grid{\r\n \r\n    \r\n}\r\n")
},

// packages/grid/src/interfaces.ts @13
13: function(__fusereq, exports, module){
},

// packages/core/src/requestRender.ts @26
26: function(__fusereq, exports, module){
function requestRender(ctx) {
  if (ctx.isConnected) {
    if (ctx.__wait) {} else {
      ctx.__wait = true;
      requestAnimationFrame(async () => {
        await Promise.resolve(true);
        ctx.render();
        ctx.__wait = false;
      });
    }
  }
}
exports.requestRender = requestRender;

},

// packages/core/src/symbols.ts @60
60: function(__fusereq, exports, module){
function initSymbolCache() {
  if (!globalThis._LHF_SYMBOL) {
    globalThis._LHF_SYMBOL = {};
    globalThis._LHF_PROP_SYMBOL = {};
  }
}
exports.initSymbolCache = initSymbolCache;
function getObservedAttributesMapSymbol() {
  if (!globalThis._LHF_SYMBOL.observedAttributesMap) {
    globalThis._LHF_SYMBOL.observedAttributesMap = Symbol('observedAttributesMap');
    return globalThis._LHF_SYMBOL.observedAttributesMap;
  } else {
    return globalThis._LHF_SYMBOL.observedAttributesMap;
  }
}
exports.getObservedAttributesMapSymbol = getObservedAttributesMapSymbol;
function getObservedAttributesSymbol() {
  if (!globalThis._LHF_SYMBOL.observedAttributes) {
    globalThis._LHF_SYMBOL.observedAttributes = Symbol('observedAttributes');
    return globalThis._LHF_SYMBOL.observedAttributes;
  } else {
    return globalThis._LHF_SYMBOL.observedAttributes;
  }
}
exports.getObservedAttributesSymbol = getObservedAttributesSymbol;
function getPropSymbol(name) {
  if (!globalThis._LHF_PROP_SYMBOL[name]) {
    globalThis._LHF_PROP_SYMBOL[name] = Symbol(name);
    return globalThis._LHF_PROP_SYMBOL[name];
  } else {
    return globalThis._LHF_PROP_SYMBOL[name];
  }
}
exports.getPropSymbol = getPropSymbol;
function getLoggerSymbol() {
  if (!globalThis._LHF_SYMBOL.logger) {
    globalThis._LHF_SYMBOL.logger = Symbol('logger');
    return globalThis._LHF_SYMBOL.logger;
  } else {
    return globalThis._LHF_SYMBOL.logger;
  }
}
exports.getLoggerSymbol = getLoggerSymbol;
function getLoggerCountSymbol() {
  if (!globalThis._LHF_SYMBOL.loggerCount) {
    globalThis._LHF_SYMBOL.loggerCount = Symbol('loggerCount');
    return globalThis._LHF_SYMBOL.loggerCount;
  } else {
    return globalThis._LHF_SYMBOL.loggerCount;
  }
}
exports.getLoggerCountSymbol = getLoggerCountSymbol;
function getTransmitterSymbol() {
  if (!globalThis._LHF_SYMBOL.transmitter) {
    globalThis._LHF_SYMBOL.transmitter = Symbol('transmitter');
    return globalThis._LHF_SYMBOL.transmitter;
  } else {
    return globalThis._LHF_SYMBOL.transmitter;
  }
}
exports.getTransmitterSymbol = getTransmitterSymbol;
initSymbolCache();

},

// packages/core/src/logger.ts @21
21: function(__fusereq, exports, module){
exports.__esModule = true;
var symbols_1 = __fusereq(60);
let log = false;
let skipElements = [];
if (!globalThis[symbols_1.getLoggerSymbol()]) {
  globalThis[symbols_1.getLoggerSymbol()] = new WeakMap();
  globalThis[symbols_1.getLoggerCountSymbol()] = 0;
}
function enableInternalLogger(skip = []) {
  skipElements = skip;
  log = true;
}
exports.enableInternalLogger = enableInternalLogger;
function disableInternalLogger() {
  log = false;
}
exports.disableInternalLogger = disableInternalLogger;
function registerLoggerContext(context) {
  if (log) {
    const map = globalThis[symbols_1.getLoggerSymbol()];
    if (map.has(context)) {
      throw 'contxt duplicate';
    }
    let count = globalThis[symbols_1.getLoggerCountSymbol()] + 1;
    globalThis[symbols_1.getLoggerCountSymbol()] = count;
    map.set(context, count);
  }
}
function getID(ctx) {
  if (log) {
    const map = globalThis[symbols_1.getLoggerSymbol()];
    return map.get(ctx);
  }
}
function logger(name, ctx, tag) {
  if (log && skipElements.indexOf(tag) === -1) {
    let id = getID(ctx);
    if (!id) {
      registerLoggerContext(ctx);
    }
    id = getID(ctx);
    let text = name || '??' + '' + (id || '?');
    let x = 25 - Math.floor(text.length);
    let idOnly = '' + (id || '?');
    let y = 6 - Math.floor(idOnly.length);
    console.log(`@SIMPLE-HTML/core | ${name}${Array(x).join(' ')}| id:${id || '?'}${Array(y).join(' ')} | IsConnected:${ctx && ctx.isConnected === true ? 'Y' : 'N'} |  ${tag}`);
  }
}
exports.logger = logger;

},

// packages/core/src/attribute.ts @20
20: function(__fusereq, exports, module){
exports.__esModule = true;
var requestRender_1 = __fusereq(26);
var symbols_1 = __fusereq(60);
var logger_1 = __fusereq(21);
function attribute(options = {}) {
  return function reg(_class, prop) {
    Object.defineProperty(_class, prop, {
      get: function () {
        return this[symbols_1.getPropSymbol(this.tagName + '_' + prop)];
      },
      set: function (x) {
        logger_1.logger('attribute set', this, this.tagName);
        const oldValue = this[symbols_1.getPropSymbol(this.tagName + '_' + prop)];
        this[symbols_1.getPropSymbol(this.tagName + '_' + prop)] = x;
        if (this.valuesChanged && oldValue !== x) {
          this.valuesChanged('property', prop, oldValue, x);
        }
        if (oldValue !== x && !options.skipRender) {
          requestRender_1.requestRender(this);
        }
      },
      configurable: true
    });
    const attribute = prop.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
    if (!_class[symbols_1.getObservedAttributesMapSymbol()]) {
      _class[symbols_1.getObservedAttributesMapSymbol()] = new Map();
    }
    _class[symbols_1.getObservedAttributesMapSymbol()].set(attribute, prop);
    if (_class[symbols_1.getObservedAttributesSymbol()]) {
      _class[symbols_1.getObservedAttributesSymbol()].push(attribute);
    } else {
      _class[symbols_1.getObservedAttributesSymbol()] = [];
      _class[symbols_1.getObservedAttributesSymbol()].push(attribute);
    }
  };
}
exports.attribute = attribute;

},

// packages/core/src/property.ts @22
22: function(__fusereq, exports, module){
exports.__esModule = true;
var requestRender_1 = __fusereq(26);
var symbols_1 = __fusereq(60);
var logger_1 = __fusereq(21);
function property(options = {}) {
  return function reg(_class, prop) {
    Object.defineProperty(_class, prop, {
      get: function () {
        return this[symbols_1.getPropSymbol(this.tagName + '_' + prop)];
      },
      set: function (x) {
        logger_1.logger('property set', this, this.tagName);
        const oldValue = this[symbols_1.getPropSymbol(this.tagName + '_' + prop)];
        this[symbols_1.getPropSymbol(this.tagName + '_' + prop)] = x;
        if (this.valuesChanged && oldValue !== x) {
          this.valuesChanged('property', prop, oldValue, x);
        }
        if (oldValue !== x && !options.skipRender) {
          requestRender_1.requestRender(this);
        }
      },
      configurable: true
    });
  };
}
exports.property = property;

},

// packages/core/src/customElement.ts @23
23: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var requestRender_1 = __fusereq(26);
var symbols_1 = __fusereq(60);
var logger_1 = __fusereq(21);
function customElement(elementName, extended) {
  return function reg(elementClass) {
    let observedAttributes = elementClass.observedAttributes;
    Object.defineProperty(elementClass, 'observedAttributes', {
      set: function (value) {
        elementClass.prototype[symbols_1.getObservedAttributesSymbol()] = value;
        return true;
      },
      get: function () {
        return elementClass.prototype[symbols_1.getObservedAttributesSymbol()];
      },
      configurable: true
    });
    if (Array.isArray(observedAttributes) && Array.isArray(elementClass.observedAttributes)) {
      elementClass.observedAttributes = elementClass.observedAttributes.concat(observedAttributes);
    }
    const base = class extends elementClass {
      constructor() {
        super();
        logger_1.logger('constructor', this, super.tagName);
      }
      render(...result) {
        logger_1.logger('render', this, super.tagName);
        const template = super.render.call(this, ...result);
        Promise.resolve(template).then(templates => {
          lit_html_1.render(templates, this, {
            eventContext: this
          });
          if (super.updated) {
            setTimeout(() => {
              super.updated();
            });
          }
        });
      }
      connectedCallback() {
        logger_1.logger('connectedCallback', this, super.tagName);
        if (super.connectedCallback) {
          super.connectedCallback.call(this);
        }
        this.render(this);
      }
      disconnectedCallback() {
        logger_1.logger('disconnectedCallback', this, super.tagName);
        if (super.disconnectedCallback) {
          super.disconnectedCallback.call(this);
        }
      }
      attributeChangedCallback(name, oldValue, newValue) {
        logger_1.logger('attributeChangedCallback', this, super.tagName);
        if (!this[symbols_1.getObservedAttributesMapSymbol()]) {
          const attribute = name.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
          this[symbols_1.getObservedAttributesMapSymbol()] = new Map();
          this[symbols_1.getObservedAttributesMapSymbol()].set(attribute, name);
        }
        const nameProp = this[symbols_1.getObservedAttributesMapSymbol()].get(name);
        this[nameProp] = newValue || '';
        if (super.attributeChangedCallback) {
          super.attributeChangedCallback.call(this, name, oldValue, newValue);
        }
        if (super.valuesChangedMethod) {
          super.valuesChangedMethod('attribute', name, oldValue, newValue);
        }
        requestRender_1.requestRender(this);
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

},

// packages/core/src/transmitter.ts @24
24: function(__fusereq, exports, module){
exports.__esModule = true;
var symbols_1 = __fusereq(60);
if (!globalThis[symbols_1.getTransmitterSymbol()]) {
  globalThis[symbols_1.getTransmitterSymbol()] = {};
}
function transmitter() {
  return globalThis[symbols_1.getTransmitterSymbol()];
}
function publish(channel, ...args) {
  Promise.resolve().then(() => {
    if (Array.isArray(transmitter()[channel])) {
      for (let i = 0, len = transmitter()[channel].length; i < len; i++) {
        const ctx = transmitter()[channel][i].ctx;
        transmitter()[channel][i].func.apply(ctx, args);
      }
    }
  });
}
exports.publish = publish;
function publishSync(channel, ...args) {
  if (Array.isArray(transmitter()[channel])) {
    for (let i = 0, len = transmitter()[channel].length; i < len; i++) {
      const ctx = transmitter()[channel][i].ctx;
      transmitter()[channel][i].func.apply(ctx, args);
    }
  }
}
exports.publishSync = publishSync;
function publishNext(channel, ...args) {
  setTimeout(() => {
    if (Array.isArray(transmitter()[channel])) {
      for (let i = 0, len = transmitter()[channel].length; i < len; i++) {
        const ctx = transmitter()[channel][i].ctx;
        transmitter()[channel][i].func.apply(ctx, args);
      }
    }
  }, 0);
}
exports.publishNext = publishNext;
function unSubscribe(channel, ctx) {
  if (Array.isArray(transmitter()[channel])) {
    let events = transmitter()[channel].filter(event => {
      if (event.ctx !== ctx) {
        return true;
      } else {
        return false;
      }
    });
    transmitter()[channel] = events;
  }
}
exports.unSubscribe = unSubscribe;
function subscribe(channel, ctx, func) {
  if (!Array.isArray(transmitter()[channel])) {
    transmitter()[channel] = [];
  }
  transmitter()[channel].push({
    ctx: ctx,
    func: func
  });
}
exports.subscribe = subscribe;

},

// packages/core/src/state.ts @25
25: function(__fusereq, exports, module){
exports.__esModule = true;
var a__1 = __fusereq(10);
const state = window.state || ({});
const keys = new Set();
if (!window.state) {
  window.addEventListener('HMR-FUSEBOX', () => {
    window.state = state;
    console.log('HMR-FUSEBOX', window.state);
  });
}
function getState(newState) {
  window.state = newState;
}
exports.getState = getState;
function setState() {
  return state;
}
exports.setState = setState;
function stateContainer(key, defaultValue, customPublishedTrigger) {
  if (!state.hasOwnProperty(key)) {
    state[key] = defaultValue;
  }
  const currentState = state[key];
  const setter = function (value) {
    state[key] = value;
  };
  const middleware = function (value) {
    setter(value);
    a__1.publish(key, value);
  };
  return [currentState, customPublishedTrigger ? setter : middleware];
}
exports.stateContainer = stateContainer;
function validateKey(key) {
  if (keys.has(key)) {
    throw new Error(`state key used allready, use another name`);
  } else {
    keys.add(key);
    return key;
  }
}
exports.validateKey = validateKey;

},

// packages/core/src/index.ts @10
10: function(__fusereq, exports, module){
exports.__esModule = true;
__fusereq(27);
var attribute_1 = __fusereq(20);
exports.attribute = attribute_1.attribute;
var logger_1 = __fusereq(21);
exports.enableInternalLogger = logger_1.enableInternalLogger;
exports.disableInternalLogger = logger_1.disableInternalLogger;
var property_1 = __fusereq(22);
exports.property = property_1.property;
var customElement_1 = __fusereq(23);
exports.customElement = customElement_1.customElement;
var transmitter_1 = __fusereq(24);
exports.publish = transmitter_1.publish;
exports.subscribe = transmitter_1.subscribe;
exports.unSubscribe = transmitter_1.unSubscribe;
exports.publishNext = transmitter_1.publishNext;
exports.publishSync = transmitter_1.publishSync;
var state_1 = __fusereq(25);
exports.validateKey = state_1.validateKey;
exports.stateContainer = state_1.stateContainer;
exports.stateResult = state_1.stateResult;
var requestRender_1 = __fusereq(26);
exports.requestRender = requestRender_1.requestRender;

},

// packages/grid/src/elements/free-grid-body.ts @35
35: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-body';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.top = config.panelHeight + config.__rowHeight * 2 + 'px';
    this.style.bottom = config.footerHeight + 'px';
    this.ref.addEventListener('column-resize', this);
    this.ref.addEventListener('vertical-scroll', this);
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'column-resize') {
      this.render();
    }
    if (e.type === 'reRender') {
      this.render();
    }
    if (e.type === 'vertical-scroll') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('vertical-scroll', this);
    this.ref.removeEventListener('column-resize', this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    const config = this.connector.config;
    const scrollheight = this.connector.displayedDataset.length * config.__rowHeight;
    return lit_html_1.html`
            <free-grid-body-content
                style="height:${scrollheight}px;width:${config.__rowWidth}px"
                class="free-grid-content"
            >
                ${this.rowPositionCache.map(row => {
      const entity = this.connector.displayedDataset[row.i];
      const data = entity && entity.__group;
      if (data) {
        return lit_html_1.html`
                            <free-grid-row-group
                                .connector=${this.connector}
                                .row=${row}
                                .ref=${this.ref}
                            ></free-grid-row-group>
                        `;
      } else {
        return lit_html_1.html`
                            <free-grid-row
                                .connector=${this.connector}
                                .row=${row}
                                .ref=${this.ref}
                            ></free-grid-row>
                        `;
      }
    })}
            </free-grid-body-content>
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-body')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/free-grid-cell-row.ts @36
36: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-cell-row';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.display = 'block';
    this.style.height = config.cellHeight + 'px';
    this.style.width = this.group.width + 'px';
    this.style.top = this.cellPosition * config.cellHeight + 'px';
    this.cell = this.group.rows[this.cellPosition];
    this.ref.addEventListener('column-resize', this);
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'column-resize') {
      this.style.width = this.group.width + 'px';
    }
    if (e.type === 'reRender') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('column-resize', this);
    this.ref.removeEventListener('reRender', this);
  }
  updateCallback(e) {
    const data = this.connector.displayedDataset[this.rowNo];
    const cell = this.cell;
    cell.beforeEditCallbackFn && cell.beforeEditCallbackFn(e, cell, this.rowNo, data, this.connector);
    if (cell.autoUpdateData !== false) {
      switch (this.cell.type) {
        case 'boolean':
          data[cell.attribute] = e.target.checked;
          break;
        case 'image':
          break;
        case 'date':
          data[cell.attribute] = e.target.valueAsDate;
          break;
        case 'number':
          data[cell.attribute] = e.target.valueAsNumber;
          break;
        default:
          data[cell.attribute] = e.target.value;
      }
      this.connector.publishEvent('attribute-change');
    }
    cell.afterEditCallbackFn && cell.afterEditCallbackFn(e, cell, this.rowNo, data, this.connector);
  }
  render() {
    if (this.connector.displayedDataset[this.rowNo]) {
      const cell = this.cell;
      const data = this.connector.displayedDataset[this.rowNo];
      const change = this.cell.editEventType !== 'input' ? this.updateCallback : null;
      const input = this.cell.editEventType === 'input' ? this.updateCallback : null;
      if (cell.renderRowCallBackFn) {
        return cell.renderRowCallBackFn(cell, data, this.rowNo, this.connector, this.updateCallback);
      }
      switch (cell.type) {
        case 'boolean':
          return lit_html_1.html`
                        <input
                            ?readonly=${cell.readonly}
                            ?disabled=${cell.disabled}
                            @change=${change}
                            @input=${input}
                            type="checkbox"
                            .checked=${data[cell.attribute]}
                            class="free-grid-row-checkbox"
                        />
                    `;
        case 'image':
          return lit_html_1.html`
                        <img .src=${data[cell.attribute] || ''} class="free-grid-image-round" />
                    `;
        case 'empty':
          return lit_html_1.html`
                        <style>
                            .free-grid .hideme {
                                background-color: ${getComputedStyle(this.ref).getPropertyValue('--freegrid-main-bg-color')};
                            }
                        </style>
                        <div class="free-grid-row-input hideme"></div>
                    `;
        case 'date':
          return lit_html_1.html`
                        <input
                            ?readonly=${cell.readonly}
                            ?disabled=${cell.disabled}
                            @change=${change}
                            @input=${input}
                            type=${cell.type}
                            .valueAsDate=${data[cell.attribute] || null}
                            class="free-grid-row-input"
                        />
                    `;
        case 'number':
          return lit_html_1.html`
                        <input
                            ?readonly=${cell.readonly}
                            ?disabled=${cell.disabled}
                            @change=${change}
                            @input=${input}
                            type=${cell.type}
                            .valueAsNumber=${data[cell.attribute]}
                            class="free-grid-row-input"
                        />
                    `;
        default:
      }
      return lit_html_1.html`
                <input
                    ?readonly=${cell.readonly}
                    ?disabled=${cell.disabled}
                    @change=${change}
                    @input=${input}
                    type=${cell.type || 'text'}
                    .value=${data[cell.attribute] || null}
                    class="free-grid-row-input"
                />
            `;
    } else {
      return '';
    }
  }
};
__fuse_decorate.d([core_1.property(), __fuse_decorate.m("design:type", Number)], __DefaultExport__.prototype, "rowNo", void 0);
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-cell-row')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/free-grid-cell-filter.ts @37
37: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-cell-filter';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.height = config.cellHeight + 'px';
    this.style.width = this.group.width + 'px';
    this.style.top = this.cellPosition * config.cellHeight + 'px';
    this.attribute = this.group.rows[this.cellPosition].attribute;
    this.ref.addEventListener('column-resize', this);
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'column-resize') {
      this.style.width = this.group.width + 'px';
    }
    if (e.type === 'reRender') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('column-resize', this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    const cell = this.group.rows[this.cellPosition];
    const coltype = cell.type === 'boolean' ? 'checkbox' : cell.type;
    const value = cell.filterable.currentValue || null;
    const placeholder = cell.filterable.placeholder || '';
    const filterCallback = e => {
      if (cell.type === 'boolean') {
        const t = e.target;
        switch (t.state) {
          case 0:
            t.state = 2;
            t.style.opacity = '1';
            t.checked = true;
            t.indeterminate = false;
            break;
          case 2:
            t.state = 3;
            t.style.opacity = '1';
            t.indeterminate = false;
            break;
          default:
            t.checked = false;
            t.state = 0;
            t.style.opacity = '0.3';
            t.indeterminate = true;
        }
      }
      cell.filterable.beforeFilterCallbackFn && cell.filterable.beforeFilterCallbackFn(e, cell, this.connector);
      if (cell.filterable.auto !== false) {
        this.connector.filterCallback(e, cell);
      }
    };
    const enterKeyDown = e => {
      const keycode = e.keyCode ? e.keyCode : e.which;
      if (keycode === 13) {
        filterCallback(e);
      }
    };
    let boolstyle = null;
    let indeterminate = false;
    let setState = 0;
    if (cell.type === 'boolean' && cell.filterable) {
      if (cell.filterable.currentValue !== false && cell.filterable.currentValue !== true) {
        boolstyle = 'opacity:0.3';
        indeterminate = true;
        setState = 0;
      } else {
        setState = cell.filterable.currentValue ? 2 : 3;
      }
    }
    let classname = 'free-grid-row-input';
    if (cell.type === 'boolean') {
      classname = 'free-grid-row-checkbox';
    }
    const change = cell.editEventType !== 'input' ? filterCallback : null;
    const input = cell.editEventType === 'input' ? filterCallback : null;
    if (cell.renderFilterCallBackFn) {
      return cell.renderFilterCallBackFn(cell, this.connector, filterCallback);
    }
    if (coltype === 'date') {
      return lit_html_1.html`
                <input
                    type=${coltype}
                    style=${boolstyle}
                    class=${classname}
                    @input=${input}
                    @keydown=${enterKeyDown}
                    .valueAsDate=${value}
                    placeholder=${placeholder}
                />
            `;
    } else {
      return lit_html_1.html`
                <input
                    type=${coltype || 'text'}
                    style=${boolstyle}
                    .indeterminate=${indeterminate}
                    .state=${setState}
                    class=${classname}
                    @change=${change}
                    @input=${input}
                    @keydown=${enterKeyDown}
                    .value=${value}
                    placeholder=${placeholder}
                />
            `;
    }
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-cell-filter')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/free-grid-group-filter.ts @39
39: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-group-filter';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.display = 'block';
    this.style.height = config.__rowHeight + 'px';
    this.style.width = this.group.width + 'px';
    this.style.left = this.group.__left + 'px';
    this.style.top = config.__rowHeight + 'px';
    this.ref.addEventListener('column-resize', this);
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'column-resize' || e.type === 'reRender') {
      const grouping = this.connector.config.groupingSet && this.connector.config.groupingSet.length;
      let curleft = grouping ? grouping * 15 : 0;
      this.style.width = this.group.width + 'px';
      this.style.left = this.group.__left + curleft + 'px';
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('column-resize', this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    return lit_html_1.html`
            ${this.group.rows.map((cell, i) => {
      if (cell.filterable && cell.type !== 'empty') {
        return lit_html_1.html`
                        <free-grid-cell-filter
                            .connector=${this.connector}
                            .cell=${cell}
                            .group=${this.group}
                            .ref=${this.ref}
                            .cellPosition=${i}
                        ></free-grid-cell-filter>
                    `;
      } else {
        return '';
      }
    })}
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-group-filter')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/free-grid-group-label.ts @40
40: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-group-label';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.display = 'block';
    this.style.height = config.__rowHeight + 'px';
    this.style.width = this.group.width + 'px';
    this.style.left = this.group.__left + 'px';
    this.ref.addEventListener('column-resize', this);
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'column-resize' || e.type === 'reRender') {
      const grouping = this.connector.config.groupingSet && this.connector.config.groupingSet.length;
      let curleft = grouping ? grouping * 15 : 0;
      this.style.width = this.group.width + 'px';
      this.style.left = this.group.__left + curleft + 'px';
    }
    if (e.type === 'reRender') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('column-resize', this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    return lit_html_1.html`
            ${this.group.rows.map((cell, i) => {
      return lit_html_1.html`
                    <free-grid-cell-label
                        .connector=${this.connector}
                        .cell=${cell}
                        .group=${this.group}
                        .ref=${this.ref}
                        .cellPosition=${i}
                    ></free-grid-cell-label>
                `;
    })}
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-group-label')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/free-grid-group-row.ts @41
41: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-group-row';
  }
  connectedCallback() {
    const config = this.connector.config;
    const grouping = this.connector.config.groupingSet && this.connector.config.groupingSet.length;
    let curleft = grouping ? grouping * 15 : 0;
    this.style.display = 'block';
    this.style.height = config.__rowHeight + 'px';
    this.style.width = this.group.width + 'px';
    this.style.left = this.group.__left + curleft + 'px';
    this.ref.addEventListener('column-resize', this);
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'column-resize' || e.type === 'reRender') {
      const grouping = this.connector.config.groupingSet && this.connector.config.groupingSet.length;
      let curleft = grouping ? grouping * 15 : 0;
      this.style.width = this.group.width + 'px';
      this.style.left = this.group.__left + curleft + 'px';
    }
    if (e.type === 'reRender') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('column-resize', this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    return lit_html_1.html`
            ${this.group.rows.map((cell, i) => {
      return lit_html_1.html`
                    <free-grid-cell-row
                        .connector=${this.connector}
                        .rowNo=${this.rowNo}
                        .cell=${cell}
                        .group=${this.group}
                        .ref=${this.ref}
                        .cellPosition=${i}
                    ></free-grid-cell-row>
                `;
    })}
        `;
  }
};
__fuse_decorate.d([core_1.property(), __fuse_decorate.m("design:type", Number)], __DefaultExport__.prototype, "rowNo", void 0);
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-group-row')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/free-grid-header.ts @42
42: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-header';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.top = config.panelHeight + 'px';
    this.style.height = config.__rowHeight * 2 + 'px';
    this.ref.addEventListener('horizontal-scroll', this);
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'horizontal-scroll' || e.type === 'reRender') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('horizontal-scroll', this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    const config = this.connector.config;
    this.style.left = -config.scrollLeft + 'px';
    this.style.width = config.__rowWidth + 'px';
    const grouping = this.connector.config.groupingSet && this.connector.config.groupingSet.length;
    return lit_html_1.html`
            <free-grid-col
                class=" free-grid-grouping-row"
                style="width:${grouping ? grouping * 15 : 0}px;left:0; display:${grouping ? 'block' : 'none'}"
            >
            </free-grid-col>
            ${config.groups.map(group => {
      return lit_html_1.html`
                    <free-grid-group-label
                        .connector=${this.connector}
                        .ref=${this.ref}
                        .group=${group}
                    >
                    </free-grid-group-label>
                    <free-grid-group-filter
                        .connector=${this.connector}
                        .ref=${this.ref}
                        .group=${group}
                    >
                    </free-grid-group-filter>
                `;
    })}
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-header')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/free-grid-footer.ts @43
43: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-footer';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.height = config.footerHeight + 'px';
  }
  render() {
    return 'footer';
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-footer')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/free-grid-panel.ts @44
44: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-panel';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.height = config.panelHeight + 'px';
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'reRender') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    const grouping = this.connector.config.groupingSet || [];
    const mouseEnter = e => {
      e.target.getElementsByClassName('free-grid-icon')[0].classList.remove('free-grid-iconhidden');
    };
    const mouseLeave = e => {
      e.target.getElementsByClassName('free-grid-icon')[0].classList.add('free-grid-iconhidden');
    };
    return lit_html_1.html`
            ${grouping.map(group => {
      const click = () => {
        this.connector.removeGroup(group);
      };
      return lit_html_1.html`
                    <div
                        @mouseenter=${mouseEnter}
                        @mouseleave=${mouseLeave}
                        class="free-grid-grouping-panel-container"
                    >
                        <p class="free-grid-grouping-panel-p">
                            ${group.title || group.field}
                            <i>
                                <svg
                                    @click=${click}
                                    class="free-grid-icon free-grid-iconhidden"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                >
                                    ${lit_html_1.svg`<path d="M3 4l4.3 4L3 12h1.4L8 8.7l3.5 3.3H13L8.6 8 13 4h-1.5L8 7.3 4.4 4H3z"/>`}
                                </svg></i
                            >
                        </p>
                    </div>
                `;
    })}
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-panel')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/scrollEvent.ts @47
47: function(__fusereq, exports, module){
function scrollEvent(connector, rowPositionCache, ref) {
  return e => {
    if (connector.config.scrollLeft && connector.config.scrollLeft !== e.target.scrollLeft && connector.config.lastScrollTop == e.target.scrollTop) {
      connector.config.scrollLeft = e.target.scrollLeft;
      ref.triggerEvent('horizontal-scroll');
    } else {
      connector.config.scrollLeft = e.target.scrollLeft;
      if (document.activeElement) {
        document.activeElement.blur();
      }
      const rowHeight = connector.config.__rowHeight;
      const cacheLength = rowPositionCache.length;
      const collectionLength = connector.displayedDataset.length;
      const cacheTotalHeight = rowHeight * cacheLength;
      const contentHeight = e.target.clientHeight;
      const scrolltop = e.target.scrollTop;
      const lastScrollTop = connector.config.lastScrollTop;
      let isDownScroll = true;
      if (scrolltop < lastScrollTop) {
        isDownScroll = false;
      }
      let scrollbars = false;
      if (Math.abs(scrolltop - lastScrollTop) > 100) {
        scrollbars = true;
      }
      connector.config.lastScrollTop = scrolltop;
      let currentRow = Math.floor(scrolltop / rowHeight);
      if (scrollbars) {
        for (let i = 0; i < cacheLength; i++) {
          rowPositionCache[i].i = currentRow;
          currentRow++;
        }
      } else {
        for (let i = 0; i < cacheLength; i++) {
          const cache = rowPositionCache[i];
          const currentTop = cache.i * rowHeight;
          let needToUpdate = false;
          let newTop;
          if (!isDownScroll) {
            if (currentTop > scrolltop + contentHeight) {
              needToUpdate = true;
              newTop = currentTop - cacheTotalHeight;
              currentRow = (currentTop - cacheTotalHeight) / rowHeight;
            }
          } else {
            if (currentTop < scrolltop - rowHeight) {
              needToUpdate = true;
              newTop = currentTop + cacheTotalHeight;
              currentRow = (currentTop + cacheTotalHeight) / rowHeight;
            }
          }
          if (needToUpdate === true && currentRow >= 0 && currentRow <= collectionLength) {
            rowPositionCache[i].i = newTop / rowHeight;
          }
        }
        rowPositionCache.sort();
      }
      ref.triggerEvent('vertical-scroll');
    }
  };
}
exports.scrollEvent = scrollEvent;

},

// packages/grid/src/dragEvent.ts @48
48: function(__fusereq, exports, module){
exports.__esModule = true;
let dragCell = null;
let dragColumnBlock = null;
let delayDragEventTimer = null;
exports.columnDragDropPanel = (event, _connector) => {
  const drop = e => {
    if (dragCell.allowGrouping) {
      _connector.groupingCallback(e, dragCell);
    }
    e.target.removeEventListener('mouseup', drop);
    e.target.classList.remove('free-grid-candrop');
  };
  return _e => {
    if (event === 'enter' && dragCell) {
      _e.target.classList.add('free-grid-candrop');
      _e.target.addEventListener('mouseup', drop);
    }
    if (event === 'leave' && dragCell) {
      _e.target.removeEventListener('mouseup', drop);
      _e.target.classList.remove('free-grid-candrop');
    }
  };
};
exports.columnDragDrop = (event, _col, _connector) => {
  const mouseUp = function () {
    document.removeEventListener('mouseup', mouseUp);
    document.removeEventListener('mousemove', mouseMove);
    clearTimeout(delayDragEventTimer);
    dragCell = null;
    if (dragColumnBlock) {
      document.body.removeChild(dragColumnBlock);
    }
    dragColumnBlock = null;
  };
  const mouseMove = function (e) {
    setTimeout(() => {
      if (dragColumnBlock) {
        dragColumnBlock.style.top = e.clientY + document.documentElement.scrollTop + 'px';
        dragColumnBlock.style.left = e.clientX + document.documentElement.scrollLeft + 'px';
      }
    }, 10);
  };
  return _e => {
    if (event === 'dragstart' && _e.button === 0 && _e.target.tagName === 'SPAN') {
      dragCell = _e.target.cell;
      document.addEventListener('mouseup', mouseUp);
      dragColumnBlock = document.createElement('div');
      dragColumnBlock.style.top = -1200 + 'px';
      dragColumnBlock.style.left = -1200 + 'px';
      dragColumnBlock.classList.add('free-grid');
      dragColumnBlock.classList.add('free-grid-drag');
      dragColumnBlock.textContent = _col.header;
      document.body.appendChild(dragColumnBlock);
      document.addEventListener('mousemove', mouseMove);
    }
    if (dragCell !== null) {
      const drop = e => {
        let daCell = Object.assign({}, dragCell);
        let doCell = Object.assign({}, _col);
        let keys = Object.assign(dragCell, _col);
        for (const key in keys) {
          dragCell[key] = doCell[key];
          _col[key] = daCell[key];
        }
        _connector.reRender();
        e.target.removeEventListener('mouseup', drop);
        e.target.classList.remove('free-grid-candrop');
      };
      if (event === 'enter' && dragCell) {
        if (_col.type === 'empty') {
          _e.target.classList.toggle('hideme');
        }
        _e.target.classList.add('free-grid-candrop');
        _e.target.addEventListener('mouseup', drop);
      }
      if (event === 'leave' && dragCell) {
        if (_col.type === 'empty') {
          _e.target.classList.toggle('hideme');
        }
        _e.target.removeEventListener('mouseup', drop);
        _e.target.classList.remove('free-grid-candrop');
      }
    }
  };
};

},

// packages/grid/src/elements/resizeColumnElement.ts @68
68: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
function resizeColumnElement(ref, group) {
  let originX = null;
  const originalColumnWidth = group.width;
  const mouseMove = e => {
    e.preventDefault();
    if (originX) {
      const movment = Math.abs(originX - e.screenX);
      if (movment % 2 === 0) {
        const movementX = originX - e.screenX;
        const newColumnWidth = originalColumnWidth - movementX;
        group.width = newColumnWidth > 10 ? newColumnWidth : 10;
        let totalWidth = 0;
        ref.interface.config.groups.reduce((agg, element) => {
          element.__left = agg;
          totalWidth = totalWidth + element.width;
          return element.__left + element.width;
        }, 0);
        ref.interface.config.__rowWidth = totalWidth;
        requestAnimationFrame(() => {
          ref.triggerEvent('column-resize');
        });
      }
    }
  };
  const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };
  const mouseDown = e => {
    originX = e.screenX;
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };
  return lit_html_1.html` <div class="free-grid-draggable-handler" @mousedown=${mouseDown}></div> `;
}
exports.resizeColumnElement = resizeColumnElement;

},

// packages/grid/src/elements/sorticonElement.ts @69
69: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
function sorticonElement(_connector, col) {
  const ascTemplate = lit_html_1.svg`
        <svg class="free-grid-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M7.4 6L3 10h1.5L8 7l3.4 3H13L8.5 6h-1z"/>
        </svg>`;
  const descTemplate = lit_html_1.svg`
        <svg class="free-grid-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M7.4 10L3 6h1.5L8 9.2 11.3 6H13l-4.5 4h-1z"/>
        </svg>`;
  if (col.sortable && col.sortable.sortNo) {
    return lit_html_1.html`
            <i class="free-grid-fa-sort-number" data-vgridsort="${col.sortable.sortNo}">
                ${col.sortable.sortAscending ? ascTemplate : descTemplate}
            </i>
        `;
  } else {
    return lit_html_1.html``;
  }
}
exports.sorticonElement = sorticonElement;

},

// packages/grid/src/elements/free-grid-cell-label.ts @38
38: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
var resizeColumnElement_1 = __fusereq(68);
var sorticonElement_1 = __fusereq(69);
var dragEvent_1 = __fusereq(48);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-cell-label';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.display = 'block';
    this.style.height = config.cellHeight + 'px';
    this.style.width = this.group.width + 'px';
    this.style.top = this.cellPosition * config.cellHeight + 'px';
    this.ref.addEventListener('column-resize', this);
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'column-resize') {
      this.render();
    }
    if (e.type === 'reRender') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('column-resize', this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    const cell = this.group.rows[this.cellPosition];
    const connector = this.connector;
    const label = this.group.rows[this.cellPosition].header;
    const sortCallback = e => {
      const mouseup = e => {
        cell.sortable.beforeSortCallbackFn && cell.sortable.beforeSortCallbackFn(e, cell, connector);
        if (cell.sortable.auto !== false) {
          console.log('sort');
          connector.sortCallback(e, cell);
        }
      };
      if (e.button === 0) {
        e.target.addEventListener('mouseup', mouseup);
        setTimeout(() => {
          e.target.removeEventListener('mouseup', mouseup);
        }, 500);
      } else {
        console.log('open menu');
      }
    };
    const mousedown = dragEvent_1.columnDragDrop('dragstart', cell, connector);
    const mouseenter = dragEvent_1.columnDragDrop('enter', cell, connector);
    const mouseleave = dragEvent_1.columnDragDrop('leave', cell, connector);
    this.style.width = this.group.width + 'px';
    if (cell.renderLabelCallBackFn) {
      return cell.renderLabelCallBackFn(cell, this.connector, sorticonElement_1.sorticonElement, resizeColumnElement_1.resizeColumnElement, mousedown, mouseenter, mouseleave);
    }
    if (cell.type === 'empty') {
      return lit_html_1.html`
                <style>
                    .free-grid .hideme {
                        background-color: ${getComputedStyle(this.ref).getPropertyValue('--freegrid-main-bg-color')};
                    }
                </style>
                <span
                    .cell=${cell}
                    class="free-grid-label hideme"
                    @mouseenter=${!cell.disableDragDrop && mouseenter}
                    @mouseleave=${!cell.disableDragDrop && mouseleave}
                >
                </span>
                ${resizeColumnElement_1.resizeColumnElement(this.ref, this.group)}
            `;
    } else {
      return lit_html_1.html`
                <span
                    .cell=${cell}
                    class="free-grid-label"
                    @mousedown=${e => {
        cell.sortable && sortCallback(e);
        !cell.disableDragDrop && mousedown(e);
      }}
                    @mouseenter=${!cell.disableDragDrop && mouseenter}
                    @mouseleave=${!cell.disableDragDrop && mouseleave}
                    >${label} ${sorticonElement_1.sorticonElement(this.connector, cell)}</span
                >
                ${resizeColumnElement_1.resizeColumnElement(this.ref, this.group)}
            `;
    }
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-cell-label')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/free-grid-row.ts @45
45: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-row';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.display = 'block';
    this.style.height = config.__rowHeight + 'px';
    this.currentHeight = this.row.i * config.__rowHeight;
    this.style.transform = `translate3d(0px, ${this.currentHeight}px, 0px)`;
    this.ref.addEventListener('vertical-scroll', this);
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'vertical-scroll') {
      this.render();
    }
    if (e.type === 'reRender') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('vertical-scroll', this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    const config = this.connector.config;
    if (this.currentHeight !== this.row.i * config.__rowHeight) {
      this.currentHeight = this.row.i * config.__rowHeight;
      this.style.transform = `translate3d(0px, ${this.row.i * config.__rowHeight}px, 0px)`;
    }
    const rowClick = e => {
      this.connector.selection.highlightRow(e, this.row.i);
      this.ref.triggerEvent('vertical-scroll');
    };
    if (this.connector.selection.isSelected(this.row.i)) {
      this.classList.add('free-grid-selected-row');
    } else {
      this.classList.remove('free-grid-selected-row');
    }
    const grouping = this.connector.config.groupingSet && this.connector.config.groupingSet.length;
    return lit_html_1.html`
            <free-grid-col
                class="free-grid-grouping-row"
                style="width:${grouping ? grouping * 15 : 0}px;left:0; display:${grouping ? 'block' : 'none'}"
            >
            </free-grid-col>
            ${config.groups.map(group => {
      return lit_html_1.html`
                    <free-grid-group-row
                        @click=${rowClick}
                        .connector=${this.connector}
                        .rowNo=${this.row.i}
                        .ref=${this.ref}
                        .group=${group}
                    >
                    </free-grid-group-row>
                `;
    })}
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-row')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/free-grid-row-group.ts @46
46: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var core_1 = __fusereq(10);
var lit_html_1 = __fusereq(16);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.classList = 'free-grid-row';
  }
  connectedCallback() {
    const config = this.connector.config;
    this.style.display = 'block';
    this.style.height = config.__rowHeight + 'px';
    this.currentHeight = this.row.i * config.__rowHeight;
    this.style.transform = `translate3d(0px, ${this.currentHeight}px, 0px)`;
    this.ref.addEventListener('vertical-scroll', this);
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'vertical-scroll') {
      this.render();
    }
    if (e.type === 'reRender') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('vertical-scroll', this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    const config = this.connector.config;
    this.currentHeight = this.row.i * config.__rowHeight;
    this.style.transform = `translate3d(0px, ${this.row.i * config.__rowHeight}px, 0px)`;
    const entity = this.connector.displayedDataset[this.row.i];
    if (entity) {
      const changeGrouping = () => {
        if (entity.__groupExpanded) {
          this.connector.groupCollapse(entity.__groupID);
        } else {
          this.connector.groupExpand(entity.__groupID);
        }
      };
      const defaultMarkup = lit_html_1.html`
                <i @click=${changeGrouping}>
                    <svg
                        class="free-grid-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                    >
                        ${entity.__groupExpanded ? lit_html_1.svg`<path d="M4.8 7.5h6.5v1H4.8z" />` : lit_html_1.svg`<path d="M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z" />`}
                    </svg></i
                ><span> ${entity.__groupName} (${entity.__groupTotal})</span>
            `;
      return lit_html_1.html`
                ${entity.__groupLvl ? lit_html_1.html`
                          <free-grid-col
                              class="free-grid-col free-grid-grouping-row"
                              style="width:${entity.__groupLvl ? entity.__groupLvl * 15 : 0}px;left:0"
                          >
                          </free-grid-col>
                      ` : ''}
                ${lit_html_1.html`
                    <free-grid-col
                        class="free-grid-col-group"
                        style="left:${entity.__groupLvl ? entity.__groupLvl * 15 : 0}px;right:0"
                    >
                        ${defaultMarkup}
                    </free-grid-col>
                `}
            `;
    } else {
      return '';
    }
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('free-grid-row-group')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/generate.ts @17
17: function(__fusereq, exports, module){
exports.__esModule = true;
__fusereq(35);
__fusereq(36);
__fusereq(37);
__fusereq(38);
__fusereq(39);
__fusereq(40);
__fusereq(41);
__fusereq(42);
__fusereq(43);
__fusereq(44);
__fusereq(45);
__fusereq(46);
var scrollEvent_1 = __fusereq(47);
var lit_html_1 = __fusereq(16);
var dragEvent_1 = __fusereq(48);
function generate(connector, rowPositionCache, ref) {
  const scroll = scrollEvent_1.scrollEvent(connector, rowPositionCache, ref);
  const enter = dragEvent_1.columnDragDropPanel('enter', connector);
  const leave = dragEvent_1.columnDragDropPanel('leave', connector);
  return lit_html_1.html`
        <free-grid-panel
            .connector=${connector}
            .ref=${ref}
            @mouseleave=${leave}
            @mouseenter=${enter}
        ></free-grid-panel>
        <free-grid-header .connector=${connector} .ref=${ref}></free-grid-header>
        <free-grid-body
            .connector=${connector}
            .rowPositionCache=${rowPositionCache}
            @scroll=${scroll}
            .ref=${ref}
        ></free-grid-body>
        <free-grid-footer .connector=${connector} .ref=${ref}></free-grid-footer>
    `;
}
exports.generate = generate;

},

// packages/grid/src/arrayFilter.ts @61
61: function(__fusereq, exports, module){
class ArrayFilter {
  constructor() {
    this.operators = {
      EQUAL: 1,
      LESS_THAN_OR_EQUAL_TO: 2,
      GREATER_THAN_OR_EQUAL_TO: 3,
      LESS_THAN: 4,
      GREATER_THAN: 5,
      CONTAINS: 6,
      NOT_EQUAL_TO: 7,
      DOES_NOT_CONTAIN: 8,
      BEGIN_WITH: 9,
      END_WITH: 10
    };
    this.lastFilter = [];
  }
  getLastFilter() {
    return this.lastFilter;
  }
  getFilterFromType(type) {
    switch (type) {
      case 'date':
      case 'number':
        return 'GREATER_THAN';
      case 'bool':
        return 'EQUAL_TO';
      default:
        return 'BEGIN_WITH';
    }
  }
  runQueryOn(objArray, ObjFilter) {
    this.lastFilter = ObjFilter;
    const resultArray = objArray.filter(data => {
      let result = true;
      ObjFilter.forEach(x => {
        let rowValue;
        let filterValue;
        let filterOperator = x.operator;
        let newFilterOperator;
        let type = x.type;
        if (x.value === 'null') {
          type = 'null';
        }
        rowValue = data[x.attribute];
        const typeBool = {
          true: true,
          false: false
        };
        switch (type) {
          case 'null':
            filterOperator = 1;
            break;
          case 'number':
            filterValue = Number(x.value);
            if (!filterValue) {
              filterValue = 0;
            }
            filterOperator = filterOperator || 1;
            if (filterOperator === 6) {
              filterOperator = 1;
            }
            break;
          case 'text':
            if (rowValue === null || rowValue === undefined) {
              rowValue = '';
            } else {
              rowValue = rowValue.toLowerCase();
            }
            filterValue = x.value.toLowerCase();
            filterOperator = filterOperator || 9;
            newFilterOperator = filterOperator;
            if (x.value.charAt(0) === '*' && filterOperator === 9) {
              newFilterOperator = 6;
              filterValue = filterValue.substr(1, filterValue.length);
            }
            if (x.value.charAt(0) === '*' && filterOperator === 1) {
              newFilterOperator = 10;
              filterValue = filterValue.substr(1, filterValue.length);
            }
            if (x.value.charAt(x.value.length - 1) === '*' && filterOperator === 1 && newFilterOperator === 10) {
              newFilterOperator = 6;
              filterValue = filterValue.substr(0, filterValue.length - 1);
            }
            if (x.value.charAt(x.value.length - 1) === '*' && filterOperator === 1 && newFilterOperator !== 10 && newFilterOperator !== 6) {
              newFilterOperator = 9;
              filterValue = filterValue.substr(0, filterValue.length - 1);
            }
            if (filterOperator !== newFilterOperator) {
              filterOperator = newFilterOperator;
            }
            break;
          case 'boolean':
            filterValue = typeBool[x.value];
            filterOperator = 1;
            break;
          default:
            try {
              rowValue = rowValue.toLowerCase();
            } catch (err) {
              rowValue = rowValue;
            }
            try {
              filterValue = x.value.toLowerCase();
            } catch (err) {
              filterValue = x.value;
            }
            filterOperator = filterOperator || 1;
            break;
        }
        switch (filterOperator) {
          case 1:
            if (rowValue !== filterValue) {
              result = false;
            }
            break;
          case 2:
            if (!(rowValue <= filterValue)) {
              result = false;
            }
            break;
          case 3:
            if (!(rowValue >= filterValue)) {
              result = false;
            }
            break;
          case 4:
            if (!(rowValue < filterValue)) {
              result = false;
            }
            break;
          case 5:
            if (!(rowValue > filterValue)) {
              result = false;
            }
            break;
          case 6:
            if (rowValue.indexOf(filterValue) === -1) {
              result = false;
            }
            break;
          case 7:
            if (rowValue === filterValue) {
              result = false;
            }
            break;
          case 8:
            if (rowValue.indexOf(filterValue) !== -1) {
              result = false;
            }
            break;
          case 9:
            if (rowValue.substring(0, filterValue.length) !== filterValue) {
              result = false;
            }
            break;
          case 10:
            if (rowValue.substring(rowValue.length - filterValue.length, rowValue.length) !== filterValue) {
              result = false;
            }
            break;
          default:
            if (rowValue !== filterValue) {
              result = false;
            }
        }
        if (type === 'text') {
          if (x.value.charAt(0) === '*' && x.value.length === 1) {
            result = true;
          }
        }
      });
      return result;
    });
    return resultArray;
  }
}
exports.ArrayFilter = ArrayFilter;

},

// packages/grid/src/arraySort.ts @62
62: function(__fusereq, exports, module){
class ArraySort {
  constructor() {
    this.lastSort = [];
    this.curSort = [];
    this.localeCompareCode = null;
    this.localeCompareOptions = {
      sensitivity: 'base'
    };
  }
  setLocaleCompare(code, options) {
    this.localeCompareCode = code ? code : null;
    this.localeCompareOptions = options ? options : {
      sensitivity: 'base'
    };
  }
  reset(defaultSortAttribute) {
    if (defaultSortAttribute) {
      this.lastSort = [{
        attribute: defaultSortAttribute,
        asc: true,
        no: 0
      }];
      this.curSort = [{
        attribute: defaultSortAttribute,
        asc: true,
        no: 0
      }];
    } else {
      this.lastSort = [];
      this.curSort = [];
    }
  }
  SetConfigSort(configColumns) {
    const attribute = [];
    const asc = [];
    const no = [];
    this.lastSort.forEach(x => {
      attribute.push(x.attribute);
      asc.push(x.asc);
      no.push(x.no);
    });
    configColumns.forEach(col => {
      const i = attribute.indexOf(col.attribute);
      if (col.sortable) {
        if (i !== -1) {
          col.sortable.sortAscending = asc[i] === true;
          col.sortable.sortNo = no[i];
        } else {
          col.sortable.sortAscending = null;
          col.sortable.sortNo = null;
        }
      }
    });
  }
  clearConfigSort(configColumns) {
    configColumns.forEach(col => {
      if (col.sortable) {
        col.sortable.sortAscending = null;
        col.sortable.sortNo = null;
      }
    });
  }
  setLastSort(array) {
    this.lastSort = array;
    this.curSort = array;
  }
  setOrderBy(param, add) {
    if (Array.isArray(param)) {
      this.lastSort = param;
      this.curSort = param;
    } else {
      let sort;
      const useSetValue = false;
      if (typeof param === 'string') {
        sort = {
          attribute: param,
          asc: true
        };
      } else {
        if (param.asc === undefined) {
          sort = {
            attribute: param.attribute,
            asc: true
          };
        } else {
          sort = {
            attribute: param.attribute,
            asc: param.asc
          };
        }
      }
      if (add && this.lastSort.length > 0) {
        this.curSort = this.lastSort;
        let exist = false;
        this.curSort.forEach(x => {
          if (x.attribute === sort.attribute) {
            exist = true;
            x.asc = sort.asc;
          }
        });
        if (!exist) {
          this.curSort.push(sort);
          this.curSort[this.curSort.length - 1].no = this.curSort.length;
        }
        this.lastSort = this.curSort;
      } else {
        this.curSort = [sort];
        this.curSort[0].no = 1;
        if (this.lastSort[0]) {
          if (this.lastSort[0].attribute === this.curSort[0].attribute) {
            if (this.lastSort[0].asc === this.curSort[0].asc) {
              if (!useSetValue) {
                this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
              }
            }
          }
        }
        this.lastSort = this.curSort;
      }
    }
  }
  getOrderBy() {
    return this.curSort;
  }
  runOrderbyOn(array) {
    const thisSort = this.getOrderBy();
    array.sort((obj1, obj2) => {
      let result = 0;
      for (let i = 0; i < thisSort.length && result === 0; ++i) {
        const currentObj = thisSort[i];
        const v1 = obj1[currentObj.attribute] || '';
        const v2 = obj2[currentObj.attribute] || '';
        const getLocaleCompareResult = (x1, x2) => {
          let resultLocale = null;
          if (this.localeCompareCode) {
            resultLocale = x1.localeCompare(x2, this.localeCompareCode, this.localeCompareOptions);
          } else {
            resultLocale = x1.localeCompare(x2);
          }
          return resultLocale;
        };
        if (v1 !== v2) {
          if (currentObj.asc) {
            if (typeof v1 === 'string' && typeof v1 === 'string') {
              if (getLocaleCompareResult(v1, v2) < 0 && getLocaleCompareResult(v1, v2) !== 0) {
                result = -1;
              } else {
                result = 1;
              }
            } else {
              if (v1 < v2) {
                result = -1;
              } else {
                result = 1;
              }
            }
          } else {
            if (typeof v1 === 'string' && typeof v1 === 'string') {
              if (getLocaleCompareResult(v1, v2) < 0 && getLocaleCompareResult(v1, v2) !== 0) {
                result = 1;
              } else {
                result = -1;
              }
            } else {
              if (v1 < v2) {
                result = 1;
              } else {
                result = -1;
              }
            }
          }
        }
      }
      return result;
    });
    this.lastSort = this.getOrderBy().slice(0);
  }
}
exports.ArraySort = ArraySort;

},

// packages/grid/src/arrayGrouping.ts @63
63: function(__fusereq, exports, module){
class ArrayGrouping {
  constructor() {
    this.grouping = [];
    this.expanded = new Set([]);
  }
  reset() {
    this.groups = [];
    this.grouping = [];
    this.expanded = new Set([]);
  }
  group(arrayToGroup, grouping, keepExpanded) {
    if (grouping.length > 0) {
      if (!keepExpanded) {
        this.expanded = new Set([]);
      }
      const groups = [];
      grouping.forEach((groupBy, groupNo) => {
        if (groupNo === 0) {
          const mainGroup = this.createMainGrouping(arrayToGroup, groupBy.field, groupNo);
          groups.push(mainGroup);
        } else {
          const childGroupArray = groups[groups.length - 1];
          const newSubGroup = this.groupChildren(childGroupArray, groupBy.field, groupNo);
          groups.push(newSubGroup);
        }
      });
      this.groups = groups;
      this.grouping = grouping;
      if (!keepExpanded) {
        return groups[0];
      } else {
        return this.expandOneOrAll(null, this.expanded);
      }
    } else {
      arrayToGroup.forEach(row => {
        row.__groupLvl = 0;
      });
      this.grouping = [];
      return arrayToGroup;
    }
  }
  getExpanded() {
    return Array.from(this.expanded);
  }
  setExpanded(x) {
    this.expanded = new Set(x);
  }
  getGrouping() {
    return this.grouping;
  }
  setGrouping(g) {
    this.grouping = g;
  }
  expandOneOrAll(id, array) {
    let all = id ? false : true;
    if (!id) {
      if (array) {
        all = false;
      }
    }
    if (!array) {
      array = new Set([]);
    }
    let subGroup;
    const collection = [];
    const mainGroups = this.groups[0];
    subGroup = g => {
      g.__groupChildren.forEach(sg => {
        collection.push(sg);
        switch (true) {
          case all:
          case sg.__groupID === id:
          case array.has(sg.__groupID):
          case sg.__groupID !== id && sg.__groupExpanded:
            if (sg.__groupChildren) {
              sg.__groupExpanded = true;
              this.expanded.add(sg.__groupID);
              subGroup(sg);
            }
            break;
          default:
            break;
        }
      });
    };
    mainGroups.forEach(g => {
      collection.push(g);
      switch (true) {
        case all:
        case g.__groupID === id:
        case array.has(g.__groupID):
        case g.__groupID !== id && g.__groupExpanded:
          g.__groupExpanded = true;
          this.expanded.add(g.__groupID);
          if (g.__groupChildren) {
            subGroup(g);
          }
          break;
        default:
          break;
      }
    });
    return collection;
  }
  collapseOneOrAll(id) {
    const all = id ? false : true;
    id = id === undefined ? null : id;
    let subGroup;
    const collection = [];
    const mainGroups = this.groups[0];
    subGroup = g => {
      g.__groupChildren.forEach(sg => {
        switch (true) {
          case all:
            if (sg.__groupChildren) {
              sg.__groupExpanded = false;
              this.expanded.delete(sg.__groupID);
              subGroup(sg);
            }
            break;
          case sg.__groupID === id:
            collection.push(sg);
            this.expanded.delete(sg.__groupID);
            sg.__groupExpanded = false;
            break;
          default:
            collection.push(sg);
            if (sg.__groupChildren && sg.__groupExpanded) {
              subGroup(sg);
            }
            break;
        }
      });
    };
    mainGroups.forEach(g => {
      collection.push(g);
      switch (true) {
        case all:
          g.__groupExpanded = false;
          this.expanded.delete(g.__groupID);
          if (g.__groupChildren) {
            subGroup(g);
          }
          break;
        case g.__groupID === id:
          g.__groupExpanded = false;
          this.expanded.delete(g.__groupID);
          break;
        default:
          if (g.__groupChildren && g.__groupExpanded) {
            subGroup(g);
          }
          break;
      }
    });
    return collection;
  }
  createMainGrouping(array, groupBy, groupNo) {
    const tempGroupArray = [];
    let curGroup = {};
    let tempValue = null;
    array.forEach(element => {
      let gidm = element[groupBy];
      gidm = typeof gidm === 'boolean' ? gidm.toString() : gidm;
      gidm = gidm || ' blank';
      if (gidm !== tempValue) {
        curGroup = {
          __groupName: gidm,
          __group: true,
          __groupID: gidm,
          __groupLvl: groupNo,
          __groupChildren: [element],
          __groupTotal: 1,
          __groupExpanded: false
        };
        element.__groupLvl = groupNo + 1;
        tempValue = gidm;
        tempGroupArray.push(curGroup);
      } else {
        element.__groupLvl = groupNo + 1;
        curGroup.__groupChildren.push(element);
        curGroup.__groupTotal++;
      }
    });
    return tempGroupArray;
  }
  groupChildren(childGroupArray, groupBy, groupNo) {
    const tempGroupArray = [];
    let curGroup = {};
    childGroupArray.forEach(element => {
      let tempValue = null;
      const rebuiltChildrenArray = [];
      element.__groupChildren.forEach(child => {
        const gidm = child[groupBy] || ' blank';
        if (gidm !== tempValue) {
          const gidc = element.__groupID;
          curGroup = {
            __groupName: gidm,
            __groupID: gidc + '-' + gidm,
            __group: true,
            __groupLvl: groupNo,
            __groupChildren: [child],
            __groupTotal: 1,
            __groupExpanded: false
          };
          child.__groupLvl = groupNo + 1;
          tempValue = gidm;
          rebuiltChildrenArray.push(curGroup);
          tempGroupArray.push(curGroup);
        } else {
          child.__groupLvl = groupNo + 1;
          curGroup.__groupChildren.push(child);
          curGroup.__groupTotal++;
        }
      });
      element.__groupChildren = rebuiltChildrenArray;
    });
    return tempGroupArray;
  }
}
exports.ArrayGrouping = ArrayGrouping;

},

// packages/grid/src/arrayUtils.ts @32
32: function(__fusereq, exports, module){
exports.__esModule = true;
var arrayFilter_1 = __fusereq(61);
var arraySort_1 = __fusereq(62);
var arrayGrouping_1 = __fusereq(63);
class ArrayUtils {
  constructor(gridInterface) {
    this.arrayFilter = new arrayFilter_1.ArrayFilter();
    this.arraySort = new arraySort_1.ArraySort();
    this.arrayGrouping = new arrayGrouping_1.ArrayGrouping();
    this.sortCallbackBinded = this.sortCallback.bind(this);
    this.filterCallbackBinded = this.filterCallback.bind(this);
    this.groupingCallbackBinded = this.groupingCallback.bind(this);
    this.removeGroupBinded = this.removeGroup.bind(this);
    this.gridInterface = gridInterface;
  }
  orderBy(collection, attribute, addToCurrentSort) {
    const groupingFields = this.getGrouping().map(data => data.field);
    const grouping = this.getGrouping();
    let result = {
      fixed: null,
      full: null
    };
    if (groupingFields.length > 0) {
      const lastSort = this.getOrderBy();
      this.resetSort();
      let exist = false;
      let newSort = [];
      let count = 0;
      if (!attribute) {
        newSort = lastSort;
      } else {
        lastSort.forEach(sort => {
          count++;
          if (groupingFields.indexOf(sort.attribute) !== -1 || addToCurrentSort) {
            newSort.push(sort);
            if (sort.attribute === attribute) {
              sort.asc = sort.asc === true ? false : true;
              sort.no = count;
              exist = true;
            }
          } else {
            if (sort.attribute === attribute) {
              sort.asc = sort.asc === true ? false : true;
              sort.no = count;
              exist = true;
              newSort.push(sort);
            }
          }
        });
      }
      this.setLastSort(newSort);
      if (!exist && attribute) {
        this.setOrderBy(attribute, true);
      }
      this.runOrderbyOn(collection);
      const groupedArray = this.group(collection, grouping, true);
      result = {
        fixed: groupedArray,
        full: collection
      };
    } else {
      if (!attribute) {
        const lastSort = this.getOrderBy();
        this.resetSort();
        this.setLastSort(lastSort);
        this.runOrderbyOn(collection);
        result = {
          fixed: collection,
          full: collection
        };
      } else {
        this.setOrderBy(attribute, addToCurrentSort);
        this.runOrderbyOn(collection);
        result = {
          fixed: collection,
          full: collection
        };
      }
    }
    this.gridInterface.config.sortingSet = this.arraySort.getOrderBy();
    return result;
  }
  getGrouping() {
    return this.arrayGrouping.getGrouping();
  }
  setGrouping(g) {
    this.arrayGrouping.setGrouping(g);
  }
  getExpanded() {
    return this.arrayGrouping.getExpanded();
  }
  setExpanded(x) {
    this.arrayGrouping.setExpanded(x);
  }
  groupCollapse(id) {
    this.gridInterface.displayedDataset = this.arrayGrouping.collapseOneOrAll(id);
    this.gridInterface.config.groupingExpanded = this.arrayGrouping.getExpanded();
    this.gridInterface.publishEvent('collecton-grouping');
  }
  groupExpand(id) {
    this.gridInterface.displayedDataset = this.arrayGrouping.expandOneOrAll(id);
    this.gridInterface.config.groupingExpanded = this.arrayGrouping.getExpanded();
    this.gridInterface.publishEvent('collecton-grouping');
  }
  getOrderBy() {
    return this.arraySort.getOrderBy();
  }
  setLastSort(array) {
    this.arraySort.setLastSort(array);
  }
  setOrderBy(attribute, addToCurrentSort) {
    this.arraySort.setOrderBy(attribute, addToCurrentSort);
  }
  runOrderbyOn(array) {
    this.arraySort.runOrderbyOn(array);
  }
  resetSort(defaultSortAttribute) {
    this.arraySort.reset(defaultSortAttribute);
  }
  resetGrouping() {
    this.arrayGrouping.reset();
  }
  getCurrentFilter() {
    return this.arrayFilter.getLastFilter();
  }
  group(array, grouping, keepExpanded) {
    const x = this.arrayGrouping.group(array, grouping, keepExpanded);
    this.gridInterface.config.groupingExpanded = this.arrayGrouping.getExpanded();
    return x;
  }
  removeGroup(group) {
    const currentGrouping = this.getGrouping();
    const x = currentGrouping.indexOf(group);
    if (x !== -1) {
      currentGrouping.splice(x, 1);
    }
    if (currentGrouping.length) {
      const newdata = this.group(this.gridInterface.filteredDataset, currentGrouping, true);
      this.gridInterface.displayedDataset = newdata;
    } else {
      this.gridInterface.displayedDataset = this.gridInterface.filteredDataset;
    }
    this.gridInterface.publishEvent('collecton-grouping');
  }
  groupingCallback(_event, col) {
    let newF = col ? true : false;
    const groupings = this.gridInterface.config.groupingSet || [];
    col && groupings.forEach(g => {
      if (g.field === col.attribute) {
        newF = false;
      }
    });
    if (newF) {
      groupings.push({
        title: col.header,
        field: col.attribute
      });
    }
    this.arraySort.clearConfigSort(this.gridInterface.config.groups.flatMap(x => x.rows));
    this.arraySort.reset();
    groupings.forEach(group => {
      this.arraySort.setOrderBy(group.field, true);
    });
    this.arraySort.runOrderbyOn(this.gridInterface.filteredDataset);
    this.arraySort.SetConfigSort(this.gridInterface.config.groups.flatMap(x => x.rows));
    if (groupings.length) {
      const result = this.group(this.gridInterface.filteredDataset, groupings, true);
      this.gridInterface.config.groupingSet = this.getGrouping();
      this.gridInterface.config.sortingSet = this.getOrderBy();
      this.gridInterface.displayedDataset = result;
    } else {
      this.gridInterface.displayedDataset = this.gridInterface.filteredDataset;
    }
    this.gridInterface.publishEvent('collecton-grouping');
  }
  sortCallback(event, col) {
    const sortAsc = col.sortable.sortAscending === null ? true : col.sortable.sortAscending ? false : true;
    this.arraySort.clearConfigSort(this.gridInterface.config.groups.flatMap(x => x.rows));
    const result = this.orderBy(this.gridInterface.filteredDataset, {
      attribute: col.attribute,
      asc: sortAsc
    }, event.shiftKey);
    this.gridInterface.config.sortingSet = this.getOrderBy();
    this.arraySort.SetConfigSort(this.gridInterface.config.groups.flatMap(x => x.rows));
    this.gridInterface.displayedDataset = result.fixed;
    this.gridInterface.publishEvent('collecton-sort');
  }
  filterCallback(event, col, config) {
    switch (col.type) {
      case 'date':
        col.filterable.currentValue = new Date(event.target.valueAsDate);
        break;
      case 'number':
        col.filterable.currentValue = event.target.valueAsNumber;
        break;
      case 'boolean':
        col.filterable.currentValue = event.target.indeterminate ? null : event.target.checked;
        break;
      default:
        col.filterable.currentValue = event.target.value;
    }
    const filter = [];
    let columns = config.groups.flatMap(x => x.rows);
    columns.forEach(col => {
      const f = col.filterable;
      if (f && f.currentValue !== null && f.currentValue !== undefined) {
        filter.push({
          attribute: col.attribute,
          type: col.type || 'text',
          operator: f.operator ? this.arrayFilter.operators[f.operator] : this.arrayFilter.operators[this.arrayFilter.getFilterFromType(col.type)],
          value: f.currentValue
        });
      }
    });
    this.gridInterface.filteredDataset = this.arrayFilter.runQueryOn(this.gridInterface.completeDataset, filter);
    const result = this.orderBy(this.gridInterface.filteredDataset, null, false);
    this.arraySort.SetConfigSort(this.gridInterface.config.groups.flatMap(x => x.rows));
    this.gridInterface.displayedDataset = result.fixed;
    this.gridInterface.publishEvent('collecton-filter');
  }
}
exports.ArrayUtils = ArrayUtils;

},

// packages/grid/src/selection.ts @33
33: function(__fusereq, exports, module){
class Selection {
  constructor(gridInterface) {
    this.key = 0;
    this.gridInterface = gridInterface;
    this.selectedRows = 0;
    this.selection = new Set([]);
  }
  getKey() {
    this.key++;
    return this.key;
  }
  isSelected(row) {
    let result = false;
    if (this.selectedRows > 0) {
      result = this.selection.has(this.getRowKey(row));
    }
    return result;
  }
  deSelectAll() {
    this.selection.clear();
    this.selectedRows = this.selection.size;
  }
  highlightRow(e, currentRow) {
    let isSel;
    let currentselectedRows = this.getSelectedRows();
    let currentKeyKode = '';
    this.gridInterface.__selectInternal(currentRow);
    if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {
      if (currentRow <= this.gridInterface.displayedDataset.length - 1) {
        if (this.gridInterface.config.selectionMode === 'multiple') {
          if (e.shiftKey) {
            currentKeyKode = 'shift';
            currentselectedRows = this.getSelectedRows();
            if (currentselectedRows.length > 0 && this.lastKeyKodeUsed === 'none') {
              this.lastRowSelected = currentselectedRows[0];
              this.lastKeyKodeUsed = 'shift';
            }
          }
          if (e.ctrlKey) {
            currentKeyKode = 'ctrl';
          }
          if (!e.ctrlKey && !e.shiftKey) {
            currentKeyKode = 'none';
          }
          switch (true) {
            case currentKeyKode === 'none':
              this.select(currentRow, false);
              break;
            case this.lastKeyKodeUsed === 'shift' && currentKeyKode === 'ctrl':
              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                this.deSelect(currentRow);
              } else {
                this.select(currentRow, true);
              }
              this.lastRowSelected = currentRow;
              break;
            case this.lastKeyKodeUsed === 'ctrl' && currentKeyKode === 'shift':
              const oldSel = this.getSelectedRows();
              this.selectRange(this.lastRowSelected, currentRow);
              const newSel = this.getSelectedRows();
              this.setSelectedRows(oldSel.concat(newSel));
              break;
            case this.lastKeyKodeUsed === 'ctrl' && currentKeyKode === 'ctrl':
              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                this.deSelect(currentRow);
              } else {
                this.select(currentRow, true);
              }
              this.lastRowSelected = currentRow;
              break;
            case this.lastKeyKodeUsed === 'none' && currentKeyKode === 'ctrl':
              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                this.deSelect(currentRow);
              } else {
                this.select(currentRow, true);
              }
              this.lastRowSelected = currentRow;
              break;
            case this.lastKeyKodeUsed === 'shift' && currentKeyKode === 'shift':
              if (this.lastRowSelected > currentRow) {
                this.selectRange(currentRow, this.lastRowSelected);
              } else {
                this.selectRange(this.lastRowSelected, currentRow);
              }
              break;
            case this.lastKeyKodeUsed === 'none' && currentKeyKode === 'shift':
              if (this.lastRowSelected !== -1) {
                if (this.lastRowSelected > currentRow) {
                  this.selectRange(currentRow, this.lastRowSelected);
                } else {
                  this.selectRange(this.lastRowSelected, currentRow);
                }
              } else {
                this.lastRowSelected = currentRow;
                this.select(currentRow, false);
              }
              break;
            default:
              console.error('error, this should not happen, debug selection');
          }
        } else {
          this.select(currentRow, false);
        }
        this.lastKeyKodeUsed = currentKeyKode;
        this.gridInterface.publishEvent('selectionChange');
      }
    } else {
      if (e.ctrlKey) {
        currentKeyKode = 'ctrl';
      }
      if (currentKeyKode === 'ctrl') {
        this.lastKeyKodeUsed = currentKeyKode;
        isSel = this.isSelected(currentRow);
        if (isSel === true) {
          this.deSelect(currentRow);
        }
        this.lastRowSelected = currentRow;
      } else {
        this.select(currentRow, false);
      }
      this.gridInterface.publishEvent('selectionChange');
    }
  }
  getRowKey(row) {
    return this.gridInterface.displayedDataset[row] && this.gridInterface.displayedDataset[row].__KEY;
  }
  getRowKeys() {
    const keys = [];
    this.gridInterface.displayedDataset.forEach(data => {
      keys.push(data.__KEY);
    });
    return keys;
  }
  deSelect(row) {
    this.selection.delete(this.getRowKey(row));
    this.selectedRows = this.selection.size;
  }
  select(row, add) {
    switch (this.gridInterface.config.selectionMode) {
      case 'none':
      case null:
      case undefined:
        break;
      case 'single':
        this.selection.clear();
        this.selection.add(this.getRowKey(row));
        this.selectedRows = this.selection.size;
        break;
      case 'multiple':
        if (!add) {
          this.selection.clear();
          this.selection.add(this.getRowKey(row));
          this.selectedRows = this.selection.size;
        } else {
          this.selection.add(this.getRowKey(row));
          this.selectedRows = this.selection.size;
        }
        break;
      default:
    }
  }
  selectRange(start, end) {
    if (this.gridInterface.config.selectionMode === 'multiple') {
      this.selection.clear();
      for (let i = start; i < end + 1; i++) {
        this.selection.add(this.getRowKey(i));
      }
      this.selectedRows = this.selection.size;
    }
  }
  getSelectedRows() {
    const array = [];
    const keys = this.getRowKeys();
    if (this.selectedRows > 0) {
      keys.forEach((key, index) => {
        if (this.selection.has(key) === true) {
          array.push(index);
        }
      });
    }
    return array;
  }
  setSelectedRows(newRows) {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    for (let i = 0; i < newRows.length; i++) {
      this.selection.add(this.getRowKey(newRows[i]));
    }
    this.selectedRows = this.selection.size;
  }
}
exports.Selection = Selection;

},

// packages/grid/src/entity.ts @34
34: function(__fusereq, exports, module){
class EntityHandler {
  constructor() {
    this.__editedProps = {};
    this.__originalValues = {};
    this.__currentValues = {};
    this.__newprops = {};
    this.__edited = false;
  }
  get(target, prop) {
    if (prop === '__controller') {
      return this;
    }
    if (['__KEY', '__group', '__groupID', '__groupName', '__groupLvl', '__groupTotal', '__groupChildren', '__groupExpanded'].indexOf(prop) > -1) {
      return this[prop];
    }
    return target[prop];
  }
  set(obj, prop, value) {
    let update = true;
    if (prop[0] === '_' && prop[1] === '_') {
      update = false;
      if (['__KEY', '__group', '__groupID', '__groupName', '__groupLvl', '__groupTotal', '__groupChildren', '__groupExpanded'].indexOf(prop) > -1) {
        this[prop] = value;
      }
    }
    if (update) {
      if (obj.hasOwnProperty(prop)) {
        if (!this.__editedProps.hasOwnProperty(prop)) {
          this.__originalValues[prop] = obj[prop];
          this.__editedProps[prop] = true;
        }
        this.__currentValues[prop] = value;
        obj[prop] = value;
      } else {
        if (!this.__newprops.hasOwnProperty(prop)) {
          this.__originalValues[prop] = obj[prop];
          this.__newprops[prop] = true;
        }
      }
      this.__edited = true;
      this.__currentValues[prop] = value;
      obj[prop] = value;
    }
    return true;
  }
}
exports.EntityHandler = EntityHandler;

},

// packages/grid/src/gridInterface.ts @14
14: function(__fusereq, exports, module){
exports.__esModule = true;
var arrayUtils_1 = __fusereq(32);
var selection_1 = __fusereq(33);
var entity_1 = __fusereq(34);
class GridInterface {
  constructor(__CONFIG) {
    this.__CONFIG = __CONFIG;
    this.__DATASET_ALL = [];
    this.__DATASET_FILTERED = [];
    this.__DATASET_VIEW = [];
    this.__subscribers = [];
    this.currentEntity = null;
    let cellheight = 1;
    __CONFIG.groups.forEach(group => {
      if (group.rows) {
        group.rows.forEach((_c, i) => {
          if (cellheight < i + 1) {
            cellheight = i + 1;
          }
        });
      }
    });
    __CONFIG.__cellRows = cellheight;
    __CONFIG.__rowHeight = __CONFIG.cellHeight * cellheight;
    let totalWidth = 0;
    __CONFIG.groups.reduce((agg, element) => {
      element.__left = agg;
      totalWidth = totalWidth + element.width;
      return element.__left + element.width;
    }, 0);
    __CONFIG.__rowWidth = totalWidth;
    this.__arrayUtils = new arrayUtils_1.ArrayUtils(this);
    this.__selection = new selection_1.Selection(this);
    if (this.__CONFIG.sortingSet) {
      this.__arrayUtils.setOrderBy(this.__CONFIG.sortingSet);
    }
    if (this.__CONFIG.groupingSet) {
      this.__arrayUtils.setGrouping(this.__CONFIG.groupingSet);
    }
    if (this.__CONFIG.groupingExpanded) {
      this.__arrayUtils.setExpanded(this.__CONFIG.groupingExpanded);
    }
  }
  manualConfigChange() {
    if (this.config) {
      if (this.config.sortingSet) {
        this.__arrayUtils.setOrderBy(this.config.sortingSet);
      }
      if (this.config.groupingSet) {
        this.__arrayUtils.setGrouping(this.config.groupingSet);
      }
      if (this.config.groupingExpanded) {
        this.__arrayUtils.setExpanded(this.config.groupingExpanded);
      }
      const result = this.__arrayUtils.orderBy(this.filteredDataset, null, false);
      this.__arrayUtils.arraySort.SetConfigSort(this.config.groups.flatMap(x => x.rows));
      this.displayedDataset = result.fixed;
    }
    this.reRender();
  }
  setData(data, add = false) {
    const olddataSetlength = this.__DATASET_ALL.length;
    if (add) {
      const x = Array.from(data, o => new Proxy(o, new entity_1.EntityHandler()));
      this.__DATASET_ALL.push(...x);
      this.__DATASET_FILTERED.push(...x);
      this.__DATASET_ALL.forEach((entity, i) => {
        if (entity && !entity.__KEY) {
          entity.__KEY = this.selection.getKey();
        } else {
          if (!this.__DATASET_ALL[i]) {
            this.__DATASET_ALL[i] = {
              __KEY: this.selection.getKey()
            };
          }
        }
      });
    } else {
      this.__DATASET_ALL = Array.from(data, o => new Proxy(o, new entity_1.EntityHandler()));
      this.__DATASET_ALL.forEach((entity, i) => {
        if (entity && !entity.__KEY) {
          entity.__KEY = this.selection.getKey();
        } else {
          if (!this.__DATASET_ALL[i]) {
            this.__DATASET_ALL[i] = {
              __KEY: this.selection.getKey()
            };
          }
        }
      });
      this.__DATASET_FILTERED = this.__DATASET_ALL.slice();
      this.__DATASET_VIEW = this.__DATASET_ALL.slice();
    }
    if (this.__freeGrid && olddataSetlength !== this.__DATASET_ALL.length) {
      const node = this.__freeGrid.getElementsByTagName('free-grid-body')[0];
      if (node) {
        node.scrollTop = 0;
      }
      this.__freeGrid.resetRowCache();
    }
    if (this.config.sortingSet) {
      this.__arrayUtils.setOrderBy(this.config.sortingSet);
    }
    if (this.config.groupingSet) {
      this.__arrayUtils.setGrouping(this.config.groupingSet);
    }
    const result = this.__arrayUtils.orderBy(this.filteredDataset, null, false);
    this.__arrayUtils.arraySort.SetConfigSort(this.config.groups.flatMap(x => x.rows));
    this.displayedDataset = result.fixed;
    this.publishEvent('collection-change');
  }
  get config() {
    return this.__CONFIG;
  }
  set config(config) {
    this.__CONFIG = config;
  }
  get completeDataset() {
    return this.__DATASET_ALL;
  }
  set filteredDataset(value) {
    this.__DATASET_FILTERED = value;
  }
  get filteredDataset() {
    return this.__DATASET_FILTERED;
  }
  set displayedDataset(value) {
    this.__DATASET_VIEW = value;
  }
  get displayedDataset() {
    return this.__DATASET_VIEW;
  }
  get selection() {
    return this.__selection;
  }
  __selectInternal(row) {
    this.currentEntity = this.displayedDataset[row];
  }
  select(row) {
    this.selection.highlightRow({}, row - 1);
  }
  next() {
    let row = this.displayedDataset.indexOf(this.currentEntity) + 1;
    if (this.displayedDataset.length - 1 < row) {
      row = 0;
    }
    this.selection.highlightRow({}, row);
  }
  prev() {
    let row = this.displayedDataset.indexOf(this.currentEntity) - 1;
    if (row < 0) {
      row = this.displayedDataset.length - 1;
      this.selection.highlightRow({}, row);
    }
    this.selection.highlightRow({}, row);
  }
  first() {
    this.selection.highlightRow({}, 0);
  }
  last() {
    this.selection.highlightRow({}, this.displayedDataset.length - 1);
  }
  edited() {
    return this.__DATASET_ALL.filter(entity => {
      if (entity.__controller.__edited) {
        return true;
      } else {
        return false;
      }
    });
  }
  publishEvent(event) {
    this.reRender();
    let keep = this.__subscribers.filter(element => {
      return element(event);
    });
    this.__subscribers = keep;
  }
  addEventListener(callable) {
    this.__subscribers.push(callable);
  }
  reRender() {
    if (this.__freeGrid) this.__freeGrid.reRender();
  }
  render() {
    if (this.__freeGrid) this.__freeGrid.render();
  }
  groupingCallback(event, col) {
    this.__arrayUtils.groupingCallbackBinded(event, col);
  }
  filterCallback(event, col) {
    this.__arrayUtils.filterCallbackBinded(event, col, this.__CONFIG);
  }
  sortCallback(event, col) {
    this.__arrayUtils.sortCallbackBinded(event, col);
  }
  removeGroup(group) {
    this.__arrayUtils.removeGroupBinded(group);
  }
  groupExpand(id) {
    this.__arrayUtils.groupExpand(id);
  }
  groupCollapse(id) {
    this.__arrayUtils.groupCollapse(id);
  }
  connectGrid(freeGrid) {
    this.__freeGrid = freeGrid;
  }
  disconnectGrid() {
    this.__freeGrid = null;
  }
}
exports.GridInterface = GridInterface;

},

// packages/grid/src/index.ts @8
8: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var interfaces_1 = __fusereq(13);
exports.IGridConfig = interfaces_1.IGridConfig;
var core_1 = __fusereq(10);
var generate_1 = __fusereq(17);
var gridInterface_2 = __fusereq(14);
exports.GridInterface = gridInterface_2.GridInterface;
let FreeGrid = class FreeGrid extends HTMLElement {
  constructor() {
    super(...arguments);
    this.rowCache = [];
  }
  set interface(value) {
    this.__DATASOURCE_INTERFACE = value;
    this.__DATASOURCE_INTERFACE.connectGrid(this);
  }
  get interface() {
    return this.__DATASOURCE_INTERFACE;
  }
  connectedCallback() {
    this.resetRowCache();
    this.render();
  }
  disconnectedCallback() {
    this.__DATASOURCE_INTERFACE && this.__DATASOURCE_INTERFACE.disconnectGrid();
  }
  reRender() {
    requestAnimationFrame(() => {
      this.render();
      this.triggerEvent('reRender');
    });
  }
  manualConfigChange() {
    console.log('not implemented');
  }
  triggerEvent(eventName, data) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail: {
        data
      }
    });
    this.dispatchEvent(event);
  }
  resetRowCache() {
    if (this.interface) {
      let rowsNeeded = Math.round(Math.floor(850 / this.interface.config.__rowHeight));
      if (rowsNeeded > 40) {
        rowsNeeded = 40;
      }
      const cacheLength = this.interface.displayedDataset.length > rowsNeeded ? rowsNeeded : this.interface.displayedDataset.length;
      this.rowCache = [];
      for (let i = 0; i < cacheLength; i++) {
        this.rowCache.push({
          i: i
        });
      }
    } else {
      this.rowCache = [];
    }
  }
  render() {
    return new Promise(() => {
      if (this.interface) {
        lit_html_1.render(lit_html_1.html` ${generate_1.generate(this.interface, this.rowCache, this)} `, this);
        if (this.interface.config.lastScrollTop) {
          const node = this.getElementsByTagName('free-grid-body')[0];
          if (node && node.scrollTop !== this.interface.config.lastScrollTop) {
            node.scrollTop = this.interface.config.lastScrollTop;
            node.scrollLeft = this.interface.config.scrollLeft;
            this.interface.config.lastScrollTop = 0;
          }
        }
      } else {
        if (this.isConnected) {
          console.error('no config set');
          lit_html_1.render(lit_html_1.html``, this);
        }
      }
    });
  }
};
FreeGrid = __fuse_decorate.d([core_1.customElement('free-grid')], FreeGrid);
exports.FreeGrid = FreeGrid;

},

// samples/grid-sample/src/components/dummyData.ts @59
59: function(__fusereq, exports, module){
exports.__esModule = true;
exports.data = ['Flss', 'Banishevitz', null, 'task-force', 'Tracee', 'Dregan', null, 'User-centric', 'Corly', 'Lunge', null, 'Ameliorated', 'Tobe', 'Marian', null, 'uniform', 'Amalita', 'Allam', null, 'intermediate', 'Janos', 'Becke', null, 'encompassing', 'Willi', 'Jaram', null, 'frame', 'Sharyl', 'Beck', null, 'background', 'Alejandro', 'Brayley', null, 'Cross-platform', 'Amy', 'Lazar', null, 'Enterprise-wide', 'Alaster', 'Wakley', null, 'system-worthy', 'Gwennie', 'Killford', null, 'Horizontal', 'Blake', 'Batho', null, 'attitude', 'Troy', 'MacKaig', null, 'mission-critical', 'Brit', 'Fuggles', null, 'fault-tolerant', 'Virgie', 'Cleugher', null, 'foreground', 'Jecho', 'Bisacre', null, 'tertiary', 'Alisander', 'Pherps', null, 'needs-based', 'Cordell', 'Fairholm', null, 'Multi-lateral', 'Roderigo', 'Moreno', null, 'core', 'Terrell', 'MacAiline', null, 'time-frame', 'Rodrick', 'Cisland', null, 'parallelism', 'Ezra', 'Skentelbury', null, 'forecast', 'Madelina', 'Hansod', null, 'core', 'Martica', 'Samsonsen', null, 'bottom-line', 'Redd', 'Scutchings', null, 'bi-directional', 'Delmor', 'Hutcheon', null, 'high-level', 'Kip', 'Edwick', null, 'Object-based', 'Kari', 'Rosenzwig', null, 'regional', 'Rubetta', 'Skelton', null, 'Extended', 'Nanci', 'Craw', null, 'Right-sized', 'Duane', 'Cherry', null, 'model', 'Clarabelle', 'Pendergrast', null, 'intangible', 'Daria', 'Rosas', null, 'time-frame', 'Francesca', 'Glentworth', null, 'circuit', 'Abigael', 'Capun', null, 'Right-sized', 'Sallee', 'Ybarra', null, 'Managed', 'Ezmeralda', 'Phillips', null, 'standardization', 'Stephan', 'Stidever', null, 'software', 'Smith', 'Shouler', null, 'Future-proofed', 'Hobie', 'Lung', null, 'time-frame', 'Blane', 'Minchi', null, 'global', 'Dall', 'Amoore', null, 'systemic', 'Tybie', 'Amaya', null, 'Automated', 'Paul', 'Tyrrell', null, 'Triple-buffered', 'Reggie', 'Gellert', null, 'transitional', 'Alvera', 'Misk', null, 'Polarised', 'Urban', 'Bengoechea', null, 'local', 'Ferdie', 'Woollam', null, 'analyzer', 'Constantine', 'Eggleton', null, 'strategy', 'Mada', 'Cowins', null, 'Focused', 'Alecia', 'Lomath', null, 'bottom-line', 'Donall', 'Minucci', null, 'web-enabled', 'Patty', 'Driffield', null, 'real-time', 'Anne-corinne', 'Fasset', null, 'product', 'Halsy', 'Edyson', null, 'homogeneous', 'Donnajean', 'Fingleton', null, 'initiative', 'Fonz', 'Kerfod', null, 'static', 'Gage', 'Gaze', null, 'pricing structure', 'Duff', 'Dummigan', null, 'clear-thinking', 'Taite', 'Wegner', null, 'Triple-buffered', 'Bird', 'Abbey', null, 'needs-based', 'Muire', 'Esherwood', null, 'Distributed', 'Kirbee', 'Dobbin', null, 'middleware', 'Verge', "D'Aulby", null, 'portal', 'Abner', 'McNay', null, 'Synergized', 'Benji', 'Adame', null, 'protocol', 'Noemi', 'Aime', null, 'orchestration', 'Jayson', 'MacTeggart', null, 'Total', 'Barthel', 'Ranscomb', null, 'human-resource', 'Bryan', 'Winsor', null, 'background', 'Menard', 'Dowdle', null, 'database', 'Amby', 'Strafford', null, 'Diverse', 'Norean', 'Roper', null, 'Cross-group', 'Gasper', 'Chawner', null, 'secondary', 'Bamby', 'Poland', null, 'groupware', 'Ronda', 'Chestle', null, 'secured line', 'Asa', 'Rackam', null, 'info-mediaries', 'Crista', 'Julien', null, 'Balanced', 'Daniel', 'Ybarra', null, 'infrastructure', 'Germayne', 'Roseman', null, 'neural-net', 'Marla', 'Hourican', null, 'Vision-oriented', 'Howie', 'Sheach', null, 'Polarised', 'Mal', 'Pearcehouse', null, 'firmware', 'Kelbee', 'Wilstead', null, 'Synergized', 'Randi', 'Bachmann', null, 'optimizing', 'Granny', 'Oldcroft', null, 'orchestration', 'Zonda', 'Barnett', null, 'projection', 'Fredrick', 'Paulus', null, 'next generation', 'Olva', 'Durnill', null, 'scalable', 'Fanchon', 'Clapison', null, 'benchmark', 'Berkly', 'Clack', null, 'Right-sized', 'Lowell', 'Carwithim', null, 'zero defect', 'Zahara', 'Orrah', null, 'actuating', 'Gina', 'Andreix', null, 'structure', 'Holden', 'Snodin', null, 'application', 'Jyoti', 'Sweetzer', null, 'standardization', 'Lesly', 'Illem', null, 'fault-tolerant', 'Vernor', 'Swinn', null, 'Optimized', 'Dalton', 'Click', null, 'product', 'Reiko', 'Cauldwell', null, 'methodology', 'Cherrita', 'Pimlock', null, 'solution-oriented', 'Ronald', 'Semkins', null, 'even-keeled', 'Shellie', 'Alcott', null, 'Business-focused', 'Ronny', 'Coatts', null, 'Universal', 'Thia', 'Voden', null, 'pricing structure', 'Fabian', 'Spillett', null, 'forecast', 'Minnaminnie', 'Dove', null, 'Ergonomic', 'Thurstan', 'Merredy', null, 'capability', 'Marjy', 'Grestye', null, 'Synergistic', 'Ginni', 'Swyre', null, 'synergy', 'Brandie', 'Cuseick', null, 'definition', 'Curt', 'McDonagh', null, 'Persevering', 'Nathaniel', 'Skull', null, 'actuating', 'Sandye', 'Tunn', null, 'Optional', 'Felice', 'McNish', null, 'object-oriented', 'Dorisa', "O'Currane", null, 'Adaptive', 'Horst', 'Baitson', null, 'forecast', 'Benny', 'Smittoune', null, 'encryption', 'Marie', 'Austick', null, 'Polarised', 'Marwin', 'Sines', null, 'Front-line', 'Isidora', 'Housbie', null, 'Integrated', 'Ynes', 'Dulieu', null, 'analyzing', 'Field', 'Fermoy', null, 'throughput', 'Maddy', 'Perrott', null, 'mobile', 'Kenon', 'Chicotti', null, 'Versatile', 'Jody', 'Demer', null, 'Centralized', 'Fernandina', 'Hlavac', null, 'fault-tolerant', 'Kort', 'Mollnar', null, 'cohesive', 'Gael', 'Osburn', null, 'Ameliorated', 'Francklyn', 'Dell Casa', null, 'Optional', 'Kitti', 'Frotton', null, 'Versatile', 'Maddalena', 'Lemmon', null, 'real-time', 'Kirk', 'Nemchinov', null, 'Configurable', 'Jodee', 'Swatheridge', null, 'Sharable', 'Cynthie', 'Fitzhenry', null, 'background', 'Ree', 'Reidie', null, 'intermediate', 'Harriett', 'Ballintyne', null, '4th generation', 'Angus', 'Carpenter', null, 'Diverse', 'Finley', 'Gardiner', null, 'Total', 'Thadeus', 'Barhims', null, 'Exclusive', 'Nichol', 'Zipsell', null, 'support', 'Daniel', 'Giacubbo', null, 'disintermediate', 'Andris', 'Lanegran', null, 'website', 'Mill', 'Bursnall', null, 'multi-state', 'Dorris', 'Mabee', null, 'Multi-tiered', 'Rosina', 'St Pierre', null, 'leverage', 'Emeline', 'Crickmoor', null, 'Ergonomic', 'Isahella', 'Bastide', null, 'even-keeled', 'Janith', 'Benettelli', null, 'Persistent', 'Jarred', 'Dominichetti', null, 'Object-based', 'Cherin', 'Berr', null, 'definition', 'Lennie', 'Causton', null, 'matrix', 'Brnaby', 'Dionisetti', null, 'context-sensitive', 'Cele', 'Doberer', null, 'mobile', 'Joachim', 'Vasiljevic', null, 'non-volatile', 'Ashli', 'Lamberts', null, 'leading edge', 'Enos', 'Pieracci', null, 'transitional', 'Budd', 'Tomkys', null, 'hub', 'Marybeth', 'Lassey', null, 'well-modulated', 'Matthias', 'Crownshaw', null, 'Face to face', 'Kaspar', 'Sherwen', null, 'Secured', 'Linell', 'Brumwell', null, 'Enhanced', 'Ambur', 'Driutti', null, 'Intuitive', 'Billy', 'Chalcroft', null, 'project', 'Gherardo', 'Lindeberg', null, 'monitoring', 'Giuditta', 'Wrate', null, 'monitoring', 'Sky', 'Biasetti', null, 'local area network', 'Curcio', 'Choak', null, 'Horizontal', 'Marleah', 'Friatt', null, 'Fully-configurable', 'Connie', 'Toland', null, 'Quality-focused', 'Wally', 'Poynser', null, 'client-driven', 'Ward', 'Edison', null, 'empowering', 'Tania', 'Moulsdall', null, 'encryption', 'Hobie', 'McCarroll', null, 'systematic', 'Axe', "O'Dowd", null, 'contextually-based', 'Westbrooke', 'Brabbs', null, 'Synergistic', 'Noll', 'Gariff', null, 'User-centric', 'Adriane', 'Duckett', null, 'structure', 'Jolie', 'Biglin', null, 'dynamic', 'Allene', 'Kitchingman', null, 'function', 'Karel', 'Minshull', null, 'optimal', 'Milli', 'Capaldo', null, 'Enhanced', 'Shurlocke', 'Bulbrook', null, 'hub', 'Audrey', 'Ewbanck', null, 'data-warehouse', 'Emilie', 'Snelle', null, 'hardware', 'Benyamin', 'de Keyser', null, 'Front-line', 'Revkah', 'Archibold', null, 'Grass-roots', 'Ingrim', 'Wall', null, 'circuit', 'Julio', 'Davidowsky', null, 'portal', 'Heindrick', 'Eastgate', null, 'protocol', 'Calla', 'Bynold', null, 'background', 'Tabbi', 'Bonicelli', null, 'intermediate', 'Kleon', 'Kemmey', null, 'well-modulated', 'Denyse', 'Ginie', null, 'Persevering', 'Terrel', 'Dawkes', null, 'system engine', 'Shea', 'Spurnier', null, 'function', 'Demetra', 'Roizin', null, 'open architecture', 'Roselin', 'Tallach', null, 'moratorium', 'Kissie', 'Robardet', null, 'project', 'Erv', 'Cockren', null, 'neural-net', 'Clywd', 'Kivlin', null, 'installation', 'Kyle', 'Abrami', null, 'real-time', 'Elwyn', 'Peppin', null, 'tertiary', 'Donetta', 'Leaburn', null, 'multi-state', 'Clayborn', 'Hulles', null, 'installation', 'Edlin', 'Dumberell', null, 'initiative', 'Anny', 'Fance', null, 'installation', 'Willey', 'Scripture', null, 'Synergized', 'Conrade', 'Penhaligon', null, 'challenge', 'Christalle', 'Ambrosio', null, 'optimal', 'Malynda', 'Natalie', null, 'algorithm', 'Mae', 'Caughte', null, 'De-engineered', 'Cathi', 'Badger', null, 'budgetary management', 'Clem', 'Fishley', null, 'definition', 'Glynnis', 'Glendining', null, 'Re-engineered', 'Cyrus', 'Aronow', null, 'customer loyalty', 'Mehetabel', 'Siley', null, 'Exclusive', 'Benjamen', 'Karlqvist', null, '6th generation', 'Lorri', 'Blumson', null, 'empowering', 'Letta', 'Iamittii', null, 'Business-focused', 'Mose', 'Blaske', null, 'collaboration', 'Flem', 'Selliman', null, 'Synergized', 'Belia', 'Chicotti', null, 'Networked', 'Franky', 'Sheaber', null, 'cohesive', 'Gianna', 'Busson', null, 'Networked', 'Cecilio', 'Douthwaite', null, 'model', 'Joelie', 'Node', null, 'optimizing', 'Kiley', 'Hartlebury', null, 'actuating', 'Ellary', "O'Lagene", null, 'stable', 'Tades', 'Tewes', null, 'motivating', 'Rouvin', 'Jean', null, 'Advanced', 'Bryant', 'Jacobsz', null, 'Business-focused', 'Rab', 'Haymes', null, 'context-sensitive', 'Debi', 'Bernardeau', null, 'Distributed', 'Kally', 'Habbeshaw', null, 'responsive', 'Grissel', 'Mullard', null, 'Customizable', 'Margeaux', 'Bode', null, 'hardware', 'Kristos', 'Mealand', null, 'impactful', 'Rayshell', 'Lorek', null, 'responsive', 'Celeste', 'Maltby', null, 'Polarised', 'Claiborne', 'Sundin', null, 'artificial intelligence', 'Aland', 'Darton', null, 'fresh-thinking', 'Carmelina', 'Dumberell', null, 'Implemented', 'Gwenette', 'Royall', null, 'systemic', 'Egan', 'Ball', null, 'context-sensitive', 'Chance', 'Shakshaft', null, 'User-centric', 'Lilli', 'McKeown', null, 'user-facing', 'Garek', 'de la Valette Parisot', null, 'benchmark', 'Louise', 'Sweetnam', null, 'intangible', 'Harman', 'Summerfield', null, 'Future-proofed', 'Claresta', 'Faiers', null, 'internet solution', 'Heather', 'Lamberti', null, 'functionalities', 'Holly', 'MacAndreis', null, 'Sharable', 'Westley', 'Abbets', null, 'Cross-platform', 'Haskel', 'Kitley', null, 'Innovative', 'Quintin', 'MacClay', null, 'migration', 'Arron', 'De Bruin', null, 'Adaptive', 'Radcliffe', 'Sexti', null, 'customer loyalty', 'Larry', 'Geely', null, 'asymmetric', 'Leanora', "O'Neary", null, 'projection', 'Pattin', 'Jardine', null, '24 hour', 'Roderich', 'Maben', null, 'clear-thinking', 'Miquela', 'Heninghem', null, 'tertiary', 'Catherina', 'Rafter', null, '6th generation', 'Saunders', 'Volonte', null, 'Advanced', 'Bee', 'Trazzi', null, 'Customizable', 'Rex', 'McQuade', null, 'Innovative', 'Millie', 'Tulley', null, 'encompassing', 'Kittie', 'Sains', null, 'Profound', 'Lizzie', 'Ebbin', null, 'intangible', 'Ludovika', 'Nolder', null, 'Object-based', 'Hanson', 'Maffucci', null, 'Polarised', 'Ricky', 'Carrel', null, 'Team-oriented', 'Oralee', 'Bullen', null, 'Exclusive', 'Baxter', 'Capell', null, 'homogeneous', 'Averill', 'Davidi', null, 'access', 'Liz', 'Breadmore', null, 'eco-centric', 'Kare', 'Ottey', null, 'info-mediaries', 'Aundrea', 'Litherland', null, 'Business-focused', 'Avie', 'Coltart', null, 'bi-directional', 'Edy', 'Kinsella', null, 'concept', 'Marcy', 'Ceney', null, 'Diverse', 'Lianna', 'Hallgate', null, 'function', 'Kamila', 'Cave', null, 'projection', 'Carie', 'Laffoley-Lane', null, 'Profit-focused', 'Isidor', 'Dunnan', null, 'encompassing', 'Fernando', 'Pyle', null, 'Customer-focused', 'Darline', 'Dugdale', null, 'coherent', 'Gertie', 'Merryman', null, 'heuristic', 'Horatius', 'Wermerling', null, 'User-friendly', 'Demott', 'Geddes', null, 'Decentralized', 'Klarrisa', 'Sang', null, 'Virtual', 'Ceil', 'Morrallee', null, 'systematic', 'Khalil', 'Maffetti', null, 'tertiary', 'Willow', 'Fass', null, 'Public-key', 'Cora', 'Patmore', null, 'Quality-focused', 'Land', 'Permain', null, 'installation', 'Reta', 'Snoday', null, 'Persistent', 'Isidore', 'Tarbard', null, 'actuating', 'Rolph', 'Moodie', null, 'contingency', 'Merle', 'Gowenlock', null, '24 hour', 'Nerta', 'Springthorp', null, '24 hour', 'Clair', 'Strase', null, 'static', 'Tracie', 'Oty', null, 'heuristic', 'Georg', 'Christal', null, 'secured line', 'Guy', 'Goulthorp', null, 'Open-source', 'Vlad', 'August', null, '4th generation', 'Vanda', 'Crane', null, 'Customizable', 'Letta', 'Gillimgham', null, 'stable', 'Merry', 'Tomsa', null, 'coherent', 'Leola', 'Tremblett', null, 'bifurcated', 'Domenic', 'Brownlow', null, 'infrastructure', 'Dugald', 'Defrain', null, 'Profit-focused', 'Conrad', 'Theunissen', null, 'high-level', 'Torrey', 'Silk', null, 'Grass-roots', 'Arni', 'Duesbury', null, 'dedicated', 'Jessalin', 'Krebs', null, 'Profound', 'Brocky', 'Pasek', null, 'Polarised', 'Clemmie', 'Blood', null, 'content-based', 'Lanny', 'Trorey', null, 'function', 'Kalvin', 'Noonan', null, 'frame', 'Donia', 'Kenworthey', null, 'firmware', 'Halie', 'Pardi', null, 'bi-directional', 'Aubry', 'Ninnotti', null, 'Multi-channelled', 'Annamarie', 'Trundell', null, 'Intuitive', 'Brockie', 'Water', null, 'Right-sized', 'Rosamund', 'MacDonogh', null, 'parallelism', 'Trumann', 'Angrock', null, 'matrices', 'Carling', 'Piddlehinton', null, 'Automated', 'Dane', 'Condict', null, 'core', 'Constancia', 'Springate', null, 'context-sensitive', 'Harlin', 'Iggalden', null, 'Optimized', 'Aluino', 'Cripin', null, 'Multi-layered', 'Fernande', 'Rigler', null, 'matrix', 'Hendrick', 'Robberecht', null, 'groupware', 'Quintus', 'Clair', null, 'Exclusive', 'Joletta', 'Moores', null, 'concept', 'Berri', 'Tidbold', null, 'transitional', 'Hazel', 'Coatham', null, 'algorithm', 'Derk', 'Wandless', null, 'Pre-emptive', 'Marley', 'Gainor', null, 'Face to face', 'Benji', 'De Beauchemp', null, 'fault-tolerant', 'Gabrila', 'Schollick', null, 'workforce', 'Win', 'Tunnow', null, 'zero administration', 'Jonathon', 'Seville', null, 'local', 'Hillery', 'Petrelluzzi', null, 'alliance', 'Mariska', 'Lomb', null, 'mobile', 'Hayyim', 'Whitechurch', null, 'needs-based', 'Valentino', 'Kyne', null, 'encryption', 'Panchito', 'Peskett', null, 'standardization', 'Larissa', 'Rummery', null, 'alliance', 'Courtenay', 'Mayo', null, 'zero tolerance', 'Anabal', 'Stobbe', null, 'high-level', 'Nerta', 'Marritt', null, 'asynchronous', 'Marco', 'Haythorne', null, 'Triple-buffered', 'Adeline', 'Scrivens', null, 'Adaptive', 'Caralie', 'MacGille', null, 'Versatile', 'Gaynor', "O'Doogan", null, 'Synergized', 'Murry', 'Epinoy', null, 'Open-architected', 'Dalenna', 'Collinette', null, 'frame', 'Byrle', 'Menault', null, 'hardware', 'Talya', 'Darington', null, 'Public-key', 'Lira', 'MacCardle', null, 'methodical', 'Marrissa', 'Czyz', null, 'multimedia', 'Gerhardt', 'Smitherham', null, 'architecture', 'Benedick', 'Antic', null, 'local area network', 'Seamus', 'Radki', null, 'service-desk', 'Agnese', 'Deppe', null, 'orchestration', 'Zerk', 'Duligall', null, 'Synergistic', 'Jenny', 'Avo', null, 'hierarchy', 'Tabitha', 'Jenman', null, 'Reduced', 'Clea', 'Shera', null, 'bi-directional', 'Morrie', 'MacCumeskey', null, 'superstructure', 'Kris', 'Quest', null, 'throughput', 'Oran', 'Rout', null, 'firmware', 'Annis', 'Betham', null, 'Integrated', 'Allin', 'Hostan', null, 'Self-enabling', 'Warden', 'Sagg', null, 'parallelism', 'Kendall', 'Murdy', null, 'pricing structure', 'Durante', 'McMurray', null, 'regional', 'Berry', 'Souley', null, 'Profound', 'Naoma', 'Crace', null, 'grid-enabled', 'Ives', 'Jamieson', null, 'emulation', 'Odele', 'Kivell', null, 'Implemented', 'Malory', 'Wallbutton', null, 'Customizable', 'Cale', 'Wagenen', null, 'customer loyalty', 'Karl', 'Rattery', null, 'protocol', 'Gerty', 'Smelley', null, 'Expanded', 'Pip', 'Mothersole', null, '5th generation', 'Arlana', 'Danielski', null, 'next generation', 'Yule', 'Shitliffe', null, 'Cross-platform', 'Theobald', 'Reddyhoff', null, 'maximized', 'Kerianne', 'Lythgoe', null, 'Networked', 'Zedekiah', 'Hawsby', null, 'Visionary', 'Randell', 'Leathwood', null, 'complexity', 'Franchot', 'Cumine', null, 'knowledge base', 'Corbet', 'Muff', null, 'Right-sized', 'Christoffer', 'Gecke', null, 'disintermediate', 'Briana', 'Laskey', null, 'intranet', 'Angus', 'Artist', null, 'pricing structure', 'Jodie', 'Kittel', null, 'holistic', 'Dorelia', 'McIlenna', null, 'Team-oriented', 'Brandy', 'Shaplin', null, 'Seamless', 'Morrie', 'De Mico', null, 'circuit', 'Flory', 'Dows', null, 'Digitized', 'Tess', 'Chetwin', null, 'Profound', 'Kinny', 'Zamora', null, 'secondary', 'Tracy', 'Kleinplac', null, 'hub', 'Uta', 'Lydiate', null, 'secondary', 'Vera', 'Loan', null, 'collaboration', 'Benni', 'Penniell', null, 'zero defect', 'Reggis', 'Holdforth', null, 'frame', 'Adria', 'Monte', null, 'contingency', 'Faith', 'Chedzoy', null, 'archive', 'Ingrid', 'Graser', null, '5th generation', 'Enriqueta', 'Tie', null, 'radical', 'Gasper', 'Teenan', null, 'parallelism', 'Fifine', 'Lahiff', null, 'system engine', 'Sophi', 'Fealy', null, '6th generation', 'Joshia', 'Caurah', null, 'collaboration', 'Branden', 'Byard', null, 'product', 'Dyann', 'Tibb', null, 'support', 'Loni', 'Wenn', null, 'maximized', 'Marleah', 'Sail', null, 'Balanced', 'Stanislaus', 'Fley', null, 'Ergonomic', 'Pascale', 'Furst', null, 'maximized', 'Gus', 'Draijer', null, 'Phased', 'Blake', 'Nannini', null, 'matrices', 'Anthea', 'Faloon', null, 'stable', 'Alexandr', 'Dargie', null, 'impactful', 'Nickolas', 'Losemann', null, 'Function-based', 'Ruttger', 'Summerfield', null, 'support', 'Tanhya', 'Somerville', null, 'Configurable', 'Von', 'Brasher', null, 'Robust', 'Gal', 'Coverly', null, 'Multi-layered', 'Olly', 'Piola', null, 'parallelism', 'Roxanna', 'Brunesco', null, 'Innovative', 'Elias', 'Barehead', null, 'groupware', 'Cozmo', 'Aleksich', null, 'Object-based', 'Had', 'Parsall', null, 'website', 'Jessamine', 'Parsonson', null, 'Realigned', 'Erinn', 'Harrad', null, 'mobile', 'Trudy', 'Ternott', null, 'background', 'Leighton', 'Newick', null, 'application', 'Flem', 'Sabater', null, 'model', 'Horton', 'Luthwood', null, 'pricing structure', 'Yuma', 'Laxston', null, 'leading edge', 'Quintana', 'Barnwall', null, 'bandwidth-monitored', 'Ulrikaumeko', 'Ruter', null, 'Customizable', 'Stephana', 'Djurkovic', null, 'implementation', 'Agna', 'Freak', null, 'conglomeration', 'Faith', 'Courtman', null, 'exuding', 'Vassili', 'Novakovic', null, 'mobile', 'Issi', 'Vale', null, 'Intuitive', 'Olenolin', 'Wogdon', null, 'Triple-buffered', 'Nerte', 'Oglevie', null, 'directional', 'Conrad', 'Lanney', null, 'uniform', 'Glenden', 'Bauduccio', null, 'methodology', 'Booth', 'Gherarducci', null, 'Ergonomic', 'Row', 'Bosch', null, 'Multi-layered', 'Riordan', 'La Croce', null, 'Reduced', 'Brandy', 'Whicher', null, 'Fully-configurable', 'Gaultiero', 'McLay', null, 'parallelism', 'Stanly', 'Marquis', null, 'firmware', 'Jany', 'Byas', null, 'attitude-oriented', 'Noam', 'Shambroke', null, 'directional', 'Susy', 'Spratt', null, 'User-friendly', 'Goddart', 'Mayling', null, 'superstructure', 'Delila', 'Hankins', null, 'encoding', 'Rab', 'Devine', null, 'contingency', 'Engracia', 'Gradon', null, 'forecast', 'Allyn', 'Steljes', null, 'intermediate', 'Rolando', 'Bernat', null, 'discrete', 'Adamo', 'Boyles', null, 'Monitored', 'Brittan', 'Hollyman', null, 'Object-based', 'Leeland', 'Opie', null, 'Cross-group', 'Chrysa', 'Fairpool', null, 'system engine', 'Bernetta', 'Veivers', null, 'optimizing', 'Kate', 'Gullan', null, 'Intuitive', 'Flossie', 'Claiton', null, 'complexity', 'Marga', 'Baude', null, 'complexity', 'Teodoro', 'Philliphs', null, 'impactful', 'Hilary', 'Cottier', null, 'multi-tasking', 'Cord', 'Galliard', null, 'Public-key', 'Lisabeth', 'Fish', null, 'array', 'Cad', 'Merrin', null, 'Vision-oriented', 'Evvie', 'Gillum', null, 'Persistent', 'Ethe', 'Glashby', null, 'Digitized', 'Ham', 'Vallender', null, 'interactive', 'Dulciana', 'Andrysiak', null, 'adapter', 'Powell', 'Mar', null, 'Configurable', 'Dollie', 'Hurdidge', null, 'Stand-alone', 'Conchita', 'Twatt', null, 'zero defect', 'Hi', 'Sherbrook', null, 'Face to face', 'Lonnard', 'Hegdonne', null, 'systemic', 'Konrad', 'Jewes', null, 'Expanded', 'Freemon', 'Aldus', null, 'Synchronised', 'Adeline', 'Sauvan', null, 'Secured', 'Jodi', 'Creegan', null, 'Self-enabling', 'Crista', 'Bussen', null, 'utilisation', 'Wilek', 'Leavesley', null, 'multimedia', 'Steffane', 'Freshwater', null, '3rd generation', 'Gil', 'Ramberg', null, 'Multi-layered', 'Hazlett', 'Matiasek', null, 'interface', 'Odell', 'Boldock', null, 'Balanced', 'Deck', 'Gorner', null, 'holistic', 'Yasmin', 'Rowlatt', null, 'ability', 'Guendolen', "O'Hagerty", null, 'neural-net', 'Brian', 'Elden', null, 'Reduced', 'Calida', 'Bemment', null, 'Distributed', 'Dickie', 'Mott', null, 'secured line', 'Lloyd', 'Monelle', null, 'Cross-platform', 'Glennie', 'Corson', null, 'Cross-platform', 'Aubry', 'Jojic', null, 'Multi-tiered', 'Sutherland', 'MacIlraith', null, 'asynchronous', 'Percy', 'Kitlee', null, 'Versatile', 'Elnora', 'Madine', null, 'web-enabled', 'Kitti', 'Greenman', null, 'Secured', 'Akim', 'Waller', null, 'Integrated', 'Corene', 'Sale', null, 'tertiary', 'Rorie', 'Muirhead', null, 'Customizable', 'Alejandro', 'McDuffy', null, 'superstructure', 'Nevins', 'Sandford', null, 'task-force', 'Charlotte', 'Roswarn', null, 'pricing structure', 'Barbette', 'Norval', null, 'stable', 'Ardra', 'Lorek', null, 'eco-centric', 'Rubie', 'Proven', null, 'superstructure', 'Moira', 'Syseland', null, 'data-warehouse', 'Murielle', 'Banat', null, 'moderator', 'Armand', 'Cawse', null, 'Stand-alone', 'Gale', 'Cars', null, 'User-friendly', 'Rance', 'Leamon', null, 'executive', 'Barde', 'Rosenfarb', null, 'project', 'Keslie', 'Callinan', null, 'Monitored', 'Nedda', 'Anyene', null, 'process improvement', 'Jamill', 'Harvison', null, 'even-keeled', 'Vonny', 'Gerssam', null, 'Right-sized', 'Winnah', 'Gladeche', null, 'non-volatile', 'Lissi', 'Jeffree', null, 'frame', 'Guillermo', 'Glass', null, 'installation', 'Emily', 'Zoppie', null, 'service-desk', 'Annaliese', 'Davall', null, 'background', 'Homerus', 'Rowell', null, 'regional', 'Gabriele', 'McKeachie', null, 'encoding', 'Philippine', 'Versey', null, 'Multi-tiered', 'Hartwell', 'Knaggs', null, 'executive', 'Gunilla', 'Elwood', null, 'Self-enabling', 'Cyndi', 'Mulrenan', null, 'protocol', 'Nan', 'Izzat', null, 'local', 'Corby', 'Hobble', null, 'benchmark', 'Elmer', 'Ingree', null, 'Re-contextualized', 'Delinda', 'Terrelly', null, 'database', 'Ofella', 'Derges', null, 'Self-enabling', 'Rickie', 'Alans', null, 'systematic', 'Sauveur', 'Tomet', null, 'matrix', 'Jody', 'Greet', null, 'local area network', 'Archaimbaud', 'Waskett', null, 'user-facing', 'Berget', 'Kemball', null, 'Fundamental', 'Jourdain', 'Moen', null, 'upward-trending', 'Maryrose', 'Oxlade', null, 'user-facing', 'Anallese', 'Petrushka', null, '4th generation', 'Maison', 'Schooley', null, 'static', 'Tuck', 'Ramsbottom', null, 'Up-sized', 'Lorilee', 'Sallings', null, 'modular', 'Port', 'Lyford', null, 'capability', 'Becki', 'Munt', null, 'Face to face', 'Tybalt', 'Yates', null, 'methodical', 'Viviene', 'Tejero', null, 'adapter', 'Camilla', 'Manoelli', null, 'Phased', 'Camellia', 'Usherwood', null, 'focus group', 'Mignon', 'Baack', null, 'Object-based', 'Gloriane', 'Mehmet', null, 'Managed', 'Verine', 'Jenks', null, '3rd generation', 'Goober', 'Lepick', null, 'coherent', 'Hedy', 'Burren', null, 'zero tolerance', 'Floyd', 'Twiddy', null, 'disintermediate', 'Tabbatha', 'Fooks', null, 'asynchronous', 'Sebastien', 'Madelin', null, 'national', 'Kassey', 'Leates', null, 'model', 'Selle', 'Braidwood', null, 'Programmable', 'Raffaello', 'Bensley', null, 'data-warehouse', 'Raye', 'Caldaro', null, 'Enhanced', 'Jeff', 'Currall', null, 'intranet', 'Rawley', 'Love', null, 'approach', 'Lillian', 'Muckart', null, 'moderator', 'Bren', 'Glasspoole', null, 'grid-enabled', 'Silvio', 'Brant', null, 'standardization', 'Carlyn', 'Burkman', null, 'Advanced', 'Stanton', 'Coe', null, 'portal', 'Constancia', 'Dillestone', null, 'archive', 'Donal', 'Skittle', null, 'local', 'Debi', 'Gibbeson', null, 'paradigm', 'Gabi', 'Kiehl', null, 'tertiary', 'Nevil', 'McGreay', null, 'Exclusive', 'Paule', 'Angel', null, 'global', 'Timothee', 'Berwick', null, 'task-force', 'Gabrielle', 'Dearsley', null, 'didactic', 'Miguela', 'Matthiesen', null, 'neutral', 'Curt', 'Keigher', null, 'Organic', 'Lila', 'Lieb', null, 'Intuitive', 'Brendon', 'Martelet', null, 'Virtual', 'Yorke', 'Deetch', null, 'directional', 'Innis', 'Hendin', null, 'Customizable', 'Berke', 'McCrillis', null, 'Public-key', 'Emerson', 'Harvard', null, 'transitional', 'Gene', 'Ferrea', null, 'architecture', 'Yoshiko', 'Ordidge', null, 'parallelism', 'Burty', 'Stuckey', null, 'methodology', 'Janifer', 'Blankman', null, 'open system', 'Christy', 'Bicksteth', null, 'multimedia', 'Cheston', 'Tynewell', null, 'optimizing', 'Kiah', 'Sudron', null, 'framework', 'Nady', 'Rossander', null, '6th generation', 'Frazier', 'Faust', null, 'functionalities', 'Angeli', 'Leftwich', null, 'Quality-focused', 'Errick', 'Coxwell', null, 'installation', 'Alan', 'Knifton', null, 'initiative', 'Halsy', 'Strippel', null, 'conglomeration', 'Ludvig', 'Ransley', null, 'Exclusive', 'Jamie', 'Moizer', null, 'zero administration', 'Christophe', 'Rawcliffe', null, 'Optimized', 'Gerick', 'Massimi', null, 'explicit', 'Angela', 'Adanez', null, 'definition', 'Rhona', 'Neller', null, 'maximized', 'Calla', 'Brumham', null, '24/7', 'Lorianne', 'Cosby', null, 'Automated', 'Brenna', 'Gianni', null, 'Self-enabling', 'Beitris', 'Gavrielli', null, 'Multi-channelled', 'Colline', 'Antoszczyk', null, 'Optional', 'Alard', 'Haestier', null, 'collaboration', 'Kaiser', 'MacConneely', null, 'budgetary management', 'Egbert', 'Cadigan', null, 'system engine', 'Alfy', 'Delete', null, 'Front-line', 'Jacklyn', 'Sweetman', null, '5th generation', 'Marcellus', 'Gonzalvo', null, 'moderator', 'Alexandrina', 'Corona', null, 'approach', 'Efrem', 'Staniland', null, 'Decentralized', 'Duane', 'Olsen', null, 'Configurable', 'Teri', 'Brumby', null, 'intermediate', 'Damian', 'Fullalove', null, 'success', 'Petronilla', 'Renon', null, 'implementation', 'Libby', 'Leathley', null, 'Profit-focused', 'My', 'Bayne', null, 'encoding', 'Jordana', 'Ravenshear', null, 'heuristic', 'Anetta', 'Parrot', null, 'Seamless', 'Ardella', 'Hourahan', null, 'policy', 'Danny', 'McWilliams', null, 'bi-directional', 'Ravid', 'Mesias', null, 'structure', 'Gibby', 'Gellately', null, 'software', 'Lettie', 'Shatford', null, 'Persistent', 'Natal', 'Dell Casa', null, 'middleware', 'Enoch', 'Lawee', null, 'alliance', 'Janka', 'Chevin', null, 'optimal', 'Danila', 'Spurrett', null, 'frame', 'Melissa', 'Behling', null, 'intangible', 'Laurens', 'Northleigh', null, 'Open-architected', 'Piotr', 'Chopping', null, 'executive', 'Odey', 'Shave', null, 'mission-critical', 'Paolina', 'Grindley', null, 'Upgradable', 'Kile', 'Stonehouse', null, 'needs-based', 'Zane', 'Andrichuk', null, 'Synergized', 'Barbee', 'Zupone', null, 'actuating', 'Gan', 'Rennock', null, 'dedicated', 'Trey', 'Thorndycraft', null, 'regional', 'Guglielmo', 'Spritt', null, 'portal', 'Omar', 'Pina', null, 'instruction set', 'Thatcher', 'Maasze', null, 'Persistent', 'Cirilo', 'MacPaik', null, '6th generation', 'Hirsch', 'Whitcomb', null, 'Function-based', 'Cully', 'Wilhelmy', null, 'knowledge user', 'Rodger', 'Whiston', null, 'Multi-channelled', 'Chiquia', 'Bicknell', null, 'User-centric', 'Renie', 'Dungate', null, 'Mandatory', 'Devina', 'Bruntjen', null, 'Triple-buffered', 'Linoel', 'Edgell', null, 'Optimized', 'Hildagard', 'Saladino', null, 'initiative', 'Susi', 'Walentynowicz', null, 'policy', 'Rosalyn', 'Warbeys', null, 'national', 'Minnnie', 'Moral', null, 'forecast', 'Tiler', 'Slaney', null, 'definition', 'Felicle', 'Shepstone', null, '4th generation', 'Ree', 'Waters', null, 'forecast', 'Alexina', 'Overstall', null, 'grid-enabled', 'Sonya', 'Bisacre', null, 'parallelism', 'Deanne', 'Corpes', null, 'toolset', 'Tresa', 'Hanhard', null, 'mobile', 'Norma', 'Vondrys', null, 'hardware', 'Lockwood', 'Beevis', null, 'application', 'Alica', 'Edlin', null, 'intranet', 'Avril', 'Dymock', null, 'implementation', 'Adrian', 'Addicott', null, 'concept', 'Augustine', 'Leger', null, 'well-modulated', 'Merv', 'Woolland', null, 'content-based', 'Jimmy', 'Holberry', null, 'artificial intelligence', 'Stefa', 'MacKenney', null, 'Optimized', 'Petr', 'Ifill', null, 'portal', 'Fifi', 'Jubert', null, 'Implemented', 'Shelli', 'Vearnals', null, 'Integrated', 'Joye', 'Cove', null, 'Robust', 'Gypsy', 'Lowen', null, 'Vision-oriented', 'Barn', 'Purry', null, 'product', 'Rhett', 'Barrabeale', null, 'Triple-buffered', 'Helenelizabeth', 'McDuall', null, 'knowledge base', 'Codi', 'Pascow', null, 'alliance', 'Janeta', 'Cornils', null, 'Cross-platform', 'Donnell', 'Tybalt', null, 'transitional', 'Prisca', 'Trimble', null, 'paradigm', 'Victor', 'Stachini', null, 'Operative', 'Stuart', 'Got', null, 'firmware', 'Merola', 'Legg', null, 'Innovative', 'Gwenore', 'McNickle', null, 'Seamless', 'Rossie', 'Petkens', null, 'bottom-line', 'Harper', 'Andrelli', null, 'bi-directional', 'Rita', 'Curds', null, 'bottom-line', 'Leigha', 'Bowart', null, 'Enhanced', 'Sorcha', 'Nudde', null, 'Ergonomic', 'Jaquelyn', 'Gottelier', null, 'Reactive', 'Editha', 'Sammons', null, 'national', 'Bar', 'Blackboro', null, 'Profit-focused', 'Ralf', 'Gero', null, 'radical', 'Nicolai', 'Boddis', null, 'eco-centric', 'Harwell', 'Bygott', null, 'task-force', 'Iosep', 'Jayes', null, 'Operative', 'Murry', 'Freer', null, 'foreground', 'Clementia', 'Noddles', null, 'contextually-based', 'Dov', 'Edgeley', null, 'task-force', 'Stearn', 'Stuchbery', null, 'Persevering', 'Rossy', 'Orvis', null, 'Secured', 'Deina', 'Fibbitts', null, 'Fully-configurable', 'Teodor', 'Laity', null, 'mobile', 'Goddard', 'Scoon', null, 'productivity', 'Constantina', 'Olivello', null, 'logistical', 'Kippy', 'Tromans', null, 'Exclusive', 'Emmett', 'Letchford', null, 'utilisation', 'Heidi', 'De Freyne', null, 'Compatible', 'Dodi', 'MacKenny', null, 'Organic', 'Alford', 'Colmer', null, 'Persevering', 'Kally', 'Kirke', null, 'framework', 'Timi', 'Graalman', null, 'cohesive', 'Morgun', 'Scullard', null, 'dedicated', 'Fairfax', 'Hedling', null, 'budgetary management', 'Judie', 'Topper', null, 'secured line', 'Jock', 'Rameau', null, 'database', 'Clive', 'Cookes', null, 'open system', 'Derry', 'Mosten', null, 'Ameliorated', 'Riannon', 'Haycox', null, 'collaboration', 'Todd', 'Bowich', null, 'info-mediaries', 'Brook', 'Grunnill', null, 'Operative', 'Esmaria', 'Ryson', null, 'Enhanced', 'Dunn', 'Burdon', null, 'architecture', 'Miguela', 'Monckton', null, 'multi-state', 'Jany', 'Gethings', null, 'clear-thinking', 'Lorelei', 'Ivanikhin', null, 'migration', 'Grannie', 'Sandiland', null, 'Universal', 'Ogdon', 'Chadburn', null, 'structure', 'Westley', 'Elvish', null, 'real-time', 'Jacquelyn', "O'Hegertie", null, 'Configurable', 'Magdalene', 'Durno', null, 'open system', 'Theodore', 'Saur', null, 'cohesive', 'Lanie', 'Peek', null, 'real-time', 'Cort', 'Clayworth', null, 'policy', 'Emmery', 'Saffon', null, 'initiative', 'Cyril', 'Pembery', null, 'high-level', 'Rene', 'Pavic', null, 'systematic', 'Dione', 'Bence', null, 'Front-line', 'Ravid', 'Breache', null, 'focus group', 'Tiphani', 'Nesterov', null, 'orchestration', 'Lily', 'Gerding', null, 'Synergized', 'Evelin', 'Hounsom', null, 'eco-centric', 'Jasper', 'Sysland', null, 'leading edge', 'Rudolph', 'Rogerot', null, 'cohesive', 'Gilbertina', 'Moorman', null, 'application', 'Vida', 'Caves', null, 'superstructure', 'Ambrosio', 'Snowsill', null, 'bi-directional', 'Courtnay', 'Reede', null, 'array', 'Perceval', 'Maunder', null, 'collaboration', 'Hagan', 'Pedel', null, 'implementation', 'Kate', 'de la Valette Parisot', null, 'Stand-alone', 'Lutero', 'Bladder', null, 'Function-based', 'Lilian', 'Alcido', null, 'monitoring', 'Sonia', 'Maylam', null, 'structure', 'Ronny', 'Went', null, 'Enhanced', 'Neila', 'Rapps', null, 'optimal', 'Isobel', 'Salvati', null, 'local area network', 'Georgetta', 'Clearie', null, 'Integrated', 'Page', 'Padbery', null, 'infrastructure', 'Alverta', 'Petrillo', null, 'homogeneous', 'Katee', 'Briiginshaw', null, 'zero tolerance', 'Prue', 'Poller', null, 'secured line', 'Rex', 'Banasik', null, 'database', 'Yvon', 'Spurrier', null, 'artificial intelligence', 'Gustave', 'Messier', null, 'portal', 'Regan', 'Bollis', null, 'projection', 'Marco', 'Humpage', null, 'intranet', 'Kahlil', 'Normanton', null, 'Re-contextualized', 'Sheffie', 'Luddy', null, 'multimedia', 'Federico', 'Swinbourne', null, 'modular', 'Art', 'Paradine', null, 'analyzer', 'Corry', 'Hedlestone', null, 'complexity', 'Schuyler', 'Luck', null, 'needs-based', 'Farah', 'Haddock', null, 'Fundamental', 'Candy', 'Bercevelo', null, 'strategy', 'Lorraine', 'Pinwill', null, 'interface', 'Keelia', 'Shellcross', null, 'Future-proofed', 'Annie', 'Klimschak', null, 'Devolved', 'Albie', 'Limb', null, 'methodology', 'Chance', 'Bru', null, 'Profit-focused', 'Deloria', 'Tonn', null, 'Cross-group', 'Augustina', 'Sanbrooke', null, 'Open-architected', 'Ari', "O' Loughran", null, 'Reduced', 'Gray', 'Jermin', null, 'Upgradable', 'Cynthia', 'Drinkale', null, 'knowledge base', 'Garret', 'Duffett', null, 'dedicated', 'Doyle', 'Fitzhenry', null, 'approach', 'Lev', "O'Crowley", null, 'Optional', 'Koren', 'Piff', null, 'emulation', 'Aldous', 'Keel', null, 'contextually-based', 'Micky', 'Kubacki', null, 'Reduced', 'Horten', 'Ruberti', null, 'global', 'Astrid', 'Twydell', null, 'Secured', 'Dallon', 'Maingot', null, 'Optimized', 'Abbott', 'Siaspinski', null, '6th generation', 'Lyman', 'Geeve', null, 'support', 'Danila', 'Dukesbury', null, 'neutral', 'Bradan', 'Caton', null, 'Reverse-engineered', 'Obed', 'Challenor', null, 'Automated', 'Rhiamon', "D'Antoni", null, 'function', 'Caralie', 'Milnthorpe', null, 'Virtual', 'Rosina', 'Maudlen', null, 'Exclusive', 'Reinwald', 'Gilbride', null, 'zero administration', 'Bianca', 'Pound', null, 'Synergistic', 'Heywood', 'Bizzey', null, 'discrete', 'Ginnie', 'York', null, 'Reactive', 'Bailie', 'Ingreda', null, 'interactive', 'Appolonia', 'Murcott', null, 'Future-proofed', 'Humbert', 'Lademann', null, 'matrices', 'Eustace', 'McInulty', null, 'middleware', 'Jordain', 'Tisun', null, 'Phased', 'Doyle', 'Kleint', null, 'system engine', 'Blayne', 'Schimke', null, 'value-added', 'Berget', 'Caras', null, 'support', 'Helene', 'Blesing', null, 'real-time', 'Garland', 'Delete', null, 'multimedia', 'Kacey', 'Dionsetti', null, 'Devolved', 'Melony', 'Simmans', null, 'cohesive', 'Bari', 'Bilovus', null, 'executive', 'Tamarah', 'Schuchmacher', null, 'process improvement', 'Denys', 'Maycock', null, 'task-force', 'Monica', 'Canfer', null, 'needs-based', 'Jeremie', 'Martinec', null, 'toolset', 'Granthem', 'Murfin', null, 'zero tolerance', 'Eachelle', 'Byrcher', null, 'initiative', 'Cointon', 'Wearden', null, 'uniform', 'Blayne', 'Levinge', null, 'client-server', 'Eldridge', 'De Wolfe', null, 'local', 'Chadwick', 'Gaveltone', null, 'Team-oriented', 'Leroi', 'Robic', null, 'encryption', 'Ravid', 'Commins', null, 'orchestration', 'Taddeo', 'Chominski', null, 'Monitored', 'Damaris', 'Browne', null, 'Ergonomic', 'Noby', 'Pearl', null, 'Multi-layered', 'Missie', 'Gerwood', null, 'initiative', 'Olive', 'Clow', null, 'solution-oriented', 'Karilynn', 'Butt Gow', null, 'Phased', 'Helene', 'Baly', null, 'protocol', 'Saundra', 'Donaway', null, 'regional', 'Max', 'Bailess', null, 'Multi-lateral', 'Gasparo', 'Martlew', null, 'disintermediate', 'Chicky', 'Sweetland', null, 'exuding', 'Durward', 'Messam', null, 'Multi-channelled', 'Angie', 'Keach', null, 'Pre-emptive', 'Elsa', 'Kernan', null, 'Ergonomic', 'Benni', 'Borthwick', null, 'multi-state', 'Correy', 'Scroggins', null, '3rd generation', 'Kalie', 'Janse', null, 'intangible', 'Stormy', 'Zimek', null, 'Digitized', 'Thane', 'Fenelow', null, 'Profound', 'Grady', 'Toma', null, 'leading edge', 'Bartel', 'McGuggy', null, 'solution', 'Jyoti', 'Feltham', null, 'contingency', 'Linda', 'Filipiak', null, 'background', 'Reine', 'McKendo', null, 'array', 'Lusa', 'Lofthouse', null, 'Virtual', 'Malena', 'Juara', null, 'Reverse-engineered', 'Addie', 'Matt', null, 'maximized', 'Egor', 'Lober', null, 'Reverse-engineered', 'Andreana', 'Probert', null, 'Public-key', 'Ervin', 'Hannabus', null, 'bottom-line', 'Dorey', 'Spears', null, 'Graphical User Interface', 'Sandi', 'Stoak', null, 'service-desk', 'Bette', 'Aulds', null, 'Digitized', 'Forrester', 'Burnel', null, 'Fundamental', 'Terry', 'Todhunter', null, 'radical', 'Arlee', 'Borgne', null, 'web-enabled', 'Vivi', 'Peck', null, 'content-based', 'Vite', 'Van Baaren', null, 'client-driven', 'Mercy', 'Vamplers', null, 'utilisation', 'Sharlene', 'Keaton', null, 'Balanced', 'Josh', 'Winskill', null, 'Expanded', 'Mischa', 'Assinder', null, 'moratorium', 'Gustie', 'Flaubert', null, 'Automated', 'Elfrieda', 'Jarratt', null, 'utilisation', 'Tallie', 'Lockhurst', null, 'intranet', 'Roslyn', 'Fittis', null, 'parallelism', 'Jordan', 'Daviddi', null, 'regional', 'Patrizius', 'Sowerbutts', null, '6th generation', 'Simone', 'Sperling', null, 'secured line', 'Glen', 'Wilcocke', null, 'parallelism', 'Wynn', 'Oolahan', null, 'leverage', 'Kailey', 'Peebles', null, 'product', 'Libbey', 'Sissland', null, 'real-time', 'Wilbur', 'Over', null, 'Open-architected', 'Benedikt', 'Pilbeam', null, 'Customizable', 'Van', 'Riordan', null, 'synergy', 'Edan', 'Soppit', null, 'Mandatory', 'Teodor', 'Daunay', null, 'framework', 'Agathe', 'Jubb', null, 'open architecture', 'Ina', 'Bertlin', null, 'directional', 'Lulita', 'Vigietti', null, 'Graphical User Interface', 'Sawyere', 'Pyle', null, 'foreground', 'Loralie', 'Carsey', null, 'zero tolerance', 'Maureene', 'Aggio', null, 'strategy', 'Fabian', "O'Kieran", null, 'systemic', 'Ozzy', 'Cordle', null, 'parallelism', 'Bent', 'Crain', null, 'Ameliorated', 'Teddie', 'Kondratowicz', null, 'hybrid', 'Kyrstin', 'Rugiero', null, '24 hour', 'Aeriel', 'Bristow', null, 'support', 'Denna', 'Goodfellowe', null, 'Cloned', 'Vittoria', 'Barnett', null, 'task-force', 'Nixie', 'Lodemann', null, 'model', 'Tisha', 'Kubacek', null, 'scalable', 'Urson', 'Lethley', null, '5th generation', 'Calvin', 'Briereton', null, 'help-desk', 'Angie', 'Chatell', null, 'product', 'Pandora', 'Brabender', null, 'pricing structure', 'Aubrey', 'Vanini', null, 'intranet', 'Miranda', 'Hansell', null, 'architecture', 'Sybil', 'Furst', null, 'orchestration', 'Sylvan', 'Eddolls', null, 'application', 'Alec', 'Wharin', null, 'coherent', 'Sig', 'Forder', null, '3rd generation', 'Loydie', 'Tanton', null, 'encompassing', 'Trip', 'Cotes', null, 'client-driven', 'Ange', 'Hundley', null, 'application', 'Beverlie', 'Armour', null, 'solution', 'Dallon', 'Gallemore', null, 'Focused', 'Wilek', 'McIan', null, 'fault-tolerant', 'Odessa', 'Hembry', null, 'Managed', 'Cristabel', 'Soughton', null, 'methodical', 'Theadora', 'Millott', null, 'customer loyalty', 'Cirillo', 'Batisse', null, 'intermediate', 'Martainn', 'Hum', null, 'Fundamental', 'Brigitta', 'Argile', null, 'architecture', 'Madella', 'Jerwood', null, 'bottom-line', 'Ralf', 'Hillum', null, 'dedicated', 'Gwenette', 'Blasing', null, 'homogeneous', 'Richmound', 'Noon', null, '4th generation', 'Iver', 'Chaulk', null, 'application', 'Rolph', 'Bunting', null, 'solution-oriented', 'Emera', 'Relfe', null, 'array', 'Marybeth', 'Dradey', null, 'Pre-emptive', 'Taber', 'Burch', null, 'info-mediaries', 'Dalila', 'Fidian', null, 'actuating', 'Udell', 'Philler', null, 'projection', 'Justin', 'Braune', null, 'emulation', 'Philbert', 'Gillbe', null, 'hierarchy', 'Gray', 'Bushe', null, 'Programmable', 'Tish', 'Dandison', null, 'modular', 'Alley', 'Puller', null, 'Quality-focused', 'Peadar', 'Bye', null, 'Compatible', 'Jasun', 'Dwelly', null, 'client-server', 'Gerrilee', 'Kiddye', null, 'Triple-buffered', 'Cull', 'Lorenzo', null, 'Multi-channelled', 'Demetre', 'Beauman', null, 'website', 'Frasier', 'Philippou', null, 'Decentralized', 'Joni', 'McMearty', null, 'portal', 'Gris', 'Bleas', null, 'reciprocal', 'Sapphira', 'Croke', null, 'Compatible', 'Wood', 'Klaussen', null, 'knowledge base', 'Kellsie', 'Brideau', null, 'Versatile', 'Alfie', 'Ellinor', null, 'Innovative', 'Arleyne', 'Patershall', null, 'algorithm', 'Hazel', 'Kienle', null, 'Decentralized', 'Osborn', 'Hirschmann', null, 'executive', 'Nahum', 'Schulke', null, '4th generation', 'Nicky', 'Hedley', null, 'Secured', 'Mabelle', 'Kemmet', null, 'Team-oriented', 'Herta', 'Schurcke', null, 'structure', 'Abigail', 'Robecon', null, 'explicit', 'Jedediah', 'Macrae', null, 'leverage', 'Harris', 'Stanex', null, 'encompassing', 'Roderick', 'Doody', null, 'coherent', 'Christan', 'Paur', null, 'asynchronous', 'Aron', 'Leeburne', null, 'Versatile', 'Mariel', 'Bartlosz', null, 'Right-sized', 'Aldon', 'Duckham', null, 'Customer-focused', 'Niall', 'Cristofolini', null, 'Compatible', 'Aile', 'Rickaert', null, 'heuristic'];

},

// samples/grid-sample/src/components/dummyDataGenerator.ts @19
19: function(__fusereq, exports, module){
exports.__esModule = true;
var dummyData_1 = __fusereq(59);
class DummyDataGenerator {
  constructor() {
    this.totalGenerated = 0;
    this.internalDataArray = dummyData_1.data;
  }
  reset() {
    this.totalGenerated = 0;
  }
  generateData(no) {
    const dummyArray = [];
    for (let i = 0; i < no; i++) {
      this.totalGenerated++;
      const random = function () {
        const x1 = Math.floor(Math.random() * 3) + 0;
        const x2 = Math.floor(Math.random() * 9) + 0;
        const x3 = Math.floor(Math.random() * 9) + 0;
        const x4 = Math.floor(Math.random() * 9) + 0;
        return `${x1}${x2}${x3}${x4}`;
      };
      const date = new Date(new Date().setDate(new Date().getDate() + (Math.floor(Math.random() * 300) + 0)));
      const data = this.internalDataArray;
      dummyArray.push({
        index: this.totalGenerated,
        word1: data[random()],
        word2: data[random()],
        word3: data[random()],
        word4: data[random()],
        word5: data[random()],
        word6: data[random()],
        word7: data[random()],
        word8: data[random()],
        word9: data[random()],
        word10: data[random()],
        word11: data[random()],
        word12: data[random()],
        word13: data[random()],
        word14: data[random()],
        word15: data[random()],
        word16: data[random()],
        word17: data[random()],
        word18: data[random()],
        word19: data[random()],
        word20: data[random()],
        word21: data[random()],
        word22: data[random()],
        word23: data[random()],
        word24: data[random()],
        word25: data[random()],
        word26: data[random()],
        word27: data[random()],
        word28: data[random()],
        word29: data[random()],
        word31: data[random()],
        word32: data[random()],
        word33: data[random()],
        word34: data[random()],
        word35: data[random()],
        word36: data[random()],
        number: Math.floor(Math.random() * 9000) + 0,
        bool: Math.floor(Math.random() * 9000) % 3 ? true : false,
        date: date
      });
    }
    return dummyArray;
  }
}
exports.DummyDataGenerator = DummyDataGenerator;

},

// samples/grid-sample/src/components/colSetup.ts @18
18: function(__fusereq, exports, module){
exports.__esModule = true;
let setup = {
  cellHeight: 20,
  panelHeight: 25,
  footerHeight: 20,
  selectionMode: 'multiple',
  groups: [{
    width: 120,
    rows: [{
      header: 'index',
      attribute: 'index',
      type: 'number',
      sortable: {},
      filterable: {}
    }, {
      header: 'date',
      attribute: 'date',
      type: 'date',
      sortable: {},
      filterable: {},
      allowGrouping: true
    }, {
      header: '',
      attribute: '',
      type: 'empty',
      filterable: {},
      sortable: {},
      allowGrouping: true
    }, {
      header: 'Number',
      attribute: 'number',
      type: 'number',
      filterable: {},
      sortable: {}
    }]
  }]
};
let word = 0;
for (let i = 1; i < 10; i++) {
  let x = [];
  for (let y = 0; y < 4; y++) {
    word++;
    x.push({
      header: 'word' + word,
      attribute: 'word' + word,
      filterable: {},
      sortable: {},
      allowGrouping: true
    });
  }
  setup.groups.push({
    width: 120,
    rows: x
  });
}
exports.COL_SETUP = setup;

},

// samples/grid-sample/src/components/app-component.ts @9
9: function(__fusereq, exports, module){
var _1_;
var _2_;
var _3_;
var __fuse_decorate = __fusereq(15);
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var colSetup_1 = __fusereq(18);
var dummyDataGenerator_1 = __fusereq(19);
var grid_1 = __fusereq(8);
var core_1 = __fusereq(10);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super();
    this.data = [];
    this.entity = null;
    this.dummyDataGenerator = new dummyDataGenerator_1.DummyDataGenerator();
    this.data = this.dummyDataGenerator.generateData(1000);
    this.connector = new grid_1.GridInterface(colSetup_1.COL_SETUP);
    this.connector.setData(this.data, false);
    this.connector.addEventListener(() => {
      this.entity = this.connector.currentEntity;
      core_1.requestRender(this);
      return this.isConnected;
    });
  }
  replaceData(x) {
    this.data = this.dummyDataGenerator.generateData(x);
    this.connector.setData(this.data);
  }
  group() {
    colSetup_1.COL_SETUP.sortingSet = [{
      attribute: 'word1',
      asc: true,
      no: 1
    }, {
      attribute: 'word2',
      asc: true,
      no: 2
    }, {
      attribute: 'word3',
      asc: true,
      no: 3
    }];
    colSetup_1.COL_SETUP.groupingSet = [{
      title: 'Word1',
      field: 'word1'
    }, {
      title: 'Word2',
      field: 'word2'
    }];
    colSetup_1.COL_SETUP.groupingExpanded = ['Barton', 'Barton-Aida'];
    this.connector.manualConfigChange();
  }
  clear() {
    colSetup_1.COL_SETUP.groupingExpanded = [];
    colSetup_1.COL_SETUP.sortingSet = [];
    colSetup_1.COL_SETUP.groupingSet = [];
    this.connector.manualConfigChange();
  }
  addData(x) {
    this.connector.setData(this.dummyDataGenerator.generateData(x), true);
  }
  render() {
    return lit_html_1.html`
            <div class="flex flex-row">
                <div>
                    <div class="m-1 p-1">
                        <button
                            @click=${() => {
      this.clear();
    }}
                        >
                            clear grouping/sorting etc
                        </button>
                        <button
                            @click=${() => {
      this.group();
    }}
                        >
                            group
                        </button>
                    </div>

                    <div class="m-1 p-1">
                        <button
                            @click=${() => {
      this.replaceData(100);
    }}
                        >
                            set 100
                        </button>
                        <button
                            @click=${() => {
      this.replaceData(50);
    }}
                        >
                            set 50
                        </button>
                        <button
                            @click=${() => {
      this.replaceData(10);
    }}
                        >
                            set 10
                        </button>
                        <button
                            @click=${() => {
      this.replaceData(1);
    }}
                        >
                            set 1
                        </button>
                        <button
                            @click=${() => {
      this.replaceData(0);
    }}
                        >
                            set 0
                        </button>
                        <button
                            @click=${() => {
      console.log(this.connector.edited());
    }}
                        >
                            edited
                        </button>
                    </div>
                    <div class="m-1 p-1">
                        <button
                            @click=${() => {
      this.addData(1);
    }}
                        >
                            add 1
                        </button>
                        <button
                            @click=${() => {
      this.addData(10);
    }}
                        >
                            add 10
                        </button>
                        <button
                            @click=${() => {
      this.addData(100);
    }}
                        >
                            add 100
                        </button>
                        <button
                            @click=${() => {
      this.addData(1000);
    }}
                        >
                            add 1000
                        </button>
                    </div>
                    <div class="m-1 p-1">
                        <button
                            @click=${() => {
      this.connector.first();
    }}
                        >
                            first
                        </button>
                        <button
                            @click=${() => {
      this.connector.prev();
    }}
                        >
                            prev
                        </button>
                        <button
                            @click=${() => {
      this.connector.select(5);
    }}
                        >
                            select row 5
                        </button>
                        <button
                            @click=${() => {
      this.connector.next();
    }}
                        >
                            next
                        </button>
                        <button
                            @click=${() => {
      this.connector.last();
    }}
                        >
                            last
                        </button>
                    </div>
                    <div class="flex flex-col">
                        <label class="p-1 m-2"
                            >word1:
                            <input
                                .value=${((_1_ = this.entity) === null || _1_ === void 0 ? void 0 : _1_.word1) || ''}
                                @change=${e => {
      if (this.entity) {
        this.entity.word1 = e.target.value;
        this.connector.reRender();
      }
    }}
                        /></label>
                        <label class="p-1 m-2"
                            >word2:
                            <input
                                .value=${((_2_ = this.entity) === null || _2_ === void 0 ? void 0 : _2_.word2) || ''}
                                @change=${e => {
      if (this.entity) {
        this.entity.word2 = e.target.value;
        this.connector.reRender();
      }
    }}
                        /></label>
                        <label class="p-1 m-2"
                            >word3:
                            <input
                                .value=${((_3_ = this.entity) === null || _3_ === void 0 ? void 0 : _3_.word3) || ''}
                                @change=${e => {
      if (this.entity) {
        this.entity.word3 = e.target.value;
        this.connector.reRender();
      }
    }}
                        /></label>
                    </div>
                </div>
                <free-grid
                    style="height:700px;width:100%"
                    class="free-grid"
                    .interface=${this.connector}
                >
                </free-grid>
            </div>
        `;
  }
};
__fuse_decorate.d([core_1.property(), __fuse_decorate.m("design:type", Object)], __DefaultExport__.prototype, "entity", void 0);
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('app-component'), __fuse_decorate.m("design:paramtypes", [])], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/grid-sample/src/index.ts @1
1: function(__fusereq, exports, module){
exports.__esModule = true;
__fusereq(4);
__fusereq(5);
__fusereq(7);
__fusereq(8);
__fusereq(9);
var core_1 = __fusereq(10);
core_1.enableInternalLogger(['FREE-GRID-ROW-GROUP', 'FREE-GRID-CELL-ROW', 'FREE-GRID-GROUP-ROW', 'FREE-GRID-CELL-LABEL', 'FREE-GRID-CELL-FILTER', 'FREE-GRID-ROW', 'FREE-GRID-GROUP-FILTER', 'FREE-GRID-GROUP-LABEL', 'FREE-GRID-PANEL', 'FREE-GRID-FOOTER', 'FREE-GRID-BODY', 'FREE-GRID-HEADER']);
console.log('sample-v:', 1);

}
})
//# sourceMappingURL=app.js.map