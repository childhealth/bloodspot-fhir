
var expect = require('expect');
const xml2js = require("xml2js");
const xpath = require("xml2js-xpath");
const fileHandler = require('./fileHandling')

describe(' ***** Testing CSV records to XML based FHIR message conversions *****', function() {
//Read Source CSV files from Test Input folder
srcFiles = fileHandler.getFiles('test/testInput')
//create Out put folder name as CSV file name
outFolder = 'testOutput/'+srcFiles[0].split('.')[0].split('/')[2]
var converter = require('./messageGenerator')

//Convert csv to xml
converter.convert(srcFiles[0], outFolder)

//Read CSV source file from Test Input folder
srcFilecontent = converter.srcFileChannel(srcFiles[0]);
xmlFiles = fileHandler.getFiles(outFolder)

var checker = require('./messageChecker')

it.skip('Checked XML Schema validation - DCH-BloodSpotTestOutcome-Bundle', function(){
    var xsd = require('./messageChecker');
    var fileHandler = require('./fileHandling')
    filexsd = './test/xmlSchema/DCH-BloodSpotTestOutcome-Bundle-Example-1.xsd'
    for (const xmlfile of xmlFiles) {
        console.log("Valdating \""+xmlfile+"\" agaist schema \""+filexsd)
        result = xsd.xmlValidate(xmlfile, filexsd)
        expect(result).toEqual(true)
    }
 });

it('Checked \"MessageHeader\" for all generated xml messages', function(){
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

it.skip('Checked \"Provider_unit/Organization\" parameter in the message', function(){
    var i = 0;
        for (const eachOutcome of srcFilecontent.outcomes) {
            //Load generated xml
            console.log("Verifying record "+(i+1)+" from CSV")
            var xmlFormat = fileHandler.getXml2Js(xmlFiles[i])
            checker.checkMessageElementsValue(eachOutcome, "providerUnit", xmlFormat, '//Bundle/entry//Organization/identifier/value')
            i = i+1
        }
 });

});
