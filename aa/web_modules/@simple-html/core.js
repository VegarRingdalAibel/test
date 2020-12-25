import { m as marker, T as Template, r as removeNodes, N as NodePart } from '../common/lit-html-55f97547.js';

function requestRender(ctx) {
    if (ctx.isConnected) {
        if (ctx.__wait) ;
        else {
            ctx.__wait = true;
            requestAnimationFrame(async () => {
                await Promise.resolve(true);
                ctx.render();
                ctx.__wait = false;
            });
        }
    }
}

function initSymbolCache() {
    if (!globalThis._LHF_SYMBOL) {
        globalThis._LHF_SYMBOL = {};
        globalThis._LHF_PROP_SYMBOL = {};
    }
}
function getObservedAttributesMapSymbol() {
    if (!globalThis._LHF_SYMBOL.observedAttributesMap) {
        globalThis._LHF_SYMBOL.observedAttributesMap = Symbol('observedAttributesMap');
        return globalThis._LHF_SYMBOL.observedAttributesMap;
    }
    else {
        return globalThis._LHF_SYMBOL.observedAttributesMap;
    }
}
function getObservedAttributesSymbol() {
    if (!globalThis._LHF_SYMBOL.observedAttributes) {
        globalThis._LHF_SYMBOL.observedAttributes = Symbol('observedAttributes');
        return globalThis._LHF_SYMBOL.observedAttributes;
    }
    else {
        return globalThis._LHF_SYMBOL.observedAttributes;
    }
}
function getPropSymbol(name) {
    if (!globalThis._LHF_PROP_SYMBOL[name]) {
        globalThis._LHF_PROP_SYMBOL[name] = Symbol(name);
        return globalThis._LHF_PROP_SYMBOL[name];
    }
    else {
        return globalThis._LHF_PROP_SYMBOL[name];
    }
}
function getTransmitterSymbol() {
    if (!globalThis._LHF_SYMBOL.transmitter) {
        globalThis._LHF_SYMBOL.transmitter = Symbol('transmitter');
        return globalThis._LHF_SYMBOL.transmitter;
    }
    else {
        return globalThis._LHF_SYMBOL.transmitter;
    }
}
initSymbolCache();

function property(options = {}) {
    return function reg(_class, prop) {
        Object.defineProperty(_class, prop, {
            get: function () {
                return this[getPropSymbol(this.tagName + '_' + prop)];
            },
            set: function (x) {
                const oldValue = this[getPropSymbol(this.tagName + '_' + prop)];
                this[getPropSymbol(this.tagName + '_' + prop)] = x;
                if (this.__constructorDone) {
                    if (this.valuesChangedCallback && oldValue !== x) {
                        this.valuesChangedCallback('property', prop, oldValue, x);
                    }
                    if (oldValue !== x && !options.skipRender) {
                        requestRender(this);
                    }
                }
            },
            configurable: true
        });
    };
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
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
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};

function customElement(elementName, extended) {
    return function reg(elementClass) {
        const observedAttributes = elementClass.observedAttributes;
        Object.defineProperty(elementClass, 'observedAttributes', {
            set: function (value) {
                elementClass.prototype[getObservedAttributesSymbol()] = value;
                return true;
            },
            get: function () {
                return elementClass.prototype[getObservedAttributesSymbol()];
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
                this.__constructorDone = true;
            }
            renderCallback() {
                if (super.renderCallback) {
                    super.renderCallback.call(this);
                }
            }
            render(...result) {
                this.renderCallback();
                if (super.render) {
                    const template = super.render.call(this, ...result);
                    Promise.resolve(template).then((templates) => {
                        render(templates, this, { eventContext: this });
                        if (super.updatedCallback || this.updateCallbackCallers) {
                            requestAnimationFrame(() => {
                                if (this.updateCallbackCallers) {
                                    this.updateCallbackCallers.forEach((call) => call());
                                }
                                this.updateCallbackCallers = [];
                                if (super.updatedCallback) {
                                    super.updatedCallback();
                                }
                            });
                        }
                    });
                }
            }
            adoptedCallback() {
                if (super.adoptedCallback) {
                    super.adoptedCallback();
                }
            }
            connectedCallback() {
                if (super.connectedCallback) {
                    super.connectedCallback.call(this);
                }
                this.render(this);
            }
            registerDisconnectCallback(call) {
                if (this.disconnectCallbackCallers) {
                    this.disconnectCallbackCallers.push(call);
                }
                else {
                    this.disconnectCallbackCallers = [];
                    this.disconnectCallbackCallers.push(call);
                }
            }
            registerUpdatedCallback(call) {
                if (this.updateCallbackCallers) {
                    this.updateCallbackCallers.push(call);
                }
                else {
                    this.updateCallbackCallers = [];
                    this.updateCallbackCallers.push(call);
                }
            }
            disconnectedCallback() {
                if (this.disconnectCallbackCallers) {
                    this.disconnectCallbackCallers.forEach((call) => call());
                }
                this.updateCallbackCallers = [];
                this.disconnectCallbackCallers = [];
                if (super.disconnectedCallback) {
                    super.disconnectedCallback.call(this);
                }
            }
            attributeChangedCallback(name, oldValue, newValue) {
                if (!this[getObservedAttributesMapSymbol()]) {
                    const attribute = name
                        .replace(/([a-z])([A-Z])/g, '$1-$2')
                        .replace(/\s+/g, '-')
                        .toLowerCase();
                    this[getObservedAttributesMapSymbol()] = new Map();
                    this[getObservedAttributesMapSymbol()].set(attribute, name);
                }
                const nameProp = this[getObservedAttributesMapSymbol()].get(name);
                this[nameProp] = newValue || '';
                if (super.attributeChangedCallback) {
                    super.attributeChangedCallback.call(this, name, oldValue, newValue);
                }
                if (super.valuesChangedCallback) {
                    super.valuesChangedCallback('attribute', name, oldValue, newValue);
                }
            }
        };
        if (!customElements.get(elementName)) {
            if (extended) {
                customElements.define(elementName, Base, extended);
            }
            else {
                customElements.define(elementName, Base);
            }
        }
        else {
            if (globalThis.hmrCache) {
                if (extended) {
                    customElements.define(elementName, Base, extended);
                }
                else {
                    customElements.define(elementName, Base);
                }
            }
        }
    };
}

if (!globalThis[getTransmitterSymbol()]) {
    globalThis[getTransmitterSymbol()] = {};
}

const state = window.state || {};
if (!window.state) {
    window.addEventListener('SIMPLE_HTML_SAVE_STATE', () => {
        window.state = state;
        console.log('SIMPLE_HTML_HMR', window.state);
    });
}

export { customElement, property };
