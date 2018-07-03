"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const silent_console_1 = require("../testing/silent-console");
const silent_logger_service_1 = require("../testing/silent.logger.service");
const csv_outcome_mapper_1 = require("./csv.outcome.mapper");
const local_file_input_channel_1 = require("./local.file.input.channel");
describe("LocalFileInputChannel", () => {
    let subject;
    const silentConsole = new silent_console_1.SilentConsole();
    const silentLogger = new silent_logger_service_1.SilentLoggerService();
    const silentMapper = new csv_outcome_mapper_1.CSVOutcomeMapper(silentLogger);
    describe("constructor(fileUrl)", () => {
        it("should throw error if it fileUrl cannot be found or cannot be read.", () => {
            expect(() => {
                subject = new local_file_input_channel_1.LocalFileInputChannel("RuBbIsH-NaMe-for-a-csv", silentMapper, silentConsole);
            }).toThrow(new Error("Input file \"RuBbIsH-NaMe-for-a-csv\" not found."));
        });
        it("should set outcomes if given a good fileUrl to read", () => {
            subject = new local_file_input_channel_1.LocalFileInputChannel("./src/testing/NBBSTestfile.csv", silentMapper, silentConsole);
            expect(subject.outcomes.length).toEqual(89);
        });
    });
});
//# sourceMappingURL=local.file.input.channel.spec.js.map