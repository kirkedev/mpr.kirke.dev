import type { UnaryOperator } from ".";

type Action<T> = UnaryOperator<T, T>;

class Interactor<State> implements AsyncIterableIterator<State> {
    #done = false;
    #state: State;
    #notify: UnaryOperator<void, void> = () => undefined;

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
                this.#notify = () => resolve(this.result);
            });
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<State> {
        return this;
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
        if (!this.#done) {
            this.state = action(this.state);
        }
    }
}

export default Interactor;

export type { Action };
