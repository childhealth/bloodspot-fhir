import fs from "fs";
import { IConfigurationService } from "./i.configuration.service";

export class ConfigurationService implements IConfigurationService {
    public readonly laboratory: any;
    public readonly healthcareService: any;

    private config: any;

    constructor(
        private configUrl: string,
        private logger: any = console,
    ) {
        this.config = this.readConfig(configUrl);
        this.laboratory = this.config.laboratory;
        this.healthcareService = this.config.healthcareService;
    }

    private readConfig(url: string): string {
        let configFile = null;
        try {
            configFile = fs.readFileSync(url).toString();
        } catch (e) {
            const message = e.message.startsWith("ENOENT") ?
                                "Cannot read config file '" + this.configUrl + "'."
                                : e.message;
            this.logger.log("Error: readConfig: url '"
              + ((typeof url) === "object" ? JSON.stringify(url) : url) + "': " + message);
            throw new Error(message);
        }

        const configJson = JSON.parse(configFile);

        return configJson;
    }
}
