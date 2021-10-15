import Slaughter from "lib/slaughter";
import cashIndex from "../../../lib/CashIndex";

describe("slaughter records", () => {
    it("should return slaughter records by date range", () => {
        cy.request("/slaughter?start=2021-08-09&end=2021-08-13").should(({ status, body }) => {
            expect(status).to.equal(200);
            expect(body.length).to.equal(40);

            const slaughter = Slaughter.parse(body);
            const dates = Array.from(new Set(slaughter.map(({ date }) => date.getTime())))
                .map(timestamp => new Date(timestamp));

            expect(dates).to.deep.equal([
                new Date(2021, 7, 9),
                new Date(2021, 7, 10),
                new Date(2021, 7, 11),
                new Date(2021, 7, 12),
                new Date(2021, 7, 13)
            ]);
        });
    });

    it("should be able to calculate the CME Lean Hog Index", () => {
        cy.request("/slaughter?start=2021-08-06&end=2021-08-13").should(({ body }) => {
            const cash = Array.from(cashIndex(Slaughter.parse(body)));

            expect(cash).to.deep.equal([
                { date: new Date(2021, 7, 9), dailyPrice: 110.59, indexPrice: 110.77 },
                { date: new Date(2021, 7, 10), dailyPrice: 110.32, indexPrice: 110.45 },
                { date: new Date(2021, 7, 11), dailyPrice: 110.06, indexPrice: 110.19 },
                { date: new Date(2021, 7, 12), dailyPrice: 109.75, indexPrice: 109.90 },
                { date: new Date(2021, 7, 13), dailyPrice: 109.59, indexPrice: 109.67 }
            ]);
        });
    });
});
