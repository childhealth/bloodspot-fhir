"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OutputChannel {
    /**
     * Writes the given message to the output channel.
     * @param message the message to write.
     */
    write(message) {
        // tslint:disable-next-line:no-console
        console.log("write() message:", message);
    }
}
exports.OutputChannel = OutputChannel;
//# sourceMappingURL=output.channel.js.map