import { InputChannel } from "./input.channel";

export class LocalFileInputChannel extends InputChannel {

    constructor(
        private localCSVFileUrl: string,
    ) {
        super();
        this.outcomes = this.readCSVFile(localCSVFileUrl);
    }

    private readCSVFile(localFileUrl: string): string[] {
        return [
            "123,456,789",
            "2123,2456,2789",
        ];
    }

}
