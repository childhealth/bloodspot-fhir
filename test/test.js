
const expect = require('expect');
const fileHandler = require('./fileHandling')
const checker = require('./messageChecker')
const converter = require('./messageGenerator')

describe(' ***** Converting CSV record files to XML FHIR messages *****', function() {
 
    //Read Source CSV files from Test Input folder
    srcFiles = fileHandler.getFiles('test/testInput')

for (const srcFile of srcFiles) {
        //create Out put folder name as CSV file name
        outFolder = 'testOutput/'+srcFile.split('.')[0].split('/')[2]
        //Remove if folder already exists
        fileHandler.rmFolders(outFolder)
        //Convert csv to xml
        converter.convert(srcFile, outFolder)
        //Read CSV source file from Test Input folder
        srcFilecontent = converter.srcFileChannel(srcFile);
        xmlFiles = fileHandler.getFiles(outFolder)

    describe(' ***** Verifying XML FHIR messages against CSV records *****'+srcFile, function() {
        it.skip('should pass XML validation against Schema - DCH-BloodSpotTestOutcome-Bundle', function(){
            var xsd = require('./messageChecker');
            filexsd = './test/xmlSchema/DCH-BloodSpotTestOutcome-Bundle-Example-1.xsd'
            for (const xmlfile of xmlFiles) {
                console.log("Valdating \""+xmlfile+"\" agaist schema \""+filexsd)
                result = xsd.xmlValidate(xmlfile, filexsd)
                expect(result).toEqual(true)
            }
         });
        
        it('should updated with right \"MessageHeader\" for all generated xml messages', function(){
            for (const file of xmlFiles) {
                //Load generated xml
                console.log("Verifying XML file \""+file+"\" header");
                json = fileHandler.getXml2Js(file);
                headerMessage = checker.getXpathElementValue(json, '//MessageHeader//event/display');
                headerCode = checker.getXpathElementValue(json, '//MessageHeader//event/code');
                expect(headerMessage).toEqual('Blood Spot Test Outcome');
                expect(headerCode).toEqual('CH035');
                console.log("Verified MessageHeader \""+headerMessage+"\" code \""+headerCode+"\"")
            }
        });
        
        it('should be encoded correctly the \"Organization\" parameter in the XML message', function(){
            var i = 0;
                for (const eachOutcome of srcFilecontent.outcomes) {
                    //Load generated xml
                    console.log("Verifying record "+(i+1)+" from CSV")
                    var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
                    expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Organization/identifier/value')).toEqual('LAB01')
                    expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//Organization/name')).toEqual('Laboratory 01')
                    //TODO: The tests are implemented with verification of config values.
                    //The verification need to be changed when sample data is available for input
                    // checker.checkMessageElementsValue(eachOutcome, "providerUnit", xmlFormat, '//Bundle/entry//Organization/identifier/value')
                    i = i+1
                }
         });

         it('should be encoded correctly the \"HealthcareService\" parameter in the XML message', function(){
            var i = 0;
                for (const eachOutcome of srcFilecontent.outcomes) {
                    //Load generated xml
                    console.log("Verifying record "+(i+1)+" from CSV")
                    var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
                    expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/type/coding/code')).toEqual('C09')
                    expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/providedBy/display')).toEqual('Laboratory 01')
                    expect(checker.getXpathElementValue(xmlFormat,'//Bundle/entry//HealthcareService/telecom/system')).toEqual('phone')
                    i = i+1
                }
         });

        })
}

});
