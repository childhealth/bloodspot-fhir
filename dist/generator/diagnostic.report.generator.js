"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
class DiagnosticReportGenerator {
    constructor() {
        this.commonGenerator = new common_generator_1.CommonGenerator();
    }
    buildDiagnosticReport(reportId, patientId, encounterId, issuedDate = new Date()) {
        const code = "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-NewbornBloodSpotScreening-DiagnosticReport-1";
        const childScreeningReportCoding = this.commonGenerator.buildCoding("http://snomed.info/sct", "86637100000010", "Child Screening Report (record artifact)");
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
                    code: childScreeningReportCoding,
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
exports.DiagnosticReportGenerator = DiagnosticReportGenerator;
//# sourceMappingURL=diagnostic.report.generator.js.map