"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
class EncounterGenerator {
    constructor() {
        this.commonGenerator = new common_generator_1.CommonGenerator();
    }
    buildEncounter(reportId) {
        const code = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Encounter-1";
        const element = {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + reportId,
                },
            },
            resource: {
                Encounter: {
                    id: {
                        "@": {
                            value: reportId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(code),
                },
            },
        };
        return element;
    }
}
exports.EncounterGenerator = EncounterGenerator;
//# sourceMappingURL=encounter.generator.js.map