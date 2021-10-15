import Slaughter from "lib/slaughter";

it("should return slaughter records by date range", () => {
    cy.request("/slaughter?start=2021-08-09&end=2021-08-13")
        .should(response => {
            expect(response.status).to.equal(200);

            const slaughter = Slaughter.parse(response.body);
            expect(slaughter.length).to.equal(40);

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
