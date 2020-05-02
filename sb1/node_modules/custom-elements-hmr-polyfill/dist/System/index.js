System.register(["./reflow-strategy/rerenderInnerHTML", "./polyfill/applyPolyfill", "./polyfill/reflowStrategy"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (rerenderInnerHTML_1_1) {
                exports_1({
                    "rerenderInnerHTML": rerenderInnerHTML_1_1["rerenderInnerHTML"]
                });
            },
            function (applyPolyfill_1_1) {
                exports_1({
                    "applyPolyfill": applyPolyfill_1_1["applyPolyfill"]
                });
            },
            function (reflowStrategy_1_1) {
                exports_1({
                    "ReflowStrategy": reflowStrategy_1_1["ReflowStrategy"]
                });
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=index.js.map