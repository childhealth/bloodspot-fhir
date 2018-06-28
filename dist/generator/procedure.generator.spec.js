"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_uuid_service_1 = require("../testing/mock.uuid.service");
const procedure_generator_1 = require("./procedure.generator");
const screening_procedure_1 = require("./screening.procedure");
describe("ProcedureGenerator", () => {
    let subject;
    beforeEach(() => {
        subject = new procedure_generator_1.ProcedureGenerator();
    });
    describe("buildProcedure", () => {
        it("should set all the fields", () => {
            const procedureId = new mock_uuid_service_1.MockUuidService("procedure").generateUuid();
            const screeningProcedure = screening_procedure_1.ScreeningProcedure.PKU;
            const patientId = new mock_uuid_service_1.MockUuidService("patient").generateUuid();
            const encounterId = new mock_uuid_service_1.MockUuidService("encounter").generateUuid();
            const statusCode = "4";
            const statusDescription = "Something not suspected";
            const actual = subject.buildProcedure(procedureId, screeningProcedure, patientId, encounterId, statusCode, statusDescription);
            const expected = {
                fullUrl: {
                    "@": {
                        value: "urn:uuid:procedure-1",
                    },
                },
                resource: {
                    Procedure: {
                        id: {
                            "@": {
                                value: "procedure-1",
                            },
                        },
                        meta: {
                            profile: {
                                "@": {
                                    value: screeningProcedure.structureDefinitionCode,
                                },
                            },
                        },
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
                                        value: "314081000",
                                    },
                                },
                                display: {
                                    "@": {
                                        value: "Phenylketonuria screening test",
                                    },
                                },
                            },
                        },
                        subject: {
                            reference: {
                                "@": {
                                    value: "urn:uuid:patient-1",
                                },
                            },
                        },
                        context: {
                            reference: {
                                "@": {
                                    value: "urn:uuid:encounter-1",
                                },
                            },
                        },
                        outcome: {
                            coding: {
                                system: {
                                    "@": {
                                        value: screeningProcedure.codeSystem,
                                    },
                                },
                                code: {
                                    "@": {
                                        value: statusCode,
                                    },
                                },
                                display: {
                                    "@": {
                                        value: statusDescription,
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
//# sourceMappingURL=procedure.generator.spec.js.map