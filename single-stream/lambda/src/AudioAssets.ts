'use strict';

import { interfaces,Response,Request, IntentRequest} from 'ask-sdk-model';
let en = {
    card: {
        title: 'My Radio',
        text: 'Less bla bla bla, more la la la',
        image: {
            largeImageUrl: 'https://alexademo.ninja/skills/logo-512.png',
            smallImageUrl: 'https://alexademo.ninja/skills/logo-108.png'
        }
    },
    url: 'https://audio1.maxi80.com',
    startJingle: 'https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/jingle.m4a'
};

let fr = {
    card: {
        title: 'My Radio',
        text: 'Moins de bla bla bla, plus de la la la',
        image: {
            image: {
                largeImageUrl: 'https://alexademo.ninja/skills/logo-512.png',
                smallImageUrl: 'https://alexademo.ninja/skills/logo-108.png'
            }
    
        }
    },
    url: 'https://audio1.maxi80.com',
    startJingle: 'https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/jingle.m4a'
};

let it = {
    card: {
        title: 'La Mia Radio',
        text: 'Meno parlare, più musica',
        image: {
            image: {
                largeImageUrl: 'https://alexademo.ninja/skills/logo-512.png',
                smallImageUrl: 'https://alexademo.ninja/skills/logo-108.png'
            }
    
        }
    },
    url: 'https://audio1.maxi80.com',
    startJingle: 'https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/jingle.m4a'
};

let es = {
    card: {
        title: 'Mia Radio',
        text: 'Menos conversación, más música',
        image: {
            image: {
                largeImageUrl: 'https://alexademo.ninja/skills/logo-512.png',
                smallImageUrl: 'https://alexademo.ninja/skills/logo-108.png'
            }
    
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
        'fr-FR': fr,
        'it-IT': it,
        'es-ES': es,
};

export function audioData(request : Request) {
    let DEFAULT_LOCALE = 'en-US';
    var locale = request.locale;
    if (locale === undefined) { 
        locale = DEFAULT_LOCALE
    };
    return globalAudioData[locale];    
}

