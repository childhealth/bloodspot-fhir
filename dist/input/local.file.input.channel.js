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
    constructor(localCSVFileUrl, logger) {
        super();
        this.localCSVFileUrl = localCSVFileUrl;
        this.logger = logger;
        this.logger.info("Reading local input file \"" + localCSVFileUrl + "\"...");
        const csvAsStrings = this.readCSVFile(localCSVFileUrl);
        // Discard first line if its headings
        let hasHeaderLine = false;
        if (csvAsStrings[0].startsWith("National_Id")) {
            hasHeaderLine = true;
            csvAsStrings.shift();
        }
        this.mapper = new csv_outcome_mapper_1.CSVOutcomeMapper(logger);
        this.outcomes = this.mapper.buildOutcomes(csvAsStrings, hasHeaderLine, localCSVFileUrl);
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