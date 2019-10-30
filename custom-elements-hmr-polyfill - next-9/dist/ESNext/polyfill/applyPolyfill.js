import { initCache } from './hmrCache';
import { overrideCustomElementDefine } from './overrideCustomElementDefine';
import { onCustomElementChange } from './onCustomElementChange';
import { createHookElementChangeListener } from './createHookElementChangeListener';
import { ReflowStrategy } from './reflowStrategy';
export function applyPolyfill(reflowStrategy = ReflowStrategy.NONE, reflowDelayMs = 250, onCustomElementChangeListener) {
    initCache();
    overrideCustomElementDefine();
    onCustomElementChange(createHookElementChangeListener(reflowStrategy, reflowDelayMs, onCustomElementChangeListener));
}
//# sourceMappingURL=applyPolyfill.js.map