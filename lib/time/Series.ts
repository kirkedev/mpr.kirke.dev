import { type Comparator } from "..";
import Stat from "../Stat";
import { extentBy } from "../itertools/accumulate";

interface Observation {
    date: Date;
}

interface MprObservation extends Observation {
    reportDate: Date;
}

interface Data extends Observation {
    value: number;
}

type Series = Data[];

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

namespace Series {
    export const sort = <T extends Observation>(observations: Iterable<T>): T[] =>
        Array.from(observations).sort(compare);

    export const find = <T extends Observation>(observations: Iterable<T>, date: Date): T =>
        bisect(sort(observations), date);

    export function extent<T extends Observation>(observations: Iterable<T>): readonly [Date, Date] {
        const [min, max] = extentBy(observations, observation => observation.date.getTime());
        return [new Date(min), new Date(max)] as const;
    }

    export const stat = (label: string, series: Series, date: Date): Stat =>
        Stat.from(label, find(series, date).value);
}

export default Series;

export type { Observation, MprObservation, Data };
