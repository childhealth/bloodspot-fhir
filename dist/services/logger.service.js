"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
class LoggerService {
    constructor(configuration) {
        if (!configuration) {
            configuration = {
                errorLogFilename: "error.log",
                auditLogFilename: "audit.log",
            };
        }
        const errorLogFilename = configuration.errorLogFilename;
        const auditLogFilename = configuration.auditLogFilename;
        const simpleFormat = winston_1.format.printf((info) => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        });
        const winstonConfiguration = {
            level: "debug",
            format: winston_1.format.combine(winston_1.format.timestamp(), simpleFormat),
            transports: [
                new winston_1.default.transports.File({ filename: errorLogFilename, level: "error" }),
                new winston_1.default.transports.File({ filename: auditLogFilename }),
                new winston_1.default.transports.Console(),
            ],
        };
        this.logger = winston_1.default.createLogger(winstonConfiguration);
    }
    info(message) {
        this.logger.info(message);
    }
    error(message) {
        this.logger.error(message);
    }
}
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map