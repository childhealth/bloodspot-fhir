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

    describe("buildCoding", () => {
        it("should set the code and display text", () => {
            const actual = subject.buildCoding("CoDiNgSyStEm", "123", "One two three");
            const expected = {
                system: {
                    "@": {
                        value: "CoDiNgSyStEm",
                    },
                },
                code: {
                    "@": {
                        value: "123",
                    },
                },
                display: {
                    "@": {
                        value: "One two three",
                    },
                },
            };
            expect(actual).toEqual(expected);
        });
    });

    describe("buildSystemValue", () => {
        it("should set the system and value", () => {
            const actual = subject.buildSystemValue("SystemCode", "ValueGoesHere");
            const expected = {
                system: {
                    "@": {
                        value: "SystemCode",
                    },
                },
                value: {
                    "@": {
                        value: "ValueGoesHere",
                    },
                },
            };

            expect(actual).toEqual(expected);
        });
    });
});
