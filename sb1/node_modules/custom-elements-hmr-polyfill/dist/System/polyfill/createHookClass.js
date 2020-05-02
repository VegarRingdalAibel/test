System.register(["./hmrCache"], function (exports_1, context_1) {
    "use strict";
    var hmrCache_1;
    var __moduleName = context_1 && context_1.id;
    function createHookClass(elementName, originalImpl) {
        return class extends originalImpl {
            static get observedAttributes() {
                return [];
            }
            connectedCallback() {
                const Impl = hmrCache_1.getMostRecentImpl(elementName);
                const mostRecentImpl = Impl.prototype;
                const attributes = Impl[hmrCache_1.getSymbolAttributes(elementName)];
                const observerOptions = {
                    childList: false,
                    attributes: true,
                    attributeOldValue: true,
                    subtree: false
                };
                const callback = (mutationList) => {
                    mutationList.forEach(mutation => {
                        if (mostRecentImpl.attributeChangedCallback &&
                            attributes &&
                            attributes.indexOf(mutation.attributeName) !== -1) {
                            // call back
                            mostRecentImpl.attributeChangedCallback.apply(this, [
                                mutation.attributeName,
                                mutation.oldValue,
                                mutation.target.getAttribute(mutation.attributeName)
                            ]);
                        }
                    });
                };
                // call initial callback when class is created
                if (attributes) {
                    if (Array.isArray(attributes)) {
                        attributes.forEach(attributeName => {
                            mostRecentImpl.attributeChangedCallback.apply(this, [
                                attributeName,
                                null,
                                this.getAttribute(attributeName)
                            ]);
                        });
                    }
                    else {
                        console.warn(`observedAttributes in ${elementName} is not array, please fix`);
                    }
                }
                // create and observe
                this[hmrCache_1.getSymbolObserver(elementName)] = new MutationObserver(callback);
                this[hmrCache_1.getSymbolObserver(elementName)].observe(this, observerOptions);
                if (mostRecentImpl.connectedCallback) {
                    mostRecentImpl.connectedCallback.apply(this, arguments);
                }
            }
            disconnectedCallback() {
                // cleanup
                this[hmrCache_1.getSymbolObserver(elementName)].disconnect();
                this[hmrCache_1.getSymbolObserver(elementName)] = null;
                const mostRecentImpl = hmrCache_1.getMostRecentImpl(elementName).prototype;
                if (mostRecentImpl.disconnectedCallback) {
                    mostRecentImpl.disconnectedCallback.apply(this, arguments);
                }
            }
            adoptedCallback() {
                const mostRecentImpl = hmrCache_1.getMostRecentImpl(elementName).prototype;
                if (mostRecentImpl.adoptedCallback) {
                    mostRecentImpl.adoptedCallback.apply(this, arguments);
                }
            }
        };
    }
    exports_1("createHookClass", createHookClass);
    return {
        setters: [
            function (hmrCache_1_1) {
                hmrCache_1 = hmrCache_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=createHookClass.js.map