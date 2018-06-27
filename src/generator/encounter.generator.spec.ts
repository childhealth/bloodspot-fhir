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
            const actual = subject.buildEncounter(encounterId);
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
                    },
                },
            };

            expect(actual).toEqual(expected);
        });
    });
});
