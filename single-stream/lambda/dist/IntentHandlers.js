'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ask_sdk_1 = require("ask-sdk");
const Constants_1 = require("./Constants");
const AudioAssets_1 = require("./AudioAssets");
const DDBController_1 = require("./DDBController");
const AudioController_1 = require("./AudioController");
const I18N_1 = require("./utils/I18N");
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
    static shouldPlayJingle(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // is a jingle defined for this locale ?
                let WILL_PLAY_JINGLE = false;
                DDBController_1.ddb.getFromDDB(userId).then((data) => {
                    let lastPlayedEPOCH = (data && data.Item) ? data.Item.lastPlayed : 0;
                    let now = Math.round(new Date().getTime());
                    // When last played is more that playOnceEvery ago, agree to play the jingle
                    WILL_PLAY_JINGLE = (lastPlayedEPOCH === 0) || (lastPlayedEPOCH + Constants_1.Constants.jingle.playOnceEvery < now);
                    // console.log("lastPlayedEPOCH : " + lastPlayedEPOCH);
                    // console.log("playOnceEvery   : " + constants.jingle.playOnceEvery);
                    // console.log("now             : " + now);
                    // console.log("last + every    : " + (lastPlayedEPOCH + constants.jingle.playOnceEvery));
                    // console.log("WILL PLAY       : " + WILL_PLAY_JINGLE);
                    if (WILL_PLAY_JINGLE) {
                        // update the DB
                        // console.log("We will play the jingle, let's update the DB to remember that");
                        DDBController_1.ddb.insertOrUpdateDDB(userId).then(data => {
                            resolve(WILL_PLAY_JINGLE);
                        }).catch(error => {
                            resolve(WILL_PLAY_JINGLE);
                        });
                    }
                    else {
                        resolve(WILL_PLAY_JINGLE);
                    }
                    ;
                }).catch((error) => {
                    console.log(`Error while reading data from the DB ${error} - will play jingle in any case`);
                    WILL_PLAY_JINGLE = true;
                    resolve(WILL_PLAY_JINGLE);
                });
            });
        });
    }
}
exports.IntentHandler = {
    'LaunchRequest': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this['PlayAudio'](input);
        });
    },
    'PlayAudio': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = input.requestEnvelope.session.user.userId;
            const request = input.requestEnvelope.request;
            const locale = input.requestEnvelope.request.locale;
            //is the jingle URL defined ?
            if (AudioAssets_1.audioData(request).startJingle) {
                //should we play the jingle ?
                return Util.shouldPlayJingle(user_id).then(shouldPlayJingleResult => {
                    // play a jingle first, then the live stream or play the live stream
                    // depending on return value from shouldPlayJingle()
                    // (live stream will be started when we will receive Playback Nearly Finished event)
                    return Promise.resolve(AudioController_1.audio.play(shouldPlayJingleResult ? AudioAssets_1.audioData(request).startJingle : AudioAssets_1.audioData(request).url, 0, I18N_1.i18n.S(request, 'WELCOME_MSG', AudioAssets_1.audioData(request).card.title), AudioAssets_1.audioData(request).card));
                });
            }
            else {
                // play the radio directly
                return Promise.resolve(AudioController_1.audio.play(AudioAssets_1.audioData(request).url, 0, I18N_1.i18n.S(request, 'WELCOME_MSG', AudioAssets_1.audioData(request).card.title), AudioAssets_1.audioData(request).card));
            }
        });
    },
    'HelpIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = input.requestEnvelope.request;
            return ask_sdk_1.ResponseFactory.init()
                .speak(I18N_1.i18n.S(request, "HELP_MSG", AudioAssets_1.audioData(request).card.title))
                .withShouldEndSession(false)
                .getResponse();
        });
    },
    'SessionEndedRequest': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            // No session ended logic
            // do not return a response, as per https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html#sessionendedrequest
            return Promise.resolve(input.responseBuilder.getResponse());
        });
    },
    'System.ExceptionEncountered': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n******************* EXCEPTION **********************");
            console.log("\n" + JSON.stringify(input.requestEnvelope, null, 2));
            return Promise.resolve(input.responseBuilder.getResponse());
        });
    },
    'Unhandled': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            input.responseBuilder.speak(I18N_1.i18n.S(input.requestEnvelope.request, 'UNHANDLED_MSG'));
            return Promise.resolve(input.responseBuilder.withShouldEndSession(true).getResponse());
        });
    },
    'AMAZON.NextIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            input.responseBuilder.speak(I18N_1.i18n.S(input.requestEnvelope.request, 'CAN_NOT_SKIP_MSG'));
            return Promise.resolve(input.responseBuilder.withShouldEndSession(true).getResponse());
        });
    },
    'AMAZON.PreviousIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            input.responseBuilder.speak(I18N_1.i18n.S(input.requestEnvelope.request, 'CAN_NOT_SKIP_MSG'));
            return Promise.resolve(input.responseBuilder.withShouldEndSession(true).getResponse());
        });
    },
    'AMAZON.PauseIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this['AMAZON.StopIntent'](input);
        });
    },
    'AMAZON.CancelIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this['AMAZON.StopIntent'](input);
        });
    },
    'AMAZON.StopIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(AudioController_1.audio.stop(I18N_1.i18n.S(input.requestEnvelope.request, 'STOP_MSG')));
        });
    },
    'AMAZON.ResumeIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = input.requestEnvelope.request;
            const msg = I18N_1.i18n.S(request, 'RESUME_MSG', AudioAssets_1.audioData(request).card.title);
            return Promise.resolve(AudioController_1.audio.play(AudioAssets_1.audioData(request).url, 0, msg, AudioAssets_1.audioData(request).card));
        });
    },
    'AMAZON.LoopOnIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this['AMAZON.StartOverIntent'](input);
        });
    },
    'AMAZON.LoopOffIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this['AMAZON.StartOverIntent'](input);
        });
    },
    'AMAZON.ShuffleOnIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this['AMAZON.StartOverIntent'](input);
        });
    },
    'AMAZON.ShuffleOffIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this['AMAZON.StartOverIntent'](input);
        });
    },
    'AMAZON.StartOverIntent': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            input.responseBuilder.speak(I18N_1.i18n.S(input.requestEnvelope.request, 'NOT_POSSIBLE_MSG'));
            return Promise.resolve(input.responseBuilder.getResponse());
        });
    },
    /*
     *  All Requests are received using a Remote Control. Calling corresponding handlers for each of them.
     */
    'PlayCommandIssued': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = input.requestEnvelope.request;
            const msg = I18N_1.i18n.S(request, 'WELCOME_MSG', AudioAssets_1.audioData(request).card.title);
            return Promise.resolve(AudioController_1.audio.play(AudioAssets_1.audioData(request).url, 0, msg, AudioAssets_1.audioData(request).card));
        });
    },
    'PauseCommandIssued': function (input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this['AMAZON.StopIntent'](input);
        });
    }
};
//# sourceMappingURL=IntentHandlers.js.map