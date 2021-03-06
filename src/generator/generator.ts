import { InputChannel } from "../input/input.channel";
import { Outcome } from "../model/outcome";
import { OutputChannel } from "../output/output.channel";
import { IConfigurationService } from "../services/i.configuration.service";
import { CommonGenerator } from "./common.generator";
import { DiagnosticReportGenerator } from "./diagnostic.report.generator";
import { EncounterGenerator } from "./encounter.generator";
import { HealthcareServiceGenerator } from "./healthcare.service.generator";
import { LocationGenerator } from "./location.generator";
import { PatientGenerator } from "./patient.generator";
import { ProcedureGenerator } from "./procedure.generator";
import { ScreeningProcedure } from "./screening.procedure";
import { UuidService } from "./uuid.service";

export class Generator {

    private commonGenerator = new CommonGenerator();
    private patientGenerator = new PatientGenerator();
    private procedureGenerator = new ProcedureGenerator();
    private reportGenerator = new DiagnosticReportGenerator();
    private encounterGenerator = new EncounterGenerator();
    private healthcareServiceGenerator: HealthcareServiceGenerator;
    private locationGenerator: LocationGenerator;

    constructor(
        public inputChannel: InputChannel,
        public outputChannel: OutputChannel,
        private configurationService: IConfigurationService,
        private uuidService = new UuidService(),
    ) {
        this.healthcareServiceGenerator = new HealthcareServiceGenerator(configurationService);
        this.locationGenerator = new LocationGenerator(configurationService);
    }

    public execute() {
        for (const eachOutcome of this.inputChannel.outcomes) {
            const outcomeMessage = this.generateFHIRMessage(eachOutcome);
            this.outputChannel.write(outcomeMessage);
        }
    }

    private generateFHIRMessage(outcome: Outcome): any {
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

        const healthcareEntry = this.healthcareServiceGenerator.buildHealthcareService(
            healthcareServiceId, organisationId, locationId);

        const patientEntry = this.patientGenerator.buildPatient(patientId, outcome);

        const pkuProcedureEntry = this.prepareProcedure(
            ScreeningProcedure.PKU,
            patientId,
            encounterId,
            reportId,
            outcome.pkuStatusCode,
            outcome.pkuSupplementaryCode,
            outcome.pkuStatusDescription);
        const scdProcedureEntry = this.prepareProcedure(
            ScreeningProcedure.SCD,
            patientId,
            encounterId,
            reportId,
            outcome.scdStatusCode,
            outcome.scdSupplementaryCode,
            outcome.scdStatusDescription);
        const cfProcedureEntry = this.prepareProcedure(
            ScreeningProcedure.CF,
            patientId,
            encounterId,
            reportId,
            outcome.cfStatusCode,
            outcome.cfSupplementaryCode,
            outcome.cfStatusDescription);
        const chtProcedureEntry = this.prepareProcedure(
            ScreeningProcedure.CHT,
            patientId,
            encounterId,
            reportId,
            outcome.chtStatusCode,
            outcome.chtSupplementaryCode,
            outcome.chtStatusDescription);
        const mcaddProcedureEntry = this.prepareProcedure(
            ScreeningProcedure.MCADD,
            patientId,
            encounterId,
            reportId,
            outcome.mcaddStatusCode,
            outcome.mcaddSupplementaryCode,
            outcome.mcaddStatusDescription);
        const hcuProcedureEntry = this.prepareProcedure(
            ScreeningProcedure.HCU,
            patientId,
            encounterId,
            reportId,
            outcome.hcuStatusCode,
            outcome.hcuSupplementaryCode,
            outcome.hcuStatusDescription);
        const msudProcedureEntry = this.prepareProcedure(
            ScreeningProcedure.MSUD,
            patientId,
            encounterId,
            reportId,
            outcome.msudStatusCode,
            outcome.msudSupplementaryCode,
            outcome.msudStatusDescription);
        const ga1ProcedureEntry = this.prepareProcedure(
            ScreeningProcedure.GA1,
            patientId,
            encounterId,
            reportId,
            outcome.ga1StatusCode,
            outcome.ga1SupplementaryCode,
            outcome.ga1StatusDescription);
        const ivaProcedureEntry = this.prepareProcedure(
            ScreeningProcedure.IVA,
            patientId,
            encounterId,
            reportId,
            outcome.ivaStatusCode,
            outcome.ivaSupplementaryCode,
            outcome.ivaStatusDescription);

        const reportEntry = this.reportGenerator.buildDiagnosticReport(reportId, patientId, encounterId);

        const encounterEntry = this.encounterGenerator.buildEncounter(
            encounterId,
            patientId,
            outcome.displayName,
            outcome.collectionDate,
            locationId,
            healthcareServiceId);

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

    private prepareProcedure(
        screeningProcedure: ScreeningProcedure,
        patientId: string,
        encounterId: string,
        reportId: string,
        mainStatusCode: string,
        supplementaryCode: string,
        statusDescription: string,
    ) {
        const id = this.uuidService.generateUuid();
        const statusCode = (supplementaryCode !== "") ? supplementaryCode : mainStatusCode;
        const element = this.procedureGenerator.buildProcedure(
            id,
            screeningProcedure,
            patientId,
            encounterId,
            reportId,
            statusCode,
            statusDescription);

        return element;
    }

    private buildMessageHeader(responsibleId: string, focusId: string): any {
        const messageHeaderId = this.uuidService.generateUuid();
        const childHealthEventTypeCode = "https://fhir.nhs.uk/STU3/CodeSystem/DCH-ChildHealthEventType-1";
        const bloodspotEvent = this.commonGenerator.buildSystemCodeDisplay(
            childHealthEventTypeCode, "CH035", "Blood Spot Test Outcome");
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

    private buildNewMessageEventExtension(): any {
        const messageEventTypeCode = "https://fhir.nhs.uk/STU3/CodeSystem/DCH-MessageEventType-1";
        return {
            "@": {
                url: "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-DCH-MessageEventType-1",
            },
            "valueCodeableConcept": this.commonGenerator.buildCoding(messageEventTypeCode, "new", "New event message"),
        };
    }

    private buildSource(odsCode: string): any {
        return {
            endpoint: {
                "@": {
                    value: "urn:nhs-uk:addressing:ods:" + odsCode,
                },
            },
        };
    }

    private buildResponsible(id: string, display: string): any {
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

    private buildFocus(id: string): any {
        return {
            reference: {
                "@": {
                    value: "urn:uuid:" + id,
                },
            },
        };
    }

    private buildName(name: string): any {
        return {
            "@": {
                value: name,
            },
        };
    }

    private buildAddress(
        line1: string,
        city: string,
        district: string,
        postCode: string,
    ) {
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

    private buildOrganisation(orgId: string): any {
        const organisationCode = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Organization-1";
        const odsOrganizationSystem = "https://fhir.nhs.uk/Id/ods-organization-code";
        const lab = this.configurationService.laboratory;
        const orgSystemValue = this.commonGenerator.buildSystemValue(odsOrganizationSystem, lab.odsCode);
        const labName = this.buildName(lab.description);
        const labAddress = this.buildAddress(
            lab.address.line1,
            lab.address.city,
            lab.address.district,
            lab.address.postCode);

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
