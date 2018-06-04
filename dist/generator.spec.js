"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./generator");
const local_file_input_channel_1 = require("./local.file.input.channel");
const output_channel_spy_1 = require("./output.channel.spy");
describe("Generator", () => {
    let subject;
    beforeEach(() => {
        const inputChannel = new local_file_input_channel_1.LocalFileInputChannel("./testing/input01.csv");
        const outputChannel = new output_channel_spy_1.OutputChannelSpy();
        subject = new generator_1.Generator(inputChannel, outputChannel);
    });
    describe("generateFHIRMessage", () => {
        it("should throw error if input is empty", () => {
            expect(() => {
                const ignoredFhirMessage = subject.generateFHIRMessage(null);
            }).toThrow(new Error("Input must not be empty."));
        });
    });
});
