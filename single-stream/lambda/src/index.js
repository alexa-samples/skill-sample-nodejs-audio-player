'use strict';

var alexa = require('alexa-sdk');
var constants = require('./constants');
var stateHandlers = require('./intentHandlers');
var audioEventHandlers = require('./audioEventHandlers');
var languageStrings = require('./strings');

exports.handler = (event, context, callback) => {

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

    var skill = alexa.handler(event, context, callback);

    skill.appId = constants.appId;
    skill.resources = languageStrings;
    skill.debug = constants.debug;
    skill.registerHandlers(
        stateHandlers,
        audioEventHandlers
    );

    skill.execute();
};