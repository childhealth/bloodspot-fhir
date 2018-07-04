import { SilentConsole } from "../testing/silent-console";
import { ConfigurationService } from "./configuration.service";

describe("ConfigurationService", () => {
    let subject: ConfigurationService;

    const theConsole = new SilentConsole();

    beforeEach(() => {
        subject = new ConfigurationService("./src/testing/good-config.json", theConsole);
    });

    describe("constructor", () => {
        it("should error when it cannot read a config from a url", () => {
            expect(() => {
                const badConfigUrl = "a LoAd Of rUbbIsH!";
                const badService = new ConfigurationService(badConfigUrl, theConsole);
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

    describe("logging", () => {
        it("should return logging configuration", () => {
            const actual = subject.logging;
            const keys = Object.keys(actual);
            expect(keys).toContain("errorLogFilename");
            expect(keys).toContain("auditLogFilename");
        });
    });
});
