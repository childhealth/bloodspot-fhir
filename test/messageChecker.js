var expect = require('expect');
var checkMessageElements = function(srcFormat, elementName, dstXmlFormat, xpathParam) {
    var xpathValue = getXpathElementText(dstXmlFormat, xpathParam)
    console.log("CSV name "+elementName+" and value = "+srcFormat[elementName])
    console.log("XML name "+xpathParam+" and value = "+xpathValue)
    expect(srcFormat[elementName]).toEqual(xpathValue)
}

var getXpathElementValue = function(xmlFormat, xpathParam) {
    var xpath = require("xml2js-xpath");
    var result = xpath.find(xmlFormat, xpathParam)
    return result[0].$.value
}

var getXpathElementText = function(xmlFormat, xpathParam) {
    var xpath = require("xml2js-xpath");
    var result = xpath.find(xmlFormat, xpathParam)
    return result[0]
}


module.exports = {
    checkMessageElements,
    getXpathElementValue,
    getXpathElementText
};