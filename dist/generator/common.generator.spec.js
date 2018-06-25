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
});
//# sourceMappingURL=common.generator.spec.js.map