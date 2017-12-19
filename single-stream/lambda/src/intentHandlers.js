'use strict';

var Alexa = require('alexa-sdk');
var audioData = require('./audioAssets');
var controller = require('./audioController.js');
var constants = require('./constants');

var intentHandlers = {
    'LaunchRequest': function () {
        this.emit('PlayAudio');
    },
    'PlayAudio': function () {
        if (audioData.startJingle) {
            // play a jingle first, then the live stream
            // (live stream will be started when we will receive Playback Nearly Finished event)
            controller.playJingle.call(this, this.t('WELCOME_MSG', { skillName: audioData.title }), audioData);        
        } else {
            // play the radio directly
            controller.play.call(this, this.t('WELCOME_MSG', { skillName: audioData.title }), audioData);
        }
    },
    'AMAZON.HelpIntent': function () {
        this.response.listen(this.t('HELP_MSG', { skillName: audioData.title } ));
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        // No session ended logic
        // do not return a response, as per https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html#sessionendedrequest
        this.emit(':responseReady');
    },
    'ExceptionEncountered': function () {
        console.log("\n******************* EXCEPTION **********************");
        console.log("\n" + JSON.stringify(this.event.request, null, 2));
        this.callback(null, null)
    },
    'Unhandled': function () {
        this.response.speak(this.t('UNHANDLED_MSG'));
        this.emit(':responseReady');
    },
    'AMAZON.NextIntent': function () {
        this.response.speak(this.t('CAN_NOT_SKIP_MSG'));
        this.emit(':responseReady');
    },
    'AMAZON.PreviousIntent': function () { 
        this.response.speak(this.t('CAN_NOT_SKIP_MSG'));
        this.emit(':responseReady');
    },

    'AMAZON.PauseIntent':   function () { this.emit('AMAZON.StopIntent'); },
    'AMAZON.CancelIntent':  function () { this.emit('AMAZON.StopIntent'); },
    'AMAZON.StopIntent':    function () { controller.stop.call(this, this.t('STOP_MSG'), audioData) },

    'AMAZON.ResumeIntent':  function () { controller.play.call(this, this.t('RESUME_MSG'), audioData) },

    'AMAZON.LoopOnIntent':     function () { this.emit('AMAZON.StartOverIntent'); },
    'AMAZON.LoopOffIntent':    function () { this.emit('AMAZON.StartOverIntent');},
    'AMAZON.ShuffleOnIntent':  function () { this.emit('AMAZON.StartOverIntent');},
    'AMAZON.ShuffleOffIntent': function () { this.emit('AMAZON.StartOverIntent');},
    'AMAZON.StartOverIntent':  function () { 
        this.response.speak(this.t('NOT_POSSIBLE_MSG'));
        this.emit(':responseReady');
    },

    /*
     *  All Requests are received using a Remote Control. Calling corresponding handlers for each of them.
     */
    'PlayCommandIssued':  function () { controller.play.call(this, this.t('WELCOME_MSG', { skillName: audioData.title } )), audioData },
    'PauseCommandIssued': function () { controller.stop.call(this, this.t('STOP_MSG')) }
}

module.exports = intentHandlers;



