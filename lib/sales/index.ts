import type { Nullable } from "..";
import type Observation from "../Observation";
import type { Cut } from "./parse";
import { getDate } from "..";
import type { SalesResponse } from "./response";

interface Sales extends Observation {
    type: Cut;
    description: string;
    weight: number;
    avgPrice: Nullable<number>;
    lowPrice: Nullable<number>;
    highPrice: Nullable<number>;
}

namespace Sales {
    export const parse = (sales: SalesResponse): Sales[] =>
        sales.map(record => Object.assign(record, {
            date: getDate(record.date),
            reportDate: getDate(record.reportDate)
        }));
}

export type { Sales };
