define(["require", "exports", "./patch"], function (require, exports, patch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS = [
    /*
    // we dont need these anymore...
    'constructor',
    'connectedCallback',
    'disconnectedCallback',
    'adoptedCallback',
    'attributeChangedCallback'  */
    ];
    exports.BLACKLISTED_STATIC_PATCH_METHODS = ['name', 'prototype', 'length'];
    function constructInstance(mostRecentImpl, args, newTarget) {
        // Constructed instance points to outdated impl details.
        // PROTO check
        let check = window[mostRecentImpl.__proto__.name];
        if (check) {
            check = window[mostRecentImpl.__proto__.name].prototype instanceof Element;
        }
        if (!check) {
            patch_1.patch(mostRecentImpl.__proto__.prototype, newTarget.prototype, exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS);
            // here we will update static variables/methods of "__proto__"
            patch_1.patch(mostRecentImpl.__proto__, newTarget, exports.BLACKLISTED_STATIC_PATCH_METHODS);
        }
        // PROTOTYPE
        patch_1.patch(mostRecentImpl.prototype, newTarget.prototype, exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS);
        // here we will update static variables/methods of class
        patch_1.patch(mostRecentImpl, mostRecentImpl, exports.BLACKLISTED_STATIC_PATCH_METHODS);
        const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);
        return customElementInstance;
    }
    exports.constructInstance = constructInstance;
});
//# sourceMappingURL=constructInstance.js.map