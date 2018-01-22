'use strict';

let lambda = require('./lambda.js');
let audio = require('../src/audioAssets.js');
let ddb = require('../src/ddbController.js');

let chai = require('chai');
chai.use(require('chai-string'));

let should = chai.should();
let assert = chai.assert;

const USER_ID = "amzn1.ask.account.123";

describe('Audio Player Test : PlayIntent w/Jingle', function () {

  // pre-requisites
  before(function () {

    // prepare the database
    return ddb.deleteFromDDB(USER_ID).then( data => {

      console.log("Finished preping the database");
      return lambda.simulateAlexa('./play_intent.json');
    
    }).catch( (error) => {

      // when database preparation fails, it might be because the table doe snot exist or AWS_REGION is not set
      // run the test in any case.
      return lambda.simulateAlexa('./play_intent.json');
    
    });
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

    it('it responses with AudioPlayer.Play directive with a Jingle URL', function (done) {

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

      // does the URL name contains "Jingle" ?
      assert.strictEqual(d.audioItem.stream.url, audio(undefined).startJingle, "The stream URL is not the jingle")

      done();

    });
});