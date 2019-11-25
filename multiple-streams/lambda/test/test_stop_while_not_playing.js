'use strict';

let chai = require('chai');
chai.use(require('chai-string'));

let should = chai.should();
let assert = chai.assert;

let response;

describe('Multiple Stream Audio Player Test : Stop Intent while not playing audio', function () {

  this.timeout(5000);

  // pre-requisites
  before(() => {
    return new Promise((resolve, reject) => {
      const event = require('./requests/stop_intent_while_not_playing.json')
      let lambda = require('../src/index');
      lambda.handler(event, null, (error, result) => {
        console.log('******* RESPONSE *********');
        console.log(JSON.stringify(result, null, 2));
        console.log('**************************');
        response = result;
        resolve();
      });
    });
  });

  it('responds with valid response structure ',  () => {

      response.should.have.property("version");
      response.version.should.equal("1.0");
    }),

    it('does not respond with output speech ', () => {

      response.should.have.property("response");
      let r = response.response;

      r.should.not.have.property("outputSpeech");

    }),

    it('does not respond with a directive ',  () => {

      let r = response.response;
      r.should.have.property("shouldEndSession");
      r.shouldEndSession.should.be.true;

      r.should.have.property("directives");
      r.directives.should.have.lengthOf(0);

    });
});