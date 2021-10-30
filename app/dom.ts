import type { Optional, UnaryOperator } from "lib";

function getElement<T extends HTMLElement | SVGElement >(selector: string): UnaryOperator<ParentNode, Optional<T>> {
    let element: Optional<T>;

    return function(parent: ParentNode): Optional<T> {
        if (element !== undefined) return element;

        const selected = parent.querySelector(selector);

        if (selected != null) {
            element = selected as T;
        }

        return element;
    };
}

function dispatch<T>(this: EventTarget, name: string, detail: T, options?: EventInit): void {
    this.dispatchEvent(new CustomEvent(name, Object.assign({ detail }, options ?? {
        bubbles: true,
        cancelable: true
    })));
}

export { getElement, dispatch };
