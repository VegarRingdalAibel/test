"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hmrCache_1 = require("./hmrCache");
exports.onCustomElementChange = (changeListener) => {
    hmrCache_1.initCache();
    if (!globalThis.hmrCache.onCustomElementChange) {
        globalThis.hmrCache.onCustomElementChange = changeListener;
    }
};
//# sourceMappingURL=onCustomElementChange.js.map