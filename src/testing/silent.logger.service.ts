import { LoggerService } from "../services/logger.service";

export class SilentLoggerService extends LoggerService {
    public info(ignoredMessage: string) {
        // ignored
    }

    public error(ignoredMessage: string) {
        // ignored
    }

}
