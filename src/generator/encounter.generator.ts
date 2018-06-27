import dateformat from "dateformat";
import { CommonGenerator } from "./common.generator";

export class EncounterGenerator {

    private commonGenerator = new CommonGenerator();

    public buildEncounter(
        encounterId: string,
        patientId: string,
        patientName: string,
        collectionDate: Date,
        locationId: string,
        healthcareServiceId: string,
    ): any {
        const code = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Encounter-1";
        const collectionDateString = dateformat(collectionDate, "yyyy-mm-dd");

        const element = {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + encounterId,
                },
            },
            resource: {
                Encounter: {
                    id: {
                        "@": {
                            value: encounterId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(code),
                    status: {
                        "@": {
                            value: "finished",
                        },
                    },
                    subject: {
                        reference: {
                            "@": {
                                value: "urn:uuid:" + patientId,
                            },
                        },
                        display: {
                            "@": {
                                value: patientName,
                            },
                        },
                    },
                    period: {
                        start: {
                            "@": {
                                value: collectionDateString,
                            },
                        },
                    },
                    location: {
                        location: {
                            reference: {
                                "@": {
                                    value: "urn:uuid:" + locationId,
                                },
                            },
                        },
                    },
                    serviceProvider: {
                        reference: {
                            "@": {
                                value: "urn:uuid:" + healthcareServiceId,
                            },
                        },
                    },
                },
            },
        };

        return element;
    }

}
