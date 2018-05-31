import { Generator } from "./generator";

describe("Generator", () => {
    let subject: Generator;

    beforeEach(() => {
        subject = new Generator();
    });

    describe("generateFHIRMessage", () => {
        it("should throw error if input is empty", () => {
            expect(() => {
                const ignoredFhirMessage = subject.generateFHIRMessage('');
            }).toThrow(new Error("Input must not be empty."));
        });
    });
});
