import type { Nullable } from "..";
import map from "../itertools/map";
import { getDate, optFloat, optInt, type MprRecord, type MprResponse } from "../mpr";
import type MprReport from "../mpr/MprReport";
import type MprSection from "../mpr/MprSection";
import { Arrangement, Basis, Seller, type PurchaseType } from "../PurchaseType";
import type Slaughter from ".";

interface BarrowsGiltsRecord extends MprRecord {
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

interface SlaughterReport extends MprReport<Section> {
    section(section: "Barrows/Gilts"): MprSection<"Barrows/Gilts", BarrowsGiltsRecord>;
}

const PurchaseTypes: Record<string, PurchaseType> = {
    "Prod. Sold Negotiated": [Seller.Producer, Arrangement.Negotiated, Basis.All],
    "Prod. Sold Swine or Pork Market Formula": [Seller.Producer, Arrangement.MarketFormula, Basis.All],
    "Prod. Sold Other Market Formula": [Seller.Producer, Arrangement.OtherMarketFormula, Basis.All],
    "Prod. Sold Negotiated Formula": [Seller.Producer, Arrangement.NegotiatedFormula, Basis.All],
    "Prod. Sold Other Purchase Arrangement": [Seller.Producer, Arrangement.OtherPurchase, Basis.All],
    "Prod. Sold (All Purchase Types)": [Seller.Producer, Arrangement.All, Basis.All],
    "Pack. Sold (All Purchase Types)": [Seller.Packer, Arrangement.All, Basis.All],
    "Packer Owned": [Seller.Packer, Arrangement.PackerOwned, Basis.All]
};

function parseRecord(record: BarrowsGiltsRecord): Slaughter {
    const [seller, arrangement, basis] = PurchaseTypes[record.purchase_type];

    return {
        date: getDate(record.for_date_begin),
        reportDate: getDate(record.report_date),
        seller,
        arrangement,
        basis,
        headCount: optInt(record, "head_count"),
        basePrice: optFloat(record, "base_price"),
        netPrice: optFloat(record, "avg_net_price"),
        lowPrice: optFloat(record, "lowest_net_price"),
        highPrice: optFloat(record, "highest_net_price"),
        liveWeight: optFloat(record, "avg_live_weight"),
        carcassWeight: optFloat(record, "avg_carcass_weight"),
        leanPercent: optFloat(record, "avg_lean_percent")
    };
}

const parse = (response: BarrowsGilts): Iterable<Slaughter> =>
    map(response.results, parseRecord);

export default parse;

export type { SlaughterReport, BarrowsGilts, BarrowsGiltsRecord };
