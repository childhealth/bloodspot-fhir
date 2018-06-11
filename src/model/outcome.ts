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

    public labCode = "";
    public pkuStatusCode = "";
    public pkuSupplementaryCode = "";
    public pkuStatus = "";

    // private dateOfBirth: Date;

    /**
     * Constructs an Outcome object.
     * @param allValues a comma-separated list of values.
     * @throws Error if the values are invalid.
     */
    constructor(public allValues: string) {
        const fields = allValues.split(",");

        if (fields.length !== Outcome.MaxFields) {
            throw new Error("Invalid values: string has " + fields.length
              + " values but was expecting " + Outcome.MaxFields + ".");
        }

        // this.dateOfBirth = new Date();
        this.nationalId = fields[0];
        this.labSerialNo = fields[1];
        this.providerUnit = fields[2];
        this.nhsNo = fields[3].replace(/ /g, "");  // "NNN NNN NNN" is a display string for "NNNNNNNNN"
        this.surname = fields[4];

        this.labCode = fields[29];
        this.pkuStatusCode = fields[30];
        this.pkuSupplementaryCode = fields[31];
        this.pkuStatus = fields[32];
    }
}
