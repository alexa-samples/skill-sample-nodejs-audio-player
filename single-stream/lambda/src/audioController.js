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
        play: function (text, url, cardData) {
            /*
             *  Using the function to begin playing audio when:
             *      Play Audio intent invoked.
             *      Resuming audio when stopped/paused.
             *      Next/Previous commands issued.
             */

             /*
                https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#play
                REPLACE_ALL: Immediately begin playback of the specified stream, and replace current and enqueued streams.             
             */

            if (canThrowCard.call(this)) {
                var cardTitle   = cardData.subtitle;
                var cardContent = cardData.cardContent;
                var cardImage   = cardData.image;
                this.response.cardRenderer(cardTitle, cardContent, cardImage);
            }

            if (text && text != "") {
                this.response.speak(text).audioPlayerPlay('REPLACE_ALL', url, url, null, 0);
            } else {
                this.response.audioPlayerPlay('REPLACE_ALL', url, url, null, 0);
            }
            this.emit(':responseReady');
        },
        playLater: function (url) {
             /*
                https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#play
                REPLACE_ENQUEUED: Replace all streams in the queue. This does not impact the currently playing stream. 
              */
            this.response.audioPlayerPlay('REPLACE_ENQUEUED', url, url, null, 0);
            this.emit(':responseReady');
        },
        stop: function (text) {
            /*
             *  Issuing AudioPlayer.Stop directive to stop the audio.
             *  Attributes already stored when AudioPlayer.Stopped request received.
             */
            this.response.speak(text).audioPlayerStop();
            this.emit(':responseReady');
        },
        clear: function() {
            /*
             * Clear the queue and stop the player
             */
            this.response.audioPlayerClearQueue('CLEAR_ENQUEUED');
            this.emit(':responseReady');            
        }
    }
}();

module.exports = controller;