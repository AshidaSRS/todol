"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;
var node_emoji_1 = __importDefault(require("node-emoji"));
var tree_1 = require("../tree");
var print = function (tree, useColor) {
    if (useColor === void 0) { useColor = true; }
    console.log(tree_1.tree(useColor)(buildTreeFromDirectory(tree)));
};
exports.print = print;
var buildTreeFromDirectory = function (tree) {
    if (tree.type === 'directory' && tree.children) {
        var labelName = node_emoji_1.default.find('blue_book').emoji + " " + tree.name;
        return { label: labelName, nodes: buildChildrenFromDirectory(tree.children, 0), };
    }
    else {
        return { label: tree.name };
    }
};
var buildChildrenFromDirectory = function (listTree, parentDeep) {
    return listTree.reduce(function (acc, t) {
        var _a;
        if (t.type === 'directory' && t.children) {
            var labelName = node_emoji_1.default.find('book').emoji + " " + t.name;
            var result = {
                label: labelName, nodes: buildChildrenFromDirectory(t.children || [], parentDeep + 1)
            };
            return __spreadArray(__spreadArray([], acc), [result]);
        }
        else {
            var value = "" + node_emoji_1.default.find('memo').emoji;
            return __spreadArray(__spreadArray([], acc), [{ leaf: (_a = {}, _a[value] = t.name, _a) }]);
        }
    }, []);
};
