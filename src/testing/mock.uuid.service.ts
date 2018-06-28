import { UuidService } from "../generator/uuid.service";

export class MockUuidService extends UuidService {

    private isUsed = false;

    constructor(private prefix: string) {
        super();
    }

    public generateUuid(): string {

        if (this.isUsed) {
            throw new Error("This mock object has already been used.");
        }

        this.isUsed = true;

        return this.prefix + "-1";
    }
}
