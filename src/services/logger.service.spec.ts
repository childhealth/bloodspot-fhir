import * as tmp from "tmp";
import { LoggerService } from "./logger.service";

describe("LoggerService", () => {
    // let subject: LoggerService;

    // beforeEach(() => {
    //     subject = new LoggerService();
    // });

    it("should be configureable", () => {
        const errorLogFilename = tmp.tmpNameSync();
        const auditLogFilename = tmp.tmpNameSync();
        const subject = new LoggerService({
            errorLogFilename,
            auditLogFilename,
        });

        subject.error("Hello!! this is an error from a test...");
        subject.info("this is a test info.");

        // TODO: read log file
        // TODO: check it the log has been written to
    });
});
