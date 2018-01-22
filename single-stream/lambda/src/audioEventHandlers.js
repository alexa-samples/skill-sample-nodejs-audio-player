'use strict';

var audioData = require('./audioAssets');
var controller = require('./audioController.js');

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
        controller.playLater.call(this, audioData.url);
    },
    'PlaybackFailed' : function () {
        /*
         * AudioPlayer.PlaybackFailed Directive received.
         * Logging the error and stop playing.
         * 
         *  TODO : should we enqueue another URL ?  The risk is to loop if the problem comes from the stream itself.
         *         Smart skills should try to enqueue the URL 2-3 times and if the error still occurs,
         *         decide to play an MP3 with an error message instead.
         *         These error should be reported.  We recommend to create an Alert on Cloudwatch to send an email based on volume.
         */
        console.log("Playback Failed : %j", this.event.request.error);
        controller.clear.call(this);
    }
};

module.exports = audioEventHandlers;
