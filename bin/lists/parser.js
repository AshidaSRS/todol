"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var fs_1 = __importDefault(require("fs"));
var readline_1 = __importDefault(require("readline"));
var utils_1 = require("../utils");
var parse = function (path) {
    var fullPath = utils_1.env('USER_PATH') + "/" + path + "/todo.org";
    var readInterface = readline_1.default.createInterface({
        input: fs_1.default.createReadStream(fullPath),
        //output: process.stdout,
    });
    readInterface.on('line', function (line) {
    });
    return undefined;
};
exports.parse = parse;
