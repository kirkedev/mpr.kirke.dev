import { describe, expect, test } from "vitest";
import { accumulate, collect } from "lib/async/accumulate";
import map from "lib/async/map";
import Observable from "lib/async/Observable";
import ObservableState, { type Action } from "lib/async/ObservableState";
import Result from "lib/async/Result";
import { tick } from ".";

const plus = (value: number): Action<number> =>
    (state: number) => value + state;

const multiply = (value: number): Action<number> =>
    (state: number) => value * state;

describe("Observable State", () => {
    test("Modify observable state by dispatching actions", async () => {
        const interactor = new ObservableState(0);

        interactor.dispatch(plus(1));
        await tick();
        expect(interactor.state).toBe(1);

        interactor.dispatch(multiply(10));
        await tick();
        expect(interactor.state).toBe(10);
    });

    test("collect interactor states to array", async () => {
        const interactor = new ObservableState(0);
        const states = collect(interactor);

        interactor.dispatch(plus(10));
        await tick();

        interactor.dispatch(multiply(10));
        await tick();

        interactor.dispatch(multiply(10));
        await tick();

        expect(interactor.state).toBe(1000);
        expect(states()).toEqual([10, 100, 1000]);
    });

    test("multiple subscribers", async () => {
        const interactor = new ObservableState(0);
        const first = collect(interactor);
        const second = collect(interactor);
        const third = collect(interactor);

        interactor.dispatch(plus(10));
        await tick();

        interactor.dispatch(multiply(10));
        await tick();

        interactor.dispatch(multiply(5));
        await tick();

        expect(first()).toEqual([10, 100, 500]);
        expect(second()).toEqual([10, 100, 500]);
        expect(third()).toEqual([10, 100, 500]);
    });
});

describe("Create reducers for a greeting state", () => {
    interface State {
        greeting: string;
        name: string;
    }

    class Greeter {
        readonly #state: State;

        public constructor(state: State) {
            this.#state = state;
        }

        public get greeting(): string {
            return `${this.#state.greeting}, ${this.#state.name}!`;
        }
    }

    const updateGreeting = (greeting: string): Action<State> =>
        function(state: State) {
            return { ...state, greeting };
        };

    const updateName = (name: string): Action<State> =>
        function(state: State) {
            return { ...state, name };
        };

    test("emit actions as types, the react way", async () => {
        const UpdateGreeting = "greeting";
        const UpdateName = "name";

        class UpdateGreetingAction {
            public readonly type = UpdateGreeting;
            public constructor(public readonly greeting: string) {}
        }

        class UpdateNameAction {
            public readonly type = UpdateName;
            public constructor(public readonly name: string) {}
        }

        type Actions = UpdateGreetingAction | UpdateNameAction;

        const actions = new Observable<Actions>();

        const states = accumulate(actions, (state, action) => {
            switch (action.type) {
                case UpdateGreeting:
                    return updateGreeting(action.greeting)(state);
                case UpdateName:
                    return updateName(action.name)(state);
            }
        }, { greeting: "Hello", name: "World" });

        const models = collect(map(states, state => new Greeter(state)));

        actions.emit(new UpdateGreetingAction("Goodbye"));
        await tick();

        actions.emit(new UpdateNameAction("Andrew"));
        await tick();

        actions.emit(new UpdateGreetingAction("Hello"));
        await tick();

        expect(models().map(model => model.greeting)).toEqual([
            "Goodbye, World!",
            "Goodbye, Andrew!",
            "Hello, Andrew!"
        ]);
    });

    test("emit actions as patches to state", async () => {
        const actions = new Observable<Partial<State>>();

        const states = accumulate(actions, (state, update) => ({ ...state, ...update }),
            { greeting: "Hello", name: "World" });

        const models = collect(map(states, state => new Greeter(state)));

        actions.emit({ greeting: "Goodbye" });
        await tick();

        actions.emit({ name: "Andrew" });
        await tick();

        actions.emit({ greeting: "Hello" });
        await tick();

        expect(models().map(model => model.greeting)).toEqual([
            "Goodbye, World!",
            "Goodbye, Andrew!",
            "Hello, Andrew!"
        ]);
    });

    test("emit actions as functions", async () => {
        const actions = new Observable<Action<State>>();

        const states = accumulate(actions, (state, action) => action(state),
            { greeting: "Hello", name: "World" });

        const models = collect(map(states, state => new Greeter(state)));

        actions.emit(updateGreeting("Goodbye"));
        await tick();

        actions.emit(updateName("Andrew"));
        await tick();

        actions.emit(updateGreeting("Hello"));
        await tick();

        expect(models().map(model => model.greeting)).toEqual([
            "Goodbye, World!",
            "Goodbye, Andrew!",
            "Hello, Andrew!"
        ]);
    });

    test("use an observable state", async () => {
        const greeting = new ObservableState<State>({ greeting: "Hello", name: "World" });
        const models = collect(map(greeting, state => new Greeter(state)));

        greeting.dispatch(updateGreeting("Goodbye"));
        await tick();

        greeting.dispatch(updateName("Andrew"));
        await tick();

        greeting.dispatch(updateGreeting("Hello"));
        await tick();

        expect(models().map(model => model.greeting)).toEqual([
            "Goodbye, World!",
            "Goodbye, Andrew!",
            "Hello, Andrew!"
        ]);
    });

    test("subclass an observable state", async () => {
        class Greeting extends ObservableState<State> {
            public constructor() {
                super({ greeting: "Hello", name: "World" });
            }

            public set greeting(greeting: string) {
                this.dispatch(updateGreeting(greeting));
            }

            public set name(name: string) {
                this.dispatch(updateName(name));
            }
        }

        const state = new Greeting();
        const models = collect(map(state, state => new Greeter(state)));

        state.greeting = "Goodbye";
        await tick();

        state.name = "Andrew";
        await tick();

        state.greeting = "Hello";
        await tick();

        expect(models().map(model => model.greeting)).toEqual([
            "Goodbye, World!",
            "Goodbye, Andrew!",
            "Hello, Andrew!"
        ]);
    });
});

describe("Result class", () => {
    test("Loading", () => {
        const result = new Result.Loading();
        expect(result.data).toBeUndefined();
        expect(Result.isLoading(result)).toBe(true);
        expect(Result.isSuccess(result)).toBe(false);
        expect(Result.isFailure(result)).toBe(false);
    });

    test("Loading with prior data", () => {
        const result = new Result.Loading("old data");
        expect(result.data).toBe("old data");
        expect(Result.isLoading(result)).toBe(true);
        expect(Result.isSuccess(result)).toBe(false);
        expect(Result.isFailure(result)).toBe(false);
    });

    test("Success", () => {
        const result = new Result.Success("new data");
        expect(result.data).toBe("new data");
        expect(Result.isLoading(result)).toBe(false);
        expect(Result.isSuccess(result)).toBe(true);
        expect(Result.isFailure(result)).toBe(false);
    });

    test("Failure", () => {
        const result = new Result.Failure(Error("A problem has occurred"));
        expect(result.error.message).toBe("A problem has occurred");
        expect(Result.isLoading(result)).toBe(false);
        expect(Result.isSuccess(result)).toBe(false);
        expect(Result.isFailure(result)).toBe(true);
    });
});
