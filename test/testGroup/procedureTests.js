
"use strict";
const expect = require('expect');
// const checker = require('./xmlHandler');
const csvHandler = require('../csvHandler');
const logger =  require('../fileHandling').logger;
//Read Source CSV files from Test Input folder
const srcFiles =  require('../fileHandling').getSourceFiles();
const xpathSubElement = require('../xmlHandler').getSubElementProcedure;
const xmlHandler =  require('../xmlHandler');
const xpathParser = require('../xmlHandler').xpathParser;
describe('  ***** Verifying Procedures *****', function() {
    it('should be encoded correctly the Procedure "Phenylketonuria screening" in the XML message', function(){
        logger("Verifying XML file for \"Procedures\"", 3);
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    //Load generated xml
                    var procedure = xmlHandler.getXpathNode(xpathSubElement(xmlHandler.getXml2Js(xmlFiles, csvIndex), `314081000`), '//Procedure');
                    var PKU = new xpathParser(procedure[0]);
                    // var test = xmlHandler.getXpathNode(xpathSubElement(xmlHandler.getXml2Js(xmlFiles, csvIndex), `314081000`), '//Procedure');
                     //Verifying Procedure 
                     expect(PKU.valueOf('/status')).toEqual('completed');
                     expect(PKU.valueOf('/code/coding/code')).toEqual(`314081000`);
                     expect(PKU.valueOf('/code/coding/display')).toEqual('Phenylketonuria screening test');
                     //status code replaced by supplementary code if supplementary code not empty
                     var csvPKUCode = csvRecord['PKU_Supplementary_Code'] === '' ? csvRecord['PKU_Status_Code'] : csvRecord['PKU_Supplementary_Code'];
                     var xmlPKUCode = PKU.valueOf('/outcome/coding/code');
                     //XML code length should be 2 or 4
                     expect([2, 4]).toContain(xmlPKUCode.length);
                     //Prefix csv code with 0 if code length is 1 or 3 
                     csvPKUCode = (csvPKUCode.length === 1 || csvPKUCode.length === 3) ? '0'+csvPKUCode : csvPKUCode;
                     expect(xmlPKUCode).toEqual(csvPKUCode);
                     expect(PKU.valueOf('/outcome/coding/display')).toEqual(csvRecord['PKU_Status']);
                }
        }
     });

     it('should be encoded correctly the Procedure "Sickle cell disease screening Procedure" in the XML message', function(){
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    //Load generated xml
                    var procedure = xmlHandler.getXpathNode(xpathSubElement( xmlHandler.getXml2Js(xmlFiles, csvIndex), `314090007`), '//Procedure');
                    var SCD = new xpathParser(procedure[0]);
                     //Verifying Procedure 
                     expect(SCD.valueOf('/status')).toEqual('completed');
                     expect(SCD.valueOf('/code/coding/code')).toEqual(`314090007`);
                     expect(SCD.valueOf('/code/coding/display')).toEqual('Sickle cell disease screening test');
                      //status code replaced by supplementary code if supplementary code not empty
                     var csvSickeCellCode = csvRecord['Sickle_Supplementary_Code'] === '' ? csvRecord['Sickle_Status_Code'] : csvRecord['Sickle_Supplementary_Code'];
                     var xmlSickeCellCode = SCD.valueOf('/outcome/coding/code');
                     //XML code length should 2 or 4
                     expect([2, 4]).toContain(xmlSickeCellCode.length);
                    //Prefix csv code with 0 if code length is 1 or 3 
                     csvSickeCellCode = (csvSickeCellCode.length === 1 || csvSickeCellCode.length === 3) ? '0'+csvSickeCellCode : csvSickeCellCode;
                     expect(xmlSickeCellCode).toEqual(csvSickeCellCode);
                     expect(SCD.valueOf('/outcome/coding/display')).toEqual(csvRecord['Sickle_Status']);
                }
        }
     });

     it('should be encoded correctly the Procedure "Cystic fibrosis screening Procedure" in the XML message', function(){
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);            
                    var procedure = xmlHandler.getXpathNode(xpathSubElement( xmlHandler.getXml2Js(xmlFiles, csvIndex), `314080004`), '//Procedure');
                    var CF = new xpathParser(procedure[0]);
                     //Verifying Procedure 
                     expect(CF.valueOf('/status')).toEqual('completed');
                     expect(CF.valueOf('/code/coding/code')).toEqual(`314080004`);
                     expect(CF.valueOf('/code/coding/display')).toEqual('Cystic fibrosis screening test');
                      //status code replaced by supplementary code if supplementary code not empty
                      var csvCFCode = csvRecord['CF_Supplementary_Code'] === '' ? csvRecord['CF_Status_Code'] : csvRecord['CF_Supplementary_Code'];
                      var xmlCFCode = CF.valueOf('/outcome/coding/code');
                      //XML code length should 2 or 4
                      expect([2, 4]).toContain(xmlCFCode.length);
                     //Prefix csv code with 0 if code length is 1 or 3 
                     csvCFCode = (csvCFCode.length === 1 || csvCFCode.length === 3) ? '0'+csvCFCode : csvCFCode;
                      expect(xmlCFCode).toEqual(csvCFCode);
                     expect(CF.valueOf('/outcome/coding/display')).toEqual(csvRecord['CF_Status']);
                }
        }
     });

     it('should be encoded correctly the Procedure "Congenital hypothyroidism screening Procedure" in the XML message', function(){
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    var procedure = xmlHandler.getXpathNode(xpathSubElement(xmlHandler.getXml2Js(xmlFiles, csvIndex), `400984005`), '//Procedure');
                    var CHT = new xpathParser(procedure[0]);
                     //Verifying Procedure 
                     expect(CHT.valueOf('/status')).toEqual('completed');
                     expect(CHT.valueOf('/code/coding/code')).toEqual(`400984005`);
                     expect(CHT.valueOf('/code/coding/display')).toEqual('Congenital hypothyroidism screening test');
                      //status code replaced by supplementary code if supplementary code not empty
                      var csvCTHCode = csvRecord['CHT_Supplementary_Code'] === '' ? csvRecord['CHT_Status_Code'] : csvRecord['CHT_Supplementary_Code'];
                      var xmlCTHCode = CHT.valueOf('/outcome/coding/code');
                      //XML code length should 2 or 4
                      expect([2, 4]).toContain(xmlCTHCode.length);
                     //Prefix csv code with 0 if code length is 1 or 3 
                     csvCTHCode = (csvCTHCode.length === 1 || csvCTHCode.length === 3) ? '0'+csvCTHCode : csvCTHCode;
                      expect(xmlCTHCode).toEqual(csvCTHCode);
                     expect(CHT.valueOf('/outcome/coding/display')).toEqual(csvRecord['CHT_Status']);
                }
        }
     });

     it('should be encoded correctly the Procedure "Medium-chain acyl-coenzyme A dehydrogenase deficiency screening Procedure" in the XML message', function(){
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
            for (let csvRecord of source) {
                var csvIndex =  source.indexOf(csvRecord)+1;
                //Load generated xml
                logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);        
                var procedure = xmlHandler.getXpathNode(xpathSubElement(xmlHandler.getXml2Js(xmlFiles, csvIndex), `428056008`), '//Procedure');
                var MCADD = new xpathParser(procedure[0]);
                 //Verifying Procedure 
                 expect(MCADD.valueOf('/status')).toEqual('completed');
                 expect(MCADD.valueOf('/code/coding/code')).toEqual(`428056008`);
                 expect(MCADD.valueOf('/code/coding/display')).toEqual('Medium-chain acyl-coenzyme A dehydrogenase deficiency screening test');
                  //status code replaced by supplementary code if supplementary code not empty
                  var csvMCADDCode = csvRecord['MCADD_Supplementary_Code'] === '' ? csvRecord['MCADD_Status_Code'] : csvRecord['MCADD_Supplementary_Code'];
                  var xmlMCADDCode = MCADD.valueOf('/outcome/coding/code');
                  //XML code length should 2 or 4
                  expect([2, 4]).toContain(xmlMCADDCode.length);
                 //Prefix csv code with 0 if code length is 1 or 3 
                  csvMCADDCode = (csvMCADDCode.length === 1 || csvMCADDCode.length === 3) ? '0'+csvMCADDCode : csvMCADDCode;
                  expect(xmlMCADDCode).toEqual(csvMCADDCode);
                  expect( MCADD.valueOf('/outcome/coding/display')).toEqual(csvRecord['MCADD_Status']);
            }
        }
     });

     it('should be encoded correctly the Procedure "Blood spot homocystinuria screening Procedure" in the XML message', function(){
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    var procedure = xmlHandler.getXpathNode(xpathSubElement(xmlHandler.getXml2Js(xmlFiles, csvIndex), `940201000000107`), '//Procedure');
                    var HCU = new xpathParser(procedure[0]);
                     //Verifying Procedure 
                     expect(HCU.valueOf('/status')).toEqual('completed');
                     expect(HCU.valueOf('/code/coding/code')).toEqual(`940201000000107`);
                     expect(HCU.valueOf('/code/coding/display')).toEqual('Blood spot homocystinuria screening test');
                      //status code replaced by supplementary code if supplementary code not empty
                      var csvHCUCode = csvRecord['HCU_Supplementary_Code'] === '' ? csvRecord['HCU_Status_Code'] : csvRecord['HCU_Supplementary_Code'];
                      var xmlHCUCode = HCU.valueOf('/outcome/coding/code');
                      //XML code length should 2 or 4
                      expect([2, 4]).toContain(xmlHCUCode.length);
                     //Prefix csv code with 0 if code length is 1 or 3 
                      csvHCUCode = (csvHCUCode.length === 1 || csvHCUCode.length === 3) ? '0'+csvHCUCode : csvHCUCode;
                      expect(xmlHCUCode).toEqual(csvHCUCode);
                     expect(HCU.valueOf('/outcome/coding/display')).toEqual(csvRecord['HCU_Status']);
                }
        }
     });

     it('should be encoded correctly the Procedure "Blood spot maple syrup urine disease screening Procedure" in the XML message', function(){
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    var procedure = xmlHandler.getXpathNode(xpathSubElement(xmlHandler.getXml2Js(xmlFiles, csvIndex), `940221000000103`), '//Procedure');
                    var MSUD = new xpathParser(procedure[0]);
                     //Verifying Procedure 
                     expect(MSUD.valueOf('/status')).toEqual('completed');
                     expect(MSUD.valueOf('/code/coding/code')).toEqual(`940221000000103`);
                     expect(MSUD.valueOf('/code/coding/display')).toEqual('Blood spot maple syrup urine disease screening test');
                      //status code replaced by supplementary code if supplementary code not empty
                      var csvMSUDCode = csvRecord['MSUD_Supplementary_Code'] === '' ? csvRecord['MSUD_Status_Code'] : csvRecord['MSUD_Supplementary_Code'];
                      var xmlMSUDCode = MSUD.valueOf('/outcome/coding/code');
                      //XML code length should 2 or 4
                      expect([2, 4]).toContain(xmlMSUDCode.length);
                     //Prefix csv code with 0 if code length is 1 or 3 
                      csvMSUDCode = (csvMSUDCode.length === 1 || csvMSUDCode.length === 3) ? '0'+csvMSUDCode : csvMSUDCode;
                      expect(xmlMSUDCode).toEqual(csvMSUDCode);
                     expect(MSUD.valueOf('/outcome/coding/display')).toEqual(csvRecord['MSUD_Status']);
                }
        }
     });

     it('should be encoded correctly the Procedure "Blood spot glutaric aciduria type 1 screening Procedure" in the XML message', function(){
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                     var procedure = xmlHandler.getXpathNode(xpathSubElement(xmlHandler.getXml2Js(xmlFiles, csvIndex), `940131000000109`), '//Procedure');
                     var GA1 = new xpathParser(procedure[0]);
                     //Verifying Procedure 
                     expect(GA1.valueOf('/status')).toEqual('completed');
                     expect(GA1.valueOf('/code/coding/code')).toEqual(`940131000000109`);
                     expect(GA1.valueOf('/code/coding/display')).toEqual('Blood spot glutaric aciduria type 1 screening test');
                      //status code replaced by supplementary code if supplementary code not empty
                      var csvGA1Code = csvRecord['GA1_Supplementary_Code'] === '' ? csvRecord['GA1_Status_Code'] : csvRecord['GA1_Supplementary_Code'];
                      var xmlGA1Code = GA1.valueOf('/outcome/coding/code');
                      //XML code length should 2 or 4
                      expect([2, 4]).toContain(xmlGA1Code.length);
                     //Prefix csv code with 0 if code length is 1 or 3 
                      csvGA1Code = (csvGA1Code.length === 1 || csvGA1Code.length === 3) ? '0'+csvGA1Code : csvGA1Code;
                      expect(xmlGA1Code).toEqual(csvGA1Code);
                     expect(GA1.valueOf('/outcome/coding/display')).toEqual(csvRecord['GA1_Status']);
                }
        }
     });

     it('should be encoded correctly the Procedure "Blood spot isovaleric acidaemia screening Procedure" in the XML message', function(){
        for (const csvFile of srcFiles) {
            //Convert source file to JSON
            var source = csvHandler.csvToJson(csvFile);
            var xmlFiles = xmlHandler.getXMLFiles(csvFile);
                for (let csvRecord of source) {
                    var csvIndex =  source.indexOf(csvRecord)+1;
                    //Load generated xml
                    logger("Verifying XML file \""+xmlHandler.getXMLFile(xmlFiles,csvIndex)+"\" with CSV file: "+csvFile+" index: "+csvIndex, 4);
                    var procedure = xmlHandler.getXpathNode(xpathSubElement(xmlHandler.getXml2Js(xmlFiles, csvIndex), `940151000000102`), '//Procedure');
                    var IVA = new xpathParser(procedure[0]);
                     //Verifying Procedure 
                     expect(IVA.valueOf('/status')).toEqual('completed');
                     expect(IVA.valueOf('/code/coding/code')).toEqual(`940151000000102`);
                     expect(IVA.valueOf('/code/coding/display')).toEqual('Blood spot isovaleric acidaemia screening test');
                      //status code replaced by supplementary code if supplementary code not empty
                      var csvIVACode = csvRecord['IVA_Supplementary_Code'] === '' ? csvRecord['IVA_Status_Code'] : csvRecord['IVA_Supplementary_Code'];
                      var xmlIVACode = IVA.valueOf('/outcome/coding/code');
                      //XML code length should 2 or 4
                      expect([2, 4]).toContain(xmlIVACode.length);
                     //Prefix csv code with 0 if code length is 1 or 3 
                      csvIVACode = (csvIVACode.length === 1 || csvIVACode.length === 3) ? '0'+csvIVACode : csvIVACode;
                      expect(xmlIVACode).toEqual(csvIVACode);
                     expect(IVA.valueOf('/outcome/coding/display')).toEqual(csvRecord['IVA_Status'].replace(/\r|\n/g, ''));
                }
        }
     });
});