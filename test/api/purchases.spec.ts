import request from "./request";
import Purchase from "lib/purchases";
import type { PurchaseResponse } from "lib/purchases/response";

describe("purchases api", () => {
    test("return purchase records by date range", async () => {
        const [status, body] = await request<PurchaseResponse>("/purchases?start=2021-08-06&end=2021-08-13");
        expect(status).toBe(200);
        expect(body.length).toBe(54);

        const dates = Array.from(new Set(Purchase.parse(body).map(({ date }) => date.getTime())))
            .map(timestamp => new Date(timestamp));

        expect(dates).toEqual([
            new Date(2021, 7, 6),
            new Date(2021, 7, 9),
            new Date(2021, 7, 10),
            new Date(2021, 7, 11),
            new Date(2021, 7, 12),
            new Date(2021, 7, 13)
        ]);
    });
});
