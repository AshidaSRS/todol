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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;
var _ = __importStar(require("lodash/fp"));
var tab = function (n, v) {
    if (n === void 0) { n = 1; }
    return _.repeat(n)('\t') + " " + (v ? v : '');
};
var print = function (tree) {
    var t = printTree(tree);
    p(printTree2(tree));
    //console.log(treeify.asTree(t, false, true))
    //console.log(JSON.stringify(printTree2(tree), undefined, 2))
};
exports.print = print;
var printTree = function (tree) {
    var _a, _b;
    if (tree.type === 'directory' && tree.children) {
        var result = (_a = {}, _a[tree.name] = printNodeChildren(tree.children), _a);
        //return treeify.asTree(result, false, true)
        return result;
    }
    else {
        var result = (_b = {}, _b[tree.name] = "", _b);
        //return treeify.asTree(result, false, true)
        return result;
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
var printTree2 = function (tree) {
    if (tree.type === 'directory' && tree.children) {
        var node = {
            name: tree.name,
            isLast: false,
            children: printNodeChildren2(tree.children, 0),
            deep: 0,
        };
        //return treeify.asTree(result, false, true)
        return { root: node };
    }
    else {
        var node = {
            name: tree.name,
            isLast: true,
            deep: 0,
            children: []
        };
        return { root: node };
    }
};
var printNodeChildren2 = function (listTree, parentDeep) {
    var lastChildren = _.last(listTree);
    return listTree.reduce(function (acc, t) {
        var node = {
            name: t.name,
            isLast: (lastChildren === null || lastChildren === void 0 ? void 0 : lastChildren.name) === t.name ? true : false,
            deep: parentDeep + 1,
            children: []
        };
        if (t.type === 'directory' && t.children) {
            var result = __assign(__assign({}, node), { children: printNodeChildren2(t.children || [], parentDeep + 1) });
            return __spreadArray(__spreadArray([], acc), [result]);
        }
        else {
            return __spreadArray(__spreadArray([], acc), [__assign(__assign({}, node), { isLast: true, deep: parentDeep + 1 })]);
        }
    }, []);
};
var p = function (tree) {
    var _a = tree.root, name = _a.name, deep = _a.deep, isLast = _a.isLast, children = _a.children;
    if (isLast) {
        p2(name, deep, isLast);
    }
    else {
        p2(name, deep, isLast);
        pc(children);
    }
};
var pc = function (children) {
    children.map(function (c) {
        if (c.isLast) {
            p2(c.name, c.deep, c.isLast);
            if (c.children) {
                pc(c.children);
            }
        }
        else {
            p2(c.name, c.deep, c.isLast);
            pc(c.children);
        }
    });
};
var p2 = function (name, deep, isLast) {
    if (isLast) {
        console.log(tab(deep - 2), tab(1, "|"), tab(1), "└", name);
    }
    else {
        console.log(_.repeat(deep - 1)(tab(1, "|")), name);
    }
};
