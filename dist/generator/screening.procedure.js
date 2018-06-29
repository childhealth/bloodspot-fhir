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
ScreeningProcedure.CF = new ScreeningProcedure("https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningCF-Procedure-1", "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomeCF-1", "314080004", "Cystic fibrosis screening test");
ScreeningProcedure.CHT = new ScreeningProcedure("https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningCHT-Procedure-1", "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomeCHT-1", "400984005", "Congenital hypothyroidism screening test");
ScreeningProcedure.MCADD = new ScreeningProcedure("https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningMCADD-Procedure-1", "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomeMCADD-1", "428056008", "Medium-chain acyl-coenzyme A dehydrogenase deficiency screening test");
ScreeningProcedure.HCU = new ScreeningProcedure("https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningHCU-Procedure-1", "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomeHCU-1", "940201000000107", "Blood spot homocystinuria screening test");
ScreeningProcedure.MSUD = new ScreeningProcedure("https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningMSUD-Procedure-1", "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomeMSUD-1", "940221000000103", "Blood spot maple syrup urine disease screening test");
ScreeningProcedure.GA1 = new ScreeningProcedure("https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningGA1-Procedure-1", "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomeGA1-1", "940131000000109", "Blood spot glutaric aciduria type 1 screening test");
ScreeningProcedure.IVA = new ScreeningProcedure("https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningIVA-Procedure-1", "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomeIVA-1", "940151000000102", "Blood spot isovaleric acidaemia screening test");
exports.ScreeningProcedure = ScreeningProcedure;
//# sourceMappingURL=screening.procedure.js.map