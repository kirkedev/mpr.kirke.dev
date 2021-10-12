import { getDate } from "..";
import type Observation from "../Observation";
import { Arrangement, Basis, Seller } from "../PurchaseType";
import type { SlaughterResponse } from "./serialize";

interface Slaughter extends Observation {
    reportDate: Date;
    basis: Basis;
    arrangement: Arrangement;
    seller: Seller;
    headCount: number;
    carcassWeight: number;
    liveWeight: number;
    basePrice: number;
    netPrice: number;
    lowPrice: number;
    highPrice: number;
    leanPercent: number;
}

namespace Slaughter {
    export const parse = (slaughter: SlaughterResponse): Slaughter[] =>
        slaughter.map(record => Object.assign({}, record, {
            date: getDate(record.date),
            reportDate: getDate(record.reportDate)
        }));
}

export default Slaughter;
