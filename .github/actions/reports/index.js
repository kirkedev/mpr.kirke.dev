import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "fs";

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
const report = parser.parse(readFileSync("coverage/clover.xml"));
const metrics = report.coverage.project.metrics;

console.log(parseFloat(metrics.coveredelements) / parseFloat(metrics.elements));

// ![Static Badge](https://img.shields.io/badge/95%25-tests?style=for-the-badge&logo=vitest&logoColor=%23FCC72B&label=Tests&labelColor=black&color=%234CAF50)
// ![Static Badge](https://img.shields.io/badge/passing-e2e?style=for-the-badge&logo=cypress&logoColor=69D3A7&label=acceptance&labelColor=black&color=%234CAF50)
// ![Static Badge](https://img.shields.io/badge/0.3.0-build?style=for-the-badge&logo=docker&logoColor=white&label=build&labelColor=%231d63ed&color=4CAF50)
