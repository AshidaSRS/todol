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
exports.tree = void 0;
var archy_1 = __importDefault(require("archy"));
var chalk_1 = __importDefault(require("chalk"));
// Copied from https://github.com/mafintosh/pretty-tree/
// due to changing colours
var echo = function (val) {
    return val;
};
var tree = function (color) {
    var cyan = color ? chalk_1.default.cyan : echo;
    var grey = color ? chalk_1.default.grey : echo;
    var blue = color ? chalk_1.default.blueBright : echo;
    var isAtomic = function (v) {
        return v === null || v === undefined || typeof v !== 'object';
    };
    var leaf = function (obj) {
        if (isAtomic(obj))
            return ['' + obj];
        var keys = Object.keys(obj);
        var isArray = Array.isArray(obj);
        var nodes = [];
        var atomic = keys.filter(function (key) {
            return isAtomic(obj[key]);
        });
        var nonAtomic = keys.filter(function (key) {
            return !isAtomic(obj[key]);
        });
        var pad = atomic.reduce(function (max, val) {
            return max.length >= val.length ? max : val.replace(/./g, ' ');
        }, ' ');
        if (!atomic.length && !nonAtomic.length)
            return [grey('(empty)')];
        atomic.forEach(function (key) {
            var val = (obj[key] + '').replace(/\n/g, '\n  ' + pad);
            key = key + ':' + pad.slice(key.length - pad.length - 1);
            nodes.push(isArray ? val : (cyan(key) + val));
        });
        nonAtomic.forEach(function (key) {
            nodes.push({ label: isArray ? undefined : cyan(key), nodes: leaf(obj[key]) });
        });
        return nodes;
    };
    var visit = function (node) {
        if (node.label)
            node.label = blue(node.label);
        if (node.nodes)
            node.nodes = __spreadArray([], node.nodes).map(visit);
        if (node.leaf)
            node.nodes = __spreadArray(__spreadArray([], node.nodes || []), leaf(node.leaf));
        if (node.label && (!node.nodes || !node.nodes.length))
            node.nodes = [grey('(empty)')];
        return node;
    };
    return function (node) {
        return archy_1.default(visit(node))
            .replace(/([├└])─┬ \n[│ ]+├/gm, '$1─┬')
            .replace(/([├└])─┬ \n[│ ]+└/gm, '$1──')
            .replace(/[┬├─└│┐]/g, function (v) {
            return grey(v);
        });
    };
};
exports.tree = tree;
