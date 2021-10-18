import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

let location: string;

Given("an app", () => {
    location = "/";
});

When("I load the app", () => {
    cy.visit(location);
});

Then("I see the MPR Dashboard header", () => {
    cy.get("header").contains("MPR Dashboard");
});