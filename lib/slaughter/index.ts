import { getDate } from "..";
import type Observation from "../Observation";
import type { Arrangement, Basis, Seller } from "../PurchaseType";
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
            carcassWeight: record.carcassWeight ?? Number.NaN,
            liveWeight: record.liveWeight ?? Number.NaN,
            basePrice: record.basePrice ?? Number.NaN,
            netPrice: record.netPrice ?? Number.NaN,
            lowPrice: record.lowPrice ?? Number.NaN,
            highPrice: record.highPrice ?? Number.NaN,
            leanPercent: record.leanPercent ?? Number.NaN
        }));
}

export default Slaughter;
