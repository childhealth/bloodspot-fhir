"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a bloodspot test result from UK Newborn Screening Laboratory Network (UKNSLN).
 * Corresponds to 1 row in a CSV file from a screening laboratory, and 1 Blood Spot Test
 * Outcome Event Message.
 */
class Outcome {
    /**
     * Constructs an Outcome object.
     * @param allValues a comma-separated list of values.
     * @throws Error if the values are invalid.
     */
    constructor(allValues) {
        this.allValues = allValues;
        this.nationalId = "";
        this.labSerialNo = "";
        this.providerUnit = "";
        this.nhsNo = "";
        this.surname = "";
        this.firstName = "";
        this.labCode = "";
        this.pkuStatusCode = "";
        this.pkuSupplementaryCode = "";
        this.pkuStatus = "";
        const fields = allValues.split(",");
        this.validate(fields);
        this.nationalId = fields[0];
        this.labSerialNo = fields[1];
        this.providerUnit = fields[2];
        this.nhsNo = fields[3].replace(/ /g, ""); // "NNN NNN NNN" is a display string for "NNNNNNNNN"
        this.surname = fields[4];
        this.firstName = fields[5];
        this.dateOfBirth = this.validateDate(fields[6]);
        this.labCode = fields[29];
        this.pkuStatusCode = fields[30];
        this.pkuSupplementaryCode = fields[31];
        this.pkuStatus = fields[32];
    }
    validate(fields) {
        if (fields.length !== Outcome.MaxFields) {
            throw new Error("Invalid values: string has " + fields.length
                + " values but was expecting " + Outcome.MaxFields + ".");
        }
    }
    validateDate(dateString) {
        const components = dateString.split("/");
        if (components.length !== 3) {
            throw new Error("Invalid date \"" + dateString + "\".");
        }
        const year = Number(components[2]);
        const month = Number(components[1]) - 1;
        const day = Number(components[0]);
        return new Date(Date.UTC(year, month, day));
    }
}
Outcome.MaxFields = 57;
exports.Outcome = Outcome;
//# sourceMappingURL=outcome.js.map