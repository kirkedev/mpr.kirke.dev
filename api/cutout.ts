import type { FastifyRequest, FastifySchema } from "fastify";
import QuerySchema, { type DateRangeQuery } from "lib/time/DateRangeQuery";
import Repository from "lib/Repository";
import type Cutout from "lib/cutout";
import parse from "lib/cutout/mpr";
import CutoutResponse from "lib/cutout/response";
import client from "./client";
import { formatDate, getDate } from "lib/time";

interface CutoutQuery {
    Querystring: DateRangeQuery;
}

const CutoutSchema: FastifySchema = {
    querystring: QuerySchema,
    response: {
        200: CutoutResponse
    }
};

const report = client.report(2498);

async function fetch(start: Date, end: Date): Promise<Cutout[]> {
    const request = report.between("report_date", formatDate(start), formatDate(end));

    const [volume, values] = await Promise.all([
        request.section("Current Volume").get(),
        request.section("Cutout and Primal Values").get()
    ]);

    return Array.from(parse(volume, values));
}

const repository = new Repository(fetch);

const getCutout = ({ query }: FastifyRequest<CutoutQuery>): Promise<Cutout[]> =>
    repository.query(getDate(query.start), getDate(query.end));

export default getCutout;

export { CutoutSchema };
