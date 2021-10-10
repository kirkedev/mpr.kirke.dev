import { map } from "../itertools/map";
import { getDate, optFloat, optInt } from "../mpr";
import type { CutType, HistoricalSalesRecord, SalesRecord, SalesResponse } from "./mpr";
import type { Sales } from ".";

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

const isHistorical = (record: SalesRecord): record is HistoricalSalesRecord =>
    "report_for_date" in record;

const parse = (section: CutType) =>
    function(record: SalesRecord): Sales {
        const cut = Cuts[section];
        const date = isHistorical(record) ? record.report_for_date : record.report_date;

        return {
            date: getDate(date),
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
export type { CutType };
