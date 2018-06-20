import { UuidService } from "../generator/uuid.service";

export class DummyUuidService extends UuidService {
    public generateUuid(): string {
        return "dummyUuid";
    }
}
