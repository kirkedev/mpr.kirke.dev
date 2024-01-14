import { iterate, type UnaryOperator } from ".";
import flatten from "./flatten";

async function* map<T, R>(iterable: AsyncIterable<T>, operator: UnaryOperator<T, R>): AsyncIterableIterator<R> {
    const iterator = iterate(iterable);

    try {
        let result = await iterator.next();

        while (!result.done) {
            yield await operator(result.value);
            result = await iterator.next();
        }
    } finally {
        await iterator.return?.();
    }
}

const flatMap = <T, R>(iterable: AsyncIterable<T>, operator: UnaryOperator<T, AsyncIterable<R>>): AsyncIterableIterator<R> =>
    flatten(map(iterable, operator));

export default map;

export { flatMap };
