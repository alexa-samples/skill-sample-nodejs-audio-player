'use strict';

let AWS = require('aws-sdk');
let constants = require('./constants.js');

function getFromDDB(userId) {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: constants.jingle.databaseTable,
            Key: {
                userId: userId
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

function insertOrUpdateDDB(userId) {

    return new Promise((resolve, reject) => {

        var params = {
            TableName: constants.jingle.databaseTable,
            Key: {
                userId: userId
            },
            UpdateExpression: "SET lastPlayed = :time ADD playedCount :val",
            ExpressionAttributeValues:{
                ":val": 1,
                ":time": Math.round(new Date() / 1000)
            }
        };

        var documentClient = new AWS.DynamoDB.DocumentClient();

        documentClient.update(params, (err, data) => {
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
function deleteFromDDB(userId) {

    return new Promise((resolve, reject) => {

        var params = {
            TableName: constants.jingle.databaseTable,
            Key: {
                userId: userId
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