import { CommonGenerator } from "./common.generator";
import { ScreeningProcedure } from "./screening.procedure";

export class ProcedureGenerator {

    private commonGenerator = new CommonGenerator();

    public buildProcedure(
        procedureId: string,
        screeningProcedure: ScreeningProcedure,
        patientId: string,
        encounterId: string,
        statusCode: string,
        statusDescription: string,
    ): any {

        const outcomeCoding = this.commonGenerator.buildCoding(
            screeningProcedure.codeSystem,
            statusCode,
            statusDescription);
        // TODO: rename buildCoding(s, c, d) -> buildSystemCodeDisplay(s, c, d)
        // TODO: new buildCoding(s, c, d) will return {coding: buildSCD(s, c, d)}

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
                    outcome: {
                        coding: outcomeCoding,
                    },
                },
            },
        };

        return element;
    }
}
