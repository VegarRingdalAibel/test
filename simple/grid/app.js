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

// samples/grid/fuseHmrPlugin.ts @2
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

// node_modules/fuse-box/modules/fuse_helpers_decorate/index.js @20
20: function(__fusereq, exports, module){
function d(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return (c > 3 && r && Object.defineProperty(target, key, r), r);
}
exports.d = d;
function p(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
exports.p = p;
function m(metadataKey, metadataValue) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(metadataKey, metadataValue);
}
exports.m = m;

},

// packages/core/src/symbols.ts @58
58: function(__fusereq, exports, module){
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

// packages/core/src/prop.ts @26
26: function(__fusereq, exports, module){
exports.__esModule = true;
var symbols_1 = __fusereq(58);
function prop() {
  return function reg(_class, prop) {
    Object.defineProperty(_class, prop, {
      get: function () {
        return this[symbols_1.getPropSymbol(this.tagName + '_' + prop)];
      },
      set: function (x) {
        this[symbols_1.getPropSymbol(this.tagName + '_' + prop)] = x;
        return true;
      },
      configurable: true
    });
  };
}
exports.prop = prop;

},

// packages/core/src/logger.ts @27
27: function(__fusereq, exports, module){
exports.__esModule = true;
var symbols_1 = __fusereq(58);
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
    const count = globalThis[symbols_1.getLoggerCountSymbol()] + 1;
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
    const text = name || '??' + '' + (id || '?');
    const x = 25 - Math.floor(text.length);
    const idOnly = '' + (id || '?');
    const y = 6 - Math.floor(idOnly.length);
    console.log(`@SIMPLE-HTML/core | ${name}${Array(x).join(' ')}| id:${id || '?'}${Array(y).join(' ')} | IsConnected:${ctx && ctx.isConnected === true ? 'Y' : 'N'} |  ${tag}`);
  }
}
exports.logger = logger;

},

// packages/core/src/requestRender.ts @32
32: function(__fusereq, exports, module){
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

// packages/core/src/property.ts @28
28: function(__fusereq, exports, module){
exports.__esModule = true;
var requestRender_1 = __fusereq(32);
var symbols_1 = __fusereq(58);
var logger_1 = __fusereq(27);
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

// node_modules/lit-html/lit-html.js @21
21: function(__fusereq, exports, module){
exports.__esModule = true;
var default_template_processor_js_1 = __fusereq(43);
var template_result_js_1 = __fusereq(51);
var default_template_processor_js_2 = __fusereq(43);
exports.DefaultTemplateProcessor = default_template_processor_js_2.DefaultTemplateProcessor;
exports.defaultTemplateProcessor = default_template_processor_js_2.defaultTemplateProcessor;
var directive_js_1 = __fusereq(44);
exports.directive = directive_js_1.directive;
exports.isDirective = directive_js_1.isDirective;
var dom_js_1 = __fusereq(45);
exports.removeNodes = dom_js_1.removeNodes;
exports.reparentNodes = dom_js_1.reparentNodes;
var part_js_1 = __fusereq(46);
exports.noChange = part_js_1.noChange;
exports.nothing = part_js_1.nothing;
var parts_js_1 = __fusereq(47);
exports.AttributeCommitter = parts_js_1.AttributeCommitter;
exports.AttributePart = parts_js_1.AttributePart;
exports.BooleanAttributePart = parts_js_1.BooleanAttributePart;
exports.EventPart = parts_js_1.EventPart;
exports.isIterable = parts_js_1.isIterable;
exports.isPrimitive = parts_js_1.isPrimitive;
exports.NodePart = parts_js_1.NodePart;
exports.PropertyCommitter = parts_js_1.PropertyCommitter;
exports.PropertyPart = parts_js_1.PropertyPart;
var render_js_1 = __fusereq(48);
exports.parts = render_js_1.parts;
exports.render = render_js_1.render;
var template_factory_js_1 = __fusereq(49);
exports.templateCaches = template_factory_js_1.templateCaches;
exports.templateFactory = template_factory_js_1.templateFactory;
var template_instance_js_1 = __fusereq(50);
exports.TemplateInstance = template_instance_js_1.TemplateInstance;
var template_result_js_2 = __fusereq(51);
exports.SVGTemplateResult = template_result_js_2.SVGTemplateResult;
exports.TemplateResult = template_result_js_2.TemplateResult;
var template_js_1 = __fusereq(52);
exports.createMarker = template_js_1.createMarker;
exports.isTemplatePartActive = template_js_1.isTemplatePartActive;
exports.Template = template_js_1.Template;
if (typeof window !== 'undefined') {
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.2.1');
}
exports.html = (strings, ...values) => new template_result_js_1.TemplateResult(strings, values, 'html', default_template_processor_js_1.defaultTemplateProcessor);
exports.svg = (strings, ...values) => new template_result_js_1.SVGTemplateResult(strings, values, 'svg', default_template_processor_js_1.defaultTemplateProcessor);

},

// node_modules/lit-html/lib/default-template-processor.js @43
43: function(__fusereq, exports, module){
exports.__esModule = true;
var parts_js_1 = __fusereq(47);
class DefaultTemplateProcessor {
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];
    if (prefix === '.') {
      const committer = new parts_js_1.PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }
    if (prefix === '@') {
      return [new parts_js_1.EventPart(element, name.slice(1), options.eventContext)];
    }
    if (prefix === '?') {
      return [new parts_js_1.BooleanAttributePart(element, name.slice(1), strings)];
    }
    const committer = new parts_js_1.AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  handleTextExpression(options) {
    return new parts_js_1.NodePart(options);
  }
}
exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
exports.defaultTemplateProcessor = new DefaultTemplateProcessor();

},

// node_modules/lit-html/lib/directive.js @44
44: function(__fusereq, exports, module){
exports.__esModule = true;
const directives = new WeakMap();
exports.directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};
exports.isDirective = o => {
  return typeof o === 'function' && directives.has(o);
};

},

// node_modules/lit-html/lib/dom.js @45
45: function(__fusereq, exports, module){
exports.__esModule = true;
exports.isCEPolyfill = typeof window !== 'undefined' && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== undefined;
exports.reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.insertBefore(start, before);
    start = n;
  }
};
exports.removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};

},

// node_modules/lit-html/lib/part.js @46
46: function(__fusereq, exports, module){
exports.__esModule = true;
exports.noChange = {};
exports.nothing = {};

},

