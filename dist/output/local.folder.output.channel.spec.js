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
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const tmp = __importStar(require("tmp"));
const silent_logger_service_1 = require("../testing/silent.logger.service");
const local_folder_output_channel_1 = require("./local.folder.output.channel");
describe("LocalFolderOutputChannel", () => {
    let subject;
    const logger = new silent_logger_service_1.SilentLoggerService();
    it("constructor(folderUrl) should create a folder if folder doesnt already exist", () => {
        const folderUrl = path.join(tmp.tmpNameSync());
        // check the folder does not exist
        let doesExist = fs.existsSync(folderUrl);
        expect(doesExist).toBeFalsy();
        subject = new local_folder_output_channel_1.LocalFolderOutputChannel(folderUrl, logger);
        // check the folder exists after subject is created
        doesExist = fs.existsSync(folderUrl);
        expect(doesExist).toBeTruthy();
    });
    it("constructor(folderUrl) should throw an error if it cannot create the folder", () => {
        const badlyFormedFolderUrl = path.join(os.tmpdir(), tmp.tmpNameSync());
        expect(() => {
            subject = new local_folder_output_channel_1.LocalFolderOutputChannel(badlyFormedFolderUrl, logger);
        }).toThrow(new Error("Cannot create output folder \"" + badlyFormedFolderUrl + "\"."));
    });
    it("constructor(folderUrl) should throw an error if it cannot write a file to the folder", () => {
        const folderUrl = path.join(tmp.tmpNameSync());
        const myfs = jasmine.createSpyObj("fsSpy", ["writeFileSync"]);
        myfs.writeFileSync.and.throwError("ERROR");
        const filename = path.join(folderUrl, "message-1.xml");
        subject = new local_folder_output_channel_1.LocalFolderOutputChannel(folderUrl, logger, myfs);
        expect(() => {
            subject.write("expect write() to fail");
        }).toThrow(new Error("Cannot write output file \"" + filename + "\"."));
    });
});
//# sourceMappingURL=local.folder.output.channel.spec.js.map