'use strict';

let chai = require('chai');
chai.use(require('chai-string'));

let should = chai.should();
let assert = chai.assert;

let response;

describe('Multiple Stream Audio Player Test : Next Intent', function () {

  this.timeout(5000);

  // pre-requisites
  before(() => {
    return new Promise((resolve, reject) => {
      const event = require('./requests/next_intent.json')
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

  it('it responses with valid response structure ',  () => {

      response.should.have.property("version");
      response.version.should.equal("1.0");
    }),

    it('it responses with output speech ', () => {

      response.should.have.property("response");
      let r = response.response;

      r.should.have.property("outputSpeech");
      r.outputSpeech.should.have.property("type");
      r.outputSpeech.type.should.equal('SSML');
      r.outputSpeech.should.have.property("ssml");
      r.outputSpeech.ssml.should.startWith('<speak>');
      r.outputSpeech.ssml.should.endWith('</speak>');

    }),

    it('it closes the session',  () => {
      let r = response.response;
      r.should.have.property("shouldEndSession");
      r.shouldEndSession.should.be.true;
    });

    it('it responses with AudioPlayer.Play directive ',  () => {

      let r = response.response;
      r.should.have.property("shouldEndSession");
      r.shouldEndSession.should.be.true;

      r.should.have.property("directives");
      r.directives.should.have.lengthOf(1);

      let d = r.directives[0];
      d.should.have.property("type");
      d.type.should.equal("AudioPlayer.Play");
      d.should.have.property("playBehavior");
      d.playBehavior.should.equal("REPLACE_ALL");
      d.should.have.property("audioItem");
      d.audioItem.should.have.property("stream");
      d.audioItem.stream.should.have.property("url");
      d.audioItem.stream.url.should.startWith("https://");
      d.audioItem.stream.should.have.property("token");
      // d.audioItem.stream.should.have.property("expectedPreviousToken");
      d.audioItem.stream.should.have.property("offsetInMilliseconds");

    });
});