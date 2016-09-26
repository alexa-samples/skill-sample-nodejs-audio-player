'use strict';

// We use mockery so that we can bypass Dynamo by default
var mockery = require('mockery');
setupDynamo();

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

    if (event.context !== undefined && event.context.System.device.supportedInterfaces.AudioPlayer === undefined) {
        alexa.emit(':tell', 'Sorry, this skill is not supported on this device');
    }
    else {
        // The resources are loaded once and then cached, but this is done asynchronously
        AudioManager.load("file", "test/rssFeed.xml", function () {
            alexa.execute();
        });
    }
};

function setupDynamo (alexa) {
    // Flip this flag if you want to use dynamo
    // If this is not set, we just use a simple, local Mock DB
    let useDynamo = false;
    if (useDynamo) {
        // Configure this JSON file with your correct credentials
        //  Make a copy of config.example.json and substitute in the correct credentials for accessing Dynamo
        AWS.config.loadFromPath('config.json');
    } else {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });
        mockery.registerMock('./DynamoAttributesHelper', require("./mockDynamo"));
    }

}
