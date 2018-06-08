import * as fs from "fs";
import * as os from "os";

import { Outcome } from "../model/outcome";
import { CSVOutcomeMapper } from "./csv.outcome.mapper";
import { InputChannel } from "./input.channel";

export class LocalFileInputChannel extends InputChannel {

    constructor(
        private localCSVFileUrl: string,
        private mapper = new CSVOutcomeMapper(),
    ) {
        super();
        const csvAsStrings = this.readCSVFile(localCSVFileUrl);
        this.outcomes = mapper.buildOutcomes(csvAsStrings);
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
