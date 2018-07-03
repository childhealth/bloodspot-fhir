
const expect = require('expect');
const fileHandler = require('./fileHandling')
const checker = require('./messageChecker')
const converter = require('./messageGenerator')
const logger =  require('./fileHandling').logger;
//Read Source CSV files from Test Input folder
srcFiles = fileHandler.getFiles('test/testInput')

describe('  ***** Verifying XML FHIR messages against CSV records *****', function() {
 
    before('Converting all CSV files in to XML FHIR messages', async function () {
        fileHandler.startLog("test-logging.txt")
        var cmd = require('node-command-line');
        Promise = require('bluebird');
        for (const srcFile of srcFiles) {
            //create Out put folder name as CSV file name
            outFolder = 'testOutput/'+srcFile.split('.')[0].split('/')[2]
            //Remove if folder already exists
            fileHandler.rmFolders(outFolder)
            //Convert csv to xml - this is using method from implementation - debug purpose
            // converter.convert(srcFile, outFolder)
            //Convert all CSV to XML to the output folder
            await Promise.coroutine(function *() {
                yield cmd.run('node dist/index.js '+srcFile+" "+outFolder);
                logger('Converted CSV file: '+srcFile, 3);
              })();
        }
        logger('Completed conversion of CSV files ', 3);
        logger('============================================================== ', 3);
    });

    after("Test completed" , async function () {
        fileHandler.endLog();
    });

        it('should pass XML validation against Schema - DCH-BloodSpotTestOutcome-Bundle', function(){
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                logger("Verifying CSV file \""+csvFile+"\"  with \""+source.length+"\" records ", 3);
                xmlFiles = fileHandler.getFiles(outFolder)
                //Using modified schema due to differences between sample data and actual spec
                // The schema generated of : https://fhir.nhs.uk/STU3/Examples/DCH-BloodSpotTestOutcome-Bundle-Example-1.xml
                // filexsd = './test/xmlSchema/DCH-BloodSpotTestOutcome-Bundle-Example-1.xsd'
                filexsd = './test/xmlSchema/DCH-BloodSpotTestOutcome-Bundle-Example-1-modified.xsd'
                for (const xmlfile of xmlFiles) {
                    logger("Valdating \""+xmlfile+"\" agaist schema \""+filexsd, 4)
                    result = checker.xmlValidate(xmlfile, filexsd)
                    expect(result).toEqual(true)
                }
            }

         });
        
        it('should updated with right \"MessageHeader\" for all generated xml messages', function(){
            logger("Verifying XML file for \"MessageHeader\" section", 3);
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                for (const file of xmlFiles) {
                    //Load generated xml
                    logger("Verifying XML file \""+file+"\" header with CSV file: "+csvFile, 4);
                    json = fileHandler.getXml2Js(file);
                    headerMessage = checker.getXpathElementValue(json, '//MessageHeader//event/display');
                    headerCode = checker.getXpathElementValue(json, '//MessageHeader//event/code');
                    expect(headerMessage).toEqual('Blood Spot Test Outcome');
                    expect(headerCode).toEqual('CH035');
                }
            }
        });
        
        it('should be encoded correctly the \"Organization\" parameter in the XML message', function(){
            logger("Verifying XML file for \"Organization\" section", 3);
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 0;
                    for (let csvRecord of source) {
                            //Load generated xml
                        logger("Verifying record "+(i+1)+" from CSV: "+csvFile, 4)
                        var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Organization/identifier/value')).toEqual('LAB01')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Organization/name')).toEqual('Laboratory 01')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Organization/address/line')).toEqual('First line of the address')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Organization/address/city')).toEqual('City')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Organization/address/district')).toEqual('District')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Organization/address/postalCode')).toEqual('Post Code')
                        //TODO: The tests are implemented with verification of config values.
                        //The verification need to be changed when sample data is available for input
                        // checker.checkMessageElementsValue(eachOutcome, "providerUnit", xmlFormat, '//Bundle/entry//Organization/identifier/value')
                        i = i+1
                    }

            }
         });

         it('should be encoded correctly the \"HealthcareService\" parameter in the XML message', function(){
            logger("Verifying XML file for \"HealthcareService\" section", 3);
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 0;
                    for (let csvRecord of source) {
                        //Load generated xml
                        logger("Verifying XML file \""+xmlFiles[i]+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/type/coding/code')).toEqual('C09')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/type/coding/display')).toEqual('Screener (in a National Screening Programme)')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/providedBy/display')).toEqual('Laboratory 01')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/specialty/coding/code')).toEqual('560')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/specialty/coding/display')).toEqual('MIDWIFE EPISODE')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/specialty/coding/display')).toEqual('MIDWIFE EPISODE')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/telecom/system')).toEqual('phone')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/telecom/value')).toEqual('0113 123 4567')
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the \"Patient\" details in the XML message', function(){
            logger("Verifying XML file for \"Patient\" section", 3);
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                        //Load generated xml
                        xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                        logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFile)
                        //Verifying Patient's name details
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/name/use')).toEqual('official')
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/name/family')).toEqual(csvRecord['Surname'])
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/name/given')).toEqual(csvRecord['First_Name'])
                        date = csvRecord['Date_Of_Birth'].split("/").reverse().join("-");
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/birthDate')).toEqual(date)
                          //Verifying Patient's gender
                        genderConfig = {"0":"unknown", "1":"male",  "2":"female",  "9":"other",}
                        gender = genderConfig[csvRecord['Gender_Code']];
                        expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/gender')).toEqual(gender)
    
                         //Verifying Patient's address
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/use')).toEqual('home')
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/line',0)).toEqual(csvRecord['Address_1'])
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/line',1)).toEqual(csvRecord['Address_2'])
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/line',2)).toEqual(csvRecord['Address_3'])
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/line',3)).toEqual(csvRecord['Address_4'])
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/line',4)).toEqual(csvRecord['Address_5'])
                        
                          //Verifying Patient's ID
                          nhsNumber = csvRecord['nhs_no'].replace(/\s/g, "");
                          expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/identifier/value')).toEqual(nhsNumber)
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the \"DiagnosticReport\" in the XML message', function(){
            logger("Verifying XML file for \"DiagnosticReport\" section", 3);
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                        //Load generated xml
                        xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                        logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFile)
                    
                         //Verifying DiagnosticReport 
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//DiagnosticReport/status')).toEqual('final')
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//DiagnosticReport/code/coding/code')).toEqual('86637100000010')
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//DiagnosticReport/code/coding/display')).toEqual('Child Screening Report (record artifact)')
                         var regex = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])T\d\d:\d\d:\d\d\.\d\d\dZ$/
                        date_ = checker.getXpathElementValue(xmlFormat,'//Bundle/entry//DiagnosticReport/issued')
                        expect(date_).toMatch(RegExp(regex));
                        i = i+1
                    }
            }
     
         });

         it('should be encoded correctly the \"Encounter\" in the XML message', function(){
            logger("Verifying XML file for \"Encounter\" section", 3);
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                        //Load generated xml
                        xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                        logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFile)
                    
                         //Verifying DiagnosticReport 
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Encounter/status')).toEqual('finished')
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Encounter/subject/display')).toEqual(`${csvRecord['Surname']}, ${csvRecord['First_Name']}`)
                         date_of_collection = csvRecord['Date_Of_Collection'].split("/").reverse().join("-");
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Encounter/period/start')).toEqual(date_of_collection)
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the \"Location\" in the XML message', function(){
            logger("Verifying XML file for \"Location\" section", 3);
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                        //Load generated xml
                        xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                        logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFile)
                    
                         //Verifying Location 
                         expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Location/identifier/value')).toEqual('LAB01')
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the Procedure \"Phenylketonuria screening\" in the XML message', function(){
            logger("Verifying XML file for \"Procedures\"", 3);
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                        //Load generated xml
                        xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                        logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFile)
                
                        procedure = checker.getSubElementProcedure(xmlFormat, `314081000`)
                         //Verifying Procedure 
                         expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`314081000`)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Phenylketonuria screening test')
                         //status code replaced by supplementary code if supplementary code not empty
                         csvPKUCode = csvRecord['PKU_Supplementary_Code'] === '' ? csvRecord['PKU_Status_Code'] : csvRecord['PKU_Supplementary_Code'];
                         xmlPKUCode = checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code');
                         //XML code length should 2 or 4
                         expect([2, 4]).toContain(xmlPKUCode.length);
                         //Prefix csv code with 0 if code length is 1 or 3 
                         csvPKUCode = (csvPKUCode.length === 1 || csvPKUCode.length === 3) ? '0'+csvPKUCode : csvPKUCode
                         expect(xmlPKUCode).toEqual(csvPKUCode)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['PKU_Status'])
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the Procedure \"Sickle cell disease screening Procedure\" in the XML message', function(){
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                       //Load generated xml
                       xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                       logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                       var xmlFormat = fileHandler.getXml2Js(xmlFile)
                
                        procedure = checker.getSubElementProcedure(xmlFormat, `314090007`)
                         //Verifying Procedure 
                         expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`314090007`)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Sickle cell disease screening test')
                          //status code replaced by supplementary code if supplementary code not empty
                         csvSickeCellCode = csvRecord['Sickle_Supplementary_Code'] === '' ? csvRecord['Sickle_Status_Code'] : csvRecord['Sickle_Supplementary_Code'];
                         xmlSickeCellCode = checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code');
                         //XML code length should 2 or 4
                         expect([2, 4]).toContain(xmlSickeCellCode.length);
                        //Prefix csv code with 0 if code length is 1 or 3 
                         csvSickeCellCode = (csvSickeCellCode.length === 1 || csvSickeCellCode.length === 3) ? '0'+csvSickeCellCode : csvSickeCellCode
                         expect(xmlSickeCellCode).toEqual(csvSickeCellCode)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['Sickle_Status'])
                        
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the Procedure \"Cystic fibrosis screening Procedure\" in the XML message', function(){
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                        //Load generated xml
                        xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                        logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFile)
                
                        procedure = checker.getSubElementProcedure(xmlFormat, `314080004`)
                         //Verifying Procedure 
                         expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`314080004`)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Cystic fibrosis screening test')
                          //status code replaced by supplementary code if supplementary code not empty
                          csvCFCode = csvRecord['CF_Supplementary_Code'] === '' ? csvRecord['CF_Status_Code'] : csvRecord['CF_Supplementary_Code'];
                          xmlCFCode = checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code');
                          //XML code length should 2 or 4
                          expect([2, 4]).toContain(xmlCFCode.length);
                         //Prefix csv code with 0 if code length is 1 or 3 
                         csvCFCode = (csvCFCode.length === 1 || csvCFCode.length === 3) ? '0'+csvCFCode : csvCFCode
                          expect(xmlCFCode).toEqual(csvCFCode)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['CF_Status'])
                        
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the Procedure \"Congenital hypothyroidism screening Procedure\" in the XML message', function(){
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                        //Load generated xml
                        xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                        logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFile)
                
                        procedure = checker.getSubElementProcedure(xmlFormat, `400984005`)
                         //Verifying Procedure 
                         expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`400984005`)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Congenital hypothyroidism screening test')
                          //status code replaced by supplementary code if supplementary code not empty
                          csvCTHCode = csvRecord['CHT_Supplementary_Code'] === '' ? csvRecord['CHT_Status_Code'] : csvRecord['CHT_Supplementary_Code'];
                          xmlCTHCode = checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code');
                          //XML code length should 2 or 4
                          expect([2, 4]).toContain(xmlCTHCode.length);
                         //Prefix csv code with 0 if code length is 1 or 3 
                         csvCTHCode = (csvCTHCode.length === 1 || csvCTHCode.length === 3) ? '0'+csvCTHCode : csvCTHCode
                          expect(xmlCTHCode).toEqual(csvCTHCode)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['CHT_Status'])
                        
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the Procedure \"Medium-chain acyl-coenzyme A dehydrogenase deficiency screening Procedure\" in the XML message', function(){
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                for (let csvRecord of source) {
                    //Load generated xml
                    xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                    logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                    var xmlFormat = fileHandler.getXml2Js(xmlFile)
            
                    procedure = checker.getSubElementProcedure(xmlFormat, `428056008`)
                     //Verifying Procedure 
                     expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                     expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`428056008`)
                     expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Medium-chain acyl-coenzyme A dehydrogenase deficiency screening test')
                      //status code replaced by supplementary code if supplementary code not empty
                      csvMCADDCode = csvRecord['MCADD_Supplementary_Code'] === '' ? csvRecord['MCADD_Status_Code'] : csvRecord['MCADD_Supplementary_Code'];
                      xmlMCADDCode = checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code');
                      //XML code length should 2 or 4
                      expect([2, 4]).toContain(xmlMCADDCode.length);
                     //Prefix csv code with 0 if code length is 1 or 3 
                     csvMCADDCode = (csvMCADDCode.length === 1 || csvMCADDCode.length === 3) ? '0'+csvMCADDCode : csvMCADDCode
                      expect(xmlMCADDCode).toEqual(csvMCADDCode)
                     expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['MCADD_Status'])
                    
                    i = i+1
                }
            }
         });

         it('should be encoded correctly the Procedure \"Blood spot homocystinuria screening Procedure\" in the XML message', function(){
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                        //Load generated xml
                        xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                        logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFile)
                
                        procedure = checker.getSubElementProcedure(xmlFormat, `940201000000107`)
                         //Verifying Procedure 
                         expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`940201000000107`)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Blood spot homocystinuria screening test')
                          //status code replaced by supplementary code if supplementary code not empty
                          csvHCUCode = csvRecord['HCU_Supplementary_Code'] === '' ? csvRecord['HCU_Status_Code'] : csvRecord['HCU_Supplementary_Code'];
                          xmlHCUCode = checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code');
                          //XML code length should 2 or 4
                          expect([2, 4]).toContain(xmlHCUCode.length);
                         //Prefix csv code with 0 if code length is 1 or 3 
                         csvHCUCode = (csvHCUCode.length === 1 || csvHCUCode.length === 3) ? '0'+csvHCUCode : csvHCUCode
                          expect(xmlHCUCode).toEqual(csvHCUCode)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['HCU_Status'])
                        
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the Procedure \"Blood spot maple syrup urine disease screening Procedure\" in the XML message', function(){
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                        //Load generated xml
                        xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                        logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFile)
                
                        procedure = checker.getSubElementProcedure(xmlFormat, `940221000000103`)
                         //Verifying Procedure 
                         expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`940221000000103`)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Blood spot maple syrup urine disease screening test')
                          //status code replaced by supplementary code if supplementary code not empty
                          csvMSUDCode = csvRecord['MSUD_Supplementary_Code'] === '' ? csvRecord['MSUD_Status_Code'] : csvRecord['MSUD_Supplementary_Code'];
                          xmlMSUDCode = checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code');
                          //XML code length should 2 or 4
                          expect([2, 4]).toContain(xmlMSUDCode.length);
                         //Prefix csv code with 0 if code length is 1 or 3 
                         csvMSUDCode = (csvMSUDCode.length === 1 || csvMSUDCode.length === 3) ? '0'+csvMSUDCode : csvMSUDCode
                          expect(xmlMSUDCode).toEqual(csvMSUDCode)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['MSUD_Status'])
                        
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the Procedure \"Blood spot glutaric aciduria type 1 screening Procedure\" in the XML message', function(){
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                         //Load generated xml
                         xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                         logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                         var xmlFormat = fileHandler.getXml2Js(xmlFile)
                
                        procedure = checker.getSubElementProcedure(xmlFormat, `940131000000109`)
                         //Verifying Procedure 
                         expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`940131000000109`)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Blood spot glutaric aciduria type 1 screening test')
                          //status code replaced by supplementary code if supplementary code not empty
                          csvGA1Code = csvRecord['GA1_Supplementary_Code'] === '' ? csvRecord['GA1_Status_Code'] : csvRecord['GA1_Supplementary_Code'];
                          xmlGA1Code = checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code');
                          //XML code length should 2 or 4
                          expect([2, 4]).toContain(xmlGA1Code.length);
                         //Prefix csv code with 0 if code length is 1 or 3 
                         csvGA1Code = (csvGA1Code.length === 1 || csvGA1Code.length === 3) ? '0'+csvGA1Code : csvGA1Code
                          expect(xmlGA1Code).toEqual(csvGA1Code)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['GA1_Status'])
                        
                        i = i+1
                    }
            }
         });

         it('should be encoded correctly the Procedure \"Blood spot isovaleric acidaemia screening Procedure\" in the XML message', function(){
            for (const csvFile of srcFiles) {
                //Assign Out put folder name from CSV file name
                outFolder = 'testOutput/'+csvFile.split('.')[0].split('/')[2]
                //Convert source file to JSON
                source = checker.csvToJson(csvFile)
                xmlFiles = fileHandler.getFiles(outFolder)
                var i = 1;
                    for (let csvRecord of source) {
                        //Load generated xml
                        xmlFile = xmlFiles.filter((value, index, array) => {return value.includes(`message-${i}.xml`)})[0];
                        logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                        var xmlFormat = fileHandler.getXml2Js(xmlFile)
                
                        procedure = checker.getSubElementProcedure(xmlFormat, `940151000000102`)
                         //Verifying Procedure 
                         expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`940151000000102`)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Blood spot isovaleric acidaemia screening test')
                          //status code replaced by supplementary code if supplementary code not empty
                          csvIVACode = csvRecord['IVA_Supplementary_Code'] === '' ? csvRecord['IVA_Status_Code'] : csvRecord['IVA_Supplementary_Code'];
                          xmlIVACode = checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code');
                          //XML code length should 2 or 4
                          expect([2, 4]).toContain(xmlIVACode.length);
                         //Prefix csv code with 0 if code length is 1 or 3 
                         csvIVACode = (csvIVACode.length === 1 || csvIVACode.length === 3) ? '0'+csvIVACode : csvIVACode
                          expect(xmlIVACode).toEqual(csvIVACode)
                         expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['IVA_Status'].replace(/\r|\n/g, ''))
                        
                        i = i+1
                    }
            }
         });

});
