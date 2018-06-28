"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
class ProcedureGenerator {
    constructor() {
        this.commonGenerator = new common_generator_1.CommonGenerator();
    }
    buildProcedure(procedureId, screeningProcedure, patientId, encounterId, code, description) {
        const screeningProcedureCoding = this.commonGenerator.buildCoding("http://snomed.info/sct", screeningProcedure.clinicalTermCode, screeningProcedure.display);
        const outcomeCoding = this.commonGenerator.buildCoding(screeningProcedure.codeSystem, code, description);
        const element = {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + procedureId,
                },
            },
            resource: {
                Procedure: {
                    id: {
                        "@": {
                            value: procedureId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(screeningProcedure.structureDefinitionCode),
                    status: {
                        "@": {
                            value: "completed",
                        },
                    },
                    code: screeningProcedureCoding,
                    subject: {
                        reference: {
                            "@": {
                                value: "urn:uuid:" + patientId,
                            },
                        },
                    },
                    context: {
                        reference: {
                            "@": {
                                value: "urn:uuid:" + encounterId,
                            },
                        },
                    },
                    outcome: outcomeCoding,
                },
            },
        };
        return element;
    }
}
exports.ProcedureGenerator = ProcedureGenerator;
//# sourceMappingURL=procedure.generator.js.map