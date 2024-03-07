import type { Callback, UnaryOperator } from "..";
import { iterate } from ".";

function each<T>(iterable: AsyncIterable<T>, callback: Callback<T>): UnaryOperator<void, Promise<void>> {
    const iterator = iterate(iterable);

    (async function() {
        let result = await iterator.next();

        while (!result.done) {
            callback(result.value);
            result = await iterator.next();
        }
    })();

    return async () => {
        await iterator.return?.();
    };
}

export default each;
