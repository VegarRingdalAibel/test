(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
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
//# sourceMappingURL=hmrCache.js.map