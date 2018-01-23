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
    }
};
