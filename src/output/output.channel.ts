import xml from "xml";

export enum FormatType {
    XML = "xml",
    JSON = "json",
}

export class OutputChannel {

    public formatType = FormatType.XML;

    /**
     * Writes the given message to the output channel.
     * @param message the message to write, in an intermediary object form.
     */
    public write(message: any) {
        throw new Error("Not implemented. Derived class must implement.");
    }

    protected getFormattedMessage(message: any): string {
        if (this.formatType === FormatType.XML) {
            return xml(message);
        } else if (this.formatType === FormatType.JSON) {
            return JSON.stringify(message);
        }

        throw new Error("Unhandled format type \"" + this.formatType + "\".");
    }
}
