"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const silent_console_1 = require("../testing/silent-console");
const configuration_service_1 = require("./configuration.service");
describe("ConfigurationService", () => {
    let subject;
    const theConsole = new silent_console_1.SilentConsole();
    beforeEach(() => {
        subject = new configuration_service_1.ConfigurationService("./src/testing/good-config.json", theConsole);
    });
    describe("constructor", () => {
        it("should error when it cannot read a config from a url", () => {
            expect(() => {
                const badConfigUrl = "a LoAd Of rUbbIsH!";
                const badService = new configuration_service_1.ConfigurationService(badConfigUrl, theConsole);
            }).toThrow(new Error("Cannot read config file 'a LoAd Of rUbbIsH!'."));
        });
    });
    describe("laboratory", () => {
        it("should return laboratory", () => {
            const actual = subject.laboratory;
            const keys = Object.keys(actual);
            expect(keys).toContain("odsCode");
            expect(keys).toContain("description");
            expect(keys).toContain("address");
        });
    });
    describe("logging", () => {
        it("should return logging configuration", () => {
            const actual = subject.logging;
            const keys = Object.keys(actual);
            expect(keys).toContain("errorLogFilename");
            expect(keys).toContain("auditLogFilename");
        });
    });
});
//# sourceMappingURL=configuration.service.spec.js.map