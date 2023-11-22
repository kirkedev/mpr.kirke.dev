import type { Callback } from "..";
import { iterate } from ".";

function each<T>(iterable: AsyncIterable<T>, callback: Callback<T>): Callback<void> {
    const iterator = iterate(iterable);

    (async function() {
        let result = await iterator.next();

        while (!result.done) {
            callback(result.value);
            result = await iterator.next();
        }
    })();

    return () => {
        iterator.return?.();
    };
}

export { each };
