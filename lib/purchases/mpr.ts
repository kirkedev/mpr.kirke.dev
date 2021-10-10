import type { Nullable } from "..";
import type { MprResponse } from "../mpr";
import type MprReport from "../mpr/MprReport";

interface BarrowsGiltsRecord extends Record<string, Nullable<string>> {
    report_date: string;
    purchase_type: string;
    head_count: Nullable<string>;
    wtd_avg: Nullable<string>;
    price_high: Nullable<string>;
    price_low: Nullable<string>;
    rolling_avg: Nullable<string>;
}

interface HistoricalPurchaseRecord extends BarrowsGiltsRecord {
    reported_for_date: string;
}

type Section = "Barrows/Gilts (producer/packer sold)";

type BarrowsGilts = MprResponse<"Barrows/Gilts (producer/packer sold)", BarrowsGiltsRecord>;

type PurchaseReport = MprReport<Section>;

export type { PurchaseReport, BarrowsGiltsRecord, HistoricalPurchaseRecord, BarrowsGilts };
