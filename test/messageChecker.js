var expect = require('expect');
var fileHandler = require('./fileHandling');
const logger =  require('./fileHandling').logger;
var checkMessageElementsText = function(srcFormat, elementName, dstXmlFormat, xpathParam) {
    var xpathValue = getXpathElementText(dstXmlFormat, xpathParam)
    logger("CSV name "+elementName+" and value = "+srcFormat[elementName], 4)
    logger("XML name "+xpathParam+" and value = "+xpathValue, 4)
    expect(srcFormat[elementName]).toEqual(xpathValue)
}

var checkMessageElementsValue = function(srcFormat, elementName, dstXmlFormat, xpathParam) {
    var xpathValue = getXpathElementValue(dstXmlFormat, xpathParam)
    logger("CSV name "+elementName+" and value = "+srcFormat[elementName], 4)
    logger("XML name "+xpathParam+" and value = "+xpathValue, 4)
    expect(xpathValue).toEqual(srcFormat[elementName])
}

var getXpathElementValue = function(xmlFormat, xpathParam, instance) {
    var xpath = require("xml2js-xpath");
    arrayInstance = typeof  instance  === 'number' ? instance : 0;
    //Added try catch to report which xpath search failed
    try{
        var result = xpath.find(xmlFormat, xpathParam)[arrayInstance].$.value
    }catch (e) {
        logger("Exception when finding xpath element value: "+xpathParam, 2)
        logger("Error: "+e, 1)
    };
    return result
}

var getXpathElementText = function(xmlFormat, xpathParam) {
    var xpath = require("xml2js-xpath");
    //Added try catch to report which xpath search failed
    try{
        var result = xpath.find(xmlFormat, xpathParam)
    }catch (e) {
        logger("Exception when finding xpath element text: "+xpathParam, 2)
        logger("Error: "+e, 1)
    };
    return result[0]
}


var getSubElementProcedure = function(xmlFormat, procedureCode) {
    var xpath = require("xml2js-xpath");
    //Added try catch to report which xpath search failed
    try{
        subElements = xpath.find(xmlFormat, '//Bundle//resource');

        for (subElement of subElements){
            if (xpath.find(subElement, '//Procedure').length > 0){
                subElementValue = getXpathElementValue(subElement, '//Procedure/code/coding/code')
                if (subElementValue == procedureCode) {
                    return subElement;
                }
            }
        }
    }catch (e) {
        logger("Exception in xpath find", 2)
        logger("Exception: "+e, 1)
    };
}

/*
 * Convert a CSV file to JSON
 */
var csvToJson = function(csvFile) {
    var localFile = fileHandler.readFile(csvFile)
    data = localFile.split("\n");

    // Get first row for column headers
    headers = data.shift().split(",");
    
    var json = [];    
    data.forEach(function(d){
        // Loop through each row
        tmp = {}
        row = d.split(",")
        for(var i = 0; i < headers.length; i++){
            //Trimming header value as white space added on each element in the source
            tmp[headers[i].trim()] = row[i];
        }
        // Add object to list
        json.push(tmp);
    });
    return json
};

var xmlValidate = function(xmlFilePath, xsdFilePath) {
    var xsdparser = require('libxmljs');
    var xsdDoc = xsdparser.parseXmlString(fileHandler.readFile(xsdFilePath));
    var xmlDoc = xsdparser.parseXmlString(fileHandler.readFile(xmlFilePath))
    xmlValidationStatus = xmlDoc.validate(xsdDoc);
    if (xmlDoc.validationErrors.length > 0){
        logger(xmlDoc.validationErrors, 1)
        return false
    }
    return xmlValidationStatus
}


module.exports = {
    checkMessageElementsText,
    checkMessageElementsValue,
    getXpathElementValue,
    getXpathElementText,
    xmlValidate,
    csvToJson,
    getSubElementProcedure
};