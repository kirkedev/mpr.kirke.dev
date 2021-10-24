import type Observation from "lib/Observation";

interface Dimensions {
    width: number;
    height: number;
}

interface Offset {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}

enum Position {
    Top,
    Left,
    Bottom,
    Right
}

interface Data extends Observation {
    value: number;
}

type Series = Iterable<Data>;

export { Position };
export type { Dimensions, Offset, Data, Series };
