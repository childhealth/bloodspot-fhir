import { CommonGenerator } from "./common.generator";

export class LocationGenerator {

    private commonGenerator = new CommonGenerator();

    public buildLocation(locationId: string): any {
        const code = "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-DCH-Location-1";

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
                    meta: this.commonGenerator.buildProfile(code),
                },
            },
        };

        return element;
    }

}
