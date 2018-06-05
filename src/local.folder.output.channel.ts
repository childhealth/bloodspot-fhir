import { OutputChannel } from "./output.channel";

export class LocalFolderOutputChannel extends OutputChannel {

    constructor(
        private localFolderUrl: string,
    ) {
        super();
    }

}
