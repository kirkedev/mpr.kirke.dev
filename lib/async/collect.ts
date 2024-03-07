import { type UnaryOperator } from "..";
import { iterate } from ".";

function collect<T>(iterable: AsyncIterable<T>): UnaryOperator<void, Array<T>> {
    const iterator = iterate(iterable);
    const results = new Array<T>();

    (async function() {
        let result = await iterator.next();

        while (!result.done) {
            results.push(result.value);
            result = await iterator.next();
        }
    })();

    return (): Array<T> => {
        iterator.return?.();
        return results;
    };
}

export default collect;
