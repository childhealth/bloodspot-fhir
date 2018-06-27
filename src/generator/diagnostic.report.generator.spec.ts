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
            const uuidService = new MockUuidService();
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
