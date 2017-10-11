'use strict';

var audioEventHandlers =  {
    'PlaybackStarted' : function () {
        /*
         * AudioPlayer.PlaybackStarted Directive received.
         * Confirming that requested audio file began playing.
         * Do not send any specific response.
         */
        console.log("Playback started");        
        this.emit(':responseReady');
    },
    'PlaybackFinished' : function () {
        /*
         * AudioPlayer.PlaybackFinished Directive received.
         * Confirming that audio file completed playing.
         * Do not send any specific response.
         */
        console.log("Playback finished");
        this.emit(':responseReady');
    },
    'PlaybackStopped' : function () {
        /*
         * AudioPlayer.PlaybackStopped Directive received.
         * Confirming that audio file stopped playing.
         */
        console.log("Playback stopped");

        //do not return a response, as per https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#playbackstopped
        this.emit(':responseReady');
    },
    'PlaybackNearlyFinished' : function () {
        /*
         * AudioPlayer.PlaybackNearlyFinished Directive received.
         * Replacing queue with the URL again.
         * This should not happen on live streams
         */
        console.log("Playback nearly finished");
        this.response.audioPlayerPlay('REPLACE_ALL', audioData.url, audioData.url, null, 0);
        this.emit(':responseReady');
    },
    'PlaybackFailed' : function () {
        /*
         * AudioPlayer.PlaybackFailed Directive received.
         * Logging the error and restarting playing.
         */
        console.log("Playback Failed : %j", this.event.request.error);
        this.response.audioPlayerClearQueue('CLEAR_ENQUEUED');
        this.emit(':responseReady');
    }
};

module.exports = audioEventHandlers;
