"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./generator");
describe("Generator", () => {
    let subject;
    beforeEach(() => {
        subject = new generator_1.Generator();
    });
    describe("generateFHIRMessage", () => {
        it("should throw error if input is empty", () => {
            expect(() => {
                const ignoredFhirMessage = subject.generateFHIRMessage("");
            }).toThrow(new Error("Input must not be empty."));
        });
    });
});
