"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_configuration_service_1 = require("../testing/mock.configuration.service");
const mock_uuid_service_1 = require("../testing/mock.uuid.service");
const location_generator_1 = require("./location.generator");
describe("LocationGenerator", () => {
    const code = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Location-1";
    let subject;
    beforeEach(() => {
        subject = new location_generator_1.LocationGenerator(new mock_configuration_service_1.MockConfigurationService());
    });
    describe("buildLocation", () => {
        it("should set the fields", () => {
            const uuidService = new mock_uuid_service_1.MockUuidService();
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
                        identifier: {
                            system: {
                                "@": {
                                    value: "https://fhir.nhs.uk/Id/ods-site-code",
                                },
                            },
                            value: {
                                "@": {
                                    value: "LAB01",
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
//# sourceMappingURL=location.generator.spec.js.map