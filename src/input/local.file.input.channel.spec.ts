import { SilentConsole } from "../testing/silent-console";
import { SilentLoggerService } from "../testing/silent.logger.service";
import { CSVOutcomeMapper } from "./csv.outcome.mapper";
import { LocalFileInputChannel } from "./local.file.input.channel";

describe("LocalFileInputChannel", () => {
    let subject: LocalFileInputChannel;
    const silentConsole = new SilentConsole();
    const silentLogger = new SilentLoggerService();
    const silentMapper = new CSVOutcomeMapper(silentLogger);

    describe("constructor(fileUrl)", () => {
        it("should throw error if it fileUrl cannot be found or cannot be read.", () => {
            expect(() => {
                subject = new LocalFileInputChannel("RuBbIsH-NaMe-for-a-csv", silentMapper, silentConsole);
            }).toThrow(new Error("Input file \"RuBbIsH-NaMe-for-a-csv\" not found."));
        });

        it("should set outcomes if given a good fileUrl to read", () => {
            subject = new LocalFileInputChannel("./src/testing/NBBSTestfile.csv", silentMapper, silentConsole);
            expect(subject.outcomes.length).toEqual(89);
        });
    });
});
