export class ScreeningProcedure {

    public static PKU = new ScreeningProcedure(
        "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningPKU-Procedure-1",
        "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomePKU-1",
        "314081000",
        "Phenylketonuria screening test");
    public static SCD = new ScreeningProcedure(
        "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-NewbornBloodSpotScreeningSCD-Procedure-1",
        "https://fhir.nhs.uk/STU3/CodeSystem/DCH-BloodSpotOutcomeSCD-1",
        "314090007",
        "Sickle cell disease screening test",
    );

    constructor(
        public readonly structureDefinitionCode: string,
        public readonly codeSystem: string,
        public readonly clinicalTermCode: string,
        public readonly display: string,
    ) {}

}
