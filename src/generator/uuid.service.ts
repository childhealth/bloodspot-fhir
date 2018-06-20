import uuid from "uuid/v4";

export class UuidService {
    public generateUuid(): string {
        return uuid();
    }
}
