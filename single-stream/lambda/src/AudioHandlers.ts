'use strict';

import { HandlerInput } from 'ask-sdk';
import { interfaces, Response } from 'ask-sdk-model';

import { IHandler } from './utils/iHandler';
import { audio } from './AudioController';
import { audioData } from './AudioAssets';

export const AudioHandler: IHandler = {

    'AudioPlayer.PlaybackStarted': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackStarted Directive received.
         * Confirming that requested audio file began playing.
         * Do not send any specific response.
         */
        console.log("Playback started");
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'AudioPlayer.PlaybackFinished': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackFinished Directive received.
         * Confirming that audio file completed playing.
         * Do not send any specific response.
         */
        console.log("Playback finished");
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'AudioPlayer.PlaybackStopped': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackStopped Directive received.
         * Confirming that audio file stopped playing.
         */
        console.log("Playback stopped");

        //do not return a response, as per https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#playbackstopped
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'AudioPlayer.PlaybackNearlyFinished': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackNearlyFinished Directive received.
         * Replacing queue with the URL again.
         * This should not happen on live streams
         */
        console.log("Playback nearly finished");
        const request = <interfaces.audioplayer.PlaybackFailedRequest>input.requestEnvelope.request;
        return Promise.resolve(audio.playLater(audioData(request).url, audioData(request).card));
    },
    'AudioPlayer.PlaybackFailed': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackFailed Directive received.
         * Logging the error and restarting playing with no output speach
         */
        const request = <interfaces.audioplayer.PlaybackFailedRequest>input.requestEnvelope.request;
        console.log("Playback Failed : " + JSON.stringify(request.error, null, 2));
        return Promise.resolve(audio.play(audioData(request).url, 0, null, audioData(request).card));
    }
};
