'use strict';

let en = {
    "WELCOME_MSG": "Welcome to {{ skillName }}",
    "HELP_MSG": "Welcome to {{ skillName }}. You can play, stop, resume listening.  How can I help you ?",
    "UNHANDLED_MSG" : "Sorry, I could not understand what you've just said.",
    "CAN_NOT_SKIP_MSG" : "This is radio, you have to wait for next track to play.",
    "RESUME_MSG" : "Resuming {{ skillName }}",
    "NOT_POSSIBLE_MSG" : "This is radio, you can not do that.  You can ask me to stop or pause to stop listening.",
    "STOP_MSG" : "Goodbye."
};

let de = { // TODO translate to German
    "WELCOME_MSG": "Welcome to {{ skillName }}",
    "HELP_MSG": "Welcome to {{ skillName }}. You can play, stop, resume listening.  How can I help you ?",
    "UNHANDLED_MSG" : "Sorry, I could not understand what you've just said.",
    "CAN_NOT_SKIP_MSG" : "This is radio, you have to wait for next track to play.",
    "RESUME_MSG" : "Resuming {{ skillName }}",
    "NOT_POSSIBLE_MSG" : "This is radio, you can not do that.  You can ask me to stop or pause to stop listening.",
    "STOP_MSG" : "Goodbye."
};

let fr = {
        "WELCOME_MSG": "Bienvenue sur {{ skillName }}",
        "HELP_MSG": "Bienvenue sur {{ skillName }}. Vous pouvez démarrer, arrêter ou reprendre.  Que souhaitez-vous faire ?",
        "UNHANDLED_MSG" : "Désolé, je n'ai pas compris ce que vous avez dit.",
        "CAN_NOT_SKIP_MSG" : "C'est de la radio, vous devez attendre le titre suivant.",
        "RESUME_MSG" : "Je redémarre {{ skillName }}",
        "NOT_POSSIBLE_MSG" : "C'est de la radio, vous ne pouvez pas faire ca.  Vous pouvez me demander d'arrêter ou de metre en pause pour arrêter la musique.",
        "STOP_MSG" : "au revoir !"
}

module.exports = {
    "en-GB": {
        "translation": en
    },
    "en-US": {
        "translation": en
    },
    "en-IN": {
        "translation": en
    },
    "en-CA": {
        "translation": en
    },
    "en-AU": {
        "translation": en
    },
    "de-DE": {
        "translation": de
    },
    "fr-FR": {
        "translation": fr
    }
};
