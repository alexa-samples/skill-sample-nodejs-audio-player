/// <reference path="../../typings/index.d.ts" />

var assert = require("assert");
var RSSAdapter = require("../rssAdapter");

describe("RSSAdapter", function() {
    describe("#fromFile", function() {
        it("Correctly parses RSS feed", function(done) {
            RSSAdapter.fromFile("js/test/rssFeed.xml", function (error, tracks) {
                assert.equal(tracks.length, 2);
                assert.equal(tracks[0].url, "https://s3.amazonaws.com/bespoken/streaming/16683-WatchVideo.m4a");
                done();
            });
        });
    });
});


