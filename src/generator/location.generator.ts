import { IConfigurationService } from "../services/i.configuration.service";
import { CommonGenerator } from "./common.generator";

export class LocationGenerator {

    private commonGenerator = new CommonGenerator();

    constructor(private configurationService: IConfigurationService) {}

    public buildLocation(locationId: string): any {
        const structureDefinitionCode = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Location-1";
        const odsSiteSystem = "https://fhir.nhs.uk/Id/ods-site-code";
        const odsCode = this.configurationService.laboratory.odsCode;

        const element = {
            fullUrl: {
                "@": {
                    value: "urn:uuid:" + locationId,
                },
            },
            resource: {
                Location: {
                    id: {
                        "@": {
                            value: locationId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(structureDefinitionCode),
                    identifier: this.commonGenerator.buildSystemValue(odsSiteSystem, odsCode),
                },
            },
        };

        return element;
    }

}
