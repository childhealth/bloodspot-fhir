import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as tmp from "tmp";
import { LocalFolderOutputChannel } from "./local.folder.output.channel";

describe("LocalFolderOutputChannel", () => {
    let subject: LocalFolderOutputChannel;

    it("constructor(folderUrl) should create a folder if folder doesnt already exist", () => {
        const folderUrl = path.join(tmp.tmpNameSync());

        // check the folder does not exist
        let doesExist = fs.existsSync(folderUrl);
        expect(doesExist).toBeFalsy();

        subject = new LocalFolderOutputChannel(folderUrl);
        // check the folder exists after subject is created
        doesExist = fs.existsSync(folderUrl);
        expect(doesExist).toBeTruthy();
    });

    it("constructor(folderUrl) should throw an error if it cannot create the folder", () => {
        const badlyFormedFolderUrl = path.join(os.tmpdir(), tmp.tmpNameSync());
        expect(() => {
            subject = new LocalFolderOutputChannel(badlyFormedFolderUrl);
        }).toThrow(new Error("Cannot create output folder \"" + badlyFormedFolderUrl + "\"."));
    });

    // should throw an error if it cannot write to the folder
});
