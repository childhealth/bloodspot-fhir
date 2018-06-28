"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScreeningProcedure {
    constructor(structureDefinitionCode, clinicalTermCode, display) {
        this.structureDefinitionCode = structureDefinitionCode;
        this.clinicalTermCode = clinicalTermCode;
        this.display = display;
    }
}
ScreeningProcedure.PKU = new ScreeningProcedure("https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningPKU-Procedure-1", "314081000", "Phenylketonuria screening test");
exports.ScreeningProcedure = ScreeningProcedure;
//# sourceMappingURL=screening.procedure.js.map