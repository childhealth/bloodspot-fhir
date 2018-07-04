
"use strict";
const fileHandler = require('./fileHandling');
const logger =  require('./fileHandling').logger;
//Read Source CSV files from Test Input folder
const srcFiles = fileHandler.getFiles('test/testInput');

describe('  ***** Verifying XML FHIR messages against CSV records *****', function() {
 
    before('Converting all CSV files in to XML FHIR messages', async function () {
        fileHandler.startLog("test-logging.txt");
        var cmd = require('node-command-line');
        var Promise = require('bluebird');
        for (const srcFile of srcFiles) {
            //create Out put folder name as CSV file name
            var outFolder = 'testOutput/' + srcFile.split('.')[0].split('/')[2];
            //Remove if folder already exists
            fileHandler.rmFolders(outFolder);
            //Convert all CSV to XML to the output folder
            await Promise.coroutine(function *() {
                yield cmd.run('node dist/index.js '+srcFile+" "+outFolder);
                logger('Converted CSV file: '+srcFile, 3);
              })();
        }
        logger('Completed conversion of CSV files ', 3);
        logger('============================================================== ', 3);
    });

    after("Test completed" , function () {
        fileHandler.endLog();
    });
    require('./testGroup/xmlTests');
    require('./testGroup/commonSectionTests');
    require('./testGroup/procedureTests');
   
});
