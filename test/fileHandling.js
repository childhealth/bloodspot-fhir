"use strict";
const config = require('./test-config.json');
const level = {1 : "ERRORS:: ", 2 : "WARN:: ", 3 : "INFO:: ", 4 : "DEBUG:: "};
const configLevel = config['debug'] ? 4 : config['info'] ? 3 : 2;
const conoleLog = config['console'];

const fs = require('fs');
var stream = null;
var startLog = function(fileName){
    stream = fs.createWriteStream("./testOutput/"+fileName, { flags: 'a' });
    stream.once('open', function() {
        stream.write("=================================================================="+'\n');
        stream.write("Logginng started for test :"+new Date().toUTCString()+'\n');
    });
};

var writeLog = function(message){
    if (stream === null) throw "Log file not opened - Cannot write log to file";
    stream.write(message+'\n');
};

var endLog = function(){
    stream.write("Test completed "+new Date().toUTCString()+'\n');
    stream.write("=================================================================="+'\n');
    stream.end();
};

var getFiles = function(dir){
    var files_ = [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);        } else {
            files_.push(name);
        }
    }
    return files_;
};

var readFile = function(fileName){
    var stringFile = fs.readFileSync(fileName).toString();
    return stringFile;
};

var getXml2Js = function(file){
    var xml2js = require("xml2js");
    var xml =  this.readFile(file);
    var res = null;
    xml2js.parseString(xml, function(err, json){
        if(err) throw err;
        res = json;
    });
    return res;
};

var fileExists = function(path){
    if (fs.existsSync(path)) {
        return true;
    }else{
        return false;
    }
};


var rmFolders = function(path){
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file){
          var curPath = path + "/" + file;
          if(fs.lstatSync(curPath).isDirectory()) { // recurse
            rmFolders(curPath);
          } else { // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
      }
};
// logger for all test activities
var logger = function(message, loglevel){
    if (loglevel <= configLevel ){
        if (conoleLog){
        console.log(colors[loglevel],level[loglevel]+ message, colors.Reset);
    }
    writeLog(level[loglevel]+ message);
    }
};

const colors = {
    1: "\x1b[31m",
    2: "\x1b[33m",
    3: "\x1b[32m",
    4: "\x1b[36m",
    Reset: "\x1b[0m",
   };

module.exports = {
    getFiles,
    getXml2Js,
    readFile,
    fileExists,
    rmFolders,
    logger,
    startLog,
    endLog
};