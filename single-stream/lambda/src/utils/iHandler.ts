'use strict';

import { HandlerInput } from 'ask-sdk';
import { Response } from 'ask-sdk-model';

export interface IHandler {
    [key : string] : (handlerInput : HandlerInput) => Promise<Response>;
}