import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { Cut } from "./parse";

const SalesResponse = Type.Array(Type.Object({
    date: Type.String({ format: "date" }),
    reportDate: Type.String({ format: "date" }),
    type: Type.Enum(Cut),
    description: Type.String(),
    weight: Type.Number({ minimum: 0 }),
    avgPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null }),
    lowPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null }),
    highPrice: Type.Union([Type.Number({ minimum: 0 }), Type.Null()], { default: null })
}));

export default SalesResponse;

export type SalesResponse = Static<typeof SalesResponse>;
