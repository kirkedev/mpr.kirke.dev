import type { BinaryOperator } from "..";
import { iterate } from ".";

function* groupItems<T>(items: Iterator<T>, group: BinaryOperator<T, T, boolean>): Iterator<T[]> {
    const first = items.next();
    if (first.done) return;

    let result = items.next();
    const data = [first.value];

    while (!result.done) {
        const { value } = result;
        const last = data[data.length - 1];

        if (group(last, value)) {
            data.push(value);
        } else {
            yield data.splice(0, data.length, value);
        }

        result = items.next();
    }

    yield data;
}

class GroupedIterable<T> implements Iterable<T[]>{
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly group: (last: T, current: T) => boolean) {
    }

    public [Symbol.iterator] = (): Iterator<T[]> =>
        groupItems(iterate(this.iterable), this.group);
}

const groupBy = <T>(iterable: Iterable<T>, group: (last: T, current: T) => boolean): Iterable<T[]> =>
    new GroupedIterable(iterable, group);

export default groupBy;
