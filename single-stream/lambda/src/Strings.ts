'use strict';

let EnglishStrings = {
    "WELCOME_MSG": "Welcome to {0}",
    "HELP_MSG": "Welcome to {0}. You can play, stop, resume listening.  How can I help you ?",
    "UNHANDLED_MSG" : "Sorry, I could not understand what you've just said.",
    "CAN_NOT_SKIP_MSG" : "This is radio, you have to wait for next track to play.",
    "RESUME_MSG" : "Resuming {0}",
    "NOT_POSSIBLE_MSG" : "This is radio, you can not do that.  You can ask me to stop or pause to stop listening.",
    "STOP_MSG" : "Goodbye.",
    "DEVICE_NOT_SUPPORTED" : "Sorry, this skill is not supported on this device",
    
    "TEST": "test english",
    "TEST_PARAMS": "test with parameters {0} and {1}",    
};
let FrenchStrings = {
    "WELCOME_MSG": "Bienvenue sur {0}",
    "HELP_MSG": "Bienvenue sur {0}. Vous pouvez démarrer, arrêter ou reprendre.  Que souhaitez-vous faire ?",
    "UNHANDLED_MSG" : "Désolé, je n'ai pas compris ce que vous avez dit.",
    "CAN_NOT_SKIP_MSG" : "C'est de la radio, vous devez attendre le titre suivant.",
    "RESUME_MSG" : "Je redémarre {0}",
    "NOT_POSSIBLE_MSG" : "C'est de la radio, vous ne pouvez pas faire ca.  Vous pouvez me demander d'arrêter ou de metre en pause pour arrêter la musique.",
    "STOP_MSG" : "au revoir !",
    "DEVICE_NOT_SUPPORTED" : "Désolé, cette skill ne peut être utilisée sur cet appareil.",

    "TEST": "test français",
    "TEST_PARAMS": "test avec paramètres {0} et {1}",    
};
let ItalianStrings = {
    "WELCOME_MSG": "Benvenuto in {0}",
    "HELP_MSG": "Benvenuto in {0}. Puoi ascoltare, mettere in pausa o riprendere l'ascolto. Come posso aiutarti?",
    "UNHANDLED_MSG": "Scusami, non ho capito quello che hai appena detto",
    "CAN_NOT_SKIP_MSG": "Questa è radio, devi attendere per passare al prossimo brano",
    "RESUME_MSG": "Riprendo {0}",
    "NOT_POSSIBLE_MSG": "Questa è radio, non è possibile procedere. Puoi chiedermi di terminare o mettere in pausa l'ascolto",
    "STOP_MSG": "Arrivederci",
    "DEVICE_NOT_SUPPORTED": "Mi spiace, questa skill non è supportata da questo dispositivo",

    "TEST": "test italiano",
    "TEST_PARAMS": "testa con i parametri {0} e {1}",
};
let SpanishStrings = {
    "WELCOME_MSG": "Hola, esta es {0}",
    "HELP_MSG" : "Hola, con {0}. Tu puedes reproducir, parar o volver a escuchar la radio. Qué quieres hacer?",
    "UNHANDLED_MSG": "Lo siento, No pude entender lo que acabas de decir.", 
    "CAN_NOT_SKIP_MSG": "Recuerda que esto es la radio, tu debes esperar la siguiente reproducción en lista.",
    "RESUME_MSG": "reiniciando la reproduccion  {0}",
    "NOT_POSSIBLE_MSG": "Recuerda que esto es la radio, no puedo hacer eso.  Sí quieres detener  la reproducción, me puedes decir: para o pausa, .",
    "STOP_MSG": "Adiós."
};
export const strings = {
    "en-GB": EnglishStrings,
    "en-US": EnglishStrings,
    "en-IN": EnglishStrings,
    "en-CA": EnglishStrings,
    "en-AU": EnglishStrings,
    "fr-FR": FrenchStrings,
    "fr-CA": FrenchStrings,
    "it-IT": ItalianStrings,
    "es-ES": SpanishStrings
};
