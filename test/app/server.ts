import { readFile } from "fs/promises";
import { http, HttpResponse, type ResponseResolver } from "msw";
import { setupServer } from "msw/node";
import { dropWhile } from "lib/itertools/drop";
import { takeWhile } from "lib/itertools/take";

const handler = (path: string): ResponseResolver =>
    async function({ request }): Promise<HttpResponse> {
        const { searchParams } = new URL(request.url);
        const start = searchParams.get("start");
        const end = searchParams.get("end");

        if (start == null || end == null) {
            return new HttpResponse(null, { status: 400 });
        }

        const records = await readFile(`app/resources/${path}.json`, "utf-8")
            .then(JSON.parse)
            .then((records: Iterable<Record<string, string>>) =>
                dropWhile(records, record =>
                    record.date < start))
            .then((records: Iterable<Record<string, string>>) =>
                takeWhile(records, record =>
                    record.date < end));

        return HttpResponse.json(Array.from(records));
    };

const server = setupServer(
    http.get("/api/cutout", handler("cutout")),
    http.get("/api/purchases", handler("purchases")),
    http.get("/api/slaughter", handler("slaughter")));

export default server;
