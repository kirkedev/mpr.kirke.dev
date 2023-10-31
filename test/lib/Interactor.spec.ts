import { expect, test } from "vitest";
import Interactor, { type Action } from "lib/Interactor";

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

test("stop state generation with close", async () => {
    const interactor = new Interactor(0);
    interactor.execute(plus(5));
    interactor.execute(multiply(10));
    expect(interactor.state).toBe(50);
    expect(interactor.done).toBe(false);

    let result = interactor.next();
    interactor.close();
    expect(await result).toEqual({ done: true, value: 50 });
    expect(interactor.done).toBe(true);

    result = interactor.next();
    expect(await result).toEqual({ done: true, value: 50 });

    interactor.execute(plus(50));
    expect(interactor.state).toBe(50);
});

test("restart closed interactor", () => {
    const interactor = new Interactor(0);
    interactor.execute(plus(5));
    interactor.execute(multiply(10));
    expect(interactor.state).toBe(50);

    interactor.close();
    interactor.execute(plus(50));
    expect(interactor.state).toBe(50);

    interactor.done = false;
    interactor.execute(plus(50));
    expect(interactor.state).toBe(100);
});

test("collect interactor states to array", async () => {
    const interactor = new Interactor(0);
    const states = new Array<number>();

    const done = (async function() {
        for await (const state of interactor) {
            states.push(state);
        }
    })();

    interactor.execute(plus(10));
    await new Promise(resolve => setTimeout(resolve, 0));

    interactor.execute(multiply(10));
    await new Promise(resolve => setTimeout(resolve, 0));

    interactor.execute(multiply(10));
    await new Promise(resolve => setTimeout(resolve, 0));

    interactor.close();
    await done;

    expect(interactor.state).toBe(1000);
    expect(interactor.done).toBe(true);
    expect(states).toEqual([10, 100, 1000]);
});

test("multiple subscribers", async () => {
    const interactor = new Interactor(0);

    const states = [
        interactor.next().then(result => result.value),
        interactor.next().then(result => result.value),
        interactor.next().then(result => result.value)
    ];

    interactor.execute(plus(10));
    interactor.execute(multiply(10));
    interactor.execute(multiply(5));
    expect(await Promise.all(states)).toEqual([10, 100, 500]);
});
