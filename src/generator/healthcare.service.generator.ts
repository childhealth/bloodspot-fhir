import { IConfigurationService } from "../services/i.configuration.service";
import { CommonGenerator } from "./common.generator";

export class HealthcareServiceGenerator {

    private commonGenerator = new CommonGenerator();

    constructor(private configurationService: IConfigurationService) {}

    public buildHealthcareService(healthcareServiceId: string, organisationId: string, locationId: string): any {
        const healthcareServiceCode = "https://fhir.nhs.uk/STU3/StructureDefinition/DCH-HealthcareService-1";
        const professionalTypeCode = "https://fhir.nhs.uk/STU3/ValueSet/DCH-ProfessionalType-1";
        const specialtyCode = "https://fhir.nhs.uk/STU3/CodeSystem/DCH-Specialty-1";

        const type = this.configurationService.healthcareService.professionalType;
        const specialty = this.configurationService.healthcareService.specialty;
        const phone = this.configurationService.laboratory.phone;

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
                    type: this.commonGenerator.buildCoding(professionalTypeCode, type.code, type.description),
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
                    specialty: this.commonGenerator.buildCoding(specialtyCode, specialty.code, specialty.description),
                    location: {
                        reference: {
                            "@": {
                                value: "urn:uuid:" + locationId,
                            },
                        },
                    },
                    telecom: {
                        system: {
                            "@": {
                                value: "phone",
                            },
                        },
                        value: {
                            "@": {
                                value: phone,
                            },
                        },
                    },
                },
            },
        };

        return element;
    }

}
