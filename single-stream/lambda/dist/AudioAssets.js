'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
let en = {
    card: {
        title: 'Maxi 80',
        text: 'The best eighties music\n\nVisit our web site https://www.maxi80.com',
        image: {
            largeImageUrl: 'https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/alexa-artwork-1200.png',
            smallImageUrl: 'https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/alexa-artwork-720.png'
        }
    },
    url: 'https://audio1.maxi80.com',
    startJingle: 'https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/jingle.m4a'
};
let fr = {
    card: {
        title: 'Maxi 80',
        text: 'La radio de toute une génération\n\nVisitez notre site web https://www.maxi80.com',
        image: {
            largeImageUrl: 'https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/alexa-artwork-1200.png',
            smallImageUrl: 'https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/alexa-artwork-720.png'
        }
    },
    url: 'https://audio1.maxi80.com',
    startJingle: 'https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/jingle.m4a'
};
let globalAudioData = {
    'en-US': en,
    'en-GB': en,
    'en-CA': en,
    'en-IN': en,
    'en-AU': en,
    'fr-FR': fr
};
function audioData(request) {
    let DEFAULT_LOCALE = 'en-US';
    var locale = request.locale;
    if (locale === undefined) {
        locale = DEFAULT_LOCALE;
    }
    ;
    return globalAudioData[locale];
}
exports.audioData = audioData;
//# sourceMappingURL=AudioAssets.js.map