import type { FastifyRequest } from "fastify";
import { FastifySchema } from "fastify";
import { formatDate, getDate } from "@ams/lib";
import type { QueryType } from "@ams/lib/DateRangeQuery";
import DateRangeQuery from "@ams/lib/DateRangeQuery";
import Repository from "@ams/lib/Repository";
import type Slaughter from "@ams/lib/slaughter";
import type { BarrowsGiltsRecord } from "@ams/lib/slaughter/mpr";
import parse from "@ams/lib/slaughter/parse";
import SlaughterResponse from "@ams/lib/slaughter/response";
import client from "./client";

type SlaughterQuery = {
    Querystring: QueryType;
}

const SlaughterSchema: FastifySchema = {
    querystring: DateRangeQuery,
    response: {
        200: SlaughterResponse
    }
};

const report = client.report(2511).section<BarrowsGiltsRecord>("Barrows/Gilts");

const fetch = (start: Date, end: Date): Promise<Slaughter[]> =>
    report.between("for_date_begin", formatDate(start), formatDate(end))
        .get()
        .then(response => Array.from(parse(response)));

const repository = new Repository(fetch);

const getSlaughter = ({ query }: FastifyRequest<SlaughterQuery>): Promise<Slaughter[]> =>
    repository.query(getDate(query.start), getDate(query.end));

export default getSlaughter;

export { SlaughterSchema };
