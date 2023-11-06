import { getDate, type Nullable } from "..";
import type { MprObservation } from "../time/Series";
import type { Arrangement, Basis, Seller } from "../PurchaseType";
import type { SlaughterResponse } from "./response";

interface Slaughter extends MprObservation {
    seller: Seller;
    arrangement: Arrangement;
    basis: Basis;
    headCount: number;
    basePrice: Nullable<number>;
    netPrice: Nullable<number>;
    lowPrice: Nullable<number>;
    highPrice: Nullable<number>;
    liveWeight: Nullable<number>;
    carcassWeight: Nullable<number>;
    leanPercent: Nullable<number>;
}

namespace Slaughter {
    export const parse = (slaughter: SlaughterResponse): Slaughter[] =>
        slaughter.map(record => Object.assign(record, {
            date: getDate(record.date),
            reportDate: getDate(record.reportDate)
        }));
}

export default Slaughter;
