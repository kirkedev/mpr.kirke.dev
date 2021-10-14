import { getDate } from "..";
import type Observation from "../Observation";
import { Arrangement, Basis, Seller } from "../PurchaseType";
import type { PurchaseResponse } from "./response";

interface Purchase extends Observation {
    reportDate: Date;
    seller: Seller;
    arrangement: Arrangement;
    basis: Basis;
    headCount: number;
    avgPrice: number;
    lowPrice: number;
    highPrice: number;
}

namespace Purchase {
    export const parse = (purchases: PurchaseResponse): Purchase[] =>
        purchases.map(record => ({
            date: getDate(record.date),
            reportDate: getDate(record.reportDate),
            seller: record.seller,
            arrangement: record.arrangement,
            basis: record.basis,
            headCount: record.headCount,
            avgPrice: record.avgPrice ?? NaN,
            lowPrice: record.lowPrice ?? NaN,
            highPrice: record.highPrice ?? NaN
        }));
}

export default Purchase;
