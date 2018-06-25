import { IConfigurationService } from "../services/i.configuration.service";

export class HealthcareServiceGenerator {

    constructor(private configurationService: IConfigurationService) {}

    public buildHealthcareService(healthcareServiceId: string): any {
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
                    type: {
                        coding: {
                            system: {
                                "@": {
                                    value: "https://fhir.nhs.uk/STU3/ValueSet/DCH-ProfessionalType-1",
                                },
                            },
                            code: {
                                "@": {
                                    value: type.code,
                                },
                            },
                            display: {
                                "@": {
                                    value: type.description,
                                },
                            },
                        },
                    },
                },
            },
        };

        return element;
    }

}
