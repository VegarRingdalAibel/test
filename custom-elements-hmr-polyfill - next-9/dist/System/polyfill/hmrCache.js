System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function initCache() {
        if (!globalThis.hmrCache) {
            globalThis.hmrCache = {};
            globalThis.hmrCacheSymbolAttributes = {};
            globalThis.hmrCacheSymbolObserver = {};
        }
    }
    exports_1("initCache", initCache);
    function getMostRecentImpl(elementName) {
        return globalThis.hmrCache[elementName];
    }
    exports_1("getMostRecentImpl", getMostRecentImpl);
    function setMostRecentImpl(elementName, impl) {
        globalThis.hmrCache[elementName] = impl;
    }
    exports_1("setMostRecentImpl", setMostRecentImpl);
    function isCacheInitialized() {
        return globalThis.hmrCache.initialized;
    }
    exports_1("isCacheInitialized", isCacheInitialized);
    function setCacheAsInitialized() {
        globalThis.hmrCache.initialized = true;
    }
    exports_1("setCacheAsInitialized", setCacheAsInitialized);
    function getSymbolAttributes(elementName) {
        if (!globalThis.hmrCacheSymbolAttributes[elementName]) {
            globalThis.hmrCacheSymbolAttributes[elementName] = Symbol('observedAttributesArray');
            return globalThis.hmrCacheSymbolAttributes[elementName];
        }
        else {
            return globalThis.hmrCacheSymbolAttributes[elementName];
        }
    }
    exports_1("getSymbolAttributes", getSymbolAttributes);
    function getSymbolObserver(elementName) {
        if (!globalThis.hmrCacheSymbolObserver[elementName]) {
            globalThis.hmrCacheSymbolObserver[elementName] = Symbol('observedAttributesObserver');
            return globalThis.hmrCacheSymbolObserver[elementName];
        }
        else {
            return globalThis.hmrCacheSymbolObserver[elementName];
        }
    }
    exports_1("getSymbolObserver", getSymbolObserver);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=hmrCache.js.map