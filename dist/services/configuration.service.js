"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class ConfigurationService {
    constructor(configUrl, logger = console) {
        this.configUrl = configUrl;
        this.logger = logger;
        this.config = this.readConfig(configUrl);
        this.laboratory = this.config.laboratory;
    }
    readConfig(url) {
        let configFile = null;
        try {
            configFile = fs_1.default.readFileSync(url).toString();
        }
        catch (e) {
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
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map