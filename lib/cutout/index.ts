import type { MprObservation } from "../time/Series";
import type { CutoutResponse } from "./response";
import { getDate } from "../time";

interface Cutout extends MprObservation {
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

namespace Cutout {
    export const parse = (cutout: CutoutResponse): Cutout[] =>
        cutout.map(record => Object.assign(record, {
            date: getDate(record.date),
            reportDate: getDate(record.reportDate)
        }));
}

export default Cutout;
