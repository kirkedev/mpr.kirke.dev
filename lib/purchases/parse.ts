import type { PurchaseType } from "../PurchaseType";
import { Arrangement, Basis, Seller } from "../PurchaseType";
import { map } from "../itertools/map";
import { getDate, optFloat, optInt } from "../mpr";
import type { PurchaseRecord, Purchases } from "./mpr";
import type Purchase from ".";

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

function parse(record: PurchaseRecord): Purchase {
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

const parseResponse = (response: Purchases): Iterable<Purchase> =>
    map(response.results, parse);

export default parseResponse;
