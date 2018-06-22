"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_service_1 = require("../services/configuration.service");
const uuid_service_1 = require("./uuid.service");
class Generator {
    constructor(inputChannel, outputChannel, uuidService = new uuid_service_1.UuidService(), configurationService = new configuration_service_1.ConfigurationService()) {
        this.inputChannel = inputChannel;
        this.outputChannel = outputChannel;
        this.uuidService = uuidService;
        this.configurationService = configurationService;
    }
    execute() {
        for (const eachOutcome of this.inputChannel.outcomes) {
            const outcomeMessage = this.generateFHIRMessage(eachOutcome);
            this.outputChannel.write(outcomeMessage);
        }
    }
    generateFHIRMessage(outcome) {
        if (outcome === null) {
            throw new Error("Input must not be empty.");
        }
        const bundleIdUuid = this.uuidService.generateUuid();
        const organisationId = this.uuidService.generateUuid();
        const encounterId = this.uuidService.generateUuid();
        const messageHeaderEntry = this.buildMessageHeader(organisationId, encounterId);
        const metaBundle = this.buildProfile("https://fhir.nhs.uk/STU3/StructureDefinition/DCH-Bundle-1");
        const orgEntry = this.buildOrganisation(outcome.providerUnit);
        const bundleObject = {
            "@": {
                xmlns: "http://hl7.org/fhir",
            },
            "id": {
                "@": {
                    value: bundleIdUuid,
                },
            },
            "meta": metaBundle,
            "type": {
                "@": {
                    value: "message",
                },
            },
            "entry": [
                messageHeaderEntry,
                orgEntry,
            ],
        };
        return bundleObject;
    }
    // A DCH-BloodSpotTestOutcome-Bundle is a DCH-Bundle element with 16 entries:
    // [0]: DCH-MessageHeader-1:
    //      id - a publication reference number which will use a UUID format
    //      extension: new message event Extension-DCH-MessageEventType
    //      event: system, code, display - CH035 Blood Spot Test Outcome
    //      timestamp: event published date - now
    //      source: endpoint, IT system holding the event data - the lab's LIMS (config)
    //      responsible: organisation - event publisher - the lab (config)
    //      period.start: (CareConnect-DCH-Encounter-1) event date time - assume same
    //                   as timestamp - datetime stamp when this tool is run.
    //      focus: the encounter below
    // [1]: a CareConnect-DCH-Organization - the screening lab (responsible in message header)
    // [2]: a HealthcareService - assume hardcoded value for a screening lab
    // [3]: Patient
    // [4]: CareConnect-DCH-NewbornBloodSpotScreeningPKU-Procedure-1
    // [5]: CareConnect-DCH-NewbornBloodSpotScreeningSCD-Procedure-1
    // [6]: CareConnect-DCH-NewbornBloodSpotScreeningCF-Procedure-1
    // [7]: CareConnect-DCH-NewbornBloodSpotScreeningCHT-Procedure-1
    // [8]: CareConnect-DCH-NewbornBloodSpotScreeningMCADD-Procedure-1
    // [9]: CareConnect-DCH-NewbornBloodSpotScreeningHCU-Procedure-1
    // [10]: CareConnect-DCH-NewbornBloodSpotScreeningMSUD-Procedure-1
    // [11]: CareConnect-DCH-NewbornBloodSpotScreeningGA1-Procedure-1
    // [12]: CareConnect-DCH-NewbornBloodSpotScreeningIVA-Procedure-1
    // [13]: DCH-NewbornBloodSpotScreening-DiagnosticReport-1 - Child Screening Report
    // [14]: CareConnect-DCH-Encounter-1 - subject (patient), period, location, serviceProvider(lab)
    // [15]: CareConnect-DCH-Location-1 location at which the event occurred the lab's ODS code (config)
    buildMessageHeader(responsibleId, focusId) {
        const messageHeaderId = this.uuidService.generateUuid();
        const bloodspotEvent = this.buildChildHealthEvent("CH035", "Blood Spot Test Outcome");
        const sourceOdsCode = this.configurationService.laboratory.odsCode;
        const labDescription = this.configurationService.laboratory.description;
        return {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + messageHeaderId,
                },
            },
            resource: {
                MessageHeader: {
                    id: {
                        "@": {
                            value: messageHeaderId,
                        },
                    },
                    meta: this.buildProfile("https://fhir.nhs.uk/STU3/StructureDefinition/DCH-MessageHeader-1"),
                    extension: this.buildNewMessageEventExtension(),
                    event: bloodspotEvent,
                    timestamp: this.buildTimestamp(new Date()),
                    source: this.buildSource(sourceOdsCode),
                    responsible: this.buildResponsible(responsibleId, labDescription),
                    focus: this.buildFocus(focusId),
                },
            },
        };
    }
    buildProfile(profileValue) {
        return {
            profile: {
                "@": {
                    value: profileValue,
                },
            },
        };
    }
    buildNewMessageEventExtension() {
        return {
            "@": {
                url: "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-DCH-MessageEventType-1",
            },
            "valueCodeableConcept": {
                coding: {
                    system: {
                        "@": {
                            value: "https://fhir.nhs.uk/STU3/CodeSystem/DCH-MessageEventType-1",
                        },
                    },
                    code: {
                        "@": {
                            value: "new",
                        },
                    },
                    display: {
                        "@": {
                            value: "New event message",
                        },
                    },
                },
            },
        };
    }
    buildChildHealthEvent(code, display) {
        return {
            system: {
                "@": {
                    value: "https://fhir.nhs.uk/STU3/CodeSystem/DCH-ChildHealthEventType-1",
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
    buildTimestamp(date) {
        const theDate = date.toISOString();
        return {
            "@": {
                value: theDate,
            },
        };
    }
    buildSource(odsCode) {
        return {
            source: {
                endpoint: {
                    "@": {
                        value: "urn:nhs-uk:addressing:ods:" + odsCode,
                    },
                },
            },
        };
    }
    buildResponsible(id, display) {
        return {
            reference: {
                "@": {
                    value: "urn:uuid:" + id,
                },
            },
            display: {
                "@": {
                    value: display,
                },
            },
        };
    }
    buildFocus(id) {
        return {
            reference: {
                "@": {
                    value: "urn:uuid:" + id,
                },
            },
        };
    }
    buildOrganisation(odsCode) {
        const element = {
            Organization: odsCode,
        };
        return element;
    }
}
exports.Generator = Generator;
//# sourceMappingURL=generator.js.map