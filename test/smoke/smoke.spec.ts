import "@testing-library/cypress/add-commands";

it("loads", function() {
    const value = /\d{2,3}\.\d{2}/;

    // Page load
    cy.visit("/");
    cy.title().should("eq", "Mpr Dashboard");
    cy.get("#app").should("exist");

    // Stats
    cy.findByText("Cash Index").siblings().contains(value).should("exist");
    cy.findByText("Cutout").siblings().contains(value).should("exist");
    cy.findByText("Index").siblings().contains(value).should("exist");
    cy.findByText("Formula").siblings().contains(value).should("exist");
    cy.findByText("Belly").siblings().contains(value).should("exist");
    cy.findByText("Ham").siblings().contains(value).should("exist");
    cy.findByText("Loin").siblings().contains(value).should("exist");
    cy.findByText("Butt").siblings().contains(value).should("exist");
    cy.findByText("Rib").siblings().contains(value).should("exist");
    cy.findByText("Picnic").siblings().contains(value).should("exist");

    // Charts
    cy.get("div[class*=cash] path.series").invoke("attr", "d").its("length").should("be.greaterThan", 100);
    cy.get("div[class*=cutout] path.series").first().invoke("attr", "d").its("length").should("be.greaterThan", 100);
    cy.get("div[class*=cutout] path.series").last().invoke("attr", "d").its("length").should("be.greaterThan", 100);
    cy.get("div[class*=purchases] path.series").invoke("attr", "d").its("length").should("be.greaterThan", 100);
    cy.get("div[class*=primal] path.series").invoke("attr", "d").its("length").should("be.greaterThan", 100);
});
