import type { Callback, UnaryOperator } from ".";
import { iterateAsync } from "./itertools";

type Action<T> = UnaryOperator<T, T>;

class StateIterator<State> implements AsyncIterator<State> {
    #done = false;
    #value: State;
    readonly #subscribers = new Array<UnaryOperator<void, void>>();

    readonly #notify = (): void => {
        this.#subscribers.shift()?.();
    };

    public constructor(value: State) {
        this.#value = value;
    }

    private get result(): IteratorResult<State> {
        return {
            done: this.#done,
            value: this.#value
        };
    }

    public get value(): State {
        return this.#value;
    }

    public set value(value: State) {
        this.#value = value;
        this.#notify();
    }

    public get done(): boolean {
        return this.#done;
    }

    public set done(done: boolean) {
        this.#done = done;
        this.#notify();
    }

    public next(): Promise<IteratorResult<State>> {
        return this.#done
            ? Promise.resolve(this.result)
            : new Promise(resolve => {
                this.#subscribers.push(() => resolve(this.result));
            });
    }

    public each = async (callback: Callback<State>): Promise<void> => {
        while (!this.done) {
            callback(this.value);
            await this.next();
        }
    };

    public close = (): void => {
        this.done = true;
    };
}

class Interactor<State> implements AsyncIterable<State> {
    #state: State;
    readonly #subscribers = new Set<StateIterator<State>>();

    readonly #notify = (): void => {
        this.#subscribers.forEach(subscriber => subscriber.value = this.#state);
    };

    public constructor(state: State) {
        this.#state = state;
    }

    public [Symbol.asyncIterator] = (): StateIterator<State> => {
        const iterator = new StateIterator(this.#state);
        this.#subscribers.add(iterator);
        return iterator;
    };

    public get state(): State {
        return this.#state;
    }

    public set state(state: State) {
        this.#state = state;
        this.#notify();
    }

    public execute = (action: Action<State>): void => {
        this.state = action(this.state);
    };

    public subscribe = (callback: Callback<State>): Callback<void> => {
        const states = iterateAsync(this) as StateIterator<State>;

        states.each(callback).then(() => {
            this.#subscribers.delete(states);
        });

        return states.close;
    };
}

export default Interactor;

export type { Action };
