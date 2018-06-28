import { MockUuidService } from "../testing/mock.uuid.service";
import { ProcedureGenerator } from "./procedure.generator";
import { ScreeningProcedure } from "./screening.procedure";

describe("ProcedureGenerator", () => {
    let subject: ProcedureGenerator;

    beforeEach(() => {
        subject = new ProcedureGenerator();
    });

    describe("buildProcedure", () => {
        it("should set all the fields", () => {
            const procedureId = new MockUuidService("procedure").generateUuid();
            const screeningProcedure = ScreeningProcedure.PKU;
            const patientId = new MockUuidService("patient").generateUuid();
            const encounterId = new MockUuidService("encounter").generateUuid();
            const actual = subject.buildProcedure(
                procedureId,
                screeningProcedure,
                patientId,
                encounterId);
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
                    },
                },
            };

            expect(actual).toEqual(expected);
        });
    });

});
