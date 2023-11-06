import { resolve } from "path";
import { readFile } from "fs/promises";
import type { IncomingMessage, Server, ServerResponse } from "http";
import { createServer } from "http";
import Week from "lib/time/Week";
import map from "lib/itertools/map";
import { reduce } from "lib/itertools/accumulate";
import type { MprResponse } from "lib/mpr";
import { getDate } from "lib/time";

const root = process.cwd().endsWith("mpr") ? "." : "./mpr";

async function merge<Section extends string, T extends Record<string, string>>(...files: string[]): Promise<MprResponse<Section, T>> {
    const contents = await Promise.all(files.map(file =>
        readFile(file, "utf8")
            .catch(() => "{\"results\":[]}")
            .then(JSON.parse) as Promise<MprResponse<Section, T>>));

    const { reportSection } = contents[0];

    const results = reduce<MprResponse<Section, T>, T[]>(contents, (results, response) =>
        results.concat(response.results), []);

    return {
        reportSection,
        stats: { returnedRows: results.length },
        results
    };
}

function listener(request: IncomingMessage, response: ServerResponse): void {
    const { pathname, searchParams } = new URL(request.url as string, `http://${request.headers.host}`);

    const [, date] = searchParams.get("q")?.split(";")
        .map(param => param.split("="))
        .find(([key]) => key.includes("report_date")) ?? [];

    if (date.length === 0) {
        response.writeHead(400);
        response.end();
        return;
    }

    const [start, end] = date.split(":").map(getDate);
    const route = decodeURIComponent(pathname.slice(pathname.indexOf("reports")));
    const files = map(Week.with(start, end), week => resolve(root, route, `${week}.json`));

    merge(...Array.from(files)).then(result => {
        response.writeHead(200, { "Content-Type": "application/json" });

        if (result.results.length === 0) {
            response.write("No Results Found.");
        } else {
            response.write(JSON.stringify(result));
        }

        response.end();
    });
}

const server = (port: number): Promise<Server> =>
    new Promise(function(resolve, reject) {
        const server = createServer(listener);

        server
            .listen(port, "0.0.0.0", () => resolve(server))
            .once("error", error => reject(error));
    });

export default server;
