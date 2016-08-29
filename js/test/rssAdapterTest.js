var assert = require('assert');
var RSSAdapter = require('../rssAdapter');

describe('RSSAdapter', function() {
    describe('#fromFile', function() {
        it('Correctly parses RSS feed from file', function(done) {
            RSSAdapter.fromFile('js/test/rssFeed.xml', function (error, tracks) {
                assert.equal(tracks.length, 2);
                assert.equal(tracks[0].url, 'https://s3.amazonaws.com/bespoken/streaming/16683-WatchVideo.m4a');
                done();
            });
        });

        it('Correctly parses RSS feed from URL', function(done) {
            RSSAdapter.fromURL('https://s3.amazonaws.com/bespoken/streaming/rssFeed.xml', function (error, tracks) {
                assert.equal(tracks.length, 2);
                assert.equal(tracks[0].url, 'https://s3.amazonaws.com/bespoken/streaming/16683-WatchVideo.m4a');
                done();
            });
        });

        it('Correctly parses RSS feed from HTTP URL', function(done) {
            RSSAdapter.fromURL('http://s3.amazonaws.com/bespoken/streaming/rssFeed.xml?queryString=1', function (error, tracks) {
                assert.equal(tracks.length, 2);
                assert.equal(tracks[0].url, 'https://s3.amazonaws.com/bespoken/streaming/16683-WatchVideo.m4a');
                done();
            });
        });
    });
});


