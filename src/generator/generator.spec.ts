import { InputChannel } from "../input/input.channel";
import { Outcome } from "../model/outcome";
import { OutputChannel } from "../output/output.channel";
import { DummyLocalFileInputChannel } from "../testing/dummy.local.file.input.channel";
import { DummyLocalFolderOutputChannel } from "../testing/dummy.local.folder.output.channel";
import { DummyUuidService } from "../testing/dummy.uuid.service";
import { Generator } from "./generator";

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
        subject = new Generator(inputChannel, outputChannel, new DummyUuidService());
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
        it("should throw error if input is empty", () => {
            expect(() => {
                const ignoredFhirMessage = subjectWithPrivateMethods.generateFHIRMessage(null);
            }).toThrow(new Error("Input must not be empty."));
        });

        it("should return a simple fhir message", () => {
            const outcome = new Outcome(csv1);
            const actual = subjectWithPrivateMethods.generateFHIRMessage(outcome);

            const org = {
                Organization: "08A",
            };
            const expected = {
                "@": {
                    xmlns: "http://hl7.org/fhir",
                },
                "id": {
                    "@": {
                        value: "dummyUuid",
                    },
                },
                "meta": {
                    profile: {
                        "@": {
                            value: "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-Bundle-1",
                        },
                    },
                },
                "type": {
                    "@": {
                        value: "message",
                    },
                },
                // tslint:disable-next-line:object-literal-sort-keys
                "entry": [
                    org,
                ],
            };
            expect(actual).toEqual(expected);
        });
    });

    describe("buildOrganisation", () => {
        it("should return a simple organisation object", () => {
            const actual = subjectWithPrivateMethods.buildOrganisation("123");
            const expected = {Organization: "123"};
            expect(actual).toEqual(expected);
        });
    });
});
