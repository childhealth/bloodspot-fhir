import { ILoggerService } from "../services/i.logger.service";

export class SilentLoggerService implements ILoggerService {
    public info(ignoredMessage: string) {
        // ignored
    }

    public error(ignoredMessage: string) {
        // ignored
    }

}
