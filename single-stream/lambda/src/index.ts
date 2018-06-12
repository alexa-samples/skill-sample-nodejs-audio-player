'use strict';

import * as AWS from 'aws-sdk';
import { SkillBuilders } from 'ask-sdk';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { IntentHandler } from './IntentHandlers';
import { AudioHandler } from './AudioHandlers';
import { RadioRequestHandler } from './utils/RadioRequestHandler';
import { SkillEventHandler } from './SkillEventHandler';
import { CheckAudioInterfaceHandler } from './CanPlayAudioCheck';

import { Constants } from './Constants';

export async function handler(event: RequestEnvelope, context: any, callback: any): Promise<void> {

    const factory = SkillBuilders.standard()
        .addRequestHandlers(
            CheckAudioInterfaceHandler,
            new SkillEventHandler(),
            RadioRequestHandler.builder()
                .withHandlers(IntentHandler)
                .withHandlers(AudioHandler)
                .build()
        )
        .withAutoCreateTable(true)
        .withTableName(Constants.jingle.databaseTable);

    if (Constants.useLocalDB) {
        const ddbClient = new AWS.DynamoDB({
            endpoint: 'http://localhost:8000'
        });

        factory.withDynamoDbClient(ddbClient);
    }

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