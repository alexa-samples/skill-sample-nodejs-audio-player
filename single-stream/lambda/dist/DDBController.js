'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const Constants_1 = require("./Constants");
class DDBController {
    constructor() {
        this.ddbService = new AWS.DynamoDB({
            endpoint: 'http://localhost:8000'
        });
        this.documentClient = new AWS.DynamoDB.DocumentClient(Constants_1.Constants.useLocalDB ? {
            service: this.ddbService
        } : {});
    }
    getFromDDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var params = {
                    TableName: Constants_1.Constants.jingle.databaseTable,
                    Key: {
                        userId: userId
                    }
                };
                this.documentClient.get(params, (err, data) => {
                    if (err) {
                        console.log("Error when calling DynamoDB");
                        console.log(err, err.stack); // an error occurred
                        reject(err);
                    }
                    else {
                        //console.log(data); // successful response
                        resolve(data);
                    }
                });
            });
        });
    }
    insertOrUpdateDDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var params = {
                    TableName: Constants_1.Constants.jingle.databaseTable,
                    Key: {
                        userId: userId
                    },
                    UpdateExpression: "SET lastPlayed = :time ADD playedCount :val",
                    ExpressionAttributeValues: {
                        ":val": 1,
                        ":time": Math.round(new Date().getTime())
                    }
                };
                this.documentClient.update(params, (err, data) => {
                    if (err) {
                        console.log("Error when calling DynamoDB");
                        console.log(err, err.stack); // an error occurred
                        reject(err);
                    }
                    else {
                        // console.log(data); // successful response
                        resolve(data);
                    }
                });
            });
        });
    }
    /*
     * Used for unit testing only, to prepare the database before the test
     */
    deleteFromDDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var params = {
                    TableName: Constants_1.Constants.jingle.databaseTable,
                    Key: {
                        userId: userId
                    }
                };
                this.documentClient.delete(params, (err, data) => {
                    if (err) {
                        console.log("Error when deleting item from DynamoDB");
                        console.log(err, err.stack); // an error occurred
                        reject(err);
                    }
                    else {
                        // console.log(data); // successful response
                        resolve(data);
                    }
                });
            });
        });
    }
}
exports.ddb = new DDBController();
//# sourceMappingURL=DDBController.js.map