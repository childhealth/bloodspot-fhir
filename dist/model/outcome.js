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
        // nationalId
        this.labSerialNo = "";
        this.providerUnit = ""; // e.g. St James Maternity unit
        this.nhsNo = "";
        this.surname = "";
        this.firstName = "";
        // genderCode
        // gpName
        // gpCode
        // birthOrder
        // birthConfinement
        // birthWeight
        // gestationLength
        // nicu - Is the baby in Intensive Care Unit? "1" or "0"
        // mothersSurname
        // alternativeSurname
        // mothersFirstname
        // address1
        // address2
        // address3
        // address4
        // address5
        // postcode
        // mothersTelephone
        // receiptDate
        // collectionDate
        // previousLabSerialNo
        // sampleTaker
        this.labCode = "";
        this.pkuStatusCode = "";
        this.pkuSupplementaryCode = "";
        this.pkuStatus = "";
        this.chtStatusCode = "";
        this.chtSupplementaryCode = "";
        this.chtStatus = "";
        this.sickleStatusCode = "";
        this.sickleSupplementaryCode = "";
        this.sickleStatus = "";
        this.cfStatusCode = "";
        this.cfSupplementaryCode = "";
        this.cfStatus = "";
        this.mcaddStatusCode = "";
        this.mcaddSupplementaryCode = "";
        this.mcaddStatus = "";
        this.hcuStatusCode = "";
        this.hcuSupplementaryCode = "";
        this.hcuStatus = "";
        this.msudStatusCode = "";
        this.msudSupplementaryCode = "";
        this.msudStatus = "";
        this.ga1StatusCode = "";
        this.ga1SupplementaryCode = "";
        this.ga1Status = "";
        this.ivaStatusCode = "";
        this.ivaSupplementaryCode = "";
        this.ivaStatus = "";
        const fields = allValues.split(",");
        this.validate(fields);
        // this.nationalId = fields[0]; // Not used
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
        this.chtStatusCode = fields[33];
        this.chtSupplementaryCode = fields[34];
        this.chtStatus = fields[35];
        this.sickleStatusCode = fields[36];
        this.sickleSupplementaryCode = fields[37];
        this.sickleStatus = fields[38];
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
        if (month > 11) {
            throw new Error("Invalid date \"" + dateString + "\".");
        }
        const day = Number(components[0]);
        if (day > 31) {
            throw new Error("Invalid date \"" + dateString + "\".");
        }
        return new Date(Date.UTC(year, month, day));
    }
}
Outcome.MaxFields = 57;
exports.Outcome = Outcome;
//# sourceMappingURL=outcome.js.map