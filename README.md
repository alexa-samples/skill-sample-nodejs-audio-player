# Audio Player Sample Project

Alexa Skills Kit now allows 3P-developers to build skills supporting Audio Player Interfaces. This sample project will showcase how developers can use long form audio in Alexa Skills.

## How to Get Started

Setup AWS and the Amazon Developer Console.

You can change the name of these resources to whatever you like later, but for now, setup the following items:

1. Create or login to an [AWS account](https://aws.amazon.com/). In the AWS Console:
    1. Create an AWS Role in IAM with access to Lambda and DynamoDB.
        ![create_role_1](https://cloud.githubusercontent.com/assets/7671574/17451098/09f64f40-5b19-11e6-82ee-b82c98387052.png "AWS Create Role Screenshot 1")
        ![create_role_2](https://cloud.githubusercontent.com/assets/7671574/17451100/0c3ef928-5b19-11e6-9aca-8cd353106396.png "AWS Create Role Screenshot 2")
        ![create_role_3](https://cloud.githubusercontent.com/assets/7671574/17451101/0e3c5ff4-5b19-11e6-90f6-0210dae6f9dc.png "AWS Create Role Screenshot 3")

    2. Create an AWS Lambda function named AudioPlayerLambdaFunction being sure to select the role created above and configuring "Alexa Skills Kit" as the "Trigger".
        ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/aws-lambda-ask-trigger.PNG "AWS Lambda Trigger")

    3. Zip the contents in `src/js` and upload in "Lambda function code".
        ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/aws-lambda-role.PNG "AWS Lambda Role")

    4. Review and create the Lambda function.

    5. After creation, take note of the ARN on the upper right, which you'll configure in the Developer Console below.

2. Create or login to an [Amazon Developer account](https://developer.amazon.com).  In the Developer Console:
    1. [Create an Alexa Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function) named  Audio Player and using the invocation name Audio Player and select 'Yes' for Audio Player support.
     ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/prod-skill-info.png "Developer Portal Skill Information")

    2. Copy the contents of `src/speechAssets` into the Interaction Model tab.
    ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/prod-interaction-model.png "Developer Portal Interaction Model")

    3. Copy the Lambda ARN from above in the Configuration tab.
     ![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/prod-configuration.png "Developer Portal Configuration")

    4. You can start testing the skill on your device or on the simulator now, but you can go ahead and fill in the Publishing Information and accept the Privacy & Compliance information to submit the skill for certification.


## How it Works

Alexa Skills Kit introduced the 'AudioPlayer' interface which provides directives and requests for streaming audio and monitoring playback progression. You can include AudioPlayer directives within your response to start and stop the playback. Alexa also sends "PlaybackController" requests in response to hardware buttons such as on a remote control. Below you can see how to create these directives.

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


In response to AudioPlayer directives, you receive **AudioPlayer Requests**. You can learn more about the [AudioPlayer Interface](https://drive.corp.amazon.com/view/DevComm/ask-docs/custom-audioplayer-interface-reference.html) here.

## Audio Assets

Configure `src/js/audioAssets.js` to add your audio assets and enjoy building your own customized audio player skill.
