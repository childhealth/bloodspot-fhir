"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
class PatientGenerator {
    constructor(commonGenerator = new common_generator_1.CommonGenerator()) {
        this.commonGenerator = commonGenerator;
    }
    buildPatient(patientId, outcome) {
        const patientCode = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Patient-1";
        const nhsNumberCode = "https://fhir.nhs.uk/Id/nhs-number";
        const element = {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + patientId,
                },
            },
            resource: {
                Patient: {
                    id: {
                        "@": {
                            value: patientId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(patientCode),
                },
            },
        };
        if (outcome.nhsNumber !== "") {
            const identifierElement = {
                identifier: this.commonGenerator.buildSystemValue(nhsNumberCode, outcome.nhsNumber),
            };
            Object.assign(element.resource.Patient, identifierElement);
        }
        return element;
    }
}
exports.PatientGenerator = PatientGenerator;
//# sourceMappingURL=patient.generator.js.map