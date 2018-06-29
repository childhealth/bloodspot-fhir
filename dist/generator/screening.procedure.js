"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScreeningProcedure {
    constructor(structureDefinitionCode, codeSystem, clinicalTermCode, display) {
        this.structureDefinitionCode = structureDefinitionCode;
        this.codeSystem = codeSystem;
        this.clinicalTermCode = clinicalTermCode;
        this.display = display;
    }
}
ScreeningProcedure.PKU = new ScreeningProcedure("https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningPKU-Procedure-1", "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomePKU-1", "314081000", "Phenylketonuria screening test");
ScreeningProcedure.SCD = new ScreeningProcedure("https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningSCD-Procedure-1", "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomeSCD-1", "314090007", "Sickle cell disease screening test");
exports.ScreeningProcedure = ScreeningProcedure;
//# sourceMappingURL=screening.procedure.js.map