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
        this.labCardSerialNo = "";
        this.providerUnit = ""; // e.g. St James Maternity unit
        this.nhsNumber = "";
        this.surname = "";
        this.firstName = "";
        this.gpName = "";
        this.gpPracticeCode = "";
        this.mothersSurname = "";
        this.alternativeSurname = "";
        this.mothersFirstname = "";
        this.address1 = "";
        this.address2 = "";
        this.address3 = "";
        this.address4 = "";
        this.address5 = "";
        this.postcode = "";
        this.mothersTelephone = "";
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
        this.labCardSerialNo = fields[1];
        this.providerUnit = fields[2];
        this.nhsNumber = fields[3].replace(/ /g, ""); // "NNN NNN NNN" is a display string for "NNNNNNNNN"
        this.surname = fields[4];
        this.firstName = fields[5];
        this.dateOfBirth = this.validateDate(fields[6]);
        this.genderCode = Number(fields[7]);
        this.gpName = fields[8];
        this.gpPracticeCode = fields[9];
        this.birthOrder = Number(fields[10]);
        this.birthConfinement = Number(fields[11]);
        this.birthWeight = Number(fields[12]);
        this.gestationLength = Number(fields[13]);
        this.nicu = Number(fields[14]);
        this.mothersSurname = fields[15];
        this.alternativeSurname = fields[16];
        this.mothersFirstname = fields[17];
        this.address1 = fields[18];
        this.address2 = fields[19];
        this.address3 = fields[20];
        this.address4 = fields[21];
        this.address5 = fields[22];
        this.postcode = fields[23];
        this.mothersTelephone = fields[24];
        this.collectionDate = this.validateDate(fields[26]);
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
    get displayName() {
        return this.surname + ", " + this.firstName;
    }
    validate(fields) {
        if (fields.length !== Outcome.MaxFields) {
            throw new Error("Invalid values: string has " + fields.length
                + " values but was expecting " + Outcome.MaxFields + ".");
        }
        const genderCode = fields[7];
        this.validateNumber(genderCode);
        const birthOrder = fields[10];
        this.validateNumber(birthOrder);
    }
    validateNumber(value) {
        if (isNaN(Number(value))) {
            throw new Error("Invalid number \"" + value + "\".");
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