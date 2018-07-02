const fs = require('fs');
var getFiles = function(dir){
    files_ = [];
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
    var stringFile = fs.readFileSync(fileName).toString();
    return stringFile
}

var getXml2Js = function(file){
    var xml2js = require("xml2js");
    var xpath = require("xml2js-xpath");

    var xml =  this.readFile(file);
    xml2js.parseString(xml, function(err, json){
        if(err) throw err;
        res = json
    });
    return res;
}

var fileExists = function(path){
    if (fs.existsSync(path)) {
        return true
    }else{
        return false
    }
};


var rmFolders = function(path){
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
          var curPath = path + "/" + file;
          if(fs.lstatSync(curPath).isDirectory()) { // recurse
            deleteFolderRecursive(curPath);
          } else { // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
      }
};

var logger = function(message, loglevel){
    level = {1 : "INFO:: ", 2 : "WARN:: ", 3 : "DEBUG:: "}
    if (loglevel !== 3){
        console.log(level[loglevel]+ message)
    }
};

module.exports = {
    getFiles,
    getXml2Js,
    readFile,
    fileExists,
    rmFolders,
    logger
};