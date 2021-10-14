import type { FastifyRequest, FastifySchema } from "fastify";
import { formatDate, getDate } from "@ams/lib";
import type { QueryType } from "@ams/lib/DateRangeQuery";
import DateRangeQuery from "@ams/lib/DateRangeQuery";
import Repository from "@ams/lib/Repository";
import type Cutout from "@ams/lib/cutout";
import type { ValuesResponse, VolumeResponse } from "@ams/lib/cutout/mpr";
import parse from "@ams/lib/cutout/parse";
import CutoutResponse from "@ams/lib/cutout/response";
import client from "./client";

type CutoutQuery = {
    Querystring: QueryType;
}

const CutoutSchema: FastifySchema = {
    querystring: DateRangeQuery,
    response: {
        200: CutoutResponse
    }
};

const report = client.report(2498);

function fetch(start: Date, end: Date): Promise<Cutout[]> {
    const request = report.between("report_date", formatDate(start), formatDate(end));

    return Promise.all<VolumeResponse, ValuesResponse>([
        request.section("Current Volume").get(),
        request.section("Cutout and Primal Values").get()
    ]).then(([volume, values]) =>
        Array.from(parse(volume, values)));
}

const repository = new Repository(fetch);

const getCutout = ({ query }: FastifyRequest<CutoutQuery>): Promise<Cutout[]> =>
    repository.query(getDate(query.start), getDate(query.end));

export default getCutout;

export { CutoutSchema };
