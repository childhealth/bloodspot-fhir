"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OutcomeValidator {
    validate(fields) {
        if (fields.length !== OutcomeValidator.MaxFields) {
            throw new Error("Invalid values: string has " + fields.length
                + " values but was expecting " + OutcomeValidator.MaxFields + ".");
        }
        const labSerialNo = fields[1];
        this.validateStringLength(labSerialNo, 50, "Lab Serial Number");
        const providerUnit = fields[2];
        this.validateStringLength(providerUnit, 35, "Provider Unit");
        const nhsNumber = fields[3].replace(/ /g, "");
        this.validateStringLength(nhsNumber, 10, "NHS Number");
        const surname = fields[4];
        this.validateStringLength(surname, 35, "Surname");
        const firstName = fields[5];
        this.validateStringLength(firstName, 35, "Child's First Name");
        const dateOfBirth = fields[6];
        this.validateDate(dateOfBirth, "Date Of Birth");
        const genderCode = fields[7];
        this.validateGender(genderCode);
        const gpName = fields[8];
        this.validateStringLength(gpName, 35, "GP Name");
        const gpCode = fields[9];
        this.validateStringLength(gpCode, 6, "GP Code");
        const birthOrder = fields[10];
        this.validateNumber(birthOrder, "Birth Order");
        const receiptDate = fields[25];
        this.validateDate(receiptDate, "Date Of Receipt");
        const collectionDate = fields[26];
        this.validateDate(collectionDate, "Collection Date");
        const pkuStatusCode = fields[30];
        this.validateStatusCode(pkuStatusCode, "PKU status code");
        const chtStatusCode = fields[33];
        this.validateStatusCode(chtStatusCode, "CHT status code");
        const scdStatusCode = fields[36];
        this.validateStatusCode(scdStatusCode, "SCD status code");
        const cfStatusCode = fields[39];
        this.validateStatusCode(cfStatusCode, "CF status code");
        const mcaddStatusCode = fields[42];
        this.validateStatusCode(mcaddStatusCode, "MCADD status code");
        const hcuStatusCode = fields[45];
        this.validateStatusCode(hcuStatusCode, "HCU status code");
        const msudStatusCode = fields[48];
        this.validateStatusCode(msudStatusCode, "MSUD status code");
        const ga1StatusCode = fields[51];
        this.validateStatusCode(ga1StatusCode, "GA1 status code");
        const ivaStatusCode = fields[54];
        this.validateStatusCode(ivaStatusCode, "IVA status code");
    }
    validateNumber(value, fieldLabel) {
        if (isNaN(Number(value))) {
            throw new Error(fieldLabel + " should be a number but was \"" + value + "\".");
        }
    }
    validateDate(dateString, fieldLabel) {
        const components = dateString.split("/");
        const prefixErrorMessage = fieldLabel + " should be a date DD/MM/YYYY but was \"";
        if (components.length !== 3) {
            throw new Error(prefixErrorMessage + dateString + "\".");
        }
        const year = Number(components[2]);
        if ((year < 2000) || (year > 3000)) {
            throw new Error(prefixErrorMessage + dateString + "\".");
        }
        const month = Number(components[1]) - 1;
        if (month > 11) {
            throw new Error(prefixErrorMessage + dateString + "\".");
        }
        const day = Number(components[0]);
        if (day > 31) {
            throw new Error(prefixErrorMessage + dateString + "\".");
        }
        return new Date(Date.UTC(year, month, day));
    }
    validateGender(code) {
        if ((code !== "0") && (code !== "1") && (code !== "2") && (code !== "9")) {
            throw new Error("Gender code should be in [0129] but was \"" + code + "\".");
        }
    }
    validateStatusCode(code, fieldLabel) {
        const numberCode = Number(code);
        if (isNaN(numberCode) || (numberCode < 1) || (numberCode > 10)) {
            throw new Error(fieldLabel + " should be a number between 1 and 10 but was \"" + code + "\".");
        }
        if (code.length === 1) {
            return "0" + code;
        }
        return code;
    }
    validateStringLength(value, maximumLength, fieldLabel) {
        if (value.length > maximumLength) {
            throw new Error(fieldLabel + " value \"" + value
                + "\" exceeds the maximum length of " + maximumLength + ".");
        }
    }
}
OutcomeValidator.MaxFields = 57;
exports.OutcomeValidator = OutcomeValidator;
//# sourceMappingURL=outcome.validator.js.map