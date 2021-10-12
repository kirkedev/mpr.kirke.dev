import { Arrangement, Basis, PurchaseType, Seller } from "../PurchaseType";
import { map } from "../itertools/map";
import { getDate, optFloat, optInt } from "../mpr";
import type { BarrowsGilts, BarrowsGiltsRecord, HistoricalPurchaseRecord } from "./mpr";
import type Purchase from ".";

const PurchaseTypes: Record<string, PurchaseType> = {
    "Negotiated (carcass basis)": [Seller.All, Arrangement.Negotiated, Basis.Carcass],
    "Negotiated Formula (carcass basis)": [Seller.All, Arrangement.NegotiatedFormula, Basis.Carcass],
    "Swine/Pork Market Formula (carcass basis)": [Seller.All, Arrangement.MarketFormula, Basis.Carcass],
    "Negotiated (live basis)": [Seller.All, Arrangement.Negotiated, Basis.Live],
    "Negotiated Formula (live basis)": [Seller.All, Arrangement.NegotiatedFormula, Basis.Live],
    "Combined Negotiated/Negotiated Formula (carcass basis)": [Seller.All, Arrangement.AllNegotiated, Basis.Carcass],
    "Combined Negotiated/Negotiated Formula (live basis)": [Seller.All, Arrangement.AllNegotiated, Basis.Live]
};

const isHistorical = (record: BarrowsGiltsRecord): record is HistoricalPurchaseRecord =>
    "reported_for_date" in record;

function parse(record: BarrowsGiltsRecord): Purchase {
    const [seller, arrangement, basis] = PurchaseTypes[record.purchase_type];
    const date = isHistorical(record) ? record.reported_for_date : record.report_date;

    return {
        date: getDate(date),
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

const parseResponse = (response: BarrowsGilts): Iterable<Purchase> =>
    map(response.results, parse);

export default parseResponse;
