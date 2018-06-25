"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockConfigurationService {
    constructor() {
        this.laboratory = {
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
        this.healthcareService = {
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
}
exports.MockConfigurationService = MockConfigurationService;
//# sourceMappingURL=mock.configuration.service.js.map