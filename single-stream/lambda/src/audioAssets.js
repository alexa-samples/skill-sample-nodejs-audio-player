'use strict';

let en = {
    card : {
        title: 'My Radio',
        subtitle: 'Less bla bla, more la la',
        cardContent: "Visit our web site https://www.myradio.com",
        image: {
            largeImageUrl: 'https://s3.amazonaws.com/alexademo.ninja/maxi80/alexa-artwork-1200.png',
            smallImageUrl: 'https://s3.amazonaws.com/alexademo.ninja/maxi80/alexa-artwork-720.png'
        }
    },
    url: 'https://audio1.maxi80.com',
    startJingle : 'https://s3.amazonaws.com/alexademo.ninja/maxi80/jingle.m4a'    
};

let de = { // TODO add german translation
    card : {
        title: 'My Radio',
        subtitle: 'Less bla bla, more la la',
        cardContent: "Visit our web site https://www.myradio.com",
        image: {
            largeImageUrl: 'https://s3.amazonaws.com/alexademo.ninja/maxi80/alexa-artwork-1200.png',
            smallImageUrl: 'https://s3.amazonaws.com/alexademo.ninja/maxi80/alexa-artwork-720.png'
        }
    },
    url: 'https://audio1.maxi80.com',
    startJingle : 'https://s3.amazonaws.com/alexademo.ninja/maxi80/jingle.m4a'        
} 

let fr = { // TODO add german translation
    card : {
        title: 'Ma Radio',
        subtitle: 'Moins de bla bla, plus de la la la',
        cardContent: "Visitez notre site web https://www.myradio.com",
        image: {
            largeImageUrl: 'https://s3.amazonaws.com/alexademo.ninja/maxi80/alexa-artwork-1200.png',
            smallImageUrl: 'https://s3.amazonaws.com/alexademo.ninja/maxi80/alexa-artwork-720.png'
        }
    },
    url: 'https://audio1.maxi80.com',
    startJingle : 'https://s3.amazonaws.com/alexademo.ninja/maxi80/jingle.m4a'        
} 

let globalAudioData = {
    'en-US': en,
    'en-GB': en,
    'en-CA': en,
    'en-IN': en,
    'en-AU': en,
    'de-DE': de,
    'fr-FR': fr
};

function audioData(request) {
    let DEFAULT_LOCALE = 'en-US';
    var locale = request === undefined ? DEFAULT_LOCALE : request.locale;
    if (locale === undefined) { 
        locale = DEFAULT_LOCALE
    };
    return globalAudioData[locale];    
}

module.exports = audioData;
