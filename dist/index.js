#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./generator/generator");
const local_file_input_channel_1 = require("./input/local.file.input.channel");
const local_folder_output_channel_1 = require("./output/local.folder.output.channel");
// Read some command-line arguments (process.argv) to determine set the input and output
const args = process.argv;
if (args.length !== 4) {
    throw new Error("Missing arguments 'inputFileUrl' and 'outputFolderUrl'.");
}
args.shift(); // ignore 'node'
args.shift(); // ignore 'index.js'
const localInputFileUrl = args.shift();
const localOutputFolderUrl = args.shift();
const inputChannel = new local_file_input_channel_1.LocalFileInputChannel(localInputFileUrl);
const outputChannel = new local_folder_output_channel_1.LocalFolderOutputChannel(localOutputFolderUrl);
const generator = new generator_1.Generator(inputChannel, outputChannel);
generator.execute();
//# sourceMappingURL=index.js.map