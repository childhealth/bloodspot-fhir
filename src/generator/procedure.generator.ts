import { CommonGenerator } from "./common.generator";
import { ScreeningProcedure } from "./screening.procedure";

export class ProcedureGenerator {

    private commonGenerator = new CommonGenerator();

    public buildProcedure(
        procedureId: string,
        screeningProcedure: ScreeningProcedure,
        patientId: string,
        encounterId: string,
        reportId: string,
        code: string,
        description: string,
    ): any {

        const screeningProcedureCoding = this.commonGenerator.buildCoding(
            "http://snomed.info/sct",
            screeningProcedure.clinicalTermCode,
            screeningProcedure.display);
        const outcomeCoding = this.commonGenerator.buildCoding(
            screeningProcedure.codeSystem,
            code,
            description);

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
                    report: {
                        reference: {
                            "@": {
                                value: "urn:uuid:" + reportId,
                            },
                        },
                    },
                },
            },
        };

        return element;
    }
}
