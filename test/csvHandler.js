var fileHandler = require('./fileHandling');
/*
 * Convert a CSV file to JSON
 */
var csvToJson = function(csvFile) {
    var localFile = fileHandler.readFile(csvFile);
    var data = localFile.split("\n");

    // Get first row for column headers
    var headers = data.shift().split(",");
    
    var json = [];    
    data.forEach(function(d){
        // Loop through each row
        var tmp = {};
        var row = d.split(",");
        for(var i = 0; i < headers.length; i++){
            //Trimming header value as white space added on each element in the source
            tmp[headers[i].trim()] = row[i];
        }
        // Add object to list
        json.push(tmp);
    });
    return json;
};

module.exports = {
    csvToJson
};