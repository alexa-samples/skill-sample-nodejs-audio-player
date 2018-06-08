'use strict';

import { HandlerInput } from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import { i18n } from './utils/I18N';

export const CheckAudioInterfaceHandler = {
    
    canHandle(handlerInput : HandlerInput) : boolean {
      let result = false;
      try {
        result = (handlerInput.requestEnvelope.context.System.device.supportedInterfaces.AudioPlayer === undefined);
      } catch(e) {
          // system.device or system.device.supportedInterfaces is undefined.
          // this happens when the skill receives audio player event or skill lifecycle events 
      }
      return result;
    },

    handle(handlerInput : HandlerInput) :  Response {
      return handlerInput.responseBuilder
        .speak(i18n.S(handlerInput.requestEnvelope.request, "DEVICE_NOT_SUPPORTED"))
        .withShouldEndSession(true)
        .getResponse();
    },
  };