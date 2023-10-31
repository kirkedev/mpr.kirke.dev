import type { Comparator } from ".";
import { bisector } from "d3-array";

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

const { center: bisectDate } = bisector<Observation, Date>(datum => datum.date);

const comparator: Comparator<Observation> = ({ date: a }: Observation, { date: b }: Observation) =>
    a === b ? 0 : a < b ? -1 : 1;

namespace Observation {
    export const sort = <T extends Observation>(observations: Iterable<T>): T[] =>
        Array.from(observations).sort(comparator);

    export const get = (data: Series, date: Date): Data =>
        data[bisectDate(data, date)];
}

export default Observation;

export type { MprObservation, Data, Series };
