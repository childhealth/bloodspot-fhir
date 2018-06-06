"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_channel_1 = require("./output.channel");
class LocalFolderOutputChannel extends output_channel_1.OutputChannel {
    constructor(localFolderUrl) {
        super();
        this.localFolderUrl = localFolderUrl;
    }
}
exports.LocalFolderOutputChannel = LocalFolderOutputChannel;
//# sourceMappingURL=local.folder.output.channel.js.map