import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

const CutoutResponse = Type.Array(Type.Object({
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

type CutoutResponse = Static<typeof CutoutResponse>;

export default CutoutResponse;
export type { CutoutResponse };
