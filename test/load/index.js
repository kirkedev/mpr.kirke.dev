const { Given, Then, When } = require("cypress-cucumber-preprocessor/steps");

let location;
console.log("WHAT");

Given("an app", () => {
    location = "/";
});

When("I load the app", () => {
    cy.visit(location);
});

Then("I see the Mpr Dashboard header", () => {
    cy.get("header").contains("Mpr Dashboard");
});
