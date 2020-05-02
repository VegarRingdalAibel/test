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
    var ReflowStrategy;
    (function (ReflowStrategy) {
        ReflowStrategy["RERENDER_INNER_HTML"] = "rerenderInnnerHTML";
        ReflowStrategy["NONE"] = "none";
    })(ReflowStrategy = exports.ReflowStrategy || (exports.ReflowStrategy = {}));
});
//# sourceMappingURL=reflowStrategy.js.map