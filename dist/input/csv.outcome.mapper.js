"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outcome_1 = require("../model/outcome");
const outcome_validator_1 = require("./outcome.validator");
/**
 * Knows how to build an Outcome object from the CSV file from a UK Newborn Screening Laboratory Network (UKNSLN).
 */
class CSVOutcomeMapper {
    constructor(logger) {
        this.logger = logger;
        this.validator = new outcome_validator_1.OutcomeValidator();
    }
    buildOutcomes(lines, hasHeader, filename) {
        const result = [];
        let lineNumber = 0;
        if (hasHeader) {
            lineNumber = lineNumber + 1;
        }
        for (const each of lines) {
            lineNumber = lineNumber + 1;
            try {
                const values = each.split(",");
                this.validator.validate(values); // may throw an error
                const outcome = new outcome_1.Outcome(each);
                result.push(outcome);
            }
            catch (error) {
                this.logger.error("Error in file \"" + filename + "\" at line " + lineNumber + ": " + error);
            }
        }
        return result;
    }
}
exports.CSVOutcomeMapper = CSVOutcomeMapper;
//# sourceMappingURL=csv.outcome.mapper.js.map