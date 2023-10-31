import { getDate, type Nullable } from "..";
import type { MprObservation } from "../Observation";
import type { Arrangement, Basis, Seller } from "../PurchaseType";
import { type PurchaseResponse } from "./response";

interface Purchase extends MprObservation {
    seller: Seller;
    arrangement: Arrangement;
    basis: Basis;
    headCount: number;
    avgPrice: Nullable<number>;
    lowPrice: Nullable<number>;
    highPrice: Nullable<number>;
}

namespace Purchase {
    export const parse = (purchases: PurchaseResponse): Purchase[] =>
        purchases.map(record => Object.assign(record, {
            date: getDate(record.date),
            reportDate: getDate(record.reportDate)
        }));
}

export default Purchase;
