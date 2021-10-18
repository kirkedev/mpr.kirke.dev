import Cutout from "lib/cutout";
import cutoutIndex from "lib/CutoutIndex";

describe("cutout api", () => {
    it("return cutout records by date range", () => {
        cy.request("/api/cutout?start=2021-08-09&end=2021-08-13").should(({ status, body }) => {
            expect(status).to.equal(200);
            expect(body.length).to.equal(5);

            expect(Cutout.parse(body).map(({ date }) => date)).to.deep.equal([
                new Date(2021, 7, 9),
                new Date(2021, 7, 10),
                new Date(2021, 7, 11),
                new Date(2021, 7, 12),
                new Date(2021, 7, 13)
            ]);
        });
    });

    it("calculate the CME Cutout Index", () => {
        cy.request("/api/cutout?start=2021-08-09&end=2021-08-13").should(({ body }) => {
            const [cutout] = Array.from(cutoutIndex(Cutout.parse(body)));

            expect(cutout).to.deep.equal({
                date: new Date(2021, 7, 13),
                indexPrice: 123.31,
                carcassPrice: 125.68,
                loads: 378.72
            });
        });
    });
});
