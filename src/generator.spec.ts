import { Generator } from "./generator";
import { InputChannel } from "./input.channel";
import { LocalFileInputChannel } from "./local.file.input.channel";
import { OutputChannel } from "./output.channel";
import { OutputChannelSpy } from "./output.channel.spy";

describe("Generator", () => {
    let subject: Generator;

    beforeEach(() => {
        const inputChannel: InputChannel = new LocalFileInputChannel("./testing/input01.csv");
        const outputChannel: OutputChannel = new OutputChannelSpy();
        subject = new Generator(inputChannel, outputChannel);
    });

    describe("generateFHIRMessage", () => {
        it("should throw error if input is empty", () => {
            expect(() => {
                const ignoredFhirMessage = subject.generateFHIRMessage(null);
            }).toThrow(new Error("Input must not be empty."));
        });
    });
});
