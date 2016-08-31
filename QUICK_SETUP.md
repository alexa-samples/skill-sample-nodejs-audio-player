# Quick Setup with BST

If you would like to get started working with this project quickly, to see how the new streaming works, just follow these directions.  

You can return to the [main README] (https://github.com/bespoken/skill-sample-nodejs-audio-player/README.md) 
when you want to do a production deployment. These steps will allow you to get quickly setup and then do "frictionless iterations" on your code.

## Running the Sample

1) Clone the project
```bash
git clone https://github.com/alexa/skill-sample-nodejs-audio-player.git
cd skill-sample-nodejs-audio-player/js
npm install
```

2) Install **Bespoken Tools**  
The Bespoken Tools (aka bst) make it easy to debug and develop your skills locally.  

The proxy tool, which we will be using, works by redirecting traffic from the Alexa service directly to your development laptop or machine.

```
npm install bespoken-tools -g
```

3) Run **bst proxy** to get setup  
From the directory where you cloned the project, run:
```
bst proxy lambda js/index.js
```
The proxy will print out some basic information:
```
BST: v0.6.5  Node: v6.3.0

Your URL for Alexa Skill configuration:
https://proxy.bespoken.tools?node-id=83118179-ae4a-4132-8c15-82af566efa2b
```
The URL that is printed out will be used in the next step.

4) Create or login to an [Amazon Developer account](https://developer.amazon.com).  In the Developer Console:  

A. [Create an Alexa Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function) named MySkill and using the invocation name "my skill" and select 'Yes' for Audio Player support.
![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/prod-skill-info.png "Developer Portal Skill Information")

B. Copy the contents of `speechAssets/intentSchema.json` and `speechAssets/Utterances.txt` into the intent schema and sample utterances fields on the Interaction Model tab.
&nbsp;&nbsp;&nbsp;&nbsp;![alt text](https://s3.amazonaws.com/lantern-public-assets/audio-player-assets/prod-interaction-model.png "Developer Portal Interaction Model")
    
C. Set the URL from above in the Configuration tab.
![alt text](https://raw.githubusercontent.com/bespoken/skill-sample-nodejs-audio-player/mainline/docs/images/SkillConfigurationScreenshot.png "Developer Portal Configuration")
        
5) Try it out  
A. Via the Test tab, enable the skill for testing:
![alt text](https://raw.githubusercontent.com/bespoken/skill-sample-nodejs-audio-player/mainline/docs/images/EnableTesting.png "Enable Testing")

Then send an intent to your skill:
![alt text](https://raw.githubusercontent.com/bespoken/skill-sample-nodejs-audio-player/mainline/docs/images/FirstTest.png "Enter Play the podcast and hit Play")

## Voila!
Enjoy! We love feedback - talk to us on Gitter at:  
https://gitter.im/bespoken/bst


