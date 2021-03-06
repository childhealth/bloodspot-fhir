"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_generator_1 = require("./common.generator");
const diagnostic_report_generator_1 = require("./diagnostic.report.generator");
const encounter_generator_1 = require("./encounter.generator");
const healthcare_service_generator_1 = require("./healthcare.service.generator");
const location_generator_1 = require("./location.generator");
const patient_generator_1 = require("./patient.generator");
const procedure_generator_1 = require("./procedure.generator");
const screening_procedure_1 = require("./screening.procedure");
const uuid_service_1 = require("./uuid.service");
class Generator {
    constructor(inputChannel, outputChannel, configurationService, uuidService = new uuid_service_1.UuidService()) {
        this.inputChannel = inputChannel;
        this.outputChannel = outputChannel;
        this.configurationService = configurationService;
        this.uuidService = uuidService;
        this.commonGenerator = new common_generator_1.CommonGenerator();
        this.patientGenerator = new patient_generator_1.PatientGenerator();
        this.procedureGenerator = new procedure_generator_1.ProcedureGenerator();
        this.reportGenerator = new diagnostic_report_generator_1.DiagnosticReportGenerator();
        this.encounterGenerator = new encounter_generator_1.EncounterGenerator();
        this.healthcareServiceGenerator = new healthcare_service_generator_1.HealthcareServiceGenerator(configurationService);
        this.locationGenerator = new location_generator_1.LocationGenerator(configurationService);
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
        const healthcareServiceId = this.uuidService.generateUuid();
        const encounterId = this.uuidService.generateUuid();
        const locationId = this.uuidService.generateUuid();
        const patientId = this.uuidService.generateUuid();
        const reportId = this.uuidService.generateUuid();
        const messageHeaderEntry = this.buildMessageHeader(organisationId, encounterId);
        const bundleCode = "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-Bundle-1";
        const metaBundle = this.commonGenerator.buildProfile(bundleCode);
        const organisationEntry = this.buildOrganisation(organisationId);
        const healthcareEntry = this.healthcareServiceGenerator.buildHealthcareService(healthcareServiceId, organisationId, locationId);
        const patientEntry = this.patientGenerator.buildPatient(patientId, outcome);
        const pkuProcedureEntry = this.prepareProcedure(screening_procedure_1.ScreeningProcedure.PKU, patientId, encounterId, reportId, outcome.pkuStatusCode, outcome.pkuSupplementaryCode, outcome.pkuStatusDescription);
        const scdProcedureEntry = this.prepareProcedure(screening_procedure_1.ScreeningProcedure.SCD, patientId, encounterId, reportId, outcome.scdStatusCode, outcome.scdSupplementaryCode, outcome.scdStatusDescription);
        const cfProcedureEntry = this.prepareProcedure(screening_procedure_1.ScreeningProcedure.CF, patientId, encounterId, reportId, outcome.cfStatusCode, outcome.cfSupplementaryCode, outcome.cfStatusDescription);
        const chtProcedureEntry = this.prepareProcedure(screening_procedure_1.ScreeningProcedure.CHT, patientId, encounterId, reportId, outcome.chtStatusCode, outcome.chtSupplementaryCode, outcome.chtStatusDescription);
        const mcaddProcedureEntry = this.prepareProcedure(screening_procedure_1.ScreeningProcedure.MCADD, patientId, encounterId, reportId, outcome.mcaddStatusCode, outcome.mcaddSupplementaryCode, outcome.mcaddStatusDescription);
        const hcuProcedureEntry = this.prepareProcedure(screening_procedure_1.ScreeningProcedure.HCU, patientId, encounterId, reportId, outcome.hcuStatusCode, outcome.hcuSupplementaryCode, outcome.hcuStatusDescription);
        const msudProcedureEntry = this.prepareProcedure(screening_procedure_1.ScreeningProcedure.MSUD, patientId, encounterId, reportId, outcome.msudStatusCode, outcome.msudSupplementaryCode, outcome.msudStatusDescription);
        const ga1ProcedureEntry = this.prepareProcedure(screening_procedure_1.ScreeningProcedure.GA1, patientId, encounterId, reportId, outcome.ga1StatusCode, outcome.ga1SupplementaryCode, outcome.ga1StatusDescription);
        const ivaProcedureEntry = this.prepareProcedure(screening_procedure_1.ScreeningProcedure.IVA, patientId, encounterId, reportId, outcome.ivaStatusCode, outcome.ivaSupplementaryCode, outcome.ivaStatusDescription);
        const reportEntry = this.reportGenerator.buildDiagnosticReport(reportId, patientId, encounterId);
        const encounterEntry = this.encounterGenerator.buildEncounter(encounterId, patientId, outcome.displayName, outcome.collectionDate, locationId, healthcareServiceId);
        const locationEntry = this.locationGenerator.buildLocation(locationId);
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
                organisationEntry,
                healthcareEntry,
                patientEntry,
                pkuProcedureEntry,
                scdProcedureEntry,
                cfProcedureEntry,
                chtProcedureEntry,
                mcaddProcedureEntry,
                hcuProcedureEntry,
                msudProcedureEntry,
                ga1ProcedureEntry,
                ivaProcedureEntry,
                reportEntry,
                encounterEntry,
                locationEntry,
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
    prepareProcedure(screeningProcedure, patientId, encounterId, reportId, mainStatusCode, supplementaryCode, statusDescription) {
        const id = this.uuidService.generateUuid();
        const statusCode = (supplementaryCode !== "") ? supplementaryCode : mainStatusCode;
        const element = this.procedureGenerator.buildProcedure(id, screeningProcedure, patientId, encounterId, reportId, statusCode, statusDescription);
        return element;
    }
    buildMessageHeader(responsibleId, focusId) {
        const messageHeaderId = this.uuidService.generateUuid();
        const childHealthEventTypeCode = "https://fhir.nhs.uk/STU3/CodeSystem/DCH-ChildHealthEventType-1";
        const bloodspotEvent = this.commonGenerator.buildSystemCodeDisplay(childHealthEventTypeCode, "CH035", "Blood Spot Test Outcome");
        const sourceOdsCode = this.configurationService.laboratory.odsCode;
        const labDescription = this.configurationService.laboratory.description;
        const messageHeaderCode = "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-MessageHeader-1";
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
                    meta: this.commonGenerator.buildProfile(messageHeaderCode),
                    extension: this.buildNewMessageEventExtension(),
                    event: bloodspotEvent,
                    timestamp: this.commonGenerator.buildTimestamp(new Date()),
                    source: this.buildSource(sourceOdsCode),
                    responsible: this.buildResponsible(responsibleId, labDescription),
                    focus: this.buildFocus(focusId),
                },
            },
        };
    }
    buildNewMessageEventExtension() {
        const messageEventTypeCode = "https://fhir.nhs.uk/STU3/CodeSystem/DCH-MessageEventType-1";
        return {
            "@": {
                url: "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-DCH-MessageEventType-1",
            },
            "valueCodeableConcept": this.commonGenerator.buildCoding(messageEventTypeCode, "new", "New event message"),
        };
    }
    buildSource(odsCode) {
        return {
            endpoint: {
                "@": {
                    value: "urn:nhs-uk:addressing:ods:" + odsCode,
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
    buildName(name) {
        return {
            "@": {
                value: name,
            },
        };
    }
    buildAddress(line1, city, district, postCode) {
        return {
            line: {
                "@": {
                    value: line1,
                },
            },
            city: {
                "@": {
                    value: city,
                },
            },
            district: {
                "@": {
                    value: district,
                },
            },
            postalCode: {
                "@": {
                    value: postCode,
                },
            },
        };
    }
    buildOrganisation(orgId) {
        const organisationCode = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Organization-1";
        const odsOrganizationSystem = "https://fhir.nhs.uk/Id/ods-organization-code";
        const lab = this.configurationService.laboratory;
        const orgSystemValue = this.commonGenerator.buildSystemValue(odsOrganizationSystem, lab.odsCode);
        const labName = this.buildName(lab.description);
        const labAddress = this.buildAddress(lab.address.line1, lab.address.city, lab.address.district, lab.address.postCode);
        const element = {
            fullUrl: "urn:uuid:" + orgId,
            resource: {
                Organization: {
                    id: orgId,
                    meta: this.commonGenerator.buildProfile(organisationCode),
                    identifier: orgSystemValue,
                    name: labName,
                    address: labAddress,
                },
            },
        };
        return element;
    }
}
exports.Generator = Generator;
//# sourceMappingURL=generator.js.map