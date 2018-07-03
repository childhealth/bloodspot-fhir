import winston, { format, Logger } from "winston";

export class LoggerService {

    private logger: Logger;

    constructor(configuration?: any) {
        if (!configuration) {
            configuration = {
                errorLogFilename: "error.log",
                auditLogFilename: "audit.log",
            };
        }

        const errorLogFilename = configuration.errorLogFilename;
        const auditLogFilename = configuration.auditLogFilename;

        const simpleFormat = format.printf((info) => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
          });

        const winstonConfiguration = {
            level: "debug",
            format: format.combine(
                format.timestamp(),
                simpleFormat,
            ),
            transports: [
              new winston.transports.File({ filename: errorLogFilename, level: "error" }),
              new winston.transports.File({ filename: auditLogFilename }),
              new winston.transports.Console(),
            ],
          };
        this.logger = winston.createLogger(winstonConfiguration);
    }

    public info(message: string) {
        this.logger.info(message);
    }

    public error(message: string) {
        this.logger.error(message);
    }
}
