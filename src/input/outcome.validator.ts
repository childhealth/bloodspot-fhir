export class OutcomeValidator {

    private static MaxFields = 57;

    public validate(fields: string[]) {
        if (fields.length !== OutcomeValidator.MaxFields) {
            throw new Error("Invalid values: string has " + fields.length
              + " values but was expecting " + OutcomeValidator.MaxFields + ".");
        }

        const genderCode = fields[7];
        this.validateGender(genderCode);

        const birthOrder = fields[10];
        this.validateNumber(birthOrder);

        const dateOfBirth = fields[6];
        this.validateDate(dateOfBirth, "Date Of Birth");

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

    private validateNumber(value: string) {
        if (isNaN(Number(value))) {
            throw new Error("Invalid number \"" + value + "\".");
        }
    }

    private validateDate(dateString: string, fieldLabel: string): Date {
        const components = dateString.split("/");
        const prefixErrorMessage = fieldLabel + " should be a date DD/MM/YYYY but was \"";
        if (components.length !== 3) {
            throw new Error(prefixErrorMessage + dateString + "\".");
        }

        const year = Number(components[2]);
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

    private validateGender(code: string) {
        if ((code !== "0") && (code !== "1") && (code !== "2") && (code !== "9")) {
            throw new Error("Gender code should be in [0129] but was \"" + code + "\".");
        }
    }

    private validateStatusCode(code: string, fieldLabel: string): string {
        const numberCode = Number(code);
        if (isNaN(numberCode) || (numberCode < 1) || (numberCode > 10)) {
            throw new Error(fieldLabel + " should be a number between 1 and 10 but was \"" + code + "\".");
        }

        if (code.length === 1) {
            return "0" + code;
        }

        return code;
    }

}
