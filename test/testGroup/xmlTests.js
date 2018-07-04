
"use strict";
const expect = require('expect');
const fileHandler = require('../fileHandling');
// const checker = require('./xmlHandler');
const csvHandler = require('../csvHandler');
const logger =  require('../fileHandling').logger;
//Read Source CSV files from Test Input folder
const srcFiles = fileHandler.getFiles('test/testInput');
const xmlHandler =  require('../xmlHandler');

    it('should pass XML validation against Schema - DCH-BloodSpotTestOutcome-Bundle', function(){
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            logger("Verifying CSV file \""+csvFile+"\"  with \""+source.length+"\" records ", 3);
            var xmlFiles = fileHandler.getFiles('testOutput/'+csvFile.split('.')[0].split('/')[2]);
            //Using modified schema due to differences between sample data and actual spec
            // The schema generated of : https://fhir.nhs.uk/STU3/Examples/DCH-BloodSpotTestOutcome-Bundle-Example-1.xml
            // filexsd = './test/xmlSchema/DCH-BloodSpotTestOutcome-Bundle-Example-1.xsd'
            const filexsd = './test/xmlSchema/DCH-BloodSpotTestOutcome-Bundle-Example-1-modified.xsd';
            for (const xmlfile of xmlFiles) {
                logger("Valdating \""+xmlfile+"\" agaist schema \""+filexsd, 4);
                var result = xmlHandler.xmlValidate(xmlfile, filexsd);
                expect(result).toBeTruthy();
            }
        }

     });
