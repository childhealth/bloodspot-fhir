import { MockUuidService } from "../testing/mock.uuid.service";
import { CommonGenerator } from "./common.generator";
import { ProcedureGenerator } from "./procedure.generator";
import { ScreeningProcedure } from "./screening.procedure";

describe("ProcedureGenerator", () => {
    let subject: ProcedureGenerator;

    beforeEach(() => {
        subject = new ProcedureGenerator();
    });

    describe("buildProcedure", () => {
        it("should set all the fields", () => {
            const uuidService = new MockUuidService();
            const procedureId = uuidService.generateUuid();
            const screeningProcedure = ScreeningProcedure.PKU;
            const patientId = uuidService.generateUuid();
            const encounterId = uuidService.generateUuid();
            const actual = subject.buildProcedure(
                procedureId,
                screeningProcedure,
                patientId,
                encounterId);
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
