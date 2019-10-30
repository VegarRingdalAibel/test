define(["require", "exports", "./hmrCache", "./overrideCustomElementDefine", "./onCustomElementChange", "./createHookElementChangeListener", "./reflowStrategy"], function (require, exports, hmrCache_1, overrideCustomElementDefine_1, onCustomElementChange_1, createHookElementChangeListener_1, reflowStrategy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function applyPolyfill(reflowStrategy = reflowStrategy_1.ReflowStrategy.NONE, reflowDelayMs = 250, onCustomElementChangeListener) {
        hmrCache_1.initCache();
        overrideCustomElementDefine_1.overrideCustomElementDefine();
        onCustomElementChange_1.onCustomElementChange(createHookElementChangeListener_1.createHookElementChangeListener(reflowStrategy, reflowDelayMs, onCustomElementChangeListener));
    }
    exports.applyPolyfill = applyPolyfill;
});
//# sourceMappingURL=applyPolyfill.js.map