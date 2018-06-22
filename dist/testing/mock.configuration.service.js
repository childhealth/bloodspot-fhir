"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_service_1 = require("../services/configuration.service");
class MockConfigurationService extends configuration_service_1.ConfigurationService {
    constructor() {
        super();
        this.laboratory = {
            odsCode: "LAB01",
            description: "Laboratory 01",
            address: {
                line1: "Address Line 1",
                city: "Lab City",
                district: "District 1",
                postCode: "NN1 1AA",
            },
        };
    }
}
exports.MockConfigurationService = MockConfigurationService;
//# sourceMappingURL=mock.configuration.service.js.map