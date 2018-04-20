'use strict';

import { ResponseFactory } from 'ask-sdk-core';
import { HandlerInput, RequestHandler } from 'ask-sdk';
import { interfaces,Response,Request, IntentRequest} from 'ask-sdk-model';

export class SkillEventHandler implements RequestHandler {
    public async canHandle(handlerInput : HandlerInput) : Promise<boolean> {
        return handlerInput.requestEnvelope.request.type.startsWith('AlexaSkillEvent') || handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    }

    public async handle(handlerInput : HandlerInput) : Promise<Response> {

        return ResponseFactory.init()
            .getResponse();
    }
}