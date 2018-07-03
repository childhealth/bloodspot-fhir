"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("../services/logger.service");
class SilentLoggerService extends logger_service_1.LoggerService {
    info(ignoredMessage) {
        // ignored
    }
    error(ignoredMessage) {
        // ignored
    }
}
exports.SilentLoggerService = SilentLoggerService;
//# sourceMappingURL=silent.logger.service.js.map