import type { Nullable } from "..";
import type { MprResponse } from ".";
import { getDate, optFloat, optInt } from ".";
import { map } from "../itertools/map";

interface SalesRecord extends Record<string, Nullable<string>> {
    report_date: string;
    Item_Description: string;
    total_pounds: Nullable<string>;
    weighted_average: Nullable<string>;
    price_range_low: Nullable<string>;
    price_range_high: Nullable<string>;
}

interface HistoricalSalesRecord extends SalesRecord {
    report_for_date: string;
}

interface Sales {
    date: Date;
    reportDate: Date;
    type: Cut;
    description: string;
    weight: number;
    avgPrice: number;
    lowPrice: number;
    highPrice: number;
}

type CutType = "Belly Cuts"
    | "Butt Cuts"
    | "Ham Cuts"
    | "Loin Cuts"
    | "Picnic Cuts"
    | "Sparerib Cuts"
    | "Jowl Cuts"
    | "Added Ingredient Cuts"
    | "Trim Cuts"
    | "Variety Cuts";

enum Cut {
    Belly,
    Butt,
    Ham,
    Loin,
    Picnic,
    Rib,
    Jowl,
    AddedIngredient,
    Trim,
    Variety
}

const Cuts: Record<CutType, Cut> = {
    "Belly Cuts": Cut.Belly,
    "Butt Cuts": Cut.Butt,
    "Ham Cuts": Cut.Ham,
    "Loin Cuts": Cut.Loin,
    "Picnic Cuts": Cut.Picnic,
    "Sparerib Cuts": Cut.Rib,
    "Jowl Cuts": Cut.Jowl,
    "Added Ingredient Cuts": Cut.AddedIngredient,
    "Trim Cuts": Cut.Trim,
    "Variety Cuts": Cut.Variety
};

type SalesResponse = MprResponse<CutType, SalesRecord | HistoricalSalesRecord>;

const parse = (section: CutType) =>
    function(record: SalesRecord | HistoricalSalesRecord): Sales {
        const cut = Cuts[section];
        const date = "report_for_date" in record ? record.report_for_date : record.report_date;

        return {
            date: getDate(date as string),
            reportDate: getDate(record.report_date),
            type: cut,
            description: record.Item_Description,
            weight: optInt(record, "total_pounds"),
            avgPrice: optFloat(record, "weighted_average"),
            lowPrice: optFloat(record, "price_range_low"),
            highPrice: optFloat(record, "price_range_high")
        };
    };

const parseResponse = (response: SalesResponse): Iterable<Sales> =>
    map(response.results, parse(response.reportSection));

export default parseResponse;
export { Cut };

export type { Sales, SalesRecord, HistoricalSalesRecord, SalesResponse, CutType };
