"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomBoolean = exports.CustomNumber = exports.env = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var env = function (path) {
    try {
        dotenv_1.default.config();
        var value = process.env[path];
        if (!value) {
            throw new Error(path + " not found in environment. Check the .env file or add it to the path");
        }
        return value;
    }
    catch (err) {
        console.log(err.message);
        throw err;
    }
};
exports.env = env;
var CustomNumber = function (n) {
    if (isNaN(Number(n)))
        throw new Error("'" + n + "' is not a number");
    return Number(n);
};
exports.CustomNumber = CustomNumber;
var CustomBoolean = function (n) {
    if (n !== 'true' && n !== 'false')
        throw new Error("'" + n + "' is not a boolean");
    return Boolean(n);
};
exports.CustomBoolean = CustomBoolean;
