import { CommonGenerator } from "./common.generator";

export class DiagnosticReportGenerator {

    private commonGenerator = new CommonGenerator();

    public buildDiagnosticReport(
            reportId: string,
            patientId: string,
            encounterId: string,
            issuedDate = new Date(),
        ): any {
        const code = "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-NewbornBloodSpotScreening-DiagnosticReport-1";

        const childScreeningReportCoding = this.commonGenerator.buildCoding(
            "http://snomed.info/sct",
            "86637100000010",
            "Child Screening Report (record artifact)");
        const element = {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + reportId,
                },
            },
            resource: {
                DiagnosticReport: {
                    id: {
                        "@": {
                            value: reportId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(code),
                    status: {
                        "@": {
                            value: "final",
                        },
                    },
                    code: {
                        coding: childScreeningReportCoding,
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
                    issued: this.commonGenerator.buildTimestamp(issuedDate),
                },
            },
        };

        return element;
    }

}
