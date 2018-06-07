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
const output_channel_1 = require("./output.channel");
class LocalFolderOutputChannel extends output_channel_1.OutputChannel {
    constructor(localFolderUrl, fileSystem = fs) {
        super();
        this.localFolderUrl = localFolderUrl;
        this.fileSystem = fileSystem;
        this.writeMessageCount = 0;
        this.guaranteeFolder(localFolderUrl);
    }
    write(message) {
        const messageNumber = this.writeMessageCount + 1;
        const filename = path.join(this.localFolderUrl, "message-" + messageNumber + ".xml");
        try {
            this.fileSystem.writeFileSync(filename, message);
        }
        catch (e) {
            throw new Error("Cannot write output file \"" + filename + "\".");
        }
        this.writeMessageCount++;
    }
    guaranteeFolder(folderUrl) {
        if (!fs.existsSync(folderUrl)) {
            try {
                fs.mkdirSync(folderUrl);
            }
            catch (e) {
                throw new Error("Cannot create output folder \"" + folderUrl + "\".");
            }
        }
    }
}
exports.LocalFolderOutputChannel = LocalFolderOutputChannel;
//# sourceMappingURL=local.folder.output.channel.js.map