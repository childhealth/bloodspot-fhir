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
            const uuidService = new mock_uuid_service_1.MockUuidService();
            const procedureId = uuidService.generateUuid();
            const screeningProcedure = screening_procedure_1.ScreeningProcedure.PKU;
            const patientId = uuidService.generateUuid();
            const encounterId = uuidService.generateUuid();
            const actual = subject.buildProcedure(procedureId, screeningProcedure, patientId, encounterId);
            const expected = {
                fullUrl: {
                    "@": {
                        value: "urn:uuid:dummyUuid",
                    },
                },
                resource: {
                    Procedure: {
                        id: {
                            "@": {
                                value: "dummyUuid",
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
                                    value: "urn:uuid:dummyUuid",
                                },
                            },
                        },
                        context: {
                            reference: {
                                "@": {
                                    value: "urn:uuid:dummyUuid",
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