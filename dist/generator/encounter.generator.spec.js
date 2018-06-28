"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_uuid_service_1 = require("../testing/mock.uuid.service");
const encounter_generator_1 = require("./encounter.generator");
describe("EncounterGenerator", () => {
    const code = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Encounter-1";
    let subject;
    beforeEach(() => {
        subject = new encounter_generator_1.EncounterGenerator();
    });
    describe("buildEncounter", () => {
        it("should set the fields", () => {
            const encounterId = new mock_uuid_service_1.MockUuidService("encounter").generateUuid();
            const patientId = new mock_uuid_service_1.MockUuidService("patient").generateUuid();
            const patientName = "Surname, Firstname";
            const collectionDate = new Date(2017, 11, 31);
            const locationId = new mock_uuid_service_1.MockUuidService("location").generateUuid();
            const healthcareServiceId = new mock_uuid_service_1.MockUuidService("healthcareService").generateUuid();
            const actual = subject.buildEncounter(encounterId, patientId, patientName, collectionDate, locationId, healthcareServiceId);
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
//# sourceMappingURL=encounter.generator.spec.js.map