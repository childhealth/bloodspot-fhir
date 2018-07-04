import { ILoggerService } from "../services/i.logger.service";

export class DummyLoggerService implements ILoggerService {
    public info(ignoredMessage: string) {
        // ignored
    }

    public error(ignoredMessage: string) {
        // ignored
    }

}
