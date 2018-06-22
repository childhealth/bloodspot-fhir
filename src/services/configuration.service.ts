export class ConfigurationService {
    public readonly laboratory: any;

    constructor() {
        this.laboratory = {
            odsCode: "LAB01",
            description: "Laboratory 01",
            address: {
                line1: "TODO file handling",
                city: "TODO file handling",
                district: "TODO file handling",
                postCode: "TODO file handling",
            },
        };
    }
}
