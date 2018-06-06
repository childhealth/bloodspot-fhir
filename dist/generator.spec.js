"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./generator");
const local_folder_output_channel_1 = require("./local.folder.output.channel");
const dummy_local_file_input_channel_1 = require("./testing/dummy.local.file.input.channel");
describe("Generator", () => {
    let inputChannel;
    let outputChannel;
    let subject;
    let subjectWithPrivateMethods;
    beforeEach(() => {
        inputChannel = new dummy_local_file_input_channel_1.DummyLocalFileInputChannel();
        outputChannel = new local_folder_output_channel_1.LocalFolderOutputChannel("temp-output-folder");
        subject = new generator_1.Generator(inputChannel, outputChannel);
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
    describe("generateFHIRMessage", () => {
        it("should throw error if input is empty", () => {
            expect(() => {
                const ignoredFhirMessage = subjectWithPrivateMethods.generateFHIRMessage(null);
            }).toThrow(new Error("Input must not be empty."));
        });
    });
});
//# sourceMappingURL=generator.spec.js.map