"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outcome_1 = require("../model/outcome");
const mock_uuid_service_1 = require("../testing/mock.uuid.service");
const patient_generator_1 = require("./patient.generator");
describe("PatientGenerator", () => {
    let subject;
    // tslint:disable-next-line:max-line-length
    const csv1 = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,,G83067,1,1,2518,36,1,,,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";
    const outcome1 = new outcome_1.Outcome(csv1);
    // tslint:disable-next-line:max-line-length
    const noNhsNumberCsv = ",16N023744,08A,,TEST,BABY,17/06/2016,2,,G83067,1,1,2518,36,1,,,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";
    const noNhsNumberOutcome = new outcome_1.Outcome(noNhsNumberCsv);
    beforeEach(() => {
        subject = new patient_generator_1.PatientGenerator();
    });
    describe("buildPatient", () => {
        it("should return a simple patient element", () => {
            const uuidService = new mock_uuid_service_1.MockUuidService();
            const patientId = uuidService.generateUuid();
            const actual = subject.buildPatient(patientId, outcome1);
            const expected = {
                fullUrl: {
                    "@": {
                        value: "urn:uuid:dummyUuid",
                    },
                },
                resource: {
                    Patient: {
                        id: {
                            "@": {
                                value: "dummyUuid",
                            },
                        },
                        meta: {
                            profile: {
                                "@": {
                                    value: "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Patient-1",
                                },
                            },
                        },
                        identifier: {
                            system: {
                                "@": {
                                    value: "https://fhir.nhs.uk/Id/nhs-number",
                                },
                            },
                            value: {
                                "@": {
                                    value: outcome1.nhsNumber,
                                },
                            },
                        },
                    },
                },
            };
            expect(actual).toEqual(expected);
        });
        it("should handle a patient which doesnt have an NHS number", () => {
            const uuidService = new mock_uuid_service_1.MockUuidService();
            const patientId = uuidService.generateUuid();
            const actual = subject.buildPatient(patientId, noNhsNumberOutcome);
            const keys = Object.keys(actual.resource.Patient);
            expect("identifier" in keys).toBeFalsy();
        });
    });
});
//# sourceMappingURL=patient.generator.spec.js.map