import { type Callback, type UnaryOperator } from "..";
import { iterate } from ".";
import { each } from "./accumulate";
import Observable from "./Observable";
import map from "./map";

type Action<T> = UnaryOperator<T, T>;
type AsyncAction<T> = UnaryOperator<T, Promise<T>>;

interface State<T> extends AsyncIterable<T> {
    get value(): T;
    subscribe(callback: Callback<T>): UnaryOperator<void, Promise<void>>;
}

class MappedState<T, R> implements State<R> {
    readonly #state: State<T>;
    readonly #operator: UnaryOperator<T, R>;

    public constructor(state: State<T>, operator: UnaryOperator<T, R>) {
        this.#state = state;
        this.#operator = operator;
    }

    public get value(): R {
        return this.#operator(this.#state.value);
    }

    public [Symbol.asyncIterator] = (): AsyncIterator<R> =>
        map(iterate(this.#state), this.#operator);

    public subscribe = (callback: Callback<R>): UnaryOperator<void, Promise<void>> => {
        callback(this.#operator(this.#state.value));
        return each(this, callback);
    };
}

class MutableState<T> implements State<T> {
    public static from = <T>(state: T): MutableState<T> =>
        new MutableState(state);

    #state: T;
    readonly #states = new Observable<T>();

    public constructor(state: T) {
        this.#state = state;
    }

    public get value(): T {
        return this.#state;
    }

    public set value(state: T) {
        this.#state = state;
        this.#states.emit(state);
    }

    public [Symbol.asyncIterator] = (): AsyncIterator<T> =>
        iterate(this.#states);

    public map = <R>(operator: UnaryOperator<T, R>): State<R> =>
        new MappedState(this, operator);

    public dispatch = (action: Action<T> | AsyncAction<T>): this => {
        Promise.resolve(action(this.value)).then(state => this.value = state);
        return this;
    };

    public subscribe = (callback: Callback<T>): UnaryOperator<void, Promise<void>> => {
        callback(this.value);
        return each(this, callback);
    };
}

export default MutableState;

export type { Action, AsyncAction, State };
