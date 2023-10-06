import type { FastifyRequest, FastifySchema } from "fastify";
import { formatDate, getDate } from "lib";
import QuerySchema, { type DateRangeQuery } from "lib/DateRangeQuery";
import Repository from "lib/Repository";
import type Purchase from "lib/purchases";
import parse from "lib/purchases/parse";
import PurchaseResponse from "lib/purchases/response";
import client from "./client";

interface PurchaseQuery {
    Querystring: DateRangeQuery;
}

const PurchaseSchema: FastifySchema = {
    querystring: QuerySchema,
    response: {
        200: PurchaseResponse
    }
};

const report = client.report(3458).section("National Volume and Price Data");

const fetch = (start: Date, end: Date): Promise<Purchase[]> =>
    report.between("report_date", formatDate(start), formatDate(end))
        .get()
        .then(response => Array.from(parse(response)));

const repository = new Repository(fetch);

const getPurchases = ({ query }: FastifyRequest<PurchaseQuery>): Promise<Purchase[]> =>
    repository.query(getDate(query.start), getDate(query.end));

export default getPurchases;

export { PurchaseSchema };
