import winston from "winston";

export class LoggerService {

    private logger: winston.Logger;

    constructor(configuration: any) {
        const errorLogFilename = configuration.errorLogFilename;
        const auditLogFilename = configuration.auditLogFilename;

        const simpleFormat = winston.format.printf((info) => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
          });

        const winstonConfiguration = {
            level: "debug",
            format: winston.format.combine(
                winston.format.timestamp(),
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
