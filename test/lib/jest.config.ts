import path from "path";

export default {
    "rootDir": path.resolve(".."),
    "roots": [
        "<rootDir>/lib",
        "<rootDir>/test/lib"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "^.+spec\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
    "collectCoverage": true,
    "collectCoverageFrom": ["<rootDir>/lib/**/*.ts"]
};
