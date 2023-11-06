import type { Nullable } from "..";
import { Arrangement, Basis, type PurchaseType, Seller } from "../mpr/PurchaseType";
import map from "../itertools/map";
import { getDate, type MprRecord, type MprResponse, optFloat, optInt } from "../mpr";
import type MprReport from "../mpr/MprReport";
import type MprSection from "../mpr/MprSection";
import type Purchase from ".";

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

const PurchaseTypes: Record<string, PurchaseType> = {
    "Negotiated (carcass basis)": [Seller.All, Arrangement.Negotiated, Basis.Carcass],
    "Negotiated Formula (carcass basis)": [Seller.All, Arrangement.NegotiatedFormula, Basis.Carcass],
    "Other Market Formula (carcass basis)": [Seller.All, Arrangement.OtherMarketFormula, Basis.Carcass],
    "Swine/Pork Market Formula (carcass basis)": [Seller.All, Arrangement.MarketFormula, Basis.Carcass],
    "Other Purchase Arrangement (carcass basis)": [Seller.All, Arrangement.OtherPurchase, Basis.Carcass],
    "Negotiated (live basis)": [Seller.All, Arrangement.Negotiated, Basis.Live],
    "Negotiated Formula (live basis)": [Seller.All, Arrangement.NegotiatedFormula, Basis.Live],
    "Combined Negotiated/Negotiated Formula (carcass basis)": [Seller.All, Arrangement.AllNegotiated, Basis.Carcass],
    "Combined Negotiated/Negotiated Formula (live basis)": [Seller.All, Arrangement.AllNegotiated, Basis.Live]
};

function parseRecord(record: PurchaseRecord): Purchase {
    const [seller, arrangement, basis] = PurchaseTypes[record.purchase_type];

    return {
        date: getDate(record.reported_for_date),
        reportDate: getDate(record.report_date),
        seller,
        arrangement,
        basis,
        headCount: optInt(record, "head_count"),
        avgPrice: optFloat(record, "price_avg"),
        lowPrice: optFloat(record, "price_min"),
        highPrice: optFloat(record, "price_max")
    };
}

const parse = (response: Purchases): Iterable<Purchase> =>
    map(response.results, parseRecord);

export default parse;

export type { PurchaseReport, Purchases, PurchaseRecord };
