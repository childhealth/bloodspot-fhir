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
const csv_outcome_mapper_1 = require("./csv.outcome.mapper");
const input_channel_1 = require("./input.channel");
class LocalFileInputChannel extends input_channel_1.InputChannel {
    constructor(localCSVFileUrl, mapper = new csv_outcome_mapper_1.CSVOutcomeMapper()) {
        super();
        this.localCSVFileUrl = localCSVFileUrl;
        this.mapper = mapper;
        const csvAsStrings = this.readCSVFile(localCSVFileUrl);
        // Discard first line if its headings
        if (csvAsStrings[0].startsWith("National_Id")) {
            csvAsStrings.shift();
        }
        this.outcomes = mapper.buildOutcomes(csvAsStrings);
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