var expect = require('expect');
var fileHandler = require('./fileHandling');
var checkMessageElementsText = function(srcFormat, elementName, dstXmlFormat, xpathParam) {
    var xpathValue = getXpathElementText(dstXmlFormat, xpathParam)
    console.log("CSV name "+elementName+" and value = "+srcFormat[elementName])
    console.log("XML name "+xpathParam+" and value = "+xpathValue)
    expect(srcFormat[elementName]).toEqual(xpathValue)
}

var checkMessageElementsValue = function(srcFormat, elementName, dstXmlFormat, xpathParam) {
    var xpathValue = getXpathElementValue(dstXmlFormat, xpathParam)
    console.log("CSV name "+elementName+" and value = "+srcFormat[elementName])
    console.log("XML name "+xpathParam+" and value = "+xpathValue)
    expect(xpathValue).toEqual(srcFormat[elementName])
}

var getXpathElementValue = function(xmlFormat, xpathParam, instance) {
    var xpath = require("xml2js-xpath");
    arrayInstance = typeof  instance  === 'number' ? instance : 0;
    //Added try catch to report which xpath search failed
    try{
        var result = xpath.find(xmlFormat, xpathParam)[arrayInstance].$.value
    }catch (e) {
        console.log("Exception when finding xpath element value: "+xpathParam)
        console.log("Error: "+e)
    };
    return result
}

var getXpathElementText = function(xmlFormat, xpathParam) {
    var xpath = require("xml2js-xpath");
    //Added try catch to report which xpath search failed
    try{
        var result = xpath.find(xmlFormat, xpathParam)
    }catch (e) {
        console.log("Exception when finding xpath element text: "+xpathParam)
        console.log("Error: "+e)
    };
    return result[0]
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
        console.log(xmlDoc.validationErrors)
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
    csvToJson
};