# Audio Player Sample Project

The Alexa Skills Kit now allows developers to build skills that play long-form audio content on Alexa devices.  This sample project demonstrates how to use the new interfaces for triggering playback of audio and handling audio player input events.

## How to Run the Sample

You will need to comply to the prerequisites below and to change a few configuration files before creating the skill and upload the lambda code.

### Pre-requisites

This is a NodeJS Lambda function and skill definition to be used by [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html).

0. You need an [AWS account](https://aws.amazon.com) and an [Amazon developer account](https://developer.amazon.com) to create an Alexa Skill.

1. You need to install and configure the [AWS CLI](https://aws.amazon.com/cli/)

```bash
$ pip install aws-cli
$ aws configure // https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
```

2. You need to inistall and to initialize [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) with

```bash
$ ask init
```

3. You need to download NodeJS dependencies :

```bash
$ (cd lambda && npm install)
$ (cd lambda/src && npm install)
```

### Deployment

ASK will create the skill and the lambda function for you.

Lambda function will be created in ```us-east-1``` (Northern Virginia) by default.

You deploy the skill and the lambda function in one step :

```bash
$ ask deploy
```

After deploying, you will need to add DynamoDB permission to the IAM Role created to execute your function :

- connect to AWS Console : https://console.aws.amazon.com/iam/home?region=us-east-1#/roles
- select the role created to execute your lambda function (it is named "ask-lambda-Multi-Stream-Audio-Player" if you did not  change the default name)
- click "Attach Policy"
- locate and select "DynamoDBFullAccessPolicy" role and click "Attach Policy"

When done, you are ready to test from the command line, or using the Alexa developer console.

```bash
 $ ask simulate -l en-US -t "alexa, open audio player"

 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
◡ Waiting for simulation response{
  "status": "SUCCESSFUL",
  ...
 ```

You should see the code of the skill's response after the SUCCESSFUL line.

## How it Works

Alexa Skills Kit now includes a set of output directives and input events that allow you to control the playback of audio files or streams.  There are a few important concepts to get familiar with:

* **AudioPlayer directives** are used by your skill to start and stop audio playback from content hosted at a publicly accessible secure URL.  You  send AudioPlayer directives in response to the intents you've configured for your skill, or new events you'll receive when a user controls their device with a dedicated controller (see PlaybackController events below).
* **PlaybackController events** are sent to your skill when a user selects play/next/prev/pause on dedicated hardware controls on the Alexa device, such as on the Amazon Tap or the Voice Remote for Amazon Echo and Echo Dot.  Your skill receives these events if your skill is currently controlling audio on the device (i.e., you were the last to send an AudioPlayer directive).
* **AudioPlayer events** are sent to your skill at key changes in the status of audio playback, such as when audio has begun playing, been stopped or has finished.  You can use them to track what's currently playing or queue up more content.  Unlike intents, when you receive an AudioPlayer event, you may only respond with appropriate AudioPlayer directives to control playback.

The sample project plays a pre-defined list of audio content defined in `js/audioAssets.js`, allowing the user to control playback with a range of custom and built-in intents.  It's organized into several modules:

* `index.js` is the main module that handles events from Alexa.  In the sample project, we setup the skill and register handlers defined in seperate modules.
* `constants.js` holds a few constants like the Application ID of the skill and the name of a table in DynamoDB the skill will use to store details about what each user has played.
* `audioAssets.js` is a list of audio content the skill will play from.
* `stateHandlers.js` is where the skill handles voice intent and playback control commands.  It registers handlers for each of the input events in different states the skill can be in, and defines a `controller` that centralizes the handler code since we perform the same action for several different input events (e.g., we do the same thing when the user tells the skill to stop or if the stop button is pressed on the device).  The sample project define three states:
    * **START_MODE** is the default state of the skill, such as when it's invoked without an intent for the first time.
    * **PLAY_MODE** is used when audio is currently being played by the skill.
    * **RESUME_DECISION_MODE** is used to handle the response from the user when they're asked to confirm they'd like to resume playback from a prior use of the skill.
* `audioEventHandlers.js` is where the skill handles AudioPlayer events.  These events are only expected in the PLAY_MODE state and are used to track the user's progress through the content.

You can learn more about the new [AudioPlayer interface](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/custom-audioplayer-interface-reference) and [PlaybackController interface](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/custom-playbackcontroller-interface-reference).

## Cleanup

If you were deploying this skill just for learning purposes or for testing, do not forget to clean your AWS account to avoid recurring charges for your DynamoDB table.

- delete the lambda function (ask-custom-Multi_Stream_Audio_Player-default)
- delete the IAM excution role (ask-lambda-Multi-Stream-Audio-Player)
- delete the DynamoDB table (LongFormAudioSample)
