import { UuidService } from "./uuid.service";

describe("UuidService", () => {
    let subject: UuidService;

    beforeEach(() => {
        subject = new UuidService();
    });

    describe("generateUuid", () => {
        it("should generate a uuid", () => {
            const uuid = subject.generateUuid();

            expect(uuid.length).toEqual(36);
        });
    });
});
