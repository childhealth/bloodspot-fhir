"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_channel_1 = require("./output.channel");
describe("OutputChannel", () => {
    let subject;
    let subjectWithPrivateMethods;
    const org = {
        Organization: "123",
    };
    beforeEach(() => {
        subject = new output_channel_1.OutputChannel();
        subjectWithPrivateMethods = subject;
    });
    it("constructor", () => {
        expect(subject.formatType).toEqual(output_channel_1.FormatType.XML);
    });
    describe("getFormattedMessage", () => {
        it("should return an XML message string by default", () => {
            const actual = subjectWithPrivateMethods.getFormattedMessage(org);
            expect(actual).toEqual("<Organization>123</Organization>");
        });
        it("should return a simple JSON organisation when formatType is set to JSON", () => {
            subject.formatType = output_channel_1.FormatType.JSON;
            const actual = subjectWithPrivateMethods.getFormattedMessage(org);
            expect(actual).toEqual("{\"Organization\":\"123\"}");
        });
    });
});
//# sourceMappingURL=output.channel.spec.js.map