import { InputChannel } from "../input/input.channel";
import { Outcome } from "../model/outcome";
import { OutputChannel } from "../output/output.channel";

export class Generator {

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

    private generateFHIRMessage(outcome: Outcome): any {
        if (outcome === null) {
            throw new Error("Input must not be empty.");
        }

        const orgEntry = this.buildOrganisation(outcome.providerUnit);

        const bundleObject = {
            "@": {
                xmlns: "http://hl7.org/fhir",
            },
            "id": {
                "@": {
                    value: "todoUuid",
                },
            },
            "meta": {
                profile: {
                    "@": {
                        value: "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-Bundle-1",
                    },
                },
            },
            "type": {
                "@": {
                    value: "message",
                },
            },
            // tslint:disable-next-line:object-literal-sort-keys
            "entry": [
                orgEntry,
            ],
        };

        return bundleObject;
    }

    // A DCH-BloodSpotTestOutcome-Bundle is a DCH-Bundle element with 16 entries:
    // [0]: DCH-MessageHeader-1:
    //      resource identifier - a publication reference number which will use a UUID format
    //      event type: identifying that this message is a Blood Spot Test Outcome
    //      source: IT system holding the event data - the lab's LIMS (config)
    //      responsible: event publisher - the lab (config)
    //      period.start: (CareConnect-DCH-Encounter-1) event date time - assume same
    //                   as timestamp - datetime stamp when this tool is run.
    //      timestamp: event published date - now
    // [1]: a CareConnect-DCH-Organization - the screening lab
    // [2]: a HealthcareService - assume hardcoded value for a screening lab
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
    // [14]: CareConnect-DCH-Encounter-1 - subject (patient), period, location, serviceProvider(lab)
    // [15]: CareConnect-DCH-Location-1 location at which the event occurred the lab's ODS code (config)

    private buildOrganisation(odsCode: string): any {
        const element = {
            Organization: odsCode,
        };

        return element;
    }

}
