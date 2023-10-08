import "@testing-library/cypress/add-commands.js";
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I'm on the app", () => {
    cy.visit("/");
    cy.title().should("eq", "Mpr Dashboard");
    cy.get("#app").should("exist");
});

Given(/^the (.*) button is not selected$/, (button: string) => {
    cy.get("div[class*=timepicker]").find("span").not(`:contains(${button})`).first().click();
});

When(/^I click the (.*) button$/, (button: string) => {
    cy.findByText(button).click();
});

Then(/^(.*) is highlighted$/, (button: string) => {
    cy.findByText(button).invoke("attr", "class").should("contain", "active");
});

Then("I see one month of data on each chart", () => {
    cy.get("div[class*=cash] path.series").invoke("attr", "d").its("length").should("eq", 417);
    cy.get("div[class*=cutout] path.series").first().invoke("attr", "d").its("length").should("eq", 373);
    cy.get("div[class*=cutout] path.series").last().invoke("attr", "d").its("length").should("eq", 381);
    cy.get("div[class*=purchases] path.series").invoke("attr", "d").its("length").should("eq", 419);
    cy.get("div[class*=primal] path.series").invoke("attr", "d").its("length").should("eq", 433);
});

Then("I see three months of data on each chart", () => {
    cy.get("div[class*=cash] path.series").invoke("attr", "d").its("length").should("eq", 1093);
    cy.get("div[class*=cutout] path.series").first().invoke("attr", "d").its("length").should("eq", 1073);
    cy.get("div[class*=cutout] path.series").last().invoke("attr", "d").its("length").should("eq", 1075);
    cy.get("div[class*=purchases] path.series").invoke("attr", "d").its("length").should("eq", 1091);
    cy.get("div[class*=primal] path.series").invoke("attr", "d").its("length").should("eq", 1115);
});

Then("I see six months of data on each chart", () => {
    cy.get("div[class*=cash] path.series").invoke("attr", "d").its("length").should("eq", 2073);
    cy.get("div[class*=cutout] path.series").first().invoke("attr", "d").its("length").should("eq", 2021);
    cy.get("div[class*=cutout] path.series").last().invoke("attr", "d").its("length").should("eq", 2021);
    cy.get("div[class*=purchases] path.series").invoke("attr", "d").its("length").should("eq", 2105);
    cy.get("div[class*=primal] path.series").invoke("attr", "d").its("length").should("eq", 2095);
});

Then("I see one year of data on each chart", () => {
    cy.get("div[class*=cash] path.series").invoke("attr", "d").its("length").should("eq", 3971);
    cy.get("div[class*=cutout] path.series").first().invoke("attr", "d").its("length").should("eq", 3973);
    cy.get("div[class*=cutout] path.series").last().invoke("attr", "d").its("length").should("eq", 3977);
    cy.get("div[class*=purchases] path.series").invoke("attr", "d").its("length").should("eq", 3989);
    cy.get("div[class*=primal] path.series").invoke("attr", "d").its("length").should("eq", 4053);
});
