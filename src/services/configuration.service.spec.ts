import { SilentConsole } from "../testing/silent-console";
import { ConfigurationService } from "./configuration.service";

describe("ConfigurationService", () => {
    let subject: ConfigurationService;

    beforeEach(() => {
        subject = new ConfigurationService("./src/testing/good-config.json", new SilentConsole());
    });

    describe("constructor", () => {
        it("should error when it cannot read a config from a url", () => {
            expect(() => {
                const badConfigUrl = "a LoAd Of rUbbIsH!";
                const badService = new ConfigurationService(badConfigUrl, new SilentConsole());
            }).toThrow(
                new Error("Cannot read config file 'a LoAd Of rUbbIsH!'."));
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
