'use strict';

import 'mocha';
import { expect } from 'chai';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { handler as skill } from '../src/index';

import r from './request/stop_intent_while_not_playing.json'; // tslint:disable-line
const request: RequestEnvelope = <RequestEnvelope>r;

import { Assertion } from './utils/Assertion';
const A = new Assertion();

const USER_ID = "amzn1.ask.account.123";
let skill_response: ResponseEnvelope;


describe('Audio Player Test : StopIntent while not playing audio', function () {

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


  it('responds with valid response structure ', () => {

      A.checkResponseStructure(skill_response);
    }),

    it('does not respond with output speech ', () =>  {

      A.checkNoOutputSpeach(skill_response);
    }),

    it('responds with no directive ', () => {

      let r = skill_response.response;
      expect(r).to.not.have.property("directives");

    });
});