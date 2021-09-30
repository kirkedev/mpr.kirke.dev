import { map } from "../itertools/map";
import { getDate, MprResponse, optFloat, optInt } from ".";
import type { PurchaseType } from "./PurchaseType";
import { Arrangement, Basis, Seller } from "./PurchaseType";

interface SlaughterRecord extends Record<string, string> {
    avg_backfat: string;
    avg_carcass_weight: string;
    avg_lean_percent: string;
    avg_live_weight: string;
    avg_loin_depth: string;
    avg_net_price: string;
    avg_sort_loss: string;
    base_price: string;
    for_date_begin: string;
    head_count: string;
    highest_net_price: string;
    loineye_area: string;
    lowest_net_price: string;
    market_location_city: string;
    market_location_name: string;
    market_location_state: string;
    market_type: string;
    market_type_category: string;
    published_date: string;
    purchase_type: string;
    report_date: string;
    report_title: string;
    slug_id: string;
    slug_name: string;
}

interface Slaughter {
    date: Date;
    reportDate: Date;
    basis: Basis;
    arrangement: Arrangement;
    seller: Seller;
    headCount: number;
    carcassWeight: number;
    liveWeight: number;
    basePrice: number;
    netPrice: number;
    lowPrice: number;
    highPrice: number;
    backfat: number;
    leanPercent: number;
    loinDepth: number;
    loineyeArea: number;
    sortLoss: number;
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

function parse(record: SlaughterRecord): Slaughter {
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
        sortLoss: optFloat(record, "avg_sort_loss"),
        backfat: optFloat(record, "avg_backfat"),
        loinDepth: optFloat(record, "avg_loin_depth"),
        loineyeArea: optFloat(record, "loineye_area"),
        leanPercent: optFloat(record, "avg_lean_percent")
    };
}

type SlaughterApiResponse = MprResponse<"Barrows/Gilts", SlaughterRecord>;

const parseResponse = (response: SlaughterApiResponse): Iterable<Slaughter> =>
    map(response.results, parse);

export default parseResponse;

export type { SlaughterApiResponse, Slaughter, SlaughterRecord };
