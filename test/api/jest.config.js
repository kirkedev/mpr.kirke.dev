const path = require("path");

module.exports = {
    "rootDir": path.resolve(__dirname, "../.."),
    "roots": [
        "<rootDir>/api",
        "<rootDir>/test/api"
    ],
    "globalSetup": "test/api/setup.js",
    "globalTeardown": "test/api/teardown.js",
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": ".*(test|spec)\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
    ],
    "collectCoverage": true,
    "collectCoverageFrom": ["<rootDir>/api/**/*.ts",]
};
