import { MockUuidService } from "../testing/mock.uuid.service";
import { LocationGenerator } from "./location.generator";

describe("LocationGenerator", () => {

    const code = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Location-1";

    let subject: LocationGenerator;

    beforeEach(() => {
        subject = new LocationGenerator();
    });

    describe("buildLocation", () => {
        it("should set the fields", () => {
            const uuidService = new MockUuidService();
            const locationId = uuidService.generateUuid();
            const actual = subject.buildLocation(locationId);
            const expected = {
                fullUrl: {
                    "@": {
                        value: "urn:uuid:dummyUuid",
                    },
                },
                resource: {
                    Location: {
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
