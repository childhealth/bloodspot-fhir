"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
class LocationGenerator {
    constructor(configurationService) {
        this.configurationService = configurationService;
        this.commonGenerator = new common_generator_1.CommonGenerator();
    }
    buildLocation(locationId) {
        const structureDefinitionCode = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Location-1";
        const odsSiteSystem = "https://fhir.nhs.uk/Id/ods-site-code";
        const odsCode = this.configurationService.laboratory.odsCode;
        const element = {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + locationId,
                },
            },
            resource: {
                Location: {
                    id: {
                        "@": {
                            value: locationId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(structureDefinitionCode),
                    identifier: this.commonGenerator.buildSystemValue(odsSiteSystem, odsCode),
                },
            },
        };
        return element;
    }
}
exports.LocationGenerator = LocationGenerator;
//# sourceMappingURL=location.generator.js.map