"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Number = void 0;
var Number = function (n) {
    if (isNaN(exports.Number(n)))
        throw new Error(n + " is not a number");
    return exports.Number(n);
};
exports.Number = Number;
