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
const output_channel_1 = require("./output.channel");
class LocalFolderOutputChannel extends output_channel_1.OutputChannel {
    constructor(localFolderUrl) {
        super();
        this.localFolderUrl = localFolderUrl;
        this.guaranteeFolder(localFolderUrl);
    }
    write(message) {
        // tslint:disable-next-line:no-console
        console.log("write: message=" + message);
        // What filename?
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