import type Observation from "../Observation";
import type { Cut } from "./parse";

interface Sales extends Observation {
    type: Cut;
    description: string;
    weight: number;
    avgPrice: number;
    lowPrice: number;
    highPrice: number;
}

export type { Sales };
