'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const ask_sdk_core_1 = require("ask-sdk-core");
class AudioController {
    addScreenBackground(cardData, response) {
        if (cardData) {
            const directive = response.directives[0];
            directive.audioItem['metadata'] = {
                title: cardData.title,
                subtitle: cardData.text,
                art: {
                    contentDescription: cardData.title,
                    sources: [{
                            url: "https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/alexa-artwork-720.png"
                        }]
                },
                backgroundImage: {
                    contentDescription: cardData.title,
                    sources: [{
                            url: "https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/alexa-artwork-1200.png"
                        }]
                }
            };
        }
        return response;
    }
    play(url, offset, text, cardData) {
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
        const result = ask_sdk_core_1.ResponseFactory.init();
        if (cardData) {
            result.withStandardCard(cardData.title, cardData.text, cardData.image.smallImageUrl, cardData.image.largeImageUrl);
        }
        // we are using url as token as they are all unique
        result
            .addAudioPlayerPlayDirective('REPLACE_ALL', url, url, offset)
            .withShouldEndSession(true);
        if (text) {
            result.speak(text);
        }
        // add support for radio meta data.  
        // this is not supported by the SDK yet, so it should be handled manually
        const response = this.addScreenBackground(cardData, result.getResponse());
        return response;
    }
    playLater(url, cardData) {
        /*
           https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#play
           REPLACE_ENQUEUED: Replace all streams in the queue. This does not impact the currently playing stream.
         */
        const result = ask_sdk_core_1.ResponseFactory.init();
        result
            .addAudioPlayerPlayDirective('REPLACE_ALL', url, url, 0)
            .withShouldEndSession(true);
        // add support for radio meta data.  
        // this is not supported by the SDK yet, so it should be handled manually
        const response = this.addScreenBackground(cardData, result.getResponse());
        return response;
    }
    stop(text) {
        /*
         *  Issuing AudioPlayer.Stop directive to stop the audio.
         *  Attributes already stored when AudioPlayer.Stopped request received.
         */
        const result = ask_sdk_core_1.ResponseFactory.init();
        result
            .addAudioPlayerStopDirective()
            .speak(text);
        return result.getResponse();
    }
    clear() {
        /*
         * Clear the queue and stop the player
         */
        const result = ask_sdk_core_1.ResponseFactory.init();
        result.addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED');
        return result.getResponse();
    }
}
exports.audio = new AudioController();
//# sourceMappingURL=AudioController.js.map