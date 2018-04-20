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
class RadioRequestHandler {
    static builder() {
        return new RadioRequestHandlerBuilder();
    }
    constructor(builder) {
        this.handlers = builder.handlers;
    }
    canHandle(handlerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetHandlerName = (handlerInput.requestEnvelope.request.type === 'IntentRequest')
                ? handlerInput.requestEnvelope.request.intent.name
                : handlerInput.requestEnvelope.request.type;
            return Object.prototype.hasOwnProperty.call(this.handlers, targetHandlerName);
        });
    }
    handle(handlerInput) {
        const targetHandlerName = (handlerInput.requestEnvelope.request.type === 'IntentRequest')
            ? handlerInput.requestEnvelope.request.intent.name
            : handlerInput.requestEnvelope.request.type;
        return this.handlers[targetHandlerName](handlerInput);
    }
}
exports.RadioRequestHandler = RadioRequestHandler;
class RadioRequestHandlerBuilder {
    constructor() {
        this._handlers = {};
    }
    get handlers() {
        return this._handlers;
    }
    withHandlers(handlers) {
        this._handlers = Object.assign({}, this._handlers, handlers);
        return this;
    }
    build() {
        return new RadioRequestHandler(this);
    }
}
exports.RadioRequestHandlerBuilder = RadioRequestHandlerBuilder;
//# sourceMappingURL=RadioRequestHandler.js.map