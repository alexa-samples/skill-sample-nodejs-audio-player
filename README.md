# Audio Player Sample Project

Alexa Skills Kit now allows 3P-developers to build skills supporting Audio Player Interfaces. This sample project will showcase how developers can use long form audio in Alexa Skills.

## How to Get Started

Setup AWS and the Amazon Developer Console.

You can change the name of these resources to whatever you like later, but for now, setup the following items:

1. Create or login to an [AWS account](https://aws.amazon.com/). In the AWS Console:
    1. Create an AWS role with full access to Lambda and DynamoDB.
    2. Create an AWS Lambda function named AudioPlayerLambdaFunction being sure to select the role created above and configuring "Alexa Skills Kit" as the "Trigger".
    ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/aws-lambda-role.PNG "AWS Lambda Role")

    ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/aws-lambda-ask-trigger.PNG "AWS Lambda Trigger")
    3. Zip the contents in `src/js` and upload in "Lambda function code".
    4. Review and create the lambda function.
    5. After creation, take note of the ARN on the upper right, which you'll configure in the Developer Console below.

2. Create or login to an [Amazon Developer account](https://developer.amazon.com).  In the Developer Console:
    **TODO Change to Prod Account Screenshots**
    1. [Create an Alexa Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function) named MySkill and using the invocation name "my skill" and select 'Yes' for Audio Player support.
     ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/developer-portal-skill-information.PNG "Developer Portal Skill Information")

    2. Copy the contents of `src/InteractionModel` into the Interaction Model tab.
    ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/developer-portal-interaction-model.PNG "Developer Portal Interaction Model")

    3. Plug the ARN you noted above in Configuration tab.
     ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/developer-portal-configuration.PNG "Developer Portal Configuration")

    4. You start testing the skill on your device or on the simulator now, but you can go ahead and fill in the Publishing Information and accept the Privacy & Compliance information to submit the skill for certification.


## How it Works

Alexa Skills Kit introduces 'AudioPlayer' interface which provides directives and requests for streaming audio and monitoring playback progression. You can include AudioPlayer directives within your response to start and stop the playback. Alexa also sends "PlaybackController" requests in response to hardware buttons such as on a remote control. Below you can see how to create these directives.

With the Node JS Alexa-SDK, one can add an AudioPlayer directive by adding :
```javascript
this.response.audioPlayerPlay(playBehavior, url, token, expectedPreviousToken, offsetInMilliseconds);
this.response.audioPlayerStop();
this.response.audioPlayerClearQueue(clearBehavior);
```
##### AudioPlayer Play Directive :

```json
{
  "type": "AudioPlayer.Play",
  "playBehavior": "string - REPLACE_ALL || ENQUEUE || REPLACE_ENQUEUED",
  "audioItem": {
    "stream": {
      "url": " string - HTTPS Stream Required",
      "token": "string",
      "expectedPreviousToken": "string",
      "offsetInMilliseconds": 0
    }
  }
}
```

##### AudioPlayer Stop Directive :

```json
{
  "type": "AudioPlayer.Stop"
}
```

##### AudioPlayer ClearQueue Directive :
```json
{
  "type": "AudioPlayer.ClearQueue",
  "clearBehavior" : "string - CLEAR_ENQUEUED || CLEAR_ALL"
}
```


In response to AudioPlayer directives, you receive **AudioPlayer Requests**. You can learn more about the [AudioPlayer Interfaces here](https://drive.corp.amazon.com/view/DevComm/ask-docs/custom-audioplayer-interface-reference.html). (**TODO Change hyperlink**)

## Audio Assets

Configure `src/js/audioAssets.js` to add your audio assets and enjoy building your own customized audio player skill.