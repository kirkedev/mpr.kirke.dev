import * as resolve from "resolve";
import * as browserify from "@cypress/browserify-preprocessor";
import cucumber from "cypress-cucumber-preprocessor";

export default function(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): void {
    const options = {
        ...browserify.defaultOptions,
        typescript: resolve.sync("typescript", { basedir: config.projectRoot })
    };

    on("file:preprocessor", cucumber(options));
}
