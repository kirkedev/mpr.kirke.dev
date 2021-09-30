import type { Nullable } from "..";
import type { MprResponse } from ".";
import { getDate, optFloat, optInt } from ".";
import type { PurchaseType } from "./PurchaseType";
import { Arrangement, Basis, Seller } from "./PurchaseType";
import { map } from "../itertools/map";

interface PurchaseRecord extends Record<string, Nullable<string>> {
    report_date: string;
    purchase_type: string;
    head_count: Nullable<string>;
    wtd_avg: Nullable<string>;
    price_high: Nullable<string>;
    price_low: Nullable<string>;
    rolling_avg: Nullable<string>;
}

interface HistoricalPurchaseRecord extends PurchaseRecord {
    reported_for_date: string;
}

interface Purchase {
    date: Date;
    reportDate: Date;
    seller: Seller;
    arrangement: Arrangement;
    basis: Basis;
    headCount: number;
    avgPrice: number;
    lowPrice: number;
    highPrice: number;
}

type PurchaseResponse = MprResponse<"Barrows/Gilts (producer/packer sold)", PurchaseRecord | HistoricalPurchaseRecord>;

const PurchaseTypes: Record<string, PurchaseType> = {
    "Negotiated (carcass basis)": [Seller.All, Arrangement.Negotiated, Basis.Carcass],
    "Negotiated Formula (carcass basis)": [Seller.All, Arrangement.NegotiatedFormula, Basis.Carcass],
    "Swine/Pork Market Formula (carcass basis)": [Seller.All, Arrangement.MarketFormula, Basis.Carcass],
    "Negotiated (live basis)": [Seller.All, Arrangement.Negotiated, Basis.Live],
    "Negotiated Formula (live basis)": [Seller.All, Arrangement.NegotiatedFormula, Basis.Live],
    "Combined Negotiated/Negotiated Formula (carcass basis)": [Seller.All, Arrangement.AllNegotiated, Basis.Carcass],
    "Combined Negotiated/Negotiated Formula (live basis)": [Seller.All, Arrangement.AllNegotiated, Basis.Live]
};

function parse(record: PurchaseRecord | HistoricalPurchaseRecord): Purchase {
    const [seller, arrangement, basis] = PurchaseTypes[record.purchase_type];
    const date = "reported_for_date" in record ? record.reported_for_date : record.report_date;

    return {
        date: getDate(date as string),
        reportDate: getDate(record.report_date),
        seller,
        arrangement,
        basis,
        headCount: optInt(record, "head_count"),
        avgPrice: optFloat(record, "wtd_avg"),
        lowPrice: optFloat(record, "price_low"),
        highPrice: optFloat(record, "price_high")
    };
}

const parseResponse = (response: PurchaseResponse): Iterable<Purchase> =>
    map(response.results, parse);

export default parseResponse;

export type { Purchase, PurchaseRecord, HistoricalPurchaseRecord, PurchaseResponse };
