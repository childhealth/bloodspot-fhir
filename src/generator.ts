import { InputChannel } from "./input.channel";
import { OutputChannel } from "./output.channel";

export class Generator {

    constructor(
        private inputChannel: InputChannel,
        private outputChannel: OutputChannel,
    ) {
    }

    public execute() {
        for (const eachOutcome of this.inputChannel.outcomes) {
            const outcomeMessage = this.generateFHIRMessage(eachOutcome);
        }

        // TODO this.outputChannel.write()
    }

    public generateFHIRMessage(outcome: any): string {
        if (outcome === null) {
            throw new Error("Input must not be empty.");
        }

        return "<awesome-fhir-message>" + outcome + "</awesome-fhir-message>";
    }
}
