var request = require('request');


function httpGet(url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var events = JSON.parse(body);
            callback(response);
        }
    });
}

function processEvents(events) {
    var track_ids = [];
    for (var i = 0; i < events.length; i++) {
        var event = {"track_id": events[i].sc_track_id, "": events[i].sc_track_id};
        track_ids.push(event)
    }
    return track_ids;
}

httpGet('http://www.nightfly.fm/display/30.2478168,-97.7724371/2017-07-28', processEvents);
