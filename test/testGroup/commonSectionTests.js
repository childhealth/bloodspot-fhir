
"use strict";
const expect = require('expect');
const fileHandler = require('../fileHandling');
// const checker = require('./xmlHandler');
const csvHandler = require('../csvHandler');
const logger =  require('../fileHandling').logger;
//Read Source CSV files from Test Input folder
const srcFiles = fileHandler.getFiles('test/testInput');
const xpathGetValue = require('../xmlHandler').getXpathElementValue;
const xmlHandler =  require('../xmlHandler');

    it('should updated with right "MessageHeader" for all generated xml messages', function(){
        logger("Verifying XML file for \"MessageHeader\" section", 3);
        for (const csvFile of srcFiles) {
            var xmlFiles = fileHandler.getFiles('testOutput/'+csvFile.split('.')[0].split('/')[2]);
            for (const file of xmlFiles) {
                //Load generated xml
                logger("Verifying XML file \""+file+"\" header with CSV file: "+csvFile, 4);
                var json = fileHandler.getXml2Js(file);
                var headerMessage = xpathGetValue(json, '//MessageHeader//event/display');
                var headerCode = xpathGetValue(json, '//MessageHeader//event/code');
                expect(headerMessage).toEqual('Blood Spot Test Outcome');
                expect(headerCode).toEqual('CH035');
            }
        }
    });
    
    it('should be encoded correctly the "Organization" parameter in the XML message', function(){
        logger("Verifying XML file for \"Organization\" section", 3);
        for (const csvFile of srcFiles) {
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = fileHandler.getFiles('testOutput/'+csvFile.split('.')[0].split('/')[2]);

                for (let csvRecord of source) {
                        //Load generated xml
                    logger("Verifying record "+ (source.indexOf(csvRecord)+1)+" from CSV: "+csvFile, 4);
                    var xmlFile= xmlFiles.filter((value) => {return value.includes(`message-${ source.indexOf(csvRecord)+1}.xml`);})[0];
                    var xmlFormat = xmlHandler.getXpathNode(fileHandler.getXml2Js(xmlFile), 'Organization');
                    expect(xmlFormat.length).toEqual(1);
                    expect(xpathGetValue(xmlFormat[0],'/identifier/value')).toEqual('LAB01');
                    expect(xpathGetValue(xmlFormat[0],'/name')).toEqual('Laboratory 01');
                    expect(xpathGetValue(xmlFormat[0],'/address/line')).toEqual('First line of the address');
                    expect(xpathGetValue(xmlFormat[0],'/address/city')).toEqual('City');
                    expect(xpathGetValue(xmlFormat[0],'/address/district')).toEqual('District');
                    expect(xpathGetValue(xmlFormat[0],'/address/postalCode')).toEqual('Post Code');
                }
        }
     });

     it('should be encoded correctly the "HealthcareService" parameter in the XML message', function(){
        logger("Verifying XML file for \"HealthcareService\" section", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = fileHandler.getFiles('testOutput/'+csvFile.split('.')[0].split('/')[2]);
                for (let csvRecord of source) {
                    //Load generated xml
                    logger("Verifying record "+ (source.indexOf(csvRecord)+1) +" from CSV: "+csvFile, 4);
                    var xmlFile= xmlFiles.filter((value) => {return value.includes(`message-${ source.indexOf(csvRecord)+1}.xml`);})[0];
                    var xmlFormat = xmlHandler.getXpathNode(fileHandler.getXml2Js(xmlFile), 'HealthcareService');
                    expect(xmlFormat.length).toEqual(1);
                    expect(xpathGetValue(xmlFormat[0],'/type/coding/code')).toEqual('C09');
                    expect(xpathGetValue(xmlFormat[0],'/type/coding/display')).toEqual('Screener (in a National Screening Programme)');
                    expect(xpathGetValue(xmlFormat[0],'/providedBy/display')).toEqual('Laboratory 01');
                    expect(xpathGetValue(xmlFormat[0],'/specialty/coding/code')).toEqual('560');
                    expect(xpathGetValue(xmlFormat[0],'/specialty/coding/display')).toEqual('MIDWIFE EPISODE');
                    expect(xpathGetValue(xmlFormat[0],'/specialty/coding/display')).toEqual('MIDWIFE EPISODE');
                    expect(xpathGetValue(xmlFormat[0],'/telecom/system')).toEqual('phone');
                    expect(xpathGetValue(xmlFormat[0],'/telecom/value')).toEqual('0113 123 4567');
                }
        }
     });

     it('should be encoded correctly the "Patient" details in the XML message', function(){
        logger("Verifying XML file for \"Patient\" section", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = fileHandler.getFiles('testOutput/'+csvFile.split('.')[0].split('/')[2]);
                for (let csvRecord of source) {
                    //Load generated xml
                    var xmlFile= xmlFiles.filter((value) => {return value.includes(`message-${ source.indexOf(csvRecord)+1}.xml`);})[0];
                    logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                    var xmlFormat = xmlHandler.getXpathNode(fileHandler.getXml2Js(xmlFile), 'Patient');
                    expect(xmlFormat.length).toEqual(1);
                    //Verifying Patient's name details
                    expect(xpathGetValue(xmlFormat[0],'/name/use')).toEqual('official');
                    expect(xpathGetValue(xmlFormat[0],'/name/family')).toEqual(csvRecord['Surname']);
                    expect(xpathGetValue(xmlFormat[0],'/name/given')).toEqual(csvRecord['First_Name']);
                    var date = csvRecord['Date_Of_Birth'].split("/").reverse().join("-");
                     expect(xpathGetValue(xmlFormat[0],'/birthDate')).toEqual(date);
                      //Verifying Patient's gender
                    var genderConfig = {"0":"unknown", "1":"male",  "2":"female",  "9":"other",};
                    var gender = genderConfig[csvRecord['Gender_Code']];
                    expect(xpathGetValue(xmlFormat[0],'/gender')).toEqual(gender);

                     //Verifying Patient's address
                     expect(xpathGetValue(xmlFormat[0],'/address/use')).toEqual('home');
                     expect(xpathGetValue(xmlFormat[0],'/address/line',0)).toEqual(csvRecord['Address_1']);
                     expect(xpathGetValue(xmlFormat[0],'/address/line',1)).toEqual(csvRecord['Address_2']);
                     expect(xpathGetValue(xmlFormat[0],'/address/line',2)).toEqual(csvRecord['Address_3']);
                     expect(xpathGetValue(xmlFormat[0],'/address/line',3)).toEqual(csvRecord['Address_4']);
                     expect(xpathGetValue(xmlFormat[0],'/address/line',4)).toEqual(csvRecord['Address_5']);
                    
                      //Verifying Patient's ID
                      var nhsNumber = csvRecord['nhs_no'].replace(/\s/g, "");
                      expect(xpathGetValue(xmlFormat[0],'/identifier/value')).toEqual(nhsNumber);
                }
        }
     });

     it('should be encoded correctly the "DiagnosticReport" in the XML message', function(){
        logger("Verifying XML file for \"DiagnosticReport\" section", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = fileHandler.getFiles('testOutput/'+csvFile.split('.')[0].split('/')[2]);
                for (let csvRecord of source) {
                    //Load generated xml
                    var xmlFile = xmlFiles.filter((value) => {return value.includes(`message-${source.indexOf(csvRecord)+1}.xml`);})[0];
                    logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                    var xmlFormat = xmlHandler.getXpathNode(fileHandler.getXml2Js(xmlFile), 'DiagnosticReport');
                    expect(xmlFormat.length).toEqual(1);
                
                     //Verifying DiagnosticReport 
                     expect(xpathGetValue(xmlFormat[0],'/status')).toEqual('final');
                     expect(xpathGetValue(xmlFormat[0],'/code/coding/code')).toEqual('86637100000010');
                     expect(xpathGetValue(xmlFormat[0],'/code/coding/display')).toEqual('Child Screening Report (record artifact)');
                     var regex = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])T\d\d:\d\d:\d\d\.\d\d\dZ$/;
                    var date_ = xpathGetValue(xmlFormat[0],'/issued');
                    expect(date_).toMatch(RegExp(regex));
                }
        }
 
     });

     it('should be encoded correctly the "Encounter" in the XML message', function(){
        logger("Verifying XML file for \"Encounter\" section", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = fileHandler.getFiles('testOutput/'+csvFile.split('.')[0].split('/')[2]);
                for (let csvRecord of source) {
                    //Load generated xml
                    var xmlFile= xmlFiles.filter((value) => {return value.includes(`message-${source.indexOf(csvRecord)+1}.xml`);})[0];
                    logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                    var xmlFormat = xmlHandler.getXpathNode(fileHandler.getXml2Js(xmlFile), 'Encounter');
                    expect(xmlFormat.length).toEqual(1);
                
                     //Verifying DiagnosticReport 
                     expect(xpathGetValue(xmlFormat[0],'/status')).toEqual('finished');
                     expect(xpathGetValue(xmlFormat[0],'/subject/display')).toEqual(`${csvRecord['Surname']}, ${csvRecord['First_Name']}`);
                     var date_of_collection = csvRecord['Date_Of_Collection'].split("/").reverse().join("-");
                     expect(xpathGetValue(xmlFormat[0],'/period/start')).toEqual(date_of_collection);
                }
        }
     });

     it('should be encoded correctly the "Location" in the XML message', function(){
        logger("Verifying XML file for \"Location\" section", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = fileHandler.getFiles('testOutput/'+csvFile.split('.')[0].split('/')[2]);
                for (let csvRecord of source) {
                    //Load generated xml
                    var xmlFile= xmlFiles.filter((value) => {return value.includes(`message-${source.indexOf(csvRecord)+1}.xml`);})[0];
                    logger("Verifying XML file \""+xmlFile+"\" with CSV file: "+csvFile, 4);
                    var xmlFormat = xmlHandler.getXpathNode(fileHandler.getXml2Js(xmlFile), 'Location');
                    expect(xmlFormat.length).toEqual(1);
                
                     //Verifying Location 
                     expect(xpathGetValue(xmlFormat[0],'/identifier/value')).toEqual('LAB01');
                }
        }
     });