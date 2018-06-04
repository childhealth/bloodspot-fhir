"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Generator {
    constructor(inputChannel, outputChannel) {
        this.inputChannel = inputChannel;
        this.outputChannel = outputChannel;
    }
    execute() {
        for (const eachOutcome of this.inputChannel.outcomes) {
            const outcomeMessage = this.generateFHIRMessage(eachOutcome);
        }
        // TODO this.outputChannel.write()
    }
    generateFHIRMessage(outcome) {
        if (outcome === null) {
            throw new Error("Input must not be empty.");
        }
        return "<awesome-fhir-message>" + outcome + "</awesome-fhir-message>";
    }
}
exports.Generator = Generator;
