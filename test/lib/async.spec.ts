import { expect, test } from "vitest";
import { collect } from "lib/async/accumulate";
import ObservableState, { type Action } from "lib/async/ObservableState";
import { tick } from ".";

const plus = (value: number): Action<number> =>
    (state: number) => value + state;

const multiply = (value: number): Action<number> =>
    (state: number) => value * state;

test("dispatch actions to interactor to modify state", async () => {
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
    expect(states()).toEqual([0, 10, 100, 1000]);
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

    expect(first()).toEqual([0, 10, 100, 500]);
    expect(second()).toEqual([0, 10, 100, 500]);
    expect(third()).toEqual([0, 10, 100, 500]);
});
