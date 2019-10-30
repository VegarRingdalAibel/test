System.register(["./hmrCache", "./overrideCustomElementDefine", "./onCustomElementChange", "./createHookElementChangeListener", "./reflowStrategy"], function (exports_1, context_1) {
    "use strict";
    var hmrCache_1, overrideCustomElementDefine_1, onCustomElementChange_1, createHookElementChangeListener_1, reflowStrategy_1;
    var __moduleName = context_1 && context_1.id;
    function applyPolyfill(reflowStrategy = reflowStrategy_1.ReflowStrategy.NONE, reflowDelayMs = 250, onCustomElementChangeListener) {
        hmrCache_1.initCache();
        overrideCustomElementDefine_1.overrideCustomElementDefine();
        onCustomElementChange_1.onCustomElementChange(createHookElementChangeListener_1.createHookElementChangeListener(reflowStrategy, reflowDelayMs, onCustomElementChangeListener));
    }
    exports_1("applyPolyfill", applyPolyfill);
    return {
        setters: [
            function (hmrCache_1_1) {
                hmrCache_1 = hmrCache_1_1;
            },
            function (overrideCustomElementDefine_1_1) {
                overrideCustomElementDefine_1 = overrideCustomElementDefine_1_1;
            },
            function (onCustomElementChange_1_1) {
                onCustomElementChange_1 = onCustomElementChange_1_1;
            },
            function (createHookElementChangeListener_1_1) {
                createHookElementChangeListener_1 = createHookElementChangeListener_1_1;
            },
            function (reflowStrategy_1_1) {
                reflowStrategy_1 = reflowStrategy_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=applyPolyfill.js.map