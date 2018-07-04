"use strict";
var expect = require('expect');

const logger =  require('./fileHandling').logger;
const xpathGet = require('./xmlHandler').getXpathElementValue;
var checkMessageElementsText = function(srcFormat, elementName, dstXmlFormat, xpathParam) {
    var xpathValue = xpathGet.getXpathElementText(dstXmlFormat, xpathParam);
    logger("CSV name "+elementName+" and value = "+srcFormat[elementName], 4);
    logger("XML name "+xpathParam+" and value = "+xpathValue, 4);
    expect(srcFormat[elementName]).toEqual(xpathValue);
};

var checkMessageElementsValue = function(srcFormat, elementName, dstXmlFormat, xpathParam) {
    var xpathValue = xpathGet.getXpathElementValue(dstXmlFormat, xpathParam);
    logger("CSV name "+elementName+" and value = "+srcFormat[elementName], 4);
    logger("XML name "+xpathParam+" and value = "+xpathValue, 4);
    expect(xpathValue).toEqual(srcFormat[elementName]);
};

module.exports = {
    checkMessageElementsText,
    checkMessageElementsValue
};