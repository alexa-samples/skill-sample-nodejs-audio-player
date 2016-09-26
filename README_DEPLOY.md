# Audio Player Sample Project

The Alexa Skills Kit now allows developers to build skills that play long-form audio content on Alexa devices.  This sample project demonstrates how to use the new interfaces for triggering playback of audio and handling audio player input events.

## How to Run the Sample

1. Clone the project and package the skill:
```bash
git clone https://github.com/alexa/skill-sample-nodejs-audio-player.git
cd skill-sample-nodejs-audio-player/js
npm install
zip -r ../audio-player.zip *
```
2. Create or login to an [AWS account](https://aws.amazon.com/). In the AWS Console:

    1. Create an AWS Role in IAM with access to Lambda, CloudWatch Logs and DynamoDB.
        ![create_role_1](https://cloud.githubusercontent.com/assets/7671574/17451098/09f64f40-5b19-11e6-82ee-b82c98387052.png "AWS Create Role Screenshot 1")
        ![create_role_2](https://cloud.githubusercontent.com/assets/7671574/17451100/0c3ef928-5b19-11e6-9aca-8cd353106396.png "AWS Create Role Screenshot 2")
        ![create_role_3](https://cloud.githubusercontent.com/assets/7671574/18011103/7b05f2b2-6b68-11e6-8dc3-3aa9ead6d83e.png "AWS Create Role Screenshot 3")

    2. Create an AWS Lambda function named AudioPlayerLambdaFunction being sure to select the role created above, configuring "Alexa Skills Kit" as the "Trigger" and using the zip file created above as the source.
        ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/aws-lambda-role.PNG "AWS Lambda Role")
        ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/aws-lambda-ask-trigger.PNG "AWS Lambda Trigger")
    3. After creation, take note of the ARN on the upper right, which you'll configure in the Developer Console below.
    
3. Create or login to an [Amazon Developer account](https://developer.amazon.com).  In the Developer Console:

    1. [Create an Alexa Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function) named MySkill and using the invocation name "my skill" and select 'Yes' for Audio Player support.
        ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/prod-skill-info.png "Developer Portal Skill Information")
    2. Copy the contents of `speechAssets/intentSchema.json` and `speechAssets/Utterances.txt` into the intent schema and sample utterances fields on the Interaction Model tab.
        ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/prod-interaction-model.png "Developer Portal Interaction Model")
    3. Copy the Lambda ARN from above in the Configuration tab.
        ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/prod-configuration.png "Developer Portal Configuration")
     
4. You can start using the skill on your device or in the simulator using the invocation phrase "Alexa, ask my skill to play".

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
