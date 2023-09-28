import type { FastifyRequest, FastifySchema } from "fastify";
import { formatDate, getDate } from "lib";
import DateRangeQuery, { type DateRangeQuery as QueryType } from "lib/DateRangeQuery";
import Repository from "lib/Repository";
import type Slaughter from "lib/slaughter";
import type { BarrowsGiltsRecord } from "lib/slaughter/mpr";
import parse from "lib/slaughter/parse";
import SlaughterResponse from "lib/slaughter/response";
import client from "./client";

interface SlaughterQuery {
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
    report.between("report_date", formatDate(start), formatDate(end))
        .get()
        .then(response => Array.from(parse(response)));

const repository = new Repository(fetch);

const getSlaughter = ({ query }: FastifyRequest<SlaughterQuery>): Promise<Slaughter[]> =>
    repository.query(getDate(query.start), getDate(query.end));

export default getSlaughter;

export { SlaughterSchema };
