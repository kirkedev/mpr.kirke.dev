import { getDate } from "..";
import type Observation from "../Observation";
import { Arrangement, Basis, Seller } from "../PurchaseType";
import type { PurchaseResponse } from "./serialize";

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
        purchases.map(record => Object.assign({}, record,{
            date: getDate(record.date),
            reportDate: getDate(record.reportDate)
        }));
}

export default Purchase;
