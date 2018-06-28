"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_uuid_service_1 = require("../testing/mock.uuid.service");
const diagnostic_report_generator_1 = require("./diagnostic.report.generator");
describe("DiagnosticReportGenerator", () => {
    const reportCode = "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-NewbornBloodSpotScreening-DiagnosticReport-1";
    let subject;
    beforeEach(() => {
        subject = new diagnostic_report_generator_1.DiagnosticReportGenerator();
    });
    describe("buildDiagnosticReport", () => {
        it("should set the fields", () => {
            const reportId = new mock_uuid_service_1.MockUuidService("report").generateUuid();
            const patientId = new mock_uuid_service_1.MockUuidService("patient").generateUuid();
            const encounterId = new mock_uuid_service_1.MockUuidService("encounter").generateUuid();
            const issuedDate = new Date(2018, 11, 24);
            const actual = subject.buildDiagnosticReport(reportId, patientId, encounterId, issuedDate);
            const childScreeningReportCoding = {
                coding: {
                    system: {
                        "@": {
                            value: "http://snomed.info/sct",
                        },
                    },
                    code: {
                        "@": {
                            value: "86637100000010",
                        },
                    },
                    display: {
                        "@": {
                            value: "Child Screening Report (record artifact)",
                        },
                    },
                },
            };
            const expected = {
                fullUrl: {
                    "@": {
                        value: "urn:uuid:report-1",
                    },
                },
                resource: {
                    DiagnosticReport: {
                        id: {
                            "@": {
                                value: "report-1",
                            },
                        },
                        meta: {
                            profile: {
                                "@": {
                                    value: reportCode,
                                },
                            },
                        },
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
                        issued: {
                            "@": {
                                value: "2018-12-24T00:00:00.000Z",
                            },
                        },
                    },
                },
            };
            expect(actual).toEqual(expected);
        });
    });
});
//# sourceMappingURL=diagnostic.report.generator.spec.js.map