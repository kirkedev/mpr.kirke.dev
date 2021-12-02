import type { Nullable } from "..";
import type { MprResponse } from "../mpr";
import type MprReport from "../mpr/MprReport";

interface PurchaseRecord extends Record<string, Nullable<string>> {
    report_date: string;
    reported_for_date: string;
    purchase_type: string;
    head_count: Nullable<string>;
    price_avg: Nullable<string>;
    price_min: Nullable<string>;
    price_max: Nullable<string>;
}

type Section = "National Volume and Price Data";
type Purchases = MprResponse<Section, PurchaseRecord>;
type PurchaseReport = MprReport<Section>;

export type { PurchaseReport, Purchases, PurchaseRecord };
