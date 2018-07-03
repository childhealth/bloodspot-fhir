"use strict";
const logger =  require('./fileHandling').logger;
// This funfction converts the source file to XML message files in destination folder
var convert = function(srcFile, dstFolder){
    const generator_1 = require("../dist/generator/generator");

    const inputChannel = srcFileChannel(srcFile);
    const outputChannel = dstFolderChannel(dstFolder);
    const generator = new generator_1.Generator(inputChannel, outputChannel);
    generator.execute();
};
//Source file channel to read CSV files
var srcFileChannel = function(inputFile) {
    const local_file_input_channel_1 = require("../dist/input/local.file.input.channel");
    return new local_file_input_channel_1.LocalFileInputChannel(inputFile);
};
//Destination folder channel to output and read XML files
var dstFolderChannel = function(outFolder) {
    const local_folder_output_channel_1 = require("../dist/output/local.folder.output.channel");
    return  new local_folder_output_channel_1.LocalFolderOutputChannel(outFolder);
};

var childProcess = require('child_process');
var runScript = function (scriptArgs) {
    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;
    var process = childProcess.fork('dist/index.js', scriptArgs);
    logger("Stadout : "+process.stdout, 3);
    logger("Std Err : "+process.stderr, 1);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        throw err;
        // callback(err);
    });
    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        throw err;
        // callback(err);
    });
};

module.exports = {
    convert,
    srcFileChannel,
    dstFolderChannel,
    runScript
};
