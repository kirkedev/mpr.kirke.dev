import formatISO from "date-fns/formatISO";
import type { BinaryOperator } from "..";
import type MprClient from "../mpr/MprClient";
import type { Slaughter } from ".";
import type { BarrowsGiltsRecord } from "./mpr";
import parse from "./parse";

const fetch = (client: MprClient): BinaryOperator<Date, Date, Promise<Slaughter[]>> =>
    function(start: Date, end: Date): Promise<Slaughter[]> {
        return client.report(2511)
            .section<BarrowsGiltsRecord>("Barrows/Gilts")
            .between("for_date_begin", formatISO(start), formatISO(end))
            .get()
            .then(response => response.results.map(parse));
    };

export default fetch;
