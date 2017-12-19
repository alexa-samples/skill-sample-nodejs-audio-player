'use strict';

function canThrowCard() {
    /*
     * To determine when can a card should be inserted in the response.
     * In response to a PlaybackController Request (remote control events) we cannot issue a card,
     * Thus adding restriction of request type being "IntentRequest".
     */
    if (this.event.request.type === 'IntentRequest' || this.event.request.type === 'LaunchRequest') {
        return true;
    } else {
        return false;
    }
}

var controller = function () {
    return {
        play: function (text, audioData) {
            /*
             *  Using the function to begin playing audio when:
             *      Play Audio intent invoked.
             *      Resuming audio when stopped/paused.
             *      Next/Previous commands issued.
             */

            if (canThrowCard.call(this)) {
                var cardTitle   = audioData.subtitle;
                var cardContent = audioData.cardContent;
                var cardImage   = audioData.image;
                this.response.cardRenderer(cardTitle, cardContent, cardImage);
            }

            if (text && text != "") {
                this.response.speak(text).audioPlayerPlay('REPLACE_ALL', audioData.url, audioData.url, null, 0);
            } else {
                this.response.audioPlayerPlay('REPLACE_ALL', audioData.url, audioData.url, null, 0);
            }
            this.emit(':responseReady');
        },
        playJingle: function (text, audioData) {
            this.response.speak(text).audioPlayerPlay('REPLACE_ALL', audioData.startJingle, audioData.startJingle, null, 0);
            this.emit(':responseReady');
        },
        stop: function (text) {
            /*
             *  Issuing AudioPlayer.Stop directive to stop the audio.
             *  Attributes already stored when AudioPlayer.Stopped request received.
             */
            this.response.speak(text).audioPlayerStop();
            this.emit(':responseReady');
        }
    }
}();

module.exports = controller;