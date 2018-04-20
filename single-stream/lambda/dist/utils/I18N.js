'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Strings_1 = require("../Strings");
class I18N {
    constructor(strings) {
        this.strings = strings;
    }
    S(request, key, ...args) {
        var result;
        try {
            result = this.strings[request.locale][key];
            if (result === undefined) {
                result = `No string defined for key : ${key}`;
            }
            // search for {x} and replaces with values
            const regex = /({\d*})/g;
            result = result.replace(regex, (match, p1, offset, string) => {
                const index = parseInt((match.substring(1, match.length)).substring(0, match.length - 2));
                return args[index];
            });
        }
        catch (e) {
            console.log(e);
            console.log(`Can not find strings for locale ${request.locale} and key ${key}`);
        }
        return result;
    }
}
exports.i18n = new I18N(Strings_1.strings);
//# sourceMappingURL=I18N.js.map