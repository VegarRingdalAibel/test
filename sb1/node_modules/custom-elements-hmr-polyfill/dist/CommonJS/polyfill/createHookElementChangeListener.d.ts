import { CustomElementChangeListener } from './onCustomElementChange';
import { ReflowStrategy } from './reflowStrategy';
export declare const createHookElementChangeListener: (reflowStrategy?: ReflowStrategy, reflowDelayMs?: number, onCustomElementChangeListener?: CustomElementChangeListener) => CustomElementChangeListener;
