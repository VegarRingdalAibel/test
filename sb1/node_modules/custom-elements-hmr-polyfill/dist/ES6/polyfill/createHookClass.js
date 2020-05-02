import { getMostRecentImpl, getSymbolAttributes, getSymbolObserver } from './hmrCache';
export function createHookClass(elementName, originalImpl) {
    return class extends originalImpl {
        static get observedAttributes() {
            return [];
        }
        connectedCallback() {
            const Impl = getMostRecentImpl(elementName);
            const mostRecentImpl = Impl.prototype;
            const attributes = Impl[getSymbolAttributes(elementName)];
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
            this[getSymbolObserver(elementName)] = new MutationObserver(callback);
            this[getSymbolObserver(elementName)].observe(this, observerOptions);
            if (mostRecentImpl.connectedCallback) {
                mostRecentImpl.connectedCallback.apply(this, arguments);
            }
        }
        disconnectedCallback() {
            // cleanup
            this[getSymbolObserver(elementName)].disconnect();
            this[getSymbolObserver(elementName)] = null;
            const mostRecentImpl = getMostRecentImpl(elementName).prototype;
            if (mostRecentImpl.disconnectedCallback) {
                mostRecentImpl.disconnectedCallback.apply(this, arguments);
            }
        }
        adoptedCallback() {
            const mostRecentImpl = getMostRecentImpl(elementName).prototype;
            if (mostRecentImpl.adoptedCallback) {
                mostRecentImpl.adoptedCallback.apply(this, arguments);
            }
        }
    };
}
//# sourceMappingURL=createHookClass.js.map