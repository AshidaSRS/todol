"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mark = void 0;
var index_1 = require("./index");
var mark = function (listPath, element, done) {
    var cleanPath = listPath.replace('todo-lists/', '');
    var _a = cleanPath.split('todo'), filePath = _a[0], elementPath = _a[1];
    var _b = index_1.parseTODOList(filePath), list = _b.list, errors = _b.errors;
    if (errors || !list) {
        console.log('Error');
        return false;
    }
    var newList = index_1.updateList(list, elementPath, element, done);
    if (!newList) {
        console.log('Error');
        return false;
    }
    return index_1.backupList(newList);
};
exports.mark = mark;
