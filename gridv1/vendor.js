__fuse.bundle({

// node_modules/custom-elements-hmr-polyfill/dist/ES6/index.js @12
12: function(__fusereq, exports, module){
exports.__esModule = true;
var rerenderInnerHTML_1 = __fusereq(29);
exports.rerenderInnerHTML = rerenderInnerHTML_1.rerenderInnerHTML;
var applyPolyfill_1 = __fusereq(30);
exports.applyPolyfill = applyPolyfill_1.applyPolyfill;
var reflowStrategy_1 = __fusereq(31);
exports.ReflowStrategy = reflowStrategy_1.ReflowStrategy;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/reflow-strategy/rerenderInnerHTML.js @29
29: function(__fusereq, exports, module){
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

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/applyPolyfill.js @30
30: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(64);
var overrideCustomElementDefine_1 = __fusereq(65);
var onCustomElementChange_1 = __fusereq(66);
var createHookElementChangeListener_1 = __fusereq(67);
var reflowStrategy_1 = __fusereq(31);
function applyPolyfill(reflowStrategy = reflowStrategy_1.ReflowStrategy.NONE, reflowDelayMs = 250, onCustomElementChangeListener) {
  hmrCache_1.initCache();
  overrideCustomElementDefine_1.overrideCustomElementDefine();
  onCustomElementChange_1.onCustomElementChange(createHookElementChangeListener_1.createHookElementChangeListener(reflowStrategy, reflowDelayMs, onCustomElementChangeListener));
}
exports.applyPolyfill = applyPolyfill;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/reflowStrategy.js @31
31: function(__fusereq, exports, module){
exports.__esModule = true;
(function (ReflowStrategy) {
  ReflowStrategy["RERENDER_INNER_HTML"] = "rerenderInnnerHTML";
  ReflowStrategy["NONE"] = "none";
})(exports.ReflowStrategy || (exports.ReflowStrategy = {}));

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/hmrCache.js @64
64: function(__fusereq, exports, module){
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

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/overrideCustomElementDefine.js @65
65: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(64);
var createHookClass_1 = __fusereq(70);
var constructInstance_1 = __fusereq(71);
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

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/onCustomElementChange.js @66
66: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(64);
exports.onCustomElementChange = changeListener => {
  hmrCache_1.initCache();
  if (!globalThis.hmrCache.onCustomElementChange) {
    globalThis.hmrCache.onCustomElementChange = changeListener;
  }
};

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/createHookElementChangeListener.js @67
67: function(__fusereq, exports, module){
exports.__esModule = true;
var reflowStrategy_1 = __fusereq(31);
var rerenderInnerHTML_1 = __fusereq(29);
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

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/createHookClass.js @70
70: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(64);
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

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/constructInstance.js @71
71: function(__fusereq, exports, module){
exports.__esModule = true;
var patch_1 = __fusereq(72);
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

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/patch.js @72
72: function(__fusereq, exports, module){
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

// node_modules/fuse-box/modules/fuse_helpers_decorate/index.js @15
15: function(__fusereq, exports, module){
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

// node_modules/lit-html/lit-html.js @16
16: function(__fusereq, exports, module){
exports.__esModule = true;
var default_template_processor_js_1 = __fusereq(49);
var template_result_js_1 = __fusereq(57);
var default_template_processor_js_2 = __fusereq(49);
exports.DefaultTemplateProcessor = default_template_processor_js_2.DefaultTemplateProcessor;
exports.defaultTemplateProcessor = default_template_processor_js_2.defaultTemplateProcessor;
var directive_js_1 = __fusereq(50);
exports.directive = directive_js_1.directive;
exports.isDirective = directive_js_1.isDirective;
var dom_js_1 = __fusereq(51);
exports.removeNodes = dom_js_1.removeNodes;
exports.reparentNodes = dom_js_1.reparentNodes;
var part_js_1 = __fusereq(52);
exports.noChange = part_js_1.noChange;
exports.nothing = part_js_1.nothing;
var parts_js_1 = __fusereq(53);
exports.AttributeCommitter = parts_js_1.AttributeCommitter;
exports.AttributePart = parts_js_1.AttributePart;
exports.BooleanAttributePart = parts_js_1.BooleanAttributePart;
exports.EventPart = parts_js_1.EventPart;
exports.isIterable = parts_js_1.isIterable;
exports.isPrimitive = parts_js_1.isPrimitive;
exports.NodePart = parts_js_1.NodePart;
exports.PropertyCommitter = parts_js_1.PropertyCommitter;
exports.PropertyPart = parts_js_1.PropertyPart;
var render_js_1 = __fusereq(54);
exports.parts = render_js_1.parts;
exports.render = render_js_1.render;
var template_factory_js_1 = __fusereq(55);
exports.templateCaches = template_factory_js_1.templateCaches;
exports.templateFactory = template_factory_js_1.templateFactory;
var template_instance_js_1 = __fusereq(56);
exports.TemplateInstance = template_instance_js_1.TemplateInstance;
var template_result_js_2 = __fusereq(57);
exports.SVGTemplateResult = template_result_js_2.SVGTemplateResult;
exports.TemplateResult = template_result_js_2.TemplateResult;
var template_js_1 = __fusereq(58);
exports.createMarker = template_js_1.createMarker;
exports.isTemplatePartActive = template_js_1.isTemplatePartActive;
exports.Template = template_js_1.Template;
if (typeof window !== 'undefined') {
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.2.1');
}
exports.html = (strings, ...values) => new template_result_js_1.TemplateResult(strings, values, 'html', default_template_processor_js_1.defaultTemplateProcessor);
exports.svg = (strings, ...values) => new template_result_js_1.SVGTemplateResult(strings, values, 'svg', default_template_processor_js_1.defaultTemplateProcessor);

},

// node_modules/lit-html/lib/default-template-processor.js @49
49: function(__fusereq, exports, module){
exports.__esModule = true;
var parts_js_1 = __fusereq(53);
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

// node_modules/lit-html/lib/directive.js @50
50: function(__fusereq, exports, module){
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

// node_modules/lit-html/lib/dom.js @51
51: function(__fusereq, exports, module){
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

// node_modules/lit-html/lib/part.js @52
52: function(__fusereq, exports, module){
exports.__esModule = true;
exports.noChange = {};
exports.nothing = {};

},

// node_modules/lit-html/lib/parts.js @53
53: function(__fusereq, exports, module){
exports.__esModule = true;
var directive_js_1 = __fusereq(50);
var dom_js_1 = __fusereq(51);
var part_js_1 = __fusereq(52);
var template_instance_js_1 = __fusereq(56);
var template_result_js_1 = __fusereq(57);
var template_js_1 = __fusereq(58);
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

// node_modules/lit-html/lib/render.js @54
54: function(__fusereq, exports, module){
exports.__esModule = true;
var dom_js_1 = __fusereq(51);
var parts_js_1 = __fusereq(53);
var template_factory_js_1 = __fusereq(55);
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

// node_modules/lit-html/lib/template-factory.js @55
55: function(__fusereq, exports, module){
exports.__esModule = true;
var template_js_1 = __fusereq(58);
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

// node_modules/lit-html/lib/template-instance.js @56
56: function(__fusereq, exports, module){
exports.__esModule = true;
var dom_js_1 = __fusereq(51);
var template_js_1 = __fusereq(58);
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

// node_modules/lit-html/lib/template-result.js @57
57: function(__fusereq, exports, module){
exports.__esModule = true;
var dom_js_1 = __fusereq(51);
var template_js_1 = __fusereq(58);
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

// node_modules/lit-html/lib/template.js @58
58: function(__fusereq, exports, module){
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

// node_modules/tslib/tslib.es6.js @27
27: function(__fusereq, exports, module){
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
function __exportStar(m, exports) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
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

// node_modules/fuse-box/modules/fuse-box-websocket/index.js @11
11: function(__fusereq, exports, module){
const events = __fusereq(28);
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

// node_modules/fuse-box/modules/events/index.js @28
28: function(__fusereq, exports, module){
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
const {SocketClient} = __fusereq(11);
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

}
}, function(){
__fuse.r(1)
const hmr = __fuse.r(3);
hmr.connect({"useCurrentURL":true})
})