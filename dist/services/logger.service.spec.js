"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tmp = __importStar(require("tmp"));
const logger_service_1 = require("./logger.service");
describe("LoggerService", () => {
    // let subject: LoggerService;
    // beforeEach(() => {
    //     subject = new LoggerService();
    // });
    it("should be configureable", () => {
        const errorLogFilename = tmp.tmpNameSync();
        const auditLogFilename = tmp.tmpNameSync();
        const subject = new logger_service_1.LoggerService({
            errorLogFilename,
            auditLogFilename,
        });
        subject.error("Hello!! this is an error from a test...");
        subject.info("this is a test info.");
        // TODO: read log file
        // TODO: check it the log has been written to
    });
});
//# sourceMappingURL=logger.service.spec.js.map