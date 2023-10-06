it("loads", function() {
    cy.visit("/");
    cy.title().should("eq", "Mpr Dashboard");
    cy.get("#app").should("exist");

    // Stats
    cy.get("div[class*=cash]").find("h2[class*=value]").contains(/\d{2,3}\.\d{2}/);
    cy.get("div[class*=cutout]").find("h5[class*=label]").contains("Cutout").find("+h3").contains(/\d{2,3}\.\d{2}/);
    cy.get("div[class*=cutout]").find("h5[class*=label]").contains("Index").find("+h3").contains(/\d{2,3}\.\d{2}/);
    cy.get("div[class*=purchases]").find("h5[class*=label]").contains("Formula").find("+h3").contains(/\d{2,3}\.\d{2}/);
    cy.get("div[class*=primal]").find("h5[class*=label]").contains("Belly").find("+h3").contains(/\d{2,3}\.\d{2}/);
    cy.get("div[class*=primal]").find("h5[class*=label]").contains("Ham").find("+h3").contains(/\d{2,3}\.\d{2}/);
    cy.get("div[class*=primal]").find("h5[class*=label]").contains("Loin").find("+h3").contains(/\d{2,3}\.\d{2}/);
    cy.get("div[class*=primal]").find("h5[class*=label]").contains("Butt").find("+h3").contains(/\d{2,3}\.\d{2}/);
    cy.get("div[class*=primal]").find("h5[class*=label]").contains("Rib").find("+h3").contains(/\d{2,3}\.\d{2}/);
    cy.get("div[class*=primal]").find("h5[class*=label]").contains("Picnic").find("+h3").contains(/\d{2,3}\.\d{2}/);

    // Charts
    cy.get("div[class*=cash] path.series").invoke("attr", "d").its("length").should("be.greaterThan", 100);
    cy.get("div[class*=cutout] path.series").first().invoke("attr", "d").its("length").should("be.greaterThan", 100);
    cy.get("div[class*=cutout] path.series").last().invoke("attr", "d").its("length").should("be.greaterThan", 100);
    cy.get("div[class*=purchases] path.series").invoke("attr", "d").its("length").should("be.greaterThan", 100);
    cy.get("div[class*=primal] path.series").invoke("attr", "d").its("length").should("be.greaterThan", 100);
});
