"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.tree = void 0;
var directory_tree_1 = __importDefault(require("directory-tree"));
var printer_1 = require("./printer");
exports.tree = directory_tree_1.default("/Users/ashida/Git/todo-lists", {
    exclude: /(\.(DS_Store|git))|(README.org)/
});
var log = function () { return printer_1.print(exports.tree); };
exports.log = log;
