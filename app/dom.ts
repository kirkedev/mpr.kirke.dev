import type { Optional } from "lib";

function getElement<T extends HTMLElement | SVGElement >(selector: string) {
    let element: T;

    return function(parent: ParentNode): Optional<T> {
        if (element !== undefined) return element;

        const selected = parent.querySelector(selector);

        if (selected != null) {
            element = selected as T;
        }

        return element;
    };
}

function dispatch<T>(this: EventTarget, name: string, detail: T, options?: EventInit) {
    this.dispatchEvent(new CustomEvent(name, Object.assign({ detail }, options ?? {
        bubbles: true,
        cancelable: true
    })));
}

export { getElement, dispatch };
