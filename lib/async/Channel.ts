import type { Callback } from "..";

class Subscriber<T> implements AsyncIterator<T> {
    #done = false;
    public onClose?: Callback<Subscriber<T>>;
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
            this.#subscribers.shift()?.({ done: true, value: undefined });
        }

        this.#done = true;
        this.onClose?.(this);
        return Promise.resolve({ done: true, value: undefined });
    };
}

class Channel<T> implements AsyncIterable<T> {
    readonly #subscribers = new Set<Subscriber<T>>();

    public emit = (value: T): void => {
        this.#subscribers.forEach(observer => observer.emit(value));
    };

    public [Symbol.asyncIterator] = (): AsyncIterator<T> => {
        const subscriber = new Subscriber<T>();
        this.#subscribers.add(subscriber);
        subscriber.onClose = observer => this.#subscribers.delete(observer);
        return subscriber;
    };
}

export default Channel;
