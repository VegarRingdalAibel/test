define(["require", "exports", "./hmrCache"], function (require, exports, hmrCache_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onCustomElementChange = (changeListener) => {
        hmrCache_1.initCache();
        if (!globalThis.hmrCache.onCustomElementChange) {
            globalThis.hmrCache.onCustomElementChange = changeListener;
        }
    };
});
//# sourceMappingURL=onCustomElementChange.js.map