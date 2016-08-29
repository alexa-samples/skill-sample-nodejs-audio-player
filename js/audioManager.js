/**
 * Module to manage audio data for a session
 */

/**
 * Singleton to manage
 * @param audioSource
 * @constructor
 */
var AudioManager = {
    audioAssetArray: null, // Will be array of audio items

    load: function (audioSourceType, audioSource, callback) {
        let self = this;
        this.audioSourceType = audioSourceType;
        this.audioSource = audioSource;

        if (this.audioAssetArray === null) {
            if (this.audioSourceType === 'static') {
                this.audioAssetArray = require('./audioAssets');
            } else {
                require('./rssAdapter').fromURL(this.audioSource, function (error, audioArray) {
                    self.audioAssetArray = audioArray;
                    callback();
                });
            }
        } else {
            callback();
        }

    },


    audioAssets: function () {
        if (this.audioAssetArray === null) {
            // This should not happen - should already be loaded on startup
            return [];
        } else {
            return this.audioAssetArray;
        }
    }
};

module.exports = AudioManager;




