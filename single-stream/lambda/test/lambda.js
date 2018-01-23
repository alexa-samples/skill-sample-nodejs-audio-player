'use strict';

let constant = require('../src/constants.js');
let skill = require('../src/index.js');

// keep track of resolve, reject pair per event
var promiseResolvers = undefined;

exports.response = undefined;

exports.callback = function callback(error, result) {

    if (error !== undefined && error !== null) {
        console.error(error);
        promiseResolvers.reject(error);
        return;
    }
    if (result !== undefined && result !== null) {
        // if (exports.debug) {
        //     console.log("\n" + "******************* RESPONSE **********************");
        //     console.log("\n" + JSON.stringify(result, null, 2));
        // }
        exports.response = result;
    } else {
        console.log('result undefined or null');
    }

    promiseResolvers.resolve(result);
}

exports.simulateAlexa = function simulateAlexa(eventFile) {

    let event = require(eventFile);
    return new Promise( (resolve, reject) => {
        promiseResolvers = { resolve, reject }
        skill.handler(event, exports.context, exports.callback);
    });

}

exports.context = function context() {

    //mostly used for compatibility with old Lambda function, not using callback
    context.done = function (error, result) {
        console.log("DEPRECATED - USE CALLBACKS INSTEAD");
        console.log("http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html#nodejs-prog-model-handler-callback");
        process.exit();
    }
    context.succeed = function (result) {
        console.log("DEPRECATED - USE CALLBACKS INSTEAD");
        console.log("http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html#nodejs-prog-model-handler-callback");
        process.exit();
    }
    context.fail = function (error) {
        console.log("DEPRECATED - USE CALLBACKS INSTEAD");
        console.log("http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html#nodejs-prog-model-handler-callback");
        process.exit();
    }

    return context;
}