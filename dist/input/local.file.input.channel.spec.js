"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const local_file_input_channel_1 = require("./local.file.input.channel");
describe("LocalFileInputChannel", () => {
    let subject;
    describe("constructor(fileUrl)", () => {
        it("should throw error if it fileUrl cannot be found or cannot be read.", () => {
            expect(() => {
                subject = new local_file_input_channel_1.LocalFileInputChannel("RuBbIsH-NaMe-for-a-csv");
            }).toThrow(new Error("Input file \"RuBbIsH-NaMe-for-a-csv\" not found."));
        });
        it("should set outcomes if given a good fileUrl to read", () => {
            subject = new local_file_input_channel_1.LocalFileInputChannel("./src/testing/NBBSTestfile.csv");
            expect(subject.outcomes.length).toEqual(2, "outcomes should be 2.");
        });
    });
});
//# sourceMappingURL=local.file.input.channel.spec.js.map