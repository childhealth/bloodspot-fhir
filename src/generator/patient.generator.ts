import { Outcome } from "../model/outcome";
import { CommonGenerator } from "./common.generator";

export class PatientGenerator {

    constructor(
        private commonGenerator = new CommonGenerator(),
    ) {}

    public buildPatient(patientId: string, outcome: Outcome): any {
        const patientCode = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Patient-1";
        const nhsNumberCode = "https://fhir.nhs.uk/Id/nhs-number";

        const birthDateString = outcome.dateOfBirth.toISOString().slice(0, 10);

        const element = {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + patientId,
                },
            },
            resource: {
                Patient: {
                    id: {
                        "@": {
                            value: patientId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(patientCode),
                    name: {
                        use: {
                            "@": {
                                value: "official",
                            },
                        },
                        family: {
                            "@": {
                                value: outcome.surname,
                            },
                        },
                        given: {
                            "@": {
                                value: outcome.firstName,
                            },
                        },
                    },
                    birthDate: {
                        "@": {
                            value: birthDateString,
                        },
                    },
                    address: {
                        use: {
                            "@": {
                                value: "home",
                            },
                        },
                        line: [
                            {
                                "@": {
                                    value: outcome.address1,
                                },
                            },
                            {
                                "@": {
                                    value: outcome.address2,
                                },
                            },
                            {
                                "@": {
                                    value: outcome.address3,
                                },
                            },
                            {
                                "@": {
                                    value: outcome.address4,
                                },
                            },
                            {
                                "@": {
                                    value: outcome.address5,
                                },
                            },
                        ],
                        postalCode: {
                            "@": {
                                value: outcome.postcode,
                            },
                        },
                    },
                },
            },
        };

        if (outcome.nhsNumber !== "") {
            const identifierElement = {
                identifier: this.commonGenerator.buildSystemValue(nhsNumberCode, outcome.nhsNumber),
            };
            Object.assign(element.resource.Patient, identifierElement);
        }

        return element;
    }
}
