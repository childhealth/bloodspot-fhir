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
        describe("xml", () => {
            it("should return an XML message string by default", () => {
                const actual = subjectWithPrivateMethods.getFormattedMessage(org);
                const expected = "<?xml version='1.0'?>\n<Bundle>\n    <Organization>123</Organization>\n</Bundle>";
                expect(actual).toEqual(expected);
            });
            it("should return an XML message with 2 entries", () => {
                const entries = {
                    OrgEntry: org,
                    AnotherOrgEntry: org,
                };
                const actual = subjectWithPrivateMethods.getFormattedMessage(entries);
                const expected = "<?xml version='1.0'?>\n<Bundle>\n"
                    + "    <OrgEntry>\n        <Organization>123</Organization>\n    </OrgEntry>\n"
                    + "    <AnotherOrgEntry>\n        <Organization>123</Organization>\n    </AnotherOrgEntry>\n"
                    + "</Bundle>";
                expect(actual).toEqual(expected);
            });
            it("should return an XML message with an xmlns attribute on root element", () => {
                const tree = {
                    "@": {
                        xmlns: "http://hl7.org/fhir",
                    },
                    "hello": 1,
                };
                const actual = subjectWithPrivateMethods.getFormattedMessage(tree);
                const expected = "<?xml version='1.0'?>\n<Bundle xmlns='http://hl7.org/fhir'>\n"
                    + "    <hello>1</hello>\n"
                    + "</Bundle>";
                expect(actual).toEqual(expected);
            });
        });
        describe("json", () => {
            it("should return a simple JSON organisation when formatType is set to JSON", () => {
                subject.formatType = output_channel_1.FormatType.JSON;
                const actual = subjectWithPrivateMethods.getFormattedMessage(org);
                expect(actual).toEqual("{\"Organization\":\"123\"}");
            });
        });
    });
});
//# sourceMappingURL=output.channel.spec.js.map