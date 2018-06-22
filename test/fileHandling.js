var getFiles = function(dir){
    files_ = [];
    const fs = require('fs');
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);        } else {
            files_.push(name);
        }
    }
    return files_;
}

var readFile = function(fileName){
//To be implemented a function for reading and parsing CSV files.
}

var getXml2Js = function(file){
    var xml2js = require("xml2js");
    var xpath = require("xml2js-xpath");
    const fs = require('fs');

    var xml = fs.readFileSync(file).toString();
    xml2js.parseString(xml, function(err, json){
        if(err) throw err;
        res = json
    });
    return res;
}

module.exports = {
    getFiles,
    getXml2Js
};