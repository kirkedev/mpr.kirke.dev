const path = require("path");

module.exports = {
    "rootDir": path.resolve(__dirname, "../.."),
    "roots": [
        "<rootDir>/lib",
        "<rootDir>/test/lib"
    ],
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
    "collectCoverageFrom": [
        "<rootDir>/lib/**/*.ts",
        "!<rootDir>/lib/**/*.d.ts"
    ]
};
