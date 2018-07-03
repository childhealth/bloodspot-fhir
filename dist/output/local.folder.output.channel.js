"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const logger_service_1 = require("../services/logger.service");
const output_channel_1 = require("./output.channel");
class LocalFolderOutputChannel extends output_channel_1.OutputChannel {
    constructor(localFolderUrl, logger = new logger_service_1.LoggerService(), fileSystem = fs) {
        super();
        this.localFolderUrl = localFolderUrl;
        this.logger = logger;
        this.fileSystem = fileSystem;
        this.writeMessageCount = 0;
        this.logger.info("Writing to local output folder \"" + localFolderUrl + "\"...");
        this.guaranteeFolder(localFolderUrl);
    }
    write(message) {
        const messageNumber = this.writeMessageCount + 1;
        const filename = path.join(this.localFolderUrl, "message-" + messageNumber + ".xml");
        const messageString = this.getFormattedMessage(message);
        try {
            this.fileSystem.writeFileSync(filename, messageString);
        }
        catch (e) {
            const errorMessage = "Cannot write output file \"" + filename + "\".";
            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }
        this.writeMessageCount++;
    }
    guaranteeFolder(folderUrl) {
        if (!fs.existsSync(folderUrl)) {
            try {
                fs.mkdirSync(folderUrl);
            }
            catch (e) {
                const message = "Cannot create output folder \"" + folderUrl + "\".";
                this.logger.error(message);
                throw new Error(message);
            }
        }
    }
}
exports.LocalFolderOutputChannel = LocalFolderOutputChannel;
//# sourceMappingURL=local.folder.output.channel.js.map