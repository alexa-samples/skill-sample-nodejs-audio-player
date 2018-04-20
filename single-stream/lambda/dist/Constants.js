'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = {
    //App-ID. TODO: set to your own Skill App ID from the developer portal.
    appId: 'amzn1.ask.skill.6f354531-e96b-4b80-b446-1b77bce73996',
    // when true, the skill logs additional detail, including the full request received from Alexa
    debug: true,
    // when developing offline, use local dynamodb (do not forget to start the DB and to create the table)
    useLocalDB: false,
    // when defined, it tries to read / write DynamoDB to save the last time Jingle was played for that user
    // this allows to avoid to repaet the jingle at each invocation 
    jingle: {
        databaseTable: "maxi80_jingle",
        playOnceEvery: 1000 /*ms*/ * 60 * 60 * 24 // 24 hours
        //playOnceEvery : 1000 /*ms*/ * 60 * 3 // 3 minutes 
    }
};
//# sourceMappingURL=Constants.js.map