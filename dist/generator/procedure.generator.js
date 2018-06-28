"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
class ProcedureGenerator {
    constructor() {
        this.commonGenerator = new common_generator_1.CommonGenerator();
    }
    buildProcedure(procedureId, screeningProcedure, patientId, encounterId) {
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
                    code: {
                        coding: {
                            system: {
                                "@": {
                                    value: "http://snomed.info/sct",
                                },
                            },
                            code: {
                                "@": {
                                    value: screeningProcedure.clinicalTermCode,
                                },
                            },
                            display: {
                                "@": {
                                    value: screeningProcedure.display,
                                },
                            },
                        },
                    },
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
                },
            },
        };
        return element;
    }
}
exports.ProcedureGenerator = ProcedureGenerator;
//# sourceMappingURL=procedure.generator.js.map