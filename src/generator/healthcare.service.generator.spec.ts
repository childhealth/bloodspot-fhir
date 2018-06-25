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
            const organisationId = "OrG02iD";
            const locationId = "LoCaTiOn01Id";
            const actual = subject.buildHealthcareService(healthcareServiceId, organisationId, locationId);
            const expected = {
                fullUrl: "urn:uuid:" + healthcareServiceId,
                resource: {
                    HealthcareService: {
                        id: {
                            "@": {
                                value: healthcareServiceId,
                            },
                        },
                        meta: {
                            profile: {
                                "@": {
                                    value: "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-HealthcareService-1",
                                },
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
                        providedBy: {
                            reference: {
                                "@": {
                                    value: "urn:uuid:" + organisationId,
                                },
                            },
                            display: {
                                "@": {
                                    value: "Laboratory 01",
                                },
                            },
                        },
                        specialty: {
                            coding: {
                                system: {
                                    "@": {
                                        value: "https://fhir.nhs.uk/STU3/CodeSystem/DCH-Specialty-1",
                                    },
                                },
                                code: {
                                    "@": {
                                        value: "560",
                                    },
                                },
                                display: {
                                    "@": {
                                        value: "MIDWIFE EPISODE",
                                    },
                                },
                            },
                        },
                        location: {
                            reference: {
                                "@": {
                                    value: "urn:uuid:" + locationId,
                                },
                            },
                        },
                        telecom: {
                            system: {
                                "@": {
                                    value: "phone",
                                },
                            },
                            value: {
                                "@": {
                                    value: "123412345",
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
