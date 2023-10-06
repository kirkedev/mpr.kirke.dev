import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

const DateRangeQuery = Type.Object({
    start: Type.String({ format: "date" }),
    end: Type.String({ format: "date" })
});

export default DateRangeQuery;

export type DateRangeQuery = Static<typeof DateRangeQuery>;
