'use strict';

let AWS = require('aws-sdk');
let constants = require('../src/constants.js');

async function getFromDDB(userId) {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: constants.skill.dynamoDBTableName,
            Key: {
                id: userId
            }
        };

        var documentClient = new AWS.DynamoDB.DocumentClient();

        documentClient.get(params, (err, data) => {
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

async function insertOrUpdateDDB(item) {

    return new Promise((resolve, reject) => {
        const params = {
            TableName: constants.skill.dynamoDBTableName,
            Item: item
        };

        var documentClient = new AWS.DynamoDB.DocumentClient();

        documentClient.put(params, (err, data) => {
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
async function deleteFromDDB(userId) {

    return new Promise((resolve, reject) => {

        var params = {
            TableName: constants.skill.dynamoDBTableName,
            Key: {
                id: userId
            }
        };

        var documentClient = new AWS.DynamoDB.DocumentClient();

        documentClient.delete(params, (err, data) => {
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

module.exports = { getFromDDB, insertOrUpdateDDB, deleteFromDDB }