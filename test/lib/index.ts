import type Interactor from "lib/Interactor";

const tick = (): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, 0));

const collect = async <T>(interactor: Interactor<T>): Promise<T[]> => {
    const states = [interactor.state];

    await (async function() {
        for await (const state of interactor) {
            states.push(state);
        }
    })();

    return states;
};

export { tick, collect };
