"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.print = void 0;
var _ = __importStar(require("lodash/fp"));
var treeify_1 = __importDefault(require("treeify"));
var tab = function (n, v) {
    if (n === void 0) { n = 1; }
    return _.repeat(n)('\t') + " " + (v ? v : '');
};
var print = function (tree) {
    console.log(printTree(tree));
};
exports.print = print;
var printTree = function (tree) {
    var _a, _b;
    if (tree.type === 'directory' && tree.children) {
        var result = (_a = {}, _a[tree.name] = printNodeChildren(tree.children), _a);
        return treeify_1.default.asTree(result, false, true);
    }
    else {
        var result = (_b = {}, _b[tree.name] = "", _b);
        return treeify_1.default.asTree(result, false, true);
    }
};
var printNodeChildren = function (listTree) {
    return listTree && listTree.reduce(function (acc, t) {
        var _a, _b;
        if (t.type === 'directory' && t.children) {
            return __assign(__assign({}, acc), (_a = {}, _a[t.name] = printNodeChildren(t.children || []), _a));
        }
        else {
            return __assign(__assign({}, acc), (_b = {}, _b[t.name] = "", _b));
        }
    }, {});
};
