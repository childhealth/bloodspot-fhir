"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OutcomeValidator {
    validate(fields) {
        if (fields.length !== OutcomeValidator.MaxFields) {
            throw new Error("Invalid values: string has " + fields.length
                + " values but was expecting " + OutcomeValidator.MaxFields + ".");
        }
        const genderCode = fields[7];
        this.validateNumber(genderCode);
        const birthOrder = fields[10];
        this.validateNumber(birthOrder);
        const dateOfBirth = fields[6];
        this.validateDate(dateOfBirth);
        const collectionDate = fields[26];
        this.validateDate(collectionDate);
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
OutcomeValidator.MaxFields = 57;
exports.OutcomeValidator = OutcomeValidator;
//# sourceMappingURL=outcome.validator.js.map