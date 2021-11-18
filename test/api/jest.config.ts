import path from "path";

export default {
    "rootDir": path.resolve(".."),
    "roots": [
        "<rootDir>/api",
        "<rootDir>/test/api"
    ],
    "globalSetup": "./test/api/setup.ts",
    "globalTeardown": "./test/api/teardown.ts",
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "^.+spec\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
    "collectCoverage": true,
    "collectCoverageFrom": ["<rootDir>/api/**/*.ts"]
};
