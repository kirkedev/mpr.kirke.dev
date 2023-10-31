import type { Comparator } from ".";

interface Observation {
    date: Date;
}

const compare: Comparator<Observation> = ({ date: a }: Observation, { date: b }: Observation) =>
    a === b ? 0 : a < b ? -1 : 1;

function bisect<T extends Observation>(observations: T[], date: Date): T {
    if (observations.length === 0) throw new Error("Attempted to search array with no elements");
    if (observations.length === 1) return observations[0];
    const position = Math.floor(observations.length / 2);
    const observation = observations[position];
    const result = compare({ date }, observation);

    return result === 0
        ? observation
        : result === -1
            ? bisect(observations.slice(0, position), date)
            : bisect(observations.slice(position), date);
}

namespace Observation {
    export const sort = <T extends Observation>(observations: Iterable<T>): T[] =>
        Array.from(observations).sort(compare);

    export const find = <T extends Observation>(data: Iterable<T>, date: Date): T =>
        bisect(sort(data), date);
}

interface MprObservation extends Observation {
    reportDate: Date;
}

interface Data extends Observation {
    value: number;
}

type Series = Data[];

export default Observation;
export type { MprObservation, Data, Series };
