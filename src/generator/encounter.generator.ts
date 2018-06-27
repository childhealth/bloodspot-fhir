import { CommonGenerator } from "./common.generator";

export class EncounterGenerator {

    private commonGenerator = new CommonGenerator();

    public buildEncounter(reportId: string): any {
        const code = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Encounter-1";

        const element = {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + reportId,
                },
            },
            resource: {
                Encounter: {
                    id: {
                        "@": {
                            value: reportId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(code),
                },
            },
        };

        return element;
    }

}
