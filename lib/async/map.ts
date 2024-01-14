import { iterate, type UnaryOperator } from ".";

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

export default map;
