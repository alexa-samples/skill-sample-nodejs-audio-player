'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ask_sdk_core_1 = require("ask-sdk-core");
class SkillEventHandler {
    canHandle(handlerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return handlerInput.requestEnvelope.request.type.startsWith('AlexaSkillEvent') || handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
        });
    }
    handle(handlerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return ask_sdk_core_1.ResponseFactory.init()
                .getResponse();
        });
    }
}
exports.SkillEventHandler = SkillEventHandler;
//# sourceMappingURL=SkillEventHandler.js.map