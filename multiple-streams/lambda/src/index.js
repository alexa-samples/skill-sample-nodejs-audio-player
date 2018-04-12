'use strict';

var Alexa = require('alexa-sdk');
var constants = require('./constants');
var stateHandlers = require('./stateHandlers');
var audioEventHandlers = require('./audioEventHandlers');

exports.handler = function(event, context, callback){
    if (constants.debug) {
        console.log("\n" + "******************* REQUEST **********************");
        console.log("\n" + JSON.stringify(event, null, 2));

        var origCallback = callback;
        callback = function (error, response) {
            console.log("\n" + "******************* RESPONSE  **********************");
            console.log("\n" + JSON.stringify(response, null, 2));
            return origCallback(error, response);
        }
    }

    var alexa = Alexa.handler(event, context, callback);
    alexa.appId = constants.appId;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;
    alexa.registerHandlers(
        stateHandlers.startModeIntentHandlers,
        stateHandlers.playModeIntentHandlers,
        stateHandlers.remoteControllerHandlers,
        stateHandlers.resumeDecisionModeIntentHandlers,
        audioEventHandlers
    );

    var audioPlayerInterface = ((((event.context || {}).System || {}).device || {}).supportedInterfaces || {}).AudioPlayer;
    if (audioPlayerInterface === undefined) {
        alexa.emit(':tell', 'Sorry, this skill is not supported on this device');
    }
    else {
        alexa.execute();
    }
};
