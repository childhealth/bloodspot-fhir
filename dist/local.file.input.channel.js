"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_channel_1 = require("./input.channel");
class LocalFileInputChannel extends input_channel_1.InputChannel {
    constructor(localCSVFileUrl) {
        super();
        this.localCSVFileUrl = localCSVFileUrl;
        this.outcomes = this.readCSVFile(localCSVFileUrl);
    }
    readCSVFile(localFileUrl) {
        return [
            "123,456,789",
            "2123,2456,2789",
        ];
    }
}
exports.LocalFileInputChannel = LocalFileInputChannel;
