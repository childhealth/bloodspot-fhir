import { FormatType, OutputChannel } from "./output.channel";

describe("OutputChannel", () => {
    let subject: OutputChannel;
    let subjectWithPrivateMethods: any;

    const org = {
        Organization: "123",
    };

    beforeEach(() => {
        subject = new OutputChannel();
        subjectWithPrivateMethods = subject as any;
    });

    it("constructor", () => {
        expect(subject.formatType).toEqual(FormatType.XML);
    });

    describe("getFormattedMessage", () => {
        it("should return an XML message string by default", () => {
            const actual = subjectWithPrivateMethods.getFormattedMessage(org);
            expect(actual).toEqual("<Organization>123</Organization>");
        });

        it("should return a simple JSON organisation when formatType is set to JSON", () => {
            subject.formatType = FormatType.JSON;
            const actual = subjectWithPrivateMethods.getFormattedMessage(org);
            expect(actual).toEqual("{\"Organization\":\"123\"}");
        });
    });
});
