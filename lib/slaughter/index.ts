import { getDate } from "..";
import type Observation from "../Observation";
import { Arrangement, Basis, Seller } from "../PurchaseType";
import type { SlaughterResponse } from "./response";

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
        slaughter.map(record => ({
            date: getDate(record.date),
            reportDate: getDate(record.reportDate),
            arrangement: record.arrangement,
            seller: record.seller,
            basis: record.basis,
            headCount: record.headCount,
            carcassWeight: record.carcassWeight ?? NaN,
            liveWeight: record.liveWeight ?? NaN,
            basePrice: record.basePrice ?? NaN,
            netPrice: record.netPrice ?? NaN,
            lowPrice: record.lowPrice ?? NaN,
            highPrice: record.highPrice ?? NaN,
            leanPercent: record.leanPercent ?? NaN
        }));
}

export default Slaughter;
