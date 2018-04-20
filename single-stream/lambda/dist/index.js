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
const IntentHandlers_1 = require("./IntentHandlers");
const AudioHandlers_1 = require("./AudioHandlers");
const RadioRequestHandler_1 = require("./utils/RadioRequestHandler");
const SkillEventHandler_1 = require("./SkillEventHandler");
const Constants_1 = require("./Constants");
function handler(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const factory = ask_sdk_core_1.SkillBuilders.custom()
            .addRequestHandlers(new SkillEventHandler_1.SkillEventHandler(), RadioRequestHandler_1.RadioRequestHandler.builder()
            .withHandlers(IntentHandlers_1.IntentHandler)
            .withHandlers(AudioHandlers_1.AudioHandler)
            .build());
        const skill = factory.create();
        try {
            if (Constants_1.Constants.debug) {
                console.log("\n" + "******************* REQUEST  **********************");
                console.log(JSON.stringify(event, null, 2));
            }
            const responseEnvelope = yield skill.invoke(event, context);
            if (Constants_1.Constants.debug) {
                console.log("\n" + "******************* RESPONSE  **********************");
                console.log(JSON.stringify(responseEnvelope, null, 2));
            }
            return callback(null, responseEnvelope);
        }
        catch (error) {
            if (Constants_1.Constants.debug) {
                console.log(JSON.stringify(error, null, 2));
            }
            return callback(error);
        }
    });
}
exports.handler = handler;
//# sourceMappingURL=index.js.map