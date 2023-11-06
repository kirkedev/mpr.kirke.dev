import { getDate, type Nullable } from "..";
import Series, { type MprObservation } from "../time/Series";
import { Arrangement, type Basis, type Seller } from "../PurchaseType";
import map from "../itertools/map";
import filter from "../itertools/filter";
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

    export const marketFormula = (purchases: Iterable<Purchase>): Series =>
        Series.sort(map(filter(purchases, purchase => purchase.arrangement === Arrangement.MarketFormula),
            ({ date, avgPrice: value }) => ({
                date,
                value: value ?? Number.NaN
            })));
}

export default Purchase;
