import { InputChannel } from "../input/input.channel";
import { Outcome } from "../model/outcome";
import { OutputChannel } from "../output/output.channel";
import { DummyLocalFileInputChannel } from "../testing/dummy.local.file.input.channel";
import { DummyLocalFolderOutputChannel } from "../testing/dummy.local.folder.output.channel";
import { MockConfigurationService } from "../testing/mock.configuration.service";
import { MockUuidService } from "../testing/mock.uuid.service";
import { Generator } from "./generator";
import { UuidService } from "./uuid.service";

describe("Generator", () => {
    let inputChannel: InputChannel;
    let outputChannel: OutputChannel;
    let subject: Generator;
    let subjectWithPrivateMethods: any;

    // tslint:disable-next-line:max-line-length
    const csv1 = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,,G83067,1,1,2518,36,1,,,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";

    beforeEach(() => {
        inputChannel = new DummyLocalFileInputChannel();
        outputChannel = new DummyLocalFolderOutputChannel();
        subject = new Generator(
            inputChannel,
            outputChannel,
            new UuidService(),
            new MockConfigurationService());
        subjectWithPrivateMethods = subject as any;
    });

    describe("execute", () => {
        it("should call output.write() for each input outcome", () => {
            spyOn(outputChannel, "write");
            subject.execute();
            expect(outputChannel.write).toHaveBeenCalledTimes(subject.inputChannel.outcomes.length);
        });

        it("should call generateFHIRMessage() for each input outcome", () => {
            spyOn<any>(subjectWithPrivateMethods, "generateFHIRMessage");
            subject.execute();
            const inputOutcomes = subject.inputChannel.outcomes;
            expect(subjectWithPrivateMethods.generateFHIRMessage).toHaveBeenCalledTimes(inputOutcomes.length);
        });
    });

    describe("generateFHIRMessage", () => {
        // tslint:disable-next-line:max-line-length
        const oldSampleCardCsv = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,,G83067,1,1,2518,36,1,,,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,3,311,PKU old card was used. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";

        it("should throw error if input is empty", () => {
            expect(() => {
                const ignoredFhirMessage = subjectWithPrivateMethods.generateFHIRMessage(null);
            }).toThrow(new Error("Input must not be empty."));
        });

        it("should return a simple fhir message", () => {
            const outcome = new Outcome(csv1);
            const actual = subjectWithPrivateMethods.generateFHIRMessage(outcome);

            const keys = Object.keys(actual);
            expect(keys).toContain("id");
            expect(keys).toContain("meta");
            expect(keys).toContain("type");
            expect(keys).toContain("entry");
        });

        it("should use CSV status code when supplementary code is not set", () => {
            const outcome = new Outcome(csv1);
            const actual = subjectWithPrivateMethods.generateFHIRMessage(outcome);

            const pkuProcedureEntry = actual.entry[4];
            const outcomeCoding = pkuProcedureEntry.resource.Procedure.outcome.coding;
            const statusValue = outcomeCoding.code["@"].value;
            expect(statusValue).toEqual("04");
        });

        it("should use supplementary code as status code if set", () => {
            const outcome = new Outcome(oldSampleCardCsv);
            const actual = subjectWithPrivateMethods.generateFHIRMessage(outcome);

            const pkuProcedureEntry = actual.entry[4];
            const outcomeCoding = pkuProcedureEntry.resource.Procedure.outcome.coding;
            const statusValue = outcomeCoding.code["@"].value;
            expect(statusValue).toEqual("0311");
        });

        it("should contain 9 procedures", () => {
            const outcome = new Outcome(csv1);
            const actual = subjectWithPrivateMethods.generateFHIRMessage(outcome);
            let numberOfProcedures = 0;
            for (const element of actual.entry) {
                if (("resource" in element) && (element.resource.hasOwnProperty("Procedure"))) {
                    numberOfProcedures = numberOfProcedures + 1;
                }
            }

            expect(numberOfProcedures).toEqual(9);
        });
    });

    describe("buildMessageHeader", () => {
        it("should contain entries of the correct type in the correct order", () => {
            const actual = subjectWithPrivateMethods.buildMessageHeader();
            const keys = Object.keys(actual);
            expect(keys). toContain("fullUrl");
            expect(keys). toContain("resource");
            const mh = actual.resource.MessageHeader;
            const mhKeys = Object.keys(mh);
            expect(mhKeys).toContain("id");
            expect(mhKeys).toContain("meta");
            expect(mhKeys).toContain("extension");
            expect(mhKeys).toContain("event");
            expect(mhKeys).toContain("timestamp");
            expect(mhKeys).toContain("source");
            expect(mhKeys).toContain("responsible");
            expect(mhKeys).toContain("focus");
        });
    });

    describe("buildSource", () => {
        it("should set the ods code in the endpoint value", () => {
            const odsCode = "RX3EP";
            const actual = subjectWithPrivateMethods.buildSource(odsCode);
            const expected = {
                endpoint: {
                    "@": {
                        value: "urn:nhs-uk:addressing:ods:" + odsCode,
                    },
                },
            };
            expect(actual).toEqual(expected);
        });
    });

    describe("buildResponsible", () => {
        it("should set id and display text", () => {
            const id = "id";
            const description = "description";
            const actual = subjectWithPrivateMethods.buildResponsible(id, description);
            const expected = {
                reference: {
                    "@": {
                        value: "urn:uuid:id",
                    },
                },
                display: {
                    "@": {
                        value: description,
                    },
                },
            };
            expect(actual).toEqual(expected);
        });
    });

    describe("buildFocus", () => {
        it("should set the id", () => {
            const id = "FOCUS01";
            const actual = subjectWithPrivateMethods.buildFocus(id);
            const expected = {
                reference: {
                    "@": {
                        value: "urn:uuid:" + id,
                    },
                },
            };
            expect(actual).toEqual(expected);
        });
    });

    describe("buildOrganisation", () => {
        it("should return a simple organisation object", () => {
            const orgId = "ORGID01";
            const orgCode = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Organization-1";
            const mockLabOdsCode = "LAB01";
            const labName = "Laboratory 01";
            const actual = subjectWithPrivateMethods.buildOrganisation(orgId);
            const expected = {
                fullUrl: "urn:uuid:" + orgId,
                resource: {
                    Organization: {
                        id: orgId,
                        meta: {
                            profile: {
                                "@": {
                                    value: orgCode,
                                },
                            },
                        },
                        identifier: {
                            system: {
                                "@": {
                                    value: "https://fhir.nhs.uk/Id/ods-organization-code",
                                },
                            },
                            value: {
                                "@": {
                                    value: mockLabOdsCode,
                                },
                            },
                        },
                        name: {
                            "@": {
                                value: labName,
                            },
                        },
                        address: {
                            line: {
                                "@": {
                                    value: "Address Line 1",
                                },
                            },
                            city: {
                                "@": {
                                    value: "Lab City",
                                },
                            },
                            district: {
                                "@": {
                                    value: "District 1",
                                },
                            },
                            postalCode: {
                                "@": {
                                    value: "NN1 1AA",
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
