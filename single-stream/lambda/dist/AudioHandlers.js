'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AudioController_1 = require("./AudioController");
const AudioAssets_1 = require("./AudioAssets");
exports.AudioHandler = {
    'AudioPlayer.PlaybackStarted': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
             * AudioPlayer.PlaybackStarted Directive received.
             * Confirming that requested audio file began playing.
             * Do not send any specific response.
             */
            console.log("Playback started");
            return Promise.resolve(input.responseBuilder.getResponse());
        });
    },
    'AudioPlayer.PlaybackFinished': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
             * AudioPlayer.PlaybackFinished Directive received.
             * Confirming that audio file completed playing.
             * Do not send any specific response.
             */
            console.log("Playback finished");
            return Promise.resolve(input.responseBuilder.getResponse());
        });
    },
    'AudioPlayer.PlaybackStopped': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
             * AudioPlayer.PlaybackStopped Directive received.
             * Confirming that audio file stopped playing.
             */
            console.log("Playback stopped");
            //do not return a response, as per https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#playbackstopped
            return Promise.resolve(input.responseBuilder.getResponse());
        });
    },
    'AudioPlayer.PlaybackNearlyFinished': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
             * AudioPlayer.PlaybackNearlyFinished Directive received.
             * Replacing queue with the URL again.
             * This should not happen on live streams
             */
            console.log("Playback nearly finished");
            const request = input.requestEnvelope.request;
            return Promise.resolve(AudioController_1.audio.playLater(AudioAssets_1.audioData(request).url, AudioAssets_1.audioData(request).card));
        });
    },
    'AudioPlayer.PlaybackFailed': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
             * AudioPlayer.PlaybackFailed Directive received.
             * Logging the error and restarting playing with no output speach
             */
            const request = input.requestEnvelope.request;
            console.log("Playback Failed : " + JSON.stringify(request.error, null, 2));
            return Promise.resolve(AudioController_1.audio.play(AudioAssets_1.audioData(request).url, 0, null, AudioAssets_1.audioData(request).card));
        });
    }
};
//# sourceMappingURL=AudioHandlers.js.map