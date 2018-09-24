'use strict';

import { ResponseFactory } from 'ask-sdk-core';
import { ui, Response, interfaces } from 'ask-sdk-model';

class AudioController {

    addScreenBackground(cardData : ui.StandardCard, response : Response) : Response {
        if (cardData) {

            const directive = <interfaces.audioplayer.PlayDirective>response.directives[0]
            directive.audioItem['metadata'] = {
                title: cardData.title,
                subtitle: cardData.text,
                art: {
                    contentDescription: cardData.title,
                    sources: [{
                        url: "https://alexademo.ninja/skills/logo-512.png"
                    }]
                },
                backgroundImage: {
                    contentDescription: cardData.title,
                    sources: [{
                        url: "https://alexademo.ninja/skills/logo-512.png"
                    }]
                }
            };
        }
        return response;
    }

    play(url: string, offset: number, text?: string, cardData?: ui.StandardCard): Response {
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
        const result = ResponseFactory.init();

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


    playLater(url: string, cardData: ui.StandardCard): Response {
        /*
           https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#play
           REPLACE_ENQUEUED: Replace all streams in the queue. This does not impact the currently playing stream. 
         */
        const result = ResponseFactory.init();
        result
            .addAudioPlayerPlayDirective('REPLACE_ENQUEUED', url, url, 0)
            .withShouldEndSession(true);

        // add support for radio meta data.  
        // this is not supported by the SDK yet, so it should be handled manually
        const response = this.addScreenBackground(cardData, result.getResponse());
        return response;
    }

    stop(text: string): Response {
        /*
         *  Issuing AudioPlayer.Stop directive to stop the audio.
         *  Attributes already stored when AudioPlayer.Stopped request received.
         */
        const result = ResponseFactory.init();
        result.addAudioPlayerStopDirective();

        if (text) {
            result.speak(text);
        }

        return result.getResponse();
    }

    clear(): Response {
        /*
         * Clear the queue and stop the player
         */
        const result = ResponseFactory.init();
        result.addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED');

        return result.getResponse();
    }
}
export const audio = new AudioController();