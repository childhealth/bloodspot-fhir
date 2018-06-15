import xml from "xml";
import { InputChannel } from "../input/input.channel";
import { Outcome } from "../model/outcome";
import { OutputChannel } from "../output/output.channel";

export class Generator {

    public formatType: string = "xml";

    constructor(
        public inputChannel: InputChannel,
        public outputChannel: OutputChannel,
    ) {
    }

    public execute() {
        for (const eachOutcome of this.inputChannel.outcomes) {
            const outcomeMessage = this.generateFHIRMessage(eachOutcome);
            this.outputChannel.write(outcomeMessage);
        }
    }

    private generateFHIRMessage(outcome: Outcome): string {
        if (outcome === null) {
            throw new Error("Input must not be empty.");
        }

        const orgEntry = this.buildOrganisation(outcome.providerUnit);

        return "<awesome-fhir-message>" + orgEntry + "</awesome-fhir-message>";
    }

    // A DCH-BloodSpotTestOutcome-Bundle is a DCH-Bundle element with 16 entries:
    // [0]: a DCH-MessageHeader identifying that this message is a Blood Spot Test Outcome
    // [1]: a CareConnect-DCH-Organization
    // [2]: a HealthcareService
    // [3]: Patient
    // [4]: CareConnect-DCH-NewbornBloodSpotScreeningPKU-Procedure-1
    // [5]: CareConnect-DCH-NewbornBloodSpotScreeningSCD-Procedure-1
    // [6]: CareConnect-DCH-NewbornBloodSpotScreeningCF-Procedure-1
    // [7]: CareConnect-DCH-NewbornBloodSpotScreeningCHT-Procedure-1
    // [8]: CareConnect-DCH-NewbornBloodSpotScreeningMCADD-Procedure-1
    // [9]: CareConnect-DCH-NewbornBloodSpotScreeningHCU-Procedure-1
    // [10]: CareConnect-DCH-NewbornBloodSpotScreeningMSUD-Procedure-1
    // [11]: CareConnect-DCH-NewbornBloodSpotScreeningGA1-Procedure-1
    // [12]: CareConnect-DCH-NewbornBloodSpotScreeningIVA-Procedure-1
    // [13]: DCH-NewbornBloodSpotScreening-DiagnosticReport-1 - Child Screening Report
    // [14]: CareConnect-DCH-Encounter-1 - subject (patient), period, location, serviceProvider
    // [15]: CareConnect-DCH-Location-1

    private buildOrganisation(odsCode: string): string {
        const element = {
            Organization: odsCode,
        };

        if (this.formatType === "json") {
            return JSON.stringify(element);
        } else if (this.formatType === "xml") {
            return xml(element);
        }

        throw new Error("Unhandled formatType \"" + this.formatType + "\"");
    }

}
