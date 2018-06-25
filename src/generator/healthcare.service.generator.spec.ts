import { MockConfigurationService } from "../testing/mock.configuration.service";
import { HealthcareServiceGenerator } from "./healthcare.service.generator";

describe("HealthcareServiceGenerator", () => {
    let subject: HealthcareServiceGenerator;

    beforeEach(() => {
        subject = new HealthcareServiceGenerator(new MockConfigurationService());
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
