import { MockUuidService } from "../testing/mock.uuid.service";
import { EncounterGenerator } from "./encounter.generator";

describe("EncounterGenerator", () => {

    const code = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Encounter-1";

    let subject: EncounterGenerator;

    beforeEach(() => {
        subject = new EncounterGenerator();
    });

    describe("buildEncounter", () => {
        it("should set the fields", () => {
            const encounterId = new MockUuidService("encounter").generateUuid();
            const patientId = new MockUuidService("patient").generateUuid();
            const patientName = "Surname, Firstname";
            const collectionDate = new Date(2017, 11, 31);
            const locationId = new MockUuidService("location").generateUuid();
            const healthcareServiceId = new MockUuidService("healthcareService").generateUuid();
            const actual = subject.buildEncounter(
                encounterId,
                patientId,
                patientName,
                collectionDate,
                locationId,
                healthcareServiceId);
            const expected = {
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
                        meta: {
                            profile: {
                                "@": {
                                    value: code,
                                },
                            },
                        },
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
                                    value: "2017-12-31",
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

            expect(actual).toEqual(expected);
        });
    });
});
