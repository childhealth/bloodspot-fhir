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
        this.pkuStatusDescription = "";
        this.chtStatusCode = "";
        this.chtSupplementaryCode = "";
        this.chtStatusDescription = "";
        this.scdStatusCode = "";
        this.scdSupplementaryCode = "";
        this.scdStatusDescription = "";
        this.cfStatusCode = "";
        this.cfSupplementaryCode = "";
        this.cfStatusDescription = "";
        this.mcaddStatusCode = "";
        this.mcaddSupplementaryCode = "";
        this.mcaddStatusDescription = "";
        this.hcuStatusCode = "";
        this.hcuSupplementaryCode = "";
        this.hcuStatusDescription = "";
        this.msudStatusCode = "";
        this.msudSupplementaryCode = "";
        this.msudStatusDescription = "";
        this.ga1StatusCode = "";
        this.ga1SupplementaryCode = "";
        this.ga1StatusDescription = "";
        this.ivaStatusCode = "";
        this.ivaSupplementaryCode = "";
        this.ivaStatusDescription = "";
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
        this.pkuStatusCode = this.validatedStatusCode(fields[30], "PKU status code");
        this.pkuSupplementaryCode = this.validatedSupplementaryCode(fields[31]);
        this.pkuStatusDescription = fields[32];
        this.chtStatusCode = this.validatedStatusCode(fields[33], "CHT status code");
        this.chtSupplementaryCode = this.validatedSupplementaryCode(fields[34]);
        this.chtStatusDescription = fields[35];
        this.scdStatusCode = this.validatedStatusCode(fields[36], "SCD status code");
        this.scdSupplementaryCode = this.validatedSupplementaryCode(fields[37]);
        this.scdStatusDescription = fields[38];
        this.cfStatusCode = this.validatedStatusCode(fields[39], "CF status code");
        this.cfSupplementaryCode = this.validatedSupplementaryCode(fields[40]);
        this.cfStatusDescription = fields[41];
        this.mcaddStatusCode = this.validatedStatusCode(fields[42], "MCADD status code");
        this.mcaddSupplementaryCode = this.validatedSupplementaryCode(fields[43]);
        this.mcaddStatusDescription = fields[44];
        this.hcuStatusCode = this.validatedStatusCode(fields[45], "HCU status code");
        this.hcuSupplementaryCode = this.validatedSupplementaryCode(fields[46]);
        this.hcuStatusDescription = fields[47];
        this.msudStatusCode = this.validatedStatusCode(fields[48], "MSUD status code");
        this.msudSupplementaryCode = this.validatedSupplementaryCode(fields[49]);
        this.msudStatusDescription = fields[50];
        this.ga1StatusCode = this.validatedStatusCode(fields[51], "GA1 status code");
        this.ga1SupplementaryCode = this.validatedSupplementaryCode(fields[52]);
        this.ga1StatusDescription = fields[53];
        this.ivaStatusCode = this.validatedStatusCode(fields[54], "IVA status code");
        this.ivaSupplementaryCode = this.validatedSupplementaryCode(fields[55]);
        this.ivaStatusDescription = fields[56];
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
    validatedStatusCode(code, fieldLabel) {
        const numberCode = Number(code);
        if (isNaN(numberCode) || (numberCode < 1) || (numberCode > 10)) {
            throw new Error(fieldLabel + " should be a number between 1 and 10 but was \"" + code + "\".");
        }
        if (code.length === 1) {
            return "0" + code;
        }
        return code;
    }
    validatedSupplementaryCode(code) {
        const numberCode = Number(code);
        if (isNaN(numberCode)) {
            return code;
        }
        if (code.length === 3) {
            return "0" + code;
        }
        return code;
    }
}
Outcome.MaxFields = 57;
exports.Outcome = Outcome;
//# sourceMappingURL=outcome.js.map