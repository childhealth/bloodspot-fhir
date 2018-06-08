"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a bloodspot test result from UK Newborn Screening Laboratory Network (UKNSLN).
 * Corresponds to 1 row in a CSV file from a screening laboratory, and 1 Blood Spot Test
 * Outcome Event Message.
 */
class Outcome {
    // private dateOfBirth: Date;
    constructor(allValues) {
        this.allValues = allValues;
        this.nationalId = "";
        this.labSerialNo = "";
        this.providerUnit = "";
        this.nhsNo = "";
        this.surname = "";
        this.labCode = "";
        this.pkuStatusCode = "";
        this.pkuSupplementaryCode = "";
        this.pkuStatus = "";
        const fields = allValues.split(",");
        // this.dateOfBirth = new Date();
        this.nationalId = fields[0];
        this.labSerialNo = fields[1];
    }
}
exports.Outcome = Outcome;
//# sourceMappingURL=outcome.js.map