import type { Comparator } from ".";

interface Observation {
    date: Date;
    reportDate: Date;
}

const comparator: Comparator<Observation> = ({ date: a }: Observation, { date: b }: Observation) =>
    a === b ? 0 : a < b ? -1 : 1;

namespace Observation {
    export const sort = <T extends Observation>(observations: Iterable<T>): T[] =>
        Array.from(observations).sort(comparator);
}

export default Observation;
