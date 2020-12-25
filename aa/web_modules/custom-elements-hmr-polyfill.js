function rerenderInnerHTML() {
    if (document.body) {
        requestAnimationFrame(() => {
            // re-render the whole DOM
            // this will make less calls to connectedCallback/disconnectedCallback on replaced child node when created.
            const oldBodyHtml = document.body.innerHTML;
            document.body.innerHTML = '';
            document.body.innerHTML = oldBodyHtml;
        });
    }
}

function initCache() {
    if (!globalThis.hmrCache) {
        globalThis.hmrCache = {};
        globalThis.hmrCacheSymbolAttributes = {};
        globalThis.hmrCacheSymbolObserver = {};
    }
}
function getMostRecentImpl(elementName) {
    return globalThis.hmrCache[elementName];
}
function setMostRecentImpl(elementName, impl) {
    globalThis.hmrCache[elementName] = impl;
}
function isCacheInitialized() {
    return globalThis.hmrCache.initialized;
}
function setCacheAsInitialized() {
    globalThis.hmrCache.initialized = true;
}
function getSymbolAttributes(elementName) {
    if (!globalThis.hmrCacheSymbolAttributes[elementName]) {
        globalThis.hmrCacheSymbolAttributes[elementName] = Symbol('observedAttributesArray');
        return globalThis.hmrCacheSymbolAttributes[elementName];
    }
    else {
        return globalThis.hmrCacheSymbolAttributes[elementName];
    }
}
function getSymbolObserver(elementName) {
    if (!globalThis.hmrCacheSymbolObserver[elementName]) {
        globalThis.hmrCacheSymbolObserver[elementName] = Symbol('observedAttributesObserver');
        return globalThis.hmrCacheSymbolObserver[elementName];
    }
    else {
        return globalThis.hmrCacheSymbolObserver[elementName];
    }
}

/* eslint-disable prefer-rest-params */
function createHookClass(elementName, originalImpl) {
    return class extends originalImpl {
        static get observedAttributes() {
            return [];
        }
        connectedCallback() {
            const Impl = getMostRecentImpl(elementName);
            const mostRecentImpl = Impl.prototype;
            const attributes = Impl[getSymbolAttributes(elementName)];
            const observerOptions = {
                childList: false,
                attributes: true,
                attributeOldValue: true,
                subtree: false
            };
            const callback = (mutationList) => {
                mutationList.forEach((mutation) => {
                    if (mostRecentImpl.attributeChangedCallback &&
                        attributes &&
                        attributes.indexOf(mutation.attributeName) !== -1) {
                        // call back
                        mostRecentImpl.attributeChangedCallback.apply(this, [
                            mutation.attributeName,
                            mutation.oldValue,
                            this.getAttribute(mutation.attributeName),
                            null
                        ]);
                    }
                });
            };
            // call initial callback when class is created
            if (attributes) {
                if (Array.isArray(attributes)) {
                    attributes.forEach((attributeName) => {
                        const haveAtt = this.getAttributeNode(attributeName);
                        if (haveAtt) {
                            mostRecentImpl.attributeChangedCallback.apply(this, [
                                attributeName,
                                null,
                                this.getAttribute(attributeName),
                                null
                            ]);
                        }
                    });
                }
                else {
                    console.warn(`observedAttributes in ${elementName} is not array, please fix`);
                }
            }
            // create and observe
            this[getSymbolObserver(elementName)] = new MutationObserver(callback);
            this[getSymbolObserver(elementName)].observe(this, observerOptions);
            if (mostRecentImpl.connectedCallback) {
                mostRecentImpl.connectedCallback.apply(this, arguments);
            }
        }
        disconnectedCallback() {
            // cleanup
            this[getSymbolObserver(elementName)].disconnect();
            this[getSymbolObserver(elementName)] = null;
            const mostRecentImpl = getMostRecentImpl(elementName).prototype;
            if (mostRecentImpl.disconnectedCallback) {
                mostRecentImpl.disconnectedCallback.apply(this, arguments);
            }
        }
        adoptedCallback() {
            const mostRecentImpl = getMostRecentImpl(elementName).prototype;
            if (mostRecentImpl.adoptedCallback) {
                mostRecentImpl.adoptedCallback.apply(this, arguments);
            }
        }
    };
}

function patch(recentImpl, targetImpl, BLACKLISTED_PATCH_METHODS) {
    const ownPropertyNamesProto = Object.getOwnPropertyNames(recentImpl);
    const whitelistedPrototypePropertyNamesProto = ownPropertyNamesProto.filter((propertyName) => {
        return BLACKLISTED_PATCH_METHODS.indexOf(propertyName) === -1;
    });
    for (let i = 0; i < whitelistedPrototypePropertyNamesProto.length; i++) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(recentImpl, whitelistedPrototypePropertyNamesProto[i]);
        if (propertyDescriptor) {
            if (propertyDescriptor.configurable) {
                Object.defineProperty(targetImpl, whitelistedPrototypePropertyNamesProto[i], propertyDescriptor);
            }
            else {
                console.warn('[custom-element-hmr-polyfill]', `${whitelistedPrototypePropertyNamesProto[i]} is not configurable, skipping`);
            }
        }
    }
}

