'use strict';

let lambda = require('./lambda.js');

let chai = require('chai');
chai.use(require('chai-string'));

let should = chai.should();
let assert = chai.assert;

var event = undefined;

describe('Audio Player Test : LaunchRequest', function () {

  // pre-requisites
  before(function () {
    return lambda.simulateAlexa('./launch_request.json');
  });

  it('it responses with valid response structure ', function (done) {

      lambda.response.should.have.property("version");
      lambda.response.version.should.equal("1.0");

      done();
    }),

    it('it responses with output speech ', function (done) {

      lambda.response.should.have.property("response");
      let r = lambda.response.response;

      r.should.have.property("outputSpeech");
      r.outputSpeech.should.have.property("type");
      r.outputSpeech.type.should.equal('SSML');
      r.outputSpeech.should.have.property("ssml");
      r.outputSpeech.ssml.should.startWith('<speak>');
      r.outputSpeech.ssml.should.endWith('</speak>');

      done();
    }),

    it('it responses with AudioPlayer.Play directive ', function (done) {

      let r = lambda.response.response;
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
      d.audioItem.stream.should.have.property("expectedPreviousToken");
      d.audioItem.stream.should.have.property("offsetInMilliseconds");

      done();

    });
});