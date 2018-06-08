"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outcome_1 = require("../model/outcome");
/**
 * Knows how to build an Outcome object from the CSV file from a UK Newborn Screening Laboratory Network (UKNSLN).
 */
class CSVOutcomeMapper {
    buildOutcomes(lines) {
        const result = [];
        for (const each of lines) {
            const outcome = new outcome_1.Outcome(each);
            // outcome.allValues = each;
            result.push(outcome);
        }
        return result;
    }
}
exports.CSVOutcomeMapper = CSVOutcomeMapper;
//# sourceMappingURL=csv.outcome.mapper.js.map