export declare function createHookClass(elementName: string, originalImpl: any): {
    new (): {
        [x: string]: any;
        connectedCallback(): void;
        disconnectedCallback(): void;
        adoptedCallback(): void;
    };
    [x: string]: any;
    readonly observedAttributes: any[];
};
