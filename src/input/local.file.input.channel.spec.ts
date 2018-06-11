import { LocalFileInputChannel } from "./local.file.input.channel";

describe("LocalFileInputChannel", () => {
    let subject: LocalFileInputChannel;

    describe("constructor(fileUrl)", () => {
        it("should throw error if it fileUrl cannot be found or cannot be read.", () => {
            expect(() => {
                subject = new LocalFileInputChannel("RuBbIsH-NaMe-for-a-csv");
            }).toThrow(new Error("Input file \"RuBbIsH-NaMe-for-a-csv\" not found."));
        });

        it("should set outcomes if given a good fileUrl to read", () => {
            subject = new LocalFileInputChannel("./src/testing/NBBSTestfile.csv");
            expect(subject.outcomes.length).toEqual(2, "outcomes should be 2.");
        });
    });
});
