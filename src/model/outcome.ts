/**
 * Represents a bloodspot test result from UK Newborn Screening Laboratory Network (UKNSLN).
 * Corresponds to 1 row in a CSV file from a screening laboratory, and 1 Blood Spot Test
 * Outcome Event Message.
 */
export class Outcome {

    private static MaxFields = 57;

    public nationalId = "";
    public labSerialNo = "";
    public providerUnit = "";
    public nhsNo = "";
    public surname = "";
    public firstName = "";
    public dateOfBirth: Date;
    // genderCode
    // gpName
    // gpCode
    // birthOrder
    // birthConfinement
    // birthWeight
    // gestationLength
    // nicu
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
    public labCode = "";
    public pkuStatusCode = "";
    public pkuSupplementaryCode = "";
    public pkuStatus = "";
    public chtStatusCode = "";
    public chtSupplementaryCode = "";
    public chtStatus = "";
    public sickleStatusCode = "";
    public sickleSupplementaryCode = "";
    public sickleStatus = "";
    public cfStatusCode = "";
    public cfSupplementaryCode = "";
    public cfStatus = "";
    public mcaddStatusCode = "";
    public mcaddSupplementaryCode = "";
    public mcaddStatus = "";
    public hcuStatusCode = "";
    public hcuSupplementaryCode = "";
    public hcuStatus = "";
    public msudStatusCode = "";
    public msudSupplementaryCode = "";
    public msudStatus = "";
    public ga1StatusCode = "";
    public ga1SupplementaryCode = "";
    public ga1Status = "";
    public ivaStatusCode = "";
    public ivaSupplementaryCode = "";
    public ivaStatus = "";

    /**
     * Constructs an Outcome object.
     * @param allValues a comma-separated list of values.
     * @throws Error if the values are invalid.
     */
    constructor(public allValues: string) {
        const fields = allValues.split(",");

        this.validate(fields);

        // this.nationalId = fields[0]; // Not used?
        this.labSerialNo = fields[1];
        this.providerUnit = fields[2];
        this.nhsNo = fields[3].replace(/ /g, "");  // "NNN NNN NNN" is a display string for "NNNNNNNNN"
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

    private validate(fields: string[]) {
        if (fields.length !== Outcome.MaxFields) {
            throw new Error("Invalid values: string has " + fields.length
              + " values but was expecting " + Outcome.MaxFields + ".");
        }
    }

    private validateDate(dateString: string): Date {
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
