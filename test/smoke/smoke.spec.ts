describe("The app loads", function() {
    beforeEach(() => cy.visit("/"));

    it("should show the title", () => {
        cy.title().should("eq", "Mpr Dashboard");
    });

    it("should display the app", () => {
        cy.get("#app").should("exist");
    });

    it("should display the cash index chart", () => {
        cy.get("#cash path.series").invoke("attr", "d").its("length").should("be.greaterThan", 100);
    });

    it("should display the cutout chart", () => {
        cy.get("#cutout path.series").first().invoke("attr", "d").its("length").should("be.greaterThan", 100);
        cy.get("#cutout path.series").last().invoke("attr", "d").its("length").should("be.greaterThan", 100);
    });

    it("should display the purchases chart", () => {
        cy.get("#purchases path.series").invoke("attr", "d").its("length").should("be.greaterThan", 100);
    });

    it("should display the primals chart", () => {
        cy.get("#primals path.series").invoke("attr", "d").its("length").should("be.greaterThan", 100);
    });
});
