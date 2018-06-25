import { IConfigurationService } from "../services/i.configuration.service";

export class MockConfigurationService implements IConfigurationService {
    public readonly laboratory = {
        odsCode: "LAB01",
        description: "Laboratory 01",
        address: {
            line1: "Address Line 1",
            city: "Lab City",
            district: "District 1",
            postCode: "NN1 1AA",
        },
        phone: "123412345",
    };
    public readonly healthcareService = {
        professionalType: {
            code: "ProfTypeCODE1",
            description: "ProfTypeDescription",
        },
        specialty: {
            code: "560",
            description: "MIDWIFE EPISODE",
        },
    };
}
