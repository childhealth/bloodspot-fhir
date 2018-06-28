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
            coding: this.buildSystemCodeDisplay(system, code, display),
        };
    }
    buildSystemCodeDisplay(system, code, display) {
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
    buildSystemValue(systemValue, valueValue) {
        return {
            system: {
                "@": {
                    value: systemValue,
                },
            },
            value: {
                "@": {
                    value: valueValue,
                },
            },
        };
    }
    buildTimestamp(date) {
        const theDate = date.toISOString();
        return {
            "@": {
                value: theDate,
            },
        };
    }
}
exports.CommonGenerator = CommonGenerator;
//# sourceMappingURL=common.generator.js.map