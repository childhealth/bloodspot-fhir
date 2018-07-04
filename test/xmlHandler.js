const logger =  require('./fileHandling').logger;
var fileHandler = require('./fileHandling');
var xpath = require("xml2js-xpath");
var getXpathElementText = function(xmlFormat, xpathParam) {
    xpath = require("xml2js-xpath");
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
    xpath = require("xml2js-xpath");
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

var getXpathNode = function(xmlFormat, nodename) {
    //Added try catch to report which xpath search failed
    try{
       return xpath.find(xmlFormat, '//Bundle//'+nodename);
    }catch (e) {
        logger("Exception in xpath find", 2);
        logger("Exception: "+e, 1);
    }
};

var getXpathElementValue = function(xmlFormat, xpathParam, instance) {
    var xpath = require("xml2js-xpath");
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

module.exports = {
    getXpathElementValue,
    getXpathElementText,
    xmlValidate,
    getSubElementProcedure,
    getXpathNode
};