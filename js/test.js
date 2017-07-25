var request = require('request');


function httpGet(url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);
            var events = JSON.parse(body);
            callback(events);
        }
    });
}

function processEvents(events) {
    var track_ids = [];
    for (var i = 0; i < events.length; i++) {
        // console.log(events[i]);
        // console.log(events[i].sc_track_id);
        track_ids.push(events[i].sc_track_id)
    }
    console.log(track_ids);
    return track_ids;
}

httpGet('http://www.nightfly.fm/display/30.2478168,-97.7724371/2017-07-28', processEvents);

// TODO use http://www.nightfly.fm/stream/185706521 to get the MP3 link





