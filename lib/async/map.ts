import { type UnaryOperator } from ".";

async function* map<T, R>(iterator: AsyncIterator<T>, operator: UnaryOperator<T, R>): AsyncIterableIterator<R> {
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
