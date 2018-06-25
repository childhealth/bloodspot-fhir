import { IConfigurationService } from "../services/i.configuration.service";
import { CommonGenerator } from "./common.generator";

export class HealthcareServiceGenerator {

    private commonGenerator = new CommonGenerator();

    constructor(private configurationService: IConfigurationService) {}

    public buildHealthcareService(healthcareServiceId: string, organisationId: string): any {
        const healthcareServiceCode = "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-HealthcareService-1";
        const professionalTypeCode = "https://fhir.nhs.uk/STU3/ValueSet/DCH-ProfessionalType-1";
        const type = this.configurationService.healthcareService.professionalType;

        const element = {
            fullUrl: "urn:uuid:" + healthcareServiceId,
            resource: {
                HealthcareService: {
                    id: {
                        "@": {
                            value: healthcareServiceId,
                        },
                    },
                    meta: this.commonGenerator.buildProfile(healthcareServiceCode),
                    type: {
                        coding: this.commonGenerator.buildCoding(professionalTypeCode, type.code, type.description),
                    },
                    providedBy: {
                        reference: {
                            "@": {
                                value: "urn:uuid:" + organisationId,
                            },
                        },
                        display: {
                            "@": {
                                value: this.configurationService.laboratory.description,
                            },
                        },
                    },
                },
            },
        };

        return element;
    }

}
