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
            const uuidService = new mock_uuid_service_1.MockUuidService();
            const reportId = uuidService.generateUuid();
            const actual = subject.buildDiagnosticReport(reportId);
            const expected = {
                fullUrl: {
                    "@": {
                        value: "urn:uuid:dummyUuid",
                    },
                },
                resource: {
                    DiagnosticReport: {
                        id: {
                            "@": {
                                value: "dummyUuid",
                            },
                        },
                        meta: {
                            profile: {
                                "@": {
                                    value: reportCode,
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
//# sourceMappingURL=diagnostic.report.generator.spec.js.map