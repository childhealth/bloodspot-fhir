"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dummy_logger_service_1 = require("../testing/dummy.logger.service");
const local_file_input_channel_1 = require("./local.file.input.channel");
describe("LocalFileInputChannel", () => {
    let subject;
    const logger = new dummy_logger_service_1.DummyLoggerService();
    describe("constructor(fileUrl)", () => {
        it("should throw error if it fileUrl cannot be found or cannot be read.", () => {
            expect(() => {
                subject = new local_file_input_channel_1.LocalFileInputChannel("RuBbIsH-NaMe-for-a-csv", logger);
            }).toThrow(new Error("Input file \"RuBbIsH-NaMe-for-a-csv\" not found."));
        });
        it("should set outcomes if given a good fileUrl to read", () => {
            subject = new local_file_input_channel_1.LocalFileInputChannel("./src/testing/NBBSTestfile.csv", logger);
            expect(subject.outcomes.length).toEqual(69);
        });
    });
});
//# sourceMappingURL=local.file.input.channel.spec.js.map