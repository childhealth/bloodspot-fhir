
const expect = require('expect');
const fileHandler = require('./fileHandling')
const checker = require('./messageChecker')
const converter = require('./messageGenerator')
//Read Source CSV files from Test Input folder
srcFiles = fileHandler.getFiles('test/testInput')

describe('  ***** Verifying XML FHIR messages against CSV records *****', function() {
 
    before('Converting all CSV files in to XML FHIR messages', async function () {
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
                console.log('Converted CSV file: '+srcFile);
              })();
        }
        console.log('Completed conversion of CSV files ');
        console.log('============================================================== ');
    });


for (const srcFile of srcFiles) {
        //Assign Out put folder name from CSV file name
        outFolder = 'testOutput/'+srcFile.split('.')[0].split('/')[2]
        //Convert source file to JSON
        source = checker.csvToJson(srcFile)

        it('should pass XML validation against Schema - DCH-BloodSpotTestOutcome-Bundle', function(){
            xmlFiles = fileHandler.getFiles(outFolder)
            var xsd = require('./messageChecker');
            //Using modified schema due to differences between sample data and actual spec
            // The schema generated of : https://fhir.nhs.uk/STU3/Examples/DCH-BloodSpotTestOutcome-Bundle-Example-1.xml
            // filexsd = './test/xmlSchema/DCH-BloodSpotTestOutcome-Bundle-Example-1.xsd'
            filexsd = './test/xmlSchema/DCH-BloodSpotTestOutcome-Bundle-Example-1-modified.xsd'
            for (const xmlfile of xmlFiles) {
                console.log("Valdating \""+xmlfile+"\" agaist schema \""+filexsd)
                result = xsd.xmlValidate(xmlfile, filexsd)
                expect(result).toEqual(true)
            }
         });
        
        it('should updated with right \"MessageHeader\" for all generated xml messages', function(){
            xmlFiles = fileHandler.getFiles(outFolder)
            for (const file of xmlFiles) {
                //Load generated xml
                console.log("Verifying XML file \""+file+"\" header");
                json = fileHandler.getXml2Js(file);
                headerMessage = checker.getXpathElementValue(json, '//MessageHeader//event/display');
                headerCode = checker.getXpathElementValue(json, '//MessageHeader//event/code');
                expect(headerMessage).toEqual('Blood Spot Test Outcome');
                expect(headerCode).toEqual('CH035');
            }
        });
        
        it('should be encoded correctly the \"Organization\" parameter in the XML message', function(){
            xmlFiles = fileHandler.getFiles(outFolder)
            var i = 0;
                for (let csvRecord of source) {
                    //Load generated xml
                    console.log("Verifying record "+(i+1)+" from CSV")
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
         });

         it('should be encoded correctly the \"HealthcareService\" parameter in the XML message', function(){
            xmlFiles = fileHandler.getFiles(outFolder)
            var i = 0;
                for (let csvRecord of source) {
                    //Load generated xml
                    console.log("Verifying record "+(i+1)+" from CSV")
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
         });

         it('should be encoded correctly the \"Patient\" details in the XML message', function(){
            xmlFiles = fileHandler.getFiles(outFolder)
            var i = 0;
                for (let csvRecord of source) {
                    //Load generated xml
                    console.log("Verifying record "+(i+1)+" from CSV")
                    var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
                    //Verifying Patients name details
                    expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/name/use')).toEqual('official')
                    expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/name/family')).toEqual(csvRecord['Surname'])
                    expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/name/given')).toEqual(csvRecord['First_Name'])
                    date = csvRecord['Date_Of_Birth'].split("/").reverse().join("-");
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/birthDate')).toEqual(date)

                     //Verifying Patients address
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/use')).toEqual('home')
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/line',0)).toEqual(csvRecord['Address_1'])
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/line',1)).toEqual(csvRecord['Address_2'])
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/line',2)).toEqual(csvRecord['Address_3'])
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/line',3)).toEqual(csvRecord['Address_4'])
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/address/line',4)).toEqual(csvRecord['Address_5'])
                    
                      //Verifying Patients ID
                      nhsNumber = csvRecord['nhs_no'].replace(/\s/g, "");
                      expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Patient/identifier/value')).toEqual(nhsNumber)
                    i = i+1
                }
         });

         it('should be encoded correctly the \"DiagnosticReport\" in the XML message', function(){
            xmlFiles = fileHandler.getFiles(outFolder)
            var i = 0;
                for (let csvRecord of source) {
                    //Load generated xml
                    console.log("Verifying record "+(i+1)+" from CSV")
                    var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
                
                     //Verifying DiagnosticReport 
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//DiagnosticReport/status')).toEqual('final')
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//DiagnosticReport/code/coding/code')).toEqual('86637100000010')
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//DiagnosticReport/code/coding/display')).toEqual('Child Screening Report (record artifact)')
                     var regex = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])T\d\d:\d\d:\d\d\.\d\d\dZ$/
                    date_ = checker.getXpathElementValue(xmlFormat,'//Bundle/entry//DiagnosticReport/issued')
                    expect(date_).toMatch(RegExp(regex));
                    i = i+1
                }
         });

         it('should be encoded correctly the \"Encounter\" in the XML message', function(){
            xmlFiles = fileHandler.getFiles(outFolder)
            var i = 0;
                for (let csvRecord of source) {
                    //Load generated xml
                    console.log("Verifying record "+(i+1)+" from CSV")
                    var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
                
                     //Verifying DiagnosticReport 
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Encounter/status')).toEqual('finished')
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Encounter/subject/display')).toEqual(`${csvRecord['Surname']}, ${csvRecord['First_Name']}`)
                     date_of_collection = csvRecord['Date_Of_Collection'].split("/").reverse().join("-");
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Encounter/period/start')).toEqual(date_of_collection)
                    i = i+1
                }
         });

         it('should be encoded correctly the \"Location\" in the XML message', function(){
            xmlFiles = fileHandler.getFiles(outFolder)
            var i = 0;
                for (let csvRecord of source) {
                    //Load generated xml
                    console.log("Verifying record "+(i+1)+" from CSV")
                    var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
                
                     //Verifying Location 
                     expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Location/identifier/value')).toEqual('LAB01')
                    i = i+1
                }
         });

         it('should be encoded correctly the \"PKU Procedure\" in the XML message', function(){
            xmlFiles = fileHandler.getFiles(outFolder)
            var i = 0;
                for (let csvRecord of source) {
                    //Load generated xml
                    console.log("Verifying record "+(i+1)+" from CSV")
                    var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
            
                    procedure = checker.getSubElementProcedure(xmlFormat, `314081000`)
                     //Verifying Procedure 
                     expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                     expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`314081000`)
                     expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Phenylketonuria screening test')
                     //status code replaced by supplementary code if supplementary code not empty
                     pkuCode = csvRecord['PKU_Supplementary_Code'] === '' ? csvRecord['PKU_Status_Code'] : csvRecord['PKU_Supplementary_Code'];
                     expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code')).toEqual(pkuCode)
                     expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['PKU_Status'])
                    
                    i = i+1
                }
         });

         it('should be encoded correctly the \"Sickle cell disease Procedure\" in the XML message', function(){
            xmlFiles = fileHandler.getFiles(outFolder)
            var i = 0;
                for (let csvRecord of source) {
                    //Load generated xml
                    console.log("Verifying record "+(i+1)+" from CSV")
                    var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
            
                    procedure = checker.getSubElementProcedure(xmlFormat, `314090007`)
                     //Verifying Procedure 
                     expect(checker.getXpathElementValue(procedure,'//Procedure/status')).toEqual('completed')
                     expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/code')).toEqual(`314090007`)
                     expect(checker.getXpathElementValue(procedure,'//Procedure/code/coding/display')).toEqual('Sickle cell disease screening test')
                      //status code replaced by supplementary code if supplementary code not empty
                     sickeCellCode = csvRecord['Sickle_Supplementary_Code'] === '' ? csvRecord['Sickle_Status_Code'] : csvRecord['Sickle_Supplementary_Code'];
                     expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/code')).toEqual(sickeCellCode)
                     expect(checker.getXpathElementValue(procedure,'//Procedure/outcome/coding/display')).toEqual(csvRecord['Sickle_Status'])
                    
                    i = i+1
                }
         });

}

});
