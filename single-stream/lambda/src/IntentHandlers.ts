'use strict';

import { HandlerInput, RequestHandler, ResponseFactory } from 'ask-sdk';
import { interfaces, Response, Request, IntentRequest, RequestEnvelope } from 'ask-sdk-model';

import { IHandler } from './utils/iHandler';
import { Constants } from './Constants';
import { audioData } from './AudioAssets';
import { ddb } from './DDBController';
import { audio } from './AudioController';
import { i18n } from './utils/I18N';

class Util {

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
    static async shouldPlayJingle(userId: string): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            // is a jingle defined for this locale ?
            let WILL_PLAY_JINGLE: boolean = false;

            ddb.getFromDDB(userId).then((data) => {

                let lastPlayedEPOCH = (data && data.Item) ? data.Item.lastPlayed : 0;
                let now = Math.round(new Date().getTime());

                // When last played is more that playOnceEvery ago, agree to play the jingle
                WILL_PLAY_JINGLE = (lastPlayedEPOCH === 0) || (lastPlayedEPOCH + Constants.jingle.playOnceEvery < now);
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
}

export const IntentHandler: IHandler = {
    'LaunchRequest': async function (input : HandlerInput): Promise<Response> {
        return this['PlayAudio'](input);
    },
    'PlayAudio': async function (input : HandlerInput): Promise<Response> {

        const user_id = input.requestEnvelope.session.user.userId;
        const request = input.requestEnvelope.request;
        const locale = input.requestEnvelope.request.locale;

        //is the jingle URL defined ?
        if (audioData(request).startJingle) {

            //should we play the jingle ?
            return Util.shouldPlayJingle(user_id).then(shouldPlayJingleResult => {
                // play a jingle first, then the live stream or play the live stream
                // depending on return value from shouldPlayJingle()
                // (live stream will be started when we will receive Playback Nearly Finished event)
                return Promise.resolve(audio.play(shouldPlayJingleResult ? audioData(request).startJingle : audioData(request).url, 0, i18n.S(request, 'WELCOME_MSG', audioData(request).card.title), audioData(request).card));
            });

        } else {

            // play the radio directly
            return Promise.resolve(audio.play(audioData(request).url, 0, i18n.S(request, 'WELCOME_MSG', audioData(request).card.title), audioData(request).card));
        }
    },
    'HelpIntent': async function (input : HandlerInput): Promise<Response> {
        const request = input.requestEnvelope.request;
        return ResponseFactory.init()
            .speak(i18n.S(request, "HELP_MSG", audioData(request).card.title))
            .withShouldEndSession(false)
            .getResponse();
    },
    'SessionEndedRequest': async function (input : HandlerInput): Promise<Response> {
        // No session ended logic
        // do not return a response, as per https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html#sessionendedrequest
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'System.ExceptionEncountered': async function (input : HandlerInput): Promise<Response> {
        console.log("\n******************* EXCEPTION **********************");
        console.log("\n" + JSON.stringify(input.requestEnvelope, null, 2));
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'Unhandled': async function (input : HandlerInput): Promise<Response> {
        input.responseBuilder.speak(i18n.S(input.requestEnvelope.request, 'UNHANDLED_MSG'));
        return Promise.resolve(input.responseBuilder.withShouldEndSession(true).getResponse());
    },
    'AMAZON.NextIntent': async function (input : HandlerInput): Promise<Response> {
        input.responseBuilder.speak(i18n.S(input.requestEnvelope.request, 'CAN_NOT_SKIP_MSG'));
        return Promise.resolve(input.responseBuilder.withShouldEndSession(true).getResponse());
    },
    'AMAZON.PreviousIntent': async function (input : HandlerInput): Promise<Response> {
        input.responseBuilder.speak(i18n.S(input.requestEnvelope.request, 'CAN_NOT_SKIP_MSG'));
        return Promise.resolve(input.responseBuilder.withShouldEndSession(true).getResponse());
    },

    'AMAZON.PauseIntent': async function (input : HandlerInput): Promise<Response> {
        return this['AMAZON.StopIntent'](input);
    },
    'AMAZON.CancelIntent': async function (input : HandlerInput): Promise<Response> {

        return this['AMAZON.StopIntent'](input);
    },
    'AMAZON.StopIntent': async function (input : HandlerInput): Promise<Response> {
        return Promise.resolve(audio.stop(i18n.S(input.requestEnvelope.request, 'STOP_MSG')));
    },

    'AMAZON.ResumeIntent': async function (input : HandlerInput): Promise<Response> {
        const request = input.requestEnvelope.request;
        const msg = i18n.S(request, 'RESUME_MSG', audioData(request).card.title);
        return Promise.resolve(audio.play(audioData(request).url, 0, msg, audioData(request).card));
    },

    'AMAZON.LoopOnIntent': async function (input : HandlerInput): Promise<Response> {
        return this['AMAZON.StartOverIntent'](input);
     },
    'AMAZON.LoopOffIntent': async function (input : HandlerInput): Promise<Response> {
        return this['AMAZON.StartOverIntent'](input);
    },
    'AMAZON.ShuffleOnIntent': async function (input : HandlerInput): Promise<Response> {
        return this['AMAZON.StartOverIntent'](input);
    },
    'AMAZON.ShuffleOffIntent': async function (input : HandlerInput): Promise<Response> {
        return this['AMAZON.StartOverIntent'](input);
    },
    'AMAZON.StartOverIntent': async function (input : HandlerInput): Promise<Response> {
        input.responseBuilder.speak(i18n.S(input.requestEnvelope.request, 'NOT_POSSIBLE_MSG'));
        return Promise.resolve(input.responseBuilder.getResponse());
    },

    /*
     *  All Requests are received using a Remote Control. Calling corresponding handlers for each of them.
     */
    'PlayCommandIssued': async function (input : HandlerInput): Promise<Response> {
        const request = input.requestEnvelope.request;
        const msg = i18n.S(request, 'WELCOME_MSG', audioData(request).card.title);
        return Promise.resolve(audio.play(audioData(request).url, 0, msg, audioData(request).card));
    },
    'PauseCommandIssued': async function (input : HandlerInput): Promise<Response> {
        return this['AMAZON.StopIntent'](input);
    }
}
