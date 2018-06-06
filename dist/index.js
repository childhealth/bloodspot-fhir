#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./generator");
const local_file_input_channel_1 = require("./local.file.input.channel");
const local_folder_output_channel_1 = require("./local.folder.output.channel");
// Read some command-line arguments (process.argv) to determine set the input and output
const args = process.argv;
if (args.length !== 4) {
    throw new Error("Its got to have 4 arguments: node index.js inputFileUrl outputFolderUrl");
}
args.shift(); // ignore 'node'
args.shift(); // ignore 'index.js'
const localInputFileUrl = args.shift();
const localOutputFolderUrl = args.shift();
// tslint:disable-next-line:no-console
console.log("locaFileUrl", localInputFileUrl);
// tslint:disable-next-line:no-console
console.log("localOutputFolderUrl", localOutputFolderUrl);
const inputChannel = new local_file_input_channel_1.LocalFileInputChannel(localInputFileUrl);
const outputChannel = new local_folder_output_channel_1.LocalFolderOutputChannel(localOutputFolderUrl);
const generator = new generator_1.Generator(inputChannel, outputChannel);
generator.execute();
// tslint:disable-next-line:max-line-length
// const inputCSVContentsAsString = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,,G83067,1,1,2518,36,1,,,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";
//# sourceMappingURL=index.js.map