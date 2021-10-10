import type { Nullable } from "..";
import type { MprResponse } from "../mpr";
import type MprReport from "../mpr/MprReport";

interface SalesRecord extends Record<string, Nullable<string>> {
    report_date: string;
    Item_Description: string;
    total_pounds: Nullable<string>;
    weighted_average: Nullable<string>;
    price_range_low: Nullable<string>;
    price_range_high: Nullable<string>;
}

interface HistoricalSalesRecord extends SalesRecord {
    report_for_date: string;
}

type CutType = "Belly Cuts"
    | "Butt Cuts"
    | "Ham Cuts"
    | "Loin Cuts"
    | "Picnic Cuts"
    | "Sparerib Cuts"
    | "Jowl Cuts"
    | "Added Ingredient Cuts"
    | "Trim Cuts"
    | "Variety Cuts";

type SalesResponse = MprResponse<CutType, SalesRecord>;

type SalesReport = MprReport<CutType>;

export type { SalesReport, CutType, SalesRecord, HistoricalSalesRecord, SalesResponse };
