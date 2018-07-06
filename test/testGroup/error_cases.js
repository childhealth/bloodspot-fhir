
"use strict";
const expect = require('expect');
const logger =  require('../fileHandling').logger;
//Read Source CSV files from Test Input folder
const srcFiles =  require('../fileHandling').getErrorFiles();
const fileHandler =  require('../fileHandling');
var exec = require('child_process').exec,
Promise = require('bluebird');

function executeCommand(command){
    return new Promise(function(resolve) {
      exec(command, function(error, stdout, stderr) {
        if(error) {
          logger(error.message, 1);
          return resolve({success: false, error: error.message, stdErr: stderr});
        }
        return resolve({success: true, message: stdout});
      });
    });
  }

describe('  ***** Verifying Error cases *****', function() {
    it('should verify command failure when gender value out of rage', async function(){
        var error_file = srcFiles.filter((value) => {return value.includes("error_gender_value");})[0];
        var error_response = "Gender code should be in [0129]";
        var outFolder = 'testOutput/' + error_file.split('.')[0].split('/')[2];
            //Remove if folder already exists
        fileHandler.rmFolders(outFolder);
        var res =  await executeCommand('node dist/index.js '+error_file+" "+outFolder);
        var stdOut = res.success ?  res.message : res.error;
        expect(stdOut).toContain(error_response);
    });

    it('should error all Procedures if status code is not in the range of 1 to 10', async function(){
        var error_file = srcFiles.filter((value) => {return value.includes("error_Procedures_Status_Code");})[0];
        var procedure_erros = [];
        procedure_erros.push("line 2: Error: PKU status code should be a number between 1 and 10");
        procedure_erros.push("line 3: Error: CHT status code should be a number between 1 and 10");
        procedure_erros.push("line 4: Error: SCD status code should be a number between 1 and 10");
        procedure_erros.push("line 5: Error: CF status code should be a number between 1 and 10");
        procedure_erros.push("line 6: Error: MCADD status code should be a number between 1 and 10");
        procedure_erros.push("line 7: Error: HCU status code should be a number between 1 and 10");
        procedure_erros.push("line 8: Error: MSUD status code should be a number between 1 and 10");
        procedure_erros.push("line 10: Error: IVA status code should be a number between 1 and 10");
        
        var outFolder = 'testOutput/' + error_file.split('.')[0].split('/')[2];
            //Remove if folder already exists
        fileHandler.rmFolders(outFolder);
        var res =  await executeCommand('node dist/index.js '+error_file+" "+outFolder);
        var stdOut = res.success ?  res.message : res.error;
        for(var error of procedure_erros){
            expect(stdOut).toContain(error);
        }
     });

     it('should error if date of birth is in wrong format', async function(){
        var error_file = srcFiles.filter((value) => {return value.includes("error_date_of_birth");})[0];
        var error_response = "Date Of Birth should be a date DD/MM/YYYY";
        var outFolder = 'testOutput/' + error_file.split('.')[0].split('/')[2];
            //Remove if folder already exists
        fileHandler.rmFolders(outFolder);
        var res =  await executeCommand('node dist/index.js '+error_file+" "+outFolder);
        var stdOut = res.success ?  res.message : res.error;
        expect(stdOut).toContain(error_response);
     });

     it('should error if date of receipt or date of collection are in wrong format', async function(){
        var error_file = srcFiles.filter((value) => {return value.includes("error_date_format");})[0];
        var error_collection_date = "Collection Date should be a date DD/MM/YYYY";
        var error_receipt_date = "Date Of Receipt should be a date DD/MM/YYYY";
        var outFolder = 'testOutput/' + error_file.split('.')[0].split('/')[2];
            //Remove if folder already exists
        fileHandler.rmFolders(outFolder);
        var res =  await executeCommand('node dist/index.js '+error_file+" "+outFolder);
        var stdOut = res.success ?  res.message : res.error;
        expect(stdOut).toContain(error_collection_date);
        expect(stdOut).toContain(error_receipt_date);
     });

     it('should error if NHS number length is longer than 10 digits', async function(){
        var error_file = srcFiles.filter((value) => {return value.includes("error_nhs_no_length");})[0];
        var NHSno_error_length = "NHS Number value \"99912345678\" exceeds the maximum length of 10";

        var outFolder = 'testOutput/' + error_file.split('.')[0].split('/')[2];
            //Remove if folder already exists
        fileHandler.rmFolders(outFolder);
        var res =  await executeCommand('node dist/index.js '+error_file+" "+outFolder);
        var stdOut = res.success ?  res.message : res.error;
        expect(stdOut).toContain(NHSno_error_length);
     });
});

