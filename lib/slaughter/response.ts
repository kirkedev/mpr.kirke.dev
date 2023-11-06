import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { Arrangement, Basis, Seller } from "../mpr/PurchaseType";

const SlaughterResponse = Type.Array(Type.Object({
    date: Type.String({ format: "date" }),
    reportDate: Type.String({ format: "date" }),
    seller: Type.Enum(Seller),
    arrangement: Type.Enum(Arrangement),
    basis: Type.Enum(Basis),
    headCount: Type.Integer({ minimum: 0 }),
    carcassWeight: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null }),
    liveWeight: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null }),
    basePrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null }),
    netPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null }),
    lowPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null }),
    highPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null }),
    leanPercent: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null })
}));

export default SlaughterResponse;

export type SlaughterResponse = Static<typeof SlaughterResponse>;
