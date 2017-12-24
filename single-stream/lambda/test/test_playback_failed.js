'use strict';

let lambda = require('./lambda.js');
let skill = require('../src/index.js');
let constant = require('../src/constants.js');

let chai = require('chai');
chai.use(require('chai-string'));

let should = chai.should();
let assert = chai.assert;

var event = undefined;

describe('Audio Player Test : Playback Failed', function () {

  // pre-requisites
  before(function () {
    return lambda.simulateAlexa('./playback_failed.json');
  });


  it('it responses with valid response structure ', function (done) {

      lambda.response.should.have.property("version");
      lambda.response.version.should.equal("1.0");

      done();
    }),

    it('it responses with no output speech ', function (done) {

      lambda.response.should.have.property("response");
      let r = lambda.response.response;

      r.should.not.have.property("outputSpeech");

      done();
    }),

    it('it responses with an audio directive ', function (done) {

      let r = lambda.response.response;
      r.should.have.property("shouldEndSession");
      r.shouldEndSession.should.be.true;

      r.should.have.property("directives");
      let d = r.directives[0];
      d.should.have.property("type");
      d.type.should.startWith("AudioPlayer");

      done();

    });
});