import type { PurchaseType } from "../PurchaseType";
import { Arrangement, Basis, Seller } from "../PurchaseType";
import { getDate, optFloat, optInt } from "../mpr";
import map from "../itertools/map";
import type Slaughter from ".";
import type { BarrowsGilts, BarrowsGiltsRecord } from "./mpr";

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

function parse(record: BarrowsGiltsRecord): Slaughter {
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

const parseResponse = (response: BarrowsGilts): Iterable<Slaughter> =>
    map(response.results, parse);

export default parseResponse;
