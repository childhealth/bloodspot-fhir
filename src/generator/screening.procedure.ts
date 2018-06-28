export class ScreeningProcedure {

    public static PKU = new ScreeningProcedure(
        "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningPKU-Procedure-1",
        "314081000",
        "Phenylketonuria screening test");

    constructor(
        public readonly structureDefinitionCode: string,
        public readonly clinicalTermCode: string,
        public readonly display: string,
    ) {}

}
