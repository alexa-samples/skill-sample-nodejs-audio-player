'use strict';

var Alexa = require('alexa-sdk');
var ddb = require('./ddbController.js');
var audioData = require('./audioAssets');
var controller = require('./audioController.js');
var constants = require('./constants');

/*
 Returns true if we should play the jingle for that user.
 Rule is we play the jingle once per rolling period of 24hours.

 This function relies on a DDB table to keep track of last played time per user.
 It silently fails if the table does not exist of if there is a permission issue.

 The table definition is 
 aws dynamodb describe-table --table-name my_radio
{
    "Table": {
        "TableArn": "arn:aws:dynamodb:us-east-1:<YOUR ACCOUNT ID>:table/my_radio",
        "AttributeDefinitions": [
            {
                "AttributeName": "userId",
                "AttributeType": "S"
            }
        ],
        "ProvisionedThroughput": {
            "NumberOfDecreasesToday": 0,
            "WriteCapacityUnits": 5,
            "ReadCapacityUnits": 5
        },
        "TableSizeBytes": 0,
        "TableName": "my_radio",
        "TableStatus": "ACTIVE",
        "KeySchema": [
            {
                "KeyType": "HASH",
                "AttributeName": "userId"
            }
        ],
        "ItemCount": 0,
        "CreationDateTime": 1513766788.6
    }
}

 At runtime, the code needs the following IAM policy attached to the lambda role.

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "sid123",
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:UpdateItem"
            ],
            "Resource": "arn:aws:dynamodb:us-east-1:YOUR_ACCOUNT_ID:table/my_radio"
        }
    ]
}

*/
function shouldPlayJingle(userId) {

    return new Promise( (resolve, reject) => {

        var WILL_PLAY_JINGLE = false;

        ddb.getFromDDB(userId).then((data) => {

            let lastPlayedEPOCH = (data && data.Item) ? data.Item.lastPlayed : 0;
            let now = Math.round(new Date() / 1000);

            // When last played is more that playOnceEvery ago, agree to play the jingle
            WILL_PLAY_JINGLE = (lastPlayedEPOCH === 0) || (lastPlayedEPOCH + constants.jingle.playOnceEvery < now);
            // console.log("lastPlayedEPOCH : " + lastPlayedEPOCH);
            // console.log("playOnceEvery   : " + constants.jingle.playOnceEvery);
            // console.log("now             : " + now);
            // console.log("last + every    : " + (lastPlayedEPOCH + constants.jingle.playOnceEvery));
            // console.log("WILL PLAY       : " + WILL_PLAY_JINGLE);

            if (WILL_PLAY_JINGLE) {

                // update the DB
                // console.log("We will play the jingle, let's update the DB to remember that");
                ddb.insertOrUpdateDDB(userId).then(data => {
                    resolve(WILL_PLAY_JINGLE);
                }).catch(error => {
                    resolve(WILL_PLAY_JINGLE);
                });

            } else {
                resolve(WILL_PLAY_JINGLE);
            };

        }).catch((error) => {
            console.log(`Error while reading data from the DB ${error} - will play jingle in any case`);
            WILL_PLAY_JINGLE = true;
            resolve(WILL_PLAY_JINGLE);
        });
    });
}

var intentHandlers = {
    'LaunchRequest': function () {
        this.emit('PlayAudio');
    },
    'PlayAudio': function () {

        let request = this.event.request;

        //is the jingke URL defined ?
        if (audioData(request).startJingle) {

            //should we play the jingle ?
            shouldPlayJingle(this.event.session.user.userId).then(shouldPlayJingleResult => {
                // play a jingle first, then the live stream or play the live stream
                // depending on return value from shouldPlayJingle()
                // (live stream will be started when we will receive Playback Nearly Finished event)
                controller.play.call(this,
                                     this.t('WELCOME_MSG', {skillName: audioData(request).card.title}), shouldPlayJingleResult ? audioData(request).startJingle : audioData(request).url, audioData(request).card);
            });

        } else {

            // play the radio directly
            controller.play.call(this, this.t('WELCOME_MSG', {
                skillName: audioData(request).card.title
            }), audioData(request).url, audioData(request).card);

        }
    },
    'AMAZON.HelpIntent': function () {
        this.response.listen(this.t('HELP_MSG', {
            skillName: audioData(this.event.request).card.title
        }));
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

    'AMAZON.PauseIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        controller.stop.call(this, this.t('STOP_MSG'))
    },

    'AMAZON.ResumeIntent': function () {
        controller.play.call(this, this.t('RESUME_MSG'), audioData(this.event.request).url, audioData(this.event.request).card)
    },

    'AMAZON.LoopOnIntent': function () {
        this.emit('AMAZON.StartOverIntent');
    },
    'AMAZON.LoopOffIntent': function () {
        this.emit('AMAZON.StartOverIntent');
    },
    'AMAZON.ShuffleOnIntent': function () {
        this.emit('AMAZON.StartOverIntent');
    },
    'AMAZON.ShuffleOffIntent': function () {
        this.emit('AMAZON.StartOverIntent');
    },
    'AMAZON.StartOverIntent': function () {
        this.response.speak(this.t('NOT_POSSIBLE_MSG'));
        this.emit(':responseReady');
    },

    /*
     *  All Requests are received using a Remote Control. Calling corresponding handlers for each of them.
     */
    'PlayCommandIssued': function () {
        controller.play.call(this, this.t('WELCOME_MSG', {
            skillName: audioData(this.event.request).card.title
        })), audioData(this.event.request).url, audioData(this.event.request).card
    },
    'PauseCommandIssued': function () {
        controller.stop.call(this, this.t('STOP_MSG'))
    }
}

module.exports = intentHandlers;