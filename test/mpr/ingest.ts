import path from "path";
import { mkdir, writeFile } from "fs/promises";
import parseArgs from "command-line-args";
import { formatDate, getDate } from "lib";
import Week from "lib/Week";
import MprClient from "lib/mpr/MprClient";
import { promisify } from "util";

const args = parseArgs([
    { name: "start", type: getDate },
    { name: "end", type: getDate },
    { name: "report", type: Number },
    { name: "section", type: String },
    { name: "column", type: String }
]);

const client = new MprClient("https://mpr.datamart.ams.usda.gov", "v1.1")
    .report(args.report)
    .section(args.section);

const filename = (week: Week): string =>
    path.resolve(`./mpr/reports/${args.report}/${args.section}/${week}.json`);

const sleep = promisify(setTimeout);

const weeks = Array.from(Week.with(new Date(Date.parse(args.start)), new Date(Date.parse(args.end))));

(async function() {
    await mkdir(`./mpr/reports/${args.report}/${args.section}`, { recursive: true });

    for (const week of weeks) {
        // eslint-disable-next-line no-await-in-loop
        await client.between(args.column, formatDate(week.start), formatDate(week.end))
            .get()
            .then(response => writeFile(filename(week), JSON.stringify(response)));

        // eslint-disable-next-line no-await-in-loop
        await sleep(1000);
    }
})();
