import { MockUuidService } from "../testing/mock.uuid.service";
import { DiagnosticReportGenerator } from "./diagnostic.report.generator";

describe("DiagnosticReportGenerator", () => {

    const reportCode = "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-NewbornBloodSpotScreening-DiagnosticReport-1";

    let subject: DiagnosticReportGenerator;

    beforeEach(() => {
        subject = new DiagnosticReportGenerator();
    });

    describe("buildDiagnosticReport", () => {
        it("should set the fields", () => {
            const reportId = new MockUuidService("report").generateUuid();
            const patientId = new MockUuidService("patient").generateUuid();
            const encounterId = new MockUuidService("encounter").generateUuid();
            const issuedDate = new Date(2018, 11, 24);
            const actual = subject.buildDiagnosticReport(reportId, patientId, encounterId, issuedDate);

            const childScreeningReportCoding = {
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
