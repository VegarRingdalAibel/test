define(["require", "exports", "./hmrCache", "./createHookClass", "./constructInstance"], function (require, exports, hmrCache_1, createHookClass_1, constructInstance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function overrideCustomElementDefine() {
        if (!hmrCache_1.isCacheInitialized()) {
            // make sure the override happens only once
            hmrCache_1.setCacheAsInitialized();
            const originalDefineFn = CustomElementRegistry.prototype.define;
            CustomElementRegistry.prototype.define = function (elementName, impl, options) {
                const registeredCustomElement = customElements.get(elementName);
                // save and clear attribute so we are in control
                impl[hmrCache_1.getSymbolAttributes(elementName)] = impl.observedAttributes;
                // update cache before proxy since we need it in the createHookClass
                // this will only be a issue when bundle is loaded after body
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
//# sourceMappingURL=overrideCustomElementDefine.js.map