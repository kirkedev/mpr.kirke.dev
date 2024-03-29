import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { Arrangement, Basis, Seller } from "../mpr/PurchaseType";

const PurchaseResponse = Type.Array(Type.Object({
    date: Type.String({ format: "date" }),
    reportDate: Type.String({ format: "date" }),
    seller: Type.Enum(Seller),
    arrangement: Type.Enum(Arrangement),
    basis: Type.Enum(Basis),
    headCount: Type.Integer({ minimum: 0 }),
    avgPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null }),
    lowPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null }),
    highPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null })
}));

export default PurchaseResponse;

export type PurchaseResponse = Static<typeof PurchaseResponse>;
