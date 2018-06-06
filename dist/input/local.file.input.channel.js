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
const os = __importStar(require("os"));
const input_channel_1 = require("./input.channel");
class LocalFileInputChannel extends input_channel_1.InputChannel {
    constructor(localCSVFileUrl) {
        super();
        this.localCSVFileUrl = localCSVFileUrl;
        this.outcomes = this.readCSVFile(localCSVFileUrl);
    }
    readCSVFile(localFileUrl) {
        let localFile = null;
        try {
            localFile = fs.readFileSync(localFileUrl).toString();
        }
        catch (e) {
            const message = "Input file \"" + localFileUrl + "\" not found.";
            throw new Error(message);
        }
        return localFile.trim().split(os.EOL);
    }
}
exports.LocalFileInputChannel = LocalFileInputChannel;
//# sourceMappingURL=local.file.input.channel.js.map