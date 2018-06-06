import * as fs from "fs";
import * as os from "os";

import { InputChannel } from "./input.channel";

export class LocalFileInputChannel extends InputChannel {

    constructor(
        private localCSVFileUrl: string,
    ) {
        super();
        this.outcomes = this.readCSVFile(localCSVFileUrl);
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
