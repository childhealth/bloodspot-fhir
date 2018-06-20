"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
class UuidService {
    generateUuid() {
        return v4_1.default();
    }
}
exports.UuidService = UuidService;
//# sourceMappingURL=uuid.service.js.map