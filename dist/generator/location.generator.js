"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
class LocationGenerator {
    constructor() {
        this.commonGenerator = new common_generator_1.CommonGenerator();
    }
    buildLocation(locationId) {
        const code = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Location-1";
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
                    meta: this.commonGenerator.buildProfile(code),
                },
            },
        };
        return element;
    }
}
exports.LocationGenerator = LocationGenerator;
//# sourceMappingURL=location.generator.js.map