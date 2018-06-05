export class OutputChannel {

    /**
     * Writes the given message to the output channel.
     * @param message the message to write.
     */
    public write(message: string) {
            // tslint:disable-next-line:no-console
            console.log("write() message:", message);
    }

}
