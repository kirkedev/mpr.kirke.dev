const resolve = require("resolve");
const browserify = require("@cypress/browserify-preprocessor");
const cucumber = require("cypress-cucumber-preprocessor");

module.exports = function(on, config) {
    const options = {
        ...browserify.defaultOptions,
        typescript: resolve.sync("typescript", { basedir: config.projectRoot })
    };

    on("file:preprocessor", cucumber.default(options));

    return config;
}
