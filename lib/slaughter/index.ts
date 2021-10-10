import type { Observation } from "..";
import { getDate } from "..";
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

const parseResponse = (slaughter: SlaughterResponse): Slaughter[] =>
    slaughter.map(record =>
        Object.assign({
            date: getDate(record.date),
            reportDate: getDate(record.reportDate)
        }, record));

export default parseResponse;
export type { Slaughter };
