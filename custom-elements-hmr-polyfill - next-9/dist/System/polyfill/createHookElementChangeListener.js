System.register(["./reflowStrategy", "../reflow-strategy/rerenderInnerHTML"], function (exports_1, context_1) {
    "use strict";
    var reflowStrategy_1, rerenderInnerHTML_1, createHookElementChangeListener;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (reflowStrategy_1_1) {
                reflowStrategy_1 = reflowStrategy_1_1;
            },
            function (rerenderInnerHTML_1_1) {
                rerenderInnerHTML_1 = rerenderInnerHTML_1_1;
            }
        ],
        execute: function () {
            exports_1("createHookElementChangeListener", createHookElementChangeListener = (reflowStrategy = reflowStrategy_1.ReflowStrategy.RERENDER_INNER_HTML, reflowDelayMs = 250, onCustomElementChangeListener) => {
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
            });
        }
    };
});
//# sourceMappingURL=createHookElementChangeListener.js.map