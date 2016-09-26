var assert = require('assert');
var AudioManager = require('../audioManager');

describe('AudioManager', function() {
    describe('#fromURL', function() {
        it("Correctly loads RSS feed from URL", function(done) {
            AudioManager.load('url', 'https://s3.amazonaws.com/bespoken/streaming/rssFeed.xml', function () {
                assert.equal(AudioManager.audioAssets().length, 4);
                assert(AudioManager.audioAssetArray !== null);
                done();
            });
        });
    });
});


