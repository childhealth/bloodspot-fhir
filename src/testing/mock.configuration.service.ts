import { ConfigurationService } from "../services/configuration.service";

export class MockConfigurationService extends ConfigurationService {
    public readonly laboratory: any;

    constructor() {
        super();
        this.laboratory = {
            odsCode: "LAB01",
            description: "Laboratory 01",
            address: {
                line: "Address Line 1",
                city: "Lab City",
                district: "District 1",
                postCode: "NN1 1AA",
            },
        };
    }
}
