System.register(["./patch"], function (exports_1, context_1) {
    "use strict";
    var patch_1, BLACKLISTED_PROTOTYPE_PATCH_METHODS, BLACKLISTED_STATIC_PATCH_METHODS;
    var __moduleName = context_1 && context_1.id;
    function constructInstance(mostRecentImpl, args, newTarget) {
        // Constructed instance points to outdated impl details.
        // PROTO check
        let check = window[mostRecentImpl.__proto__.name];
        if (check) {
            check = window[mostRecentImpl.__proto__.name].prototype instanceof Element;
        }
        if (!check) {
            patch_1.patch(mostRecentImpl.__proto__.prototype, newTarget.prototype, BLACKLISTED_PROTOTYPE_PATCH_METHODS);
            // here we will update static variables/methods of "__proto__"
            patch_1.patch(mostRecentImpl.__proto__, newTarget, BLACKLISTED_STATIC_PATCH_METHODS);
        }
        // PROTOTYPE
        patch_1.patch(mostRecentImpl.prototype, newTarget.prototype, BLACKLISTED_PROTOTYPE_PATCH_METHODS);
        // here we will update static variables/methods of class
        patch_1.patch(mostRecentImpl, mostRecentImpl, BLACKLISTED_STATIC_PATCH_METHODS);
        const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);
        return customElementInstance;
    }
    exports_1("constructInstance", constructInstance);
    return {
        setters: [
            function (patch_1_1) {
                patch_1 = patch_1_1;
            }
        ],
        execute: function () {
            exports_1("BLACKLISTED_PROTOTYPE_PATCH_METHODS", BLACKLISTED_PROTOTYPE_PATCH_METHODS = [
            /*
            // we dont need these anymore...
            'constructor',
            'connectedCallback',
            'disconnectedCallback',
            'adoptedCallback',
            'attributeChangedCallback'  */
            ]);
            exports_1("BLACKLISTED_STATIC_PATCH_METHODS", BLACKLISTED_STATIC_PATCH_METHODS = ['name', 'prototype', 'length']);
        }
    };
});
//# sourceMappingURL=constructInstance.js.map