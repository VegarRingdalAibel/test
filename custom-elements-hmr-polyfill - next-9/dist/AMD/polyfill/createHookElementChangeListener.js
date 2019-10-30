define(["require", "exports", "./reflowStrategy", "../reflow-strategy/rerenderInnerHTML"], function (require, exports, reflowStrategy_1, rerenderInnerHTML_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createHookElementChangeListener = (reflowStrategy = reflowStrategy_1.ReflowStrategy.RERENDER_INNER_HTML, reflowDelayMs = 250, onCustomElementChangeListener) => {
        let timer;
        let elementsChanged = [];
        if (!onCustomElementChangeListener) {
            onCustomElementChangeListener = () => { };
        }
        return (elementName, impl, options) => {
            onCustomElementChangeListener(elementName, impl, options);
            if (reflowStrategy && reflowStrategy === reflowStrategy_1.ReflowStrategy.RERENDER_INNER_HTML) {
                elementsChanged.push(elementName);
                clearTimeout(timer);
                timer = setTimeout(() => {
                    rerenderInnerHTML_1.rerenderInnerHTML();
                    elementsChanged = [];
                }, reflowDelayMs);
            }
        };
    };
});
//# sourceMappingURL=createHookElementChangeListener.js.map