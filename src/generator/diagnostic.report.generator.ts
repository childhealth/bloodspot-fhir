import { CommonGenerator } from "./common.generator";

export class DiagnosticReportGenerator {

    private commonGenerator = new CommonGenerator();

    public buildDiagnosticReport(reportId: string): any {
        const code = "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-NewbornBloodSpotScreening-DiagnosticReport-1";

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
                },
            },
        };

        return element;
    }

}
