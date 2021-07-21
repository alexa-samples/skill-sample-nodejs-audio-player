# Build An Alexa Skill with the Audio Player Interface (Node.js)

This Alexa sample skill is a template for using the AudioPlayer interface for Alexa-hosted skills.
Note that as this code is set up so that you can directly import this skill into your hosted skill.
Check out the Documentation below for links on how to import this skill directly from the Alexa
developer console.

## Skill Architecture
The skill consists of an inteface model and logic of the skill. This sample contains a sample skill that plays a single audio stream,
along with handlers for all of the AudioPlayer events, touch controls and error handling.
The skill also uses DynamoDB to keep track of current playback information.

## Additional Resources

### Documentation
* [AudioPlayer Interface](https://developer.amazon.com/docs/alexa/custom-skills/audioplayer-interface-reference.html)
* [Audio stream/file requirements](https://developer.amazon.com/docs/alexa/custom-skills/audioplayer-interface-reference.html#audio-stream-requirements)
* [Import a skill from a Git repository](https://developer.amazon.com/docs/alexa/hosted-skills/alexa-hosted-skills-git-import.html)

### Other Samples
* [Previous AudioPlayer samples (ASK CLI v1, ASK SDK v1)](https://github.com/alexa/skill-sample-nodejs-audio-player/releases)
