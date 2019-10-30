import { initCache } from './hmrCache';
export const onCustomElementChange = (changeListener) => {
    initCache();
    if (!globalThis.hmrCache.onCustomElementChange) {
        globalThis.hmrCache.onCustomElementChange = changeListener;
    }
};
//# sourceMappingURL=onCustomElementChange.js.map