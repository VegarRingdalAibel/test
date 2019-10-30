import { ReflowStrategy } from './reflowStrategy';
import { rerenderInnerHTML } from '../reflow-strategy/rerenderInnerHTML';
export const createHookElementChangeListener = (reflowStrategy = ReflowStrategy.RERENDER_INNER_HTML, reflowDelayMs = 250, onCustomElementChangeListener) => {
    let timer;
    let elementsChanged = [];
    if (!onCustomElementChangeListener) {
        onCustomElementChangeListener = () => { };
    }
    return (elementName, impl, options) => {
        onCustomElementChangeListener(elementName, impl, options);
        if (reflowStrategy && reflowStrategy === ReflowStrategy.RERENDER_INNER_HTML) {
            elementsChanged.push(elementName);
            clearTimeout(timer);
            timer = setTimeout(() => {
                rerenderInnerHTML();
                elementsChanged = [];
            }, reflowDelayMs);
        }
    };
};
//# sourceMappingURL=createHookElementChangeListener.js.map