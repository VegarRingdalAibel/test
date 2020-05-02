export function initCache() {
    if (!globalThis.hmrCache) {
        globalThis.hmrCache = {};
        globalThis.hmrCacheSymbolAttributes = {};
        globalThis.hmrCacheSymbolObserver = {};
    }
}
export function getMostRecentImpl(elementName) {
    return globalThis.hmrCache[elementName];
}
export function setMostRecentImpl(elementName, impl) {
    globalThis.hmrCache[elementName] = impl;
}
export function isCacheInitialized() {
    return globalThis.hmrCache.initialized;
}
export function setCacheAsInitialized() {
    globalThis.hmrCache.initialized = true;
}
export function getSymbolAttributes(elementName) {
    if (!globalThis.hmrCacheSymbolAttributes[elementName]) {
        globalThis.hmrCacheSymbolAttributes[elementName] = Symbol('observedAttributesArray');
        return globalThis.hmrCacheSymbolAttributes[elementName];
    }
    else {
        return globalThis.hmrCacheSymbolAttributes[elementName];
    }
}
export function getSymbolObserver(elementName) {
    if (!globalThis.hmrCacheSymbolObserver[elementName]) {
        globalThis.hmrCacheSymbolObserver[elementName] = Symbol('observedAttributesObserver');
        return globalThis.hmrCacheSymbolObserver[elementName];
    }
    else {
        return globalThis.hmrCacheSymbolObserver[elementName];
    }
}
//# sourceMappingURL=hmrCache.js.map