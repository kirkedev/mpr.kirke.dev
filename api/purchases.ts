import type { FastifyRequest } from "fastify";
import { FastifySchema } from "fastify";
import { formatDate, getDate } from "lib";
import type { QueryType } from "lib/DateRangeQuery";
import DateRangeQuery from "lib/DateRangeQuery";
import Repository from "lib/Repository";
import type Purchase from "lib/purchases";
import type { BarrowsGiltsRecord } from "lib/purchases/mpr";
import parse from "lib/purchases/parse";
import PurchaseResponse from "lib/purchases/response";
import client from "./client";

type PurchasesQuery = {
    Querystring: QueryType;
}

const PurchasesSchema: FastifySchema = {
    querystring: DateRangeQuery,
    response: {
        200: PurchaseResponse
    }
};

const report = client.report(3458).section<BarrowsGiltsRecord>("Barrows/Gilts (producer/packer sold)");

const fetch = (start: Date, end: Date): Promise<Purchase[]> =>
    report.between("reported_for_date", formatDate(start), formatDate(end))
        .get()
        .then(response => Array.from(parse(response)));

const repository = new Repository(fetch);

const getPurchases = ({ query }: FastifyRequest<PurchasesQuery>): Promise<Purchase[]> =>
    repository.query(getDate(query.start), getDate(query.end));

export default getPurchases;

export { PurchasesSchema };
