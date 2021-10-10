import formatISO from "date-fns/formatISO";
import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { Slaughter } from ".";
import { Arrangement, Basis, Seller } from "../PurchaseType";

const Response = Type.Array(Type.Object({
    date: Type.String({ format: "date" }),
    reportDate: Type.String({ format: "date" }),
    seller: Type.Enum(Seller),
    arrangement: Type.Enum(Arrangement),
    basis: Type.Enum(Basis),
    headCount: Type.Integer({ minimum: 0 }),
    carcassWeight: Type.Number({ minimum: 0 }),
    liveWeight: Type.Number({ minimum: 0 }),
    basePrice: Type.Number({ minimum: 0 }),
    netPrice: Type.Number({ minimum: 0 }),
    lowPrice: Type.Number({ minimum: 0 }),
    highPrice: Type.Number({ minimum: 0 }),
    leanPercent: Type.Number({ minimum: 0 }),
}));

const serialize = (records: Slaughter[]): SlaughterResponse =>
    records.map(record =>
        Object.assign({
            date: formatISO(record.date),
            reportDate: formatISO(record.reportDate)
        }, record));

export default serialize;
export type SlaughterResponse = Static<typeof Response>;
