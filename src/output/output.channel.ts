export class OutputChannel {

    /**
     * Writes the given message to the output channel.
     * @param message the message to write.
     */
    public write(message: string) {
        throw new Error("Not implemented. Derived class must implement.");
    }

}
