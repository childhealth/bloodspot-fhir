const logger =  require('./fileHandling').logger;
var fileHandler = require('./fileHandling');
var xpath = require("xml2js-xpath");

class xpathParser {
    constructor(xmlData){
        this.xmlData = xmlData;
    }
    valueOf(xpath, instance){
       return getXpathElementValue(this.xmlData, xpath, instance);
    }
}

var getXpathElementText = function(xmlFormat, xpathParam) {
    //Added try catch to report which xpath search failed
    try{
        var result = xpath.find(xmlFormat, xpathParam);
    }catch (e) {
        logger("Exception when finding xpath element text: "+xpathParam, 2);
        logger("Error: "+e, 1);
    }
    return result[0];
};


var getSubElementProcedure = function(xmlFormat, procedureCode) {
    //Added try catch to report which xpath search failed
    try{
        var subElements = xpath.find(xmlFormat, '//Bundle//resource');

        for (var subElement of subElements){
            if (xpath.find(subElement, '//Procedure').length > 0){
                var subElementValue = getXpathElementValue(subElement, '//Procedure/code/coding/code');
                if (subElementValue == procedureCode) {
                    return subElement;
                }
            }
        }
    }catch (e) {
        logger("Exception in xpath find", 2);
        logger("Exception: "+e, 1);
    }
};

var getXpathBundleNode = function(xmlFormat, nodename) {
    return getXpathNode(xmlFormat, '//Bundle//'+nodename);
};

var getXpathNode = function(xmlFormat, nodename) {
    //Added try catch to report which xpath search failed
    try{
       return xpath.find(xmlFormat, nodename);
    }catch (e) {
        logger("Exception in xpath find", 2);
        logger("Exception: "+e, 1);
    }
};

var getXpathElementValue = function(xmlFormat, xpathParam, instance) {
    var arrayInstance = typeof  instance  === 'number' ? instance : 0;
    //Added try catch to report which xpath search failed
    try{
        var result = xpath.find(xmlFormat, xpathParam)[arrayInstance].$.value;
    }catch (e) {
        logger("Exception when finding xpath element value: "+xpathParam, 2);
        logger("Error: "+e, 1);
    }
    return result;
};

var xmlValidate = function(xmlFilePath, xsdFilePath) {
    var xsdparser = require('libxmljs');
    var xsdDoc = xsdparser.parseXmlString(fileHandler.readFile(xsdFilePath));
    var xmlDoc = xsdparser.parseXmlString(fileHandler.readFile(xmlFilePath));
    var xmlValidationStatus = xmlDoc.validate(xsdDoc);
    if (xmlDoc.validationErrors.length > 0){
        logger(xmlDoc.validationErrors, 1);
        return false;
    }
    return xmlValidationStatus;
};

var getXml2Js = function(xmlFiles, index){
    var xml2js = require("xml2js");
    var xmlFile = this.getXMLFile(xmlFiles, index);
    var xml =  fileHandler.readFile(xmlFile);
    var res = null;
    xml2js.parseString(xml, function(err, json){
        if(err) throw err;
        res = json;
    });
    return res;
};

var getXMLFiles = function(sourceCSVFile) {
    return fileHandler.getFiles('testOutput/'+sourceCSVFile.split('.')[0].split('/')[2]);
};

var getXMLFile = function(xmlFiles, csvRecordIndex) {
    return xmlFiles.filter((value) => {return value.includes(`message-${csvRecordIndex}.xml`);})[0];
};

module.exports = {
    getXpathElementValue,
    getXpathElementText,
    xmlValidate,
    getSubElementProcedure,
    getXpathBundleNode,
    getXpathNode,
    getXml2Js,
    getXMLFiles,
    getXMLFile,
    xpathParser
};