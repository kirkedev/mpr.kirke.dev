import "@testing-library/cypress/add-commands";
import { mount } from "cypress/svelte";
import Hello from "app/Hello.svelte";

describe("Hello Component", () => {
    it("greets the world by default", () => {
        mount(Hello);
        cy.contains("Hello, World!").should("exist");
    });

    it("greets by name", () => {
        mount(Hello, {
            props: {
                name: "Andrew"
            }
        });

        cy.contains("Hello, Andrew!").should("exist");
    });
});
