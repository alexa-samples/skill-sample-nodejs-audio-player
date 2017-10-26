'use strict';

const alexa              = require('alexa-sdk');
const constants          = require('./constants');
const stateHandlers      = require('./stateHandlers');
const audioEventHandlers = require('./audioEventHandlers');
const languageStrings    = require('./strings');

exports.handler = (event, context, callback) => {


    const skill = alexa.handler(event, context, callback);

    skill.appId     = constants.appId;
    skill.resources = languageStrings;
    skill.debug     = constants.debug;
    skill.registerHandlers(
        stateHandlers,
        audioEventHandlers
    );

    if (skill.debug) {
        console.log("\n" + "******************* REQUEST **********************");
        console.log("\n" + JSON.stringify(event, null, 2));
    }

    skill.execute();
};
