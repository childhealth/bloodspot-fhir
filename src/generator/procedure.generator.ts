import { CommonGenerator } from "./common.generator";
import { ScreeningProcedure } from "./screening.procedure";

export class ProcedureGenerator {

    private commonGenerator = new CommonGenerator();

    public buildProcedure(
        procedureId: string,
        screeningProcedure: ScreeningProcedure,
        patientId: string,
        encounterId: string,
    ): any {
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
