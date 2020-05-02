(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./reflow-strategy/rerenderInnerHTML", "./polyfill/applyPolyfill", "./polyfill/reflowStrategy"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var rerenderInnerHTML_1 = require("./reflow-strategy/rerenderInnerHTML");
    exports.rerenderInnerHTML = rerenderInnerHTML_1.rerenderInnerHTML;
    var applyPolyfill_1 = require("./polyfill/applyPolyfill");
    exports.applyPolyfill = applyPolyfill_1.applyPolyfill;
    var reflowStrategy_1 = require("./polyfill/reflowStrategy");
    exports.ReflowStrategy = reflowStrategy_1.ReflowStrategy;
});
//# sourceMappingURL=index.js.map