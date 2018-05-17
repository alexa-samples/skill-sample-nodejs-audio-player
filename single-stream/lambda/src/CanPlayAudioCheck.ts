'use strict';

import { HandlerInput } from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import { i18n } from './utils/I18N';

export const CheckAudioInterfaceHandler = {
    
    canHandle(handlerInput : HandlerInput) : boolean {
      return handlerInput.requestEnvelope.context.System.device.supportedInterfaces.AudioPlayer === undefined;
    },

    handle(handlerInput : HandlerInput) :  Response {
      return handlerInput.responseBuilder
        .speak(i18n.S(handlerInput.requestEnvelope.request, "DEVICE_NOT_SUPPORTED"))
        .withShouldEndSession(true)
        .getResponse();
    },
  };