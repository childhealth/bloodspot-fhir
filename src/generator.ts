import { InputChannel } from "./input.channel";
import { OutputChannel } from "./output.channel";

export class Generator {

    constructor(
        public inputChannel: InputChannel,
        public outputChannel: OutputChannel,
    ) {
    }

    public execute() {
        for (const eachOutcome of this.inputChannel.outcomes) {
            const outcomeMessage = this.generateFHIRMessage(eachOutcome);
            this.outputChannel.write(outcomeMessage);
        }
    }

    private generateFHIRMessage(outcome: any): string {
        if (outcome === null) {
            throw new Error("Input must not be empty.");
        }

        return "<awesome-fhir-message>" + outcome + "</awesome-fhir-message>";
    }
}
