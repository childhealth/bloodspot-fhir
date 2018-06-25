"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const silent_console_1 = require("../testing/silent-console");
const configuration_service_1 = require("./configuration.service");
describe("ConfigurationService", () => {
    let subject;
    beforeEach(() => {
        subject = new configuration_service_1.ConfigurationService("./src/testing/good-config.json", new silent_console_1.SilentConsole());
    });
    describe("constructor", () => {
        it("should error when it cannot read a config from a url", () => {
            expect(() => {
                const badConfigUrl = "a LoAd Of rUbbIsH!";
                const badService = new configuration_service_1.ConfigurationService(badConfigUrl, new silent_console_1.SilentConsole());
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
});
//# sourceMappingURL=configuration.service.spec.js.map