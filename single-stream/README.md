# Single Stream Audio Skil (My Radio)

This skill demonstrates how to create a single stream audio skill.  Single stream skills are typically used by radio stations to provide a convenient and quick access to their live stream.  

User interface is limited to Play and Stop use cases.

## Usage 

Alexa, play my radio  
Alexa, stop

## Installation

You will need to change a few configuration files before to create the skill and upload the lambda code.

### Pre-requisites

This is a NodeJS Lambda function and skill defintion to be used by [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html).

You need an [AWS account](https://aws.amazon.com) and an [Amazon developer account](https://developer.amazon.com) to create an Alexa Skill.

Download NodeJS dependencies :

```bash
cd lambda && npm install
cd src && npm install
cd ../.
```

### Required changes before to deploy 

1. ./skill.json

   Change the skill name, example phrase, icons, testing instructions etc ...  
   Remember than many information are locale-specific and must be changed for each locale (en-GB and en-US)

   Please refer to https://developer.amazon.com/docs/smapi/skill-manifest.html for details about manifest values.

2. ./lambda/src/audioAssets.js 

   Modify each value in the audioAssets.js file to provide your skill at runtime the correct value : your radio name, decsription, icon and, obviosuly, URL of your stream (https only).

   To learn more about Alexa App cards, see https://developer.amazon.com/docs/custom-skills/include-a-card-in-your-skills-response.html

```json
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

### Local Tests

This code is using Mocha and Chai to test the responses returned by your skill.  Before to deploy, be sure to have no test failures.

Execute your test by typing 

```bash
cd lambda
npm test
```

### Deployment

ASK will create the skill and the lambda functionf for you.  
Lambda function will be creadted in us-east-1 (Northern Virginia) by default.


```bash
ask deploy 
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

#### Change the skillid in lambda code. (Optional but recommended)

Once the skill and lambda function is deployed, do not forget to add the skill id to ```lambda/src/constants.js``` to ensure your code is executed only for your skill.

Uncomment the ```AppId``` line and change it with your new skill id.

```json
module.exports = Object.freeze({
    
    //App-ID. TODO: set to your own Skill App ID from the developer portal.
    //appId : 'amzn1.ask.skill.123',

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
```