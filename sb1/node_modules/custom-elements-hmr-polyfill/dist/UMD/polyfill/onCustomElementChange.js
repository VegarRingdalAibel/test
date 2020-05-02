(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./hmrCache"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const hmrCache_1 = require("./hmrCache");
    exports.onCustomElementChange = (changeListener) => {
        hmrCache_1.initCache();
        if (!globalThis.hmrCache.onCustomElementChange) {
            globalThis.hmrCache.onCustomElementChange = changeListener;
        }
    };
});
//# sourceMappingURL=onCustomElementChange.js.map