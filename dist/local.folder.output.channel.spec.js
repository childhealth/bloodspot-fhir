"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const tmp = __importStar(require("tmp"));
const local_folder_output_channel_1 = require("./local.folder.output.channel");
describe("LocalFolderOutputChannel", () => {
    let subject;
    it("constructor(folderUrl) should create a folder if folder doesnt already exist", () => {
        const folderUrl = path.join(tmp.tmpNameSync());
        // check the folder does not exist
        let doesExist = fs.existsSync(folderUrl);
        expect(doesExist).toBeFalsy();
        subject = new local_folder_output_channel_1.LocalFolderOutputChannel(folderUrl);
        // check the folder exists after subject is created
        doesExist = fs.existsSync(folderUrl);
        expect(doesExist).toBeTruthy();
    });
    // should throw an error if it cannot create the folder
    // should throw an error if it cannot write to the folder
});
//# sourceMappingURL=local.folder.output.channel.spec.js.map