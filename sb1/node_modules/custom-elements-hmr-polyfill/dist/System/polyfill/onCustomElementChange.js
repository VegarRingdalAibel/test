System.register(["./hmrCache"], function (exports_1, context_1) {
    "use strict";
    var hmrCache_1, onCustomElementChange;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (hmrCache_1_1) {
                hmrCache_1 = hmrCache_1_1;
            }
        ],
        execute: function () {
            exports_1("onCustomElementChange", onCustomElementChange = (changeListener) => {
                hmrCache_1.initCache();
                if (!globalThis.hmrCache.onCustomElementChange) {
                    globalThis.hmrCache.onCustomElementChange = changeListener;
                }
            });
        }
    };
});
//# sourceMappingURL=onCustomElementChange.js.map