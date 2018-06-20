"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_service_1 = require("../generator/uuid.service");
class DummyUuidService extends uuid_service_1.UuidService {
    generateUuid() {
        return "dummyUuid";
    }
}
exports.DummyUuidService = DummyUuidService;
//# sourceMappingURL=dummy.uuid.service.js.map