"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
class HealthcareServiceGenerator {
    constructor(configurationService) {
        this.configurationService = configurationService;
        this.commonGenerator = new common_generator_1.CommonGenerator();
    }
    buildHealthcareService(healthcareServiceId, organisationId) {
        const healthcareServiceCode = "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-HealthcareService-1";
        const professionalTypeCode = "https://fhir.nhs.uk/STU3/ValueSet/DCH-ProfessionalType-1";
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
                    meta: this.commonGenerator.buildProfile(healthcareServiceCode),
                    type: {
                        coding: this.commonGenerator.buildCoding(professionalTypeCode, type.code, type.description),
                    },
                    providedBy: {
                        reference: {
                            "@": {
                                value: "urn:uuid:" + organisationId,
                            },
                        },
                        display: {
                            "@": {
                                value: this.configurationService.laboratory.description,
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