import { InputChannel } from "../input/input.channel";
import { OutputChannel } from "../output/output.channel";
import { DummyLocalFileInputChannel } from "../testing/dummy.local.file.input.channel";
import { DummyLocalFolderOutputChannel } from "../testing/dummy.local.folder.output.channel";
import { Generator } from "./generator";

describe("Generator", () => {
    let inputChannel: InputChannel;
    let outputChannel: OutputChannel;
    let subject: Generator;
    let subjectWithPrivateMethods: any;

    beforeEach(() => {
        inputChannel = new DummyLocalFileInputChannel();
        outputChannel = new DummyLocalFolderOutputChannel();
        subject = new Generator(inputChannel, outputChannel);
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
    });
});