// node_modules/lit-html/lib/parts.js @47
47: function(__fusereq, exports, module){
exports.__esModule = true;
var directive_js_1 = __fusereq(44);
var dom_js_1 = __fusereq(45);
var part_js_1 = __fusereq(46);
var template_instance_js_1 = __fusereq(50);
var template_result_js_1 = __fusereq(51);
var template_js_1 = __fusereq(52);
exports.isPrimitive = value => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};
exports.isIterable = value => {
  return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
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
    let text = '';
    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = this.parts[i];
      if (part !== undefined) {
        const v = part.value;
        if (exports.isPrimitive(v) || !exports.isIterable(v)) {
          text += typeof v === 'string' ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
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
    if (value !== part_js_1.noChange && (!exports.isPrimitive(value) || value !== this.value)) {
      this.value = value;
      if (!directive_js_1.isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (directive_js_1.isDirective(this.value)) {
      const directive = this.value;
      this.value = part_js_1.noChange;
      directive(this);
    }
    if (this.value === part_js_1.noChange) {
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
    this.startNode = container.appendChild(template_js_1.createMarker());
    this.endNode = container.appendChild(template_js_1.createMarker());
  }
  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  appendIntoPart(part) {
    part.__insert(this.startNode = template_js_1.createMarker());
    part.__insert(this.endNode = template_js_1.createMarker());
  }
  insertAfterPart(ref) {
    ref.__insert(this.startNode = template_js_1.createMarker());
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }
    while (directive_js_1.isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = part_js_1.noChange;
      directive(this);
    }
    const value = this.__pendingValue;
    if (value === part_js_1.noChange) {
      return;
    }
    if (exports.isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof template_result_js_1.TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (exports.isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === part_js_1.nothing) {
      this.value = part_js_1.nothing;
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
    value = value == null ? '' : value;
    const valueAsString = typeof value === 'string' ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3) {
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof template_instance_js_1.TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      const instance = new template_instance_js_1.TemplateInstance(template, value.processor, this.options);
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
    dom_js_1.removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
}
exports.NodePart = NodePart;
class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;
    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }
    this.element = element;
    this.name = name;
    this.strings = strings;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (directive_js_1.isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = part_js_1.noChange;
      directive(this);
    }
    if (this.__pendingValue === part_js_1.noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = part_js_1.noChange;
  }
}
exports.BooleanAttributePart = BooleanAttributePart;
class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
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
(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }
    };
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (_e) {}
})();
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
    while (directive_js_1.isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = part_js_1.noChange;
      directive(this);
    }
    if (this.__pendingValue === part_js_1.noChange) {
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
    this.__pendingValue = part_js_1.noChange;
  }
  handleEvent(event) {
    if (typeof this.value === 'function') {
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

},

// node_modules/lit-html/lib/render.js @48
48: function(__fusereq, exports, module){
exports.__esModule = true;
var dom_js_1 = __fusereq(45);
var parts_js_1 = __fusereq(47);
var template_factory_js_1 = __fusereq(49);
exports.parts = new WeakMap();
exports.render = (result, container, options) => {
  let part = exports.parts.get(container);
  if (part === undefined) {
    dom_js_1.removeNodes(container, container.firstChild);
    exports.parts.set(container, part = new parts_js_1.NodePart(Object.assign({
      templateFactory: template_factory_js_1.templateFactory
    }, options)));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
};

},

// node_modules/lit-html/lib/template-factory.js @49
49: function(__fusereq, exports, module){
exports.__esModule = true;
var template_js_1 = __fusereq(52);
function templateFactory(result) {
  let templateCache = exports.templateCaches.get(result.type);
  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    exports.templateCaches.set(result.type, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== undefined) {
    return template;
  }
  const key = result.strings.join(template_js_1.marker);
  template = templateCache.keyString.get(key);
  if (template === undefined) {
    template = new template_js_1.Template(result, result.getTemplateElement());
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
}
exports.templateFactory = templateFactory;
exports.templateCaches = new Map();

},

// node_modules/lit-html/lib/template-instance.js @50
50: function(__fusereq, exports, module){
exports.__esModule = true;
var dom_js_1 = __fusereq(45);
var template_js_1 = __fusereq(52);
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
    const fragment = dom_js_1.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts;
    const walker = document.createTreeWalker(fragment, 133, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    while (partIndex < parts.length) {
      part = parts[partIndex];
      if (!template_js_1.isTemplatePartActive(part)) {
        this.__parts.push(undefined);
        partIndex++;
        continue;
      }
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      if (part.type === 'node') {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);
        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (dom_js_1.isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
}
exports.TemplateInstance = TemplateInstance;

},

// node_modules/lit-html/lib/template-result.js @51
51: function(__fusereq, exports, module){
exports.__esModule = true;
var dom_js_1 = __fusereq(45);
var template_js_1 = __fusereq(52);
const commentMarker = ` ${template_js_1.marker} `;
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  getHTML() {
    const l = this.strings.length - 1;
    let html = '';
    let isCommentBinding = false;
    for (let i = 0; i < l; i++) {
      const s = this.strings[i];
      const commentOpen = s.lastIndexOf('<!--');
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1;
      const attributeMatch = template_js_1.lastAttributeNameRegex.exec(s);
      if (attributeMatch === null) {
        html += s + (isCommentBinding ? commentMarker : template_js_1.nodeMarker);
      } else {
        html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + template_js_1.boundAttributeSuffix + attributeMatch[3] + template_js_1.marker;
      }
    }
    html += this.strings[l];
    return html;
  }
  getTemplateElement() {
    const template = document.createElement('template');
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
    dom_js_1.reparentNodes(content, svgElement.firstChild);
    return template;
  }
}
exports.SVGTemplateResult = SVGTemplateResult;

},

// node_modules/lit-html/lib/template.js @52
52: function(__fusereq, exports, module){
exports.__esModule = true;
exports.marker = `{{lit-${String(Math.random()).slice(2)}}}`;
exports.nodeMarker = `<!--${exports.marker}-->`;
exports.markerRegex = new RegExp(`${exports.marker}|${exports.nodeMarker}`);
exports.boundAttributeSuffix = '$lit$';
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
            if (endsWith(attributes[i].name, exports.boundAttributeSuffix)) {
              count++;
            }
          }
          while (count-- > 0) {
            const stringForPart = strings[partIndex];
            const name = exports.lastAttributeNameRegex.exec(stringForPart)[2];
            const attributeLookupName = name.toLowerCase() + exports.boundAttributeSuffix;
            const attributeValue = node.getAttribute(attributeLookupName);
            node.removeAttribute(attributeLookupName);
            const statics = attributeValue.split(exports.markerRegex);
            this.parts.push({
              type: 'attribute',
              index,
              name,
              strings: statics
            });
            partIndex += statics.length - 1;
          }
        }
        if (node.tagName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }
      } else if (node.nodeType === 3) {
        const data = node.data;
        if (data.indexOf(exports.marker) >= 0) {
          const parent = node.parentNode;
          const strings = data.split(exports.markerRegex);
          const lastIndex = strings.length - 1;
          for (let i = 0; i < lastIndex; i++) {
            let insert;
            let s = strings[i];
            if (s === '') {
              insert = exports.createMarker();
            } else {
              const match = exports.lastAttributeNameRegex.exec(s);
              if (match !== null && endsWith(match[2], exports.boundAttributeSuffix)) {
                s = s.slice(0, match.index) + match[1] + match[2].slice(0, -exports.boundAttributeSuffix.length) + match[3];
              }
              insert = document.createTextNode(s);
            }
            parent.insertBefore(insert, node);
            this.parts.push({
              type: 'node',
              index: ++index
            });
          }
          if (strings[lastIndex] === '') {
            parent.insertBefore(exports.createMarker(), node);
            nodesToRemove.push(node);
          } else {
            node.data = strings[lastIndex];
          }
          partIndex += lastIndex;
        }
      } else if (node.nodeType === 8) {
        if (node.data === exports.marker) {
          const parent = node.parentNode;
          if (node.previousSibling === null || index === lastPartIndex) {
            index++;
            parent.insertBefore(exports.createMarker(), node);
          }
          lastPartIndex = index;
          this.parts.push({
            type: 'node',
            index
          });
          if (node.nextSibling === null) {
            node.data = '';
          } else {
            nodesToRemove.push(node);
            index--;
          }
          partIndex++;
        } else {
          let i = -1;
          while ((i = node.data.indexOf(exports.marker, i + 1)) !== -1) {
            this.parts.push({
              type: 'node',
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
exports.isTemplatePartActive = part => part.index !== -1;
exports.createMarker = () => document.createComment('');
exports.lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

},

// packages/core/src/customElement.ts @29
29: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
var symbols_1 = __fusereq(58);
var logger_1 = __fusereq(27);
function customElement(elementName, extended) {
  return function reg(elementClass) {
    const observedAttributes = elementClass.observedAttributes;
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
    if (Array.isArray(observedAttributes) && !Array.isArray(elementClass.observedAttributes)) {
      elementClass.observedAttributes = observedAttributes;
    }
    const Base = class extends elementClass {
      constructor() {
        super();
        logger_1.logger('constructor', this, super.tagName);
      }
      renderCalled() {
        if (super.renderCalled) {
          super.renderCalled.call(this);
        }
      }
      render(...result) {
        if (super.render) {
          logger_1.logger('render', this, super.tagName);
          const template = super.render.call(this, ...result);
          Promise.resolve(template).then(templates => {
            lit_html_1.render(templates, this, {
              eventContext: this
            });
            if (super.updated) {
              requestAnimationFrame(() => {
                super.updated();
              });
            }
          });
        }
        this.renderCalled();
      }
      connectedCallback() {
        logger_1.logger('connectedCallback', this, super.tagName);
        if (super.connectedCallback) {
          super.connectedCallback.call(this);
        }
        this.render(this);
      }
      register(call) {
        if (this.callers) {
          this.callers.push(call);
        } else {
          this.callers = [];
          this.callers.push(call);
        }
      }
      disconnectedCallback() {
        logger_1.logger('disconnectedCallback', this, super.tagName);
        if (this.callers) {
          this.callers.forEach(call => call());
        }
        this.callers = [];
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
        if (super.valuesChanged) {
          super.valuesChanged('attribute', name, oldValue, newValue);
        }
      }
    };
    if (!customElements.get(elementName)) {
      if (extended) {
        customElements.define(elementName, Base, extended);
      } else {
        customElements.define(elementName, Base);
      }
    } else {
      if (globalThis.hmrCache) {
        if (extended) {
          customElements.define(elementName, Base, extended);
        } else {
          customElements.define(elementName, Base);
        }
      }
    }
  };
}
exports.customElement = customElement;

},

// packages/core/src/transmitter.ts @30
30: function(__fusereq, exports, module){
exports.__esModule = true;
var symbols_1 = __fusereq(58);
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
    const events = transmitter()[channel].filter(event => {
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

// packages/core/src/state.ts @31
31: function(__fusereq, exports, module){
exports.__esModule = true;
var a__1 = __fusereq(7);
let state = window.state || ({});
const keys = new Set();
if (!window.state) {
  window.addEventListener('HMR-FUSEBOX', () => {
    window.state = state;
    console.log('HMR-FUSEBOX', window.state);
  });
}
function getState() {
  state;
}
exports.getState = getState;
function setState(newState) {
  state = newState;
}
exports.setState = setState;
function assignState(obj, part) {
  return Object.assign(obj, part);
}
exports.assignState = assignState;
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

// packages/core/src/disconnectedCallback.ts @33
33: function(__fusereq, exports, module){
function disconnectedCallback(ctx, call) {
  ctx.register(call);
}
exports.disconnectedCallback = disconnectedCallback;

},

// node_modules/tslib/tslib.es6.js @34
34: function(__fusereq, exports, module){
exports.__esModule = true;
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
exports.__assign = function () {
  exports.__assign = Object.assign || (function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  });
  return exports.__assign.apply(this, arguments);
};
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
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
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
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
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
exports.__createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};
function __exportStar(m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports.__createBinding(exports, m, p);
}
exports.__exportStar = __exportStar;
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) exports.__createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}
exports.__importStar = __importStar;
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
exports.__importDefault = __importDefault;
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
exports.__classPrivateFieldGet = __classPrivateFieldGet;
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
exports.__classPrivateFieldSet = __classPrivateFieldSet;

},

// packages/core/src/attribute.ts @25
25: function(__fusereq, exports, module){
exports.__esModule = true;
var requestRender_1 = __fusereq(32);
var symbols_1 = __fusereq(58);
var logger_1 = __fusereq(27);
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

// packages/core/src/index.ts @7
7: function(__fusereq, exports, module){
exports.__esModule = true;
__fusereq(34);
var attribute_1 = __fusereq(25);
exports.attribute = attribute_1.attribute;
var prop_1 = __fusereq(26);
exports.prop = prop_1.prop;
var logger_1 = __fusereq(27);
exports.enableInternalLogger = logger_1.enableInternalLogger;
exports.disableInternalLogger = logger_1.disableInternalLogger;
var property_1 = __fusereq(28);
exports.property = property_1.property;
var customElement_1 = __fusereq(29);
exports.customElement = customElement_1.customElement;
var transmitter_1 = __fusereq(30);
exports.publish = transmitter_1.publish;
exports.subscribe = transmitter_1.subscribe;
exports.unSubscribe = transmitter_1.unSubscribe;
exports.publishNext = transmitter_1.publishNext;
exports.publishSync = transmitter_1.publishSync;
var state_1 = __fusereq(31);
exports.validateKey = state_1.validateKey;
exports.stateContainer = state_1.stateContainer;
exports.stateResult = state_1.stateResult;
var requestRender_1 = __fusereq(32);
exports.requestRender = requestRender_1.requestRender;
var disconnectedCallback_1 = __fusereq(33);
exports.disconnectedCallback = disconnectedCallback_1.disconnectedCallback;

},

// packages/datasource/src/entity.ts @60
60: function(__fusereq, exports, module){
class EntityHandler {
  constructor(keyString) {
    this.__editedProps = {};
    this.__originalValues = {};
    this.__currentValues = {};
    this.__newprops = {};
    this.__edited = false;
    this.__KEYSTRING = keyString;
  }
  get(target, prop) {
    if (prop === '__controller') {
      return this;
    }
    if (['__KEY', '__group', '__groupID', '__groupName', '__groupLvl', '__groupTotal', '__groupChildren', '__groupExpanded'].indexOf(prop) > -1) {
      if (prop === '__KEY') {
        if (this.__KEYSTRING) {
          return target[this.__KEYSTRING];
        }
      }
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

// packages/datasource/src/types.ts @59
59: function(__fusereq, exports, module){
exports.__esModule = true;
exports.OPERATORS = {
  EQUAL: 'equal to',
  LESS_THAN_OR_EQUAL_TO: 'less or equal',
  GREATER_THAN_OR_EQUAL_TO: 'greater than or equal',
  LESS_THAN: 'less than',
  GREATER_THAN: 'greater than',
  CONTAINS: 'contains',
  NOT_EQUAL_TO: 'not equal to',
  DOES_NOT_CONTAIN: 'does not contain',
  BEGIN_WITH: 'start with',
  END_WITH: 'end with',
  IN: 'IN'
};

},

// packages/datasource/src/dataContainer.ts @62
62: function(__fusereq, exports, module){
exports.__esModule = true;
var entity_1 = __fusereq(60);
let globalKeyCount = 0;
exports.getNextKey = function () {
  globalKeyCount++;
  return globalKeyCount;
};
class DataContainer {
  constructor(UniqueKeyAttribute) {
    this.__collection = [];
    this.__keyAttribute = '';
    this.EntityHandler = entity_1.EntityHandler;
    this.__keyAttribute = UniqueKeyAttribute;
  }
  overrideEntityHandler(entityHandler) {
    this.EntityHandler = entityHandler;
  }
  get type() {
    return 'DataContainer';
  }
  getKey() {
    return exports.getNextKey();
  }
  getDataSet() {
    return this.__collection.slice();
  }
  lenght() {
    return this.__collection;
  }
  removeData(data, all = false) {
    if (all) {
      const removed = this.__collection.slice();
      this.__collection = [];
      return removed;
    }
    if (data) {
      if (Array.isArray(data)) {
        const removed = [];
        data.forEach(d => {
          const i = this.__collection.indexOf(d);
          if (i !== -1) {
            removed.push(this.__collection.splice(i, 1)[0]);
          }
        });
        return removed;
      } else {
        const i = this.__collection.indexOf(data);
        if (i !== -1) {
          return this.__collection.splice(i, 1);
        }
      }
    }
    return [];
  }
  setData(data, add = false) {
    if (add) {
      const x = Array.from(data, o => {
        if (o && o.__controller) {
          return o;
        } else {
          return new Proxy(o, new this.EntityHandler(this.__keyAttribute));
        }
      });
      this.__collection.push(...x);
      this.__collection.forEach((entity, i) => {
        if (entity && !entity.__KEY) {
          entity.__KEY = this.getKey();
        } else {
          if (!this.__collection[i]) {
            this.__collection[i] = {
              __KEY: this.getKey()
            };
          }
        }
      });
      return x;
    } else {
      this.__collection = Array.from(data, o => {
        if (o && o.__controller) {
          return o;
        } else {
          return new Proxy(o, new this.EntityHandler(this.__keyAttribute));
        }
      });
      this.__collection.forEach((entity, i) => {
        if (entity && !entity.__KEY) {
          entity.__KEY = this.getKey();
        } else {
          if (!this.__collection[i]) {
            this.__collection[i] = {
              __KEY: this.getKey()
            };
          }
        }
      });
    }
  }
}
exports.DataContainer = DataContainer;

},

// packages/datasource/src/dataSource.ts @61
61: function(__fusereq, exports, module){
var _1_;
var _2_, _3_;
var _4_;
var _5_;
var _6_, _7_;
exports.__esModule = true;
var filter_1 = __fusereq(73);
var sort_1 = __fusereq(74);
var grouping_1 = __fusereq(75);
var selection_1 = __fusereq(76);
var types_1 = __fusereq(59);
var dataContainer_1 = __fusereq(62);
class Datasource {
  constructor(dataContainer, options) {
    this.__collectionFiltered = [];
    this.__collectionDisplayed = [];
    this.__selectionMode = 'multiple';
    this.__listeners = new Set();
    this.currentEntity = null;
    this.__dataContainer = dataContainer || new dataContainer_1.DataContainer();
    this.__selectionMode = ((_1_ = options) === null || _1_ === void 0 ? void 0 : _1_.selectionMode) || 'multiple';
    this.__selection = new selection_1.Selection(this);
    this.__filter = new filter_1.Filter();
    this.__sorting = new sort_1.Sort();
    this.__grouping = new grouping_1.Grouping();
  }
  get type() {
    return 'Datasource';
  }
  getAllData() {
    return this.__dataContainer.getDataSet();
  }
  __select(row) {
    this.currentEntity = this.__collectionDisplayed[row];
    this.__callSubscribers('currentEntity');
  }
  setData(data, add = false, reRunFilter = false) {
    if (add) {
      const x = this.__dataContainer.setData(data, add);
      if (x) {
        this.__collectionFiltered.push(...x);
      }
    } else {
      this.__dataContainer.setData(data, add);
      this.__collectionFiltered = this.getAllData().slice();
    }
    this.__internalUpdate(reRunFilter);
    this.__callSubscribers('collection-changed', {
      added: !!add
    });
  }
  __internalUpdate(reRunFilter) {
    if (reRunFilter) {
      if (this.__filter.getFilter()) {
        this.__collectionFiltered = this.__filter.filter(this.getAllData(), this.__filter.getFilter());
      } else {
        this.__collectionFiltered = this.__dataContainer.getDataSet();
      }
    }
    const lastSort = this.__sorting.getLastSort();
    if (lastSort.length) {
      this.__sorting.runOrderBy(this.__collectionFiltered);
    }
    if (this.__grouping.getGrouping().length) {
      this.__collectionDisplayed = this.__grouping.group(this.__collectionFiltered, this.__grouping.getGrouping(), true);
    } else {
      this.__collectionDisplayed = this.__collectionFiltered.slice();
    }
  }
  sort(args, add) {
    if (!this.__grouping.getGrouping().length) {
      if (args) {
        this.__sorting.setOrderBy(args, add);
        this.__sorting.runOrderBy(this.__collectionFiltered);
      } else {
        const lastSort = this.__sorting.getLastSort();
        if (lastSort.length) {
          this.__sorting.runOrderBy(this.__collectionFiltered);
        }
      }
    }
    if (this.__grouping.getGrouping().length) {
      if (args) {
        this.__sorting.setOrderBy(args, add);
      }
      const sortingAttributes = this.__sorting.getOrderBy().map(col => col.attribute);
      const sortingAttributesOrder = this.__sorting.getOrderBy().map(col => col.ascending);
      this.__sorting.reset();
      this.__grouping.getGrouping().forEach(group => {
        const sortIndex = sortingAttributes.indexOf(group.attribute);
        if (sortingAttributes.indexOf(group.attribute) === -1) {
          this.__sorting.setOrderBy({
            attribute: group.attribute,
            ascending: true
          }, true);
        } else {
          this.__sorting.setOrderBy({
            attribute: group.attribute,
            ascending: sortingAttributesOrder[sortIndex]
          }, true);
        }
      });
      const groupings = this.__grouping.getGrouping().map(col => col.attribute);
      sortingAttributes.forEach((attribute, i) => {
        if (groupings.indexOf(attribute) === -1) {
          this.__sorting.setOrderBy({
            attribute: sortingAttributes[i],
            ascending: sortingAttributesOrder[i]
          }, true);
        }
      });
      this.__sorting.runOrderBy(this.__collectionFiltered);
      this.__collectionDisplayed = this.__grouping.group(this.__collectionFiltered, this.__grouping.getGrouping(), true);
    } else {
      this.__collectionDisplayed = this.__collectionFiltered.slice();
    }
    this.__callSubscribers('collection-sorted');
  }
  filter(ObjFilter) {
    if (ObjFilter) {
      if (Array.isArray(ObjFilter)) {
        this.__filter.setFilter({
          type: 'GROUP',
          logicalOperator: 'AND',
          filterArguments: ObjFilter
        });
      } else {
        if (!ObjFilter.filterArguments || ((_3_ = (_2_ = ObjFilter) === null || _2_ === void 0 ? void 0 : _2_.filterArguments) === null || _3_ === void 0 ? void 0 : _3_.length) === 0) {
          this.__filter.setFilter({
            type: 'GROUP',
            logicalOperator: 'AND',
            filterArguments: [ObjFilter]
          });
        } else {
          this.__filter.setFilter(ObjFilter);
        }
      }
    }
    this.__internalUpdate(true);
    this.__callSubscribers('collection-filtered');
  }
  group(group, add) {
    let groupings;
    if (add) {
      groupings = this.__grouping.getGrouping();
      groupings = groupings.concat(group);
    } else {
      groupings = group;
    }
    this.__sorting.reset();
    groupings.forEach(group => {
      this.__sorting.setOrderBy({
        attribute: group.attribute,
        ascending: true
      }, true);
    });
    this.__sorting.runOrderBy(this.__collectionFiltered);
    if (groupings.length) {
      const result = this.__grouping.group(this.__collectionFiltered, groupings, true);
      this.__collectionDisplayed = result;
    } else {
      this.__collectionDisplayed = this.__collectionFiltered;
    }
    this.__callSubscribers('collection-grouped');
  }
  removeGroup(group) {
    if (group) {
      const groupings = this.__grouping.getGrouping();
      const oldGroupIndex = groupings.indexOf(group);
      if (oldGroupIndex !== -1) {
        groupings.splice(oldGroupIndex, 1);
      }
      this.group(groupings);
    } else {
      this.group([]);
    }
    this.__callSubscribers('collection-grouped');
  }
  expandGroup(id) {
    this.__collectionDisplayed = this.__grouping.expandOneOrAll(id);
    this.__callSubscribers('collection-expand');
  }
  collapseGroup(id) {
    this.__collectionDisplayed = this.__grouping.collapseOneOrAll(id);
    this.__callSubscribers('collection-collapse');
  }
  __callSubscribers(event, data = {}) {
    const keeping = [];
    this.__listeners.forEach(callable => {
      let keep;
      if (typeof callable === 'function') {
        keep = callable({
          type: event,
          data: data
        });
      } else {
        if (typeof ((_4_ = callable) === null || _4_ === void 0 ? void 0 : _4_.handleEvent) === 'function') {
          keep = callable.handleEvent({
            type: event,
            data: data
          });
        }
      }
      if (keep) {
        keeping.push(callable);
      }
    });
    this.__listeners = new Set(keeping);
  }
  addEventListner(callable) {
    if (typeof callable !== 'function' && typeof ((_5_ = callable) === null || _5_ === void 0 ? void 0 : _5_.handleEvent) !== 'function') {
      throw new Error('callable sent to datasource event listner is wrong type');
    }
    if (!this.__listeners.has(callable)) {
      this.__listeners.add(callable);
    }
  }
  removeEventListner(callable) {
    if (this.__listeners.has(callable)) {
      this.__listeners.delete(callable);
    }
  }
  length(onlyDataRows) {
    if (onlyDataRows) {
      return this.__collectionFiltered.length;
    } else {
      return this.__collectionDisplayed.length;
    }
  }
  getSelectionMode() {
    return this.__selectionMode;
  }
  setSelectionMode(mode) {
    this.__selectionMode = mode || 'none';
  }
  getRow(rowNo) {
    return this.__collectionDisplayed[rowNo];
  }
  getRows(onlyDataRows) {
    if (onlyDataRows) {
      return this.__collectionFiltered;
    } else {
      return this.__collectionDisplayed;
    }
  }
  select(row) {
    this.__selection.highlightRow({}, row ? row - 1 : 0);
  }
  selectFirst() {
    this.__selection.highlightRow({}, 0);
  }
  selectPrev() {
    let row = this.__collectionDisplayed.indexOf(this.currentEntity) - 1;
    if (row < 0) {
      row = this.__collectionDisplayed.length - 1;
      this.__selection.highlightRow({}, row);
    }
    this.__selection.highlightRow({}, row);
  }
  selectNext() {
    let row = this.__collectionDisplayed.indexOf(this.currentEntity) + 1;
    if (this.__collectionDisplayed.length - 1 < row) {
      row = 0;
    }
    this.__selection.highlightRow({}, row);
  }
  selectLast() {
    this.__selection.highlightRow({}, this.__collectionDisplayed.length - 1);
  }
  setLocalCompare(code, options) {
    this.__sorting.setLocaleCompare(code, options);
  }
  resetSort(defaultSortAttribute) {
    this.__sorting.reset(defaultSortAttribute);
  }
  setOrderBy(param, add) {
    this.__sorting.setOrderBy(param, add);
  }
  getOrderBy() {
    return this.__sorting.getOrderBy();
  }
  getGrouping() {
    return this.__grouping.getGrouping();
  }
  setGrouping(group) {
    this.__grouping.setGrouping(group);
  }
  setExpanded(x) {
    this.__grouping.setExpanded(x);
  }
  getExpanded() {
    return this.__grouping.getExpanded();
  }
  getFilter() {
    return this.__filter.getFilter();
  }
  getSelection() {
    return this.__selection;
  }
  sortReset() {
    return this.__sorting.reset();
  }
  getFilterFromType(type) {
    return this.__filter.getFilterFromType(type);
  }
  setFilter(filter) {
    return this.__filter.setFilter(filter);
  }
  reloadDatasource() {
    this.__collectionFiltered = this.getAllData();
    this.__internalUpdate(true);
  }
  getFilterString() {
    const filter = this.__filter.getFilter();
    if (!((_7_ = (_6_ = filter) === null || _6_ === void 0 ? void 0 : _6_.filterArguments) === null || _7_ === void 0 ? void 0 : _7_.length)) {
      return '';
    }
    const parser = function (obj, queryString = '') {
      if (obj) {
        if (!obj.filterArguments || obj.filterArguments && obj.filterArguments.length === 0) {
          if (obj.operator !== 'IN') {
            queryString = queryString + `${obj.attribute} ${types_1.OPERATORS[obj.operator]} ${obj.valueType === 'ATTRIBUTE' ? obj.value : "'" + obj.value + "'"}`;
          } else {
            if (Array.isArray(obj.value)) {
              queryString = queryString + `${obj.attribute} ${types_1.OPERATORS[obj.operator]} [${obj.value.map(val => {
                return `'${val}'`;
              })}]`;
            } else {
              queryString = queryString + `${obj.attribute} ${types_1.OPERATORS[obj.operator]} [${obj.value.split('\n').map(val => {
                return `'${val}'`;
              })}]`;
            }
          }
        } else {
          obj.filterArguments.forEach((y, i) => {
            if (i > 0) {
              queryString = queryString + ` ${obj.logicalOperator} `;
            } else {
              queryString = queryString + `(`;
            }
            queryString = parser(y, queryString);
            if (obj.filterArguments.length - 1 === i) {
              queryString = queryString + `)`;
            }
          });
        }
      }
      return queryString;
    };
    return parser(this.__filter.getFilter());
  }
}
exports.Datasource = Datasource;

},

// packages/datasource/src/index.ts @37
37: function(__fusereq, exports, module){
exports.__esModule = true;
Object.assign(exports, __fusereq(59));
var entity_1 = __fusereq(60);
exports.EntityHandler = entity_1.EntityHandler;
var dataSource_1 = __fusereq(61);
exports.Datasource = dataSource_1.Datasource;
var dataContainer_1 = __fusereq(62);
exports.DataContainer = dataContainer_1.DataContainer;

},

// packages/grid/src/types.ts @35
35: function(__fusereq, exports, module){
exports.__esModule = true;
var datasource_1 = __fusereq(37);
exports.Entity = datasource_1.Entity;
var datasource_3 = __fusereq(37);
exports.FilterComparisonOperator = datasource_3.FilterComparisonOperator;
exports.FilterAttributeSimple = datasource_3.FilterAttributeSimple;
exports.SortArgument = datasource_3.SortArgument;
exports.GroupArgument = datasource_3.GroupArgument;
exports.FilterLogicalOperator = datasource_3.FilterLogicalOperator;
exports.FilterExpressionType = datasource_3.FilterExpressionType;
exports.FilterValueType = datasource_3.FilterValueType;
exports.FilterArgument = datasource_3.FilterArgument;
exports.SelectionMode = datasource_3.SelectionMode;
exports.DataTypes = datasource_3.DataTypes;

},

// packages/grid/src/gridInterface.ts @36
36: function(__fusereq, exports, module){
var _1_;
exports.__esModule = true;
var datasource_1 = __fusereq(37);
class GridInterface {
  constructor(config, datasource) {
    this.__subscribers = [];
    this.__handleEvent = null;
    if (!datasource) {
      this.__ds = new datasource_1.Datasource();
    } else {
      if (datasource.type === 'Datasource') {
        this.__ds = datasource;
      }
      if (datasource.type === 'DataContainer') {
        this.__ds = new datasource_1.Datasource(datasource);
      }
    }
    this.__CONFIG = config;
    this.parseConfig();
  }
  get completeDataset() {
    return this.__ds.getAllData();
  }
  get filteredDataset() {
    return this.__ds.getRows(true);
  }
  get displayedDataset() {
    return this.__ds.getRows();
  }
  getDatasource() {
    return this.__ds;
  }
  handleEvent(_event) {
    if (_event.type === 'currentEntity') {
      return true;
    }
    if (_event.type === 'selectionChange') {
      this.__SimpleHtmlGrid.triggerEvent('selection');
      return true;
    }
    this.config.groupingSet = this.__ds.getGrouping();
    this.config.groupingExpanded = this.__ds.getExpanded();
    this.config.sortingSet = this.__ds.getOrderBy();
    if (this.__handleEvent === null) {
      this.__SimpleHtmlGrid && this.__SimpleHtmlGrid.resetRowCache();
      this.__handleEvent = 1;
      Promise.resolve().then(() => {
        this.dataSourceUpdated();
        this.__SimpleHtmlGrid && this.reRender();
        this.__handleEvent = null;
      });
    }
    return true;
  }
  parseConfig() {
    let cellheight = 1;
    this.__CONFIG.groups.forEach(group => {
      if (group.rows) {
        group.rows.forEach((_c, i) => {
          if (cellheight < i + 1) {
            cellheight = i + 1;
          }
        });
      }
    });
    this.__CONFIG.__cellRows = cellheight;
    this.__CONFIG.__rowHeight = this.__CONFIG.cellHeight * cellheight;
    let totalWidth = 0;
    this.config.groups.reduce((agg, element) => {
      element.__left = agg;
      totalWidth = totalWidth + element.width;
      return element.__left + element.width;
    }, 0);
    this.__CONFIG.__rowWidth = totalWidth;
    if (this.__CONFIG) {
      if (this.__CONFIG.sortingSet) {
        this.__ds.setOrderBy(this.__CONFIG.sortingSet);
      }
      if (this.__CONFIG.groupingSet) {
        this.__ds.setGrouping(this.__CONFIG.groupingSet);
      }
      if (this.__CONFIG.groupingExpanded) {
        this.__ds.setExpanded(this.__CONFIG.groupingExpanded);
      }
    }
  }
  manualConfigChange(config) {
    if (config) {
      this.__CONFIG = config;
    }
    this.parseConfig();
    this.__updateSortConfig();
    this.__ds.reloadDatasource();
    this.dataSourceUpdated();
    this.__SimpleHtmlGrid && this.__SimpleHtmlGrid.manualConfigChange();
    this.__handleEvent = null;
  }
  setData(data, add = false, reRunFilter = false) {
    this.__ds.setData(data, add, reRunFilter);
    this.dataSourceUpdated();
  }
  reloadDatasource() {
    this.__ds.reloadDatasource();
    this.dataSourceUpdated();
  }
  dataSourceUpdated() {
    this.__SCROLL_TOPS = [];
    this.__SCROLL_HEIGHTS = [];
    this.__SCROLL_HEIGHT = 0;
    const cell = this.config.cellHeight;
    const row = this.config.__rowHeight;
    let count = 0;
    this.displayedDataset.forEach(ent => {
      const height = ent.__group ? cell : row;
      this.__SCROLL_TOPS.push(count);
      this.__SCROLL_HEIGHTS.push(height);
      count = count + height;
    });
    this.__SCROLL_HEIGHT = count;
  }
  get config() {
    return this.__CONFIG;
  }
  set config(config) {
    this.__CONFIG = config;
  }
  get getScrollVars() {
    return {
      __SCROLL_HEIGHT: this.__SCROLL_HEIGHT,
      __SCROLL_HEIGHTS: this.__SCROLL_HEIGHTS,
      __SCROLL_TOPS: this.__SCROLL_TOPS
    };
  }
  select(row) {
    this.__ds.select(row);
  }
  edited() {
    return this.__ds.getAllData().filter(entity => {
      if (entity.__controller.__edited) {
        return true;
      } else {
        return false;
      }
    });
  }
  publishEvent(event) {
    const keep = this.__subscribers.filter(element => {
      return element(event);
    });
    this.__subscribers = keep;
  }
  addEventListener(callable) {
    this.__subscribers.push(callable);
  }
  reRender() {
    if (this.__SimpleHtmlGrid) this.__SimpleHtmlGrid.reRender();
  }
  render() {
    if (this.__SimpleHtmlGrid) this.__SimpleHtmlGrid.render();
  }
  groupingCallback(_event, col) {
    let newGrouping = col ? true : false;
    const groupings = this.__ds.getGrouping();
    col && groupings.forEach(g => {
      if (g.attribute === col.attribute) {
        newGrouping = false;
      }
    });
    if (newGrouping) {
      groupings.push({
        title: col.header,
        attribute: col.attribute
      });
    }
    this.clearConfigSort(this.config.groups.flatMap(x => x.rows));
    this.__ds.sortReset();
    groupings.forEach(group => {
      this.__ds.setOrderBy({
        attribute: group.attribute,
        ascending: true
      }, true);
    });
    this.__updateSortConfig();
    this.__ds.group(groupings);
  }
  filterCallback(event, col) {
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
    const filter = {
      type: 'GROUP',
      logicalOperator: 'AND',
      filterArguments: []
    };
    const columns = this.config.groups.flatMap(x => x.rows);
    columns.forEach(col => {
      const f = col.filterable;
      if (f && f.currentValue !== null && f.currentValue !== undefined) {
        filter.filterArguments.push({
          type: 'CONDITION',
          logicalOperator: 'NONE',
          valueType: 'VALUE',
          attribute: col.attribute,
          attributeType: col.type || 'text',
          operator: f.operator || this.__ds.getFilterFromType(col.type),
          value: f.currentValue
        });
      }
    });
    this.__ds.filter(filter);
  }
  clearConfigSort(configColumns) {
    configColumns.forEach(col => {
      if (col.sortable) {
        col.sortable.sortAscending = null;
        col.sortable.sortNo = null;
      }
    });
  }
  __updateSortConfig() {
    const columns = this.config.groups.flatMap(x => x.rows);
    const attributes = this.__ds.getOrderBy().flatMap(x => x.attribute);
    const sorting = this.__ds.getOrderBy();
    columns.forEach(col => {
      const index = attributes.indexOf(col.attribute);
      if (index !== -1) {
        if (!col.sortable) {
          col.sortable = {};
        }
        col.sortable.sortAscending = sorting[index].ascending;
        col.sortable.sortNo = index + 1;
      } else {
        if (col.sortable) {
          col.sortable.sortAscending;
          col.sortable.sortNo = null;
        }
      }
    });
  }
  sortCallback(event, col) {
    let sorting = this.__ds.getOrderBy();
    const attribute = col.attribute;
    const ascending = (_1_ = col.sortable) === null || _1_ === void 0 ? void 0 : _1_.sortAscending;
    const add = event.shiftKey;
    this.clearConfigSort(this.config.groups.flatMap(x => x.rows));
    if (add) {
      let exist = false;
      sorting.forEach(el => {
        if (el.attribute === attribute) {
          exist = true;
          el.ascending = el.ascending ? false : true;
        }
      });
      if (!exist) {
        sorting.push({
          attribute,
          ascending: true
        });
      } else {
        col.sortable.sortAscending = true;
        col.sortable.sortNo = sorting.length;
      }
    } else {
      sorting = [{
        attribute: attribute,
        ascending: ascending ? false : true
      }];
    }
    this.__ds.setOrderBy(sorting);
    this.__ds.sort();
    this.__updateSortConfig();
  }
  removeGroup(group) {
    this.__ds.removeGroup(group);
  }
  groupExpand(id) {
    this.__ds.expandGroup(id);
  }
  groupCollapse(id) {
    this.__ds.collapseGroup(id);
  }
  connectGrid(SimpleHtmlGrid) {
    this.__SimpleHtmlGrid = SimpleHtmlGrid;
    this.__ds.addEventListner(this);
    this.dataSourceUpdated();
  }
  disconnectGrid() {
    this.__SimpleHtmlGrid = null;
    this.__ds.removeEventListner(this);
  }
  getCurrentFilter() {
    return this.__ds.getFilter();
  }
  setCurrentFilter(filter) {
    this.__ds.setFilter(filter);
  }
  reRunFilter() {
    this.__ds.filter();
  }
  isSelected(row) {
    return this.__ds.getSelection().isSelected(row);
  }
  highlightRow(e, currentRow) {
    this.__ds.getSelection().highlightRow(e, currentRow);
  }
  getSelectedRows() {
    return this.__ds.getSelection().getSelectedRows();
  }
  setReadOnlyState(newValue = true) {
    return this.__CONFIG.readonly = newValue;
  }
  setScroll(value = 0) {
    if (this.__SimpleHtmlGrid) {
      const node = this.__SimpleHtmlGrid.getElementsByTagName('simple-html-grid-body')[0];
      if (node) {
        node.scrollTop = value;
      }
    }
  }
  getFilterString() {
    return this.getDatasource().getFilterString();
  }
}
exports.GridInterface = GridInterface;

},

// packages/grid/src/elements/updateRowCache.ts @64
64: function(__fusereq, exports, module){
function updateRowCache(connector, rowPositionCache, ref, scrollTop) {
  let newTopPosition = scrollTop;
  if (connector.displayedDataset.length <= rowPositionCache.length) {
    newTopPosition = 0;
  }
  const rowTopState = connector.getScrollVars.__SCROLL_TOPS;
  let currentRow = 0;
  let i = 0;
  if (newTopPosition !== 0) {
    while (i < rowTopState.length) {
      const checkValue = Math.floor(newTopPosition - rowTopState[i]);
      if (checkValue < 0) {
        currentRow = i - 1;
        break;
      }
      i++;
    }
  }
  let rowFound = currentRow;
  const update = [];
  for (let i = 0; i < rowPositionCache.length; i++) {
    const newRow = currentRow + i;
    if (newRow > connector.displayedDataset.length - 1) {
      rowFound--;
      update.push(rowFound);
    } else {
      update.push(newRow);
    }
    rowPositionCache[i].update = true;
  }
  for (let i = 0; i < rowPositionCache.length; i++) {
    const row = update.indexOf(rowPositionCache[i].i);
    if (row !== -1) {
      update.splice(row, 1);
      rowPositionCache[i].update = false;
    }
  }
  for (let i = 0; i < rowPositionCache.length; i++) {
    if (rowPositionCache[i].update) {
      const row = update.splice(0, 1)[0];
      rowPositionCache[i].i = row;
    } else {
      rowPositionCache[i].update = true;
    }
  }
  ref.triggerEvent('vertical-scroll');
}
exports.updateRowCache = updateRowCache;

},

// packages/grid/src/elements/simple-html-grid-body.ts @77
77: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.firstLoad = true;
  }
  connectedCallback() {
    this.classList.add('simple-html-grid-body');
    const config = this.connector.config;
    this.style.top = config.panelHeight + config.__rowHeight * 2 + 2 + 'px';
    this.style.bottom = config.footerHeight + 'px';
    this.ref.addEventListener('column-resize', this);
    this.ref.addEventListener('vertical-scroll', this);
    this.ref.addEventListener('reRender', this);
    this.scrollTop = 500;
  }
  handleEvent(e) {
    if (e.type === 'column-resize') {
      this.render();
    }
    if (e.type === 'reRender') {
      lit_html_1.render('', this);
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('vertical-scroll', this);
    this.ref.removeEventListener('column-resize', this);
    this.ref.removeEventListener('reRender', this);
  }
  updated() {
    if (this.firstLoad) {
      this.firstLoad = false;
      const node = this.ref.getElementsByTagName('simple-html-grid-body')[0];
      if (node && node.scrollTop !== this.connector.config.lastScrollTop) {
        this.scrollTop = this.connector.config.lastScrollTop;
        this.scrollLeft = this.connector.config.scrollLeft;
        this.ref.reRender();
      }
    }
  }
  render() {
    const config = this.connector.config;
    if (this.firstLoad) {
      const node = this.ref.getElementsByTagName('simple-html-grid-body')[0];
      if (node && node.scrollTop !== this.connector.config.lastScrollTop) {
        return lit_html_1.html`
                    <simple-html-grid-body-content
                        style="height:${this.connector.getScrollVars.__SCROLL_HEIGHT}px;width:${config.__rowWidth}px"
                        class="simple-html-grid-content"
                    >
                    </simple-html-grid-body-content>
                `;
      }
    }
    return lit_html_1.html`
            <simple-html-grid-body-content
                style="height:${this.connector.getScrollVars.__SCROLL_HEIGHT}px;width:${config.__rowWidth}px"
                class="simple-html-grid-content"
            >
                ${this.rowPositionCache.map(row => {
      return lit_html_1.html`
                        <simple-html-grid-row-group
                            .connector=${this.connector}
                            .row=${row}
                            .ref=${this.ref}
                        ></simple-html-grid-row-group>
                        <simple-html-grid-row
                            .connector=${this.connector}
                            .row=${row}
                            .ref=${this.ref}
                        ></simple-html-grid-row>
                    `;
    })}
            </simple-html-grid-body-content>
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-body')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/generateMenuWithComponentName.ts @106
106: function(__fusereq, exports, module){
function generateMenuWithComponentName(element, event, connector, ref, cell, rowNo, data) {
  const menu = document.createElement(element);
  menu.style.top = event.clientY + document.documentElement.scrollTop + 'px';
  menu.style.left = event.clientX + document.documentElement.scrollLeft + 'px';
  menu.connector = connector;
  menu.ref = ref;
  menu.cell = cell;
  menu.rowNo = rowNo;
  menu.rowData = data;
  document.body.appendChild(menu);
}
exports.generateMenuWithComponentName = generateMenuWithComponentName;

},

// packages/grid/src/elements/simple-html-grid-cell-filter.ts @79
79: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var generateMenuWithComponentName_1 = __fusereq(106);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-cell-filter');
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
    const connector = this.connector;
    const ref = this.ref;
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
      this.connector.config.beforeFilterCallbackFn && this.connector.config.beforeFilterCallbackFn(e, cell, this.connector);
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
    let classname = 'simple-html-grid-row-input';
    if (cell.type === 'boolean') {
      classname = 'simple-html-grid-row-checkbox';
    }
    const change = cell.editEventType !== 'input' ? filterCallback : null;
    const input = cell.editEventType === 'input' ? filterCallback : null;
    const contentMenu = function (e) {
      if (e.button !== 0) {
        generateMenuWithComponentName_1.generateMenuWithComponentName('simple-html-grid-menu-filter', e, connector, ref, cell);
      }
    };
    if (this.connector.config.renderFilterCallBackFn) {
      return this.connector.config.renderFilterCallBackFn(cell, this.connector, filterCallback);
    }
    if (coltype === 'empty') {
      return lit_html_1.html`<div style=${boolstyle} class="${classname} hideme"></div>`;
    }
    if (coltype === 'date') {
      return lit_html_1.html`
                <input
                    type=${coltype}
                    style=${boolstyle}
                    class=${classname}
                    @input=${input}
                    @keydown=${enterKeyDown}
                    @contextmenu=${e => {
        e.preventDefault();
        contentMenu(e);
        return false;
      }}
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
                    @contextmenu=${e => {
        e.preventDefault();
        contentMenu(e);
        return false;
      }}
                    @input=${input}
                    @keydown=${enterKeyDown}
                    .value=${value}
                    placeholder=${placeholder}
                />
            `;
    }
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-cell-filter')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-group-row.ts @83
83: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-group-row');
    const config = this.connector.config;
    const grouping = this.connector.config.groupingSet && this.connector.config.groupingSet.length;
    const curleft = grouping ? grouping * 15 : 0;
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
      const curleft = grouping ? grouping * 15 : 0;
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
                    <simple-html-grid-cell-row
                        .connector=${this.connector}
                        .rowNo=${this.rowNo}
                        .cell=${cell}
                        .group=${this.group}
                        .ref=${this.ref}
                        .cellPosition=${i}
                    ></simple-html-grid-cell-row>
                `;
    })}
        `;
  }
};
__fuse_decorate.d([core_1.property(), __fuse_decorate.m("design:type", Number)], __DefaultExport__.prototype, "rowNo", void 0);
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-group-row')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-group-filter.ts @81
81: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-group-label');
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
      const curleft = grouping ? grouping * 15 : 0;
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
      if (cell.filterable) {
        return lit_html_1.html`
                        <simple-html-grid-cell-filter
                            .connector=${this.connector}
                            .cell=${cell}
                            .group=${this.group}
                            .ref=${this.ref}
                            .cellPosition=${i}
                        ></simple-html-grid-cell-filter>
                    `;
      } else {
        return '';
      }
    })}
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-group-filter')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-footer.ts @85
85: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var generateMenuWithComponentName_1 = __fusereq(106);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-footer');
    const config = this.connector.config;
    this.style.height = config.footerHeight + 'px';
    this.ref.addEventListener('reRender', this);
  }
  disconnectedCallback() {
    this.ref.removeEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'reRender') {
      this.render();
    }
  }
  showEdit() {
    return lit_html_1.html`
            <u
                @click="${e => {
      generateMenuWithComponentName_1.generateMenuWithComponentName('simple-html-grid-filter-dialog', e, this.connector, this.ref, null, null, null);
    }}}"
                >Edit filter</u
            >
        `;
  }
  render() {
    const totalRows = this.connector.completeDataset.length;
    const filter = this.connector.filteredDataset.length;
    return lit_html_1.html`<div style="text-align:center">${filter}/${totalRows}</div>
            <div style="display: flex; justify-content: center;">
                <div style="margin-right:5px">
                    ${this.connector.getFilterString()}
                </div>

                ${this.connector.getFilterString() ? this.showEdit() : ''}
            </div> `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-footer')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-header.ts @84
84: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-header');
    const config = this.connector.config;
    this.style.top = config.panelHeight + 'px';
    this.style.height = config.__rowHeight * 2 + 2 + 'px';
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
            <simple-html-grid-col
                class=" simple-html-grid-grouping-row"
                style="width:${grouping ? grouping * 15 : 0}px;left:0; display:${grouping ? 'block' : 'none'}"
            >
            </simple-html-grid-col>
            ${config.groups.map(group => {
      return lit_html_1.html`
                    <simple-html-grid-group-label
                        .connector=${this.connector}
                        .ref=${this.ref}
                        .group=${group}
                    >
                    </simple-html-grid-group-label>
                    <simple-html-grid-group-filter
                        .connector=${this.connector}
                        .ref=${this.ref}
                        .group=${group}
                    >
                    </simple-html-grid-group-filter>
                `;
    })}
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-header')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-panel.ts @86
86: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var generateMenuWithComponentName_1 = __fusereq(106);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-panel');
    const config = this.connector.config;
    this.style.height = config.panelHeight + 'px';
    this.ref.addEventListener('reRender', this);
    this.addEventListener('contextmenu', this);
  }
  handleEvent(e) {
    if (e.type === 'reRender') {
      this.render();
    }
    if (e.type === 'contextmenu') {
      e.preventDefault();
      generateMenuWithComponentName_1.generateMenuWithComponentName('simple-html-grid-menu-panel', e, this.connector, this.ref);
    }
  }
  disconnectedCallback() {
    this.removeEventListener('contextmenu', this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    const grouping = this.connector.config.groupingSet || [];
    const mouseEnter = e => {
      e.target.getElementsByClassName('simple-html-grid-icon')[0].classList.remove('simple-html-grid-iconhidden');
    };
    const mouseLeave = e => {
      e.target.getElementsByClassName('simple-html-grid-icon')[0].classList.add('simple-html-grid-iconhidden');
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
                        class="simple-html-grid-grouping-panel-container"
                    >
                        <p class="simple-html-grid-grouping-panel-p">
                            ${group.title || group.attribute}
                            <i>
                                <svg
                                    @click=${click}
                                    class="simple-html-grid-icon simple-html-grid-iconhidden"
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
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-panel')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-row.ts @87
87: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-row');
    this.ref.addEventListener('vertical-scroll', this);
    this.ref.addEventListener('selection', this);
    if (this.connector.config.__rowHeight > this.connector.config.cellHeight) {
      this.classList.add('grouping-row-border');
    }
  }
  handleEvent(e) {
    if (e.type === 'vertical-scroll') {
      if (this.row.update) {
        this.row.update = false;
        this.render();
      }
    }
    if (e.type === 'selection') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('vertical-scroll', this);
    this.ref.removeEventListener('selection', this);
  }
  render() {
    const config = this.connector.config;
    this.style.height = this.connector.getScrollVars.__SCROLL_HEIGHTS[this.row.i] + 'px';
    this.style.transform = `translate3d(0px, ${this.connector.getScrollVars.__SCROLL_TOPS[this.row.i]}px, 0px)`;
    const entity = this.connector.displayedDataset[this.row.i];
    if (entity && !entity.__group) {
      this.style.display = 'block';
      const rowClick = e => {
        this.connector.highlightRow(e, this.row.i);
      };
      if (this.connector.isSelected(this.row.i)) {
        this.classList.add('simple-html-grid-selected-row');
      } else {
        this.classList.remove('simple-html-grid-selected-row');
      }
      const grouping = this.connector.config.groupingSet && this.connector.config.groupingSet.length;
      return lit_html_1.html`
                <simple-html-grid-col
                    class="simple-html-grid-grouping-row"
                    style="width:${grouping ? grouping * 15 : 0}px;left:0; display:${grouping ? 'block' : 'none'}"
                >
                </simple-html-grid-col>
                ${config.groups.map(group => {
        return lit_html_1.html`
                        <simple-html-grid-group-row
                            @click=${rowClick}
                            .connector=${this.connector}
                            .rowNo=${this.row.i}
                            .ref=${this.ref}
                            .group=${group}
                        >
                        </simple-html-grid-group-row>
                    `;
      })}
            `;
    } else {
      this.style.display = 'none';
      return '';
    }
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-row')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-menu-row.ts @89
89: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let dataClip = null;
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid', 'simple-html-grid-menu');
    document.addEventListener('click', this);
    this.ref.addEventListener('vertical-scroll', this);
    setTimeout(() => {
      document.addEventListener('contextmenu', this);
    }, 50);
  }
  disconnectedCallback() {
    this.ref.removeEventListener('vertical-scroll', this);
    document.removeEventListener('click', this);
    document.removeEventListener('contextmenu', this);
  }
  handleEvent(e) {
    if (e.target !== this) {
      this.removeSelf();
    }
  }
  async select(_type) {
    if (_type === 'copy' && this.rowData) {
      try {
        dataClip = this.rowData[this.cell.attribute];
        await navigator.clipboard.writeText(dataClip);
      } catch (err) {
        console.error(err);
      }
    }
    if (_type === 'copy-range' && this.rowData) {
      try {
        dataClip = '';
        this.connector.getSelectedRows().forEach(row => {
          if (!this.connector.displayedDataset[row].__group) {
            dataClip = dataClip + (this.connector.displayedDataset[row][this.cell.attribute] || '') + '\n';
          }
        });
        await navigator.clipboard.writeText(dataClip);
      } catch (err) {
        console.error(err);
      }
    }
    if (_type === 'paste') {
      try {
        let data;
        if (navigator.clipboard.readText) {
          data = await navigator.clipboard.readText();
        } else {
          data = dataClip;
        }
        if (data === 'undefined' || data === 'null') {
          data = null;
        }
        this.pasteIntoCells(data);
      } catch (err) {
        console.error(err);
      }
    }
    if (_type === 'clear') {
      this.pasteIntoCells(null);
    }
  }
  pasteIntoCells(data) {
    this.connector.getSelectedRows().forEach(row => {
      this.connector.displayedDataset[row][this.cell.attribute] = data;
    });
    this.connector.reRender();
  }
  removeSelf() {
    document.body.removeChild(this);
  }
  allowCopyPaste() {
    if (!this.connector.config.readonly && !this.cell.readonly) {
      return lit_html_1.html`<!-- only if not readonly -->
                <p class="simple-html-grid-menu-item" @click=${() => this.select('paste')}>
                    Paste into selected rows
                </p>
                <p class="simple-html-grid-menu-item" @click=${() => this.select('clear')}>
                    Clear selected rows
                </p>`;
    } else {
      return lit_html_1.html``;
    }
  }
  render() {
    return lit_html_1.html`<!-- data -->
            <p class="simple-html-grid-menu-item" @click=${() => this.select('copy')}>
                Copy cell value
            </p>
            <p class="simple-html-grid-menu-item" @click=${() => this.select('copy-range')}>
                Copy column cell values
            </p>
            ${this.allowCopyPaste()}`;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-menu-row')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-group-label.ts @82
82: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-group-label');
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
      const curleft = grouping ? grouping * 15 : 0;
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
                    <simple-html-grid-cell-label
                        .connector=${this.connector}
                        .cell=${cell}
                        .group=${this.group}
                        .ref=${this.ref}
                        .cellPosition=${i}
                    ></simple-html-grid-cell-label>
                `;
    })}
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-group-label')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-row-group.ts @88
88: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-row');
    this.ref.addEventListener('vertical-scroll', this);
  }
  handleEvent(e) {
    if (e.type === 'vertical-scroll') {
      this.render();
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('vertical-scroll', this);
  }
  render() {
    this.style.height = this.connector.getScrollVars.__SCROLL_HEIGHTS[this.row.i] + 'px';
    this.style.transform = `translate3d(0px, ${this.connector.getScrollVars.__SCROLL_TOPS[this.row.i]}px, 0px)`;
    const entity = this.connector.displayedDataset[this.row.i];
    if (entity && entity.__group) {
      this.style.display = 'block';
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
                        class="simple-html-grid-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                    >
                        ${entity.__groupExpanded ? lit_html_1.svg`<path d="M4.8 7.5h6.5v1H4.8z" />` : lit_html_1.svg`<path d="M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z" />`}
                    </svg></i
                ><span> ${entity.__groupName} (${entity.__groupTotal})</span>
            `;
      return lit_html_1.html`
                ${entity.__groupLvl ? lit_html_1.html`
                          <simple-html-grid-col
                              class="simple-html-grid-col simple-html-grid-grouping-row"
                              style="width:${entity.__groupLvl ? entity.__groupLvl * 15 : 0}px;left:0"
                          >
                          </simple-html-grid-col>
                      ` : ''}
                ${lit_html_1.html`
                    <simple-html-grid-col
                        class="simple-html-grid-col-group"
                        style="left:${entity.__groupLvl ? entity.__groupLvl * 15 : 0}px;right:0"
                    >
                        ${defaultMarkup}
                    </simple-html-grid-col>
                `}
            `;
    } else {
      this.style.display = 'none';
      return '';
    }
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-row-group')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-menu-label.ts @90
90: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var generateMenuWithComponentName_1 = __fusereq(106);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid', 'simple-html-grid-menu');
    document.addEventListener('click', this);
    this.ref.addEventListener('vertical-scroll', this);
    setTimeout(() => {
      document.addEventListener('contextmenu', this);
    }, 50);
  }
  disconnectedCallback() {
    this.ref.removeEventListener('vertical-scroll', this);
    document.removeEventListener('click', this);
    document.removeEventListener('contextmenu', this);
  }
  handleEvent(e) {
    if (e.target !== this) {
      this.removeSelf();
    }
  }
  select(_type, asc, add) {
    if (_type === 'sort') {
      if (this.cell.sortable) {
        this.cell.sortable.sortAscending = asc;
        this.cell.sortable.noToggle = true;
      } else {
        this.cell.sortable = {
          sortAscending: asc,
          noToggle: true
        };
      }
      this.connector.sortCallback({
        shiftKey: add
      }, this.cell);
    }
    if (_type === 'groupBy') {
      if (this.cell.allowGrouping) {
        this.connector.groupingCallback(null, this.cell);
      }
    }
    this.removeSelf();
  }
  removeSelf() {
    document.body.removeChild(this);
  }
  render() {
    return lit_html_1.html`<p
                class="simple-html-grid-menu-item"
                @click=${() => this.select('sort', false, false)}
            >
                Sort asc
            </p>
            <p class="simple-html-grid-menu-item" @click=${() => this.select('sort', true, false)}>
                Sort desc
            </p>
            <p class="simple-html-grid-menu-item" @click=${() => this.select('sort', false, true)}>
                Sort asc (add)
            </p>
            <p class="simple-html-grid-menu-item" @click=${() => this.select('sort', true, true)}>
                Sort desc (add)
            </p>
            <p class="simple-html-grid-menu-item" @click=${() => this.select('groupBy')}>
                Group by
            </p>
            <p
                class="simple-html-grid-menu-item"
                @click=${() => {
      const cell = this.cell;
      if (!this.connector.config.optionalCells) {
        this.connector.config.optionalCells = [];
      }
      this.connector.config.optionalCells.push(cell);
      let removeGroup = null;
      this.connector.config.groups.forEach((row, groupNo) => {
        const index = row.rows.indexOf(cell);
        if (index !== -1) {
          row.rows.splice(index, 1);
        }
        if (row.rows.length === 0) {
          removeGroup = groupNo;
        }
      });
      if (removeGroup !== null) {
        this.connector.config.groups.splice(removeGroup, 1);
      }
      this.connector.manualConfigChange(this.connector.config);
    }}
            >
                Remove cell
            </p>
            <p
                class="simple-html-grid-menu-item"
                @click=${e => generateMenuWithComponentName_1.generateMenuWithComponentName('simple-html-grid-column-chooser', e, this.connector, this.ref, null, null, null)}
            >
                Column Chooser
            </p>`;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-menu-label')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-menu-filter.ts @91
91: function(__fusereq, exports, module){
var _1_, _2_;
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var generateMenuWithComponentName_1 = __fusereq(106);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid', 'simple-html-grid-menu');
    document.addEventListener('click', this);
    this.ref.addEventListener('vertical-scroll', this);
    setTimeout(() => {
      document.addEventListener('contextmenu', this);
    }, 50);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this);
    document.removeEventListener('contextmenu', this);
    this.ref.removeEventListener('vertical-scroll', this);
  }
  handleEvent(e) {
    if (e.target !== this) {
      this.removeSelf();
    }
  }
  select(_type) {
    if (this.cell.filterable) {
      this.cell.filterable.operator = _type;
    }
    this.removeSelf();
  }
  removeSelf() {
    document.body.removeChild(this);
  }
  clearAll() {
    this.connector.setCurrentFilter(null);
    const columns = this.connector.config.groups.flatMap(x => x.rows);
    columns.forEach(col => {
      const f = col.filterable;
      if (f) {
        f.currentValue = null;
      }
    });
    this.connector.reRender();
    this.connector.reRunFilter();
  }
  render() {
    const operator = ((_2_ = (_1_ = this.cell) === null || _1_ === void 0 ? void 0 : _1_.filterable) === null || _2_ === void 0 ? void 0 : _2_.operator) || 'BEGIN_WITH';
    console.log(operator);
    return lit_html_1.html`<p class="simple-html-grid-menu-item" @click=${() => this.select('EQUAL')}>
                ${operator === 'EQUAL' ? lit_html_1.html`<u><b>Equal to</b></u>` : 'Equal to'}
            </p>

            <p class="simple-html-grid-menu-item" @click=${() => this.select('NOT_EQUAL_TO')}>
                ${operator === 'NOT_EQUAL_TO' ? lit_html_1.html`<u><b>Not equal to</b></u>` : 'Not equal to'}
            </p>

            <p class="simple-html-grid-menu-item" @click=${() => this.select('BEGIN_WITH')}>
                ${operator === 'BEGIN_WITH' ? lit_html_1.html`<u><b>Begin with</b></u>` : 'Begin with'}
            </p>

            <p class="simple-html-grid-menu-item" @click=${() => this.select('GREATER_THAN')}>
                ${operator === 'GREATER_THAN' ? lit_html_1.html`<u><b>Greater than</b></u>` : 'Greater than'}
            </p>

            <p
                class="simple-html-grid-menu-item"
                @click=${() => this.select('GREATER_THAN_OR_EQUAL_TO')}
            >
                ${operator === 'GREATER_THAN_OR_EQUAL_TO' ? lit_html_1.html`<u><b>Greater than or equal</b></u>` : 'Greater than or equal'}
            </p>

            <p class="simple-html-grid-menu-item" @click=${() => this.select('LESS_THAN')}>
                ${operator === 'LESS_THAN' ? lit_html_1.html`<u><b>Less than</b></u>` : 'Less than'}
            </p>

            <p
                class="simple-html-grid-menu-item"
                @click=${() => this.select('LESS_THAN_OR_EQUAL_TO')}
            >
                ${operator === 'LESS_THAN_OR_EQUAL_TO' ? lit_html_1.html`<u><b>Less than or equal</b></u>` : 'Less than or equal'}
            </p>

            <p class="simple-html-grid-menu-item" @click=${() => this.select('END_WITH')}>
                ${operator === 'END_WITH' ? lit_html_1.html`<u><b>End with</b></u>` : 'End with'}
            </p>

            <p class="simple-html-grid-menu-item" @click=${() => this.select('CONTAINS')}>
                ${operator === 'CONTAINS' ? lit_html_1.html`<u><b>Contains</b></u>` : 'Contains'}
            </p>

            <p class="simple-html-grid-menu-item" @click=${() => this.select('DOES_NOT_CONTAIN')}>
                ${operator === 'DOES_NOT_CONTAIN' ? lit_html_1.html`<u><b>Does not contain</b></u>` : 'Does not contain'}
            </p>

            <hr />

            <p
                class="simple-html-grid-menu-item"
                @click=${e => generateMenuWithComponentName_1.generateMenuWithComponentName('simple-html-grid-filter-dialog', e, this.connector, this.ref, null, null, null)}
            >
                Advanced
            </p>

            <hr />
            <p class="simple-html-grid-menu-item" @click=${this.clearAll}>
                clear filter all columns
            </p>`;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-menu-filter')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-menu-panel.ts @92
92: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid', 'simple-html-grid-menu');
    document.addEventListener('click', this);
    this.ref.addEventListener('vertical-scroll', this);
    setTimeout(() => {
      document.addEventListener('contextmenu', this);
    }, 50);
  }
  disconnectedCallback() {
    this.ref.removeEventListener('vertical-scroll', this);
    document.removeEventListener('click', this);
    document.removeEventListener('contextmenu', this);
  }
  handleEvent(e) {
    if (e.target !== this) {
      this.removeSelf();
    }
  }
  select(_type) {
    if (_type === 'clear') {
      this.connector.config.groupingExpanded = [];
      this.connector.config.groupingSet = [];
      this.connector.manualConfigChange();
    }
    if (_type === 'collapse') {
      this.connector.groupCollapse(null);
    }
    if (_type === 'expand') {
      this.connector.groupExpand(null);
    }
    this.removeSelf();
  }
  removeSelf() {
    document.body.removeChild(this);
  }
  render() {
    return lit_html_1.html`<p class="simple-html-grid-menu-item" @click=${() => this.select('clear')}>
                Clear grouping
            </p>
            <p class="simple-html-grid-menu-item" @click=${() => this.select('collapse')}>
                Collapse all
            </p>
            <p class="simple-html-grid-menu-item" @click=${() => this.select('expand')}>
                Expand all
            </p>`;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-menu-panel')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/simple-html-grid-menu-custom.ts @95
95: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid', 'simple-html-grid-menu');
    setTimeout(() => {
      document.addEventListener('click', this);
      document.addEventListener('contextmenu', this);
    }, 50);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this);
    document.removeEventListener('contextmenu', this);
  }
  handleEvent(e) {
    if (e.target !== this) {
      this.removeSelf();
    }
  }
  removeSelf() {
    document.body.removeChild(this);
  }
  render() {
    return this.rows.map(row => {
      return lit_html_1.html`
                <p class="simple-html-grid-menu-item" @click=${() => row.callback(row)}>
                    ${row.title}
                </p>
            `;
    });
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-menu-custom')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/dragEvent.ts @97
97: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
let dragCell = null;
let dragGroup = null;
let dragColumnBlock = null;
const delayDragEventTimer = null;
exports.columnDragDropPanel = (event, _connector) => {
  const drop = e => {
    if (dragCell.allowGrouping) {
      _connector.groupingCallback(e, dragCell);
    }
    e.target.removeEventListener('mouseup', drop);
    e.target.classList.remove('simple-html-grid-candrop');
  };
  return _e => {
    if (event === 'enter' && dragCell) {
      _e.target.classList.add('simple-html-grid-candrop');
      _e.target.addEventListener('mouseup', drop);
    }
    if (event === 'leave' && dragCell) {
      _e.target.removeEventListener('mouseup', drop);
      _e.target.classList.remove('simple-html-grid-candrop');
    }
  };
};
exports.columnDragDrop = (event, _cell, _connector, _group) => {
  const mouseUp = function () {
    document.removeEventListener('mouseup', mouseUp);
    document.removeEventListener('mousemove', mouseMove);
    clearTimeout(delayDragEventTimer);
    dragCell = null;
    dragGroup = null;
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
      dragCell = _cell;
      dragGroup = _group;
      document.addEventListener('mouseup', mouseUp);
      dragColumnBlock = document.createElement('div');
      dragColumnBlock.style.top = -1200 + 'px';
      dragColumnBlock.style.left = -1200 + 'px';
      dragColumnBlock.style.height = _connector.config.cellHeight + 'px';
      dragColumnBlock.classList.add('simple-html-grid');
      dragColumnBlock.classList.add('simple-html-grid-drag');
      dragColumnBlock.classList.add('simple-html-grid-cell-label');
      dragColumnBlock.textContent = _cell.header;
      document.body.appendChild(dragColumnBlock);
      document.addEventListener('mousemove', mouseMove);
    }
    if (dragCell !== null) {
      const drop = e => {
        const daCell = Object.assign({}, dragCell);
        const doCell = Object.assign({}, _cell);
        const keys = Object.assign(dragCell, _cell);
        for (const key in keys) {
          dragCell[key] = doCell[key];
          _cell[key] = daCell[key];
        }
        _connector.reRender();
        e.target.removeEventListener('mouseup', drop);
        e.target.classList.remove('simple-html-grid-candrop');
      };
      if (event === 'enter' && dragCell && dragCell !== _cell) {
        if (_cell.type === 'empty') {
          _e.target.classList.toggle('hideme');
        }
        _e.target.classList.add('simple-html-grid-candrop');
        _e.target.addEventListener('mouseup', drop);
      }
      if (event === 'leave' && dragCell) {
        if (_cell.type === 'empty') {
          _e.target.classList.toggle('hideme');
        }
        _e.target.removeEventListener('mouseup', drop);
        _e.target.classList.remove('simple-html-grid-candrop');
      }
    }
  };
};
function dropzone(_connector, _group, _cell, type) {
  const up = function (e) {
    let oldGroupI = null;
    let oldRowI = null;
    if (dragGroup) {
      _connector.config.groups.forEach((g, i) => {
        if (g === dragGroup) {
          g.rows.forEach((r, y) => {
            if (r === dragCell) {
              oldGroupI = i;
              oldRowI = y;
            }
          });
          if (oldRowI !== null) {
            g.rows.splice(oldRowI, 1);
          }
        }
      });
    } else {
      let optionsCells = null;
      _connector.config.optionalCells.forEach((r, i) => {
        if (r === dragCell) {
          optionsCells = i;
        }
      });
      if (optionsCells !== null) {
        _connector.config.optionalCells.splice(optionsCells, 1);
      }
    }
    let newGroupI = null;
    let newRowI = null;
    _connector.config.groups.forEach((g, i) => {
      if (g === _group) {
        g.rows.forEach((r, y) => {
          if (r === _cell) {
            newGroupI = i;
            newRowI = y;
          }
        });
      }
    });
    if (newRowI !== null) {
      if (type === 'left') {
        _connector.config.groups.splice(newGroupI, 0, {
          width: dragGroup ? _connector.config.groups[oldGroupI].width : 100,
          rows: [dragCell]
        });
      }
      if (type === 'right') {
        _connector.config.groups.splice(newGroupI + 1, 0, {
          width: dragGroup ? _connector.config.groups[oldGroupI].width : 100,
          rows: [dragCell]
        });
      }
      if (type === 'top') {
        _connector.config.groups[newGroupI].rows.splice(newRowI, 0, dragCell);
      }
      if (type === 'bottom') {
        _connector.config.groups[newGroupI].rows.splice(newRowI + 1, 0, dragCell);
      }
    }
    e.target.classList.remove('simple-html-grid-candrop');
    dragCell = null;
    dragGroup = null;
    let removeGroup = null;
    _connector.config.groups.forEach((row, groupNo) => {
      if (row.rows.length === 0) {
        removeGroup = groupNo;
      }
    });
    if (removeGroup !== null) {
      _connector.config.groups.splice(removeGroup, 1);
    }
    setTimeout(() => {
      _connector.manualConfigChange(_connector.config);
    }, 0);
  };
  const mouseEnter = e => {
    if (dragCell && dragCell !== _cell) {
      e.preventDefault();
      e.target.classList.add('simple-html-grid-candrop');
      e.target.addEventListener('mouseup', up);
    }
  };
  const mouseLeave = e => {
    if (dragCell && dragCell !== _cell) {
      e.preventDefault();
      e.target.classList.remove('simple-html-grid-candrop');
      e.target.removeEventListener('mouseup', up);
    }
  };
  switch (type) {
    case 'bottom':
      return lit_html_1.html`
                <div
                    class="simple-html-grid-drop-zone-bottom"
                    @mouseenter=${mouseEnter}
                    @mouseleave=${mouseLeave}
                ></div>
            `;
    case 'top':
      return lit_html_1.html`
                <div
                    class="simple-html-grid-drop-zone-top"
                    @mouseenter=${mouseEnter}
                    @mouseleave=${mouseLeave}
                ></div>
            `;
    case 'left':
      return lit_html_1.html`
                <div
                    class="simple-html-grid-drop-zone-left"
                    @mouseenter=${mouseEnter}
                    @mouseleave=${mouseLeave}
                ></div>
            `;
    case 'right':
      return lit_html_1.html`
                <div
                    class="simple-html-grid-drop-zone-right"
                    @mouseenter=${mouseEnter}
                    @mouseleave=${mouseLeave}
                ></div>
            `;
  }
}
exports.dropzone = dropzone;

},

// packages/grid/src/elements/simple-html-grid-column-chooser.ts @94
94: function(__fusereq, exports, module){
var _1_;
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var dragEvent_1 = __fusereq(97);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-menu');
    this.ref.addEventListener('reRender', this);
  }
  handleEvent(e) {
    if (e.type === 'reRender') {
      this.render();
      return;
    }
    if (e.target !== this) {
      this.removeSelf();
    }
  }
  removeSelf() {
    document.body.removeChild(this);
    this.ref.removeEventListener('reRender', this);
  }
  render() {
    return lit_html_1.html`<div class="simple-html-grid ">
            <span
                class="block simple-html-grid-menu-item"
                @click=${() => {
      this.removeSelf();
    }}
            >
                <b> Close</b>
            </span>
            ${(_1_ = this.connector.config.optionalCells) === null || _1_ === void 0 ? void 0 : _1_.map(cell => {
      const mousedown = dragEvent_1.columnDragDrop('dragstart', cell, this.connector, null);
      return lit_html_1.html`<span
                    class="block simple-html-grid-menu-item"
                    @mousedown=${e => {
        mousedown(e);
      }}
                >
                    ${cell.header}
                </span>`;
    })}
        </div>`;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-column-chooser')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/scrollEvent.ts @96
96: function(__fusereq, exports, module){
exports.__esModule = true;
var updateRowCache_1 = __fusereq(64);
let scrollBarTimer;
function scrollEvent(connector, rowPositionCache, ref) {
  return e => {
    if (connector.config.scrollLeft && connector.config.scrollLeft !== e.target.scrollLeft && connector.config.lastScrollTop === e.target.scrollTop) {
      connector.config.scrollLeft = e.target.scrollLeft;
      ref.triggerEvent('horizontal-scroll');
    } else {
      connector.config.scrollLeft = e.target.scrollLeft;
      if (document.activeElement) {
        document.activeElement.blur();
      }
      const scrolltop = e.target.scrollTop;
      const lastScrollTop = connector.config.lastScrollTop;
      connector.config.lastScrollTop = scrolltop;
      let scrollbars = false;
      if (Math.abs(scrolltop - lastScrollTop) > 700) {
        scrollbars = true;
      }
      if (scrollbars || scrollBarTimer) {
        if (scrollBarTimer) {
          clearTimeout(scrollBarTimer);
        }
        scrollBarTimer = setTimeout(() => {
          scrollBarTimer = null;
          updateRowCache_1.updateRowCache(connector, rowPositionCache, ref, scrolltop);
        }, 90);
      } else {
        scrollBarTimer = null;
        updateRowCache_1.updateRowCache(connector, rowPositionCache, ref, scrolltop);
      }
    }
  };
}
exports.scrollEvent = scrollEvent;

},

// packages/grid/src/elements/simple-html-grid-cell-row.ts @78
78: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var generateMenuWithComponentName_1 = __fusereq(106);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-cell-row');
    const config = this.connector.config;
    this.style.display = 'block';
    this.style.height = config.cellHeight + 'px';
    this.style.width = this.group.width + 'px';
    this.style.top = this.cellPosition * config.cellHeight + 'px';
    this.cell = this.group.rows[this.cellPosition];
    this.ref.addEventListener('column-resize', this);
  }
  handleEvent(e) {
    if (e.type === 'column-resize') {
      this.style.width = this.group.width + 'px';
    }
  }
  disconnectedCallback() {
    this.ref.removeEventListener('column-resize', this);
  }
  updateCallback(e) {
    const data = this.connector.displayedDataset[this.rowNo];
    const cell = this.cell;
    this.connector.config.beforeEditCallbackFn && this.connector.config.beforeEditCallbackFn(e, cell, this.rowNo, data, this.connector);
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
    this.connector.config.afterEditCallbackFn && this.connector.config.afterEditCallbackFn(e, cell, this.rowNo, data, this.connector);
  }
  render() {
    if (this.connector.displayedDataset[this.rowNo]) {
      const cell = this.cell;
      const data = this.connector.displayedDataset[this.rowNo];
      const connector = this.connector;
      const rowNo = this.rowNo;
      const ref = this.ref;
      const change = this.cell.editEventType !== 'input' ? this.updateCallback : null;
      const input = this.cell.editEventType === 'input' ? this.updateCallback : null;
      const contentMenu = function (e) {
        if (e.button !== 0) {
          generateMenuWithComponentName_1.generateMenuWithComponentName('simple-html-grid-menu-row', e, connector, ref, cell, rowNo, data);
        }
      };
      if (this.connector.config.renderRowCallBackFn) {
        return this.connector.config.renderRowCallBackFn(cell, data, rowNo, connector, this.updateCallback);
      }
      switch (cell.type) {
        case 'boolean':
          return lit_html_1.html`
                        <input
                            ?readonly=${cell.readonly || connector.config.readonly}
                            ?disabled=${cell.disabled}
                            @change=${change}
                            @input=${input}
                            type="checkbox"
                            @contextmenu=${e => {
            e.preventDefault();
            contentMenu(e);
            return false;
          }}
                            .checked=${data[cell.attribute]}
                            class="simple-html-grid-row-checkbox"
                        />
                    `;
        case 'image':
          return lit_html_1.html`
                        <img
                            .src=${data[cell.attribute] || ''}
                            class="simple-html-grid-image-round"
                        />
                    `;
        case 'empty':
          return lit_html_1.html`<div class="simple-html-grid-row-input "></div>`;
        case 'date':
          return lit_html_1.html`
                        <input
                            ?readonly=${cell.readonly || connector.config.readonly}
                            ?disabled=${cell.disabled}
                            @change=${change}
                            @input=${input}
                            type=${cell.type}
                            @contextmenu=${e => {
            e.preventDefault();
            contentMenu(e);
            return false;
          }}
                            .valueAsDate=${data[cell.attribute] || null}
                            class="simple-html-grid-row-input"
                        />
                    `;
        case 'number':
          return lit_html_1.html`
                        <input
                            ?readonly=${cell.readonly || connector.config.readonly}
                            ?disabled=${cell.disabled}
                            @change=${change}
                            @input=${input}
                            type=${cell.type}
                            @contextmenu=${e => {
            e.preventDefault();
            contentMenu(e);
            return false;
          }}
                            .valueAsNumber=${data[cell.attribute]}
                            class="simple-html-grid-row-input"
                        />
                    `;
        default:
      }
      return lit_html_1.html`
                <input
                    ?readonly=${cell.readonly || connector.config.readonly}
                    ?disabled=${cell.disabled}
                    @change=${change}
                    @input=${input}
                    @contextmenu=${e => {
        e.preventDefault();
        contentMenu(e);
        return false;
      }}
                    type=${cell.type || 'text'}
                    .value=${data[cell.attribute] || null}
                    class="simple-html-grid-row-input"
                />
            `;
    } else {
      return '';
    }
  }
};
__fuse_decorate.d([core_1.property(), __fuse_decorate.m("design:type", Number)], __DefaultExport__.prototype, "rowNo", void 0);
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-cell-row')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/resizeColumnElement.ts @107
107: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
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
  return lit_html_1.html` <div class="simple-html-grid-draggable-handler" @mousedown=${mouseDown}></div> `;
}
exports.resizeColumnElement = resizeColumnElement;

},

// packages/grid/src/elements/sorticonElement.ts @108
108: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
function sorticonElement(_connector, col) {
  const ascTemplate = lit_html_1.svg`
        <svg class="simple-html-grid-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M7.4 6L3 10h1.5L8 7l3.4 3H13L8.5 6h-1z"/>
        </svg>`;
  const descTemplate = lit_html_1.svg`
        <svg class="simple-html-grid-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M7.4 10L3 6h1.5L8 9.2 11.3 6H13l-4.5 4h-1z"/>
        </svg>`;
  if (col.sortable && col.sortable.sortNo) {
    return lit_html_1.html`
            <i class="simple-html-grid-fa-sort-number" data-vgridsort="${col.sortable.sortNo}">
                ${col.sortable.sortAscending ? ascTemplate : descTemplate}
            </i>
        `;
  } else {
    return lit_html_1.html``;
  }
}
exports.sorticonElement = sorticonElement;

},

// packages/grid/src/elements/simple-html-grid-cell-label.ts @80
80: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var resizeColumnElement_1 = __fusereq(107);
var sorticonElement_1 = __fusereq(108);
var dragEvent_1 = __fusereq(97);
var generateMenuWithComponentName_1 = __fusereq(106);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.classList.add('simple-html-grid-cell-label');
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
  capalize(text) {
    if (text) {
      return text[0].toUpperCase() + text.substring(1, text.length);
    } else {
      return text;
    }
  }
  render() {
    const cell = this.group.rows[this.cellPosition];
    const connector = this.connector;
    const ref = this.ref;
    const label = this.capalize(this.group.rows[this.cellPosition].header || '');
    const sortCallback = e => {
      const mouseup = e => {
        cell.sortable.beforeSortCallbackFn && cell.sortable.beforeSortCallbackFn(e, cell, connector);
        if (cell.sortable.auto !== false) {
          connector.sortCallback(e, cell);
        }
      };
      if (e.button === 0) {
        e.target.addEventListener('mouseup', mouseup);
        setTimeout(() => {
          e.target.removeEventListener('mouseup', mouseup);
        }, 500);
      } else {}
    };
    const mousedown = dragEvent_1.columnDragDrop('dragstart', cell, connector, this.group);
    const mouseenter = dragEvent_1.columnDragDrop('enter', cell, connector, this.group);
    const mouseleave = dragEvent_1.columnDragDrop('leave', cell, connector, this.group);
    const contentMenu = function (e) {
      if (e.button !== 0) {
        generateMenuWithComponentName_1.generateMenuWithComponentName('simple-html-grid-menu-label', e, connector, ref, cell);
      }
    };
    this.style.width = this.group.width + 'px';
    if (this.connector.config.renderLabelCallBackFn) {
      return this.connector.config.renderLabelCallBackFn(cell, this.connector, sorticonElement_1.sorticonElement, resizeColumnElement_1.resizeColumnElement, mousedown, mouseenter, mouseleave);
    }
    if (cell.type === 'empty') {
      return lit_html_1.html`
                <style>
                    .simple-html-grid .hideme {
                        background-color: ${getComputedStyle(this.ref).getPropertyValue('--SimpleHtmlGrid-main-bg-color')};
                    }
                </style>
                <span
                    .cell=${cell}
                    class="simple-html-grid-label hideme"
                    @mouseenter=${!cell.disableDragDrop && mouseenter}
                    @mouseleave=${!cell.disableDragDrop && mouseleave}
                    @contextmenu=${e => {
        e.preventDefault();
        contentMenu(e);
        return false;
      }}
                >
                </span>
                ${resizeColumnElement_1.resizeColumnElement(this.ref, this.group)}
            `;
    } else {
      return lit_html_1.html`
                <span
                    .cell=${cell}
                    class="simple-html-grid-label"
                    @mousedown=${e => {
        cell.sortable && sortCallback(e);
        !cell.disableDragDrop && mousedown(e);
      }}
                    @contextmenu=${e => {
        e.preventDefault();
        contentMenu(e);
        return false;
      }}
                    @mouseenter=${!cell.disableDragDrop && mouseenter}
                    @mouseleave=${!cell.disableDragDrop && mouseleave}
                    >${label} ${sorticonElement_1.sorticonElement(this.connector, cell)}</span
                >
                ${resizeColumnElement_1.resizeColumnElement(this.ref, this.group)}
                ${dragEvent_1.dropzone(this.connector, this.group, cell, 'left')}
                ${dragEvent_1.dropzone(this.connector, this.group, cell, 'right')}
                ${dragEvent_1.dropzone(this.connector, this.group, cell, 'top')}
                ${dragEvent_1.dropzone(this.connector, this.group, cell, 'bottom')}
            `;
    }
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-cell-label')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/generateMenu.ts @112
112: function(__fusereq, exports, module){
function generateMenu(event, rows) {
  const menu = document.createElement('simple-html-grid-menu-custom');
  menu.style.top = event.clientY + document.documentElement.scrollTop + 'px';
  menu.style.left = event.clientX + document.documentElement.scrollLeft + 'px';
  menu.rows = rows;
  document.body.appendChild(menu);
}
exports.generateMenu = generateMenu;

},

// packages/grid/src/elements/filterDialogCondition/deleteBtn.ts @113
113: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
function deleteBtn(ctx, operatorObjectArr, i) {
  return lit_html_1.html` <button
        class="dialog-item-x dialog-condition-trash"
        @click=${() => {
    operatorObjectArr && operatorObjectArr.splice(i, 1);
    ctx.render();
  }}
    >
        <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
        </svg>
    </button>`;
}
exports.deleteBtn = deleteBtn;

},

// packages/grid/src/elements/filterDialogCondition/valueInput.ts @115
115: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
function valueInput(operatorObject) {
  if (operatorObject.operator === 'IN') {
    return lit_html_1.html`<textarea
            class="dialog-item-y"
            style="text-align: center;"
            value=${Array.isArray(operatorObject.value) ? operatorObject.value.join('\n') : operatorObject.value}
            @input=${e => {
      const x = e.target.value.split('\n');
      if (x[x.length - 1] === '') {
        x.pop();
      }
      operatorObject.value = x;
    }}
        ></textarea>`;
  }
  switch (operatorObject.attributeType) {
    case 'boolean':
      return lit_html_1.html`<input
                class="dialog-item-y"
                style="text-align: center;"
                type="checkbox"
                .checked=${operatorObject.value}
                @change=${e => {
        operatorObject.value = e.target.checked;
      }}
                @input=${e => {
        operatorObject.value = e.target.checked;
      }}
            />`;
    case 'image':
    case 'empty':
    case 'date':
      return lit_html_1.html`<input
                class="dialog-item-y"
                style="text-align: center;"
                type="date"
                .valueAsDate=${operatorObject.value || null}
                @input=${e => {
        operatorObject.value = e.target.valueAsDate;
      }}
            />`;
    case 'number':
      return lit_html_1.html`<input
                class="dialog-item-y"
                style="text-align: center;"
                type="number"
                .valueAsNumber=${operatorObject.value}
                @input=${e => {
        operatorObject.value = e.target.valueAsNumber;
      }}
            />`;
    default:
      return lit_html_1.html`<input
                class="dialog-item-y"
                style="text-align: center;"
                value=${operatorObject.value}
                @input=${e => {
        operatorObject.value = e.target.value;
      }}
            />`;
  }
}
exports.valueInput = valueInput;

},

// packages/grid/src/elements/filterDialogCondition/selectAttributeOrInputBtn.ts @114
114: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
function selectAttributeOrInputBtn(operatorObject, ctx) {
  return lit_html_1.html` <button
        class="dialog-item-x dialog-condition-type"
        @click=${() => {
    operatorObject.valueType = operatorObject.valueType === 'VALUE' ? 'ATTRIBUTE' : 'VALUE';
    ctx.render();
  }}
    >
        <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
        </svg>
    </button>`;
}
exports.selectAttributeOrInputBtn = selectAttributeOrInputBtn;

},

// packages/grid/src/elements/filterDialogCondition/selectAttributesBtn.ts @117
117: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
var generateMenu_1 = __fusereq(112);
function selectAttributesBtn(operatorObject, ctx, isValue) {
  return lit_html_1.html` <button
        class="dialog-item-y"
        @click=${e => {
    generateMenu_1.generateMenu(e, ctx.filterAttributes.map(e => {
      return {
        title: e.attribute,
        callback: () => {
          if (isValue) {
            operatorObject.value = e.attribute;
          } else {
            operatorObject.attribute = e.attribute;
          }
          operatorObject.attributeType = e.type;
          ctx.render();
        }
      };
    }));
  }}
    >
        ${isValue !== true ? operatorObject.attribute : operatorObject.value}
    </button>`;
}
exports.selectAttributesBtn = selectAttributesBtn;

},

// packages/grid/src/elements/filterDialogCondition/selectOperatorBtn.ts @116
116: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
var generateMenu_1 = __fusereq(112);
var datasource_1 = __fusereq(37);
function selectOperatorBtn(operatorObject, ctx) {
  return lit_html_1.html` <button
        class="dialog-item-y"
        @click=${e => {
    generateMenu_1.generateMenu(e, [{
      title: 'Begin with',
      callback: () => {
        operatorObject.operator = 'BEGIN_WITH';
        ctx.render();
      }
    }, {
      title: 'Equal to',
      callback: () => {
        operatorObject.operator = 'EQUAL';
        ctx.render();
      }
    }, {
      title: 'Contains',
      callback: () => {
        operatorObject.operator = 'CONTAINS';
        ctx.render();
      }
    }, {
      title: 'Does not contain',
      callback: () => {
        operatorObject.operator = 'DOES_NOT_CONTAIN';
        ctx.render();
      }
    }, {
      title: 'End with',
      callback: () => {
        operatorObject.operator = 'END_WITH';
        ctx.render();
      }
    }, {
      title: 'Greater than',
      callback: () => {
        operatorObject.operator = 'GREATER_THAN';
        ctx.render();
      }
    }, {
      title: 'Greater than or equal to',
      callback: () => {
        operatorObject.operator = 'GREATER_THAN_OR_EQUAL_TO';
        ctx.render();
      }
    }, {
      title: 'Less than',
      callback: () => {
        operatorObject.operator = 'LESS_THAN';
        ctx.render();
      }
    }, {
      title: 'Less then or equal to',
      callback: () => {
        operatorObject.operator = 'LESS_THAN_OR_EQUAL_TO';
        ctx.render();
      }
    }, {
      title: 'Not Equal to',
      callback: () => {
        operatorObject.operator = 'NOT_EQUAL_TO';
        ctx.render();
      }
    }, {
      title: 'IN',
      callback: () => {
        operatorObject.operator = 'IN';
        ctx.render();
      }
    }]);
  }}
    >
        <b>${datasource_1.OPERATORS[operatorObject.operator]}</b>
    </button>`;
}
exports.selectOperatorBtn = selectOperatorBtn;

},

// packages/grid/src/elements/filterDialogCondition/filterDialogConditionTemplate.ts @111
111: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
var filterDialogGroupTemplate_1 = __fusereq(109);
var deleteBtn_1 = __fusereq(113);
var selectAttributeOrInputBtn_1 = __fusereq(114);
var valueInput_1 = __fusereq(115);
var selectOperatorBtn_1 = __fusereq(116);
var selectAttributesBtn_1 = __fusereq(117);
function filterDialogConditionTemplate(operatorObjectArr, ctx, level) {
  ctx.width = level + ctx.width;
  if (Array.isArray(operatorObjectArr)) {
    return operatorObjectArr.map((operatorObject, i) => {
      if (operatorObject.type === 'GROUP') {
        return filterDialogGroupTemplate_1.filterDialogGroupTemplate(operatorObject, ctx, level, operatorObjectArr);
      } else {
        return lit_html_1.html` <div class="dialog-row">
                    <div class="dialog-item">
                        <span class="dialog-item-group">${level}:</span>
                        <!-- btn -->
                        ${selectAttributesBtn_1.selectAttributesBtn(operatorObject, ctx)}
                        <!-- btn -->
                        ${selectOperatorBtn_1.selectOperatorBtn(operatorObject, ctx)}
                        <!-- input or btn -->
                        ${operatorObject.valueType === 'VALUE' ? valueInput_1.valueInput(operatorObject) : selectAttributesBtn_1.selectAttributesBtn(operatorObject, ctx, true)}
                        <!-- btn -->
                        ${selectAttributeOrInputBtn_1.selectAttributeOrInputBtn(operatorObject, ctx)}
                        <!-- btn -->
                        ${deleteBtn_1.deleteBtn(ctx, operatorObjectArr, i)}
                    </div>
                </div>`;
      }
    });
  }
  return '';
}
exports.filterDialogConditionTemplate = filterDialogConditionTemplate;

},

// packages/grid/src/elements/filterDialogGroupTemplate.ts @109
109: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
var filterDialogConditionTemplate_1 = __fusereq(111);
var generateMenu_1 = __fusereq(112);
function filterDialogGroupTemplate(g, ctx, level, parent) {
  return lit_html_1.html`
        <li class="dialog-row main-group">
            <span class="dialog-item-group">${level + 1}:</span>
            <button
                class="dialog-item-x"
                @click=${() => {
    g.logicalOperator = g.logicalOperator === 'AND' ? 'OR' : 'AND';
    ctx.render();
  }}
            >
                <b> ${g.logicalOperator}</b>
            </button>

            <button
                class="dialog-item-x"
                @click=${e => {
    generateMenu_1.generateMenu(e, [{
      title: 'Add Group',
      callback: () => {
        g.filterArguments.push({
          type: 'GROUP',
          logicalOperator: 'AND',
          attribute: 'select',
          operator: 'EQUAL',
          valueType: 'VALUE',
          attributeType: 'text',
          filterArguments: [],
          value: ''
        });
        ctx.render();
      }
    }, {
      title: 'Add condition',
      callback: () => {
        g.filterArguments.push({
          type: 'CONDITION',
          logicalOperator: 'NONE',
          attribute: 'select',
          operator: 'EQUAL',
          valueType: 'VALUE',
          attributeType: 'text',
          filterArguments: [],
          value: ''
        });
        ctx.render();
      }
    }]);
  }}
            >
                <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </button>
            <button
                class="dialog-item-x"
                @click=${() => {
    parent && parent.splice(parent.indexOf(g), 1);
    if (!parent) {
      g.filterArguments = [];
    }
    ctx.render();
  }}
            >
                <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                </svg>
            </button>
        </li>
        ${filterDialogConditionTemplate_1.filterDialogConditionTemplate(g.filterArguments, ctx, level + 1)}
    `;
}
exports.filterDialogGroupTemplate = filterDialogGroupTemplate;

},

// packages/grid/src/elements/simple-html-grid-filter-dialog.ts @93
93: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var filterDialogGroupTemplate_1 = __fusereq(109);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.style.top = '0';
    this.style.left = '0';
    this.filter = this.connector.getCurrentFilter() || ({
      type: 'GROUP',
      logicalOperator: 'AND',
      attribute: null,
      operator: null,
      valueType: null,
      value: null,
      attributeType: 'text',
      filterArguments: []
    });
    this.classList.add('simple-html-grid-menu-full');
    this.filterAttributes = this.connector.config.groups.flatMap(y => y.rows);
  }
  handleEvent(e) {
    if (e.target !== this) {
      this.removeSelf();
    }
  }
  removeSelf() {
    document.body.removeChild(this);
  }
  render() {
    return lit_html_1.html`<div style="width:550px" class="simple-html-grid simple-html-filter-dialog">
            <ul class="dialog-row main-group">
                <button
                    class="dialog-item-x"
                    @click=${() => {
      this.removeSelf();
    }}
                >
                    <b> Close</b>
                </button>
                <button
                    class="dialog-item-x"
                    @click=${() => {
      const columns = this.connector.config.groups.flatMap(x => x.rows);
      columns.forEach(col => {
        const f = col.filterable;
        if (f) {
          f.currentValue = null;
        }
      });
      this.connector.setCurrentFilter(this.filter);
      this.connector.reRunFilter();
      this.removeSelf();
    }}
                >
                    <b> Run query & close</b>
                </button>
                <button
                    class="dialog-item-x"
                    @click=${() => {
      const columns = this.connector.config.groups.flatMap(x => x.rows);
      columns.forEach(col => {
        const f = col.filterable;
        if (f) {
          f.currentValue = null;
        }
      });
      this.connector.setCurrentFilter(this.filter);
      this.connector.reRunFilter();
    }}
                >
                    <b> Run query</b>
                </button>
            </ul>

            ${filterDialogGroupTemplate_1.filterDialogGroupTemplate(this.filter, this, 0)}
                </ul>`;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('simple-html-grid-filter-dialog')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/grid/src/elements/generate.ts @63
63: function(__fusereq, exports, module){
exports.__esModule = true;
__fusereq(77);
__fusereq(78);
__fusereq(79);
__fusereq(80);
__fusereq(81);
__fusereq(82);
__fusereq(83);
__fusereq(84);
__fusereq(85);
__fusereq(86);
__fusereq(87);
__fusereq(88);
__fusereq(89);
__fusereq(90);
__fusereq(91);
__fusereq(92);
__fusereq(93);
__fusereq(94);
__fusereq(95);
var scrollEvent_1 = __fusereq(96);
var lit_html_1 = __fusereq(21);
var dragEvent_1 = __fusereq(97);
function generate(connector, rowPositionCache, ref) {
  const scroll = scrollEvent_1.scrollEvent(connector, rowPositionCache, ref);
  const enter = dragEvent_1.columnDragDropPanel('enter', connector);
  const leave = dragEvent_1.columnDragDropPanel('leave', connector);
  return lit_html_1.html`
        <simple-html-grid-panel
            .connector=${connector}
            .ref=${ref}
            @mouseleave=${leave}
            @mouseenter=${enter}
        ></simple-html-grid-panel>
        <simple-html-grid-header .connector=${connector} .ref=${ref}></simple-html-grid-header>
        <simple-html-grid-body
            .connector=${connector}
            .rowPositionCache=${rowPositionCache}
            @scroll=${scroll}
            .ref=${ref}
        ></simple-html-grid-body>
        <simple-html-grid-footer .connector=${connector} .ref=${ref}></simple-html-grid-footer>
    `;
}
exports.generate = generate;

},

// packages/grid/src/elements/simple-html-grid.ts @38
38: function(__fusereq, exports, module){
var _1_;
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
var core_1 = __fusereq(7);
var generate_1 = __fusereq(63);
var updateRowCache_1 = __fusereq(64);
let SimpleHtmlGrid = class SimpleHtmlGrid extends HTMLElement {
  constructor() {
    super(...arguments);
    this.rowCache = [];
  }
  set interface(value) {
    if (this.__DATASOURCE_INTERFACE !== value) {
      this.__DATASOURCE_INTERFACE = value;
      this.__DATASOURCE_INTERFACE.connectGrid(this);
    }
  }
  get interface() {
    return this.__DATASOURCE_INTERFACE;
  }
  connectedCallback() {
    this.resetRowCache();
  }
  disconnectedCallback() {
    this.__DATASOURCE_INTERFACE && this.__DATASOURCE_INTERFACE.disconnectGrid();
  }
  reRender() {
    this.cleanup();
    this.triggerEvent('reRender');
  }
  manualConfigChange() {
    lit_html_1.render(lit_html_1.html``, this);
    lit_html_1.render(lit_html_1.html` ${generate_1.generate(this.interface, this.rowCache, this)} `, this);
    this.cleanup();
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
  cleanup() {
    const node = this.getElementsByTagName('simple-html-grid-body')[0];
    if (node && node.scrollTop !== undefined && this.interface) {
      updateRowCache_1.updateRowCache(this.interface, this.rowCache, this, node.scrollTop);
    }
  }
  resetRowCache() {
    if (this.interface) {
      const node = this.getElementsByTagName('simple-html-grid-body')[0];
      const height = ((_1_ = node) === null || _1_ === void 0 ? void 0 : _1_.clientHeight) || this.interface.config.cellHeight * 50;
      let rowsNeeded = Math.round(Math.floor(height / this.interface.config.cellHeight)) + 2;
      if (rowsNeeded > 50) {
        rowsNeeded = 50;
      }
      const cacheLength = this.interface.displayedDataset.length > rowsNeeded ? rowsNeeded : this.interface.displayedDataset.length;
      if (cacheLength !== this.rowCache.length) {
        if (this.rowCache.length > cacheLength) {
          let l = this.rowCache.length;
          for (let i = 0; i < l; i++) {
            if (this.rowCache && this.rowCache[i].i > cacheLength) {
              this.rowCache.splice(i, 1);
              i--;
              l--;
              cacheLength;
            }
          }
          const missingLength = cacheLength + 1 - this.rowCache.length;
          for (let i = 0; i < missingLength; i++) {
            this.rowCache.push({
              i: i,
              update: true
            });
          }
        } else {
          const missingLength = cacheLength - this.rowCache.length;
          for (let i = 0; i < missingLength; i++) {
            this.rowCache.push({
              i: i,
              update: true
            });
          }
        }
      }
    } else {
      this.rowCache = [];
    }
  }
  render() {
    return new Promise(() => {
      if (this.interface) {
        lit_html_1.render(lit_html_1.html` ${generate_1.generate(this.interface, this.rowCache, this)} `, this);
      } else {
        if (this.isConnected) {
          console.error('no config set');
          lit_html_1.render(lit_html_1.html``, this);
        }
      }
    });
  }
};
SimpleHtmlGrid = __fuse_decorate.d([core_1.customElement('simple-html-grid')], SimpleHtmlGrid);
exports.SimpleHtmlGrid = SimpleHtmlGrid;

},

// packages/grid/src/index.ts @16
16: function(__fusereq, exports, module){
exports.__esModule = true;
var types_1 = __fusereq(35);
exports.IGridConfig = types_1.GridConfig;
var gridInterface_1 = __fusereq(36);
exports.GridInterface = gridInterface_1.GridInterface;
var datasource_1 = __fusereq(37);
exports.Datasource = datasource_1.Datasource;
var simple_html_grid_1 = __fusereq(38);
exports.SimpleHtmlGrid = simple_html_grid_1.SimpleHtmlGrid;

},

// samples/grid/gridSetup/setup.ts @23
23: function(__fusereq, exports, module){
function setup(rows, columns, scroll) {
  const setup = {
    cellHeight: 20,
    panelHeight: 25,
    footerHeight: 40,
    selectionMode: 'multiple',
    lastScrollTop: scroll,
    groups: []
  };
  let word = 0;
  for (let i = 1; i < columns; i++) {
    const x = [];
    for (let y = 0; y < rows; y++) {
      word++;
      if (i === 1 && y === 0 || i === 2 && y === 0 || i === 2 && y === 1) {
        if (i === 1 && y === 0) {
          x.push({
            header: 'index',
            attribute: 'index',
            type: 'number',
            filterable: {},
            sortable: {}
          });
        } else {
          x.push({
            header: 'date',
            readonly: true,
            attribute: 'date',
            type: 'date',
            filterable: {},
            sortable: {}
          });
        }
      } else {
        x.push({
          header: 'word' + word,
          attribute: 'word' + word,
          filterable: {},
          sortable: {},
          allowGrouping: true
        });
      }
    }
    const x4 = Math.floor(Math.random() * 150) + 75;
    setup.groups.push({
      width: x4,
      rows: x
    });
  }
  return setup;
}
exports.setup = setup;

},

// samples/grid/data/dummyData.ts @72
72: function(__fusereq, exports, module){
exports.__esModule = true;
exports.data = ['Flss', 'Banishevitz', null, 'task-force', 'Tracee', 'Dregan', null, 'User-centric', 'Corly', 'Lunge', null, 'Ameliorated', 'Tobe', 'Marian', null, 'uniform', 'Amalita', 'Allam', null, 'intermediate', 'Janos', 'Becke', null, 'encompassing', 'Willi', 'Jaram', null, 'frame', 'Sharyl', 'Beck', null, 'background', 'Alejandro', 'Brayley', null, 'Cross-platform', 'Amy', 'Lazar', null, 'Enterprise-wide', 'Alaster', 'Wakley', null, 'system-worthy', 'Gwennie', 'Killford', null, 'Horizontal', 'Blake', 'Batho', null, 'attitude', 'Troy', 'MacKaig', null, 'mission-critical', 'Brit', 'Fuggles', null, 'fault-tolerant', 'Virgie', 'Cleugher', null, 'foreground', 'Jecho', 'Bisacre', null, 'tertiary', 'Alisander', 'Pherps', null, 'needs-based', 'Cordell', 'Fairholm', null, 'Multi-lateral', 'Roderigo', 'Moreno', null, 'core', 'Terrell', 'MacAiline', null, 'time-frame', 'Rodrick', 'Cisland', null, 'parallelism', 'Ezra', 'Skentelbury', null, 'forecast', 'Madelina', 'Hansod', null, 'core', 'Martica', 'Samsonsen', null, 'bottom-line', 'Redd', 'Scutchings', null, 'bi-directional', 'Delmor', 'Hutcheon', null, 'high-level', 'Kip', 'Edwick', null, 'Object-based', 'Kari', 'Rosenzwig', null, 'regional', 'Rubetta', 'Skelton', null, 'Extended', 'Nanci', 'Craw', null, 'Right-sized', 'Duane', 'Cherry', null, 'model', 'Clarabelle', 'Pendergrast', null, 'intangible', 'Daria', 'Rosas', null, 'time-frame', 'Francesca', 'Glentworth', null, 'circuit', 'Abigael', 'Capun', null, 'Right-sized', 'Sallee', 'Ybarra', null, 'Managed', 'Ezmeralda', 'Phillips', null, 'standardization', 'Stephan', 'Stidever', null, 'software', 'Smith', 'Shouler', null, 'Future-proofed', 'Hobie', 'Lung', null, 'time-frame', 'Blane', 'Minchi', null, 'global', 'Dall', 'Amoore', null, 'systemic', 'Tybie', 'Amaya', null, 'Automated', 'Paul', 'Tyrrell', null, 'Triple-buffered', 'Reggie', 'Gellert', null, 'transitional', 'Alvera', 'Misk', null, 'Polarised', 'Urban', 'Bengoechea', null, 'local', 'Ferdie', 'Woollam', null, 'analyzer', 'Constantine', 'Eggleton', null, 'strategy', 'Mada', 'Cowins', null, 'Focused', 'Alecia', 'Lomath', null, 'bottom-line', 'Donall', 'Minucci', null, 'web-enabled', 'Patty', 'Driffield', null, 'real-time', 'Anne-corinne', 'Fasset', null, 'product', 'Halsy', 'Edyson', null, 'homogeneous', 'Donnajean', 'Fingleton', null, 'initiative', 'Fonz', 'Kerfod', null, 'static', 'Gage', 'Gaze', null, 'pricing structure', 'Duff', 'Dummigan', null, 'clear-thinking', 'Taite', 'Wegner', null, 'Triple-buffered', 'Bird', 'Abbey', null, 'needs-based', 'Muire', 'Esherwood', null, 'Distributed', 'Kirbee', 'Dobbin', null, 'middleware', 'Verge', "D'Aulby", null, 'portal', 'Abner', 'McNay', null, 'Synergized', 'Benji', 'Adame', null, 'protocol', 'Noemi', 'Aime', null, 'orchestration', 'Jayson', 'MacTeggart', null, 'Total', 'Barthel', 'Ranscomb', null, 'human-resource', 'Bryan', 'Winsor', null, 'background', 'Menard', 'Dowdle', null, 'database', 'Amby', 'Strafford', null, 'Diverse', 'Norean', 'Roper', null, 'Cross-group', 'Gasper', 'Chawner', null, 'secondary', 'Bamby', 'Poland', null, 'groupware', 'Ronda', 'Chestle', null, 'secured line', 'Asa', 'Rackam', null, 'info-mediaries', 'Crista', 'Julien', null, 'Balanced', 'Daniel', 'Ybarra', null, 'infrastructure', 'Germayne', 'Roseman', null, 'neural-net', 'Marla', 'Hourican', null, 'Vision-oriented', 'Howie', 'Sheach', null, 'Polarised', 'Mal', 'Pearcehouse', null, 'firmware', 'Kelbee', 'Wilstead', null, 'Synergized', 'Randi', 'Bachmann', null, 'optimizing', 'Granny', 'Oldcroft', null, 'orchestration', 'Zonda', 'Barnett', null, 'projection', 'Fredrick', 'Paulus', null, 'next generation', 'Olva', 'Durnill', null, 'scalable', 'Fanchon', 'Clapison', null, 'benchmark', 'Berkly', 'Clack', null, 'Right-sized', 'Lowell', 'Carwithim', null, 'zero defect', 'Zahara', 'Orrah', null, 'actuating', 'Gina', 'Andreix', null, 'structure', 'Holden', 'Snodin', null, 'application', 'Jyoti', 'Sweetzer', null, 'standardization', 'Lesly', 'Illem', null, 'fault-tolerant', 'Vernor', 'Swinn', null, 'Optimized', 'Dalton', 'Click', null, 'product', 'Reiko', 'Cauldwell', null, 'methodology', 'Cherrita', 'Pimlock', null, 'solution-oriented', 'Ronald', 'Semkins', null, 'even-keeled', 'Shellie', 'Alcott', null, 'Business-focused', 'Ronny', 'Coatts', null, 'Universal', 'Thia', 'Voden', null, 'pricing structure', 'Fabian', 'Spillett', null, 'forecast', 'Minnaminnie', 'Dove', null, 'Ergonomic', 'Thurstan', 'Merredy', null, 'capability', 'Marjy', 'Grestye', null, 'Synergistic', 'Ginni', 'Swyre', null, 'synergy', 'Brandie', 'Cuseick', null, 'definition', 'Curt', 'McDonagh', null, 'Persevering', 'Nathaniel', 'Skull', null, 'actuating', 'Sandye', 'Tunn', null, 'Optional', 'Felice', 'McNish', null, 'object-oriented', 'Dorisa', "O'Currane", null, 'Adaptive', 'Horst', 'Baitson', null, 'forecast', 'Benny', 'Smittoune', null, 'encryption', 'Marie', 'Austick', null, 'Polarised', 'Marwin', 'Sines', null, 'Front-line', 'Isidora', 'Housbie', null, 'Integrated', 'Ynes', 'Dulieu', null, 'analyzing', 'Field', 'Fermoy', null, 'throughput', 'Maddy', 'Perrott', null, 'mobile', 'Kenon', 'Chicotti', null, 'Versatile', 'Jody', 'Demer', null, 'Centralized', 'Fernandina', 'Hlavac', null, 'fault-tolerant', 'Kort', 'Mollnar', null, 'cohesive', 'Gael', 'Osburn', null, 'Ameliorated', 'Francklyn', 'Dell Casa', null, 'Optional', 'Kitti', 'Frotton', null, 'Versatile', 'Maddalena', 'Lemmon', null, 'real-time', 'Kirk', 'Nemchinov', null, 'Configurable', 'Jodee', 'Swatheridge', null, 'Sharable', 'Cynthie', 'Fitzhenry', null, 'background', 'Ree', 'Reidie', null, 'intermediate', 'Harriett', 'Ballintyne', null, '4th generation', 'Angus', 'Carpenter', null, 'Diverse', 'Finley', 'Gardiner', null, 'Total', 'Thadeus', 'Barhims', null, 'Exclusive', 'Nichol', 'Zipsell', null, 'support', 'Daniel', 'Giacubbo', null, 'disintermediate', 'Andris', 'Lanegran', null, 'website', 'Mill', 'Bursnall', null, 'multi-state', 'Dorris', 'Mabee', null, 'Multi-tiered', 'Rosina', 'St Pierre', null, 'leverage', 'Emeline', 'Crickmoor', null, 'Ergonomic', 'Isahella', 'Bastide', null, 'even-keeled', 'Janith', 'Benettelli', null, 'Persistent', 'Jarred', 'Dominichetti', null, 'Object-based', 'Cherin', 'Berr', null, 'definition', 'Lennie', 'Causton', null, 'matrix', 'Brnaby', 'Dionisetti', null, 'context-sensitive', 'Cele', 'Doberer', null, 'mobile', 'Joachim', 'Vasiljevic', null, 'non-volatile', 'Ashli', 'Lamberts', null, 'leading edge', 'Enos', 'Pieracci', null, 'transitional', 'Budd', 'Tomkys', null, 'hub', 'Marybeth', 'Lassey', null, 'well-modulated', 'Matthias', 'Crownshaw', null, 'Face to face', 'Kaspar', 'Sherwen', null, 'Secured', 'Linell', 'Brumwell', null, 'Enhanced', 'Ambur', 'Driutti', null, 'Intuitive', 'Billy', 'Chalcroft', null, 'project', 'Gherardo', 'Lindeberg', null, 'monitoring', 'Giuditta', 'Wrate', null, 'monitoring', 'Sky', 'Biasetti', null, 'local area network', 'Curcio', 'Choak', null, 'Horizontal', 'Marleah', 'Friatt', null, 'Fully-configurable', 'Connie', 'Toland', null, 'Quality-focused', 'Wally', 'Poynser', null, 'client-driven', 'Ward', 'Edison', null, 'empowering', 'Tania', 'Moulsdall', null, 'encryption', 'Hobie', 'McCarroll', null, 'systematic', 'Axe', "O'Dowd", null, 'contextually-based', 'Westbrooke', 'Brabbs', null, 'Synergistic', 'Noll', 'Gariff', null, 'User-centric', 'Adriane', 'Duckett', null, 'structure', 'Jolie', 'Biglin', null, 'dynamic', 'Allene', 'Kitchingman', null, 'function', 'Karel', 'Minshull', null, 'optimal', 'Milli', 'Capaldo', null, 'Enhanced', 'Shurlocke', 'Bulbrook', null, 'hub', 'Audrey', 'Ewbanck', null, 'data-warehouse', 'Emilie', 'Snelle', null, 'hardware', 'Benyamin', 'de Keyser', null, 'Front-line', 'Revkah', 'Archibold', null, 'Grass-roots', 'Ingrim', 'Wall', null, 'circuit', 'Julio', 'Davidowsky', null, 'portal', 'Heindrick', 'Eastgate', null, 'protocol', 'Calla', 'Bynold', null, 'background', 'Tabbi', 'Bonicelli', null, 'intermediate', 'Kleon', 'Kemmey', null, 'well-modulated', 'Denyse', 'Ginie', null, 'Persevering', 'Terrel', 'Dawkes', null, 'system engine', 'Shea', 'Spurnier', null, 'function', 'Demetra', 'Roizin', null, 'open architecture', 'Roselin', 'Tallach', null, 'moratorium', 'Kissie', 'Robardet', null, 'project', 'Erv', 'Cockren', null, 'neural-net', 'Clywd', 'Kivlin', null, 'installation', 'Kyle', 'Abrami', null, 'real-time', 'Elwyn', 'Peppin', null, 'tertiary', 'Donetta', 'Leaburn', null, 'multi-state', 'Clayborn', 'Hulles', null, 'installation', 'Edlin', 'Dumberell', null, 'initiative', 'Anny', 'Fance', null, 'installation', 'Willey', 'Scripture', null, 'Synergized', 'Conrade', 'Penhaligon', null, 'challenge', 'Christalle', 'Ambrosio', null, 'optimal', 'Malynda', 'Natalie', null, 'algorithm', 'Mae', 'Caughte', null, 'De-engineered', 'Cathi', 'Badger', null, 'budgetary management', 'Clem', 'Fishley', null, 'definition', 'Glynnis', 'Glendining', null, 'Re-engineered', 'Cyrus', 'Aronow', null, 'customer loyalty', 'Mehetabel', 'Siley', null, 'Exclusive', 'Benjamen', 'Karlqvist', null, '6th generation', 'Lorri', 'Blumson', null, 'empowering', 'Letta', 'Iamittii', null, 'Business-focused', 'Mose', 'Blaske', null, 'collaboration', 'Flem', 'Selliman', null, 'Synergized', 'Belia', 'Chicotti', null, 'Networked', 'Franky', 'Sheaber', null, 'cohesive', 'Gianna', 'Busson', null, 'Networked', 'Cecilio', 'Douthwaite', null, 'model', 'Joelie', 'Node', null, 'optimizing', 'Kiley', 'Hartlebury', null, 'actuating', 'Ellary', "O'Lagene", null, 'stable', 'Tades', 'Tewes', null, 'motivating', 'Rouvin', 'Jean', null, 'Advanced', 'Bryant', 'Jacobsz', null, 'Business-focused', 'Rab', 'Haymes', null, 'context-sensitive', 'Debi', 'Bernardeau', null, 'Distributed', 'Kally', 'Habbeshaw', null, 'responsive', 'Grissel', 'Mullard', null, 'Customizable', 'Margeaux', 'Bode', null, 'hardware', 'Kristos', 'Mealand', null, 'impactful', 'Rayshell', 'Lorek', null, 'responsive', 'Celeste', 'Maltby', null, 'Polarised', 'Claiborne', 'Sundin', null, 'artificial intelligence', 'Aland', 'Darton', null, 'fresh-thinking', 'Carmelina', 'Dumberell', null, 'Implemented', 'Gwenette', 'Royall', null, 'systemic', 'Egan', 'Ball', null, 'context-sensitive', 'Chance', 'Shakshaft', null, 'User-centric', 'Lilli', 'McKeown', null, 'user-facing', 'Garek', 'de la Valette Parisot', null, 'benchmark', 'Louise', 'Sweetnam', null, 'intangible', 'Harman', 'Summerfield', null, 'Future-proofed', 'Claresta', 'Faiers', null, 'internet solution', 'Heather', 'Lamberti', null, 'functionalities', 'Holly', 'MacAndreis', null, 'Sharable', 'Westley', 'Abbets', null, 'Cross-platform', 'Haskel', 'Kitley', null, 'Innovative', 'Quintin', 'MacClay', null, 'migration', 'Arron', 'De Bruin', null, 'Adaptive', 'Radcliffe', 'Sexti', null, 'customer loyalty', 'Larry', 'Geely', null, 'asymmetric', 'Leanora', "O'Neary", null, 'projection', 'Pattin', 'Jardine', null, '24 hour', 'Roderich', 'Maben', null, 'clear-thinking', 'Miquela', 'Heninghem', null, 'tertiary', 'Catherina', 'Rafter', null, '6th generation', 'Saunders', 'Volonte', null, 'Advanced', 'Bee', 'Trazzi', null, 'Customizable', 'Rex', 'McQuade', null, 'Innovative', 'Millie', 'Tulley', null, 'encompassing', 'Kittie', 'Sains', null, 'Profound', 'Lizzie', 'Ebbin', null, 'intangible', 'Ludovika', 'Nolder', null, 'Object-based', 'Hanson', 'Maffucci', null, 'Polarised', 'Ricky', 'Carrel', null, 'Team-oriented', 'Oralee', 'Bullen', null, 'Exclusive', 'Baxter', 'Capell', null, 'homogeneous', 'Averill', 'Davidi', null, 'access', 'Liz', 'Breadmore', null, 'eco-centric', 'Kare', 'Ottey', null, 'info-mediaries', 'Aundrea', 'Litherland', null, 'Business-focused', 'Avie', 'Coltart', null, 'bi-directional', 'Edy', 'Kinsella', null, 'concept', 'Marcy', 'Ceney', null, 'Diverse', 'Lianna', 'Hallgate', null, 'function', 'Kamila', 'Cave', null, 'projection', 'Carie', 'Laffoley-Lane', null, 'Profit-focused', 'Isidor', 'Dunnan', null, 'encompassing', 'Fernando', 'Pyle', null, 'Customer-focused', 'Darline', 'Dugdale', null, 'coherent', 'Gertie', 'Merryman', null, 'heuristic', 'Horatius', 'Wermerling', null, 'User-friendly', 'Demott', 'Geddes', null, 'Decentralized', 'Klarrisa', 'Sang', null, 'Virtual', 'Ceil', 'Morrallee', null, 'systematic', 'Khalil', 'Maffetti', null, 'tertiary', 'Willow', 'Fass', null, 'Public-key', 'Cora', 'Patmore', null, 'Quality-focused', 'Land', 'Permain', null, 'installation', 'Reta', 'Snoday', null, 'Persistent', 'Isidore', 'Tarbard', null, 'actuating', 'Rolph', 'Moodie', null, 'contingency', 'Merle', 'Gowenlock', null, '24 hour', 'Nerta', 'Springthorp', null, '24 hour', 'Clair', 'Strase', null, 'static', 'Tracie', 'Oty', null, 'heuristic', 'Georg', 'Christal', null, 'secured line', 'Guy', 'Goulthorp', null, 'Open-source', 'Vlad', 'August', null, '4th generation', 'Vanda', 'Crane', null, 'Customizable', 'Letta', 'Gillimgham', null, 'stable', 'Merry', 'Tomsa', null, 'coherent', 'Leola', 'Tremblett', null, 'bifurcated', 'Domenic', 'Brownlow', null, 'infrastructure', 'Dugald', 'Defrain', null, 'Profit-focused', 'Conrad', 'Theunissen', null, 'high-level', 'Torrey', 'Silk', null, 'Grass-roots', 'Arni', 'Duesbury', null, 'dedicated', 'Jessalin', 'Krebs', null, 'Profound', 'Brocky', 'Pasek', null, 'Polarised', 'Clemmie', 'Blood', null, 'content-based', 'Lanny', 'Trorey', null, 'function', 'Kalvin', 'Noonan', null, 'frame', 'Donia', 'Kenworthey', null, 'firmware', 'Halie', 'Pardi', null, 'bi-directional', 'Aubry', 'Ninnotti', null, 'Multi-channelled', 'Annamarie', 'Trundell', null, 'Intuitive', 'Brockie', 'Water', null, 'Right-sized', 'Rosamund', 'MacDonogh', null, 'parallelism', 'Trumann', 'Angrock', null, 'matrices', 'Carling', 'Piddlehinton', null, 'Automated', 'Dane', 'Condict', null, 'core', 'Constancia', 'Springate', null, 'context-sensitive', 'Harlin', 'Iggalden', null, 'Optimized', 'Aluino', 'Cripin', null, 'Multi-layered', 'Fernande', 'Rigler', null, 'matrix', 'Hendrick', 'Robberecht', null, 'groupware', 'Quintus', 'Clair', null, 'Exclusive', 'Joletta', 'Moores', null, 'concept', 'Berri', 'Tidbold', null, 'transitional', 'Hazel', 'Coatham', null, 'algorithm', 'Derk', 'Wandless', null, 'Pre-emptive', 'Marley', 'Gainor', null, 'Face to face', 'Benji', 'De Beauchemp', null, 'fault-tolerant', 'Gabrila', 'Schollick', null, 'workforce', 'Win', 'Tunnow', null, 'zero administration', 'Jonathon', 'Seville', null, 'local', 'Hillery', 'Petrelluzzi', null, 'alliance', 'Mariska', 'Lomb', null, 'mobile', 'Hayyim', 'Whitechurch', null, 'needs-based', 'Valentino', 'Kyne', null, 'encryption', 'Panchito', 'Peskett', null, 'standardization', 'Larissa', 'Rummery', null, 'alliance', 'Courtenay', 'Mayo', null, 'zero tolerance', 'Anabal', 'Stobbe', null, 'high-level', 'Nerta', 'Marritt', null, 'asynchronous', 'Marco', 'Haythorne', null, 'Triple-buffered', 'Adeline', 'Scrivens', null, 'Adaptive', 'Caralie', 'MacGille', null, 'Versatile', 'Gaynor', "O'Doogan", null, 'Synergized', 'Murry', 'Epinoy', null, 'Open-architected', 'Dalenna', 'Collinette', null, 'frame', 'Byrle', 'Menault', null, 'hardware', 'Talya', 'Darington', null, 'Public-key', 'Lira', 'MacCardle', null, 'methodical', 'Marrissa', 'Czyz', null, 'multimedia', 'Gerhardt', 'Smitherham', null, 'architecture', 'Benedick', 'Antic', null, 'local area network', 'Seamus', 'Radki', null, 'service-desk', 'Agnese', 'Deppe', null, 'orchestration', 'Zerk', 'Duligall', null, 'Synergistic', 'Jenny', 'Avo', null, 'hierarchy', 'Tabitha', 'Jenman', null, 'Reduced', 'Clea', 'Shera', null, 'bi-directional', 'Morrie', 'MacCumeskey', null, 'superstructure', 'Kris', 'Quest', null, 'throughput', 'Oran', 'Rout', null, 'firmware', 'Annis', 'Betham', null, 'Integrated', 'Allin', 'Hostan', null, 'Self-enabling', 'Warden', 'Sagg', null, 'parallelism', 'Kendall', 'Murdy', null, 'pricing structure', 'Durante', 'McMurray', null, 'regional', 'Berry', 'Souley', null, 'Profound', 'Naoma', 'Crace', null, 'grid-enabled', 'Ives', 'Jamieson', null, 'emulation', 'Odele', 'Kivell', null, 'Implemented', 'Malory', 'Wallbutton', null, 'Customizable', 'Cale', 'Wagenen', null, 'customer loyalty', 'Karl', 'Rattery', null, 'protocol', 'Gerty', 'Smelley', null, 'Expanded', 'Pip', 'Mothersole', null, '5th generation', 'Arlana', 'Danielski', null, 'next generation', 'Yule', 'Shitliffe', null, 'Cross-platform', 'Theobald', 'Reddyhoff', null, 'maximized', 'Kerianne', 'Lythgoe', null, 'Networked', 'Zedekiah', 'Hawsby', null, 'Visionary', 'Randell', 'Leathwood', null, 'complexity', 'Franchot', 'Cumine', null, 'knowledge base', 'Corbet', 'Muff', null, 'Right-sized', 'Christoffer', 'Gecke', null, 'disintermediate', 'Briana', 'Laskey', null, 'intranet', 'Angus', 'Artist', null, 'pricing structure', 'Jodie', 'Kittel', null, 'holistic', 'Dorelia', 'McIlenna', null, 'Team-oriented', 'Brandy', 'Shaplin', null, 'Seamless', 'Morrie', 'De Mico', null, 'circuit', 'Flory', 'Dows', null, 'Digitized', 'Tess', 'Chetwin', null, 'Profound', 'Kinny', 'Zamora', null, 'secondary', 'Tracy', 'Kleinplac', null, 'hub', 'Uta', 'Lydiate', null, 'secondary', 'Vera', 'Loan', null, 'collaboration', 'Benni', 'Penniell', null, 'zero defect', 'Reggis', 'Holdforth', null, 'frame', 'Adria', 'Monte', null, 'contingency', 'Faith', 'Chedzoy', null, 'archive', 'Ingrid', 'Graser', null, '5th generation', 'Enriqueta', 'Tie', null, 'radical', 'Gasper', 'Teenan', null, 'parallelism', 'Fifine', 'Lahiff', null, 'system engine', 'Sophi', 'Fealy', null, '6th generation', 'Joshia', 'Caurah', null, 'collaboration', 'Branden', 'Byard', null, 'product', 'Dyann', 'Tibb', null, 'support', 'Loni', 'Wenn', null, 'maximized', 'Marleah', 'Sail', null, 'Balanced', 'Stanislaus', 'Fley', null, 'Ergonomic', 'Pascale', 'Furst', null, 'maximized', 'Gus', 'Draijer', null, 'Phased', 'Blake', 'Nannini', null, 'matrices', 'Anthea', 'Faloon', null, 'stable', 'Alexandr', 'Dargie', null, 'impactful', 'Nickolas', 'Losemann', null, 'Function-based', 'Ruttger', 'Summerfield', null, 'support', 'Tanhya', 'Somerville', null, 'Configurable', 'Von', 'Brasher', null, 'Robust', 'Gal', 'Coverly', null, 'Multi-layered', 'Olly', 'Piola', null, 'parallelism', 'Roxanna', 'Brunesco', null, 'Innovative', 'Elias', 'Barehead', null, 'groupware', 'Cozmo', 'Aleksich', null, 'Object-based', 'Had', 'Parsall', null, 'website', 'Jessamine', 'Parsonson', null, 'Realigned', 'Erinn', 'Harrad', null, 'mobile', 'Trudy', 'Ternott', null, 'background', 'Leighton', 'Newick', null, 'application', 'Flem', 'Sabater', null, 'model', 'Horton', 'Luthwood', null, 'pricing structure', 'Yuma', 'Laxston', null, 'leading edge', 'Quintana', 'Barnwall', null, 'bandwidth-monitored', 'Ulrikaumeko', 'Ruter', null, 'Customizable', 'Stephana', 'Djurkovic', null, 'implementation', 'Agna', 'Freak', null, 'conglomeration', 'Faith', 'Courtman', null, 'exuding', 'Vassili', 'Novakovic', null, 'mobile', 'Issi', 'Vale', null, 'Intuitive', 'Olenolin', 'Wogdon', null, 'Triple-buffered', 'Nerte', 'Oglevie', null, 'directional', 'Conrad', 'Lanney', null, 'uniform', 'Glenden', 'Bauduccio', null, 'methodology', 'Booth', 'Gherarducci', null, 'Ergonomic', 'Row', 'Bosch', null, 'Multi-layered', 'Riordan', 'La Croce', null, 'Reduced', 'Brandy', 'Whicher', null, 'Fully-configurable', 'Gaultiero', 'McLay', null, 'parallelism', 'Stanly', 'Marquis', null, 'firmware', 'Jany', 'Byas', null, 'attitude-oriented', 'Noam', 'Shambroke', null, 'directional', 'Susy', 'Spratt', null, 'User-friendly', 'Goddart', 'Mayling', null, 'superstructure', 'Delila', 'Hankins', null, 'encoding', 'Rab', 'Devine', null, 'contingency', 'Engracia', 'Gradon', null, 'forecast', 'Allyn', 'Steljes', null, 'intermediate', 'Rolando', 'Bernat', null, 'discrete', 'Adamo', 'Boyles', null, 'Monitored', 'Brittan', 'Hollyman', null, 'Object-based', 'Leeland', 'Opie', null, 'Cross-group', 'Chrysa', 'Fairpool', null, 'system engine', 'Bernetta', 'Veivers', null, 'optimizing', 'Kate', 'Gullan', null, 'Intuitive', 'Flossie', 'Claiton', null, 'complexity', 'Marga', 'Baude', null, 'complexity', 'Teodoro', 'Philliphs', null, 'impactful', 'Hilary', 'Cottier', null, 'multi-tasking', 'Cord', 'Galliard', null, 'Public-key', 'Lisabeth', 'Fish', null, 'array', 'Cad', 'Merrin', null, 'Vision-oriented', 'Evvie', 'Gillum', null, 'Persistent', 'Ethe', 'Glashby', null, 'Digitized', 'Ham', 'Vallender', null, 'interactive', 'Dulciana', 'Andrysiak', null, 'adapter', 'Powell', 'Mar', null, 'Configurable', 'Dollie', 'Hurdidge', null, 'Stand-alone', 'Conchita', 'Twatt', null, 'zero defect', 'Hi', 'Sherbrook', null, 'Face to face', 'Lonnard', 'Hegdonne', null, 'systemic', 'Konrad', 'Jewes', null, 'Expanded', 'Freemon', 'Aldus', null, 'Synchronised', 'Adeline', 'Sauvan', null, 'Secured', 'Jodi', 'Creegan', null, 'Self-enabling', 'Crista', 'Bussen', null, 'utilisation', 'Wilek', 'Leavesley', null, 'multimedia', 'Steffane', 'Freshwater', null, '3rd generation', 'Gil', 'Ramberg', null, 'Multi-layered', 'Hazlett', 'Matiasek', null, 'interface', 'Odell', 'Boldock', null, 'Balanced', 'Deck', 'Gorner', null, 'holistic', 'Yasmin', 'Rowlatt', null, 'ability', 'Guendolen', "O'Hagerty", null, 'neural-net', 'Brian', 'Elden', null, 'Reduced', 'Calida', 'Bemment', null, 'Distributed', 'Dickie', 'Mott', null, 'secured line', 'Lloyd', 'Monelle', null, 'Cross-platform', 'Glennie', 'Corson', null, 'Cross-platform', 'Aubry', 'Jojic', null, 'Multi-tiered', 'Sutherland', 'MacIlraith', null, 'asynchronous', 'Percy', 'Kitlee', null, 'Versatile', 'Elnora', 'Madine', null, 'web-enabled', 'Kitti', 'Greenman', null, 'Secured', 'Akim', 'Waller', null, 'Integrated', 'Corene', 'Sale', null, 'tertiary', 'Rorie', 'Muirhead', null, 'Customizable', 'Alejandro', 'McDuffy', null, 'superstructure', 'Nevins', 'Sandford', null, 'task-force', 'Charlotte', 'Roswarn', null, 'pricing structure', 'Barbette', 'Norval', null, 'stable', 'Ardra', 'Lorek', null, 'eco-centric', 'Rubie', 'Proven', null, 'superstructure', 'Moira', 'Syseland', null, 'data-warehouse', 'Murielle', 'Banat', null, 'moderator', 'Armand', 'Cawse', null, 'Stand-alone', 'Gale', 'Cars', null, 'User-friendly', 'Rance', 'Leamon', null, 'executive', 'Barde', 'Rosenfarb', null, 'project', 'Keslie', 'Callinan', null, 'Monitored', 'Nedda', 'Anyene', null, 'process improvement', 'Jamill', 'Harvison', null, 'even-keeled', 'Vonny', 'Gerssam', null, 'Right-sized', 'Winnah', 'Gladeche', null, 'non-volatile', 'Lissi', 'Jeffree', null, 'frame', 'Guillermo', 'Glass', null, 'installation', 'Emily', 'Zoppie', null, 'service-desk', 'Annaliese', 'Davall', null, 'background', 'Homerus', 'Rowell', null, 'regional', 'Gabriele', 'McKeachie', null, 'encoding', 'Philippine', 'Versey', null, 'Multi-tiered', 'Hartwell', 'Knaggs', null, 'executive', 'Gunilla', 'Elwood', null, 'Self-enabling', 'Cyndi', 'Mulrenan', null, 'protocol', 'Nan', 'Izzat', null, 'local', 'Corby', 'Hobble', null, 'benchmark', 'Elmer', 'Ingree', null, 'Re-contextualized', 'Delinda', 'Terrelly', null, 'database', 'Ofella', 'Derges', null, 'Self-enabling', 'Rickie', 'Alans', null, 'systematic', 'Sauveur', 'Tomet', null, 'matrix', 'Jody', 'Greet', null, 'local area network', 'Archaimbaud', 'Waskett', null, 'user-facing', 'Berget', 'Kemball', null, 'Fundamental', 'Jourdain', 'Moen', null, 'upward-trending', 'Maryrose', 'Oxlade', null, 'user-facing', 'Anallese', 'Petrushka', null, '4th generation', 'Maison', 'Schooley', null, 'static', 'Tuck', 'Ramsbottom', null, 'Up-sized', 'Lorilee', 'Sallings', null, 'modular', 'Port', 'Lyford', null, 'capability', 'Becki', 'Munt', null, 'Face to face', 'Tybalt', 'Yates', null, 'methodical', 'Viviene', 'Tejero', null, 'adapter', 'Camilla', 'Manoelli', null, 'Phased', 'Camellia', 'Usherwood', null, 'focus group', 'Mignon', 'Baack', null, 'Object-based', 'Gloriane', 'Mehmet', null, 'Managed', 'Verine', 'Jenks', null, '3rd generation', 'Goober', 'Lepick', null, 'coherent', 'Hedy', 'Burren', null, 'zero tolerance', 'Floyd', 'Twiddy', null, 'disintermediate', 'Tabbatha', 'Fooks', null, 'asynchronous', 'Sebastien', 'Madelin', null, 'national', 'Kassey', 'Leates', null, 'model', 'Selle', 'Braidwood', null, 'Programmable', 'Raffaello', 'Bensley', null, 'data-warehouse', 'Raye', 'Caldaro', null, 'Enhanced', 'Jeff', 'Currall', null, 'intranet', 'Rawley', 'Love', null, 'approach', 'Lillian', 'Muckart', null, 'moderator', 'Bren', 'Glasspoole', null, 'grid-enabled', 'Silvio', 'Brant', null, 'standardization', 'Carlyn', 'Burkman', null, 'Advanced', 'Stanton', 'Coe', null, 'portal', 'Constancia', 'Dillestone', null, 'archive', 'Donal', 'Skittle', null, 'local', 'Debi', 'Gibbeson', null, 'paradigm', 'Gabi', 'Kiehl', null, 'tertiary', 'Nevil', 'McGreay', null, 'Exclusive', 'Paule', 'Angel', null, 'global', 'Timothee', 'Berwick', null, 'task-force', 'Gabrielle', 'Dearsley', null, 'didactic', 'Miguela', 'Matthiesen', null, 'neutral', 'Curt', 'Keigher', null, 'Organic', 'Lila', 'Lieb', null, 'Intuitive', 'Brendon', 'Martelet', null, 'Virtual', 'Yorke', 'Deetch', null, 'directional', 'Innis', 'Hendin', null, 'Customizable', 'Berke', 'McCrillis', null, 'Public-key', 'Emerson', 'Harvard', null, 'transitional', 'Gene', 'Ferrea', null, 'architecture', 'Yoshiko', 'Ordidge', null, 'parallelism', 'Burty', 'Stuckey', null, 'methodology', 'Janifer', 'Blankman', null, 'open system', 'Christy', 'Bicksteth', null, 'multimedia', 'Cheston', 'Tynewell', null, 'optimizing', 'Kiah', 'Sudron', null, 'framework', 'Nady', 'Rossander', null, '6th generation', 'Frazier', 'Faust', null, 'functionalities', 'Angeli', 'Leftwich', null, 'Quality-focused', 'Errick', 'Coxwell', null, 'installation', 'Alan', 'Knifton', null, 'initiative', 'Halsy', 'Strippel', null, 'conglomeration', 'Ludvig', 'Ransley', null, 'Exclusive', 'Jamie', 'Moizer', null, 'zero administration', 'Christophe', 'Rawcliffe', null, 'Optimized', 'Gerick', 'Massimi', null, 'explicit', 'Angela', 'Adanez', null, 'definition', 'Rhona', 'Neller', null, 'maximized', 'Calla', 'Brumham', null, '24/7', 'Lorianne', 'Cosby', null, 'Automated', 'Brenna', 'Gianni', null, 'Self-enabling', 'Beitris', 'Gavrielli', null, 'Multi-channelled', 'Colline', 'Antoszczyk', null, 'Optional', 'Alard', 'Haestier', null, 'collaboration', 'Kaiser', 'MacConneely', null, 'budgetary management', 'Egbert', 'Cadigan', null, 'system engine', 'Alfy', 'Delete', null, 'Front-line', 'Jacklyn', 'Sweetman', null, '5th generation', 'Marcellus', 'Gonzalvo', null, 'moderator', 'Alexandrina', 'Corona', null, 'approach', 'Efrem', 'Staniland', null, 'Decentralized', 'Duane', 'Olsen', null, 'Configurable', 'Teri', 'Brumby', null, 'intermediate', 'Damian', 'Fullalove', null, 'success', 'Petronilla', 'Renon', null, 'implementation', 'Libby', 'Leathley', null, 'Profit-focused', 'My', 'Bayne', null, 'encoding', 'Jordana', 'Ravenshear', null, 'heuristic', 'Anetta', 'Parrot', null, 'Seamless', 'Ardella', 'Hourahan', null, 'policy', 'Danny', 'McWilliams', null, 'bi-directional', 'Ravid', 'Mesias', null, 'structure', 'Gibby', 'Gellately', null, 'software', 'Lettie', 'Shatford', null, 'Persistent', 'Natal', 'Dell Casa', null, 'middleware', 'Enoch', 'Lawee', null, 'alliance', 'Janka', 'Chevin', null, 'optimal', 'Danila', 'Spurrett', null, 'frame', 'Melissa', 'Behling', null, 'intangible', 'Laurens', 'Northleigh', null, 'Open-architected', 'Piotr', 'Chopping', null, 'executive', 'Odey', 'Shave', null, 'mission-critical', 'Paolina', 'Grindley', null, 'Upgradable', 'Kile', 'Stonehouse', null, 'needs-based', 'Zane', 'Andrichuk', null, 'Synergized', 'Barbee', 'Zupone', null, 'actuating', 'Gan', 'Rennock', null, 'dedicated', 'Trey', 'Thorndycraft', null, 'regional', 'Guglielmo', 'Spritt', null, 'portal', 'Omar', 'Pina', null, 'instruction set', 'Thatcher', 'Maasze', null, 'Persistent', 'Cirilo', 'MacPaik', null, '6th generation', 'Hirsch', 'Whitcomb', null, 'Function-based', 'Cully', 'Wilhelmy', null, 'knowledge user', 'Rodger', 'Whiston', null, 'Multi-channelled', 'Chiquia', 'Bicknell', null, 'User-centric', 'Renie', 'Dungate', null, 'Mandatory', 'Devina', 'Bruntjen', null, 'Triple-buffered', 'Linoel', 'Edgell', null, 'Optimized', 'Hildagard', 'Saladino', null, 'initiative', 'Susi', 'Walentynowicz', null, 'policy', 'Rosalyn', 'Warbeys', null, 'national', 'Minnnie', 'Moral', null, 'forecast', 'Tiler', 'Slaney', null, 'definition', 'Felicle', 'Shepstone', null, '4th generation', 'Ree', 'Waters', null, 'forecast', 'Alexina', 'Overstall', null, 'grid-enabled', 'Sonya', 'Bisacre', null, 'parallelism', 'Deanne', 'Corpes', null, 'toolset', 'Tresa', 'Hanhard', null, 'mobile', 'Norma', 'Vondrys', null, 'hardware', 'Lockwood', 'Beevis', null, 'application', 'Alica', 'Edlin', null, 'intranet', 'Avril', 'Dymock', null, 'implementation', 'Adrian', 'Addicott', null, 'concept', 'Augustine', 'Leger', null, 'well-modulated', 'Merv', 'Woolland', null, 'content-based', 'Jimmy', 'Holberry', null, 'artificial intelligence', 'Stefa', 'MacKenney', null, 'Optimized', 'Petr', 'Ifill', null, 'portal', 'Fifi', 'Jubert', null, 'Implemented', 'Shelli', 'Vearnals', null, 'Integrated', 'Joye', 'Cove', null, 'Robust', 'Gypsy', 'Lowen', null, 'Vision-oriented', 'Barn', 'Purry', null, 'product', 'Rhett', 'Barrabeale', null, 'Triple-buffered', 'Helenelizabeth', 'McDuall', null, 'knowledge base', 'Codi', 'Pascow', null, 'alliance', 'Janeta', 'Cornils', null, 'Cross-platform', 'Donnell', 'Tybalt', null, 'transitional', 'Prisca', 'Trimble', null, 'paradigm', 'Victor', 'Stachini', null, 'Operative', 'Stuart', 'Got', null, 'firmware', 'Merola', 'Legg', null, 'Innovative', 'Gwenore', 'McNickle', null, 'Seamless', 'Rossie', 'Petkens', null, 'bottom-line', 'Harper', 'Andrelli', null, 'bi-directional', 'Rita', 'Curds', null, 'bottom-line', 'Leigha', 'Bowart', null, 'Enhanced', 'Sorcha', 'Nudde', null, 'Ergonomic', 'Jaquelyn', 'Gottelier', null, 'Reactive', 'Editha', 'Sammons', null, 'national', 'Bar', 'Blackboro', null, 'Profit-focused', 'Ralf', 'Gero', null, 'radical', 'Nicolai', 'Boddis', null, 'eco-centric', 'Harwell', 'Bygott', null, 'task-force', 'Iosep', 'Jayes', null, 'Operative', 'Murry', 'Freer', null, 'foreground', 'Clementia', 'Noddles', null, 'contextually-based', 'Dov', 'Edgeley', null, 'task-force', 'Stearn', 'Stuchbery', null, 'Persevering', 'Rossy', 'Orvis', null, 'Secured', 'Deina', 'Fibbitts', null, 'Fully-configurable', 'Teodor', 'Laity', null, 'mobile', 'Goddard', 'Scoon', null, 'productivity', 'Constantina', 'Olivello', null, 'logistical', 'Kippy', 'Tromans', null, 'Exclusive', 'Emmett', 'Letchford', null, 'utilisation', 'Heidi', 'De Freyne', null, 'Compatible', 'Dodi', 'MacKenny', null, 'Organic', 'Alford', 'Colmer', null, 'Persevering', 'Kally', 'Kirke', null, 'framework', 'Timi', 'Graalman', null, 'cohesive', 'Morgun', 'Scullard', null, 'dedicated', 'Fairfax', 'Hedling', null, 'budgetary management', 'Judie', 'Topper', null, 'secured line', 'Jock', 'Rameau', null, 'database', 'Clive', 'Cookes', null, 'open system', 'Derry', 'Mosten', null, 'Ameliorated', 'Riannon', 'Haycox', null, 'collaboration', 'Todd', 'Bowich', null, 'info-mediaries', 'Brook', 'Grunnill', null, 'Operative', 'Esmaria', 'Ryson', null, 'Enhanced', 'Dunn', 'Burdon', null, 'architecture', 'Miguela', 'Monckton', null, 'multi-state', 'Jany', 'Gethings', null, 'clear-thinking', 'Lorelei', 'Ivanikhin', null, 'migration', 'Grannie', 'Sandiland', null, 'Universal', 'Ogdon', 'Chadburn', null, 'structure', 'Westley', 'Elvish', null, 'real-time', 'Jacquelyn', "O'Hegertie", null, 'Configurable', 'Magdalene', 'Durno', null, 'open system', 'Theodore', 'Saur', null, 'cohesive', 'Lanie', 'Peek', null, 'real-time', 'Cort', 'Clayworth', null, 'policy', 'Emmery', 'Saffon', null, 'initiative', 'Cyril', 'Pembery', null, 'high-level', 'Rene', 'Pavic', null, 'systematic', 'Dione', 'Bence', null, 'Front-line', 'Ravid', 'Breache', null, 'focus group', 'Tiphani', 'Nesterov', null, 'orchestration', 'Lily', 'Gerding', null, 'Synergized', 'Evelin', 'Hounsom', null, 'eco-centric', 'Jasper', 'Sysland', null, 'leading edge', 'Rudolph', 'Rogerot', null, 'cohesive', 'Gilbertina', 'Moorman', null, 'application', 'Vida', 'Caves', null, 'superstructure', 'Ambrosio', 'Snowsill', null, 'bi-directional', 'Courtnay', 'Reede', null, 'array', 'Perceval', 'Maunder', null, 'collaboration', 'Hagan', 'Pedel', null, 'implementation', 'Kate', 'de la Valette Parisot', null, 'Stand-alone', 'Lutero', 'Bladder', null, 'Function-based', 'Lilian', 'Alcido', null, 'monitoring', 'Sonia', 'Maylam', null, 'structure', 'Ronny', 'Went', null, 'Enhanced', 'Neila', 'Rapps', null, 'optimal', 'Isobel', 'Salvati', null, 'local area network', 'Georgetta', 'Clearie', null, 'Integrated', 'Page', 'Padbery', null, 'infrastructure', 'Alverta', 'Petrillo', null, 'homogeneous', 'Katee', 'Briiginshaw', null, 'zero tolerance', 'Prue', 'Poller', null, 'secured line', 'Rex', 'Banasik', null, 'database', 'Yvon', 'Spurrier', null, 'artificial intelligence', 'Gustave', 'Messier', null, 'portal', 'Regan', 'Bollis', null, 'projection', 'Marco', 'Humpage', null, 'intranet', 'Kahlil', 'Normanton', null, 'Re-contextualized', 'Sheffie', 'Luddy', null, 'multimedia', 'Federico', 'Swinbourne', null, 'modular', 'Art', 'Paradine', null, 'analyzer', 'Corry', 'Hedlestone', null, 'complexity', 'Schuyler', 'Luck', null, 'needs-based', 'Farah', 'Haddock', null, 'Fundamental', 'Candy', 'Bercevelo', null, 'strategy', 'Lorraine', 'Pinwill', null, 'interface', 'Keelia', 'Shellcross', null, 'Future-proofed', 'Annie', 'Klimschak', null, 'Devolved', 'Albie', 'Limb', null, 'methodology', 'Chance', 'Bru', null, 'Profit-focused', 'Deloria', 'Tonn', null, 'Cross-group', 'Augustina', 'Sanbrooke', null, 'Open-architected', 'Ari', "O' Loughran", null, 'Reduced', 'Gray', 'Jermin', null, 'Upgradable', 'Cynthia', 'Drinkale', null, 'knowledge base', 'Garret', 'Duffett', null, 'dedicated', 'Doyle', 'Fitzhenry', null, 'approach', 'Lev', "O'Crowley", null, 'Optional', 'Koren', 'Piff', null, 'emulation', 'Aldous', 'Keel', null, 'contextually-based', 'Micky', 'Kubacki', null, 'Reduced', 'Horten', 'Ruberti', null, 'global', 'Astrid', 'Twydell', null, 'Secured', 'Dallon', 'Maingot', null, 'Optimized', 'Abbott', 'Siaspinski', null, '6th generation', 'Lyman', 'Geeve', null, 'support', 'Danila', 'Dukesbury', null, 'neutral', 'Bradan', 'Caton', null, 'Reverse-engineered', 'Obed', 'Challenor', null, 'Automated', 'Rhiamon', "D'Antoni", null, 'function', 'Caralie', 'Milnthorpe', null, 'Virtual', 'Rosina', 'Maudlen', null, 'Exclusive', 'Reinwald', 'Gilbride', null, 'zero administration', 'Bianca', 'Pound', null, 'Synergistic', 'Heywood', 'Bizzey', null, 'discrete', 'Ginnie', 'York', null, 'Reactive', 'Bailie', 'Ingreda', null, 'interactive', 'Appolonia', 'Murcott', null, 'Future-proofed', 'Humbert', 'Lademann', null, 'matrices', 'Eustace', 'McInulty', null, 'middleware', 'Jordain', 'Tisun', null, 'Phased', 'Doyle', 'Kleint', null, 'system engine', 'Blayne', 'Schimke', null, 'value-added', 'Berget', 'Caras', null, 'support', 'Helene', 'Blesing', null, 'real-time', 'Garland', 'Delete', null, 'multimedia', 'Kacey', 'Dionsetti', null, 'Devolved', 'Melony', 'Simmans', null, 'cohesive', 'Bari', 'Bilovus', null, 'executive', 'Tamarah', 'Schuchmacher', null, 'process improvement', 'Denys', 'Maycock', null, 'task-force', 'Monica', 'Canfer', null, 'needs-based', 'Jeremie', 'Martinec', null, 'toolset', 'Granthem', 'Murfin', null, 'zero tolerance', 'Eachelle', 'Byrcher', null, 'initiative', 'Cointon', 'Wearden', null, 'uniform', 'Blayne', 'Levinge', null, 'client-server', 'Eldridge', 'De Wolfe', null, 'local', 'Chadwick', 'Gaveltone', null, 'Team-oriented', 'Leroi', 'Robic', null, 'encryption', 'Ravid', 'Commins', null, 'orchestration', 'Taddeo', 'Chominski', null, 'Monitored', 'Damaris', 'Browne', null, 'Ergonomic', 'Noby', 'Pearl', null, 'Multi-layered', 'Missie', 'Gerwood', null, 'initiative', 'Olive', 'Clow', null, 'solution-oriented', 'Karilynn', 'Butt Gow', null, 'Phased', 'Helene', 'Baly', null, 'protocol', 'Saundra', 'Donaway', null, 'regional', 'Max', 'Bailess', null, 'Multi-lateral', 'Gasparo', 'Martlew', null, 'disintermediate', 'Chicky', 'Sweetland', null, 'exuding', 'Durward', 'Messam', null, 'Multi-channelled', 'Angie', 'Keach', null, 'Pre-emptive', 'Elsa', 'Kernan', null, 'Ergonomic', 'Benni', 'Borthwick', null, 'multi-state', 'Correy', 'Scroggins', null, '3rd generation', 'Kalie', 'Janse', null, 'intangible', 'Stormy', 'Zimek', null, 'Digitized', 'Thane', 'Fenelow', null, 'Profound', 'Grady', 'Toma', null, 'leading edge', 'Bartel', 'McGuggy', null, 'solution', 'Jyoti', 'Feltham', null, 'contingency', 'Linda', 'Filipiak', null, 'background', 'Reine', 'McKendo', null, 'array', 'Lusa', 'Lofthouse', null, 'Virtual', 'Malena', 'Juara', null, 'Reverse-engineered', 'Addie', 'Matt', null, 'maximized', 'Egor', 'Lober', null, 'Reverse-engineered', 'Andreana', 'Probert', null, 'Public-key', 'Ervin', 'Hannabus', null, 'bottom-line', 'Dorey', 'Spears', null, 'Graphical User Interface', 'Sandi', 'Stoak', null, 'service-desk', 'Bette', 'Aulds', null, 'Digitized', 'Forrester', 'Burnel', null, 'Fundamental', 'Terry', 'Todhunter', null, 'radical', 'Arlee', 'Borgne', null, 'web-enabled', 'Vivi', 'Peck', null, 'content-based', 'Vite', 'Van Baaren', null, 'client-driven', 'Mercy', 'Vamplers', null, 'utilisation', 'Sharlene', 'Keaton', null, 'Balanced', 'Josh', 'Winskill', null, 'Expanded', 'Mischa', 'Assinder', null, 'moratorium', 'Gustie', 'Flaubert', null, 'Automated', 'Elfrieda', 'Jarratt', null, 'utilisation', 'Tallie', 'Lockhurst', null, 'intranet', 'Roslyn', 'Fittis', null, 'parallelism', 'Jordan', 'Daviddi', null, 'regional', 'Patrizius', 'Sowerbutts', null, '6th generation', 'Simone', 'Sperling', null, 'secured line', 'Glen', 'Wilcocke', null, 'parallelism', 'Wynn', 'Oolahan', null, 'leverage', 'Kailey', 'Peebles', null, 'product', 'Libbey', 'Sissland', null, 'real-time', 'Wilbur', 'Over', null, 'Open-architected', 'Benedikt', 'Pilbeam', null, 'Customizable', 'Van', 'Riordan', null, 'synergy', 'Edan', 'Soppit', null, 'Mandatory', 'Teodor', 'Daunay', null, 'framework', 'Agathe', 'Jubb', null, 'open architecture', 'Ina', 'Bertlin', null, 'directional', 'Lulita', 'Vigietti', null, 'Graphical User Interface', 'Sawyere', 'Pyle', null, 'foreground', 'Loralie', 'Carsey', null, 'zero tolerance', 'Maureene', 'Aggio', null, 'strategy', 'Fabian', "O'Kieran", null, 'systemic', 'Ozzy', 'Cordle', null, 'parallelism', 'Bent', 'Crain', null, 'Ameliorated', 'Teddie', 'Kondratowicz', null, 'hybrid', 'Kyrstin', 'Rugiero', null, '24 hour', 'Aeriel', 'Bristow', null, 'support', 'Denna', 'Goodfellowe', null, 'Cloned', 'Vittoria', 'Barnett', null, 'task-force', 'Nixie', 'Lodemann', null, 'model', 'Tisha', 'Kubacek', null, 'scalable', 'Urson', 'Lethley', null, '5th generation', 'Calvin', 'Briereton', null, 'help-desk', 'Angie', 'Chatell', null, 'product', 'Pandora', 'Brabender', null, 'pricing structure', 'Aubrey', 'Vanini', null, 'intranet', 'Miranda', 'Hansell', null, 'architecture', 'Sybil', 'Furst', null, 'orchestration', 'Sylvan', 'Eddolls', null, 'application', 'Alec', 'Wharin', null, 'coherent', 'Sig', 'Forder', null, '3rd generation', 'Loydie', 'Tanton', null, 'encompassing', 'Trip', 'Cotes', null, 'client-driven', 'Ange', 'Hundley', null, 'application', 'Beverlie', 'Armour', null, 'solution', 'Dallon', 'Gallemore', null, 'Focused', 'Wilek', 'McIan', null, 'fault-tolerant', 'Odessa', 'Hembry', null, 'Managed', 'Cristabel', 'Soughton', null, 'methodical', 'Theadora', 'Millott', null, 'customer loyalty', 'Cirillo', 'Batisse', null, 'intermediate', 'Martainn', 'Hum', null, 'Fundamental', 'Brigitta', 'Argile', null, 'architecture', 'Madella', 'Jerwood', null, 'bottom-line', 'Ralf', 'Hillum', null, 'dedicated', 'Gwenette', 'Blasing', null, 'homogeneous', 'Richmound', 'Noon', null, '4th generation', 'Iver', 'Chaulk', null, 'application', 'Rolph', 'Bunting', null, 'solution-oriented', 'Emera', 'Relfe', null, 'array', 'Marybeth', 'Dradey', null, 'Pre-emptive', 'Taber', 'Burch', null, 'info-mediaries', 'Dalila', 'Fidian', null, 'actuating', 'Udell', 'Philler', null, 'projection', 'Justin', 'Braune', null, 'emulation', 'Philbert', 'Gillbe', null, 'hierarchy', 'Gray', 'Bushe', null, 'Programmable', 'Tish', 'Dandison', null, 'modular', 'Alley', 'Puller', null, 'Quality-focused', 'Peadar', 'Bye', null, 'Compatible', 'Jasun', 'Dwelly', null, 'client-server', 'Gerrilee', 'Kiddye', null, 'Triple-buffered', 'Cull', 'Lorenzo', null, 'Multi-channelled', 'Demetre', 'Beauman', null, 'website', 'Frasier', 'Philippou', null, 'Decentralized', 'Joni', 'McMearty', null, 'portal', 'Gris', 'Bleas', null, 'reciprocal', 'Sapphira', 'Croke', null, 'Compatible', 'Wood', 'Klaussen', null, 'knowledge base', 'Kellsie', 'Brideau', null, 'Versatile', 'Alfie', 'Ellinor', null, 'Innovative', 'Arleyne', 'Patershall', null, 'algorithm', 'Hazel', 'Kienle', null, 'Decentralized', 'Osborn', 'Hirschmann', null, 'executive', 'Nahum', 'Schulke', null, '4th generation', 'Nicky', 'Hedley', null, 'Secured', 'Mabelle', 'Kemmet', null, 'Team-oriented', 'Herta', 'Schurcke', null, 'structure', 'Abigail', 'Robecon', null, 'explicit', 'Jedediah', 'Macrae', null, 'leverage', 'Harris', 'Stanex', null, 'encompassing', 'Roderick', 'Doody', null, 'coherent', 'Christan', 'Paur', null, 'asynchronous', 'Aron', 'Leeburne', null, 'Versatile', 'Mariel', 'Bartlosz', null, 'Right-sized', 'Aldon', 'Duckham', null, 'Customer-focused', 'Niall', 'Cristofolini', null, 'Compatible', 'Aile', 'Rickaert', null, 'heuristic'];

},

// samples/grid/data/generator.ts @57
57: function(__fusereq, exports, module){
exports.__esModule = true;
var dummyData_1 = __fusereq(72);
class Generator {
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
      const x = {};
      x.index = this.totalGenerated;
      x.mod = Math.floor(this.totalGenerated / 10);
      x.number = Math.floor(Math.random() * 9000) + 0;
      x.bool = Math.floor(Math.random() * 9000) % 3 ? true : false;
      x.date = date;
      for (let i = 1; i < 75; i++) {
        x['word' + i] = data[random()];
      }
      dummyArray.push(x);
    }
    return dummyArray;
  }
}
exports.Generator = Generator;

},

// samples/grid/data/datasources.ts @24
24: function(__fusereq, exports, module){
exports.__esModule = true;
var datasource_1 = __fusereq(37);
var generator_1 = __fusereq(57);
const generator = new generator_1.Generator();
const EntityHandlerOverride = class extends datasource_1.EntityHandler {
  get(target, prop) {
    if (prop === 'superman') {
      return (target['word4'] || '') + ' - ' + (target['work5'] || '');
    } else {
      return super.get(target, prop);
    }
  }
  set(obj, prop, value) {
    if (prop === 'superman') {
      return false;
    } else {
      return super.set(obj, prop, value);
    }
  }
};
exports.WordDatasource01 = new datasource_1.DataContainer();
exports.WordDatasource01.overrideEntityHandler(EntityHandlerOverride);
exports.WordDatasource02 = new datasource_1.DataContainer();
exports.WordDatasource03 = new datasource_1.DataContainer();
exports.WordDatasource04 = new datasource_1.DataContainer();
exports.WordDatasource01.setData(generator.generateData(100));
exports.WordDatasource02.setData(generator.generateData(10));
exports.WordDatasource03.setData(generator.generateData(10));
function add(ds, howMany) {
  if (ds.setData) {
    ds.setData(generator.generateData(howMany), true);
  }
}
exports.add = add;
function set(ds, howMany) {
  if (ds.setData) {
    ds.setData(generator.generateData(howMany), false);
  }
}
exports.set = set;

},

// samples/grid/elements/sample-no1.ts @10
10: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var grid_1 = __fusereq(16);
var setup_1 = __fusereq(23);
var datasources_1 = __fusereq(24);
let x = setup_1.setup(1, 10, 100000);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.connector = new grid_1.GridInterface(x, datasources_1.WordDatasource01);
    this.connector.reloadDatasource();
    this.ds = this.connector.getDatasource();
  }
  render() {
    return lit_html_1.html`
            <div class="flex flex-row flex-grow h-full">
                <div class="flex-grow">
                    <data-buttons
                        class="flex flex-col"
                        .btnClass=${'p-2 m-2 bg-green-400'}
                        .type=${'add'}
                        .callback=${x => {
      datasources_1.add(this.ds, x);
    }}
                    ></data-buttons>

                    <data-buttons
                        class="flex flex-col"
                        .btnClass=${'p-2 m-2 bg-yellow-400'}
                        .type=${'set'}
                        .callback=${x => {
      datasources_1.set(this.ds, x);
    }}
                    ></data-buttons>

                    <nav-buttons
                        class="flex flex-col"
                        .btnClass=${'p-2 m-2 bg-indigo-400'}
                        .callback=${action => {
      this.ds[action]();
    }}
                    ></nav-buttons>
                </div>
                <span>${this.query}</span>
                <simple-html-grid
                    style="width:100%"
                    class="simple-html-grid w-full flex-grow"
                    .interface=${this.connector}
                >
                </simple-html-grid>
            </div>
        `;
  }
};
__fuse_decorate.d([core_1.property(), __fuse_decorate.m("design:type", String)], __DefaultExport__.prototype, "query", void 0);
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('sample-no1')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/grid/elements/sample-no2.ts @11
11: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var grid_1 = __fusereq(16);
var setup_1 = __fusereq(23);
var datasources_1 = __fusereq(24);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.connector = new grid_1.GridInterface(setup_1.setup(4, 20), datasources_1.WordDatasource02);
    this.connector.reloadDatasource();
    this.ds = this.connector.getDatasource();
  }
  render() {
    return lit_html_1.html`
            <div class="flex flex-row flex-grow h-full">
                <div class="flex-grow">
                    <data-buttons
                        class="flex flex-col"
                        .btnClass=${'p-2 m-2 bg-green-400'}
                        .type=${'add'}
                        .callback=${x => {
      datasources_1.add(this.ds, x);
    }}
                    ></data-buttons>

                    <data-buttons
                        class="flex flex-col"
                        .btnClass=${'p-2 m-2 bg-yellow-400'}
                        .type=${'set'}
                        .callback=${x => {
      datasources_1.set(this.ds, x);
    }}
                    ></data-buttons>

                    <nav-buttons
                        class="flex flex-col"
                        .btnClass=${'p-2 m-2 bg-indigo-400'}
                        .callback=${action => {
      this.ds[action]();
    }}
                    ></nav-buttons>
                </div>

                <simple-html-grid
                    style="width:100%"
                    class="simple-html-grid w-full flex-grow"
                    .interface=${this.connector}
                >
                </simple-html-grid>
            </div>
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('sample-no2')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/grid/elements/sample-no3.ts @12
12: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var grid_1 = __fusereq(16);
var setup_1 = __fusereq(23);
var datasources_1 = __fusereq(24);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.connector1 = new grid_1.GridInterface(setup_1.setup(1, 10), datasources_1.WordDatasource03);
    this.connector1.reloadDatasource();
    this.connector2 = new grid_1.GridInterface(setup_1.setup(1, 10), datasources_1.WordDatasource03);
    this.connector2.reloadDatasource();
    this.ds1 = this.connector1.getDatasource();
    this.ds2 = this.connector2.getDatasource();
  }
  render() {
    return lit_html_1.html`
            <div class="flex flex-row flex-grow h-full">
                <div class="flex flex-row flex-grow h-full">
                    <div class="flex-grow">
                        <data-buttons
                            class="flex flex-col"
                            .btnClass=${'p-2 m-2 bg-green-400'}
                            .type=${'add'}
                            .callback=${x => {
      datasources_1.add(this.ds1, x);
    }}
                        ></data-buttons>

                        <data-buttons
                            class="flex flex-col"
                            .btnClass=${'p-2 m-2 bg-yellow-400'}
                            .type=${'set'}
                            .callback=${x => {
      datasources_1.set(this.ds1, x);
    }}
                        ></data-buttons>

                        <nav-buttons
                            class="flex flex-col"
                            .btnClass=${'p-2 m-2 bg-indigo-400'}
                            .callback=${action => {
      this.ds1[action]();
    }}
                        ></nav-buttons>
                    </div>

                    <simple-html-grid
                        style="width:100%"
                        class="simple-html-grid w-full flex-grow"
                        .interface=${this.connector1}
                    >
                    </simple-html-grid>
                </div>

                <div class="flex flex-row flex-grow h-full">
                    <div class="flex-grow">
                        <data-buttons
                            class="flex flex-col"
                            .btnClass=${'p-2 m-2 bg-green-400'}
                            .type=${'add'}
                            .callback=${x => {
      datasources_1.add(this.ds2, x);
    }}
                        ></data-buttons>

                        <data-buttons
                            class="flex flex-col"
                            .btnClass=${'p-2 m-2 bg-yellow-400'}
                            .type=${'set'}
                            .callback=${x => {
      datasources_1.set(this.ds2, x);
    }}
                        ></data-buttons>

                        <nav-buttons
                            class="flex flex-col"
                            .btnClass=${'p-2 m-2 bg-indigo-400'}
                            .callback=${action => {
      this.ds2[action]();
    }}
                        ></nav-buttons>
                    </div>

                    <simple-html-grid
                        style="width:100%"
                        class="simple-html-grid w-full flex-grow"
                        .interface=${this.connector2}
                    >
                    </simple-html-grid>
                </div>
            </div>
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('sample-no3')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/grid/elements/sample-no4.ts @13
13: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  render() {
    return lit_html_1.html`<simple-html-grid-filter-dialog
            style="margin:25px"
        ></simple-html-grid-filter-dialog>`;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('sample-no4')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/grid/elements/data-buttons.ts @14
14: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  render() {
    return lit_html_1.html` <button
                class=${this.btnClass}
                @click=${() => {
      this.callback(1);
    }}
            >
                ${this.type} 1
            </button>
            <button
                class=${this.btnClass}
                @click=${() => {
      this.callback(10);
    }}
            >
                ${this.type} 10
            </button>
            <button
                class=${this.btnClass}
                @click=${() => {
      this.callback(100);
    }}
            >
                ${this.type} 100
            </button>
            <button
                class=${this.btnClass}
                @click=${() => {
      this.callback(1000);
    }}
            >
                ${this.type} 1000
            </button>`;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('data-buttons')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/grid/elements/nav-buttons.ts @15
15: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  render() {
    return lit_html_1.html` <button
                class=${this.btnClass}
                @click=${() => {
      this.callback('selectFirst');
    }}
            >
                first
            </button>
            <button
                class=${this.btnClass}
                @click=${() => {
      this.callback('selectPrev');
    }}
            >
                prev
            </button>
            <button
                class=${this.btnClass}
                @click=${() => {
      this.callback('selectNext');
    }}
            >
                next
            </button>
            <button
                class=${this.btnClass}
                @click=${() => {
      this.callback('selectLast');
    }}
            >
                last
            </button>`;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('nav-buttons')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// node_modules/fuse-box/modules/fuse-box-css/index.js @6
6: function(__fusereq, exports, module){
var cssHandler = function (__filename, contents) {
  var styleId = __filename.replace(/[\.\/]+/g, '-');
  if (styleId.charAt(0) === '-') styleId = styleId.substring(1);
  var exists = document.getElementById(styleId);
  if (!exists) {
    var s = document.createElement(contents ? 'style' : 'link');
    s.id = styleId;
    s.type = 'text/css';
    if (contents) {
      s.innerHTML = contents;
    } else {
      s.rel = 'stylesheet';
      s.href = __filename;
    }
    document.getElementsByTagName('head')[0].appendChild(s);
  } else {
    if (contents) exists.innerHTML = contents;
  }
};
module.exports = cssHandler;

},

// samples/grid/index.css @5
5: function(__fusereq, exports, module){
},

// packages/grid/src/grid.css @17
17: function(__fusereq, exports, module){
__fusereq(6)("packages/grid/src/grid.css",".simple-html-grid {\n  --simple-html-grid-main-bg-color: #f5f5f5;\n  --simple-html-grid-sec-bg-color: #ffffff;\n  --simple-html-grid-alt-bg-color: #ffffff;\n  --simple-html-grid-main-bg-border: #e6e5e5;\n  --simple-html-grid-sec-bg-border: #e6e5e5;\n  --simple-html-grid-main-bg-selected: #dbd7dc;\n  --simple-html-grid-main-font-color: #2e2d2d;\n  --simple-html-grid-sec-font-color: #979494;\n  --simple-html-grid-dropzone-color: #979494;\n  --simple-html-grid-font-size: 11px;\n  --simple-html-grid-font-weight: 500;\n  --simple-html-grid-font-weight-header: 700;\n  --simple-html-grid-font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;\n  border: 0;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  overflow: hidden;\n  display: block;\n  position: relative;\n  outline-color: var(--simple-html-grid-main-bg-color);\n  font-family: var(--simple-html-grid-font-family);\n  font-size: var(--simple-html-grid-font-size);\n  font-weight: var(--simple-html-grid-font-weight);\n  color: var(--simple-html-grid-main-font-color);\n  background-color: var(--simple-html-grid-main-bg-color);\n  border: 1px solid var(--simple-html-grid-main-bg-border);\n}\n\nsimple-html-grid-body::-webkit-scrollbar {\n  width: 1em;\n}\n\nsimple-html-grid-body::-webkit-scrollbar-track {\n  /*nothing atm */\n}\n\nsimple-html-grid-body::-webkit-scrollbar-thumb {\n  background-color: var(--simple-html-grid-main-bg-selected);\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  outline: 1px solid var(--simple-html-grid-main-bg-border);\n}\n\n.simple-html-grid .simple-html-grid-row {\n  border: 0;\n  width: 100%;\n  min-width: 100%; /*without this left scrolltop will not be set when hidden*/\n  border-bottom: 1px solid var(--simple-html-grid-main-bg-border);\n  box-sizing: border-box;\n  position: absolute;\n  overflow: hidden;\n}\n\n/* when we have many rows within row */\n\n.simple-html-grid .grouping-row-border {\n  border-bottom: 2px solid var(--simple-html-grid-main-bg-border);\n}\n\n.simple-html-grid input::-webkit-input-placeholder {\n  color: var(--simple-html-grid-sec-font-color);\n  opacity: 1; /* Firefox */\n}\n\n.simple-html-grid input::-moz-placeholder {\n  color: var(--simple-html-grid-sec-font-color);\n  opacity: 1; /* Firefox */\n}\n\n.simple-html-grid input:-ms-input-placeholder {\n  color: var(--simple-html-grid-sec-font-color);\n  opacity: 1; /* Firefox */\n}\n\n.simple-html-grid input::-ms-input-placeholder {\n  color: var(--simple-html-grid-sec-font-color);\n  opacity: 1; /* Firefox */\n}\n\n.simple-html-grid input::placeholder {\n  color: var(--simple-html-grid-sec-font-color);\n  opacity: 1; /* Firefox */\n}\n\n.simple-html-grid .simple-html-grid-col {\n  border: 0;\n  border-right: 1px solid var(--simple-html-grid-main-bg-border);\n  /* border-top: 1px solid var(--simple-html-grid-main-bg-border); */\n  box-sizing: border-box;\n  position: absolute;\n  height: 100%;\n}\n\n.simple-html-grid .simple-html-grid-panel {\n  border: 0;\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  top: 0;\n  background-color: var(--simple-html-grid-main-bg-color);\n  box-shadow: inset 1px 1px 3px 0 #fffdfd;\n}\n\n.simple-html-grid .simple-html-grid-footer {\n  border: 0;\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  bottom: 0;\n  border-top: 1px solid var(--simple-html-grid-main-bg-border);\n  background-color: var(--simple-html-grid-main-bg-color);\n  box-shadow: inset 1px 1px 3px 0 #fffdfd;\n}\n\n.simple-html-grid .simple-html-grid-header {\n  border: 0;\n  position: absolute;\n  box-sizing: border-box;\n  display: inline-block;\n  min-width: 100%;\n  background-color: var(--simple-html-grid-main-bg-color);\n  border-right: 1px solid var(--simple-html-grid-main-bg-border);\n  border-top: 1px solid var(--simple-html-grid-main-bg-border);\n  border-bottom: 2px solid var(--simple-html-grid-main-bg-border);\n  overflow: hidden;\n}\n\n.simple-html-grid .simple-html-grid-body {\n  position: absolute;\n  box-sizing: border-box;\n  border-top: 1px solid var(--simple-html-grid-main-bg-border);\n  min-width: 100%;\n  overflow-y: auto;\n}\n\n.simple-html-grid .simple-html-grid-content {\n  background-color: var(--simple-html-grid-sec-bg-color);\n  min-width: 100%;\n  z-index: 6;\n  position: absolute;\n  box-sizing: border-box;\n  height: 100%;\n  overflow: hidden;\n  overflow-x: hidden;\n  overflow-y: hidden;\n}\n\n.simple-html-grid .simple-html-grid-group-row {\n  position: absolute;\n  box-sizing: border-box;\n  border: 0;\n  border-right: 1px solid var(--simple-html-grid-sec-bg-border);\n}\n\n.simple-html-grid .simple-html-grid-group-filter {\n  position: absolute;\n  box-sizing: border-box;\n  border: 0;\n  border-right: 1px solid var(--simple-html-grid-sec-bg-border);\n}\n\n.simple-html-grid .simple-html-grid-group-label {\n  position: absolute;\n  box-sizing: border-box;\n  border: 0;\n  border-right: 1px solid var(--simple-html-grid-sec-bg-border);\n  border-bottom: 1px solid var(--simple-html-grid-sec-bg-border);\n  overflow: hidden;\n}\n\n.simple-html-grid .simple-html-grid-cell-label {\n  position: absolute;\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: initial;\n  border-bottom: 1px solid var(--simple-html-grid-sec-bg-border);\n  border-right: 1px solid var(--simple-html-grid-sec-bg-border);\n  background-color: var(--simple-html-grid-main-bg-color);\n  margin: initial;\n  transition: initial;\n  outline-color: var(--simple-html-grid-main-bg-color);\n  color: var(--simple-html-grid-main-font-color);\n}\n\n.simple-html-grid .simple-html-grid-image-round {\n  border-radius: 50%;\n  height: 100%;\n  box-sizing: border-box;\n  position: relative;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.simple-html-grid .simple-html-grid-cell-filter {\n  position: absolute;\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: initial;\n  border-bottom: 1px solid var(--simple-html-grid-sec-bg-border);\n  border-right: 1px solid var(--simple-html-grid-sec-bg-border);\n  background-color: var(--simple-html-grid-alt-bg-color);\n  margin: initial;\n  transition: initial;\n  outline-color: var(--simple-html-grid-main-bg-color);\n  color: var(--simple-html-grid-main-font-color);\n  font-family: var(--simple-html-grid-font-family);\n  font-size: var(--simple-html-grid-font-size);\n  font-weight: var(--simple-html-grid-font-weight);\n}\n\n.simple-html-grid .simple-html-grid-cell-row {\n  position: absolute;\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: initial;\n  border-bottom: 1px solid var(--simple-html-grid-sec-bg-border);\n  margin: initial;\n  transition: initial;\n  outline-color: var(--simple-html-grid-main-bg-color);\n  color: var(--simple-html-grid-main-font-color);\n}\n\n.simple-html-grid .simple-html-grid-row-checkbox {\n  width: initial;\n  opacity: initial;\n  position: initial;\n  display: block;\n  margin: auto;\n  padding-top: 2px;\n  height: 100%;\n  background-color: var(--simple-html-grid-sec-bg-color);\n  color: var(--simple-html-grid-main-font-color);\n}\n\n.simple-html-grid .simple-html-grid-row-input {\n  box-sizing: border-box;\n  border: 0;\n  position: absolute;\n  border-radius: initial;\n  box-shadow: initial;\n  width: 100%;\n  bottom: 1px;\n  top:0;\n  padding-left: 5px;\n  background-color: transparent;\n  outline-color: var(--simple-html-grid-main-bg-color);\n  color: var(--simple-html-grid-main-font-color);\n  font-family: var(--simple-html-grid-font-family);\n  font-size: var(--simple-html-grid-font-size);\n  font-weight: var(--simple-html-grid-font-weight);\n}\n\n.simple-html-grid .simple-html-grid-label {\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: inset 1px 1px 3px 0 #fffdfd;\n  height: 100%;\n  width: 100%;\n  padding: 2px;\n  position: absolute;\n  text-align: center;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  margin: initial;\n  font-family: var(--simple-html-grid-font-family);\n  font-size: var(--simple-html-grid-font-size);\n  font-weight: var(--simple-html-grid-font-weight-header);\n}\n\n.simple-html-grid .simple-html-grid-selected-row {\n  box-shadow: inset 1px 1px 3px 0 #a9a9a9;\n  background-color: var(--simple-html-grid-main-bg-selected);\n}\n\n.simple-html-grid .simple-html-grid-draggable-handler {\n  position: absolute;\n  cursor: w-resize;\n  width: 5px;\n  right: -2.5px;\n  top: 0;\n  bottom: 0;\n  z-index: 900;\n  border: initial;\n}\n\n.simple-html-grid .simple-html-grid-vGridDragHandle {\n  cursor: move;\n}\n\n.simple-html-grid .simple-html-grid-fa-sort-number[data-vgridsort]:after {\n  font: x-small;\n  font-size: 8px;\n  content: attr(data-vgridsort);\n}\n\n.simple-html-grid .simple-html-grid-icon {\n  fill: currentColor;\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  overflow: hidden;\n  display: initial;\n}\n\n.simple-html-grid .simple-html-grid-iconhidden {\n  display: none;\n}\n\n.simple-html-grid .simple-html-grid-dragHandle {\n  cursor: move;\n}\n\n.simple-html-grid.simple-html-grid-drag {\n  pointer-events: none;\n  background-color: var(--simple-html-grid-main-bg-color);\n  min-width: 100px;\n  position: absolute;\n  text-align: center;\n  z-index: 50;\n  font-family: var(--simple-html-grid-font-family);\n  font-size: var(--simple-html-grid-font-size);\n  font-weight: var(--simple-html-grid-font-weight-header);\n}\n\n.simple-html-grid .simple-html-grid-grouping-panel-container {\n  background-color: var(--simple-html-grid-main-bg-color);\n  position: relative;\n  margin: 3px;\n  height: 80%;\n  box-sizing: border-box;\n  padding-left: 10px;\n  padding-right: 10px;\n  display: block;\n  float: left;\n  border: 1px solid var(--simple-html-grid-main-bg-border);\n}\n\n.simple-html-grid .simple-html-grid-grouping-row {\n  height: 100%;\n  box-sizing: border-box;\n  position: absolute;\n  background-color: var(--simple-html-grid-main-bg-color);\n  border-right: 1px solid var(--simple-html-grid-main-bg-border);\n  box-shadow: inset 1px 1px 3px 0 #fffdfd;\n}\n\n.simple-html-grid .simple-html-grid-col-group {\n  pointer-events: all;\n  box-sizing: border-box;\n  white-space: nowrap;\n  position: absolute;\n  border: 0;\n  border-radius: initial;\n  box-shadow: inset 1px 1px 3px 0 #fffdfd;\n  padding: 2px 10px;\n  height: 100%;\n  background-color: var(--simple-html-grid-main-bg-color);\n}\n\n.simple-html-grid .simple-html-grid-grouping-panel-p {\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: initial;\n  height: 100%;\n  width: 100%;\n  position: relative;\n  margin: 0;\n  display: flex;\n  text-align: center;\n  box-shadow: inset 1px 1px 3px 0 #fffdfd;\n}\n\n.simple-html-grid .simple-html-grid-candrop {\n  background-color: var(--simple-html-grid-dropzone-color);\n  box-shadow: inset 1px 1px 3px 0 #fffdfd;\n}\n\n.simple-html-grid .simple-html-grid-row-input:focus {\n  border: 1px dashed;\n  outline: thin;\n  outline-color: var(--simple-html-grid-main-bg-color);\n}\n\n.simple-html-grid-menu {\n  position: absolute;\n  z-index: 901;\n  background-color: rgb(240, 240, 240);\n  min-width: 150px;\n  border-top: 1px solid var(--simple-html-grid-sec-bg-border);\n  border-left: 1px solid var(--simple-html-grid-sec-bg-border);\n  border-right: 1px solid var(--simple-html-grid-sec-bg-border);\n  border-bottom: 1px solid var(--simple-html-grid-sec-bg-border);\n  box-shadow: inset 1px 1px 3px 0 #fffdfd;\n}\n\n.simple-html-grid-menu-item {\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  height: 20px;\n  text-align: center;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  margin: initial;\n  font-family: var(--simple-html-grid-font-family);\n  font-size: var(--simple-html-grid-font-size);\n  font-weight: var(--simple-html-grid-font-weight-cell);\n  background-color: var(--simple-html-grid-main-bg-color);\n  margin: initial;\n  transition: initial;\n  outline-color: var(--simple-html-grid-main-bg-color);\n  color: var(--simple-html-grid-main-font-color);\n}\n\n.simple-html-grid-menu-full {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 901;\n  background-color: rgba(240, 240, 240, 0.5);\n  min-width: 150px;\n  border-top: 1px solid var(--simple-html-grid-sec-bg-border);\n  border-left: 1px solid var(--simple-html-grid-sec-bg-border);\n  border-right: 1px solid var(--simple-html-grid-sec-bg-border);\n  border-bottom: 1px solid var(--simple-html-grid-sec-bg-border);\n  box-shadow: inset 1px 1px 3px 0 #fffdfd;\n}\n\n.simple-html-grid-menu-item:hover {\n  background-color: var(--simple-html-grid-main-bg-selected);\n}\n\n.simple-html-filter-dialog {\n  box-shadow: 1px 1px 3px 0px #000000b5;\n  top: 30%;\n  position: relative;\n  margin: auto;\n}\n\n.dialog-row {\n  display: flex;\n  box-shadow: inset 1px 1px 3px 0 #fffdfd;\n  border-bottom: 1px solid var(--simple-html-grid-sec-bg-border);\n  min-height: 20px;\n}\n\n.dialog-item-block {\n  border-right: 1px solid var(--simple-html-grid-sec-bg-border);\n}\n\n.dialog-item {\n  display: flex;\n  text-align: center;\n}\n\n.dialog-item-y {\n  min-width: 140px;\n  max-width: 140px;\n  margin-left: 15px;\n  min-height: 20px;\n}\n\n.dialog-item-group {\n  margin-left: 5px;\n  margin-top: 2px;\n}\n\n.dialog-item-y:focus {\n  outline: 1px dashed !important;\n}\n\n.dialog-item-x {\n  min-width: 15px; /* due to icon */\n  margin-left: 25px;\n  min-height: 20px;\n}\n\n.dialog-item-x:focus {\n  outline: 0px !important;\n}\n\n.dialog-condition-trash {\n  position: absolute;\n  right: 5px;\n}\n\n.dialog-condition-type {\n  position: absolute;\n  right: 30px;\n}\n\n.simple-html-grid-drop-zone-left {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 5px;\n  text-align: center;\n  z-index: 50;\n}\n\n.simple-html-grid-drop-zone-right {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 5px;\n  text-align: center;\n  z-index: 90;\n}\n\n.simple-html-grid-drop-zone-bottom {\n  position: absolute;\n  bottom: 0;\n  left: 5px;\n  right: 5px;\n  height: 5px;\n  text-align: center;\n  z-index: 50;\n}\n\n.simple-html-grid-drop-zone-top {\n  position: absolute;\n  top: 0;\n  left: 5px;\n  right: 5px;\n  height: 5px;\n  text-align: center;\n  z-index: 50;\n}\r\n\r\n/*# sourceMappingURL=/resources/css/022fe7e1d.css.map */")
},

// node_modules/fuse-box/modules/fuse-box-websocket/index.js @18
18: function(__fusereq, exports, module){
const events = __fusereq(39);
function log(text) {
  console.info(`%c${text}`, 'color: #237abe');
}
class SocketClient {
  constructor(opts) {
    opts = opts || ({});
    const port = opts.port || window.location.port;
    const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
    const domain = location.hostname || 'localhost';
    if (opts.connectionURL) {
      this.url = opts.connectionURL;
    } else {
      if (opts.useCurrentURL) {
        this.url = protocol + location.hostname + (location.port ? ':' + location.port : '');
      }
      if (opts.port) {
        this.url = `${protocol}${domain}:${opts.port}`;
      }
    }
    this.authSent = false;
    this.emitter = new events.EventEmitter();
  }
  reconnect(fn) {
    setTimeout(() => {
      this.emitter.emit('reconnect', {
        message: 'Trying to reconnect'
      });
      this.connect(fn);
    }, 5000);
  }
  on(event, fn) {
    this.emitter.on(event, fn);
  }
  connect(fn) {
    setTimeout(() => {
      log(`Connecting to FuseBox HMR at ${this.url}`);
      this.client = new WebSocket(this.url);
      this.bindEvents(fn);
    }, 0);
  }
  close() {
    this.client.close();
  }
  send(eventName, data) {
    if (this.client.readyState === 1) {
      this.client.send(JSON.stringify({
        name: eventName,
        payload: data || ({})
      }));
    }
  }
  error(data) {
    this.emitter.emit('error', data);
  }
  bindEvents(fn) {
    this.client.onopen = event => {
      log('Connection successful');
      if (fn) {
        fn(this);
      }
    };
    this.client.onerror = event => {
      this.error({
        reason: event.reason,
        message: 'Socket error'
      });
    };
    this.client.onclose = event => {
      this.emitter.emit('close', {
        message: 'Socket closed'
      });
      if (event.code !== 1011) {
        this.reconnect(fn);
      }
    };
    this.client.onmessage = event => {
      let data = event.data;
      if (data) {
        let item = JSON.parse(data);
        this.emitter.emit(item.name, item.payload);
      }
    };
  }
}
exports.SocketClient = SocketClient;

},

// node_modules/fuse-box/modules/events/index.js @39
39: function(__fusereq, exports, module){
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
  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};
EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;
  if (!this._events) this._events = {};
  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er;
      }
      throw TypeError('Uncaught, unspecified "error" event.');
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
  if (!isFunction(listener)) throw TypeError('listener must be a function');
  if (!this._events) this._events = {};
  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
  if (!this._events[type]) this._events[type] = listener; else if (isObject(this._events[type])) this._events[type].push(listener); else this._events[type] = [this._events[type], listener];
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }
    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      if (typeof console.trace === 'function') {
        console.trace();
      }
    }
  }
  return this;
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) throw TypeError('listener must be a function');
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
  if (!isFunction(listener)) throw TypeError('listener must be a function');
  if (!this._events || !this._events[type]) return this;
  list = this._events[type];
  length = list.length;
  position = -1;
  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];
    if (this._events.removeListener) this.emit('removeListener', type, listener);
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
    if (this._events.removeListener) this.emit('removeListener', type, listener);
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
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
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
  return typeof arg === 'function';
}
function isNumber(arg) {
  return typeof arg === 'number';
}
function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
function isUndefined(arg) {
  return arg === void 0;
}

},

// node_modules/fuse-box/modules/fuse-box-hot-reload/clientHotReload.ts @3
3: function(__fusereq, exports, module){
exports.__esModule = true;
const {SocketClient} = __fusereq(18);
function log(text) {
  console.info(`%c${text}`, 'color: #237abe');
}
const STYLESHEET_EXTENSIONS = ['.css', '.scss', '.sass', '.less', '.styl'];
function gatherSummary() {
  const modules = [];
  for (const id in __fuse.modules) {
    modules.push(parseInt(id));
  }
  return {
    modules
  };
}
function createHMRHelper(payload) {
  const {updates} = payload;
  let isStylesheeetUpdate = true;
  for (const item of updates) {
    const file = item.path;
    const s = file.match(/(\.\w+)$/i);
    const extension = s[1];
    if (!STYLESHEET_EXTENSIONS.includes(extension)) {
      isStylesheeetUpdate = false;
    }
  }
  return {
    isStylesheeetUpdate,
    callEntries: () => {
      const appEntries = [1];
      for (const entryId of appEntries) {
        __fuse.r(entryId);
      }
    },
    callModules: modules => {
      for (const item of modules) __fuse.r(item.id);
    },
    flushAll: () => {
      __fuse.c = {};
    },
    flushModules: modules => {
      for (const item of modules) {
        __fuse.c[item.id] = undefined;
      }
    },
    updateModules: () => {
      for (const update of updates) {
        new Function(update.content)();
      }
    }
  };
}
exports.connect = opts => {
  let client = new SocketClient(opts);
  client.connect();
  client.on('get-summary', data => {
    const {id} = data;
    const summary = gatherSummary();
    client.send('summary', {
      id,
      summary
    });
  });
  client.on('reload', () => {
    window.location.reload();
  });
  client.on('hmr', payload => {
    const {updates} = payload;
    const hmr = createHMRHelper(payload);
    const hmrModuleId = 2;
    if (hmrModuleId) {
      const hmrModule = __fuse.r(hmrModuleId);
      if (!hmrModule.default) throw new Error('An HMR plugin must export a default function');
      hmrModule.default(payload, hmr);
      return;
    }
    hmr.updateModules();
    if (hmr.isStylesheeetUpdate) {
      log(`Flushing ${updates.map(item => item.path)}`);
      hmr.flushModules(updates);
      log(`Calling modules ${updates.map(item => item.path)}`);
      hmr.callModules(updates);
    } else {
      log(`Flushing all`);
      hmr.flushAll();
      log(`Calling entries all`);
      hmr.callEntries();
    }
  });
};

},

// samples/grid/elements/sample-default.ts @9
9: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var grid_1 = __fusereq(16);
var setup_1 = __fusereq(23);
var datasources_1 = __fusereq(24);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    this.connector = new grid_1.GridInterface(setup_1.setup(1, 10), datasources_1.WordDatasource01);
    this.connector.reloadDatasource();
    this.ds = this.connector.getDatasource();
  }
  render() {
    return lit_html_1.html`
            <div class="flex flex-row flex-grow h-full">
                <div class="flex-grow">
                    <data-buttons
                        class="flex flex-col"
                        .btnClass=${'p-2 m-2 bg-green-400'}
                        .type=${'add'}
                        .callback=${x => {
      datasources_1.add(this.ds, x);
    }}
                    ></data-buttons>

                    <data-buttons
                        class="flex flex-col"
                        .btnClass=${'p-2 m-2 bg-yellow-400'}
                        .type=${'set'}
                        .callback=${x => {
      datasources_1.set(this.ds, x);
    }}
                    ></data-buttons>

                    <nav-buttons
                        class="flex flex-col"
                        .btnClass=${'p-2 m-2 bg-indigo-400'}
                        .callback=${action => {
      this.ds[action]();
    }}
                    ></nav-buttons>
                </div>

                <simple-html-grid
                    style="width:100%"
                    class="simple-html-grid w-full flex-grow"
                    .interface=${this.connector}
                >
                </simple-html-grid>
            </div>
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('sample-default')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// packages/router/src/PATH_SLASH_REGEX.ts @101
101: function(__fusereq, exports, module){
exports.__esModule = true;
exports.PATH_SLASH_REGEX = '\\/';

},

// packages/router/src/createRouteRegex.ts @70
70: function(__fusereq, exports, module){
exports.__esModule = true;
var PATH_SLASH_REGEX_1 = __fusereq(101);
function createRouteRegex(pathPattern, openEnd) {
  let regex = '';
  pathPattern.forEach((pattern, index) => {
    if (pathPattern.length > 1 && index === 0 || pathPattern.length === 1) {
      regex = '^' + pattern.regex;
    } else {
      if (pattern.regex === PATH_SLASH_REGEX_1.PATH_SLASH_REGEX) {
        regex = regex + pattern.regex;
      } else {
        regex = regex + PATH_SLASH_REGEX_1.PATH_SLASH_REGEX + pattern.regex;
      }
    }
    if (!openEnd && pathPattern.length - 1 === index) {
      regex = regex + '($|/$)';
    }
  });
  return regex;
}
exports.createRouteRegex = createRouteRegex;

},

// packages/router/src/PATH_ARGUMENT_REGEX.ts @102
102: function(__fusereq, exports, module){
exports.__esModule = true;
exports.PATH_ARGUMENT_REGEX = '[a-zA-Z0-9\\_\\-\\:]+';

},

// packages/router/src/getVariableName.ts @103
103: function(__fusereq, exports, module){
function getVariableName(path) {
  return path.substring(1, path.length);
}
exports.getVariableName = getVariableName;

},

// packages/router/src/isVariable.ts @104
104: function(__fusereq, exports, module){
function isVariable(path) {
  if (path && typeof path === 'string' && path[0] === ':') {
    return true;
  } else {
    return false;
  }
}
exports.isVariable = isVariable;

},

// packages/router/src/parseUrlPattern.ts @69
69: function(__fusereq, exports, module){
exports.__esModule = true;
var PATH_ARGUMENT_REGEX_1 = __fusereq(102);
var PATH_SLASH_REGEX_1 = __fusereq(101);
var getVariableName_1 = __fusereq(103);
var isVariable_1 = __fusereq(104);
function parseUrlPattern(urlPattern) {
  const paths = urlPattern.split('/');
  const pathsConfig = [];
  paths.forEach((path, index) => {
    if (index === paths.length - 1 && path === '' && urlPattern[urlPattern.length - 1] === PATH_SLASH_REGEX_1.PATH_SLASH_REGEX) {} else {
      pathsConfig.push({
        staticType: !isVariable_1.isVariable(path),
        variable: isVariable_1.isVariable(path) ? getVariableName_1.getVariableName(path) : null,
        regex: isVariable_1.isVariable(path) ? PATH_ARGUMENT_REGEX_1.PATH_ARGUMENT_REGEX : path
      });
    }
  });
  return pathsConfig;
}
exports.parseUrlPattern = parseUrlPattern;

},

// packages/router/src/routeMatch.ts @53
53: function(__fusereq, exports, module){
exports.__esModule = true;
var parseUrlPattern_1 = __fusereq(69);
var createRouteRegex_1 = __fusereq(70);
exports.routeMatch = function (hash = '', locationhash = window.location.hash) {
  if (!hash && (locationhash === '' || locationhash === '#')) {
    return true;
  }
  if (locationhash.indexOf('?') !== -1) {
    locationhash = locationhash.split('?')[0];
  }
  let openEnd = false;
  if (hash[hash.length - 1] === '*') {
    hash = hash.substring(0, hash.length - 1);
    openEnd = true;
  }
  const pattern = parseUrlPattern_1.parseUrlPattern(hash);
  const regexString = createRouteRegex_1.createRouteRegex(pattern, openEnd);
  const regex = new RegExp(regexString);
  return regex.test(locationhash);
};

},

// packages/router/src/routeMatchAsync.ts @54
54: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(21);
var routeMatch_1 = __fusereq(53);
exports.resolvePromise = lit_html_1.directive((promise, htmlTemplate) => part => {
  Promise.resolve(promise).then(() => {
    part.setValue(htmlTemplate);
    part.commit();
  });
});
exports.routeMatchAsync = function (hash = '', importStatement, htmlTemplate) {
  if (routeMatch_1.routeMatch(hash)) {
    return exports.resolvePromise(importStatement(), htmlTemplate);
  } else {
    return '';
  }
};

},

// packages/router/src/gotoURL.ts @55
55: function(__fusereq, exports, module){
exports.__esModule = true;
exports.gotoURL = function (path, params = {}, query = null) {
  if (path[0] === '#') {
    path = path.substr(1, path.length);
  }
  const urls = path.split('/').filter(x => x ? true : false);
  let newUrl = '';
  urls.forEach((val, i) => {
    if (val[0] === ':' && params[val.substr(1, val.length)] !== undefined) {
      newUrl = newUrl + params[val.substr(1, val.length)];
    } else {
      newUrl = newUrl + `${val}`;
    }
    if (urls.length - 1 !== i) {
      newUrl = newUrl + `/`;
    }
  });
  newUrl = `#${newUrl}`;
  let urlparams;
  if (query) {
    urlparams = new URLSearchParams();
    for (const k in query) {
      if (query[k]) {
        urlparams.append(k, query[k]);
      }
    }
    location.hash = `${newUrl}?${urlparams.toString()}`;
  } else {
    location.hash = newUrl;
  }
};

},

// packages/router/src/getUrlVars.ts @100
100: function(__fusereq, exports, module){
function getUrlVars(string) {
  const vars = {};
  string.replace(/[?&]+([^=&]+)=([^&]*)/gi, (_m, key, value) => {
    vars[key] = value;
  });
  return vars;
}
exports.getUrlVars = getUrlVars;

},

// packages/router/src/getVariables.ts @71
71: function(__fusereq, exports, module){
exports.__esModule = true;
var getUrlVars_1 = __fusereq(100);
function getVariables(pathPattern, pattern) {
  const paths = pattern.split('?')[0].split('/');
  const args = {
    _paths: []
  };
  paths.forEach((path, i) => {
    if (pathPattern[i] && pathPattern[i].variable) {
      args[pathPattern[i].variable] = path;
    }
    if (i >= pathPattern.length - 1) {
      args._paths.push(path);
    }
  });
  args._query = getUrlVars_1.getUrlVars(pattern);
  return args;
}
exports.getVariables = getVariables;

},

// packages/router/src/getRouteParams.ts @56
56: function(__fusereq, exports, module){
exports.__esModule = true;
var parseUrlPattern_1 = __fusereq(69);
var getVariables_1 = __fusereq(71);
exports.getRouteParams = function (hash, locationhash = window.location.hash) {
  const pattern = parseUrlPattern_1.parseUrlPattern(hash);
  return getVariables_1.getVariables(pattern, locationhash);
};

},

// packages/router/src/index.ts @22
22: function(__fusereq, exports, module){
exports.__esModule = true;
var core_1 = __fusereq(7);
var routeMatch_1 = __fusereq(53);
exports.routeMatch = routeMatch_1.routeMatch;
var routeMatchAsync_1 = __fusereq(54);
exports.routeMatchAsync = routeMatchAsync_1.routeMatchAsync;
var gotoURL_1 = __fusereq(55);
exports.gotoURL = gotoURL_1.gotoURL;
var getRouteParams_1 = __fusereq(56);
exports.getRouteParams = getRouteParams_1.getRouteParams;
const HASH_RENDER_EVENT = 'HASH_RENDER_EVENT';
function subscribeHashEvent(ctx, call) {
  core_1.subscribe(HASH_RENDER_EVENT, ctx, call);
}
exports.subscribeHashEvent = subscribeHashEvent;
function unSubscribeHashEvent(ctx) {
  core_1.unSubscribe(HASH_RENDER_EVENT, ctx);
}
exports.unSubscribeHashEvent = unSubscribeHashEvent;
function publishHashEvent() {
  core_1.publish(HASH_RENDER_EVENT);
}
exports.publishHashEvent = publishHashEvent;
const CAN_DEACTIVATE_EVENT = 'CAN_DEACTIVATE_EVENT';
function subscribeCanDeactivateEvent(ctx, call) {
  core_1.subscribe(CAN_DEACTIVATE_EVENT, ctx, call);
}
exports.subscribeCanDeactivateEvent = subscribeCanDeactivateEvent;
function unSubscribeCanDeactivateEvent(ctx) {
  core_1.unSubscribe(CAN_DEACTIVATE_EVENT, ctx);
}
exports.unSubscribeCanDeactivateEvent = unSubscribeCanDeactivateEvent;
function publishCanDeactivateEvent() {
  core_1.publish(CAN_DEACTIVATE_EVENT);
}
exports.publishCanDeactivateEvent = publishCanDeactivateEvent;
exports.canDeactivateCallers = [];
const canDeactivate = function () {
  return new Promise(async resolve => {
    exports.canDeactivateCallers = [];
    publishCanDeactivateEvent();
    setTimeout(async () => {
      let result = true;
      for (let i = 0; i < exports.canDeactivateCallers.length; i++) {
        const y = await Promise.resolve(exports.canDeactivateCallers[i]);
        if (y === false) {
          result = y;
        }
      }
      resolve(result);
    }, 0);
  });
};
exports.stopCanDeactivate = function (promise) {
  exports.canDeactivateCallers.push(promise);
};
function init() {
  let oldhash = window.location.hash;
  let isBackEvent = false;
  const hashChange = function () {
    if (!isBackEvent) {
      canDeactivate().then(result => {
        if (result) {
          oldhash = window.location.hash;
          core_1.publish(HASH_RENDER_EVENT);
        } else {
          isBackEvent = true;
          window.location.hash = oldhash;
        }
      });
    } else {
      isBackEvent = false;
    }
  };
  window.addEventListener('hashchange', hashChange);
  const cleanUp = {
    handleEvent: function () {
      window.removeEventListener('HMR-FUSEBOX', cleanUp);
      window.removeEventListener('hashchange', hashChange);
    }
  };
  window.addEventListener('HMR-FUSEBOX', cleanUp);
}
exports.init = init;

},

// samples/grid/elements/app-root.ts @8
8: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(20);
exports.__esModule = true;
var core_1 = __fusereq(7);
var lit_html_1 = __fusereq(21);
var router_1 = __fusereq(22);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.elements = ['#default', '#sample1', '#sample2', '#sample3', '#sample4'];
  }
  render() {
    return lit_html_1.html`<section class="flex flex-row flex-grow h-full">
            <!-- our simple navigation  -->
            <div class="bg-gray-200 flex flex-col">
                ${this.elements.map(element => {
      return lit_html_1.html`<a
                       class="p-2 m-2 bg-indigo-300"
                       href=${element}
                       @click=${() => core_1.requestRender(this)}>
                        ${element}
                    </button>`;
    })}
            </div>

            <!--  our routes -->
            ${router_1.routeMatch('#default') ? lit_html_1.html`<sample-default class="flex-grow"></sample-default>` : ''}
            ${router_1.routeMatch('#sample1') ? lit_html_1.html`<sample-no1 class="flex-grow"></sample-no1>` : ''}
            ${router_1.routeMatch('#sample2') ? lit_html_1.html`<sample-no2 class="flex-grow"></sample-no2>` : ''}
            ${router_1.routeMatch('#sample3') ? lit_html_1.html`<sample-no3 class="flex-grow"></sample-no3>` : ''}
            ${router_1.routeMatch('#sample4') ? lit_html_1.html`<sample-no4 class="flex-grow"></sample-no4>` : ''}
        </section>`;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('app-root')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/index.js @19
19: function(__fusereq, exports, module){
exports.__esModule = true;
var rerenderInnerHTML_1 = __fusereq(40);
exports.rerenderInnerHTML = rerenderInnerHTML_1.rerenderInnerHTML;
var applyPolyfill_1 = __fusereq(41);
exports.applyPolyfill = applyPolyfill_1.applyPolyfill;
var reflowStrategy_1 = __fusereq(42);
exports.ReflowStrategy = reflowStrategy_1.ReflowStrategy;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/reflow-strategy/rerenderInnerHTML.js @40
40: function(__fusereq, exports, module){
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

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/applyPolyfill.js @41
41: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(65);
var overrideCustomElementDefine_1 = __fusereq(66);
var onCustomElementChange_1 = __fusereq(67);
var createHookElementChangeListener_1 = __fusereq(68);
var reflowStrategy_1 = __fusereq(42);
function applyPolyfill(reflowStrategy = reflowStrategy_1.ReflowStrategy.NONE, reflowDelayMs = 250, onCustomElementChangeListener) {
  hmrCache_1.initCache();
  overrideCustomElementDefine_1.overrideCustomElementDefine();
  onCustomElementChange_1.onCustomElementChange(createHookElementChangeListener_1.createHookElementChangeListener(reflowStrategy, reflowDelayMs, onCustomElementChangeListener));
}
exports.applyPolyfill = applyPolyfill;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/reflowStrategy.js @42
42: function(__fusereq, exports, module){
exports.__esModule = true;
(function (ReflowStrategy) {
  ReflowStrategy["RERENDER_INNER_HTML"] = "rerenderInnnerHTML";
  ReflowStrategy["NONE"] = "none";
})(exports.ReflowStrategy || (exports.ReflowStrategy = {}));

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/hmrCache.js @65
65: function(__fusereq, exports, module){
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
  } else {
    return globalThis.hmrCacheSymbolAttributes[elementName];
  }
}
exports.getSymbolAttributes = getSymbolAttributes;
function getSymbolObserver(elementName) {
  if (!globalThis.hmrCacheSymbolObserver[elementName]) {
    globalThis.hmrCacheSymbolObserver[elementName] = Symbol('observedAttributesObserver');
    return globalThis.hmrCacheSymbolObserver[elementName];
  } else {
    return globalThis.hmrCacheSymbolObserver[elementName];
  }
}
exports.getSymbolObserver = getSymbolObserver;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/overrideCustomElementDefine.js @66
66: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(65);
var createHookClass_1 = __fusereq(98);
var constructInstance_1 = __fusereq(99);
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
      } else {
        const onCustomElementChange = globalThis.hmrCache.onCustomElementChange;
        if (onCustomElementChange && typeof onCustomElementChange === 'function') {
          onCustomElementChange(elementName, impl, options);
        }
      }
    };
  }
}
exports.overrideCustomElementDefine = overrideCustomElementDefine;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/onCustomElementChange.js @67
67: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(65);
exports.onCustomElementChange = changeListener => {
  hmrCache_1.initCache();
  if (!globalThis.hmrCache.onCustomElementChange) {
    globalThis.hmrCache.onCustomElementChange = changeListener;
  }
};

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/createHookElementChangeListener.js @68
68: function(__fusereq, exports, module){
exports.__esModule = true;
var reflowStrategy_1 = __fusereq(42);
var rerenderInnerHTML_1 = __fusereq(40);
exports.createHookElementChangeListener = (reflowStrategy = reflowStrategy_1.ReflowStrategy.RERENDER_INNER_HTML, reflowDelayMs = 250, onCustomElementChangeListener) => {
  let timer;
  let elementsChanged = [];
  if (!onCustomElementChangeListener) {
    onCustomElementChangeListener = () => {};
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

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/createHookClass.js @98
98: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(65);
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
      const callback = mutationList => {
        mutationList.forEach(mutation => {
          if (mostRecentImpl.attributeChangedCallback && attributes && attributes.indexOf(mutation.attributeName) !== -1) {
            mostRecentImpl.attributeChangedCallback.apply(this, [mutation.attributeName, mutation.oldValue, mutation.target.getAttribute(mutation.attributeName)]);
          }
        });
      };
      if (attributes) {
        if (Array.isArray(attributes)) {
          attributes.forEach(attributeName => {
            mostRecentImpl.attributeChangedCallback.apply(this, [attributeName, null, this.getAttribute(attributeName)]);
          });
        } else {
          console.warn(`observedAttributes in ${elementName} is not array, please fix`);
        }
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

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/constructInstance.js @99
99: function(__fusereq, exports, module){
exports.__esModule = true;
var patch_1 = __fusereq(110);
exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS = [];
exports.BLACKLISTED_STATIC_PATCH_METHODS = ['name', 'prototype', 'length'];
function constructInstance(mostRecentImpl, args, newTarget) {
  let check = window[mostRecentImpl.__proto__.name];
  if (check) {
    check = window[mostRecentImpl.__proto__.name].prototype instanceof Element;
  }
  if (!check) {
    patch_1.patch(mostRecentImpl.__proto__.prototype, newTarget.prototype, exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS);
    patch_1.patch(mostRecentImpl.__proto__, newTarget, exports.BLACKLISTED_STATIC_PATCH_METHODS);
  }
  patch_1.patch(mostRecentImpl.prototype, newTarget.prototype, exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS);
  patch_1.patch(mostRecentImpl, mostRecentImpl, exports.BLACKLISTED_STATIC_PATCH_METHODS);
  const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);
  return customElementInstance;
}
exports.constructInstance = constructInstance;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/patch.js @110
110: function(__fusereq, exports, module){
function patch(recentImpl, targetImpl, BLACKLISTED_PATCH_METHODS) {
  const ownPropertyNamesProto = Object.getOwnPropertyNames(recentImpl);
  const whitelistedPrototypePropertyNamesProto = ownPropertyNamesProto.filter(propertyName => {
    return BLACKLISTED_PATCH_METHODS.indexOf(propertyName) === -1;
  });
  for (let i = 0; i < whitelistedPrototypePropertyNamesProto.length; i++) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(recentImpl, whitelistedPrototypePropertyNamesProto[i]);
    if (propertyDescriptor) {
      if (propertyDescriptor.configurable) {
        Object.defineProperty(targetImpl, whitelistedPrototypePropertyNamesProto[i], propertyDescriptor);
      } else {
        console.warn('[custom-element-hmr-polyfill]', `${whitelistedPrototypePropertyNamesProto[i]} is not configurable, skipping`);
      }
    }
  }
}
exports.patch = patch;

},

// samples/grid/hmr.ts @4
4: function(__fusereq, exports, module){
exports.__esModule = true;
var custom_elements_hmr_polyfill_1 = __fusereq(19);
if (document.body) {
  document.body.innerHTML = '';
  setTimeout(() => {
    document.body.innerHTML = '<app-root></app-root>';
  }, 0);
}
custom_elements_hmr_polyfill_1.applyPolyfill(custom_elements_hmr_polyfill_1.ReflowStrategy.NONE);

},

// samples/grid/index.ts @1
1: function(__fusereq, exports, module){
exports.__esModule = true;
__fusereq(4);
__fusereq(5);
var core_1 = __fusereq(7);
core_1.enableInternalLogger(['SIMPLE-HTML-GRID-ROW-GROUP', 'SIMPLE-HTML-GRID-CELL-ROW', 'SIMPLE-HTML-GRID-GROUP-ROW', 'SIMPLE-HTML-GRID-CELL-LABEL', 'SIMPLE-HTML-GRID-CELL-FILTER', 'SIMPLE-HTML-GRID-ROW', 'SIMPLE-HTML-GRID-GROUP-FILTER', 'SIMPLE-HTML-GRID-GROUP-LABEL', 'SIMPLE-HTML-GRID-PANEL', 'SIMPLE-HTML-GRID-FOOTER', 'SIMPLE-HTML-GRID-BODY', 'SIMPLE-HTML-GRID-HEADER', 'SIMPLE-HTML-GRID-MENU-ROW', 'SIMPLE-HTML-GRID-MENU-FILTER', 'SIMPLE-HTML-GRID-MENU-LABEL', 'SIMPLE-HTML-GRID-FILTER-DIALOG']);
__fusereq(8);
__fusereq(9);
__fusereq(10);
__fusereq(11);
__fusereq(12);
__fusereq(13);
__fusereq(14);
__fusereq(15);
__fusereq(16);
__fusereq(17);

},

// packages/datasource/src/objectFilter.ts @105
105: function(__fusereq, exports, module){
function objectFilter(rowData, filter) {
  let result = true;
  let rowValue;
  let filterValue;
  let filterOperator = filter.operator;
  let newFilterOperator;
  let type = filter.type || 'text';
  if (filter.value === 'null') {
    type = 'null';
  }
  if (filter.value === null || filter.value === undefined) {
    type = 'null';
  }
  if (filter.value instanceof Date) {
    type = 'date';
  }
  if (Number(filter.value) === filter.value) {
    type = 'number';
  }
  rowValue = rowData[filter.attribute];
  const typeBool = {
    true: true,
    false: false
  };
  switch (type) {
    case 'null':
      filterValue = null;
      filterOperator = filterOperator === 'NOT_EQUAL_TO' ? 'NOT_EQUAL_TO' : 'EQUAL';
      if (rowValue === undefined || rowValue === 0 || rowValue === '') {
        rowValue = null;
      }
      break;
    case 'date':
      try {
        rowValue = rowValue.toISOString();
      } catch (err) {
        try {
          rowValue = new Date(rowValue).toISOString();
        } catch (err) {
          rowValue = rowValue;
        }
      }
      try {
        filterValue = filter.value.toISOString();
      } catch (err) {
        filterValue = filter.value;
      }
      filterOperator = filterOperator || 'GREATER_THAN_OR_EQUAL_TO';
      if (filterOperator === 'CONTAINS' || filterOperator === 'BEGIN_WITH' || filterOperator === 'END_WITH' || filterOperator === 'DOES_NOT_CONTAIN') {
        filterOperator = 'GREATER_THAN_OR_EQUAL_TO';
      }
      break;
    case 'number':
      filterValue = Number(filter.value);
      if (!filterValue) {
        filterValue = 0;
      }
      try {
        rowValue = isNaN(Number(rowValue)) ? 0 : Number(rowValue);
      } catch (err) {
        rowValue = rowValue;
      }
      filterOperator = filterOperator || 'GREATER_THAN_OR_EQUAL_TO';
      if (filterOperator === 'CONTAINS' || filterOperator === 'BEGIN_WITH' || filterOperator === 'END_WITH' || filterOperator === 'DOES_NOT_CONTAIN') {
        filterOperator = 'GREATER_THAN_OR_EQUAL_TO';
      }
      break;
    case 'text':
      if (rowValue === null || rowValue === undefined) {
        rowValue = '';
      } else {
        rowValue = rowValue + '';
        rowValue = rowValue.toLowerCase();
      }
      filterValue = filter.value.toLowerCase();
      filterOperator = filterOperator || 'BEGIN_WITH';
      newFilterOperator = filterOperator;
      if (filter.value.charAt(0) === '*' && filterOperator === 'BEGIN_WITH') {
        newFilterOperator = 'CONTAINS';
        filterValue = filterValue.substr(1, filterValue.length);
      }
      if (filter.value.charAt(0) === '*' && filterOperator === 'EQUAL') {
        newFilterOperator = 'END_WITH';
        filterValue = filterValue.substr(1, filterValue.length);
      }
      if (filter.value.charAt(filter.value.length - 1) === '*' && filterOperator === 'EQUAL' && newFilterOperator === 'END_WITH') {
        newFilterOperator = 'CONTAINS';
        filterValue = filterValue.substr(0, filterValue.length - 1);
      }
      if (filter.value.charAt(filter.value.length - 1) === '*' && (filterOperator === 'END_WITH' || newFilterOperator === 'END_WITH')) {
        newFilterOperator = 'CONTAINS';
        filterValue = filterValue.substr(0, filterValue.length - 1);
      }
      if (filter.value.charAt(filter.value.length - 1) === '*' && filterOperator === 'EQUAL' && newFilterOperator !== 'END_WITH' && newFilterOperator !== 'CONTAINS') {
        newFilterOperator = 'BEGIN_WITH';
        filterValue = filterValue.substr(0, filterValue.length - 1);
      }
      if (filterOperator !== newFilterOperator) {
        filterOperator = newFilterOperator;
      }
      break;
    case 'boolean':
      filterValue = typeBool[filter.value];
      filterOperator = 'EQUAL';
      break;
    default:
      try {
        rowValue = rowValue.toLowerCase();
      } catch (err) {
        rowValue = rowValue;
      }
      try {
        filterValue = filter.value.toLowerCase();
      } catch (err) {
        filterValue = filter.value;
      }
      filterOperator = filterOperator || 'EQUAL';
      break;
  }
  switch (filterOperator) {
    case 'EQUAL':
      if (rowValue !== filterValue) {
        result = false;
      }
      break;
    case 'LESS_THAN_OR_EQUAL_TO':
      if (!(rowValue <= filterValue)) {
        result = false;
      }
      break;
    case 'GREATER_THAN_OR_EQUAL_TO':
      if (!(rowValue >= filterValue)) {
        result = false;
      }
      break;
    case 'LESS_THAN':
      if (!(rowValue < filterValue)) {
        result = false;
      }
      break;
    case 'GREATER_THAN':
      if (!(rowValue > filterValue)) {
        result = false;
      }
      break;
    case 'CONTAINS':
      if (rowValue.indexOf(filterValue) === -1) {
        result = false;
      }
      break;
    case 'NOT_EQUAL_TO':
      if (rowValue === filterValue) {
        result = false;
      }
      break;
    case 'DOES_NOT_CONTAIN':
      if (rowValue.indexOf(filterValue) !== -1) {
        result = false;
      }
      break;
    case 'BEGIN_WITH':
      if (rowValue.substring(0, filterValue.length) !== filterValue) {
        result = false;
      }
      break;
    case 'END_WITH':
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
    if (filter.value.charAt(0) === '*' && filter.value.length === 'EQUAL') {
      result = true;
    }
  }
  return result;
}
exports.objectFilter = objectFilter;

},

// packages/datasource/src/filter.ts @73
73: function(__fusereq, exports, module){
exports.__esModule = true;
var objectFilter_1 = __fusereq(105);
class Filter {
  constructor() {
    this.currentFilter = null;
  }
  getFilter() {
    return this.currentFilter;
  }
  setFilter(filter) {
    this.currentFilter = filter;
  }
  getFilterFromType(type) {
    switch (type) {
      case 'date':
      case 'number':
        return 'GREATER_THAN';
      case 'bool':
        return 'EQUAL';
      default:
        return 'BEGIN_WITH';
    }
  }
  filter(objArray, ObjFilter) {
    this.currentFilter = ObjFilter;
    if (!ObjFilter) {
      return objArray.slice();
    }
    const resultArray = objArray.filter(rowData => {
      if (ObjFilter.logicalOperator === 'AND') {
        return this.andStatement(rowData, ObjFilter);
      } else {
        return this.orStatement(rowData, ObjFilter);
      }
    });
    return resultArray;
  }
  orStatement(rowData, ObjFilter) {
    if (Array.isArray(ObjFilter.filterArguments)) {
      for (let i = 0; i < ObjFilter.filterArguments.length; i++) {
        const filter = ObjFilter.filterArguments[i];
        if (filter.logicalOperator === 'AND') {
          const result = this.andStatement(rowData, filter);
          if (result) {
            return true;
          }
        }
        if (filter.logicalOperator === 'OR') {
          const result = this.orStatement(rowData, filter);
          if (result) {
            return true;
          }
        }
        if (filter.logicalOperator === 'NONE' || filter.logicalOperator === null || filter.logicalOperator == undefined) {
          let value = filter.value;
          if (filter.valueType === 'ATTRIBUTE') {
            if (typeof filter.value === 'string') {
              value = rowData[filter.value];
            } else {
              console.error('filtervalue needs to be string if you are comparing attributes');
            }
          }
          let result = false;
          if (filter.operator === 'IN') {
            let values = filter.value;
            if (!Array.isArray(filter.value)) {
              if (typeof filter.value !== 'string') {
                return false;
              }
              values = filter.value.split('\n');
            }
            for (let y = 0; y < values.length; y++) {
              const temp = objectFilter_1.objectFilter(rowData, {
                value: values[y],
                operator: 'EQUAL',
                attribute: filter.attribute,
                type: filter.attributeType
              });
              if (temp) {
                result = true;
              }
            }
          } else {
            result = objectFilter_1.objectFilter(rowData, {
              value: value,
              operator: filter.operator,
              attribute: filter.attribute,
              type: filter.attributeType
            });
          }
          if (result) {
            return true;
          }
        }
      }
    }
    return false;
  }
  andStatement(rowData, ObjFilter) {
    if (Array.isArray(ObjFilter.filterArguments)) {
      for (let i = 0; i < ObjFilter.filterArguments.length; i++) {
        const filter = ObjFilter.filterArguments[i];
        if (filter.logicalOperator === 'AND') {
          const result = this.andStatement(rowData, filter);
          if (!result) {
            return false;
          }
        }
        if (filter.logicalOperator === 'OR') {
          const result = this.orStatement(rowData, filter);
          if (!result) {
            return false;
          }
        }
        if (filter.logicalOperator === 'NONE' || filter.logicalOperator === null || filter.logicalOperator == undefined) {
          let value = filter.value;
          if (filter.valueType === 'ATTRIBUTE') {
            if (typeof filter.value === 'string') {
              value = rowData[filter.value];
            } else {
              console.error('filtervalue needs to be string if you are comparing attributes');
            }
          }
          let result = false;
          if (filter.operator === 'IN') {
            let values = filter.value;
            if (!Array.isArray(filter.value)) {
              if (typeof filter.value !== 'string') {
                return false;
              }
              values = filter.value.split('\n');
            }
            for (let y = 0; y < values.length; y++) {
              const temp = objectFilter_1.objectFilter(rowData, {
                value: values[y],
                operator: 'EQUAL',
                attribute: filter.attribute,
                type: filter.attributeType
              });
              if (temp) {
                result = true;
              }
            }
          } else {
            result = objectFilter_1.objectFilter(rowData, {
              value: value,
              operator: filter.operator,
              attribute: filter.attribute,
              type: filter.attributeType
            });
          }
          if (!result) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
exports.Filter = Filter;

},

// packages/datasource/src/sort.ts @74
74: function(__fusereq, exports, module){
class Sort {
  constructor() {
    this.lastSorting = [];
    this.currentSorting = [];
    this.localeCompareCode = null;
  }
  setLocaleCompare(code, options) {
    this.localeCompareCode = new Intl.Collator(code, options);
  }
  reset(defaultSortAttribute) {
    if (defaultSortAttribute) {
      this.lastSorting = [{
        attribute: defaultSortAttribute,
        ascending: true
      }];
      this.currentSorting = [{
        attribute: defaultSortAttribute,
        ascending: true
      }];
    } else {
      this.lastSorting = [];
      this.currentSorting = [];
    }
  }
  overrideSort(array) {
    this.lastSorting = array;
    this.currentSorting = array;
  }
  getLastSort() {
    return this.lastSorting;
  }
  setOrderBy(param, add) {
    if (Array.isArray(param)) {
      this.lastSorting = param;
      this.currentSorting = param;
    } else {
      if (add && this.lastSorting.length > 0) {
        this.currentSorting = this.lastSorting;
        let exist = false;
        this.currentSorting.forEach(x => {
          if (x.attribute === param.attribute) {
            exist = true;
            x.ascending = param.ascending;
          }
        });
        if (!exist) {
          this.currentSorting.push(param);
        }
        this.lastSorting = this.currentSorting;
      } else {
        this.currentSorting = [param];
        this.lastSorting = this.currentSorting;
      }
    }
  }
  getOrderBy() {
    return this.currentSorting;
  }
  runOrderBy(array) {
    const thisSort = this.getOrderBy();
    array.sort((obj1, obj2) => {
      let result = 0;
      for (let i = 0; i < thisSort.length && result === 0; ++i) {
        const currentObj = thisSort[i];
        const v1 = obj1[currentObj.attribute] || '';
        const v2 = obj2[currentObj.attribute] || '';
        const localCompare = (v1, v2) => {
          let resultLocale = null;
          if (this.localeCompareCode) {
            resultLocale = this.localeCompareCode.compare(v1, v2);
          } else {
            resultLocale = v1.localeCompare(v2);
          }
          return resultLocale;
        };
        if (v1 !== v2) {
          if (currentObj.ascending === true) {
            if (typeof v1 === 'string' && typeof v1 === 'string') {
              if (localCompare(v1, v2) < 0 && localCompare(v1, v2) !== 0) {
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
              if (localCompare(v1, v2) < 0 && localCompare(v1, v2) !== 0) {
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
    this.lastSorting = this.getOrderBy().slice(0);
  }
}
exports.Sort = Sort;

},

// packages/datasource/src/grouping.ts @75
75: function(__fusereq, exports, module){
class Grouping {
  constructor() {
    this.groupingConfig = [];
    this.expandedGroupIDs = new Set([]);
  }
  reset() {
    this.currentGroups = [];
    this.groupingConfig = [];
    this.expandedGroupIDs = new Set([]);
  }
  group(arrayToGroup, groupingConfig, keepExpanded) {
    if (groupingConfig.length > 0) {
      if (!keepExpanded) {
        this.expandedGroupIDs = new Set([]);
      }
      const groups = [];
      groupingConfig.forEach((groupBy, groupNo) => {
        if (groupNo === 0) {
          const mainGroup = this.createMainGrouping(arrayToGroup, groupBy.attribute, groupNo, groupBy.title);
          groups.push(mainGroup);
        } else {
          const childGroupArray = groups[groups.length - 1];
          const newSubGroup = this.groupChildren(childGroupArray, groupBy.attribute, groupNo, groupBy.title);
          groups.push(newSubGroup);
        }
      });
      this.currentGroups = groups;
      this.groupingConfig = groupingConfig;
      if (!keepExpanded) {
        return groups[0];
      } else {
        return this.expandOneOrAll(null, this.expandedGroupIDs);
      }
    } else {
      arrayToGroup.forEach(row => {
        row.__groupLvl = 0;
      });
      this.groupingConfig = [];
      return arrayToGroup;
    }
  }
  getExpanded() {
    return Array.from(this.expandedGroupIDs);
  }
  setExpanded(x) {
    this.expandedGroupIDs = new Set(x);
  }
  getGrouping() {
    return this.groupingConfig;
  }
  setGrouping(groupingConfig) {
    this.groupingConfig = groupingConfig;
  }
  toUppercase(text) {
    if (text) {
      return text[0].toUpperCase() + text.substring(1, text.length);
    } else {
      return text;
    }
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
    const collection = [];
    const mainGroups = this.currentGroups[0];
    const traverseSubGroups = group => {
      group.__groupChildren.forEach(subGroup => {
        collection.push(subGroup);
        switch (true) {
          case all:
          case subGroup.__groupID === id:
          case array.has(subGroup.__groupID):
          case subGroup.__groupID !== id && subGroup.__groupExpanded:
            if (subGroup.__groupChildren) {
              subGroup.__groupExpanded = true;
              this.expandedGroupIDs.add(subGroup.__groupID);
              traverseSubGroups(subGroup);
            }
            break;
          default:
            break;
        }
      });
    };
    mainGroups.forEach(group => {
      collection.push(group);
      switch (true) {
        case all:
        case group.__groupID === id:
        case array.has(group.__groupID):
        case group.__groupID !== id && group.__groupExpanded:
          group.__groupExpanded = true;
          this.expandedGroupIDs.add(group.__groupID);
          if (group.__groupChildren) {
            traverseSubGroups(group);
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
    const collection = [];
    const mainGroups = this.currentGroups[0];
    const traverseSubGroup = group => {
      group.__groupChildren.forEach(subGroup => {
        switch (true) {
          case all:
            if (subGroup.__groupChildren) {
              subGroup.__groupExpanded = false;
              this.expandedGroupIDs.delete(subGroup.__groupID);
              traverseSubGroup(subGroup);
            }
            break;
          case subGroup.__groupID === id:
            collection.push(subGroup);
            this.expandedGroupIDs.delete(subGroup.__groupID);
            subGroup.__groupExpanded = false;
            break;
          default:
            collection.push(subGroup);
            if (subGroup.__groupChildren && subGroup.__groupExpanded) {
              traverseSubGroup(subGroup);
            }
            break;
        }
      });
    };
    mainGroups.forEach(group => {
      collection.push(group);
      switch (true) {
        case all:
          group.__groupExpanded = false;
          this.expandedGroupIDs.delete(group.__groupID);
          if (group.__groupChildren) {
            traverseSubGroup(group);
          }
          break;
        case group.__groupID === id:
          group.__groupExpanded = false;
          this.expandedGroupIDs.delete(group.__groupID);
          break;
        default:
          if (group.__groupChildren && group.__groupExpanded) {
            traverseSubGroup(group);
          }
          break;
      }
    });
    return collection;
  }
  createMainGrouping(array, groupBy, groupNo, title) {
    const tempGroupArray = [];
    let curGroup = {};
    let lastGroupID = null;
    array.forEach(element => {
      let groupID = element[groupBy];
      groupID = typeof groupID === 'boolean' ? groupID.toString() : groupID;
      groupID = groupID || ' blank';
      if (groupID !== lastGroupID) {
        curGroup = {
          __groupName: this.toUppercase(title) + ': ' + groupID,
          __group: true,
          __groupID: groupID,
          __groupLvl: groupNo,
          __groupChildren: [element],
          __groupTotal: 1,
          __groupExpanded: false
        };
        element.__groupLvl = groupNo + 1;
        lastGroupID = groupID;
        tempGroupArray.push(curGroup);
      } else {
        curGroup.__groupChildren.push(element);
        curGroup.__groupTotal++;
      }
    });
    return tempGroupArray;
  }
  groupChildren(childGroupArray, groupBy, groupNo, title) {
    const tempGroupArray = [];
    let curGroup = {};
    childGroupArray.forEach(element => {
      let tempValue = null;
      const rebuiltChildrenArray = [];
      element.__groupChildren.forEach(child => {
        const groupID = child[groupBy] || ' blank';
        if (groupID !== tempValue) {
          const gidc = element.__groupID;
          curGroup = {
            __groupName: this.toUppercase(title) + ': ' + groupID,
            __groupID: gidc + '-' + groupID,
            __group: true,
            __groupLvl: groupNo,
            __groupChildren: [child],
            __groupTotal: 1,
            __groupExpanded: false
          };
          child.__groupLvl = groupNo + 1;
          tempValue = groupID;
          rebuiltChildrenArray.push(curGroup);
          tempGroupArray.push(curGroup);
        } else {
          curGroup.__groupChildren.push(child);
          curGroup.__groupTotal++;
        }
      });
      element.__groupChildren = rebuiltChildrenArray;
    });
    return tempGroupArray;
  }
}
exports.Grouping = Grouping;

},

// packages/datasource/src/selection.ts @76
76: function(__fusereq, exports, module){
class Selection {
  constructor(dataSource) {
    this.dataSource = dataSource;
    this.selectedRows = 0;
    this.selection = new Set([]);
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
    this.dataSource.__select(currentRow);
    if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {
      if (currentRow <= this.dataSource.length() - 1) {
        if (this.dataSource.getSelectionMode() === 'multiple') {
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
        this.dataSource.__callSubscribers('selectionChange');
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
      this.dataSource.__callSubscribers('selectionChange');
    }
  }
  getRowKey(row) {
    return this.dataSource.getRow(row) && this.dataSource.getRow(row).__KEY;
  }
  getRowKeys() {
    const keys = [];
    this.dataSource.getRows().forEach(data => {
      keys.push(data.__KEY);
    });
    return keys;
  }
  deSelect(row) {
    this.selection.delete(this.getRowKey(row));
    this.selectedRows = this.selection.size;
  }
  select(row, add) {
    switch (this.dataSource.getSelectionMode()) {
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
    if (this.dataSource.getSelectionMode() === 'multiple') {
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

}
}, function(){
__fuse.r(1)
const hmr = __fuse.r(3);
hmr.connect({"useCurrentURL":true})
})
//# sourceMappingURL=app.js.map