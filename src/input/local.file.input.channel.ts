import * as fs from "fs";
import * as os from "os";

import { ILoggerService } from "../services/i.logger.service";
import { CSVOutcomeMapper } from "./csv.outcome.mapper";
import { InputChannel } from "./input.channel";

export class LocalFileInputChannel extends InputChannel {

    constructor(
        private localCSVFileUrl: string,
        private logger: ILoggerService,
        private mapper = new CSVOutcomeMapper(logger),
    ) {
        super();

        this.logger.info("Reading local input file \"" + localCSVFileUrl + "\"...");

        const csvAsStrings = this.readCSVFile(localCSVFileUrl);

        // Discard first line if its headings
        let hasHeaderLine = false;
        if (csvAsStrings[0].startsWith("National_Id")) {
            hasHeaderLine = true;
            csvAsStrings.shift();
        }

        this.outcomes = mapper.buildOutcomes(csvAsStrings, hasHeaderLine, localCSVFileUrl);
    }

    private readCSVFile(localFileUrl: string): string[] {
        let localFile = null;
        try {
            localFile = fs.readFileSync(localFileUrl).toString();
        } catch (e) {
            const message = "Input file \"" + localFileUrl + "\" not found.";
            throw new Error(message);
        }

        return localFile.trim().split(os.EOL);
    }

}
