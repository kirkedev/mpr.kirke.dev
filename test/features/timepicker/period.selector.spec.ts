import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I'm on the app", () => {
    cy.visit("/");
    cy.title().should("eq", "Mpr Dashboard");
});

Given(/the (.*) button is not selected/, (button: string) => {
    cy.get("#timepicker").find("span").not(`:contains(${button})`).first().click();
});

When(/I click the (.*) button/, (button: string) => {
    cy.get("#timepicker").contains("span", button).click();
});

Then(/(.*) is highlighted/, (button: string) => {
    cy.get("#timepicker").find("span[class*=active]").contains(button).should("exist");
});

Then("I see one month of data on each chart", () => {
    cy.get("#cash path.series").invoke("attr", "d").its("length").should("eq", 417);
    cy.get("#cutout path.series").first().invoke("attr", "d").its("length").should("eq", 373);
    cy.get("#cutout path.series").last().invoke("attr", "d").its("length").should("eq", 381);
    cy.get("#purchases path.series").invoke("attr", "d").its("length").should("eq", 419);
    cy.get("#primals path.series").invoke("attr", "d").its("length").should("eq", 433);
});

Then("I see three months data on each chart", () => {
    cy.get("#cash path.series").invoke("attr", "d").its("length").should("eq", 1093);
    cy.get("#cutout path.series").first().invoke("attr", "d").its("length").should("eq", 1073);
    cy.get("#cutout path.series").last().invoke("attr", "d").its("length").should("eq", 1075);
    cy.get("#purchases path.series").invoke("attr", "d").its("length").should("eq", 1091);
    cy.get("#primals path.series").invoke("attr", "d").its("length").should("eq", 1115);
});

Then("I see six months data on each chart", () => {
    cy.get("#cash path.series").invoke("attr", "d").its("length").should("eq", 2073);
    cy.get("#cutout path.series").first().invoke("attr", "d").its("length").should("eq", 2021);
    cy.get("#cutout path.series").last().invoke("attr", "d").its("length").should("eq", 2021);
    cy.get("#purchases path.series").invoke("attr", "d").its("length").should("eq", 2105);
    cy.get("#primals path.series").invoke("attr", "d").its("length").should("eq", 2095);
});

Then("I see one year of data on each chart", () => {
    cy.get("#cash path.series").invoke("attr", "d").its("length").should("eq", 3971);
    cy.get("#cutout path.series").first().invoke("attr", "d").its("length").should("eq", 3973);
    cy.get("#cutout path.series").last().invoke("attr", "d").its("length").should("eq", 3977);
    cy.get("#purchases path.series").invoke("attr", "d").its("length").should("eq", 3989);
    cy.get("#primals path.series").invoke("attr", "d").its("length").should("eq", 4053);
});
