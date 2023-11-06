import type { Nullable } from "..";
import { getDate } from "..";
import type { MprObservation } from "../Series";
import type { Cut } from "./parse";
import type { SalesResponse } from "./response";

interface Sales extends MprObservation {
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
