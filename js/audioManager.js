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
        this.audioSourceType = audioSourceType;
        this.audioSource = audioSource;

        if (AudioManager.audioAssetArray === null) {
            console.log("Loading Audio Assets");
            if (this.audioSourceType === 'static') {
                AudioManager.audioAssetArray = require('./audioAssets');
                callback();
            } else {
                require('./rssAdapter').fromURL(this.audioSource, function (error, audioArray) {
                    AudioManager.audioAssetArray = audioArray;
                    callback();
                });
            }
        } else {
            callback();
        }

    },

    audioAssets: function () {
        if (AudioManager.audioAssetArray === null) {
            // This should not happen - should already be loaded on startup
            return [];
        } else {
            return AudioManager.audioAssetArray;
        }
    }
};

module.exports = AudioManager;




