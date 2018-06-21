"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outcome_1 = require("../model/outcome");
const dummy_local_file_input_channel_1 = require("../testing/dummy.local.file.input.channel");
const dummy_local_folder_output_channel_1 = require("../testing/dummy.local.folder.output.channel");
const dummy_uuid_service_1 = require("../testing/dummy.uuid.service");
const generator_1 = require("./generator");
describe("Generator", () => {
    let inputChannel;
    let outputChannel;
    let subject;
    let subjectWithPrivateMethods;
    // tslint:disable-next-line:max-line-length
    const csv1 = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,,G83067,1,1,2518,36,1,,,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";
    beforeEach(() => {
        inputChannel = new dummy_local_file_input_channel_1.DummyLocalFileInputChannel();
        outputChannel = new dummy_local_folder_output_channel_1.DummyLocalFolderOutputChannel();
        subject = new generator_1.Generator(inputChannel, outputChannel, new dummy_uuid_service_1.DummyUuidService());
        subjectWithPrivateMethods = subject;
    });
    describe("execute", () => {
        it("should call output.write() for each input outcome", () => {
            spyOn(outputChannel, "write");
            subject.execute();
            expect(outputChannel.write).toHaveBeenCalledTimes(subject.inputChannel.outcomes.length);
        });
        it("should call generateFHIRMessage() for each input outcome", () => {
            spyOn(subjectWithPrivateMethods, "generateFHIRMessage");
            subject.execute();
            const inputOutcomes = subject.inputChannel.outcomes;
            expect(subjectWithPrivateMethods.generateFHIRMessage).toHaveBeenCalledTimes(inputOutcomes.length);
        });
    });
    function buildProfile(theValue) {
        return {
            profile: {
                "@": {
                    value: theValue,
                },
            },
        };
    }
    describe("generateFHIRMessage", () => {
        it("should throw error if input is empty", () => {
            expect(() => {
                const ignoredFhirMessage = subjectWithPrivateMethods.generateFHIRMessage(null);
            }).toThrow(new Error("Input must not be empty."));
        });
        it("should return a simple fhir message", () => {
            const outcome = new outcome_1.Outcome(csv1);
            const actual = subjectWithPrivateMethods.generateFHIRMessage(outcome);
            const keys = Object.keys(actual);
            expect(keys).toContain("id");
            expect(keys).toContain("meta");
            expect(keys).toContain("type");
            expect(keys).toContain("entry");
        });
        // TODO check the entries are the correct type in the correct order
    });
    describe("buildProfile", () => {
        it("should return a simple meta element", () => {
            const actual = subjectWithPrivateMethods.buildProfile("theProfileValue");
            const expected = {
                profile: {
                    "@": {
                        value: "theProfileValue",
                    },
                },
            };
            expect(actual).toEqual(expected);
        });
    });
    describe("buildChildHealthEvent", () => {
        it("should set the code and display text", () => {
            const actual = subjectWithPrivateMethods.buildChildHealthEvent("123", "One two three");
            const expected = {
                system: {
                    "@": {
                        value: "https://fhir.nhs.uk/STU3/CodeSystem/DCH-ChildHealthEventType-1",
                    },
                },
                code: {
                    "@": {
                        value: "123",
                    },
                },
                display: {
                    "@": {
                        value: "One two three",
                    },
                },
            };
            expect(actual).toEqual(expected);
        });
    });
    describe("buildOrganisation", () => {
        it("should return a simple organisation object", () => {
            const actual = subjectWithPrivateMethods.buildOrganisation("123");
            const expected = { Organization: "123" };
            expect(actual).toEqual(expected);
        });
    });
});
//# sourceMappingURL=generator.spec.js.map