import * as fs from "fs";
import { OutputChannel } from "./output.channel";

export class LocalFolderOutputChannel extends OutputChannel {

    constructor(
        private localFolderUrl: string,
    ) {
        super();
        this.guaranteeFolder(localFolderUrl);
    }

    public write(message: string) {
        // tslint:disable-next-line:no-console
        console.log("write: message=" + message);

        // What filename?
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
