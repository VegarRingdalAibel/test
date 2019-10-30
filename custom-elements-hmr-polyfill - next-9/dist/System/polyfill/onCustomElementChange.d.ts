export declare type CustomElementChangeListener = (elementName: string, impl: any, options: ElementDefinitionOptions) => boolean | void;
export declare const onCustomElementChange: (changeListener: CustomElementChangeListener) => void;
