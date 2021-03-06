"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
describe("CommonGenerator", () => {
    let subject;
    beforeEach(() => {
        subject = new common_generator_1.CommonGenerator();
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
                coding: {
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
                },
            };
            expect(actual).toEqual(expected);
        });
    });
    describe("buildSystemCodeDisplay", () => {
        it("should set the system, code, and display text", () => {
            const actual = subject.buildSystemCodeDisplay("**CoDiNgSyStEm", "123", "One two three");
            const expected = {
                system: {
                    "@": {
                        value: "**CoDiNgSyStEm",
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
    describe("buildTimestamp", () => {
        it("should ", () => {
            const christmasDay = new Date(2018, 11, 25);
            const actual = subject.buildTimestamp(christmasDay);
            const expected = {
                "@": {
                    value: "2018-12-25T00:00:00.000Z",
                },
            };
            expect(actual).toEqual(expected);
        });
    });
});
//# sourceMappingURL=common.generator.spec.js.map