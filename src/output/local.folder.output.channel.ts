import * as fs from "fs";
import * as path from "path";
import { OutputChannel } from "./output.channel";

export class LocalFolderOutputChannel extends OutputChannel {

    private writeMessageCount = 0;

    constructor(
        private localFolderUrl: string,
        private fileSystem = fs,
    ) {
        super();
        this.guaranteeFolder(localFolderUrl);
    }

    public write(message: any) {
        const messageNumber = this.writeMessageCount + 1;
        const filename = path.join(this.localFolderUrl, "message-" + messageNumber + ".xml");

        const messageString = this.getFormattedMessage(message);

        try {
            this.fileSystem.writeFileSync(filename, messageString);
        } catch (e) {
            throw new Error("Cannot write output file \"" + filename + "\".");
        }

        this.writeMessageCount++;
    }

    private guaranteeFolder(folderUrl: string) {
        if (!fs.existsSync(folderUrl)) {
            try {
                fs.mkdirSync(folderUrl);
            } catch (e) {
                throw new Error("Cannot create output folder \"" + folderUrl + "\".");
            }
        }
    }
}
