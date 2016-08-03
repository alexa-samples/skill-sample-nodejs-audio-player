"use strict";

module.exports = Object.freeze({
    
    // App-ID
    appId : 'amzn1.ask.skill.0e26d17c-0a0e-4373-8d8d-796f22f9785b',
    
    //  DynamoDB Table name
    dynamoDBTableName : 'LongFormAudioSample',
    
    //  States
    states : {
        START_MODE : '',
        PLAY_MODE : '_PLAY_MODE',
        RESUME_DECISION_MODE : '_RESUME_DECISION_MODE'
    }
});