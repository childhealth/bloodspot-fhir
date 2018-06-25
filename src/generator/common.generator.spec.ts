import { CommonGenerator } from "./common.generator";

describe("CommonGenerator", () => {
    let subject: CommonGenerator;

    beforeEach(() => {
        subject = new CommonGenerator();
    });

    describe("buildProfile", () => {
        it("should return a simple meta element", () => {
            const actual = subject.buildProfile("theProfileValue");
            const expected = {
                profile: {
                    "@": {
                        value: "theProfileValue",
                    },
                },
            };
            expect(actual).toEqual(expected);
        });
    });

});
