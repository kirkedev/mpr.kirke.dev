import type { Nullable } from "..";
import type Observation from "../Observation";
import type { Cut } from "./parse";

interface Sales extends Observation {
    type: Cut;
    description: string;
    weight: number;
    avgPrice: Nullable<number>;
    lowPrice: Nullable<number>;
    highPrice: Nullable<number>;
}

export type { Sales };
