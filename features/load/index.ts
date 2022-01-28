import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

let location: string;

Given("an app", () => {
    location = "/";
});

When("I load the app", () => {
    cy.visit("/");
});

Then("I see the MPR Dashboard", () => {
    cy.title().should("equal", "Mpr Dashboard");
});
