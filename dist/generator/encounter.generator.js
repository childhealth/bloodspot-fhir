"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dateformat_1 = __importDefault(require("dateformat"));
const common_generator_1 = require("./common.generator");
class EncounterGenerator {
    constructor() {
        this.commonGenerator = new common_generator_1.CommonGenerator();
    }
    buildEncounter(encounterId, patientId, patientName, collectionDate, locationId, healthcareServiceId) {
        const code = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Encounter-1";
        const collectionDateString = dateformat_1.default(collectionDate, "yyyy-mm-dd");
        const element = {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + encounterId,
                },
            },
            resource: {
                Encounter: {
                    id: {
                        "@": {
                            value: encounterId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(code),
                    status: {
                        "@": {
                            value: "finished",
                        },
                    },
                    subject: {
                        reference: {
                            "@": {
                                value: "urn:uuid:" + patientId,
                            },
                        },
                        display: {
                            "@": {
                                value: patientName,
                            },
                        },
                    },
                    period: {
                        start: {
                            "@": {
                                value: collectionDateString,
                            },
                        },
                    },
                    location: {
                        location: {
                            reference: {
                                "@": {
                                    value: "urn:uuid:" + locationId,
                                },
                            },
                        },
                    },
                    serviceProvider: {
                        reference: {
                            "@": {
                                value: "urn:uuid:" + healthcareServiceId,
                            },
                        },
                    },
                },
            },
        };
        return element;
    }
}
exports.EncounterGenerator = EncounterGenerator;
//# sourceMappingURL=encounter.generator.js.map