import { iterate, type UnaryOperator } from ".";
import flatten from "./flatten";

async function* mapElementsAsync<T, R>(iterator: AsyncIterator<T>, operator: UnaryOperator<T, R>): AsyncIterator<R> {
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

class MappedAsyncIterable<T, R> implements AsyncIterable<R> {
    public constructor(
        private readonly iterable: AsyncIterable<T>,
        private readonly operator: UnaryOperator<T, R>) {
    }

    public [Symbol.asyncIterator] = (): AsyncIterator<R> =>
        mapElementsAsync(iterate(this.iterable), this.operator);
}

const map = <T, R>(iterable: AsyncIterable<T>, operator: UnaryOperator<T, R>): MappedAsyncIterable<T, R> =>
    new MappedAsyncIterable(iterable, operator);

const flatMap = <T, R>(iterable: AsyncIterable<T>, operator: UnaryOperator<T, AsyncIterable<R>>): AsyncIterable<R> =>
    flatten(map(iterable, operator));

export default map;

export { flatMap };
