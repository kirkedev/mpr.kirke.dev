import { expect, test } from "vitest";
import Interactor, { type Action } from "lib/Interactor";
import { collect, tick } from ".";

const plus = (value: number): Action<number> =>
    (state: number) => value + state;

const multiply = (value: number): Action<number> =>
    (state: number) => value * state;

test("dispatch actions to interactor to modify state", () => {
    const interactor = new Interactor(0);

    interactor.execute(plus(1));
    expect(interactor.state).toBe(1);

    interactor.execute(multiply(10));
    expect(interactor.state).toBe(10);
});

test("collect interactor states to array", async () => {
    const interactor = new Interactor(0);
    const [states, close] = collect(interactor);

    interactor.execute(plus(10));
    await tick();

    interactor.execute(multiply(10));
    await tick();

    interactor.execute(multiply(10));
    await tick();

    close();

    expect(interactor.state).toBe(1000);
    expect(states).toEqual([0, 10, 100, 1000]);
});

test("multiple subscribers", async () => {
    const interactor = new Interactor(0);
    const [first, closeFirst] = collect(interactor);
    const [second, closeSecond] = collect(interactor);
    const [third, closeThird] = collect(interactor);

    interactor.execute(plus(10));
    await tick();

    interactor.execute(multiply(10));
    await tick();

    interactor.execute(multiply(5));
    await tick();

    closeFirst();
    closeSecond();
    closeThird();

    expect(first).toEqual([0, 10, 100, 500]);
    expect(second).toEqual(first);
    expect(third).toEqual(second);
});
