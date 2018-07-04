
"use strict";
const expect = require('expect');
// const checker = require('./xmlHandler');
const csvHandler = require('../csvHandler');
const logger =  require('../fileHandling').logger;
//Read Source CSV files from Test Input folder
const srcFiles =  require('../fileHandling').getSourceFiles();
const xpathGetValue = require('../xmlHandler').getXpathElementValue;
const xmlHandler =  require('../xmlHandler');

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

                var xmlHeaderNode = xmlHandler.getXpathNode(xmlFormat, 'MessageHeader');
                expect(xmlHeaderNode.length).toEqual(1);

                expect(xpathGetValue(xmlHeaderNode[0], '/event/display')).toEqual('Blood Spot Test Outcome');
                expect(xpathGetValue(xmlHeaderNode[0], '/event/code')).toEqual('CH035');
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

                    var xmlHeaderNode = xmlHandler.getXpathNode(xmlFormat, 'Organization');
                    expect(xmlHeaderNode.length).toEqual(1);
                    expect(xpathGetValue(xmlHeaderNode[0],'/identifier/value')).toEqual('LAB01');
                    expect(xpathGetValue(xmlHeaderNode[0],'/name')).toEqual('Laboratory 01');
                    expect(xpathGetValue(xmlHeaderNode[0],'/address/line')).toEqual('First line of the address');
                    expect(xpathGetValue(xmlHeaderNode[0],'/address/city')).toEqual('City');
                    expect(xpathGetValue(xmlHeaderNode[0],'/address/district')).toEqual('District');
                    expect(xpathGetValue(xmlHeaderNode[0],'/address/postalCode')).toEqual('Post Code');
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

                    var xmlHeaderNode = xmlHandler.getXpathNode(xmlFormat, 'HealthcareService');
                    expect(xmlHeaderNode.length).toEqual(1);
                    expect(xpathGetValue(xmlHeaderNode[0],'/type/coding/code')).toEqual('C09');
                    expect(xpathGetValue(xmlHeaderNode[0],'/type/coding/display')).toEqual('Screener (in a National Screening Programme)');
                    expect(xpathGetValue(xmlHeaderNode[0],'/providedBy/display')).toEqual('Laboratory 01');
                    expect(xpathGetValue(xmlHeaderNode[0],'/specialty/coding/code')).toEqual('560');
                    expect(xpathGetValue(xmlHeaderNode[0],'/specialty/coding/display')).toEqual('MIDWIFE EPISODE');
                    expect(xpathGetValue(xmlHeaderNode[0],'/telecom/system')).toEqual('phone');
                    expect(xpathGetValue(xmlHeaderNode[0],'/telecom/value')).toEqual('0113 123 4567');
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

                    var xmlHeaderNode = xmlHandler.getXpathNode(xmlFormat, 'Patient');
                    expect(xmlHeaderNode.length).toEqual(1);
                    //Verifying Patient's name details
                    expect(xpathGetValue(xmlHeaderNode[0],'/name/use')).toEqual('official');
                    expect(xpathGetValue(xmlHeaderNode[0],'/name/family')).toEqual(csvRecord['Surname']);
                    expect(xpathGetValue(xmlHeaderNode[0],'/name/given')).toEqual(csvRecord['First_Name']);
                    var date = csvRecord['Date_Of_Birth'].split("/").reverse().join("-");
                     expect(xpathGetValue(xmlHeaderNode[0],'/birthDate')).toEqual(date);
                      //Verifying Patient's gender
                    var genderConfig = {"0":"unknown", "1":"male",  "2":"female",  "9":"other",};
                    var gender = genderConfig[csvRecord['Gender_Code']];
                    expect(xpathGetValue(xmlHeaderNode[0],'/gender')).toEqual(gender);

                     //Verifying Patient's address
                     expect(xpathGetValue(xmlHeaderNode[0],'/address/use')).toEqual('home');
                     expect(xpathGetValue(xmlHeaderNode[0],'/address/line',0)).toEqual(csvRecord['Address_1']);
                     expect(xpathGetValue(xmlHeaderNode[0],'/address/line',1)).toEqual(csvRecord['Address_2']);
                     expect(xpathGetValue(xmlHeaderNode[0],'/address/line',2)).toEqual(csvRecord['Address_3']);
                     expect(xpathGetValue(xmlHeaderNode[0],'/address/line',3)).toEqual(csvRecord['Address_4']);
                     expect(xpathGetValue(xmlHeaderNode[0],'/address/line',4)).toEqual(csvRecord['Address_5']);
                    
                      //Verifying Patient's ID
                      var nhsNumber = csvRecord['nhs_no'].replace(/\s/g, "");
                      expect(xpathGetValue(xmlHeaderNode[0],'/identifier/value')).toEqual(nhsNumber);
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
                    
                    var xmlHeaderNode = xmlHandler.getXpathNode(xmlFormat, 'DiagnosticReport');
                    expect(xmlHeaderNode.length).toEqual(1);
                
                     //Verifying DiagnosticReport 
                     expect(xpathGetValue(xmlHeaderNode[0],'/status')).toEqual('final');
                     expect(xpathGetValue(xmlHeaderNode[0],'/code/coding/code')).toEqual('86637100000010');
                     expect(xpathGetValue(xmlHeaderNode[0],'/code/coding/display')).toEqual('Child Screening Report (record artifact)');
                     var regex = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])T\d\d:\d\d:\d\d\.\d\d\dZ$/;
                    var date_ = xpathGetValue(xmlHeaderNode[0],'/issued');
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
                    
                    var xmlHeaderNode = xmlHandler.getXpathNode(xmlFormat, 'Encounter');
                    expect(xmlHeaderNode.length).toEqual(1);
                
                     //Verifying DiagnosticReport 
                     expect(xpathGetValue(xmlHeaderNode[0],'/status')).toEqual('finished');
                     expect(xpathGetValue(xmlHeaderNode[0],'/subject/display')).toEqual(`${csvRecord['Surname']}, ${csvRecord['First_Name']}`);
                     var date_of_collection = csvRecord['Date_Of_Collection'].split("/").reverse().join("-");
                     expect(xpathGetValue(xmlHeaderNode[0],'/period/start')).toEqual(date_of_collection);
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
                    
                    var xmlHeaderNode = xmlHandler.getXpathNode(xmlFormat, 'Location');
                    expect(xmlHeaderNode.length).toEqual(1);
                
                     //Verifying Location 
                     expect(xpathGetValue(xmlHeaderNode[0],'/identifier/value')).toEqual('LAB01');
                }
        }
     });