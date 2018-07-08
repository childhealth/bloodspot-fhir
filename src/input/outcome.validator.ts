export class OutcomeValidator {

    private static MaxFields = 57;

    public validate(fields: string[]) {
        if (fields.length !== OutcomeValidator.MaxFields) {
            throw new Error("Invalid values: string has " + fields.length
              + " values but was expecting " + OutcomeValidator.MaxFields + ".");
        }

        const nationalId = fields[0];
        this.validateStringLength(nationalId, 19, "National Id");

        const labSerialNo = fields[1];
        this.validateStringLength(labSerialNo, 50, "Lab Serial Number");

        const providerUnit = fields[2];
        this.validateStringLength(providerUnit, 35, "Provider Unit");

        const nhsNumber = fields[3].replace(/ /g, "");
        this.validateStringLength(nhsNumber, 10, "NHS Number");

        const surname = fields[4];
        this.validateMandatory(surname, "Surname");
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
        this.validateNumberRange(birthOrder, 1, 9, "Birth Order");

        const birthConfinement = fields[11];
        this.validateNumber(birthConfinement, "Birth Confinement");
        this.validateNumberRange(birthConfinement, 1, 9, "Birth Confinement");

        const birthWeighInGrams = fields[12];
        this.validateNumber(birthWeighInGrams, "Birth Weight");
        this.validateNumberRange(birthWeighInGrams, 0, 9999, "Birth Weight");

        const gestationLengthInWeeks = fields[13];
        this.validateNumber(gestationLengthInWeeks, "Gestation Length");
        this.validateNumberRange(gestationLengthInWeeks, 0, 49, "Gestation Length");

        const nicu = fields[14]; // Is the baby in Intensive Care Unit? "1" or "0"
        this.validateNumber(nicu, "NICU Flag");
        this.validateNumberRange(nicu, 0, 1, "NICU Flag");

        const mothersSurname = fields[15];
        this.validateStringLength(mothersSurname, 35, "Mother's Surname");

        const alternativeSurname = fields[16];
        this.validateStringLength(alternativeSurname, 35, "Alternative Surname");

        const mothersFirstname = fields[17];
        this.validateStringLength(mothersFirstname, 35, "Mother's Firstname");

        const mothersAddressLine1 = fields[18];
        this.validateStringLength(mothersAddressLine1, 35, "Mother's Address Line 1");

        const mothersAddressLine2 = fields[19];
        this.validateStringLength(mothersAddressLine2, 35, "Mother's Address Line 2");

        const mothersAddressLine3 = fields[20];
        this.validateStringLength(mothersAddressLine3, 35, "Mother's Address Line 3");

        const mothersAddressLine4 = fields[21];
        this.validateStringLength(mothersAddressLine4, 35, "Mother's Address Line 4");

        const mothersAddressLine5 = fields[22];
        this.validateStringLength(mothersAddressLine5, 35, "Mother's Address Line 5");

        const mothersPostcode = fields[23];
        this.validateStringLength(mothersPostcode, 8, "Mother's Post Code");

        const mothersTelephone = fields[24];
        this.validateStringLength(mothersTelephone, 20, "Mother's Telephone");

        const receiptDate = fields[25];
        this.validateDate(receiptDate, "Date Of Receipt");

        const collectionDate = fields[26];
        this.validateDate(collectionDate, "Collection Date");

        const previousLabSerialNo = fields[27];
        this.validateStringLength(previousLabSerialNo, 50, "Previous Lab Serial Number");

        const sampleTakerName = fields[28];
        this.validateStringLength(sampleTakerName, 35, "Sample Taker's Name");

        const labCode = fields[29];
        this.validateStringLength(labCode, 35, "Lab Code");

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

    private validateMandatory(value: string, fieldLabel: string) {
        if (value === null || (value === "")) {
            throw new Error(fieldLabel + " is mandatory but was empty.");
        }
    }

    private validateNumber(value: string, fieldLabel: string) {
        if (isNaN(Number(value))) {
            throw new Error(fieldLabel + " should be a number but was \"" + value + "\".");
        }
    }

    private validateNumberRange(value: string, minimum: number, maximum: number, fieldLabel: string) {
        const numberValue = Number(value);
        if ((numberValue < minimum) || (numberValue > maximum)) {
            throw new Error(fieldLabel + " should be between " + minimum + " and " + maximum
                    + " but was " + value + ".");
        }
    }

    private validateDate(dateString: string, fieldLabel: string): Date {
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

    private validateStringLength(value: string, maximumLength: number, fieldLabel: string) {
        if (value.length > maximumLength) {
            throw new Error(fieldLabel + " value \"" + value
                    + "\" exceeds the maximum length of " + maximumLength + ".");
        }
    }
}
