'use strict';

import { Skill, SkillBuilders, CustomSkillFactory } from 'ask-sdk-core';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { IntentHandler } from './IntentHandlers';
import { AudioHandler } from './AudioHandlers';
import { RadioRequestHandler } from './utils/RadioRequestHandler';
import { SkillEventHandler } from './SkillEventHandler';

import { Constants } from './Constants';

export async function handler(event: RequestEnvelope, context: any, callback: any): Promise<void> {
    const factory = SkillBuilders.custom()
        .addRequestHandlers(new SkillEventHandler(),
            RadioRequestHandler.builder()
                .withHandlers(IntentHandler)
                .withHandlers(AudioHandler)
                .build()
        );

    const skill = factory.create();

    try {

        if (Constants.debug) {
            console.log("\n" + "******************* REQUEST  **********************");
            console.log(JSON.stringify(event, null, 2));
        }

        const responseEnvelope: ResponseEnvelope = await skill.invoke(event, context);

        if (Constants.debug) {
            console.log("\n" + "******************* RESPONSE  **********************");
            console.log(JSON.stringify(responseEnvelope, null, 2));
        }

        return callback(null, responseEnvelope);

    } catch (error) {
        if (Constants.debug) {
            console.log(JSON.stringify(error, null, 2));
        }
        return callback(error);
    }
}