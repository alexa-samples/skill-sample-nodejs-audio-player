'use strict';

let lambda = require('./lambda.js');
let skill = require('../src/index.js');
let constant = require('../src/constants.js');

let chai = require('chai');
chai.use(require('chai-string'));

let should = chai.should();
let assert = chai.assert;

var event = undefined;

describe('Audio Player Test : Playback Stopped', function () {

  // pre-requisites
  before(function () {
    return lambda.simulateAlexa('./playback_stopped.json');
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

    it('it responses with no directive ', function (done) {

      let r = lambda.response.response;
      r.should.have.property("shouldEndSession");
      r.shouldEndSession.should.be.true;

      r.should.not.have.property("directives");

      done();

    });
});