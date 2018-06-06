#!/usr/bin/env node

import { Generator } from "./generator/generator";
import { InputChannel } from "./input/input.channel";
import { LocalFileInputChannel } from "./input/local.file.input.channel";
import { LocalFolderOutputChannel } from "./output/local.folder.output.channel";
import { OutputChannel } from "./output/output.channel";

// Read some command-line arguments (process.argv) to determine set the input and output
const args = process.argv;
if (args.length !== 4) {
    throw new Error("Its got to have 4 arguments: node index.js inputFileUrl outputFolderUrl");
}

args.shift(); // ignore 'node'
args.shift(); // ignore 'index.js'

const localInputFileUrl = args.shift()!;
const localOutputFolderUrl = args.shift()!;

// tslint:disable-next-line:no-console
console.log("locaFileUrl", localInputFileUrl);

// tslint:disable-next-line:no-console
console.log("localOutputFolderUrl", localOutputFolderUrl);

const inputChannel: InputChannel = new LocalFileInputChannel(localInputFileUrl);
const outputChannel: OutputChannel = new LocalFolderOutputChannel(localOutputFolderUrl);
const generator = new Generator(inputChannel, outputChannel);

generator.execute();
