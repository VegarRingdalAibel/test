System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    exports_1("rerenderInnerHTML", rerenderInnerHTML);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=rerenderInnerHTML.js.map