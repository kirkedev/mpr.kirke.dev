import Slaughter from "lib/slaughter";

it("should return slaughter records by a date range", () => {
    cy.request("/slaughter?start=2021-09-06&end=2021-09-10")
        .should(response => {
            expect(response.status).to.eq(200);

            const slaughter = Slaughter.parse(response.body);
            expect(slaughter.length).to.eq(24);
        });
});
