// This funfction converts the source file to XML message files in destination folder
var convert = function(srcFile, dstFolder){
    Object.defineProperty(exports, "__esModule", { value: true });
    const generator_1 = require("../dist/generator/generator");

    const inputChannel = srcFileChannel(srcFile);
    const outputChannel = dstFolderChannel(dstFolder)
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

module.exports = {
    convert,
    srcFileChannel,
    dstFolderChannel
};
