var request = require('request');

// Data types
// OBJECT
//     string
//     number
//     [] (array)
//     Date

function httpGet(url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(typeof body);
            var events = JSON.parse(body);
            // console.log(typeof events);
            console.log("is array?", Array.isArray(events));
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
    // console.log(track_ids);

    // TODO task #1: print a pretty view of events in table form
    // Band Name      Venue Name      Venue Distance
    return track_ids;
}

httpGet('http://www.nightfly.fm/display/30.2478168,-97.7724371/2017-07-28', processEvents);


// TODO task #2: use http://www.nightfly.fm/stream/{sc_track_id} to get the MP3 link and print a list of the MP3s





