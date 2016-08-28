var fs = require('fs');
var xml2js = require('xml2js');

var RSSAdapter = function () {};

/**
 * Parse an RSS feed from a file
 * @param file
 * @param callback Hands back an error or the file
 */
RSSAdapter.fromFile = function(file, callback) {
    fs.readFile(file, function(error, data) {
        if (error !== undefined && error !== null) {
            callback(error);
        } else {
            RSSAdapter.fromString(data, callback);
        }
    });
};

/**
 * Parse an RSS feed from a string
 * @param string Raw XML string to be parsed
 * @param callback Hands back an error or the RSSAdapter object
 */
RSSAdapter.fromString = function(xmlString, callback) {
    xml2js.parseString(xmlString, function (error, result) {
        if (error !== undefined && error !== null) {
            callback(error);
        } else {
            RSSAdapter.fromXML(result, callback);
        }
    });
};

RSSAdapter.fromXML = function(xml, callback) {
    var tracks = [];
    var channel = xml.rss.channel[0];

    for (var i=0; i<channel.item.length; i++) {
        var item = channel.item[i];
        var url = item.enclosure[0].$.url;
        var alexaItem = {
            "title": item.title,
            "url": url
        };
        tracks.push(alexaItem);
    }

    callback(null, tracks);
};

exports = module.exports = RSSAdapter;