var fs = require('fs');
var http = require('http');
var https = require('https');
var url = require('url');
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
 * Parse an RSS feed from a file
 * @param file
 * @param callback Hands back an error or the file
 */
RSSAdapter.fromURL = function(rssUrlString, callback) {
    var rssUrl = url.parse(rssUrlString);
    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
        host: rssUrl.host,
        path: rssUrl.path
    };

    var caller = http;
    if (rssUrl.protocol === 'https:') {
        caller = https;
    }

    var httpCallback = function(response) {
        var payload = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            payload += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            RSSAdapter.fromString(payload, callback);
        });
    };

    caller.request(options, httpCallback).end();
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
            'title': item.title,
            'url': url
        };
        tracks.push(alexaItem);
    }

    callback(null, tracks);
};

exports = module.exports = RSSAdapter;