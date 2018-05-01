'use strict';

import * as AWS from 'aws-sdk';

import { Constants } from '../../src/Constants';
import { AWSError } from 'aws-sdk';

class DDBController {


    private ddbService = new AWS.DynamoDB({
        endpoint: 'http://localhost:8000'
    });

    private documentClient = new AWS.DynamoDB.DocumentClient(Constants.useLocalDB ? {
        service: this.ddbService
    } : {});

    async getFromDDB(userId): Promise<AWS.DynamoDB.Types.DocumentClient.GetItemOutput> {
        return new Promise<AWS.DynamoDB.Types.DocumentClient.GetItemOutput>((resolve, reject) => {
            var params: AWS.DynamoDB.Types.DocumentClient.GetItemInput = {
                TableName: Constants.jingle.databaseTable,
                Key: {
                    id: userId
                }
            };

            this.documentClient.get(params, (err: AWSError, data: AWS.DynamoDB.Types.DocumentClient.GetItemOutput) => {
                if (err) {
                    console.log("Error when calling DynamoDB");
                    console.log(err, err.stack); // an error occurred
                    reject(err);
                } else {
                    //console.log(data); // successful response
                    resolve(data);
                }
            });
        });
    }

    async initialiseDDB(userId): Promise<AWS.DynamoDB.Types.DocumentClient.UpdateItemOutput> {

        return new Promise<AWS.DynamoDB.Types.DocumentClient.UpdateItemOutput>((resolve, reject) => {

            var params: AWS.DynamoDB.Types.DocumentClient.PutItemInput = {
                TableName: Constants.jingle.databaseTable,
                Item: {
                    id: userId,
                    attributes: {
                        lastPlayed: Math.round(new Date().getTime()),
                        playedCount: 0
                    }
                }
            };

            this.documentClient.put(params, (err: AWSError, data: AWS.DynamoDB.Types.DocumentClient.UpdateItemOutput) => {
                if (err) {
                    console.log("Error when calling DynamoDB");
                    console.log(err, err.stack); // an error occurred
                    reject(err);
                } else {
                    // console.log(data); // successful response
                    resolve(data);
                }
            });
        });
    }

    /*
     * Used for unit testing only, to prepare the database before the test
     */
    async deleteFromDDB(userId): Promise<AWS.DynamoDB.Types.DocumentClient.DeleteItemOutput> {

        return new Promise<AWS.DynamoDB.Types.DocumentClient.DeleteItemOutput>((resolve, reject) => {

            var params: AWS.DynamoDB.Types.DocumentClient.DeleteItemInput = {
                TableName: Constants.jingle.databaseTable,
                Key: {
                    id: userId
                }
            };

            this.documentClient.delete(params, (err: AWSError, data: AWS.DynamoDB.Types.DocumentClient.DeleteItemOutput) => {
                if (err) {
                    console.log("Error when deleting item from DynamoDB");
                    console.log(err, err.stack); // an error occurred
                    reject(err);
                } else {
                    // console.log(data); // successful response
                    resolve(data);
                }
            });
        });
    }
}

export const ddb = new DDBController();
