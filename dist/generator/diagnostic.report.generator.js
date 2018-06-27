"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
class DiagnosticReportGenerator {
    constructor() {
        this.commonGenerator = new common_generator_1.CommonGenerator();
    }
    buildDiagnosticReport(reportId) {
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
exports.DiagnosticReportGenerator = DiagnosticReportGenerator;
//# sourceMappingURL=diagnostic.report.generator.js.map