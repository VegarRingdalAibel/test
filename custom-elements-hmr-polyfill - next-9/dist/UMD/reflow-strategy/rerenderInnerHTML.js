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
    function rerenderInnerHTML() {
        if (document.body) {
            requestAnimationFrame(() => {
                // re-render the whole DOM
                // this will make less calls to connectedCallback/disconnectedCallback on replaced child node when created.
                const oldBodyHtml = document.body.innerHTML;
                document.body.innerHTML = '';
                document.body.innerHTML = oldBodyHtml;
            });
        }
    }
    exports.rerenderInnerHTML = rerenderInnerHTML;
});
//# sourceMappingURL=rerenderInnerHTML.js.map