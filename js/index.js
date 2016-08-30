'use strict';

var AWS = require('aws-sdk');
var Alexa = require('alexa-sdk');
var constants = require('./constants');
var stateHandlers = require('./stateHandlers');
var audioEventHandlers = require('./audioEventHandlers');
var AudioManager = require('./audioManager');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.appId = constants.appId;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;
    alexa.registerHandlers(
        stateHandlers.startModeIntentHandlers,
        stateHandlers.playModeIntentHandlers,
        stateHandlers.remoteControllerHandlers,
        stateHandlers.resumeDecisionModeIntentHandlers,
        audioEventHandlers
    );

    // Configure this JSON file with your correct credential
    // AWS.config.loadFromPath("config.json");
    AWS.config.loadFromPath("config.jpk.json");

    var requestType = event.request.type;
    console.log('Request: ' + requestType);
    console.log('Request: ' + JSON.stringify(event.request, null, 2));

    if (event.context !== undefined && event.context.System.device.supportedInterfaces.AudioPlayer === undefined) {
        alexa.emit(':tell', 'Sorry, this skill is not supported on this device');
    }
    else {
        AudioManager.load("url", "https://s3.amazonaws.com/bespoken/streaming/rssFeed.xml", function () {
            alexa.execute();
        });
    }
};
