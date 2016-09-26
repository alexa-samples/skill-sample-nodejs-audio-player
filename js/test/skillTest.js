var assert = require('assert');
var bst = require('bespoken-tools');

describe('Skill Sample AudioPlayer Functional Test', function() {
    var server = null;
    var alexa = null;

    beforeEach(function (done) {
        server = new bst.LambdaServer('./index.js', 10000, true);
        alexa = new bst.BSTAlexa('http://localhost:10000',
            '../speechAssets/IntentSchema.json',
            '../speechAssets/Utterances.txt');
        server.start(function() {
            alexa.start(function () {
                done();
            });
        });
    });


    afterEach(function(done) {
        alexa.stop(function () {
            server.stop(function () {
                done();
            });
        });
    });

    it('Plays The First Podcast and Then Goes To Next', function (done) {

        alexa.spoken('Play The Podcast', function(error, payload) {
            // Confirms the correct directive is returned when the Intent is spoken
            assert.equal(payload.response.directives[0].type, 'AudioPlayer.Play');

            // Ensures the track with correct token is returned
            assert.equal(payload.response.directives[0].audioItem.stream.token, '0');

            alexa.intended('AMAZON.NextIntent', null, function (error, payload) {
                // Ensures the track with next token is returned
                assert.equal(payload.response.directives[0].type, 'AudioPlayer.Play');
                assert.equal(payload.response.directives[0].playBehavior, 'REPLACE_ALL');
                assert.equal(payload.response.directives[0].audioItem.stream.token, '1');
                done();
            });
        });
    });

    it('Plays The First Podcast To Completion And Goes To Next', function (done) {

        alexa.spoken('Play The Podcast', function(error, payload) {
            alexa.on('AudioPlayer.PlaybackStarted', function(audioItem) {
                assert.equal(audioItem.stream.token, '1');
                done();
            });

            alexa.audioItemFinished();
        });
    });
});