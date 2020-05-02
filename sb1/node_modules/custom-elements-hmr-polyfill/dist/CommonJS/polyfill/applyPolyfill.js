"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hmrCache_1 = require("./hmrCache");
const overrideCustomElementDefine_1 = require("./overrideCustomElementDefine");
const onCustomElementChange_1 = require("./onCustomElementChange");
const createHookElementChangeListener_1 = require("./createHookElementChangeListener");
const reflowStrategy_1 = require("./reflowStrategy");
function applyPolyfill(reflowStrategy = reflowStrategy_1.ReflowStrategy.NONE, reflowDelayMs = 250, onCustomElementChangeListener) {
    hmrCache_1.initCache();
    overrideCustomElementDefine_1.overrideCustomElementDefine();
    onCustomElementChange_1.onCustomElementChange(createHookElementChangeListener_1.createHookElementChangeListener(reflowStrategy, reflowDelayMs, onCustomElementChangeListener));
}
exports.applyPolyfill = applyPolyfill;
//# sourceMappingURL=applyPolyfill.js.map