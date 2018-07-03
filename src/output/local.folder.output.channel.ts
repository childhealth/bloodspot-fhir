import * as fs from "fs";
import * as path from "path";
import { LoggerService } from "../services/logger.service";
import { OutputChannel } from "./output.channel";

export class LocalFolderOutputChannel extends OutputChannel {

    private writeMessageCount = 0;

    constructor(
        private localFolderUrl: string,
        private logger: any = new LoggerService(),
        private fileSystem = fs,
    ) {
        super();
        this.logger.info("Writing to local output folder \"" + localFolderUrl + "\"...");
        this.guaranteeFolder(localFolderUrl);
    }

    public write(message: any) {
        const messageNumber = this.writeMessageCount + 1;
        const filename = path.join(this.localFolderUrl, "message-" + messageNumber + ".xml");

        const messageString = this.getFormattedMessage(message);

        try {
            this.fileSystem.writeFileSync(filename, messageString);
        } catch (e) {
            const errorMessage = "Cannot write output file \"" + filename + "\".";
            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }

        this.writeMessageCount++;
    }

    private guaranteeFolder(folderUrl: string) {
        if (!fs.existsSync(folderUrl)) {
            try {
                fs.mkdirSync(folderUrl);
            } catch (e) {
                const message = "Cannot create output folder \"" + folderUrl + "\".";
                this.logger.error(message);
                throw new Error(message);
            }
        }
    }
}
