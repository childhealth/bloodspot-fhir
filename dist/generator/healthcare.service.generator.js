"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthcareServiceGenerator {
    constructor(configurationService) {
        this.configurationService = configurationService;
    }
    buildHealthcareService(healthcareServiceId) {
        const type = this.configurationService.healthcareService.professionalType;
        const element = {
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
                                    value: type.code,
                                },
                            },
                            display: {
                                "@": {
                                    value: type.description,
                                },
                            },
                        },
                    },
                },
            },
        };
        return element;
    }
}
exports.HealthcareServiceGenerator = HealthcareServiceGenerator;
//# sourceMappingURL=healthcare.service.generator.js.map