const BLACKLISTED_PROTOTYPE_PATCH_METHODS = [
/*
// we dont need these anymore...
'constructor',
'connectedCallback',
'disconnectedCallback',
'adoptedCallback',
'attributeChangedCallback'  */
];
function constructInstance(mostRecentImpl, args, newTarget) {
    // Constructed instance points to outdated impl details.
    var _a, _b;
    // PROTO check
    let check = window[mostRecentImpl.__proto__.name];
    if (check) {
        check = window[mostRecentImpl.__proto__.name].prototype instanceof Element;
    }
    if (!check) {
        let proto = mostRecentImpl.__proto__;
        let base = null;
        while (proto) {
            if (((_b = window[(_a = proto === null || proto === void 0 ? void 0 : proto.__proto__) === null || _a === void 0 ? void 0 : _a.name]) === null || _b === void 0 ? void 0 : _b.prototype) instanceof Element) {
                // if parent is instance of Element then we want it...
                base = proto;
            }
            if (base) {
                break;
            }
            proto = proto.__proto__;
        }
        if (!window.HMR_SKIP_DEEP_PATCH) {
            patch(base.prototype, newTarget.prototype, BLACKLISTED_PROTOTYPE_PATCH_METHODS);
        }
        // not needed...
        // here we will update static variables/methods of "__proto__"
        // patch(base, newTarget, BLACKLISTED_STATIC_PATCH_METHODS);
    }
    // PROTOTYPE
    patch(mostRecentImpl.prototype, newTarget.prototype, BLACKLISTED_PROTOTYPE_PATCH_METHODS);
    // not needed...
    // here we will update static variables/methods of class
    //patch(mostRecentImpl, newTarget, BLACKLISTED_STATIC_PATCH_METHODS);
    const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);
    return customElementInstance;
}

function overrideCustomElementDefine() {
    if (!isCacheInitialized()) {
        // make sure the override happens only once
        setCacheAsInitialized();
        const originalDefineFn = CustomElementRegistry.prototype.define;
        CustomElementRegistry.prototype.define = function (elementName, impl, options) {
            const registeredCustomElement = customElements.get(elementName);
            // save and clear attribute so we are in control
            impl[getSymbolAttributes(elementName)] = impl.observedAttributes;
            // update cache before proxy since we need it in the createHookClass
            // this will only be a issue when bundle is loaded after body
            setMostRecentImpl(elementName, impl);
            if (!registeredCustomElement) {
                const hookClass = new Proxy(createHookClass(elementName, impl), {
                    construct: function (element, args, newTarget) {
                        const mostRecentImpl = getMostRecentImpl(elementName);
                        return constructInstance(mostRecentImpl, args, newTarget);
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

const onCustomElementChange = (changeListener) => {
    initCache();
    if (!globalThis.hmrCache.onCustomElementChange) {
        globalThis.hmrCache.onCustomElementChange = changeListener;
    }
};

var ReflowStrategy;
(function (ReflowStrategy) {
    ReflowStrategy["RERENDER_INNER_HTML"] = "rerenderInnnerHTML";
    ReflowStrategy["NONE"] = "none";
})(ReflowStrategy || (ReflowStrategy = {}));

const createHookElementChangeListener = (reflowStrategy = ReflowStrategy.RERENDER_INNER_HTML, reflowDelayMs = 250, onCustomElementChangeListener) => {
    let timer;
    let elementsChanged = [];
    if (!onCustomElementChangeListener) {
        onCustomElementChangeListener = () => {
            /**nothing */
        };
    }
    return (elementName, impl, options) => {
        if (onCustomElementChangeListener) {
            onCustomElementChangeListener(elementName, impl, options);
        }
        if (reflowStrategy && reflowStrategy === ReflowStrategy.RERENDER_INNER_HTML) {
            elementsChanged.push(elementName);
            clearTimeout(timer);
            timer = setTimeout(() => {
                rerenderInnerHTML();
                elementsChanged = [];
            }, reflowDelayMs);
        }
    };
};

function applyPolyfill(reflowStrategy = ReflowStrategy.NONE, reflowDelayMs = 250, onCustomElementChangeListener) {
    initCache();
    overrideCustomElementDefine();
    onCustomElementChange(createHookElementChangeListener(reflowStrategy, reflowDelayMs, onCustomElementChangeListener));
}

export { ReflowStrategy, applyPolyfill };
