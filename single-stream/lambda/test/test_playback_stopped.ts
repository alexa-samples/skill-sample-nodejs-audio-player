'use strict';

import 'mocha';
import { expect, should } from 'chai';

import { interfaces, RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';

import { handler as skill } from '../src/index';
import { Constants } from '../src/Constants';
import { strings } from '../src/Strings';
import { ddb } from './utils/DDBController';
import { i18n } from '../src/utils/I18N';
import { audioData } from '../src/AudioAssets';

import * as r from './request/playback_stopped.json'; // tslint:disable-line
const request: RequestEnvelope = <RequestEnvelope>r;

import { Assertion } from './utils/Assertion';
const A = new Assertion();

const USER_ID = "amzn1.ask.account.123";
let skill_response: ResponseEnvelope;

describe('Audio Player Test : Playback Stopped', function () {

  // pre-requisites
  before(() => {

    this.timeout(5000);

    return new Promise((resolve, reject) => {
      skill(request, null, (error, responseEnvelope) => {
        skill_response = responseEnvelope;
        resolve();
      });
    });
  });

  it('it responses with valid response structure ', () => {

    A.checkResponseStructure(skill_response);
  }),

  it('it responses with no output speech ', () => {

    expect(skill_response).to.have.property("response");
    let r = skill_response.response;

    expect(r).to.not.have.property("outputSpeech");
  }),

  it('it responses with no directive ', () => {

    expect(skill_response).to.have.property("response");
    let r = skill_response.response;

    expect(r).to.not.have.property("directives");
  });

});