import type { Nullable } from "..";
import type { MprResponse } from "../mpr";
import type MprReport from "../mpr/MprReport";
import type MprSection from "../mpr/MprSection";

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

interface SalesReport extends MprReport<CutType> {
    section(section: "Belly Cuts"): MprSection<"Belly Cuts", SalesRecord>;
    section(section: "Butt Cuts"): MprSection<"Butt Cuts", SalesRecord>;
    section(section: "Ham Cuts"): MprSection<"Ham Cuts", SalesRecord>;
    section(section: "Loin Cuts"): MprSection<"Loin Cuts", SalesRecord>;
    section(section: "Picnic Cuts"): MprSection<"Picnic Cuts", SalesRecord>;
    section(section: "Sparerib Cuts"): MprSection<"Sparerib Cuts", SalesRecord>;
    section(section: "Jowl Cuts"): MprSection<"Jowl Cuts", SalesRecord>;
    section(section: "Added Ingredient Cuts"): MprSection<"Added Ingredient Cuts", SalesRecord>;
    section(section: "Trim Cuts"): MprSection<"Trim Cuts", SalesRecord>;
    section(section: "Variety Cuts"): MprSection<"Variety Cuts", SalesRecord>;
}

export type { SalesReport, CutType, SalesRecord, HistoricalSalesRecord, SalesResponse };
