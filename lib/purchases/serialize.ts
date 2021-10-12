import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { formatDate } from "..";
import { Arrangement, Basis, Seller } from "../PurchaseType";
import type Purchase from ".";

const Response = Type.Array(Type.Object({
    date: Type.String({ format: "date" }),
    reportDate: Type.String({ format: "date" }),
    seller: Type.Enum(Seller),
    arrangement: Type.Enum(Arrangement),
    basis: Type.Enum(Basis),
    headCount: Type.Integer({ minimum: 0 }),
    avgPrice: Type.Number({ minimum: 0 }),
    lowPrice: Type.Number({ minimum: 0 }),
    highPrice: Type.Number({ minimum: 0 })
}));

const serialize = (records: Purchase[]): PurchaseResponse =>
    records.map(record => Object.assign({}, record, {
        date: formatDate(record.date),
        reportDate: formatDate(record.reportDate)
    }));

export default serialize;

export type PurchaseResponse = Static<typeof Response>;
