# Build An Alexa Radio Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/master/single-stream/instructions/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/master/single-stream/instructions/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/master/single-stream/instructions/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/master/single-stream/instructions/4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/master/single-stream/instructions/5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/master/single-stream/instructions/6-publication.md)


# Single Stream Audio Skill (My Radio)

This skill demonstrates how to create a single stream audio skill.  Single stream skills are typically used by radio stations to provide a convenient and quick access to their live stream.

User interface is limited to Play and Stop use cases.

## Usage

```text
Alexa, play my radio

Alexa, stop
```

Work through these [instructions](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/master/single-stream/instructions/1-voice-user-interface.md) to build the audio skill.

<!-- Follow the instructions below for ASK CLI process, or follow these step by step [instructions](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/master/single-stream/instructions/1-voice-user-interface.md) to work in your browser.


## Installation

You will need to change a few configuration files before creating the skill and upload the lambda code.

### Pre-requisites

This is a NodeJS Lambda function and skill defintion to be used by [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html).

You need to initialize ASK CLI with

```bash
$ ask init
```

You need an [AWS account](https://aws.amazon.com) and an [Amazon developer account](https://developer.amazon.com) to create an Alexa Skill.

You need to download NodeJS dependencies :

```bash
$ (cd lambda && npm install)
$ (cd lambda/src && npm install)
```

### Required changes before to deploy

1. ```./skill.json```

   Change the skill name, example phrase, icons, testing instructions etc ...

   Remember than many information are locale-specific and must be changed for each locale (en-GB and en-US)

   Please refer to https://developer.amazon.com/docs/smapi/skill-manifest.html for details about manifest values.

2. ```./lambda/src/audioAssets.js```

   Modify each value in the audioAssets.js file to provide your skill at runtime the correct value : your radio name, description, icon and, obviosuly, URL of your stream (https only).

   To learn more about Alexa App cards, see https://developer.amazon.com/docs/custom-skills/include-a-card-in-your-skills-response.html

```javascript
var audioData = {
    title: "<The title of the card for the Alexa App>",
    subtitle: "<The subtitle of the card for the Alexa App>",
    cardContent: "<The contect of the card for the Alexa App>",
    url: "<your stream HTTPS URL>",
    image: {
        largeImageUrl: "<the HTTPS URL of your large icon for the Alexa App>",
        smallImageUrl: "<the HTTPS URL of your small icon for the Alexa App>"
    }
};
```

3. ```./models/*.json```

Change the model defintion to replace the invocation name (it defaults to "my radio") and the sample phrases for each intent.  

Repeat the operation for each locale you are planning to support.


### Local Tests

This code is using [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) to test the responses returned by your skill.  Before to deploy, be sure to have no test failures.

Execute your test by typing

```bash
$ (cd lambda && npm test)
```

### Deployment

ASK will create the skill and the lambda function for you.

Lambda function will be creadted in ```us-east-1``` (Northern Virginia) by default.

You deploy the skill and the lambda function in one step :

```bash
$ ask deploy
```

You can test your deployment by FIRST ENABLING the TEST switch on your skill in the Alexa Developer Console.

Then

```bash
 $ ask simulate -l en-GB -t "alexa, play my radio"

 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
◡ Waiting for simulation response{
  "status": "SUCCESSFUL",
  ...
 ```

You should see the code of the skill's response after the SUCCESSFUL line.

#### Change the skillid in lambda code. (Optional but recommended)

Once the skill and lambda function is deployed, do not forget to add the skill id to ```lambda/src/constants.js``` to ensure your code is executed only for your skill.

Uncomment the ```AppId``` line and change it with your new skill id.  You can find the skill id by typing :

```bash
$ ask api list-skills
```
```json
{
  "skills": [
    {
      "lastUpdated": "2017-10-08T08:06:34.835Z",
      "nameByLocale": {
        "en-GB": "My Radio",
        "en-US": "My Radio"
      },
      "skillId": "amzn1.ask.skill.123",
      "stage": "development"
    }
  ]
}
```

Then copy/paste the skill id to ```lambda/src/constants.js```    

```javascript
module.exports = Object.freeze({

    //App-ID. TODO: set to your own Skill App ID from the developer portal.
    appId : "amzn1.ask.skill.123",

    // when true, the skill logs additional detail, including the full request received from Alexa
    debug : false

});
```

## On Device Tests

To be able to invoke the skill on your device, you need to login to Alexa Developer Console, and enable the "Test" switch on your skill.

See https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html#step-4-test-your-skill for more testing instructions.

Then, just say :

```text
Alexa, open my radio.
``` -->

<a href="https://github.com/alexa/skill-sample-nodejs-audio-player/blob/master/single-stream/instructions/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_get_started._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
