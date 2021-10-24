import type Observation from "lib/Observation";

interface Dimensions {
    width: number;
    height: number;
}

interface Offset {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

interface Data extends Observation {
    value: number;
}

type Series = Iterable<Data>;

export type { Dimensions, Offset, Data, Series };
