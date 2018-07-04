
"use strict";
const expect = require('expect');
// const checker = require('./xmlHandler');
const csvHandler = require('../csvHandler');
const logger =  require('../fileHandling').logger;
//Read Source CSV files from Test Input folder
const srcFiles =  require('../fileHandling').getSourceFiles();
const xmlHandler =  require('../xmlHandler');
const xpathParser = require('../xmlHandler').xpathParser;

    it('should updated with right "MessageHeader" for all generated xml messages', function(){
        logger("Verifying XML file for \"MessageHeader\" section", 3);
        for (const csvFile of srcFiles) {
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
            for (let csvRecord of source) {
                var csvIndex =  source.indexOf(csvRecord)+1;
                //Load generated xml
                logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                var xmlFormat = xmlHandler.getXml2Js(xmlFiles, csvIndex);

                var xmlHeaderNode = xmlHandler.getXpathBundleNode(xmlFormat, 'MessageHeader');
                expect(xmlHeaderNode.length).toEqual(1);
                var msgheader = new xpathParser(xmlHeaderNode[0]);
                expect(msgheader.valueOf('/event/display')).toEqual('Blood Spot Test Outcome');
                expect(msgheader.valueOf( '/event/code')).toEqual('CH035');
            }
        }
    });
    
    it('should be encoded correctly the "Organization" parameter in the XML message', function(){
        logger("Verifying XML file for \"Organization\" section", 3);
        for (const csvFile of srcFiles) {
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);

                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    var xmlFormat = xmlHandler.getXml2Js(xmlFiles, csvIndex);

                    var xmlHeaderNode = xmlHandler.getXpathBundleNode(xmlFormat, 'Organization');
                    expect(xmlHeaderNode.length).toEqual(1);
                    var organization = new xpathParser(xmlHeaderNode[0]);
                    expect(organization.valueOf('/identifier/value')).toEqual('LAB01');
                    expect(organization.valueOf('/name')).toEqual('Laboratory 01');
                    expect(organization.valueOf('/address/line')).toEqual('First line of the address');
                    expect(organization.valueOf('/address/city')).toEqual('City');
                    expect(organization.valueOf('/address/district')).toEqual('District');
                    expect(organization.valueOf('/address/postalCode')).toEqual('Post Code');
                }
        }
     });

     it('should be encoded correctly the "HealthcareService" parameter in the XML message', function(){
        logger("Verifying XML file for \"HealthcareService\" section", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    var xmlFormat = xmlHandler.getXml2Js(xmlFiles, csvIndex);

                    var xmlHeaderNode = xmlHandler.getXpathBundleNode(xmlFormat, 'HealthcareService');
                    expect(xmlHeaderNode.length).toEqual(1);
                    var hcs = new xpathParser(xmlHeaderNode[0]);
                    expect(hcs.valueOf('/type/coding/code')).toEqual('C09');
                    expect(hcs.valueOf('/type/coding/display')).toEqual('Screener (in a National Screening Programme)');
                    expect(hcs.valueOf('/providedBy/display')).toEqual('Laboratory 01');
                    expect(hcs.valueOf('/specialty/coding/code')).toEqual('560');
                    expect(hcs.valueOf('/specialty/coding/display')).toEqual('MIDWIFE EPISODE');
                    expect(hcs.valueOf('/telecom/system')).toEqual('phone');
                    expect(hcs.valueOf('/telecom/value')).toEqual('0113 123 4567');
                }
        }
     });

     it('should be encoded correctly the "Patient" details in the XML message', function(){
        logger("Verifying XML file for \"Patient\" section", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    var xmlFormat = xmlHandler.getXml2Js(xmlFiles, csvIndex);

                    var xmlHeaderNode = xmlHandler.getXpathBundleNode(xmlFormat, 'Patient');
                    expect(xmlHeaderNode.length).toEqual(1);
                    var patient = new xpathParser(xmlHeaderNode[0]);
                    //Verifying Patient's name details
                    expect(patient.valueOf('/name/use')).toEqual('official');
                    expect(patient.valueOf('/name/family')).toEqual(csvRecord['Surname']);
                    expect(patient.valueOf('/name/given')).toEqual(csvRecord['First_Name']);
                    var date = csvRecord['Date_Of_Birth'].split("/").reverse().join("-");
                     expect(patient.valueOf('/birthDate')).toEqual(date);
                      //Verifying Patient's gender
                    var genderConfig = {"0":"unknown", "1":"male",  "2":"female",  "9":"other",};
                    var gender = genderConfig[csvRecord['Gender_Code']];
                    expect(patient.valueOf('/gender')).toEqual(gender);

                     //Verifying Patient's address
                     expect(patient.valueOf('/address/use')).toEqual('home');
                     expect(patient.valueOf('/address/line',0)).toEqual(csvRecord['Address_1']);
                     expect(patient.valueOf('/address/line',1)).toEqual(csvRecord['Address_2']);
                     expect(patient.valueOf('/address/line',2)).toEqual(csvRecord['Address_3']);
                     expect(patient.valueOf('/address/line',3)).toEqual(csvRecord['Address_4']);
                     expect(patient.valueOf('/address/line',4)).toEqual(csvRecord['Address_5']);
                    
                      //Verifying Patient's ID
                      var nhsNumber = csvRecord['nhs_no'].replace(/\s/g, "");
                      expect(patient.valueOf('/identifier/value')).toEqual(nhsNumber);
                }
        }
     });

     it('should be encoded correctly the "DiagnosticReport" in the XML message', function(){
        logger("Verifying XML file for \"DiagnosticReport\" section", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    var xmlFormat = xmlHandler.getXml2Js(xmlFiles, csvIndex);
                    
                    var xmlHeaderNode = xmlHandler.getXpathBundleNode(xmlFormat, 'DiagnosticReport');
                    expect(xmlHeaderNode.length).toEqual(1);
                    var diag = new xpathParser(xmlHeaderNode[0]);
                     //Verifying DiagnosticReport 
                     expect(diag.valueOf('/status')).toEqual('final');
                     expect(diag.valueOf('/code/coding/code')).toEqual('86637100000010');
                     expect(diag.valueOf('/code/coding/display')).toEqual('Child Screening Report (record artifact)');
                     var regex = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])T\d\d:\d\d:\d\d\.\d\d\dZ$/;
                    var date_ = diag.valueOf('/issued');
                    expect(date_).toMatch(RegExp(regex));
                }
        }
 
     });

     it('should be encoded correctly the "Encounter" in the XML message', function(){
        logger("Verifying XML file for \"Encounter\" section", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    var xmlFormat = xmlHandler.getXml2Js(xmlFiles, csvIndex);
                    
                    var xmlHeaderNode = xmlHandler.getXpathBundleNode(xmlFormat, 'Encounter');
                    expect(xmlHeaderNode.length).toEqual(1);
                    var encounter = new xpathParser(xmlHeaderNode[0]);
                     //Verifying DiagnosticReport 
                     expect(encounter.valueOf('/status')).toEqual('finished');
                     expect(encounter.valueOf('/subject/display')).toEqual(`${csvRecord['Surname']}, ${csvRecord['First_Name']}`);
                     var date_of_collection = csvRecord['Date_Of_Collection'].split("/").reverse().join("-");
                     expect(encounter.valueOf('/period/start')).toEqual(date_of_collection);
                }
        }
     });

     it('should be encoded correctly the "Location" in the XML message', function(){
        logger("Verifying XML file for \"Location\" section", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    var xmlFormat = xmlHandler.getXml2Js(xmlFiles, csvIndex);
                    var xmlHeaderNode = xmlHandler.getXpathBundleNode(xmlFormat, 'Location');
                    expect(xmlHeaderNode.length).toEqual(1);
                    var location = new xpathParser(xmlHeaderNode[0]);
                     //Verifying Location 
                     expect(location.valueOf('/identifier/value')).toEqual('LAB01');
                }
        }
     });