"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupList = exports.updateList = exports.parseTODOList = exports.list = exports.tree = void 0;
var directory_tree_1 = __importDefault(require("directory-tree"));
var errors_1 = require("../types/errors");
var utils_1 = require("../utils");
var printer_1 = require("./printer");
var _ = __importStar(require("lodash/fp"));
var parser_1 = require("./parser");
exports.tree = directory_tree_1.default(utils_1.env('USER_PATH'), {
    exclude: /(\.(DS_Store|git))|(README.org)/
});
var list = function () { return printer_1.print(exports.tree); };
exports.list = list;
var parseTODOList = function (path) {
    console.log(parser_1.parse(path));
    console.log('NO_IMPLEMENTED');
    var error = new errors_1.ParseError('NOT_IMPLEMENTED');
    return { list: undefined, errors: [error] };
};
exports.parseTODOList = parseTODOList;
var updateList = function (list, elementPath, element, done) {
    var todoListAndSublists = _.compact(elementPath.split('/'));
    console.log('NOT_IMPLEMENTED');
    return undefined;
};
exports.updateList = updateList;
var backupList = function (list) {
    console.log('NOT_IMPLEMENTED');
    return false;
};
exports.backupList = backupList;
