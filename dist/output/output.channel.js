"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xml_1 = __importDefault(require("xml"));
var FormatType;
(function (FormatType) {
    FormatType["XML"] = "xml";
    FormatType["JSON"] = "json";
})(FormatType = exports.FormatType || (exports.FormatType = {}));
class OutputChannel {
    constructor() {
        this.formatType = FormatType.XML;
    }
    /**
     * Writes the given message to the output channel.
     * @param message the message to write, in an intermediary object form.
     */
    write(message) {
        throw new Error("Not implemented. Derived class must implement.");
    }
    getFormattedMessage(message) {
        if (this.formatType === FormatType.XML) {
            return xml_1.default(message);
        }
        else if (this.formatType === FormatType.JSON) {
            return JSON.stringify(message);
        }
        throw new Error("Unhandled format type \"" + this.formatType + "\".");
    }
}
exports.OutputChannel = OutputChannel;
//# sourceMappingURL=output.channel.js.map