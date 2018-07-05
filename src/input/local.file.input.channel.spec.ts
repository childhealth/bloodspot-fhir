import { ILoggerService } from "../services/i.logger.service";
import { DummyLoggerService } from "../testing/dummy.logger.service";
import { LocalFileInputChannel } from "./local.file.input.channel";

describe("LocalFileInputChannel", () => {
    let subject: LocalFileInputChannel;
    const logger: ILoggerService = new DummyLoggerService();

    describe("constructor(fileUrl)", () => {
        it("should throw error if it fileUrl cannot be found or cannot be read.", () => {
            expect(() => {
                subject = new LocalFileInputChannel("RuBbIsH-NaMe-for-a-csv", logger);
            }).toThrow(new Error("Input file \"RuBbIsH-NaMe-for-a-csv\" not found."));
        });

        it("should set outcomes if given a good fileUrl to read", () => {
            subject = new LocalFileInputChannel("./src/testing/NBBSTestfile.csv", logger);
            expect(subject.outcomes.length).toEqual(85);
        });
    });
});
