import { type Callback, type UnaryOperator } from "..";
import { iterate } from ".";
import { each } from "./accumulate";
import Observable from "./Observable";

type Action<T> = UnaryOperator<T, T>;
type AsyncAction<T> = UnaryOperator<T, Promise<T>>;

class ObservableState<State> implements AsyncIterable<State> {
    #state: State;
    readonly #states = new Observable<State>();

    public constructor(state: State) {
        this.#state = state;
    }

    public get state(): State {
        return this.#state;
    }

    public set state(state: State) {
        this.#state = state;
        this.#states.emit(state);
    }

    public [Symbol.asyncIterator] = (): AsyncIterator<State> =>
        iterate(this.#states);

    public dispatch = (action: Action<State> | AsyncAction<State>): this => {
        Promise.resolve(action(this.state)).then(state => this.state = state);
        return this;
    };

    public subscribe = (callback: Callback<State>): UnaryOperator<void, Promise<void>> => {
        callback(this.state);
        return each(this, callback);
    };
}

export default ObservableState;

export type { Action, AsyncAction };
