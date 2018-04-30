/* CONSTANTS */

const Alexa = require('ask-sdk');

const skillBuilder = Alexa.SkillBuilders.standard();

export const constants = {
  appId: '',
  dynamoDBTableName: 'Audio-Player-Multi-Stream',
};

export const audioData = [
  {
    title: 'Episode 139',
    url: 'https://feeds.soundcloud.com/stream/274166909-amazon-web-services-306355661-aws-podcast-episode-139.mp3',
  },
  {
    title: 'Episode 140',
    url: 'https://feeds.soundcloud.com/stream/275202399-amazon-web-services-306355661-amazon-web-services.mp3',
  },
];