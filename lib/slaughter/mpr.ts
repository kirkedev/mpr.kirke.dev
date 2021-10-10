import type { Nullable } from "..";
import type { MprResponse } from "../mpr";
import type MprReport from "../mpr/MprReport";

interface BarrowsGiltsRecord extends Record<string, Nullable<string>> {
    for_date_begin: string;
    report_date: string;
    purchase_type: string;
    head_count: Nullable<string>;
    avg_backfat: Nullable<string>;
    avg_carcass_weight: Nullable<string>;
    avg_live_weight: Nullable<string>;
    base_price: Nullable<string>;
    avg_net_price: Nullable<string>;
    highest_net_price: Nullable<string>;
    lowest_net_price: Nullable<string>;
    avg_lean_percent: Nullable<string>;
    loineye_area: Nullable<string>;
    avg_loin_depth: Nullable<string>;
    avg_sort_loss: Nullable<string>;
}

type Section = "Barrows/Gilts";
type BarrowsGilts = MprResponse<Section, BarrowsGiltsRecord>;
type SlaughterReport = MprReport<Section>;

export type { SlaughterReport, BarrowsGilts, BarrowsGiltsRecord };
