import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { Arrangement, Basis, Seller } from "../PurchaseType";

const SlaughterResponse = Type.Array(Type.Object({
    date: Type.String({ format: "date" }),
    reportDate: Type.String({ format: "date" }),
    seller: Type.Enum(Seller),
    arrangement: Type.Enum(Arrangement),
    basis: Type.Enum(Basis),
    headCount: Type.Integer({ minimum: 0 }),
    carcassWeight: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    liveWeight: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    basePrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    netPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    lowPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    highPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    leanPercent: Type.Union([Type.Number({ minimum: 0 }), Type.Null()])
}));

export default SlaughterResponse;
export type SlaughterResponse = Static<typeof SlaughterResponse>;
