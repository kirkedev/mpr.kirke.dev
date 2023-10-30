import { expect, test } from "vitest";
import { get } from "svelte/store";
import Interactor, { type Action } from "lib/Interactor";
import store from "app/store";
import { tick } from "svelte";

const plus = (value: number): Action<number> =>
    (state: number) => value + state;

const multiply = (value: number): Action<number> =>
    (state: number) => value * state;

test("convert interactor to svelte store", async () => {
    const interactor = new Interactor(0);
    const model = store(interactor);

    interactor.execute(plus(1));
    await tick();

    expect(interactor.state).toBe(1);
    expect(get(model)).toBe(1);

    interactor.execute(multiply(10));
    await tick();

    expect(interactor.state).toBe(10);
    expect(get(model)).toBe(10);
});

test("stop state generation with close", async () => {
    const interactor = new Interactor(0);
    const model = store(interactor);
    const values = new Array<number>();

    model.subscribe(value => {
        values.push(value);
    });

    interactor.execute(plus(5));
    await tick();

    interactor.execute(multiply(10));
    await tick();

    interactor.close();

    expect(values).toEqual([0, 5, 50]);
    expect(interactor.state).toBe(50);
    expect(get(model)).toBe(50);

    interactor.execute(plus(50));
    await tick();

    expect(values).toEqual([0, 5, 50]);
    expect(interactor.state).toBe(50);
    expect(get(model)).toBe(50);
});
