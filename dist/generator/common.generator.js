"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommonGenerator {
    buildProfile(profileValue) {
        return {
            profile: {
                "@": {
                    value: profileValue,
                },
            },
        };
    }
    buildCoding(system, code, display) {
        return {
            system: {
                "@": {
                    value: system,
                },
            },
            code: {
                "@": {
                    value: code,
                },
            },
            display: {
                "@": {
                    value: display,
                },
            },
        };
    }
}
exports.CommonGenerator = CommonGenerator;
//# sourceMappingURL=common.generator.js.map