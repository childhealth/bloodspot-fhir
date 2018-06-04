#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const local_file_input_channel_1 = require("./local.file.input.channel");
// Read some command-line arguments (process.argv) to determine set the input and output
const args = process.argv;
if (args.length !== 4) {
    throw new Error("Its got to have 4 arguments: node index.js inputFileUrl outputFolderUrl");
}
args.shift(); // ignore 'node'
args.shift(); // ignore 'index.js'
const localFileUrl = args.shift();
if (typeof localFileUrl === "undefined") {
    // tslint:disable-next-line:no-console
    console.log("oh no, its undefined :(");
    process.exit(1);
}
const outputFolderUrl = args.shift();
// tslint:disable-next-line:no-console
console.log("locaFileUrl", localFileUrl);
// tslint:disable-next-line:no-console
console.log("outputFolderUrl", outputFolderUrl);
const inputChannel = new local_file_input_channel_1.LocalFileInputChannel(localFileUrl);
// const outputChannel = new OutputChannel(localFolderUrl);
// const generator = new Generator(inputChannel, outputChannel);
// tslint:disable-next-line:max-line-length
// const inputCSVContentsAsString = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,,G83067,1,1,2518,36,1,,,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";
// const message = generator.execute();
