import type { Callback, UnaryOperator } from ".";

type Action<T> = UnaryOperator<T, T>;

class Interactor<State> implements AsyncIterableIterator<State> {
    #done = false;
    #state: State;
    readonly #subscribers = new Array<UnaryOperator<void, void>>();

    public constructor(state: State) {
        this.#state = state;
    }

    private get result(): IteratorResult<State> {
        return {
            done: this.#done,
            value: this.state
        };
    }

    public next(): Promise<IteratorResult<State>> {
        return this.#done
            ? Promise.resolve(this.result)
            : new Promise(resolve => {
                this.#subscribers.push(() => resolve(this.result));
            });
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<State> {
        return this;
    }

    #notify(): void {
        const notify = this.#subscribers.shift();

        if (notify != null ) {
            notify();
        }
    }

    public get state(): State {
        return this.#state;
    }

    public set state(state: State) {
        this.#state = state;
        this.#notify();
    }

    public get done(): boolean {
        return this.#done;
    }

    public set done(done: boolean) {
        this.#done = done;
        this.#notify();
    }

    public close(): void {
        this.done = true;
    }

    public execute(action: Action<State>): void {
        this.state = action(this.state);
    }

    public async each(callback: Callback<State>): Promise<void> {
        callback(this.state);

        for await (const state of this) {
            callback(state);
        }
    }

    public subscribe(callback: Callback<State>): Callback<void> {
        this.#done = false;
        this.each(callback);
        return this.close.bind(this);
    }
}

export default Interactor;

export type { Action };
