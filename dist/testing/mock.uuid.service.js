"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_service_1 = require("../generator/uuid.service");
class MockUuidService extends uuid_service_1.UuidService {
    constructor(prefix) {
        super();
        this.prefix = prefix;
        this.isUsed = false;
    }
    generateUuid() {
        if (this.isUsed) {
            throw new Error("This mock object has already been used.");
        }
        this.isUsed = true;
        return this.prefix + "-1";
    }
}
exports.MockUuidService = MockUuidService;
//# sourceMappingURL=mock.uuid.service.js.map