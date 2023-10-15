import type { Nullable } from "..";
import type { MprRecord, MprResponse } from "../mpr";
import type MprReport from "../mpr/MprReport";
import type MprSection from "../mpr/MprSection";

interface PurchaseRecord extends MprRecord {
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

interface PurchaseReport extends MprReport<Section> {
    section(section: "National Volume and Price Data"): MprSection<"National Volume and Price Data", PurchaseRecord>;
}

export type { PurchaseReport, Purchases, PurchaseRecord };
