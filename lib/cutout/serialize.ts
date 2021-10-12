import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { formatDate } from "..";
import type Cutout from ".";

const Response = Type.Array(Type.Object({
    date: Type.String({ format: "date" }),
    reportDate: Type.String({ format: "date" }),
    primalLoads: Type.Integer({ minimum: 0 }),
    trimmingLoads: Type.Number({ minimum: 0 }),
    carcassPrice: Type.Number({ minimum: 0 }),
    bellyPrice: Type.Number({ minimum: 0 }),
    buttPrice: Type.Number({ minimum: 0 }),
    hamPrice: Type.Number({ minimum: 0 }),
    loinPrice: Type.Number({ minimum: 0 }),
    picnicPrice: Type.Number({ minimum: 0 }),
    ribPrice: Type.Number({ minimum: 0 })
}));

const serialize = (records: Cutout[]): CutoutResponse =>
    records.map(record => Object.assign({}, record, {
        date: formatDate(record.date),
        reportDate: formatDate(record.reportDate)
    }));

export default serialize;

export type CutoutResponse = Static<typeof Response>;
