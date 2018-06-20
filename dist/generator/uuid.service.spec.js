"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_service_1 = require("./uuid.service");
describe("UuidService", () => {
    let subject;
    beforeEach(() => {
        subject = new uuid_service_1.UuidService();
    });
    describe("generateUuid", () => {
        it("should generate a uuid", () => {
            const uuid = subject.generateUuid();
            expect(uuid.length).toEqual(36);
        });
    });
});
//# sourceMappingURL=uuid.service.spec.js.map