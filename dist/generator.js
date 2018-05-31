"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Generator {
    generateFHIRMessage(input) {
        if (input === '') {
            throw new Error("Input must not be empty.");
        }
    }
}
exports.Generator = Generator;
