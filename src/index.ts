#!/usr/bin/env node

import { Generator } from "./generator/generator";
import { InputChannel } from "./input/input.channel";
import { LocalFileInputChannel } from "./input/local.file.input.channel";
import { LocalFolderOutputChannel } from "./output/local.folder.output.channel";
import { OutputChannel } from "./output/output.channel";
import { ConfigurationService } from "./services/configuration.service";
import { LoggerService } from "./services/logger.service";

// Read some command-line arguments (process.argv) to determine set the input and output
const args = process.argv;
if (args.length !== 4) {
    throw new Error("Missing arguments 'inputFileUrl' and 'outputFolderUrl'.");
}

args.shift(); // ignore 'node'
args.shift(); // ignore 'index.js'

const localInputFileUrl = args.shift()!;
const localOutputFolderUrl = args.shift()!;

const configurationService = new ConfigurationService("./bloodspot-helper.json");
const loggingService = new LoggerService(configurationService.logging);

const inputChannel: InputChannel = new LocalFileInputChannel(localInputFileUrl, loggingService);
const outputChannel: OutputChannel = new LocalFolderOutputChannel(localOutputFolderUrl, loggingService);
const generator = new Generator(inputChannel, outputChannel, configurationService);

generator.execute();
