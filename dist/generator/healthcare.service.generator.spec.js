"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_configuration_service_1 = require("../testing/mock.configuration.service");
const healthcare_service_generator_1 = require("./healthcare.service.generator");
describe("HealthcareServiceGenerator", () => {
    let subject;
    beforeEach(() => {
        subject = new healthcare_service_generator_1.HealthcareServiceGenerator(new mock_configuration_service_1.MockConfigurationService());
    });
    // providedBy
    // type DCH-ProfessionalType-1 (config)
    // speciality: https://fhir.nhs.uk/STU3/ValueSet/DCH-Specialty-1
    // location
    // telecom
    describe("buildHealthcareService", () => {
        it("should set the healthcareServiceId", () => {
            const healthcareServiceId = "843484id";
            const actual = subject.buildHealthcareService(healthcareServiceId);
            const expected = {
                fullUrl: "urn:uuid:" + healthcareServiceId,
                resource: {
                    HealthcareService: {
                        id: {
                            "@": {
                                value: healthcareServiceId,
                            },
                        },
                        type: {
                            coding: {
                                system: {
                                    "@": {
                                        value: "https://fhir.nhs.uk/STU3/ValueSet/DCH-ProfessionalType-1",
                                    },
                                },
                                code: {
                                    "@": {
                                        value: "ProfTypeCODE1",
                                    },
                                },
                                display: {
                                    "@": {
                                        value: "ProfTypeDescription",
                                    },
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
//# sourceMappingURL=healthcare.service.generator.spec.js.map