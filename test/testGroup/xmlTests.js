
"use strict";
const expect = require('expect');
// const checker = require('./xmlHandler');
const csvHandler = require('../csvHandler');
const logger =  require('../fileHandling').logger;
//Read Source CSV files from Test Input folder
const srcFiles =  require('../fileHandling').getSourceFiles();
const xmlHandler =  require('../xmlHandler');

    it('should pass XML validation against Schema - DCH-BloodSpotTestOutcome-Bundle', function(){
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            logger("Verifying CSV file \""+csvFile+"\"  with \""+source.length+"\" records ", 3);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
            //Verify number of XML files is same as CSV records in the CSV file
            expect(xmlFiles.length).toEqual(source.length);

            //Using modified schema due to differences between sample data and actual spec
            // The schema generated of : https://fhir.nhs.uk/STU3/Examples/DCH-BloodSpotTestOutcome-Bundle-Example-1.xml
            // filexsd = './test/xmlSchema/DCH-BloodSpotTestOutcome-Bundle-Example-1.xsd'
            const filexsd = './test/xmlSchema/DCH-BloodSpotTestOutcome-Bundle-Example-1-modified.xsd';
            for (const csvRecord of source) {
                var csvIndex =  source.indexOf(csvRecord)+1;
                logger("Valdating \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" agaist schema \""+filexsd, 4);
                var xmlfile = xmlHandler.getXMLFile(xmlFiles, csvIndex);
                var result = xmlHandler.xmlValidate(xmlfile, filexsd);
                expect(result).toBeTruthy();
            }
        }

     });
