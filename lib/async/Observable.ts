import type { Callback } from "..";

class Observer<T> implements AsyncIterator<T> {
    #done = false;
    public onClose?: Callback<Observer<T>>;
    readonly #subscribers = new Array<Callback<IteratorResult<T>>>();

    public emit = (value: T): void => {
        this.#subscribers.shift()?.({ value, done: false });
    };

    public next = (): Promise<IteratorResult<T>> => {
        return this.#done
            ? Promise.resolve({ done: true, value: undefined })
            : new Promise(resolve => {
                this.#subscribers.push(resolve);
            });
    };

    public return = (): Promise<IteratorResult<T>> => {
        while (this.#subscribers.length) {
            this.#subscribers.shift()?.({ value: undefined, done: true });
        }

        this.#done = true;
        this.onClose?.(this);
        return Promise.resolve({ value: undefined, done: true });
    };
}

class Observable<T> implements AsyncIterable<T> {
    readonly #observers = new Set<Observer<T>>();

    public emit = (value: T): void => {
        this.#observers.forEach(observer => observer.emit(value));
    };

    public [Symbol.asyncIterator] = (): AsyncIterator<T> => {
        const observer = new Observer<T>();
        this.#observers.add(observer);
        observer.onClose = observer => this.#observers.delete(observer);
        return observer;
    };
}

export default Observable;
