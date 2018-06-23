"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_service_1 = require("../generator/uuid.service");
class MockUuidService extends uuid_service_1.UuidService {
    generateUuid() {
        return "dummyUuid";
    }
}
exports.MockUuidService = MockUuidService;
//# sourceMappingURL=mock.uuid.service.js.map