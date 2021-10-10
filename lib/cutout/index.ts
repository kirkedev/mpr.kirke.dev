import type { Observation } from "..";

interface Cutout extends Observation {
    reportDate: Date;
    primalLoads: number;
    trimmingLoads: number;
    carcassPrice: number;
    bellyPrice: number;
    buttPrice: number;
    hamPrice: number;
    loinPrice: number;
    picnicPrice: number;
    ribPrice: number;
}

export type { Cutout };
