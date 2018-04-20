'use strict';

import { Request } from 'ask-sdk-model';
import { strings } from '../Strings';

interface localeStrings {
    [key: string] : string
}
export interface i18nStrings {
    [locale: string] : localeStrings;
}

class I18N {
    private strings : i18nStrings;

    public constructor(strings : i18nStrings) {
        this.strings = strings;
    }

    public S(request: Request, key: string, ...args: any[]): string {
        var result: string;

        try {
            result = this.strings[request.locale][key];
            if (result === undefined) {
                result = `No string defined for key : ${key}`
            }
            // search for {x} and replaces with values
            const regex = /({\d*})/g;
            result = result.replace(regex, (match: string, p1: string, offset: number, string: string): string => {
                const index = parseInt((match.substring(1,match.length)).substring(0,match.length-2));
                return args[index];
            });


        } catch (e) {
            console.log(e);
            console.log(`Can not find strings for locale ${request.locale} and key ${key}`);
        }
        return result
    }
}
export const i18n = new I18N(strings);
