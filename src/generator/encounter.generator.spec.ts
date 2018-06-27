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
            const uuidService = new MockUuidService();
            const encounterId = uuidService.generateUuid();
            const patientId = uuidService.generateUuid();
            const patientName = "Surname, Firstname";
            const collectionDate = new Date(2017, 11, 31);
            const actual = subject.buildEncounter(encounterId, patientId, patientName, collectionDate);
            const expected = {
                fullUrl: {
                    "@": {
                        value: "urn:uuid:dummyUuid",
                    },
                },
                resource: {
                    Encounter: {
                        id: {
                            "@": {
                                value: "dummyUuid",
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
                        // location: locationId,
                        // serviceProvider: healthcareServiceId
                    },
                },
            };

            expect(actual).toEqual(expected);
        });
    });
});
