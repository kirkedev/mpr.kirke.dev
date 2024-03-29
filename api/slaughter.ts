import type { FastifyRequest, FastifySchema } from "fastify";
import QuerySchema, { type DateRangeQuery } from "lib/time/DateRangeQuery";
import Repository from "lib/Repository";
import type Slaughter from "lib/slaughter";
import parse from "lib/slaughter/mpr";
import SlaughterResponse from "lib/slaughter/response";
import client from "./client";
import { formatDate, getDate } from "lib/time";

interface SlaughterQuery {
    Querystring: DateRangeQuery;
}

const SlaughterSchema: FastifySchema = {
    querystring: QuerySchema,
    response: {
        200: SlaughterResponse
    }
};

const report = client.report(2511).section("Barrows/Gilts");

const fetch = (start: Date, end: Date): Promise<Slaughter[]> =>
    report.between("report_date", formatDate(start), formatDate(end))
        .get()
        .then(response => Array.from(parse(response)));

const repository = new Repository(fetch);

const getSlaughter = ({ query }: FastifyRequest<SlaughterQuery>): Promise<Slaughter[]> =>
    repository.query(getDate(query.start), getDate(query.end));

export default getSlaughter;

export { SlaughterSchema };
