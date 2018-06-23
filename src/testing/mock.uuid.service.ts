import { UuidService } from "../generator/uuid.service";

export class MockUuidService extends UuidService {
    public generateUuid(): string {
        return "dummyUuid";
    }
}
