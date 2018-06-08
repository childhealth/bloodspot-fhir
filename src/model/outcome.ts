/**
 * Represents a bloodspot test result from UK Newborn Screening Laboratory Network (UKNSLN).
 * Corresponds to 1 row in a CSV file from a screening laboratory, and 1 Blood Spot Test
 * Outcome Event Message.
 */
export class Outcome {

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

    constructor(public allValues: string) {
        const fields = allValues.split(",");
        // this.dateOfBirth = new Date();
        this.nationalId = fields[0];
        this.labSerialNo = fields[1];
    }
}
