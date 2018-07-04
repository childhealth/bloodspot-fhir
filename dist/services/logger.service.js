"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
class LoggerService {
    constructor(configuration) {
        const errorLogFilename = configuration.errorLogFilename;
        const auditLogFilename = configuration.auditLogFilename;
        const simpleFormat = winston_1.default.format.printf((info) => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        });
        const winstonConfiguration = {
            level: "debug",
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), simpleFormat),
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