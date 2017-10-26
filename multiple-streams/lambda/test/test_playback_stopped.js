'use strict';

const lambda = require('./lambda.js');
const skill = require('../src/index.js');
const constant = require('../src/constants.js');

const chai = require('chai');
chai.use(require('chai-string'));

const should = chai.should();
const assert = chai.assert;

let event = undefined;

describe('Audio Player Test : Playback Stopped', function () {

  // pre-requisites
  before(function (done) {

    // pass the skill debug flag to Lambda mockup
    lambda.debug = constant.debug;

    event = require('./playback_stopped.json');
    skill.handler(event, lambda.context(), lambda.callback);

    done();

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
