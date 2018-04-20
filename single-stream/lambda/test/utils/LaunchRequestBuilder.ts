import { LaunchRequest } from 'ask-sdk-model';

/**
 * Builder used to construct a new LaunchRequest
 * @class
 */
export class LaunchRequestBuilder {
    private 'type';
    private 'requestId';
    private 'timestamp';
    private 'locale';
    constructor() { this['type'] = 'LaunchRequest'; }
    /**
     * Sets the requestId
     * @param {string} requestId
     */
    withRequestId(requestId: string): LaunchRequestBuilder {
        this['requestId'] = requestId;
        return this;        
    }
    /**
     * Sets the timestamp
     * @param {string} timestamp
     */
    withTimestamp(timestamp: string): LaunchRequestBuilder {
        this['timestamp'] = timestamp;
        return this;        
    }
    /**
     * Sets the locale
     * @param {string} locale
     */
    withLocale(locale: string): LaunchRequestBuilder {
        this['locale'] = locale;
        return this;
    }
    build(): LaunchRequest {
        var result = new Object();
        if (this['type'] != null) {
            result['type'] = this['type'];
        }
        if (this['requestId'] != null) {
            result['requestId'] = this['requestId'];
        }
        if (this['timestamp'] != null) {
            result['timestamp'] = this['timestamp'];
        }
        if (this['locale'] != null) {
            result['locale'] = this['locale'];
        }
        return <LaunchRequest> result;
    }
}
